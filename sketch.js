var point, array = [], pointsarray, arrayIncrement = 0;
var canvas;

var container, smallPointContainer, smallPoint, Start = 1, Initialwidth = 10, Initialheight = 10;
var mediumPointContainer, secondmediumPointer, largePointContainer;
var RedContainer, OrangeContainer, YellowContainer, LightGreen, DarkGreen, LightBlue, DarkBlue;
var colorPen = "black";
var allArray = 0;

var database;

var index = 0;
var x = null;
var y = null;
var PenWidth = null;
var PenColor = "black";


function setup(){
    canvas = createCanvas(displayWidth-20, displayHeight-20);
    database = firebase.database();
    getCount();
        var playerCountRef = database.ref("Index");
        playerCountRef.on("value", (data) => {
            index = data.val();
        })
        getCount();
}

function draw(){
    background("white");
    push();
    fill("white");
    container = rect(1450, 50, 50, 400);

    
    fill("blue");
    smallPointContainer = new PenSizeContainer(1450, 50, 50, 30);
    smallPointContainer.display();

    fill("Red");
    mediumPointContainer = new PenSizeContainer(1450, 80, 50, 30);
    mediumPointContainer.display();

    fill("violet");
    SecondPointContainer = new PenSizeContainer(1450, 110, 50, 30);
    SecondPointContainer.display();

    fill("Orange");
    largePointContainer = new PenSizeContainer(1450, 140, 50, 30);
    largePointContainer.display();
    OrangeContainer = new ColorContainer(1475, 170, 25, 25);
    OrangeContainer.display();

    fill("Yellow");
    textSize(18);
    text("Small", 1452, 70);
    textSize(12);
    text("Medium", 1453, 100);
    textSize(10);
    text("2x Medium", 1451.5, 130);
    textSize(12);
    text("Large", 1458, 160);

    pop();
    
    push();
    fill("red");
    RedContainer = new ColorContainer(1450, 170, 25, 25);
    RedContainer.display();
    pop();
    fill("#005000");
    LightGreen = new ColorContainer(1450, 195, 25, 25);
    LightGreen.display();
    fill("#009900");
    DarkGreen = new ColorContainer(1475, 195, 25, 25);
    DarkGreen.display();
    fill("#000050");
    LightBlue = new ColorContainer(1450, 220, 25, 25);
    LightBlue.display();
    fill("000099");
    DarkBlue = new ColorContainer(1475, 220, 25, 25);
    DarkBlue.display();
    //smallPoint = rect(1460, 60, 2, 2);
    /*if(mousePressedOver(smallPointContainer)){
        Initialwidth = 15;
        Initialheight = Initialwidth;
    }
    if(mousePressedOver(mediumPointContainer)){
        Initialwidth = 50;
        Initialheight = Initialwidth;
    }*/
    getCount();
    ArrayRef();
    if(index != 0 && !(mouseDown())){
        //console.log(allArray);
        for(var i in allArray){
            //console.log(allArray[i].x);
            //point.x = allArray[index].x = mouseX;
            point = new Pen(allArray[i].x, allArray[i].y , allArray[i].width,allArray[i].width, allArray[i].color);
            array.push(point);
            //console.log("Draw stored stokes");
            /*index+=1;
        count(index);
        getCount();*/
        }
        updateStart(0);
    }
    if(Start === 0){
        for(var i = 0; i < array.length; i++){
            //fill(colorPen);
            array[i].display();
        }
    }


    if(mouseDown() && mouseX > 1400){
        //for(var i = 0; i < 2; i++){
        //array.push(mouseX);
        mouseClick(smallPointContainer, 10, colorPen)
        mouseClick(mediumPointContainer, 25, colorPen);
        mouseClick(SecondPointContainer, 50, colorPen);
        mouseClick(largePointContainer, 75, colorPen);
        console.log("x : " + mouseX + " " + "y : " + mouseY)
        mouseClick(RedContainer, Initialwidth, "red");
        mouseClick(OrangeContainer, Initialwidth, "orange");
        mouseClick(DarkGreen, Initialwidth, "#009900");
        mouseClick(LightGreen, Initialwidth, "#00500");
        mouseClick(DarkBlue, Initialwidth, "#000099");
        mouseClick(LightBlue, Initialwidth, "#000050");
        
    }
    if(mouseDown() && mouseX < 1400){
        SetArrayPen();
        ArrayRef();
        index+=1;
        count(index);
        getCount();
        
        
        //console.log(array);
        //pointsarray.push(new Pen(mouseX, mouseY, 1, 1));
        //pointsarray[pointsarray.length.display];
        
        updateStart(0);
        //console.log(updateStart.start);
    }
    
    
}
function mouseClick(object, width, Color) {
    if(mouseX > object.x && mouseX < (object.x+object.width)
    && mouseY > object.y && mouseY < (object.y + object.height)){
        Initialwidth = width;
        Initialheight = Initialwidth;
        colorPen = Color;
    }
}

function ArrayRef(){
    var PenArrayRef = database.ref('PenStroke');
    PenArrayRef.on("value", (data) => {
        allArray = data.val();
    })
}

function SetArrayPen(){
    var PenArrayIndex = 'PenStroke/Pen' + index;
    database.ref(PenArrayIndex).set({
        x: mouseX,
        y: mouseY,
        width: Initialwidth,
        color: PenColor
    });
}

function StartRef(){
    var startRef = database.ref('Start');
    startRef.on("value", (data) => {
        Start = data.val();
    })
}

function updateStart(start){
    database.ref('/').update({
        Start: start
    })
    Start = start;
}

function getCount(){
    var playerCountRef = database.ref("Index");
    playerCountRef.on("value", (data) => {
        index = data.val();
    })
}
function count(count){
    database.ref('/').update({
        Index: count
    })
}

