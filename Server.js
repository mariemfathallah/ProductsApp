import express from 'express'
import { config } from 'dotenv'
import { connectDB } from './ConfigurationDB/Mongoose.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
import produitRoutes from './routes/produitRoutes.js'
import bodyParser  from 'body-parser'
const app = express()



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors())
app.use(userRoutes)
app.use(produitRoutes)

config()
connectDB()

const port = process.env.PORT || 5000
app.listen(port, () =>
  console.log(`Server is running on:http://localhost:${port}`),
)

