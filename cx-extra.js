/* Codexstudys Music — extra player tools: sleep timer, speed, shortcuts (works on window.__cxAudio) */
(function () {
  "use strict";
  if (window.__cxExtra) return; window.__cxExtra = 1;
  var K = "cxm_extra", st = { speed: 1, sleepEnd: 0, sleepTrack: 0 }, tm = 0, fade = 0;
  try { var s = JSON.parse(localStorage.getItem(K) || "{}"); if (s.speed) st.speed = s.speed; } catch (e) {}
  function save() { try { localStorage.setItem(K, JSON.stringify({ speed: st.speed })); } catch (e) {} }
  function A() { return window.__cxAudio; }
  function toast(m) { if (window.CX && CX.toast) CX.toast(m); }
  function applySpeed() { var a = A(); if (a) { try { a.preservesPitch = true; a.playbackRate = st.speed; } catch (e) {} } }
  function stopSleep() { clearInterval(tm); st.sleepEnd = 0; st.sleepTrack = 0; var a = A(); if (a && a.__vol != null) { a.volume = a.__vol; } render(); }
  function doSleep() {
    var a = A(); if (!a) return; a.__vol = a.volume; var v = a.volume, n = 0;
    clearInterval(fade); fade = setInterval(function () { n++; a.volume = Math.max(0, v * (1 - n / 20)); if (n >= 20) { clearInterval(fade); a.pause(); a.volume = v; stopSleep(); toast("Sleep timer: music stopped"); } }, 100);
  }
  function setSleep(min) {
    clearInterval(tm); st.sleepTrack = 0; st.sleepEnd = 0;
    if (min === -1) { st.sleepTrack = 1; toast("Stops after this track"); }
    else if (min > 0) { st.sleepEnd = Date.now() + min * 60000; tm = setInterval(function () { if (Date.now() >= st.sleepEnd) { clearInterval(tm); doSleep(); } else render(); }, 1000); toast("Sleep timer: " + min + " min"); }
    render();
  }
  document.addEventListener("ended", function (e) { if (st.sleepTrack && e.target === A()) { var a = A(); setTimeout(function () { a.pause(); }, 0); stopSleep(); toast("Sleep timer: music stopped"); } }, true);
  document.addEventListener("play", function (e) { if (e.target === A()) applySpeed(); }, true);
  document.addEventListener("loadedmetadata", function (e) { if (e.target === A()) applySpeed(); }, true);

  var btn, sheet;
  function row(label, on, fn) { var b = document.createElement("button"); b.className = "cx-row" + (on ? " cx-row--on" : ""); b.textContent = label; b.onclick = fn; return b; }
  function render() {
    if (!btn) return;
    var left = st.sleepEnd ? Math.max(0, Math.ceil((st.sleepEnd - Date.now()) / 1000)) : 0;
    btn.classList.toggle("cx-tools--active", !!(left || st.sleepTrack || st.speed !== 1));
    btn.title = left ? "Sleep in " + Math.floor(left / 60) + ":" + ("0" + (left % 60)).slice(-2) : "Sleep timer & speed";
    if (!sheet || sheet.hidden) return;
    var body = sheet.querySelector(".cx-tools__body"); body.innerHTML = "";
    var h1 = document.createElement("div"); h1.className = "cx-dialog__lab"; h1.textContent = "Sleep timer" + (left ? " · " + Math.floor(left / 60) + ":" + ("0" + (left % 60)).slice(-2) : "");
    body.appendChild(h1);
    [[15, "15 minutes"], [30, "30 minutes"], [45, "45 minutes"], [60, "1 hour"], [-1, "End of current track"]].forEach(function (o) {
      body.appendChild(row(o[1], (o[0] === -1 && st.sleepTrack), function () { setSleep(o[0]); }));
    });
    if (left || st.sleepTrack) body.appendChild(row("Turn off timer", 0, function () { stopSleep(); toast("Sleep timer off"); }));
    var h2 = document.createElement("div"); h2.className = "cx-dialog__lab"; h2.textContent = "Playback speed"; body.appendChild(h2);
    var wrap = document.createElement("div"); wrap.className = "cx-speeds";
    [0.5, 0.75, 1, 1.25, 1.5, 2].forEach(function (x) { wrap.appendChild(row(x + "x", st.speed === x, function () { st.speed = x; save(); applySpeed(); render(); })); });
    body.appendChild(wrap);
  }
  function toggle(open) { sheet.hidden = open === undefined ? !sheet.hidden : !open; if (!sheet.hidden) render(); }
  function mount() {
    if (btn || !document.body) return;
    btn = document.createElement("button"); btn.className = "cx-tools"; btn.setAttribute("aria-label", "Sleep timer and speed");
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/></svg>';
    btn.onclick = function () { toggle(); };
    sheet = document.createElement("div"); sheet.className = "cx-tools__sheet"; sheet.hidden = true;
    sheet.innerHTML = '<div class="cx-tools__bg"></div><div class="cx-tools__panel"><div class="cx-tools__grab"></div><div class="cx-tools__body"></div></div>';
    sheet.querySelector(".cx-tools__bg").onclick = function () { toggle(false); };
    document.body.appendChild(btn); document.body.appendChild(sheet);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();

  /* keyboard shortcuts: Space play/pause, Shift+←/→ seek 10s, Shift+↑/↓ volume, M mute */
  document.addEventListener("keydown", function (e) {
    var t = e.target, a = A(); if (!a || e.ctrlKey || e.metaKey || e.altKey) return;
    if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    if (e.code === "Space") { e.preventDefault(); a.paused ? a.play() : a.pause(); }
    else if (e.shiftKey && e.key === "ArrowRight") a.currentTime = Math.min(a.duration || 1e9, a.currentTime + 10);
    else if (e.shiftKey && e.key === "ArrowLeft") a.currentTime = Math.max(0, a.currentTime - 10);
    else if (e.shiftKey && e.key === "ArrowUp") a.volume = Math.min(1, a.volume + .1);
    else if (e.shiftKey && e.key === "ArrowDown") a.volume = Math.max(0, a.volume - .1);
    else if (e.key === "m" || e.key === "M") a.muted = !a.muted;
    else if (e.key === "Escape" && sheet && !sheet.hidden) toggle(false);
  });
})();
