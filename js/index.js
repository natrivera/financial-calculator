var secondbool = false;

function addnumber(arg) {
  if (arg == '.' || arg == 'w') {

  } else {
    var displaytext = document.getElementById('display').innerHTML;
    if(displaytext == "0") {
      var temp = arg.toString();
      document.getElementById('display').innerHTML = temp;
    } else {
      var temp = arg.toString();
      document.getElementById('display').innerHTML += temp;
    }

  }
} //end of addnumber

function clearbutt() {
  document.getElementById('display').innerHTML = "0";
}

function second() {
  secondbool = true;
}

function plus() {}

function minus() {}

function times() {}

function division() {}

function solve() {

}
