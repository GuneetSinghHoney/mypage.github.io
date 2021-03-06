var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var level2 = /** @class */ (function (_super) {
        __extends(level2, _super);
        // Public Properties
        // Constructor
        function level2(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this._count = 5;
            _this.sound = createjs.Sound.play("zomhorde");
            _this._zombieCounter = 0;
            _this.assetManager = assetManager;
            _this._hero = new objects.hero(_this.assetManager, objects.Game.keyboardmanager);
            _this._bg = new createjs.Bitmap(_this.assetManager.getResult("lvl2"));
            _this.addEventListener("click", _this._fireBullets);
            _this._zombiearray = new Array(_this._count);
            for (var i = 0; i < _this._zombiearray.length; i++) {
                _this._zombiearray[i] = new objects.zombie(_this.assetManager, _this._hero);
            }
            _this._zombiearray2 = new Array(3);
            for (var i = 0; i < _this._zombiearray2.length; i++) {
                _this._zombiearray2[i] = new objects.zombie2(_this.assetManager, _this._hero);
            }
            _this._bullet = new objects.bullet(_this.assetManager, _this._hero);
            _this._bullet.distance = 0;
            //     this._bullet1 = new objects.bullet(this.assetManager,this._hero);
            //     this._bullet1.distance = 20;
            _this.Start();
            return _this;
        }
        // Private Mathods
        level2.prototype._fireBullets = function () {
            console.log("fire");
            //   let x = new objects.bullet(this.assetManager,this._hero);
            //   x.distance = 20;
            //   this.addChild(x);
        };
        // Public Methods
        // Initialize Game Variables and objects
        level2.prototype.Start = function () {
            //initalise the variables
            this.Main();
        };
        level2.prototype.Update = function () {
            //call update function of all objects
            var _this = this;
            console.log(this._zombieCounter);
            if (this._zombieCounter == (this._zombiearray.length + 3)) {
                objects.Game.scene = config.Scene.LEVEL2;
                this.sound.stop();
                objects.Game.currentScene = config.Scene.CONGO;
            }
            this._hero.Update();
            this._bullet.Update();
            //     this._bullet1.Update();
            var num = Math.floor((Math.random() * this._count));
            this._zombiearray[num].Update();
            num = Math.floor((Math.random() * 3));
            this._zombiearray2[num].Update();
            this._zombiearray2.forEach(function (element) {
                if (element.iskilled == false) {
                    var check = managers.Collision.Check(element, _this._bullet);
                    //       let check2 = managers.Collision.Check(element,this._bullet1);
                    var check3 = managers.Collision.Check(element.bullet, _this._hero);
                    if (check) {
                        //collision bullet hits zombie
                        createjs.Sound.play("zombieDead");
                        _this.removeChild(element);
                        _this.removeChild(element.bullet);
                        _this._zombieCounter++;
                        element.iskilled = true;
                        createjs.Sound.play("cheek");
                        if (check)
                            _this._bullet.Reset();
                        //       if(check2)
                        //        this._bullet1.Reset();
                    }
                    if (check3) {
                        createjs.Sound.play("heroDead");
                        _this.removeChild(_this._hero);
                        console.log("hero removed");
                        _this.sound.stop();
                        _this.removeChild(_this._bullet);
                        //       this.removeChild(this._bullet1);
                        objects.Game.currentScene = config.Scene.OVER;
                    }
                }
            });
            //bullet zombie collision
            this._zombiearray.forEach(function (element) {
                if (element.iskilled == false) {
                    var check = managers.Collision.Check(element, _this._bullet);
                    //    let check2 = managers.Collision.Check(element,this._bullet1)
                    var check3 = managers.Collision.Check(element, _this._hero);
                    if (check) {
                        //collision bullet hits zombie
                        createjs.Sound.play("zombieDead");
                        _this.removeChild(element);
                        _this._zombieCounter++;
                        element.iskilled = true;
                        createjs.Sound.play("cheek");
                        if (check)
                            _this._bullet.Reset();
                        //       if(check2)
                        //         this._bullet1.Reset();
                    }
                    if (check3) {
                        createjs.Sound.play("heroDead");
                        _this.removeChild(_this._hero);
                        console.log("hero removed");
                        _this.removeChild(_this._bullet);
                        //        this.removeChild(this._bullet1);
                        objects.Game.currentScene = config.Scene.OVER;
                    }
                }
            });
        };
        // This is where the fun happens
        level2.prototype.Main = function () {
            // add the bg to the scene
            var _this = this;
            this.addChild(this._bg);
            this.addChild(this._bullet);
            ///    this.addChild(this._bullet1);
            this._zombiearray.forEach(function (element) {
                _this.addChild(element);
            });
            this._zombiearray2.forEach(function (element) {
                _this.addChild(element);
                _this.addChild(element.bullet);
            });
            this.addChild(this._hero);
        };
        return level2;
    }(objects.Scene));
    scenes.level2 = level2;
})(scenes || (scenes = {}));
//# sourceMappingURL=level2.js.map