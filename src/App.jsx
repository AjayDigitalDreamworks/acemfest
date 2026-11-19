import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Instagram, Music2, Sparkles,
  Camera, Drama, Palette, Mic2, Shirt, CalendarDays, MapPin, Ticket,
  ChevronLeft, ChevronRight, Clock3, Users, ShieldCheck, CircleHelp,
  Mail, ExternalLink, Star, Compass, BookOpen, Megaphone, Home, Info,
  ListChecks, CalendarCheck, Image as ImageIcon
} from 'lucide-react';
import { site, events, gallery } from './data/site';

const iconMap = { dance: Music2, singing: Mic2, fashion: Shirt, drama: Drama, photo: Camera, art: Palette, dj: Sparkles };
const nav = [
  ['Home', '#/', Home], ['About', '#/about', Info], ['Events', '#/events', Ticket],
  ['Guidelines', '#/guidelines', ListChecks], ['Schedule', '#/schedule', CalendarCheck],
  ['Gallery', '#/gallery', ImageIcon], ['FAQs', '#/faqs', CircleHelp], ['Contact', '#/contact', Mail]
];
const pageTitles = {
  '/': 'A celebration of culture, creativity and campus spirit.',
  '/about': 'A campus celebration with a stage for every kind of talent.',
  '/events': 'Find your stage. Bring your passion. Make your moment.',
  '/guidelines': 'A few helpful things to know before you take the stage.',
  '/schedule': 'The countdown to February 2027 starts here.',
  '/register': 'Choose an event and follow its official registration link when it is released.',
  '/gallery': 'A look back at the moments that bring us together.',
  '/faqs': 'Quick answers for participants, performers and visitors.',
  '/contact': 'Stay connected with the VIVRTI organising team.'
};

function getRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return hash.startsWith('/') ? hash.split('?')[0] : '/';
}

function Brand({ footer = false }) {
  return <a className={`brand ${footer ? 'brand-footer' : ''}`} href="#/" aria-label="VIVRTI 2K27 home">
    <img src="/assets/vivrti-emblem-crop.png" alt="VIVRTI Eastopia emblem" />
    <span><b>VIVRTI</b><small>2K27 · EASTOPIA</small></span>
  </a>;
}

function Navbar({ route }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [route]);
  useEffect(() => {
    const close = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className="site-header">
    <nav className="nav-shell" aria-label="Main navigation">
      <Brand />
      <div className="desktop-nav">{nav.map(([label, href]) => <a key={href} className={route === href.slice(1) || (route === '/' && href === '#/') ? 'active' : ''} href={href}>{label}</a>)}</div>
      <a className="nav-cta" href="#/register">Register <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    </nav>
    {open && <div className="mobile-nav">{nav.map(([label, href, Icon]) => <a key={href} href={href}><Icon size={17}/>{label}<ArrowUpRight size={15}/></a>)}<a className="mobile-nav-cta" href="#/register"><Ticket size={17}/> Event registration <ArrowUpRight size={15}/></a><a href={site.instagram} target="_blank" rel="noreferrer"><Instagram size={17}/> Follow on Instagram <ExternalLink size={15}/></a></div>}
  </header>;
}

function Eyebrow({ children }) { return <div className="eyebrow"><span/>{children}</div>; }
function SectionTitle({ eyebrow, title, accent, copy, center = false }) {
  return <div className={`section-heading ${center ? 'center' : ''}`}><Eyebrow>{eyebrow}</Eyebrow><h2>{title} <em>{accent}</em></h2>{copy && <p>{copy}</p>}</div>;
}

function Hero() {
  return <section className="hero page-home">
    <div className="hero-backdrop"/><div className="hero-pattern"/>
    <div className="hero-copy">
      <Eyebrow>THE CULTURAL FESTIVAL OF ACEM</Eyebrow>
      <div className="hero-season">FEBRUARY <b>2027</b><span>·</span> FARIDABAD, INDIA</div>
      <h1>VIVRTI <span>2K27</span></h1>
      <p className="hero-subtitle">EASTOPIA — <strong>Where culture meets celebration.</strong></p>
      <p className="hero-description">A celebration of talent, culture and everything that makes us extraordinary. The stage is set. Your moment is next.</p>
      <div className="hero-actions"><a className="button button-primary" href="#/events">Explore events <ArrowUpRight size={17}/></a><a className="button button-ghost" href="#/about"><ArrowDown size={16}/> Discover VIVRTI</a></div>
      <div className="hero-facts"><span><CalendarDays/> <b>FEBRUARY 2027</b><small>Exact dates to be announced</small></span><span><MapPin/><b>ARAVALI COLLEGE</b><small>Faridabad, Haryana</small></span></div>
    </div>
    <div className="hero-logo-panel"><div className="logo-frame"><img src="/assets/vivrti-logo.webp" alt="Official VIVRTI 2K27 Eastopia festival logo"/></div><span className="logo-caption">OFFICIAL FESTIVAL EMBLEM · EASTOPIA</span></div>
    <a className="scroll-cue" href="#home-intro">SCROLL TO EXPLORE <ArrowDown size={15}/></a>
  </section>;
}

function Marquee() { const words = ['CREATE','CELEBRATE','EXPRESS','CONNECT']; return <div className="marquee"><div>{[...words,...words,...words,...words].map((w,i)=><span key={i}>{w}<i>✦</i></span>)}</div></div>; }

function HomePage() {
  return <>
    <Hero/><Marquee/>
    <section className="intro-section section-pad" id="home-intro"><div className="intro-grid"><div><Eyebrow>A LITTLE ABOUT US</Eyebrow><h2>Not just a fest.<br/>A <em>feeling.</em></h2><p>Some moments deserve a stage. Some talents deserve to be seen. Some memories deserve to last forever.</p><a className="text-link" href="#/about">Discover our story <ArrowUpRight size={16}/></a></div><div className="intro-image"><img src="/assets/fest-campus-moments.webp" alt="Students celebrating at a college cultural event"/><span>THE SPIRIT OF CAMPUS</span></div></div></section>
    <section className="section-pad home-events"><SectionTitle eyebrow="FIND YOUR SPOTLIGHT" title="The stage is" accent="yours." copy="From performances to creative showcases, find the event that feels like you."/><EventGrid compact/></section>
    <section className="home-gallery section-pad"><div className="split-heading"><SectionTitle eyebrow="THE MEMORY WALL" title="Moments that" accent="stay." copy="A glimpse of the people, colour and energy of our campus celebrations."/><a className="text-link" href="#/gallery">Explore gallery <ArrowUpRight size={16}/></a></div><GalleryGrid compact/></section>
    <Callout/>
  </>;
}

function EventGrid({ compact = false }) {
  return <div className={`events-grid ${compact ? 'compact' : ''}`}>{events.map((event) => {
    const Icon = iconMap[event.icon] || Sparkles;
    return <article className="event-card" key={event.number}><div className="event-photo"><img src={event.image} alt={`${event.title} event`} loading="lazy"/><span className="event-number">{event.number}</span><span className="event-icon"><Icon size={19}/></span></div><div className="event-info"><span className="event-category">{event.category}</span><h3>{event.title}</h3><p>{event.description}</p><a className="event-link" href="#/guidelines">View participant guide <ArrowUpRight size={15}/></a></div></article>;
  })}</div>;
}

function AboutPage() {
  return <PageShell eyebrow="OUR STORY" title="A celebration made" accent="of moments." copy={pageTitles['/about']}>
    <div className="about-feature"><div className="about-feature-copy"><h3>One campus.<br/><em>Many expressions.</em></h3><p>VIVRTI 2K27 — EASTOPIA is the cultural-fest showcase of Aravali College of Engineering and Management. It is imagined as a place where students can perform, create, participate and celebrate together.</p><p>From dance and music to fashion, theatre, photography, art and a DJ night, the festival brings different forms of creativity into one shared celebration.</p><div className="fact-list"><span><CalendarDays/> February 2027 · Date to be announced</span><span><MapPin/> Aravali College of Engineering and Management, Faridabad</span></div></div><img src="/assets/fest-celebration-2026.webp" alt="Students enjoying a campus celebration"/></div>
    <div className="values-grid"><div><Star/><h3>Celebrate</h3><p>Make space for talent, expression and shared memories.</p></div><div><Users/><h3>Connect</h3><p>Bring students and campus communities together.</p></div><div><Sparkles/><h3>Create</h3><p>Give every participant a chance to show what they love.</p></div></div>
  </PageShell>;
}

function EventsPage() { return <PageShell eyebrow="EVENT LINE-UP" title="Choose your" accent="spotlight." copy={pageTitles['/events']}><div className="notice-strip"><Ticket/><span>Event registrations and individual Google Form links will be published when officially released.</span></div><EventGrid/></PageShell>; }

const guidelines = [
  ['Before you register','Read the event description and the official event-specific rules once they are published. Make sure the details you submit in the registration form are accurate.'],
  ['Team and solo entries','Some activities may allow individual or group participation. The permitted format, team size and eligibility will be specified in each event’s official rules.'],
  ['On the event day','Follow the reporting time and venue instructions shared by the organisers. Keep your college ID or another requested identification document available.'],
  ['Respect and conduct','Treat fellow participants, guests, volunteers and organisers respectfully. Harassment, unsafe behaviour or disruption will not be acceptable at festival activities.'],
  ['Originality and permissions','Use content, music, images and creative material that you have permission to present. Any event-specific content restrictions will be shared by the organisers.'],
  ['Stay updated','Schedules, venue details, rules and registration links may be updated. Follow the official Instagram page and check this website for announcements.']
];
function GuidelinesPage() { return <PageShell eyebrow="PARTICIPANT INFORMATION" title="Your guide to" accent="Eastopia." copy={pageTitles['/guidelines']}><div className="notice-strip"><ShieldCheck/><span><b>Important:</b> These are general visitor and participant pointers. Final event rules, eligibility, team sizes, judging criteria and reporting times will be announced by the organisers.</span></div><div className="guide-list">{guidelines.map(([title,body],i)=><article key={title}><span className="guide-number">0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div><div className="download-note"><BookOpen/><div><b>Event-wise rulebook</b><p>Official rulebooks and downloadable documents will be added here once they are approved and available.</p></div><span className="status-pill">COMING SOON</span></div></PageShell>; }

function SchedulePage() { return <PageShell eyebrow="FESTIVAL TIMELINE" title="Save the" accent="month." copy={pageTitles['/schedule']}><div className="schedule-banner"><div><span>THE FESTIVAL MONTH</span><strong>FEB</strong><b>2027</b></div><div><h3>Exact dates are coming soon.</h3><p>The final event dates, daily programme, stage timings and venue details will be published here after confirmation from the college and organising team.</p><a className="button button-primary" href={site.instagram} target="_blank" rel="noreferrer">Follow announcements <Instagram size={16}/></a></div></div><div className="timeline"><div><span className="timeline-dot"/><small>NOW</small><h3>Stay tuned</h3><p>Explore event categories and follow official announcements.</p></div><div><span className="timeline-dot"/><small>BEFORE THE FEST</small><h3>Registrations open</h3><p>Registration forms and event-specific instructions will be shared here.</p></div><div><span className="timeline-dot"/><small>FEBRUARY 2027</small><h3>VIVRTI 2K27</h3><p>Festival dates and detailed schedule to be announced.</p></div></div></PageShell>; }

function GalleryGrid({ compact = false, onOpen }) { return <div className={`gallery-grid ${compact ? 'compact' : ''}`}>{gallery.map((item,i)=><button key={item.title} className={`gallery-item ${i===0?'tall':''} ${i===1||i===4?'wide':''}`} onClick={()=>onOpen?.(i)} aria-label={`View ${item.title}`}><img src={item.image} alt={item.title} loading="lazy"/><span><b>{item.title}</b><ArrowUpRight size={17}/></span></button>)}</div>; }
function GalleryPage() {
  const [active,setActive] = useState(null);
  useEffect(()=>{if(active===null)return;const key=(e)=>{if(e.key==='Escape')setActive(null);if(e.key==='ArrowLeft')setActive(v=>(v-1+gallery.length)%gallery.length);if(e.key==='ArrowRight')setActive(v=>(v+1)%gallery.length)};document.body.style.overflow='hidden';window.addEventListener('keydown',key);return()=>{document.body.style.overflow='';window.removeEventListener('keydown',key)}},[active]);
  return <PageShell eyebrow="CAMPUS MEMORIES" title="The memory" accent="wall." copy={pageTitles['/gallery']}><p className="gallery-disclaimer">A selection of photographs from the campus celebrations shared with the VIVRTI team. More event albums will be added as they become available.</p><GalleryGrid onOpen={setActive}/>{active!==null&&<div className="lightbox" role="dialog" aria-modal="true" onClick={()=>setActive(null)}><button className="lightbox-close" onClick={()=>setActive(null)} aria-label="Close"><X/></button><button className="lightbox-arrow left" onClick={e=>{e.stopPropagation();setActive((active-1+gallery.length)%gallery.length)}} aria-label="Previous"><ChevronLeft/></button><img src={gallery[active].image} alt={gallery[active].title} onClick={e=>e.stopPropagation()}/><button className="lightbox-arrow right" onClick={e=>{e.stopPropagation();setActive((active+1)%gallery.length)}} aria-label="Next"><ChevronRight/></button><div className="lightbox-caption">{gallery[active].title}<small>{active+1} / {gallery.length}</small></div></div>}</PageShell>;
}

const faqs = [
  ['When will VIVRTI 2K27 take place?','The festival is planned for February 2027. The exact dates have not been finalised yet.'],
  ['Where will the festival be held?','The festival is associated with Aravali College of Engineering and Management in Faridabad, Haryana. Final venue details will be shared by the organisers.'],
  ['Which events are planned?','The current event categories are Dance, Singing, Fashion Show, Drama, Photography, Art & Creativity, and DJ Night.'],
  ['How can I register?','Individual Google Form links will be added to the relevant event pages once the organisers release them.'],
  ['Are event rules available?','General participant guidance is available on the Guidelines page. Official event-wise rules and eligibility details are still to be announced.'],
  ['Where can I get the latest updates?','Follow the official Instagram page @vivrti2k27 and revisit this website for announcements.']
];

function RegisterPage() { return <PageShell eyebrow="JOIN THE CELEBRATION" title="Your VIVRTI" accent="journey starts here." copy={pageTitles['/register']}><div className="notice-strip"><Ticket/><span>Registration forms are being prepared. Use only the official links published on this website or the official Instagram page. Never submit details through unofficial forms.</span></div><div className="register-grid">{events.map((event)=>{const Icon=iconMap[event.icon]||Sparkles;return <article className="register-card" key={event.number}><div className="register-card-icon"><Icon/></div><div><small>{event.category} · EVENT {event.number}</small><h3>{event.title}</h3><p>{event.description}</p></div>{event.registrationUrl?<a className="button button-primary" href={event.registrationUrl} target="_blank" rel="noreferrer">Open registration <ExternalLink size={15}/></a>:<span className="status-pill">FORM COMING SOON</span>}</article>})}</div><p className="register-help">Need help? Follow <a href={site.instagram} target="_blank" rel="noreferrer">@vivrti2k27</a> for registration announcements and verified updates.</p></PageShell>; }

function FAQPage() { const [open,setOpen]=useState(0);return <PageShell eyebrow="NEED TO KNOW" title="Frequently asked" accent="questions." copy={pageTitles['/faqs']}><div className="faq-list">{faqs.map(([q,a],i)=><article key={q} className={open===i?'open':''}><button onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i}><span>{q}</span>{open===i?<X size={18}/>:<ArrowDown size={18}/>}</button>{open===i&&<p>{a}</p>}</article>)}</div></PageShell>; }

function ContactPage() { return <PageShell eyebrow="GET IN TOUCH" title="Stay in the" accent="loop." copy={pageTitles['/contact']}><div className="contact-grid"><div className="contact-card"><Instagram/><span>OFFICIAL INSTAGRAM</span><h3>@vivrti2k27</h3><p>Follow for festival announcements, event updates, registration links and campus highlights.</p><a className="button button-primary" href={site.instagram} target="_blank" rel="noreferrer">Visit Instagram <ExternalLink size={16}/></a></div><div className="contact-card"><MapPin/><span>HOST INSTITUTION</span><h3>{site.college}</h3><p>Faridabad, Haryana, India</p><span className="contact-muted">Organiser email and phone details will be published when officially confirmed.</span></div></div><div className="contact-bottom"><Megaphone/><div><b>Are you part of the organising team?</b><p>Share approved contact details, sponsor enquiries and volunteer information to add them to this page.</p></div></div></PageShell>; }

function PageShell({ eyebrow, title, accent, copy, children }) { return <main className="inner-page"><section className="page-banner"><div className="page-banner-pattern"/><div className="page-banner-content"><div className="breadcrumbs"><a href="#/">Home</a><span>/</span><b>{eyebrow}</b></div><Eyebrow>{eyebrow}</Eyebrow><h1>{title} <em>{accent}</em></h1><p>{copy}</p></div><div className="page-banner-mark">V<span>✦</span></div></section><section className="page-content section-pad">{children}</section></main>; }

function Callout() { return <section className="callout section-pad"><div className="callout-glow"/><Eyebrow>YOUR MOMENT IS WAITING</Eyebrow><h2>Make some<br/><em>memories.</em></h2><p>February 2027. Save the month and stay tuned for festival announcements.</p><a className="button button-primary" href={site.instagram} target="_blank" rel="noreferrer">Follow the journey <Instagram size={17}/></a></section>; }

function Footer() { return <footer className="footer"><div className="footer-main"><div className="footer-brand"><Brand footer/><p>{site.tagline}</p><a className="social-link" href={site.instagram} target="_blank" rel="noreferrer"><Instagram size={17}/> @vivrti2k27 <ArrowUpRight size={14}/></a></div><div className="footer-links"><div><b>EXPLORE</b>{nav.slice(0,4).map(([label,href])=><a href={href} key={href}>{label}</a>)}<a href="#/register">Registration</a></div><div><b>INFORMATION</b>{nav.slice(4).map(([label,href])=><a href={href} key={href}>{label}</a>)}</div></div><div className="footer-college"><b>HOST INSTITUTION</b><p>{site.college}</p><span><MapPin size={14}/> Faridabad, Haryana, India</span><span><CalendarDays size={14}/> February 2027 · Date TBA</span></div></div><div className="footer-bottom"><span>© 2027 VIVRTI 2K27 · EASTOPIA</span><span>MADE FOR THE MOMENTS THAT MATTER <i>✦</i></span></div></footer>; }

export default function App() {
  const [route,setRoute] = useState(getRoute);
  useEffect(()=>{const update=()=>{setRoute(getRoute());window.scrollTo({top:0,behavior:'instant'});};window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update)},[]);
  useEffect(()=>{document.title=`${route==='/'?'VIVRTI 2K27':nav.find((n)=>n[1]===`#${route}`)?.[0]||'VIVRTI'} — EASTOPIA`;},[route]);
  let page;
  switch(route){case '/about':page=<AboutPage/>;break;case '/events':page=<EventsPage/>;break;case '/guidelines':page=<GuidelinesPage/>;break;case '/schedule':page=<SchedulePage/>;break;case '/register':page=<RegisterPage/>;break;case '/gallery':page=<GalleryPage/>;break;case '/faqs':page=<FAQPage/>;break;case '/contact':page=<ContactPage/>;break;default:page=<HomePage/>;}
  return <><Navbar route={route}/>{page}<Footer/></>;
}
