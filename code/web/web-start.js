var express = require('express');
var path = require('path');
var proxyMiddleWare = require("http-proxy-middleware");
var proxyPath = "http://127.0.0.1:8080";
var proxyOption ={target:proxyPath,changeOrigoin:true,
  "pathRewrite": { "^/API" : "" }
};

var app = express();
app.use("/API",proxyMiddleWare(proxyOption));
app.use(express.static(path.join(__dirname, 'public')));


const  {getFakeChartData} = require ("./mock/chart")

app.get('/api/fake_chart_data', function (req, res) {
  res.send(getFakeChartData());
});

console.log("===== 开始运行 ====");
app.listen(80);
