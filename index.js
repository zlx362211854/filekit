const fs = require('fs')
const path = require('path')

function copyFile(sourcePath, targetPath) {
  const sourceFile = fs.readdirSync(sourcePath, { withFileTypes: true })
  sourceFile.forEach(file => {
    const newSourcePath = path.resolve(sourcePath, file.name)
    const newTargetPath = path.resolve(targetPath, file.name)
    if (file.isDirectory()) {
      isExist(newTargetPath)
      copyFile(newSourcePath, newTargetPath)
    } else {
      fs.copyFileSync(newSourcePath, newTargetPath)
    }
  })
}
function isExist(path) {
  // 判断文件夹是否存在, 不存在创建一个
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
}
// 清空目录
function delDir(path) {
  let files=[];
  if(fs.existsSync(path)) {
    files=fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath=path+"/"+file;
      if(fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    // fs.rmdirSync(path);
  }
}
/**
 * 读取路径信息
 * @param {string} filepath 路径
 */
async function getStat(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        resolve(false)
      } else {
        resolve(stats);
      }
    })
  })
}
/**
 * 创建路径
 * @param {string} dir 路径
 */
async function mkdir(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, {}, (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

module.exports = {
  copyFile,
  isExist,
  delDir,
  getStat,
  mkdir
}
