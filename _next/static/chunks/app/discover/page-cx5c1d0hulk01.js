(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9495],{9011:(e,s,l)=>{"use strict";l.r(s),l.d(s,{default:()=>Page});
var t=l(5155),R=l(2115),P=l(7078),SC=l(2824),API=l(9150);
var G=function(a,b){return"linear-gradient(135deg,"+a+","+b+")"};
var MOODS=[
{n:"Romance",s:"Heartbeats",q:"romantic hindi songs",g:G("#be185d","#fb7185")},
{n:"Dance",s:"Party beats",q:"bollywood dance party hits",g:G("#7c3aed","#f472b6")},
{n:"Workout",s:"Pump up",q:"workout gym motivation songs",g:G("#b91c1c","#f97316")},
{n:"The 1990s",s:"Golden era",q:"90s hindi hits",g:G("#a16207","#fbbf24")},
{n:"Happy",s:"Feel good",q:"happy feel good hindi songs",g:G("#0891b2","#facc15")},
{n:"K-Pop",s:"Global phenomenon",q:"kpop hits",g:G("#4f46e5","#ec4899")},
{n:"Western Classical",s:"Symphonies",q:"western classical symphony",g:G("#1e3a8a","#64748b")},
{n:"Rock",s:"Electric guitars",q:"rock songs anthems",g:G("#18181b","#dc2626")},
{n:"Fusion",s:"Cross cultures",q:"indian fusion music",g:G("#0f766e","#a3e635")},
{n:"Soulful",s:"Smooth & soulful",q:"soulful hindi songs",g:G("#312e81","#a78bfa")},
{n:"Indie",s:"Independent voices",q:"indie india songs",g:G("#065f46","#34d399")},
{n:"Folk",s:"Roots of India",q:"indian folk songs",g:G("#9a3412","#fdba74")},
{n:"Classical",s:"Ragas & virtuosity",q:"hindustani classical raga",g:G("#581c87","#e879f9")},
{n:"Retro",s:"Throwback top 20",q:"retro bollywood old classics",g:G("#92400e","#d97706")},
{n:"Devotional",s:"Bhakti & peace",q:"bhakti bhajan devotional",g:G("#b45309","#fde047")},
{n:"Travel",s:"Road trips",q:"road trip songs hindi",g:G("#155e75","#38bdf8")},
{n:"Desi Hip Hop",s:"Gully & underground",q:"desi hip hop rap hindi",g:G("#27272a","#a1a1aa")},
{n:"Punjabi",s:"Dhol power",q:"punjabi hit songs",g:G("#b45309","#f43f5e")},
{n:"Bhojpuri",s:"Desi swag",q:"bhojpuri hit songs",g:G("#be123c","#fb923c")},
{n:"Lo-fi",s:"Chill & study",q:"lofi hindi chill beats",g:G("#3730a3","#22d3ee")}
];
var MIXES=[
{n:"Late Night Highway Drives",q:"night drive hindi songs",g:G("#0f172a","#6366f1")},
{n:"Monsoon Rain Chai Melodies",q:"barish rain hindi songs",g:G("#0c4a6e","#38bdf8")},
{n:"Punjabi Pop & Dhol Power",q:"punjabi pop dhol",g:G("#9a3412","#f59e0b")},
{n:"College Romance 2000s",q:"2000s bollywood romantic",g:G("#9d174d","#f9a8d4")},
{n:"Heartbreak & Healing",q:"sad heartbreak hindi songs",g:G("#1e293b","#64748b")},
{n:"Desi Energy Cardio",q:"gym workout bollywood energy",g:G("#991b1b","#fb923c")},
{n:"Indie India Sunset",q:"indie india sunset",g:G("#7c2d12","#fdba74")},
{n:"Ghazal Baithak",q:"ghazal shayari",g:G("#3f3f46","#d6a354")},
{n:"Himalayan Roadtrip",q:"mountain road trip chill hindi",g:G("#134e4a","#5eead4")},
{n:"Big Fat Wedding",q:"bollywood wedding songs",g:G("#be185d","#fcd34d")},
{n:"Arijit Midnight Soul",q:"arijit singh midnight",g:G("#1e1b4b","#818cf8")},
{n:"Kishore Kumar Magic",q:"kishore kumar hits",g:G("#78350f","#fbbf24")},
{n:"Gully Hip Hop",q:"gully rap desi",g:G("#18181b","#facc15")},
{n:"Morning Chants",q:"morning mantra aarti",g:G("#b45309","#fef08a")},
{n:"Folk Fest & Dhol",q:"folk dhol beats",g:G("#9a3412","#f87171")},
{n:"Viral Reels Hits",q:"viral reels hindi songs",g:G("#6d28d9","#f472b6")},
{n:"International Pop",q:"english pop hits",g:G("#1d4ed8","#a5b4fc")},
{n:"Carvaan Evergreen",q:"evergreen old hindi classics",g:G("#44403c","#d4a373")},
{n:"Sufi & Soulful",q:"sufi songs",g:G("#4c1d95","#c4b5fd")},
{n:"Daily Drive & Workout",q:"bollywood chartbusters energy",g:G("#7f1d1d","#ef4444")}
];
function Ic(p){return(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",className:p.c||"",dangerouslySetInnerHTML:{__html:p.d}})}
var D_NOTE='<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>';
var D_SLIDERS='<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>';
var D_SHUF='<path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/>';
var D_PLAY='<polygon points="6 3 20 12 6 21 6 3"/>';
function greet(){var h=new Date().getHours();return h<5?"Late night":h<12?"Good morning":h<17?"Good afternoon":h<21?"Good evening":"Good night"}
function clean(list,skip){var seen={},out=[];(list||[]).forEach(function(x){if(!x||!x.id||seen[x.id]||(skip&&skip[x.id]))return;seen[x.id]=1;out.push(x)});return out}
function Grid(p){return(0,t.jsx)("div",{className:"dc-grid",children:p.list.map(function(x){return(0,t.jsx)(SC._,{song:x,playlist:p.list},x.id)})})}
function Skel(){return(0,t.jsx)("div",{className:"dc-skel",children:[0,1,2,3].map(function(i){return(0,t.jsx)("div",{className:"cx-skel"},i)})})}
function Page(){
var ctx=P.J(),pt=ctx.playTrack,ph=ctx.playedHistory||[];
var m=R.useState(!1),mounted=m[0],setM=m[1];
var sel=R.useState(null),pick=sel[0],setPick=sel[1];
var rs=R.useState(null),res=rs[0],setRes=rs[1];
var ld=R.useState(!1),loading=ld[0],setLoading=ld[1];
var by=R.useState({artist:"",songs:null}),because=by[0],setBecause=by[1];
var ref=R.useRef(null);
R.useEffect(function(){setM(!0)},[]);
R.useEffect(function(){
if(!mounted)return;var live=!0,hist=[];
try{hist=JSON.parse(localStorage.getItem("cxm_listening_history")||"[]")||[]}catch(e){}
var seen={};hist.forEach(function(h){if(h&&h.songId)seen[h.songId]=1});
var artist=hist[0]&&hist[0].artist&&hist[0].artist!=="Unknown"?hist[0].artist:"";
if(!artist){setBecause({artist:"",songs:[]});return}
API.bN(artist+" songs",1).then(function(r){live&&setBecause({artist:artist,songs:clean(r,seen).slice(0,12)})}).catch(function(){live&&setBecause({artist:artist,songs:[]})});
return function(){live=!1}
},[mounted]);
function load(item){
setPick(item);setLoading(!0);setRes(null);
setTimeout(function(){ref.current&&ref.current.scrollIntoView({behavior:"smooth",block:"start"})},60);
API.bN(item.q,1).then(function(r){setRes(clean(r).slice(0,40));setLoading(!1)}).catch(function(){setRes([]);setLoading(!1)})
}
function shuffleTrending(){API._F().then(function(r){var l=clean(r);if(l.length){var i=Math.floor(Math.random()*l.length);pt(l[i],l)}})}
function openStudio(){window.dispatchEvent(new CustomEvent("cx:premium"))}
if(!mounted)return(0,t.jsx)("div",{className:"dc"});
var recent=ph.map(function(x){return x.songData}).filter(Boolean).slice(0,12);
return(0,t.jsxs)("div",{className:"dc",children:[
(0,t.jsxs)("header",{className:"dc-hero",children:[
(0,t.jsxs)("h1",{children:[greet(),",",(0,t.jsx)("br",{}),(0,t.jsx)("em",{children:"what's the vibe?"})]}),
(0,t.jsx)("p",{children:"Pick a mood, jump into a curated mix, or let your listening history guide the next song."}),
(0,t.jsxs)("div",{className:"dc-tools",children:[
(0,t.jsxs)("button",{type:"button",className:"dc-btn dc-btn--pri",onClick:shuffleTrending,children:[(0,t.jsx)(Ic,{d:D_SHUF,c:"h-4 w-4"}),"Surprise me"]}),
(0,t.jsxs)("button",{type:"button",className:"dc-btn",onClick:openStudio,children:[(0,t.jsx)(Ic,{d:D_SLIDERS,c:"h-4 w-4"}),"Audio Studio"]})
]})
]}),
(0,t.jsxs)("section",{className:"dc-sec",children:[
(0,t.jsx)("h2",{children:"Moods & genres"}),(0,t.jsx)("small",{children:"Tap one to load a fresh set of songs"}),
(0,t.jsx)("div",{className:"dc-moods",children:MOODS.map(function(x){return(0,t.jsxs)("button",{type:"button",className:"dc-mood"+(pick&&pick.n===x.n?" is-on":""),style:{"--g":x.g},onClick:function(){load(x)},children:[(0,t.jsx)("b",{children:x.n}),(0,t.jsx)("span",{children:x.s})]},x.n)})})
]}),
(pick||loading)&&(0,t.jsxs)("section",{className:"dc-sec",ref:ref,children:[
(0,t.jsxs)("div",{className:"dc-head",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{children:pick?pick.n:""}),(0,t.jsx)("small",{children:loading?"Loading songs…":(res?res.length:0)+" songs"})]}),
res&&res.length>0&&(0,t.jsxs)("button",{type:"button",className:"dc-btn dc-btn--pri",onClick:function(){pt(res[0],res)},children:[(0,t.jsx)(Ic,{d:D_PLAY,c:"h-4 w-4"}),"Play all"]})]}),
loading?(0,t.jsx)(Skel,{}):res&&res.length>0?(0,t.jsx)(Grid,{list:res}):(0,t.jsx)("div",{className:"dc-empty",children:"No songs found right now. Check your connection and try another mood."})
]}),
(0,t.jsxs)("section",{className:"dc-sec",children:[
(0,t.jsx)("h2",{children:"Curated mixes"}),(0,t.jsx)("small",{children:"Hand-picked moods for every moment"}),
(0,t.jsx)("div",{className:"dc-row",children:MIXES.map(function(x){return(0,t.jsxs)("button",{type:"button",className:"dc-pl",onClick:function(){load(x)},children:[(0,t.jsx)("i",{style:{"--g":x.g},children:(0,t.jsx)(Ic,{d:D_NOTE})}),(0,t.jsx)("b",{children:x.n}),(0,t.jsx)("span",{children:"Codexstudys mix"})]},x.n)})})
]}),
because.artist&&(0,t.jsxs)("section",{className:"dc-sec",children:[
(0,t.jsx)("h2",{children:"Because you listened to "+because.artist}),(0,t.jsx)("small",{children:"Fresh picks based on your history"}),
because.songs===null?(0,t.jsx)(Skel,{}):because.songs.length>0?(0,t.jsx)(Grid,{list:because.songs}):(0,t.jsx)("div",{className:"dc-empty",children:"Nothing new yet — keep listening."})
]}),
recent.length>0&&(0,t.jsxs)("section",{className:"dc-sec",children:[
(0,t.jsx)("h2",{children:"Recently played"}),(0,t.jsx)("small",{children:"Jump back in"}),
(0,t.jsx)(Grid,{list:recent})
]}),
!because.artist&&recent.length===0&&(0,t.jsx)("section",{className:"dc-sec",children:(0,t.jsx)("div",{className:"dc-empty",children:"Play a few songs and personalised picks will show up here."})})
]})
}
},9496:(e,s,l)=>{Promise.resolve().then(l.bind(l,9011))}},e=>{e.O(0,[830,875,671,825,622,402,824,441,255,358],()=>e(e.s=9496)),_N_E=e.O()}]);
