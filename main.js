//MODELO
//Función que define las propiedades del tablero
(function(){
	self.Board = function(width,height){
		this.width = width;
		this.height = height;
		this.playing = false;
		this.game_over = false;
		this.bars = [];
		this.ball = null;
	}

	self.Board.prototype = {
		get elements(){
			var elements = this.bars;
			elements.push(this.ball);
			return elements;
		}
	}
})();

//Función que define las propiedades de la pelota
(function(){
	self.Ball = function(x,y,radius,board){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speed_y = 0;
		this.speed_x = 3;
		this.board = board;

		board.ball = this;
		this.kind = "circle";
	}
})();

//Función que define las propiedades de las barras y su velocidad
(function(){
	self.Bar = function(x,y,width,height,board){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.board = board;
		this.board.bars.push(this);
		this.kind = "rectangle";
		this.speed = 10;
	}

	self.Bar.prototype = {
		down: function(){
			this.y += this.speed;
		},
		up: function(){
			this.y -= this.speed;
		},
		toString: function(){
			return "x: "+ this.x +" y: "+ this.y ;
		}
	}
})();

//VISTA
(function(){
	self.Boardview = function(canvas,board){
		this.canvas = canvas;
		this.canvas.width = board.width;
		this.canvas.height = board.height;
		this.board = board;
		this.ctx = canvas.getContext("2d");
	}

	self.Boardview.prototype = {
		clean: function(){
			this.ctx.clearRect(0,0,this.board.width,this.board.height);
		},
		draw: function(){
			for (var i = this.board.elements.length - 1; i >= 0; i--) {
		var el = this.board.elements[i];

		draw(this.ctx,el)
			};
		},
		play: function(){
			this.clean();
			this.draw();
		}
	}

	function draw(ctx,element){
		switch(element.kind){
			case "rectangle":
				ctx.fillRect(element.x,element.y,element.width,element.height);
				break;	
			case "circle":
				ctx.beginPath()
				ctx.arc(element.x,element.y,element.radius,0,7);
				ctx.fill();
				ctx.closePath();
				break;	
		}
	}
})();

var board = new Board(800,400);
var bar = new Bar(20,100,40,100,board);
var bar_2 = new Bar(740,100,40,100,board);
var canvas = document.getElementById('canvas');
var board_view = new Boardview(canvas,board);
var ball = new Ball(350,100,10,board);

//Métodos para el movimiento de las barras
window.requestAnimationFrame(controller);

document.addEventListener("keydown",function(ev){
	ev.preventDefault();
	//Flecha arriba
	if (ev.keyCode == 87) {
		bar.up();
	}
	//Flecha abajo
	else if (ev.keyCode == 83){
		bar.down();
	}
	//W
	else if (ev.keyCode == 38){
		bar_2.up();
	}
	//S
	else if (ev.keyCode == 40){
		bar_2.down();
	}

});


//CONTROLADOR
window.requestAnimationFrame(controller);

function controller(){	
	board_view.play();
	window.requestAnimationFrame(controller);

}