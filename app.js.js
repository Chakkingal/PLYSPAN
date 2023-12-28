const slbThk = document.querySelector("#slabThickness");
const plyType = document.querySelector("#SelectPly");
const dynamicLoadcheck = document.querySelector("#dynamicLoadCheckbox");
const dynamicLoadValue = document.querySelector("#dynamicLoadValue");
const lockSpacing = document.querySelector("#lockSpacing");



function spacing() {
  if (slbThk.value > 0 && slbThk.value < 264) {
    document.querySelector("#h20Spacing").value = 1;
  } else if (slbThk.value > 263 && slbThk.value< 577) {
    document.querySelector("#h20Spacing").value = 2;    
  } else if (slbThk.value > 576 && slbThk.value < 1050) {
    document.querySelector("#h20Spacing").value = 3;
  } else if (slbThk.value > 1049 && slbThk.value< 1552) {
    document.querySelector("#h20Spacing").value = 4;
  } else if (slbThk.value > 1551 && slbThk.value < 2040) {
    document.querySelector("#h20Spacing").value = 5;
  } else if (slbThk.value > 2039 && slbThk.value < 2602) {
    document.querySelector("#h20Spacing").value = 6;
  } else if (slbThk.value > 2601 && slbThk.value < 3220) {
    document.querySelector("#h20Spacing").value = 7;
  } else if (slbThk.value > 3219 && slbThk.value < 3785) {
    document.querySelector("#h20Spacing").value = 8;
  } else if (slbThk.value > 3784 && slbThk.value <= 4455) {
    document.querySelector("#h20Spacing").value = 9;
  } else if (slbThk.value > 4455 || slbThk.value < 0) {
    document.querySelector("#h20Spacing").value = 10;
  } else {
    document.querySelector("#h20Spacing").value = 0;
  }
}

document.querySelector("#slabThickness").addEventListener("input", function () {
  if (lockSpacing.checked) {
  } else {
    spacing();// working    
    loadCalculation();
    // chkShear();
    // chkBm();
    // chkDf();
  }
});


function loadCalculation () {
  let D= parseInt(document.querySelector("#slabThickness").value)
  let h20Spacing = parseInt(document.querySelector("#h20Spacing").options[document.querySelector("#h20Spacing").selectedIndex].text)
  let fWLoad = parseFloat(0.4);
  let concLoad = parseFloat(26 * (D/ 1000));
  const ll=liveLoad(concLoad)
  let W = concLoad + fWLoad + ll
  document.querySelector("#totalLoad").value = W
  document.querySelector("#loadOnSecondary").value = (W * (h20Spacing/1000)).toFixed(2)
  //  console.log(spacing)
}



function liveLoad(x) {
  ll = x * 0.2;
  if (ll < 1.5) {
    return 1.5;
  } else if (ll> 1.5 && ll < 5) {
    return ll;
  } else if (ll > 5) {
    return 5;
  }
}



dynamicLoadcheck.addEventListener("input", function () {
  if (dynamicLoadcheck.checked) {
    dynamicLoadValue.disabled = false;
  } else {
    dynamicLoadValue.disabled = true;
  }
});

dynamicLoadValue.addEventListener("input", function () {
  if (dynamicLoadValue.value < 1 || dynamicLoadValue.value > 10) {
    dynamicLoadValue.value = "";
    alert("Enter number between 1 and 10");
  }
});

// function permissibles(){
//    if(plyType.value === "Select item"){
//     alert("Select plywood type")
//    }else if(plyType.value === 1){
//     findPermissibleDeflection()
//     document.querySelector("#permissibleShear").value = "6.34 kN/m"
//     document.querySelector("#permissibleBm").value = "0.456 kNm/m"
//     document.querySelector("#permissibleShear").value =
//    }
// }
// function chkShear() {
//   document.querySelector("#permissibleShear").value = "checking shear";
// }

// function chkBm() {
//   document.querySelector("#permissibleBm").value = "checking bending moment";
// }

// function chkDf() {
//   document.querySelector("#permissibleDeflection").value =
//     "checking deflection";
// }



// check if dynamic load is checked if checked ask user to enter value in percentage
// const dynamicLoadcheck = document.querySelector("#dynamicLoadCheckbox");
// const dynamicLoad = document.querySelector("#dynamicLoadValue");
// let dynamicLoadValue = 0;
// dynamicLoadcheck.addEventListener("input", function () {
//   if (dynamicLoadcheck.checked) {
//     dynamicLoad.readOnly = false;
//   } else {
//     dynamicLoad.readOnly = true;
//   }
// });
//   limit user to enter a value between 1 and 10 )
// dynamicLoad.addEventListener("input", function () {
//   if (dynamicLoad.value < 1 || dynamicLoad.value > 10) {
//     dynamicLoad.value = "";
//     alert("Enter number between 1 and 10");
//   }
//   dynamicLoadValue = dynamicLoad.value;
// });