	(function () {
		var rgb2hex = JS.rgb2hex;
		var color1 = rgb2hex ('rgba(255,0,0,0)');
		var color2 = rgb2hex ('rgba(255,255,0,0)');
		var color3 = rgb2hex ('rgba(255,255,255,0)');
		var color4 = rgb2hex ('rgba(255,0,255,0)');
		var color5 = rgb2hex ('rgba(255,80,80,0)');
		var color6 = rgb2hex ('rgba(255,128,0,0)');
		var color7 = rgb2hex ('rgba(255,128,255,0)');
		var color8 = rgb2hex ('rgba(255,0,128,0)');
		var colors = list ([color1, color2, color3, color4, color5, color6, color7, color8]);
		var allcolors = function () {
			var __accu0__ = [];
			var __iter0__ = zip (colors, colors);
			for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
				var tuplecolor = __iter0__ [__index0__];
				var __iter1__ = tuplecolor;
				for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
					var color = __iter1__ [__index1__];
					__accu0__.append (color);
				}
			}
			return __accu0__;
		} ();
		JS.shuffle (allcolors);
		var all = function (iterable) {
			var __iter0__ = iterable;
			for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
				var element = __iter0__ [__index0__];
				if (!element) {
					return false;
				}
			}
			return true;
		};
		var Grid = __class__ ('Grid', [object], {
			get __init__ () {return __get__ (this, function (self, game, rows, cols) {
				if (typeof rows == 'undefined' || (rows != null && rows .__class__ == __kwargdict__)) {;
					var rows = 4;
				};
				if (typeof cols == 'undefined' || (cols != null && cols .__class__ == __kwargdict__)) {;
					var cols = 4;
				};
				self.offset = 4;
				self.game = game;
				self.rows = rows;
				self.cols = rows;
				self.ligs = function () {
					var __accu0__ = [];
					for (var j = 0; j < self.cols; j++) {
						__accu0__.append (function () {
							var __accu1__ = [];
							for (var i = 0; i < self.rows; i++) {
								__accu1__.append (0);
							}
							return __accu1__;
						} ());
					}
					return __accu0__;
				} ();
				self.spr = function () {
					var __accu0__ = [];
					for (var j = 0; j < self.cols; j++) {
						__accu0__.append (function () {
							var __accu1__ = [];
							for (var i = 0; i < self.rows; i++) {
								__accu1__.append (0);
							}
							return __accu1__;
						} ());
					}
					return __accu0__;
				} ();
			});},
			get display () {return __get__ (this, function (self) {
				var numcells = self.rows * self.cols;
				var cells = range (16);
				JS.shuffle (cells);
				JS.shuffle (colors);
				var __iter0__ = cells;
				for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
					var num = __iter0__ [__index0__];
					var color = allcolors [num];
					var __left0__ = tuple ([num % self.cols, Math.floor (num) / Math.floor (self.rows)]);
					var i = __left0__ [0];
					var j = __left0__ [1];
					var __left0__ = tuple ([i * (128 + self.offset), j * (128 + self.offset)]);
					var posx = __left0__ [0];
					var posy = __left0__ [1];
					var sprite = self.game.rectangle (128, 128, color);
					sprite.x = posx;
					sprite.y = posy;
					sprite.num = num;
					sprite.content = color;
					sprite.showed = false;
					var rectb = self.game.rectangle (128, 128, 'blue');
					rectb.x = posx;
					rectb.y = posy;
					rectb.num = num;
					self.ligs [i] [j] = rectb;
					self.spr [i] [j] = sprite;
				}
			});}
		});
		var Memory = __class__ ('Memory', [object], {
			get __init__ () {return __get__ (this, function (self, width, height) {
				if (typeof width == 'undefined' || (width != null && width .__class__ == __kwargdict__)) {;
					var width = 512;
				};
				if (typeof height == 'undefined' || (height != null && height .__class__ == __kwargdict__)) {;
					var height = 512;
				};
				self.game = hexi (width, height, self.setup);
				self.game.backgroundColor = 'seagrean';
				self.mouse = self.game.pointer;
				self.mouse.tap = self.tap;
				self.grid = Grid (self.game);
				self.curcell = null;
				self.clickedcells = list ([]);
			});},
			get tap () {return __get__ (this, function (self) {
				self.tapped = true;
			});},
			get setup () {return __get__ (this, function (self) {
				self.game.scaleToWindow ('seaGreen');
				self.grid.display ();
				self.game.state = self.play;
			});},
			get get_curcell () {return __get__ (this, function (self) {
				for (var i = 0; i < self.grid.rows; i++) {
					for (var j = 0; j < self.grid.cols; j++) {
						var curcell = self.grid.ligs [i] [j];
						if (self.game.hit (self.game.pointer, curcell)) {
							self.curcell = curcell;
						}
					}
				}
			});},
			get compare_cells () {return __get__ (this, function (self) {
				if (len (self.clickedcells) < 2) {
					return ;
				}
				var numrows = self.grid.rows;
				var numcols = self.grid.cols;
				var resetcell = function (cells) {
					var _reset = function () {
						cells [0].alpha = 1;
						cells [1].alpha = 1;
						self.clickedcells = list ([]);
					};
					return _reset;
				};
				var __left0__ = self.clickedcells.__getslice__ (0, 2, 1);
				var cella = __left0__ [0];
				var cellb = __left0__ [1];
				if (cella.num != cellb.num) {
					var __left0__ = tuple ([cella.num % numcols, Math.floor (cella.num) / Math.floor (numrows)]);
					var icella = __left0__ [0];
					var jcella = __left0__ [1];
					var __left0__ = tuple ([cellb.num % numcols, Math.floor (cellb.num) / Math.floor (numrows)]);
					var icellb = __left0__ [0];
					var jcellb = __left0__ [1];
					var spritea = self.grid.spr [icella] [jcella];
					var spriteb = self.grid.spr [icellb] [jcellb];
					var contenta = spritea.content;
					var contentb = spriteb.content;
					cellb.alpha = 0;
					cella.alpha = 0;
					if (contenta != contentb) {
						setTimeout (resetcell (list ([cella, cellb])), 1000);
					}
					else {
						spritea.showed = true;
						spriteb.showed = true;
						self.clickedcells = list ([]);
					}
				}
			});},
			get check_endgame () {return __get__ (this, function (self) {
				var lst_spr = function () {
					var __accu0__ = [];
					var __iter0__ = self.grid.spr;
					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
						var liste_sprites = __iter0__ [__index0__];
						var __iter1__ = liste_sprites;
						for (var __index1__ = 0; __index1__ < __iter1__.length; __index1__++) {
							var sprite = __iter1__ [__index1__];
							__accu0__.append (sprite);
						}
					}
					return __accu0__;
				} ();
				var showed_values = function () {
					var __accu0__ = [];
					var __iter0__ = lst_spr;
					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
						var s = __iter0__ [__index0__];
						__accu0__.append (s.showed);
					}
					return __accu0__;
				} ();
				if (all (showed_values)) {
					var __iter0__ = lst_spr;
					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
						var s = __iter0__ [__index0__];
						s.alpha = 0;
					}
					self.game.state = self.end;
				}
			});},
			get play () {return __get__ (this, function (self) {
				self.check_endgame ();
				self.get_curcell ();
				if (self.mouse.tapped) {
					(!__in__ (self.curcell, self.clickedcells) ? self.clickedcells.append (self.curcell) : null);
					self.mouse.tapped = false;
					self.compare_cells ();
				}
			});},
			get start () {return __get__ (this, function (self) {
				self.game.start ();
			});},
			get end () {return __get__ (this, function (self) {
				console.log ('END');
			});}
		});
		var memory = Memory ();
		memory.start ();
		__pragma__ ('<all>')
			__all__.Grid = Grid;
			__all__.Memory = Memory;
			__all__.all = all;
			__all__.allcolors = allcolors;
			__all__.color1 = color1;
			__all__.color2 = color2;
			__all__.color3 = color3;
			__all__.color4 = color4;
			__all__.color5 = color5;
			__all__.color6 = color6;
			__all__.color7 = color7;
			__all__.color8 = color8;
			__all__.colors = colors;
			__all__.memory = memory;
			__all__.rgb2hex = rgb2hex;
		__pragma__ ('</all>')
	}) ();
