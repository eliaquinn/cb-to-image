const express = require("express")
const sharp = require("sharp")
const rt = express.Router()

rt.get("/", (req, res) => {
  res.status(200).send({
    github: "https://github.com/eliaquinn",
    email: "eliaquimunderlinejordan@gmail.com",
  })
})

rt.post("/color-bg", async (req, res) => {
  try {
    const base64Image = req.body.base64;
    const colorBg = req.body.bg;
    const buffer = Buffer.from(base64Image, 'base64');

    const convertedImageBuffer = await sharp(buffer)
      .flatten({ background: colorBg })
      .toBuffer();

    res.setHeader('Content-Type', 'image/png');
    
    res.status(201).send(convertedImageBuffer);

  } catch (error) {
    console.error(error);
    res.status(500).send('Ocorreu um erro ao processar a imagem.');
  }
})

module.exports = rt
