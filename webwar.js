/**
 * 
 */
App = function()
{
	
	this.load = function()
	{
		wade.loadImage('assets/mole.png');
	};

	this.init = function()
	{
		/*
		var sprite = new Sprite('assets/mole.png',10);
		var mole = new SceneObject(sprite);
		wade.addSceneObject(mole);
		*/
        this.createMainMenu();
		
	};
	
	
	this.createMainMenu = function()
	{
		gameState = 'mainMenu';
	    var screenWidth = wade.getScreenWidth();
	    var screenHeight = wade.getScreenHeight();
	    wade.setMinScreenSize(0, 0);
	    
        // create background gradient
        var backSprite = new Sprite(null, 20);
        backSprite.setSize(screenWidth, screenHeight);
        backSprite.setDrawFunction(wade.drawFunctions.gradientFill_({x: 0, y: 1}, ['#444', '#000']));
        var backObject = new SceneObject(backSprite);
        wade.addSceneObject(backObject);
	};

	
	
}