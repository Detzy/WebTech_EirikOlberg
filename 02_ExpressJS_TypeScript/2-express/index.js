express = require('express')
metrics = require('./metrics')
path = require('path')
app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.set('port', 1337)
app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');


app.get(
  '/',
  (req, res) => res.send("Hello world")
)

app.get(
  '/hello/:name',
  (req, res) => res.render('hello.ejs', {name: req.params.name})
)

app.get('/metrics.json', (req, res) => {
  metrics.get((err, data) => {
    if(err) throw err
    res.status(200).json(data)
  })
})
 
app.listen(
  app.get('port'),
  () => console.log(`server listening on ${app.get('port')}`)
)
