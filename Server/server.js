import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();

app.use(cors({
    origin: '*',
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"]
}))
app.use((req, res) => {
    res.send('Hello World')
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

