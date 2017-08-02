var request = require('request');


var _html = '弹幕攻击黄文跟！' + Math.random();
//发送https://www.iviewui.com/ 官网弹幕
for (var i = 0; i < 10; i++) {
    request.post({ url: 'https://www.iviewui.com/barrage/add', form: { text: _html } }, function(error, response, body) {
        console.log(body);
        if (!error && response.statusCode == 200) {
            console.log('执行成功');
        } else {
            console.log(error);
        }
    })
}

// request({
//     url: 'https://www.iviewui.com/barrage/add',
//     method: "POST",
//     json: true,
//     headers: {
//         "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
//         "cookie": "Hm_lvt_91d4d97aeea60cc72e4822c0aa248da6=1501206401,1501206580,1501206808,1501207209; Hm_lpvt_91d4d97aeea60cc72e4822c0aa248da6=1501207209; _ga=GA1.2.629621300.1496912018; _gid=GA1.2.74130100.1501206401",
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
//         "Origin": "https://www.iviewui.com",
//         "Referer": "https://www.iviewui.com/"
//     },
//     body: JSON.stringify({ text: "赛飞软件" })
// }, function(error, response, body) {
//     console.log(body);
//     // console.log(response);
//     if (!error && response.statusCode == 200) {
//         console.log('执行成功');
//     } else {
//         console.log(error);
//     }
// });