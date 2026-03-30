import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPA_URL = "https://xwvqwzqdabvkypelutot.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3dnF3enFkYWJ2a3lwZWx1dG90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2ODk1NDUsImV4cCI6MjA5MDI2NTU0NX0.qA4Cyr6k50bBw7rfWf3my9mHYrKMFr4f0oHlfNIyKgw";
const supabase = createClient(SUPA_URL, SUPA_KEY);

const ADMIN_NAME = "VSN";
const MEMBERS = [
  { name:"VSN",      pin:"1804" },
  { name:"Saiteja", pin:"9359" },
  { name:"Swaroop", pin:"2603" },
  { name:"Saha",    pin:"6820" },
  { name:"Nithin",  pin:"0062" },
  { name:"Praneeth",pin:"1718" },
  { name:"Naren",   pin:"0707" },
];

const PP_RANGES = ["< 40","40–55","55–70","> 70"];

const SQUADS = {
  CSK:["MS Dhoni","Ruturaj Gaikwad","Sanju Samson","Ayush Mhatre","Dewald Brevis","Shivam Dube","Urvil Patel","Noor Ahmad","Nathan Ellis","Shreyas Gopal","Khaleel Ahmed","Ramakrishna Ghosh","Mukesh Choudhary","Jamie Overton","Gurjapneet Singh","Anshul Kamboj","Prashant Veer","Kartik Sharma","Rahul Chahar","Akeal Hosein","Matt Henry","Matthew Short","Sarfaraz Khan","Zak Foulkes","Aman Khan"],
  DC: ["KL Rahul","Axar Patel","Kuldeep Yadav","Mitchell Starc","Abishek Porel","Tristan Stubbs","Nitish Rana","Karun Nair","Ashutosh Sharma","T Natarajan","Mukesh Kumar","Sameer Rizvi","Tripurana Vijay","Vipraj Nigam","Madhav Tiwari","Dushmantha Chameera","Ajay Mandal","Auqib Nabi Dar","Pathum Nissanka","David Miller","Ben Duckett","Lungi Ngidi","Kyle Jamieson","Prithvi Shaw","Sahil Parikh"],
  GT: ["Shubman Gill","Jos Buttler","B Sai Sudharsan","Rashid Khan","Mohammed Siraj","Kagiso Rabada","Prasidh Krishna","Washington Sundar","Rahul Tewatia","Glenn Phillips","M Shahrukh Khan","Anuj Rawat","Kumar Kushagra","Gurnoor Brar","Jayant Yadav","Nishant Sindhu","Arshad Khan","Ishant Sharma","Manav Suthar","R Sai Kishore","Jason Holder","Tom Banton","Ashok Sharma","Luke Wood","Prithvi Raj"],
  KKR:["Ajinkya Rahane","Sunil Narine","Varun Chakravarthy","Rinku Singh","Harshit Rana","Angkrish Raghuvanshi","Ramandeep Singh","Vaibhav Arora","Anukul Roy","Rovman Powell","Manish Pandey","Umran Malik","Cameron Green","Matheesha Pathirana","Finn Allen","Rachin Ravindra","Tim Seifert","Akash Deep","Tejasvi Singh","Rahul Tripathi","Prashant Solanki","Kartik Tyagi","Sarthak Ranjan","Daksh Kamra","Blessing Muzarabani"],
  MI: ["Rohit Sharma","Hardik Pandya","Suryakumar Yadav","Jasprit Bumrah","Tilak Varma","Trent Boult","Will Jacks","Ryan Rickelton","Mitchell Santner","Naman Dhir","Raj Bawa","Robin Minz","Deepak Chahar","Raghu Sharma","Shardul Thakur","Sherfane Rutherford","Mayank Markande","AM Ghazanfar","Ashwani Kumar","Corbin Bosch","Quinton de Kock","Atharva Ankolekar","Mohammad Izhar","Danish Malewar","Mayank Rawat"],
  PBKS:["Shreyas Iyer","Prabhsimran Singh","Priyansh Arya","Nehal Wadhera","Marcus Stoinis","Arshdeep Singh","Marco Jansen","Harpreet Brar","Lockie Ferguson","Yuzvendra Chahal","Shashank Singh","Musheer Khan","Mitch Owen","Azmatullah Omarzai","Harnoor Singh Pannu","Cooper Connolly","Ben Dwarshuis","Praveen Dubey","Vaibhav Suryavanshi","Vishwanath Tiwari","Suryansh Shedge","Kuldeep Sen","Pyla Avinash","Vijaykumar Vyshak","Luvnith Sisodia"],
  RCB:["Virat Kohli","Rajat Patidar","Phil Salt","Venkatesh Iyer","Jitesh Sharma","Tim David","Krunal Pandya","Bhuvneshwar Kumar","Josh Hazlewood","Yash Dayal","Suyash Sharma","Romario Shepherd","Jacob Bethell","Swapnil Singh","Rasikh Salam","Vicky Ostwal","Mangesh Yadav","Jacob Duffy","Nuwan Thushara","Abhinandan Singh","Satwik Deswal","Kanish Chouhan","Vihaan Malhotra","Manoj Bhandage"],
  RR: ["Yashasvi Jaiswal","Riyan Parag","Ravindra Jadeja","Sam Curran","Dhruv Jurel","Shimron Hetmyer","R Ashwin","Sandeep Sharma","Fazalhaq Farooqi","Maheesh Theekshana","Akash Madhwal","Shubham Dubey","Vaibhav Suryavanshi","Tom Kohler-Cadmore","Kunal Rathore","Keshav Maharaj","Nandre Burger","Abid Mushtaq","Kwena Maphaka","Tushar Deshpande","Rovman Powell","Yudhvir Charak","Navdeep Saini","Wanindu Hasaranga","Nitesh Kumar Wadhera"],
  SRH:["Pat Cummins","Travis Head","Heinrich Klaasen","Abhishek Sharma","Nitish Kumar Reddy","Harshal Patel","Adam Zampa","Simarjeet Singh","Atharva Taide","Jaydev Unadkat","Zeeshan Ansari","Rahul Sharma","Sachin Baby","Brydon Carse","Liam Livingstone","Ishan Kishan","Eshan Malinga","Anmolpreet Singh","Akash Singh","Kamindu Mendis","Smaran Ravichandran","Virat Baghel","Kartikeya Singh","Upendra Yadav","Shreyas Gopal"],
  LSG:["Rishabh Pant","Mitchell Marsh","Aiden Markram","Nicholas Pooran","Ayush Badoni","Abdul Samad","Mohsin Khan","Mohammed Shami","Mayank Yadav","Digvesh Rathi","Shahbaz Ahmed","Avesh Khan","Arjun Tendulkar","Himmat Singh","Akshat Raghuwanshi","Wanindu Hasaranga","Anrich Nortje","Josh Inglis","Mukul Choudhary","Matthew Breetzke","Akash Singh","Arshin Kulkarni","Ravi Bishnoi","M Siddharth","Yuvraj Chaudhary"],
};

// Get players only for the two teams in a match
const getMatchPlayers = (team1Name, team2Name) => {
  const t1short = IPL_TEAMS.find(t=>t.name===team1Name)?.short;
  const t2short = IPL_TEAMS.find(t=>t.name===team2Name)?.short;
  const p1 = (SQUADS[t1short]||[]).map(n=>({name:n,team:t1short,color:IPL_TEAMS.find(t=>t.short===t1short)?.color}));
  const p2 = (SQUADS[t2short]||[]).map(n=>({name:n,team:t2short,color:IPL_TEAMS.find(t=>t.short===t2short)?.color}));
  return [...p1,...p2];
};

const IPL_TEAMS = [
  {name:"Mumbai Indians",              short:"MI",  color:"#004BA0",accent:"#D1AB3E"},
  {name:"Chennai Super Kings",         short:"CSK", color:"#C8960C",accent:"#0081E9"},
  {name:"Royal Challengers Bengaluru", short:"RCB", color:"#CC0000",accent:"#444"},
  {name:"Kolkata Knight Riders",       short:"KKR", color:"#3A225D",accent:"#B3A123"},
  {name:"Delhi Capitals",              short:"DC",  color:"#0078BC",accent:"#EF1B23"},
  {name:"Rajasthan Royals",            short:"RR",  color:"#EA1A85",accent:"#00ADEF"},
  {name:"Punjab Kings",                short:"PBKS",color:"#ED1B24",accent:"#999"},
  {name:"Sunrisers Hyderabad",         short:"SRH", color:"#F7A721",accent:"#EF4123"},
  {name:"Lucknow Super Giants",        short:"LSG", color:"#A72056",accent:"#00B4D8"},
  {name:"Gujarat Titans",              short:"GT",  color:"#1C1C3A",accent:"#0CB4E4"},
];
const tObj = n => IPL_TEAMS.find(t=>t.name===n);

const SC={toss:1,tossDecision:1,winner:2,topScorer:3,topWicket:3,manOfMatch:3,sixHitter:2,pp1:2,pp2:2};
const MAX_PTS=Object.values(SC).reduce((a,b)=>a+b,0);

const STEPS=[
  {field:"toss",         type:"team",    label:"Who wins the TOSS? 🎯",                pts:1},
  {field:"tossDecision", type:"batbowl", label:"What will they choose? 🏏",            pts:1},
  {field:"winner",       type:"team",    label:"Who wins the MATCH? 🏆",               pts:2},
  {field:"pp1",          type:"pprange", label:"__T1__ Powerplay (6 overs)? ⚡",       pts:2},
  {field:"pp2",          type:"pprange", label:"__T2__ Powerplay (6 overs)? ⚡",       pts:2},
  {field:"topScorer",    type:"player",  label:"Who scores the MOST RUNS? 🏃",         pts:3},
  {field:"topWicket",    type:"player",  label:"Who takes MOST WICKETS? 🎳",           pts:3},
  {field:"manOfMatch",   type:"player",  label:"Who is MAN OF THE MATCH? ⭐",          pts:3},
  {field:"sixHitter",    type:"player",  label:"Who hits the MOST SIXES? 💥",          pts:2},
];

const SCR={LAND:"LAND",PIN:"PIN",DASH:"DASH",CHAT:"CHAT",ADMIN:"ADMIN",RESULTS:"RESULTS",COMPARE:"COMPARE"};
const EMOJIS=["🧑","👦","👩","🧔","👱","🙋","🤵","👸","🦸","🧑‍💻"];
const emo=n=>{let h=0;for(let c of(n||""))h+=c.charCodeAt(0);return EMOJIS[h%EMOJIS.length];};
const isLocked=m=>m?.lockTime?new Date()>=new Date(m.lockTime):false;
const nowTime=()=>new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});
const dbGet=async k=>{const{data}=await supabase.from("app_data").select("value").eq("key",k).single();return data?.value??null;};
const dbSet=async(k,v)=>supabase.from("app_data").upsert({key:k,value:v},{onConflict:"key"});

const Ball=({name,size=36})=>{
  const t=tObj(name);if(!t)return null;
  return <div style={{width:size,height:size,borderRadius:"50%",background:t.color,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:size*0.24,border:`2px solid ${t.accent}`,flexShrink:0,letterSpacing:0}}>{t.short}</div>;
};

// Match-specific player picker
function MatchPlayerPicker({value, onChange, match, disabled}){
  const [q,setQ]=useState(value||"");
  const [open,setOpen]=useState(false);
  useEffect(()=>setQ(value||""),[value]);
  const allMatchPlayers = match ? getMatchPlayers(match.team1, match.team2) : [];
  const filtered = q.trim().length>0
    ? allMatchPlayers.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())).slice(0,15)
    : allMatchPlayers.slice(0,15);
  const clear=()=>{onChange("");setQ("");setOpen(false);};
  return(
    <div style={{position:"relative"}}>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <input
          style={{flex:1,background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:10,padding:"11px 13px",color:"#fff",fontSize:13,outline:"none",fontFamily:"sans-serif"}}
          placeholder="Search player from these 2 teams..."
          value={q} disabled={disabled}
          onChange={e=>{setQ(e.target.value);setOpen(true);onChange("");}}
          onFocus={()=>setOpen(true)}
          onBlur={()=>setTimeout(()=>setOpen(false),200)}
        />
        {q&&!disabled&&<button onClick={clear} style={{background:"transparent",border:"none",color:"#aaa",fontSize:18,cursor:"pointer"}}>×</button>}
      </div>
      {value&&!open&&(
        <div style={{marginTop:5,display:"flex",alignItems:"center",gap:8,background:"rgba(34,197,94,0.12)",border:"1px solid rgba(34,197,94,0.4)",borderRadius:10,padding:"6px 12px"}}>
          <div style={{width:18,height:18,borderRadius:"50%",background:allMatchPlayers.find(p=>p.name===value)?.color||"#555",flexShrink:0}}/>
          <span style={{fontFamily:"sans-serif",fontSize:13,fontWeight:700,color:"#fff"}}>{value}</span>
          <span style={{color:"#22c55e",marginLeft:"auto",fontSize:14}}>✓</span>
        </div>
      )}
      {open&&(
        <div style={{position:"absolute",top:"100%",left:0,right:0,background:"#1a1a2e",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,boxShadow:"0 8px 24px rgba(0,0,0,0.7)",zIndex:999,maxHeight:220,overflowY:"auto",marginTop:4}}>
          {/* Team headers */}
          {[match?.team1,match?.team2].filter(Boolean).map(teamName=>{
            const t=tObj(teamName);
            const teamPlayers=(q.trim().length>0?filtered:allMatchPlayers).filter(p=>p.team===t?.short);
            if(teamPlayers.length===0)return null;
            return(
              <div key={teamName}>
                <div style={{padding:"6px 12px",background:`${t?.color}33`,fontSize:10,fontWeight:800,color:t?.color,letterSpacing:1,textTransform:"uppercase",borderBottom:`1px solid ${t?.color}33`}}>{t?.short} — {teamName}</div>
                {teamPlayers.map((p,i)=>(
                  <div key={i} onMouseDown={()=>{onChange(p.name);setQ(p.name);setOpen(false);}}
                    style={{display:"flex",alignItems:"center",gap:10,padding:"9px 14px",cursor:"pointer",borderBottom:"1px solid rgba(255,255,255,0.04)"}}
                    onMouseEnter={e=>e.currentTarget.style.background=`${t?.color}22`}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <div style={{width:22,height:22,borderRadius:"50%",background:t?.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:800,color:"#fff",flexShrink:0}}>{t?.short}</div>
                    <span style={{fontFamily:"sans-serif",fontSize:13,fontWeight:600,color:"#fff"}}>{p.name}</span>
                  </div>
                ))}
              </div>
            );
          })}
          {filtered.length===0&&q.trim().length>0&&<div style={{padding:14,textAlign:"center",fontFamily:"sans-serif",fontSize:12,color:"#555"}}>No player found in these 2 teams!</div>}
        </div>
      )}
    </div>
  );
}

// Admin player picker (dark, match-specific)
function AdminPlayerPicker({value,onChange,match}){
  const [q,setQ]=useState(value||"");const [open,setOpen]=useState(false);
  useEffect(()=>setQ(value||""),[value]);
  const allMatchPlayers = match ? getMatchPlayers(match.team1, match.team2) : [];
  const filtered=q.trim().length>0?allMatchPlayers.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())).slice(0,15):allMatchPlayers.slice(0,15);
  return(
    <div style={{position:"relative"}}>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <input
          style={{width:"100%",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,165,0,0.2)",borderRadius:10,padding:"11px 13px",color:"#fff",fontSize:13,outline:"none",boxSizing:"border-box",fontFamily:"sans-serif"}}
          placeholder="Type player name..."
          value={q}
          onChange={e=>{setQ(e.target.value);setOpen(true);onChange("");}}
          onFocus={()=>setOpen(true)} onBlur={()=>setTimeout(()=>setOpen(false),180)}/>
        {q&&<button onClick={()=>{onChange("");setQ("");}} style={{background:"transparent",border:"none",color:"#f97316",fontSize:18,cursor:"pointer"}}>×</button>}
      </div>
      {value&&!open&&<div style={{marginTop:5,display:"flex",alignItems:"center",gap:8,background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.3)",borderRadius:10,padding:"5px 12px"}}>
        <div style={{width:18,height:18,borderRadius:"50%",background:allMatchPlayers.find(p=>p.name===value)?.color||"#555",flexShrink:0}}/>
        <span style={{fontFamily:"sans-serif",fontSize:13,fontWeight:700,color:"#fff"}}>{value}</span>
        <span style={{color:"#22c55e",marginLeft:"auto"}}>✓</span>
      </div>}
      {open&&<div style={{position:"absolute",top:"100%",left:0,right:0,background:"#1a1a2e",border:"1px solid rgba(255,165,0,0.25)",borderRadius:12,boxShadow:"0 8px 24px rgba(0,0,0,0.6)",zIndex:999,maxHeight:220,overflowY:"auto",marginTop:4}}>
        {[match?.team1,match?.team2].filter(Boolean).map(teamName=>{
          const t=tObj(teamName);
          const tp=(q.trim().length>0?filtered:allMatchPlayers).filter(p=>p.team===t?.short);
          if(tp.length===0)return null;
          return(
            <div key={teamName}>
              <div style={{padding:"5px 12px",background:`${t?.color}33`,fontSize:10,fontWeight:800,color:t?.color,letterSpacing:1}}>{t?.short}</div>
              {tp.map((p,i)=><div key={i} onMouseDown={()=>{onChange(p.name);setQ(p.name);setOpen(false);}}
                style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",cursor:"pointer",borderBottom:"1px solid rgba(255,255,255,0.04)"}}
                onMouseEnter={e=>e.currentTarget.style.background=`${t?.color}22`}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{width:20,height:20,borderRadius:"50%",background:t?.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:800,color:"#fff"}}>{t?.short}</div>
                <span style={{fontFamily:"sans-serif",fontSize:13,fontWeight:600,color:"#fff"}}>{p.name}</span>
              </div>)}
            </div>
          );
        })}
        {filtered.length===0&&q.trim().length>0&&<div style={{padding:12,textAlign:"center",fontFamily:"sans-serif",fontSize:12,color:"#555"}}>No player found!</div>}
      </div>}
    </div>
  );
}

export default function App(){
  const [screen,    setScreen]    = useState(SCR.LAND);
  const [matches,   setMatches]   = useState([]);
  const [preds,     setPreds]     = useState({});
  const [results,   setResults]   = useState({});
  const [scores,    setScores]    = useState({});
  const [mc,        setMc]        = useState(1);
  const [who,       setWho]       = useState(null);
  const [curMatch,  setCurMatch]  = useState(null);
  const [pendingWho,setPendingWho]= useState(null);
  const [pinInput,  setPinInput]  = useState("");
  const [pinErr,    setPinErr]    = useState("");
  const [pinShake,  setPinShake]  = useState(false);
  const [mSetup,    setMSetup]    = useState({team1:"",team2:"",date:new Date().toISOString().slice(0,10),lockTime:""});
  const [rForm,     setRForm]     = useState({tossWinner:"",tossDecision:"",winner:"",topScorer:"",topWicket:"",manOfMatch:"",sixHitter:"",pp1:"",pp2:""});
  const [adminMatch,setAdminMatch]= useState(null);
  const [toast,     setToast]     = useState(null);
  const [copied,    setCopied]    = useState(false);
  const [loading,   setLoading]   = useState(true);
  const [msgs,      setMsgs]      = useState([]);
  const [step,      setStep]      = useState(0);
  const [typing,    setTyping]    = useState(false);
  const [chatPreds, setChatPreds] = useState({});
  const [search,    setSearch]    = useState("");
  const bottomRef=useRef(null);

  // Load from Supabase
  useEffect(()=>{
    (async()=>{
      setLoading(true);
      try{
        const [ma,pr,re,sc,mc_]=await Promise.all([dbGet("matches"),dbGet("preds"),dbGet("results"),dbGet("scores"),dbGet("mc")]);
        if(ma)setMatches(ma);if(pr)setPreds(pr);if(re)setResults(re);if(sc)setScores(sc);if(mc_)setMc(mc_);
      }catch(e){}
      setLoading(false);
    })();
  },[]);

  // Real-time sync
  useEffect(()=>{
    const ch=supabase.channel("ipl_sync")
      .on("postgres_changes",{event:"*",schema:"public",table:"app_data"},(p)=>{
        const{key,value}=p.new||{};
        if(key==="matches")setMatches(value||[]);
        if(key==="preds")setPreds(value||{});
        if(key==="results")setResults(value||{});
        if(key==="scores")setScores(value||{});
        if(key==="mc")setMc(value||1);
      }).subscribe();
    return()=>supabase.removeChannel(ch);
  },[]);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,typing]);

  const tip=(msg,type="ok")=>{setToast({msg,type});setTimeout(()=>setToast(null),2500);};

  const botMsg=(text,delay=650,onDone)=>{
    setTyping(true);
    setTimeout(()=>{setTyping(false);setMsgs(p=>[...p,{from:"bot",text,time:nowTime(),id:Math.random()}]);if(onDone)onDone();},delay);
  };

  const startChat=(m)=>{
    const lk=isLocked(m);const ex=preds[`${m.id}_${who.name}`]||{};const done=STEPS.every(s=>!!ex[s.field]);
    const t1=tObj(m.team1)?.short;const t2=tObj(m.team2)?.short;
    setMsgs([{from:"bot",text:`Hey ${who.name}! 👋\n\n🏏 ${t1} vs ${t2}\n📅 ${m.date}`,time:nowTime(),id:0}]);
    setChatPreds({});setSearch("");
    if(lk){botMsg(done?"🔒 Locked!\n\nYour predictions are saved ✅":"🔒 Locked!\n\nPredictions closed 😔",700,()=>setStep(99));return;}
    if(done){botMsg("Already predicted! ✅\n\nEdit your predictions?",700,()=>setStep(-1));return;}
    const label=STEPS[0].label.replace("__T1__",t1).replace("__T2__",t2);
    botMsg(`Let's predict! 🔥\n\nQ1 of 9\n\n${label}\n(+${STEPS[0].pts} pt)`,700,()=>setStep(0));
  };

  const answer=async(value,display)=>{
    if(step<0||step>=STEPS.length)return;
    setMsgs(p=>[...p,{from:"me",text:display,time:nowTime(),id:Math.random()}]);setSearch("");
    const field=STEPS[step].field;const newPreds={...chatPreds,[field]:value};setChatPreds(newPreds);
    const next=step+1;
    if(next<STEPS.length){
      const t1=tObj(curMatch.team1)?.short;const t2=tObj(curMatch.team2)?.short;
      const label=STEPS[next].label.replace("__T1__",t1).replace("__T2__",t2);
      botMsg(`Q${next+1} of 9\n\n${label}\n(+${STEPS[next].pts} pt${STEPS[next].pts>1?"s":""})`,650,()=>setStep(next));
    }else{
      setStep(99);
      botMsg(`🎉 All 9 predictions saved!\n\nGood luck ${who.name}! 🏏\nMax ${MAX_PTS} pts today!`,600);
      const key=`${curMatch.id}_${who.name}`;const u={...preds,[key]:newPreds};setPreds(u);await dbSet("preds",u);
    }
  };

  const addMatch=async()=>{
    if(!mSetup.team1||!mSetup.team2||mSetup.team1===mSetup.team2){tip("Pick 2 different teams!","err");return;}
    const m={id:mc,...mSetup};const u=[...matches,m];setMatches(u);
    const nc=mc+1;setMc(nc);await dbSet("matches",u);await dbSet("mc",nc);
    setMSetup({team1:"",team2:"",date:new Date().toISOString().slice(0,10),lockTime:""});
    tip(`Match #${m.id} added! 🏏`);
  };

  const tryPin=()=>{
    if(pinInput===pendingWho.pin){
      setWho(pendingWho);setPinInput("");setPinErr("");
      if(pendingWho.name===ADMIN_NAME){setScreen(SCR.ADMIN);}
      else{
        const today=new Date().toISOString().slice(0,10);
        const tm=matches.filter(m=>m.date===today);
        const unp=tm.filter(m=>!preds[`${m.id}_${pendingWho.name}`]?.toss&&!isLocked(m));
        if(unp.length===1){setCurMatch(unp[0]);setStep(0);setMsgs([]);setTyping(false);setScreen(SCR.CHAT);setTimeout(()=>startChat(unp[0]),100);}
        else setScreen(SCR.DASH);
      }
    }else{setPinErr("Wrong PIN!");setPinShake(true);setTimeout(()=>setPinShake(false),500);setPinInput("");}
  };
  const logout=()=>{setWho(null);setCurMatch(null);setScreen(SCR.LAND);};

  const chkEq=(a,b)=>a===b;
  const chkStr=(a,b)=>a&&b&&a.toLowerCase()===b.toLowerCase();
  const calcPts=(p,r)=>{
    if(!p||!r)return 0;let pts=0;
    if(chkEq(p.toss,r.tossWinner))pts+=SC.toss;if(chkEq(p.tossDecision,r.tossDecision))pts+=SC.tossDecision;
    if(chkEq(p.winner,r.winner))pts+=SC.winner;if(chkStr(p.topScorer,r.topScorer))pts+=SC.topScorer;
    if(chkStr(p.topWicket,r.topWicket))pts+=SC.topWicket;if(chkStr(p.manOfMatch,r.manOfMatch))pts+=SC.manOfMatch;
    if(chkStr(p.sixHitter,r.sixHitter))pts+=SC.sixHitter;if(chkEq(p.pp1,r.pp1))pts+=SC.pp1;if(chkEq(p.pp2,r.pp2))pts+=SC.pp2;
    return pts;
  };

  const submitResults=async()=>{
    const req=["tossWinner","tossDecision","winner","topScorer","topWicket","manOfMatch","sixHitter","pp1","pp2"];
    if(req.some(f=>!rForm[f])){tip("Fill all fields!","err");return;}
    const ur={...results,[adminMatch.id]:rForm};setResults(ur);await dbSet("results",ur);
    const us={};MEMBERS.forEach(pl=>{us[pl.name]=matches.reduce((s,m)=>{const r=ur[m.id];if(!r)return s;return s+calcPts(preds[`${m.id}_${pl.name}`]||{},r);},0);});
    setScores(us);await dbSet("scores",us);tip("Points awarded! 🏆");setScreen(SCR.COMPARE);
  };

  const buildShare=mid=>{
    const r=results[mid];const m=matches.find(x=>x.id===mid);if(!r||!m)return"";
    const srt=[...MEMBERS].sort((a,b)=>(scores[b.name]||0)-(scores[a.name]||0));
    return`🏏 IPL 2026 Match #${mid}\n${tObj(m.team1)?.short} vs ${tObj(m.team2)?.short} | ${m.date}\n\n🎯 ${tObj(r.tossWinner)?.short} chose ${r.tossDecision}\n🏆 Winner: ${tObj(r.winner)?.short}\n🏃 ${r.topScorer} | 🎳 ${r.topWicket}\n⭐ MOTM: ${r.manOfMatch} | 💥 ${r.sixHitter}\n⚡ ${tObj(m.team1)?.short} PP: ${r.pp1} | ${tObj(m.team2)?.short} PP: ${r.pp2}\n\n🏆 STANDINGS:\n${srt.map((p,i)=>`${["🥇","🥈","🥉"][i]||`${i+1}.`} ${p.name} — ${scores[p.name]||0} pts`).join("\n")}`;
  };

  const resetAll=async()=>{
    setMatches([]);setPreds({});setResults({});setScores({});setMc(1);
    await Promise.all([dbSet("matches",[]),dbSet("preds",{}),dbSet("results",{}),dbSet("scores",{}),dbSet("mc",1)]);
    setScreen(SCR.LAND);setWho(null);tip("Reset done!");
  };

  const sorted=[...MEMBERS].sort((a,b)=>(scores[b.name]||0)-(scores[a.name]||0));

  // Styles
  const OR="#f97316";
  const aCard={background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,165,0,0.15)",borderRadius:16,padding:"16px",marginBottom:14};
  const aLbl={fontSize:11,color:OR,fontWeight:700,letterSpacing:0.8,textTransform:"uppercase",display:"block",marginBottom:6,fontFamily:"sans-serif"};
  const aBtnMain={width:"100%",padding:"12px",borderRadius:12,border:"none",background:`linear-gradient(135deg,${OR},#ea580c)`,color:"#fff",fontSize:16,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:2,cursor:"pointer"};
  const adminInp={width:"100%",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,165,0,0.2)",borderRadius:10,padding:"11px 13px",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"sans-serif"};
  const adminSel={width:"100%",background:"#0d0d1a",border:"1px solid rgba(255,165,0,0.2)",borderRadius:10,padding:"11px 13px",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box",fontFamily:"sans-serif",cursor:"pointer"};
  const adminOpt=on=>({flex:1,padding:"10px 6px",borderRadius:10,border:`1px solid ${on?OR:"rgba(255,255,255,0.08)"}`,cursor:"pointer",background:on?`linear-gradient(135deg,${OR},#ea580c)`:"rgba(255,255,255,0.04)",color:on?"#fff":"#aaa",fontSize:12,fontFamily:"sans-serif",fontWeight:on?700:400,display:"flex",flexDirection:"column",alignItems:"center",gap:3});
  const WA_GREEN="#25D366";const WA_HEADER="#075E54";const WA_BG="#E5DDD5";const WA_BOT="#fff";const WA_ME="#DCF8C6";const WA_TICK="#53bdeb";const WA_TIME="#999";
  const qBtn={display:"flex",alignItems:"center",gap:8,padding:"10px 20px",borderRadius:20,border:`1.5px solid ${WA_GREEN}`,background:"#fff",cursor:"pointer",fontFamily:"sans-serif",fontWeight:700,color:WA_HEADER,fontSize:14,boxShadow:"0 1px 4px rgba(0,0,0,0.1)"};

  const TeamOptsAdmin=({value,onChange,match})=>(
    <div style={{display:"flex",gap:8}}>
      {[match?.team1,match?.team2].filter(Boolean).map(tn=>{const t=tObj(tn);return(
        <button key={tn} style={adminOpt(value===tn)} onClick={()=>onChange(tn)}>
          <div style={{width:28,height:28,borderRadius:"50%",background:t?.color,border:`1px solid ${t?.accent}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:800,color:"#fff"}}>{t?.short}</div>
          <div>{t?.short}</div>
        </button>
      );})}
    </div>
  );
  const PPRangeAdmin=({value,onChange})=>(
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
      {PP_RANGES.map(r=><button key={r} style={adminOpt(value===r)} onClick={()=>onChange(r)}><div style={{fontSize:12}}>{r==="< 40"?"🔻":r==="> 70"?"🔺":"⚡"}</div><div style={{fontSize:11,fontWeight:700}}>{r}</div></button>)}
    </div>
  );

  if(loading)return(
    <div style={{minHeight:"100vh",background:"#0a0f1e",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes blink{0%,80%,100%{opacity:0.2}40%{opacity:1}}`}</style>
      <div style={{fontSize:60,marginBottom:16}}>🏏</div>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:40,color:"#fff",letterSpacing:4,background:"linear-gradient(135deg,#f97316,#ea580c)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>IPL 2026</div>
      <div style={{color:"rgba(255,255,255,0.5)",fontSize:14,marginTop:8,fontFamily:"Poppins,sans-serif"}}>Loading predictions...</div>
      <div style={{display:"flex",gap:8,marginTop:20}}>
        {[0,1,2].map(i=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:OR,animation:"blink 1.4s infinite",animationDelay:`${i*0.2}s`}}/>)}
      </div>
    </div>
  );

  return(
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink{0%,80%,100%{opacity:0}40%{opacity:1}}
        @keyframes slideIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .msg-in{animation:slideIn 0.2s ease}
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        body{margin:0;padding:0;max-width:480px;margin:0 auto}
      `}</style>

      {/* ══════════ LANDING — IPL DASHBOARD STYLE ══════════ */}
      {screen===SCR.LAND&&(
        <div style={{minHeight:"100vh",background:"#0a0f1e",fontFamily:"Poppins,sans-serif",overflow:"hidden"}}>
          {/* Hero banner */}
          <div style={{background:"linear-gradient(135deg,#0a2a4a 0%,#1a1a35 50%,#0a0f1e 100%)",padding:"28px 20px 24px",position:"relative",overflow:"hidden"}}>
            {/* decorative circles */}
            <div style={{position:"absolute",top:-40,right:-40,width:180,height:180,borderRadius:"50%",background:"rgba(249,115,22,0.08)",pointerEvents:"none"}}/>
            <div style={{position:"absolute",bottom:-30,left:-30,width:120,height:120,borderRadius:"50%",background:"rgba(249,115,22,0.05)",pointerEvents:"none"}}/>
            <div style={{display:"flex",alignItems:"center",gap:14,position:"relative"}}>
              <div style={{fontSize:48}}>🏏</div>
              <div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:36,letterSpacing:4,lineHeight:1,background:"linear-gradient(135deg,#f97316,#fbbf24)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>IPL 2026</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"rgba(255,255,255,0.5)",letterSpacing:3}}>PREDICTION LEAGUE</div>
              </div>
            </div>
            {/* Today's match banner */}
            {(()=>{
              const today=new Date().toISOString().slice(0,10);
              const tm=matches.filter(m=>m.date===today);
              if(tm.length===0)return<div style={{marginTop:16,fontSize:12,color:"rgba(255,255,255,0.3)",fontFamily:"Poppins,sans-serif"}}>No match today</div>;
              return(
                <div style={{marginTop:16,background:"rgba(249,115,22,0.12)",borderRadius:14,padding:"12px 14px",border:"1px solid rgba(249,115,22,0.2)"}}>
                  <div style={{fontSize:10,color:OR,fontWeight:700,letterSpacing:1,marginBottom:8}}>🔥 TODAY'S MATCH{tm.length>1?"ES":""}</div>
                  {tm.map(m=>(
                    <div key={m.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:tm.length>1?8:0}}>
                      <Ball name={m.team1} size={32}/>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:14,color:"#fff"}}>{tObj(m.team1)?.short} vs {tObj(m.team2)?.short}</div>
                        <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:1}}>
                          {m.lockTime?(isLocked(m)?"🔒 Predictions closed":"🔓 Closes "+new Date(m.lockTime).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})):"Open"}
                        </div>
                      </div>
                      <Ball name={m.team2} size={32}/>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Leaderboard mini */}
          {Object.keys(scores).length>0&&(
            <div style={{padding:"16px 20px 8px"}}>
              <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.3)",letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>🏆 Current Standings</div>
              <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
                {sorted.slice(0,5).map((pl,i)=>(
                  <div key={pl.name} style={{flex:"0 0 auto",background:i===0?"rgba(249,115,22,0.15)":"rgba(255,255,255,0.05)",borderRadius:12,padding:"10px 14px",textAlign:"center",border:i===0?"1px solid rgba(249,115,22,0.3)":"1px solid rgba(255,255,255,0.06)",minWidth:70}}>
                    <div style={{fontSize:18}}>{["🥇","🥈","🥉"][i]||`${i+1}`}</div>
                    <div style={{fontSize:12,fontWeight:700,color:"#fff",marginTop:4}}>{pl.name}</div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:OR,lineHeight:1.2}}>{scores[pl.name]||0}</div>
                    <div style={{fontSize:9,color:"rgba(255,255,255,0.3)"}}>pts</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Member list */}
          <div style={{padding:"8px 20px 24px"}}>
            <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.3)",letterSpacing:1,textTransform:"uppercase",marginBottom:12}}>👇 Tap your name to predict</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {MEMBERS.map((m,i)=>{
                const today=new Date().toISOString().slice(0,10);
                const tm=matches.filter(x=>x.date===today);
                const hasPred=tm.some(x=>!!preds[`${x.id}_${m.name}`]?.toss);
                const isAdmin_=m.name===ADMIN_NAME;
                return(
                  <button key={i} onClick={()=>{setPendingWho(m);setPinInput("");setPinErr("");setScreen(SCR.PIN);}}
                    style={{background:isAdmin_?"rgba(74,144,226,0.12)":hasPred?"rgba(34,197,94,0.1)":"rgba(255,255,255,0.05)",border:`1px solid ${isAdmin_?"rgba(74,144,226,0.3)":hasPred?"rgba(34,197,94,0.3)":"rgba(255,255,255,0.1)"}`,borderRadius:16,padding:"14px 12px",cursor:"pointer",textAlign:"center",transition:"all 0.15s"}}
                    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                    <div style={{fontSize:30,marginBottom:6}}>{emo(m.name)}</div>
                    <div style={{fontWeight:700,fontSize:15,color:"#fff"}}>{m.name}</div>
                    <div style={{fontSize:11,marginTop:4,color:isAdmin_?"#4A90E2":hasPred?"#22c55e":"rgba(255,255,255,0.3)"}}>
                      {isAdmin_?"⭐ Admin":hasPred?"✓ Predicted":"Tap to predict"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ PIN ══════════ */}
      {screen===SCR.PIN&&(
        <div style={{minHeight:"100vh",background:"#0D1B3E",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 16px",fontFamily:"Poppins,sans-serif"}}>
          <div style={{width:"100%",maxWidth:310,animation:"fadeUp 0.3s ease"}}>
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontSize:50}}>{emo(pendingWho?.name||"")}</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:30,color:"#fff",letterSpacing:2,marginTop:6}}>{pendingWho?.name}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.35)",marginTop:4}}>{pendingWho?.name===ADMIN_NAME?"Admin PIN":"Your secret PIN"}</div>
            </div>
            <div style={{background:"rgba(255,255,255,0.07)",borderRadius:20,padding:"20px 18px",border:"1px solid rgba(255,255,255,0.12)",animation:pinShake?"shake 0.4s ease":"none"}}>
              <div style={{display:"flex",justifyContent:"center",gap:14,marginBottom:16}}>
                {[0,1,2,3].map(i=><div key={i} style={{width:13,height:13,borderRadius:"50%",background:pinInput.length>i?"#4A90E2":"rgba(255,255,255,0.12)",transition:"all 0.15s",boxShadow:pinInput.length>i?"0 0 8px #4A90E2":""}}/>)}
              </div>
              <input style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:10,padding:"12px 14px",color:"#fff",fontSize:20,outline:"none",boxSizing:"border-box",fontFamily:"sans-serif",textAlign:"center",letterSpacing:10,marginBottom:8}}
                type="password" inputMode="numeric" maxLength={6} placeholder="••••"
                value={pinInput} onChange={e=>setPinInput(e.target.value.replace(/\D/g,""))}
                onKeyDown={e=>e.key==="Enter"&&tryPin()} autoFocus/>
              {pinErr&&<div style={{fontSize:12,color:"#ff6b6b",textAlign:"center",marginBottom:8}}>{pinErr}</div>}
              <button onClick={tryPin} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#4A90E2,#1a5fac)",color:"#fff",fontSize:15,fontFamily:"Poppins,sans-serif",fontWeight:700,cursor:"pointer"}}>UNLOCK</button>
              <button onClick={()=>setScreen(SCR.LAND)} style={{width:"100%",padding:"9px",borderRadius:10,border:"1px solid rgba(255,255,255,0.12)",background:"transparent",color:"rgba(255,255,255,0.35)",fontSize:12,fontFamily:"Poppins,sans-serif",cursor:"pointer",marginTop:8}}>← Change Name</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginTop:16}}>
              {[1,2,3,4,5,6,7,8,9,"","0","⌫"].map((k,i)=>(
                <button key={i} onClick={()=>{if(k==="⌫")setPinInput(p=>p.slice(0,-1));else if(k!=="")setPinInput(p=>p.length<6?p+k:p);}}
                  style={{padding:"14px",borderRadius:11,border:"1px solid rgba(255,255,255,0.1)",background:k===""?"transparent":"rgba(255,255,255,0.07)",color:"#fff",fontSize:17,fontFamily:"'Bebas Neue',sans-serif",cursor:k===""?"default":"pointer"}}
                  onMouseEnter={e=>{if(k!=="")e.currentTarget.style.background="rgba(74,144,226,0.25)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background=k===""?"transparent":"rgba(255,255,255,0.07)";}}>
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ DASHBOARD — player match list ══════════ */}
      {screen===SCR.DASH&&who&&(
        <div style={{minHeight:"100vh",background:"#0a0f1e",fontFamily:"Poppins,sans-serif"}}>
          {/* Header */}
          <div style={{background:"linear-gradient(135deg,#0a2a4a,#1a1a35)",padding:"16px 18px",position:"sticky",top:0,zIndex:10,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#f97316,#ea580c)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{emo(who.name)}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:16,color:"#fff"}}>{who.name}</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>Select a match to predict</div>
              </div>
              <button onClick={logout} style={{padding:"6px 14px",borderRadius:8,border:"1px solid rgba(255,255,255,0.15)",background:"transparent",color:"rgba(255,255,255,0.6)",fontSize:12,cursor:"pointer"}}>Exit</button>
            </div>
          </div>

          <div style={{padding:"16px"}}>
            {matches.length===0&&<div style={{textAlign:"center",color:"rgba(255,255,255,0.3)",fontSize:13,padding:40}}>No matches yet.<br/>Ask VSN to add matches! 🏏</div>}
            {matches.map(m=>{
              const lk=isLocked(m);const hasPred=!!preds[`${m.id}_${who.name}`]?.toss;
              const t1=tObj(m.team1);const t2=tObj(m.team2);
              const sameDay=matches.filter(x=>x.date===m.date);const idx=sameDay.findIndex(x=>x.id===m.id);
              return(
                <div key={m.id} onClick={()=>{if(lk&&!hasPred){tip("Match is locked!","err");return;}setCurMatch(m);setStep(0);setMsgs([]);setTyping(false);setScreen(SCR.CHAT);setTimeout(()=>startChat(m),100);}}
                  style={{background:hasPred?"rgba(34,197,94,0.08)":lk?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.05)",border:`1px solid ${hasPred?"rgba(34,197,94,0.25)":lk?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.1)"}`,borderRadius:16,padding:"14px 16px",marginBottom:12,cursor:lk&&!hasPred?"default":"pointer",opacity:lk&&!hasPred?0.5:1,transition:"all 0.15s"}}
                  onMouseEnter={e=>{if(!(lk&&!hasPred))e.currentTarget.style.transform="translateY(-1px)";}}
                  onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                  {/* Team vs Team */}
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{textAlign:"center"}}>
                      <Ball name={m.team1} size={44}/>
                      <div style={{fontSize:11,color:"#fff",fontWeight:700,marginTop:4}}>{t1?.short}</div>
                    </div>
                    <div style={{flex:1,textAlign:"center"}}>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:OR,letterSpacing:2}}>VS</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",marginTop:2}}>{m.date}</div>
                      {sameDay.length>1&&<div style={{fontSize:10,color:OR,fontWeight:700,marginTop:2}}>Match {idx+1} of {sameDay.length}</div>}
                    </div>
                    <div style={{textAlign:"center"}}>
                      <Ball name={m.team2} size={44}/>
                      <div style={{fontSize:11,color:"#fff",fontWeight:700,marginTop:4}}>{t2?.short}</div>
                    </div>
                  </div>
                  {/* Status */}
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:12,paddingTop:10,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                    <div style={{fontSize:12,color:hasPred?"#22c55e":lk?"#ef4444":"rgba(255,255,255,0.5)"}}>
                      {hasPred?<><span style={{color:"#53bdeb"}}>✓✓</span> Predicted ✅</>:lk?"🔒 Locked":"🔓 Tap to predict · 9 questions"}
                    </div>
                    {m.lockTime&&!lk&&<div style={{fontSize:11,color:"rgba(255,165,0,0.6)"}}>Closes {new Date(m.lockTime).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════ CHAT — WhatsApp style prediction ══════════ */}
      {screen===SCR.CHAT&&who&&curMatch&&(
        <div style={{height:"100vh",display:"flex",flexDirection:"column",fontFamily:"sans-serif",overflow:"hidden"}}>
          {/* Header */}
          <div style={{background:WA_HEADER,padding:"10px 14px",flexShrink:0,boxShadow:"0 1px 6px rgba(0,0,0,0.3)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <button onClick={()=>setScreen(SCR.DASH)} style={{background:"transparent",border:"none",color:"rgba(255,255,255,0.8)",fontSize:24,cursor:"pointer",padding:0,lineHeight:1}}>‹</button>
              <div style={{width:42,height:42,borderRadius:"50%",background:`linear-gradient(135deg,${WA_GREEN},#128C7E)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🏏</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"Poppins,sans-serif",fontWeight:700,fontSize:15,color:"#fff"}}>IPL Predictor Bot</div>
                <div style={{fontFamily:"Poppins,sans-serif",fontSize:11,color:"rgba(255,255,255,0.65)"}}>
                  {typing?"typing...":step>=0&&step<STEPS.length?`Q${step+1} of 9 · ${tObj(curMatch.team1)?.short} vs ${tObj(curMatch.team2)?.short}`:step===99?"Done ✅":""}
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3}}>
                <div style={{width:56,height:4,background:"rgba(255,255,255,0.2)",borderRadius:2,overflow:"hidden"}}>
                  <div style={{width:`${step>=0&&step<STEPS.length?(step/STEPS.length)*100:step===99?100:0}%`,height:"100%",background:"#fff",borderRadius:2,transition:"width 0.4s"}}/>
                </div>
                <span style={{color:"rgba(255,255,255,0.7)",fontSize:10}}>{step>=0&&step<STEPS.length?`${step+1}/9`:step===99?"✓":"–"}</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{flex:1,overflowY:"auto",background:WA_BG,padding:"10px 10px 6px"}}>
            {msgs.map(msg=>{const isMe=msg.from==="me";return(
              <div key={msg.id} className="msg-in" style={{display:"flex",justifyContent:isMe?"flex-end":"flex-start",marginBottom:4,paddingLeft:isMe?"40px":"0",paddingRight:isMe?"0":"40px"}}>
                <div style={{background:isMe?WA_ME:WA_BOT,borderRadius:isMe?"10px 2px 10px 10px":"2px 10px 10px 10px",padding:"8px 10px 5px",maxWidth:"90%",boxShadow:"0 1px 2px rgba(0,0,0,0.13)",minWidth:80}}>
                  <div style={{fontSize:14,color:"#111",lineHeight:1.55,whiteSpace:"pre-wrap"}}>{msg.text}</div>
                  <div style={{display:"flex",alignItems:"center",gap:3,justifyContent:"flex-end",marginTop:2}}>
                    <span style={{fontSize:10,color:WA_TIME}}>{msg.time}</span>
                    {isMe&&<span style={{fontSize:13,color:WA_TICK}}>✓✓</span>}
                  </div>
                </div>
              </div>
            );})}
            {typing&&<div style={{display:"flex",justifyContent:"flex-start",marginBottom:4,paddingRight:40}}>
              <div style={{background:WA_BOT,borderRadius:"2px 10px 10px 10px",padding:"10px 14px",boxShadow:"0 1px 2px rgba(0,0,0,0.1)",display:"flex",gap:4,alignItems:"center"}}>
                {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:"#aaa",animation:"blink 1.4s infinite",animationDelay:`${i*0.2}s`}}/>)}
              </div>
            </div>}
            <div ref={bottomRef}/>
          </div>

          {/* Input area */}
          <div style={{flexShrink:0,borderTop:"2px solid #ddd",background:"#F0F0F0"}}>
            {step===-1&&<div style={{padding:"10px 12px 14px",display:"flex",gap:8}}>
              <button onClick={()=>{const ex=preds[`${curMatch.id}_${who.name}`]||{};setChatPreds(ex);const t1=tObj(curMatch.team1)?.short;const t2=tObj(curMatch.team2)?.short;const label=STEPS[0].label.replace("__T1__",t1).replace("__T2__",t2);setMsgs(p=>[...p,{from:"me",text:"Edit 📝",time:nowTime(),id:Math.random()}]);botMsg(`Q1 of 9\n\n${label}\n(+${STEPS[0].pts} pt)`,600,()=>setStep(0));}} style={{...qBtn,flex:1,justifyContent:"center"}}>📝 Edit</button>
              <button onClick={()=>{setMsgs(p=>[...p,{from:"me",text:"Keep ✅",time:nowTime(),id:Math.random()}]);setStep(99);botMsg("Predictions locked! 🔒 Good luck!",600);}} style={{...qBtn,flex:1,justifyContent:"center",background:"#f5f5f5",color:"#555"}}>✅ Keep</button>
            </div>}

            {step>=0&&step<STEPS.length&&STEPS[step].type==="team"&&(
              <div style={{padding:"10px 12px 14px",display:"flex",gap:10,justifyContent:"center"}}>
                {[curMatch.team1,curMatch.team2].filter(Boolean).map(tn=>{const t=tObj(tn);return(
                  <button key={tn} onClick={()=>answer(tn,`${t?.short} 🏏`)} style={qBtn}>
                    <div style={{width:26,height:26,borderRadius:"50%",background:t?.color,border:`1px solid ${t?.accent}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:800,color:"#fff"}}>{t?.short}</div>
                    <span>{t?.short}</span>
                  </button>
                );})}
              </div>
            )}

            {step>=0&&step<STEPS.length&&STEPS[step].type==="batbowl"&&(
              <div style={{padding:"10px 12px 14px",display:"flex",gap:10,justifyContent:"center"}}>
                {[{v:"Bat",i:"🏏"},{v:"Bowl",i:"🎳"}].map(d=><button key={d.v} onClick={()=>answer(d.v,`${d.i} ${d.v}`)} style={{...qBtn,padding:"12px 32px"}}>{d.i} {d.v}</button>)}
              </div>
            )}

            {step>=0&&step<STEPS.length&&STEPS[step].type==="pprange"&&(
              <div style={{padding:"10px 12px 14px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {PP_RANGES.map(r=><button key={r} onClick={()=>answer(r,`⚡ ${r}`)} style={{...qBtn,padding:"12px 8px",justifyContent:"center"}}>{r==="< 40"?"🔻 ":r==="> 70"?"🔺 ":"⚡ "}{r}</button>)}
              </div>
            )}

            {step>=0&&step<STEPS.length&&STEPS[step].type==="player"&&(
              <div>
                {/* Player suggestions — only from match teams */}
                <div style={{background:"#fff",borderTop:"1px solid #eee",maxHeight:200,overflowY:"auto"}}>
                  {(()=>{
                    const matchPlayers=getMatchPlayers(curMatch.team1,curMatch.team2);
                    const show=search.trim().length>0?matchPlayers.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())):matchPlayers;
                    // Group by team
                    return [curMatch.team1,curMatch.team2].map(teamName=>{
                      const t=tObj(teamName);
                      const tp=show.filter(p=>p.team===t?.short);
                      if(tp.length===0)return null;
                      return(
                        <div key={teamName}>
                          <div style={{padding:"5px 14px",background:`${t?.color}15`,fontSize:10,fontWeight:800,color:t?.color,letterSpacing:1,textTransform:"uppercase"}}>{t?.short} — {teamName}</div>
                          {tp.map((p,i)=>(
                            <div key={i} onMouseDown={()=>{answer(p.name,p.name);setSearch("");}}
                              style={{display:"flex",alignItems:"center",gap:10,padding:"9px 16px",cursor:"pointer",borderBottom:"1px solid #f8f8f8"}}
                              onMouseEnter={e=>e.currentTarget.style.background=`${t?.color}15`}
                              onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                              <div style={{width:26,height:26,borderRadius:"50%",background:t?.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:800,color:"#fff",flexShrink:0}}>{t?.short}</div>
                              <span style={{fontSize:14,fontWeight:600,color:"#222",flex:1}}>{p.name}</span>
                            </div>
                          ))}
                        </div>
                      );
                    });
                  })()}
                </div>
                {/* Search bar */}
                <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"#F0F0F0"}}>
                  <div style={{flex:1,background:"#fff",borderRadius:24,display:"flex",alignItems:"center",padding:"0 14px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)"}}>
                    <span style={{fontSize:16,color:"#bbb",marginRight:8}}>🔍</span>
                    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={`Search ${tObj(curMatch.team1)?.short} & ${tObj(curMatch.team2)?.short} players...`}
                      style={{flex:1,border:"none",outline:"none",fontSize:13,padding:"11px 0",background:"transparent",color:"#333",fontFamily:"sans-serif"}} autoFocus/>
                    {search&&<button onClick={()=>setSearch("")} style={{background:"transparent",border:"none",color:"#aaa",fontSize:18,cursor:"pointer"}}>×</button>}
                  </div>
                </div>
              </div>
            )}

            {step===99&&<div style={{padding:"10px 12px 14px",textAlign:"center"}}>
              <button onClick={()=>setScreen(SCR.DASH)} style={{...qBtn,padding:"12px 32px",justifyContent:"center",background:WA_GREEN,borderColor:WA_GREEN,color:"#fff"}}>← Back to Matches</button>
            </div>}
          </div>
        </div>
      )}

      {/* ══════════ ADMIN ══════════ */}
      {screen===SCR.ADMIN&&who?.name===ADMIN_NAME&&(
        <div style={{minHeight:"100vh",background:"#080810",color:"#fff",fontFamily:"Poppins,sans-serif"}}>
          <div style={{background:"linear-gradient(135deg,#1a0a00,#0d0d20)",borderBottom:"1px solid rgba(255,165,0,0.2)",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:OR,letterSpacing:2}}>⭐ ADMIN PANEL</div>
              <div style={{fontSize:10,color:"#555"}}>VSN · IPL 2026 · {MAX_PTS} pts/match · Cloud sync ✅</div>
            </div>
            <button onClick={logout} style={{padding:"7px 14px",borderRadius:8,border:"1px solid rgba(249,115,22,0.3)",background:"transparent",color:OR,fontSize:12,cursor:"pointer"}}>Logout</button>
          </div>
          <div style={{maxWidth:520,margin:"0 auto",padding:"16px"}}>
            {/* Add Match */}
            <div style={aCard}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:OR,letterSpacing:2,marginBottom:14}}>➕ ADD MATCH</div>
              <div style={{marginBottom:12}}><label style={aLbl}>Team 1</label>
                <select style={adminSel} value={mSetup.team1} onChange={e=>setMSetup({...mSetup,team1:e.target.value})}>
                  <option value="">Select...</option>{IPL_TEAMS.map(t=><option key={t.name} value={t.name}>{t.short} – {t.name}</option>)}
                </select>
              </div>
              <div style={{marginBottom:12}}><label style={aLbl}>Team 2</label>
                <select style={adminSel} value={mSetup.team2} onChange={e=>setMSetup({...mSetup,team2:e.target.value})}>
                  <option value="">Select...</option>{IPL_TEAMS.filter(t=>t.name!==mSetup.team1).map(t=><option key={t.name} value={t.name}>{t.short} – {t.name}</option>)}
                </select>
              </div>
              <div style={{marginBottom:12}}><label style={aLbl}>Match Date</label>
                <input type="date" style={adminInp} value={mSetup.date} onChange={e=>{const d=e.target.value;const day=new Date(d+"T00:00:00").getDay();setMSetup({...mSetup,date:d,lockTime:d?`${d}T${day===0||day===6?"15:30":"19:30"}`:""});}}/>
              </div>
              <div style={{marginBottom:14}}><label style={aLbl}>🔒 Lock At <span style={{color:"#22c55e",fontSize:10,fontWeight:400,textTransform:"none"}}>(auto-set)</span></label>
                <input type="datetime-local" style={adminInp} value={mSetup.lockTime} onChange={e=>setMSetup({...mSetup,lockTime:e.target.value})}/>
                <div style={{fontSize:11,color:"#444",marginTop:4}}>Evening = 7:30 PM · Sat/Sun 1st match = 3:30 PM</div>
              </div>
              <button onClick={addMatch} style={aBtnMain}>ADD MATCH</button>
            </div>

            {/* Matches */}
            {matches.length>0&&<div style={aCard}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:OR,letterSpacing:2,marginBottom:12}}>🏟️ MATCHES</div>
              {matches.map(m=>{
                const done=!!results[m.id];const lk=isLocked(m);
                const dc=MEMBERS.filter(pl=>preds[`${m.id}_${pl.name}`]?.toss).length;
                return(
                  <div key={m.id} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"10px 12px",marginBottom:8,border:"1px solid rgba(255,255,255,0.05)"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <Ball name={m.team1} size={28}/><div style={{flex:1}}>
                        <div style={{fontSize:12,fontWeight:600,color:"#ddd"}}>{tObj(m.team1)?.short} vs {tObj(m.team2)?.short} · #{m.id}</div>
                        <div style={{fontSize:10,color:"#555",marginTop:1}}>{m.date} · {dc}/{MEMBERS.length} predicted {lk?"🔒":"🔓"}</div>
                      </div><Ball name={m.team2} size={28}/>
                    </div>
                    <div style={{display:"flex",gap:6,marginTop:8}}>
                      <button onClick={()=>{setAdminMatch(m);setRForm({tossWinner:"",tossDecision:"",winner:"",topScorer:"",topWicket:"",manOfMatch:"",sixHitter:"",pp1:"",pp2:""});setScreen(SCR.RESULTS);}}
                        style={{flex:1,padding:"7px",borderRadius:8,border:"none",background:done?"rgba(249,115,22,0.15)":"linear-gradient(135deg,#f97316,#ea580c)",color:done?OR:"#fff",fontSize:11,fontFamily:"Poppins,sans-serif",fontWeight:600,cursor:"pointer"}}>
                        {done?"✏️ Edit Results":"📋 Enter Results"}
                      </button>
                      {done&&<button onClick={()=>{setAdminMatch(m);setScreen(SCR.COMPARE);}}
                        style={{flex:1,padding:"7px",borderRadius:8,border:"none",background:"rgba(34,197,94,0.12)",color:"#22c55e",fontSize:11,fontFamily:"Poppins,sans-serif",fontWeight:600,cursor:"pointer"}}>📊 Compare</button>}
                    </div>
                  </div>
                );
              })}
            </div>}

            {/* Leaderboard */}
            {Object.keys(scores).length>0&&<div style={aCard}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:OR,letterSpacing:2,marginBottom:12}}>🏆 LEADERBOARD</div>
              {sorted.map((pl,i)=>(
                <div key={pl.name} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 10px",borderRadius:10,background:i===0?"rgba(249,115,22,0.08)":"rgba(255,255,255,0.02)",marginBottom:4}}>
                  <div style={{fontSize:22,width:28}}>{["🥇","🥈","🥉"][i]||`${i+1}`}</div>
                  <div style={{fontSize:22}}>{emo(pl.name)}</div>
                  <div style={{flex:1,fontWeight:700,fontSize:14,color:"#fff"}}>{pl.name}</div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:OR}}>{scores[pl.name]||0}</div>
                  <div style={{fontSize:10,color:"#444"}}>pts</div>
                </div>
              ))}
            </div>}
            <button onClick={resetAll} style={{width:"100%",padding:"10px",borderRadius:10,border:"none",background:"rgba(255,255,255,0.03)",color:"#333",fontSize:11,cursor:"pointer"}}>🗑️ Reset All Data</button>
          </div>
        </div>
      )}

      {/* ══════════ RESULTS ══════════ */}
      {screen===SCR.RESULTS&&who?.name===ADMIN_NAME&&adminMatch&&(
        <div style={{minHeight:"100vh",background:"#080810",color:"#fff",fontFamily:"Poppins,sans-serif",paddingBottom:40}}>
          <div style={{background:"rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,165,0,0.2)",padding:"14px 20px",display:"flex",gap:12,alignItems:"center"}}>
            <button onClick={()=>setScreen(SCR.ADMIN)} style={{padding:"7px 14px",borderRadius:8,border:"1px solid rgba(255,165,0,0.3)",background:"transparent",color:OR,fontSize:12,cursor:"pointer"}}>← Back</button>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:OR,letterSpacing:2}}>ENTER RESULTS</div>
          </div>
          <div style={{maxWidth:520,margin:"0 auto",padding:"16px"}}>
            <div style={{...aCard,textAlign:"center",marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:16}}>
                <Ball name={adminMatch.team1} size={48}/><div style={{color:OR,fontFamily:"'Bebas Neue',sans-serif",fontSize:20}}>VS</div><Ball name={adminMatch.team2} size={48}/>
              </div>
              <div style={{fontSize:11,color:"#555",marginTop:6}}>Match #{adminMatch.id} · {adminMatch.date}</div>
            </div>
            <div style={aCard}>
              <div style={{marginBottom:14}}><label style={aLbl}>🎯 Toss Winner</label><TeamOptsAdmin value={rForm.tossWinner} onChange={v=>setRForm(p=>({...p,tossWinner:v}))} match={adminMatch}/></div>
              <div style={{marginBottom:14}}><label style={aLbl}>🏏 Toss Decision</label>
                <div style={{display:"flex",gap:8}}>
                  {["Bat","Bowl"].map(d=><button key={d} style={adminOpt(rForm.tossDecision===d)} onClick={()=>setRForm(p=>({...p,tossDecision:d}))}><div style={{fontSize:18}}>{d==="Bat"?"🏏":"🎳"}</div><div>{d}</div></button>)}
                </div>
              </div>
              <div style={{marginBottom:14}}><label style={aLbl}>🏆 Match Winner</label><TeamOptsAdmin value={rForm.winner} onChange={v=>setRForm(p=>({...p,winner:v}))} match={adminMatch}/></div>
              <div style={{marginBottom:14}}><label style={aLbl}>⚡ {tObj(adminMatch.team1)?.short} Powerplay</label><PPRangeAdmin value={rForm.pp1} onChange={v=>setRForm(p=>({...p,pp1:v}))}/></div>
              <div style={{marginBottom:14}}><label style={aLbl}>⚡ {tObj(adminMatch.team2)?.short} Powerplay</label><PPRangeAdmin value={rForm.pp2} onChange={v=>setRForm(p=>({...p,pp2:v}))}/></div>
              {[{k:"topScorer",lb:"🏃 Top Run Scorer"},{k:"topWicket",lb:"🎳 Top Wicket Taker"},{k:"manOfMatch",lb:"⭐ Man of the Match"},{k:"sixHitter",lb:"💥 Most Sixes"}].map(f=>(
                <div key={f.k} style={{marginBottom:14}}>
                  <label style={aLbl}>{f.lb} <span style={{color:"rgba(255,255,255,0.3)",fontSize:9,fontWeight:400,textTransform:"none"}}>(only {tObj(adminMatch.team1)?.short} & {tObj(adminMatch.team2)?.short} players)</span></label>
                  <AdminPlayerPicker value={rForm[f.k]} onChange={v=>setRForm(p=>({...p,[f.k]:v}))} match={adminMatch}/>
                </div>
              ))}
              <button onClick={submitResults} style={{...aBtnMain,marginTop:4}}>🏆 SUBMIT & AWARD POINTS</button>
            </div>
            {/* All predictions */}
            <div style={aCard}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:15,color:OR,letterSpacing:2,marginBottom:10}}>👁️ ALL PREDICTIONS</div>
              {MEMBERS.map(pl=>{const p=preds[`${adminMatch.id}_${pl.name}`]||{};return(
                <div key={pl.name} style={{borderBottom:"1px solid rgba(255,255,255,0.05)",paddingBottom:8,marginBottom:8}}>
                  <div style={{fontWeight:700,fontSize:13,color:OR,marginBottom:4}}>{emo(pl.name)} {pl.name}</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2,fontSize:11,color:"#666"}}>
                    <span>🎯 {tObj(p.toss)?.short||"—"}</span><span>🏏 {p.tossDecision||"—"}</span>
                    <span>🏆 {tObj(p.winner)?.short||"—"}</span><span>⚡{tObj(adminMatch.team1)?.short} PP: {p.pp1||"—"}</span>
                    <span>⚡{tObj(adminMatch.team2)?.short} PP: {p.pp2||"—"}</span><span>🏃 {p.topScorer||"—"}</span>
                    <span>🎳 {p.topWicket||"—"}</span><span>⭐ {p.manOfMatch||"—"}</span>
                    <span>💥 {p.sixHitter||"—"}</span>
                  </div>
                </div>
              );})}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ COMPARE ══════════ */}
      {screen===SCR.COMPARE&&who?.name===ADMIN_NAME&&adminMatch&&(
        <div style={{minHeight:"100vh",background:"#080810",color:"#fff",fontFamily:"Poppins,sans-serif",paddingBottom:40}}>
          <div style={{background:"rgba(255,255,255,0.04)",borderBottom:"1px solid rgba(255,165,0,0.2)",padding:"14px 20px",display:"flex",gap:10,alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <button onClick={()=>setScreen(SCR.ADMIN)} style={{padding:"7px 14px",borderRadius:8,border:"1px solid rgba(255,165,0,0.3)",background:"transparent",color:OR,fontSize:12,cursor:"pointer"}}>← Back</button>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:OR,letterSpacing:2}}>RESULTS</div>
            </div>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(buildShare(adminMatch.id))}`,"_blank")}
                style={{padding:"7px 12px",borderRadius:8,border:"none",background:"#25D366",color:"#fff",fontSize:12,fontFamily:"Poppins,sans-serif",fontWeight:700,cursor:"pointer"}}>💬 WhatsApp</button>
              <button onClick={()=>navigator.clipboard.writeText(buildShare(adminMatch.id)).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);})}
                style={{padding:"7px 12px",borderRadius:8,border:"1px solid rgba(255,165,0,0.3)",background:"transparent",color:OR,fontSize:12,cursor:"pointer"}}>{copied?"✅":"📋"}</button>
            </div>
          </div>
          <div style={{maxWidth:520,margin:"0 auto",padding:"16px"}}>
            {(()=>{const r=results[adminMatch.id];if(!r)return null;return(
              <div style={{...aCard,background:"rgba(249,115,22,0.07)",border:"1px solid rgba(249,115,22,0.2)"}}>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:14,marginBottom:12}}>
                  <Ball name={adminMatch.team1} size={44}/><div style={{color:OR,fontFamily:"'Bebas Neue',sans-serif",fontSize:18}}>VS</div><Ball name={adminMatch.team2} size={44}/>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                  {[{lb:"🎯 Toss",v:`${tObj(r.tossWinner)?.short} → ${r.tossDecision}`},{lb:"🏆 Winner",v:tObj(r.winner)?.short},{lb:"🏃 Scorer",v:r.topScorer},{lb:"⭐ MOTM",v:r.manOfMatch},{lb:"🎳 Wicket",v:r.topWicket},{lb:"💥 Sixes",v:r.sixHitter},{lb:`⚡ ${tObj(adminMatch.team1)?.short} PP`,v:r.pp1},{lb:`⚡ ${tObj(adminMatch.team2)?.short} PP`,v:r.pp2}].map((x,i)=>(
                    <div key={i} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"7px 10px"}}>
                      <div style={{fontSize:10,color:"#555"}}>{x.lb}</div>
                      <div style={{fontSize:13,fontWeight:700,color:OR,marginTop:1}}>{x.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            );})()}
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:OR,letterSpacing:2,marginBottom:10}}>📊 PLAYER BREAKDOWN</div>
            {MEMBERS.map(pl=>{
              const pts=calcPts(preds[`${adminMatch.id}_${pl.name}`]||{},results[adminMatch.id]);
              const p=preds[`${adminMatch.id}_${pl.name}`]||{};const r=results[adminMatch.id];
              const rows=r?[
                {lb:"Toss",me:tObj(p.toss)?.short||"—",ac:tObj(r.tossWinner)?.short||"—",ok:chkEq(p.toss,r.tossWinner)},
                {lb:"Bat/Bowl",me:p.tossDecision||"—",ac:r.tossDecision||"—",ok:chkEq(p.tossDecision,r.tossDecision)},
                {lb:"Winner",me:tObj(p.winner)?.short||"—",ac:tObj(r.winner)?.short||"—",ok:chkEq(p.winner,r.winner)},
                {lb:`${tObj(adminMatch.team1)?.short} PP`,me:p.pp1||"—",ac:r.pp1||"—",ok:chkEq(p.pp1,r.pp1)},
                {lb:`${tObj(adminMatch.team2)?.short} PP`,me:p.pp2||"—",ac:r.pp2||"—",ok:chkEq(p.pp2,r.pp2)},
                {lb:"Scorer",me:p.topScorer||"—",ac:r.topScorer||"—",ok:chkStr(p.topScorer,r.topScorer)},
                {lb:"Wicket",me:p.topWicket||"—",ac:r.topWicket||"—",ok:chkStr(p.topWicket,r.topWicket)},
                {lb:"MOTM",me:p.manOfMatch||"—",ac:r.manOfMatch||"—",ok:chkStr(p.manOfMatch,r.manOfMatch)},
                {lb:"Sixes",me:p.sixHitter||"—",ac:r.sixHitter||"—",ok:chkStr(p.sixHitter,r.sixHitter)},
              ]:[];
              return(
                <div key={pl.name} style={{...aCard,padding:"14px",border:`1px solid ${pts>=14?"rgba(34,197,94,0.3)":pts>=9?"rgba(249,115,22,0.25)":"rgba(255,255,255,0.06)"}`,marginBottom:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <div style={{fontSize:26}}>{emo(pl.name)}</div>
                    <div style={{flex:1,fontWeight:700,fontSize:14,color:"#fff"}}>{pl.name}</div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:pts>=14?"#22c55e":pts>=9?OR:"#ef4444",lineHeight:1}}>{pts}</div>
                      <div style={{fontSize:10,color:"#444"}}>/{MAX_PTS} pts</div>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                    {rows.map((r,i)=>(
                      <div key={i} style={{display:"flex",gap:5,background:r.ok?"rgba(34,197,94,0.08)":"rgba(239,68,68,0.05)",borderRadius:8,padding:"5px 8px"}}>
                        <span style={{fontSize:12,flexShrink:0}}>{r.ok?"✅":"❌"}</span>
                        <div style={{fontSize:11}}>
                          <div style={{color:"#555"}}>{r.lb}</div>
                          <div style={{color:r.ok?"#22c55e":"#ef4444",fontWeight:600}}>{r.me}</div>
                          {!r.ok&&<div style={{color:OR,fontSize:10}}>→ {r.ac}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {Object.keys(scores).length>0&&<div style={aCard}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:OR,letterSpacing:2,marginBottom:12}}>🏆 STANDINGS</div>
              {sorted.map((pl,i)=>(
                <div key={pl.name} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:10,background:i===0?"rgba(249,115,22,0.08)":"transparent",marginBottom:3}}>
                  <span style={{fontSize:20,width:28}}>{["🥇","🥈","🥉"][i]||`${i+1}`}</span>
                  <span style={{fontSize:20}}>{emo(pl.name)}</span>
                  <span style={{flex:1,fontWeight:700,fontSize:13,color:"#fff"}}>{pl.name}</span>
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:OR}}>{scores[pl.name]||0}</span>
                  <span style={{fontSize:10,color:"#444"}}>pts</span>
                </div>
              ))}
              <button onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(buildShare(adminMatch.id))}`,"_blank")}
                style={{width:"100%",marginTop:12,padding:"13px",borderRadius:12,border:"none",background:"#25D366",color:"#fff",fontSize:15,fontFamily:"Poppins,sans-serif",fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <span style={{fontSize:18}}>💬</span> Share on WhatsApp
              </button>
            </div>}
          </div>
        </div>
      )}

      {toast&&<div style={{position:"fixed",bottom:22,left:"50%",transform:"translateX(-50%)",background:toast.type==="err"?"#dc2626":"#16a34a",color:"#fff",padding:"11px 22px",borderRadius:30,zIndex:9999,fontFamily:"Poppins,sans-serif",fontSize:13,fontWeight:600,boxShadow:"0 4px 20px rgba(0,0,0,0.5)",whiteSpace:"nowrap"}}>{toast.msg}</div>}
    </>
  );
}
