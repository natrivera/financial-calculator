var secondbool = false;
var compute = false;
var displaing = false;

var nterms = 0;
var rate = 0;
var payment = 0;
var future = 0;
var present = 0;

function addnumber(arg) {

  if (displaing) {
    clearbutt();
    displaing = false;
  }
  if (arg == '.' || arg == 'w') {

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
  if(secondbool == true) {
    nterms = 0;
    rate = 0;
    payment = 0;
    future = 0;
    present = 0;
    document.getElementById('second').classList.remove('highlight');
    alert("help");
    secondbool = false;
  }
  compute = false;
  secondbool = false;
  document.getElementById('second').classList.remove('highlight');
  document.getElementById('display').innerHTML = "0";
  togglepress("clr");
}

function second() {
  secondbool = true;
  document.getElementById('second').classList.add('highlight');
}

function cptpress() {
  compute = true;
  togglepress("compute");
}

function npress() {
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
  document.getElementById(id).classList.add("highlight");
  setTimeout(function() {
    document.getElementById(id).classList.remove('highlight');
  },300);
}

function plus() {}

function minus() {}

function times() {}

function division() {}

function solve() {}


function PV(fut, n, int, pay) {
  if (pay == 0) {
    int = int / 100;
    var pv = fut / (Math.pow((1 + int), n));
    pv = Math.round(pv * 100) / 100;
    return pv;
  }

}

function FV(pres, n, int, pay) {
  if (pay == 0) {
    int = int / 100;
    var fv = pres * (Math.pow((1 + int), n));
    fv = Math.round(fv * 100) / 100;
    return fv;
  }

}

function RATE(pres, n, fut, pay) {
  if (pay == 0) {
    var number = fut / pres;
    var rate = (Math.pow(number, (1 / n))) - 1;
    rate = Math.round(rate * 10000) / 100;
    return rate;
  }

}

function TERM(pres, rate, fut, pay) {
  if (pay == 0) {
    rate = rate / 100;
    var number = fut / pres;
    var terms = Math.log(number) / Math.log(1 + rate);
    terms = Math.round(terms * 100) / 100;
    return terms;
  }

}
