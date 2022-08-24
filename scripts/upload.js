//引入qiniu ,fs ,path
const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')

const { cdnConfig } = require('./config')

const mac = new qiniu.auth.digest.Mac(cdnConfig.ak, cdnConfig.sk)
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z0 //区域代码

//真正的上传方法
const doUpload = (key, file) => {
  const options = {
    scope: cdnConfig.bucket + ':' + key,
  }
  const fromUploader = new qiniu.form_up.FormUploader(config)

  const putExtra = new qiniu.form_up.PutExtra()
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)

  return new Promise((resolve, reject) => {
    fromUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
      if (err) {
        return reject(err)
      }
      if (info.statusCode === 200) {
        resolve(body)
      } else {
        reject(body)
      }
    })
  })
}

//上传的文件夹,递归上传,上传的打包后的文件
const filePaths = path.join(__dirname, '../dist')

const uploadAll = (dir, prefix) => {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    const filePath = path.join(dir, file)
    //判断是路径还是文件,拼接路径
    const key = prefix ? `${prefix}/${file}` : file

    if (fs.lstatSync(filePath).isDirectory()) {
      return uploadAll(filePath, key)
    }
    if (/\.html$/.test(filePath)) return

    doUpload(key, filePath)
      .then((resp) => console.log(resp, 'success'))
      .catch((err) => console.log('\x1B[31m%s\x1B[39m', err, 'error'))
  })
}
//调用上传接口
uploadAll(filePaths, 'test')
