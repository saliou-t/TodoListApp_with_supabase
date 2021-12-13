window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");


	/***********SUPABASE URL, API_KEY ************/

	let api_url = "https://tenjvxuzssuicdopqfau.supabase.co";
    let api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODg4MTg4OCwiZXhwIjoxOTU0NDU3ODg4fQ.8kYZB_B7tP4HnVseFpg_KLtyI-ucHsksFcWU54PwEW4";
	
	/********************************************** */
    

    supabase = supabase.createClient(api_url, api_key);
	
	(function getList() {
		// Create a single supabase client for interacting with your database
		// let ArrayList = [];
		
		supabase
			.from("Todo")
			.select()
			.then((data) => {
				for(let i=0 ; i<= data.data.length; i++){
					const task_el = document.createElement('div');
					task_el.classList.add('task');
					task_el.classList.add(data.data[i].priority);
					const task_content_el = document.createElement('div');
					task_content_el.classList.add('content');
			
					task_el.appendChild(task_content_el);
					const task_date_el = document.createElement('span');
					task_date_el.setAttribute('class', 'date-echeance')
					task_date_el.innerHTML = data.body[i].date_echerence

					task_el.appendChild(task_date_el);
			
					const task_input_el = document.createElement('input');
					task_input_el.classList.add('text');
					task_input_el.type = 'text';
					task_input_el.value = data.data[i].titre;
					task_input_el.setAttribute('readonly', 'readonly');
			
					task_content_el.appendChild(task_input_el);
			
					const task_actions_el = document.createElement('div');
					task_actions_el.classList.add('actions');
					
					const task_edit_el = document.createElement('button');
					task_edit_el.classList.add('edit');
					task_edit_el.innerText = 'Edit';
			
					const task_delete_el = document.createElement('button');
					task_delete_el.classList.add('delete');
					task_delete_el.innerText = 'Supprimer';
			
					task_actions_el.appendChild(task_edit_el);
					task_actions_el.appendChild(task_delete_el);
			
					task_el.appendChild(task_actions_el);
			
					list_el.appendChild(task_el);
			
					input.value = '';
						
					task_edit_el.addEventListener('click', (e) => {
						if (task_edit_el.innerText.toLowerCase() == "edit") {
							task_edit_el.innerText = "Appliquer";
							task_input_el.removeAttribute("readonly");
							task_input_el.focus();
						} else {
							task_edit_el.innerText = "Edit";
							task_input_el.setAttribute("readonly", "readonly");
						}
					});

					task_delete_el.addEventListener('click', (e) => {
						list_el.removeChild(task_el);
						
						supabase
						.from("Todo")
						.delete()
						.eq('id', data.data[i].id)
						.execute()
						window.location.reload();
						// console.log(data.data[i].id)
					});
				}
			});
		})();
	const task_priority = document.getElementById("priority");
    
	task_priority.addEventListener("change", (e)=>{
		task_priority.classList.add(task_priority.options[task_priority.selectedIndex].text)
	});

	const date_text = document.querySelector('.date-echeance');
	date_text.addEventListener('click', function(){
		this.style.color = 'red' 
	})


	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const task = input.value;

        const task_priority_text = task_priority.options[task_priority.selectedIndex].text;

		// alert(task_priority_text)
		if(task === "") {
			e.preventDefault()
			alert('Ajouter une tache svp')
		}
		else{
			supabase
				.from("Todo")
				.insert([
				{
					titre: task,
					description: 'à la con',
					priority: task_priority_text 
				}
				])
				.then((data) => {
					window.location.reload();
				});	
		}
	});
});