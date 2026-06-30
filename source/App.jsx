const { useState, useEffect } = React;

// ══ PALETTE — dark broadcast: navy stack + ice-blue energy ════════════════════
const C = {
  bg0:"#060B14", bg1:"#0B1524", bg2:"#0F1E30", bg3:"#16293F",
  line:"rgba(255,255,255,0.09)", lineStr:"rgba(52,180,232,0.45)",
  cyan:"#34B4E8", cyanBright:"#5BD2FF", ice:"#A8D8EA", iceDeep:"#1683B8",
  white:"#EAF3FA", muted:"#7E93A8", mutedDk:"#56697D",
  green:"#34D399", red:"#F2545B", amber:"#FBBF24",
};
const F = { d:"'Anton', Impact, sans-serif", b:"'Barlow', system-ui, sans-serif" };

// ══ DATA ══════════════════════════════════════════════════════════════════════
const TEAM = { name:"Newburgh Ice", level:"8U Travel Softball", season:"2025–26", coach:"Coach Eric Briggs" };
const ANNOUNCEMENTS = [
  { id:1, date:"Jun 30", title:"9U Tryouts — Tuesday, July 14", body:"Newburgh Ice 9U tryouts are Tuesday, July 14 at 5:30 PM at Newburgh Girls Softball, Field 1. Open to players with a birthdate after Sept 1, 2016. See the Tryouts tab to register, or text Coach Eric at 812-249-0564.", tag:"Tryouts" },
  { id:2, date:"Jun 14", title:"8U Season Wrap — 24–19–1", body:"Newburgh Ice finished the 2025–26 8U season at 24–19–1. Thank you to our players and families for a great year — on to 9U!", tag:"Results" },
  { id:3, date:"Jun 30", title:"The Yard Training Included", body:"All team players receive a membership to The Yard indoor athletic training facility, which we also use for winter training in Newburgh.", tag:"Team" },
];
const SCHEDULE = [
  { id:1, date:"Jun 13", time:"", opponent:"Static 2035 (Unity 2035-Bryant)", away:true, location:"", type:"Game", result:"L 4-14" },
  { id:2, date:"Jun 13", time:"", opponent:"Kentucky Chrome 2035 8U", away:true, location:"", type:"Game", result:"L 1-13" },
  { id:3, date:"Jun 13", time:"", opponent:"Static 2035 (Unity 2035-Bryant)", away:false, location:"", type:"Game", result:"L 1-9" },
  { id:4, date:"Jun 13", time:"", opponent:"Diamond Queens 8U", away:true, location:"", type:"Game", result:"L 5-13" },
  { id:5, date:"May 31", time:"", opponent:"Extreme 8u", away:true, location:"", type:"Game", result:"L 5-12" },
  { id:6, date:"May 31", time:"", opponent:"Newburgh Nitro 8U", away:true, location:"", type:"Game", result:"W 13-6" },
  { id:7, date:"May 31", time:"", opponent:"Extreme 8u", away:false, location:"", type:"Game", result:"L 7-14" },
  { id:8, date:"May 31", time:"", opponent:"Newburgh Nitro 8U", away:true, location:"", type:"Game", result:"W 15-11" },
  { id:9, date:"May 23", time:"", opponent:"KY Freedom 8U - 2035", away:true, location:"", type:"Game", result:"L 1-6" },
  { id:10, date:"May 23", time:"", opponent:"BB Bulldogs 2035", away:false, location:"", type:"Game", result:"L 4-9" },
  { id:11, date:"May 23", time:"", opponent:"PV Elite 8U Navy", away:true, location:"", type:"Game", result:"W 13-6" },
  { id:12, date:"May 3", time:"", opponent:"Esprit Metro 8U", away:true, location:"", type:"Game", result:"L 14-15" },
  { id:13, date:"May 3", time:"", opponent:"Forsyth fire 8u", away:true, location:"", type:"Game", result:"W 22-4" },
  { id:14, date:"May 3", time:"", opponent:"8U BWSA (2017)", away:false, location:"", type:"Game", result:"W 16-1" },
  { id:15, date:"May 2", time:"", opponent:"Metro East Blaze 2036 7U", away:false, location:"", type:"Game", result:"W 20-8" },
  { id:16, date:"May 2", time:"", opponent:"Blitz 8U", away:true, location:"", type:"Game", result:"L 18-19" },
  { id:17, date:"May 2", time:"", opponent:"Lady Roughnecks 8U", away:true, location:"", type:"Game", result:"L 6-8" },
  { id:18, date:"Apr 26", time:"", opponent:"Newburgh Nitro 8U", away:true, location:"", type:"Game", result:"L 9-12" },
  { id:19, date:"Apr 26", time:"", opponent:"Hawks 8u", away:true, location:"", type:"Game", result:"W 9-7" },
  { id:20, date:"Apr 25", time:"", opponent:"Extreme 8u", away:true, location:"", type:"Game", result:"W 9-7" },
  { id:21, date:"Apr 25", time:"", opponent:"Craze 8u Oneal 8U", away:true, location:"", type:"Game", result:"L 7-8" },
  { id:22, date:"Apr 25", time:"", opponent:"Hawks 8u", away:false, location:"", type:"Game", result:"L 0-11" },
  { id:23, date:"Apr 19", time:"", opponent:"Newburgh Nitro 8U", away:true, location:"", type:"Game", result:"L 7-11" },
  { id:24, date:"Apr 19", time:"", opponent:"Craze 8u Oneal 8U", away:true, location:"", type:"Game", result:"W 12-2" },
  { id:25, date:"Apr 18", time:"", opponent:"Diamond Queens 8U", away:true, location:"", type:"Game", result:"W 28-19" },
  { id:26, date:"Apr 18", time:"", opponent:"Craze 8u Oneal 8U", away:false, location:"", type:"Game", result:"L 18-23" },
  { id:27, date:"Apr 11", time:"", opponent:"Extreme 8u", away:true, location:"", type:"Game", result:"L 10-14" },
  { id:28, date:"Apr 11", time:"", opponent:"Lady Bee's 8U", away:false, location:"", type:"Game", result:"W 14-0" },
  { id:29, date:"Apr 11", time:"", opponent:"Ruckus 8U", away:false, location:"", type:"Game", result:"W 18-2" },
  { id:30, date:"Apr 11", time:"", opponent:"Lady Bee's 8U", away:false, location:"", type:"Game", result:"W 15-5" },
  { id:31, date:"Oct 25", time:"", opponent:"Craze 8U", away:true, location:"", type:"Game", result:"W 13-9" },
  { id:32, date:"Oct 25", time:"", opponent:"Orange Crush 8U", away:false, location:"", type:"Game", result:"W 18-11" },
  { id:33, date:"Oct 25", time:"", opponent:"Chargers 8U", away:false, location:"", type:"Game", result:"W 14-3" },
  { id:34, date:"Oct 25", time:"", opponent:"Kentucky Klutch 2035 8U", away:true, location:"", type:"Game", result:"W 19-8" },
  { id:35, date:"Oct 25", time:"", opponent:"Chargers 8U", away:true, location:"", type:"Game", result:"W 24-3" },
  { id:36, date:"Oct 25", time:"", opponent:"Blue Chip Athletics 7u - Williams", away:false, location:"", type:"Game", result:"W 20-9" },
  { id:37, date:"Oct 4", time:"", opponent:"Newburgh Nitro 8U", away:false, location:"", type:"Game", result:"L 3-15" },
  { id:38, date:"Oct 4", time:"", opponent:"Newburgh Nitro 8U", away:false, location:"", type:"Game", result:"W 14-6" },
  { id:39, date:"Oct 4", time:"", opponent:"Extreme 8u", away:true, location:"", type:"Game", result:"W 16-9" },
  { id:40, date:"Sep 14", time:"", opponent:"Kentucky Chrome 2035 8U", away:true, location:"", type:"Game", result:"L 5-12" },
  { id:41, date:"Sep 14", time:"", opponent:"Diamond Queens 8U", away:false, location:"", type:"Game", result:"W 19-11" },
  { id:42, date:"Sep 13", time:"", opponent:"Craze", away:true, location:"", type:"Game", result:"T 16-16" },
  { id:43, date:"Sep 13", time:"", opponent:"Newburgh Nitro 8U", away:true, location:"", type:"Game", result:"W 23-16" },
  { id:44, date:"Sep 13", time:"", opponent:"Kentucky Klutch 2035 8U", away:false, location:"", type:"Game", result:"W 15-5" },
];

function getRecord(){
  const r = SCHEDULE.filter(s=>s.result);
  const w = r.filter(s=>s.result.startsWith("W")).length;
  const l = r.filter(s=>s.result.startsWith("L")).length;
  const t = r.filter(s=>s.result.startsWith("T")).length;
  const pct = (w+l) ? Math.round(w/(w+l)*100) : 0;
  return { w, l, t, pct };
}
const PLAYERS = [
  { id:1, name:"Stella Stephens", number:0, back:"Stephens", email:"", paid:false },
  { id:2, name:"June Johnson", number:2, back:"J. Johnson", email:"", paid:false },
  { id:3, name:"Evelyn Peluchette", number:3, back:"E. Peluchette", email:"", paid:false },
  { id:4, name:"Amelia Duncan", number:10, back:"Duncan", email:"", paid:false },
  { id:5, name:"Violet Speicher", number:11, back:"Speicher", email:"", paid:false },
  { id:6, name:"Avery Jenkins", number:12, back:"Jenkins", email:"", paid:false },
  { id:7, name:"Adlee Heinz", number:14, back:"Heinz", email:"", paid:false },
  { id:8, name:"Braelyn Creek", number:18, back:"Creek", email:"", paid:false },
  { id:9, name:"Zailee Johnson", number:21, back:"Z. Johnson", email:"", paid:false },
  { id:10, name:"Everly Briggs", number:23, back:"Briggs", email:"", paid:false },
  { id:11, name:"Veronica Peluchette", number:28, back:"V. Peluchette", email:"", paid:false },
  { id:12, name:"Brynlee Maddle", number:88, back:"Maddle", email:"", paid:false },
];
const BILLING = [
  { id:1, desc:"Spring Season Fee",  amount:0, due:"Mar 1",  notes:"Covers uniforms, tournament entry, field fees" },
  { id:2, desc:"Tournament Package", amount:0, due:"Apr 15", notes:"State qualifier + 2 invitational tournaments" },
  { id:3, desc:"Equipment Fund",     amount:0,  due:"Mar 1",  notes:"Shared helmets, catcher gear, bases" },
  { id:4, desc:"Team Apparel",       amount:0, due:"Mar 15", notes:"Practice shirts, sweatshirt, bag" },
];
const FUNDRAISERS = [
  { id:1, name:"Cookie Dough Sale", goal:3000, raised:1240, end:"Jul 15", status:"Active" },
  { id:2, name:"Car Wash",          goal:800,  raised:800,  end:"May 20", status:"Complete" },
  { id:3, name:"Team Raffle",       goal:1500, raised:550,  end:"Aug 1",  status:"Active" },
];
const TRYOUT_INFO = {
  dates: ["Tuesday, July 14, 2026 — 5:30 PM"],
  location: "Newburgh Girls Softball — Field 1",
  ageGroup: "9U — birthdate after Sept 1, 2016",
  whatToBring: ["Cleats & glove", "Bat & batting helmet", "Water bottle", "Ready-to-play attitude"],
  coaches: [
    { name:"Eric Briggs", role:"Head Coach", phone:"812-249-0564" },
    { name:"Andrew Johnson", role:"Coach", phone:"812-480-0909" },
    { name:"Trent Creek", role:"Coach", phone:"812-306-4890" },
  ],
  program: [
    "Experienced coaching staff devoted to player development & team building",
    "Estimated tourney schedule: 3 fall and 8 spring/summer",
    "Prefer to play local — only 1 or 2 overnight tournaments",
    "Membership to The Yard indoor training facility included for the team",
    "The Yard also used for winter training in Newburgh",
  ],
  note: "Text or call with any questions or scheduling conflicts. Private tryouts available.",
};
const DRILLS = [
  { title:"Tee Work",          skill:"Hitting",      desc:"Set a batting tee (or a cone or bucket) in the yard and hit into a fence or net. 3 sets of 10 — keep a level swing and watch the ball all the way to the tee.", time:"15 min", video:"https://www.youtube.com/watch?v=_TICurMOZzo" },
  { title:"Mirror Swings",     skill:"Hitting",      desc:"Take slow swings in front of a mirror with no ball. Check your stance, grip, and full follow-through. Builds muscle memory anywhere.", time:"10 min", video:"https://www.youtube.com/watch?v=tHgIGsBkODo" },
  { title:"Wall Ball Grounders", skill:"Fielding",   desc:"Throw a tennis or rubber ball against a wall and field the grounder that comes back. Stay low, glove out front, two hands. 25 reps.", time:"10 min", video:"https://www.youtube.com/watch?v=2JjLfgZewkI" },
  { title:"Short Hops",        skill:"Fielding",     desc:"Bounce a ball off a wall (or have a parent toss it) and field the short hop. Soft hands — give a little as you catch. 20 reps.", time:"10 min", video:"https://www.youtube.com/watch?v=nuvMnJ3RA3U" },
  { title:"Pop-Up Catches",    skill:"Fielding",     desc:"Toss the ball straight up and catch it above your forehead with two hands. Call 'Ball!' every time. 15 catches.", time:"8 min", video:"https://www.youtube.com/watch?v=tvjqlF0o5Fk" },
  { title:"Wrist Flips",       skill:"Throwing",     desc:"On one knee about 10 feet from a wall, flip the ball using only your wrist. Look for clean backspin and a straight line. 20 reps.", time:"8 min", video:"https://www.youtube.com/watch?v=uqbF3nIMKAE" },
  { title:"Crow Hop Throws",   skill:"Throwing",     desc:"Crow hop and throw into a net, fence, or to a parent. Step toward your target and follow through across your body. 15 throws.", time:"10 min", video:"https://www.youtube.com/watch?v=leDIjfC1ib8" },
  { title:"Quick-Feet Ladder", skill:"Conditioning", desc:"Make a chalk or tape ladder on the driveway. Two feet in each box, then in-and-out. Builds the quick first step for fielding and base running.", time:"10 min", video:"https://www.youtube.com/watch?v=Kb0bfAGiub8" },
  { title:"Base Running",      skill:"Conditioning", desc:"Sprint a hard run-through past first base, then practice a banana turn around a cone toward second. 6 sprints at full speed.", time:"10 min", video:"https://www.youtube.com/watch?v=Hy5eE4Ac2mk" },
];
const TABS = [
  { id:"home",     label:"Home",     ch:"H" },
  { id:"schedule", label:"Schedule", ch:"S" },
  { id:"scores",   label:"Scores",   ch:"G" },
  { id:"roster",   label:"Roster",   ch:"R" },
  { id:"tryouts",  label:"Tryouts",  ch:"T" },
  { id:"billing",  label:"Billing",  ch:"B" },
  { id:"drills",   label:"Drills",   ch:"D" },
  { id:"contact",  label:"Contact",  ch:"C" },
];

// ══ HOOKS ═════════════════════════════════════════════════════════════════════
function useWide(){
  const [w,setW] = useState(typeof window!=="undefined" ? window.innerWidth : 1200);
  useEffect(()=>{ const f=()=>setW(window.innerWidth); window.addEventListener("resize",f); return ()=>window.removeEventListener("resize",f); },[]);
  return w >= 900;
}
function useCountUp(target, dur=950){
  const [v,setV] = useState(0);
  useEffect(()=>{
    let raf; const start = performance.now();
    const tick = (t)=>{ const p = Math.min(1,(t-start)/dur); setV(Math.round(target*(1-Math.pow(1-p,3)))); if(p<1) raf=requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    const fb = setTimeout(()=>setV(target), dur+300); // ensure final value even if rAF is throttled
    return ()=>{ cancelAnimationFrame(raf); clearTimeout(fb); };
  },[target,dur]);
  return v;
}

// ══ PRIMITIVES ════════════════════════════════════════════════════════════════
const Tag = ({ children, bg=C.cyan, fg=C.bg0 }) => (
  <span style={{ display:"inline-block", transform:"skewX(-10deg)", background:bg, color:fg,
    padding:"3px 11px", fontFamily:F.b, fontWeight:800, fontSize:11, letterSpacing:1.3,
    textTransform:"uppercase", whiteSpace:"nowrap" }}>
    <span style={{ display:"inline-block", transform:"skewX(10deg)" }}>{children}</span>
  </span>
);
function Panel({ children, style, onClick, hover }){
  const [h,setH] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ background:C.bg2, border:`1px solid ${h&&hover?C.lineStr:C.line}`, borderRadius:14,
        padding:"18px 20px", transition:"transform .2s, box-shadow .2s, border-color .2s",
        transform: h&&hover ? "translateY(-3px)" : "none",
        boxShadow: h&&hover ? "0 14px 34px rgba(0,0,0,.45)" : "0 2px 10px rgba(0,0,0,.25)",
        cursor: onClick ? "pointer" : "default", ...style }}>
      {children}
    </div>
  );
}
const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom:22 }}>
    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
      <div style={{ width:7, height:32, background:`linear-gradient(${C.cyanBright}, ${C.iceDeep})`, transform:"skewX(-12deg)", flexShrink:0 }} />
      <h2 style={{ fontFamily:F.d, fontSize:"clamp(26px,5vw,38px)", lineHeight:.92, letterSpacing:.5,
        fontStyle:"italic", textTransform:"uppercase", color:C.white, margin:0 }}>{children}</h2>
    </div>
    {sub && <div style={{ fontFamily:F.b, color:C.muted, fontSize:13.5, marginTop:9, marginLeft:21, letterSpacing:.2 }}>{sub}</div>}
  </div>
);
const StatTile = ({ value, label, accent }) => (
  <div style={{ flex:1, minWidth:0, background:C.bg2, border:`1px solid ${C.line}`, borderRadius:12,
    padding:"16px 14px", position:"relative", overflow:"hidden" }}>
    <div style={{ position:"absolute", top:0, left:0, width:"100%", height:3, background:accent||C.cyan }} />
    <div style={{ fontFamily:F.d, fontSize:"clamp(32px,6vw,46px)", lineHeight:.85, color:C.white }}>{value}</div>
    <div style={{ fontFamily:F.b, fontWeight:700, fontSize:10.5, letterSpacing:1.5, color:C.muted, textTransform:"uppercase", marginTop:7 }}>{label}</div>
  </div>
);
function Button({ children, onClick, full, style }){
  const [h,setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
        width: full?"100%":"auto", padding:"14px 28px", border:"none", cursor:"pointer",
        background: h?C.cyanBright:C.cyan, color:C.bg0, fontFamily:F.b, fontWeight:900, fontSize:15,
        letterSpacing:1, textTransform:"uppercase", borderRadius:10, transition:"all .15s",
        boxShadow: h?"0 10px 26px rgba(52,180,232,.4)":"none", ...style }}>
      {children}
    </button>
  );
}
const Chip = ({ active, onClick, children }) => (
  <button onClick={onClick}
    style={{ padding:"8px 17px", border:`1px solid ${active?C.cyan:C.line}`, cursor:"pointer",
      background: active?C.cyan:"transparent", color: active?C.bg0:C.muted,
      fontFamily:F.b, fontWeight:800, fontSize:12.5, letterSpacing:1, textTransform:"uppercase",
      borderRadius:8, transition:"all .15s" }}>
    {children}
  </button>
);
const NavGlyph = ({ ch, active }) => (
  <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center",
    width:28, height:28, transform:"skewX(-10deg)", borderRadius:7, flexShrink:0,
    background: active?C.cyan:C.bg3, transition:"background .15s",
    boxShadow: active?"0 4px 14px rgba(52,180,232,.45)":"none" }}>
    <span style={{ transform:"skewX(10deg)", fontFamily:F.d, fontSize:14, lineHeight:1, color: active?C.bg0:C.muted }}>{ch}</span>
  </span>
);
function ProgressBar({ raised, goal }){
  const pct = Math.min(100, Math.round((raised/goal)*100));
  const done = pct===100;
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:7 }}>
        <span style={{ fontFamily:F.d, fontSize:20, color: done?C.green:C.cyan }}>${raised.toLocaleString()}</span>
        <span style={{ fontFamily:F.b, fontSize:12, color:C.muted, fontWeight:600 }}>of ${goal.toLocaleString()} · {pct}%</span>
      </div>
      <div style={{ background:C.bg1, borderRadius:20, height:9, overflow:"hidden", border:`1px solid ${C.line}` }}>
        <div style={{ width:`${pct}%`, height:"100%", borderRadius:20, transition:"width .8s ease",
          background: done?`linear-gradient(90deg,${C.green},#10b981)`:`linear-gradient(90deg,${C.iceDeep},${C.cyanBright})` }} />
      </div>
    </div>
  );
}
// shared form field (module scope so inputs never lose focus on re-render)
const fieldBase = (f)=>({ width:"100%", padding:"12px 14px", borderRadius:10, marginTop:7,
  background:C.bg1, border:`1.5px solid ${f?C.cyan:C.line}`, color:C.white, fontFamily:F.b,
  fontSize:15, outline:"none", transition:"border-color .15s" });
function Field({ label, value, onChange, placeholder, type="text", multiline, rows=4 }){
  const [f,setF] = useState(false);
  return (
    <div style={{ marginBottom:14 }}>
      <label style={{ fontFamily:F.b, fontSize:11, fontWeight:800, letterSpacing:1.3, textTransform:"uppercase", color:C.ice }}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
            onFocus={()=>setF(true)} onBlur={()=>setF(false)}
            style={{ ...fieldBase(f), resize:"vertical", fontFamily:F.b }} />
        : <input type={type} value={value} onChange={onChange} placeholder={placeholder}
            onFocus={()=>setF(true)} onBlur={()=>setF(false)} style={fieldBase(f)} />}
    </div>
  );
}
// diagonal speed streaks echoing the logo
const Streaks = ({ opacity=1 }) => (
  <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", opacity }}>
    {[0,1,2,3].map(i=>(
      <div key={i} style={{ position:"absolute", right:-60, top:24+i*42, width:300, height:9,
        transform:"skewX(-22deg)", borderRadius:6,
        background:`linear-gradient(90deg, transparent, ${C.cyan})`, opacity:0.16-i*0.03 }} />
    ))}
  </div>
);

// ══ TICKER (broadcast lower-third) ════════════════════════════════════════════
function Ticker(){
  const results = SCHEDULE.filter(s=>s.result);
  const next = SCHEDULE.filter(s=>!s.result)[0];
  const rec = getRecord();
  const items = [];
  items.push({ k:"RECORD", v:`${rec.w}–${rec.l}${rec.t?`–${rec.t}`:""} · ${TEAM.season} Season`, tone:C.cyanBright });
  if(next) items.push({ k:"NEXT", v:`${next.date} · ${next.away?"@":"vs"} ${next.opponent}`, tone:C.cyanBright });
  results.slice(0,8).forEach(r=> items.push({ k: r.result.startsWith("W")?"WIN":r.result.startsWith("T")?"TIE":"LOSS", v:`${r.result} ${r.away?"@":"vs"} ${r.opponent}`, tone: r.result.startsWith("W")?C.green:r.result.startsWith("T")?C.amber:C.red }));
  items.push({ k:"TRYOUTS", v:"Tue July 14 · 5:30 PM · Newburgh Girls Softball, Field 1 · Register now", tone:C.cyan });
  const Row = () => (
    <div style={{ display:"flex", alignItems:"center", flexShrink:0 }}>
      {items.map((it,i)=>(
        <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:9, padding:"0 22px",
          fontFamily:F.b, fontSize:13, color:C.white, whiteSpace:"nowrap" }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:it.tone, flexShrink:0 }} />
          <span style={{ fontWeight:900, color:it.tone, letterSpacing:1, fontSize:11.5 }}>{it.k}</span>
          <span style={{ color:C.muted }}>{it.v}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div style={{ display:"flex", alignItems:"stretch", background:C.bg1, borderTop:`1px solid ${C.line}`,
      borderBottom:`1px solid ${C.line}`, height:42, overflow:"hidden", position:"sticky", top:0, zIndex:40 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, background:C.cyan, color:C.bg0,
        padding:"0 18px 0 16px", flexShrink:0, zIndex:2, position:"relative",
        clipPath:"polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" }}>
        <span style={{ width:8, height:8, borderRadius:"50%", background:C.bg0, animation:"pulseGlow 1.4s ease-in-out infinite" }} />
        <span style={{ fontFamily:F.b, fontWeight:900, fontSize:12, letterSpacing:1.5 }}>LATEST</span>
      </div>
      <div style={{ flex:1, overflow:"hidden", display:"flex", alignItems:"center" }}>
        <div style={{ display:"flex", animation:"tickerScroll 34s linear infinite" }}>
          <Row /><Row />
        </div>
      </div>
    </div>
  );
}

// ══ PAGES ═════════════════════════════════════════════════════════════════════
function HomePage({ setTab, wide }){
  const { w:wins, l:losses, t:ties, pct:winPct } = getRecord();
  const next = SCHEDULE.filter(s=>!s.result)[0];
  const upcoming = SCHEDULE.filter(s=>!s.result).slice(0,3);
  const W = useCountUp(wins), L = useCountUp(losses), T = useCountUp(ties), P = useCountUp(PLAYERS.length), WP = useCountUp(winPct);
  return (
    <div>
      {/* HERO */}
      <div style={{ position:"relative", overflow:"hidden", borderRadius:18, border:`1px solid ${C.line}`,
        background:C.bg1, minHeight: wide?560:430, padding: wide?"40px 44px 34px":"28px 22px 26px", marginBottom:22 }}>
        <img src="assets/team-photo.jpg" alt="" aria-hidden="true"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 36%", zIndex:0 }} />
        <div style={{ position:"absolute", inset:0, zIndex:0,
          background:`linear-gradient(180deg, rgba(6,11,20,0.66) 0%, rgba(6,11,20,0.0) 22%), linear-gradient(25deg, rgba(6,11,20,0.86) 0%, rgba(6,11,20,0.30) 26%, rgba(6,11,20,0.0) 52%)` }} />
        <Streaks />
        {/* season — top left */}
        <div style={{ position:"absolute", top: wide?28:20, left: wide?34:20, zIndex:1, maxWidth: wide?"72%":"70%",
          fontFamily:F.b, fontWeight:800, fontSize:wide?13:11, letterSpacing:wide?3:2, color:C.cyan, textShadow:"0 2px 12px rgba(0,0,0,.75)", lineHeight:1.35 }}>
          {TEAM.season} SEASON · {TEAM.level.toUpperCase()}
        </div>
        {/* record — bottom left */}
        <div style={{ position:"absolute", left: wide?34:20, bottom: wide?26:20, zIndex:1 }}>
          <div style={{ fontFamily:F.d, fontSize:wide?"74px":"56px", lineHeight:.82, fontStyle:"italic", color:C.white, textShadow:"0 4px 20px rgba(0,0,0,.65)" }}>
            {W}<span style={{ color:C.cyan }}>–</span>{L}{ties>0 && <><span style={{ color:C.cyan }}>–</span>{T}</>}
          </div>
          <div style={{ fontFamily:F.b, fontWeight:800, fontSize:11, letterSpacing:2, color:C.ice, textTransform:"uppercase", marginTop:7, textShadow:"0 2px 10px rgba(0,0,0,.75)" }}>Overall Record</div>
        </div>
      </div>

      {/* STAT TILES */}
      <div style={{ display:"flex", gap:12, marginBottom:26, flexWrap:"wrap" }}>
        <StatTile value={W} label="Wins" accent={C.green} />
        <StatTile value={L} label="Losses" accent={C.red} />
        <StatTile value={P} label="Roster" accent={C.cyan} />
        <StatTile value={SCHEDULE.filter(s=>!s.result).length} label="Upcoming" accent={C.amber} />
      </div>

      {/* NEXT GAME SCOREBUG */}
      {next && (
        <div style={{ position:"relative", overflow:"hidden", borderRadius:16, marginBottom:30,
          background:`linear-gradient(105deg, ${C.bg2}, ${C.bg1})`, border:`1px solid ${C.lineStr}` }}>
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:6, background:C.cyan }} />
          <div style={{ position:"absolute", top:0, left:"-30%", width:"40%", height:"100%",
            background:`linear-gradient(90deg, transparent, rgba(91,210,255,.10), transparent)`, animation:"sweep 4.5s ease-in-out infinite" }} />
          <div style={{ position:"relative", padding: wide?"22px 28px":"18px 20px", display:"flex",
            alignItems:"center", gap: wide?28:16, flexWrap:"wrap" }}>
            <div style={{ flexShrink:0 }}>
              <Tag>Next Up</Tag>
              <div style={{ fontFamily:F.d, fontSize:wide?52:40, lineHeight:.85, color:C.white, marginTop:10, fontStyle:"italic" }}>
                {next.date.split(" ")[0].toUpperCase()} {next.date.split(" ")[1]}
              </div>
            </div>
            <div style={{ flex:1, minWidth:160 }}>
              <div style={{ fontFamily:F.b, fontSize:12, fontWeight:700, letterSpacing:1.5, color:C.muted, textTransform:"uppercase" }}>Newburgh Ice vs</div>
              <div style={{ fontFamily:F.d, fontSize:wide?34:26, color:C.cyan, lineHeight:1, marginTop:2, fontStyle:"italic", textTransform:"uppercase" }}>{next.opponent}</div>
              <div style={{ fontFamily:F.b, fontSize:13, color:C.muted, marginTop:8 }}>{next.time} · {next.location}</div>
            </div>
            <Button onClick={()=>setTab("schedule")} style={{ flexShrink:0 }}>Full Schedule →</Button>
          </div>
        </div>
      )}

      {/* ANNOUNCEMENTS */}
      <SectionTitle sub="Team news, results, and reminders">Announcements</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns: wide?"1fr 1fr":"1fr", gap:14, marginBottom:30 }}>
        {ANNOUNCEMENTS.map(a=>{
          const tone = a.tag==="Results"?C.green : a.tag==="Tryouts"?C.amber : C.cyan;
          return (
            <Panel key={a.id} hover style={{ borderTop:`3px solid ${tone}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, marginBottom:8 }}>
                <Tag bg={tone}>{a.tag}</Tag>
                <span style={{ fontFamily:F.b, fontSize:12, color:C.mutedDk, fontWeight:600, whiteSpace:"nowrap" }}>{a.date}</span>
              </div>
              <div style={{ fontFamily:F.b, fontWeight:800, color:C.white, fontSize:17, marginBottom:6 }}>{a.title}</div>
              <div style={{ fontFamily:F.b, fontSize:14, color:C.muted, lineHeight:1.6 }}>{a.body}</div>
            </Panel>
          );
        })}
      </div>

      {/* UPCOMING */}
      <SectionTitle>Upcoming Events</SectionTitle>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        <Panel hover onClick={()=>setTab("tryouts")} style={{ padding:"0", overflow:"hidden", display:"flex", alignItems:"stretch", cursor:"pointer" }}>
          <div style={{ width:6, background:C.cyan, flexShrink:0 }} />
          <div style={{ display:"flex", alignItems:"center", gap:16, padding:"14px 18px", flex:1, minWidth:0 }}>
            <div style={{ textAlign:"center", flexShrink:0, minWidth:54 }}>
              <div style={{ fontFamily:F.b, fontSize:11, fontWeight:800, letterSpacing:1.5, color:C.cyan, textTransform:"uppercase" }}>Jul</div>
              <div style={{ fontFamily:F.d, fontSize:30, lineHeight:.85, color:C.white }}>14</div>
            </div>
            <div style={{ width:1, alignSelf:"stretch", background:C.line }} />
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:F.d, fontSize:19, color:C.white, fontStyle:"italic", textTransform:"uppercase", lineHeight:1 }}>9U Tryouts</div>
              <div style={{ fontFamily:F.b, fontSize:13, color:C.muted, marginTop:5 }}>Tue · 5:30 PM · Newburgh Girls Softball, Field 1</div>
            </div>
            <Tag bg={C.cyan} fg={C.bg0}>Register</Tag>
          </div>
        </Panel>
        {upcoming.map(e=> <EventRow key={e.id} e={e} />)}
      </div>
    </div>
  );
}

function EventRow({ e }){
  const isW = e.result?.startsWith("W");
  const dateColor = e.result ? (isW?C.green:C.red) : C.cyan;
  const typeTone = e.type==="Practice"?C.muted : e.type==="Tournament"?C.amber : C.cyan;
  return (
    <Panel hover style={{ padding:"0", overflow:"hidden", display:"flex", alignItems:"stretch" }}>
      <div style={{ width:6, background:dateColor, flexShrink:0 }} />
      <div style={{ display:"flex", alignItems:"center", gap:16, padding:"14px 18px", flex:1, minWidth:0 }}>
        <div style={{ textAlign:"center", flexShrink:0, minWidth:54 }}>
          <div style={{ fontFamily:F.b, fontSize:11, fontWeight:800, letterSpacing:1.5, color:C.muted, textTransform:"uppercase" }}>{e.date.split(" ")[0]}</div>
          <div style={{ fontFamily:F.d, fontSize:30, lineHeight:.85, color:C.white }}>{e.date.split(" ")[1]}</div>
        </div>
        <div style={{ width:1, alignSelf:"stretch", background:C.line }} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:F.d, fontSize:19, color:C.white, fontStyle:"italic", textTransform:"uppercase", lineHeight:1 }}>
            {e.type==="Practice" ? "Team Practice" : e.opponent ? `${e.away ? "@" : "vs"} ${e.opponent}` : "TBD"}
          </div>
          <div style={{ fontFamily:F.b, fontSize:13, color:C.muted, marginTop:5 }}>{[e.time, e.location].filter(Boolean).join(" · ") || (e.away ? "Away game" : "Home game")}</div>
        </div>
        <div style={{ flexShrink:0 }}>
          {e.result
            ? <div style={{ fontFamily:F.d, fontSize:26, fontStyle:"italic", color: isW?C.green:C.red }}>{e.result}</div>
            : <Tag bg={typeTone} fg={e.type==="Practice"?C.white:C.bg0}>{e.type}</Tag>}
        </div>
      </div>
    </Panel>
  );
}

function SchedulePage(){
  const [filter,setFilter] = useState("All");
  const types = ["All","Game","Tournament","Practice"];
  const upcoming = SCHEDULE.filter(s=>!s.result);
  const past = SCHEDULE.filter(s=>s.result);
  const apply = list => filter==="All" ? list : list.filter(s=>s.type===filter);
  return (
    <div>
      <SectionTitle sub="Games, tournaments, and practices">Season Schedule</SectionTitle>
      <div style={{ display:"flex", gap:9, marginBottom:24, flexWrap:"wrap" }}>
        {types.map(t=> <Chip key={t} active={filter===t} onClick={()=>setFilter(t)}>{t}</Chip>)}
      </div>
      <div style={{ fontFamily:F.b, fontSize:11, fontWeight:900, letterSpacing:2.5, color:C.cyan, marginBottom:12 }}>UPCOMING</div>
      <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:30 }}>
        {apply(upcoming).map(e=> <EventRow key={e.id} e={e} />)}
        {apply(upcoming).length===0 && <p style={{ color:C.muted, fontFamily:F.b }}>No upcoming events.</p>}
      </div>
      <div style={{ fontFamily:F.b, fontSize:11, fontWeight:900, letterSpacing:2.5, color:C.muted, marginBottom:12 }}>PAST RESULTS</div>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {apply(past).map(e=> <EventRow key={e.id} e={e} />)}
        {apply(past).length===0 && <p style={{ color:C.muted, fontFamily:F.b }}>No results yet.</p>}
      </div>
    </div>
  );
}

function RosterPage({ wide }){
  const [selected,setSelected] = useState(null);
  const [search,setSearch] = useState("");
  const q = search.toLowerCase();
  const filtered = PLAYERS.filter(p=> p.name.toLowerCase().includes(q) || String(p.number).includes(q));
  if(selected){
    const p = PLAYERS.find(x=>x.id===selected);
    return (
      <div>
        <button onClick={()=>setSelected(null)} style={{ background:"none", border:"none", color:C.cyan,
          fontFamily:F.b, fontWeight:800, fontSize:13, letterSpacing:1, textTransform:"uppercase",
          cursor:"pointer", marginBottom:18, padding:0 }}>← Back to Roster</button>
        <Panel style={{ padding:0, overflow:"hidden" }}>
          <div style={{ position:"relative", overflow:"hidden", padding: wide?"30px 32px":"24px 22px",
            background:`linear-gradient(120deg, ${C.bg3}, ${C.bg1})`, display:"flex", alignItems:"center", gap:wide?26:18 }}>
            <Streaks opacity={0.7} />
            <div style={{ position:"relative", zIndex:1, width:wide?100:80, height:wide?100:80, flexShrink:0,
              transform:"skewX(-8deg)", background:`linear-gradient(140deg, ${C.cyan}, ${C.iceDeep})`,
              display:"flex", alignItems:"center", justifyContent:"center", borderRadius:14, boxShadow:"0 8px 24px rgba(52,180,232,.4)" }}>
              <span style={{ transform:"skewX(8deg)", fontFamily:F.d, fontSize:wide?48:38, color:C.bg0, lineHeight:1 }}>{p.number}</span>
            </div>
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontFamily:F.d, fontSize:wide?38:28, color:C.white, fontStyle:"italic", textTransform:"uppercase", lineHeight:.95 }}>{p.name}</div>
              <div style={{ fontFamily:F.b, fontSize:14, color:C.cyan, fontWeight:700, letterSpacing:1, marginTop:6 }}>Jersey #{p.number}</div>
            </div>
          </div>
          <div style={{ padding: wide?"24px 32px 28px":"20px 22px 24px" }}>
            <div style={{ display:"grid", gridTemplateColumns:wide?"repeat(2,1fr)":"1fr", gap:10 }}>
              {[["Jersey #","#"+p.number]].map(([k,v])=>(
                <div key={k} style={{ background:C.bg1, border:`1px solid ${C.line}`, borderRadius:10, padding:"12px 14px" }}>
                  <div style={{ fontFamily:F.b, fontSize:10, fontWeight:800, letterSpacing:1.5, color:C.muted, textTransform:"uppercase" }}>{k}</div>
                  <div style={{ fontFamily:F.b, fontWeight:700, fontSize: k==="Parent Email"?13:18, color:C.white, marginTop:4, wordBreak:"break-all" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    );
  }
  return (
    <div>
      <SectionTitle sub={`${PLAYERS.length} players · Newburgh Ice`}>Player Roster</SectionTitle>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or number…"
        style={{ width:"100%", padding:"13px 16px", borderRadius:11, background:C.bg1,
          border:`1.5px solid ${C.line}`, color:C.white, fontFamily:F.b, fontSize:15, outline:"none", marginBottom:18 }} />
      <div style={{ display:"grid", gridTemplateColumns: wide?"repeat(auto-fill,minmax(280px,1fr))":"1fr", gap:13 }}>
        {filtered.map(p=>(
          <Panel key={p.id} hover onClick={()=>setSelected(p.id)} style={{ display:"flex", alignItems:"center", gap:15 }}>
            <div style={{ width:52, height:52, flexShrink:0, transform:"skewX(-8deg)",
              background:`linear-gradient(140deg, ${C.bg3}, ${C.bg1})`, border:`1px solid ${C.lineStr}`,
              display:"flex", alignItems:"center", justifyContent:"center", borderRadius:11 }}>
              <span style={{ transform:"skewX(8deg)", fontFamily:F.d, fontSize:24, color:C.cyan, lineHeight:1 }}>{p.number}</span>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:F.b, fontWeight:800, fontSize:16, color:C.white }}>{p.name}</div>
            </div>
          </Panel>
        ))}
      </div>
      {filtered.length===0 && <p style={{ color:C.muted, fontFamily:F.b, marginTop:16 }}>No players match “{search}”.</p>}
    </div>
  );
}

function TryoutsPage({ wide }){
  return (
    <div>
      <SectionTitle sub="Newburgh Ice 9U — new season tryouts">Tryouts</SectionTitle>
      <div style={{ position:"relative", overflow:"hidden", borderRadius:16, marginBottom:18,
        background:`linear-gradient(120deg, ${C.bg3}, ${C.bg1})`, border:`1px solid ${C.lineStr}`, padding: wide?"28px 32px":"22px 22px" }}>
        <Streaks />
        <div style={{ position:"relative", zIndex:1 }}>
          <Tag>Tryout Dates</Tag>
          <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:8 }}>
            {TRYOUT_INFO.dates.map((d,i)=>(
              <div key={i} style={{ fontFamily:F.d, fontSize:wide?24:19, color:C.white, fontStyle:"italic", lineHeight:1.05 }}>{d}</div>
            ))}
          </div>
          <div style={{ display:"flex", gap:wide?28:16, flexWrap:"wrap", marginTop:18 }}>
            {[["Location",TRYOUT_INFO.location],["Age Group",TRYOUT_INFO.ageGroup]].map(([k,v])=>(
              <div key={k}>
                <div style={{ fontFamily:F.b, fontSize:10.5, fontWeight:800, letterSpacing:1.5, color:C.cyan, textTransform:"uppercase" }}>{k}</div>
                <div style={{ fontFamily:F.b, fontSize:14, color:C.ice, marginTop:3, fontWeight:600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns: wide?"1fr 1fr":"1fr", gap:14, marginBottom:14 }}>
        <Panel>
          <div style={{ fontFamily:F.d, fontSize:20, color:C.white, fontStyle:"italic", textTransform:"uppercase", marginBottom:14 }}>Coaching Staff</div>
          {TRYOUT_INFO.coaches.map((c,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:10, marginBottom:12 }}>
              <div>
                <div style={{ fontFamily:F.b, fontSize:14.5, fontWeight:700, color:C.white }}>{c.name}</div>
                <div style={{ fontFamily:F.b, fontSize:11, color:C.cyan, fontWeight:800, letterSpacing:1, textTransform:"uppercase", marginTop:2 }}>{c.role}</div>
              </div>
              <a href={`tel:${c.phone.replace(/[^0-9]/g,"")}`} style={{ fontFamily:F.b, fontSize:14, color:C.ice, textDecoration:"none", fontWeight:600, whiteSpace:"nowrap" }}>{c.phone}</a>
            </div>
          ))}
        </Panel>
        <Panel>
          <div style={{ fontFamily:F.d, fontSize:20, color:C.white, fontStyle:"italic", textTransform:"uppercase", marginBottom:14 }}>What to Bring</div>
          {TRYOUT_INFO.whatToBring.map((item,i)=>(
            <div key={i} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10 }}>
              <span style={{ color:C.cyan, fontFamily:F.d, fontSize:16 }}>✓</span>
              <span style={{ fontFamily:F.b, fontSize:14.5, color:C.muted }}>{item}</span>
            </div>
          ))}
        </Panel>
      </div>

      <Panel style={{ marginBottom:14 }}>
        <div style={{ fontFamily:F.d, fontSize:20, color:C.white, fontStyle:"italic", textTransform:"uppercase", marginBottom:14 }}>Program & Season</div>
        {TRYOUT_INFO.program.map((item,i)=>(
          <div key={i} style={{ display:"flex", gap:11, alignItems:"flex-start", marginBottom:10 }}>
            <span style={{ color:C.cyan, fontFamily:F.d, fontSize:17, lineHeight:1.1 }}>›</span>
            <span style={{ fontFamily:F.b, fontSize:14.5, color:C.muted, lineHeight:1.55 }}>{item}</span>
          </div>
        ))}
      </Panel>

      <div style={{ fontFamily:F.b, fontSize:13.5, color:C.ice, lineHeight:1.6, marginBottom:30, padding:"0 2px" }}>
        {TRYOUT_INFO.note}
      </div>

      <SectionTitle>Register</SectionTitle>
      <Panel style={{ maxWidth:560, textAlign:"center", padding:"32px 24px" }}>
        <div style={{ fontFamily:F.b, fontSize:14.5, color:C.muted, lineHeight:1.6, marginBottom:18 }}>
          Complete the tryout registration form to reserve your player's spot — it only takes a minute.
        </div>
        <Button full onClick={()=>{ window.location.href="/tryout-signup.html"; }} style={{ marginTop:4 }}>Register for Tryouts →</Button>
      </Panel>
    </div>
  );
}

function BillingPage({ wide }){
  return (
    <div>
      <SectionTitle sub="Fundraising and team updates">Team Billing</SectionTitle>
      <Panel style={{ textAlign:"center", padding:"40px 24px", marginBottom:30 }}>
        <div style={{ fontFamily:F.d, fontSize:34, color:C.cyan, fontStyle:"italic", textTransform:"uppercase", letterSpacing:1 }}>No Fees at This Time</div>
        <div style={{ fontFamily:F.b, fontSize:14, color:C.muted, marginTop:8 }}>There are currently no team fees or balances — any future costs will be posted here.</div>
      </Panel>

      <SectionTitle>Fundraisers</SectionTitle>
      <Panel style={{ textAlign:"center", padding:"40px 24px" }}>
        <div style={{ fontFamily:F.d, fontSize:34, color:C.cyan, fontStyle:"italic", textTransform:"uppercase", letterSpacing:1 }}>TBA</div>
        <div style={{ fontFamily:F.b, fontSize:14, color:C.muted, marginTop:8 }}>Fundraisers will be announced soon — check back here for details.</div>
      </Panel>
    </div>
  );
}

function DrillsPage({ wide }){
  const skills = ["All", ...new Set(DRILLS.map(d=>d.skill))];
  const [filter,setFilter] = useState("All");
  const tone = s => s==="Hitting"?C.amber : s==="Fielding"?C.cyan : C.green;
  return (
    <div>
      <SectionTitle sub="At-home drills players can do on their own">Drills</SectionTitle>
      <div style={{ display:"flex", gap:9, marginBottom:24, flexWrap:"wrap" }}>
        {skills.map(s=> <Chip key={s} active={filter===s} onClick={()=>setFilter(s)}>{s}</Chip>)}
      </div>
      <div style={{ display:"grid", gridTemplateColumns: wide?"1fr 1fr":"1fr", gap:14 }}>
        {DRILLS.filter(d=>filter==="All"||d.skill===filter).map((d,i)=>(
          <Panel key={i} hover style={{ display:"flex", alignItems:"stretch", gap:0, padding:0, overflow:"hidden" }}>
            <div style={{ width:6, background:tone(d.skill), flexShrink:0 }} />
            <div style={{ padding:"18px 20px", flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, marginBottom:8 }}>
                <div style={{ fontFamily:F.d, fontSize:21, color:C.white, fontStyle:"italic", textTransform:"uppercase", lineHeight:.95 }}>{d.title}</div>
                <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                  <Tag bg={tone(d.skill)}>{d.skill}</Tag>
                  <Tag bg={C.bg3} fg={C.ice}>{d.time}</Tag>
                </div>
              </div>
              <div style={{ fontFamily:F.b, fontSize:14, color:C.muted, lineHeight:1.65 }}>{d.desc}</div>
              {d.video && (
                <a href={d.video} target="_blank" rel="noopener noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:7, marginTop:13, fontFamily:F.b, fontWeight:800, fontSize:12.5, letterSpacing:.4, color:C.cyan, textDecoration:"none" }}>
                  <span style={{ fontSize:11 }}>▶</span> Watch on YouTube
                </a>
              )}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function ContactPage({ wide }){
  const [sent,setSent] = useState(false);
  const [msg,setMsg] = useState({ name:"", email:"", subject:"", body:"" });
  const set = k => e => setMsg({ ...msg, [k]:e.target.value });
  const send = () => {
    if(!msg.name||!msg.email||!msg.body) return alert("Please fill in all required fields.");
    const data = new URLSearchParams({ "form-name":"contact", ...msg });
    fetch("/", { method:"POST", headers:{ "Content-Type":"application/x-www-form-urlencoded" }, body:data.toString() })
      .then(()=>setSent(true))
      .catch(()=>alert("Sorry, something went wrong. Please email eric@yardnewburgh.com."));
  };
  return (
    <div>
      <SectionTitle sub="Reach the coaching staff">Contact</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns: wide?"1fr 1.3fr":"1fr", gap:16 }}>
        <div style={{ position:"relative", overflow:"hidden", borderRadius:16,
          background:`linear-gradient(140deg, ${C.bg3}, ${C.bg1})`, border:`1px solid ${C.lineStr}`, padding:"26px 26px" }}>
          <Streaks />
          <div style={{ position:"relative", zIndex:1 }}>
            <Tag>Head Coach</Tag>
            <div style={{ fontFamily:F.d, fontSize:32, color:C.white, fontStyle:"italic", textTransform:"uppercase", margin:"12px 0 18px" }}>{TEAM.coach}</div>
            {[["Email","eric@yardnewburgh.com"],["Phone","812-249-0564"]].map(([k,v])=>(
              <div key={k} style={{ marginBottom:14 }}>
                <div style={{ fontFamily:F.b, fontSize:10.5, fontWeight:800, letterSpacing:1.5, color:C.cyan, textTransform:"uppercase" }}>{k}</div>
                <div style={{ fontFamily:F.b, fontSize:15, color:C.ice, marginTop:3, fontWeight:600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        {!sent ? (
          <Panel>
            <div style={{ fontFamily:F.d, fontSize:22, color:C.white, fontStyle:"italic", textTransform:"uppercase", marginBottom:16 }}>Send a Message</div>
            <Field label="Your Name *" value={msg.name} onChange={set("name")} placeholder="Full name" />
            <Field label="Email *" type="email" value={msg.email} onChange={set("email")} placeholder="your@email.com" />
            <Field label="Subject" value={msg.subject} onChange={set("subject")} placeholder="e.g. Question about schedule" />
            <Field label="Message *" multiline value={msg.body} onChange={set("body")} placeholder="Type your message here…" />
            <Button full onClick={send} style={{ marginTop:4 }}>Send Message</Button>
          </Panel>
        ) : (
          <Panel style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"40px 24px" }}>
            <div style={{ fontFamily:F.d, fontSize:52, color:C.green, fontStyle:"italic" }}>✓</div>
            <div style={{ fontFamily:F.d, fontSize:26, color:C.white, fontStyle:"italic", textTransform:"uppercase", marginTop:8 }}>Message Sent</div>
            <div style={{ fontFamily:F.b, color:C.muted, fontSize:14, marginTop:8 }}>{TEAM.coach} will respond within 24 hours.</div>
            <div style={{ marginTop:20 }}><Button onClick={()=>setSent(false)}>Send Another</Button></div>
          </Panel>
        )}
      </div>
    </div>
  );
}

// ══ APP SHELL ═════════════════════════════════════════════════════════════════
// ══ SCORES — GameChanger live schedule widget ════════════════════════════════
function ScoresPage(){
  useEffect(() => {
    let cancelled = false;
    function render(){
      if (cancelled) return;
      const el = document.querySelector("#gc-schedule-widget-emrn");
      if (el && window.GC && window.GC.team && window.GC.team.schedule){
        el.innerHTML = "";
        try {
          window.GC.team.schedule.init({
            target: "#gc-schedule-widget-emrn",
            widgetId: "478411de-82ed-4d57-a6e1-4e375a23235e",
            maxVerticalGamesVisible: 4,
          });
        } catch(e){}
      }
    }
    if (window.GC){ render(); return; }
    let sc = document.getElementById("gc-sdk");
    if (!sc){
      sc = document.createElement("script");
      sc.id = "gc-sdk";
      sc.src = "https://widgets.gc.com/static/js/sdk.v1.js";
      sc.async = true;
      sc.onload = render;
      document.body.appendChild(sc);
    } else {
      sc.addEventListener("load", render);
      render();
    }
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <SectionTitle sub="Live game scores and schedule, straight from GameChanger">Live Scores</SectionTitle>
      <Panel>
        <div style={{ background:"#FFFFFF", borderRadius:10, padding:10 }}>
          <div id="gc-schedule-widget-emrn" style={{ minHeight:140 }}>
            <div style={{ fontFamily:F.b, color:C.mutedDk, fontSize:13, padding:"22px 6px" }}>
              Loading live scores from GameChanger… (needs an internet connection)
            </div>
          </div>
        </div>
      </Panel>
      <div style={{ fontFamily:F.b, color:C.muted, fontSize:12, marginTop:12, lineHeight:1.6 }}>
        Scores and game status update automatically from your GameChanger team page.
      </div>
    </div>
  );
}

function App(){
  const [tab,setTab] = useState("home");
  useEffect(()=>{ window.scrollTo(0,0); }, [tab]);
  const wide = useWide();
  const rec = getRecord();
  const pages = {
    home:     <HomePage setTab={setTab} wide={wide} />,
    schedule: <SchedulePage />,
    scores:   <ScoresPage />,
    roster:   <RosterPage wide={wide} />,
    tryouts:  <TryoutsPage wide={wide} />,
    billing:  <BillingPage wide={wide} />,
    drills:   <DrillsPage wide={wide} />,
    contact:  <ContactPage wide={wide} />,
  };
  return (
    <div style={{ minHeight:"100vh", background:C.bg0, color:C.white, fontFamily:F.b, display:"flex" }}>
      {/* SIDEBAR (desktop) */}
      {wide && (
        <aside style={{ width:250, flexShrink:0, background:C.bg1, borderRight:`1px solid ${C.line}`,
          height:"100vh", position:"sticky", top:0, display:"flex", flexDirection:"column", padding:"26px 16px 20px" }}>
          <div style={{ padding:"0 8px 22px" }}>
            <img src="assets/newburgh-ice-logo.png" alt="Newburgh Ice" style={{ width:"100%", maxWidth:180, display:"block" }} />
            <div style={{ fontFamily:F.b, fontSize:10.5, fontWeight:800, letterSpacing:2, color:C.muted, marginTop:8 }}>{TEAM.level.toUpperCase()}</div>
          </div>
          <div style={{ height:1, background:C.line, margin:"0 8px 16px" }} />
          <nav style={{ flex:1 }}>
            {TABS.map(t=>{
              const active = tab===t.id;
              return (
                <button key={t.id} onClick={()=>setTab(t.id)}
                  style={{ display:"flex", alignItems:"center", gap:13, width:"100%", padding:"11px 12px",
                    border:"none", cursor:"pointer", borderRadius:10, marginBottom:4, position:"relative",
                    background: active?"linear-gradient(90deg, rgba(52,180,232,.16), transparent)":"transparent",
                    transition:"background .15s" }}>
                  {active && <span style={{ position:"absolute", left:0, top:8, bottom:8, width:3, background:C.cyan, borderRadius:3 }} />}
                  <NavGlyph ch={t.ch} active={active} />
                  <span style={{ fontFamily:F.b, fontWeight:800, fontSize:14, letterSpacing:1, textTransform:"uppercase", color: active?C.white:C.muted }}>{t.label}</span>
                </button>
              );
            })}
          </nav>
          <div style={{ background:C.bg2, border:`1px solid ${C.line}`, borderRadius:12, padding:"14px 16px", marginTop:12 }}>
            <div style={{ fontFamily:F.b, fontSize:10, fontWeight:800, letterSpacing:1.5, color:C.muted, textTransform:"uppercase" }}>{TEAM.season} Record</div>
            <div style={{ fontFamily:F.d, fontSize:30, color:C.white, fontStyle:"italic", lineHeight:1, marginTop:4 }}>{rec.w}<span style={{ color:C.mutedDk }}>–</span>{rec.l}{rec.t>0 && <span style={{ color:C.mutedDk }}>{`–${rec.t}`}</span>}</div>
          </div>
        </aside>
      )}

      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
        {/* MOBILE HEADER */}
        {!wide && (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"12px 18px", background:C.bg1, borderBottom:`1px solid ${C.line}`, position:"sticky", top:0, zIndex:50 }}>
            <img src="assets/newburgh-ice-logo.png" alt="Newburgh Ice" style={{ height:40, width:"auto", display:"block" }} />
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:C.green, animation:"pulseGlow 1.4s ease-in-out infinite" }} />
              <span style={{ fontFamily:F.b, fontWeight:800, fontSize:11, letterSpacing:1.5, color:C.muted }}>{TEAM.season}</span>
            </div>
          </div>
        )}

        <Ticker />

        <div style={{ padding: wide?"30px 40px 70px":"20px 16px 96px", maxWidth:1120, width:"100%", margin:"0 auto" }}>
          <div key={tab}>
            {pages[tab]}
          </div>
        </div>
      </div>

      {/* BOTTOM NAV (mobile) */}
      {!wide && (
        <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:60, background:C.bg1,
          borderTop:`1px solid ${C.line}`, display:"flex", boxShadow:"0 -6px 24px rgba(0,0,0,.45)" }}>
          {TABS.map(t=>{
            const active = tab===t.id;
            return (
              <button key={t.id} onClick={()=>setTab(t.id)}
                style={{ flex:1, padding:"9px 2px 8px", border:"none", background:"none", cursor:"pointer",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                <NavGlyph ch={t.ch} active={active} />
                <span style={{ fontFamily:F.b, fontSize:8.5, fontWeight:800, letterSpacing:.5, textTransform:"uppercase", color: active?C.cyan:C.mutedDk }}>{t.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
window.App = App;
