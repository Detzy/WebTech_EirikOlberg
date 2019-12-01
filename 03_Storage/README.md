"# 03_storage" 

## Contributors
Eirik Solheim Ølberg
eirik.solheimolberg@edu.ece.fr

## Using the project:
- You will launch the nodejs script with npm start. It defaults to local port 8080.
- Most of the features are not interresting in a browser, but rather through Postman actions. 

### Saving metrics
The purpose of the project is to be able to save to local storage, and we do this throug saving metrics. 
To do so, use a Postman post action, with url localhost:8080/metrics/ and Body on format:
[
  { "key":"1384686660000", "value":"10" }
]


### Request all metrics
With a Postman get request to url localhost:8080/metrics/, you will get all metrics stored. 
This also prints all metrics to the console, which is helpful as it includes the keys, 
so you can use them for "Requesting one metric" or "Deleting metric"


### Request one metric
With a Postman get request to url localhost:8080/metrics/:id, you will get only metrics with the key :id. 
Note, the metrics are stored with the format: `metric:${theKeyYouInputed}${m.timestamp}`
See console after "Request all" for possible keys


### Delete metric
With a Postman delete request to url localhost:8080/metrics/:id, you will delete only metric with the key :id. 
Note, the metrics are stored with the format: `metric:${theKeyYouInputed}${m.timestamp}`
See console after "Request all" for possible keys
