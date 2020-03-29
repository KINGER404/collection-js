function collect(items) {
    return new Collection(items)
}

class Collection {

    constructor(items) {
        this.items = [].concat(items);
    }

    /**
     * @param items
     * @returns {Collection}
     */
    make(items) {
        return new Collection(items);
    }

    /**
     * @returns {*[]}
     */
    toArray() {
        return this.items
    }

    /**
     * @returns {*[]}
     */
    all() {
        return this.items
    }

    /**
     * @returns {boolean}
     */
    isEmpty() {
        return this.count() <= 0;
    }

    /**
     * @returns {boolean}
     */
    hasAny() {
        return ! this.isEmpty();
    }

    exists(index) {
        return typeof this.items[index] !== 'undefined';
    }

    contains(value) {
        return this.items.contains(value);
    }

    first(defaultValue = '') {
       return this.exists(0) ? this.items[0] : defaultValue;
    }

    last(defaultValue = '') {
        let count = this.count() - 1;

        return this.exists(count) ? this.items[count] : defaultValue
    }

    count() {
        return this.items.length
    }

    random(count = 1) {
        let randomItems = [];

        for (let i = 0; i < count; i++) {
            randomItems.push(
                this.items[Math.floor(Math.random() * this.count())]
            )
        }

        return this.make(randomItems)
    }

    pluck(key) {
        let pluckedItems = []

        for (let i = 0; i < this.count(); i++) {
            pluckedItems.push(this.items[i][key])
        }

         return this.make(pluckedItems)
    }

    unique(key = '') {
        let uniqueItems = []

        if (key === '') {
            uniqueItems = this.items.reduce(function(previousValue, currentValue) {
                let hash = Object.values(currentValue).join('|');

                if (previousValue.temp.indexOf(hash) === -1) {
                    previousValue.out.push(currentValue);
                    previousValue.temp.push(hash);
                }

                return previousValue;
            }, { temp: [], out: [] }).out;
        } else {
            uniqueItems = this.items.filter((value, index) =>  this.items.findIndex(a => a[key] === value[key]) === index);
        }

        return this.make(uniqueItems)
    }

    push(item) {
        this.items.push(item)

        return this
    }

    pop() {
         return this.items.pop()
    }


}

module.exports = { Collection, collect };
