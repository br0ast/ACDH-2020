## 14/03/2020
In `courses.json` we have the `contact_mail` attribute for each course. This value indicates the email domain of the related course. We can use such value to look for the authors which publish on the Digital Humanities Journals.

The [dh_journals.csv](src/data/other/dh_journals.csv) CSV file contains a list of journals ordered and ranked according to their relevance to the Digital Humanities subjects.  

Another useful external API service which looks for any institution domain is: [https://github.com/Hipo/university-domains-list](https://github.com/Hipo/university-domains-list)     

## 03/03/2020
In `src/script/` you find the script `dump.py` which uses the APIs of: [https://dhcr.clarin-dariah.eu/api/v1](https://dhcr.clarin-dariah.eu/api/v1) to download and save locally at `src/data/` each dataset of the open data collection. All the datasets are in .JSON format.
