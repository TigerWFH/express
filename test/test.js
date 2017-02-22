const fs = require('fs');
const path = require('path');
console.log('我要读数据了');
let data = fs.readFileSync(path.join(__dirname, '\\config.js'), 'utf8');//方案1
// let data = new Promise((resolve, reject) => {//方案2
//     fs.readFile(path.join(__dirname, '\\config.js'), 'utf8', (err, data) => {
//         if (err) {
//             reject(err);
//             return;
//         }
//         resolve(data);
//     });
// });
if (data) {//方案1
    console.log('读取的数据--->\n');
    console.log(data);
}
else {
    console.log('no data!');
}
// data.then((data) => {//方案2
//     console.log('读取的数据--->\n');
//     console.log(data);
// }, err => {
//     console.log('no data!');
// })
