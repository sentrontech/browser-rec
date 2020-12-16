import express from 'express'
import path from 'path'
const PORT = process.env.PORT || 9999
const app = express()

app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'template'))
app.use('/template/layout', (_req, res) => 
  res.render('layout.ejs', { partial: false }))
app.use('/template/:id', (req, res) => 
  res.render('layout.ejs', { partial: req.params.id }))
app.use('/dist', express.static('./dist'))
app.post('/api/events', (_req, res) => res.status(201).json({success: true}))

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})