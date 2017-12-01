//Make sure the code for Property.js is at the top of you project file or in the <head> tag.
/** In the <body> tag:
 * 
 * <div id="div-1">div</div>
 * 
**/

var div1 = new object({
	el: "div-1",
	f: color(0, 255, 0),
	c: color(0, 0, 255)
});

var obj1 = new object({
	x: 150,
	y: 150,
	h: 25,
	s: color(255, 127, 0),
	t: 2
});

obj1.inherit({
	o: div1,
	v: [0, 0, 1, 2, 1, 0, 0]
});

var keylist = [
	[37, 39, 38, 40],
	[function() {div1.x-=2;}, function() {div1.x+=2;}, function() {div1.y-=2;}, function() {div1.y+=2;}],
];

// For some reason, setInterval and var += value don't go together, so this might break.
window.setInterval(function() {
	for(var i = 0; i < keylist[0].length; i++) {
		keypress({
			k: keylist[0][i],
			t: keylist[1][i]
		});
	}
	
	obj1.button({
		t: function() {
			obj1.f = color(150, 150, 150);
			div1.x = 0;
			div1.y = 0;
		},
		f: function() {
			obj1.f = div1.f;
		}
	});
	
	div1.mouse({
		e: "over",
		t: function() {
			div1.f = color(255, 0, 0);
		},
		f: function() {
			div1.f = color(0, 255, 0);
		}
	});
	
	div1.collide({
		o: obj1,
	});
	
	div1.create();
	obj1.create();
}, 1000 / 60);
