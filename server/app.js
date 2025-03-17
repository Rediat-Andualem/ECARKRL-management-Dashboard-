// *main imports
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectionInfo from './schema/db.config.js'
import {Route} from './Routes/index.js'
dotenv.config()

// *middlewares
const app = express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,token');
    next();
  });
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin : 'http://localhost:5173',
    // credentials:true
}))

// * main routes 
app.use(Route)


// *connection  and server listening
async function connectionHierarchy(){
    try {
        // *connection with database 
        connectionInfo.connect((err)=>{
            if(err){
                console.log(err)
            }else{
                console.log('connection with database created successfully')
                app.listen(process.env.PORT,()=>{
                    console.log(`app is listening to ${process.env.PORT}`)
                })
            }
        })
    } catch (err) {
        console.log(err.message)
    }
}
// * initializing function 
connectionHierarchy()