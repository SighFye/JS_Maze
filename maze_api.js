var mazeData = [10, 10, 5, 1, 6, 10, 
				5, 13, 12, 5, 12, 10, 8, 5, 13, 12,
				6, 13, 8, 6, 8, 5, 7, 6, 1, 8, 
				5, 12, 2, 12, 6, 4, 5, 8, 14, 14, 
				2, 13, 7, 5, 13, 7, 11, 6, 4, 11, 
				14, 5, 8, 6, 13, 13, 13, 8, 6, 8, 
				14, 14, 14, 9, 5, 13, 8, 6, 13, 4, 
				14, 14, 14, 6, 3, 8, 6, 13, 8, 14, 
				6, 4, 6, 8, 5, 4, 10, 8, 6, 4, 
				9, 14, 5, 7, 11, 6, 8, 6, 8, 14, 
				6, 7, 6, 13, 13, 13, 3, 13, 7, 11];
var playerX = mazeData[2];
var playerY = mazeData[3];
var endX = mazeData[4];
var endY = mazeData[5];
var disableNorth = false;
//set coordinate points
var a = {x:0, y:0};
var b = {x:350, y:0};
var c = {x:0, y:350};
var d = {x:350, y:350};
var e = {x:50, y:50};
var f = {x:50, y:300};
var g = {x:300, y:300};
var h = {x:300, y:50};
var i = {x:125, y:125};
var j = {x:225, y:125};
var k = {x:125, y:225};
var l = {x:225, y:225};
var m = {x:50, y:125};
var n = {x:300, y:125};
var o = {x:50, y:225};
var p = {x:300, y:225};
var q = {x:0, y:50};
var r = {x:0, y:300};
var s = {x:350, y:300};
var t = {x:350, y:50};
//Set Constants
var NORTH = 0;
var EAST = 1;
var SOUTH = 2;
var WEST = 3;
var playerDirection = NORTH;
var mazeWidth = mazeData[0];
var mazeHeight = mazeData[1];
var can=document.getElementById("mazeCanvas");
var ctx=can.getContext("2d");
$('#direction').val(playerDirection);
function buildView(x, y, direction)
{
	disableNorth = false;
	var northWall = false;
	var southWall = false;
	var eastWall = false;
	var westWall = false;
	var backNorthWall = false;
	var backSouthWall = false;
	var backEastWall = false;
	var backWestWall = false;
	var nextX = 0;
	var nextY = 0;
	if(direction == WEST)
	{
		nextX = playerX - 1;
		nextY = playerY;
	}
	else if(direction == EAST)
	{
		nextX = playerX + 1;
		nextY = playerY;
	}
	else if(direction == NORTH)
	{
		nextX = playerX;
		nextY = playerY-1;
	}
	else if(direction == SOUTH)
	{
		nextX = playerX;
		nextY = playerY + 1;
	}
	
	var index = 6 + (x-1) + (y-1)*mazeData[1];
	var buildIndex = mazeData[index];
	//Determine which sides have walls
	if(buildIndex == 1 || buildIndex == 5 || buildIndex == 8 || buildIndex == 9 || buildIndex == 12 || buildIndex == 10 || buildIndex == 13 || buildIndex == 15)
	{
		northWall = true;
	}
	if(buildIndex == 4 || buildIndex == 8 || buildIndex == 7 || buildIndex == 9 || buildIndex == 12 || buildIndex == 11 || buildIndex == 14 || buildIndex == 16)
	{
		eastWall = true;
	}
	if(buildIndex == 2 || buildIndex == 5 || buildIndex == 6 || buildIndex == 9 || buildIndex == 11 || buildIndex == 10 || buildIndex == 14 || buildIndex == 16)
	{
		westWall = true;
	}
	if(buildIndex == 3 || buildIndex == 7 || buildIndex == 6 || buildIndex == 12 || buildIndex == 11 || buildIndex == 10 || buildIndex == 13 || buildIndex == 15)
	{
		southWall = true;
	}
	//Swap the walls base on viewing direction
	var tempWall;
	switch(direction)
	{
		case WEST:
			tempWall = northWall;
			northWall = westWall;
			westWall = southWall;
			southWall = eastWall;
			eastWall = tempWall;
			break;
		case SOUTH:
			tempWall = northWall;
			northWall = southWall;
			southWall = tempWall;
			tempWall = westWall;
			westWall = eastWall;
			eastWall = tempWall; 
			break;
		case EAST:
			tempWall = northWall;
			northWall = eastWall;
			eastWall = southWall;
			southWall = westWall;
			westWall = tempWall;
			break;
	}
	//Draw the walls
	if(northWall)
	{
		disableNorth = true;
		drawLine(e, h);
		drawLine(f, g);
		if(westWall)
		{
			drawLine(f, e);
		}
		if(eastWall)
		{
			drawLine(g, h);
		}
	}
	else
	{
		//get back square info
		var backIndex = 0;
		switch(direction)
		{
			case NORTH:
				backIndex = index - mazeWidth;
				break;
			case SOUTH:
				backIndex = index + mazeWidth;
				break;
			case EAST:
				backIndex = index + 1;
				break;
			case WEST:
				backIndex = index - 1;
				break;
		}
		var backBuildIndex = mazeData[backIndex];
		//Determine which sides have walls
		if(backBuildIndex == 1 || backBuildIndex == 5 || backBuildIndex == 8 || backBuildIndex == 9 || backBuildIndex == 12 || backBuildIndex == 10 || backBuildIndex == 13 || backBuildIndex == 15)
		{
			backNorthWall = true;
		}
		if(backBuildIndex == 4 || backBuildIndex == 8 || backBuildIndex == 7 || backBuildIndex == 9 || backBuildIndex == 12 || backBuildIndex == 11 || backBuildIndex == 14 || backBuildIndex == 16)
		{
			backEastWall = true;
		}
		if(backBuildIndex == 2 || backBuildIndex == 5 || backBuildIndex == 6 || backBuildIndex == 9 || backBuildIndex == 11 || backBuildIndex == 10 || backBuildIndex == 14 || backBuildIndex == 16)
		{
			backWestWall = true;
		}
		if(backBuildIndex == 3 || backBuildIndex == 7 || backBuildIndex == 6 || backBuildIndex == 12 || backBuildIndex == 11 || backBuildIndex == 10 || backBuildIndex == 13 || backBuildIndex == 15)
		{
			backSouthWall = true;
		}
		//Swap the walls base on viewing direction
		var tempWall;
		switch(direction)
		{
			case WEST:
				tempWall = backNorthWall;
				backNorthWall = backWestWall;
				backWestWall = backSouthWall;
				backSouthWall = backEastWall;
				backEastWall = tempWall;
				break;
			case SOUTH:
				tempWall = backNorthWall;
				backNorthWall = backSouthWall;
				backSouthWall = tempWall;
				tempWall = backWestWall;
				backWestWall = backEastWall;
				backEastWall = tempWall; 
				break;
			case EAST:
				tempWall = backNorthWall;
				backNorthWall = backEastWall;
				backEastWall = backSouthWall;
				backSouthWall = backWestWall;
				backWestWall = tempWall;
				break;
		}
		//Draw Back Walls
		if(backNorthWall)
		{
			drawLine(i, j);
			drawLine(k, l);
		}
		if(backNorthWall && backWestWall)
		{
			drawLine(i, k);
		}
		if(backNorthWall && backEastWall)
		{
			drawLine(j, l);
		}
		if(backEastWall)
		{
			drawLine(j, h);
			drawLine(l, g);
		}
		else
		{
			drawLine(j, n);
			drawLine(l, p);
		}
		if(backWestWall)
		{
			drawLine(e, i);
			drawLine(f, k);
		}
		else
		{
			drawLine(i, m);
			drawLine(o, k);
		}
	}
	if(eastWall && !backEastWall)
	{
		drawLine(h, g);
	}
	if(!eastWall && !backEastWall && !northWall)
	{
		drawLine(h, g);
	}
	if(westWall && !backWestWall)
	{
		drawLine(e, f);
	}
	if(!backNorthWall && !northWall)
	{
		drawLine(i, k);
		drawLine(j,l);
	}
	if(!westWall && !backWestWall && !northWall)
	{
		drawLine(e, f);
	}
	if(northWall && westWall)
	{
		drawLine(f, e);
	}
	if(northWall && eastWall)
	{
		drawLine(h, g);
	}
	if(eastWall)
	{
		drawLine(h, b);
		drawLine(b, d);
		drawLine(d, g);
	}
	else
	{
		drawLine(h, t);
		drawLine(t, s);
		drawLine(s, g);
	}
	if(westWall)
	{
		drawLine(e, a);
		drawLine(a, c);
		drawLine(c, f);
	}
	else
	{
		drawLine(q, e);
		drawLine(r, f);
		drawLine(r, q);
	}
	if(nextX == endX && nextY == endY && !northWall)
	{
		ctx.beginPath();
		ctx.arc(175,175,25,0,2*Math.PI);
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.stroke();
	}
}
function drawLine(a, b)
{
	ctx.beginPath();
	ctx.moveTo(a.x,a.y);
	ctx.lineTo(b.x,b.y);
	ctx.stroke();
}
function turnLeft(new_playerDirection)
{
	ctx.clearRect ( 0 , 0 , 350 , 350 );
	if(new_playerDirection == NORTH)
	{
		playerDirection = WEST;
	}
	else if(new_playerDirection == WEST)
	{
		playerDirection = SOUTH;
	}
	else if(new_playerDirection == SOUTH)
	{
		playerDirection = EAST;
	}
	else if(new_playerDirection == EAST)
	{
		playerDirection = NORTH;
	}
	$('#direction').val(playerDirection);
	buildView(playerX, playerY, playerDirection);
}
function turnRight(new_playerDirection)
{
	ctx.clearRect ( 0 , 0 , 350 , 350 );
	if(new_playerDirection == NORTH)
	{
		playerDirection = EAST;
	}
	else if(new_playerDirection == WEST)
	{
		playerDirection = NORTH;
	}
	else if(new_playerDirection == SOUTH)
	{
		playerDirection = WEST;
	}
	else if(new_playerDirection == EAST)
	{
		playerDirection = SOUTH;
	}
	$('#direction').val(playerDirection);
	buildView(playerX, playerY, playerDirection);
}
function walk(new_playerDirection)
{
	ctx.clearRect ( 0 , 0 , 350 , 350 );
	if(new_playerDirection == NORTH)
	{
		playerY -= 1;
	}
	else if(new_playerDirection == WEST)
	{
		playerX -= 1;
	}
	else if(new_playerDirection == SOUTH)
	{
		playerY += 1;
	}
	else if(new_playerDirection == EAST)
	{
		playerX += 1;
	}
	buildView(playerX, playerY, playerDirection);
	if(playerX == endX && playerY == endY)
	{
		alert('solved');
	}
}
function checkKey(e)
{
	e = e || window.event;
	var theDirection = document.getElementById('direction').value;
	if(e.keyCode == 37)
	{
		turnLeft(theDirection);
	}
	else if(e.keyCode == 38)
	{
		if(disableNorth)
		{
		}
		else
		{
			walk(playerDirection);
		}
	}
	else if(e.keyCode == 39)
	{
		turnRight(theDirection);
	}
}
buildView(playerX, playerY, playerDirection);
document.onkeydown = checkKey;
