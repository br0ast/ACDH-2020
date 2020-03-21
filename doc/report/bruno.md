06/03/2020

I have looked at the data and I extracted some simple statistics about the tadirah_objects and tadirah_techniques
that may be useful when trying to re-define digital humanities under an educational point of view.

Moreover I created a network with cytoscape that connects every technique to the course that deals with it, it can be seen in \doc\report\DatiBruno\base2.pdf
In this graph, the techniques are the light purple ovals, the courses are the rectangles, and the color of the rectangles depends on
the number of techniques linked to it (the legend is in the file legend.png)
The network can also be opened and edited with Cytoscape using the file base.cyjs in the same folder.

The statistics about the techniques and objects can be created with the 1st script in the StatisticheJson.ipynb in the same folder as above.

More statistics about the network can be seen in the files basenodes.csv and baseedges.csv

//// Non ho ancora avuto il tempo di farmi un'idea precisa sui dati, ho fatto solo le analisi di base //////

14/03/2020

I have downloaded all the publications from the Digital Humanities Journals in CrossRef (Exclusively and Significantly) [from Gianmarco's list](https://github.com/br0ast/ACDH-2020/blob/master/src/data/other/dh_journals.csv). The script that I have used is

```python
import json
import urllib
import csv
from csv import DictReader

def dumpmemyjson(title, issn):
  query = 'http://api.crossref.org/journals/' + issn + '/works?rows=1000'
  file = title
  path = "/content/drive/My Drive/Papers/"
  filepath = path + file.replace("/","-")+".json"
  with open (filepath, 'w+') as jsonfile:
    try:
      r = urllib.request.urlopen(query)
      data = json.loads(r.read().decode(r.info().get_param('charset') or 'utf-8'))
      if data['message']['total-results'] > 1000:
        json.dump(data,jsonfile)
        newquery = query+'&offset=1000'
        newfile = title.replace("/", "-")
        newfile2 = newfile+" part 2.json"
        filepath2 = path+newfile2
        r2 = urllib.request.urlopen(newquery)
        with open (filepath2, "w+") as jsonfile2:
          data2 = json.loads(r2.read().decode(r2.info().get_param('charset') or 'utf-8'))
          json.dump(data2,jsonfile2)
      else:
        json.dump(data, jsonfile)
    except urllib.error.URLError:
      data = {"publication":"null"}
      json.dump(data, jsonfile)


with open('dh_journals.csv', 'r') as csvfile:
  reader = DictReader(csvfile)
  for row in reader:
    if row['DH LEVEL'] == "Exclusively" or row['DH LEVEL'] == "Significantly":
      a = row['TITLE']
      b = row['E_ISSN']
      dumpmemyjson(a,b)
```
They are in [this folder](https://github.com/br0ast/ACDH-2020/tree/master/src/data/crossref). The files are named with their corresponding journal. In case there are more than 1000 publication of that journal the publications are divided into 2 json files (with an addition of " part2" to the second one).

**17/03/2020**

Added a [**datesofarticles.csv** file](https://github.com/br0ast/ACDH-2020/tree/master/src/data/crossref/datesofarticles.csv). It contains the number of articles per journal divided by publication (pre and post 2010) to have an idea on how much "up-to-date" are the publications in these kind of journals (Gianmarco's List)

I have downloaded the paper dataset from [arxiv_archive](https://github.com/staeiou/arxiv_archive/tree/master/processed_data/20200101/per_year), then I have tried to match
every technique in the tadirah techniques 
``` python
['Information Retrieval',
 'Encoding',
 'Text Mining',
 'Linked Open Data',
 'Searching',
 'Mapping',
 'Georeferencing',
 'Preservation Metadata',
 'Scanning',
 'Topic Modeling',
 'Named Entity Recognition',
 'Machine Learning',
 'Browsing',
 'POS-Tagging',
 'Concordancing',
 'Brainstorming',
 'Pattern Recognition',
 'Cluster Analysis',
 'Collocation Analysis',
 'Open Archival Information Systems',
 'Photography',
 'Versioning',
 'Gamification',
 'Web Crawling',
 'Commenting',
 'Distance Measures',
 'Sentiment Analysis',
 'Technology Preservation',
 'Durable Persistent Media',
 'Debugging',
 'Principal Component Analysis',
 'Sequence Alignment',
 'Emulation',
 'Replication',
 'Bit Stream Preservation',
 'Migration']
 ```
 With the abstract of each paper. Because of the year structure of the database (each paper with its metadata and abstract is divided into year folders from 1993 to 2019) I have created a json with the matching for every technique in every year.
 
 The code used to create the various matching is the following:
 
  ``` python
  
  tad_techlist = ['Information Retrieval',
 'Encoding',
 'Text Mining',
 'Linked Open Data',
 'Searching',
 'Mapping',
 'Georeferencing',
 'Preservation Metadata',
 'Scanning',
 'Topic Modeling',
 'Named Entity Recognition',
 'Machine Learning',
 'Browsing',
 'POS-Tagging',
 'Concordancing',
 'Brainstorming',
 'Pattern Recognition',
 'Cluster Analysis',
 'Collocation Analysis',
 'Open Archival Information Systems',
 'Photography',
 'Versioning',
 'Gamification',
 'Web Crawling',
 'Commenting',
 'Distance Measures',
 'Sentiment Analysis',
 'Technology Preservation',
 'Durable Persistent Media',
 'Debugging',
 'Principal Component Analysis',
 'Sequence Alignment',
 'Emulation',
 'Replication',
 'Bit Stream Preservation',
 'Migration']
 
 finaldict = {}
for tag in tad_techlist:
  finaldict[tag]={1993:0, 1994:0,1995:0,1996:0,1997:0,1998:0,1999:0,2000:0,2001:0,2002:0,2003:0,2003:0,2004:0,2005:0,2006:0,2007:0,2008:0,2009:0,2010:0,2011:0,
  2012:0,2013:0,2014:0,2015:0,2016:0,2017:0,2018:0,2019:0,2020:0}
  
import csv

path = '/content/drive/My Drive/years/' #insert your path here
alpha = 1993
while alpha <2020:
  filename = path + str(alpha) + ".tsv"
  with open (filename, "r") as tsvfile:
    reader = csv.DictReader(tsvfile, delimiter="\t")
    for row in reader:
      text = row["abstract"].lower()
      for key in finaldict:
        if key.lower() in text:
          finaldict[key][alpha] += 1
  alpha +=1

import json
with open("tadirahjson.json", "w+") as jsonfile:
  json.dump(finaldict,jsonfile)
```

The resulting tadirahjson.json can be seen [here](https://github.com/br0ast/ACDH-2020/blob/master/src/data/other/tadirahjson.json)

For each of the tadirah techniques there is the number of occurrences of those techniques in the paper's abstracts, divided by years from 1993 to 2019.


**//////////////////
I dataset delle offerte di lavoro che volevo provare a matchare sono questi:
https://data.world/promptcloud/50000-job-board-records-from-reed-uk
https://www.kaggle.com/PromptCloudHQ/usbased-jobs-from-dicecom
https://www.kaggle.com/PromptCloudHQ/us-jobs-on-monstercom
https://data.world/promptcloud/30000-job-postings-from-seek-australia
Circa 122000 annunci di offerte di lavoro e dovrebbero avere tutti (?) una descrizione con le skill richieste, se volete darci un occhio
/////////////////**

**19/03/2020**

I have matched the tadirah techniques with the keywords of extracted from microsoft academics, the script for this match can be seen below and the results are [here](https://github.com/br0ast/ACDH-2020/blob/master/src/data/mag/tadirahdhmatch.json)

```python
tad_techlist = ['Information Retrieval',
 'Encoding',
 'Text Mining',
 'Linked Open Data',
 'Searching',
 'Mapping',
 'Georeferencing',
 'Preservation Metadata',
 'Scanning',
 'Topic Modeling',
 'Named Entity Recognition',
 'Machine Learning',
 'Browsing',
 'POS-Tagging',
 'Concordancing',
 'Brainstorming',
 'Pattern Recognition',
 'Cluster Analysis',
 'Collocation Analysis',
 'Open Archival Information Systems',
 'Photography',
 'Versioning',
 'Gamification',
 'Web Crawling',
 'Commenting',
 'Distance Measures',
 'Sentiment Analysis',
 'Technology Preservation',
 'Durable Persistent Media',
 'Debugging',
 'Principal Component Analysis',
 'Sequence Alignment',
 'Emulation',
 'Replication',
 'Bit Stream Preservation',
 'Migration']

finaldict = {}
for tag in tad_techlist:
  finaldict[tag]={2002:{"number":0,"doilist":[]},2003:{"number":0,"doilist":[]},2003:{"number":0,"doilist":[]},2004:{"number":0,"doilist":[]},2005:{"number":0,"doilist":[]},2006:{"number":0,"doilist":[]},2007:{"number":0,"doilist":[]},2008:{"number":0,"doilist":[]},2009:{"number":0,"doilist":[]},2010:{"number":0,"doilist":[]},2011:{"number":0,"doilist":[]},2012:{"number":0,"doilist":[]},2013:{"number":0,"doilist":[]},2014:{"number":0,"doilist":[]},2015:{"number":0,"doilist":[]},2016:{"number":0,"doilist":[]},2017:{"number":0,"doilist":[]},2018:{"number":0,"doilist":[]},2019:{"number":0,"doilist":[]},2020:{"number":0,"doilist":[]}}


import csv
import os

directory = '/content/drive/My Drive/ivancsv/' #place the directory of the downloaded datasets
for filename in os.listdir(directory):
    if filename.endswith(".csv"):
      with open(directory + filename, "r") as csvfile:
        csvz = csv.DictReader(csvfile)
        print("reading " + filename)
        for row in csvz:
          try:
            year = doidate[row["DOI"]]
            for item in finaldict:
              if row["F.FN"]:
                keywords = row["F.FN"].lower().replace("-", " ")
                if item.lower().replace("-"," ") in keywords:
                  finaldict[item][year]["number"]+=1
                  finaldict[item][year]["doilist"].append(row["DOI"])
                  print("Found tadirah term " + item + " in article " + row["DOI"])
          except:KeyError
  
  with open("tadirahdhmatch.json", "w+") as jsonoutput:
  json.dump(finaldict, jsonoutput)

```

**21/03/2020**

Updated the script page with [my scripts reorganized and commented](https://github.com/br0ast/ACDH-2020/blob/master/src/script/ACDH_Bruno_Scripts.ipynb)
