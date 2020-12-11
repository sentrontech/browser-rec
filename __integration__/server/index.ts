import express from 'express'
import path from 'path'
const PORT = 9999
const app = express()
const file = (p: string) => path.resolve(__dirname, p)

app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'template'))
app.use('/template/layout', (req, res) => 
  res.render(file('./template/layout.ejs'), {partial: false}))
app.use('/template/:id', (req, res) => 
  res.render(file('./template/layout.ejs'), {partial: req.params.id}))
app.use('/dist', express.static(file('../../dist')))

console.log('>>>>>>>>>>>>>>> RUNNING ')
app.listen(PORT)