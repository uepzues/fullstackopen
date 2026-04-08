import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (_req, res)=>{
    res.send('Hello')
})

app.get('/hello', (_req, res)=>{
    res.send('Hello Full Stack!')
})

const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})