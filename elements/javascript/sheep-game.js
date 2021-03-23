// definable variables
var img_height = 80; //Image Height
document.getElementById("player_box").innerHTML = player_selected;
var player_box = document.getElementById("player_box");
var player_count = player_box.getElementsByTagName("img").length - 1;
var i;
var player_counter = 0;


var player_edit = player_box.getElementsByClassName("path");
for (i = 0; i < player_edit.length; i++) {
	player_edit[i].draggable = false;
	player_edit[i].getElementsByTagName("img")[0].id ="player" + player_counter;
	player_counter = player_counter + 1;
}


// Set variables
player_id = undefined;
player_id = playerId(player_id);

player_img = undefined;
player_img = document.getElementById("player" + player_id);

// Set goal position
var path = document.getElementsByClassName("path");
for (i = 0; i < path.length; i++) {
	path[i].getElementsByClassName("goal")[0].style.height = goal_points * img_height + 2 * img_height + "px";
	path[i].getElementsByClassName("goal")[0].style.width = img_height + "px";
}


// ###############################################################
// Detect Dice
function dice() {
	var dice_face = Math.floor(Math.random() * Math.floor(6));
	
	//Scroll to current player
	var scroll = parseInt(player_img.getAttribute("data-points")) * img_height - window.innerHeight / 2 + 200;
	window.scrollTo(0, scroll);

	//Go to next dice when number is 1 or lower (wolf)
	if (dice_face <= 2) {
		console.log("wolf: " + dice_face);

		document.getElementById("wolf").classList.add("img_dice_1");
		setTimeout(function(){ removeLastPoints() }, 700);
		setTimeout(function(){ nextDice("wolf") }, 1350);
	}
	//Move sheep wehn number is higher then 1
	if (dice_face > 2) {
		console.log("clover: " + dice_face);

		document.getElementById("clover").classList.add("img_dice_1");
		setTimeout(function(){ removeDiceImg("clover") }, 700);
		setTimeout(function(){ cloverDice() }, 1350);
	}

	// Hide settings if display is to small
	if (screen.width <= 450) {
		document.getElementById("smallHide").style.display = "none";
	}
}


// ###############################################################
// Wolf
function removeLastPoints() {
	var points_last = parseInt(player_img.getAttribute("data-last"));

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


// ###############################################################
// Clover
function cloverDice() {
	var points = parseInt(player_img.getAttribute("data-points"));
	var points_last = player_img.getAttribute("data-last");

	// Save last position
	if (points_last == null || points_last == "null") {
		player_img.setAttribute("data-last", points);
	}

	//If Points are same as Goal go to win
	if (points == goal_points) {
		console.log("WIN");
		setTimeout(function(){ win() }, 500);
	}
	// Show confirm button
	else {
		document.getElementById("confirm").style.display = "inline-block";
		document.getElementById("clover").classList.remove("img_dice_2");
	}
	// Add one point to current player
	points = points + 1;
	player_img.setAttribute("data-points", points);
	player_img.style.marginTop = points * img_height + "px";
}

// ###############################################################
// Next Dice
function nextDice(action) {
	document.getElementById(action).classList.remove("img_dice_2");
	document.getElementById("confirm").style.display = "none";
	player_img.style.borderColor = "transparent";
	player_img.setAttribute("data-last", null);

	//Get next player
	player_id = playerId(player_id);
}

// Change player
function playerId(id) {
	if (id == undefined || id >= player_count) {
		player_img = document.getElementById("player0");
		player_img.style.borderColor = "#007AD9";

		return 0;
	}
	else {
		var player_id_next = player_id + 1;
		player_img = document.getElementById("player" + player_id_next);
		player_img.style.borderColor = "#007AD9";

		return id + 1;
	}
}


// ###############################################################
// Win
function win() {
	document.getElementById("medal").style.display = "inline-block";
	player_img.style.marginTop = 0;
	player_img.style.borderColor = "transparent";
	player_img.classList.add("win");

	setTimeout(function(){ restart() }, 2000);
}

// ###############################################################
// Button Functions

//Instructions
var instruction = false;

function instructions() {
	if (instruction == false) {
		instruction = true;
		document.getElementsByTagName("aside")[0].style.display = "block";
	}
	else {
		instruction = false;
		document.getElementsByTagName("aside")[0].style.display = "none";
	}
}

//Restart
function restart() {
	document.getElementById("medal").style.display = "none";
	document.getElementById("confirm").style.display = "none";
	document.getElementById("smallHide").style.display = "";
	document.getElementById("clover").classList.remove("img_dice_2");

	var player_reset = document.getElementById("player_box").getElementsByTagName("img");
	var i;
	for (i = 0; i < player_reset.length; i++) {
		player_reset[i].style.marginTop = 0;
		player_reset[i].style.borderColor = "transparent";
		player_reset[i].classList.remove("win");
		player_reset[i].setAttribute("data-points", 0);
		player_reset[i].setAttribute("data-last", null);
	}
	player_id = undefined;
	player_id = playerId(player_id);
}






