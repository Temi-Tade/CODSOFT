//variables
var sidePanel = document.querySelector('#panel')
var closeBtn = document.querySelector('#closebtn')
var addition = document.getElementById('add')
var sub = document.getElementById('subtract')
var multi = document.getElementById('product')
var quotient = document.getElementById('divide')
var point = document.getElementById('dot')
var numBtn = document.querySelectorAll('.num')
var screen = document.getElementById('ans')
var answerDisplay = document.getElementById('result')
var exp = document.getElementById('power')
var openBrace = document.getElementById('openbrac')
var closeBrace = document.getElementById('closebrac')
let memoryClearBtn = document.querySelector('#clearMemory')
let toast = document.querySelector('#toast-container')
let time = document.querySelector('#time')
let clearAppDataBtn = document.querySelector("#clearAppDataBtn")
let clearLogsBtn = document.querySelector("#clearLogs")
let mod = document.querySelector("#modal")

//time and date function
count = () => {
	var t = new Date()
	var hrs = t.getHours();
	var minute = t.getMinutes()
	var second = t.getSeconds()
	var date = t.getDate()
	var month = t.getMonth()+1
	var year = t.getFullYear()
	time.querySelector("#t").innerHTML =  `${hrs} : ${minute} : ${second}`
	time.querySelector("#d").innerHTML = `${date} / ${month} / ${year}`
}
setInterval(count,1000)
	
addition.onclick = function(){
	clickSound()
	screen.value += '+'
}
sub.onclick = function() {
	clickSound()
	screen.value += '-'
}
multi.onclick = function() {
	clickSound()
	screen.value += '*'
}
quotient.onclick = function() {
	clickSound()
	screen.value += '/'
}
point.onclick = function() {
	clickSound()
	screen.value += '.'
}
exp.onclick = function(){
	clickSound()
	screen.value += '**'
} 
openBrace.onclick = function(){
	clickSound()
	screen.value += '('
}
closeBrace.onclick = function(){
	clickSound()
	screen.value += ')'
}

numBtn.forEach((num) => {
	num.addEventListener('click', () => {
		clickSound()
		screen.value += num.innerHTML
	})
})

let solve = () => {
	clickSound()
	let state = loadAppData()
	answerDisplay.innerHTML = eval(screen.value)
	state.lastAns = answerDisplay.innerText
	saveAppData(state)
}

//Delete function; screen converted the string to an array then used pop to remove the last value then converted back to string
let del = () => {
	clickSound()
	var char = screen.value
	var convArr = char.split('')
	var delArr = convArr.pop()
	var delArr = convArr.join('')
	screen.value = delArr
}

let ans = () => {
	clickSound()
	screen.value += loadAppData().lastAns
}

//clear screen
let clear_all = () => {
	clickSound()
	var screen = document.getElementById('ans')
	screen.value = "";
	answerDisplay.innerHTML = ''
}

let displayModal = (content) => {
	mod.style.display = "block"
	mod.querySelector("#modal-text").innerHTML = content
}

//clear the calculator memory
memoryClearBtn.addEventListener('click', () => {
	clickSound()
	let state = loadAppData()
	state.lastAns = ''
	saveAppData(state)
	showToast('Memory Cleared')
})

//clear app data
clearAppDataBtn.addEventListener("click", () => {
	displayModal(`
	Warning! You are about to clear all app related data. This action cannot be undone. Click OK to continue.
	`)

	mod.querySelectorAll("button").forEach((val) => {
		val.addEventListener("click", () => {
			if (val.innerText === "OK") {
				let state = loadAppData()
				state.theme = null
				state.lastAns = ""
				state.displayTime = false
				state.playSound = false
				saveAppData(state)
				history.go(0)
			} else {
				mod.style.display = "none"
			}
		})
	})
})