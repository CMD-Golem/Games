// definable variables
var goal_points = 7; //Goal Points -1 (wenn 8 in settings dann var = 7)
var img_height = 80; //Image Height
var player_count = 1; // Player Count -1 (wenn 2 in settings dann var = 1)


player_id = undefined;
player_id = playerId(player_id);


function dice() {
	var player_img = document.getElementById("player" + player_id);
	//Random number for Dice
	var site = Math.floor(Math.random() * Math.floor(6));

	//Scroll to current player
	var scroll = parseInt(player_img.getAttribute("data-points")) * img_height - window.innerHeight / 2 + 200;
	window.scrollTo(0, scroll);

	//Go to next dice when number is 1 or lower (wolf)
	if (site <= 1) {
		

		console.log("wolf: " + site);

		document.getElementById("wolf").classList.add("img_dice_1");
		setTimeout(function(){ removeDiceImgWolf(player_img) }, 700);
		setTimeout(function(){ nextDice("wolf") }, 1350);
	}
	//Move sheep wehn number is higher then 1
	if (site > 1) {
		console.log("clover: " + site);

		document.getElementById("clover").classList.add("img_dice_1");
		setTimeout(function(){ removeDiceImg("clover") }, 700);
		setTimeout(function(){ cloverDice() }, 1350);
	}
}

function cloverDice() {
	var player_img = document.getElementById("player" + player_id);

	var points = player_img.getAttribute("data-points");
	var points = parseInt(points);

	// Save last position
	var points_last = player_img.getAttribute("data-last");
	if (points_last == null || points_last == "null") {
		player_img.setAttribute("data-last", points);
	}

	

	//If Points are same as Goal go to win
	if (points == goal_points) {
		console.log("WIN");
	}
	// Make next dice
	else {
		//Show confirm Button
		document.getElementById("confirm").style.display = "inline-block";
		//Remove Dice
		var dice_img = document.getElementById("clover");
		dice_img.classList.remove("img_dice_2");
	}
	// Add one point to current player
	points = points + 1;
	player_img.setAttribute("data-points", points);
	player_img.style.marginTop = points * img_height + "px";
	console.log(points)
}

function removeDiceImgWolf(player_img) {
	var points_last = player_img.getAttribute("data-last");
	var points_last = parseInt(points_last);
	if (points_last >= 0) {
		player_img.setAttribute("data-points", points_last);
		player_img.style.marginTop = points_last * img_height + "px";
	}
	removeDiceImg("wolf")
}


// Finish animation of dice
function removeDiceImg(action) {
	var dice_img = document.getElementById(action);
	dice_img.classList.remove("img_dice_1");
	dice_img.classList.add("img_dice_2");
}

// Reset dice
function nextDice(action) {
	var dice_img = document.getElementById(action);
	dice_img.classList.remove("img_dice_2");

	var player_img = document.getElementById("player" + player_id)
	player_img.style.borderColor = "transparent";
	player_img.setAttribute("data-last", null);

	document.getElementById("confirm").style.display = "none";

	//Get next player
	player_id = playerId(player_id);
}

// Set goal
var path = document.getElementsByClassName("path")
for (i = 0; i < path.length; i++) {
	//path[i].style.backgroundSize = img_height + "px " + goal_points * img_height + "px";
	path[i].getElementsByClassName("goal")[0].style.height = goal_points * img_height + 2 * img_height + "px";
}


// Change player
function playerId(id) {
	if (id == undefined || id >= player_count) {
		document.getElementById("player0").style.borderColor = "#007AD9";
		return 0;
	}
	else {
		var player_id_next = player_id + 1;
		document.getElementById("player" + player_id_next).style.borderColor = "#007AD9";
		return id + 1;
	}
}

