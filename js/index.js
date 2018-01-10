var secondbool = false;
var compute = false;
var displaing = false;
var negative = false;
var cashsetting = false;
var npvbool = false;
var npvrun = false;
var irrrun = false;
var initialcash = null;
var matharray = [];
var cashflow = [];
var cashfreq = [];
var cfposition = -1;
var irr = 0;
var npv = 0;
var npvrate = 0;
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
      if (isNaN(tempstr) == false) {
        if (negative == true) {
          document.getElementById('display').innerHTML = tempstr.substring(1);
          negative = false;
        } else {
          negative = true;
          document.getElementById('display').innerHTML = "-" + tempstr;
        }
      } else {
        var front = "";
        var nums = "";
        if (tempstr.indexOf("NPV") != -1) {
          front = tempstr.substring(0, 6);
          nums = tempstr.substring(6);
        } else if (tempstr.indexOf("I") != -1) {
          front = tempstr.substring(0, 4);
          nums = tempstr.substring(4);
        } else if (tempstr.indexOf("CF") != -1) {
          front = tempstr.substring(0, 6);
          nums = tempstr.substring(6);
        }
        if (negative == true) {
          nums = nums.substring(1);
          negative = false;
        } else {
          negative = true;
          nums = "-" + nums;
        }
        document.getElementById('display').innerHTML = front + nums;
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
    secondbool = false;
    cfposition = -1;
    cashflow = [];
    initialcash = null;
    cashsetting = false;
    npvbool = false;
    npv = 0;
    npvrate = 0;
    document.getElementById('display').innerHTML = "CLEAR ALL";
    setTimeout(function() {
      document.getElementById('display').innerHTML = "0";
    }, 250);
  } else {
    var tempstr = document.getElementById('display').innerHTML;
    if (tempstr.indexOf("NPV") != -1) {
      document.getElementById('display').innerHTML = "NPV = ";
    } else if (tempstr.indexOf("IRR") != -1) {
      document.getElementById('display').innerHTML = "IRR = ";
    } else if (tempstr.indexOf("CF") != -1) {
      document.getElementById('display').innerHTML = "CF" + (cfposition + 1) + " = ";
    } else if (tempstr.indexOf("I ") != -1) {
      document.getElementById('display').innerHTML = "I = ";
    } else {
      setTimeout(function() {
        document.getElementById('display').innerHTML = "0";
      }, 250);
    }
  }
  negative = false;
  compute = false;
  secondbool = false;
  matharray = [];
  document.getElementById('second').classList.remove('highlight');
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
  if (npvrun) {
    var text = document.getElementById('display').innerHTML;
    if (text.indexOf("NPV") != -1) {
      var arr = cashflow;
      arr.splice(0, 1);

      npv = NPV(npvrate, initialcash, arr); //int , initial , arr
      document.getElementById('display').innerHTML = "NPV = " + npv;
      npvrun = false;
      cashflow.unshift(initialcash);
    }
    //compute = false;
    npvrun = false;
  } else if (irrrun) {
    if (npvbool) {
      var text = document.getElementById('display').innerHTML;
      if (text.indexOf("IRR") != -1) {
        irr = IRR(npv, cashflow); //npv , arr
        document.getElementById('display').innerHTML = "IRR = " + irr;
      }
    }
    //compute = false;
    irrrun = false;
  }
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
    payment = PMT(future, nterms, rate, present); //fut , n , int , pres
    compute = false;
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

function entpress() {
  if (cashsetting) {
    var temp = document.getElementById('display').innerHTML;
    temp = temp.substring(5);
    cashflow[cfposition + 1] = temp;
    if (cfposition == -1) {
      initialcash = temp;
    }
    document.getElementById('display').innerHTML = "CF" + (cfposition + 1) + " = " + cashflow[cfposition + 1];
  } else if (npvbool) {
    var text = document.getElementById('display').innerHTML;
    if (text.indexOf("I") != -1) {
      text = text.substring(4);
      npvrate = text;
      document.getElementById('display').innerHTML = "I = " + npvrate;
    } else {
      text = text.substring(6);
      npv = text;
      document.getElementById('display').innerHTML = "NPV = " + npv;
    }
  }


  togglepress("enter");
}

function uppress() {


  if (cashsetting && cfposition > -1) {
    cfposition--;
    document.getElementById('display').innerHTML = "CF" + (cfposition + 1) + " = " + cashflow[cfposition + 1];
  } else if (npvbool) {
    if (npvrate == 0) {
      document.getElementById('display').innerHTML = "I = ";
    } else {
      document.getElementById('display').innerHTML = "I = " + npvrate;
    }

    npvrun = false;
    irrrun = true;
  }

  togglepress("up");
}

function downpress() {
  if (cashsetting && cashflow[cfposition + 1] != null) {
    cfposition++;
    if (cashflow[cfposition + 1] == null) {
      document.getElementById('display').innerHTML = "CF" + (cfposition + 1) + " = ";
    } else {
      document.getElementById('display').innerHTML = "CF" + (cfposition + 1) + " = " + cashflow[cfposition + 1];
    }

  } else if (npvbool) {
    document.getElementById('display').innerHTML = "NPV = " + npv;
    npvrun = true;
    irrrun = false;
  }

  togglepress("down");
}

function cfpress() {
  npvbool = false;
  cashsetting = true;
  cfposition = -1;
  if (initialcash == null) {
    document.getElementById('display').innerHTML = "CF0 = ";
  } else {
    document.getElementById('display').innerHTML = "CF0 = " + cashflow[0];
  }

  togglepress("cf");
}

function npvpress() {

  npvbool = true;

  if (npvrate == 0) {
    document.getElementById('display').innerHTML = "I = ";
  } else {
    document.getElementById('display').innerHTML = "I = " + npvrate;
  }


  cashsetting = false;
  togglepress("npv");
}

function irrpress() {

  irrrun = true;
  npvbool = true;
  cashsetting = false;
  document.getElementById('display').innerHTML = "IRR = " + irr;
  togglepress("irr");
}

function togglepress(id) {
  if ("vibrate" in navigator) {
    // vibration API supported
    navigator.vibrate(200); // vibrate for 200ms
  }
  var str = id;
  var elem = document.getElementById(str);
  elem.classList.add("highlight");
  setTimeout(function() {
    document.getElementById(id).classList.remove('highlight');
  }, 100);
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
  if (isNaN(str)) {
    str = "ERROR";
    setTimeout(function() {
      document.getElementById('display').innerHTML = "0";
    }, 500);
  }
  document.getElementById('display').innerHTML = str;
  matharray = [];
  negative = false;
  compute = false;
}

function runmath(arr) {
  var message = arr;
  var number = 0;
  var signs = ["*", "/", "+", "-"];
  var bool = true;
  while (arr.length > 2) {
    for (var i = 0; i < signs.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (signs[i] == arr[j]) {
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
          arr.splice((j - 1), 2);
          arr[j - 1] = number.toString();
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

function PMT(fut, n, int, pres) {
  if (fut == 0) {
    int = int / 100;
    var pay = 1 - Math.pow((1 + int), (n * -1));
    pay = (int * pres) / pay;
    return pay.toFixed(4);
  } else {
    return "Error";
  }
}


function PV(fut, n, int, pay) {
  if (pay == 0) {
    int = int / 100;
    var pv = fut / (Math.pow((1 + int), n));
    pv = pv * -1;
    pv = Math.round(pv * 100) / 100;
    return pv;
  } else {
    if (fut == 0) {
      int = int / 100;
      var pv = Math.pow(1 + int, n * -1);
      pv = (1 - pv) / int;
      pv = pv * pay;
      return pv.toFixed(4);;
    } else {
      return "Error";
    }
  }

}

function FV(pres, n, int, pay) {
  if (pay == 0) {
    int = int / 100;
    var fv = (pres * -1) * (Math.pow((1 + int), n));
    fv = Math.round(fv * 100) / 100;
    return fv;
  } else {
    if (pres == 0) {
      int = int / 100;
      var fv = Math.pow((1 + int), n) - 1;
      fv = pay * (fv / int);
      return fv.toFixed(4);
    } else {
      return "Error";
    }
  }

}

function RATE(pres, n, fut, pay) {
  if (pay == 0) {
    var number = fut / (pres * -1);
    var rate = (Math.pow(number, (1 / n))) - 1;
    rate = Math.round(rate * 10000) / 100;
    return rate;
  } else {
    pres = parseFloat(pres);
    n = parseFloat(n);
    fut = parseFloat(fut);
    pay = parseFloat(pay);
    pres = (pres * -1);
    var ytm = (pay + ((fut - pres) / n)) / ((fut + pres) / 2);
    ytm = Math.round(ytm * 10000) / 100;
    return ytm;
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

function NPV(int, initial, arr) {
  //initial = (initial * -1);
  initial = parseFloat(initial);
  var npv = 0;
  int = int / 100;

  for (var i = 0; i < arr.length; i++) {
    var number = parseFloat(arr[i]);
    var t = i + 1;
    npv += number / (Math.pow((1 + int), t));
  }
  npv = npv + initial;
  npv = Math.round(npv * 100) / 100;


  return npv;
}

function IRR(npv, arr) {
  irr = -1;
  var sum = 10;
  while (sum != 0) {
    sum = 0;
    irr += 0.000001;
    for (var i = 0; i < arr.length; i++) {

      sum += arr[i] / Math.pow((1 + irr), i);

    }
    if (sum < (npv + 10) && sum > (npv - 10)) {
      sum = 0;
    } else if (irr > 1) {
      irr = "error";
      sum = 0;
    }

  }
  irr = irr * 100;
  if (isNaN(irr) == false) {
    irr = irr.toFixed(4);
  }
  return irr;
}
