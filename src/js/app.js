import { popover } from "./popover";


const btn = document.querySelector(".btn-danger");
const container = document.querySelector('.container');
const form = new popover(container);

btn.onclick = function(e) {
    e.preventDefault();

    const existingForm = container.querySelector('.popover');

    if (existingForm) {
        // Если форма уже видна, скрываем её
        existingForm.remove();
    } else {
        form.bindToDOM();
    }
};
