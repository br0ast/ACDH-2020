# Choosing the Digital Humanities programme that’s right for you: an enhanced DH course registry with new data and visualizations
## A project for the ACDH-CH Hackathon 2020

### Introduction

Whether at BA, MA or PhD level, choosing the right Digital Humanities programme is not an easy task. The Digital Humanities course registry features an ongoing list of institutions offering such programmes, besides single courses and other types of training events such as summer schools. The registry contains up-to-date information about the disciplines and techniques taught within each DH course, but it does not take advantage of ever growing external dataset such as [Crossref](https://www.crossref.org/), which contains insightful metadata about global scholarly research, including DH.

This project sets out to enhance the DH course registry with new data and visualizations. In particular, it integrates data from Crossref to make it possible for the registry to answers the following questions through additional visualizations:

**RQ1** How many Digital Humanities articles are affiliated to the institutions of the registry? Were there any collaborations, i.e. co-authored DH articles, between the institutions?

**RQ2** What kind of Digital Humanities articles do the institutions publish? To what extent are the articles related to the disciplines and techniques taught in the offered DH courses?

Our aim is to provide additional support for students resorting to the DH course registry to choose the Digital Humanities programme that's right for them. Getting a taste of the type of DH research carried out by the institutions will help users choose the course that better aligns with their objectives and expectations. Someone searching for a PhD programme, for example, could use the extra data to identify the institutions that publish the most papers on the discipline(s) of her interest.

### Research methodology

Publications are only included in the analysis if they belong to journals which are either exclusively or significantly DH-oriented. We based our selection of the journals on the classification proposed in Spinaci, Colavizza and Peroni (2019). The journals included are:

**Journals that exclusively publish DH articles (19 in total)**
- *Umanistica Digitale*
- *Frontiers in Digital Humanities*
- *Digital Scholarship in the Humanities (DSH)*
- *Digital Humanities Quarterly (DHQ)*
- *Digital Studies / Le champ numérique*
- *Journal of Digital Humanities*
- *Journal of Cultural Analytics*
- *Journal of Digital Archives and Digital Humanities*
- *Digitális Bölcsészet / Digital Humanities*
- *Revista de humanidades digitales*
- *Journal of the Japanese Association for Digital Humanities*
- *Journal of Data Mining and Digital Humanities*
- *International Journal of Digital Humanities*
- *Journal on Computing and Cultural Heritage (JOCCH)*
- *Literary and Linguistics Computing*
- *Journal of the Text Encoding Initiative*
- *Computers and the Humanities*
- *International Journal of Humanities and Arts Computing*
- *Digital Medievalist*

**Journals that publish a significant number of DH articles (17 in total)**
- *Digital Library Perspectives*
- *Journal of Library Metadata*
- *Journal of Quantitative Linguistics*
- *Language Resources and Evaluation*
- *Virtual Archaeology Review*
- *D-Lib Magazine*
- *Computational Linguistics*
- *AI & SOCIETY*
- *International Journal on Digital Libraries*
- *ENTHYMEMA*
- *Italiano LinguaDue*
- *Lingue e culture dei media*
- *JLIS*
- *Doctor virtualis*
- *INTERNATIONAL JOURNAL OF DIGITAL CURATION*
- *The Journal of Interactive Technology and Pedagogy*
- *Code4Lib Journal*

The first step in this analysis was to fetch relevant data from [Microsoft Academic](https://academic.microsoft.com/home) through their Microsoft Knowledge API. From this dataset, we fetched a CSV file for each journal above listing all articles published between 1993 and 2019 (available in [this folder](https://github.com/br0ast/ACDH-2020/tree/master/src/data/mag)). For each article we gathered data about: the affiliation, the DOI, and the keywords.

We also collected the titles and the year of publication for each article from Crossref through the [Crossref REST API](https://www.crossref.org/services/metadata-delivery/rest-api/).

### Research outcome
	#### User-friendly description of the tool / vizs
	#### How to run the tool
	
### Limitations and suggestions for future work
