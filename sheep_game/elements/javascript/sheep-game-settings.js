// Set Html
// Points
var el_goal_points = document.getElementById("goal_points");
el_goal_points.innerHTML = goal_points + 1;

// Probability
var el_probability = document.getElementById("probability");
el_probability.innerHTML = probability + 1;

// Player
var el_player_selected = document.getElementById("player_selected");
var el_player_deactivated = document.getElementById("player_deactivated");
el_player_selected.innerHTML = player_selected;
el_player_deactivated.innerHTML = player_deactivated;


// ########################################################################
// Test if input of goal is correct
function detectGoal() {
	input = parseInt(el_goal_points.innerHTML);
	if (input >= 2) {
		el_goal_points.style.backgroundColor = "#333333";

		goal_points = parseInt(el_goal_points.innerHTML) - 1;
		localStorage.setItem("sheep-game-goal", goal_points);
	}
	else {
		el_goal_points.style.backgroundColor = "red";
	}
}

el_goal_points.addEventListener("input", detectGoal);

// Test if input of probability is correct
function detectProbability() {
	input = parseInt(el_probability.innerHTML);
	if (input > 0 && input < 6) {
		el_probability.style.backgroundColor = "#333333";

		probability = parseInt(el_probability.innerHTML) - 1;
		localStorage.setItem("sheep-game-probability", probability);
	}
	else {
		el_probability.style.backgroundColor = "red";
	}
}

el_probability.addEventListener("input", detectProbability);


// ########################################################################
// Reset Buttons
function reset(variable) {
	if (variable == "goal_points") {
		goal_points = default_goal;
		localStorage.setItem("sheep-game-goal", goal_points);

		el_goal_points.innerHTML = goal_points + 1;
	}

	else if (variable == "probability") {
		probability = default_probability;
		localStorage.setItem("sheep-game-probability", probability);

		el_probability.innerHTML = probability + 1;
	}
}



// ########################################################################
// Test if player count isn't zero
var removed_dragbox = false;

function detectPlayer() {
	if (el_player_selected.getElementsByClassName("path").length <= 1) {
		el_player_deactivated.classList.remove("dragbox");
		removed_dragbox = true;
		repairDrag()

		console.log("remove")
	}
	else if (removed_dragbox != false) {
		el_player_deactivated.classList.add("dragbox");
		removed_dragbox = false;
		repairDrag()

		console.log("add")
	}
}

function repairDrag() {
	// Clone Element and replace it
	var el_player_deactivated_clone = el_player_deactivated.cloneNode(true);
	el_player_deactivated.parentNode.replaceChild(el_player_deactivated_clone, el_player_deactivated);

	// Refresh var
	el_player_deactivated = document.getElementById("player_deactivated");

	setDrag()
}

el_player_selected.addEventListener("dragstart", detectPlayer);

// ########################################################################
// Sort Player
// https://www.youtube.com/watch?v=jfYWwQrtzzY
var draggables, dragboxes
setDrag()

function setDrag() {
	var draggables = document.querySelectorAll('.path')
	var dragboxes = document.querySelectorAll('.dragbox')

	draggables.forEach(draggable => {
		draggable.addEventListener('dragstart', () => {
			draggable.classList.add('dragging')
		})

		draggable.addEventListener('dragend', () => {
			draggable.classList.remove('dragging')
			
			var player_selected = el_player_selected.innerHTML;
			var player_deactivated = el_player_deactivated.innerHTML;

			localStorage.setItem("sheep-game-on", player_selected);
			localStorage.setItem("sheep-game-off", player_deactivated);
		})
	})

	dragboxes.forEach(container => {
		container.addEventListener('dragover', e => {
			e.preventDefault()
			const afterElement = getDragAfterElement(container, e.clientY)
			const draggable = document.querySelector('.dragging')
			if (afterElement == null) {
				container.appendChild(draggable)
			} else {
				container.insertBefore(draggable, afterElement)
			}
		})
	})
}


function getDragAfterElement(container, y) {
	const draggableElements = [...container.querySelectorAll('.path:not(.dragging)')]

	return draggableElements.reduce((closest, child) => {
		const box = child.getBoundingClientRect()
		const offset = y - box.top - box.height / 2
		if (offset < 0 && offset > closest.offset) {
			return { offset: offset, element: child }
		} else {
			return closest
		}
	}, { offset: Number.NEGATIVE_INFINITY }).element
}
