
App.Hub = function()
{

    this.startLevel = function(levelData)
    {
        this.levelData = levelData;
        gameState = 'playing';

        // create a grid
        var numCells = levelData.length;
        var minSize = Math.min(wade.getScreenWidth(), wade.getScreenHeight());
        var cellSize = minSize / numCells;
        var gridSprite = new Sprite();
        gridSprite.setSize(minSize, minSize);
        gridSprite.setDrawFunction(wade.drawFunctions.grid_(numCells, numCells, 'white', 3));
        var grid = new SceneObject(gridSprite);
        grid.numCells = numCells;
        grid.setName('grid');
        wade.addSceneObject(grid);
        wade.setMinScreenSize(minSize, minSize);

        // add dots
        for (var i=0; i < numCells; i++)
        {
            for (var j=0; j < numCells; j++)
            {
                var colorId = levelData[j][i];
                if (colorId)
                {
                    var dotSprite = new Sprite();
                    var dotSize = cellSize * 0.9;
                    var dotPosition = this.gridToWorld(j, i);
                    dotSprite.setSize(dotSize, dotSize);
                    dotSprite.color = colors[colorId];
                    wade.addSceneObject(new SceneObject(dotSprite, 0, dotPosition.x, dotPosition.y));
                    dotSprite.setDrawFunction(function(context)
                    {
                        var pos = this.getPosition();
                        var size = this.getSize();
                        var fillStyle = context.fillStyle;
                        context.fillStyle = this.color;
                        context.beginPath();
                        context.moveTo(pos.x, pos.y);
                        context.arc(pos.x, pos.y, size.x / 2, 0, Math.PI * 2, false);
                        context.fill();
                        context.fillStyle = fillStyle;
                    });
                }
            }
        }

        // set up line objects
        lines.length = 0;
        for (i=1; i < levelData.length + 1; i++)
        {
            var lineSprite = new Sprite();
            lineSprite.setSize(minSize, minSize);
            var lineObject = new SceneObject(lineSprite);
            wade.addSceneObject(lineObject);
            lines[i] = lineObject;
            lineObject.points = [];
            lineObject.color = colors[i];
            lineSprite.setDrawFunction(function(context)
            {
                var points = this.getSceneObject().points;
                var color = this.getSceneObject().color;
                if (points.length)
                {
                    // store context properties that we are going to change
                    var lineWidth = context.lineWidth;
                    var strokeStyle = context.strokeStyle;
                    var lineCap = context.lineCap;
                    var lineJoin = context.lineJoin;

                    // set new context properties
                    context.lineWidth = cellSize / 3;
                    context.strokeStyle = color;
                    context.lineCap = context.lineJoin = 'round';

                    // draw line
                    context.beginPath();
                    var worldPoint = wade.app.gridToWorld(points[0].x, points[0].y);
                    context.moveTo(worldPoint.x, worldPoint.y);
                    for (var i=1; i < points.length; i++)
                    {
                        worldPoint = wade.app.gridToWorld(points[i].x, points[i].y);
                        context.lineTo(worldPoint.x, worldPoint.y);
                    }
                    context.stroke();

                    // restore context properties
                    context.lineWidth = lineWidth;
                    context.strokeStyle = strokeStyle;
                    context.lineCap = lineCap;
                    context.lineJoin = lineJoin;
                }
            });
        }

        // set up the state of the lines on the grid
        for (i=0; i < levelData.length; i++)
        {
            gridLines[i] = [];
        }
    };

};