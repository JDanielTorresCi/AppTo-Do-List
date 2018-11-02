class Task{
    constructor(name, description){
        this.name = name;
        this.description = description;
    }
}

class UI{
    addTask(task){
        const taskList = document.getElementById('task-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card shadow-lg p-3 mb-5 bg-white rounded">
                <div class="card-header">
                    <h4>${task.name}</h4>
                </div>
                <div class="card-body text-center">                                       
                    ${task.description}                    
                </div>
                <a href="#" class="btn btn-success" name="success">Complete</a>
            </div>
        `;
        taskList.appendChild(element);
    }

    resetForm(){
        document.getElementById('task-form').reset();
    }

    deleteTask(element){
        if (element.name === 'success') {
            element.parentElement.parentElement.remove()
            this.showMessage('Task Completed Successfully', 'info');
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2 shadow-lg p-3 mb-5 rounded`;
        div.appendChild(document.createTextNode(message));
        // Show Element in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

//DOM Events
document.getElementById('task-form')
    .addEventListener('submit', function (e) {
        const name = document.getElementById('name').value;        
        const description = document.getElementById('description').value;

        const task = new Task(name, description);        
        
        const ui = new UI();

        if(name === '' || description === ''){
           return ui.showMessage('Complete Form Please', 'info');            
        }
        ui.addTask(task);
        ui.resetForm();

        ui.showMessage('Task Added Successfully', 'success');

        e.preventDefault();
})

document.getElementById('task-list')
    .addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteTask(e.target);    
})