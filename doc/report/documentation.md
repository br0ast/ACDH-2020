# Choosing the Digital Humanities programme that’s right for you: an enhanced DH course registry with new data and visualizations
## A project for the ACDH-CH Hackathon 2020

### Introduction

Whether at BA, MA or PhD level, choosing the right Digital Humanities programme is not an easy task. The Digital Humanities course registry features an ongoing list of institutions offering such programmes, besides single courses and other types of training events such as summer schools. The registry contains up-to-date information about the disciplines and techniques taught within each DH course, but it does not take advantage of ever growing external dataset such as Crossref, which contains insightful metadata about global scholarly research, including DH.

This project sets out to enhance the DH course registry with new data and visualizations. In particular, it integrates data from Crossref to make it possible for the registry to answers the following questions through additional visualizations:

**RQ1** How many Digital Humanities articles are affiliated to the institutions of the registry? Were there any collaborations, i.e. co-authored DH articles, between the institutions?

**RQ2** What kind of Digital Humanities articles do the institutions publish? To what extent are the articles related to the disciplines and techniques taught in the offered DH courses?

Our aim is to provide additional support for students resorting to the DH course registry to choose the Digital Humanities programme that's right for them. Getting a taste of the type of DH research carried out by the institutions will help users choose the course that better aligns with their objectives and expectations. Someone searching for a PhD programme, for example, could use the extra data to identify the institutions that publish the most papers on the discipline(s) of her interest.

### Research methodology

Publications are only included in the analysis if they belong to journals which are either exclusively or significantly DH-oriented. We based our selection of the journals on the classification proposed in Spinaci, Colavizza and Peroni (2019). We were able to collect data about 23 of the 36 journals of the classification (the remaining journals are, unfortunately, not yet part of Crossref). The journals included are:

**Journals that exclusively publish DH articles (14 in total, out of 19)**
- *Frontiers in Digital Humanities*
- *Literary and Linguistics Computing* / *Digital Scholarship in the Humanities (DSH)*
- *Digital Studies / Le champ numérique*
- *Journal of Cultural Analytics* 
- *Digitális Bölcsészet / Digital Humanities*
- *Revista de humanidades digitales* 
- *Journal of the Japanese Association for Digital Humanities*
- *International Journal of Digital Humanities*
- *Journal on Computing and Cultural Heritage (JOCCH)* 
- *Journal of the Text Encoding Initiative*
- *Computers and the Humanities*
- *International Journal of Humanities and Arts Computing*
- *Digital Medievalist*

**Journals that publish a significant number of DH articles (9  in total, out of 17)**
- *Journal of Library Metadata*
- *Journal of Quantitative Linguistics*
- *Language Resources and Evaluation*
- *Virtual Archaeology Review*
- *D-Lib Magazine*
- *Computational Linguistics*
- *AI & SOCIETY*
- *International Journal on Digital Libraries*
- *International Journal of Digital Curation*

The first steps in this analysis were to fetch relevant data from [Crossref](https://www.crossref.org/) and [Microsoft Academic](https://academic.microsoft.com/home) (both services offer an API), which include articles published after 2002 until 2020. For each journal, using the ISSN number as a reference, we created two distinct files, one for each dataset used ([the folder 'crossref'](https://github.com/br0ast/ACDH-2020/tree/master/src/data/crossref) contains all the data fetched from Crossref, while [the folder 'mag'](https://github.com/br0ast/ACDH-2020/tree/master/src/data/mag) contains the data from Microsoft Academic). For each article, we collected several metadata such as title, year of publication, affiliation, DOI, and keywords (for the list of reused metadata see Table 1 and Table 2). The use of Microsoft Academic became necessary as we noted that keywords and affiliations were not always present in Crossref.

**Table 1. Metadata reused from Microsoft Academic for each DH article**

| Data | Example (CSV) |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DOI | 10.1093/llc/fqt054 |
| affiliation | National Library of Wales;; Queen's University Belfast;; University of London;; University of Malta |
| keywords | the internet;; sociology;; scholarship;; parliament;; objective evidence;; irish;; humanities;; digital humanities;; digital content;; citation |
| abstract | substantial;; corpus;; digital;; materials;; now;; scholarship;; across;; disciplines;; objective;; evidence;; impact;; value;; robust;; assessment;; [...] |

**Table 2. Metadata reused from Crossref for each DH article**
| Crossref | Example (JSON) |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DOI | "DOI": "10.1093/llc/fqt054" |
| date of publication | "created": { "date-parts": [ [ 2013, 9, 12] ], "date-time": "2013-09-12T03:56:45Z",,"timestamp": 1378958205000 } |
| author(s) | "author": [ { "given": "L. M.", "family": "Hughes", "sequence": "first", "affiliation": [] }, { "given": "P. S.", "family": "Ell", "sequence": "additional", "affiliation": [] }, […] ] |
| title | "title": [ "Assessing and measuring impact of a digital collection in the humanities: An analysis of the SPHERE (Stormont Parliamentary Hansards: Embedded in Research and Education) Project" ] |

In order to be able to answer **RQ1**, we matched each article with its affiliated institution in the DH course registry and generated a new enriched dataset for the DH course registry which also provides the number of DH publications for each institution and the number of collaborations (in terms of co-authored articles) with other institutions of the registry.

For **RQ2**, we reused the data from Microsoft Academic and Crossref to match the disciplines as well as the techniques of each DH course with all related articles. In particular, an article is associated with a discipline or technique when the discipline or technique appears among the article keywords.

<!---
Check, are we going to create a single script (to be launched once a week) calling any other script?
-->
The script used to generate the enriched dataset is available [here](https://github.com/br0ast/ACDH-2020/tree/master/src/script). This script is ideally meant to be run at least once a month so to maintain the DH course registry up-to-date with new DH publications. The last updated date and time will be displayed to ensure users are aware of the degree of freshness of the data. 

### Research outcome

#### User-friendly description of the tool / vizs
#### How to run the tool
	
### Limitations and suggestions for future work

### References

Spinaci, Gianmarco, Colavizza, Giovanni, & Peroni, Silvio. (2019). List of Digital Humanities journals (Version 0.1.0) [Data set]. Zenodo. http://doi.org/10.5281/zenodo.3406564

