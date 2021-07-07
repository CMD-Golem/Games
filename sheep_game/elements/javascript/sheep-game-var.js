//Set var
if (localStorage.getItem("sheep-game-goal") != null) {
	var goal_points = localStorage.getItem("sheep-game-goal");
	var player_selected = localStorage.getItem("sheep-game-on");
	var player_deactivated = localStorage.getItem("sheep-game-off");
}


//Set var if they aren't set
if (localStorage.getItem("sheep-game-goal") == null) {
	var goal_points = 7;
	localStorage.setItem("sheep-game-goal", 7);

	//Set player selected
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
