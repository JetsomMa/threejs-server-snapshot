// index.ts
var express = require("express");
var fs = require("fs");
var path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = 9e3;
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.post("/save", (req, res) => {
  const base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
  const fileName = req.body.fileName;
  const imageName = req.body.imageName;
  const filePath = path.join(__dirname, "./public", "images", fileName);
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }
  fs.writeFile(filePath + "/" + imageName, base64Data, "base64", (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving file");
    } else {
      res.send("File saved successfully");
    }
  });
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/web/index.html`);
});
