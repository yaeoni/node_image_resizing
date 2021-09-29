const sharp = require("sharp");
const fs = require("fs");
const sizeOf = require("image-size");

const file = "파일 이름;
const dimensions = sizeOf(file);

// local에서 파일 크기 구하기
var stats = fs.statSync(file);
var fileSizeInBytes = stats.size;
var fileSizeInKilobytes = fileSizeInBytes / 1024;


sharp(file)
  .resize(dimensions.width / 2, dimensions.height / 2) // width, height pixel
  .toFormat("jpeg")
  .toBuffer()
  .then((data) => {
    fs.writeFileSync("결과", data);
  })
  .catch((err) => {
    console.log(err);
  });
