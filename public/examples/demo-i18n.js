(() => {
  const KEY = "drasard-demo-language";
  const labels = { EN: "English", LV: "Latviešu", RU: "Русский" };
  // English source text -> Latvian, Russian. Product and brand names stay unchanged.
  const d = {
    "Home":["Sākums","Главная"],"Menu":["Ēdienkarte","Меню"],"Story":["Stāsts","История"],"Visit":["Apmeklējiet","Посетить"],"Reserve":["Rezervēt","Забронировать"],"Reservations":["Rezervācijas","Бронирование"],"Experiences":["Piedzīvojumi","Впечатления"],"Gallery":["Galerija","Галерея"],"Journal":["Dienasgrāmata","Журнал"],"Navigate":["Navigācija","Навигация"],"Book a table":["Rezervēt galdiņu","Забронировать столик"],"Book a table →":["Rezervēt galdiņu →","Забронировать столик →"],"Reserve a table →":["Rezervēt galdiņu →","Забронировать столик →"],"← Drasard":["← Drasard","← Drasard"],
    "Modern Baltic dining · Riga":["Mūsdienīga Baltijas virtuve · Rīga","Современная балтийская кухня · Рига"],"Quietly":["Atturīgi","Сдержанно"],"remarkable.":["izcili.","превосходно."],"Aurelia brings seasonal Baltic ingredients, thoughtful hospitality and precise contemporary cooking together in an intimate Riga dining room.":["Aurelia apvieno sezonālas Baltijas sastāvdaļas, pārdomātu viesmīlību un mūsdienīgu virtuvi mājīgā Rīgas restorānā.","Aurelia объединяет сезонные балтийские продукты, продуманное гостеприимство и современную кухню в уютном ресторане Риги."],
    "The Aurelia philosophy":["Aurelia filozofija","Философия Aurelia"],"Rooted in place.":["Sakņots vietā.","Вдохновлено местом."],"Refined at table.":["Pilnveidots pie galda.","Совершенство за столом."],"Our kitchen follows the Baltic seasons. Local produce, coastal flavours and ingredients from nearby growers become restrained, modern dishes designed to let the quality of each element speak.":["Mūsu virtuve seko Baltijas sezonām. Vietējie produkti, piekrastes garšas un tuvumā audzētas sastāvdaļas kļūst par mūsdienīgiem ēdieniem, kuros katra produkta kvalitāte runā pati par sevi.","Наша кухня следует балтийским сезонам. Местные продукты, вкусы побережья и ингредиенты от фермеров превращаются в современные блюда, раскрывающие качество каждого компонента."],
    "Course tasting":["Ēdienu degustācija","Дегустационных блюд"],"Local growers":["Vietējie audzētāji","Местных производителей"],"Founded":["Dibināts","Основан"],"A seasonal selection":["Sezonas izlase","Сезонная подборка"],"Tonight at Aurelia.":["Šovakar Aurelia.","Сегодня вечером в Aurelia."],"A fictional tasting menu created to demonstrate how a premium restaurant website can present detailed dishes, dietary notes and an online reservation journey.":["Izdomāta degustācijas ēdienkarte, kas demonstrē, kā augstvērtīga restorāna mājaslapa var parādīt ēdienus, informāciju par uzturu un tiešsaistes rezervēšanu.","Вымышленное дегустационное меню показывает, как премиальный сайт ресторана может представлять блюда, информацию о питании и онлайн-бронирование."],
    "Smoked trout":["Kūpināta forele","Копчёная форель"],"Pickled cucumber · dill oil · rye crisp":["Marinēts gurķis · diļļu eļļa · rudzu kraukšķis","Маринованный огурец · укропное масло · ржаной крекер"],"Young beetroot":["Jaunās bietes","Молодая свёкла"],"Whipped goat cheese · hazelnut · sorrel":["Putoāts kazas siers · lazdu rieksti · skābenes","Взбитый козий сыр · фундук · щавель"],"Charred Baltic cod":["Apdedzināta Baltijas menca","Обжаренная балтийская треска"],"Brown butter · leek · fermented potato":["Brūnais sviests · puravs · fermentēti kartupeļi","Коричневое масло · лук-порей · ферментированный картофель"],"Wild mushroom":["Meža sēnes","Лесные грибы"],"Barley · spruce · aged cheese":["Mieži · egle · nogatavināts siers","Ячмень · ель · выдержанный сыр"],"Rhubarb & honey":["Rabarberi un medus","Ревень и мёд"],"Buttermilk ice cream · oat · verbena":["Paniņu saldējums · auzas · verbēna","Мороженое на пахте · овёс · вербена"],"Blackcurrant":["Upenes","Чёрная смородина"],"Dark chocolate · cream · sea salt":["Tumšā šokolāde · krējums · jūras sāls","Тёмный шоколад · сливки · морская соль"],"View full menu →":["Apskatīt pilnu ēdienkarti →","Посмотреть всё меню →"],"Our story":["Mūsu stāsts","Наша история"],"A dining room with a sense of place.":["Restorāns ar savu vietas sajūtu.","Ресторан с характером места."],
    "Aurelia was imagined as a quiet counterpoint to the city: warm timber, soft light and a kitchen that treats Latvia's landscape as its starting point. Every detail is deliberate, from the ceramics on the table to the final pour of the evening.":["Aurelia iecerēts kā mierīgs pretstats pilsētas ritmam: silts koks, maiga gaisma un virtuve, kuras iedvesma ir Latvijas ainava. Katra detaļa ir pārdomāta — no galda keramikas līdz pēdējam vakara dzērienam.","Aurelia задуман как спокойное пространство вдали от городского ритма: тёплое дерево, мягкий свет и кухня, вдохновлённая ландшафтом Латвии. Каждая деталь продумана — от керамики на столе до последнего вечернего напитка."],"The result is a restaurant concept built for intimate dinners, celebrations, business meals and slow evenings that deserve a little more attention.":["Rezultāts ir restorāna koncepts nesteidzīgām vakariņām, svinībām, biznesa maltītēm un vakariem, kas pelnījuši īpašu uzmanību.","Это концепция ресторана для камерных ужинов, праздников, деловых встреч и неспешных вечеров, заслуживающих особого внимания."],"Inside Aurelia":["Aurelia iekšpusē","Внутри Aurelia"],"Simple surroundings.":["Vienkārša vide.","Простая обстановка."],"Careful details.":["Pārdomātas detaļas.","Продуманные детали."],"Visit Aurelia":["Apmeklējiet Aurelia","Посетите Aurelia"],"See you":["Uz tikšanos","До встречи"],"at the table.":["pie galda.","за столом."],"Alberta iela 12 · Riga, Latvia":["Alberta iela 12 · Rīga, Latvija","ул. Альберта, 12 · Рига, Латвия"],"Wednesday-Saturday · 17:30-23:00":["Trešdiena–sestdiena · 17:30–23:00","Среда–суббота · 17:30–23:00"],"For groups of seven or more, private dining and tasting experiences, please enquire directly.":["Grupām no septiņiem cilvēkiem, privātām vakariņām un degustācijām sazinieties tieši ar restorānu.","Для компаний от семи человек, частных ужинов и дегустаций свяжитесь с рестораном напрямую."],"Experiences →":["Piedzīvojumi →","Впечатления →"],"Aurelia · Riga, Latvia":["Aurelia · Rīga, Latvija","Aurelia · Рига, Латвия"],"Portfolio concept designed by Drasard":["Drasard portfolio koncepts","Портфолио-концепция Drasard"],"Concept website · Drasard":["Koncepcijas mājaslapa · Drasard","Концептуальный сайт · Drasard"],
    "Private experiences · Aurelia Riga":["Privāti piedzīvojumi · Aurelia Rīga","Частные впечатления · Aurelia, Рига"],"Take Aurelia":["Paņemiet Aurelia","Возьмите Aurelia"],"home with you.":["sev līdzi.","с собой."],"A fictional premium hospitality flow showing how a restaurant can sell prepaid experiences and giftable dining packages online.":["Izdomāta premium viesmīlības plūsma, kas parāda, kā restorāns tiešsaistē var pārdot priekšapmaksas piedzīvojumus un dāvanu maltīšu pakas.","Вымышленный сценарий премиального сервиса показывает, как ресторан может продавать онлайн предоплаченные впечатления и подарочные ужины."],"Seven-course tasting":["Septiņu kārtu degustācija","Дегустация из семи блюд"],"A complete seasonal tasting menu for two guests, including a welcome aperitif.":["Pilna sezonāla degustācijas ēdienkarte diviem ar sagaidīšanas aperitīvu.","Полное сезонное дегустационное меню на двоих, включая приветственный аперитив."],"Select experience":["Izvēlēties piedzīvojumu","Выбрать впечатление"],"Wine pairing evening":["Vīna saderības vakars","Вечер винных сочетаний"],"Five seasonal courses with a curated five-glass wine pairing for two.":["Pieci sezonāli ēdieni ar piemeklētu piecu vīnu izlasi diviem.","Пять сезонных блюд с подобранной винной парой из пяти бокалов на двоих."],"Chef's table":["Šefpavāra galds","Стол шеф-повара"],"An intimate kitchen-side dinner with eight courses and a welcome drink.":["Vakariņas pie virtuves ar astoņiem ēdieniem un sagaidīšanas dzērienu.","Камерный ужин у кухни из восьми блюд с приветственным напитком."],"Gift certificate":["Dāvanu karte","Подарочный сертификат"],"A flexible dining credit for someone special, presented as a digital gift.":["Dāvana maltītei īpašam cilvēkam digitālā formātā.","Подарочный сертификат на ужин для особенного человека."],"From €100":["No €100","От €100"],"Selected":["Izvēlēts","Выбрано"],"Choose an experience above":["Vispirms izvēlieties piedzīvojumu","Сначала выберите впечатление"],"Continue to payment":["Turpināt uz maksājumu","Перейти к оплате"],"Demo checkout":["Demonstrācijas apmaksa","Демонстрационная оплата"],"Complete purchase.":["Pabeidziet pirkumu.","Завершите покупку."],"This is a front-end demonstration. No real charge will be made.":["Šī ir saskarnes demonstrācija. Reāls maksājums netiks veikts.","Это демонстрация интерфейса. Реальное списание средств не произойдёт."],"Pay now (demo)":["Maksāt tagad (demo)","Оплатить сейчас (демо)"],"Select an experience first.":["Vispirms izvēlieties piedzīvojumu.","Сначала выберите впечатление."],"Demo payment successful — no real payment was processed.":["Demo maksājums veiksmīgs — reāls maksājums netika veikts.","Демо-оплата прошла успешно — реальный платёж не обрабатывался."],
    "Reservations · Alberta iela 12":["Rezervācijas · Alberta iela 12","Бронирование · ул. Альберта, 12"],"Come to":["Nāciet","Приходите"],"Request a table for dinner at Aurelia. This booking flow is a front-end portfolio demonstration and does not create a real reservation.":["Pieprasiet galdiņu vakariņām Aurelia. Šī ir portfeļa demonstrācija un īsta rezervācija netiek izveidota.","Запросите столик на ужин в Aurelia. Это демонстрация сайта и реальное бронирование не создаётся."],"Name":["Vārds","Имя"],"Email":["E-pasts","Электронная почта"],"Date":["Datums","Дата"],"Time":["Laiks","Время"],"Select time":["Izvēlieties laiku","Выберите время"],"Guests":["Viesi","Гости"],"2 guests":["2 viesi","2 гостя"],"3 guests":["3 viesi","3 гостя"],"4 guests":["4 viesi","4 гостя"],"5 guests":["5 viesi","5 гостей"],"6 guests":["6 viesi","6 гостей"],"7+ guests":["7+ viesi","7+ гостей"],"Occasion":["Iemesls","Повод"],"Notes":["Piezīmes","Примечания"],"Request a table →":["Pieprasīt galdiņu →","Запросить столик →"],"Opening hours":["Darba laiks","Часы работы"],"Wednesday — Saturday":["Trešdiena — sestdiena","Среда — суббота"],"Last seating 21:30":["Pēdējā rezervācija 21:30","Последняя посадка в 21:30"],"Private dining":["Privātas vakariņas","Частные ужины"],"For special evenings.":["Īpašiem vakariem.","Для особенных вечеров."],"For groups of seven or more, private dining and tailored tasting experiences, contact the restaurant directly.":["Grupām no septiņiem cilvēkiem, privātām vakariņām un pielāgotām degustācijām sazinieties tieši ar restorānu.","Для компаний от семи человек, частных ужинов и индивидуальных дегустаций свяжитесь с рестораном напрямую."],"Thank you. Your reservation request has been received as a demonstration. No real booking has been made.":["Paldies! Rezervācijas pieprasījums saņemts demonstrācijas nolūkiem. Īsta rezervācija nav veikta.","Спасибо! Запрос на бронирование получен в демонстрационных целях. Реальное бронирование не выполнено."],
    "Experience":["Pieredze","Опыт"],"Fire · Wine · Riga":["Uguns · Vīns · Rīga","Огонь · Вино · Рига"],"Eat by":["Ēdiet pie","Еда у"],"the flame.":["dzīvās uguns.","живого огня."],"An intimate restaurant where live fire, bold ingredients and late-night energy meet in a raw, refined setting.":["Mājīgs restorāns, kur atklāta uguns, izteiksmīgas sastāvdaļas un vakara enerģija satiekas izsmalcinātā vidē.","Камерный ресторан, где открытый огонь, яркие ингредиенты и энергия позднего вечера сочетаются в утончённой атмосфере."],"Explore Ember →":["Iepazīt Ember →","Открыть Ember →"],"The Ember experience":["Ember pieredze","Впечатление Ember"],"Smoke.":["Dūmi.","Дым."],"Char.":["Ogļu grils.","Жар."],"Season.":["Sezona.","Сезон."],"Ember is built around the oldest cooking method and a very modern idea of hospitality. The kitchen works over flame, the wine list leans natural, and the room gets louder as the evening goes on.":["Ember pamatā ir senākā gatavošanas metode un mūsdienīga viesmīlība. Virtuve strādā ar atklātu liesmu, vīnu karte dod priekšroku dabīgiem vīniem, un vakaram ritot, telpa kļūst dzīvīgāka.","В основе Ember — древнейший способ приготовления и современный подход к гостеприимству. Кухня работает с открытым огнём, в винной карте преобладают натуральные вина, а вечером зал становится оживлённее."],"The concept is designed for a full evening: an aperitif at the bar, small plates by the fire, a generous main course and something sweet before the last glass.":["Koncepts paredzēts visam vakaram: aperitīvs pie bāra, nelielas uzkodas pie uguns, sātīgs pamatēdiens un deserts pirms pēdējās glāzes.","Концепция рассчитана на целый вечер: аперитив у бара, небольшие блюда у огня, основная подача и десерт перед последним бокалом."],"01 / FIRE":["01 / UGUNS","01 / ОГОНЬ"],"Everything touches flame.":["Viss sastopas ar liesmu.","Всё проходит через пламя."],"Coal, ember and smoke bring depth to carefully sourced ingredients.":["Ogles, kvēle un dūmi piešķir dziļumu rūpīgi izvēlētām sastāvdaļām.","Уголь, жар и дым раскрывают вкус тщательно отобранных ингредиентов."],"02 / WINE":["02 / VĪNS","02 / ВИНО"],"Bottles worth sharing.":["Pudeles, ko dalīt.","Вино, которым хочется делиться."],"A compact list of expressive wines made for food, conversation and another glass.":["Neliela izteiksmīgu vīnu izlase ēdienam, sarunām un vēl vienai glāzei.","Небольшая подборка выразительных вин к еде, разговорам и ещё одному бокалу."],"03 / NIGHT":["03 / NAKTS","03 / НОЧЬ"],"Stay for the late hours.":["Palieciet līdz vēlam vakaram.","Оставайтесь до позднего вечера."],"Dinner starts at six. The energy carries well beyond the last plate.":["Vakariņas sākas sešos, un enerģija turpinās ilgi pēc pēdējā ēdiena.","Ужин начинается в шесть, а энергия вечера не стихает и после последнего блюда."],"Tonight at Ember":["Šovakar Ember","Сегодня вечером в Ember"],"From the fire":["No uguns","От огня"],"to the table.":["līdz galdam.","к столу."],"The menu changes with the season. Expect bold flavours, charred edges, generous plates and desserts with a little smoke.":["Ēdienkarte mainās līdz ar sezonu. Sagaidiet izteiksmīgas garšas, apdedzinātas maliņas, dāsnas porcijas un desertus ar dūmu niansi.","Меню меняется по сезонам: яркие вкусы, обжаренные края, щедрые порции и десерты с дымными нотами."],"Ember-roasted beef":["Liellops no Ember krāsns","Говядина, приготовленная на огне"],"Charred onion · smoked potato · pepper jus":["Apdedzināts sīpols · kūpināti kartupeļi · piparu mērce","Обожжённый лук · копчёный картофель · перечный соус"],"Coal-grilled cod":["Menca uz oglēm","Треска на углях"],"Brown butter · leek · preserved lemon":["Brūnais sviests · puravs · konservēts citrons","Коричневое масло · лук-порей · лимон конфи"],"Fire-roasted carrots":["Burkāni no uguns","Морковь, запечённая на огне"],"Whipped tahini · herbs · toasted seeds":["Putoāts tahini · garšaugi · grauzdētas sēklas","Взбитый тахини · зелень · обжаренные семена"],"Burnt honey tart":["Dedzināta medus tarte","Тарт с жжёным мёдом"],"Cultured cream · sea salt · rye":["Raudzēts krējums · jūras sāls · rudzi","Кисломолочные сливки · морская соль · рожь"],"Ember potatoes":["Ember kartupeļi","Картофель Ember"],"Charred spring onion · sour cream · trout roe":["Apdedzināti lociņi · skābais krējums · foreļu ikri","Обожжённый зелёный лук · сметана · икра форели"],"Wood-fired pear":["Bumbieris no malkas krāsns","Груша из дровяной печи"],"Brown butter · vanilla · smoked sugar":["Brūnais sviests · vaniļa · kūpināts cukurs","Коричневое масло · ваниль · копчёный сахар"],"The cellar":["Pagrabs","Винный погреб"],"Wine with":["Vīns ar","Вино с"],"a little edge.":["raksturu.","характером."],"A compact fictional wine programme focused on natural producers, Baltic-friendly acidity and bottles made for sharing.":["Neliela izdomāta vīnu izlase ar dabīgiem ražotājiem, Baltijas ēdieniem piemērotu skābumu un vīniem, ko dalīt.","Небольшая вымышленная винная карта с натуральными производителями, кислотностью для балтийской кухни и винами для компании."],"White":["Baltvīns","Белое"],"Mineral & bright":["Minerāls un svaigs","Минеральное и свежее"],"Cool-climate whites, skin-contact textures and crisp bottles for the first plates.":["Vēsā klimata baltvīni, vīni ar mizas macerāciju un svaigas garšas pirmajiem ēdieniem.","Белые вина прохладного климата, вина с мацерацией на кожице и свежие варианты к первым блюдам."],"Red":["Sarkanvīns","Красное"],"Light & earthy":["Viegls un zemes notīm bagāts","Лёгкое и землистое"],"Expressive reds that can stand beside smoke, char and richer sauces.":["Izteiksmīgi sarkanvīni, kas sader ar dūmiem un bagātīgām mērcēm.","Выразительные красные вина к дымным вкусам и насыщенным соусам."],"After dark":["Pēc tumsas iestāšanās","После наступления темноты"],"Something stronger":["Kaut kas stiprāks","Что-то покрепче"],"Amaro, vermouth and a short list of cocktails built around bitter, smoky notes.":["Amaro, vermuts un kokteiļi ar rūgtām un dūmakainām notīm.","Амаро, вермут и коктейли с горькими и дымными нотами."],"Inside Ember":["Ember iekšpusē","Внутри Ember"],"Raw materials.":["Dabiski materiāli.","Натуральные материалы."],"Warm light.":["Silta gaisma.","Тёплый свет."],"Make an evening":["Padariet vakaru","Проведите вечер"],"of it.":["īpašu.","особенным."],"Choose a date, time and party size. This is a front-end reservation demonstration; it does not create a real booking.":["Izvēlieties datumu, laiku un cilvēku skaitu. Šī ir rezervācijas saskarnes demonstrācija, un īsta rezervācija netiek veikta.","Выберите дату, время и количество гостей. Это демонстрация бронирования; реальная бронь не создаётся."],"Choose time":["Izvēlieties laiku","Выберите время"],"Portfolio concept by Drasard · Riga, Latvia":["Drasard portfolio koncepts · Rīga, Latvija","Портфолио-концепция Drasard · Рига, Латвия"],
    "Riga · Contemporary neighbourhood restaurant":["Rīga · Mūsdienīgs apkaimes restorāns","Рига · Современный районный ресторан"],"From the north.":["No ziemeļiem.","С севера."],"For the table.":["Galdam.","Для вашего стола."],"A warm, modern restaurant built around Baltic produce, open fire and the simple pleasure of eating together.":["Silts, mūsdienīgs restorāns, kura pamatā ir Baltijas produkti, atklāta uguns un kopīgas maltītes prieks.","Тёплый современный ресторан на балтийских продуктах, открытом огне и удовольствии от совместной трапезы."],"Explore the menu →":["Apskatīt ēdienkarti →","Открыть меню →"],"Seasonal cooking · Latvian produce · Open flame":["Sezonāla virtuve · Latvijas produkti · Atklāta uguns","Сезонная кухня · Продукты Латвии · Открытый огонь"],"Elizabetes iela, Riga":["Elizabetes iela, Rīga","ул. Элизабетес, Рига"],"Tuesday-Saturday · 12:00-23:00":["Otrdiena–sestdiena · 12:00–23:00","Вторник–суббота · 12:00–23:00"],"The North Table way":["North Table pieeja","Философия North Table"],"Simple food.":["Vienkāršs ēdiens.","Простая еда."],"Deep flavour.":["Dziļa garša.","Глубокий вкус."],"North Table brings the character of the Baltic into a relaxed neighbourhood setting. The menu follows the seasons, the kitchen follows the fire, and the room is designed for long evenings.":["North Table ienes Baltijas raksturu nesteidzīgā apkaimes vidē. Ēdienkarte seko sezonām, virtuve — ugunij, bet telpa radīta gariem vakariem.","North Table передаёт характер Балтики в спокойной атмосфере районного ресторана. Меню следует сезонам, кухня — огню, а зал создан для долгих вечеров."],"The concept is deliberately flexible: lunch can be quick and generous, dinner can stretch for three hours, and the private table can turn into a celebration.":["Koncepts ir elastīgs: pusdienas var būt ātras un sātīgas, vakariņas — trīs stundas garas, bet privāts galds var kļūt par svinībām.","Концепция гибкая: обед может быть быстрым и сытным, ужин — длиться три часа, а отдельный стол может стать праздником."],"01 / LOCAL":["01 / VIETĒJAIS","01 / МЕСТНОЕ"],"From nearby fields.":["No tuvākajiem laukiem.","С ближайших полей."],"Vegetables, grains, fish and carefully sourced meat from Latvian producers and makers.":["Dārzeņi, graudi, zivis un rūpīgi atlasīta gaļa no Latvijas ražotājiem.","Овощи, зерно, рыба и тщательно отобранное мясо от латвийских производителей."],"02 / FIRE":["02 / UGUNS","02 / ОГОНЬ"],"Cooked with character.":["Gatavots ar raksturu.","Приготовлено с характером."],"Open-flame cooking gives simple ingredients depth, texture and a little smoke.":["Gatavošana uz atklātas liesmas vienkāršām sastāvdaļām piešķir dziļumu, tekstūru un dūmu niansi.","Приготовление на открытом огне добавляет простым ингредиентам глубину, текстуру и лёгкий аромат дыма."],"03 / SHARED":["03 / KOPĀ","03 / ВМЕСТЕ"],"Made to stay awhile.":["Radīts nesteidzīgiem brīžiem.","Создано для долгих встреч."],"Generous plates, natural wine and a room that feels as good at 20:00 as it does at 22:30.":["Dāsnas porcijas, dabīgs vīns un telpa, kurā ir patīkami gan 20:00, gan 22:30.","Щедрые блюда, натуральное вино и атмосфера, в которой хорошо и в 20:00, и в 22:30."],"Local suppliers":["Vietējie piegādātāji","Местных поставщиков"],"Fire stations":["Uguns zonas","Зоны огня"],"Seats":["Vietas","Мест"],"Seasonal menu changes":["Sezonas ēdienkartes maiņas","Сезонных обновлений меню"],"Tonight at North Table":["Šovakar North Table","Сегодня вечером в North Table"],"Seasonal menu.":["Sezonāla ēdienkarte.","Сезонное меню."],"Charred cabbage":["Apdedzināti kāposti","Обожжённая капуста"],"Smoked cream · hazelnut · dill oil":["Kūpināts krējums · lazdu rieksti · diļļu eļļa","Копчёные сливки · фундук · укропное масло"],"Lake fish":["Ezera zivs","Рыба из озера"],"Brown butter · potato · pickled mustard seed":["Brūnais sviests · kartupeļi · marinētas sinepju sēklas","Коричневое масло · картофель · маринованные зёрна горчицы"],"Wood-fired chicken":["Vista no malkas krāsns","Курица из дровяной печи"],"Roasted onion · wild mushroom · herbs":["Cepts sīpols · meža sēnes · garšaugi","Запечённый лук · лесные грибы · зелень"],"Beetroot":["Bietes","Свёкла"],"Goat curd · blackcurrant · rye crumb":["Kazas siers · upenes · rudzu drupatas","Козий творог · чёрная смородина · ржаная крошка"],"Fire-roasted cauliflower":["Ziedkāposts no uguns","Цветная капуста, запечённая на огне"],"Sunflower tahini · fermented honey":["Saulespuķu tahini · fermentēts medus","Тахини из подсолнечника · ферментированный мёд"],"Rye & chocolate":["Rudzi un šokolāde","Рожь и шоколад"],"Dark chocolate · sea buckthorn · cream":["Tumšā šokolāde · smiltsērkšķi · krējums","Тёмный шоколад · облепиха · сливки"],"Lunch menu · €24   /   Chef's sharing menu · €48":["Pusdienu ēdienkarte · €24   /   Šefpavāra izlase dalīšanai · €48","Обеденное меню · €24   /   Меню от шефа на компанию · €48"],"Inside the room":["Restorāna telpa","Внутри ресторана"],"A table for":["Galds","Стол для"],"the evening.":["vakaram.","вечера."],"Warm timber, open shelving, visible fire and a long central table create a room that works equally well for a weekday lunch, a date night or a private dinner.":["Silts koks, atvērti plaukti, redzama uguns un garš centrālais galds rada telpu gan darba dienas pusdienām, gan randiņam vai privātām vakariņām.","Тёплое дерево, открытые полки, видимый огонь и длинный общий стол подходят и для обеда, и для свидания, и для частного ужина."],"Save a place":["Rezervējiet vietu","Забронируйте место"],"Choose your preferred date and time. This reservation flow is a front-end portfolio demonstration; it does not create a real booking.":["Izvēlieties vēlamo datumu un laiku. Šī ir portfeļa demonstrācija, un īsta rezervācija netiek veikta.","Выберите удобные дату и время. Это демонстрация сайта и она не создаёт реальное бронирование."],
    "Fictional café concept":["Izdomāts kafejnīcas koncepts","Вымышленная концепция кафе"],"Riga, Latvia · 2026":["Rīga, Latvija · 2026","Рига, Латвия · 2026"],"Drasard portfolio":["Drasard portfolio","Портфолио Drasard"],"Concept website for demonstration only.":["Mājaslapas koncepts tikai demonstrācijai.","Концепция сайта только для демонстрации."],"NOVA CAFÉ IS A FICTIONAL PORTFOLIO CONCEPT · NO REAL ORDERS OR RESERVATIONS ARE PROCESSED":["NOVA CAFÉ IR IZDOMĀTS PORTFEĻA KONCEPTS · ĪSTI PASŪTĪJUMI VAI REZERVĀCIJAS NETIEK APSTRĀDĀTI","NOVA CAFÉ — ВЫМЫШЛЕННАЯ КОНЦЕПЦИЯ · РЕАЛЬНЫЕ ЗАКАЗЫ И БРОНИРОВАНИЯ НЕ ОБРАБАТЫВАЮТСЯ"],"A brighter":["Gaišāks","Более светлое"],"kind of morning.":["rīta noskaņojums.","утро."],"Independent coffee, generous food and a little more time for yourself.":["Neatkarīga kafija, dāsnas maltītes un mazliet vairāk laika sev.","Независимая кофейня, щедрые блюда и немного больше времени для себя."],"See the menu":["Apskatīt ēdienkarti","Посмотреть меню"],"Why Nova":["Kāpēc Nova","Почему Nova"],"OPEN":["ATVĒRTS","ОТКРЫТО"],"DAILY":["KATRU DIENU","ЕЖЕДНЕВНО"],"01 / THE IDEA":["01 / IDEJA","01 / ИДЕЯ"],"A neighbourhood café should feel less like a stop and more like a":["Apkaimes kafejnīcai vajadzētu būt nevis pieturai, bet gan","Кофейня по соседству должна быть не просто остановкой, а"],"place to land.":["vietai, kur atgriezties.","местом, куда хочется вернуться."],"Nova is a fictional Riga café concept created by Drasard to show how a local hospitality brand can turn its website into a useful, beautiful digital experience.":["Nova ir izdomāts Rīgas kafejnīcas koncepts, ko Drasard izveidojis, lai parādītu, kā vietējs viesmīlības zīmols var radīt noderīgu un skaistu digitālo pieredzi.","Nova — вымышленная концепция кафе в Риге от Drasard, показывающая, как локальный бренд гостеприимства может создать полезный и красивый цифровой опыт."],"Read the journal":["Lasīt dienasgrāmatu","Читать журнал"],"02 / THE MENU":["02 / ĒDIENKARTE","02 / МЕНЮ"],"Good things,":["Labas lietas,","Всё хорошее,"],"simply made.":["vienkārši pagatavotas.","приготовлено просто."],"Seasonal plates, serious coffee and pastries worth arriving early for.":["Sezonāli ēdieni, lieliska kafija un smalkmaizītes, kuru dēļ vērts ierasties agri.","Сезонные блюда, отличный кофе и выпечка, ради которой стоит прийти пораньше."],"Explore food & drink":["Apskatīt ēdienus un dzērienus","Еда и напитки"],"COFFEE · BRUNCH · PASTRY · RIGA · COFFEE · BRUNCH · PASTRY · RIGA ·":["KAFIJA · VĒLĀS BROKASTIS · CEPUMI · RĪGA · KAFIJA · VĒLĀS BROKASTIS · CEPUMI · RĪGA ·","КОФЕ · БРАНЧ · ВЫПЕЧКА · РИГА · КОФЕ · БРАНЧ · ВЫПЕЧКА · РИГА ·"],"“Come for the coffee.":["“Nāciet pēc kafijas.","«Приходите за кофе."],"Stay for the afternoon.”":["Palieciet pēcpusdienai.”","Оставайтесь на весь день.»"],"03 / TODAY AT NOVA":["03 / ŠODIEN NOVA","03 / СЕГОДНЯ В NOVA"],"Eat well.":["Ēdiet labi.","Вкусно поешьте."],"Stay awhile.":["Palieciet ilgāk.","Останьтесь подольше."],"Our menu changes with the season. The good stuff stays.":["Mūsu ēdienkarte mainās līdz ar sezonu. Labākais paliek.","Наше меню меняется по сезонам. Лучшее остаётся."],"All":["Viss","Всё"],"Coffee":["Kafija","Кофе"],"Brunch":["Vēlās brokastis","Бранч"],"Bakery":["Maiznīca","Выпечка"],"Drinks":["Dzērieni","Напитки"],"Sweet":["Saldumi","Десерты"],"HOUSE":["MĀJAS","ФИРМЕННОЕ"],"LOCAL":["VIETĒJAIS","МЕСТНОЕ"],"NOVA PICK":["NOVA IZLASE","ВЫБОР NOVA"],"04 / THE JOURNAL":["04 / DIENASGRĀMATA","04 / ЖУРНАЛ"],"Built around":["Veidots ap","Создано вокруг"],"real life.":["īstu dzīvi.","реальную жизнь."],"Not every moment needs to be productive. Nova is designed around the spaces between things.":["Ne katram brīdim jābūt produktīvam. Nova ir veidots ap pauzēm starp ikdienas darbiem.","Не каждый момент должен быть продуктивным. Nova создан для пространства между делами."],"THE RITUAL":["RITUĀLS","РИТУАЛ"],"First coffee.":["Pirmā kafija.","Первый кофе."],"No rush.":["Bez steigas.","Без спешки."],"Morning light, a warm table and a drink made carefully. That's enough of a plan.":["Rīta gaisma, silts galds un rūpīgi pagatavots dzēriens. Ar to pietiek.","Утренний свет, тёплый стол и напиток, приготовленный с заботой. Этого достаточно."],"We imagined Nova as the kind of independent place where regulars know the best seat, friends lose track of time and a quick coffee can become an afternoon.":["Mēs iztēlojāmies Nova kā neatkarīgu vietu, kur pastāvīgie viesi zina labāko sēdvietu, draugi aizmirst par laiku un ātra kafija pārvēršas pēcpusdienā.","Мы представили Nova как независимое место, где постоянные гости знают лучший столик, друзья забывают о времени, а чашка кофе превращается в целый день."],"Local":["Vietējs","Местное"],"Ingredients, makers and ideas from close to home.":["Sastāvdaļas, meistari un idejas tepat no apkārtnes.","Ингредиенты, производители и идеи рядом с домом."],"Unfussy":["Bez liekas sarežģītības","Без лишнего"],"Beautiful food without making a ceremony of it.":["Skaists ēdiens bez liekas ceremonijas.","Красивая еда без лишнего церемониала."],"Human":["Cilvēcīgs","Человечное"],"A digital experience that still feels like a real place.":["Digitāla pieredze, kas joprojām rada īstas vietas sajūtu.","Цифровой опыт, который всё равно ощущается как настоящее место."],"05 / FIND NOVA":["05 / ATRODIET NOVA","05 / НАЙДИТЕ NOVA"],"Your table":["Jūsu galds","Ваш столик"],"waiting.":["gatavs.","ждёт."],"Request a table":["Pieprasīt galdiņu","Запросить столик"],"Reservation request":["Rezervācijas pieprasījums","Запрос на бронирование"],"Choose a time":["Izvēlieties laiku","Выберите время"],"Send request":["Nosūtīt pieprasījumu","Отправить запрос"],"Demo only — your reservation request was not sent. Connect a booking service before launch.":["Tikai demonstrācija — rezervācijas pieprasījums netika nosūtīts. Pirms palaišanas pieslēdziet rezervēšanas pakalpojumu.","Только демо — запрос на бронирование не отправлен. Перед запуском подключите сервис бронирования."],"Your bag":["Jūsu grozs","Ваша корзина"],"YOUR BAG ·":["JŪSU GROZS ·","ВАША КОРЗИНА ·"],"Your bag is empty.":["Jūsu grozs ir tukšs.","Ваша корзина пуста."],"Add something from the menu and it'll appear here.":["Pievienojiet ēdienu no ēdienkartes, un tas parādīsies šeit.","Добавьте что-нибудь из меню — и оно появится здесь."],"Browse menu":["Pārlūkot ēdienkarti","Открыть меню"],"Add":["Pievienot","Добавить"],"Total":["Kopā","Итого"],"Continue to checkout":["Turpināt noformēšanu","Перейти к оформлению"],"Demo only — checkout is not connected and no payment was processed.":["Tikai demonstrācija — noformēšana nav pieslēgta, un maksājums netika veikts.","Только демо — оформление не подключено, платёж не обрабатывался."],"Close bag":["Aizvērt grozu","Закрыть корзину"],"Open navigation":["Atvērt navigāciju","Открыть навигацию"],"Close navigation":["Aizvērt navigāciju","Закрыть навигацию"],"Reservation request received - demonstration only. No real booking has been made.":["Rezervācijas pieprasījums saņemts tikai demonstrācijai. Īsta rezervācija nav veikta.","Запрос на бронирование получен только для демонстрации. Реальное бронирование не выполнено."]
  };


  Object.assign(d, {
    "Aurelia - Modern Baltic Dining in Riga": ["Aurelia — mūsdienīga Baltijas virtuve Rīgā", "Aurelia — современная балтийская кухня в Риге"],
    "Aurelia — Experiences": ["Aurelia — piedzīvojumi", "Aurelia — впечатления"],
    "Aurelia — Reservations": ["Aurelia — rezervācijas", "Aurelia — бронирование"],
    "Ember - Eat by the flame.": ["Ember — ēdiens pie uguns", "Ember — еда у огня"],
    "North Table - Fire, field, table.": ["North Table — uguns, lauks, galds", "North Table — огонь, поле, стол"],
    "Nova Café · Drasard Demo": ["Nova Café · Drasard demonstrācija", "Nova Café · демо Drasard"],
    "Wine": ["Vīns", "Вино"], "Bag": ["Grozs", "Корзина"],
    "Menu / services": ["Ēdienkarte / pakalpojumi", "Меню / услуги"],
    "Menu": ["Ēdienkarte", "Меню"],
    "Reserve": ["Rezervēt", "Забронировать"],
    "See the menu": ["Apskatīt ēdienkarti", "Посмотреть меню"],
    "Why Nova": ["Kāpēc Nova", "Почему Nova"],
    "Read the journal": ["Lasīt dienasgrāmatu", "Читать журнал"],
    "Explore food & drink": ["Apskatīt ēdienus un dzērienus", "Еда и напитки"],
    "Cloud Nine": ["Cloud Nine", "Cloud Nine"],
    "Whipped ricotta, grilled sourdough, honey & lemon": ["Putoāta rikota, grilēta ierauga maize, medus un citrons", "Взбитая рикотта, хлеб на закваске с гриля, мёд и лимон"],
    "Greenhouse Eggs": ["Siltumnīcas olas", "Яйца из теплицы"],
    "Soft eggs, herb oil, spinach, rye & cultured butter": ["Maigi pagatavotas olas, garšaugu eļļa, spināti, rudzi un skābkrējuma sviests", "Нежные яйца, масло с травами, шпинат, рожь и кисломолочное масло"],
    "Miso Mushroom Toast": ["Grauzdiņš ar miso sēnēm", "Тост с грибами мисо"],
    "Wild mushrooms, miso butter, herbs, parmesan": ["Meža sēnes, miso sviests, garšaugi, parmezāns", "Лесные грибы, масло мисо, зелень, пармезан"],
    "Nova Cortado": ["Nova cortado", "Nova кортадо"],
    "Double espresso, microfoam, house-roasted blend": ["Dubultais espresso, smalkas piena putas, mājās grauzdēts maisījums", "Двойной эспрессо, мелкая молочная пена, смесь собственной обжарки"],
    "Oat Cloud": ["Auzu mākonis", "Овсяное облако"],
    "Espresso, silky oat milk, vanilla sea salt": ["Espresso, zīdains auzu piens, vaniļas jūras sāls", "Эспрессо, нежное овсяное молоко, ванильная морская соль"],
    "Cardamom Knot": ["Kardamona mezgls", "Кардамоновый узелок"],
    "Laminated pastry, cardamom sugar, brown butter": ["Kārtainā mīkla, kardamona cukurs, brūnais sviests", "Слоёная выпечка, сахар с кардамоном, коричневое масло"],
    "Raspberry Danish": ["Dāņu maizīte ar avenēm", "Датская слойка с малиной"],
    "Vanilla cream, raspberry, crisp pastry layers": ["Vaniļas krēms, avenes, kraukšķīgas mīklas kārtas", "Ванильный крем, малина, хрустящие слои теста"],
    "Sea Buckthorn Soda": ["Smiltsērkšķu soda", "Облепиховая содовая"],
    "Sea buckthorn, citrus, rosemary & sparkle": ["Smiltsērkšķi, citrusaugļi, rozmarīns un dzirkstošs ūdens", "Облепиха, цитрусы, розмарин и газированная вода"],
    "Burnt Basque": ["Dedzinātā basku kūka", "Баскский чизкейк с карамельной корочкой"],
    "Cultured cream, berry compote, flaky salt": ["Raudzēts krējums, ogu kompots, pārslu sāls", "Кисломолочные сливки, ягодный компот, хлопья соли"],
    "Flat White": ["Flat white", "Флэт уайт"],
    "Double espresso, silky steamed milk": ["Dubultais espresso, zīdaini tvaicēts piens", "Двойной эспрессо, нежное вспененное молоко"],
    "Batch Brew": ["Filtrētā kafija", "Фильтр-кофе"],
    "Seasonal single origin, brewed fresh": ["Sezonāla vienas izcelsmes kafija, svaigi pagatavota", "Сезонный кофе одного происхождения, свежего заваривания"],
    "Iced Oat Latte": ["Auksts auzu latte", "Холодный овсяный латте"],
    "Double espresso over ice with oat milk": ["Dubultais espresso ar ledu un auzu pienu", "Двойной эспрессо со льдом и овсяным молоком"],
    "Honey Cappuccino": ["Medus kapučīno", "Медовый капучино"],
    "House espresso, milk foam, local honey": ["Mājas espresso, piena putas, vietējais medus", "Фирменный эспрессо, молочная пена, местный мёд"],
    "Decaf Americano": ["Bezkofeīna americano", "Американо без кофеина"],
    "Chocolate-led decaf, hot or over ice": ["Bezkofeīna kafija ar šokolādes notīm, karsta vai ar ledu", "Декаф с шоколадными нотами, горячий или со льдом"],
    "Cocoa Mocha": ["Kakao moka", "Какао-мокко"],
    "Espresso, dark chocolate, steamed milk": ["Espresso, tumšā šokolāde, tvaicēts piens", "Эспрессо, тёмный шоколад, парное молоко"],
    "Ricotta Hotcakes": ["Rikotas pankūkas", "Оладьи с рикоттой"],
    "Whipped ricotta, berries, maple, lemon": ["Putoāta rikota, ogas, kļavu sīrups, citrons", "Взбитая рикотта, ягоды, кленовый сироп, лимон"],
    "Avocado Rye": ["Rudzu maize ar avokado", "Ржаной тост с авокадо"],
    "Rye sourdough, avocado, herbs, chilli oil": ["Rudzu ierauga maize, avokado, garšaugi, čili eļļa", "Ржаной хлеб на закваске, авокадо, зелень, масло чили"],
    "Smoked Salmon Toast": ["Grauzdiņš ar kūpinātu lasi", "Тост с копчёным лососем"],
    "Whipped cream cheese, dill, pickled onion": ["Putoāts krēmsiers, dilles, marinēts sīpols", "Взбитый сливочный сыр, укроп, маринованный лук"],
    "Miso Scramble": ["Olu kultenis ar miso", "Скрэмбл с мисо"],
    "Soft eggs, miso butter, chives, toasted rye": ["Maigas olas, miso sviests, maurloki, grauzdēti rudzi", "Нежные яйца, масло мисо, шнитт-лук, поджаренная рожь"],
    "Roasted Tomato Tartine": ["Tartīne ar ceptiem tomātiem", "Тартин с запечёнными томатами"],
    "Slow-roasted tomato, labneh, basil": ["Lēni cepti tomāti, labne, baziliks", "Томаты медленного запекания, лабне, базилик"],
    "Granola & Kefir": ["Granola un kefīrs", "Гранола и кефир"],
    "Toasted oats, hazelnut, seasonal fruit": ["Grauzdētas auzas, lazdu rieksti, sezonas augļi", "Поджаренный овёс, фундук, сезонные фрукты"],
    "Cinnamon Morning Bun": ["Kanēļa rīta maizīte", "Утренняя булочка с корицей"],
    "Laminated dough, cinnamon sugar, butter": ["Kārtainā mīkla, kanēļa cukurs, sviests", "Слоёное тесто, сахар с корицей, масло"],
    "Almond Croissant": ["Mandeļu kruasāns", "Миндальный круассан"],
    "Twice-baked pastry, almond cream, flakes": ["Divreiz cepta mīkla, mandeļu krēms, mandeļu skaidiņas", "Дважды выпеченная слойка, миндальный крем, миндальные лепестки"],
    "Butter Croissant": ["Sviesta kruasāns", "Сливочный круассан"],
    "Flaky layers, cultured butter, baked daily": ["Kraukšķīgas kārtas, sviests, cepts katru dienu", "Хрустящие слои, сливочное масло, выпекается ежедневно"],
    "Rye Chocolate Cookie": ["Rudzu šokolādes cepums", "Ржаное шоколадное печенье"],
    "Dark chocolate, rye flour, flaky salt": ["Tumšā šokolāde, rudzu milti, pārslu sāls", "Тёмный шоколад, ржаная мука, хлопья соли"],
    "Seasonal Fruit Danish": ["Sezonas augļu maizīte", "Слойка с сезонными фруктами"],
    "Vanilla cream, fruit, crisp pastry": ["Vaniļas krēms, augļi, kraukšķīga mīkla", "Ванильный крем, фрукты, хрустящее тесто"],
    "Sea Buckthorn Fizz": ["Smiltsērkšķu fizz", "Облепиховый физз"],
    "Sea buckthorn, citrus, rosemary, soda": ["Smiltsērkšķi, citrusaugļi, rozmarīns, soda", "Облепиха, цитрусы, розмарин, содовая"],
    "Rhubarb Lemonade": ["Rabarberu limonāde", "Ревенад"],
    "Rhubarb cordial, fresh lemon, sparkling water": ["Rabarberu sīrups, svaigs citrons, dzirkstošs ūdens", "Сироп ревеня, свежий лимон, газированная вода"],
    "Ginger & Lime Cooler": ["Ingvera un laima dzēriens", "Имбирно-лаймовый кулер"],
    "Fresh ginger, lime, mint, crushed ice": ["Svaigs ingvers, laims, piparmētra, sasmalcināts ledus", "Свежий имбирь, лайм, мята, колотый лёд"],
    "Matcha Latte": ["Matcha latte", "Матча-латте"],
    "Ceremonial matcha, steamed dairy or oat milk": ["Ceremoniālā matcha, tvaicēts govs vai auzu piens", "Церемониальная матча, вспененное обычное или овсяное молоко"],
    "Fresh Orange Juice": ["Svaigi spiesta apelsīnu sula", "Свежевыжатый апельсиновый сок"],
    "Pressed to order, no added sugar": ["Spiesta pēc pasūtījuma, bez pievienota cukura", "Выжимается по заказу, без добавленного сахара"],
    "Vanilla Panna Cotta": ["Vaniļas panna cotta", "Ванильная панна-котта"],
    "Vanilla bean, berry compote, crisp oat": ["Vaniļas pāksts, ogu kompots, kraukšķīgas auzas", "Стручок ванили, ягодный компот, хрустящий овёс"],
    "Rhubarb Crumble": ["Rabarberu drupačkūka", "Крамбл с ревенем"],
    "Warm rhubarb, oat crumble, cultured cream": ["Silti rabarberi, auzu drumstalas, raudzēts krējums", "Тёплый ревень, овсяная крошка, кисломолочные сливки"],
    "Dark Chocolate Brownie": ["Tumšās šokolādes braunijs", "Брауни из тёмного шоколада"],
    "Fudgy centre, toasted hazelnut, sea salt": ["Mīksts vidus, grauzdēti lazdu rieksti, jūras sāls", "Нежная серединка, поджаренный фундук, морская соль"],
    "Lemon Olive Oil Cake": ["Citronu un olīveļļas kūka", "Лимонный кекс на оливковом масле"],
    "Citrus zest, olive oil, soft cream": ["Citrusu miziņa, olīveļļa, maigs krēms", "Цедра цитрусовых, оливковое масло, нежный крем"],
    "Affogato": ["Affogato", "Аффогато"],
    "Vanilla gelato, fresh double espresso": ["Vaniļas gelato, svaigs dubultais espresso", "Ванильное джелато, свежий двойной эспрессо"],
    "Rhubarb Lemonade": ["Rabarberu limonāde", "Лимонад с ревенем"],
    "Your table is waiting.": ["Jūsu galds gaida.", "Ваш столик ждёт."],
    "Add something from the menu and it'll appear here.": ["Pievienojiet ēdienu no ēdienkartes, un tas parādīsies šeit.", "Добавьте блюдо из меню, и оно появится здесь."],
    "The menu": ["Ēdienkarte", "Меню"]
  });


    "COFFEE": ["KAFIJA", "КОФЕ"], "BRUNCH": ["VĒLĀS BROKASTIS", "БРАНЧ"], "BAKERY": ["MAIZNĪCA", "ВЫПЕЧКА"], "DRINKS": ["DZĒRIENI", "НАПИТКИ"], "SWEET": ["SALDUMI", "ДЕСЕРТЫ"],
    "+ Add": ["+ Pievienot", "+ Добавить"],
    "Reserve": ["Rezervēt", "Забронировать"],
    "YOUR BAG · 0": ["JŪSU GROZS · 0", "ВАША КОРЗИНА · 0"],
    "aurelia": ["aurelia", "aurelia"],
    "North Table - Fire, field, table.": ["North Table — uguns, lauks, galds", "North Table — огонь, поле, стол"],
    "Choose a time": ["Izvēlieties laiku", "Выберите время"],
    "Name": ["Vārds", "Имя"], "Email": ["E-pasts", "Электронная почта"],
    "No real orders or reservations are processed": ["Īsti pasūtījumi vai rezervācijas netiek apstrādāti", "Реальные заказы и бронирования не обрабатываются"],
    "The Aurelia philosophy": ["Aurelia filozofija", "Философия Aurelia"]
  
  });

  Object.assign(d, {
    "YOUR BAG ·": ["JŪSU GROZS ·", "ВАША КОРЗИНА ·"]
  });

  function tr(value, lang) {
    if (lang === "EN") return value;
    const trimmed = value.trim();
    if (trimmed.startsWith("YOUR BAG · ")) {
      const count = trimmed.slice("YOUR BAG · ".length);
      const prefix = lang === "LV" ? "JŪSU GROZS · " : "ВАША КОРЗИНА · ";
      return prefix + count;
    }
    const item = d[trimmed];
    if (!item) return value;
    const leading = (value.match(/^\s*/) || [""])[0];
    const trailing = (value.match(/\s*$/) || [""])[0];
    return leading + item[lang === "LV" ? 0 : 1] + trailing;
  }

  const originalNodes = new WeakMap();
  const originalAttrs = new WeakMap();
  let root;
  let observer;
  let current = "EN";

  function apply(lang) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const parent = node.parentElement;
      if (!parent || parent.closest(".demo-language") || ["SCRIPT","STYLE","NOSCRIPT"].includes(parent.tagName)) continue;
      if (!originalNodes.has(node)) originalNodes.set(node, node.nodeValue || "");
      const source = originalNodes.get(node) || "";
      const value = tr(source, lang);
      if (node.nodeValue !== value) node.nodeValue = value;
    }
    root.querySelectorAll("*").forEach(el => {
      if (el.closest(".demo-language")) return;
      let originals = originalAttrs.get(el);
      if (!originals) { originals = new Map(); originalAttrs.set(el, originals); }
      ["aria-label","alt","placeholder","title"].forEach(attr => {
        const value = el.getAttribute(attr);
        if (value === null) return;
        if (!originals.has(attr)) originals.set(attr, value);
        const next = tr(originals.get(attr) || "", lang);
        if (value !== next) el.setAttribute(attr, next);
      });
    });
    document.documentElement.lang = lang.toLowerCase();
    const title = document.querySelector("title");
    if (title) {
      if (!title.dataset.sourceTitle) title.dataset.sourceTitle = title.textContent || "";
      title.textContent = tr(title.dataset.sourceTitle, lang);
    }
    document.querySelectorAll(".demo-language button").forEach(b => {
      const active = b.dataset.lang === lang;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  const nativeAlert = window.alert.bind(window);
  window.alert = (message) => nativeAlert(tr(String(message), current));

  function setLanguage(lang) {
    current = lang;
    try { localStorage.setItem(KEY, lang); } catch {}
    apply(lang);
  }

  function selector() {
    const wrap = document.createElement("div");
    wrap.className = "demo-language";
    wrap.setAttribute("role","group");
    wrap.setAttribute("aria-label","Choose demo language");
    ["EN","LV","RU"].forEach((code,i) => {
      if (i) {
        const sep = document.createElement("span");
        sep.textContent = "|";
        sep.setAttribute("aria-hidden","true");
        wrap.appendChild(sep);
      }
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = code;
      b.dataset.lang = code;
      b.title = labels[code];
      b.setAttribute("aria-label", labels[code]);
      b.addEventListener("click", () => setLanguage(code));
      b.dataset.languageBound = "true";
      wrap.appendChild(b);
    });
    return wrap;
  }

  function init() {
    const existingControl = document.querySelector(".demo-language");
    const nav = document.querySelector(".nav");
    const novaHeader = document.querySelector(".nova2 header");
    const control = existingControl || selector();
    if (!existingControl) {
      if (nav) {
        const links = nav.querySelector(".navlinks");
        nav.insertBefore(control, links || null);
      } else if (novaHeader) {
        const actions = novaHeader.querySelector(".head-actions");
        novaHeader.insertBefore(control, actions || null);
      } else {
        document.body.appendChild(control);
      }
    }
    control.querySelectorAll("button").forEach((button) => {
      if (button.dataset.languageBound === "true") return;
      button.addEventListener("click", () => setLanguage(button.dataset.lang || "EN"));
      button.dataset.languageBound = "true";
    });
    const style = document.createElement("style");
    style.textContent = [
      ".demo-language{display:flex;align-items:center;justify-content:center;gap:3px;padding:3px 5px;border:1px solid currentColor;border-radius:999px;color:inherit;font:600 10px/1 Arial,sans-serif;letter-spacing:.04em;white-space:nowrap;flex-shrink:0;position:relative;z-index:20}",
      ".demo-language button{appearance:none;min-width:29px;padding:7px 8px;border:1px solid transparent;border-radius:999px;background:transparent;color:inherit;font:inherit;letter-spacing:inherit;cursor:pointer}",
      ".demo-language span{opacity:.55;font-size:10px}",
      ".demo-language button:hover{border-color:currentColor}",
      ".demo-language button.active{background:#c9ae73;border-color:#c9ae73;color:#171714}",
      ".demo-language button:focus-visible{outline:2px solid #c9ae73;outline-offset:2px}",
      ".nav{gap:16px}",
      "@media(max-width:900px){.nav{gap:12px}.demo-language button{min-width:27px;padding:7px 6px}.navlinks{gap:12px!important}}",
      "@media(max-width:650px){.demo-language{gap:1px;padding:2px}.demo-language button{min-width:24px;padding:7px 5px}.nav{flex-wrap:wrap}.navlinks{display:none!important}.nova2 header .demo-language{margin-left:auto}.nova2 header .head-actions{gap:7px}}"
    ].join("");
    document.head.appendChild(style);
    root = document.body;
    try {
      const saved = localStorage.getItem(KEY);
      if (saved && labels[saved]) current = saved;
    } catch {}
    apply(current);
    observer = new MutationObserver(() => apply(current));
    observer.observe(root,{childList:true,subtree:true,characterData:true});
    apply(current);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();