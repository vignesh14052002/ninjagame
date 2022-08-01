let ctx,canvas,img;
window.onload=function(){

canvas=document.querySelector("canvas")
canvas.width=window.innerWidth
canvas.height=window.innerHeight;
ctx=canvas.getContext("2d")
img=new Image();
img.src="./img/spritesheet1.png"
img.onload=function(){
draw()
}

}

let x=5360+536*0;
let width=282;

let y=0;
let frame=0;
let framedelay=10;

let playerx=100
let playery=200
let current_state="idle"
let ground=window.innerHeight-100;
let playerscale=3;
let playerheight=500/playerscale;
let flipx=1
let flipy=1
function draw(){
    let current=spritedata[current_state]
    ctx.clearRect(0,0,canvas.width,canvas.height)
    let myframe=Math.floor(frame/framedelay)
    x=current.xoff+current.width*myframe;
    ctx.fillRect(0,ground,canvas.width,100)
    ctx.save()
    ctx.translate(playerx,playery+current.yoff)
    ctx.scale(flipx,flipy)
    ctx.drawImage(img,x,0,current.width,500,-current.width/(playerscale*2),0,current.width/playerscale,500/3)
    ctx.restore()
    frame++;
    if(myframe>current.frames-2){
        frame=0;
    }
    if(playery+playerheight-30<ground){
        playery+=maxspeed/2
        grounded=false
    }
    else{
        grounded=true;
        if(gliding){
            gliding=false;
            current_state="idle"
            speed=0
        }
    }
    playerx+=speed
    if(jumping){
        playery-=maxspeed*2;
    }

    window.requestAnimationFrame(draw)
}
let grounded=false;
let gliding=false;
let speed=0;
let maxspeed=10;
let jumping=false

//keyboard controls
let key;
var map = {}; 
window.onkeydown = window.onkeyup = function(e){
    e = e || event; // to deal with IE
    key=e.keyCode
    map[key] = e.type == 'keydown';
    if(! (map[65]||map[39]||map[37]||map[38]||map[40])&&grounded ){
        current_state="idle"
    }
    if(map[39]){//left
        if(grounded)
        current_state="run"
        flipx=1
        speed=maxspeed
    }
    if(map[37]){//right
        if(grounded)
        current_state="run"
        flipx=-1
        speed=maxspeed*-1
    }
    if(key==38){//up
        if(map[key] && grounded){
            current_state="jump";
            jumping=true;
            setTimeout(()=>{
                current_state="glide";
                speed=0;
                jumping=false
                gliding=true;
            },500)
        }
        
    }

    if(map[40] && grounded){//down
        current_state="slide"
    }
    if(map[65]){//attack
        current_state="attack"
    }
    if(current_state=="idle")speed=0;
}