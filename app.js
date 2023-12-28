// global variables declaration
let h20Spacing = 0;
let p = 0;
let b = 0;
let y = "";
let shear;
let d = 0;
let EI = 0
plySelected = "";
let slbThk = document.querySelector("#slabThickness");

//  preselect ply wood and set permissibles starts here
plySelected =
  document.querySelector("#SelectPly").options[
    document.querySelector("#SelectPly").selectedIndex
  ].text;
permissbleShear = "6.34 kN/m";
permissbleBm = "0.456 kNm/m";
permissibleDeflection = "";
EI = 3.26

//  preselect ply wood and set permissibles ends here

let spacing = slbThk.addEventListener("input", function (e) {
  // limit user from entering a value morethan 4455 for plywood spacing check starts here
  let x = y;
  y = e.target.value;
  if (e.target.value > 4455) {
    slbThk.value = x;
    y = x;
    x = 0;
    // limit user from entering a value morethan 4455 for plywood spacing check ends here
  } else {
    if (document.querySelector("#lockSpacing").checked) {
    } else {
      changeH20Spacing(slbThk);
    }
    conLoadCalc();
  }
});
// change spacing of secondary beams based on skabthickness input box

document.querySelector("#lockSpacing").addEventListener("input", function () {
  this.classList.toggle("checkBoxBg");
});

function changeH20Spacing(thk) {
  if (thk.value > 0 && thk.value < 264) {
    document.querySelector("#h20Spacing").value = 1;
    h20Spacing = 610;
  } else if (thk.value > 263 && thk.value < 577) {
    document.querySelector("#h20Spacing").value = 2;
    h20Spacing = 488;
  } else if (thk.value > 576 && thk.value < 1050) {
    document.querySelector("#h20Spacing").value = 3;
    h20Spacing = 407;
  } else if (thk.value > 1049 && thk.value < 1552) {
    document.querySelector("#h20Spacing").value = 4;
    h20Spacing = 345;
  } else if (thk.value > 1551 && thk.value < 2040) {
    document.querySelector("#h20Spacing").value = 5;
    h20Spacing = 305;
  } else if (thk.value > 2039 && thk.value < 2602) {
    document.querySelector("#h20Spacing").value = 6;
    h20Spacing = 271;
  } else if (thk.value > 2601 && thk.value < 3220) {
    document.querySelector("#h20Spacing").value = 7;
    h20Spacing = 244;
  } else if (thk.value > 3219 && thk.value < 3785) {
    document.querySelector("#h20Spacing").value = 8;
    h20Spacing = 222;
  } else if (thk.value > 3784 && thk.value <= 4455) {
    document.querySelector("#h20Spacing").value = 9;
    h20Spacing = 203;
  } else if (thk.value > 4455 || thk.value < 0) {
    document.querySelector("#h20Spacing").value = 0;
    h20Spacing = 0;
  } else {
    document.querySelector("#h20Spacing").value = 0;
    h20Spacing = 0;
  }
}
document.querySelector("#h20Spacing").addEventListener("input", function () {
  h20Spacing =
    document.querySelector("#h20Spacing").options[
      document.querySelector("#h20Spacing").selectedIndex
    ].text;
  conLoadCalc();
});
function conLoadCalc() {
  if (slbThk.value > 0) {
    let y = slbThk.value;
    let g = 0.4;
    let b = (26 * y) / 1000;
    let p = ll(b);
    let d = (parseFloat(b) + parseFloat(g) + parseFloat(p)).toFixed(2);
  
    document.querySelector("#totalLoad").value = d+" kN/m2"
    if (isNaN(d)||isNaN(parseFloat(h20Spacing))) {
      document.querySelector("#loadOnSecondary").value = "";
    } else {
      document.querySelector("#loadOnSecondary").value = (
        parseFloat(d) * parseFloat(h20Spacing / 1000)
      ).toFixed(2)+" kN/m"
    }
    setPermissibles();
    shearChk();
    bmCheck();
    deflectionCheck();
    }else{
      const allResults = document.querySelectorAll('.results')
        for(let result of allResults){
          result.value = ""
        }
    }
}

function ll(b) {
  if (b * 0.2 < 1.5) {
    x = 1.5;
  } else if (b * 0.2 > 1.5 && b * 0.2 < 5) {
    x = (b * 0.2).toFixed(2);
  } else if (b * 0.2 > 5) {
    x = 5;
  }
  return x;
}

document.querySelector("#SelectPly").addEventListener("input", function () {
  plySelected =
    document.querySelector("#SelectPly").options[
      document.querySelector("#SelectPly").selectedIndex
    ].value;
  setPermissibles();
});

function setPermissibles() {
  if (slbThk.value > 0) {
    if (plySelected == 1) {
      permissbleShear = "6.34 kN/m";
      permissbleBm = "0.456 kNm/m";
      EI = 3.26
    } else if (plySelected == 2) {
      permissbleShear = "15.45 kN/m";
      permissbleBm = "0.73 kNm/m";
      EI = 3.28
    } else if (plySelected == 3) {
      permissbleShear = "8.12 kN/m";
      permissbleBm = "0.602 kNm/m";
      EI = 3.93
    } else if (plySelected == 4) {
      permissbleShear = "6.7 kN/m";
      permissbleBm = "0.536 kNm/m";
      EI = 3.72
    }
    // console.log(plySelected)
  }
  if (h20Spacing > 0) {
    permissibleDeflection = parseFloat(h20Spacing / 270).toFixed(3);
    document.querySelector("#permissibleShear").value = permissbleShear;
    document.querySelector("#permissibleBm").value = permissbleBm;
    document.querySelector("#permissibleDeflection").value =
      permissibleDeflection;
  } else {
    document.querySelector("#permissibleShear").value = "";
    document.querySelector("#permissibleBm").value = "";
    document.querySelector("#permissibleDeflection").value = "";
  }
}
function shearChk() {  
  // Maximum shear force,(0.525(L-b-t)/L)WxL
  let L = parseFloat(h20Spacing)/1000
  let W =parseFloat(document.querySelector("#totalLoad").value)
  let b = .08
  let t = .018
  shear = (0.525*(L-b-t)/L)*(W*L)
  if(shear>0){
    document.querySelector("#actualShear").value = (shear).toFixed(3) +" kN/m"
    if(shear>(parseFloat(document.querySelector("#permissibleShear").value))){
      document.querySelector("#remarkShear").value ="Shear Exceeded"
     document.querySelector("#remarkShear").addClassList('warning')
      
    }else{
      document.querySelector("#remarkShear").value =""
  }
  }else{
    document.querySelector("#actualShear").value=""
    document.querySelector("#remarkShear").value =""
  }
 }
function bmCheck() {
  // Maximum Bending moment, 0.1WL²
  let L = parseFloat(h20Spacing)/1000
  let W =parseFloat(document.querySelector("#totalLoad").value)
  bm = 0.1*W*(Math.pow(L,2))
  if(bm>0){
    document.querySelector("#actualBm").value = (bm).toFixed(3) +" kNm/m"
    if(bm>(parseFloat(document.querySelector("#permissibleBm").value))){
      document.querySelector("#remarkBm").value ="Bending Moment Exceeded"
     
    }else{
      document.querySelector("#remarkBm").value =""
  }
  }else{
    document.querySelector("#actualBm").value=""
    document.querySelector("#remarkBm").value =""
  }
}
function deflectionCheck() {
  // Maximum deflection, 0.0068(WL)4/EI
  let L = parseFloat(h20Spacing)/1000
  let W =parseFloat(document.querySelector("#totalLoad").value)
  def = 0.0068*((W*Math.pow(L,4))/EI)*1000
  if(def > 0){
    document.querySelector("#actualDeflection").value = (def).toFixed(3) +" mm"
      if(def>(parseFloat(document.querySelector("#permissibleDeflection").value))){
        document.querySelector("#remarkDeflection").value ="Deflection Exceeded"
     
      }else{
        document.querySelector("#remarkDeflection").value =""
      }
  }else{
    document.querySelector("#actualDeflection").value=""
    document.querySelector("#remarkDeflection").value =""
  }
}

// document.querySelector("#remarkDeflection").addEventListener("input", function () {
//   if(this.value != ""){
//     this.classList.add("limitWarning")
//   }else{
//     this.classList.remove("limitWarning")
//   }
  
// });