let arr_value = [];
let arr_hitung = [];
const operator = ["+", "-", "x", "/"];
let tampilkan = 0;
let isHitung = false;

function onClick(event) {
  if (event.target.tagName !== "BUTTON") {
    return;
  }

  let buttonValue = event.target.innerText;

  if (buttonValue === "AC") {
    isHitung = false;
    tampilkan = 0;
    arr_value = [];
    arr_hitung = [];
  } else if (buttonValue === "Del") {
    arr_value.pop();
    tampilkan = arrToNum(arr_value);
  } else if (buttonValue === "=") {
    arr_hitung.push(arrToNum(arr_value));
    tampilkan = hitung(arr_hitung);
    arr_value = [];
  } else {
    if (operator.find((val) => buttonValue == val) != undefined) {
      if (isHitung) {
        if (arr_value.length > 0) {
          arr_hitung.push(arrToNum(arr_value));
        }
        arr_hitung.push(buttonValue);
        arr_value = [];
      }
    } else {
      isHitung = true;
      arr_value.push(buttonValue);
      tampilkan = arrToNum(arr_value);
    }
  }
  console.log(arr_hitung);

  document.getElementById("layar").innerText = tampilkan;
}

document.getElementById("layar").innerText = tampilkan;
document.querySelector(".kalkulator").addEventListener("click", onClick);

function arrToNum(arr) {
  var res = 0;
  var satuan = 1;
  for (let i = arr.length - 1; i >= 0; i--) {
    res += satuan * arr[i];
    satuan *= 10;
  }
  return res;
}

function hitung(arr) {
  var len = arr.length;
  var i = 0;
  while (["x", "/"].filter((x) => arr.includes(x)).length > 0 && i < len) {
    if (["x", "/"].includes(arr[i])) {
      var temp = 0;
      if (arr[i] == "x") {
        temp = arr[i - 1] * arr[i + 1];
      } else if (arr[i] == "/") {
        temp = arr[i - 1] / arr[i + 1];
      }
      arr[i] = temp;
      arr.splice(i - 1, 1);
      arr.splice(i, 1);
      len -= 2;
    } else {
      i++;
    }
  }

  len = arr.length;
  i = 0;
  while (["+", "-"].filter((x) => arr.includes(x)).length > 0 && i < len) {
    if (["+", "-"].includes(arr[i])) {
      var temp = 0;
      if (arr[i] == "+") {
        temp = arr[i - 1] + arr[i + 1];
      } else if (arr[i] == "-") {
        temp = arr[i - 1] - arr[i + 1];
      }
      arr[i] = temp;
      arr.splice(i - 1, 1);
      arr.splice(i, 1);
      len -= 2;
    } else {
      i++;
    }
  }

  return arr[0];
}
