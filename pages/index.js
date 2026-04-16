import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import {
  MapPin, Clock, Star, ChefHat, Flame, ArrowRight, Search,
  Bell, User, Heart, X, Globe, ChevronDown, Phone, Send,
  ChevronLeft, Gift, Shield, Smile, Wine,
  Calendar,
  MessageCircle,
  Sparkles
} from "lucide-react";

const C = {
  red: "#E62F00", redLight: "rgba(230,47,0,0.07)", redMid: "rgba(230,47,0,0.14)",
  redGlow: "rgba(230,47,0,0.25)", gray: "#67747C", black: "#2F272A",
  white: "#FFFFFF", bg: "#F7F6F4", cardBg: "#FFFFFF", border: "#ECEAE6",
  lightGray: "#A8A29E", cream: "#FFF9F5", warmWhite: "#FEFCFA",
  chef: "#E62F00", bartender: "#8B5CF6",
  bartenderLight: "rgba(139,92,246,0.08)", bartenderGlow: "rgba(139,92,246,0.25)",
  green: "#059669", greenLight: "rgba(5,150,105,0.08)", greenGlow: "rgba(5,150,105,0.25)",
};

const FNT = "'Poppins', sans-serif";
const WA_NUMBER = "17875646130";

const areas = ["San Juan", "Dorado", "Rincon", "Fajardo", "Vieques", "Culebra", "Isla Verde", "Condado", "Luquillo", "Cabo Rojo"];

const occasions = {
  en: [
    { id: "vacation", icon: "🏖️", label: "Vacation", desc: "Villa & Airbnb dining" },
    { id: "bach", icon: "🎉", label: "Bachelorette", desc: "Unforgettable nights" },
    { id: "wedding", icon: "💒", label: "Wedding", desc: "Your perfect day" },
    { id: "house", icon: "🏠", label: "House Party", desc: "Elevate your gathering" },
    { id: "weekly", icon: "🍽️", label: "Weekly Dinner", desc: "Your regular chef" },
    { id: "corporate", icon: "💼", label: "Corporate", desc: "Team events" },
  ],
  es: [
    { id: "vacation", icon: "🏖️", label: "Vacaciones", desc: "Dining en villa" },
    { id: "bach", icon: "🎉", label: "Bachelorette", desc: "Noches inolvidables" },
    { id: "wedding", icon: "💒", label: "Bodas", desc: "Tu dia perfecto" },
    { id: "house", icon: "🏠", label: "Fiesta en Casa", desc: "Eleva tu reunion" },
    { id: "weekly", icon: "🍽️", label: "Cena Semanal", desc: "Tu chef regular" },
    { id: "corporate", icon: "💼", label: "Corporativo", desc: "Eventos de equipo" },
  ],
};

const expData = {
  en: [
    { id: "breakfast", icon: "☕", name: "Breakfast", desc: "Fresh mornings at your villa", price: "From $45/pp", time: "7-11 AM" },
    { id: "lunch", icon: "🍽️", name: "Lunch", desc: "From poolside to gourmet", price: "From $42/pp", time: "12-3 PM" },
    { id: "dinner", icon: "🌙", name: "Dinner", desc: "Multi-course dining experience", price: "From $55/pp", time: "5-10 PM" },
    { id: "cocktail", icon: "🍸", name: "Cocktail Party", desc: "Tapas, bites & craft drinks", price: "From $38/pp", time: "Flexible" },
  ],
  es: [
    { id: "breakfast", icon: "☕", name: "Desayuno", desc: "Mananas frescas en tu villa", price: "Desde $45/pp", time: "7-11 AM" },
    { id: "lunch", icon: "🍽️", name: "Almuerzo", desc: "Del poolside al gourmet", price: "Desde $42/pp", time: "12-3 PM" },
    { id: "dinner", icon: "🌙", name: "Cena", desc: "Experiencia multi-curso", price: "Desde $55/pp", time: "5-10 PM" },
    { id: "cocktail", icon: "🍸", name: "Cocktail Party", desc: "Tapas, bocados y tragos", price: "Desde $38/pp", time: "Flexible" },
  ],
};

const t = {
  en: {
    heroTitle: "Great food,", heroAccent: "extraordinary moments",
    heroSub: "Private chefs & bartenders at your home, villa, or venue in Puerto Rico",
    searchPH: "Search chefs, bartenders...", occTitle: "What's the occasion?",
    expTitle: "Experiences", expSub: "Choose your dining style",
    vendorsTitle: "Featured Professionals", viewAll: "View all",
    howWorks: "How It Works",
    s1: "Browse & Choose", s1d: "Pick your experience and group size",
    s2: "Book & Customize", s2d: "Secure your date, then design your menu with your chef",
    s3: "Sit Back & Enjoy", s3d: "Your team arrives, cooks, serves, and cleans",
    addOnsTitle: "Enhance Your Event",
    addServer: "Add Professional Server", addServerDesc: "Formal table service for your event",
    addServerPrice: "+$100",
    addBartender: "Add Bartender", addBartenderDesc: "Craft cocktails & full bar service",
    addBartenderPrice: "From +$130/pp",
    pkgTitle: "Full Package", pkgDesc: "Chef + Bartender for your perfect event", buildPkg: "Build Package",
    ctaT: "Your event, your team", ctaD: "At your home, villa, or venue in Puerto Rico", startNow: "Start Now",
    askCon: "Need help? Ask our Concierge", conDesc: "Your personal event planner",
    concierge: "IHC Concierge", conPH: "Ask about experiences, chefs...",
    conWelcome: "Hi! I'm your IHC Concierge. Whether you're planning a vacation dinner, bachelorette, wedding, or weekly house party, I can help. What are you looking for?",
    whatsapp: "Chat with our team",
    allInc: "All-inclusive: ingredients, cooking, serving & cleanup",
    searchT: "Search", all: "All", chefs: "Chefs", bartenders: "Bartenders",
    favT: "My Favorites", favD: "Your saved team", noFavT: "No favorites yet", noFavD: "Tap the heart on any profile",
    profT: "My Profile", myBook: "My Bookings", myChat: "My Messages", pay: "Payment", notif: "Notifications", supp: "Support",
    home: "Home", search: "Search", fav: "Favorites", prof: "Profile",
    res: "result", resP: "results",
  },
  es: {
    heroTitle: "Great food,", heroAccent: "extraordinary moments",
    heroSub: "Chefs privados y bartenders en tu hogar, villa o venue en Puerto Rico",
    searchPH: "Busca chefs, bartenders...", occTitle: "Cual es la ocasion?",
    expTitle: "Experiencias", expSub: "Elige tu estilo de dining",
    vendorsTitle: "Profesionales Destacados", viewAll: "Ver todos",
    howWorks: "Como Funciona?",
    s1: "Explora y Elige", s1d: "Escoge experiencia y tamano de grupo",
    s2: "Reserva y Personaliza", s2d: "Asegura tu fecha, disena tu menu con tu chef",
    s3: "Relajate y Disfruta", s3d: "Tu equipo llega, cocina, sirve y limpia",
    addOnsTitle: "Mejora Tu Evento",
    addServer: "Agregar Mesero Profesional", addServerDesc: "Servicio formal de mesa",
    addServerPrice: "+$100",
    addBartender: "Agregar Bartender", addBartenderDesc: "Cocteles y servicio de barra",
    addBartenderPrice: "Desde +$130/pp",
    pkgTitle: "Paquete Completo", pkgDesc: "Chef + Bartender para tu evento perfecto", buildPkg: "Armar Paquete",
    ctaT: "Tu evento, tu equipo", ctaD: "En tu hogar, villa o venue en Puerto Rico", startNow: "Comenzar",
    askCon: "Necesitas ayuda? Pregunta al Concierge", conDesc: "Tu planificador personal",
    concierge: "IHC Concierge", conPH: "Pregunta sobre experiencias, chefs...",
    conWelcome: "Hola! Soy tu Concierge IHC. Ya sea vacaciones, bachelorette, boda o fiesta semanal, te ayudo. Que buscas?",
    whatsapp: "Chatea con nuestro equipo",
    allInc: "Todo incluido: ingredientes, cocina, servicio y limpieza",
    searchT: "Buscar", all: "Todos", chefs: "Chefs", bartenders: "Bartenders",
    favT: "Mis Favoritos", favD: "Tu equipo guardado", noFavT: "Sin favoritos", noFavD: "Toca el corazon en cualquier perfil",
    profT: "Mi Perfil", myBook: "Reservaciones", myChat: "Mensajes", pay: "Pagos", notif: "Notificaciones", supp: "Soporte",
    home: "Inicio", search: "Buscar", fav: "Favoritos", prof: "Perfil",
    res: "resultado", resP: "resultados",
  },
};

const vendors = [
  {
    id: 1, cat: "chef", name: "Jose Angel Colon",
    cuisine: "International Gourmet",
    cuisineTags: ["Caribbean", "International", "Mediterranean", "BBQ", "Family Style"],
    rating: 4.98, reviews: 247, price: "$45-180/pp", eta: "All areas",
    spec: { en: "Head Chef | 10+ years", es: "Chef Principal | 10+ anos" },
    schedule: { en: "Available daily | Last seating 8:30 PM", es: "Disponible diario | Ultimo servicio 8:30 PM" },
    hasServer: true,
    dishes: ["Mofongo-Stuffed Chicken", "Pesto Salmon Risotto", "Guava BBQ Ribs"],
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 2, cat: "chef", name: "Chef Maria Santos",
    cuisine: "Caribbean Fusion",
    cuisineTags: ["Caribbean", "Seafood", "Paella", "Family Style"],
    rating: 4.95, reviews: 189, price: "$42-150/pp", eta: "San Juan area",
    spec: { en: "Paella & Seafood Master", es: "Maestra de Paella" },
    schedule: { en: "Mon-Sat | Last seating 9:00 PM", es: "Lun-Sab | Ultimo servicio 9:00 PM" },
    hasServer: false,
    dishes: ["Seafood Paella", "Mofongo Relleno", "Coconut Flan"],
    img: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 3, cat: "chef", name: "Chef David Torres",
    cuisine: "Contemporary Asian",
    cuisineTags: ["Asian", "Fusion", "Sushi", "Events"],
    rating: 4.99, reviews: 312, price: "$55-180/pp", eta: "All areas",
    spec: { en: "Events & Bachelorette Specialist", es: "Especialista en Eventos" },
    schedule: { en: "Available daily | Last seating 9:30 PM", es: "Disponible diario | Ultimo servicio 9:30 PM" },
    hasServer: true,
    dishes: ["Sushi Omakase", "Wagyu Tataki", "Matcha Souffle"],
    img: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 4, cat: "bartender", name: "Luis A. Rivera",
    cuisine: { en: "Molecular Mixology", es: "Mixologia Molecular" },
    cuisineTags: ["Molecular", "Craft", "Premium"],
    rating: 4.97, reviews: 198, price: "$130-280/pp", eta: "All areas",
    spec: { en: "Certified Mixologist | 8 years", es: "Mixologo Certificado | 8 anos" },
    schedule: { en: "Available daily | Until midnight", es: "Disponible diario | Hasta medianoche" },
    hasServer: false,
    dishes: ["Smoked Old Fashioned", "Molecular Mojito", "Pina Colada"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: 5, cat: "bartender", name: "Camila Vega",
    cuisine: { en: "Craft & Tiki", es: "Craft & Tiki" },
    cuisineTags: ["Tiki", "Tropical", "Craft"],
    rating: 4.93, reviews: 156, price: "$130-250/pp", eta: "All areas",
    spec: { en: "Tiki & Tropical Specialist", es: "Especialista Tiki" },
    schedule: { en: "Thu-Sun | Until 11 PM", es: "Jue-Dom | Hasta 11 PM" },
    hasServer: false,
    dishes: ["Mai Tai Boricua", "Passionfruit Daiquiri", "Espresso Martini"],
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
  },
];

function gv(v, l) {
  if (typeof v === "object" && v !== null && !Array.isArray(v)) {
    return v[l] || v.en;
  }
  return v;
}

function useStyles() {
  useEffect(() => {
    if (!document.getElementById("ihcF")) {
      const link = document.createElement("link");
      link.id = "ihcF";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap";
      document.head.appendChild(link);
    }
    if (!document.getElementById("ihcS")) {
      const style = document.createElement("style");
      style.id = "ihcS";
      style.textContent = "@keyframes ihcFade{from{opacity:0}to{opacity:1}}@keyframes ihcSlide{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}@keyframes ihcPop{0%{transform:scale(0.85);opacity:0}60%{transform:scale(1.03)}100%{transform:scale(1);opacity:1}}@keyframes ihcFlicker{0%,100%{opacity:.6;transform:translateY(0) scale(1)}50%{opacity:1;transform:translateY(-4px) scale(1.15)}}@keyframes ihcBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}*{-webkit-tap-highlight-color:transparent;box-sizing:border-box}input::placeholder{color:#B5B0A8}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#DDD;border-radius:4px}";
      document.head.appendChild(style);
    }
  }, []);
}

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
      <span style={{ fontFamily: FNT, fontWeight: 400, fontSize: 18, color: C.gray, fontStyle: "italic" }}>inHouse</span>
      <span style={{ fontFamily: FNT, fontWeight: 900, fontSize: 22, color: C.red }}>CHEF</span>
    </div>
  );
}

function VImg(props) {
  const src = props.src;
  const name = props.name;
  const size = props.size || 80;
  const radius = props.radius || 14;
  const extraStyle = props.style || {};
  const ini = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const [fail, setFail] = useState(false);

  if (fail) {
    return (
      <div style={{ width: size, height: size, borderRadius: radius, background: `linear-gradient(145deg, ${C.red}, #FF5C38)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, ...extraStyle }}>
        <span style={{ fontFamily: FNT, fontWeight: 700, color: C.white, fontSize: typeof size === "number" ? size * 0.28 : 20 }}>{ini}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={() => setFail(true)}
      style={{ width: size, height: size, borderRadius: radius, objectFit: "cover", flexShrink: 0, ...extraStyle }}
    />
  );
}

function Bdg(props) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: props.bg || C.redLight, padding: "4px 12px", borderRadius: 20, fontFamily: FNT, fontWeight: 600, fontSize: 11, color: props.color || C.red }}>
      {props.children}
    </span>
  );
}

function CatBdg(props) {
  const isChef = props.cat === "chef";
  const color = isChef ? C.chef : C.bartender;
  const bg = isChef ? C.redLight : C.bartenderLight;
  const label = isChef ? "Chef" : "Bartender";
  const Icon = isChef ? ChefHat : Wine;
  return (
    <Bdg color={color} bg={bg}><Icon size={11} />{label}</Bdg>
  );
}

function LangBtn(props) {
  return (
    <button
      onClick={() => props.setLang(props.lang === "en" ? "es" : "en")}
      style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 20, background: C.white, border: "1.5px solid " + C.border, cursor: "pointer" }}
    >
      <Globe size={14} color={C.red} />
      <span style={{ fontFamily: FNT, fontWeight: 700, fontSize: 11, color: C.black }}>{props.lang === "en" ? "ES" : "EN"}</span>
    </button>
  );
}

function AreaSel(props) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer" }}>
        <MapPin size={13} color={C.red} />
        <span style={{ fontFamily: FNT, fontWeight: 600, fontSize: 11, color: "rgba(255,255,255,0.85)" }}>{props.area}</span>
        <ChevronDown size={12} color="rgba(255,255,255,0.5)" />
      </button>
      {open && (
        <div style={{ position: "absolute", top: "110%", left: 0, background: C.white, borderRadius: 14, padding: 8, boxShadow: "0 12px 40px rgba(0,0,0,0.2)", zIndex: 100, minWidth: 180, maxHeight: 240, overflowY: "auto", animation: "ihcPop 0.2s ease" }}>
          {areas.map((x) => (
            <button
              key={x}
              onClick={() => { props.setArea(x); setOpen(false); }}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", border: "none", background: props.area === x ? C.redLight : "transparent", borderRadius: 10, cursor: "pointer", fontFamily: FNT, fontWeight: props.area === x ? 700 : 500, fontSize: 13, color: props.area === x ? C.red : C.black }}
            >
              {x}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ConciergeChat(props) {
  const tx = t[props.lang];
  const [msgs, setMsgs] = useState([{ f: "bot", tx: tx.conWelcome }]);
  const [inp, setInp] = useState("");
  const bRef = useRef(null);

  useEffect(() => {
    if (bRef.current) bRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function reply(q) {
    const ql = q.toLowerCase();
    if (ql.includes("phone") || ql.includes("contact") || ql.includes("numero")) {
      return props.lang === "en" ? "I can help you connect! Once you book, you'll have direct chat. What experience interests you?" : "Te ayudo a conectar! Al reservar tendras chat directo.";
    }
    if (ql.includes("price") || ql.includes("precio") || ql.includes("cuanto")) {
      return props.lang === "en" ? "Our experiences range from $38-180/pp, all-inclusive. Larger groups get better rates!" : "Desde $38-180/pp todo incluido. Mas personas = mejor precio!";
    }
    if (ql.includes("wedding") || ql.includes("boda")) {
      return props.lang === "en" ? "Congratulations! We've done 50+ weddings across PR. How many guests?" : "Felicidades! Hemos hecho 50+ bodas en PR!";
    }
    if (ql.includes("bachelor") || ql.includes("bach")) {
      return props.lang === "en" ? "Bachelorettes are our specialty! Most groups do Dinner + Cocktails. How many?" : "Las bachelorettes son nuestra especialidad!";
    }
    if (ql.includes("weekly") || ql.includes("semanal") || ql.includes("regular")) {
      return props.lang === "en" ? "We love regulars! Many families book weekly with multi-booking discounts!" : "Descuentos por reservas recurrentes!";
    }
    if (ql.includes("server") || ql.includes("mesero") || ql.includes("waiter")) {
      return props.lang === "en" ? "Professional servers are available as an add-on when booking. Some of our chefs also have their own team!" : "Meseros profesionales disponibles como add-on al reservar!";
    }
    return props.lang === "en" ? "Great question! What kind of experience are you looking for?" : "Que tipo de experiencia buscas?";
  }

  function send() {
    if (!inp.trim()) return;
    const q = inp.trim();
    setMsgs((p) => [...p, { f: "u", tx: q }]);
    setInp("");
    setTimeout(() => {
      setMsgs((p) => [...p, { f: "bot", tx: reply(q) }]);
    }, 800);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: C.bg }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: C.white, borderBottom: "1px solid " + C.border }}>
        <button onClick={props.onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}>
          <ChevronLeft size={22} color={C.black} />
        </button>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: "linear-gradient(135deg, " + C.green + ", #34D399)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Phone size={20} color={C.white} />
        </div>
        <div>
          <span style={{ fontFamily: FNT, fontWeight: 700, fontSize: 14, color: C.black }}>{tx.concierge}</span>
          <div style={{ fontFamily: FNT, fontSize: 11, fontWeight: 500, color: C.green }}>{tx.conDesc}</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((mg, i) => {
          const isU = mg.f === "u";
          return (
            <div key={i} style={{ display: "flex", justifyContent: isU ? "flex-end" : "flex-start", animation: "ihcPop 0.3s ease" }}>
              <div style={{ maxWidth: "80%", padding: "12px 16px", borderRadius: isU ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: isU ? C.red : C.white, color: isU ? C.white : C.black, boxShadow: isU ? "0 4px 12px " + C.redGlow : "0 2px 8px rgba(0,0,0,0.04)" }}>
                <p style={{ fontFamily: FNT, fontSize: 14, fontWeight: 400, lineHeight: 1.6, margin: 0 }}>{mg.tx}</p>
              </div>
            </div>
          );
        })}
        <div ref={bRef} />
      </div>
      <div style={{ padding: "6px 16px", background: C.white }}>
        <button onClick={() => window.open("https://wa.me/" + WA_NUMBER, "_blank")} style={{ width: "100%", padding: "10px", background: "#25D366", color: C.white, border: "none", borderRadius: 10, fontFamily: FNT, fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Phone size={14} />{tx.whatsapp}
        </button>
      </div>
      <div style={{ padding: "6px 16px 28px", background: C.white, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, background: C.bg, borderRadius: 24, padding: "10px 16px", border: "1.5px solid " + (inp ? C.green : C.border) }}>
          <input value={inp} onChange={(e) => setInp(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(); }} placeholder={tx.conPH} style={{ border: "none", background: "transparent", width: "100%", fontFamily: FNT, fontSize: 14, color: C.black, outline: "none" }} />
        </div>
        <button onClick={send} style={{ width: 42, height: 42, borderRadius: "50%", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: inp.trim() ? C.green : C.bg, boxShadow: inp.trim() ? "0 4px 16px " + C.greenGlow : "none" }}>
          <Send size={18} color={inp.trim() ? C.white : C.lightGray} />
        </button>
      </div>
    </div>
  );
}

function VCard(props) {
  const v = props.vendor;
  const isChef = v.cat === "chef";
  const color = isChef ? C.chef : C.bartender;
  const d = props.delay || 0;

  return (
    <div style={{ display: "flex", gap: 14, padding: 16, background: C.cardBg, borderRadius: 16, border: "2px solid " + color, cursor: "pointer", position: "relative", animation: "ihcSlide 0.5s ease " + d + "s both" }}>
      <button onClick={(e) => { e.stopPropagation(); props.togFav(v.id); }} style={{ position: "absolute", top: 12, right: 12, background: props.favs.includes(v.id) ? C.redLight : "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 8 }}>
        <Heart size={17} color={props.favs.includes(v.id) ? C.red : C.lightGray} fill={props.favs.includes(v.id) ? C.red : "none"} />
      </button>
      <VImg src={v.img} name={v.name} size={82} radius={16} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontFamily: FNT, fontWeight: 700, fontSize: 15, color: C.black, margin: 0, paddingRight: 30, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{v.name}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "4px 0 4px" }}>
          <CatBdg cat={v.cat} lang={props.lang} />
          <span style={{ fontFamily: FNT, fontWeight: 500, fontSize: 11, color: C.gray }}>{gv(v.cuisine, props.lang)}</span>
        </div>
        {v.cuisineTags && (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 6 }}>
            {v.cuisineTags.slice(0, 3).map((tag) => (
              <span key={tag} style={{ fontFamily: FNT, fontWeight: 500, fontSize: 9, color: C.lightGray, background: C.bg, padding: "2px 8px", borderRadius: 8 }}>{tag}</span>
            ))}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <Star size={13} color={color} fill={color} />
          <span style={{ fontFamily: FNT, fontWeight: 700, fontSize: 13, color: C.black }}>{v.rating}</span>
          <span style={{ fontFamily: FNT, fontWeight: 400, fontSize: 11, color: C.lightGray }}>({v.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: FNT, fontWeight: 900, fontSize: 15, color: color }}>{v.price}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: C.cream, padding: "3px 8px", borderRadius: 8 }}>
            <Clock size={11} color={C.gray} />
            <span style={{ fontFamily: FNT, fontWeight: 500, fontSize: 9, color: C.gray }}>{gv(v.schedule, props.lang)}</span>
          </div>
        </div>
        {v.hasServer && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
            <Smile size={10} color={C.green} />
            <span style={{ fontFamily: FNT, fontWeight: 500, fontSize: 9, color: C.green }}>{props.lang === "en" ? "Server team available" : "Equipo de meseros disponible"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ====================== MAIN PAGE ====================== */
export default function Home() {
  useStyles();

  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState("home");
  const [sq, setSq] = useState("");
  const [favs, setFavs] = useState([]);
  const [catF, setCatF] = useState("all");
  const [area, setArea] = useState("San Juan");
  const [showCon, setShowCon] = useState(false);
  const [selOcc, setSelOcc] = useState(null);

  const tx = t[lang];

  function togFav(id) {
    setFavs((p) => p.includes(id) ? p.filter((f) => f !== id) : [...p, id]);
  }

  const filtered = vendors.filter((v) => {
    const matchCat = catF === "all" || v.cat === catF;
    const matchSearch = !sq || v.name.toLowerCase().includes(sq.toLowerCase()) || gv(v.cuisine, lang).toLowerCase().includes(sq.toLowerCase());
    return matchCat && matchSearch;
  });

  if (showCon) {
    return (
      <>
        <Head>
          <title>IHC Concierge</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div style={{ maxWidth: 500, margin: "0 auto", background: C.white, boxShadow: "0 0 60px rgba(0,0,0,0.08)" }}>
          <ConciergeChat onBack={() => setShowCon(false)} lang={lang} />
        </div>
      </>
    );
  }

  const navItems = [
    { id: "home", Ic: ChefHat, lb: tx.home },
    { id: "search", Ic: Search, lb: tx.search },
    { id: "favorites", Ic: Heart, lb: tx.fav },
    { id: "profile", Ic: User, lb: tx.prof },
  ];

  return (
    <>
      <Head>
        <title>inHouse CHEF — Private Chefs & Bartenders in Puerto Rico</title>
        <meta name="description" content="Private chefs & bartenders at your home, villa, or venue in Puerto Rico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ maxWidth: 500, margin: "0 auto", minHeight: "100vh", background: C.bg, position: "relative", fontFamily: FNT, boxShadow: "0 0 80px rgba(0,0,0,0.06)" }}>

        {/* ═══ HOME ═══ */}
        {activeTab === "home" && (
          <div style={{ paddingBottom: 100 }}>
            {/* Header */}
            <div style={{ position: "sticky", top: 0, zIndex: 100, background: C.warmWhite, borderBottom: "1px solid " + C.border }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px 8px" }}>
                <Logo />
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <LangBtn lang={lang} setLang={setLang} />
                  <button style={{ width: 40, height: 40, borderRadius: 12, background: C.white, border: "1px solid " + C.border, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
                    <Bell size={19} color={C.black} />
                    <div style={{ position: "absolute", top: 7, right: 7, width: 9, height: 9, borderRadius: "50%", background: C.red, border: "2px solid " + C.warmWhite }} />
                  </button>
                </div>
              </div>
              <div style={{ padding: "4px 20px 14px" }}>
                <div onClick={function () { setActiveTab("search"); }} style={{ display: "flex", alignItems: "center", gap: 10, background: C.white, borderRadius: 14, padding: "13px 16px", border: "1.5px solid " + C.border, cursor: "pointer" }}>
                  <Search size={18} color={C.lightGray} />
                  <span style={{ fontFamily: FNT, fontSize: 14, fontWeight: 500, color: "#B5B0A8" }}>{tx.searchPH}</span>
                </div>
              </div>
            </div>

            {/* Hero */}
            <div style={{ margin: "16px 20px", padding: "28px 24px 24px", background: "linear-gradient(145deg, " + C.black + ", #3D302A, #4A3A32)", borderRadius: 20, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(230,47,0,0.12), transparent 70%)" }} />
              <div style={{ position: "absolute", top: 12, right: 16, display: "flex", gap: 6 }}>
                <Flame size={22} color={C.red} style={{ opacity: 0.7, animation: "ihcFlicker 1.5s ease-in-out infinite" }} />
                <Flame size={16} color={C.red} style={{ opacity: 0.7, animation: "ihcFlicker 1.9s ease-in-out infinite" }} />
              </div>
              <AreaSel area={area} setArea={setArea} />
              <p style={{ fontFamily: FNT, fontWeight: 900, fontSize: 24, color: C.white, margin: "16px 0 4px", lineHeight: 1.2 }}>
                {tx.heroTitle}<br /><span style={{ color: C.red }}>{tx.heroAccent}</span>
              </p>
              <p style={{ fontFamily: FNT, fontWeight: 400, fontSize: 12, color: "rgba(255,255,255,0.5)", margin: 0, maxWidth: 300, lineHeight: 1.5 }}>{tx.heroSub}</p>
            </div>

            {/* Occasions */}
            <div style={{ padding: "20px 20px 0" }}>
              <h2 style={{ fontFamily: FNT, fontWeight: 900, fontSize: 18, color: C.black, margin: "0 0 14px" }}>{tx.occTitle}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {occasions[lang].map(function (o) {
                  return (
                    <div key={o.id} onClick={function () { setSelOcc(selOcc === o.id ? null : o.id); }} style={{ padding: "14px 10px", borderRadius: 14, textAlign: "center", cursor: "pointer", border: "1.5px solid " + (selOcc === o.id ? C.red : C.border), background: selOcc === o.id ? C.redLight : C.white, transition: "all 0.2s" }}>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>{o.icon}</div>
                      <div style={{ fontFamily: FNT, fontWeight: 700, fontSize: 12, color: C.black }}>{o.label}</div>
                      <div style={{ fontFamily: FNT, fontWeight: 400, fontSize: 9, color: C.gray, marginTop: 2 }}>{o.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Concierge */}
            <div style={{ padding: "20px 20px 0" }}>
              <div onClick={function () { setShowCon(true); }} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderRadius: 16, background: "linear-gradient(135deg, " + C.green + ", #34D399)", cursor: "pointer", boxShadow: "0 6px 24px " + C.greenGlow }}>
                <div style={{ width: 42, height: 42, borderRadius: 14, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, animation: "ihcBounce 2s ease infinite" }}>
                  <Phone size={20} color={C.white} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FNT, fontWeight: 800, fontSize: 13, color: C.white }}>{tx.askCon}</div>
                  <div style={{ fontFamily: FNT, fontWeight: 400, fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>{tx.conDesc}</div>
                </div>
                <ArrowRight size={18} color={C.white} />
              </div>
            </div>

            {/* Experiences */}
            <div style={{ padding: "24px 20px 0" }}>
              <h2 style={{ fontFamily: FNT, fontWeight: 900, fontSize: 18, color: C.black, margin: "0 0 4px" }}>{tx.expTitle}</h2>
              <p style={{ fontFamily: FNT, fontWeight: 400, fontSize: 12, color: C.gray, margin: "0 0 14px" }}>{tx.expSub}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {expData[lang].map(function (exp) {
                  return (
                    <div key={exp.id} style={{ padding: "16px 14px", borderRadius: 14, border: "1.5px solid " + C.border, background: C.white, cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 28 }}>{exp.icon}</span>
                        <span style={{ fontFamily: FNT, fontWeight: 500, fontSize: 10, color: C.lightGray }}>{exp.time}</span>
                      </div>
                      <h4 style={{ fontFamily: FNT, fontWeight: 700, fontSize: 14, color: C.black, margin: "0 0 2px" }}>{exp.name}</h4>
                      <p style={{ fontFamily: FNT, fontWeight: 400, fontSize: 11, color: C.gray, margin: "0 0 8px" }}>{exp.desc}</p>
                      <span style={{ fontFamily: FNT, fontWeight: 800, fontSize: 13, color: C.red }}>{exp.price}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 14px", background: C.greenLight, borderRadius: 10, marginTop: 12 }}>
                <Shield size={14} color={C.green} />
                <span style={{ fontFamily: FNT, fontWeight: 500, fontSize: 11, color: C.green }}>{tx.allInc}</span>
              </div>
            </div>

            {/* Add-ons preview */}
            <div style={{ padding: "24px 20px 0" }}>
              <h2 style={{ fontFamily: FNT, fontWeight: 900, fontSize: 18, color: C.black, margin: "0 0 14px" }}>{tx.addOnsTitle}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 14, border: "1.5px solid " + C.border, background: C.white }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: C.bartenderLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Wine size={20} color={C.bartender} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FNT, fontWeight: 700, fontSize: 13, color: C.black }}>{tx.addBartender}</div>
                    <div style={{ fontFamily: FNT, fontWeight: 400, fontSize: 11, color: C.gray }}>{tx.addBartenderDesc}</div>
                  </div>
                  <span style={{ fontFamily: FNT, fontWeight: 800, fontSize: 12, color: C.bartender }}>{tx.addBartenderPrice}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 14, border: "1.5px solid " + C.border, background: C.white }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Smile size={20} color={C.green} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FNT, fontWeight: 700, fontSize: 13, color: C.black }}>{tx.addServer}</div>
                    <div style={{ fontFamily: FNT, fontWeight: 400, fontSize: 11, color: C.gray }}>{tx.addServerDesc}</div>
                  </div>
                  <span style={{ fontFamily: FNT, fontWeight: 800, fontSize: 12, color: C.green }}>{tx.addServerPrice}</span>
                </div>
              </div>
            </div>

            {/* Featured Vendors */}
            <div style={{ padding: "24px 20px 0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <h2 style={{ fontFamily: FNT, fontWeight: 900, fontSize: 18, color: C.black, margin: 0 }}>{tx.vendorsTitle}</h2>
                <span onClick={function () { setActiveTab("search"); }} style={{ fontFamily: FNT, fontWeight: 600, fontSize: 12, color: C.red, cursor: "pointer" }}>{tx.viewAll}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {vendors.slice(0, 3).map(function (v, i) {
                  return (
                    <VCard key={v.id} vendor={v} delay={i * 0.08} favs={favs} togFav={togFav} lang={lang} />
                  );
                })}
              </div>
            </div>

            {/* How It Works */}
            <div style={{ padding: "28px 20px", margin: "24px 20px", background: C.warmWhite, borderRadius: 20, border: "2px solid " + C.red }}>
              <h2 style={{ fontFamily: FNT, fontWeight: 900, fontSize: 18, color: C.black, marginBottom: 22, textAlign: "center" }}>{tx.howWorks}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[{ n: "1", ti: tx.s1, de: tx.s1d }, { n: "2", ti: tx.s2, de: tx.s2d }, { n: "3", ti: tx.s3, de: tx.s3d }].map(function (st, i) {
                  return (
                    <div key={i} style={{ display: "flex", gap: 16 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, background: i === 0 ? C.red : C.redLight, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FNT, fontWeight: 900, fontSize: 20, color: i === 0 ? C.white : C.red, boxShadow: i === 0 ? "0 6px 20px " + C.redGlow : "none" }}>{st.n}</div>
                      <div style={{ paddingTop: 4 }}>
                        <h4 style={{ fontFamily: FNT, fontWeight: 700, fontSize: 15, color: C.black, margin: "0 0 2px" }}>{st.ti}</h4>
                        <p style={{ fontFamily: FNT, fontWeight: 400, fontSize: 12, color: C.gray, lineHeight: 1.5, margin: 0 }}>{st.de}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Package */}
            <div style={{ padding: "0 20px", marginBottom: 24 }}>
              <div style={{ padding: "24px 20px", borderRadius: 20, background: "linear-gradient(145deg, " + C.black + ", #3D302A)" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: C.red + "20", display: "flex", alignItems: "center", justifyContent: "center" }}><ChefHat size={18} color={C.red} /></div>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: C.bartender + "20", display: "flex", alignItems: "center", justifyContent: "center" }}><Wine size={18} color={C.bartender} /></div>
                </div>
                <h3 style={{ fontFamily: FNT, fontWeight: 900, fontSize: 20, color: C.white, margin: "0 0 6px" }}>{tx.pkgTitle}</h3>
                <p style={{ fontFamily: FNT, fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 18px" }}>{tx.pkgDesc}</p>
                <button style={{ background: C.red, color: C.white, border: "none", padding: "14px 28px", borderRadius: 12, fontFamily: FNT, fontWeight: 900, fontSize: 14, cursor: "pointer", boxShadow: "0 6px 24px " + C.redGlow, display: "flex", alignItems: "center", gap: 8 }}>
                  {tx.buildPkg}<ArrowRight size={16} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div style={{ padding: "0 20px", marginBottom: 24 }}>
              <div style={{ padding: "32px 24px", borderRadius: 20, textAlign: "center", background: "linear-gradient(145deg, " + C.red + ", #FF4520)", boxShadow: "0 12px 48px " + C.redGlow }}>
                <Gift size={38} color={C.white} style={{ marginBottom: 14, opacity: 0.9 }} />
                <h3 style={{ fontFamily: FNT, fontWeight: 900, fontSize: 21, color: C.white, margin: "0 0 8px" }}>{tx.ctaT}</h3>
                <p style={{ fontFamily: FNT, fontWeight: 400, fontSize: 13, color: "rgba(255,255,255,0.75)", margin: "0 0 22px" }}>{tx.ctaD}</p>
                <button style={{ background: C.white, color: C.red, border: "none", padding: "14px 36px", borderRadius: 12, fontFamily: FNT, fontWeight: 900, fontSize: 14, cursor: "pointer" }}>{tx.startNow}</button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ SEARCH ═══ */}
        {activeTab === "search" && (
          <div style={{ padding: "24px 20px 120px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontFamily: FNT, fontWeight: 900, fontSize: 22, color: C.black, margin: 0 }}>{tx.searchT}</h2>
              <LangBtn lang={lang} setLang={setLang} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.white, borderRadius: 14, padding: "14px 16px", border: "2px solid " + (sq ? C.red : C.border), marginBottom: 16 }}>
              <Search size={18} color={sq ? C.red : C.lightGray} />
              <input value={sq} onChange={function (e) { setSq(e.target.value); }} placeholder={tx.searchPH} style={{ border: "none", background: "transparent", flex: 1, fontFamily: FNT, fontSize: 14, fontWeight: 500, color: C.black, outline: "none" }} />
              {sq && (
                <button onClick={function () { setSq(""); }} style={{ background: C.redLight, border: "none", cursor: "pointer", padding: 6, borderRadius: 8, display: "flex" }}>
                  <X size={14} color={C.red} />
                </button>
              )}
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {[{ id: "all", lb: tx.all, Ic: Sparkles, cl: C.red }, { id: "chef", lb: tx.chefs, Ic: ChefHat, cl: C.chef }, { id: "bartender", lb: tx.bartenders, Ic: Wine, cl: C.bartender }].map(function (c) {
                var a = catF === c.id;
                return (
                  <button key={c.id} onClick={function () { setCatF(c.id); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 24, border: "1.5px solid " + (a ? c.cl : C.border), background: a ? c.cl : "transparent", color: a ? C.white : C.gray, fontFamily: FNT, fontWeight: a ? 700 : 600, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: a ? "0 4px 14px " + c.cl + "40" : "none" }}>
                    <c.Ic size={14} />{c.lb}
                  </button>
                );
              })}
            </div>
            <p style={{ fontFamily: FNT, fontWeight: 600, fontSize: 13, color: C.gray, marginBottom: 12 }}>
              {filtered.length} {filtered.length === 1 ? tx.res : tx.resP}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map(function (v, i) {
                return (
                  <VCard key={v.id} vendor={v} delay={i * 0.06} favs={favs} togFav={togFav} lang={lang} />
                );
              })}
            </div>
          </div>
        )}

        {/* ═══ FAVORITES ═══ */}
        {activeTab === "favorites" && (
          <div style={{ padding: "24px 20px 120px" }}>
            <h2 style={{ fontFamily: FNT, fontWeight: 900, fontSize: 22, color: C.black, marginBottom: 4 }}>{tx.favT}</h2>
            <p style={{ fontFamily: FNT, fontWeight: 400, fontSize: 13, color: C.lightGray, marginBottom: 24 }}>{tx.favD}</p>
            {vendors.filter(function (v) { return favs.includes(v.id); }).length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 24px", background: C.warmWhite, borderRadius: 20, border: "1.5px dashed " + C.border }}>
                <Heart size={28} color={C.red} style={{ opacity: 0.5, marginBottom: 12 }} />
                <p style={{ fontFamily: FNT, fontWeight: 700, fontSize: 16, color: C.black, marginBottom: 4 }}>{tx.noFavT}</p>
                <p style={{ fontFamily: FNT, fontWeight: 400, fontSize: 13, color: C.lightGray }}>{tx.noFavD}</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {vendors.filter(function (v) { return favs.includes(v.id); }).map(function (v, i) {
                  return (
                    <VCard key={v.id} vendor={v} delay={i * 0.08} favs={favs} togFav={togFav} lang={lang} />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ═══ PROFILE ═══ */}
        {activeTab === "profile" && (
          <div style={{ padding: "24px 20px 120px" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ width: 84, height: 84, borderRadius: "50%", margin: "0 auto 16px", background: "linear-gradient(145deg, " + C.red + ", #FF5C38)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 30px " + C.redGlow }}>
                <User size={34} color={C.white} />
              </div>
              <h2 style={{ fontFamily: FNT, fontWeight: 900, fontSize: 20, color: C.black }}>{tx.profT}</h2>
              <p style={{ fontFamily: FNT, fontWeight: 400, fontSize: 13, color: C.lightGray }}>{area}, Puerto Rico</p>
            </div>
            {[{ label: tx.myBook, Ic: Calendar }, { label: tx.myChat, Ic: MessageCircle }, { label: tx.pay, Ic: Shield }, { label: tx.notif, Ic: Bell }, { label: tx.supp, Ic: Phone }].map(function (item, i) {
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid " + C.border, cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: C.redLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <item.Ic size={18} color={C.red} />
                    </div>
                    <span style={{ fontFamily: FNT, fontWeight: 600, fontSize: 14, color: C.black }}>{item.label}</span>
                  </div>
                  <ArrowRight size={16} color={C.lightGray} />
                </div>
              );
            })}
            <div style={{ marginTop: 24, textAlign: "center" }}>
              <LangBtn lang={lang} setLang={setLang} />
            </div>
          </div>
        )}

        {/* Floating Concierge */}
      <button 
          onClick={() => setShowCon(true)} 
          style={{ position: "fixed", bottom: 90, right: 20, width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, " + C.green + ", #34D399)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px " + C.greenGlow, zIndex: 400, animation: "ihcBounce 3s ease infinite" }}
        >
          <Phone size={24} color={C.white} />
        </button>

        {/* Bottom Nav */}
     <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 500, background: C.warmWhite, borderTop: "1px solid " + C.border, display: "flex", justifyContent: "space-around", padding: "6px 0 22px", zIndex: 500 }}>
          {navItems.map((item) => {
            const a = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: "6px 18px" }}>
                <div style={{ width: 42, height: 34, borderRadius: 17, background: a ? C.red : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", boxShadow: a ? "0 4px 16px " + C.redGlow : "none" }}>
                  <item.Ic size={20} color={a ? C.white : C.gray} strokeWidth={a ? 2.5 : 1.8} />
                </div>
                <span style={{ fontFamily: FNT, fontWeight: a ? 700 : 500, fontSize: 10, color: a ? C.red : C.gray }}>{item.lb}</span>
              </button>
            );
          })}
        </div>

      </div>
    </>
  );
}