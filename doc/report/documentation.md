# Choosing the right Digital Humanities programme: an enhanced DH course registry with new data and visualizations
## A project for the ACDH-CH Hackathon 2020

### Introduction

Whether at BA, MA or PhD level, choosing the right Digital Humanities programme is not an easy task. The Digital Humanities course registry features an ongoing list of institutions offering such programmes, in addition to single courses and other types of training events such as summer schools. The registry collects up-to-date information about the disciplines and techniques taught within each DH course, but it does not take advantage of ever growing external datasets such as Crossref, which contains insightful metadata about global scholarly research, including DH.

This project sets out to enhance the DH course registry with new data and visualizations. In particular, it integrates data from Crossref to make it possible for the registry to answers the following questions through additional visualizations:

**RQ1** How many Digital Humanities articles are affiliated to the institutions of the registry?

**RQ2** Are there any collaborations, i.e. co-authored DH articles, between the institutions?

**RQ3** Which are the techniques most often adopted in DH published research?

Our aim is to provide additional support for students resorting to the DH course registry to choose the Digital Humanities programme that is right for them. Getting a taste of the type of DH research carried out by the institutions will help users choose the course which best aligns with their objectives and expectations. Someone searching for a PhD programme, for example, could use the extra data to identify the methods or techniques that produce the most published research or, alternatively, they may be interested in doing pioneering research and be therefore able to identify the techniques which do not yet appear often in digital publications. In addition, thanks to the fact that the tool relates each technique to the articles using it and provides clickable DOIs, potential students may go read the articles to get a better understanding of the techniques.

### Research methodology

The analysis only includes articles published in journals which are either exclusively or significantly DH-oriented. We based our selection of the journals on the classification proposed in Spinaci, Colavizza and Peroni (2019). We were able to collect data about 23 of the 36 journals of the classification (the remaining journals are, unfortunately, not yet part of Crossref). The journals included are:

**Journals that publish DH articles exclusively (14 in total, out of 19)**
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

**Journals that publish a significant number of DH articles as part of their contents (9  in total, out of 17)**
- *Journal of Library Metadata*
- *Journal of Quantitative Linguistics*
- *Language Resources and Evaluation*
- *Virtual Archaeology Review*
- *D-Lib Magazine*
- *Computational Linguistics*
- *AI & SOCIETY*
- *International Journal on Digital Libraries*
- *INTERNATIONAL JOURNAL OF DIGITAL CURATION*

The first steps in this analysis were to fetch relevant data from [Crossref](https://www.crossref.org/) and [Microsoft Academic](https://academic.microsoft.com/home) (both services offer an API), which include articles published from 2002 to 2020. For each journal, using the ISSN number as a reference, we obtained two distinct files, one for each dataset used (the file [dh_in_crossref.json](https://github.com/br0ast/ACDH-2020/blob/master/src/data/gen/dh_in_crossref.json) contains all the data fetched from Crossref, while [the file dh_in_mag.json](https://github.com/br0ast/ACDH-2020/blob/master/src/data/gen/dh_in_mag.json) contains the data from Microsoft Academic). For each article, we collected several metadata such as title, year of publication, affiliation, DOI, and keywords (for the full list of reused metadata see Table 1 and Table 2). The use of Microsoft Academic became necessary as we noted that keywords and affiliations were not always present in Crossref.

**Table 1. Metadata reused from Microsoft Academic for each DH article**
| Data | Example (JSON) |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DOI | "DOI": "10.1093/llc/fqt054" |
| affiliation | "AA.DAfN": [ "National Library of Wales", " Queen's University Belfast", " University of London", " University of Malta" ] |
| keywords | "F.FN": "the internet;; sociology;; scholarship;; parliament;; objective evidence;; irish;; humanities;; digital humanities;; digital content;; citation" |
| abstract | "AW": "substantial;; corpus;; digital;; materials;; now;; scholarship;; across;; disciplines;; objective;; evidence;; impact;; value;; robust;; assessment;; sparse;; [...]" |

**Table 2. Metadata reused from Crossref for each DH article**
| Data | Example (JSON) |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DOI | "DOI": "10.1093/llc/fqt054" |
| date of publication | "created": { "date-parts": [ [ 2013, 9, 12] ], "date-time": "2013-09-12T03:56:45Z",,"timestamp": 1378958205000 } |
| author(s) | "author": [ { "given": "L. M.", "family": "Hughes", "sequence": "first", "affiliation": [] }, { "given": "P. S.", "family": "Ell", "sequence": "additional", "affiliation": [] }, […] ] |
| title | "title": [ "Assessing and measuring impact of a digital collection in the humanities: An analysis of the SPHERE (Stormont Parliamentary Hansards: Embedded in Research and Education) Project" ] |

In order to be able to answer **RQ1** and **RQ2**, we matched each article with its affiliated institution in the DH course registry and generated a new enriched dataset for the DH course registry which also provides the number of DH publications for each institution and the number of collaborations (in terms of co-authored articles) with other institutions of the registry.

For **RQ3**, we matched each technique of the registry with all related articles. In particular, an article is associated with a technique when the technique appears among the article keywords.  

The script used to generate the enriched dataset is available [here](https://github.com/br0ast/ACDH-2020/tree/master/src/script). Ideally, this script is meant to be run at least once a month so to maintain the DH course registry up-to-date with new DH publications. The last updated date and time will be displayed to ensure users are aware of the data freshness.

### Research outcome

In order to show the new statistics for each DH course in the registry, we propose two different visualizations. 

For **RQ1** and **RQ2**, we realized a network graph where nodes represent institutions while edges represent collaborations between institutions. When selecting a DH course from the registry, at the centre users see a partial network graph featuring the node of the institution offering the course, accompanied by all institutions with which at least one collaboration was established. The thicker the edge, the higher the number of collaborations between the two institutions. By clicking on a node, the number of articles affiliated to the institutions appears in a pop-up tab alongside with the list of clickable article DOIs. Similarly, by clicking on an edge, the number of co-authored articles appears alongside with the list of clickable article DOIs. The tab also contains a list of the courses offered by the institutions with some additional information.

<!---
Figure 1
-->

For **RQ3**, we generated a bar chart which allows a comparison between the techniques of the DH courses offered at two  different institutions. Each bar represents a technique taught in one of the courses selected. If a technique is taught in both courses, the bar is coloured in orange, whereas if the technique is taught only in one of the two courses the bar is either red (for one of the two courses) or yellow (for the other). The longer the bar, the higher the number of published research that employs the technique. By clicking on a bar, the number of relevant articles appears alongside with the list of clickable article DOIs.   

<!---
Figure 2
-->

### How to run the tool

The visualization, built using two Javascript libraries, [Plotly](https://plotly.com/javascript/) and [Cytoscape](https://cytoscape.org/), can be accessed via a standard web browser through [this link](https://github.com/br0ast/ACDH-2020/blob/master/project/index.html). For further information on how to reproduce the datasets developed in this study please refer directly to the scripts [in this folder](https://github.com/br0ast/ACDH-2020/tree/master/src/script), which are commented step by step.
	
### Limitations and suggestions for future work

This study includes a limited number of Digital Humanities publications: many relevant journals are not yet indexed in Crossref and, due to a lack of open data, we did not take into consideration monographs, despite the fact that they represent a traditional method of research dissemination in the humanities. Future research might be able to integrate the DH course registry with more publications as they get indexed into open datasets such as Crossref or Microsoft Academic.
In addition, the project could be developed further by:
 - analysing the disciplines taught in the courses besides the techniques;
 - comparing the techniques with job offers to see which techniques are most requested in the job market;
 - allowing for the comparison among multiple DH courses (as of now, our visualization supports comparison between two courses only).  

### References

Spinaci, Gianmarco, Colavizza, Giovanni, & Peroni, Silvio. (2019). List of Digital Humanities journals (Version 0.1.0) [Dataset]. Zenodo. http://doi.org/10.5281/zenodo.3406564

