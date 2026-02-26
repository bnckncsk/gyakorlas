import { Manager } from "./manager.js";

class FormController{
    /**
     * @type {FormField[]}
     */
    #formFields;

    /**
     * @type {Manager}
     */
    #manager;

    constructor(manager, formFields) {
        this.#manager = manager;
        this.#formFields = [];

        const form = document.createElement('form');
        document.body.appendChild(form);

        for (const formField of formFields) {
            const field = new FormField(formField.id, formField.label, formField.name, form)
            this.#formFields.push(field);
        }

        const submitButton = document.createElement('button');
        submitButton.innerText = 'Hozzaadas';
        form.appendChild(submitButton);

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const element = {};

            for (const field of this.#formFields) {
                element[field.name] = field.value;
            }

            this.#manager.addElement(element);
        });
    }
}


class FormField {
    /**
     * @type {HTMLInputElement}
     */
    #input;

    /**
     * @type {string}
     */
    #name;

    /**
     * 
     * @param {string} id 
     * @param {string} labelContent 
     * @param {string} name 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, labelContent, name, parent) {
        const div = document.createElement('div');
        parent.appendChild(div);

        const label = document.createElement('label');
        label.innerText = labelContent;
        div.appendChild(label); 

        const input = document.createElement('input');
        div.appendChild(input);
        input.id = id;
        input.name = name;
        this.#input = input;
        this.#name = name;
    }

    get value() {
        return this.#input.value;
    }

    get name() {
        return this.#name;
    }
}

export { FormController }