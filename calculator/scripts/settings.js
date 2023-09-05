let optionBtns = document.querySelectorAll('#settings button')
let panelBg = document.querySelector('.panel-bg')
let panelBody = document.querySelector('#panel-body')
let rads = document.querySelectorAll('#panel-header input[type=radio]')
let tabs = document.querySelectorAll('.tab')
let num_sym_btn = document.querySelectorAll('#btns button')


let showSettingsDialog = (x) => {
	panelBg.style.display = 'block'
	window.addEventListener('click', () => {
		if (event.target === panelBg) {
			panelBg.style.display = 'none'
		}
	})
	rads[x].checked = true
}


optionBtns.forEach((val, ind) => {
	val.addEventListener('click', (x) => {

		showSettingsDialog(ind)
		tabs.forEach((v, i) => {
			tabs[i].style.display = 'none'
		})
		tabs[ind].style.display = 'block'
	})
})

rads.forEach((val, ind) => {
	val.addEventListener('input', () => {
		checkTime()
		checkSound()
		
		tabs.forEach((v, i) => {
			tabs[i].style.display = 'none'
		})
		tabs[ind].style.display = 'block'
	})
})

let toggleTimeDisp = (x) => {
	if (x.checked === true) {
		time.style.display = 'block'
		let state = loadAppData()
		state.displayTime = true
		saveAppData(state)
		showToast('Date and Time: On')
	} else {
		time.style.display = 'none'
		let state = loadAppData()
		state.displayTime = false
		saveAppData(state)
		showToast('Date and Time: Off')
	}
	history.go(0)
}

let toggleSound = (x) => {
	if (x.checked === true) {
		let state = loadAppData()
		state.playSound = true
		saveAppData(state)
		showToast('Sound: On')
	} else {
		let state = loadAppData()
		state.playSound = false
		saveAppData(state)
		showToast('Sound: Off')
	}
	history.go(0)
}

document.querySelectorAll(".themes li input").forEach((val, ind) => {
	val.addEventListener("input", () => {
		let state = loadAppData()
		switch (val.id) {
			case "light":
				document.querySelector("link#custom").href = ""
				state.theme = "light"
				saveAppData(state)
				break;
		
			case "dark":
				document.querySelector("link#custom").href = "./styles/darkmode.css"
				state.theme = "dark"
				saveAppData(state)
				break;
		}
	})
})