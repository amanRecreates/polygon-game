/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}; // Global variable

var gravity = 1;
var friction = 0.82; // Event Listeners

addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
addEventListener('keypress', function (e) {
  if (e.which === 32) {
    // console.log('pressed');
    for (var k = 0; k < 20; k++) {
      for (var _i = 0; _i < polyList.length; _i++) {
        // console.log('loop');
        polyList[_i].velocity.y -= 1; // if(polyList[i].velocity<-30) {
        //   polyList[i].velocity.y = -30 ;
        // }
      }
    }
  }
}); /////////////////////////

/*
 * ------------------------------------------
 * *-----------------------------
 *  Design
 * *-----------------------------
 * ------------------------------------------
 */

function Star() {
  this.radius = Math.random() * 10 + 5;
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
    } // Bounce particles off left and right sides of canvas


    if (this.x + this.radius + this.dx >= canvas.width || this.x - this.radius + this.dx < 0) {
      this.dx = -this.dx;
      this.dx *= this.friction;
      explosions.push(new Explosion(this));
    }

    ; // Move particles by velocity

    this.x += this.dx;
    this.y += this.dy;
    this.draw(); // Draw particles from explosion

    for (var i = 0; i < explosions.length; i++) {
      explosions[i].update();
    }
  };

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
  };
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
    }

    ;
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
    this.timeToLive -= 0.01;
    this.opacity -= 1 / (this.timeToLive / 0.01);
  };

  this.draw = function () {
    c.save();
    c.fillStyle = "#0f0";
    c.shadowColor = '#006600';
    c.shadowBlur = 20;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fillRect(this.x, this.y, this.size.width, this.size.height);
    c.restore();
  };

  this.isAlive = function () {
    return 0 <= this.timeToLive;
  };
}

function Explosion(star) {
  this.particles = [];

  this.init = function (parentStar) {
    for (var i = 0; i < 10; i++) {
      var velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 15
      };
      this.particles.push(new Particle(parentStar.x, parentStar.y, velocity.x, velocity.y));
    }
  };

  this.init(star);

  this.update = function () {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update();

      if (this.particles[i].isAlive() == false) {
        this.particles.splice(i, 1);
      }
    }
  };
}

function createMountainRange(mountainAmount, height, color) {
  for (var i = 0; i < mountainAmount; i++) {
    var mountainWidth = canvas.width / mountainAmount; // Draw triangle

    c.beginPath();
    c.moveTo(i * mountainWidth, canvas.height);
    c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height); // Triangle peak

    c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
    c.lineTo(i * mountainWidth - 325, canvas.height);
    c.fillStyle = color;
    c.fill();
    c.closePath();
  }
} ///////////////////////////////////////////////
//Objects


function createPolygon(x, y, r, s) {
  var a = Math.PI / 2;
  var points = [];
  var sides = [];

  for (var i = 0; i <= s; i++) {
    var px = x + r * Math.cos(a),
        py = y + r * Math.sin(a);

    if (i === 0) {} else {
      sides.push([{
        x: points[i - 1].x,
        y: points[i - 1].y
      }, {
        x: px,
        y: py
      }]);
    }

    points.push({
      x: px,
      y: py
    });
    a += 2 * Math.PI / s;
  }

  points.pop();
  return {
    p: points,
    s: sides
  };
}

function Polygon(x, y, radius, side) {
  var _this = this;

  this.x = x;
  this.y = y;
  this.sides = [];
  this.points = [];
  this.radius = radius;
  this.numSide = side;
  this.mass = 1;
  this.velocity = {
    x: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomIntFromRange"])(-4, 4),
    y: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomIntFromRange"])(-2, 2)
  };

  this.update = function (polyList) {
    _this.draw(); // updating velocities


    if (_this.x - _this.radius <= 0 || _this.x + _this.radius + _this.velocity.x >= canvas.width) {
      _this.velocity.x = -_this.velocity.x;
    }

    if (_this.y - _this.radius <= 0 || _this.y + _this.radius + _this.velocity.y >= canvas.height - groundHeight) {
      _this.velocity.y = -_this.velocity.y * friction;
      _this.velocity.x *= 0.95;
    } else {
      _this.velocity.y += gravity;
    } // resolving collision


    for (var _i2 = 0; _i2 < polyList.length; _i2++) {
      if (_this === polyList[_i2]) continue;

      if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["collide"])(_this, polyList[_i2])) {
        Object(_utils__WEBPACK_IMPORTED_MODULE_0__["resolveCollision"])(_this, polyList[_i2]);
        explosions.push(new Explosion(_this));
      }
    } //updating center point


    _this.x += _this.velocity.x;
    _this.y += _this.velocity.y; // Draw particles from explosion

    for (var i = 0; i < explosions.length; i++) {
      explosions[i].update();
    }
  };

  this.draw = function () {
    var temp = createPolygon(_this.x, _this.y, _this.radius, _this.numSide);
    _this.points = temp.p;
    _this.sides = temp.s;
    c.beginPath();

    for (var i = 0; i < _this.points.length; i++) {
      if (i === 0) {
        c.moveTo(_this.points[i].x, _this.points[i].y);
      } else {
        c.lineTo(_this.points[i].x, _this.points[i].y);
      }
    }

    c.lineTo(_this.points[0].x, _this.points[0].y);
    c.save();
    c.fillStyle = "#0f0";
    c.shadowColor = '#006600';
    c.shadowBlur = 40;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fill();
    c.restore();
    c.closePath();
  };
}

var explosions = [];
var groundHeight = canvas.height * 0.15;
var randomSpawnRate = Math.floor(Math.random() * 25 + 60);
var backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, "#171e26");
backgroundGradient.addColorStop(1, "#3f586b"); // Implementation

var objects;
var polyList;

function init() {
  polyList = [];

  for (var _i3 = 0; _i3 < 6; _i3++) {
    var radius = 70;
    var sides = 3;
    var x = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomIntFromRange"])(radius, canvas.width - radius);
    var y = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomIntFromRange"])(radius, canvas.height - radius - groundHeight);

    if (_i3 !== 0) {
      for (var j = 0; j < polyList.length; j++) {
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["distance"])(x, y, polyList[j].x, polyList[j].y) - 2 * radius < 0) {
          x = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomIntFromRange"])(radius, canvas.width - radius);
          y = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["randomIntFromRange"])(radius, canvas.height - radius - groundHeight);
          j = -1;
        }
      }
    }

    polyList.push(new Polygon(x, y, radius, sides + _i3));
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
    c.shadowBlur = Math.random() * 10 + 10;
    c.shadowOffsetX = 0;
    c.shadowOffsetY = 0;
    c.fillStyle = "white";
    c.fill();
    c.closePath();
    c.restore();
  };
}

var miniStars = [];

for (var i = 0; i < 150; i++) {
  miniStars.push(new MiniStar());
} // Animation Loop


function animate() {
  requestAnimationFrame(animate);
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
  polyList.forEach(function (obj) {
    obj.update(polyList);
  });
}

init();
animate();

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function collide(p1, p2) {
  for (var i in p1.sides) {
    for (var j in p2.sides) {
      var t = intersect(p1.sides[i], p2.sides[j]);

      if (t === 'collinear') {
        continue;
      }

      if (t[0] <= 1 && t[0] >= 0 && t[1] <= 1 && t[1] >= 0) {
        return true;
      }
    }
  }

  return false;
}

function intersect(s1, s2) {
  if ((s2[1].x - s2[0].x) * (s1[0].y - s1[1].y) - (s1[0].x - s1[1].x) * (s2[1].y - s2[0].y) === 0) {
    return 'collinear';
  }

  var tA = ((s2[0].y - s2[1].y) * (s1[0].x - s2[0].x) + (s2[1].x - s2[0].x) * (s1[0].y - s2[0].y)) / ((s2[1].x - s2[0].x) * (s1[0].y - s1[1].y) - (s1[0].x - s1[1].x) * (s2[1].y - s2[0].y)),
      tB = ((s1[0].y - s1[1].y) * (s1[0].x - s2[0].x) + (s1[1].x - s1[0].x) * (s1[0].y - s2[0].y)) / ((s2[1].x - s2[0].x) * (s1[0].y - s1[1].y) - (s1[0].x - s1[1].x) * (s2[1].y - s2[0].y));
  return [tA, tB];
}
/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */


function rotate(velocity, angle) {
  var rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };
  return rotatedVelocities;
}
/**
* Swaps out two colliding particles' x and y velocities after running through
* an elastic collision reaction equation
*
* @param  Object | particle      | A particle object with x and y coordinates, plus velocity
* @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
* @return Null | Does not return a value
*/


function resolveCollision(particle, otherParticle) {
  var xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  var yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
  var xDist = otherParticle.x - particle.x;
  var yDist = otherParticle.y - particle.y; // Prevent accidental overlap of particles

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    var angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x); // Store mass in var for better readability in collision equation

    var m1 = particle.mass;
    var m2 = otherParticle.mass; // Velocity before equation

    var u1 = rotate(particle.velocity, angle);
    var u2 = rotate(otherParticle.velocity, angle); // Velocity after 1d collision equation

    var v1 = {
      x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2),
      y: u1.y
    };
    var v2 = {
      x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2),
      y: u2.y
    }; // Final velocity after rotating axis back to original location

    var vFinal1 = rotate(v1, -angle);
    var vFinal2 = rotate(v2, -angle); // Swap particle velocities for realistic bounce effect

    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;
    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance,
  collide: collide,
  intersect: intersect,
  rotate: rotate,
  resolveCollision: resolveCollision
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map