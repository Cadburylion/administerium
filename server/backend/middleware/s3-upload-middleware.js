// const path = require('path');
// const fs = require('fs-extra');
// const AWS = require('aws-sdk');
// const multer = require('multer');
//
// const multipleUpload = multer({ dest: `${__dirname}/../temp-assets` });
// const upload = multer({ dest: `${__dirname}/../temp-assets` });
// // const upload = multer({ storage: storage }).single('file');
// // const multipleUpload = multer({ storage: storage }).array('file');
//
// module.exports = fieldName => (req, res, next) => {
//   upload.single(fieldName)(req, res, err => {
//     if (err) return next(err);
//     if (!req.file) return next();
//
//     let s3bucket = new AWS.S3({
//       accessKeyId: process.env.IAM_USER_KEY,
//       secretAccessKey: process.env.IAM_USER_SECRET,
//       Bucket: process.env.AWS_BUCKET
//     });
//
//     s3bucket.createBucket(() => {
//       let params = {
//         Bucket: process.env.AWS_BUCKET,
//         Key: `${req.file.filename}${path.extname(req.file.originalname)}`,
//         Body: fs.createReadStream(req.file.path)
//       };
//       s3bucket
//         .upload(params, (err, data) => {
//           if (err) {
//             console.log('error in callback');
//             console.log(err);
//           }
//           console.log('success');
//           console.log(data);
//         })
//         .promise()
//         .then(s3Data => {
//           req.s3Data = s3Data;
//           return fs.remove(`${__dirname}/../temp-assets/${req.file.filename}`);
//         })
//         .then(() => {
//           next();
//         })
//         .catch(next);
//     });
//   });
// };
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
      cb(null, file.originalname);
    }
  })
});

module.exports = fieldName => (req, res, next) => {
  upload.array(fieldName, 12)(req, res, err => {
    if (err) return next(err);
    if (!req.file) return next();
  });
};
