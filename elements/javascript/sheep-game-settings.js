// Set Html
// Points
var el_goal_points = document.getElementById("goal_points");
var goal_new = true;
var goal_html = parseInt(goal_points) + 1;
el_goal_points.innerHTML = goal_html;

// Player
var el_player_selected = document.getElementById("player_selected");
var el_player_deactivated = document.getElementById("player_deactivated");
el_player_selected.innerHTML = player_selected;
el_player_deactivated.innerHTML = player_deactivated;


// Test if input of goal is correct
function detectGoal() {
	input = parseInt(el_goal_points.innerHTML);
	if (input >= 2) {
		el_goal_points.style.backgroundColor = "#333333";
		goal_new = true;
	}
	else {
		el_goal_points.style.backgroundColor = "red";
		goal_new = false;
	}
}

el_goal_points.addEventListener("input", detectGoal);


// Test if player count isn't zero
function detectPlayer() {
	if (el_player_selected.getElementsByClassName("path").length <= 2) {
		el_player_deactivated.classList.remove("dragbox");
		console.log("remove")
	}
	else {
		el_player_deactivated.classList.add("dragbox");
		console.log("add")
	}
}

//document.addEventListener("dragstart", detectPlayer);


// Set setting in html
function setSettings() {
	var goal_html = parseInt(goal_points) + 1;
	el_goal_points.innerHTML = goal_html;

	el_player_selected.innerHTML = player_selected;
	el_player_deactivated.innerHTML = player_deactivated;
}

function apply() {
	// Set player
	var player_selected = el_player_selected.innerHTML;
	var player_deactivated = el_player_deactivated.innerHTML;

	localStorage.setItem("sheep-game-on", player_selected);
	localStorage.setItem("sheep-game-off", player_deactivated);

	// Set goal
	if (goal_new == true) {
		goal_points = parseInt(el_goal_points.innerHTML) - 1;
		localStorage.setItem("sheep-game-goal", goal_points);

		location.href= "index.html";
	}
	else {
		goal_html = parseInt(goal_points) + 1;
		el_goal_points.innerHTML = goal_html;

		el_goal_points.style.backgroundColor = "#333333";

		console.log("Couldn't Change")
	}
}




// Sort Player
// https://www.youtube.com/watch?v=jfYWwQrtzzY
var draggables, dragboxes
setDrag()

function setDrag() {
	var dragboxes = undefined;
	var draggables = document.querySelectorAll('.path')
	var dragboxes = document.querySelectorAll('.dragbox')

	console.log(dragboxes)

	draggables.forEach(draggable => {
		draggable.addEventListener('dragstart', () => {
			draggable.classList.add('dragging')
		})

		draggable.addEventListener('dragend', () => {
			draggable.classList.remove('dragging')
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
