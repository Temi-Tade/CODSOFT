const tasklist = document.querySelector('#tasklist')

const saved_data = JSON.parse(localStorage.getItem('tasks'))

const setStorage = () => {
	localStorage.setItem('tasks', JSON.stringify([]))
}
	
const getStorage = () => {
	return saved_data
}
	
const updateStorage = (x) => {
	if (!getStorage()) {
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

const getTasks = () => {
	if (!getStorage() || getStorage().length === 0) {
		tasklist.innerHTML = `No To-dos! You're all set. Click on the button below to add a new To-do`
	} else {
		tasklist.innerHTML = ''
		getStorage().forEach((val, ind) => {
			tasklist.innerHTML += `
				<label>
					<li><input type='checkbox'>${val.name}</li>
				</label>
			`
		})
	}
}

getTasks()