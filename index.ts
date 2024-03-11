const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;

// 增加请求体大小限制为10mb
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

// 使用CORS中间件
app.use(cors());

// 处理保存文件的路由
app.post('/save', (req, res) => {
  const base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, '');
  const fileName = req.body.fileName
  const imageName = req.body.imageName
  const filePath = path.join(__dirname, './public', 'images', fileName);

  // if (fs.existsSync(filePath)) {
  //   fs.rmdirSync(filePath, { recursive: true })
  // }
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }

  fs.writeFile(filePath + "/" + imageName, base64Data, 'base64', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving file');
    } else {
      res.send('File saved successfully');
    }
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/web/index.html`);
});
