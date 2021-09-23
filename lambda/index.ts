const AWS = require("aws-sdk");
const sharp = require("sharp");
import { Handler, Context } from "aws-lambda";

const s3 = new AWS.S3();

export const handler: Handler = async (event: any, context: Context) => {
  const Bucket = event.Records[0].s3.bucket.name as string;
  const Key = event.Records[0].s3.object.key as string;
  const filename = Key.split("/")[Key.split("/").length - 1];

  try {
    const s3Object = await s3.getObject({ Bucket: Bucket, Key: Key }).promise();

    const resizedImage = await sharp(s3Object.Body as Buffer)
      .resize(200, 200, { fit: "inside" })
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
