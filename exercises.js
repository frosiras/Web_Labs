let findFirst = function findFirstSymbol(arr) {
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
}

let t13d = function t13(str, num) {
    return str.toFixed(num);
}

let upper = function toUpper(str) {
    let strNew = str.split(" ");
    let strKer = "";
    for (let i = 0; i < strNew.length; i++) {
        strKer += strNew[i][0].toUpperCase() + strNew[i].slice(1) + " ";
    }
    return strKer;
}

let combination = function combinationOfAll(arr) {
    let response = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++)
            response.push(arr[i] * arr[j]);
    }
    return response
}


const express = require('express');

const app = express();

app.get('/findFirst', function (request, response) {
    let answer = findFirst(request.query.str);
    response.send(answer);
});
app.get('/combination', function (request, response) {
    let answer = combination(request.query.arr);
    response.send(answer);
});
app.get('/upper', function (request, response) {
    let answer = upper(request.query.str);
    response.send(answer);
});


app.listen(8080);

//mod 23, +10(mod 23), +20 mod 23
//13, 1, 10
function weekDay(str) {

}