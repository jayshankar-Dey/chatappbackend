import express from "express"
import { createServer } from "http"
import cors from "cors"
import morgan from "morgan"
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv"
//import Comments from "./commentSchema.js"
dotenv.config()
const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
})



app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//////////connect db
// const connectDB = async() => {
//     await mongoose.connect(process.env.DB).then(() => console.log('connection succesfully')).catch((err) => console.log(err))
// }
// connectDB()

// app.get('/', (req, res) => {
//         res.send("wellcome to home page")
//     })
//     ///create comment
// app.post('/api/comment', async(req, res) => {
//     const { comments } = req.body
//     console.log(comments)
//     try {
//         const comment = await Comments.create({ comments })
//         io.emit("getmessage", comment)
//         res.json(comment)
//     } catch (error) {
//         console.log(error)
//     }
// })

// ///get alll comment
// app.get('/api/comment', async(req, res) => {
//     try {
//         const comment = await Comments.find({})
//         res.json(comment)
//     } catch (error) {
//         console.log(error)
//     }
// })


io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on("getMessage", ({ message, data }) => {
        io.emit("sendMessage", { message, name: data })
        console.log(message, data)
    })


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(8000, () => {
    console.log("server is starting on port http://localhost:8000")
})