const express= require('express')
const { blogStats, blogSearch } = require('./controllers/BlogController')
const app = express()

app.get("/api/blog-stats",blogStats)
app.post("/api/blog-search",blogSearch)
app.use(express.json())



app.listen(5000,()=>console.log("PORT IS RUNNING"))