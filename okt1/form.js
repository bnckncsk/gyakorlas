/**
 * @typedef {{label: string, name: string, id: string, required: boolean}} FormFieldType
 * 
 * @import {TbodyArrayType} from "./table.js"
 */

import { Manager } from "./manager.js";

class Form {
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
        submitButton.innerText = "Hozzaadas";
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

    /**
     * 
     * @returns {TbodyArrayType}
     */
    #createElement() {
        let result = {};
        let valid = true;

        for (const formField of this.#formFieldList) {
            if (formField.validateField()) {
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
    #errordiv;

    /**
     * @type {boolean}
     */
    #required;

    /**
     * @param {string} id 
     * @param {string} label 
     * @param {string} name 
     * @param {boolean} required 
     * @param {HTMLFormElement} parent
     */
    constructor(id, label, name, required, parent) {
        const div = document.createElement("div");
        parent.appendChild(div);

        const labelEl = document.createElement("label");
        labelEl.innerText = label;
        div.appendChild(labelEl);
        div.appendChild(document.createElement("br"));

        const input = document.createElement("input");
        input.id = id;
        input.name = name;
        div.appendChild(input);
        this.#input = input;
        this.#name = name;

        const errordiv = document.createElement("div");
        errordiv.classList.add('error');
        div.appendChild(errordiv);

        this.#errordiv = errordiv;
        this.#required = required;
    }

    validateField() {
        let result = true;

        if (this.#required && !this.value) {
            this.#errordiv.innerText = "Mezo kitoltese kotelezo!";
            result = false;
        } else {
            this.#errordiv.innerText = "";
        }
        return result;
    }

    get value() {
        return this.#input.value ? this.#input.value : undefined;
    }

    get name() {
        return this.#name;
    }
}

export {Form};