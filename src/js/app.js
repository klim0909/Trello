import { btn } from './btn.js';

document.addEventListener('DOMContentLoaded', () => {
  const allTaskLists = document.querySelectorAll('.all-task');

  allTaskLists.forEach(taskList => {
    btn.loadTasksFromLocalStorage(taskList); // Загрузка задач из localStorage для каждого списка задач
  });

  const btnElements = document.querySelectorAll('.another-card');

  btnElements.forEach(btnElement => {
    const card = btnElement.previousElementSibling;
    const form = new btn(card);

    btnElement.onclick = function(e) {
      e.preventDefault();
      form.bindToDOM();
    };
  });

  let actualElement;

  const onMouseOver = (e) => {
    if (actualElement) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Определяем границы страницы
      const pageWidth = window.innerWidth;
      const pageHeight = window.innerHeight;

      // Определяем размеры элемента
      const elementWidth = actualElement.offsetWidth;
      const elementHeight = actualElement.offsetHeight;

      // Ограничиваем координаты перемещения элемента, чтобы он не выходил за границы страницы
      const maxX = pageWidth - elementWidth;
      const maxY = pageHeight - elementHeight;

      // Устанавливаем новые координаты элемента, учитывая границы страницы
      actualElement.style.top = `${Math.min(mouseY, maxY)}px`;
      actualElement.style.left = `${Math.min(mouseX, maxX)}px`;
    }
  };

  const onMouseUp = (e) => {
    const mouseUpItem = e.target;

    // Определяем, в какой колонке находится элемент, над которым отпущена мышь
    const column = mouseUpItem.closest('.column');
    if (column) {
      // Находим список задач в этой колонке
      const taskList = column.querySelector('.all-task');

      // Проверяем, что actualElement и mouseUpItem разные элементы
      if (actualElement !== mouseUpItem) {
        // Вставляем actualElement в этот список задач
        taskList.appendChild(actualElement);
        actualElement.classList.remove('dragged');
        // Сохранение задач в localStorage
        new btn(taskList).saveTaskToLocalStorage();
      }
    }

    actualElement = undefined;
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mouseover', onMouseOver); // Убираем обработчик события mouseover
  };

  allTaskLists.forEach(taskList => {
    taskList.addEventListener('mousedown', (e) => {
      e.preventDefault();
      actualElement = e.target;

      actualElement.classList.add('dragged');

      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseover', onMouseOver);
    });
  });
});