var prevGas = 0;
var prevRevers = 0;
var prevStering = 0;
var prevstickPosX = 134;
var prevstickPosY = 136;
var deg = 0;

import {drawLine} from "./vitulise.js";

   function updateGamepad(){
    requestAnimationFrame(updateGamepad);
      
      //console.log(window.getGamepads());
      //navigator.getGamepads
      
      var gamePad = navigator.getGamepads()[0];

      //console.log(gamePad.buttons)
      if (!gamePad) {
        connectGamepad();
        return;
      }
      

      
      
      
      

      //console.log("CONECTED!");
    


      var gas = gamePad.buttons[7].value.toFixed(1);
      var revers = gamePad.buttons[6].value.toFixed(1);
      var stering = gamePad.axes[2].toFixed(1);
      var forward = gamePad.axes[3].toFixed(1);
      var dot = document.getElementById("P");
      var speedIndicator = document.getElementById("speed");
      dot.getAttribute("left");
      var stickPosX = 134 + stering * 150;
      var stickPosY = 136 + forward * 150;
      
      
      dot.style.left = stickPosX.toString() + "px"; // x
      dot.style.top =  stickPosY.toString() + "px"; // Y

      /* if (stickPosX != prevstickPosX){
        animateStickMovment(dot.style.left, stickPosX, "X");
      } else if (stickPosX != prevstickPosY){
        animateStickMovment(dot.style.top, stickPosY, "Y");
      } */
      
      
     

      
      speedIndicator.style.width =  (gas * 100).toString() + "%";
      if (false){
      if (gas != prevGas || revers != prevRevers || stering != prevStering){
        var data = {gas: gas, revers: revers, stering: stering};
        prevGas = gas
        prevRevers= revers
        prevStering= stering
        sendDataToESP(data)
        console.log("gas: " + gas + " revers: " + revers + " stering: " + stering);
      } else {
        console.log("dsahdshj")
      }
    }
      
   }



    function connectGamepad(){
      console.log("hej");

      // temp black of code
      drawLine(deg);
      if (deg < 180){
        deg += 10;
      } else{
        deg = 0;
      }
      // --> end 
      var controllerStatusIcon = document.getElementById("controllerStatus");
      

      if (!navigator.getGamepads()[0] ) {
        controllerStatusIcon.classList.add('fa-dizzy');
        if (controllerStatusIcon.classList.contains('fa-grin')){
          controllerStatusIcon.classList.remove('fa-grin');
        }
        
        
        setTimeout (() => {connectGamepad(); }, 1000);
    
    } else {
      controllerStatusIcon.classList.add('fa-grin');
      if (controllerStatusIcon.classList.contains('fa-dizzy')){
        controllerStatusIcon.classList.remove('fa-dizzy');
      }
      updateGamepad();
      return;
    }
   }
      /* setInterval(() => {
        updateGamepad();
      }, 1000); */


      connectGamepad();
    function animateStickMovment(entity, WantedValue, type){
      var currentPos = 0;
      if (type = "X") {
        currentPos = prevstickPosX;
      } else{
        currentPos = prevstickPosY;
      }
      
      console.log(WantedValue != currentPos);
      
      while(WantedValue != currentPos){
        if (WantedValue - prevstickPosX > 0){
          
          currentPos += 1;
          entity = currentPos.toString() + "px";
        } else {
          currentPos -= 1;
          entity = currentPos.toString() + "px";
        }
      }

      if (type = "X") {
        prevstickPosX = prevstickPosX;
      } else{
        prevstickPosY = prevstickPosY;
      }
      
    }
     
     /*  window.addEventListener('gamepadconnected', (event) => {
        const update = () => {
          

          const gamepad = navigator.getGamepads()
          console.log(gamepad);
          if (!gamepad) return;
            
            var gas = (gamepad.axes[5] + 1) / 2;
            var revers = (gamepad.axes[2] + 1) / 2;
            var stering = gamepad.axes[3];

            console.log(gas)
            console.log(gas != ugas || revers != ureverse);
            if (gas != ugas || revers != ureverse) {
              ugas = gas;
              ureverse = revers;
              
              //sendDataToESP({gas: gas, revers: revers, stering: stering});
            }

             
          
          requestAnimationFrame(update);
        };
        update();
        }); */

    
function manual(){
    var s = document.getElementById("step");
    console.log(s.value);
    sendDataToESP({gas:s.value});
}


function sendDataToESP(data){
    fetch("/controller", {
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
        });
}
   
