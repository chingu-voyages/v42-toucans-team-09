
class ArrayStorage {

    /**
     * An object that can be used to store a list into local storage
     * @param {String} key private key for storing a value in the local storage
     */
    constructor(key){
        this.key = key;
        this.list = this.get();
    }

    /**
     * Get value of this key from the local storage
     * @returns {Array} list of values from the key on the local storage
     */
    get(){
        if (!localStorage.getItem(this.key)) {
            localStorage.setItem(this.key, JSON.stringify(this.list));
        }
        return JSON.parse(localStorage.getItem(this.key));
    }

    /**
     * Add a new item to the list and store it in the local storage
     * @param {*} value the value to store in the local storage, default is null
     * @returns {Array|null} a list of values or null if the value not be set
     */
    append(value=null){
        if (!value) return null;
        this.list.push(value);
        localStorage.setItem(this.key, JSON.stringify(this.list));
        return this.list;
    }
}
