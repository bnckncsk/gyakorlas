/**
 * @import {TbodyArrayType} from "./table.js"
 */

import data from "./data.json" with {type:"json"}
import { Table } from "./table.js";
import { Manager } from "./manager.js";
import { Form } from "./form.js";


/**
 * @param {HTMLTableSectionElement} tbody 
 * @param {TbodyArrayType} element 
 */
const renderBody = (tbody, element) => {
    const tr = document.createElement("tr");
    tbody.appendChild(tr);

    const td1 = document.createElement("td");
    td1.innerText = element.verscsoport;
    tr.appendChild(td1);

    const td2 = document.createElement("td");
    td2.innerText = element.vers;
    tr.appendChild(td2);

    const td3 = document.createElement("td");
    td3.innerText = element.ev;
    tr.appendChild(td3);

    if (element.vers2 && element.ev2) {
        td1.rowSpan = 2;

        const tr2 = document.createElement("tr");
        tbody.appendChild(tr2);

        const td4 = document.createElement("td");
        td4.innerText = element.vers2;
        tr2.appendChild(td4);

        const td5 = document.createElement("td");
        td5.innerText = element.ev2;
        tr2.appendChild(td5);
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