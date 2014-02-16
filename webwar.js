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
		var sprite = new Sprite('assets/mole.png');
		var mole = new SceneObject(sprite);
		wade.addSceneObject(mole);
		
		var grid = new Sprite();
		wade.addSceneObject(new SceneObject(grid));
		grid.setDrawFunction(wade.drawFunctions.grid_(20,20,'white'));
	};
};