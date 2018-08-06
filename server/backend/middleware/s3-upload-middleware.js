const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET,
    key: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + file.originalname);
    }
  })
});

module.exports = fieldName => (req, res, next) => {
  upload.array(fieldName, 36)(req, res, err => {
    if (err) return next(err);
    if (!req.file) return next();
  });
};
