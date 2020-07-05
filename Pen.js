class Pen{
    constructor(x, y, width, height, color){
        this.body = ellipse(x, y, width, height);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    display(){
        fill(this.color);
        circle(this.x , this.y, this.width, this.height);
    }
}