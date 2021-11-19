//Set var
var goal_points = parseInt(localStorage.getItem("sheep-game-goal"));
var probability = parseInt(localStorage.getItem("sheep-game-probability"));
var player_selected = localStorage.getItem("sheep-game-on");
var player_deactivated = localStorage.getItem("sheep-game-off");

//Set var if they aren't set
var default_goal = 7;
var default_probability = 2;

if (isNaN(goal_points)) {
	var goal_points = default_goal;
	localStorage.setItem("sheep-game-goal", 7);
}

if (isNaN(probability)) {
	var probability = default_probability;
	localStorage.setItem("sheep-game-probability", 2);
}

//Set player selected
if (player_selected == null) {
	var player_selected = `
		<div class="path" draggable="true">
			<div class="goal">
				<img src="elements/pictures/sheeps/white_sheep.png" class="img_normal" data-points="0">
			</div>
		</div>
		<div class="path" draggable="true">
			<div class="goal">
				<img src="elements/pictures/sheeps/black_sheep.png" class="img_normal" data-points="0">
			</div>
		</div>`
	localStorage.setItem("sheep-game-on", player_selected);

	//Set player deactivated
	var player_deactivated = `
		<div class="path" draggable="true">
			<div class="goal">
				<img src="elements/pictures/sheeps/gray_sheep.png" class="img_normal" data-points="0">
			</div>
		</div>
		<div class="path" draggable="true">
			<div class="goal">
				<img src="elements/pictures/sheeps/brown_sheep.png" class="img_normal" data-points="0">
			</div>
		</div>
		<div class="path" draggable="true">
			<div class="goal">
				<img src="elements/pictures/sheeps/blue_sheep.png" class="img_normal" data-points="0">
			</div>
		</div>
		<div class="path" draggable="true">
			<div class="goal">
				<img src="elements/pictures/sheeps/green_sheep.png" class="img_normal" data-points="0">
			</div>
		</div>
		<div class="path" draggable="true">
			<div class="goal">
				<img src="elements/pictures/sheeps/red_sheep.png" class="img_normal" data-points="0">
			</div>
		</div>
		<div class="path" draggable="true">
			<div class="goal">
				<img src="elements/pictures/sheeps/purple_sheep.png" class="img_normal" data-points="0">
			</div>
		</div>`
	localStorage.setItem("sheep-game-off", player_deactivated);
}
