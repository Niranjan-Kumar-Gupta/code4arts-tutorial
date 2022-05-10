const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const heartX = [];
const heartY = [];
let hue = 0;

function HeartData() {
    for (let i = 0; i <= Math.PI * 2; i += 0.03) {
        let x = (16 * Math.sin(i) ** 3);
        heartX.push(x);
        let y = -(13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
        heartY.push(y);
    }
}
HeartData();

class Heart{
    constructor(){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.rad = canvas.width*0.01;
        this.radinc = 0;
        this.dirc = 1;
        this.dt = 0
    }
    drawHeart(){
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${hue},100%,50%)`;      
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(0,0,0,1)';
        for (let i = 0; i < heartX.length; i++) {
            let x1 = heartX[i]*this.rad + this.x;
            let y1 = heartY[i]*this.rad + this.y;
            let x2 = this.x+heartX[i]*this.radinc
            let y2 = this.y+heartY[i]*this.radinc
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);           
        }     
    }
    drawText(){
        ctx.stroke();
        ctx.font = ` ${this.radinc*5}pt Calibri serif`;
        ctx.textAlign = "center";
        // align text vertically center
        ctx.textBaseline = "middle";
        ctx.fillStyle = `hsl(${hue*2},100%,50%)`; 
        ctx.fillText('Hiii',this.x,this.y);
    }
    update(){
        this.radinc += 0.1*this.dirc;
        this.dt += 0.1
        if (this.radinc > 10 || this.radinc < 0) {
            this.dirc *= -1
        }
    }
}

function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

let heart = new Heart(); 

function handelHeart() {
    heart.drawHeart();
    heart.drawText()
    heart.update();
}

setInterval(()=>{
    clear();
    hue += 0.5
    handelHeart();
},1000/60);