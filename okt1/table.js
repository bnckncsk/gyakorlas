/**
 * @typedef {{verscsoport: string, rowspan?: number, vers: string, ev: string, vers2?: string, ev2?: string}} TbodyArrayType
 * 
 * @callback TableCallback
 * @param {HTMLTableSectionElement} tbody
 * @param {TbodyArrayType} element
 * @return {void}
 */
import { Manager } from "./manager.js";

class Table{
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
     * @param {string[]} headerArray 
     * @param {Manager} manager 
     */
    constructor(headerArray, manager) {
        this.#manager = manager;

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        const tbody = document.createElement("tbody");
        this.#tbody = tbody;
        document.body.appendChild(table);
        table.appendChild(thead);
        thead.appendChild(tr);
        table.appendChild(tbody);
        

        for (const headerCell of headerArray) {
            const th = document.createElement("th");
            th.innerText = headerCell.name;
            tr.appendChild(th);
        }
    }

    setAppendRow(TableCallback) {
        this.#manager.addCallback = (element) => {
            TableCallback(this.#tbody, element);
        }
    }
}

export {Table};