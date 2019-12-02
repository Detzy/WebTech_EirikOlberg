import express = require('express')
import { MetricsHandler } from './metrics'
import path = require('path')
import bodyparser = require('body-parser')
let ejs = require('ejs');

const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')

const app = express()


const port: string = process.env.PORT || '8080'

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
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

app.get(
    '/metrics',
    (req: any, res: any) => {
        dbMet.getAll((err: Error | null, result: any) => {
            if (err) throw err
            res.status(200).send(result)
        })
    }
)

app.get(
    '/metrics/:id',
    (req: any, res: any) => {
        dbMet.getOne(req.params.id, (err: Error | null, result: any) => {
            if (err) throw err
            res.status(200).send(result)
        })
    }
)


app.delete(
    '/metrics/:id',
    (req: any, res: any) => {
        dbMet.delete(req.params.id, (err: Error | null) => {
            if (err) throw err
            res.status(200).send('Deleted: ' + req.params.id)
        })
    }
)


app.post('/metrics/:id', (req: any, res: any) => {
    dbMet.save(req.params.id, req.body, (err: Error | null) => {
        if (err) throw err
        res.status(200).send(req.params.id)
        // res.status(200).send('Generic message for testing')
    })
})


app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})
