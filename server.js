import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import { ShortUrl } from "./models/shortUrl.js"

const app = express()
app.use(express.urlencoded({ extended: false }))

app.set("view engine", "ejs")

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render("index", { shortUrls: shortUrls })
})

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })

  res.redirect("/")
})

// app.get("/:shortUrl", async (req, res) => {
//   const shortUrl = ShortUrl.find({ short: req.params.shortUrl })

//   if (!shortUrl) return res.sendStatus(404)

//   shortUrl.clicks++
//   shortUrl.save()

//   res.redirect(shortUrl.full)
// })

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000")
})
