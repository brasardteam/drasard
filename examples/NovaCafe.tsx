import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./nova.css";

type Item = { id: number; name: string; description: string; price: number; category: string; image: string; tag?: string };

type CartLine = Item & { qty: number };

const items: Item[] = [
  { id: 1, name: "Morning Bun", description: "Cinnamon, cardamom, brown butter glaze", price: 4.5, category: "Bakery", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85", tag: "POPULAR" },
  { id: 2, name: "Almond Croissant", description: "Buttery pastry, almond frangipane, toasted almonds", price: 5.2, category: "Bakery", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Berry Danish", description: "Seasonal berries, vanilla cream, flaky pastry", price: 4.8, category: "Bakery", image: "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Nova Flat White", description: "Double espresso, silky steamed milk", price: 4.2, category: "Coffee", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85", tag: "HOUSE" },
  { id: 5, name: "Oat Latte", description: "Espresso, oat milk, light caramel finish", price: 4.6, category: "Coffee", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Iced Honey Latte", description: "Cold espresso, oat milk, local honey, sea salt", price: 5.1, category: "Coffee", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85" },
  { id: 7, name: "Avocado Rye", description: "Sourdough rye, avocado, lemon, herbs, chilli oil", price: 9.8, category: "Brunch", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=900&q=85", tag: "VEG" },
  { id: 8, name: "Nova Breakfast", description: "Eggs, rye toast, roasted tomato, greens, cultured butter", price: 12.5, category: "Brunch", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=85" },
  { id: 9, name: "Mushroom Toast", description: "Wild mushrooms, whipped ricotta, thyme, black pepper", price: 11.8, category: "Brunch", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85" },
  { id: 10, name: "Sea Buckthorn Fizz", description: "Sea buckthorn, citrus, rosemary, sparkling water", price: 5.5, category: "Drinks", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85", tag: "LOCAL" },
  { id: 11, name: "Raspberry Iced Tea", description: "Cold-brewed black tea, raspberry, lemon", price: 4.9, category: "Drinks", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=85" },
  { id: 12, name: "Basque Cheesecake", description: "Burnt top, cultured cream, berry compote", price: 6.4, category: "Sweet", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85" },
];

const categories = ["All", "Coffee", "Bakery", "Brunch", "Drinks", "Sweet"];

function Icon({ name }: { name: "arrow" | "bag" | "close" | "menu" | "plus" | "minus" | "calendar" }) {
  const paths = {
    arrow: <><path d="M4 12h15"/><path d="m14 6 6 6-6 6"/></>,
    bag: <><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
    close: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    menu: <><path d="M4 8h16"/><path d="M4 16h16"/></>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    minus: <path d="M5 12h14"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function App() {
  const [page, setPage] = useState(() => window.location.hash.replace("#", "") || "home");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [reserved, setReserved] = useState(false);

  const navigate = (next: string) => {
    setPage(next); setMobileOpen(false); window.history.replaceState({}, "", `#${next}`); window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const filtered = useMemo(() => category === "All" ? items : items.filter((item) => item.category === category), [category]);
  const total = cart.reduce((sum, line) => sum + line.price * line.qty, 0);
  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const add = (item: Item) => setCart((current) => { const found = current.find((line) => line.id === item.id); return found ? current.map((line) => line.id === item.id ? { ...line, qty: line.qty + 1 } : line) : [...current, { ...item, qty: 1 }]; });
  const change = (id: number, delta: number) => setCart((current) => current.map((line) => line.id === id ? { ...line, qty: line.qty + delta } : line).filter((line) => line.qty > 0));

  return <div className="nova">
    <header className="nova-header">
      <button className="nova-logo" onClick={() => navigate("home")} aria-label="Nova Café home"><span>N</span>NOVA</button>
      <nav className={mobileOpen ? "open" : ""}>
        {[['home','Home'],['menu','Menu'],['story','Our Story'],['visit','Visit']].map(([id,label]) => <button key={id} className={page === id ? "active" : ""} onClick={() => navigate(id)}>{label}</button>)}
      </nav>
      <div className="nova-actions"><button className="reserve-link" onClick={() => { setReserved(false); navigate("visit"); }}>Reserve</button><button className="cart-button" onClick={() => setCartOpen(true)}><Icon name="bag"/><span>{count}</span></button><button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}><Icon name={mobileOpen ? "close" : "menu"}/></button></div>
    </header>

    {page === "home" && <main>
      <section className="nova-hero"><div className="hero-image"/><div className="hero-copy"><p className="kicker">RIGA · LATVIA · EST. 2024</p><h1>Your neighbourhood,<br/><i>made brighter.</i></h1><p>Specialty coffee, slow mornings and food worth lingering over. Find us in the heart of Riga.</p><div className="hero-buttons"><button className="nova-primary" onClick={() => navigate("menu")}>Explore the menu <Icon name="arrow"/></button><button className="nova-ghost" onClick={() => navigate("visit")}>Find Nova</button></div></div><div className="hero-note">OPEN DAILY <b>08:00 — 18:00</b></div></section>
      <section className="home-intro"><p className="kicker">A LITTLE MORE NOVA</p><h2>Good coffee. <i>Good company.</i><br/>A reason to stay awhile.</h2><div className="intro-grid"><p>Nova is a modern neighbourhood café built around simple things done properly: coffee from thoughtful roasters, seasonal food, natural wine and a room that feels like yours.</p><button onClick={() => navigate("story")}>Meet Nova <Icon name="arrow"/></button></div></section>
      <section className="feature-split"><div className="feature-photo coffee-photo"/><div className="feature-copy"><span className="number">01</span><p className="kicker">THE DAILY RITUAL</p><h2>From first coffee<br/><i>to last bite.</i></h2><p>Come early for a quiet flat white. Stay for brunch. Pick up something sweet on your way home.</p><button onClick={() => navigate("menu")}>See what's cooking <Icon name="arrow"/></button></div></section>
      <section className="quote-band"><p>“The kind of place you accidentally spend three hours in.”</p><span>— NOVA REGULAR, RIGA</span></section>
    </main>}

    {page === "menu" && <main className="page-main"><div className="page-hero menu-page-hero"><p className="kicker">TODAY AT NOVA</p><h1>Food & <i>drink.</i></h1><p>Everything is made for the day we're having — seasonal, generous and uncomplicated.</p></div><div className="menu-wrap"><div className="category-row">{categories.map((cat) => <button key={cat} className={category === cat ? "active" : ""} onClick={() => setCategory(cat)}>{cat}</button>)}</div><div className="menu-grid">{filtered.map((item) => <article className="menu-card" key={item.id}><div className="menu-img"><img src={item.image} alt={item.name}/>{item.tag && <span>{item.tag}</span>}</div><div className="menu-card-copy"><div><h3>{item.name}</h3><p>{item.description}</p></div><div className="menu-card-bottom"><b>€{item.price.toFixed(2)}</b><button onClick={() => { add(item); setCartOpen(true); }}>Add <Icon name="plus"/></button></div></div></article>)}</div></div></main>}

    {page === "story" && <main className="page-main story-page"><div className="story-hero"><div><p className="kicker">OUR STORY</p><h1>Small place.<br/><i>Big energy.</i></h1></div><div className="story-image"/></div><section className="story-copy"><p className="kicker">WHY NOVA</p><h2>A café for the <i>in-between</i> moments.</h2><div><p>Between the first meeting and the last email. Between a walk through the city and dinner. Between “just one coffee” and staying until sunset.</p><p>Nova was imagined as a warm, bright neighbourhood room where good ingredients, good music and good people could overlap. We work with Latvian producers whenever we can, keep our menu seasonal and never rush the experience.</p></div></section><section className="values"><div><b>01</b><h3>Local first</h3><p>We look close to home for ingredients, makers and ideas.</p></div><div><b>02</b><h3>Make it well</h3><p>Simple food gives us no place to hide. That's the point.</p></div><div><b>03</b><h3>Stay awhile</h3><p>Take the corner table. Read another page. There's no hurry.</p></div></section></main>}

    {page === "visit" && <main className="page-main visit-page"><div className="visit-grid"><div className="visit-copy"><p className="kicker">COME SAY HI</p><h1>See you at<br/><i>Nova.</i></h1><p>Brīvības iela 42, Riga<br/>Mon–Fri 08:00–18:00<br/>Sat–Sun 09:00–18:00</p><div className="visit-buttons"><button className="nova-primary" onClick={() => setReserved(false)}>Reserve a table <Icon name="calendar"/></button><a href="mailto:hello@novacafe.lv">hello@novacafe.lv</a></div></div><div className="map-card"><div className="map-grid"/><div className="map-pin">N</div><span>RIGA · LV</span></div></div><div className="visit-gallery"><div/><div/><div/></div></main>}

    <footer><div><button className="nova-logo" onClick={() => navigate("home")}><span>N</span>NOVA</button><p>A bright little café<br/>in central Riga.</p></div><div><b>Explore</b><button onClick={() => navigate("menu")}>Menu</button><button onClick={() => navigate("story")}>Our Story</button><button onClick={() => navigate("visit")}>Visit</button></div><div><b>Hours</b><p>Mon–Fri 08:00–18:00<br/>Sat–Sun 09:00–18:00</p></div><div><b>Follow</b><p>@novacafe.riga</p><p>Brīvības iela 42, Riga</p></div></div><small>Concept website by Drasard · Portfolio demo · 2026</small></footer>

    {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-head"><div><span className="kicker">YOUR ORDER</span><h2>Cart <em>{count}</em></h2></div><button onClick={() => setCartOpen(false)}><Icon name="close"/></button></div>{cart.length === 0 ? <div className="empty"><Icon name="bag"/><p>Your cart is waiting.<br/>Add something delicious from the menu.</p></div> : <>{cart.map((line) => <div className="cart-line" key={line.id}><img src={line.image} alt=""/><div><h3>{line.name}</h3><p>€{line.price.toFixed(2)}</p><div><button onClick={() => change(line.id,-1)}><Icon name="minus"/></button><span>{line.qty}</span><button onClick={() => change(line.id,1)}><Icon name="plus"/></button></div></div></div>)}<div className="drawer-total"><span>Total</span><b>€{total.toFixed(2)}</b></div><button className="nova-primary full" onClick={() => setCheckout(true)}>Continue to checkout <Icon name="arrow"/></button></>}</aside></div>}

    {checkout && <div className="modal-layer"><div className="checkout-modal"><button className="modal-close" onClick={() => setCheckout(false)}><Icon name="close"/></button><span className="kicker">DEMO CHECKOUT</span><h2>Almost <i>there.</i></h2><p>This is a portfolio demo — no payment will be processed.</p><label>Name<input placeholder="Your name"/></label><label>Email<input type="email" placeholder="you@email.com"/></label><label>Pickup time<select defaultValue=""><option value="" disabled>Choose a time</option><option>In 20–30 minutes</option><option>In 45–60 minutes</option><option>Later today</option></select></label><div className="checkout-total"><span>Order total</span><b>€{total.toFixed(2)}</b></div><button className="nova-primary full" onClick={() => { setCheckout(false); setCart([]); setCartOpen(false); alert("Demo order received — thank you!"); }}>Place demo order <Icon name="arrow"/></button></div></div>}
  </div>;
}

createRoot(document.getElementById("root")!).render(<App />);
