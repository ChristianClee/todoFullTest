require('dotenv').config()
const chalk = require('chalk')


const PORT = process.env.PORT_EXPRESS_SERVER || 5500
const emitter = require('./emmiter/emmiter')
const db = require('./db')

const express = require('express')
const cors = require('cors');
const postRouter = require('./routes/post.router')
// const corsOptions = require('./cors/cors.options')


const createTable = async () => { 
  console.log("start")
  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS posts
       (
        id serial PRIMARY KEY,
        message_text VARCHAR (255) UNIQUE NOT NULL,
        success boolean DEFAULT false
        );`)
  }
  catch (e) {
    console.error(e, chalk.bgRed("Error Here"))
  } 
}



const app = express()
createTable()

app.use(cors())
app.use(express.json()) 
app.use('/api', postRouter)



app.get('/connect', (req, res) => {
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    })
  emitter.on('here', (message) => {
    res.write(`data: ${JSON.stringify(message)} \n\n`)
  })
})







app.listen(PORT, () => {
  console.log(`server is working on server ${PORT}`) 
})

