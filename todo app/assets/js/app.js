const addbtn = document.querySelector('#addbtn')
const num = document.querySelector('#num')
const modbg = document.querySelector('#pop-up-bg')
const mod = document.querySelector("#pop-up")

//const generateUserId = () => {}

class Todo{
	constructor(name, status){
		this.name = name;
		this.status = 'pending';
    //time
    }
    
    updateStatus = (bool) => {
    	if (bool) {
    		this.status = 'completed'
    	}else{
    		this.status = 'pending'
    	}
    }
    
    isCompleted = () => {
    	if (this.status === 'completed') {
    		return true
    	}else{
    		return false
    	}
    }
}

const createpopUp = (body) => {
	modbg.style.display = 'block'
	mod.animate({
		transform: ['scale(0)', 'scale(1.25)', 'scale(1)']
	},
	{
		duration: 500,
	})
	mod.innerHTML = body
	
	window.onclick = () => {
		if (event.target === modbg) {
			modbg.style.display = 'none'
		}
	}
}

addbtn.onclick = (e) => {
	createTodoForm()
}
	
const createTodoForm = () => {
	createpopUp(`
		<form id="todo-form" autocomplete="off" spellcheck="false">
			<h3>Add a to-do</h3>
    		<div class="todo-input">
        		<input type="text" id="task" placeholder="Add a to-do..." autofocus>
        	</div>
        	
        	<div class='todo-input'>
        		<button type="submit" id="submit" disabled>add</button>
        	</div>
      </form>
	`)
	
	const form = document.querySelector('#todo-form')
	const input = document.querySelector('#task')
	const submitBtn = document.querySelector('#submit')
	
	input.oninput = () => {
		if (input.value.trim().length === 0) {
			submitBtn.disabled = true
		} else {
			submitBtn.disabled = false
		}
	}
	
	form.onsubmit = () => {
		event.preventDefault()
		let task = new Todo(input.value.trim(), 'pending')
		updateStorage(task)
		getTasks()
		form.reset()
		modbg.style.display = 'none'
	}
}