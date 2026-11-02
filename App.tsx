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

type SiteLanguage = "EN" | "LV" | "RU";
type LegalPageName = "privacy" | "terms";

function getLanguageFromPath(): SiteLanguage {
  const segment = window.location.pathname.split("/").filter(Boolean)[0]?.toUpperCase();
  return segment === "LV" || segment === "RU" ? segment : "EN";
}

function getLegalPageFromPath(): LegalPageName | null {
  const last = window.location.pathname.split("/").filter(Boolean).at(-1);
  return last === "privacy" || last === "terms" ? last : null;
}

function localizedPath(lang: SiteLanguage, page?: LegalPageName): string {
  const prefix = lang === "EN" ? "" : `/${lang.toLowerCase()}`;
  return page ? `${prefix}/${page}/` : (prefix ? `${prefix}/` : "/");
}

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

const navItems = ["Solutions", "Who We Serve", "Examples", "Pricing", "FAQ"];

const en = {
  nav: navItems,
  book: "Enquire",
  hero: "Websites that help restaurants grow.",
  heroBody:
    "We design professional websites for restaurants and cafés. Choose a simple Landing Page or a complete E-commerce Website with online ordering.",
  explore: "Explore Our Websites",
};

const lv = {
  nav: ["Risinājumi", "Kam mēs palīdzam", "Piemēri", "Cenas", "BUJ"],
  book: "Sazināties",
  hero: "Mājaslapas, kas palīdz restorāniem augt.",
  heroBody:
    "Mēs veidojam profesionālas mājaslapas restorāniem un kafejnīcām. Izvēlieties vienkāršu Landing Page vai pilnvērtīgu e-komercijas mājaslapu ar tiešsaistes pasūtījumiem.",
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
          {t.nav.map((item, i) => <a key={item} href={`#${["solutions", "audience", "examples", "pricing", "faq"][i]}`} onClick={() => setOpen(false)}>{item}</a>)}
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
          <div className="hero-offers">
            <a href="#pricing"><span>LANDING PAGE</span><strong>€390</strong><small>Present your business</small></a>
            <a href="#pricing"><span>E-COMMERCE WEBSITE</span><strong>€790</strong><small>Accept online orders</small></a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Website presentation mockups">
          <div className="orb" />
          <BrowserMockup className="browser-main" />
          <div className="phone">
            <div className="phone-top" />
            <img src={images.dish} alt="Fine dining dish" />
            <div className="phone-content"><small>CHEF'S SELECTION</small><strong>Sea & Garden</strong><span>Explore menu</span></div>
          </div>
          <div className="float-card"><span>DESIGN PREVIEW</span><b>AURELIA</b><small>Sample restaurant website</small></div>
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
  const groups = [
    { number: "01", title: "Restaurants", body: "Professional websites, menus, online ordering and customer checkout.", image: images.restaurant, alt: "Restaurant dining room" },
    { number: "02", title: "Cafés", body: "Digital menus, opening hours, location, product presentation and ordering.", image: images.cafe, alt: "Modern café interior" },
    { number: "03", title: "Local businesses", body: "Professional landing pages for businesses that need a stronger online presence.", image: images.dining, alt: "Independent local business interior" },
  ];
  return (
    <section className="section-pad audience" id="audience">
      <div className="container">
        <SectionTitle eyebrow="WHO WE SERVE" title="Built for businesses with something worth sharing." body="Our focus is local businesses that need a professional online presence and a clearer way for customers to connect." />
        <div className="audience-grid audience-grid-three">
          {groups.map((group) => (
            <article className="image-card" key={group.title}>
              <img src={group.image} alt={group.alt} loading="lazy" />
              <div className="image-overlay">
                <span>{group.number}</span>
                <div><h3>{group.title}</h3><p>{group.body}</p></div>
                <Icon name="arrow" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const showcaseFeatures = ["Premium responsive design", "Business information", "Menu / services", "Pricing & gallery", "Location & contact", "Mobile-first experience", "Custom visual design"];
const commerceFeatures = [
  "Everything in Landing Page",
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
        <div className="price"><div className="price-main"><del>{commerce ? "€1,025" : "€490"}</del><span>{commerce ? "€790" : "€390"}</span><b className="discount-badge">{commerce ? "23% OFF" : "20% OFF"}</b></div><small>{commerce ? "One-time payment + partner monthly subscription" : "One-time payment"}</small></div>
        <p>{commerce ? "A complete restaurant website with a digital menu, online ordering, checkout and a connected order-management platform. The partner subscription and payment processing are paid separately." : "A focused, professional website that presents your business, services or menu, and makes it easy for customers to contact you."}</p>
      </div>
      <div className="feature-list">
        {features.map((feature) => <div key={feature}><span><Icon name="check" /></span>{feature}</div>)}
      </div>
      <Button variant={commerce ? "primary" : "secondary"} href={commerce ? "#commerce" : "#examples"}>{commerce ? "Explore E-commerce" : "See examples"}</Button>
      <small className="price-note">{commerce ? "Partner subscription, payment processing and optional modules are separate costs. Payment availability is confirmed before setup." : "Final scope and customization are confirmed in your project quote."}</small>
    </article>
  );
}

function Packages() {
  return (
    <section className="section-pad packages" id="solutions">
      <div className="container">
        <SectionTitle eyebrow="CHOOSE YOUR WEBSITE" title="Two clear options. Choose what your business needs." body="A Landing Page presents your business. An E-commerce Website lets customers place orders through your website." light />
        <div className="pricing-grid" id="pricing"><PricingCard /><PricingCard commerce /></div>
      </div>
    </section>
  );
}

function Deliverables() {
  const landingItems = ["Custom visual direction and responsive website build","Business information, services or restaurant menu","Gallery, location and contact details","Contact form and clear calls to action","Mobile, tablet and desktop layouts","Launch handover and agreed revisions"];
  const ecommerceItems = ["Everything in the Landing Page package","Digital menu and product/category setup","Online cart and checkout configuration","Pickup and delivery rules, where required","Restaurant order dashboard setup","Owner walkthrough and launch handover"];
  return (
    <section className="section-pad deliverables" id="included">
      <div className="container">
        <SectionTitle eyebrow="WHAT YOU RECEIVE" title="Know what is included before you start." body="The exact scope is agreed with you before work begins. Here is what each starting package is designed to cover." />
        <div className="deliverables-grid">
          <article className="deliverable-card">
            <span className="deliverable-kicker">01 · LANDING PAGE</span>
            <h3>A professional online presence.</h3>
            <p>For customers who need to discover your business, understand what you offer and get in touch.</p>
            <ul>{landingItems.map(item => <li key={item}><Icon name="check" />{item}</li>)}</ul>
            <a href="#pricing">View Landing Page pricing <Icon name="arrow" /></a>
          </article>
          <article className="deliverable-card deliverable-card-featured">
            <span className="deliverable-kicker">02 · E-COMMERCE WEBSITE</span>
            <h3>A website that supports online orders.</h3>
            <p>For restaurants that want customers to browse a menu and place orders through a configured ordering platform.</p>
            <ul>{ecommerceItems.map(item => <li key={item}><Icon name="check" />{item}</li>)}</ul>
            <a href="#commerce">Explore the ordering system <Icon name="arrow" /></a>
          </article>
        </div>
        <p className="deliverables-note">Domain registration, hosting, copywriting, photography, paid platform plans, optional modules, payment fees and ongoing maintenance are confirmed separately in the written quotation unless expressly included.</p>
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
            <button className={mode === "showcase" ? "active" : ""} onClick={() => switchMode("showcase")}>LANDING PAGE</button>
            <button className={mode === "commerce" ? "active" : ""} onClick={() => switchMode("commerce")}>E-COMMERCE</button>
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
        <div className="demo-caption"><span>{mode === "showcase" ? "Landing Page · Browse → Discover → Contact" : "E-commerce · Browse → Order → Pay → Manage"}</span><p>{mode === "showcase" ? "A focused website that introduces your business." : "An ordering experience connected to restaurant operations."}</p></div>
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
        <SectionTitle eyebrow="E-COMMERCE FOR RESTAURANTS" title="Turn your website into an ordering channel." body="Give customers a clear path from browsing your menu to placing an order. DRASARD designs your website and helps configure a separate restaurant ordering platform around your workflow." />
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
  { name: "AURELIA", type: "Restaurant · E-commerce", image: images.restaurant, text: "A complete dining and ordering experience.", href: "/examples/aurelia/" },
  { name: "NOVA CAFÉ", type: "Café · Landing Page", image: images.cafeAlt, text: "A warm digital home for a neighbourhood ritual.", href: "/examples/nova-cafe/" },
  { name: "EMBER", type: "Kitchen · E-commerce", image: images.plate, text: "Open-fire cooking, translated to the screen.", href: "/examples/ember/" },
  { name: "SANGAK", type: "Turkish Restaurant · Landing Page", image: images.dish, text: "A welcoming online presence for a Turkish restaurant in Riga.", href: "https://sangak-lv.netlify.app/", domain: "sangak-lv.netlify.app" },
];

function Portfolio() {
  return (
    <section className="section-pad portfolio" id="examples">
      <div className="container">
        <SectionTitle eyebrow="CONCEPTS & DEMOS" title="See how your website could look." body="Explore sample website experiences for restaurants, cafés and food businesses. Each preview demonstrates a possible design direction and feature set." />
        <div className="portfolio-grid">
          {projects.map((project, i) => (
            <article className={`project-card project-${i + 1}`} key={project.name}>
              <div className="project-image"><img src={project.image} alt={`${project.name} website concept`} /><div className="project-browser"><i /><i /><i /><span>{project.domain || `${project.name.toLowerCase().replace(" ", "")}.lv`}</span></div><span className="project-number">0{i + 1}</span></div>
              <div className="project-info"><div><small>{project.type}</small><h3>{project.name}</h3><p>{project.text}</p></div><Button variant="text" href={project.href}>View Demo</Button></div>
            </article>
          ))}
        </div>
        <p className="portfolio-note">Examples are design concepts and demonstrations unless clearly identified as client work. Client reviews and measured results will only be published with permission.</p>
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
          <SectionTitle eyebrow="COMPARE THE OPTIONS" title="The difference at a glance." body="Choose a Landing Page to present your business, or E-commerce when customers need to order online." light />
          <Button href="#contact">Discuss your project</Button>
        </div>
        <div className="compare-table">
          <div className="comparison-paths">
            <div><strong>LANDING PAGE</strong><span>Browse <i>→</i> Discover <i>→</i> Contact</span></div>
            <div><strong>E-COMMERCE WEBSITE</strong><span>Browse <i>→</i> Order <i>→</i> Pay <i>→</i> Manage</span></div>
          </div>
          <div className="table-row table-head"><span>FEATURE</span><b>LANDING PAGE<br /><em>€390</em></b><b>E-COMMERCE WEBSITE<br /><em>€790</em></b></div>
          {comparison.map(([name, showcase, commerce]) => <div className="table-row" key={String(name)}><span>{name}</span><b>{showcase ? <Icon name="check" /> : "Not included"}</b><b>{commerce ? <Icon name="check" /> : "Not included"}</b></div>)}
        </div>
      </div>
    </section>
  );
}

const process = [
  ["Discover", "We understand your business, customers and what the website needs to achieve."],
  ["Plan", "We agree the package, content, project scope and any third-party services."],
  ["Design & build", "We create the visual direction and build a responsive website around your brand."],
  ["Configure & test", "For E-commerce, we configure the menu and ordering workflow, then confirm supported payment options."],
  ["Launch & handover", "We test the agreed customer journey and walk you through managing the website and connected tools."],
];

function Process() {
  return (
    <section className="section-pad process" id="process">
      <div className="container">
        <SectionTitle eyebrow="HOW IT WORKS" title="A clear process, from first call to launch." body="You know what is being built, what it costs and what is handed over before the project begins." />
        <div className="process-grid">
          {process.map(([title, text], i) => <article key={title}><span>0{i + 1}</span><div className="process-mark" /><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    ["What is included in the €390 Landing Page?", "The starting package covers a custom responsive website, your business information, services or menu, gallery, location and contact details, and the agreed launch handover. The exact page count, content and revisions are confirmed in your written quote."],
    ["What is included in the €790 E-commerce Website?", "It includes the Landing Page foundation plus digital menu setup, online cart and checkout configuration, agreed pickup or delivery settings, restaurant order dashboard setup and an owner walkthrough."],
    ["Is the partner subscription included in the €790?", "No. The €790 is DRASARD's one-time website and setup fee. The restaurant pays the selected ordering platform's monthly subscription separately. Optional modules may cost extra."],
    ["How much is the monthly ordering platform?", "The monthly amount depends on the selected platform plan, order volume and optional modules. We will confirm the current plan price and required features before you commit."],
    ["How does the restaurant receive orders?", "After the ordering platform is configured, staff receive orders through the supported restaurant dashboard and any compatible notifications or connected tools included in the selected plan."],
    ["Can customers pay online in Latvia?", "We confirm this for the restaurant and selected payment provider before launch. Do not assume that every payment method or provider is available for every Latvian restaurant."],
    ["Who updates the menu and prices?", "The restaurant team can manage menu content through the tools available in its selected platform plan. DRASARD provides the agreed setup and handover; ongoing updates can be agreed separately."],
    ["Do I own my website and domain?", "We recommend registering the domain in your own name and keeping access to the relevant accounts. Domain, hosting and ownership arrangements are confirmed in the written project agreement."],
    ["How long does a website take to build?", "Timing depends on the content, number of pages, integrations and how quickly materials and approvals are provided. We give you a project timeline before work starts."],
  ];
  return (
    <section className="section-pad faq-section" id="faq">
      <div className="container faq-layout">
        <div>
          <SectionTitle eyebrow="FREQUENTLY ASKED QUESTIONS" title="Good questions. Clear answers." body="Everything you should understand before choosing a website package." />
          <a className="faq-contact-link" href="#contact">Still have a question? Talk to DRASARD <Icon name="arrow" /></a>
        </div>
        <div className="faq-list">
          {items.map(([question, answer], index) => (
            <details className="faq-item" key={question}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><i>+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
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
    ["Made to grow", "Start with a Landing Page and add E-commerce when the business is ready."],
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

function Contact({ lang }: { lang: SiteLanguage }) {
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
            <div className="field-row"><label>Email address<input name="email" required type="email" placeholder="you@business.com" autoComplete="email" /></label><label>Phone number (optional)<input name="phone" type="tel" placeholder="+371" autoComplete="tel" /></label></div>
            <div className="field-row"><label>Business type<select name="businessType" defaultValue=""><option value="" disabled>Select type</option><option>Restaurant</option><option>Café</option><option>Other local business</option></select></label><label>Website type<select name="websiteType" defaultValue=""><option value="" disabled>Select website type</option><option>Landing Page</option><option>E-commerce Website</option><option>Not sure yet</option></select></label></div>
            <label>Tell us about your project<textarea name="message" rows={4} placeholder="What would you like your website to do?" /></label>
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="form-honeypot" />
            <button className="form-submit" type="submit" disabled={sending}>{sending ? "Sending…" : "Enquire"} {!sending && <Icon name="arrow" />}</button>
            {error && <p role="alert" className="form-error">{error}</p>}
            <small>We use these details to respond to your enquiry. Read our <a href={localizedPath(lang, "privacy")}>Privacy Notice</a>.</small>
          </>}
        </form>
      </div>
    </section>
  );
}

function Footer({ lang, setLang }: { lang: SiteLanguage; setLang: (lang: SiteLanguage) => void }) {
  return (
    <footer>
      <div className="container footer-main">
        <div><Logo /><p>Premium digital experiences<br />for local businesses.</p></div>
        <div className="footer-links">
          <span>EXPLORE</span>
          <a href="#solutions">Solutions</a><a href="#audience">Who We Serve</a><a href="#examples">Examples</a>
          <a href="#pricing">Pricing</a><a href="#process">How It Works</a><a href="#faq">FAQ</a>
        </div>
        <div className="footer-contact">
          <span>CONTACT</span><a href="mailto:contact@drasard.agency">contact@drasard.agency</a><p>Riga, Latvia</p>
          <div className="language">
            <button className={lang === "EN" ? "active" : ""} onClick={() => setLang("EN")}>EN</button><span>/</span>
            <button className={lang === "LV" ? "active" : ""} onClick={() => setLang("LV")}>LV</button><span>/</span>
            <button className={lang === "RU" ? "active" : ""} onClick={() => setLang("RU")}>RU</button>
          </div>
        </div>
      </div>
      <div className="container footer-word">DRASARD</div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} DRASARD STUDIO</span>
        <div><a href={localizedPath(lang, "privacy")}>Privacy Notice</a><a href={localizedPath(lang, "terms")}>Terms of Use</a></div>
        <span>RIGA · 56.9496° N</span>
      </div>
    </footer>
  );
}

function LegalPage({ page, lang, setLang }: { page: LegalPageName; lang: SiteLanguage; setLang: (lang: SiteLanguage) => void }) {
  const isPrivacy = page === "privacy";
  return (
    <div className="app legal-shell">
      <header className="legal-nav">
        <a href={localizedPath(lang)} className="legal-logo"><img src="/drasard-logo.svg" alt="DRASARD" /></a>
        <div className="legal-nav-actions">
          <a href={localizedPath(lang)}>Back to website</a>
          <div className="language">
            <button className={lang === "EN" ? "active" : ""} onClick={() => setLang("EN")}>EN</button><span>/</span>
            <button className={lang === "LV" ? "active" : ""} onClick={() => setLang("LV")}>LV</button><span>/</span>
            <button className={lang === "RU" ? "active" : ""} onClick={() => setLang("RU")}>RU</button>
          </div>
        </div>
      </header>
      <main className="legal-page">
        <div className="container">
          <Eyebrow>DRASARD · RIGA, LATVIA</Eyebrow>
          <h1>{isPrivacy ? "Privacy Notice" : "Terms of Website Use"}</h1>
          <p className="legal-updated">Last updated: 2 November 2026</p>
          {isPrivacy ? (
            <div className="legal-content">
              <p>This notice explains how DRASARD handles personal information submitted through this website and its enquiry form.</p>
              <h2>1. Who operates this website</h2>
              <p>DRASARD is a web studio based in Riga, Latvia. For privacy questions or requests, contact <a href="mailto:contact@drasard.agency">contact@drasard.agency</a>. The legal provider details for a commissioned project will be stated in the applicable written proposal or agreement.</p>
              <h2>2. Information we collect</h2>
              <p>When you send an enquiry, the form may collect your name, email address, business name, optional phone number, business type, selected website package and project message. Please do not include sensitive personal information in the message.</p>
              <h2>3. Why we use the information</h2>
              <p>We use enquiry information to respond to you, understand the project you have asked about, prepare a proposal and communicate about any resulting work. We process information for steps you request before entering into an agreement and, where applicable, to manage that agreement. We may also use limited technical information to protect the website and prevent abuse.</p>
              <h2>4. Service providers</h2>
              <p>The website is hosted using Vercel. The enquiry form uses Resend to transmit messages to DRASARD's configured contact inbox. These providers may process information as service providers under their respective terms and data-protection arrangements. The website also loads some fonts and illustrative images from external providers such as Google Fonts and Unsplash.</p>
              <h2>5. Retention</h2>
              <p>We keep enquiry information only for as long as needed to respond, manage the potential or ongoing business relationship and meet applicable legal obligations. When it is no longer needed, it is deleted or securely restricted.</p>
              <h2>6. Your rights</h2>
              <p>Depending on the circumstances, you may request access to your personal information, correction, deletion, restriction of processing, portability or object to processing. You can make a request at <a href="mailto:contact@drasard.agency">contact@drasard.agency</a>. You may also lodge a complaint with the Latvian Data State Inspectorate at <a href="https://www.dvi.gov.lv/en" target="_blank" rel="noreferrer">www.dvi.gov.lv</a>.</p>
              <h2>7. Cookies and external content</h2>
              <p>The website uses external font and image resources. Your browser may connect directly to those providers when loading the page. No advertising profile or newsletter signup is part of the enquiry form.</p>
              <h2>8. Changes and contact</h2>
              <p>We may update this notice when the website or its data handling changes. For questions, contact <a href="mailto:contact@drasard.agency">contact@drasard.agency</a>.</p>
            </div>
          ) : (
            <div className="legal-content">
              <p>These terms apply to your use of the DRASARD website. They explain the status of the information and examples shown here; they are not a substitute for a project-specific agreement.</p>
              <h2>1. Website information</h2>
              <p>The website describes DRASARD's web design and development services. Package prices are starting prices for the described scope. Final deliverables, price, timeline and responsibilities are confirmed in a written quotation or project agreement before work begins.</p>
              <h2>2. Third-party subscriptions and payments</h2>
              <p>The E-commerce Website package has a one-time DRASARD setup fee. The restaurant's ordering-platform subscription, optional modules and payment-processing charges are separate and are normally paid to the relevant providers. Availability of online payments and integrations is confirmed for the restaurant before launch.</p>
              <h2>3. Project scope and client materials</h2>
              <p>The client is responsible for ensuring that text, photographs, logos, menus and other materials supplied to DRASARD may lawfully be used. Page count, revisions, content creation, integrations, hosting, domain services, ongoing maintenance and handover are included only where the written quotation says so.</p>
              <h2>4. Third-party services</h2>
              <p>External platforms, payment providers, hosting services and integrations are governed by their own terms, fees and availability. DRASARD cannot promise that a third-party feature will be available for every country, account or plan.</p>
              <h2>5. Website content and concepts</h2>
              <p>Website text, visual design, logos and demonstration materials on this site belong to DRASARD or their respective rights holders. Concept examples are illustrative and must not be treated as proof of client performance or as a live ordering service.</p>
              <h2>6. Project agreements</h2>
              <p>Payment schedule, delivery dates, acceptance, revisions, ownership or licensing of final deliverables, cancellation, support and maintenance are set out in the written agreement for each project. If these terms conflict with a signed project agreement, the project agreement governs that project.</p>
              <h2>7. Contact</h2>
              <p>For questions about these terms or DRASARD services, contact <a href="mailto:contact@drasard.agency">contact@drasard.agency</a>.</p>
            </div>
          )}
          <a className="legal-back" href={localizedPath(lang)}>← Back to DRASARD</a>
        </div>
      </main>
      <div className="legal-bottom"><span>© {new Date().getFullYear()} DRASARD STUDIO</span><a href={localizedPath(lang, isPrivacy ? "terms" : "privacy")}>{isPrivacy ? "Terms of Website Use" : "Privacy Notice"}</a></div>
    </div>
  );
}

export default function App() {
  const [lang] = useState<SiteLanguage>(getLanguageFromPath);
  const legalPage = getLegalPageFromPath();
  const changeLanguage = (next: SiteLanguage) => {
    window.location.assign(localizedPath(next, legalPage) + (legalPage ? "" : window.location.hash));
  };

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

  useEffect(() => {
    const base = "https://www.drasard.agency";
    const title = legalPage === "privacy"
      ? (lang === "LV" ? "Privātuma paziņojums | DRASARD" : lang === "RU" ? "Политика конфиденциальности | DRASARD" : "Privacy Notice | DRASARD")
      : legalPage === "terms"
      ? (lang === "LV" ? "Lietošanas noteikumi | DRASARD" : lang === "RU" ? "Условия использования | DRASARD" : "Terms of Website Use | DRASARD")
      : (lang === "LV" ? "DRASARD | Mājaslapas restorāniem un vietējiem uzņēmumiem" : lang === "RU" ? "DRASARD | Сайты для ресторанов и местного бизнеса" : "DRASARD | Websites for Restaurants and Local Businesses");
    const description = legalPage
      ? (lang === "LV" ? "DRASARD tīmekļvietnes juridiskā informācija." : lang === "RU" ? "Юридическая информация сайта DRASARD." : "Legal information for the DRASARD website.")
      : (lang === "LV" ? "Profesionālas mājaslapas restorāniem, kafejnīcām un vietējiem uzņēmumiem Rīgā. Landing Page un e-komercijas risinājumi." : lang === "RU" ? "Профессиональные сайты для ресторанов, кафе и местного бизнеса в Риге. Лендинги и решения электронной коммерции." : "Professional websites for restaurants, cafés and local businesses in Riga. Choose a Landing Page or an E-commerce Website.");
    document.title = title;
    const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (desc) desc.content = description;
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = title;
    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = description;
    const current = localizedPath(lang, legalPage);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = base + current;
    (["EN", "LV", "RU"] as SiteLanguage[]).forEach(language => {
      const code = language.toLowerCase();
      let link = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${code}"]`);
      if (!link) { link = document.createElement("link"); link.rel = "alternate"; link.hreflang = code; document.head.appendChild(link); }
      link.href = base + localizedPath(language, legalPage);
    });
    let xDefault = document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="x-default"]');
    if (!xDefault) { xDefault = document.createElement("link"); xDefault.rel = "alternate"; xDefault.hreflang = "x-default"; document.head.appendChild(xDefault); }
    xDefault.href = base + localizedPath("EN", legalPage);
  }, [lang, legalPage]);

  if (legalPage) return <LegalPage page={legalPage} lang={lang} setLang={changeLanguage} />;

  return (
    <div className="app">
      <Nav lang={lang} setLang={changeLanguage} />
      <main>
        <Hero lang={lang} />
        <Packages />
        <Audience />
        <Deliverables />
        <Portfolio />
        <RestaurantDemo />
        <Process />
        <CommerceOverview />
        <Comparison />
        <FAQ />
        <Palindrome />
        <About />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} setLang={changeLanguage} />
    </div>
  );
}
