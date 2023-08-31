const tasklist = document.querySelector('#tasklist')

const setStorage = () => {
	localStorage.setItem('tasks', JSON.stringify([]))
}
	
const getStorage = () => {
	return JSON.parse(localStorage.getItem('tasks'))
}

const getTasks = () => {
	if (!getStorage() || getStorage().length === 0) {
		tasklist.innerHTML = `No To-dos! You're all set. Click on the button below to add a new To-do`
	} else {
		tasklist.innerHTML = ''
		getStorage().forEach((val, ind) => {
			if (val.status === 'completed') {
				tasklist.innerHTML += `
					<li>
						<input type='checkbox' checked>
						<p>${val.name}</p>
					</li>
				`
			}else{
				tasklist.innerHTML += `
					<li>
						<input type='checkbox'>
						<p>${val.name}</p>
					</li>
				`
			}
		})

		tasklist.querySelectorAll('li').forEach((val, ind) => {
			val.onclick = () => {
				if (event.target === tasklist.querySelectorAll('input')[ind]) {
						//doNothing
				} else {
					createTodoForm()
					mod.querySelector('form input').value = `${val.querySelector('p').innerHTML}`
					mod.querySelector('form').id = 'edit-todo-form'
					mod.querySelector('#edit-todo-form').onsubmit = () => {
					event.preventDefault()
					let taskArr = getStorage()
					taskArr[ind].name = mod.querySelector('form input').value.trim()
					localStorage.setItem('tasks', JSON.stringify(taskArr))
					getTasks()
					mod.querySelector('form').reset()
					modbg.style.display = 'none'
					}
				}
			}
		})
		
		tasklist.querySelectorAll('li input').forEach((val, ind) => {
			val.onclick = () => {
				let taskArr = getStorage()
				switch (val.checked) {
					case true:
						taskArr[ind].status = 'completed'
						break;
					case false:
						taskArr[ind].status = 'pending'
						break;
				}
				localStorage.setItem('tasks', JSON.stringify(taskArr))
			}
		})
	}
}
	
const updateStorage = (x) => {
	if (!getStorage()) {
		setStorage()
		let taskArr = []
		taskArr.push(x)
		localStorage.setItem('tasks', JSON.stringify(taskArr))
	}else{
		let taskArr = getStorage()
		taskArr.push(x)
		localStorage.setItem('tasks', JSON.stringify(taskArr))
	}
	getTasks()
}

getTasks()