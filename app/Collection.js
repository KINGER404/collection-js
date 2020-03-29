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

    first(defaultValue = null) {
       return this.exists(0) ? this.items[0] : defaultValue;
    }

    last(defaultValue = null) {
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

    reverse() {
        this.items.reverse()

        return this
    }

    tail(count = 1) {
        return this.make(
            this.items.slice(this.count() - count)
        )
    }

    shuffle() {
        return this.make(
            this.items.sort(() => Math.random() - 0.5)
        )
    }

    sum(key = null) {
        let sum = 0;
        if (!key) {
            for(let i = 0; i < this.count(); i++) {
                sum += this.items[i];
            }
        } else {
            for(let i = 0; i < this.count(); i++) {
                sum += this.items[i][key];
            }
        }
        return sum;
    }

    avg(key = null) {
        return this.sum(key) / this.count();
    }

    each(callback) {
        this.items.forEach(callback)

        return this
    }

    map(callback) {
        return this.make(
            this.items.map(callback)
        )
    }

    filter(callback = null) {
        let defaultCallback = item => !!item;

        let filtredItems = callback
            ? this.items.filter(callback)
            : this.items.filter(defaultCallback);

        return this.make(filtredItems);
    }

    find(callback = null) {
        let findedItems = callback
            ? this.items.find(callback)
            : this.items
        return this.make(findedItems);
    }
}

module.exports = { Collection, collect };
