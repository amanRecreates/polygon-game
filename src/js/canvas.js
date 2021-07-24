import utils, {randomIntFromRange, randomColor, distance, collide ,intersect, rotate, resolveCollision} from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth 
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}
// Global variable
var gravity = 1;
var friction = 0.82;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

})


addEventListener('keypress', (e) => {
  if (e.which === 32) {
    // console.log('pressed');
    for(let k=0;k<20;k++){
      for (let i = 0; i < polyList.length; i++) { 
        // console.log('loop');
        polyList[i].velocity.y -= 1 ;
        // if(polyList[i].velocity<-30) {
        //   polyList[i].velocity.y = -30 ;
        // }
      }
    }
  }
})
/////////////////////////

/*
 * ------------------------------------------
 * *-----------------------------
 *  Design
 * *-----------------------------
 * ------------------------------------------
 */

function Star() {
  this.radius = (Math.random() * 10) + 5;
  this.x = this.radius + (canvas.width - this.radius * 2) * Math.random();
  this.y = -10;
  this.dx = (Math.random() - 0.5) * 20;
  this.dy = 30;
  this.gravity = .5;
  this.friction = .54;

  this.update = function () {

      // Bounce particles off the floor of the canvas
      if (this.y + this.radius + this.dy >= canvas.height - groundHeight) {
          this.dy = -this.dy * this.friction;
          this.dx *= this.friction;
          this.radius -= 3;

          explosions.push(new Explosion(this));
      } else {
          this.dy += this.gravity;
      }

      // Bounce particles off left and right sides of canvas
      if (this.x + this.radius + this.dx >= canvas.width || this.x - this.radius + this.dx < 0) {
          this.dx = -this.dx;
          this.dx *= this.friction;
          explosions.push(new Explosion(this));
      };

      // Move particles by velocity
      this.x += this.dx;
      this.y += this.dy;

      this.draw();

      // Draw particles from explosion
      for (var i = 0; i < explosions.length; i++) {
          explosions[i].update();
      }

  }
  this.draw = function () {
      c.save();
      c.beginPath();
      c.arc(this.x, this.y, Math.abs(this.radius), 0, Math.PI * 2, false);

      c.shadowColor = '#006600';
      c.shadowBlur = 20;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 0;

      c.fillStyle = "#006600";
      c.fill();
      c.closePath();
      c.restore();
  }
}

function Particle(x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.size = {
      width: 2,
      height: 2
  };
  this.dx = dx;
  this.dy = dy;
  this.gravity = .09;
  this.friction = 0.88;
  this.timeToLive = 0.3;
  this.opacity = 1;

  this.update = function () {
      if (this.y + this.size.height + this.dy >= canvas.height - groundHeight) {
          this.dy = -this.dy * this.friction;
          this.dx *= this.friction;
      } else {
          this.dy += this.gravity;
      }

      if (this.x + this.size.width + this.dx >= canvas.width || this.x + this.dx < 0) {
          this.dx = -this.dx;
          this.dx *= this.friction;
      };
      this.x += this.dx;
      this.y += this.dy;

      this.draw();

      this.timeToLive -= 0.01;
      this.opacity -= 1 / (this.timeToLive / 0.01);
  }
  this.draw = function () {
      c.save();
      c.fillStyle = "#0f0";
      c.shadowColor = '#006600';
      c.shadowBlur = 20;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 0;
      c.fillRect(this.x, this.y, this.size.width, this.size.height);
      c.restore();
  }

  this.isAlive = function () {
      return 0 <= this.timeToLive;
  }
}

function Explosion(star) {
  this.particles = [];

  this.init = function (parentStar) {
      for (var i = 0; i < 10; i++) {
          var velocity = {
              x: (Math.random() - 0.5) * 5,
              y: (Math.random() - 0.5) * 15,
          }
          this.particles.push(new Particle(parentStar.x, parentStar.y, velocity.x, velocity.y));
      }
  }

  this.init(star);

  this.update = function () {
      for (var i = 0; i < this.particles.length; i++) {
          this.particles[i].update();
          if (this.particles[i].isAlive() == false) {
              this.particles.splice(i, 1);
          }
      }
  }
}

function createMountainRange(mountainAmount, height, color) {
  for (var i = 0; i < mountainAmount; i++) {
      var mountainWidth = canvas.width / mountainAmount;

      // Draw triangle
      c.beginPath();
      c.moveTo(i * mountainWidth, canvas.height);
      c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);

      // Triangle peak
      c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
      c.lineTo(i * mountainWidth - 325, canvas.height);
      c.fillStyle = color;
      c.fill();
      c.closePath();
  }
}


///////////////////////////////////////////////

//Objects

function createPolygon(x,y,r,s) {
  var a = Math.PI/2;
  var points = [];
  var sides = [];
  for(var i=0; i<=s; i++) {
    var px = x+r*Math.cos(a), py = y+r*Math.sin(a);
    if(i===0) {

    } else {
      sides.push([{x: points[i-1].x,y: points[i-1].y},{x: px,y: py}])
    }
    points.push({x: px, y: py});
    a += (2*Math.PI/s);
  }
  points.pop();
  return {p: points, s: sides};
}

function Polygon(x,y,radius,side) {
  this.x = x;
  this.y = y;
  this.sides = []
  this.points = []
  this.radius = radius;
  this.numSide = side;
  this.mass = 1;

  this.velocity = {
    x: randomIntFromRange(-4,4),
    y: randomIntFromRange(-2,2)
  };  

  this.update = polyList => {  
    this.draw();

    // updating velocities
    if (this.x - this.radius <= 0 || this.x + this.radius +this.velocity.x>= canvas.width) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius +this.velocity.y >= canvas.height-groundHeight) {
      this.velocity.y = -this.velocity.y*friction;
      this.velocity.x *= 0.95; 
    } else {
      this.velocity.y += gravity;
    }
    // resolving collision
    for (let i = 0; i < polyList.length; i++) {
      if(this === polyList[i]) continue;
      
      if(collide(this,polyList[i])) {
        resolveCollision(this,polyList[i]);
        explosions.push(new Explosion(this));
      } 
    }

    //updating center point
    this.x += this.velocity.x;
    this.y += this.velocity.y;
     
    // Draw particles from explosion
    for (var i = 0; i < explosions.length; i++) {
      explosions[i].update();
    }
    
  };

  this.draw = () => {
    var temp = createPolygon(this.x,this.y,this.radius,this.numSide);
    this.points = temp.p;
    this.sides = temp.s;
    c.beginPath();
    for(var i=0; i<this.points.length; i++) {
      if(i===0) {
        c.moveTo(this.points[i].x,this.points[i].y);
      } else {
        c.lineTo(this.points[i].x,this.points[i].y);
      }
    }
    c.lineTo(this.points[0].x,this.points[0].y);

    c.save();
    c.fillStyle = "#0f0";
    c.shadowColor = '#006600';
    c.shadowBlur = 40;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fill();
    c.restore();
    c.closePath()
  };
}


var explosions = [];
var groundHeight = canvas.height * 0.15;
var randomSpawnRate = Math.floor((Math.random() * 25) + 60)
var backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, "#171e26");
backgroundGradient.addColorStop(1, "#3f586b");


// Implementation
let objects

var polyList;
function init() {
  polyList = [];
  for (let i = 0; i < 6; i++) {
    var radius = 70;
    var sides = 3;
    let x = randomIntFromRange(radius,canvas.width-radius);
    let y = randomIntFromRange(radius,canvas.height-radius-groundHeight);
    
    if(i!==0) {
      for (let j = 0; j < polyList.length; j++) {
        if(distance(x,y,polyList[j].x,polyList[j].y)-2*radius<0) {
          x = randomIntFromRange(radius,canvas.width-radius);
          y = randomIntFromRange(radius,canvas.height-radius-groundHeight);

          j = -1;
        }
      }
    }
    polyList.push(new Polygon(x,y,radius,sides+i));
  }
}


function MiniStar() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.radius = Math.random() * 3;

  this.draw = function () {
      c.save();
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

      c.shadowColor = '#006600';
      c.shadowBlur = (Math.random() * 10) + 10;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 0;

      c.fillStyle = "white";
      c.fill();

      c.closePath();
      c.restore();
  }
}


var miniStars = [];
for (var i = 0; i < 150; i++) {
    miniStars.push(new MiniStar());
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = backgroundGradient;
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < miniStars.length; i++) {
      miniStars[i].draw();
  }
  createMountainRange(1, canvas.height - 50, "#384551");
  createMountainRange(2, canvas.height - 100, "#2B3843");
  createMountainRange(3, canvas.height - 300, "#26333E");


  c.fillStyle = "#182028";
  c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
  polyList.forEach(obj => {
    obj.update(polyList);
   })
  
}


init()
animate()

