const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET
});

const s3 = new aws.S3();
module.exports = files => {
  let params = {
    Bucket: process.env.AWS_BUCKET,
    Delete: {
      Objects: files.map(file => ({
        Key: file.substr(file.lastIndexOf('/') + 1)
      }))
    }
  };

  s3.deleteObjects(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
};
