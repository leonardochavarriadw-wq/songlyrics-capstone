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
    try {
      const response = await axios.get(api_url + req.body.artist + "/" + req.body.song);
      const result = response.data;
      res.render("index.ejs", { data: result });
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