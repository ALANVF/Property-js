/**
 * Yeah, the code is kinda ugly. 90% of this was typed on an iPad though.
 * ----------------------------------------------------------------------
 * //I don't actually know how this works. Just guessing.
 * 
 * @method color
 * @param  {Number} [redValue] A value from 0 to 255
 * @param  {Number} [greenValue] A value from 0 to 255
 * @param  {Number} [blueValue] A value from 0 to 255
 * @return {Object} An object with properties r, g, and b
 * @example
 * var fillColor = color(0, 255, 0);
 * playerObject.f = fillColor;
 * 
*/

function color(red, green, blue) {
	return {
		r: red,
		g: green,
		b: blue
	};
}

/*
 * @method keypress
 * 
 * 
*/

function keypress(p) { 
	window.addEventListener("keydown", function(e) {
		if(e.which == p.k) {
			p.t();
		}
	});
	if(p.f !== undefined) {
		window.addEventListener("keyup", function(e) {
			if(e.which == p.k) {
				p.f();
			}
		});
	}
}
function object(p) {
	if(p.el === undefined) {
    	this.el = document.createElement("div");
	    this.p = p;
	    this.x = p.x;
	    this.y = p.y;
	    this.w = p.w;
	    this.h = p.h;
	    this.f = (p.f === undefined) ? color(255, 255, 255) : p.f;
	    this.s = (p.s === undefined) ? color(0, 0, 0) : p.s;
	    this.t = (p.t === undefined) ? 1 : p.t;
	}else{
		this.el = document.getElementById(p.el);
		var fso = this.el.style.backgroundColor;
		var fs1 = fso.slice(1, 4);
		var fs2 = fs1.slice(-1, -2);
		var fa = fs2.split(", ");
		var cso = this.el.style.color;
		var cs1 = cso.slice(1, 4);
		var cs2 = cs1.slice(-1, -2);
		var ca = cs2.split(", ");
		var sso = this.el.style.borderColor;
		var ss1 = sso.slice(1, 4);
		var ss2 = ss1.slice(-1, -2);
		var sa = ss2.split(", ");
		this.x = (p.x === undefined) ? this.el.style.left : p.x;
		this.y = (p.y === undefined) ? this.el.style.top : p.y;
		this.w = (p.w === undefined) ? this.el.style.width : p.w;
		this.h = (p.h === undefined) ? this.el.style.height : p.h;
		this.f = (p.f === undefined) ? color(fa[0], fa[1], fa[2]) : p.f;
		this.c = (p.c === undefined) ? color(ca[0], ca[1], ca[2]) : p.c;
		this.s = (p.s === undefined) ? color(sa[0], sa[1], sa[2]) : p.s;
		this.t = (p.t === undefined) ? this.el.style.borderWidth : p.t;
	}
}
object.prototype.create = function() {
	this.el.style.position = (this.el.style.positon === undefined) ? "absolute" : this.el.style.position;
	this.el.style.backgroundColor = "rgb(" + this.f.r + ", " + this.f.g + ", " + this.f.b + ")";
	this.el.style.borderColor = "rgb(" + this.s.r + ", " + this.s.g + ", " + this.s.b + ")";
	if(this.c !== undefined) {
		this.el.style.color = "rgb(" + this.c.r + ", " + this.c.g + ", " + this.c.b + ")";
	}
	this.el.style.borderWidth = this.t + "px";
	this.el.style.borderStyle = "solid";
	this.el.style.left = this.x + "px";
	this.el.style.top = this.y + "px";
	this.el.style.width = this.w + "px";
	this.el.style.height = this.h + "px";
	document.body.appendChild(this.el);
};
object.prototype.button = function(p) {
	this.el.addEventListener("touchstart", function(e) {
		//e.preventDefault();
		p.t();
	});
	this.el.addEventListener("touchend", function(e) {
		//e.preventDefault();
		p.f();
	});
};
object.prototype.mouse = function(p) {
	switch(p.e) {
		case "click":
			this.el.addEventListener("mousedown", function(e) {
				e.preventDefault();
				p.t();
			});
			this.el.addEventListener("mouseup", function(e) {
				e.preventDefault();
				p.f();
			});
			break;
		case "drag":
			
			break;
		case "over":
			
			break;
		default:
		    break;
	}
};
object.prototype.inherit = function(p) {
	this.x = (p.v[0] == 1) ? p.o.x : (p.v[0] == 2) ? this.x + p.o.x : this.x;
	this.y = (p.v[1] == 1) ? p.o.y : (p.v[1] == 2) ? this.y + p.o.y : this.y;
	this.w = (p.v[2] == 1) ? p.o.w : (p.v[2] == 2) ? this.w + p.o.w : this.w;
	this.h = (p.v[3] == 1) ? p.o.h : (p.v[3] == 2) ? this.h + p.o.h : this.h;
	this.f = (p.v[4] == 1) ? p.o.f : this.f;
	this.s = (p.v[5] == 1) ? p.o.s : this.s;
	if(p.v[7] === undefined) {
		this.t = (p.v[6] == 1) ? p.o.t : (p.v[6] == 2) ? this.t + p.o.t : this.t;
	}else{
		this.c = (p.v[6] == 1) ? p.o.c : this.c;
		this.t = (p.v[7] == 1) ? p.o.t : (p.v[7] == 2) ? this.t + p.o.t : this.t;
	}
};
