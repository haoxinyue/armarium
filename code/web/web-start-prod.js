require('babel-register')({ presets: ['env'] });

var express = require('express');
var path = require('path');
var compression = require('compression');
var proxyMiddleWare = require('http-proxy-middleware');
var proxyPath = 'http://127.0.0.1:8080';
var stream = require('stream');
var proxyOption = {
  target: proxyPath,
  changeOrigoin: true,
  pathRewrite: { '^/MAPI': '' },
};

var app = express();

app.get('/png/test', (req, response) => {
  // response.set('content-type', "image/png");//设置返回类型
  // response.write(Buffer.from('fhqwhgads', 'ascii'));
  // response.write(Encode("hello"));

  // var Readable = require('stream').Readable;
  // var s = new Readable();
  // s._read = function noop() {}; // redundant? see update below
  // s.push('your text here');
  // s.push(null);
  // response.write(Buffer.from("hello"));
  var data =
    '【89 50 4e 47 0d 0a 1a 0a】 00 00 00 0d 【49 48 44 52】 ' +
    '00 00 00 1c 00 00 00 1c 08 06 00 00 00 72 0d df ' +
    '94 00 00 00 19 74 45 58 74 53 6f 66 74 77 61 72 ' +
    '65 00 41 64 6f 62 65 20 49 6d 61 67 65 52 65 61 ' +
    '64 79 71 c9 65 3c 00 00 03 24 69 54 58 74 58 4d ' +
    '4c 3a 63 6f 6d 2e 61 64 6f 62 65 2e 78 6d 70 00 ' +
    '00 00 00 00 3c 3f 78 70 61 63 6b 65 74 20 62 65 ' +
    '67 69 6e 3d 22 ef bb bf 22 20 69 64 3d 22 57 35 ' +
    '4d 30 4d 70 43 65 68 69 48 7a 72 65 53 7a 4e 54 ' +
    '63 7a 6b 63 39 64 22 3f 3e 20 3c 78 3a 78 6d 70 ' +
    '6d 65 74 61 20 78 6d 6c 6e 73 3a 78 3d 22 61 64 ' +
    '6f 62 65 3a 6e 73 3a 6d 65 74 61 2f 22 20 78 3a ' +
    '78 6d 70 74 6b 3d 22 41 64 6f 62 65 20 58 4d 50 ' +
    '20 43 6f 72 65 20 35 2e 33 2d 63 30 31 31 20 36 ' +
    '36 2e 31 34 35 36 36 31 2c 20 32 30 31 32 2f 30 ' +
    '32 2f 30 36 2d 31 34 3a 35 36 3a 32 37 20 20 20 ' +
    '20 20 20 20 20 22 3e 20 3c 72 64 66 3a 52 44 46 ' +
    '20 78 6d 6c 6e 73 3a 72 64 66 3d 22 68 74 74 70 ' +
    '3a 2f 2f 77 77 77 2e 77 33 2e 6f 72 67 2f 31 39 ' +
    '39 39 2f 30 32 2f 32 32 2d 72 64 66 2d 73 79 6e ' +
    '74 61 78 2d 6e 73 23 22 3e 20 3c 72 64 66 3a 44 ' +
    '65 73 63 72 69 70 74 69 6f 6e 20 72 64 66 3a 61 ' +
    '62 6f 75 74 3d 22 22 20 78 6d 6c 6e 73 3a 78 6d ' +
    '70 3d 22 68 74 74 70 3a 2f 2f 6e 73 2e 61 64 6f ' +
    '62 65 2e 63 6f 6d 2f 78 61 70 2f 31 2e 30 2f 22 ' +
    '20 78 6d 6c 6e 73 3a 78 6d 70 4d 4d 3d 22 68 74 ' +
    '74 70 3a 2f 2f 6e 73 2e 61 64 6f 62 65 2e 63 6f ' +
    '6d 2f 78 61 70 2f 31 2e 30 2f 6d 6d 2f 22 20 78 ' +
    '6d 6c 6e 73 3a 73 74 52 65 66 3d 22 68 74 74 70 ' +
    '3a 2f 2f 6e 73 2e 61 64 6f 62 65 2e 63 6f 6d 2f ' +
    '78 61 70 2f 31 2e 30 2f 73 54 79 70 65 2f 52 65 ' +
    '73 6f 75 72 63 65 52 65 66 23 22 20 78 6d 70 3a ' +
    '43 72 65 61 74 6f 72 54 6f 6f 6c 3d 22 41 64 6f ' +
    '62 65 20 50 68 6f 74 6f 73 68 6f 70 20 43 53 36 ' +
    '20 28 4d 61 63 69 6e 74 6f 73 68 29 22 20 78 6d ' +
    '70 4d 4d 3a 49 6e 73 74 61 6e 63 65 49 44 3d 22 ' +
    '78 6d 70 2e 69 69 64 3a 36 43 33 36 38 37 37 45 ' +
    '36 43 35 31 31 31 45 38 39 43 37 39 43 42 31 42 ' +
    '32 36 41 33 41 31 38 45 22 20 78 6d 70 4d 4d 3a ' +
    '44 6f 63 75 6d 65 6e 74 49 44 3d 22 78 6d 70 2e ' +
    '64 69 64 3a 36 43 33 36 38 37 37 46 36 43 35 31 ' +
    '31 31 45 38 39 43 37 39 43 42 31 42 32 36 41 33 ' +
    '41 31 38 45 22 3e 20 3c 78 6d 70 4d 4d 3a 44 65 ' +
    '72 69 76 65 64 46 72 6f 6d 20 73 74 52 65 66 3a ' +
    '69 6e 73 74 61 6e 63 65 49 44 3d 22 78 6d 70 2e ' +
    '69 69 64 3a 33 41 33 43 39 35 46 35 36 43 35 31 ' +
    '31 31 45 38 39 43 37 39 43 42 31 42 32 36 41 33 ' +
    '41 31 38 45 22 20 73 74 52 65 66 3a 64 6f 63 75 ' +
    '6d 65 6e 74 49 44 3d 22 78 6d 70 2e 64 69 64 3a ' +
    '33 41 33 43 39 35 46 36 36 43 35 31 31 31 45 38 ' +
    '39 43 37 39 43 42 31 42 32 36 41 33 41 31 38 45 ' +
    '22 2f 3e 20 3c 2f 72 64 66 3a 44 65 73 63 72 69 ' +
    '70 74 69 6f 6e 3e 20 3c 2f 72 64 66 3a 52 44 46 ' +
    '3e 20 3c 2f 78 3a 78 6d 70 6d 65 74 61 3e 20 3c ' +
    '3f 78 70 61 63 6b 65 74 20 65 6e 64 3d 22 72 22 ' +
    '3f 3e c0 f7 9c 12 00 00 06 86 【49 44 41 54】 78 da ' +
    'bc 56 4d 6c 5c 57 15 fe ee 7b 6f e6 79 3c 1e 8f ' +
    'c7 3f 75 1c 27 4d 6a 87 a4 75 1b ab 2d 24 64 81 ' +
    'a9 12 20 22 a2 25 6a 1b 09 65 cb 82 0d 8b 20 b1 ' +
    'c8 02 16 88 45 90 ca 0e 75 05 ea 0e 51 16 48 95 ' +
    '8a 90 a2 12 25 24 c8 a1 a1 e9 0f 29 8a 9c 28 49 ' +
    '63 a7 99 f1 d8 33 f6 fc bf ff 7b f9 ee 9b 37 d1 ' +
    'c8 b4 a6 62 51 cb 57 6f de bb e7 9c ef fc 7c e7 ' +
    'dc 2b 94 52 f8 32 ff ac 6b d7 ae e1 c2 85 0b 5f ' +
    '48 b8 e7 9b 10 80 e4 cb dc be b1 d9 57 4e ec 7d ' +
    'd5 73 1a e1 ed 3b 1b 4b 57 6f 34 16 cb d5 b0 6e ' +
    '19 9f ad bf b0 b0 00 9c 3b 77 ee ff 75 d6 78 fb ' +
    '77 fb 2f fb 37 6d 55 7f 1f aa f2 37 a1 2e fe 02 ' +
    'cb cf 8f e1 95 cf 53 38 7b f6 2c 2c db b6 b7 b5 ' +
    '2a 2c e0 c4 d7 07 8e bf 74 74 e4 e5 e9 5d 85 3d ' +
    '30 86 a3 c5 f7 c5 95 7f 7e 7c ef ea 8b 27 36 be ' +
    '19 98 1e 8d 00 c5 45 85 42 19 8f ef 29 60 d7 07 ' +
    'd5 cf b6 35 30 30 00 6b 5b 30 fe 9f 39 22 7e fd ' +
    'cb 9f c9 9f e6 f6 57 a0 44 19 22 02 0e ce 1c 3c ' +
    'bc 7f 5f f6 2d 91 59 46 2a 07 6c 5e 07 52 35 e0 ' +
    '4a 05 17 cf df c7 6f b7 4d cb 76 9b a6 80 f9 6c ' +
    '4e bd 7a f7 a2 8f f5 e5 08 ea 31 05 3f ab 30 94 ' +
    '7f 38 74 f4 79 e7 b8 ef 48 34 6e d0 48 11 58 aa ' +
    'e2 a3 33 7f c2 f7 9c 10 ee b6 a4 d9 6e 33 54 08 ' +
    'df f8 10 67 5e db 87 3f 34 3f 54 59 7b 04 18 dc ' +
    '0b d8 a9 c6 a0 95 12 4f 74 8a 02 6b 57 14 96 ee ' +
    '8a f7 5e fb bb fd e3 63 c7 f2 0b 93 e3 a3 bb ab ' +
    '9b a2 78 fe d2 ed bf fa 41 18 7d 21 c0 f9 a7 26 ' +
    'e6 4e 7d 7f e6 94 3d e8 e7 bc c0 69 94 86 5a 17 ' +
    '27 b3 cd 6f af fc b9 9d 19 79 2e 42 6e d2 44 e4 ' +
    '0c 63 f3 66 15 9b 55 d5 cc 1d 1a 68 be f9 c3 d4 ' +
    '5b bb a7 bc 69 04 eb f4 f4 71 bc b3 f8 d2 3b a7 ' +
    '7f 72 fe 07 1b 35 a7 b6 2d a0 65 9a c6 eb 3f df ' +
    'fd c6 c2 77 ee 1c c1 48 87 c5 01 a2 aa 85 f6 03 ' +
    '4b d9 77 87 d0 ba e7 62 78 97 84 bd 73 1a 76 7d ' +
    '14 5f 79 e6 56 ae 30 eb 1c 13 d9 0e 74 38 41 9d ' +
    'f2 9b 15 1c 9a 6d 1c 1d 1d 4e 0f ff 4f c0 e7 9e ' +
    'cc 3e fb d5 d9 95 23 ed b5 2a ac a0 cb 1c b7 0c ' +
    '74 1e 42 b8 64 5f 7a 30 05 6b d8 40 c8 e2 d9 b9 ' +
    '11 b4 4a 0a 9d 0d 20 33 c1 3d 12 48 86 02 43 19 ' +
    '81 bf 5c aa bc 7d 67 a5 be f2 5f 01 c9 3e 8e e8 ' +
    'de 9e 9f 6a 1f 71 97 5d d4 6a 9a c6 cc 0e 83 6c ' +
    '56 2c 84 c6 30 a3 4d 23 b7 53 a0 7d b3 06 67 2d ' +
    '82 95 df 40 e8 64 10 94 53 f0 3e e1 bb d1 46 bb ' +
    'ae 60 a7 15 ae bf 5b 5b ea 23 25 dd e6 ac a0 7d ' +
    '6b 46 ca 17 5e 3f 7d fa 37 93 33 33 a9 30 52 6a ' +
    'c4 5f 7c ec f6 95 cb 18 1c 23 d8 10 09 32 3a 8a ' +
    'c9 85 3c 32 53 6d 58 99 1a 23 73 d1 29 e7 81 c2 ' +
    '51 04 fe 25 4c bf e0 c6 6e fb 95 02 dc d2 5e b4 ' +
    'fe d5 40 e9 7e 80 83 fe 8e 1f fd ea b0 fd 72 14 ' +
    '06 02 51 84 8d 52 29 3a a0 d4 59 6b c7 c8 c8 fe ' +
    'a7 4f 9d 9a 77 2a 15 26 5f c1 ab 46 f0 ca cc 5d ' +
    '4b 22 5d 88 90 7f aa 8c f4 d8 7d a4 c7 15 dc ce ' +
    '00 9c d6 21 18 99 83 28 8c 4d a1 fc ee 5d 54 3f ' +
    'ba 85 c9 63 1e a2 ce 2a 1d 6a a0 70 e0 bb f8 f4 ' +
    'e3 0c 46 b3 62 a2 30 1b 4d f8 04 d3 13 71 5d 4a ' +
    '14 a4 9c b3 a4 10 41 75 65 05 ce ea 2a 0c 7e b4 ' +
    '98 05 33 7d 12 86 d9 c1 f0 ce 3f c2 6f ba b0 46 ' +
    '15 ea c5 39 16 f1 30 d3 95 85 30 75 ab 15 31 f6 ' +
    'f4 2c 2a 57 6f e3 a1 af 30 f6 8c 01 e9 93 38 cd ' +
    '4f 59 83 29 44 7e 88 40 45 f0 69 33 34 0c 54 1f ' +
    '3c c0 b4 52 be a5 4f 8b c8 a5 81 20 e0 14 21 cf ' +
    '28 40 09 a4 f3 77 50 fd f7 38 44 f8 0d e4 e7 af ' +
    'b3 36 2f 62 cf b7 1a 88 82 4d 56 44 57 83 19 98 ' +
    'c8 43 66 77 a3 f4 de 0a 72 3b 24 bc f5 02 8a 17 ' +
    '32 50 0d 07 86 11 c5 f6 0c 4e 7a af d1 40 8b a4 ' +
    '30 4c 13 96 20 60 d8 e9 40 69 d0 04 50 47 ea 97 ' +
    'c7 60 f8 93 48 99 3e 6a e5 27 91 fa 9a 01 61 77 ' +
    '68 c0 85 30 14 d3 24 a1 75 c7 0f 1f 40 e3 5e 1a ' +
    'ab 6f a6 d1 b8 3f 0a a7 6e 90 3c 0e cd c8 98 85 ' +
    '9e e3 a0 b1 b4 d4 3d 6d 08 6e 69 80 88 80 48 00 ' +
    '05 df e3 15 51 41 ba 30 5c 09 d9 4c 43 1d 52 30 ' +
    '6c f6 09 8d 09 b3 1b a1 0a 25 db 81 0e 57 f6 a0 ' +
    '7d 83 ce 0e 04 34 e8 f0 bb 8a 9d 0e 18 55 83 e5 ' +
    '52 9e a7 db 39 ae 65 1c 61 d4 6e b3 3e 2e 6d c8 ' +
    '47 a0 5a c1 e0 6f 53 83 7b 2e fd 32 60 a4 7c 02 ' +
    'd2 89 54 17 50 06 74 d6 55 b1 9e cd 88 f5 24 8b ' +
    '7c 1f b2 d5 82 5b ad a2 53 af c7 fd 90 4e 7a ae ' +
    'db f8 09 a0 a9 23 4c 00 91 44 19 03 72 5f d0 48 ' +
    'a8 d2 3c aa f8 cd f0 c8 52 0d 48 f6 29 1d 71 00 ' +
    '7f d3 23 87 48 18 bf 8d 80 d9 f2 35 28 e2 21 85 ' +
    '30 59 c6 23 40 9d 52 7a 64 52 28 06 eb 45 48 20 ' +
    '0d 66 30 1d 6a b5 82 a0 5a e2 14 b9 45 67 78 34 ' +
    '48 82 c9 90 a9 8b c8 4c 32 71 85 3a 6b dd ee 36 ' +
    'b7 00 59 c9 37 a3 97 52 1d 61 48 40 8b 20 aa 17 ' +
    '9d de a4 a7 41 a9 c4 a3 9c fd 49 50 b9 ba 8b c6 ' +
    '57 a1 fc 9a ce 66 ac 2d 19 98 62 5f 67 fa 40 7a ' +
    '00 66 1f 90 99 8c 1a d5 8b 30 6c 36 21 49 59 99 ' +
    '34 a9 bf b6 86 80 7d 63 b3 55 d2 89 11 a9 1c 92 ' +
    '8b 4a 04 91 be e8 b2 8e 60 1a d4 a6 d3 fd 91 6c ' +
    '5d 22 49 a7 ec 01 06 ec 13 39 38 18 17 df 2d 16 ' +
    '21 38 04 06 fb 14 e2 34 05 6d 84 6d 3a c4 52 0b ' +
    '33 01 d4 15 20 a8 2d 05 e5 d4 23 e3 a2 0f 04 7d ' +
    'bf e3 08 75 e3 fb 3a 42 8b 84 5e e7 59 96 80 6d ' +
    'b9 6a b0 c6 04 6c 32 ed ae d1 05 ec 12 15 11 f3 ' +
    '68 45 5d 63 db 5d 38 55 2f c2 78 d2 b0 46 3e 29 ' +
    '1c 11 2c d3 27 d0 bf 4c 8f 2c e4 7c 85 4b 30 43 ' +
    '3c ca 11 f9 13 1f 39 6a 8b 71 f5 79 80 ec 9b 54 ' +
    '87 c4 d0 93 21 d5 97 8e 9e 40 94 f4 91 51 5e 45 ' +
    'b8 ac e2 1a aa 44 20 7e 50 a8 53 eb ca 73 2b be ' +
    'd0 38 5b 9e 7a 35 f5 d3 f7 d3 56 6e 6e ee 1f d3 ' +
    // "27 4f fe 7e 40 a9 54 7f 91 f5 8d cd 4f 8c 68 63 " +
    '27 4f fe 7e 40 a9 54 7f 91 f5 8d cd 4f 8c 68 63 ' +
    'd1 b4 81 a8 a6 78 24 71 bc 46 dd c3 cd a4 30 e7 ' +
    '32 d4 71 be b4 bb f7 e4 9e 93 32 59 ba fe fa 22 ' +
    '3a ce d7 a9 f9 f9 cb e2 cb be ea ff 47 80 01 00 ' +
    'b5 ef ab 3d 3a d9 b6 1a 00 00 00 00 【49 45 4e 44】 ' +
    '【ae 42 60 82】';

  data = data.split(' ');
  data.forEach((d, i) => {
    data[i] = parseInt(d, 16);
  });

  // response.end(Buffer.from(data), 'binary');

  // data =[0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A];//png

  var bufferStream = new stream.PassThrough();
  bufferStream.end(Buffer.from(data));
  bufferStream.pipe(response);
  // s.pipe(response)

  // response.writeHead(200, {'Content-type' : 'image/png'});
  // response.write('<h1>Node.js</h1>');
  // response.end('<p>Hello World</p>');

  // var stream = fs.createReadStream( "./public/favicon.png");
  // var responseData = [];//存储文件流
  // if (stream) {//判断状态
  //   stream.on( 'data', function( chunk ) {
  //     console.log('data')
  //     console.log(chunk.toString('hex'))
  //     responseData.push( chunk );
  //   });
  //   stream.on( 'end', function() {
  //     console.log(responseData)
  //     var finalData = Buffer.concat( responseData );
  //     response.write( finalData );
  //     response.end();
  //   });
  // }
});

// 启用gzip,需要放在最前面
app.use(compression());

app.use('/MAPI', proxyMiddleWare(proxyOption));
app.use(express.static(path.join(__dirname, 'public')));

const { getFakeChartData } = require('./mock/chart');

app.get('/api/fake_chart_data', function(req, res) {
  res.send(getFakeChartData);
});

app.post('/api/hospital/getHospitalList', function(req, res) {
  res.send({
    code: 0,
    recordCount: 2,
    data: [
      {
        hospitalId: 1000001,
        hospitalName: '第一人民医院',
      },
      {
        hospitalId: 1000002,
        hospitalName: '第二人民医院',
      },
      {
        hospitalId: 1000005,
        hospitalName: '第四人民医院',
      },
    ],
  });
});

var fs = require('fs');

var Encode = function(b) {
  var e = b.length;
  if (0 !== e % 8) {
    for (var a = '', c = 0; c < 8 - e % 8; c++) a += '\x00';
    b = a + b;
  }
  e = [];
  for (a = 0; a < b.length; a += 8)
    for (c = 0; 7 > c; c++)
      e.push(((b.charCodeAt(a + c) << (c + 1)) & 255) + (b.charCodeAt(a + c + 1) >> (6 - c)));
  b = Math.ceil(e.length / 3);
  a = Math.ceil(Math.sqrt(b));
  a = [a, Math.ceil(b / a)];
  b = a[0];
  a = a[1];

  return new Buffer(e);

  c = document.createElement('canvas');
  c.width = b;
  c.height = a;
  for (var d = c.getContext('2d'), f = d.createImageData(b, a), m = 0, g = 0; g < a; g++) {
    for (var h = 0; h < b; h++) {
      for (var l = 4 * (g * b + h), k = 0; 3 > k; k++) f.data[l + k] = e[m++];
      f.data[l + 3] = 255;
    }
  }
  d.putImageData(f, 0, 0);
  return c.toDataURL();
};
var Decode = function(b) {
  var e;
  e = [];
  var a = b.width,
    c = b.height,
    d = document.createElement('canvas');
  d.width = a;
  d.height = c;
  d = d.getContext('2d');
  d.drawImage(b, 0, 0);
  b = d.getImageData(0, 0, a, c);
  for (d = 0; d < a * c * 4; d += 4) [].push.apply(e, [].slice.call(b.data, d, d + 3));
  for (a = e.length - 1; 0 === e[a]; ) (e = e.slice(0, a)), a--;
  a = '';
  for (c = 0; c < e.length; c += 7)
    for (b = 0; 8 > b; b++)
      (d = (((0 == b ? 0 : e[c + b - 1]) << (7 - b)) & 127) + ((7 == b ? 0 : e[c + b]) >> (b + 1))),
        (a += 0 == d ? '' : String.fromCharCode(d));
  return a;
};

function StrEnCode(str) {
  let bf = [];

  //转变为 asc ii 码 的二进制表示方式
  for (let i = 0; i < str.length; i++) {
    bf.push(str.charCodeAt(i).toString(2));
  }
  //补齐为8的倍数
  for (let i = 0; i < 8 - str.length % 8; i++) {
    bf.unshift('0000000');
  }

  bf = bf.join('');
  let res = [];

  //7位一组，转变位 8位一组
  let rl = bf.length / 8;
  for (let i = 0; i < rl; i++) {
    res.push(parseInt(bf.slice(i * 8, i * 8 + 8), 2));
  }

  //转为色值数组 三个为一组
  let colors = [];
  let cl = Math.ceil(res.length / 3);
  for (let i = 0; i < cl; i++) {
    colors.push([res[i * 3] || 0, res[i * 3 + 1] || 0, res[i * 3 + 2] || 0, 255]);
    // colors.push([
    //   res[i * 3] || 0,
    //   res[i * 3 + 1] || 0,
    //   res[i * 3 + 2] || 0,
    //   255
    // ].join(","))
  }

  console.log(colors.join('|'));

  return colors;
}

console.log('===== 开始运行 ====');
app.listen(8077);
