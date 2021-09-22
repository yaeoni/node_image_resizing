import s3 from "../s3/s3";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "test-yaewon",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      cb(
        null,
        `test/${Date.now().toString()}${path.extname(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export = upload;
