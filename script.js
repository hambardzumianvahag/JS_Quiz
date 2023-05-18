let count = 0
let questions = document.querySelectorAll('.main div input')
let main = document.querySelector('.main')
let start = document.querySelector('.start')
let result = document.querySelector('.result')
let clockk = document.querySelector('#clockdiv')
start.addEventListener('click', () => {
	clockk.style.display = 'block'
	main.style.display = 'block'
	start.style.display = 'none'

	let time_in_minutes = 10;
	let current_time = Date.parse(new Date());
	let deadline = new Date(current_time + time_in_minutes * 60 * 1000);


	function time_remaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date());
		let seconds = Math.floor((t / 1000) % 60);
		let minutes = Math.floor((t / 1000 / 60) % 60);
		let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		let days = Math.floor(t / (1000 * 60 * 60 * 24));
		return { 'total': t, 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds };
	}
	function run_clock(id, endtime) {
		let clock = document.getElementById(id);
		function update_clock() {
			let t = time_remaining(endtime);
			clock.innerHTML = 'minutes: ' + t.minutes + '<br>seconds: ' + t.seconds;
			if (t.total <= 0) { clearInterval(timeinterval); }
		}
		update_clock(); // run function once at first to avoid delay
		let timeinterval = setInterval(update_clock, 1000);
	}
	run_clock('clockdiv', deadline);
})

questions.forEach((event) => {
	event.addEventListener('click', e => {
		if (e.target.value == 'right') {
			count++
		}
	})
})
let submit = document.querySelector('.submit')
submit.onclick = function () {
	result.innerHTML = `You Received ${count} points.`
	result.style.display = 'block'
	submit.style.display = 'none'
	questions.forEach((event) => {
		let li = event.parentElement
		if (event.value == 'right' && event.checked) {
			li.style.background = 'green'
			li.style.color = 'white'
		}
		else if (event.value == 'right' && !event.checked) {
			li.style.background = 'green'
			li.style.color = 'white'
		}
		else if (event.value == 'wrong' && event.checked) {
			li.style.color = 'white'
			li.style.background = 'red'
		}
	})

}

