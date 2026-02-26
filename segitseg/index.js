import data from './data.json' with {type:'json'};
import { Manager } from './manager.js';
import { Table } from './table.js';
import { tbodyRenderColspan, tbodyRenderRowspan } from './functions.js';
import { FormController } from './form.js';

const managerCol = new Manager();
const tableCol = new Table(managerCol, data.colspanHeaderArray, tbodyRenderColspan);

for (const element of data.colspanDataArr) {
    managerCol.addElement(element);
}


const formCol = new FormController(managerCol, data.colspanFormFieldList);


const managerRow = new Manager();
const tableRow = new Table(managerRow, data.rowspanHeaderArray, tbodyRenderRowspan);

for (const element of data.rowspanTableArray) {
    managerRow.addElement(element);
}

const formRow = new FormController(managerRow, data.rowspanFormFieldList);