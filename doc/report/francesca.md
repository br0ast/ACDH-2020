# First analysis (4/3/2020)

NB Nella cartella report trovate un file che contiene come esempio la descrizione del corso DHDK

Q1: ci limitiamo ai corsi attivi e approvati?
    "active": true,
    "deleted": false,
    "deletion_reason_id": null,
    "approved": true
   	NB I corsi sono in tutto 374, quelli recenti (https://dhcr.clarin-dariah.eu/api/v1/courses/count?recent=true) solo 240
   	https://dhcr.clarin-dariah.eu/api/v1/courses/index?recent=true

P1: discipline così come tadirah objects e tadirah techniques appaiono inserite a partire da lista predeterminata, questo potrebbe essere un problema per proposta Bruno, ma possiamo ancora creare cluster di vicinanza fra università che propongono corsi similari, i.e. visualizzare orientamento > potrebbe invece essere interessante analizzare il 'nome' del corso, es. il nostro contiene il concetto di "Digital Knowledge", idem interessante analizzare le parole chiave usate nella 'description'; interessante ai fini della nostra analisi anche evidenziare il dipartimento di afferenza, se di ambito umanistico oppure scientifico
Si può filtrare ovviamente per disciplina, tecnica etc. https://dhcr.clarin-dariah.eu/api/v1/courses/index?recent=true&discipline_id=3

P2: non sono riuscita a filtrare esempio by contact_name, solo boolean values e ids

O1: interessante il valore 'updated', potremmo dare la possibilità agli utenti di visualizzare solo i programmi che sono stati aggiornati da una certa data in poi

Warning: a volte si trova il valore null, altre volte il campo è vuoto

O2: Una ricerca del tipo https://dhcr.clarin-dariah.eu/api/v1/tadirah_objects/view/30 ritorna semplicemente il nome dell'oggetto e un count. Per sapere quali università hanno l'oggetto dobbiamo lavorare sulla descrizione del corso.




Per ogni corso abbiamo i seguenti dati (gli id sono associati ad ulteriori descrizioni):

- id (number)
- active (boolean)
- deleted (boolean)
- deletion_reason_id (number) **+ deletion_reason** (JSON object)
- approved (boolean)
- created (string, di tipo xsd:dateTime)
- updated (string, di tipo xsd:dateTime)
- name (string)
- description (string)
- country_id (number) **+ country** (JSON object)
- city_id (number) **+ city** (JSON object)
- institution_id (number) **+ institution** (JSON object)
- department (string)
- course_parent_type_id (number) **+ course_parent_type** (JSON object)
- course_type_id (number) **+ course_type** (JSON object)
- language_id (number) **+ language** (JSON object)
- access_requirements (string)
- start_date (string, di tipo xsd:date)
- duration (string)
- course_duration_unit_id (number) **+ course_duration_unit** (JSON object)
- recurring (boolean)
- info_url (string, di tipo http URL)
- ects (number)
- contact_mail (string, di tipo mail)
- contact_name (string)
- lon (number)
- lat (number)
- tadirah_objects (JSON object)
- tadirah_techniques (JSON object)
- disciplines (JSON object)

















