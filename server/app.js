const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/upload", upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'whitepaper', maxCount: 1 }
]), (req, res) => {
  const files = req.files;
  let finalImageURL = files['photo'] ? files['photo'][0].filename : null;
  let finalWhitepaperURL = files['whitepaper'] ? files['whitepaper'][0].filename : null;

  res.json({ status: "success", image: finalImageURL, pdf: finalWhitepaperURL });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, (e) => {
  if (e) throw e;

  console.log(`Server is running on PORT : ${PORT}`);
});
