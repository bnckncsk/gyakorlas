/**
 * @typedef {{label: string, name: string, id: string, required: boolean}} FormFieldType
 */

import { Manager} from "./manager.js";

class Form{
    /**
     * @type {Manager}
     */
    #manager;

    /**
     * @type {FormFieldType[]}
     */
    #formFieldList;

    constructor(manager, formFieldList) {
        this.#manager = manager;
        this.#formFieldList = [];

        const form = document.createElement("form");
        document.body.appendChild(form);

        for (const formField of formFieldList) {
            const newFormField = new FormField(formField.id, formField.label, formField.name, formField.required, form);
            this.#formFieldList.push(newFormField);
        }


        const submitButton = document.createElement("button");
        submitButton.innerText = "Hozzáadás";
        form.appendChild(submitButton);


        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const element = this.#createElement();
            if (element) {
                this.#manager.addElement(element);
                e.target.reset();
            }
        });
    }

    #createElement() {
        let result = {};
        let valid = true;

        for (const formField of this.#formFieldList) {
            if (formField.validate()) {
                result[formField.name] = formField.value;
            } else {
                valid = false;
            }
        }

        if (valid) {
            return result;
        } else {
            return null;
        }
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
     * @type {HTMLDivElement}
     */
    #errorDiv;
    /**
     * @type {boolean}
     */
    #required;

    /**
     * @param {string} id 
     * @param {string} labelContent
     * @param {string} name 
     * @param {boolean} required 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, labelContent, name, required, parent) {
        const div = document.createElement("div");
        parent.appendChild(div);

        const label = document.createElement("label");
        label.innerText = labelContent;
        div.appendChild(label);
        div.appendChild(document.createElement("br"));

        const input = document.createElement("input");
        input.id = id;
        input.name = name;
        div.appendChild(input);
        this.#input = input;
        this.#name = name;

        const errorDiv = document.createElement("div");
        div.appendChild(errorDiv);
        this.#errorDiv = errorDiv;
        this.#required = required;
    }

    validate() {
        let valid = true;

        if (this.#required && !this.value) {
            this.#errorDiv.innerText = "Mezo kitoltese kotelezo!";
            valid = false;
        } else {
            this.#errorDiv.innerText = "";
        }
        return valid;
    }

    get value() {
        return this.#input.value;
    }

    get name() {
        return this.#name;
    }
}

export { Form };