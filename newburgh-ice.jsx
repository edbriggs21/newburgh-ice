import { useState } from "react";
// ── Palette — ice blue / deep navy / crisp white with silver accents ─────────
const C = {
  navy:    "#08111F",
  navyMid: "#0E1E35",
  navyLt:  "#162B47",
  ice:     "#A8D8EA",       // signature icy blue accent
  iceDk:   "#5BAFD6",
  silver:  "#C8D6E0",
  white:   "#FFFFFF",
  chalk:   "#EEF3F7",       // cool-tinted off-white background
  gray:    "#6B7C8D",
  grayLt:  "#DDE5EC",
  green:   "#2ECC71",
  red:     "#E74C3C",
};
// ── Team data ────────────────────────────────────────────────────────────────
const TEAM = { name: "Newburgh Ice", level: "14U Travel Softball", season: "2026", coach: "Coach Rivera" };
const ANNOUNCEMENTS = [
  { id:1, date:"Jun 10", title:"Tryouts Open — Register Now!", body:"2027 season tryouts are scheduled for August 3rd & 4th. Spots are limited. Register via the Tryouts tab.", tag:"Tryouts" },
  { id:2, date:"Jun 8",  title:"Fundraiser: Cookie Dough Sale", body:"Our annual cookie dough fundraiser runs June 15 – July 15. Each player goal is $300. Links sent to all families.", tag:"Fundraising" },
  { id:3, date:"Jun 5",  title:"Tournament Win — State Qualifier!", body:"We went 4-1 at the Central Valley Classic and earned our state qualifier bid. Great work, Newburgh Ice!", tag:"Results" },
];
const SCHEDULE = [
  { id:1, date:"Jun 14", time:"10:00 AM", opponent:"Lightning Bolts",  location:"Riverside Park Field 2",  type:"Game",       result:null },
  { id:2, date:"Jun 17", time:"6:00 PM",  opponent:null,               location:"Practice Complex",         type:"Practice",   result:null },
  { id:3, date:"Jun 21", time:"9:00 AM",  opponent:"Diamond Queens",   location:"Central Sports Complex",   type:"Tournament", result:null },
  { id:4, date:"Jun 22", time:"TBD",      opponent:"TBD",              location:"Central Sports Complex",   type:"Tournament", result:null },
  { id:5, date:"Jun 7",  time:"11:00 AM", opponent:"Storm Chasers",    location:"Riverside Park Field 1",   type:"Game",       result:"W 8-3" },
  { id:6, date:"Jun 1",  time:"10:00 AM", opponent:"Valley Heat",      location:"Home Field",               type:"Game",       result:"L 4-6" },
  { id:7, date:"May 25", time:"9:00 AM",  opponent:"Fast Pitch Elite", location:"Eastside Complex",         type:"Game",       result:"W 11-2" },
];
const PLAYERS = [
  { id:1,  name:"Mia Rivera",     number:1,  pos:"P / SS",  bats:"R", throws:"R", grad:2030, gpa:"3.8", paid:true,  bio:"Our ace pitcher with a rising fastball and a sharp drop curve." },
  { id:2,  name:"Jordan Lee",     number:7,  pos:"C",       bats:"R", throws:"R", grad:2030, gpa:"3.5", paid:true,  bio:"Powerhouse catcher with a cannon arm and great leadership." },
  { id:3,  name:"Avery Chen",     number:12, pos:"1B",      bats:"L", throws:"R", grad:2029, gpa:"4.0", paid:false, bio:"First baseman with a great glove and clutch hits." },
  { id:4,  name:"Samantha Ortiz", number:22, pos:"2B / 3B", bats:"R", throws:"R", grad:2031, gpa:"3.7", paid:true,  bio:"Versatile infielder who plays with maximum effort every game." },
  { id:5,  name:"Riley Thompson", number:3,  pos:"CF",      bats:"S", throws:"R", grad:2030, gpa:"3.9", paid:true,  bio:"Blazing speed in center field, leads team in stolen bases." },
  { id:6,  name:"Emma Patel",     number:18, pos:"LF / RF", bats:"L", throws:"L", grad:2031, gpa:"3.6", paid:false, bio:"Contact hitter with excellent plate discipline." },
  { id:7,  name:"Chloe Martinez", number:5,  pos:"3B",      bats:"R", throws:"R", grad:2029, gpa:"3.4", paid:true,  bio:"Third baseman known for her rocket throws and big bat." },
  { id:8,  name:"Taylor Brooks",  number:10, pos:"P / 1B",  bats:"R", throws:"R", grad:2032, gpa:"3.8", paid:true,  bio:"Up-and-coming pitcher with great poise in the circle." },
  { id:9,  name:"Natalie Kim",    number:9,  pos:"SS",      bats:"R", throws:"R", grad:2030, gpa:"4.0", paid:true,  bio:"Sure-handed shortstop and team captain." },
  { id:10, name:"Olivia Scott",   number:14, pos:"DP / OF", bats:"R", throws:"R", grad:2031, gpa:"3.5", paid:false, bio:"Pure hitter who drives in runs in key situations." },
];
const BILLING = [
  { id:1, desc:"Spring Season Fee",  amount:450, due:"Mar 1",  notes:"Covers uniforms, tournament entry, field fees" },
  { id:2, desc:"Tournament Package", amount:200, due:"Apr 15", notes:"State qualifier + 2 invitational tournaments" },
  { id:3, desc:"Equipment Fund",     amount:75,  due:"Mar 1",  notes:"Shared helmets, catcher gear, bases" },
  { id:4, desc:"Team Apparel",       amount:120, due:"Mar 15", notes:"Practice shirts, sweatshirt, bag" },
];
const FUNDRAISERS = [
  { id:1, name:"Cookie Dough Sale", goal:3000, raised:1240, end:"Jul 15", status:"Active" },
  { id:2, name:"Car Wash",          goal:800,  raised:800,  end:"May 20", status:"Complete" },
  { id:3, name:"Team Raffle",       goal:1500, raised:550,  end:"Aug 1",  status:"Active" },
];
const TRYOUT_INFO = {
  dates: ["August 3, 2026 — 9:00 AM – 12:00 PM", "August 4, 2026 — 9:00 AM – 12:00 PM"],
  location: "Riverside Sports Complex, Field 3 & 4",
  ageGroup: "12U – 14U (born 2012–2014)",
  cost: "$25 tryout fee (cash or Venmo)",
  whatToBring: ["Cleats & batting helmet", "Glove & bat", "Water & snack", "Completed registration form"],
  process: [
    "Warm-up & introductions (15 min)",
    "Fielding evaluation — infield & outfield",
    "Pitching & catching assessment",
    "Batting cage evaluation",
    "Scrimmage & team play observation",
    "Results communicated within 48 hours",
  ],
};
const DRILLS = [
  { title:"Bucket Drill",      skill:"Fielding", desc:"Coaches hit grounders to infield players in rapid succession. Focus on footwork, glove positioning, and quick release.", time:"15 min" },
  { title:"Soft Toss Station", skill:"Hitting",  desc:"Partner tosses ball underhanded from the side. Hitter focuses on driving the ball through the zone with a level swing.", time:"10 min" },
  { title:"Crow Hop Throws",   skill:"Throwing", desc:"Outfielders practice crow hop mechanics to build arm strength and accuracy on long throws to cutoff.", time:"10 min" },
  { title:"Live BP",           skill:"Hitting",  desc:"Coach pitches live at 60–70% to simulate game situations. Batters called up with runners-on scenarios.", time:"20 min" },
  { title:"Bunt Defense",      skill:"Fielding", desc:"Simulate bunt plays — charging third baseman, pitcher coverage, first baseman decisions. All rotations practiced.", time:"15 min" },
];
// ── Shared UI components ─────────────────────────────────────────────────────
const Badge = ({ text, color, textColor }) => (
  <span style={{ background: color || C.ice, color: textColor || C.navy,
    padding:"2px 10px", borderRadius:20, fontSize:11, fontWeight:700, letterSpacing:0.8,
    whiteSpace:"nowrap" }}>
    {text}
  </span>
);
const Card = ({ children, style }) => (
  <div style={{ background:C.white, borderRadius:12, padding:"18px 20px",
    boxShadow:"0 2px 14px rgba(8,17,31,0.07)", marginBottom:14, ...style }}>
    {children}
  </div>
);
const SectionTitle = ({ children }) => (
  <h2 style={{ fontSize:20, fontWeight:800, color:C.navy, marginBottom:18,
    borderLeft:`4px solid ${C.ice}`, paddingLeft:12, margin:"0 0 18px" }}>
    {children}
  </h2>
);
const StatBox = ({ label, value, dark }) => (
  <div style={{ background: dark ? C.navyLt : C.chalk, borderRadius:10,
    padding:"12px 16px", textAlign:"center", flex:1 }}>
    <div style={{ fontSize:26, fontWeight:900, color: dark ? C.ice : C.navy }}>{value}</div>
    <div style={{ fontSize:10, color: dark ? C.silver : C.gray, fontWeight:700, letterSpacing:1, marginTop:2 }}>{label}</div>
  </div>
);
const ProgressBar = ({ raised, goal }) => {
  const pct = Math.min(100, Math.round((raised/goal)*100));
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:C.gray, marginBottom:4 }}>
        <span>${raised.toLocaleString()} raised</span><span>Goal: ${goal.toLocaleString()}</span>
      </div>
      <div style={{ background:C.grayLt, borderRadius:20, height:10, overflow:"hidden" }}>
        <div style={{ width:`${pct}%`, background: pct===100 ? C.green : C.iceDk,
          height:"100%", borderRadius:20, transition:"width 0.6s ease" }} />
      </div>
      <div style={{ fontSize:11, color:C.gray, marginTop:3 }}>{pct}% complete</div>
    </div>
  );
};
// ── Snowflake SVG decoration ─────────────────────────────────────────────────
const Snowflake = ({ size=40, opacity=0.12 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity }} fill="white">
    <line x1="20" y1="2" x2="20" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="2" y1="20" x2="38" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="7" y1="7" x2="33" y2="33" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="33" y1="7" x2="7" y2="33" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="20" y1="8" x2="16" y2="4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="20" y1="8" x2="24" y2="4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="20" y1="32" x2="16" y2="36" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="20" y1="32" x2="24" y2="36" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="8" y1="20" x2="4" y2="16" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="8" y1="20" x2="4" y2="24" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="32" y1="20" x2="36" y2="16" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="32" y1="20" x2="36" y2="24" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
// ── Team logo (vector recreation of the Newburgh Ice wordmark) ───────────────
const Logo = ({ height = 44 }) => (
  <svg viewBox="0 0 320 150" height={height} style={{ display:"block", overflow:"visible" }}
    xmlns="http://www.w3.org/2000/svg" aria-label="Newburgh Ice">
    <defs>
      <linearGradient id="iceFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#BDEBFF"/>
        <stop offset="45%"  stopColor="#34B4E8"/>
        <stop offset="100%" stopColor="#1683B8"/>
      </linearGradient>
    </defs>
    {/* NEWBURGH banner — angled up to the right */}
    <g transform="rotate(-7 160 48)">
      <text x="160" y="48" textAnchor="middle"
        fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif" fontWeight="900"
        fontSize="40" fontStyle="italic" letterSpacing="1"
        fill="#34B4E8" stroke="#0B2C3D" strokeWidth="3" paintOrder="stroke"
        strokeLinejoin="round">NEWBURGH</text>
    </g>
    {/* speed streaks behind ICE */}
    <g stroke="#34B4E8" strokeWidth="7" strokeLinecap="round" opacity="0.95">
      <line x1="2"  y1="92"  x2="46" y2="92"/>
      <line x1="12" y1="112" x2="52" y2="112"/>
      <line x1="22" y1="132" x2="58" y2="132"/>
    </g>
    {/* ICE — large bold italic */}
    <text x="168" y="138" textAnchor="middle"
      fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif" fontWeight="900"
      fontSize="108" fontStyle="italic" letterSpacing="2"
      fill="url(#iceFill)" stroke="#0B2C3D" strokeWidth="5" paintOrder="stroke"
      strokeLinejoin="round">ICE</text>
  </svg>
);
// ── PAGES ────────────────────────────────────────────────────────────────────
function HomePage({ setTab }) {
  const upcoming = SCHEDULE.filter(s=>!s.result).slice(0,3);
  const wins   = SCHEDULE.filter(s=>s.result?.startsWith("W")).length;
  const losses = SCHEDULE.filter(s=>s.result?.startsWith("L")).length;
  return (
    <div>
      {/* Hero */}
      <div style={{ background:`linear-gradient(150deg, ${C.navy} 0%, ${C.navyLt} 100%)`,
        borderRadius:16, padding:"32px 24px 28px", marginBottom:22, position:"relative", overflow:"hidden" }}>
        {/* decorative snowflakes */}
        <div style={{ position:"absolute", right:10, top:8 }}><Snowflake size={80} opacity={0.08}/></div>
        <div style={{ position:"absolute", right:60, bottom:-10 }}><Snowflake size={50} opacity={0.05}/></div>
        <div style={{ position:"absolute", left:-10, bottom:-10 }}><Snowflake size={60} opacity={0.04}/></div>
        <div style={{ fontSize:11, letterSpacing:3, color:C.iceDk, fontWeight:700, marginBottom:4 }}>
          {TEAM.level}  ·  {TEAM.season}
        </div>
        <div style={{ marginBottom:14 }}>
          <Logo height={84} />
        </div>
        <div style={{ color:C.silver, fontSize:13, marginBottom:20 }}>
          {TEAM.coach}  ·  Est. 2021  ·  10 Players
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <StatBox label="WINS"    value={wins}   dark />
          <StatBox label="LOSSES"  value={losses} dark />
          <StatBox label="PLAYERS" value={10}     dark />
          <StatBox label="EVENTS"  value={4}      dark />
        </div>
      </div>
      {/* Announcements */}
      <SectionTitle>📢 Announcements</SectionTitle>
      {ANNOUNCEMENTS.map(a => {
        const tagColor = a.tag==="Results" ? C.green : a.tag==="Tryouts" ? C.red : C.ice;
        const tagText  = a.tag==="Results" ? C.white : a.tag==="Tryouts" ? C.white : C.navy;
        return (
          <Card key={a.id}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:5 }}>
              <div style={{ fontWeight:700, color:C.navy, fontSize:15, flex:1, marginRight:8 }}>{a.title}</div>
              <Badge text={a.tag} color={tagColor} textColor={tagText} />
            </div>
            <div style={{ fontSize:11, color:C.gray, marginBottom:6 }}>{a.date}</div>
            <div style={{ fontSize:14, color:"#3A4A5A", lineHeight:1.65 }}>{a.body}</div>
          </Card>
        );
      })}
      {/* Upcoming */}
      <div style={{ marginTop:22 }}>
        <SectionTitle>📅 Upcoming Events</SectionTitle>
      </div>
      {upcoming.map(e => (
        <Card key={e.id} style={{ display:"flex", gap:14, alignItems:"center" }}>
          <div style={{ background:C.navy, borderRadius:10, padding:"10px 12px",
            textAlign:"center", minWidth:50, flexShrink:0 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:1, color:C.iceDk }}>
              {e.date.split(" ")[0].toUpperCase()}
            </div>
            <div style={{ fontSize:22, fontWeight:900, color:C.white, lineHeight:1 }}>
              {e.date.split(" ")[1]}
            </div>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, color:C.navy, fontSize:14 }}>
              {e.type==="Practice" ? "Team Practice" : `vs ${e.opponent}`}
            </div>
            <div style={{ fontSize:12, color:C.gray, marginTop:2 }}>{e.time} · {e.location}</div>
          </div>
          <Badge
            text={e.type}
            color={e.type==="Practice" ? C.grayLt : e.type==="Tournament" ? C.red : C.ice}
            textColor={e.type==="Practice" ? C.gray : e.type==="Tournament" ? C.white : C.navy}
          />
        </Card>
      ))}
      <button onClick={()=>setTab("schedule")}
        style={{ width:"100%", padding:"12px", background:"none",
          border:`2px solid ${C.ice}`, borderRadius:10, color:C.iceDk,
          fontWeight:700, cursor:"pointer", fontSize:14, marginTop:4 }}>
        View Full Schedule →
      </button>
    </div>
  );
}
function SchedulePage() {
  const [filter, setFilter] = useState("All");
  const types = ["All","Game","Tournament","Practice"];
  const upcoming = SCHEDULE.filter(s=>!s.result);
  const past     = SCHEDULE.filter(s=>s.result);
  const applyFilter = list => filter==="All" ? list : list.filter(s=>s.type===filter);
  const EventRow = ({ e }) => (
    <Card style={{ display:"flex", gap:12, alignItems:"center", padding:"14px 16px" }}>
      <div style={{ background: e.result ? (e.result.startsWith("W") ? C.green : C.red) : C.navy,
        borderRadius:8, padding:"8px 10px", textAlign:"center", minWidth:46, flexShrink:0 }}>
        <div style={{ fontSize:9, fontWeight:700, letterSpacing:1, color: e.result ? C.white : C.iceDk }}>
          {e.date.split(" ")[0].toUpperCase()}
        </div>
        <div style={{ fontSize:18, fontWeight:900, color:C.white, lineHeight:1 }}>
          {e.date.split(" ")[1]}
        </div>
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontWeight:700, color:C.navy, fontSize:14 }}>
          {e.type==="Practice" ? "Practice" : e.opponent ? `vs ${e.opponent}` : "TBD"}
        </div>
        <div style={{ fontSize:12, color:C.gray, marginTop:2 }}>{e.time} · {e.location}</div>
      </div>
      <div>
        {e.result
          ? <div style={{ fontWeight:800, fontSize:16, color: e.result.startsWith("W") ? C.green : C.red }}>{e.result}</div>
          : <Badge text={e.type}
              color={e.type==="Practice" ? C.grayLt : e.type==="Tournament" ? C.red : C.ice}
              textColor={e.type==="Practice" ? C.gray : e.type==="Tournament" ? C.white : C.navy} />}
      </div>
    </Card>
  );
  return (
    <div>
      <SectionTitle>📅 Season Schedule</SectionTitle>
      <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" }}>
        {types.map(t => (
          <button key={t} onClick={()=>setFilter(t)}
            style={{ padding:"6px 16px", borderRadius:20, border:"none", cursor:"pointer",
              fontWeight:600, fontSize:13,
              background: filter===t ? C.ice : C.grayLt,
              color: filter===t ? C.navy : C.gray }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:C.gray, marginBottom:8 }}>UPCOMING</div>
      {applyFilter(upcoming).map(e=><EventRow key={e.id} e={e}/>)}
      {applyFilter(upcoming).length===0 && <p style={{color:C.gray,fontSize:13}}>No upcoming events.</p>}
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:C.gray, margin:"18px 0 8px" }}>PAST RESULTS</div>
      {applyFilter(past).map(e=><EventRow key={e.id} e={e}/>)}
    </div>
  );
}
function RosterPage() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch]     = useState("");
  const filtered = PLAYERS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.pos.toLowerCase().includes(search.toLowerCase())
  );
  if (selected) {
    const p = PLAYERS.find(x=>x.id===selected);
    return (
      <div>
        <button onClick={()=>setSelected(null)}
          style={{ background:"none", border:"none", color:C.iceDk, fontWeight:700,
            cursor:"pointer", fontSize:14, marginBottom:16, padding:0 }}>
          ← Back to Roster
        </button>
        <Card>
          <div style={{ display:"flex", gap:18, alignItems:"center", marginBottom:18 }}>
            <div style={{ width:68, height:68, borderRadius:"50%",
              background:`linear-gradient(135deg, ${C.navy}, ${C.navyLt})`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:22, fontWeight:900, color:C.ice, flexShrink:0,
              border:`3px solid ${C.iceDk}` }}>
              #{p.number}
            </div>
            <div>
              <div style={{ fontSize:20, fontWeight:900, color:C.navy }}>{p.name}</div>
              <div style={{ fontSize:13, color:C.gray, marginBottom:6 }}>{p.pos}</div>
              <Badge text={p.paid ? "✓ Fees Paid" : "Balance Due"}
                color={p.paid ? C.green : C.red} textColor={C.white} />
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
            {[["Position",p.pos],["Bats",p.bats],["Throws",p.throws],["Grad Year",p.grad],["GPA",p.gpa]].map(([k,v])=>(
              <div key={k} style={{ background:C.chalk, borderRadius:8, padding:"10px 12px" }}>
                <div style={{ fontSize:10, color:C.gray, fontWeight:700, letterSpacing:1 }}>{k}</div>
                <div style={{ fontSize:16, fontWeight:700, color:C.navy }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize:14, color:"#3A4A5A", lineHeight:1.7 }}>{p.bio}</div>
        </Card>
      </div>
    );
  }
  return (
    <div>
      <SectionTitle>👥 Player Roster</SectionTitle>
      <input value={search} onChange={e=>setSearch(e.target.value)}
        placeholder="Search by name or position…"
        style={{ width:"100%", padding:"10px 14px", borderRadius:10,
          border:`1.5px solid ${C.grayLt}`, fontSize:14, marginBottom:14,
          boxSizing:"border-box", outline:"none", background:C.white }} />
      {filtered.map(p=>(
        <Card key={p.id} style={{ display:"flex", gap:14, alignItems:"center", cursor:"pointer" }}
          onClick={()=>setSelected(p.id)}>
          <div style={{ width:46, height:46, borderRadius:"50%",
            background:`linear-gradient(135deg, ${C.navy}, ${C.navyLt})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:14, fontWeight:900, color:C.ice, flexShrink:0,
            border:`2px solid ${C.navyLt}` }}>
            #{p.number}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, color:C.navy }}>{p.name}</div>
            <div style={{ fontSize:12, color:C.gray }}>{p.pos}</div>
          </div>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            <div style={{ width:8, height:8, borderRadius:"50%",
              background: p.paid ? C.green : C.red }} />
            <span style={{ fontSize:11, color: p.paid ? C.green : C.red, fontWeight:600 }}>
              {p.paid ? "Paid" : "Due"}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
function TryoutsPage() {
  const [registered, setRegistered] = useState(false);
  const [form, setForm] = useState({ name:"", dob:"", pos:"", email:"", phone:"", prev:"" });
  const handleSubmit = () => {
    if (!form.name || !form.email) return alert("Please fill in player name and parent email.");
    setRegistered(true);
  };
  if (registered) {
    return (
      <div style={{ textAlign:"center", padding:"40px 20px" }}>
        <div style={{ fontSize:64 }}>❄️</div>
        <div style={{ fontSize:24, fontWeight:900, color:C.navy, marginTop:12 }}>You're Registered!</div>
        <div style={{ color:C.gray, marginTop:8, fontSize:14, lineHeight:1.7 }}>
          Confirmation sent to <strong>{form.email}</strong>.<br/>
          Check-in starts 15 min before your session. See you on the field!
        </div>
        <button onClick={()=>{ setRegistered(false); setForm({name:"",dob:"",pos:"",email:"",phone:"",prev:""}); }}
          style={{ marginTop:24, padding:"12px 32px", background:C.ice, border:"none",
            borderRadius:10, fontWeight:700, color:C.navy, cursor:"pointer", fontSize:15 }}>
          Register Another Player
        </button>
      </div>
    );
  }
  const Input = ({ label, field, placeholder, type="text" }) => (
    <div style={{ marginBottom:14 }}>
      <label style={{ fontSize:12, fontWeight:700, color:C.navy, letterSpacing:0.5 }}>{label}</label>
      <input type={type} value={form[field]} placeholder={placeholder}
        onChange={e=>setForm({...form,[field]:e.target.value})}
        style={{ width:"100%", padding:"10px 12px", borderRadius:8, marginTop:4,
          border:`1.5px solid ${C.grayLt}`, fontSize:14, boxSizing:"border-box", outline:"none" }} />
    </div>
  );
  return (
    <div>
      <SectionTitle>🎯 Tryout Information</SectionTitle>
      <div style={{ background:`linear-gradient(150deg, ${C.navy}, ${C.navyLt})`,
        borderRadius:12, padding:"20px", marginBottom:14, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:10, top:10, opacity:0.08 }}><Snowflake size={70}/></div>
        <div style={{ fontSize:12, color:C.iceDk, fontWeight:700, letterSpacing:2, marginBottom:10 }}>TRYOUT DATES</div>
        {TRYOUT_INFO.dates.map((d,i)=>(
          <div key={i} style={{ fontSize:15, fontWeight:600, color:C.white, marginBottom:4 }}>📅 {d}</div>
        ))}
        <div style={{ marginTop:14, fontSize:13, color:C.silver }}>📍 {TRYOUT_INFO.location}</div>
        <div style={{ fontSize:13, color:C.silver }}>👧 {TRYOUT_INFO.ageGroup}</div>
        <div style={{ fontSize:13, color:C.silver }}>💵 {TRYOUT_INFO.cost}</div>
      </div>
      <Card>
        <div style={{ fontWeight:700, color:C.navy, marginBottom:10 }}>What to Bring</div>
        {TRYOUT_INFO.whatToBring.map((item,i)=>(
          <div key={i} style={{ fontSize:14, color:"#3A4A5A", marginBottom:6 }}>
            <span style={{ color:C.iceDk, fontWeight:700 }}>✓</span> {item}
          </div>
        ))}
      </Card>
      <Card>
        <div style={{ fontWeight:700, color:C.navy, marginBottom:10 }}>Tryout Process</div>
        {TRYOUT_INFO.process.map((step,i)=>(
          <div key={i} style={{ display:"flex", gap:12, marginBottom:8, alignItems:"flex-start" }}>
            <div style={{ background:C.ice, borderRadius:"50%", width:22, height:22,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:11, fontWeight:900, color:C.navy, flexShrink:0, marginTop:1 }}>{i+1}</div>
            <div style={{ fontSize:14, color:"#3A4A5A" }}>{step}</div>
          </div>
        ))}
      </Card>
      <SectionTitle>📝 Register for Tryouts</SectionTitle>
      <Card>
        <Input label="Player Full Name *" field="name" placeholder="First Last" />
        <Input label="Date of Birth *"    field="dob"  type="date" placeholder="" />
        <Input label="Primary Position"  field="pos"  placeholder="e.g. Pitcher, Shortstop" />
        <Input label="Parent Email *"    field="email" type="email" placeholder="parent@email.com" />
        <Input label="Parent Phone"      field="phone" type="tel"   placeholder="(555) 555-5555" />
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:12, fontWeight:700, color:C.navy }}>Previous Travel Ball Experience</label>
          <textarea value={form.prev} onChange={e=>setForm({...form,prev:e.target.value})}
            placeholder="Teams played for, years of experience, highlights…" rows={3}
            style={{ width:"100%", padding:"10px 12px", borderRadius:8, marginTop:4,
              border:`1.5px solid ${C.grayLt}`, fontSize:14, boxSizing:"border-box",
              outline:"none", resize:"vertical", fontFamily:"inherit" }} />
        </div>
        <button onClick={handleSubmit}
          style={{ width:"100%", padding:"14px", background:C.ice, border:"none",
            borderRadius:10, fontWeight:800, color:C.navy, cursor:"pointer", fontSize:16 }}>
          Submit Registration
        </button>
      </Card>
    </div>
  );
}
function BillingPage() {
  const total     = BILLING.reduce((s,b)=>s+b.amount, 0);
  const paidCount = PLAYERS.filter(p=>p.paid).length;
  return (
    <div>
      <SectionTitle>💰 Team Billing</SectionTitle>
      <div style={{ display:"flex", gap:10, marginBottom:20 }}>
        <StatBox label="SEASON TOTAL" value={`$${total}`} />
        <StatBox label="PAID" value={paidCount} />
        <StatBox label="OUTSTANDING" value={PLAYERS.length-paidCount} />
      </div>
      <div style={{ fontWeight:700, color:C.navy, fontSize:15, marginBottom:10 }}>Fee Breakdown</div>
      {BILLING.map(b=>(
        <Card key={b.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontWeight:700, color:C.navy }}>{b.desc}</div>
            <div style={{ fontSize:12, color:C.gray, marginTop:2 }}>Due {b.due} · {b.notes}</div>
          </div>
          <div style={{ fontSize:20, fontWeight:900, color:C.navy }}>${b.amount}</div>
        </Card>
      ))}
      <div style={{ fontWeight:700, color:C.navy, fontSize:15, margin:"20px 0 10px" }}>Player Payment Status</div>
      {PLAYERS.map(p=>(
        <Card key={p.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px" }}>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <div style={{ width:36, height:36, borderRadius:"50%",
              background:`linear-gradient(135deg, ${C.navy}, ${C.navyLt})`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:12, fontWeight:900, color:C.ice }}>
              {p.number}
            </div>
            <div style={{ fontWeight:600, color:C.navy }}>{p.name}</div>
          </div>
          <Badge text={p.paid ? "✓ Paid" : "Balance Due"}
            color={p.paid ? C.green : C.red} textColor={C.white} />
        </Card>
      ))}
      <SectionTitle>🎪 Fundraisers</SectionTitle>
      {FUNDRAISERS.map(f=>(
        <Card key={f.id}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
            <div style={{ fontWeight:700, color:C.navy }}>{f.name}</div>
            <Badge text={f.status} color={f.status==="Complete" ? C.green : C.ice}
              textColor={f.status==="Complete" ? C.white : C.navy} />
          </div>
          <ProgressBar raised={f.raised} goal={f.goal} />
          <div style={{ fontSize:12, color:C.gray, marginTop:6 }}>Ends {f.end}</div>
        </Card>
      ))}
    </div>
  );
}
function DrillsPage() {
  const skills = ["All", ...new Set(DRILLS.map(d=>d.skill))];
  const [filter, setFilter] = useState("All");
  return (
    <div>
      <SectionTitle>🏋️ Practice Plans & Drills</SectionTitle>
      <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" }}>
        {skills.map(s=>(
          <button key={s} onClick={()=>setFilter(s)}
            style={{ padding:"6px 16px", borderRadius:20, border:"none", cursor:"pointer",
              fontWeight:600, fontSize:13,
              background: filter===s ? C.ice : C.grayLt,
              color: filter===s ? C.navy : C.gray }}>
            {s}
          </button>
        ))}
      </div>
      {DRILLS.filter(d=>filter==="All"||d.skill===filter).map((d,i)=>(
        <Card key={i}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
            <div style={{ fontWeight:700, color:C.navy, fontSize:15 }}>{d.title}</div>
            <div style={{ display:"flex", gap:6, flexShrink:0 }}>
              <Badge text={d.skill}
                color={d.skill==="Hitting" ? C.red : d.skill==="Fielding" ? C.navy : C.iceDk}
                textColor={C.white} />
              <Badge text={d.time} color={C.grayLt} textColor={C.gray} />
            </div>
          </div>
          <div style={{ fontSize:14, color:"#3A4A5A", lineHeight:1.7, marginTop:8 }}>{d.desc}</div>
        </Card>
      ))}
    </div>
  );
}
function ContactPage() {
  const [sent, setSent] = useState(false);
  const [msg, setMsg]   = useState({ name:"", email:"", subject:"", body:"" });
  const handleSend = () => {
    if (!msg.name || !msg.email || !msg.body) return alert("Please fill in all required fields.");
    setSent(true);
  };
  const F = ({ label, field, placeholder, multiline=false }) => (
    <div style={{ marginBottom:14 }}>
      <label style={{ fontSize:12, fontWeight:700, color:C.navy, letterSpacing:0.5 }}>{label}</label>
      {multiline
        ? <textarea value={msg[field]} onChange={e=>setMsg({...msg,[field]:e.target.value})}
            placeholder={placeholder} rows={4}
            style={{ width:"100%", padding:"10px 12px", borderRadius:8, marginTop:4,
              border:`1.5px solid ${C.grayLt}`, fontSize:14, boxSizing:"border-box",
              outline:"none", resize:"vertical", fontFamily:"inherit" }} />
        : <input value={msg[field]} onChange={e=>setMsg({...msg,[field]:e.target.value})}
            placeholder={placeholder}
            style={{ width:"100%", padding:"10px 12px", borderRadius:8, marginTop:4,
              border:`1.5px solid ${C.grayLt}`, fontSize:14, boxSizing:"border-box", outline:"none" }} />}
    </div>
  );
  return (
    <div>
      <SectionTitle>📞 Contact & Communication</SectionTitle>
      <div style={{ background:`linear-gradient(150deg, ${C.navy}, ${C.navyLt})`,
        borderRadius:12, padding:"20px", marginBottom:14, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:8, top:8, opacity:0.07 }}><Snowflake size={60}/></div>
        <div style={{ color:C.ice, fontWeight:800, fontSize:16, marginBottom:12 }}>{TEAM.coach}</div>
        {[
          ["📧 Email",    "coach@newburghice.com"],
          ["📱 Phone",    "(555) 867-5309"],
          ["📍 Home Field","Riverside Park, Field 2"],
        ].map(([l,v])=>(
          <div key={l} style={{ color:C.silver, fontSize:13, marginBottom:6 }}>
            <span style={{ color:C.white }}>{l}</span>{"  "}{v}
          </div>
        ))}
      </div>
      {!sent ? (
        <Card>
          <div style={{ fontWeight:700, color:C.navy, marginBottom:14, fontSize:16 }}>Send a Message</div>
          <F label="Your Name *"  field="name"    placeholder="Full name" />
          <F label="Email *"      field="email"   placeholder="your@email.com" />
          <F label="Subject"      field="subject" placeholder="e.g. Question about schedule" />
          <F label="Message *"    field="body"    placeholder="Type your message here…" multiline />
          <button onClick={handleSend}
            style={{ width:"100%", padding:"14px", background:C.ice, border:"none",
              borderRadius:10, fontWeight:800, color:C.navy, cursor:"pointer", fontSize:16 }}>
            Send Message
          </button>
        </Card>
      ) : (
        <Card style={{ textAlign:"center", padding:"32px" }}>
          <div style={{ fontSize:48 }}>✅</div>
          <div style={{ fontWeight:800, color:C.navy, marginTop:10 }}>Message Sent!</div>
          <div style={{ color:C.gray, fontSize:14, marginTop:6 }}>
            {TEAM.coach} will respond within 24 hours.
          </div>
          <button onClick={()=>setSent(false)}
            style={{ marginTop:16, padding:"10px 28px", background:C.ice, border:"none",
              borderRadius:10, fontWeight:700, color:C.navy, cursor:"pointer" }}>
            Send Another
          </button>
        </Card>
      )}
    </div>
  );
}
// ── Nav tabs ─────────────────────────────────────────────────────────────────
const TABS = [
  { id:"home",     label:"Home",     icon:"🏠" },
  { id:"schedule", label:"Schedule", icon:"📅" },
  { id:"roster",   label:"Roster",   icon:"👥" },
  { id:"tryouts",  label:"Tryouts",  icon:"🎯" },
  { id:"billing",  label:"Billing",  icon:"💰" },
  { id:"drills",   label:"Drills",   icon:"🏋️" },
  { id:"contact",  label:"Contact",  icon:"📞" },
];
// ── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("home");
  const pages = {
    home:     <HomePage setTab={setTab}/>,
    schedule: <SchedulePage/>,
    roster:   <RosterPage/>,
    tryouts:  <TryoutsPage/>,
    billing:  <BillingPage/>,
    drills:   <DrillsPage/>,
    contact:  <ContactPage/>,
  };
  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif",
      background:C.chalk, minHeight:"100vh", maxWidth:540, margin:"0 auto" }}>
      {/* Header */}
      <div style={{ background:C.navy, padding:"13px 20px", display:"flex",
        justifyContent:"space-between", alignItems:"center",
        position:"sticky", top:0, zIndex:100,
        borderBottom:`1px solid ${C.navyLt}` }}>
        <div>
          <Logo height={38} />
          <div style={{ color:C.gray, fontSize:10, letterSpacing:1.5, marginTop:2 }}>{TEAM.level}</div>
        </div>
        {/* Snowflake logo mark */}
        <div style={{ width:36, height:36, borderRadius:"50%",
          background:`linear-gradient(135deg, ${C.navyLt}, ${C.navy})`,
          border:`2px solid ${C.iceDk}`,
          display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Snowflake size={22} opacity={0.9}/>
        </div>
      </div>
      {/* Page */}
      <div style={{ padding:"20px 16px 100px" }}>
        {pages[tab]}
      </div>
      {/* Bottom nav */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)",
        width:"100%", maxWidth:540, background:C.white,
        borderTop:`1px solid ${C.grayLt}`, display:"flex", zIndex:100,
        boxShadow:"0 -4px 20px rgba(8,17,31,0.08)" }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{ flex:1, padding:"10px 2px 8px", border:"none", background:"none",
              cursor:"pointer", display:"flex", flexDirection:"column",
              alignItems:"center", gap:2 }}>
            <span style={{ fontSize:17 }}>{t.icon}</span>
            <span style={{ fontSize:9, fontWeight:700, letterSpacing:0.5,
              color: tab===t.id ? C.iceDk : C.gray }}>
              {t.label.toUpperCase()}
            </span>
            {tab===t.id && <div style={{ width:18, height:2, background:C.ice, borderRadius:2 }}/>}
          </button>
        ))}
      </div>
    </div>
  );
}
