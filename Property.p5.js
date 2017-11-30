var p5 = require("p5");

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
}
function col(red, green, blue) {
	return {
		r: red,
		g: green,
		b: blue
	};
}
function colorToRgb(color) {
	return "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
}
function rgbToColor(rgb) {
	var s1 = rgb.replace("rgb(", "");
	var s2 = s1.replace(")", "");
	var sa = s2.split(", ");
	return col(sa[0], sa[1], sa[2]);
}

function object(p) {
	if(p.el === undefined) {
	    this.x = p.x;
	    this.y = p.y;
	    this.w = p.w;
    	this.h = p.h;
	    this.f = (p.f === undefined) ? col(255, 255, 255) : p.f;
	    this.s = (p.s === undefined) ? col(0, 0, 0) : p.s;
	    this.t = (p.t === undefined) ? 1 : p.t;
	}else{
		this.el = document.getElementById(p.el);
		this.x = (p.x === undefined) ? this.el.style.left : p.x;
		this.y = (p.y === undefined) ? this.el.style.top : p.y;
		this.w = (p.w === undefined) ? this.el.style.width : p.w;
		this.h = (p.h === undefined) ? this.el.style.height : p.h;
		this.f = (p.f === undefined) ? rgbToColor(this.el.style.backgroundColor) : p.f;
		this.s = (p.s === undefined) ? rgbToColor(this.el.style.borderColor) : p.s;
		this.c = (p.c === undefined) ? rgbToColor(this.el.style.color) : p.c;
		this.t = (p.t === undefined) ? ((this.el.style.borderWidth === undefined) ? rgbToColor(this.el.style.borderWidth) : 1) : p.t;
	}
}
object.prototype.create = function(asCanvasElement) {
	if(this.c === undefined && asCanvasElement === undefined) {
	    fill(this.f.r, this.f.g, this.f.b);
	    stroke(this.s.r, this.s.g, this.s.b);
	    strokeWeight(this.t);
	    rect(this.x, this.y, this.w, this.h);
	}else if(this.c !== undefined && asCanvasElement === undefined) {
		this.el.style.position = (this.p === undefined) ? "absolute" : this.p;
		this.el.style.borderStyle = "solid";
		this.el.style.backgroundColor = colorToRgb(this.f);
		this.el.style.borderColor = colorToRgb(this.s);
		this.el.style.color = colorToRgb(this.c);
		this.el.style.left = this.x + "px";
		this.el.style.top = this.y + "px";
		this.el.style.width = this.w + "px";
		this.el.style.height = this.h + "px";
		this.el.style.borderWidth = this.t + "px";
	}else if(this.c !== undefined && asCanvasElement === true) {
		this.el.style.visibility = "hidden";
		fill(this.f.r, this.f.g, this.f.b);
		stroke(this.s.r, this.s.g, this.s.b);
		strokeWeight(this.t);
		rect(this.x, this.y, this.w, this.h);
		fill(this.c.r, this.c.g, this.c.b);
		noStroke();
		text(this.el.textContent, this.x + 1, this.y + this.h/4);
	}else{}
};
object.prototype.collide = function(p) {
	var cx, cy, tx, ty;
	if(this.r === undefined && p.o.r === undefined) {
		if(((this.x <= p.o.x + p.o.w) && (this.x + this.w >= p.o.x) && (this.y < p.o.y + p.o.h) && (this.y + this.h > p.o.y) && this.x + this.w/2 > p.o.x)) {
			this.x += p.s[0];
		}
		if(((this.x <= p.o.x + p.o.w) && (this.x + this.w >= p.o.x) && (this.y < p.o.y + p.o.h) && (this.y + this.h > p.o.y) && this.x + this.w/2 < p.o.x + p.o.w/2)) {
			this.x -= p.s[0];
		}
		if(((this.x <= p.o.x + p.o.w) && (this.x + this.w >= p.o.x) && (this.y <= p.o.y + p.o.h) && (this.y + this.h >= p.o.y) && this.y + this.h/2 > p.o.y + p.o.h/2)) {
			this.y += p.s[1];
		}
		if(((this.x <= p.o.x + p.o.w) && (this.x + this.w >= p.o.x) && (this.y <= p.o.y + p.o.w) && (this.y +this.h >= p.o.y) && this.y + this.h/2 < p.o.y + p.o.h/2)) {
			this.y -= p.s[1];
		}
	}
	/*else if(this.r === undefined && p.o.r !== undefined) {
		cx = p.o.x + p.o.r/2;
		cy = p.o.y + p.o.r/2;
		tx = cx;
		ty = cy;
		if(cx < this.x){
			tx = this.x; //left
		}else if(cx > this.x + this.w){
			tx = this.x + this.w; //right
		}
		if(cy < this.y){
			ty = this.y; //top
		}else if(cy > this.y + this.h){
			ty = this.y + this.h; //bottom
		}
		if(dist(cx, cy, tx, ty) <= p.o.r/2) {
		    if(this.x < cx) {
		    	this.x -= p.s[0];
		    }else if(this.x > cx) {
		    	this.x += p.s[0];
		    }else if(this.y < cy) {
		    	this.y -= p.s[1];
		    }else if(this.y > cy) {
		    	this.y += p.s[1];
		    }
		}
	}else if(this.r !== undefined && p.o.r === undefined) {
		cx = this.x;
		cy = this.y;
		tx = cx;
		ty = cy;
		if(cx + this.r < p.o.x){
			tx = p.o.x;
		}else if(cx > p.o.x + p.o.w){
			tx = p.o.x + p.o.w;
		}
		if(cy + this.r < p.o.y){
			ty = p.o.y;
		}else if(cy > p.o.y + p.o.h){
			ty = p.o.y + p.o.h;
		}
		if(dist(cx, 0, tx, 0) <= this.r/2 + p.o.w/2 && dist(0, cx + this.r/2, 0, ty) <= this.r/2 + p.o.h/2) {
		    if(p.o.x + p.o.w < cx) {
		    	this.x -= p.s[0];
		    }else if(p.o.x > cx  + this.r) {
		    	this.x += p.s[0];
		    }else if(p.o.y + p.o.h < cy) {
		    	this.y -= p.s[1];
		    }else if(p.o.y > cy + this.r/2) {
		    	this.y += p.s[1];
		    }
		}
	}*/
};
object.prototype.button = function(p) {
	if(this.r === undefined) {
	    if(mouseIsPressed && mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h) {
		    p.t();
	    }else{
	    	p.f();
	    }
	}else{
		if(mouseIsPressed && dist(mouseX, mouseY, this.x + this.r/2, this.y + this.r/2) <= this.r) {
			p.t();
		}else{
			p.f();
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
	}else{
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
	}
};

var div1 = new object({
	el: "div-1",
	w: 50,
	h: 50,
	f: col(0, 255, 0),
	s: col(255, 0, 255),
	c: col(255, 0, 0)
});

function draw() {
	background(255, 255, 255);
	
	
	
	div1.create(true);
	
}