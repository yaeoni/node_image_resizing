const sharp = require("sharp");
const fs = require("fs");
const sizeOf = require("image-size");

const dimensions = sizeOf("test.png");

sharp("test.png")
  .resize(dimensions.width / 3, dimensions.height / 3) // width, height pixel
  .toFormat("jpeg")
  .toBuffer()
  .then((data) => {
    fs.writeFileSync("2.jpeg", data);
  })
  .catch((err) => {
    console.log(err);
  });
