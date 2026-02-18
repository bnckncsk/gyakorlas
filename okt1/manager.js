/**
 * @import {TbodyArrayType} from "./table.js"
 * 
 * @callback addCallback
 * @param {TbodyArrayType} element
 * @returns {void}
 */

class Manager {
    /**
     * @type {TbodyArrayType[]}
     */
    #dataArray

    /**
     * @type {addCallback}
     */
    #addCallback;

    constructor() {
        this.#dataArray = [];
    }

    /**
     * @param {TbodyArrayType} element 
     */
    addElement(element) {
        this.#dataArray.push(element);
        if (this.#addCallback) {
            this.#addCallback(element);
        }
    }

    /**
     * @param {addCallback} callback 
     */
    set addCallback(callback) {
        this.#addCallback = callback;
    }
}

export {Manager};