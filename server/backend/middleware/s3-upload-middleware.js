const path = require('path');
const fs = require('fs-extra');
const AWS = require('aws-sdk');
const multer = require('multer');

const upload = multer({ dest: `${__dirname}/../temp-assets` });

module.exports = fieldName => (req, res, next) => {
  upload.single(fieldName)(req, res, err => {
    if (err) return next(err);
    if (!req.file) return next();

    let s3bucket = new AWS.S3({
      accessKeyId: process.env.IAM_USER_KEY,
      secretAccessKey: process.env.IAM_USER_SECRET,
      Bucket: process.env.AWS_BUCKET
    });

    s3bucket.createBucket(() => {
      let params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${req.file.filename}${path.extname(req.file.originalname)}`,
        Body: fs.createReadStream(req.file.path)
      };
      s3bucket
        .upload(params, (err, data) => {
          if (err) {
            console.log('error in callback');
            console.log(err);
          }
          console.log('success');
          console.log(data);
        })
        .promise()
        .then(s3Data => {
          req.s3Data = s3Data;
          console.log('req.s3Data: ', req.s3Data);
          console.log('req.file.filename: ', req.file.filename);
          return fs.remove(`${__dirname}/../temp-assets/${req.file.filename}`);
        })
        .then(() => {
          next();
        })
        .catch(next);
    });
  });
};
