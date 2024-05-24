export class btn {
    constructor(parentEl) {
      this.parentEl = parentEl;
    }
  
    static get markup() {
      return `
        <div class="new-task" placement="bottom">
          <input type="text" placeholder="New task"/>
          <button class="add">Add Card</button>
          <button class="del">✖</button>
        </div>
      `;
    }
  
    static loadTasksFromLocalStorage(taskList) {
      // Загрузка задач из localStorage при загрузке страницы
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      if (tasks.length > 0) {
        tasks.forEach(task => {
          const taskItem = document.createElement('li');
          taskItem.textContent = task.text;
          taskList.appendChild(taskItem);
        });
      }
    }
  
    saveTaskToLocalStorage() {
      // Сохранение задач в localStorage
      const tasks = Array.from(this.parentEl.querySelectorAll('li')).map(li => ({ text: li.textContent }));
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
   

    bindToDOM() {
        this.parentEl.innerHTML = btn.markup;

        // Добавляем обработчик событий для кнопки удаления
        const delButton = this.parentEl.querySelector('.del');
        delButton.addEventListener('click', () => {
            this.removeTask();
            this.saveTaskToLocalStorage(); // Сохраняем задачи после удаления
        });

        // Добавляем обработчик событий для кнопки добавления
        const addButton = this.parentEl.querySelector('.add');
        addButton.addEventListener('click', () => {
            this.addTask();
        });
        this.saveTaskToLocalStorage();
        
    }

    removeTask() {
        this.parentEl.innerHTML = ''; // Удаляем все содержимое родительского элемента
    }

    addTask() {
        const input = this.parentEl.querySelector('input');
        const taskText = input.value;
        if (taskText) {
            const taskList = this.parentEl.previousElementSibling; // Находим список задач
            const taskItem = document.createElement('li');
            
            // Добавляем класс к элементу списка
            taskItem.classList.add('task-item');
            
            taskItem.textContent = taskText;
            const deleteButton = document.createElement('button'); // Создаем кнопку удаления
            deleteButton.classList.add('del'); // Добавляем класс "del" для стилизации
            deleteButton.textContent = '✖'; // Устанавливаем текст кнопки
            deleteButton.addEventListener('click', () => { // Добавляем обработчик события для удаления задачи
                taskItem.remove();
                this.saveTaskToLocalStorage(); // Сохраняем задачи после удаления
            });
            taskItem.appendChild(deleteButton); // Добавляем кнопку удаления в элемент списка
            taskList.appendChild(taskItem);
    
            // Очистка input после добавления задачи
            input.value = '';

            // Сохранение задач в localStorage
            this.saveTaskToLocalStorage();
        }
    }
}