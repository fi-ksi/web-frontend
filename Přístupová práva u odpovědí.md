# Přístupová práva u odpovědí
Pokud není uvedeno jinak, je daný atribut u modelu vždy dostupný

## achievement
- picture - pokud přihlášený uživatel má daný achievement, tak zobrazuje aktivní obrázek, jinak neaktivní

## moduleScore
Celý model je vztažen k přihlášenému uživateli. Nepřihlášený uživatel se nemá z frontendu jak dostat => při přímém dotazu od nepřihlášeného na endpoint vrátit access denied

## module
Stejná situace jako u `moduleScore`

## post
Pokud post patří k veřejnému threadu je přístupný. Pokud patří k soukromému threadu, má k němu přístup pouze jeden uživatel a organizátoři

## profile
Pokud požadavek pochází od nepřihlášeného uživatele, vrací se pouze fake id a signed_in: false.

- Společná pole pro uživatele a orgnizátora jsou: signed_in, first_name, last_name, profile_picture, short_info, email, gender, t_shirt_size.

- Pole pro organizátora jsou: nick_name, admin, organisator, tasks

- Pole pro uživatele jsou: achievements, score, percentile, seasons, successful, results, addr_street, addr_city, addr_zip, addr_country, school_name, school_street, school_city, school_zip, school_country, school_finish

## task
Všechna pole jsou veřejně dostupná, pole details není vhodné vyplňovat u zamčené úlohy

## taskDetails
Všechna pole jsou dostupná pouze pokud je rodičovská úloha odemčena (tzn ve stavu base, correcting nebo done).

## taskScore
Pro tento model by neměl existovat endpoint a modely by vždy měly být přiložené k profile, čímž se řeší zabezpečení

## thread
Pokud je vlákno veřejné, je přístupné vždy. Pokud je soukromé, má k němu přístup pouze jeden uživatel a orgnizátoři.

## userScore
Model by měl být vždy includnutý k task-details, tudíž zabezpeční netřeba řešit.

## user
Všechny položky jsou veřejně dostupné.

* Společná pole pro uživatele a orgnizátora: first_name, last_name, profile_picture, short_info, is_organistor

* Pole pouze pro uživatele: score, tasks_num, achievemets, school_name, addr_country, seasons

* Pole pouze pro organizátora: tasks, email