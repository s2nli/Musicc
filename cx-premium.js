/* Codexstudys Music — Premium layer ("Audio Studio")
 * Pure DOM, no React, so it can never break hydration.
 * Features: Sleep timer (with fade-out), 5-band equalizer presets, playback speed,
 * accent themes, listening stats. Opened with window.CXP.open() or the "cx:premium" event.
 */
(function () {
  "use strict";
  var LS = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var K_ACCENT = "cxm_accent", K_EQ = "cxm_eq", K_SPEED = "cxm_speed";

  /* ------------------------------------------------------------ accents */
  var ACCENTS = [
    { id: "crimson", name: "Crimson", hsl: "0 72.2% 50.6%", css: "#dc2626" },
    { id: "violet", name: "Violet", hsl: "262 83% 62%", css: "#8b5cf6" },
    { id: "emerald", name: "Emerald", hsl: "152 69% 42%", css: "#22c55e" },
    { id: "sky", name: "Sky", hsl: "199 89% 52%", css: "#0ea5e9" },
    { id: "amber", name: "Amber", hsl: "38 92% 52%", css: "#f59e0b" },
    { id: "rose", name: "Rose", hsl: "336 80% 60%", css: "#ec4899" }
  ];
  function applyAccent(id) {
    var a = ACCENTS.filter(function (x) { return x.id === id; })[0] || ACCENTS[0];
    try {
      document.documentElement.style.setProperty("--primary", a.hsl);
      document.documentElement.style.setProperty("--ring", a.hsl);
      document.documentElement.style.setProperty("--primary-foreground", a.fg || "0 0% 98%");
      document.documentElement.style.setProperty("--cx-accent", a.css);
    } catch (e) {}
    return a;
  }
  applyAccent(LS.get(K_ACCENT, "crimson"));

  /* ------------------------------------------------------------- helpers */
  function toast(msg) { try { if (window.CX && window.CX.toast) window.CX.toast(msg); } catch (e) {} }
  function audio() { return window.__cxAudio || null; }
  function fmt(s) { s = Math.max(0, Math.round(s)); var m = Math.floor(s / 60), r = s % 60; return m + ":" + (r < 10 ? "0" : "") + r; }

  /* --------------------------------------------------------- playback speed */
  var speed = parseFloat(LS.get(K_SPEED, "1")) || 1;
  function applySpeed() {
    var a = audio(); if (!a) return;
    try { a.defaultPlaybackRate = speed; a.playbackRate = speed; a.preservesPitch = true; a.webkitPreservesPitch = true; } catch (e) {}
  }
  function setSpeed(v) { speed = v; LS.set(K_SPEED, String(v)); applySpeed(); }

  /* --------------------------------------------------------------- equalizer */
  var BANDS = [60, 230, 910, 3600, 14000];
  var PRESETS = [
    { id: "flat", name: "Flat", g: [0, 0, 0, 0, 0] },
    { id: "bass", name: "Bass Boost", g: [7, 5, 1, 0, 0] },
    { id: "vocal", name: "Vocal", g: [-2, 0, 3, 4, 1] },
    { id: "treble", name: "Treble", g: [0, 0, 0, 4, 7] },
    { id: "rock", name: "Rock", g: [5, 2, -2, 3, 5] },
    { id: "party", name: "Party", g: [6, 3, 0, 3, 6] },
    { id: "lofi", name: "Lo-fi Warm", g: [4, 3, 0, -3, -7] }
  ];
  var eq = { ctx: null, src: null, filters: [], pre: null, ready: false, failed: false, audioEl: null };
  var preset = LS.get(K_EQ, "flat");

  function presetById(id) { return PRESETS.filter(function (p) { return p.id === id; })[0] || PRESETS[0]; }

  function ensureGraph() {
    if (eq.ready || eq.failed) return eq.ready;
    var a = audio(); if (!a) return false;
    var AC = window.AudioContext || window.webkitAudioContext; if (!AC) { eq.failed = true; return false; }
    try {
      eq.ctx = new AC();
      eq.src = eq.ctx.createMediaElementSource(a);
      eq.audioEl = a;
      eq.pre = eq.ctx.createGain();
      var prev = eq.pre;
      eq.filters = BANDS.map(function (f, i) {
        var n = eq.ctx.createBiquadFilter();
        n.type = i === 0 ? "lowshelf" : i === BANDS.length - 1 ? "highshelf" : "peaking";
        n.frequency.value = f; n.Q.value = 1; n.gain.value = 0;
        prev.connect(n); prev = n; return n;
      });
      eq.src.connect(eq.pre);
      prev.connect(eq.ctx.destination);
      eq.ready = true;
      resume();
    } catch (e) { eq.failed = true; eq.ready = false; }
    return eq.ready;
  }
  function resume() { try { if (eq.ctx && eq.ctx.state !== "running") eq.ctx.resume(); } catch (e) {} }
  function applyPreset(id) {
    var p = presetById(id);
    if (!ensureGraph()) return false;
    var max = Math.max.apply(null, p.g.concat([0]));
    eq.pre.gain.value = Math.pow(10, (-max * 0.55) / 20); // headroom so boosts never clip
    p.g.forEach(function (g, i) { eq.filters[i].gain.value = g; });
    resume();
    return true;
  }
  function setPreset(id) {
    preset = id; LS.set(K_EQ, id);
    if (id === "flat" && !eq.ready) return true; // nothing to do, leave audio path untouched
    return applyPreset(id);
  }
  // restore a saved preset after the first user gesture (browsers keep AudioContext suspended before that)
  function restoreOnGesture() {
    if (preset === "flat") return;
    var done = false;
    function go() {
      if (done) return; done = true;
      document.removeEventListener("pointerdown", go, true);
      document.removeEventListener("keydown", go, true);
      var tries = 0;
      (function wait() { if (audio()) { applyPreset(preset); applySpeed(); } else if (tries++ < 40) setTimeout(wait, 250); })();
    }
    document.addEventListener("pointerdown", go, true);
    document.addEventListener("keydown", go, true);
  }
  document.addEventListener("pointerdown", resume, true);

  /* -------------------------------------------------------------- sleep timer */
  var sleep = { mode: null, endAt: 0, timer: null, fading: false };
  function clearSleep() {
    if (sleep.timer) clearTimeout(sleep.timer);
    sleep.timer = null; sleep.mode = null; sleep.endAt = 0;
    var a = audio(); if (a && sleep.fading) { try { a.volume = sleep.vol; } catch (e) {} }
    sleep.fading = false; render();
  }
  function fadeAndPause() {
    var a = audio(); if (!a) { clearSleep(); return; }
    sleep.fading = true; sleep.vol = a.volume;
    var v0 = a.volume, steps = 20, i = 0;
    var iv = setInterval(function () {
      i++; try { a.volume = Math.max(0, v0 * (1 - i / steps)); } catch (e) {}
      if (i >= steps) {
        clearInterval(iv);
        try { a.pause(); a.volume = v0; } catch (e) {}
        sleep.fading = false; sleep.mode = null; sleep.endAt = 0; sleep.timer = null;
        toast("Sleep timer ended — good night"); render();
      }
    }, 150);
  }
  function setSleep(mode) {
    if (sleep.timer) clearTimeout(sleep.timer);
    sleep.timer = null; sleep.fading = false;
    if (!mode) { sleep.mode = null; sleep.endAt = 0; toast("Sleep timer off"); render(); return; }
    sleep.mode = mode;
    if (mode === "song") { sleep.endAt = 0; toast("Will stop when this song ends"); }
    else { sleep.endAt = Date.now() + mode * 60000; sleep.timer = setTimeout(fadeAndPause, mode * 60000); toast("Sleep timer: " + mode + " min"); }
    render();
  }
  function watchSongEnd() {
    var a = audio(); if (!a || a.__cxSleepWatch) return; a.__cxSleepWatch = true;
    a.addEventListener("timeupdate", function () {
      if (sleep.mode !== "song" || sleep.fading) return;
      if (a.duration && isFinite(a.duration) && a.duration - a.currentTime < 0.9) { fadeAndPause(); }
    });
    a.addEventListener("loadedmetadata", applySpeed);
    a.addEventListener("play", applySpeed);
  }
  (function boot() { var n = 0; (function t() { if (audio()) { watchSongEnd(); applySpeed(); } else if (n++ < 80) setTimeout(t, 250); })(); })();

  /* ------------------------------------------------------------------ stats */
  function stats() {
    var list = [];
    try { list = JSON.parse(LS.get("cxm_listening_history", "[]")) || []; } catch (e) {}
    var by = {}; list.forEach(function (x) { if (x && x.artist) by[x.artist] = (by[x.artist] || 0) + 1; });
    var top = Object.keys(by).sort(function (a, b) { return by[b] - by[a]; })[0] || "";
    return { tracks: list.length, artists: Object.keys(by).length, top: top };
  }

  /* --------------------------------------------------------------------- UI */
  var root = null, open = false;
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function chip(label, active, onClick, extra) {
    var b = el("button", "cxp-chip" + (active ? " is-on" : "") + (extra ? " " + extra : ""), label);
    b.type = "button"; b.addEventListener("click", onClick); return b;
  }
  function section(title, hint) {
    var s = el("section", "cxp-sec"); s.appendChild(el("h3", "cxp-h", title));
    if (hint) { var p = el("p", "cxp-p"); p.setAttribute("data-hint", ""); p.textContent = hint; s.appendChild(p); }
    return s;
  }
  function render() {
    if (!root) return;
    var body = root.querySelector(".cxp-body"); if (!body) return;
    body.innerHTML = "";

    // stats
    var st = stats(), sx = el("div", "cxp-stats");
    [[st.tracks, "Tracks played"], [st.artists, "Artists"], [st.top || "—", "Top artist"]].forEach(function (x) {
      var c = el("div", "cxp-stat"); c.appendChild(el("b", "", String(x[0]).replace(/</g, "&lt;"))); c.appendChild(el("span", "", x[1])); sx.appendChild(c);
    });
    body.appendChild(sx);

    // sleep timer
    var s1 = section("Sleep timer", "Fades out and pauses so you can drift off.");
    var row1 = el("div", "cxp-row");
    [15, 30, 45, 60].forEach(function (m) { row1.appendChild(chip(m + " min", sleep.mode === m, function () { setSleep(m); })); });
    row1.appendChild(chip("End of song", sleep.mode === "song", function () { setSleep("song"); }));
    row1.appendChild(chip("Off", !sleep.mode, function () { setSleep(null); }, "cxp-chip--ghost"));
    s1.appendChild(row1);
    var status = el("div", "cxp-status");
    if (sleep.mode === "song") status.textContent = "Stopping at the end of this song";
    else if (sleep.mode) { status.setAttribute("data-end", String(sleep.endAt)); status.textContent = "Stopping in " + fmt((sleep.endAt - Date.now()) / 1000); }
    s1.appendChild(status); body.appendChild(s1);

    // equalizer
    var s2 = section("Equalizer", "5-band presets applied to everything you play.");
    var row2 = el("div", "cxp-row");
    PRESETS.forEach(function (p) {
      row2.appendChild(chip(p.name, preset === p.id, function () {
        if (!setPreset(p.id)) { toast("Equalizer isn't supported on this browser"); return; }
        render();
      }));
    });
    s2.appendChild(row2);
    var bars = el("div", "cxp-eq");
    presetById(preset).g.forEach(function (g, i) {
      var c = el("div", "cxp-band"), bar = el("i"); bar.style.height = (50 + g * 5) + "%";
      c.appendChild(bar); c.appendChild(el("span", "", BANDS[i] >= 1000 ? (BANDS[i] / 1000) + "k" : String(BANDS[i]))); bars.appendChild(c);
    });
    s2.appendChild(bars); body.appendChild(s2);

    // speed
    var s3 = section("Playback speed");
    var row3 = el("div", "cxp-row");
    [0.75, 0.9, 1, 1.15, 1.25, 1.5, 2].forEach(function (v) {
      row3.appendChild(chip(v === 1 ? "Normal" : v + "x", speed === v, function () { setSpeed(v); render(); }));
    });
    s3.appendChild(row3); body.appendChild(s3);

    // accent
    var s4 = section("Accent colour");
    var row4 = el("div", "cxp-row cxp-row--sw"), cur = LS.get(K_ACCENT, "crimson");
    ACCENTS.forEach(function (a) {
      var b = el("button", "cxp-sw" + (cur === a.id ? " is-on" : "")); b.type = "button"; b.title = a.name; b.setAttribute("aria-label", a.name);
      b.style.background = a.css;
      b.addEventListener("click", function () { LS.set(K_ACCENT, a.id); applyAccent(a.id); render(); });
      row4.appendChild(b);
    });
    s4.appendChild(row4); body.appendChild(s4);
  }
  function build() {
    if (root) return;
    root = el("div", "cxp");
    root.innerHTML = '<div class="cxp-scrim"></div><div class="cxp-sheet" role="dialog" aria-modal="true" aria-label="Audio Studio"><div class="cxp-grab"></div><div class="cxp-head"><div><h2>Audio Studio</h2><p>Sleep timer · Equalizer · Speed · Theme</p></div><button type="button" class="cxp-x" aria-label="Close">&times;</button></div><div class="cxp-body"></div></div>';
    document.body.appendChild(root);
    root.querySelector(".cxp-scrim").addEventListener("click", close);
    root.querySelector(".cxp-x").addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (open && e.key === "Escape") close(); });
  }
  var tick = null;
  function openPanel() {
    build(); open = true; render();
    requestAnimationFrame(function () { root.classList.add("is-open"); });
    if (tick) clearInterval(tick);
    tick = setInterval(function () {
      var s = root && root.querySelector(".cxp-status[data-end]");
      if (s) { var left = (parseInt(s.getAttribute("data-end"), 10) - Date.now()) / 1000; s.textContent = left > 0 ? "Stopping in " + fmt(left) : "Fading out…"; }
    }, 1000);
  }
  function close() {
    if (!root) return; open = false; root.classList.remove("is-open");
    if (tick) { clearInterval(tick); tick = null; }
  }

  window.CXP = { open: openPanel, close: close, setSleep: setSleep, setPreset: setPreset, setSpeed: setSpeed, accents: ACCENTS };
  window.addEventListener("cx:premium", openPanel);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", restoreOnGesture);
  else restoreOnGesture();
})();
