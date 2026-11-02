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
      <img className="logo-image" src="/drasard-logo.svg" alt="" />
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
          <div className="language" aria-label="Choose language">
            <button aria-label="English" title="English" className={lang === "EN" ? "active" : ""} onClick={() => setLang("EN")}>EN</button>
            <span aria-hidden="true">|</span>
            <button aria-label="Latviešu valoda" title="Latviešu" className={lang === "LV" ? "active" : ""} onClick={() => setLang("LV")}>LV</button>
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
  return null;
}

const showcaseFeatures = ["Premium responsive design", "Business information", "Menu / services", "Pricing & gallery", "Location & contact", "Mobile-first experience", "Custom visual design"];
const commerceFeatures = [
  "Everything in Showcase",
  "Online ordering and menu configuration",
  "Cart and checkout",
  "Pickup and delivery settings",
  "Restaurant order dashboard",
  "Owner app and order notifications",
  "Setup guidance and launch handover",
];

function PricingCard({ commerce = false }: { commerce?: boolean }) {
  const features = commerce ? commerceFeatures : showcaseFeatures;
  return (
    <article className={`price-card ${commerce ? "price-card-featured" : ""}`}>
      {commerce && <div className="recommended">FULL BUSINESS EXPERIENCE</div>}
      <div className="price-top">
        <Eyebrow light={!commerce}>{commerce ? "02: E-COMMERCE WEBSITE" : "01: LANDING PAGE"}</Eyebrow>
        <h3 className="package-name">{commerce ? "E-commerce Website" : "Landing Page"}</h3>
        <div className="price"><div className="price-main"><del>{commerce ? "€1,025" : "€490"}</del><span>{commerce ? "€790" : "€390"}</span><b className="discount-badge">{commerce ? "23% OFF" : "20% OFF"}</b></div><small>{commerce ? "One-time setup + partner monthly subscription" : "One-time payment"}</small></div>
        <p>{commerce ? "A restaurant website with online ordering, checkout and a restaurant operations platform configured around your workflow. The platform subscription and payment processing are billed separately." : "A polished website that presents your business, menu or services, and makes it easy for customers to get in touch."}</p>
      </div>
      <div className="feature-list">
        {features.map((feature) => <div key={feature}><span><Icon name="check" /></span>{feature}</div>)}
      </div>
      <Button variant={commerce ? "primary" : "secondary"} href={commerce ? "#commerce" : "#examples"}>{commerce ? "Explore Commerce" : "See examples"}</Button>
      <small className="price-note">{commerce ? "Platform subscription, payment processing and optional modules are separate costs. Payment availability depends on provider support." : "Customization available depending on requirements."}</small>
    </article>
  );
}

function Packages() {
  return (
    <section className="section-pad packages" id="pricing">
      <div className="container">
        <SectionTitle eyebrow="WEBSITE PACKAGES" title="Choose the website that fits your business." body="Compare the two starting points below, then explore the examples to see how each type of website can work in practice." light />
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
        <div className="empty-cart"><Icon name="bag" /><p>Your cart is empty. Add a dish from the menu to try the demo.</p></div>
      ) : (
        <div className="cart-items">
          {cart.map((item, i) => <div className="cart-item" key={`${item.name}-${i}`}><span>1</span><div><strong>{item.name}</strong><small>€{item.price}</small></div><button onClick={() => onRemove(i)}>×</button></div>)}
        </div>
      )}
      <div className="cart-total"><div><span>Subtotal</span><b>€{total}</b></div><small>Sample order · demo only</small><button disabled={!cart.length} onClick={onCheckout}>Continue to checkout <Icon name="arrow" /></button></div>
    </aside>
  );
}

function Checkout({ step, setStep, total }: { step: number; setStep: (step: number) => void; total: number }) {
  if (step === 3) {
    return (
      <div className="confirmation">
        <div className="confirmation-mark"><Icon name="check" /></div>
        <small>INTERACTIVE PREVIEW</small><h3>Demo complete</h3>
        <p>This is an illustrative prototype. No payment was taken and no order was sent to a restaurant.</p>
        <div className="prep-time"><span>WHAT THIS DEMO SHOWS</span><strong>Customer ordering journey</strong></div>
        <button onClick={() => setStep(0)}>Return to menu</button>
      </div>
    );
  }
  return (
    <div className="checkout">
      <div className="checkout-progress">
        {["Details", "Payment preview", "Complete"].map((label, i) => <div className={step >= i + 1 ? "active" : ""} key={label}><span>{i + 1}</span><small>{label}</small></div>)}
      </div>
      <div className="checkout-content">
        <small>{step === 1 ? "CUSTOMER INFORMATION" : "PAYMENT STEP PREVIEW"}</small>
        <h3>{step === 1 ? "Where should we send updates?" : "Payment setup depends on the restaurant."}</h3>
        {step === 1 ? (
          <div className="checkout-fields">
            <label>Full name<input placeholder="Your name" /></label>
            <label>Email<input type="email" placeholder="name@email.com" /></label>
            <label>Phone<input placeholder="+371" /></label>
          </div>
        ) : (
          <div className="demo-payment-notice">
            <strong>Payment provider setup</strong>
            <p>Online payments require a supported payment provider and account approval. This demonstration does not process payments.</p>
          </div>
        )}
        <button onClick={() => setStep(step + 1)}>{step === 1 ? "Review demo checkout" : "Finish demo"} <Icon name="arrow" /></button>
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
        <p className="demo-not-live">Interactive demo · illustrative only. This prototype is not connected to a live restaurant system and does not process real payments or orders.</p>
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

function CommerceOverview() {
  const capabilityGroups = [
    { title: "Customer ordering", items: ["Restaurant-branded ordering page", "Digital menu with item options and add-ons", "Cart, checkout and order notes", "Pickup, delivery and pre-orders (where supported)", "QR menu access"], note: "Ordering options depend on the selected platform plan and setup." },
    { title: "Restaurant operations", items: ["Order dashboard and owner app", "Incoming order notifications and status updates", "Opening hours and delivery-area settings", "Order printing and receipt options", "POS connections where supported"], note: "Available tools vary by platform, plan and compatible equipment." },
    { title: "Growth and expansion", items: ["Promotions and discount codes", "Customer database and marketing tools", "Loyalty programs", "Branded mobile app", "Driver and marketplace integrations", "Multi-location management"], note: "Advanced features may require optional modules or integrations." },
  ];
  return (
    <section className="section-pad commerce-overview" id="commerce">
      <div className="container">
        <SectionTitle eyebrow="COMMERCE FOR RESTAURANTS" title="Turn your website into an ordering channel." body="Give customers a clear path from browsing your menu to placing an order. DRASARD designs your website and helps configure a separate restaurant ordering platform around your workflow." />
        <div className="commerce-capabilities">
          {capabilityGroups.map((group, index) => (
            <article className="commerce-capability" key={group.title}>
              <span className="commerce-capability-number">0{index + 1}</span>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul>
              <p>{group.note}</p>
            </article>
          ))}
        </div>
        <div className="commerce-costs">
          <article><span>DRASARD WEBSITE DEVELOPMENT</span><strong>€790 one-time</strong><p>Website design, development and the agreed setup.</p></article>
          <article><span>ORDERING PLATFORM SUBSCRIPTION</span><strong>Paid separately</strong><p>The restaurant subscribes directly to the ordering platform. Its plan and optional modules determine the monthly price.</p></article>
          <article><span>PAYMENT PROCESSING</span><strong>Provider-dependent</strong><p>Payment methods and processing fees are set by the selected provider. We confirm Latvian availability before launch.</p></article>
        </div>
        <p className="commerce-disclaimer">The DRASARD development fee is one-time. The platform subscription, optional modules and payment-processing fees are separate costs paid to their respective providers. Features and availability depend on the selected plan, integrations and country.</p>
      </div>
    </section>
  );
}

const projects = [
  { name: "AURELIA", type: "Restaurant · Commerce", image: images.restaurant, text: "A complete dining and ordering experience.", href: "/examples/aurelia/" },
  { name: "NOVA CAFÉ", type: "Café · Showcase", image: images.cafeAlt, text: "A warm digital home for a neighbourhood ritual.", href: "/examples/nova-cafe/" },
  { name: "EMBER", type: "Kitchen · Commerce", image: images.plate, text: "Open-fire cooking, translated to the screen.", href: "/examples/ember/" },
  { name: "SANGAK", type: "Turkish Restaurant · Showcase", image: images.dish, text: "A welcoming online presence for a Turkish restaurant in Riga.", href: "https://sangak-lv.netlify.app/", domain: "sangak-lv.netlify.app" },
];

function Portfolio() {
  return (
    <section className="section-pad portfolio" id="examples">
      <div className="container">
        <SectionTitle eyebrow="SELECTED CONCEPTS" title="Designed for real businesses." body="Every experience is shaped around a distinct business, audience and ambition." />
        <div className="portfolio-grid">
          {projects.map((project, i) => (
            <article className={`project-card project-${i + 1}`} key={project.name}>
              <div className="project-image"><img src={project.image} alt={`${project.name} website concept`} /><div className="project-browser"><i /><i /><i /><span>{project.domain || `${project.name.toLowerCase().replace(" ", "")}.lv`}</span></div><span className="project-number">0{i + 1}</span></div>
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
  ["Cart & checkout", false, true], ["Online payment setup (provider-dependent)", false, true],
  ["Pickup and delivery settings", false, true], ["Restaurant order dashboard", false, true],
  ["Owner app and order notifications", false, true],
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
          <div className="table-row table-head"><span>FEATURE</span><b>LANDING PAGE<br /><em>€390</em></b><b>E-COMMERCE WEBSITE<br /><em>€790</em></b></div>
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

function CustomerExperience() {
  const offerings = [
    {
      number: "01",
      type: "LANDING PAGE",
      title: "Present your business.",
      description: "A professional website that helps customers discover your business, explore what you offer and get in touch.",
      demoLabel: "SAMPLE WEBSITE · NOVA CAFÉ",
      src: "/examples/nova-cafe/",
      frameTitle: "Nova Café Landing Page sample",
      steps: ["Discover your restaurant", "Explore menu and information", "Find location and contact details"],
      price: "€390",
      payment: "One-time payment",
      action: "Open Landing Page demo",
      href: "/examples/nova-cafe/",
      className: "experience-landing",
    },
    {
      number: "02",
      type: "E-COMMERCE WEBSITE",
      title: "Accept online orders.",
      description: "A restaurant website connected to an ordering experience, so customers can browse, add items and submit orders.",
      demoLabel: "SAMPLE ORDERING WEBSITE · AURELIA",
      src: "/examples/aurelia/",
      frameTitle: "Aurelia restaurant E-commerce sample",
      steps: ["Browse the digital menu", "Add items and checkout", "Restaurant receives the order"],
      price: "€790",
      payment: "One-time payment + partner monthly subscription",
      action: "Open E-commerce demo",
      href: "/examples/aurelia/",
      className: "experience-ecommerce",
    },
  ];

  return (
    <section className="customer-experience section-pad" id="customer-experience">
      <div className="container">
        <div className="experience-heading">
          <Eyebrow>CUSTOMER EXPERIENCE</Eyebrow>
          <h2>Two websites. Two different purposes.</h2>
          <p>See what customers can actually do when they visit your business online.</p>
        </div>
        <div className="experience-grid">
          {offerings.map((offer) => (
            <article className={`experience-card ${offer.className}`} key={offer.number}>
              <div className="experience-card-heading">
                <span className="experience-type">{offer.number} · {offer.type}</span>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
              </div>
              <div className="experience-preview">
                <div className="experience-browser-bar">
                  <span className="browser-dots"><i /><i /><i /></span>
                  <span>{offer.demoLabel}</span>
                  <span className="preview-live-label">DEMO</span>
                </div>
                <div className="experience-frame-window">
                  <iframe
                    src={offer.src}
                    title={offer.frameTitle}
                    loading="lazy"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="experience-card-bottom">
                <div className="experience-journey">
                  <span className="experience-detail-label">CUSTOMER JOURNEY</span>
                  <ol>
                    {offer.steps.map((step, index) => (
                      <li key={step}><span>0{index + 1}</span>{step}</li>
                    ))}
                  </ol>
                </div>
                <div className="experience-price">
                  <div><strong>{offer.price}</strong><span>{offer.payment}</span></div>
                  <a href={offer.href} target="_blank" rel="noreferrer" className="experience-demo-link">
                    {offer.action}<Icon name="arrow" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="experience-cost-note">
          <span>IMPORTANT</span>
          <p>Ordering platform subscriptions, optional modules and payment-processing fees are separate costs. Payment availability and ordering functionality are confirmed for each restaurant before launch.</p>
        </div>
        <p className="experience-disclaimer">Demo previews only. These are sample websites, not live client systems. Ordering and payment flows are illustrative and must be configured and tested for each restaurant.</p>
      </div>
    </section>
  );
}

function StudioNote() {
  return (
    <section className="studio-note" id="about">
      <div className="container studio-note-inner">
        <Eyebrow>ABOUT DRASARD · RIGA, LATVIA</Eyebrow>
        <h2>A small web studio in Riga, Latvia.</h2>
        <p>DRASARD builds considered websites for restaurants, cafés and local businesses. We combine thoughtful design with practical functionality, from a clear online presence to connected restaurant ordering.</p>
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
      setError("We couldn't send your inquiry right now. Please email us directly at contact@drasard.agency.");
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
          <a href="mailto:contact@drasard.agency"><Icon name="mail" />contact@drasard.agency</a>
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
        <div className="footer-contact"><span>CONTACT</span><a href="mailto:contact@drasard.agency">contact@drasard.agency</a><p>Riga, Latvia</p><div className="language"><button className={lang === "EN" ? "active" : ""} onClick={() => setLang("EN")}>EN</button><span>/</span><button className={lang === "LV" ? "active" : ""} onClick={() => setLang("LV")}>LV</button><span>/</span><button className={lang === "RU" ? "active" : ""} onClick={() => setLang("RU")}>RU</button></div></div>
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
        <CommerceOverview />
        <Portfolio />
        <RestaurantDemo />
        <Comparison />
        <Process />
        <CustomerExperience />
        <Contact />
        <StudioNote />
      </main>
      <Footer lang={lang} setLang={setLang} />
    </div>
  );
}
