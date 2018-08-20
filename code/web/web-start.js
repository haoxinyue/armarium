var express = require('express');
var compression = require('compression');
var path = require('path');
var proxyMiddleWare = require('http-proxy-middleware');
var proxyPath = 'http://127.0.0.1:8080';
var proxyOption = {
  target: proxyPath,
  changeOrigoin: true,
  pathRewrite: { '^/MAPI': '' },
};

var app = express();

app.use('/MAPI', proxyMiddleWare(proxyOption));
app.use(compression()); //这一行一定要卸载其他需要压缩的资源的中间件前面，比如静态资源中间件
app.use(express.static(path.join(__dirname, 'dist')));

const { getFakeChartData } = require('./mock/chart');

app.get('/api/fake_chart_data', function(req, res) {
  res.send(getFakeChartData());
});

console.log('===== 开始运行 ====');
app.listen(80);
