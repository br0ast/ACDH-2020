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
