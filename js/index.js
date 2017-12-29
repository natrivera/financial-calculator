var secondbool = false;
var compute = false;
var displaing = false;
var negative = false;
var matharray = [];

var nterms = 0;
var rate = 0;
var payment = 0;
var future = 0;
var present = 0;

function addnumber(arg) {

  if (displaing) {
    document.getElementById('display').innerHTML = "0";
    displaing = false;
  }
  if (arg == 'decimal' || arg == 'sign') {
    if (arg == 'sign') {
      var tempstr = document.getElementById('display').innerHTML;
      if (negative == true) {
        document.getElementById('display').innerHTML = tempstr.substring(1);;
        negative = false;
      } else {
        negative = true;
        document.getElementById('display').innerHTML = "-" + tempstr;
      }
      togglepress('sign');
    } else if (arg == 'decimal') {
      var tempstr = document.getElementById('display').innerHTML;
      if (tempstr.indexOf('.') !== -1) {

      } else {
        document.getElementById('display').innerHTML = tempstr + ".";
      }
      togglepress('decimal');
    }
  } else {
    var displaytext = document.getElementById('display').innerHTML;
    if (displaytext == "0") {
      var temp = arg.toString();
      document.getElementById('display').innerHTML = temp;
    } else {
      var temp = arg.toString();
      document.getElementById('display').innerHTML += temp;
    }

  }
  var str = "w" + arg.toString();
  togglepress(str);
} //end of addnumber

function clearbutt() {
  if (secondbool == true) {
    nterms = 0;
    rate = 0;
    payment = 0;
    future = 0;
    present = 0;
    document.getElementById('second').classList.remove('highlight');
    secondbool = false;
  }
  compute = false;
  secondbool = false;
  matharray = [];
  document.getElementById('second').classList.remove('highlight');
  document.getElementById('display').innerHTML = "0";
  togglepress("clr");
}

function second() {
  secondbool = true;
  document.getElementById('second').classList.add('highlight');
}

function cptpress() {
  matharray = [];
  compute = true;
  togglepress("compute");
}

function npress() {
  matharray = [];
  if (compute) {
    nterms = TERM(present, rate, future, payment); //pres , rate , fut , pay
    compute = false;
  } else {
    if (!displaing) {
      var temp = document.getElementById('display').innerHTML;
      nterms = temp;
    }
  }
  document.getElementById('display').innerHTML = "N =    " + nterms.toString();
  displaing = true;
  togglepress("number");
}

function ipress() {
  matharray = [];
  if (compute) {
    rate = RATE(present, nterms, future, payment); //pres , n , fut , pay
    compute = false;
  } else {
    if (!displaing) {
      var temp = document.getElementById('display').innerHTML;
      rate = temp;
    }
  }
  document.getElementById('display').innerHTML = "I/Y =    " + rate.toString();
  displaing = true;
  togglepress("rate");
}

function paypress() {
  matharray = [];
  if (compute) {

  } else {
    if (!displaing) {
      var temp = document.getElementById('display').innerHTML;
      payment = temp;
    }
  }
  document.getElementById('display').innerHTML = "PMT =   " + payment.toString();
  displaing = true;
  togglepress("payment");
}

function prepress() {
  matharray = [];
  if (compute) {
    present = PV(future, nterms, rate, payment);
    compute = false;
  } else {
    if (!displaing) {
      var temp = document.getElementById('display').innerHTML;
      present = temp;
    }
  }
  document.getElementById('display').innerHTML = "PV =   " + present.toString();
  displaing = true;
  togglepress("present");
}

function futpress() {
  matharray = [];
  if (compute) {
    future = FV(present, nterms, rate, payment);
    compute = false;
  } else {
    if (!displaing) {
      var temp = document.getElementById('display').innerHTML;
      future = temp;
    }
  }
  document.getElementById('display').innerHTML = "FV =   " + future.toString();
  displaing = true;
  togglepress("future");
}

function togglepress(id) {
  var str = id;
  var elem = document.getElementById(str);
  elem.classList.add("highlight");
  setTimeout(function() {
    document.getElementById(id).classList.remove('highlight');
  }, 200);
}

function plus() {
  var temp = document.getElementById('display').innerHTML;
  if (isNaN(temp)) {
    matharray.pop();
    matharray.push("+");
  } else {
    matharray.push(temp);
    matharray.push("+");
  }
  document.getElementById('display').innerHTML = "+";
  displaing = true;
}

function minus() {
  var temp = document.getElementById('display').innerHTML;
  if (isNaN(temp)) {
    matharray.pop();
    matharray.push("-");
  } else {
    matharray.push(temp);
    matharray.push("-");
  }
  document.getElementById('display').innerHTML = "-";
  displaing = true;
}

function times() {
  var temp = document.getElementById('display').innerHTML;
  if (isNaN(temp)) {
    matharray.pop();
    matharray.push("*");
  } else {
    matharray.push(temp);
    matharray.push("*");
  }
  document.getElementById('display').innerHTML = "x";
  displaing = true;
}

function divide() {
  var temp = document.getElementById('display').innerHTML;
  if (isNaN(temp)) {
    matharray.pop();
    matharray.push("/");
  } else {
    matharray.push(temp);
    matharray.push("/");
  }

  document.getElementById('display').innerHTML = "&#247;";
  displaing = true;
}

function equals() {
  var temp = document.getElementById('display').innerHTML;
  matharray.push(temp);
  //console.log(matharray);
  var str = runmath(matharray);
  document.getElementById('display').innerHTML = str;
  matharray = [];
  negative = false;
  compute = false;
}

function runmath(arr) {
  var message = arr;
  var number = 0;
  var signs = ["*", "/", "+", "-"];
  // for (var i = 0; i < signs.length; i++) {
  //   for (var j = 0; j < arr.length; j++) {
  //     if (signs[i] == arr[j]) {
  //       var num1 = parseFloat(arr[j - 1]);
  //       var num2 = parseFloat(arr[j + 1]);
  //       if (signs[i] == "*") {
  //         number = num1 * num2;
  //       }
  //       if (signs[i] == "/") {
  //         number = num1 / num2;
  //       }
  //       if (signs[i] == "+") {
  //         number = num1 + num2;
  //       }
  //       if (signs[i] == "-") {
  //         number = num1 - num2;
  //       }
  //     }
  //   }
  // }
var bool = true;
  while (arr.length > 2) {
    for(var i = 0; i < signs.length; i++) {
      for(var j = 0; j < arr.length; j++) {
        if(signs[i] == arr[j]) {
          var num1 = parseFloat(arr[j - 1]);
          var num2 = parseFloat(arr[j + 1]);
          var number = 0;
                if (signs[i] == "*") {
                  number = num1 * num2;
                }
                if (signs[i] == "/") {
                  number = num1 / num2;
                }
                if (signs[i] == "+") {
                  number = num1 + num2;
                }
                if (signs[i] == "-") {
                  number = num1 - num2;
                }
          //console.log(arr);
          arr.splice((j - 1) , 2);
          arr[j -1] = number.toString();
          //console.log(arr);
        }
      }
    }
    number = arr[0];
    bool = false;
  }
  message = number;
  return message;
}


function PV(fut, n, int, pay) {
  if (pay == 0) {
    int = int / 100;
    var pv = fut / (Math.pow((1 + int), n));
    pv = pv * -1;
    pv = Math.round(pv * 100) / 100;
    return pv;
  }

}

function FV(pres, n, int, pay) {
  if (pay == 0) {
    int = int / 100;
    var fv = (pres * -1) * (Math.pow((1 + int), n));
    fv = Math.round(fv * 100) / 100;
    return fv;
  }

}

function RATE(pres, n, fut, pay) {
  if (pay == 0) {
    var number = fut / (pres * -1);
    var rate = (Math.pow(number, (1 / n))) - 1;
    rate = Math.round(rate * 10000) / 100;
    return rate;
  }

}

function TERM(pres, rate, fut, pay) {
  if (pay == 0) {
    rate = rate / 100;
    var number = fut / (pres * -1);
    var terms = Math.log(number) / Math.log(1 + rate);
    terms = Math.round(terms * 100) / 100;
    return terms;
  }

}
