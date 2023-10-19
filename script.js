document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.getElementById('add-task-form');
    const inputTitleElement = document.getElementById('task-title');
    const inputDescriptionElement = document.getElementById('task-description');
    const inputDueDateElement = document.getElementById('task-due-date');
    const tasksList = document.getElementById('tasks');

    formElement.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskTitle = inputTitleElement.value;
        const taskDescription = inputDescriptionElement.value;
        const taskDueDate = inputDueDateElement.value;

        if (taskTitle.trim() !== '') {
            // Create a new task item
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <input type="checkbox">
                <span class="task-title">${taskTitle}</span>
                <span class="task-description">${taskDescription}</span>
                <span class="task-due-date">${taskDueDate}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;

            // Add the task item to the task list
            tasksList.appendChild(taskItem);

            // Clear the input fields
            inputTitleElement.value = '';
            inputDescriptionElement.value = '';
            inputDueDateElement.value = '';
        }
    });

    // Event delegation for handling task deletion and editing
    tasksList.addEventListener('click', function(event) {
        const taskItem = event.target.closest('li');

        if (event.target.classList.contains('delete-btn')) {
            // Handle task deletion
            taskItem.remove();
        } else if (event.target.classList.contains('edit-btn')) {
            // Handle task editing
            const isEditing = taskItem.classList.toggle('editing');
            const titleElement = taskItem.querySelector('.task-title');
            const descriptionElement = taskItem.querySelector('.task-description');
            const dueDateElement = taskItem.querySelector('.task-due-date');
            const editButton = taskItem.querySelector('.edit-btn');

            if (isEditing) {
                // Enter edit mode
                const currentTitle = titleElement.textContent;
                const currentDescription = descriptionElement.textContent;
                const currentDueDate = dueDateElement.textContent;

                const titleInput = document.createElement('input');
                titleInput.type = 'text';
                titleInput.value = currentTitle;
                titleElement.textContent = '';
                titleElement.appendChild(titleInput);

                const descriptionInput = document.createElement('textarea');
                descriptionInput.value = currentDescription;
                descriptionElement.textContent = '';
                descriptionElement.appendChild(descriptionInput);

                const dueDateInput = document.createElement('input');
                dueDateInput.type = 'date';
                dueDateInput.value = currentDueDate;
                dueDateElement.textContent = '';
                dueDateElement.appendChild(dueDateInput);

                editButton.textContent = 'Save';
            } else {
                // Save edited values and exit edit mode
                const newTitle = titleElement.querySelector('input').value;
                const newDescription = descriptionElement.querySelector('textarea').value;
                const newDueDate = dueDateElement.querySelector('input').value;

                titleElement.textContent = newTitle;
                descriptionElement.textContent = newDescription;
                dueDateElement.textContent = newDueDate;

                editButton.textContent = 'Edit';
            }
        }
    });
});
