import html, pathlib
OUT = pathlib.Path(__file__).parent.parent / "aurelia"
e = html.escape

def ph(n, t, label="", cls=""):
    return f'<div class="ph {cls}" data-n="{n}" data-t="{t}" role="img" aria-label="{e(label or n)}">{("<i>"+e(label)+"</i>") if label else ""}</div>'

def head(title, active, desc, extra=""):
    def a(h, t): return f'<a href="{h}"{" aria-current=\"page\"" if h==active else ""}>{t}</a>'
    left = a("index.html#restaurant","Restaurant")+a("menu.html","Menu")+a("experiences.html","Experiences")
    right = a("reservations.html","Reservations")+a("journal.html","Journal")+a("contact.html","Contact")+'<a class="btn btn-solid" href="reservations.html">Reserve</a>'
    return f'''<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{e(title)}</title><meta name="description" content="{e(desc)}"><meta name="theme-color" content="#EFEAE0">
<meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2322211F'/%3E%3Ctext x='16' y='23' font-size='20' text-anchor='middle' font-family='serif' fill='%23EFEAE0'%3EA%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/aurelia.css">
</head><body>
<a class="sr" href="#main">Skip to content</a>
<header class="hdr"><div class="wrap"><nav aria-label="Main">{left}</nav><a class="logo" href="index.html" aria-label="Aurelia, home">AURELIA</a><nav class="r" aria-label="Secondary">{right}</nav>
<button class="burger" aria-expanded="false" aria-controls="mnav" aria-label="Menu"></button></div></header>
<nav class="mnav" id="mnav" aria-label="Mobile">{left}{right.replace("btn btn-solid","btn btn-solid")}</nav>
<main id="main">
'''

FOOT = '''</main>
<footer class="ft"><div class="wrap"><div class="ft-top">
<div><a class="logo" href="index.html">AURELIA</a><p style="margin-top:18px;max-width:30ch;opacity:.8;font-family:var(--serif);font-size:20px;font-weight:300">Modern Baltic dining in the heart of Riga.</p></div>
<div><h4>Dinner</h4><ul><li>Tuesday to Thursday, 18:00 to 23:00</li><li>Friday and Saturday, 18:00 to 00:00</li><li>Closed Sunday and Monday</li></ul></div>
<div><h4>Find us</h4><ul><li>Kalpaka bulvāris 8</li><li>Rīga, LV-1050</li><li><a href="tel:+37167110280">+371 6711 0280</a></li><li><a href="mailto:reservations@aurelia.example">reservations@aurelia.example</a></li></ul></div>
<div><h4>Explore</h4><ul><li><a href="menu.html">Menu</a></li><li><a href="experiences.html">Experiences</a></li><li><a href="reservations.html">Reservations</a></li><li><a href="journal.html">Journal</a></li><li><a href="contact.html">Contact</a></li></ul></div>
</div><div class="ft-base"><span>Portfolio concept. Aurelia is a fictional restaurant.</span><span>Concept website designed by Drasard · Riga, Latvia</span></div></div></footer>
<script src="assets/aurelia.js"></script></body></html>
'''

def page(name, title, desc, body):
    (OUT/name).write_text(head(title, name, desc) + body + FOOT, encoding="utf-8")

STRIP = '''<section class="strip"><div class="narrow"><h2 class="d">A table is waiting.</h2><p>Reservations are recommended. We seat a small number of guests each evening.</p><div class="btns"><a class="btn btn-solid" href="reservations.html">Reserve a table</a><a class="btn btn-line" href="experiences.html">Explore experiences</a></div></div></section>'''

# ---------------- HOME ----------------
courses = [("Amuse","Smoked potato","cultured cream"),("First","Baltic trout","cucumber · dill"),("Second","Young beetroot","blackcurrant · goat cheese"),("Main","Duck","roasted onion · juniper"),("Dessert","Rye","chocolate · sea buckthorn")]
cl = "".join(f'<div class="course"><dt>{a}</dt><dd>{b}<small>{c.replace(" · ", ", ")}</small></dd></div>' for a,b,c in courses)
home = f'''<section class="hero">{ph("hero","4","Photograph: the dining room at dusk")}
<div class="hero-in"><h1>Modern Baltic dining, quietly reimagined.</h1>
<p>An intimate dining room in Riga where Baltic ingredients meet contemporary technique.</p>
<div class="btns"><a class="btn btn-fill-light" href="reservations.html">Reserve a table</a><a class="btn btn-light" href="menu.html">Explore the menu</a></div></div></section>

<section class="sec" id="restaurant"><div class="wrap"><div class="edit">
<div class="t"><h2 class="d">Twenty-two seats, one kitchen, a long view of the season.</h2>
<p class="lede">Aurelia is a small restaurant with a single idea: cook the Baltic as it is now, with care and restraint.</p></div>
{ph("restaurant1","1","Photograph: the pass","img1")}
{ph("restaurant2","3","Photograph: hands, rye, butter","img2")}
<div class="t2 prose"><p>Our ingredients come from a short list of Latvian and Estonian growers, fishers and foragers. Trout from clear northern rivers, beetroot pulled in June, juniper and pine from the Kurzeme coast. We cook with the seasons, so the menu moves quietly each week.</p>
<p>The technique is contemporary. Fermentation, smoke, long cures and precise heat give familiar flavours a new clarity. The cooking is never loud. A plate should taste of exactly what it is.</p>
<p>The room is intimate by design. Twenty-two seats, a low sound and a team that knows when to speak and when to step back. Our sommelier builds a cellar around small growers, from the Loire to Tokaj, with a particular love of the cool-climate wines of the north.</p>
<p style="margin-top:32px"><a class="tlink" href="journal.html#inside-the-aurelia-kitchen">Inside the kitchen</a></p></div>
</div></div></section>

<section class="sec sec-bone"><div class="wrap"><div class="menu-head"><h2 class="d">The menu</h2><p>Seven courses, shaped by the week's harvest. A preview of the current tasting menu.</p></div>
<div class="narrow" style="max-width:860px"><dl>{cl}</dl></div>
<div class="menu-cta"><a class="btn btn-solid" href="menu.html">View the full menu</a><a class="tlink" href="experiences.html">Book the tasting</a></div></div></section>

<section class="split sec-dark" style="color:var(--ivory)">
<div class="tx"><h2 class="d">Wine, chosen slowly.</h2><p>Our list is built around growers who farm with care and bottle with restraint. Expect mineral whites, lightly textured oranges and reds with lift rather than weight, many from small estates you may not know yet.</p><p style="margin-top:1em">A wine pairing is available with the tasting menu, and our sommelier is always happy to suggest a single glass or a bottle to share.</p><a class="tlink" href="menu.html#pairing">About the pairing</a></div>
{ph("wine","2","Photograph: the cellar door")}</section>

<section class="bleed">{ph("room","4","Photograph: the dining room")}<div class="cap"><p>Warm light, stone, linen and a lot of quiet.</p><a class="btn btn-light" href="contact.html">Find the restaurant</a></div></section>

<section class="sec"><div class="wrap priv">{ph("private","5","Photograph: the private table")}
<div><h2 class="d">Private dining</h2><p class="lede" style="margin-top:22px">A separate room for celebrations, quiet business dinners and long family evenings.</p>
<ul><li>Private room <span>8 to 14 guests</span></li><li>Full restaurant <span>Up to 22 guests</span></li><li>Bespoke menu <span>Designed with the chef</span></li></ul>
<a class="btn btn-line" href="contact.html#enquiry">Enquire about private dining</a></div></div></section>

<section class="sec sec-bone"><div class="wrap"><div class="menu-head" style="text-align:left;margin-left:0"><h2 class="d">Journal</h2></div>
<div class="jgrid">
<a class="jcard" href="journal.html#the-baltic-pantry">{ph("j1","1","The pantry")}<h3>The Baltic pantry</h3><p>Smoke, ferment, cure and preserve: the larder behind every course.</p></a>
<a class="jcard" href="journal.html#inside-the-aurelia-kitchen">{ph("j2","2","The kitchen")}<h3>Inside the Aurelia kitchen</h3><p>A morning with the team before the first guest arrives.</p></a>
<a class="jcard" href="journal.html#riga-after-dark">{ph("j3","4","The city")}<h3>Riga after dark</h3><p>Where we walk, drink and eat when the kitchen closes.</p></a>
</div></div></section>
{STRIP}'''
page("index.html","Aurelia · Modern Baltic dining in Riga","An intimate dining room in Riga where Baltic ingredients meet contemporary technique. Portfolio concept by Drasard.",home)

# ---------------- MENU ----------------
full = [("Amuse","Smoked potato","cultured cream, chive oil",""),
("Bread","Rye sourdough","whipped smoked butter","V"),
("First","Baltic trout","cucumber, dill, buttermilk",""),
("Second","Young beetroot","blackcurrant, goat cheese, hazelnut","V"),
("Main","Duck","roasted onion, juniper, rye jus",""),
("Pre-dessert","Buttermilk","pine, green apple","V"),
("Dessert","Rye","chocolate, sea buckthorn","V")]
fl = "".join(f'<div class="course"><dt>{a}</dt><dd>{b}{("<span class=tag>V</span>" if c=="V" else "")}<small>{t}</small></dd></div>' for a,b,t,c in full)
menu_body = f'''<section class="ph-head"><div class="narrow"><h1>The menu</h1><p>One tasting menu, seven courses, changing with the season. Served Tuesday to Saturday.</p></div></section>
<section class="wrap"><div class="price-row"><div><h3>Seven-course tasting</h3><div class="pp">€180</div><small>For two guests</small></div><div id="pairing"><h3>Wine pairing</h3><div class="pp">€80</div><small>Per guest</small></div><div><h3>Chef's table</h3><div class="pp">€320</div><small>For two guests, at the pass</small></div></div></section>
<section class="sec" style="padding-top:0"><div class="wrap"><div class="split" style="min-height:0;gap:clamp(32px,6vw,96px);align-items:start;grid-template-columns:5fr 7fr">{ph("menu1","1","Photograph: trout, cucumber, dill","")}<div><h2 class="d" style="margin-bottom:30px;font-size:clamp(30px,3.6vw,52px)">Tasting menu</h2><dl>{fl}</dl><p style="margin-top:26px;color:var(--mute);font-size:14.5px">V suitable for vegetarians. The menu changes with the week's harvest, so the dishes you see here are a snapshot.</p><p style="margin-top:30px"><a class="btn btn-solid" href="experiences.html">Book the tasting</a></p></div></div></div></section>
<section class="sec sec-dark" style="padding:clamp(64px,8vw,110px) 0"><div class="narrow center"><h2 class="d">The wine pairing</h2><p class="lede" style="margin:24px 0 18px">Six pours, chosen to follow the menu rather than lead it.</p><p style="opacity:.85">Expect a cool-climate Riesling beside the trout, a light red from the Jura with the duck and a late-harvest Tokaji with dessert. A non-alcoholic pairing of ferments, infusions and juices is available for €60 per guest.</p></div></section>
<section class="sec"><div class="wrap"><div class="split" style="min-height:0;grid-template-columns:7fr 5fr;gap:clamp(32px,6vw,96px);align-items:center"><div><h2 class="d" style="font-size:clamp(30px,3.6vw,52px)">Chef's table</h2><p class="lede" style="margin:22px 0 18px">Two seats at the pass. Watch the kitchen work and receive each course from the chef.</p><p style="color:var(--mute)">The chef's table runs the full tasting with two additional bites, a conversation with the kitchen and a glass of champagne on arrival. Available Wednesday to Saturday, one sitting a night.</p><p style="margin-top:28px"><a class="btn btn-line" href="experiences.html">Select experience</a></p></div>{ph("menu2","2","Photograph: the pass at service","")}</div></div></section>
<section class="sec sec-bone"><div class="wrap"><div class="diet"><div><h3>Vegetarian</h3><p>A full vegetarian tasting menu is available with 48 hours' notice. Vegan menus can be arranged with a little more notice.</p></div><div><h3>Allergies</h3><p>Please tell us about any allergy when you book. Our kitchen handles gluten, dairy, nuts, fish, shellfish and celery every day.</p></div><div><h3>Children</h3><p>We welcome guests aged 12 and over. Please speak to us if you would like to bring a younger guest.</p></div></div></div></section>
{STRIP}'''
page("menu.html","Menu · Aurelia","The Aurelia tasting menu: seven courses of modern Baltic cooking, with wine pairing and chef's table. Prices in EUR.",menu_body)

# ---------------- EXPERIENCES ----------------
exps = [
 ("tasting","Seven-course tasting","€180 · 2 guests","Our full tasting menu for two, from smoked potato to sea buckthorn. The best introduction to the kitchen.",180,"1","Photograph: tasting menu"),
 ("wine","Wine pairing evening","€260 · 2 guests","The seven-course tasting with a sommelier-led pairing of six glasses for both guests.",260,"2","Photograph: pairing glasses"),
 ("chef","Chef's table","€320 · 2 guests","Two seats at the pass, two extra bites and a conversation with the chef while the kitchen cooks.",320,"4","Photograph: the pass"),
]
cards = ""
for k,t,m,d,p,tt,lab in exps:
    cards += f'<article class="exp" data-exp="{k}" data-name="{t}" data-price="{p}">{ph("exp-"+k,tt,lab)}<div class="exp-b"><h3>{t}</h3><div class="meta">{m}</div><p>{d}</p><button class="btn btn-line" data-select>Select experience</button></div></article>'
cards += '''<article class="exp" data-exp="gift" data-name="Gift certificate" data-price="100"><div class="ph" data-n="exp-gift" data-t="5" role="img" aria-label="Photograph: gift envelope"><i>Photograph: the gift card</i></div><div class="exp-b"><h3>Gift certificate</h3><div class="meta">From €100</div><p>Give an evening at Aurelia. Delivered by email as a beautiful voucher, valid for twelve months on any experience.</p><div class="amounts" role="group" aria-label="Choose an amount"><button type="button" data-v="100" aria-pressed="true">€100</button><button type="button" data-v="150" aria-pressed="false">€150</button><button type="button" data-v="250" aria-pressed="false">€250</button><button type="button" data-v="400" aria-pressed="false">€400</button></div><button class="btn btn-line" data-select>Select experience</button></div></article>'''

CO = '''<div class="co" role="dialog" aria-modal="true" aria-labelledby="co-h"><div class="co-top"><a class="logo" href="index.html" style="font-size:24px">AURELIA</a><button data-close-co>Close</button></div>
<div id="co-main" class="co-grid"><div><h1 id="co-h">Complete your experience.</h1>
<div class="demo"><span aria-hidden="true">⚑</span><div><b>DEMO CHECKOUT</b>This is a portfolio demonstration. No real payment will be processed.</div></div>
<form id="co-form" novalidate>
<h2>Your details</h2>
<div class="form"><div class="field"><label for="c-name">Full name</label><input id="c-name" data-v="req" autocomplete="name"><div class="err">Enter your name.</div></div>
<div class="field"><label for="c-phone">Phone</label><input id="c-phone" type="tel" data-v="phone" autocomplete="tel"><div class="err">Enter a phone number.</div></div>
<div class="field full"><label for="c-email">Email</label><input id="c-email" type="email" data-v="email" autocomplete="email"><div class="err">Enter a valid email address.</div></div></div>
<div id="co-visit" class="full"><h2>Your evening</h2><div class="form"><div class="field"><label for="c-date">Preferred date</label><input id="c-date" type="date" data-v="req"><div class="err">Choose a date.</div></div>
<div class="field"><label for="c-time">Arrival</label><select id="c-time" data-v="sel"><option value="">Choose a time</option><option>18:00</option><option>19:00</option><option>20:00</option><option>21:00</option></select><div class="err">Choose a time.</div></div></div></div>
<div id="co-gift" class="full" hidden><h2>Your gift</h2><div class="form"><div class="field full"><label for="c-rcp">Recipient's name</label><input id="c-rcp" data-v="req"><div class="err">Enter the recipient's name.</div></div><div class="field full"><label for="c-msg">Message (optional)</label><textarea id="c-msg"></textarea></div></div></div>
<h2>Payment</h2>
<div class="form"><div class="field full"><label for="co-card">Card number</label><input id="co-card" data-v="card" inputmode="numeric" autocomplete="off" placeholder="4242 4242 4242 4242"><div class="err">Enter the 16-digit demo card number.</div></div>
<div class="field"><label for="co-exp">Expiry</label><input id="co-exp" data-v="exp" inputmode="numeric" autocomplete="off" placeholder="MM / YY"><div class="err">Use MM / YY.</div></div>
<div class="field"><label for="co-cvc">CVC</label><input id="co-cvc" data-v="cvc" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="123"><div class="err">Enter 3 or 4 digits.</div></div>
<div class="full"><button type="button" class="btn btn-line" data-fill style="min-height:42px">Fill with demo card</button></div></div>
<p style="margin:26px 0 12px;color:var(--mute);font-size:14px">The demo card number is 4242 4242 4242 4242. Any future expiry date and any three digits will work.</p>
<button class="btn btn-solid" id="co-pay" style="width:100%">PAY NOW — DEMO</button></form></div>
<aside class="co-sum"><h3 id="co-name-t"></h3><p style="color:var(--mute);margin-bottom:18px;font-size:14.5px">Aurelia, Kalpaka bulvāris 8, Riga</p><div id="co-lines"></div><p style="margin-top:22px;font-size:13.5px;color:var(--mute)">Portfolio concept. No booking is made and nothing is charged.</p></aside></div>
<div id="co-done" class="done" hidden><h1>Experience confirmed.</h1><p class="lede" id="co-done-text"></p><p style="margin-top:20px;color:var(--mute)">Reference <span id="co-ref"></span>. This is a demonstration, so no email will be sent.</p><p style="margin-top:36px"><button class="btn btn-solid" data-close-co>Back to Aurelia</button></p></div></div>'''

exp_body = f'''<section class="ph-head"><div class="narrow"><h1>Experiences</h1><p>Choose an evening, then continue to a demonstration of how online payment would look on a real restaurant site.</p></div></section>
<section class="wrap" style="padding-bottom:clamp(64px,9vw,120px)"><div class="exp-grid">{cards}</div></section>
<div class="summary" aria-live="polite"><div class="wrap"><div><b id="sum-name"></b><span class="s" id="sum-meta"></span></div><button class="btn btn-fill-light" id="continue">Continue to payment</button></div></div>{CO}'''
page("experiences.html","Experiences · Aurelia","Tasting menu, wine pairing evening, chef's table and gift certificates at Aurelia. Demo checkout by Drasard.",exp_body)

# ---------------- RESERVATIONS ----------------
res_body = f'''<section class="ph-head"><div class="narrow"><h1>Reservations</h1><p>Reservations are recommended. We seat a small number of guests each evening, Tuesday to Saturday.</p></div></section>
<section class="wrap" style="padding-bottom:clamp(72px,10vw,150px)"><div class="res-grid"><div class="card">
<form class="form" novalidate data-confirm="rc" data-need-slot="1" data-show="date,time,guests,name,email,occasion">
<div class="field"><label for="r-guests">Guests</label><select id="r-guests" name="guests" data-v="sel"><option value="">How many?</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select><div class="err">Choose a party size.</div></div>
<div class="field"><label for="r-date">Date</label><input id="r-date" name="date" type="date" data-v="req"><div class="err">Choose a date.</div></div>
<div class="field full"><label>Time</label><div class="slots" role="group" aria-label="Available times"></div><p class="slot-msg">Choose a date and guests, then check availability.</p><input type="hidden" id="r-time" name="time"><div style="margin-top:14px"><button type="button" class="btn btn-line" id="check" style="min-height:46px">Check availability</button></div></div>
<div class="field"><label for="r-name">Name</label><input id="r-name" name="name" data-v="req" autocomplete="name"><div class="err">Enter your name.</div></div>
<div class="field"><label for="r-phone">Phone</label><input id="r-phone" name="phone" type="tel" data-v="phone" autocomplete="tel"><div class="err">Enter a phone number.</div></div>
<div class="field full"><label for="r-email">Email</label><input id="r-email" name="email" type="email" data-v="email" autocomplete="email"><div class="err">Enter a valid email address.</div></div>
<div class="field"><label for="r-occ">Occasion</label><select id="r-occ" name="occasion"><option value="">None in particular</option><option>Birthday</option><option>Anniversary</option><option>Celebration</option><option>Business dinner</option></select></div>
<div class="field"><label for="r-diet">Dietary requirements</label><input id="r-diet" name="diet" placeholder="Vegetarian, allergies…"></div>
<div class="full"><button class="btn btn-solid" style="width:100%">Request reservation</button></div></form>
<div class="confirm" id="rc"><h2>Reservation request received.</h2><p>Thank you. This is a demonstration, so no table has been held. A real Aurelia would confirm by email within a few hours.</p><dl></dl><button class="btn btn-line" data-again>Make another request</button></div></div>
<aside class="aside"><ul><li><b>Tuesday to Saturday</b>Dinner from 18:00. Last seating at 21:30.</li><li><b>Larger parties</b>For seven or more guests, please see private dining.</li><li><b>Changes and cancellations</b>Please let us know 48 hours ahead so that we can offer your table to someone else.</li><li><b>Walk-ins</b>The bar keeps four seats for guests without a reservation.</li></ul><p style="margin-top:28px"><a class="tlink" href="contact.html#enquiry">Enquire about private dining</a></p></aside></div></section>'''
page("reservations.html","Reservations · Aurelia","Request a table at Aurelia, Riga. Check availability and book dinner Tuesday to Saturday. Demo reservation experience by Drasard.",res_body)

# ---------------- JOURNAL ----------------
arts = [
 ("the-baltic-pantry","The Baltic pantry","Notes from the kitchen","1",["Every course at Aurelia begins long before service, in jars, crocks and curing boxes. The Baltic climate makes preserving a necessity, and we have come to see it as a creative tool rather than a constraint.","June beetroot is pickled in its own juices. Autumn mushrooms are dried and ground into a savoury dust. Rye bread that has gone past its best becomes the base of a dark, malty sauce. Smoke arrives from alder and juniper, never from a bottle.","Our pantry shelves are lined with things that will taste different in six months than they do today. That slow change is part of the menu. A guest who visits in March and again in October will meet the same kitchen with a very different voice."]),
 ("inside-the-aurelia-kitchen","Inside the Aurelia kitchen","A morning with the team","2",["At 07:00 the kitchen is almost silent. Bread has been proved overnight, fish arrives from the coast by nine and the first stock of the day is already reducing.","There are six of us, and each person owns a station. One cook looks after the cold plates, one the fire, and one prepares every sauce. The chef tastes everything, often twice. Nothing leaves the pass without being approved by a spoon.","By four, the team gathers around a long table for staff meal. It is the only moment of the day when nobody is working, and it is where most of our best ideas begin. Then the doors open, the lights drop and the first guest is shown to their table."]),
 ("riga-after-dark","Riga after dark","Where we go when the kitchen closes","4",["Riga is a city that rewards a late walk. The Art Nouveau facades on Alberta iela glow under street lamps, and the old town goes quiet enough that you can hear your own footsteps on the cobbles.","Our favourite nightcap is a small glass of Riga Black Balsam on the bar of a hotel we won't name, and our favourite late supper is a bowl of soup at a counter near the market. After service, the team often walks along the river towards Andrejsala to watch the lights on the water.","If you are dining with us, arrive a little early. Walk through Kronvalda Park, order a coffee, and let the evening slow down. Dinner tastes better when you are not in a hurry."]),
]
art_h = ""
for slug,title,by,t,paras in arts:
    ps = "".join(f"<p>{p}</p>" for p in paras)
    art_h += f'<article class="art" id="{slug}">{ph("art-"+slug,t,title)}<div><span class="by">{by}</span><h2>{title}</h2>{ps}</div></article>'
journal_body = f'''<section class="ph-head"><div class="narrow"><h1>Journal</h1><p>Short notes from the kitchen, the pantry and the city.</p></div></section>
<section class="wrap" style="padding-bottom:clamp(48px,7vw,100px)">{art_h}</section>{STRIP}'''
page("journal.html","Journal · Aurelia","Notes from the Aurelia kitchen: the Baltic pantry, a morning with the team and Riga after dark.",journal_body)

# ---------------- CONTACT ----------------
MAP = '''<div class="map" role="img" aria-label="Stylised map of Kalpaka bulvāris, Riga"><svg viewBox="0 0 600 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="600" height="460" fill="#e3dccd"/><path d="M0 120 Q300 60 600 150" stroke="#f7f4ec" stroke-width="20" fill="none"/><path d="M0 330 L600 290" stroke="#f7f4ec" stroke-width="12"/><path d="M220 0 L250 460" stroke="#f7f4ec" stroke-width="10"/><path d="M430 0 L390 460" stroke="#f7f4ec" stroke-width="10"/><rect x="40" y="170" width="140" height="100" fill="#cfd6b6" opacity=".75"/><rect x="450" y="330" width="110" height="90" fill="#cfd6b6" opacity=".75"/><path d="M0 410 Q180 380 340 440 T600 420" stroke="#c4d1d6" stroke-width="30" fill="none" opacity=".8"/><text x="270" y="108" font-family="Newsreader,serif" font-style="italic" font-size="15" fill="#6c675e" transform="rotate(-3 270 108)">Kalpaka bulvāris</text><circle cx="312" cy="202" r="7" fill="#22211F"/></svg><div class="pin">AURELIA</div></div>'''
contact_body = f'''<section class="ph-head"><div class="narrow"><h1>Contact</h1><p>Find us in the centre of Riga, steps from the Esplanade.</p></div></section>
<section class="wrap" style="padding-bottom:clamp(48px,7vw,100px)"><div class="contact-grid"><div><h2>Restaurant</h2><address>Aurelia<br>Kalpaka bulvāris 8<br>Rīga, LV-1050<br>Latvia</address>
<ul class="hours"><li><span>Tuesday to Thursday</span><span>18:00 to 23:00</span></li><li><span>Friday and Saturday</span><span>18:00 to 00:00</span></li><li><span>Sunday and Monday</span><span>Closed</span></li></ul>
<p style="margin-top:26px"><a class="tlink" href="tel:+37167110280">+371 6711 0280</a><br><br><a class="tlink" href="mailto:reservations@aurelia.example">reservations@aurelia.example</a></p></div>{MAP}</div></section>
<section class="sec sec-bone" id="enquiry"><div class="narrow"><h2 class="d" style="margin-bottom:12px">Send an enquiry</h2><p style="color:var(--mute);margin-bottom:36px">For private dining, press and anything else. We reply within one working day.</p>
<form class="form" novalidate data-confirm="qc" data-show="name,email,topic">
<div class="field"><label for="q-name">Name</label><input id="q-name" name="name" data-v="req"><div class="err">Enter your name.</div></div>
<div class="field"><label for="q-email">Email</label><input id="q-email" name="email" type="email" data-v="email"><div class="err">Enter a valid email address.</div></div>
<div class="field full"><label for="q-topic">Topic</label><select id="q-topic" name="topic" data-v="sel"><option value="">Choose a topic</option><option>Private dining</option><option>Gift certificates</option><option>Press</option><option>Something else</option></select><div class="err">Choose a topic.</div></div>
<div class="field full"><label for="q-msg">Message</label><textarea id="q-msg" name="msg"></textarea></div>
<div class="full"><button class="btn btn-solid">Send enquiry</button></div></form>
<div class="confirm" id="qc"><h2>Enquiry received.</h2><p>Thank you. This is a demonstration form, so nothing has been sent.</p><dl></dl><button class="btn btn-line" data-again>Send another</button></div></div></section>'''
page("contact.html","Contact · Aurelia","Address, opening hours and contact details for Aurelia, Kalpaka bulvāris 8, Riga.",contact_body)
print("aurelia built:", sorted(p.name for p in OUT.glob("*.html")))
