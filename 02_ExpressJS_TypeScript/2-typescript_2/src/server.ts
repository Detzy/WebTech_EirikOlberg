import express = require('express')
import { MetricsHandler } from './metrics'
import path = require('path')
let ejs = require('ejs');

const app = express()

const port: string = process.env.PORT || '8080'
app.use(express.static(path.join(__dirname, '/public')))
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');

app.get('/', (req: any, res: any) => {
  res.write('Hello world')
  res.end()
})

app.get(
  '/hello/:name',
  (req: any, res: any) => {
      res.render('hello.ejs', {name: req.params.name})
})

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})

app.get('/metrics.json', (req: any, res: any) => {
  MetricsHandler.get((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
  })
})
