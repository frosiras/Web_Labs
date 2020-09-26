
const express = require('express'), app = express();
const host = '127.0.0.1';
const port = 8080;

//1
app.get('/api/NagorodniukNikita/findFirst', function (request, response) {
    let answer = findFirst(request.query.str);
    response.send(answer);
});

//10
app.get('/api/NagorodniukNikita/upper', function (request, response) {
    let answer = upper(request.query.str);
    response.send(answer);
});
//13
app.get('/api/NagorodniukNikita/format', function (request, response) {
    response.send(format(parseFloat(request.query.num), request.query.raz));
});

app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));


function format(num, raz){
    if (raz > 0)
        num = num.toFixed(raz);
    else
        num = num.toFixed(0);
    return num;
}

function findFirst(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i == j) continue;
            if (arr[i] == arr[j]) {
                break;

            }
            if (j == arr.length - 1)
                return arr[i];
        }

    }
    if (arr.length>0)
        return arr[0];
    else
        return "Вы ввели пустую строку";
}

function upper(str) {
    let strNew = str.replace(/\d+/g, "");
    strNew = strNew.split(" ");
    let strKer = "";
    for (let i = 0; i < strNew.length; i++) {
        strKer += strNew[i].charAt(0).toUpperCase() + strNew[i].slice(1) + " ";
    }
    return strKer;
}