/**
 * Yeah, the code is kinda ugly. 90% of this was typed on an iPad though.
 * I don't actually know how this works. Just guessing.
 * ----------------------------------------------------------------------
 * 
 * The color method takes 3 parameters: red, green, and blue. It then returns those values as an object.
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

/**
 * The rgbToColor method converts "rgb(r, g, b)" to color(r, g, b).
 * 
 * @method rgbToColor
 * @param  {String} [rgbString] An rgb() string
 * @return {color} An rgb() string converted to color()
 * @example
 * var divColor = div1.style.backgroundColor;
 * playerObject.f = rgbToColor(divColor)
 * 
*/

function rgbToColor(rgb) {
	var s1 = rgb.replace("rgb(", "");
	var s2 = s1.replace(")", "");
	var sa = s2.split(", ");
	return color(sa[0], sa[1], sa[2]);
}

/**
 * The colorToRgb converts color(r, g, b) to "rgb(r, g, b)".
 * 
 * @method colorToRgb
 * @param  {color} [colorObject] A color() object
 * @return {String} A color() object converted to an rgb() string
 * @example
 * playerObject.f = color(0, 255, 0);
 * div1.style.backgroundColor = colorToRgb(playerObject.f);
 * 
*/


function colorToRgb(color) {
	return "rgb(" + color.r + ", " + color.g + ", " + color.b + ")";
}

/**
 * The keyPress method is a greatly simplified version of the addEventListener function.
 *
 * @method keypress
 * @param {Number} [keyCode] Key to be pressed
 * @param {Function} [ifTrue] If key is pressed
 * @param {Function} [ifFalse] If key is not pressed (optional)
 * @example
 * keypress({
 *     k: 32,
 *     t: function() {
 *         playerObject.f = color(0, 255, 0);
 *     },
 *     f: function() {
 *         playerObject.f = color(150, 150, 150);
 *     }
 * });
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

/**
 * The object method creates the data for a new DOM element, and it is needed in order to use the other functions in the library.
 * All undefined parameters will default to the selected DOM element's corrosponding values.
 * All parameters can be called and set as object properties when needed.
 * 
 * @method object
 * @param {Object} [originalValues] Returns original element values
 * @param {String} [ElementID_Name] ID name of any DOM element. A new element is created if left undefined
 * @param {Number} [xPosition] The element's distance from the left side of the screen
 * @param {Number} [yPosition] The element's distance from the top side of the screen
 * @param {Number} [width] The element's width
 * @param {Number} [heigth] The element's height
 * @param {color} [fillColor] The element's background color
 * @param {color} [strokeColor] The element's edge color
 * @param {color} [textColor] The element's text color
 * @param {Number} [strokeThickness] The element's edge thickness 
 * @example
 * var player = new object({
 *     x: 100,
 *     y: 100,
 *     w: 50,
 *     h: 50,
 *     f: color(0, 255, 0),
 *     s: color(255, 0, 0),
 *     t: 5
 * }); //creates data for a square that is green with a thick red outline.
 * 
 * var player2 = new object({
 *     el: "div-1",
 *     f: color(255, 127, 0)
 * }); //only changes the element's background color to orange
 * 
 * player.x = 200; //sets the element's left value to 200px
 * player.x = player.p.x; //player's x position is now back to its original value
 * 
 * player2.x = 100; //sets the element's left value to 100px
 * 
*/

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
		this.x = (p.x === undefined) ? this.el.style.left : p.x;
		this.y = (p.y === undefined) ? this.el.style.top : p.y;
		this.w = (p.w === undefined) ? this.el.style.width : p.w;
		this.h = (p.h === undefined) ? this.el.style.height : p.h;
		this.f = (p.f === undefined) ? rgbToColor(this.el.style.backgorundColor) : p.f;
		this.c = (p.c === undefined) ? rgbToColor(this.el.style.color) : p.c;
		this.s = (p.s === undefined) ? rgbToColor(this.el.style.borderColor) : p.s;
		this.t = (p.t === undefined) ? this.el.style.borderWidth : p.t;
	}
}

/**
 * Nothing is actually drawn or colored until you call the .create() method on an object.
 * 
 * @method create
 * @readOnly
 * @example
 * player.create(); //player is drawn on the canvas
 * //because player2.create() was not called, player2's fill color and x position will not change
 * 
*/

object.prototype.create = function() {
	this.el.style.position = (this.el.style.positon === undefined) ? "absolute" : this.el.style.position;
	this.el.style.backgroundColor = colorToRgb(this.f);
	this.el.style.borderColor = colorToRgb(this.s);
	if(this.c !== undefined) {
		this.el.style.color = colorToRgb(this.c);
	}
	this.el.style.borderWidth = this.t + "px";
	this.el.style.borderStyle = (this.el.style.borderStyle === undefined) ? "solid" : this.el.style.borderStyle;
	this.el.style.left = this.x + "px";
	this.el.style.top = this.y + "px";
	this.el.style.width = this.w + "px";
	this.el.style.height = this.h + "px";
	document.body.appendChild(this.el);
};

/**
 * Turns the selected object into a clickable button.
 * 
 * @method button
 * @param {Boolean} [onMobile] If true, touchstart/touchend will be used. If false or undefined, mousedown/mouseup will be used
 * @param {Function} [ifTrue] If the object is clicked
 * @param {Function} [ifFalse] If the object is not clicked
 * @example
 * player2.button({
 *     m: true, //mobile touch events will now be used
 *     t: function() {
 *         player.x = 200; //player's x position is now 200px
 *     },
 *     f: function() {
 *         player.x = player.p.x; //player's x position is now its original value
 *     }
 * });
 * 
*/

object.prototype.button = function(p) {
	if(p.m === undefined || p.m === false) {
	    this.el.addEventListener("mousedown", function(e) {
	        p.t();
	    });
	    this.el.addEventListener("mouseup", function(e) {
		    p.f();
	    });
	}else if(p.m === true) {
		this.el.addEventListener("touchstart", function(e) {
			p.t();
		});
		this.el.addEventListener("touchend", function(e) {
			p.f();
		});
	}else{}
};

/**
 * Same as .button(), but different kinds events can be used.
 * 
 * @method mouse
 * @param {String} [eventType] Can be set to click, tap, or over
 * @param {Function} [ifTrue] If event occurs
 * @param {Function} [ifFalse] If event does not occur
 * 
*/

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
		case "tap":
			this.el.addEventListener("touchstart", function(e) {
				p.t();
			});
			this.el.addEventListener("touchend", function(e) {
				p.f();
			});
			break;
		case "drag":
			//not implemented yet
			break;
		case "over":
			this.el.addEventListener("mouseover", function(e) {
				e.preventDefault();
				p.t();
			});
			this.el.addEventListener("mouseout", function(e) {
				e.preventDefault();
				p.f();
			});
			break;
		default:
		    break;
	}
};

/**
 * Allows any object to inherit or extend properties from another object.
 * 
 * @method inherit
 * @param {Object} [objectToInheritFrom] The object to inherit properties from
 * @param {Number[x, y, w, h, f, s, c*, t]} [values] For each, 0 = ignore, 1 = inherit, 2 = add to own. c is optional
 * @example
 * p2.inherit({
 *     o: p1,
 *     v: [2, 1, 0, 0, 1, 0, 2]
 * }); //p2.x = p2.x + p1.x; p2.y = p1.y; p2.f = p1.f; p2.t = p2.t + p1.t;
 * 
*/

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
