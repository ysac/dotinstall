enchant();

/*

Core
- rootScene
-- Sprite (bear)

*/

window.onload = function() {
	// console.log('hello world');

	var core = new Core(320, 320);
	core.preload('chara1.png');
	core.fps = 15;
	core.onload = function() {

		// クマ
		var bear = new Sprite(32, 32);
		bear.image = core.assets['chara1.png'];
		bear.x = 0;
		bear.y = 0;
		bear.frame = 0;

		// シロクマ
		var enemy = new Sprite(32, 32);
		enemy.image = core.assets['chara1.png'];
		enemy.x = 80;
		enemy.y = 0;
		enemy.frame = 5;

		// ラベル
		var label = new Label();
		label.x = 280;
		label.y = 5
		label.color = 'red';
		label.font = '14px "Arial"';
		/*
		label.text = '0';
		label.on('enterframe', function() {
			// タイマー処理、フレーム数をfpsで割ると秒に
			label.text = (core.frame / core.fps).toFixed(2);
		});
		*/

		var gameOverScene = new Scene();
		gameOverScene.backgroundColor = 'black';

		bear.addEventListener('enterframe', function() {
			// カーソルキーで移動
			if (core.input.left) this.x -= 5;
			if (core.input.right) this.x += 5;
			if (core.input.up) this.y -= 5;
			if (core.input.down) this.y += 5;

			// intersect: わりとあいまいにぶつかったら
			if (this.intersect(enemy)) {
				// label.text = 'hit!';
			}

			// withini: 距離
			if (this.within(enemy, 10)) {
				// label.text = 'HIT!';
				core.pushScene(gameOverScene);
				core.stop();
			}

            // 画像を変えながら移動
			/*
			this.x += 5;
			this.frame = this.age % 3;
		    if (this.x > 320) this.x = 0;
			*/
		    
		    // 回転や大きさを変える
		    /*
			this.rotate(2);
			this.scale(1.01, 1.01);
			*/

		});

		// クリックしたら消える
		bear.on('touchstart', function() {
			core.rootScene.removeChild(this);
		});

		// クリックしたところに移動
		core.rootScene.on('touchstart', function(e) {
			bear.x = e.x;
			bear.y = e.y;
		})

		core.rootScene.addChild(label);
		core.rootScene.addChild(bear);
		core.rootScene.addChild(enemy);

		// Spriteクラスを拡張して、Bearクラスを作成
		var Bear = Class.create(Sprite, {
			initialize: function(x, y) {
				Sprite.call(this, 32, 32);
				this.x = x;
				this.y = y;
				this.frame = rand(5);
				this.opacity = rand(100) / 100;
				this.image = core.assets['chara1.png'];
				
				// タイムライン処理を連結してループ
				this.tl.moveBy(rand(100), 0, 40, enchant.Easing.BOUNCE_EASEOUT)
					   .moveBy(-rand(100), -rand(20), rand(20))
					   .fadeOut(20)
					   .fadeIn(10)
					   .loop();

				/*
				this.on('enterframe', function() {
					// this.x += 5;
					this.rotate(rand(10));
				});
				*/
				core.rootScene.addChild(this);
			}
		});

		// クマを大量に生成
		// var bear = new Bear(0, 100);
		var bears = [];
		for (var i = 0; i < 100; i++) {
			bears[i] = new Bear(rand(320), rand(320));
		};
	
	}

	core.start();
};

// 乱数生成用の関数
function rand(n) {
	return Math.floor(Math.random() * n+1);
};

