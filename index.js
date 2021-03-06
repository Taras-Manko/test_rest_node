const express = require('express')
const app = express()
const port = 3000 || process.env.port
const morgan = require('morgan')
const mongoose = require('mongoose')
const key = require('./config/app')
const routerProducts = require('./api/routes/products')
const userProducts = require('./api/routes/user')
const orderRouter = require('./api/routes/orders')

app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/uploads',express.static('uploads'))

app.use('/api/items',routerProducts)
app.use('/api',userProducts)
app.use('/order',orderRouter)



async function start() {
      await mongoose.connect(key.uri,{
          useFindAndModify:false,
          useUnifiedTopology:true,
          useNewUrlParser:true
      })
       app.listen(port, () => console.log(`Example app listening on port port!`))
}

start()