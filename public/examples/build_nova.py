import re, html, pathlib
OUT = pathlib.Path(__file__).parent.parent / "nova"

MENU = {
 "Coffee": ("Roasted by a small Riga roaster, pulled the way we like it.", [
  ("espresso","Espresso","Double shot, caramel and dark cocoa.",2.60,"1",""),
  ("cortado","Cortado","Espresso cut with an equal measure of warm milk.",3.40,"2",""),
  ("flatwhite","Flat White","Our house blend, silky milk, a thin crown.",3.50,"3",""),
  ("cappuccino","Cappuccino","Dense foam, balanced and quiet.",3.60,"4",""),
  ("filter","Filter Coffee","Rotating single origin, brewed by the cup.",3.20,"5",""),
  ("coldbrew","Cold Brew","Steeped 18 hours, served over one large cube.",4.20,"6","")]),
 "Breakfast": ("Served from 07:30 until 12:00, weekends until 15:00.", [
  ("toast","Miso Mushroom Toast","Roasted mushrooms, white miso butter, rye sourdough, chives.",9.50,"4","v"),
  ("eggs","Soft Scrambled Eggs","Slow-cooked eggs, brown butter, toasted brioche.",8.90,"3","v"),
  ("granola","Granola & Seasonal Fruit","Oat and hazelnut granola, kefir, whatever is ripe.",7.80,"5","v"),
  ("brioche","Breakfast Brioche","Soft egg, smoked cheddar, tomato jam, rocket.",9.20,"2","v")]),
 "Bakery": ("Baked every morning in our own kitchen.", [
  ("bun","Cinnamon Bun","Cardamom-laced dough, cinnamon butter, pearl sugar.",4.50,"1","v"),
  ("croissant","Almond Croissant","Twice-baked, frangipane, toasted flaked almonds.",3.90,"2","v"),
  ("danish","Seasonal Danish","Laminated pastry, vanilla cream, fruit of the month.",4.20,"3","v"),
  ("tart","Chocolate Tart","Dark chocolate, rye crumb base, sea salt.",5.20,"6","v")]),
 "Lunch": ("From 11:30 until 16:00.", [
  ("chicken","Roasted Chicken Sandwich","Herb-roasted chicken, pickled onion, mustard mayo, focaccia.",10.90,"2",""),
  ("risotto","Mushroom Risotto","Forest mushrooms, aged hard cheese, parsley oil.",12.50,"4","v"),
  ("salad","Seasonal Salad","Roots, grains, toasted seeds, citrus dressing.",10.50,"5","vg"),
  ("soup","Soup of the Day","Ask at the counter, served with rye bread.",6.90,"1","")]),
 "Drinks": ("Cold, sparkling and a little bit grown-up.", [
  ("wine","Natural Wine","By the glass, red, white or orange. Ask what is open.",6.50,"6","vg"),
  ("lemonade","House Lemonade","Pressed lemon, honey, thyme.",3.90,"3","vg"),
  ("water","Sparkling Water","Chilled, 0.5 l.",2.50,"5","vg"),
  ("spritz","Seasonal Spritz","Bitter aperitivo, dry sparkling wine, fruit of the month.",8.50,"1","vg")]),
}
e = html.escape

def money(p): return "€%.2f" % p

def head(title, active, desc):
    links = [("menu.html","Menu"),("order.html","Order"),("story.html","Our Story"),("visit.html","Visit"),("reservations.html","Reservations")]
    nav = "".join('<a href="%s"%s>%s</a>' % (h, ' aria-current="page"' if h==active else "", t) for h,t in links)
    return f'''<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<meta name="theme-color" content="#F3EBDC">
<meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='16' fill='%23F2C94C'/%3E%3Ctext x='16' y='22' font-size='18' font-weight='700' text-anchor='middle' font-family='sans-serif' fill='%232A2622'%3En%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/nova.css">
</head><body>
<a class="sr" href="#main">Skip to content</a>
<header class="site-header"><div class="wrap">
<a class="logo" href="index.html" aria-label="Nova Café, home">nova<span>café</span></a>
<nav class="nav" aria-label="Main">{nav}</nav>
<div class="head-actions">
<a class="btn btn-solid btn-sm" href="order.html">Order online</a>
<button class="cart-btn" data-open-cart aria-label="Open your order">Order <b data-cart-count>0</b></button>
<button class="burger" aria-expanded="false" aria-controls="mnav" aria-label="Menu"><span></span></button>
</div></div></header>
<nav class="mnav" id="mnav" aria-label="Mobile">{nav}<a class="btn btn-solid" href="order.html">Order online</a><a class="btn btn-line" href="reservations.html">Reserve a table</a></nav>
<main id="main">
'''

FOOT = '''</main>
<footer class="foot"><div class="wrap">
<div class="foot-grid">
<div><a class="logo" href="index.html">nova<span>café</span></a><p style="margin-top:14px;max-width:30ch;opacity:.8">Coffee, food and good reasons to stay, in the middle of Riga.</p></div>
<div><h4>Visit</h4><ul><li>Brīvības iela 118</li><li>Rīga, LV-1011</li><li>Mon–Fri 07:30–20:00</li><li>Sat–Sun 08:30–21:00</li></ul></div>
<div><h4>Explore</h4><ul><li><a href="menu.html">Menu</a></li><li><a href="order.html">Order online</a></li><li><a href="story.html">Our story</a></li><li><a href="reservations.html">Reservations</a></li></ul></div>
<div><h4>Say hello</h4><ul><li><a href="tel:+37167000142">+371 6700 0142</a></li><li><a href="mailto:hello@nova-cafe.example">hello@nova-cafe.example</a></li><li>Instagram @novacafe.riga</li></ul></div>
</div>
<div class="foot-base"><span>Portfolio concept · Nova Café is a fictional café.</span><span>Concept website designed by Drasard · Riga, Latvia</span></div>
</div></footer>

<div class="scrim" aria-hidden="true"></div>
<aside class="drawer" aria-hidden="true" aria-label="Your order">
<div class="drawer-top"><h2>Your order</h2><button class="x" data-close aria-label="Close">×</button></div>
<div data-cart-view></div>
</aside>

<div class="modal" role="dialog" aria-modal="true" aria-labelledby="co-title">
<div class="modal-card">
<div class="modal-main">
<div id="co-head"><h2 id="co-title">Checkout</h2><p>Pickup at Nova Café, Brīvības iela 118.</p>
<div class="demo-flag"><span aria-hidden="true">⚑</span><div><b>DEMO PAYMENT</b>This is a portfolio demonstration. No real payment will be processed.</div></div></div>
<form id="co-form" novalidate class="form">
<div class="field"><label for="co-name">Name</label><input id="co-name" data-v="req" autocomplete="name"><div class="err">Enter your name.</div></div>
<div class="field"><label for="co-phone">Phone</label><input id="co-phone" data-v="phone" type="tel" autocomplete="tel"><div class="err">Enter a phone number.</div></div>
<div class="field full"><label for="co-email">Email</label><input id="co-email" data-v="email" type="email" autocomplete="email"><div class="err">Enter a valid email address.</div></div>
<div class="field full"><label for="co-time">Pickup time</label><select id="co-time" data-v="sel"><option value="">Choose a time</option><option>As soon as possible (about 15 min)</option><option>In 30 minutes</option><option>In 45 minutes</option><option>In 1 hour</option><option>Tomorrow morning, 08:00</option></select><div class="err">Choose a pickup time.</div></div>
<div class="field full"><label for="co-card">Card number</label><input id="co-card" data-v="card" inputmode="numeric" autocomplete="off" placeholder="4242 4242 4242 4242"><div class="err">Enter the 16-digit demo card number.</div></div>
<div class="field"><label for="co-exp">Expiry</label><input id="co-exp" data-v="exp" inputmode="numeric" autocomplete="off" placeholder="MM / YY"><div class="err">Use MM / YY.</div></div>
<div class="field"><label for="co-cvc">CVC</label><input id="co-cvc" data-v="cvc" inputmode="numeric" autocomplete="off" placeholder="123" maxlength="4"><div class="err">Enter 3 or 4 digits.</div></div>
<div class="full"><button type="button" class="btn btn-line btn-sm" data-fill-card>Fill with demo card</button></div>
<div class="full"><button class="btn btn-solid" style="width:100%" id="co-pay">PAY — DEMO</button></div>
</form>
<div id="co-done" class="done" hidden><div class="tick" aria-hidden="true">✓</div><h2>Order confirmed</h2><p>Thank you. This demo order has been successfully placed.</p><p style="margin-top:14px;font-weight:600" id="co-ref"></p><p style="margin-top:22px"><button class="btn btn-solid" data-close>Back to Nova</button></p></div>
</div>
<div class="modal-side"><h3 class="serif" style="font-size:30px;margin-bottom:14px">Your order</h3><div id="co-lines"></div><p class="cart-note" style="margin-top:18px">Nothing is prepared and no card is charged. Concept website by Drasard.</p></div>
<button class="x" data-close aria-label="Close checkout" style="position:absolute;right:14px;top:14px;z-index:3;background:var(--cream)">×</button>
</div></div>
<script src="assets/nova.js"></script>
</body></html>
'''

def ph(n, t, label="", cls=""):
    return f'<div class="ph {cls}" data-n="{n}" data-t="{t}" role="img" aria-label="{e(label or n)}">{("<i>"+e(label)+"</i>") if label else ""}</div>'

def page(name, title, desc, body):
    html_ = head(title, name, desc) + body + FOOT
    (OUT/name).write_text(html_, encoding="utf-8")

def band(): return '''<section class="band"><div class="wrap"><h2>Save a seat, we'll save the cinnamon bun.</h2><div class="hero-btns"><a class="btn btn-solid" href="reservations.html">Reserve a table</a><a class="btn btn-line" href="order.html">Order online</a></div></div></section>'''

def menu_lookup():
    for cat,(sub,items) in MENU.items():
        for it in items: yield cat,it
ITEMS = {it[0]:it for _,it in menu_lookup()}

# ------------- HOME -------------
sig_ids = [("bun","Cinnamon Bun","Cardamom dough, cinnamon butter and pearl sugar. Baked until the edges catch."),
           ("toast","Miso Mushroom Toast","Roasted mushrooms and white miso butter on thick rye sourdough."),
           ("flatwhite","Nova Flat White","Our house blend with silky milk. Chocolate, hazelnut, a long finish."),
           ("danish","Seasonal Danish","Laminated pastry with vanilla cream and the best fruit we can find this month.")]
sig = ""
for i,(k,nm,ds) in enumerate(sig_ids):
    it = ITEMS[k]
    sig += f'''<article class="sig">{ph(k, it[4], nm)}<h3>{nm}</h3><p>{ds}</p><div class="sig-foot"><span class="price">{money(it[3])}</span><button class="btn btn-line btn-sm" data-add data-label="Add" data-id="{k}" data-name="{e(nm)}" data-price="{it[3]}">Add</button></div></article>'''

today = [
 ("Coffee","From 07:30","Espresso, filter and cold brew, with oat, soy or whole milk.",[("Flat White","Our house blend",3.50),("Filter Coffee","Rotating single origin",3.20),("Cold Brew","Steeped for 18 hours",4.20)],"flatwhite"),
 ("Breakfast","07:30 to 12:00","Slow mornings, done properly. Everything is made to order.",[("Miso Mushroom Toast","Rye sourdough, white miso butter",9.50),("Soft Scrambled Eggs","Brown butter, brioche",8.90),("Granola & Seasonal Fruit","Hazelnut, kefir",7.80)],"toast"),
 ("Lunch","11:30 to 16:00","Short menu, changes with the market.",[("Roasted Chicken Sandwich","Mustard mayo, focaccia",10.90),("Mushroom Risotto","Aged cheese, parsley oil",12.50),("Soup of the Day","Ask at the counter",6.90)],"chicken"),
 ("Bakery","All day, until it's gone","Baked each morning. The cinnamon buns go first.",[("Cinnamon Bun","Cardamom and pearl sugar",4.50),("Almond Croissant","Twice-baked",3.90),("Chocolate Tart","Rye crumb, sea salt",5.20)],"bun"),
 ("Weekend brunch","Sat and Sun, 09:00 to 15:00","A longer table and a longer menu. Bookings welcome.",[("Breakfast Brioche","Soft egg, smoked cheddar",9.20),("Seasonal Spritz","Bitter aperitivo, dry sparkling wine",8.50),("Seasonal Danish","Vanilla cream, fruit of the month",4.20)],"brioche"),
]
tabs = "".join(f'<button class="tab" role="tab" aria-selected="false" aria-controls="tp{i}" id="tb{i}">{t[0]}</button>' for i,t in enumerate(today))
panels = ""
for i,(t,w,d,li,img) in enumerate(today):
    lis = "".join(f'<li><div><b>{a}</b><small>{b}</small></div><span class="price">{money(c)}</span></li>' for a,b,c in li)
    panels += f'<div class="today-panel" role="tabpanel" id="tp{i}" aria-labelledby="tb{i}"><h3>{t}</h3><p class="when">{w}. {d}</p><ul class="dish-list">{lis}</ul></div>'
today_img = "".join(ph(t[4], str(i%6+1), t[0], "today-img") if False else "" for i,t in enumerate(today))

tl = [("07:30","Coffee & breakfast","Doors open. First espresso, first bun out of the oven."),("11:30","Lunch","Sandwiches, risotto and soup for a proper midday break."),("15:00","Cake & coffee","The golden hour for tart, danish and a long filter."),("18:00","Wine & small plates","Natural wine, cheese and something warm from the kitchen.")]
tlh = "".join(f'<div class="tl"><time>{a}</time><h3>{b}</h3><p>{c}</p></div>' for a,b,c in tl)

hours = [("Monday","07:30 – 20:00"),("Tuesday","07:30 – 20:00"),("Wednesday","07:30 – 20:00"),("Thursday","07:30 – 20:00"),("Friday","07:30 – 21:00"),("Saturday","08:30 – 21:00"),("Sunday","08:30 – 20:00")]
hours_h = "".join(f"<li><span>{d}</span><span>{h}</span></li>" for d,h in hours)

MAP = '''<div class="mapbox" role="img" aria-label="Stylised map showing Nova Café on Brīvības iela, Riga"><svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="600" height="420" fill="#e9dec8"/><path d="M0 70 L600 140" stroke="#fbf7ee" stroke-width="22"/><path d="M0 300 L600 250" stroke="#fbf7ee" stroke-width="14"/><path d="M180 0 L240 420" stroke="#fbf7ee" stroke-width="12"/><path d="M420 0 L360 420" stroke="#fbf7ee" stroke-width="12"/><path d="M0 190 L600 205" stroke="#fbf7ee" stroke-width="8"/><rect x="40" y="230" width="110" height="70" fill="#c9d3a8" opacity=".7"/><rect x="450" y="40" width="110" height="70" fill="#c9d3a8" opacity=".7"/><rect x="270" y="300" width="70" height="90" fill="#c9d3a8" opacity=".6"/><text x="300" y="118" font-family="Familjen Grotesk,sans-serif" font-size="13" fill="#5a3d2b" transform="rotate(7 300 118)">Brīvības iela</text><circle cx="276" cy="160" r="9" fill="#2A2622"/></svg><div class="tag">Nova Café</div></div>'''

home = f'''<section class="hero"><div class="wrap">
<div class="hero-copy"><p class="hero-kicker">Specialty coffee · bakery · all-day kitchen</p>
<h1>Coffee, food &amp; <span class="serif">good reasons</span> to stay.</h1>
<p class="lead">A modern neighbourhood café in Riga built around exceptional coffee, thoughtful food and the simple pleasure of lingering a little longer.</p>
<div class="hero-btns"><a class="btn btn-solid" href="order.html">Order online</a><a class="btn btn-line" href="reservations.html">Reserve a table</a></div></div>
<div class="hero-img">{ph("hero","1","Photograph: the café window at 08:00")}<div class="sticker"><span>Open today<span class="serif">07:30</span>to 20:00</span></div></div>
</div></section>

<section class="sec sec-alt"><div class="wrap">
<div class="sec-head"><h2>Today at Nova</h2><p>Pick a part of the day. The kitchen runs on a short menu so everything is fresh.</p></div>
<div data-tabs><div class="tabs" role="tablist" aria-label="Menu by time of day">{tabs}</div>
<div class="today-grid"><div>{panels}</div>{ph("today","5","Photograph: the counter, mid-morning","today-img")}</div></div>
</div></section>

<section class="sec"><div class="wrap">
<div class="sec-head"><h2>The four we get asked for.</h2><a class="btn btn-line" href="menu.html">See the full menu</a></div>
<div class="sig-grid">{sig}</div></div></section>

<section class="sec sec-alt"><div class="wrap story">
{ph("cafe","2","Photograph: the long window bench")}
<div><h2>Nova was created for slow mornings, quick lunches and everything in between.</h2>
<p>We started with a simple idea: a café that is as good at 07:30 with a flat white as it is at 18:00 with a glass of natural wine. Coffee comes from a small Riga roaster. Pastry is baked each morning in our own kitchen. The menu follows the seasons, and the room is built for sitting.</p>
<p>We are a neighbourhood place first. Regulars have a table, newcomers get a smile, and nobody is hurried out the door.</p>
<div class="facts"><div><b>Specialty coffee</b><span>Roasted in Riga, brewed to order</span></div><div><b>Fresh bakery</b><span>Baked on site, every morning</span></div><div><b>Seasonal ingredients</b><span>Latvian farms where we can</span></div><div><b>Relaxed atmosphere</b><span>Laptops, books and long catch-ups</span></div></div>
<p style="margin-top:28px"><a class="btn btn-line" href="story.html">Our story</a></p></div>
</div></section>

<section class="sec sec-dark"><div class="wrap">
<div class="sec-head"><h2>From morning to evening.</h2><p style="opacity:.8">One room, four moods. Come back as often as the day allows.</p></div>
<div class="timeline">{tlh}</div></div></section>

<section class="sec"><div class="wrap"><div class="sec-head"><h2>A look inside.</h2><p>Light, wood, ceramics and a lot of steam.</p></div>
<div class="gal">{ph("g1","1","Photograph: morning light")}{ph("g2","3","Photograph: pastry case")}{ph("g3","5","Photograph: pour-over")}{ph("g4","6","Photograph: evening, wine")}{ph("g5","2","Photograph: toast and eggs")}{ph("g6","4","Photograph: the counter")}</div></div></section>

<section class="sec sec-alt"><div class="wrap visit">
<div><h2 class="h2">Visit Nova</h2><address>Brīvības iela 118<br>Rīga, LV-1011<br>Latvia</address>
<ul class="hours">{hours_h}</ul><p style="margin-top:22px"><a class="btn btn-line" href="visit.html">Getting here</a></p></div>
{MAP}</div></section>
{band()}'''
page("index.html","Nova Café · Specialty coffee and all-day dining in Riga","A modern neighbourhood café in Riga built around exceptional coffee, thoughtful food and the pleasure of lingering. Portfolio concept by Drasard.",home)

# ------------- MENU -------------
cols = ""
for cat,(sub,items) in MENU.items():
    rows = ""
    for k,nm,ds,pr,t,tag in items:
        badge = '<span class="tagv">VG</span>' if tag=="vg" else ('<span class="tagv">V</span>' if tag=="v" else "")
        rows += f'<div class="mitem"><b>{nm}{badge}</b><span class="pr">{money(pr)}</span><p>{ds}</p></div>'
    cols += f'<section class="mcat"><h2>{cat}<span class="serif">{sub.split(".")[0]}</span></h2>{rows}</section>'
menu_body = f'''<section class="phead"><div class="wrap"><h1>The menu</h1><p>Short, seasonal and made in house. Prices in EUR, taxes included.</p></div></section>
<section class="sec" style="padding-top:20px"><div class="wrap"><div class="menu-cols">{cols}</div>
<p class="menu-note">V vegetarian · VG vegan. Please tell us about allergies when you order, our kitchen handles gluten, dairy, nuts and sesame. Oat, soy and almond milk are available for no extra charge.</p>
<p style="margin-top:32px"><a class="btn btn-solid" href="order.html">Order online</a></p></div></section>{band()}'''
page("menu.html","Menu · Nova Café","The full Nova Café menu: coffee, breakfast, bakery, lunch and drinks. Prices in EUR.",menu_body)

# ------------- ORDER -------------
cats_nav = "".join(f'<a href="#{c.lower()}">{c}</a>' for c in MENU)
ob = ""
for cat,(sub,items) in MENU.items():
    prods = ""
    for k,nm,ds,pr,t,tag in items:
        prods += f'''<article class="prod">{ph(k,t,"")}<div><h3>{nm}</h3><p>{ds}</p><span class="price">{money(pr)}</span></div>
<div class="prod-buy"><div class="qty" role="group" aria-label="Quantity for {nm}"><button type="button" data-step="-1" aria-label="Fewer">−</button><output>1</output><button type="button" data-step="1" aria-label="More">+</button></div>
<button class="btn btn-solid btn-sm" data-add data-id="{k}" data-name="{nm}" data-price="{pr}">Add to order</button></div></article>'''
    ob += f'<section class="ocat" id="{cat.lower()}"><h2>{cat}</h2><p style="opacity:.75">{sub}</p>{prods}</section>'
order_body = f'''<section class="phead"><div class="wrap"><h1>Order online</h1><p>Order ahead and pick up at the counter. Ready in about 15 minutes. This is a demo experience, nothing is prepared.</p></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="order-layout"><div><nav class="cat-nav" aria-label="Categories">{cats_nav}</nav>{ob}</div>
<aside class="cart-panel" aria-label="Your order"><h2>Your order</h2><div data-cart-view></div></aside></div></div></section>'''
page("order.html","Order online · Nova Café","Order coffee, breakfast, bakery and lunch from Nova Café for pickup. Demo ordering experience by Drasard.",order_body)

# ------------- STORY -------------
story_body = f'''<section class="phead"><div class="wrap"><h1>Our story</h1><p>A café for the people who live around it.</p></div></section>
<section class="wrap" style="padding-bottom:20px">{ph("story","2","Photograph: opening morning","")}</section>
<style>.wrap>.ph[data-n=story]{{aspect-ratio:21/9}}</style>
<div class="wrap"><div class="longform"><h2>It started with a flat white.</h2><div><p class="big">We wanted a place where the coffee is excellent, the food is honest and nobody minds if you stay for three hours.</p>
<p>Nova opened on Brīvības iela in the spring, in a former print shop with tall windows and a floor that has seen better days. We kept the floor. We kept the light. We added a long bench, a very good espresso machine and an oven that hasn't been switched off since.</p>
<p>The kitchen is small by design. Our baker starts before dawn, the coffee comes from a roaster ten minutes away, and the lunch menu is written around what the market has that week. When something is at its best, we cook it simply and put it on a plate.</p></div></div>
<div class="longform"><h2>How we work.</h2><div class="values"><div><h3>Coffee first</h3><p>One house blend, one rotating single origin, always dialled in by hand.</p></div><div><h3>Baked here</h3><p>Pastry, bread and cake made in our kitchen, every morning.</p></div><div><h3>Local where it counts</h3><p>Dairy, vegetables and eggs from Latvian producers within two hours of Riga.</p></div></div></div>
<div class="longform"><h2>Come as you are.</h2><div><p>Bring a laptop, a book or a friend. We have sockets, daylight and a stack of board games for rainy Sundays. Dogs are welcome on the terrace and prams are welcome everywhere.</p><p style="margin-top:28px"><a class="btn btn-solid" href="order.html">Order online</a> <a class="btn btn-line" href="visit.html">Find us</a></p></div></div></div>{band()}'''
page("story.html","Our story · Nova Café","How Nova Café began: a neighbourhood café in Riga built for slow mornings and quick lunches.",story_body)

# ------------- VISIT -------------
visit_body = f'''<section class="phead"><div class="wrap"><h1>Visit</h1><p>Find us on Brīvības iela, a short walk from the Freedom Monument.</p></div></section>
<section class="sec" style="padding-top:20px"><div class="wrap visit"><div><address>Nova Café<br>Brīvības iela 118<br>Rīga, LV-1011<br>Latvia</address><ul class="hours">{hours_h}</ul>
<ul class="res-aside" style="margin-top:24px"><li><b>Getting here</b>Trams 3 and 7 stop at the door. Bike racks are at the corner. Street parking is limited, so we recommend the car park on Elizabetes iela.</li><li><b>Accessibility</b>Step-free entrance and an accessible toilet on the ground floor.</li><li><b>Contact</b><a href="tel:+37167000142">+371 6700 0142</a><br><a href="mailto:hello@nova-cafe.example">hello@nova-cafe.example</a></li></ul></div>{MAP}</div></section>{band()}'''
page("visit.html","Visit · Nova Café","Address, opening hours and directions for Nova Café on Brīvības iela, Riga.",visit_body)

# ------------- RESERVATIONS -------------
times = "".join(f"<option>{h:02d}:{m:02d}</option>" for h in range(8,20) for m in (0,30))
res_body = f'''<section class="phead"><div class="wrap"><h1>Reserve a table</h1><p>For breakfast, brunch, lunch or an early evening glass of wine. Walk-ins are always welcome too.</p></div></section>
<section class="sec" style="padding-top:20px"><div class="wrap res-layout"><div class="form-card">
<form class="form" novalidate data-confirm="rc">
<div class="field"><label for="r-date">Date</label><input id="r-date" name="date" type="date" data-v="req"><div class="err">Choose a date.</div></div>
<div class="field"><label for="r-time">Time</label><select id="r-time" name="time" data-v="sel"><option value="">Choose a time</option>{times}</select><div class="err">Choose a time.</div></div>
<div class="field"><label for="r-guests">Guests</label><select id="r-guests" name="guests" data-v="sel"><option value="">How many?</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option></select><div class="err">Choose a party size.</div></div>
<div class="field"><label for="r-name">Name</label><input id="r-name" name="name" data-v="req" autocomplete="name"><div class="err">Enter your name.</div></div>
<div class="field"><label for="r-email">Email</label><input id="r-email" name="email" type="email" data-v="email" autocomplete="email"><div class="err">Enter a valid email address.</div></div>
<div class="field"><label for="r-phone">Phone</label><input id="r-phone" name="phone" type="tel" data-v="phone" autocomplete="tel"><div class="err">Enter a phone number.</div></div>
<div class="field full"><label for="r-note">Special request</label><textarea id="r-note" name="note" placeholder="Allergies, a pram, a birthday cake…"></textarea></div>
<div class="full"><button class="btn btn-solid" style="width:100%">Request a table</button></div></form>
<div class="confirm" id="rc"><h2>Reservation request received.</h2><p>Thank you. This is a demo, so no table has been booked. A real Nova would confirm by email within the hour.</p><dl></dl><button class="btn btn-line" data-again>Make another request</button></div></div>
<aside><h2 class="h2" style="font-size:clamp(28px,3vw,40px)">Good to know</h2><ul class="res-aside"><li><b>Groups of 9 or more</b>Email us and we'll set up a long table.</li><li><b>Weekend brunch</b>Booking is recommended, 09:00 to 15:00.</li><li><b>Holding your table</b>We hold tables for 15 minutes.</li><li><b>Just coffee?</b>The front of the café is always walk-in.</li></ul></aside></div></section>'''
page("reservations.html","Reservations · Nova Café","Request a table at Nova Café for breakfast, brunch, lunch or an early evening drink. Demo reservation experience by Drasard.",res_body)

# make a tiny today panel image for home (separate from tabs markup)
print("nova built:", sorted(p.name for p in OUT.glob("*.html")))
