import { Manager } from "./manager.js";
/**
 * @import {ColspanType, HeaderArrayType, RowspanType} from "./functions.js"
 * 
 * @callback TableCallback
 * @param {HTMLTableSectionElement} tbody
 * @param {ColspanType | RowspanType } element
 * @returns {void}
 */

class Table {
    /**
     * @type {Manager}
     */
    #manager;

    /**
     * @type {HTMLTableSectionElement}
     */
    #tbody;

    /**
     * 
     * @param {Manager} manager 
     * @param {HeaderArrayType[]} headerArray 
     * @param {TableCallback} tableCallback
     */
    constructor(manager, headerArray, tableCallback) {
        this.#manager = manager;

        const table = document.createElement('table');
        document.body.appendChild(table);

        const thead = document.createElement('thead');
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        this.#tbody = tbody;

        const tr = document.createElement('tr');
        thead.appendChild(tr);

        for (const headerCell of headerArray) {
            const th = document.createElement('th');
            tr.appendChild(th);
            th.innerText = headerCell.name;

            if (headerCell.colspan) {
                th.colSpan = 2;
            } 
        }

        this.#manager.addCallback = (element) => {
            tableCallback(this.#tbody, element);
        }
    }
}

export { Table }