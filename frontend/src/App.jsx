import { useEffect, useRef, useState } from 'react'
import { Zap, Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, ArrowRight, Star, FileText, Factory, Compass,
  CalendarCheck, Headset, Network, Award, Cable, Settings, BadgeCheck, Menu, X, AlertCircle, Search, Cpu, Briefcase, MessageSquare, PlayCircle } from 'lucide-react'

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY
const Img = ({ src, alt, eager }) => (src ? <img src={src} alt={alt || ''} loading={eager ? 'eager' : 'lazy'} decoding="async" /> : null)
const CAP_ICONS = [Zap, Settings, Cpu, ShieldCheck]
const SVC_ICONS = [Zap, Network, Cpu, ShieldCheck, Cable, Network, Settings, Cpu, Factory]
const WHY_ICONS = [BadgeCheck, Headset, Network, FileText, ShieldCheck, ShieldCheck]
const PROC_ICONS = [Headset, Search, Network, BadgeCheck, Settings, ShieldCheck]
const NAV = [['home', 'Home'], ['about', 'About Us'], ['services', 'Services'], ['equipment', 'Equipment'], ['projects', 'Projects'], ['contact', 'Contact']]
const TABS = ['All Executions', 'HT/LT Substations', 'Panel Boards', 'Cable Routing']
const VOLTAGES = ['HT (11kV / 22kV / 33kV)', 'LT (up to 1kV)', 'Not sure']
const EQUIP = ['Transformer Installation', 'HT Panel / Switchgear', 'PCC / MCC Panel', 'APFC Panel', 'DG Set / Generator Synchronization', 'HT/LT Cable Laying', 'Cable Tray Installation', 'Rule 45 & Rule 32 Approvals', 'Other']
const guessEquip = (t) => { const x = t.toLowerCase()
  if (x.includes('rule 45')) return EQUIP[7]
  if (x.includes('cable tray')) return EQUIP[6]
  if (x.includes('cable laying')) return EQUIP[5]
  if (x.includes('dg') || x.includes('generator')) return EQUIP[4]
  if (x.includes('transformer')) return EQUIP[0]
  if (x.includes('ht panel') || x.includes('switchgear')) return EQUIP[1]
  if (x.includes('panel board') || x.includes('pcc') || x.includes('mcc')) return EQUIP[2]
  return EQUIP[8] }

const Pill = ({ children, dot, dark }) => <span className={'pill' + (dark ? ' dk' : '')}>{dot && <i className="dot" />}{children}</span>
const Head = ({ label, title, sub, light }) => (
  <header className={'head' + (light ? ' light' : '')}><small>{label}</small><h2>{title}</h2>{sub && <p>{sub}</p>}</header>
)
const go = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

export default function App() {
  const [d, setD] = useState(null)
  const [err, setErr] = useState('')
  const [prefill, setPrefill] = useState('')
  useEffect(() => {
    fetch('/api/content.php').then((r) => r.json()).then((j) => (j.error ? setErr(j.error) : setD(j))).catch(() => setErr('Could not reach the server. Start the PHP backend (see README).'))
  }, [])
  if (err) return <div className="state"><AlertCircle /> {err}</div>
  if (!d) return <div className="state">Loading…</div>
  const s = d.settings
  const enquire = (v) => (e) => { e.preventDefault(); setPrefill(v); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }
  const ld = [{ '@context': 'https://schema.org', '@type': 'Electrician', name: s.company, url: 'https://arulelectricals.com/', description: 'A-Grade licensed electrical contractors and consultants in Chennai: HT/LT installation, panel manufacturing, transformers, DG sets and CEIG approvals.',
      telephone: s.phone, email: s.email, areaServed: 'Chennai', address: { '@type': 'PostalAddress', streetAddress: s.address, addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' }, openingHours: 'Mo-Sa 09:00-18:30' },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: (d.faqs || []).map((q) => ({ '@type': 'Question', name: q.question, acceptedAnswer: { '@type': 'Answer', text: q.answer } })) }]
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <Nav s={s} />
    <Hero s={s} />
    <section id="capabilities" className="sec grey"><div className="wrap">
      <Head label="SYSTEM ARCHITECTURE" title="Industrial Electrical Engineering Capabilities" sub="End-to-end industrial electrical solutions in Chennai, covering heavy industrial power distribution, panel engineering and turnkey electrical infrastructure for factories, plants and commercial facilities." />
      <div className="g4">{d.capabilities.map((c, i) => { const I = CAP_ICONS[i % 4]; return (
        <article className="cap" key={c.id}><div className="ph bg"><Img src={c.image} alt={c.image_alt} /></div>
          <div className="cb"><div className="capt"><span className="ibox"><I size={22} /></span><small>CAPABILITY {String(i + 1).padStart(2, '0')}</small></div>
            <h3>{c.title}</h3><p>{c.description}</p></div>
          <footer>{c.badge} <ArrowRight size={16} /></footer></article>) })}</div>
    </div></section>

    <section id="about" className="sec purple"><div className="wrap about">
      <div className="aimg"><div className="frame"><div className="bg"><Img src={s.about_image} alt={s.about_alt} /></div></div>
        <div className="safety"><h4><ShieldCheck size={22} /> Safety-First Protocols</h4>
          <p>Strict CEIG safety standards, zero-compromise insulation testing, and zero-accident construction policy.</p><span className="tag">INDUSTRIAL STANDARDS COMPLIANT</span></div></div>
      <div>
        <small className="eyebrow">ABOUT OUR COMPANY</small>
        <h2>Industrial Electrical Contracting Built for Reliability.</h2>
        <p className="lead"><b className="y">{s.company}</b> is a premier A-Grade licensed electrical contractor and electrical engineering company in Chennai, specialising in HT/LT electrical installations, panel board manufacturing, heavy equipment supply and statutory compliance.</p>
        <p className="mut">As an electrical contracting company and consultancy, we focus on technically planned industrial electrical systems with uncompromising workmanship. From initial grid load approvals to high-capacity step-down transformer commissioning, our engineers ensure faultless installations for plants, mills and commercial parks.</p>
        <ul className="checks">{d.about_points.map((p) => <li key={p.id}><CheckCircle2 size={22} /><div><h3>{p.title}</h3><span>{p.description}</span></div></li>)}</ul>
        <a href="#contact" onClick={go('contact')} className="btn yel">Schedule Site Audit <CalendarCheck size={18} /></a>
      </div></div></section>

    <section id="services" className="sec grey"><div className="wrap">
      <Head label="OUR EXPERTISE" title="Complete Electrical Contracting & Engineering Solutions" sub="Industrial electrical contractor services in Chennai covering HT connections, LT installation, panel manufacturing, statutory approvals, cable infrastructure, transformers, HT panels and DG sets." />
      <div className="svcs">{d.services.map((x, i) => { const I = SVC_ICONS[i % SVC_ICONS.length]; return (
        <article className="svc" key={x.id}><div className="bg sph"><Img src={x.image} alt={x.image_alt} /><span className="pill dk">{x.tag}</span></div>
          <div className="sb"><div className="sn"><I size={18} /> {String(i + 1).padStart(2, '0')} / SERVICE</div><h3>{x.title}</h3><p>{x.description}</p>
            <a href="#contact" className="enq" onClick={enquire(x.title)}>Enquire Now <ArrowRight size={16} /></a></div></article>) })}</div>
    </div></section>

    <section id="equipment" className="sec purple"><div className="wrap">
      <Head light label="EQUIPMENT CATALOG" title="Industrial Power Equipment & Installation" sub="Industrial power equipment supply and commissioning in Chennai, including transformers, HT switchgear and diesel generator sets." />
      <div className="g3">{d.equipment.map((e) => (
        <article className="eq" key={e.id}><div className="ph bg"><Img src={e.image} alt={e.image_alt} /><span className="pill dk">{e.tag}</span></div>
          <div className="eb"><h3>{e.title}</h3><p>{e.description}</p>
            <ul>{e.bullets.map((b, i) => <li key={i}><CheckCircle2 size={17} />{b}</li>)}</ul>
            <a href="#contact" className="btn pur full" onClick={enquire(e.title)}>Enquire Equipment</a></div></article>))}</div>
    </div></section>

    <section id="why" className="sec purple2"><div className="wrap">
      <div className="whyhead"><div><small className="eyebrow">ADVANTAGE MATRIX</small><h2>Why Industries Choose {s.company}</h2>
        <p className="lead">We deliver electrical contracting and electrical engineering consultancy services for complex industrial and commercial infrastructure in Chennai.</p></div>
        <div className="stat"><b>100% Zero-Fault</b><span>Inspection Record Across Heavy Substations</span></div></div>
      <div className="whygrid"><div className="wimg bg"><Img src={s.why_image} alt={s.why_alt} /><div className="wcap"><h4><BadgeCheck size={20} /> A-Grade Certified Field Engineers</h4>
        <p>Full-time technical staff licensed for HT switchgear, multi-MVA transformer commissioning, and CEIG statutory sign-offs.</p></div></div>
        <div className="g2">{d.why_points.map((w, i) => { const I = WHY_ICONS[i % 6]; return (
          <div className="wc" key={w.id}><span className="ibox y"><I size={22} /></span><h3>{w.title}</h3><p>{w.description}</p></div>) })}</div></div>
    </div></section>

    <Projects list={d.projects} />

    <section id="process" className="sec purple3"><div className="wrap">
      <header className="head light"><span className="pill out"><i className="dot" /> OUR WORKFLOW</span><h2>From Planning to Powering – Our Process.</h2>
        <p>A structured approach to industrial electrical contracting and electrical construction that moves every project through planning, documentation, installation and final handover.</p></header>
      <div className="tl"><div className="line" />
        {d.process_steps.map((p, i) => { const I = PROC_ICONS[i % 6]; const odd = i % 2 === 0; const n = String(i + 1).padStart(2, '0'); return (<span key={p.id} style={{ display: 'contents' }}>
          <div className={'pc ' + (odd ? 'up' : 'down')} style={{ gridColumn: i + 1, gridRow: odd ? 1 : 3 }}>
            <div className="pt"><I size={22} /><em>{n}</em></div><h3>{p.title}</h3><p>{p.description}</p><small>PHASE: {p.phase}</small></div>
          <div className="pn" style={{ gridColumn: i + 1, gridRow: 2 }}>{n}</div></span>) })}</div>
    </div></section>

    <section id="testimonials" className="sec grey"><div className="wrap">
      <Head label="CLIENT VERIFICATIONS" title="Trusted by Industrial Engineering Teams" sub="What industrial infrastructure managers and factory operators say about our engineering support." />
      <div className="g3">{d.testimonials.map((t) => (
        <article className="tc" key={t.id}><div className="stars">{[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}</div>
          <blockquote>"{t.quote}"</blockquote>
          <footer><span className="av bg"><Img src={t.photo} alt={`${t.name}, ${t.role}`} />{!t.photo && t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span><div><b>{t.name}</b><small>{t.role}</small></div></footer></article>))}</div>
    </div></section>

    <section className="cta"><div className="wrap"><Pill dot={false}><Zap size={14} /> HIGH VOLTAGE INDUSTRIAL TURNKEY CONTRACTING</Pill>
      <h2>Planning Your Next Electrical Infrastructure Project?</h2>
      <p>Connect with {s.company} in Chennai for industrial electrical contracting, power equipment supply and turnkey technical consultancy.</p>
      <div className="row c"><a href="#contact" onClick={go('contact')} className="btn yel"><Zap size={18} /> Request a Consultation</a><a href="#contact" onClick={go('contact')} className="btn wht"><Headset size={18} /> Contact Technical Team</a></div></div></section>

    <Faq list={d.faqs} />
    <Contact s={s} prefill={prefill} />
    <Footer s={s} />
  </>)
}

function Nav({ s }) {
  const [open, setOpen] = useState(false)
  return (<>
    <header className="nav"><div className="wrap">
      <a href="#home" onClick={go('home')} className="brand">{s.logo ? <img src={s.logo} alt={s.logo_alt || s.company} /> : <span className="logo"><Zap size={22} /></span>}
        <div><b>{s.company} <em>LICENSED</em></b><small>A-Grade Electrical Contractors & Consultants</small></div></a>
      <nav className={open ? 'open' : ''}>{NAV.map(([id, l]) => <a key={id} href={'#' + id} onClick={(e) => { go(id)(e); setOpen(false) }}>{l}</a>)}</nav>
      <a href="#contact" onClick={go('contact')} className="btn yel navbtn"><Zap size={17} /> Request a Consultation</a>
      <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div></header></>)
}

function Hero({ s }) {
  return (<section id="home" className="hero bg"><Img src={s.hero_image} alt={s.hero_alt} eager /><div className="hshade" /><div className="wrap hc">
    <span className="pill out"><i className="dot" /> A-GRADE ELECTRICAL CONTRACTORS & CONSULTANTS</span>
    <h1>Powering Industries with Reliable Electrical Solutions.</h1>
    <p>Your trusted partner for HT & LT electrical contracting, industrial power equipment, panel manufacturing and turnkey engineering services across Chennai.</p>
    <div className="row c"><a href="#services" onClick={go('services')} className="btn yel"><Compass size={18} /> Explore Our Services</a><a href="#contact" onClick={go('contact')} className="btn ghost"><Zap size={18} /> Request a Consultation</a></div>
    <div className="chips"><div><span className="ibox y"><BadgeCheck size={20} /></span>HT & LT Electrical Expertise</div><div><span className="ibox y"><Factory size={20} /></span>Industrial Infrastructure</div><div><span className="ibox y"><FileText size={20} /></span>Technical Docs & CEA Compliance</div></div>
  </div></section>)
}

function Faq({ list }) {
  if (!list?.length) return null
  return (<section id="faq" className="sec white"><div className="wrap faq">
    <div><small className="eyebrow dk">FREQUENTLY ASKED QUESTIONS</small><h2>Industrial Electrical Questions, Answered.</h2>
      <p className="sub">Planning a substation, panel board, transformer or DG set project? Find answers about our services, approvals and estimates below, or contact our technical team for help.</p></div>
    <div className="qa">{list.map((q, i) => <details key={q.id} open={i === 0}><summary>{q.question}</summary><p>{q.answer}</p></details>)}</div>
  </div></section>)
}

function Projects({ list }) {
  const [tab, setTab] = useState(TABS[0])
  const shown = list.filter((p) => tab === TABS[0] || p.category === tab)
  return (<section id="projects" className="sec grey"><div className="wrap">
    <Head label="TRACK RECORD" title="Industrial Electrical Projects Delivered with Precision" sub="Industrial electrical projects covering substations, transformers, panel boards, cable infrastructure and DG synchronization." />
    <div className="tabs">{TABS.map((t) => <button key={t} className={t === tab ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>
    <div className="g3 pg">{shown.map((p) => p.featured === '1' || p.featured === 1 ? (
      <article className="pf bg" key={p.id}><Img src={p.image} alt={p.image_alt} /><span className="pill yl">{p.tag}</span><div className="po"><small>{p.client}</small><h3>{p.title}</h3><p>{p.description}</p></div></article>) : (
      <article className="pcard" key={p.id}><div className="ph bg"><Img src={p.image} alt={p.image_alt} /><span className="pill dk">{p.tag}</span></div>
        <div className="eb"><small className="cl">{p.client}</small><h3>{p.title}</h3><p>{p.description}</p><a href="#contact" className="spec" onClick={go('contact')}>View Engineering Specs <ArrowRight size={16} /></a></div></article>))}
      {!shown.length && <p className="mut">No projects in this category yet.</p>}</div>
  </div></section>)
}

const Field = ({ f, set, errs, k, label, ph, req, type = 'text' }) => (<label>{label}{req && ' *'}<input type={type} value={f[k]} onChange={set(k)} placeholder={ph} />{errs[k] && <i className="err">{errs[k]}</i>}</label>)
const Select = ({ f, set, k, label, opts }) => (<label>{label}<select value={f[k]} onChange={set(k)}>{opts.map((o) => <option key={o}>{o}</option>)}</select></label>)

function Contact({ s, prefill }) {
  const empty = { full_name: '', company: '', mobile: '', email: '', voltage: VOLTAGES[0], equipment: EQUIP[0], site_location: '', scope: '' }
  const [f, setF] = useState(empty), [errs, setErrs] = useState({}), [msg, setMsg] = useState(null), [busy, setBusy] = useState(false)
  useEffect(() => { if (prefill) { const m = guessEquip(prefill); setF((p) => ({ ...p, equipment: m, scope: p.scope || `Enquiry about: ${prefill}` })) } }, [prefill])
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const capRef = useRef(null), widget = useRef(null), [token, setToken] = useState('')
  useEffect(() => {
    if (!SITE_KEY) return
    const draw = () => { if (capRef.current && widget.current === null && window.grecaptcha?.render) widget.current = window.grecaptcha.render(capRef.current, { sitekey: SITE_KEY, callback: setToken, 'expired-callback': () => setToken('') }) }
    if (window.grecaptcha?.render) draw()
    else { window.__recaptchaReady = draw
      if (!document.getElementById('recaptcha-js')) { const sc = document.createElement('script'); sc.id = 'recaptcha-js'; sc.async = true; sc.src = 'https://www.google.com/recaptcha/api.js?onload=__recaptchaReady&render=explicit'; document.head.appendChild(sc) } }
  }, [])
  const resetCaptcha = () => { setToken(''); if (widget.current !== null) window.grecaptcha?.reset(widget.current) }
  const submit = async (e) => {
    e.preventDefault(); setMsg(null); setErrs({})
    if (SITE_KEY && !token) { setMsg({ ok: false, t: 'Please tick “I’m not a robot” before submitting.' }); return }
    setBusy(true)
    try {
      const r = await fetch('/api/enquiry.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, captcha: token }) })
      const j = await r.json()
      if (j.ok) { setF(empty); resetCaptcha(); setMsg({ ok: true, t: 'Thank you. Our engineers will contact you shortly with a preliminary estimate.' }) }
      else { setErrs(j.errors || {}); resetCaptcha(); setMsg({ ok: false, t: j.error || 'Please fix the highlighted fields.' }) }
    } catch { setMsg({ ok: false, t: 'Could not send. Please call our hotline.' }) }
    setBusy(false)
  }
  const c = { f, set, errs }
  return (<section id="contact" className="sec grey"><div className="wrap contact">
    <div><small className="eyebrow dk">DIRECT ACCESS</small><h2>Let’s Discuss Your Electrical Project.</h2>
      <p className="sub">Speak directly with our senior electrical engineers in Chennai regarding tenders, site inspections and turnkey estimates.</p>
      <div className="ic"><span className="ibox l"><MapPin size={20} /></span><div><h4>Registered Engineering Office</h4><p>{s.address}</p></div></div>
      <div className="ic"><span className="ibox l"><Phone size={20} /></span><div><h4>Technical Support Hotline</h4><b>{s.hotline}</b><small>Direct engineer helpline</small></div></div>
      <div className="ic"><span className="ibox l"><Mail size={20} /></span><div><h4>Official Project Email</h4><b>{s.email}</b><small>Tender documents & BOQ submissions</small></div></div>
      <div className="ic"><span className="ibox l"><Clock size={20} /></span><div><h4>Operations Schedule</h4><p>{s.hours}</p></div></div>
      <div className="emerg"><AlertCircle size={34} /><div><h4>24/7 EMERGENCY SUPPORT</h4><p>Immediate mobilization for industrial sub-station & transformer trip emergencies.</p></div></div></div>
    <form className="form" onSubmit={submit} noValidate><h3>Project Technical Assessment Form</h3><p className="sub">Complete the parameters below to receive a formal preliminary engineering estimate.</p>
      <div className="f2"><Field {...c} k="full_name" label="Full Name" ph="e.g. Ramesh Kumar" req /><Field {...c} k="company" label="Company / Organization" ph="e.g. Acme Industrial Mills" req />
        <Field {...c} k="mobile" label="Mobile Contact" ph="+91 98765 43210" req /><Field {...c} k="email" label="Email Address" ph="engineer@company.com" req type="email" />
        <Select {...c} k="voltage" label="Voltage Requirement" opts={VOLTAGES} /><Select {...c} k="equipment" label="Equipment Requirement" opts={EQUIP} /></div>
      <Field {...c} k="site_location" label="Project Site Location" ph="e.g. Sriperumbudur Industrial Corridor, Chennai" />
      <label>Project Scope & Technical Requirements *<textarea rows={4} value={f.scope} onChange={set('scope')} placeholder="Specify anticipated sanctioned load in kVA, target completion timeline, and specific scope..." />{errs.scope && <i className="err">{errs.scope}</i>}</label>
      {SITE_KEY && <div ref={capRef} className="captcha" />}
      <button className="btn pur full" disabled={busy}>{busy ? 'Sending…' : 'Submit Project Enquiry'}</button>
      {msg && <p className={'status ' + (msg.ok ? 'ok' : 'bad')} role="status">{msg.t}</p>}</form>
  </div></section>)
}

function Footer({ s }) {
  const L = ({ items }) => items.map(([t, id]) => <a key={t} href={'#' + id} onClick={go(id)}>{t}</a>)
  return (<footer className="foot"><div className="wrap">
    <div className="ftop"><div className="fbrand"><span className="logo big"><Zap size={30} /></span><div><h3>{s.company} <em>A-GRADE GOVT LICENSED</em></h3><p className="y">{s.tagline}</p></div></div>
      <div className="fcta"><div className="hot"><span className="ibox y"><Headset size={20} /></span><div><small>24/7 BREAKDOWN HOTLINE</small><b>{s.phone}</b></div></div>
        <a href="#contact" onClick={go('contact')} className="btn yel"><Compass size={18} /> Schedule Technical Audit</a></div></div>
    <div className="fgrid">
      <div className="fabout"><h5>ABOUT {s.company}</h5><p>A-Grade licensed electrical contractors and consultants in Chennai, specialising in HT/LT installations, custom switchgear and panel manufacturing, statutory Rule 45 and Rule 32 compliance, and turnkey industrial electrical infrastructure.</p>
        <div className="certs"><span><BadgeCheck size={15} /> Class 1 Electrical Contractor</span><span><ShieldCheck size={15} /> CEA & DISCOM Compliant</span><span><CheckCircle2 size={15} /> ISO Quality Certified</span></div>
        <small className="cw">CONNECT WITH US</small><div className="soc"><a href="#home" aria-label="Business"><Briefcase size={18} /></a><a href="#home" aria-label="Chat"><MessageSquare size={18} /></a><a href="#home" aria-label="Video"><PlayCircle size={18} /></a><a href={'mailto:' + s.email} aria-label="Email"><Mail size={18} /></a></div></div>
      <div><h5>ENGINEERING SERVICES</h5><ul className="bl"><li>HT Connection</li><li>HT/LT Installation</li><li>Panel Board Manufacturing</li><li>Rule 45 & 32 Documentation</li><li>HT/LT Cable Laying</li><li>Cable Tray</li><li>Transformers</li><li>HT Panels</li><li>DG Sets</li></ul></div>
      <div><h5>POWER EQUIPMENT</h5><ul className="bl"><li>Transformers</li><li>HT Switchgear</li><li>Diesel Generator Sets</li><li>MCC & PCC Panels</li><li>APFC Panels</li></ul></div>
      <div><h5>QUICK LINKS</h5><div className="ql"><L items={[['About Us', 'about'], ['Capabilities', 'capabilities'], ['Services', 'services'], ['Equipment', 'equipment'], ['Projects', 'projects'], ['Process', 'process'], ['Consultation', 'contact']]} /></div></div>
      <div><h5>CORPORATE OFFICE</h5><p className="fi"><MapPin size={18} />{s.footer_address || s.address}</p><p className="fi"><Phone size={18} />{s.phone}</p><p className="fi"><Mail size={18} />{s.email}</p><p className="fi"><Clock size={18} />{s.hours}</p></div>
    </div>
    <div className="legal"><div><p>© 2026 {s.company}. All rights reserved. A-Grade Electrical Contractors & Consultants.</p><small>Central Electricity Authority statutory compliance certified.</small></div><span><a href="#home">Privacy Policy</a><a href="#home">Terms of Service</a><a href="#home">Statutory Approvals</a></span></div>
  </div></footer>)
}
