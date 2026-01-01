import express from "express"
import cors from "cors"
import { connectDB } from "./db_Connect/dbconnection.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"
import userRoutes from "./routes/user.routes.js"


dotenv.config()
const corsOrigins = ["http://localhost:5173","http://localhost:5174"]
const app = express()
const PORT = process.env.PORT
app.use(cors({
   origin: corsOrigins,
    methods: ["GET","HEAD","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true           
  }))
app.use(express.json())
app.use(cookieParser());

//db connection
connectDB()

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/post",postRoutes)

app.get("/", (req, res) => {
  res.send("Welcome to the Private Instagram API");
});


app.listen(PORT,()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})


