

function drawLine(deg){
    var V = document.getElementById("V");
    const canva = V.getContext('2d');
    
    
    canva.clearRect(0, 0, V.width, V.height);


    var degMeter = document.getElementById("degMeter");
    degMeter.textContent =  deg.toString() + "°"
    canva.strokeStyle = "black";
    canva.lineWidth = 1;

    // W 400 H 400
    // draw a red line
    canva.beginPath();
    
    canva.moveTo(150, 300);
    canva.lineTo(...makeCords(deg));

    canva.stroke();

}




function makeCords (deg){
    var radians = (deg/360)* 2*Math.PI;
    var toX = (150 - (Math.cos(radians) * 150)).toFixed(2); 
    var toY = (300 - (Math.sin(radians) * 150)).toFixed(2);
    console.log("deg " + deg.toString());
    console.log("x " + toX.toString());
    console.log("y " + toY.toString());
    

    return [toX, toY];
}

//drawLine(90);


export {drawLine};


