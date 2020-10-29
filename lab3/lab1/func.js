function upper(str) {
    let strNew = str.replace(/\d+/g, "");
    strNew = strNew.split(" ");
    let strKer = "";
    for (let i = 0; i < strNew.length; i++) {
        strKer += strNew[i].charAt(0).toUpperCase() + strNew[i].slice(1) + " ";
    }
    return strKer;
}
function findFirst(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i === j) continue;
            if (arr[i] === arr[j]) {
                break;

            }
            if (j === arr.length - 1)
                return arr[i];
        }

    }
    if (arr.length>0)
        return arr[0];
    else
        return "Вы ввели пустую строку";
}
function format(num, raz){
    num = parseFloat(num);
    if (raz > 0)
        num = num.toFixed(raz);
    else
        num = num.toFixed(0);
    return num;
}
module.exports.upper = upper;
module.exports.findFirst = findFirst;
module.exports.format = format;
