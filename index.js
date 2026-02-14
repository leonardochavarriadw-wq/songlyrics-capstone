//Call express
import express from "express";
//Call axios
import axios from "axios";
//Call body parser
import bodyParser from "body-parser";

//Init Express
const app = express();
//Define a port
const port = 3000;
//Link to Api
const api_url = "https://api.lyrics.ovh/v1/";

//Active body parser
app.use(bodyParser.urlencoded({ extended: true }));
//Define public folder
app.use(express.static('public'));

//Get Index
app.get("/", (req, res) => {
    res.render("index.ejs");
});

//Post band and song
app.post("/", async (req, res) => {

    const artist = req.body.artist;
    const title = req.body.title;

    const extraParagraph = "Paroles de la chanson " + title + " par " + artist;

    try {
      const response = await axios.get(api_url + artist + "/" + title);
      const result = response.data.lyrics;
      const debuggedLyrics = result.replace(extraParagraph, "");
      res.render("index.ejs", {
        data: result,
        artist: artist,
        title: title,
    });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
});

//Run port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});