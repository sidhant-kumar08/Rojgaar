import express, { urlencoded } from "express";
import dotenv from 'dotenv'
import { connectDB } from "./utils/connect-db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'

dotenv.config();

const PORT = process.env.PORT || 4000
const app = express();

//database connnection 

connectDB();

// middlewares
app.use(urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'https://rojgaar.vercel.app',
    credentials: true,
}))


app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/job', jobRoute)
app.use('/api/v1/application', applicationRoute)



app.listen(PORT, ()=>{
    console.log(`app is listening ${PORT}`);
})


