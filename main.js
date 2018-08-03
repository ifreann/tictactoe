const container = document.querySelector('.container');
const spaces = Array.from(container.children);
let player = Math.floor(Math.random() * 2) + 1;

assignEvents();

function resetBoard() {

	const modal = document.querySelector('.modal');
	modal.classList.toggle('invisible');

	spaces.forEach(space => {
		space.classList = 'space';
		assignEvents();
	});

}

function checkWinCondition() {
	
	if (checkVerticals() || checkHorizontals() || checkDiagonals()) {
		const modal = document.querySelector('.modal');
		modal.classList.toggle('invisible');

		const winMessage = document.querySelector('h1');
		if (player === 1) {
			winMessage.innerText = 'O wins!';
		}
		else {
			winMessage.innerText = 'X wins!';
		}

		modal.onclick = function() {
			resetBoard();
		}
	}
	else if (allSpacesAreUsed()) {
		const modal = document.querySelector('.modal');
		modal.classList.toggle('invisible');
		
		const winMessage = document.querySelector('h1');
		winMessage.innerText = "It's a draw!";

		modal.onclick = function() {
			resetBoard();
		}
	}

	function allSpacesAreUsed() {
		if (document.querySelectorAll('.used').length === 9) return true;
	}

	function checkVerticals() {
		if (spacesAreEqual(spaces[0], spaces[3], spaces[6])) {
			return true;
		}
		else if (spacesAreEqual(spaces[1], spaces[4], spaces[7])) {
			return true;
		}
		else if (spacesAreEqual(spaces[2], spaces[5], spaces[8])) {
			return true;
		}
		else {
			return false;
		}
	}

	function checkHorizontals() {
		if (spacesAreEqual(spaces[0], spaces[1], spaces[2])) {
			return true;
		}
		else if (spacesAreEqual(spaces[3], spaces[4], spaces[5])) {
			return true;
		}
		else if (spacesAreEqual(spaces[6], spaces[7], spaces[8])) {
			return true;
		}
		else {
			return false;
		}
	}

	function checkDiagonals() {
		if (spacesAreEqual(spaces[0], spaces[4], spaces[8])) {
			return true;
		}
		else if (spacesAreEqual(spaces[2], spaces[4], spaces[6])) {
			return true;
		}
		else {
			return false;
		}
	}

	function spacesAreEqual(a, b, c) {
		if (a.classList.contains('O') && b.classList.contains('O') && c.classList.contains('O')) {
			return true;
		}
		else if (a.classList.contains('X') && b.classList.contains('X') && c.classList.contains('X')) {
			return true;
		}
		else {
			return false;
		}
	}

}

function assignEvents() {

	spaces.forEach(space => {

		space.onmouseenter = e => {
			if (!e.target.classList.contains('X') && !e.target.classList.contains('O')) {
				if (player === 1) {
					e.target.style.backgroundImage = "url('images/X.svg')";
				}
				else {
					e.target.style.backgroundImage = "url('images/O.svg')";
				}
			}			
		};

		space.onmouseout = e => {
			if (!e.target.classList.contains('O') && !e.target.classList.contains('X')) {
				e.target.style.backgroundImage = 'none';
			}
		};

		space.onclick = e => {
			if (player === 1) {
				e.target.classList.toggle('X');
			}
			else {
				e.target.classList.toggle('O');
			}

			e.target.classList.toggle('space');
			e.target.classList.toggle('used');
			e.target.removeAttribute('style');
			e.target.onmouseenter = '';
			e.target.onmouseout = '';
			e.target.onclick = '';
			player = player === 1 ? 2 : 1;

			checkWinCondition();
		}

	});

}