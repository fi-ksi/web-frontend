# Obecně o našem webu
Web poskytuje následující služby: Autentizovaný přístup pro řešitele, diskusní fórum, články, achievementy, úlohy s moduly pro (automatické) opravování úloh, sběr zpětné vazby. Teď je potřeba nachystat backend tak, aby mohl být funkční pro řešitele (tzn. veškerá administrátorská činnost se zatím vyřeší ručním nalitím do databáze, je vhodné aby databáze a podobné věci byly připraveny i na administraci). Frontend je postaven na Ember.js, tudíž od backendu očekává REST API. Struktura odpovědí je popsána v dokumentu: http://guides.emberjs.com/v1.10.0/models/the-rest-adapter/, případně je možné si v repu frontendu pustit pomocí `cd mockup-server; node index.js` mockup server, který servuje na portu 3000 a tam si pořádně prohlédnout jak má JSON vypadat. Poznámka: vztah belongsTo se reprezentuje IDčkem, hasMany se reprezentuje polem idček.

Specifikace jednotlivých atributů je nejlépe nalézt v modelech frontendu. Celé REST API vrací hodnoty z pohledu aktuálního uživatele. Každý model musí obsahovat id. A měly by se serovovat pouze věci z aktuálního ročníku. Pro výčet všech potřebných atributů se prosím podívej do složky app/model na frontendu. Pro většinu věcí teď stačí GET metody, PUT a POST metody jsou třeba jen u některých entit (které nahrává řešitel).

# O souborech
Soubory bychom rádi ukládali do filesystému, nikoliv do databáze a rádi bychom u obrázků podporovali servování několika různých velikostí (třeba obrázky o šířce 50, 100 a 250px - není prioritou). Pokud je kdekoliv v modelu zmíně obrázek, očekává se string s URL

# Autentizace
Chtěli bychom používat klasickou REST API autentizaci OAuth2

# Články
Každý článek má svůj `title`, `body`, `picture` a `time_published`. Všechny tyto informace jsou veřejné a může je získat kdokoliv.
Jsou servovány na /articles[?offset=x&limi=y]. Tento endpoint vrací články seřazeny od nejnovějšího k nejstaršímu a zároveň přikládá metainformaci o celkovém počtu článků (viz mockup backend).
Jeden konkrétní clánek je servován na endpointu /article/{id}

# Achievementy
Každý achievement obsahuje `title`, `description`, `picture_active`, `picture_inactive`, `active` (boolean). Všechny achievementy jsou opět veřejně přístupné, `active` se řídí tím, jestli daný uživatel tento achievementy dostal nebo ne (default false). Achievementy se udělují za konkrétní úlohy při opravování. Servuje se na endpointech /achievements a /achievement/{id}

# Příspěvek diskuse
Obsahuje `body`, `is_new` (z pohledu aktuálního uživatele), `published_at`. Každý příspěvek patří autorovi `author`, a může mít na sebe více nějakých reakcí (opět postů) `reaction`. Servováno na endpointu /posts a /post/{id}

# Diskusní vlákno
Obsahuje `title`, `posts_count`, `unread_count` a obsahuje jeden kořenový příspěvek `root_post`

# Uživatel
Servuje se na /users[]?filer={orgs,users}] a /user/{id}. Podle toho jestli je uživatel organizátorem, tak se vyplňují relevantní pole (zbytek není uveden, nebo je undefined). Nutno říci, že máme tři typy uživatelů: řešitel, organizátor a administrátor (od toho se třeba odvíjí věci v profile). 

# Profil
Profil se servuje na endpointu /profile a zobrazuje informace o aktuálně přihlášeném uživateli. Pro popis tuny atributů je lepší se podívat přímo do modelu ve frontendu. Pokud není uživatel přihlášen, vrací se pouze `signed_in`: false. Jinak jsou vyplněna relevantní pole.

# Settings
Obsahuje informace o právě příhlášeném uživateli (a pomocí POST je updatuje). Servuje na /settings

# Score
Je konkrétní opravení jedné úlohy, která byla buď opravena strojově, nebo ručně organizátorem. Servuje se na /scores/ a /score/{id}. V momentě, kdy score nepatří přihlášenému uživateli, neodevzdává se komentář.

# Task
Je zadání úlohy. Úloha může být aktivní nebo neaktivní pro daného uživatle (podle toho, jesli splnil prerekvizity). Pokud je neaktivní, tak se neservují věci jako text zadání, odevzávací moduly apod. Prerekvizity je pole polí idček ostatních úloh. Každá úloha spadá do jisté kategorie a má vlastní vlákno. Zároveň k úloze příslušní seznam odevzdání od aktuálně přihlášeného uživatele. Ke každé úloze přísluší libovolný počet tzv. odevzdávacích modulů (způsob, jak uživatel odevzdává řešení)

# Submission
Je jendo odevzdání daného uživatele k dané úloze. Pokud odevzdání nepatří příhlášenému uživateli, neservuje se.

# Module
Je některý z typů odevzdávacího modulu. Je to vlastně union všechn možných typů. Formát kvízu je... 

Co je potřeba domluvit/vyřešit
Na jekém endpointu a jak řešit odevzdávání úloh, jak nahrávat soubory, jak se registrovat atd.