/**
 * @import { ColspanType,  RowspanType } from "./functions.js"
 * 
 * @callback AddCallback
 * @param { ColspanType | RowspanType } element
 * @returns { void }
 */


class Manager {
    /**
     * @type {AddCallback}
     */
    #addCallback;

    /**
     * @type {ColspanType[] | RowspanType[]}
     */
    #dataArray;

    constructor() {
        this.#dataArray = [];
    }

    /**
     * 
     * @param {ColspanType | RowspanType} element 
     */
    addElement(element) {
        this.#dataArray.push(element);
        if (this.#addCallback) {
            this.#addCallback(element);
        }
    }

    /**
     * @param { AddCallback } callback
     */
    set addCallback(callback) {
        this.#addCallback = callback;
    }
}

export { Manager }