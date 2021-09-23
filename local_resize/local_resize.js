const sharp = require("sharp");
const fs = require("fs");

sharp("테스트 할 파일")
  .resize(0, 0) // width, height pixel
  .toFormat("jpeg")
  .toBuffer()
  .then((data) => {
    fs.writeFileSync("저장될 이름", data);
  })
  .catch((err) => {
    console.log(err);
  });
