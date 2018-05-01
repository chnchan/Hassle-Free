var RBMode = document.getElementById('RBButton');
var GMode = document.getElementById('groceryButton');
var BackButton = document.querySelectorAll('.back');
var CalcButton = document.querySelectorAll('.calc');
var MoreButton = document.querySelectorAll('.button2');
var Names = document.querySelectorAll('span');
var NameInputs = document.querySelectorAll('.nameInput');

//RBMode.addEventListener("click", funct);
GMode.addEventListener("click", nextPage);

for (var i = 0; i < BackButton.length; i++)
  BackButton[i].addEventListener("click", nextPage);

for (var i = 0; i < CalcButton.length; i++)
  CalcButton[i].addEventListener("click", calculate);

for (var i = 0; i < MoreButton.length; i++)
  MoreButton[i].addEventListener("click", moreInput);

for (var i = 0; i < Names.length; i++)
  Names[i].addEventListener("click", inputMode);

for (var i = 0; i < NameInputs.length; i++)
{
  NameInputs[i].addEventListener("blur", saveInput);
  NameInputs[i].addEventListener("keypress", checkForEnter);
}

function calculate()
{
  var parentID = this.attributes["data-parent"].value;
  var parent = document.getElementById(parentID);
  var classID = this.attributes["data-target"].value;
  var classPeople = parent.getElementsByClassName(classID);
  var sum = 0;
  var ALLcount = 0;

  for (var i = 0; i < classPeople.length; i++)
  {
    var pA = classPeople[i].querySelectorAll('.price');
    var qA = classPeople[i].querySelectorAll('.quantity');
    var sumDisplay = classPeople[i].querySelector('.editable');
    var checkBox = classPeople[i].querySelector('.checkbox');
    var sum = 0;

    if (checkBox != null && checkBox.checked == true)
      ALLcount++;

    for (var j = 0; j < pA.length; j++)
    {
      var price = pA[j].value || 0;
      var quantity = qA[j].value || 1;
      sum += price*quantity;
    }

    sumDisplay.innerHTML = sum.toFixed(3);
  } // calculate total of each column

  var ALLsum = document.getElementById('ALL').innerHTML;
  ALLsum = ALLsum / ALLcount;

  for (var i = 0; i < classPeople.length; i++)
  {
    var checkBox = classPeople[i].querySelector('.checkbox');

    if (checkBox == null)
      continue;
    else
    {
      var sumDisplay = classPeople[i].querySelector('.editable');
      var resultDisplay = document.querySelectorAll('.results');
      var sum = parseFloat(sumDisplay.innerHTML);

      if (checkBox.checked == true)
        sum += ALLsum;

      resultDisplay[i-1].innerHTML = Math.round(sum*100 +0.001)/100;
    }
  } // divide ALL and add to corresponding column total
} // calculate()


function checkForEnter(event)
{
  if (event.which == 13)
   saveInput.call(this);
}


function inputMode()
{
  var inputBox = this.parentNode.querySelector(".nameInput");
  inputBox.placeholder = this.innerHTML;
  if (inputBox != null)
    this.classList.add("hide");
  inputBox.classList.remove("hide");
  inputBox.focus();
}

function saveInput()
{
  var name = this.parentNode.querySelector("span");
  if (this.value != "")
    name.innerHTML = this.value;
  this.value = "";
  this.classList.add("hide");
  name.classList.remove("hide");
}


function moreInput()
{
  var parentID = this.attributes["data-parent"].value;
  var targetClass = this.attributes["data-target"].value;
  var addMore = document.getElementById(parentID).getElementsByClassName(targetClass)[0];
  addMore.innerHTML = '<div class="center"><input type="text" value="" class="input price pA" placeholder="$"/> x <input type="text" value="" class="input quantity qA" placeholder="1"/></div>';
  addMore.classList.remove("addMore");
  addMore.innerHTML += '<div class="addMore"></div>';
  //document.getElementById("grocery").scrollBy(0, 100);
} // moreInput()


function nextPage()
{
  var parentID = this.attributes["data-parent"].value;
  var targetID = this.attributes["data-target"].value;
  var targetsID = targetID.split(" ");
  var parentsID = parentID.split(" ");

  for (var i = 0; i < parentsID.length; i++)
    document.getElementById(parentsID[i]).classList.add("hide");

  for (var i = 0; i < targetsID.length; i++)
    document.getElementById(targetsID[i]).classList.remove("hide");
} // NextPage()
