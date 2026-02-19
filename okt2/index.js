/**
 * @import { TbodyArrayType } from './table.js';
 */
import data from "./data.json" with { type: "json" };
import { Manager } from "./manager.js";
import { Table } from "./table.js";
import { Form } from "./form.js";

/**
 * @param {HTMLTableSectionElement} tbody
 * @param {TbodyArrayType} element
 */
const renderBody = (tbody, element) => {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    const td1 = document.createElement("td");
    td1.innerText = element.evszam;
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.innerText = element.esemeny;
    tr.appendChild(td2);

    if (element.esemeny2) {
        const td3 = document.createElement("td");
        td3.innerText = element.esemeny2;
        tr.appendChild(td3);
    } else {
        td2.colSpan = 2;
    }
}

const manager = new Manager();
const table = new Table(data.headerArray, manager);

table.setAppendRow((tbody, element) => {
    renderBody(tbody, element);
});

for (const element of data.tbodyArray) {
    manager.addElement(element);
}

const form = new Form(manager, data.formFieldList);