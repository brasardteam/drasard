import React, { useEffect, useState } from "react";
import { translations as lvTranslations } from "./lv-translation.js";
import { translations as ruTranslations } from "./ru-translation.js";

type MenuItem = {
  name: string;
  description: string;
  price: number;
  tag?: string;
};

type MenuCategory = {
  name: string;
  items: MenuItem[];
};

const translationEntriesFor = (lang: "EN" | "LV" | "RU") => Object.entries(lang === "RU" ? ruTranslations : lvTranslations).sort(([a], [b]) => b.length - a.length);
const originalTextNodes = new WeakMap<Node, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();

function translatedValue(source: string, lang: "EN" | "LV" | "RU"): string {
  if (lang === "EN") return source;
  return translationEntriesFor(lang).reduce((result, [from, to]) => result.split(from).join(to), source);
}

function applyPageLanguage(root: HTMLElement, lang: "EN" | "LV" | "RU") {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Node[] = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  for (const node of textNodes) {
    const parent = node.parentElement;
    if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) continue;
    if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue || "");
    const source = originalTextNodes.get(node) || "";
    const next = translatedValue(source, lang);
    if (node.nodeValue !== next) node.nodeValue = next;
  }

  const attributes = ["aria-label", "alt", "placeholder", "title"];
  root.querySelectorAll("*").forEach((element) => {
    let originals = originalAttributes.get(element);
    if (!originals) {
      originals = new Map<string, string>();
      originalAttributes.set(element, originals);
    }
    for (const attribute of attributes) {
      const current = element.getAttribute(attribute);
      if (current === null) continue;
      if (!originals.has(attribute)) originals.set(attribute, current);
      const source = originals.get(attribute) || "";
      const next = translatedValue(source, lang);
      if (current !== next) element.setAttribute(attribute, next);
    }
  });
}


const images = {
  restaurant:
    "https://images.unsplash.com/photo-1709548145082-04d0cde481d4?auto=format&fit=crop&w=1800&q=88",
  cafe: "https://images.unsplash.com/photo-1755884931646-ae6e1d227717?auto=format&fit=crop&w=1400&q=88",
  dining:
    "https://images.unsplash.com/photo-1577892210326-4b00a7a9cb47?auto=format&fit=crop&w=1400&q=88",
  dish: "https://images.unsplash.com/photo-1775497950071-965cf9e20b2f?auto=format&fit=crop&w=1400&q=88",
  dessert:
    "https://images.unsplash.com/photo-1784571249185-2f9e46acef30?auto=format&fit=crop&w=1400&q=88",
  plate:
    "https://images.unsplash.com/photo-1773333155314-cbfb5f6d4dba?auto=format&fit=crop&w=1400&q=88",
  cafeAlt:
    "https://images.unsplash.com/photo-1755884932029-c26586a7b06a?auto=format&fit=crop&w=1400&q=88",
};

const menu: MenuCategory[] = [
  {
    name: "Starters",
    items: [
      { name: "Charred Octopus", description: "Smoked potato, lemon beurre blanc, herbs", price: 16 },
      { name: "Beef Tartare", description: "Caper, cured yolk, toasted brioche", price: 15 },
      { name: "Burrata & Pear", description: "Fermented pear, hazelnut, lovage oil", price: 14, tag: "V" },
      { name: "Baltic Herring", description: "Potato rösti, dill, crème fraîche", price: 12 },
      { name: "Forest Mushrooms", description: "Brown butter, thyme, rye crisp", price: 13, tag: "V" },
      { name: "Scallop Crudo", description: "Green apple, celery, buttermilk", price: 17 },
      { name: "Chicken Liver Parfait", description: "Blackcurrant, sourdough, sea salt", price: 13 },
    ],
  },
  {
    name: "Soups & Salads",
    items: [
      { name: "Roasted Celeriac Soup", description: "Apple, sage, brown butter", price: 10, tag: "V" },
      { name: "Wild Mushroom Broth", description: "Barley, parsley root, chive", price: 11, tag: "VG" },
      { name: "Aurelia Green Salad", description: "Garden leaves, herbs, sunflower vinaigrette", price: 10, tag: "VG" },
      { name: "Smoked Trout Salad", description: "Cucumber, radish, dill cream", price: 14 },
      { name: "Roasted Beetroot", description: "Goat cheese, walnut, raspberry", price: 12, tag: "V" },
      { name: "Warm Duck Salad", description: "Plum, chicory, toasted seeds", price: 15 },
    ],
  },
  {
    name: "Main Courses",
    items: [
      { name: "Dry-Aged Duck Breast", description: "Beetroot, blackcurrant, duck jus", price: 27 },
      { name: "Baltic Cod", description: "Mussels, leek, smoked beurre blanc", price: 26 },
      { name: "Beef Short Rib", description: "Celeriac, onion, red wine jus", price: 29 },
      { name: "Herb-Roasted Chicken", description: "Jerusalem artichoke, kale, thyme", price: 24 },
      { name: "Grilled Sea Trout", description: "Fennel, potato, dill sauce", price: 25 },
      { name: "Venison Loin", description: "Parsnip, juniper, lingonberry", price: 31 },
      { name: "Barley Risotto", description: "Forest mushroom, aged cheese, herbs", price: 20, tag: "V" },
      { name: "Roasted Cauliflower", description: "Almond, grape, saffron sauce", price: 19, tag: "VG" },
      { name: "Lamb Rump", description: "Carrot, buckwheat, rosemary jus", price: 28 },
      { name: "House-Made Gnocchi", description: "Pumpkin, sage, smoked cheese", price: 21, tag: "V" },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Dark Chocolate", description: "Sea buckthorn, caramel, cocoa nib", price: 11, tag: "V" },
      { name: "Honey Cake", description: "Sour cream, rye, wildflower honey", price: 10, tag: "V" },
      { name: "Apple & Meadowsweet", description: "Oat, cultured cream, sorrel", price: 10, tag: "V" },
      { name: "Blackcurrant Pavlova", description: "Vanilla, meringue, lemon balm", price: 11, tag: "V" },
      { name: "Rye Crème Brûlée", description: "Malt, cherry, toasted grain", price: 10, tag: "V" },
      { name: "Artisan Cheese", description: "Three Baltic cheeses, quince, crispbread", price: 14, tag: "V" },
    ],
  },
  {
    name: "Drinks",
    items: [
      { name: "Aurelia Spritz", description: "Rhubarb, sparkling wine, verbena", price: 11 },
      { name: "Northern Collins", description: "Gin, spruce, lemon, soda", price: 12 },
      { name: "Sea Buckthorn Sour", description: "Vodka, sea buckthorn, egg white", price: 12 },
      { name: "Garden Tonic", description: "Cucumber, basil, tonic, alcohol-free", price: 8 },
      { name: "Riesling, Mosel", description: "Crisp, mineral, glass", price: 9 },
      { name: "Pinot Noir, Baden", description: "Silky, bright, glass", price: 11 },
      { name: "House Filter Coffee", description: "Seasonal single origin", price: 4 },
      { name: "Sparkling Water", description: "750 ml", price: 5 },
    ],
  },
];

const navItems = ["Solutions", "Examples", "Pricing", "About", "How It Works"];

const en = {
  nav: navItems,
  book: "Enquire",
  hero: "Premium digital experiences for local businesses.",
  heroBody:
    "We design and build sophisticated websites for restaurants, cafés and ambitious local businesses, from elegant digital showcases to complete online ordering experiences.",
  explore: "Explore Our Websites",
};

const lv = {
  nav: ["Risinājumi", "Piemēri", "Cenas", "Par mums", "Kā tas notiek"],
  book: "Sazināties",
  hero: "Izcila digitālā pieredze vietējiem uzņēmumiem.",
  heroBody:
    "Mēs veidojam izsmalcinātas mājaslapas restorāniem, kafejnīcām un ambicioziem vietējiem uzņēmumiem, no eleganta tēla līdz pilnvērtīgai pasūtīšanas pieredzei.",
  explore: "Apskatīt mājaslapas",
};

function Icon({ name }: { name: "arrow" | "menu" | "close" | "plus" | "check" | "bag" | "mail" }) {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    menu: <><path d="M4 8h16" /><path d="M4 16h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    bag: <><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" /></>,
  };
  return <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">{paths[name]}</svg>;
}

function Button({
  children,
  variant = "primary",
  onClick,
  href,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text";
  onClick?: () => void;
  href?: string;
}) {
  const content = <>{children}<Icon name="arrow" /></>;
  if (href) return <a className={`button button-${variant}`} href={href}>{content}</a>;
  return <button className={`button button-${variant}`} onClick={onClick}>{content}</button>;
}

function Logo() {
  return (
    <a className="logo" href="#home" aria-label="Drasard home">
      <span className="logo-d">D</span><span>RASAR</span><span className="logo-d logo-d-end">D</span>
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? "eyebrow-dark" : ""}`}><span />{children}</div>;
}

function SectionTitle({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function BrowserMockup({ className = "", image = images.restaurant }: { className?: string; image?: string }) {
  return (
    <div className={`browser ${className}`}>
      <div className="browser-bar">
        <div className="browser-dots"><i /><i /><i /></div>
        <span>aurelia-riga.lv</span>
      </div>
      <div className="browser-screen" style={{ backgroundImage: `url(${image})` }}>
        <div className="aurelia-nav"><b>AURELIA</b><span>MENU &nbsp;&nbsp; STORY &nbsp;&nbsp; VISIT</span></div>
        <div className="aurelia-copy"><small>RIGA · LATVIA</small><strong>Modern Baltic dining,<br />thoughtfully composed.</strong><em>Reserve a table</em></div>
      </div>
    </div>
  );
}

function Nav({ lang, setLang }: { lang: "EN" | "LV" | "RU"; setLang: (lang: "EN" | "LV" | "RU") => void }) {
  const [open, setOpen] = useState(false);
  const t = lang === "LV" ? lv : en;
  return (
    <header className="nav-shell">
      <nav className="nav">
        <Logo />
        <div className={`nav-links ${open ? "open" : ""}`}>
          {t.nav.map((item, i) => <a key={item} href={`#${["solutions", "examples", "pricing", "about", "process"][i]}`} onClick={() => setOpen(false)}>{item}</a>)}
          <Button href="#contact">{t.book}</Button>
        </div>
        <div className="nav-actions">
          <div className="language" aria-label="Language">
            <button className={lang === "EN" ? "active" : ""} onClick={() => setLang("EN")}<button aria-label="English" title="English" className={lang === "EN" ? "active" : ""} onClick={() => setLang("EN")}>EN</button>
            <span aria-hidden="true">|</span>
            <button className={lang === "LV" ? "active" : ""} onClick={() => setLang("LV")}<button aria-label="Latviešu valoda" title="Latviešu" className={lang === "LV" ? "active" : ""} onClick={() => setLang("LV")}>LV</button>
            <span aria-hidden="true">|</span>
            <button aria-label="Русский язык" title="Русский" className={lang === "RU" ? "active" : ""} onClick={() => setLang("RU")}>RU</button>
          </div>
          <a className="nav-cta" href="#contact">{t.book}</a>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu"><Icon name={open ? "close" : "menu"} /></button>
        </div>
      </nav>
    </header>
  );
}

function Hero({ lang }: { lang: "EN" | "LV" | "RU" }) {
  const t = lang === "LV" ? lv : en;
  return (
    <section className="hero" id="home">
      <div className="hero-grid container">
        <div className="hero-copy">
          <Eyebrow>WEB STUDIO · RIGA, LATVIA</Eyebrow>
          <h1>{t.hero}</h1>
          <p>{t.heroBody}</p>
          <div className="hero-actions">
            <Button href="#contact">{t.book}</Button>
            <Button href="#examples" variant="secondary">{t.explore}</Button>
          </div>
          <div className="hero-proof"><span>01</span><p>Professional websites for local businesses,<br />without the agency price tag.</p></div>
        </div>
        <div className="hero-visual" aria-label="Website presentation mockups">
          <div className="orb" />
          <BrowserMockup className="browser-main" />
          <div className="phone">
            <div className="phone-top" />
            <img src={images.dish} alt="Fine dining dish" />
            <div className="phone-content"><small>CHEF'S SELECTION</small><strong>Sea & Garden</strong><span>Explore menu</span></div>
          </div>
          <div className="float-card"><span>ONLINE RESERVATIONS</span><b>14</b><small>Today · +18%</small></div>
          <div className="coordinate">56.9496° N<br />24.1052° E</div>
        </div>
      </div>
      <div className="hero-ticker">
        <span>WEB DESIGN</span><span>DEVELOPMENT</span><span>ONLINE ORDERING</span><span>RIGA, LATVIA</span>
      </div>
    </section>
  );
}

function Palindrome() {
  return (
    <section className="palindrome section-pad">
      <div className="container palindrome-inner">
        <div className="pal-word" aria-label="Drasard">
          <span>D</span><span>R</span><span>A</span><span>S</span><span>A</span><span>R</span><span>D</span>
          <div className="pal-axis" />
        </div>
        <div className="pal-copy"><Eyebrow>THE NAME</Eyebrow><p>A name that reads the same in both directions.<br />A studio built around <strong>balance, precision and detail.</strong></p></div>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section className="section-pad audience" id="solutions">
      <div className="container">
        <SectionTitle eyebrow="WHO WE BUILD FOR" title="Built for businesses people remember." body="Local business. Premium digital presence." />
        <div className="audience-grid">
          <article className="image-card image-card-wide">
            <img src={images.dining} alt="Atmospheric restaurant interior" />
            <div className="image-overlay"><span>01</span><div><h3>Restaurants</h3><p>Menus, reservations, stories and complete ordering experiences.</p></div><Icon name="arrow" /></div>
          </article>
          <article className="image-card">
            <img src={images.cafe} alt="Warm contemporary cafe interior" />
            <div className="image-overlay"><span>02</span><div><h3>Cafés</h3><p>Products, locations and ordering, beautifully presented.</p></div><Icon name="arrow" /></div>
          </article>
        </div>
      </div>
    </section>
  );
}

const showcaseFeatures = ["Premium responsive design", "Business information", "Menu / services", "Pricing & gallery", "Location & contact", "Mobile-first experience", "Custom visual design"];
const commerceFeatures = ["Everything in Showcase", "Online ordering", "Cart & online payments", "Order management", "Customer interactions", "Business management", "Owner training and launch handover"];

function PricingCard({ commerce = false }: { commerce?: boolean }) {
  const features = commerce ? commerceFeatures : showcaseFeatures;
  return (
    <article className={`price-card ${commerce ? "price-card-featured" : ""}`}>
      {commerce && <div className="recommended">FULL BUSINESS EXPERIENCE</div>}
      <div className="price-top">
        <Eyebrow light={!commerce}>{commerce ? "02: COMMERCE" : "01: SHOWCASE"}</Eyebrow>
        <div className="price"><div className="price-main"><del>{commerce ? "€890" : "€490"}</del><span>{commerce ? "€690" : "€390"}</span><b className="discount-badge">{commerce ? "22% OFF" : "20% OFF"}</b></div><small>{"One-time payment"}</small></div>
        <p>{commerce ? "A complete digital business experience designed to help customers browse, order and pay online." : "A premium website designed to present your business beautifully and make it easy for customers to discover you."}</p>
      </div>
      <div className="feature-list">
        {features.map((feature) => <div key={feature}><span><Icon name="check" /></span>{feature}</div>)}
      </div>
      <Button variant={commerce ? "primary" : "secondary"} href="#demo">Explore {commerce ? "Commerce" : "Showcase"}</Button>
      <small className="price-note">{commerce ? "Customization and advanced functionality priced according to requirements." : "Customization available depending on requirements."}</small>
    </article>
  );
}

function Packages() {
  return (
    <section className="section-pad packages" id="pricing">
      <div className="container">
        <SectionTitle eyebrow="TWO WEBSITE EXPERIENCES" title="Two ways to build your digital presence." body="Start with a beautiful digital showcase or turn your website into a complete business channel." light />
        <div className="pricing-grid"><PricingCard /><PricingCard commerce /></div>
        <div className="journey">
          <div className="journey-title"><Eyebrow>SEE THE DIFFERENCE</Eyebrow><h3>One beautiful foundation.<br />Two levels of possibility.</h3></div>
          <div className="journey-paths">
            <div><strong>SHOWCASE</strong><p><span>Browse</span><i>→</i><span>Discover</span><i>→</i><span>Contact</span></p></div>
            <div className="commerce-path"><strong>COMMERCE</strong><p><span>Browse</span><i>→</i><span>Order</span><i>→</i><span>Pay</span><i>→</i><span>Manage</span></p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoMenu({ onAdd, commerce }: { onAdd: (item: MenuItem) => void; commerce: boolean }) {
  const [category, setCategory] = useState(0);
  return (
    <div className="demo-menu">
      <div className="menu-categories">
        {menu.map((cat, i) => <button key={cat.name} className={category === i ? "active" : ""} onClick={() => setCategory(i)}>{cat.name}</button>)}
      </div>
      <div className="menu-list">
        <div className="menu-list-heading"><h4>{menu[category].name}</h4><span>{menu[category].items.length} selections</span></div>
        {menu[category].items.map((item) => (
          <article className="menu-item" key={item.name}>
            <div><div className="menu-item-name"><strong>{item.name}</strong>{item.tag && <span>{item.tag}</span>}</div><p>{item.description}</p></div>
            <div className="menu-price"><b>€{item.price}</b>{commerce && <button aria-label={`Add ${item.name}`} onClick={() => onAdd(item)}><Icon name="plus" /></button>}</div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Cart({
  cart,
  onRemove,
  onCheckout,
}: {
  cart: MenuItem[];
  onRemove: (index: number) => void;
  onCheckout: () => void;
}) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <aside className="cart">
      <div className="cart-head"><div><small>YOUR ORDER</small><h4>Cart</h4></div><span>{cart.length} items</span></div>
      {cart.length === 0 ? (
        <div className="empty-cart"><Icon name="bag" /><p>Your table is ready.<br />Add something from the menu.</p></div>
      ) : (
        <div className="cart-items">
          {cart.map((item, i) => <div className="cart-item" key={`${item.name}-${i}`}><span>1</span><div><strong>{item.name}</strong><small>€{item.price}</small></div><button onClick={() => onRemove(i)}>×</button></div>)}
        </div>
      )}
      <div className="cart-total"><div><span>Subtotal</span><b>€{total}</b></div><small>Taxes included · Pickup at Aurelia</small><button disabled={!cart.length} onClick={onCheckout}>Continue to checkout <Icon name="arrow" /></button></div>
    </aside>
  );
}

function Checkout({ step, setStep, total }: { step: number; setStep: (step: number) => void; total: number }) {
  if (step === 3) {
    return (
      <div className="confirmation">
        <div className="confirmation-mark"><Icon name="check" /></div>
        <small>ORDER #AUR-2048</small><h3>Order confirmed</h3><p>Thank you. The kitchen has received your order and will begin preparing it shortly.</p>
        <div className="prep-time"><span>ESTIMATED PREPARATION</span><strong>25 to 35 minutes</strong></div>
        <button onClick={() => setStep(0)}>Return to menu</button>
      </div>
    );
  }
  return (
    <div className="checkout">
      <div className="checkout-progress">
        {["Details", "Payment", "Confirmed"].map((label, i) => <div className={step >= i + 1 ? "active" : ""} key={label}><span>{i + 1}</span><small>{label}</small></div>)}
      </div>
      <div className="checkout-content">
        <small>{step === 1 ? "CUSTOMER INFORMATION" : "SECURE PAYMENT"}</small>
        <h3>{step === 1 ? "Where should we send updates?" : "Complete your order"}</h3>
        {step === 1 ? (
          <div className="checkout-fields">
            <label>Full name<input placeholder="Your name" /></label>
            <label>Email<input type="email" placeholder="name@email.com" /></label>
            <label>Phone<input placeholder="+371" /></label>
          </div>
        ) : (
          <div className="payment-card">
            <div className="card-chip" /><span>•••• •••• •••• 2048</span><div><small>AURELIA GUEST</small><small>08 / 29</small></div>
          </div>
        )}
        <button onClick={() => setStep(step + 1)}>{step === 1 ? "Continue to payment" : `Pay €${total}`} <Icon name="arrow" /></button>
      </div>
    </div>
  );
}

function RestaurantDemo() {
  const [mode, setMode] = useState<"showcase" | "commerce">("showcase");
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const switchMode = (next: "showcase" | "commerce") => {
    setMode(next);
    setCheckoutStep(0);
  };
  return (
    <section className="section-pad demo-section" id="demo">
      <div className="container">
        <div className="demo-heading">
          <SectionTitle eyebrow="INTERACTIVE DEMO" title="Don't just imagine it. Experience it." body="Explore a real restaurant website in two different ways." />
          <div className="demo-toggle">
            <button className={mode === "showcase" ? "active" : ""} onClick={() => switchMode("showcase")}>SHOWCASE</button>
            <button className={mode === "commerce" ? "active" : ""} onClick={() => switchMode("commerce")}>COMMERCE</button>
          </div>
        </div>
        <div className={`restaurant-demo ${mode}`}>
          <div className="demo-browser-bar"><div><i /><i /><i /></div><span>Interactive Demo · aurelia-riga.lv</span><em>{mode}</em></div>
          <div className="restaurant-hero">
            <img src={images.restaurant} alt="Aurelia restaurant interior" />
            <div className="restaurant-nav"><b>AURELIA</b><span>MENU &nbsp;&nbsp; STORY &nbsp;&nbsp; VISIT</span>{mode === "commerce" && <button><Icon name="bag" /> {cart.length}</button>}</div>
            <div className="restaurant-copy"><small>MODERN BALTIC DINING · RIGA</small><h3>Rooted in place.<br />Refined by season.</h3><p>Thoughtful food inspired by Latvia's forests, coast and farms.</p></div>
          </div>
          {checkoutStep > 0 ? <Checkout step={checkoutStep} setStep={setCheckoutStep} total={total} /> : (
            <div className="demo-body">
              <div className="demo-intro"><span>THE AURELIA MENU</span><h3>Seasonal ingredients.<br />Quietly expressive cooking.</h3><p>Our menu follows the rhythm of the Baltic seasons, celebrating exceptional ingredients with clarity and restraint.</p></div>
              <div className={`demo-menu-layout ${mode === "commerce" ? "has-cart" : ""}`}>
                <DemoMenu commerce={mode === "commerce"} onAdd={(item) => setCart([...cart, item])} />
                {mode === "commerce" && <Cart cart={cart} onRemove={(i) => setCart(cart.filter((_, index) => index !== i))} onCheckout={() => setCheckoutStep(1)} />}
              </div>
            </div>
          )}
        </div>
        <div className="demo-caption"><span>{mode === "showcase" ? "Browse → Discover → Contact" : "Browse → Order → Pay → Manage"}</span><p>{mode === "showcase" ? "A refined, complete digital presence." : "Your website becomes an active business channel."}</p></div>
      </div>
    </section>
  );
}

const projects = [
  { name: "AURELIA", type: "Restaurant · Commerce", image: images.restaurant, text: "A complete dining and ordering experience.", href: "/examples/aurelia/" },
  { name: "NOVA CAFÉ", type: "Café · Showcase", image: images.cafeAlt, text: "A warm digital home for a neighbourhood ritual.", href: "/examples/nova-cafe/" },
  { name: "EMBER", type: "Kitchen · Commerce", image: images.plate, text: "Open-fire cooking, translated to the screen.", href: "/examples/ember/" },
  { name: "NORTH TABLE", type: "Restaurant · Showcase", image: images.dessert, text: "Seasonal dining with editorial restraint.", href: "/examples/north-table/" },
];

function Portfolio() {
  return (
    <section className="section-pad portfolio" id="examples">
      <div className="container">
        <SectionTitle eyebrow="SELECTED CONCEPTS" title="Designed for real businesses." body="Every experience is shaped around a distinct business, audience and ambition." />
        <div className="portfolio-grid">
          {projects.map((project, i) => (
            <article className={`project-card project-${i + 1}`} key={project.name}>
              <div className="project-image"><img src={project.image} alt={`${project.name} website concept`} /><div className="project-browser"><i /><i /><i /><span>{project.name.toLowerCase().replace(" ", "")}.lv</span></div><span className="project-number">0{i + 1}</span></div>
              <div className="project-info"><div><small>{project.type}</small><h3>{project.name}</h3><p>{project.text}</p></div><Button variant="text" href={project.href}>View Demo</Button></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const comparison = [
  ["Premium responsive design", true, true], ["Menu / services", true, true], ["Gallery", true, true],
  ["Business information", true, true], ["Contact", true, true], ["Online ordering", false, true],
  ["Cart & online payments", false, true], ["Order management", false, true], ["Ongoing service", false, true],
];

function Comparison() {
  return (
    <section className="section-pad comparison">
      <div className="container comparison-grid">
        <div>
          <SectionTitle eyebrow="SIMPLE STARTING POINTS" title="Built around your business." body="Final pricing depends on customization, content, integrations and required functionality." light />
          <Button href="#contact">Enquire</Button>
        </div>
        <div className="compare-table">
          <div className="table-row table-head"><span>FEATURE</span><b>SHOWCASE<br /><em>€390</em></b><b>COMMERCE<br /><em>€690</em></b></div>
          {comparison.map(([name, showcase, commerce]) => <div className="table-row" key={String(name)}><span>{name}</span><b>{showcase ? <Icon name="check" /> : "Not included"}</b><b>{commerce ? <Icon name="check" /> : "Not included"}</b></div>)}
        </div>
      </div>
    </section>
  );
}

const process = [
  ["Discover", "We understand your business, customers and goals."],
  ["Design", "We create the visual direction and website experience."],
  ["Build", "We turn the design into a polished, responsive website."],
  ["Launch", "Your website goes live with a stronger digital presence."],
];

function Process() {
  return (
    <section className="section-pad process" id="process">
      <div className="container">
        <SectionTitle eyebrow="HOW IT WORKS" title="Clear from first conversation to launch." />
        <div className="process-grid">
          {process.map(([title, text], i) => <article key={title}><span>0{i + 1}</span><div className="process-mark" /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function About() {
  const reasons = [
    ["Premium by default", "Every website is a considered digital representation of your brand."],
    ["Built for local", "We understand the needs of restaurants, cafés and independent businesses."],
    ["Designed for customers", "Every interaction makes discovering and using your business easier."],
    ["Made to grow", "Start with Showcase and expand into Commerce when the time is right."],
    ["No needless complexity", "Only the functionality your business and customers actually need."],
  ];
  return (
    <section className="about" id="about">
      <div className="about-visual">
        <div className="riga-map" aria-hidden="true"><span>RĪGA</span><i /><i /><i /><i /></div>
        <div className="about-coordinate">56°56′58″ N<br />24°06′20″ E</div>
      </div>
      <div className="about-content">
        <Eyebrow>ABOUT DRASARD · RIGA, LATVIA</Eyebrow>
        <h2>Small studio.<br />Serious attention to detail.</h2>
        <p className="about-lead">Drasard is a Riga-based web development studio focused on creating premium digital experiences for local businesses.</p>
        <p>We believe a local business deserves a website that feels as considered and professional as the business itself. From a refined digital showcase to a complete online ordering experience, we build around what your business actually needs.</p>
        <div className="reasons">
          {reasons.map(([title, text], i) => <div key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });

      if (!response.ok) throw new Error("Unable to send inquiry");
      setSent(true);
      form.reset();
    } catch {
      setError("We couldn't send your inquiry right now. Please email us directly at brasard.team@gmail.com.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="contact section-pad" id="contact">
      <div className="container">
        <div className="contact-intro">
          <Eyebrow>START A CONVERSATION</Eyebrow>
          <h2>Let's build something<br />worth visiting.</h2>
          <p>Tell us about your business and what you want your website to do. We'll help you find the right approach.</p>
          <a href="mailto:brasard.team@gmail.com"><Icon name="mail" />brasard.team@gmail.com</a>
          <div className="contact-place"><span>DRASARD STUDIO</span><b>Riga, Latvia</b><small>Working with ambitious local businesses.</small></div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          {sent ? <div className="form-success"><Icon name="check" /><h3>Thank you.</h3><p>Your inquiry has been sent to Drasard. We'll be in touch shortly.</p><button type="button" onClick={() => { setSent(false); setError(""); }}>Send another inquiry</button></div> : <>
            <div className="field-row"><label>Your name<input name="name" required placeholder="Name" autoComplete="name" /></label><label>Business name<input name="business" placeholder="Business" autoComplete="organization" /></label></div>
            <label>Email address<input name="email" required type="email" placeholder="you@business.com" autoComplete="email" /></label>
            <div className="field-row"><label>Business type<select name="businessType" defaultValue=""><option value="" disabled>Select type</option><option>Restaurant</option><option>Café</option><option>Other local business</option></select></label><label>Website type<select name="websiteType" defaultValue=""><option value="" disabled>Select experience</option><option>Showcase</option><option>Commerce</option><option>Not sure yet</option></select></label></div>
            <label>Tell us about your project<textarea name="message" rows={4} placeholder="What would you like your website to do?" /></label>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="form-honeypot" />
            <button className="form-submit" type="submit" disabled={sending}>{sending ? "Sending…" : "Enquire"} {!sending && <Icon name="arrow" />}</button>
            {error && <p role="alert" className="form-error">{error}</p>}
            <small>By sending this form, you agree to our privacy policy.</small>
          </>}
        </form>
      </div>
    </section>
  );
}

function Footer({ lang, setLang }: { lang: "EN" | "LV" | "RU"; setLang: (lang: "EN" | "LV" | "RU") => void }) {
  return (
    <footer>
      <div className="container footer-main">
        <div><Logo /><p>Premium digital experiences<br />for local businesses.</p></div>
        <div className="footer-links"><span>EXPLORE</span>{["Home", ...navItems, "Contact"].map((item) => <a key={item} href={`#${item === "Home" ? "home" : item === "How It Works" ? "process" : item.toLowerCase()}`}>{item}</a>)}</div>
        <div className="footer-contact"><span>CONTACT</span><a href="mailto:brasard.team@gmail.com">brasard.team@gmail.com</a><p>Riga, Latvia</p><div className="language"><button className={lang === "EN" ? "active" : ""} onClick={() => setLang("EN")}>EN</button><span>/</span><button className={lang === "LV" ? "active" : ""} onClick={() => setLang("LV")}>LV</button><span>/</span><button className={lang === "RU" ? "active" : ""} onClick={() => setLang("RU")}>RU</button></div></div>
      </div>
      <div className="container footer-word">DRASARD</div>
      <div className="container footer-bottom"><span>© 2025 DRASARD STUDIO</span><div><a href="#home">Privacy Policy</a><a href="#home">Terms</a></div><span>RIGA · 56.9496° N</span></div>
    </footer>
  );
}

export default function App() {
  const [lang, setLang] = useState<"EN" | "LV" | "RU">("EN");
  useEffect(() => {
    document.documentElement.setAttribute("lang", lang.toLowerCase());
    const root = document.querySelector<HTMLElement>(".app");
    if (!root) return;
    const apply = () => applyPageLanguage(root, lang);
    apply();
    const observer = new MutationObserver(() => apply());
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [lang]);
  return (
    <div className="app">
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Palindrome />
        <Audience />
        <Packages />
        <RestaurantDemo />
        <Portfolio />
        <Comparison />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer lang={lang} setLang={setLang} />
    </div>
  );
}
