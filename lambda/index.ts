const AWS = require("aws-sdk");
const sharp = require("sharp");
import { Handler, Context } from "aws-lambda";
const sizeOf = require("buffer-image-size");

const s3 = new AWS.S3();

export const handler: Handler = async (event: any, context: Context) => {
  const Bucket = event.Records[0].s3.bucket.name as string;
  const Key = event.Records[0].s3.object.key as string;
  const filename = Key.split("/")[Key.split("/").length - 1];

  try {
    const s3Object = await s3.getObject({ Bucket: Bucket, Key: Key }).promise();

    // buffer 상에서 파일 크기 구하기
    const kiloBytes = Buffer.byteLength(s3Object.Body as Buffer) / 1024;
    const dimensions = sizeOf(s3Object.Body as Buffer);

    let newWidth: number;
    let newHeight: number;

    // 1000KB를 기준으로 저화질 비율 선택
    if (kiloBytes < 1000) {
      newWidth = dimensions.width / 2;
      newHeight = dimensions.height / 2;
    } else {
      newWidth = dimensions.width / 3;
      newHeight = dimensions.height / 3;
    }

    const resizedImage = await sharp(s3Object.Body as Buffer)
      .resize(newWidth, newHeight)
      .toFormat("jpeg")
      .toBuffer();

    await s3
      .putObject({
        Bucket,
        Key: `thumb/${filename}`,
        Body: resizedImage,
      })
      .promise();
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
};
