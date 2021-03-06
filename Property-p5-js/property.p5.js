/*
 * Most things is the p5 version are the same as the normal version. Anything different will be described.
*/

//col instaed of color because p5 has a function called color(and it seems broken)
function col(red, green, blue) {
	if(green === undefined && blue === undefined) {
		return {
			r: red,
			g: red,
			b: red
		};
	}else{
		return {
			r: red,
			g: green,
			b: blue
		};
	}
}
function colorToRgb(color) {
	return ("rgb(" + color.r + ", " + color.g + ", " + color.b + ")").toString();
}
function rgbToColor(rgb) {
	var s1 = rgb.replace("rgb(", "");
	var s2 = s1.replace(")", "");
	var sa = s2.split(", ");
	return col(parseInt(sa[0]), parseInt(sa[1]), parseInt(sa[2]));
}

function keypress(p) {
	if(p === typeof Array) {
		for(var i = 0; i < p.length; i++) {
			if(keyIsPressed === true && keyCode == p[i][0]) {
				if(p.t === typeof String) {
					eval(p[i][1]);
				}else{
					p[i][1]();
				}
			}else{
				if(p[i][2] !== undefined) {
					if(p.f === typeof String) {
						eval(p[i][2]);
					}else{
						p[i][2]();
					}
				}
			}
		}
	}else{
		return keyIsPressed && (keyCode == p || key == p);
	}
}

function object(p) {
	if(p.el === undefined) {
		this.p = p;
	    this.x = p.x || 0;
	    this.y = p.y || 0;
	    this.w = p.w || 0;
    	this.h = p.h || 0;
	    this.f = p.f || col(255, 255, 255);
	    this.s = p.s || col(0, 0, 0);
	    this.c = p.c || col(0, 0, 0);
	    //this.txt = p.txt || "";
	    this.t = p.t || 1;
	}else{
		this.el = document.getElementById(p.el);
		this.p = p;
		this.x = p.x || parseInt(this.el.style.left);
		this.y = p.y || parseInt(this.el.style.top);
		this.w = p.w || parseInt(this.el.style.width);
		this.h = p.h || parseInt(this.el.style.height);
		this.f = p.f || rgbToColor(this.el.style.backgroundColor);
		this.s = p.s || rgbToColor(this.el.style.borderColor) || "transparent" || col(255);
		this.c = p.c || col(0) || rgbToColor(this.el.style.color);
		//this.txt = p.txt || this.el.textContent;
		this.t = p.t || this.el.style.borderWeight || 1;
	}
}

object.prototype.create = function(asDOMElement) {
	if(this.el === undefined) {
		fill(this.f.r, this.f.g, this.f.b);
		stroke(this.s.r, this.s.g, this.s.b);
		strokeWeight(this.t);
		rect(this.x, this.y, this.w, this.h);
	}else{
		console.log("error");
	}
};

/*
 * @method collide
 * @param {object} [p.o] The object to check collision for
 * @param {Array[speedX, speedY]} [movingSpeed] The speed at which the current object is moving. Optional
 * @example
 * p1.collide({
 *     o: p2,
 *     s: [5, 0]
 * }); //p1 will only collide with p2 if it hits the left or right at a speed of 5
 * 
 * p1.collide({
 *     o: p3
 * }); //p1 will always collide with p3 on all sides at any speed
 * 
 * if(p1.collide({o: p4})) {
 *     p4.f = col(0);
 * } //when p1 collides with p4, p4's fill color will be black
 * @return colliding
*/
object.prototype.collide = function(p) {
	if(p.s === undefined) {
		p.s = [dist(this.x + this.w/2, 0, p.o.x + p.o.w/2, 0) - (this.w/2 + p.o.w/2), dist(0, this.y + this.h/2, 0, p.o.y + p.o.h/2) - (this.h/2 + p.o.h/2)];
	}
	if(this.r === undefined && p.o.r === undefined) {
		if(((this.x <= p.o.x + p.o.w) && (this.x + this.w >= p.o.x) && (this.y < p.o.y + p.o.h) && (this.y + this.h > p.o.y) && this.x + this.w/2 > p.o.x)) {
			this.x += p.s[0];
			return true;
		}else{return false;}
		if(((this.x <= p.o.x + p.o.w) && (this.x + this.w >= p.o.x) && (this.y < p.o.y + p.o.h) && (this.y + this.h > p.o.y) && this.x + this.w/2 < p.o.x + p.o.w/2)) {
			this.x -= p.s[0];
			return true;
		}else{return false;}
		if(((this.x <= p.o.x + p.o.w) && (this.x + this.w >= p.o.x) && (this.y <= p.o.y + p.o.h) && (this.y + this.h >= p.o.y) && this.y + this.h/2 > p.o.y + p.o.h/2)) {
			this.y += p.s[1];
			return true;
		}else{return false;}
		if(((this.x <= p.o.x + p.o.w) && (this.x + this.w >= p.o.x) && (this.y <= p.o.y + p.o.w) && (this.y +this.h >= p.o.y) && this.y + this.h/2 < p.o.y + p.o.h/2)) {
			this.y -= p.s[1];
			return true;
		}else{return false;}
	}
};

//If left blank, it returns true or false depending on if the object is clicked on or not
object.prototype.button = function(p) {
	if(p !== undefined) {
		if(this.el === undefined) {
			if(mouseIsPressed && mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h) {
				p.t();
			}else{
			    p.f();
			}
		}/*else{
			var input = {d: "", u: ""};
			if(p.os == "desktop" || p.os === undefined) {
				input = {d: "mousedown", u: "mouseup"};
			}else if(p.os == "mobile") {
				input = {d: "touchstart", u: "touchend"};
			}
			this.el.addEventListener(input.d, function() {
				p.t();
			});
			this.el.addEventListener(input.u, function() {
				p.f();
			});
		}*/
	}else{
		if(mouseIsPressed && mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h) {
			return true;
		}else{
			return false;
		}
	}
};
object.prototype.mouse = function(p) {
	if(this.r === undefined) {
		switch(p.e) {
			case "click":
				if((mouseIsPressed && mouseX >= this.x && mouseY >= this.y && mouseX <= this.x + this.w && mouseY <= this.y + this.h) && dist(mouseX, mouseY, pmouseX, pmouseY) <= 1) {
					p.t();
				}else{
					p.f();
				}
				break;
			case "drag":
				if((mouseIsPressed && mouseX >= this.x && mouseY >= this.y && mouseX <= this.x + this.w && mouseY <= this.y + this.h) && dist(mouseX, mouseY, pmouseX, pmouseY) >= 2) {
					p.t();
				}else{
					p.f();
				}
				break;
			case "over":
				if(mouseX >= this.x && mouseY >= this.y && mouseX <= this.x + this.w && mouseY <= this.y + this.h) {
					p.t();
				}else{
					p.f();
				}
				break;
			default:
			    break;
		}
	}/*else{
		switch(p.e) {
			case "click":
				if(mouseIsPressed && dist(mouseX, mouseY, this.x + this.r/2, this.y + this.r/2) <= this.r/2 && dist(mouseX, mouseY, pmouseX, pmouseY) <= 1) {
					p.t();
				}else{
					p.f();
				}
				break;
			case "drag":
				if(mouseIsPressed && dist(mouseX, mouseY, this.x + this.r/2, this.y + this.r/2) <= this.r/2 && dist(mouseX, mouseY, pmouseX, pmouseY) >= 2) {
					p.t();
				}else{
					p.f();
				}
				break;
			case "over":
				if(dist(mouseX, mouseY, this.x + this.r/2, this.y + this.r/2) <= this.r/2) {
					p.t();
				}else{
					p.f();
				}
				break;
			default:
			    break;
		}
	}*/
};
object.prototype.move = function(p) {
	if(this.x < p.t[0]) {
		this.x += (this.x >= p.t[0]) ? 0 : p.s[0];
	}else if(this.x > p.t[0]) {
		this.x -= (this.x <= p.t[0]) ? 0 : p.s[0];
	}
	if(this.y < p.t[1]) {
		this.y += (this.y >= p.t[1]) ? 0 : p.s[1];
	}else if(this.y > p.t[1]) {
		this.y -= (this.y <= p.t[1]) ? 0 : p.s[1];
	}
};

//now returns the changed object
object.prototype.inherit = function(p) {
	this.x = (p.v[0] == 1) ? p.o.x : (p.v[0] == 2) ? this.x + p.o.x : this.x;
	this.y = (p.v[1] == 1) ? p.o.y : (p.v[1] == 2) ? this.y + p.o.y : this.y;
	this.w = (p.v[2] == 1) ? p.o.w : (p.v[2] == 2) ? this.w + p.o.w : this.w;
	this.h = (p.v[3] == 1) ? p.o.h : (p.v[3] == 2) ? this.h + p.o.h : this.h;
	this.f = (p.v[4] == 1) ? p.o.f : this.f;
	this.s = (p.v[5] == 1) ? p.o.s : this.s;
	this.t = (p.v[6] == 1) ? p.o.t : (p.v[6] == 2) ? this.t + p.o.t : this.t;
	return this;
};
