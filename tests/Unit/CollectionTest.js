const { Collection, collect } =  require("../../app/Collection.js")
const test = require('ava');

const items = [
    {'product': 'Desk', 'price': 200},
    {'product': 'Chair', 'price': 100}
];

test('collect', t => {
    let collection = new Collection(items);

    t.deepEqual(collect(items), collection);
})

test('Collection.all', t => {
    let collection = new Collection(items);

    t.deepEqual(collection.all(), items);

    let singleItem = {
        product: 'Desk',
        price: 200
    };

    let collectionWithSingleItem = new Collection(singleItem);

    t.deepEqual(collectionWithSingleItem.all(), [singleItem])
});

test('Collection.first', t => {
    let collection = new Collection(items);

    t.is(collection.first(), items[0]);

    t.is(collection.make([]).first(), null)
    t.is(collection.make([]).first('hello world'), 'hello world')
})

test('Collection.last', t => {
    let collection = new Collection([
        {'product': 'Desk', 'price': 200},
        {'product': 'Chair', 'price': 100}
    ]);

    t.deepEqual(collection.last(), {'product': 'Chair', 'price': 100});

    t.is(collection.make([]).last(), null)
    t.is(collection.make([]).last('hello world'), 'hello world')
})

test('Collection.count', t => {
    let collection = new Collection(items);

    t.is(collection.count(), items.length);
})

test('Collection.random', t => {
    let collection = new Collection(items);

    let oneRandom = collection.random();

    t.is(1, oneRandom.count());

    let twoRandom = collection.random(2);

    t.is(2, twoRandom.count());
})

test('Collection.pluck', t => {
    let itemsToPluck = [
        {'product': 'Desk', 'price': 200},
        {'product': 'Chair', 'price': 100}
    ];

    let collection = new Collection(itemsToPluck);

    t.deepEqual(collection.pluck('product').toArray(), ['Desk', 'Chair']);
})

test('Collection.make', t => {
    let collection = new Collection(items);

    t.deepEqual(collection.make(items), collection);
})

test('Collection.toArray', t => {
    let collection = new Collection(items);

    t.deepEqual(collection.toArray(), items);
})

test('Collection.unique', t => {
    let collection = new Collection([
        {'product': 'Desk', 'price': 200},
        {'product': 'Desk', 'price': 200},
        {'product': 'Chair', 'price': 200}
    ]);

    t.deepEqual(collection.unique(), new Collection([
        {'product': 'Desk', 'price': 200},
        {'product': 'Chair', 'price': 200}
    ]));

    t.deepEqual(collection.unique('price'), new Collection([
        {'product': 'Desk', 'price': 200}
    ]));
})

test('Collection.exists', t => {
    let collection = new Collection([]);

    t.is(collection.exists(0), false);

    let collectionHasItem = new Collection([
        {'product': 'Desk', 'price': 200}
    ]);

    t.is(collectionHasItem.exists(0), true);
})

test('Collection.isEmpty', t => {
    let collection = new Collection([]);

    t.is(collection.isEmpty(), true);

    let notEmptyCollection = new Collection([1, 2, 3]);

    t.is(notEmptyCollection.isEmpty(), false);
})

test('Collection.hasAny', t => {
    let collection = new Collection([]);

    t.is(collection.hasAny(), false);

    let notEmptyCollection = new Collection([1, 2, 3]);

    t.is(notEmptyCollection.hasAny(), true);
})

test('Collection.push', t => {
    let collection = new Collection([]);

    t.deepEqual(collection.push(1), new Collection([1]))
})

test('Collection.pop', t => {
    let collection = new Collection([1, 2, 3]);

    t.deepEqual(collection.pop(), 3)
})

test('Collection.reverse', t => {
    let collection = new Collection([1, 2, 3]);

    t.deepEqual(collection.reverse(), new Collection([3, 2, 1]))
})

test('Collection.tail', t => {
    let collection = new Collection([1, 2, 3]);

    t.deepEqual(collection.tail(), new Collection([3]))

    t.deepEqual(collection.tail(2), new Collection([2, 3]))
})

test('Collection.shuffle', t => {
    let collection = new Collection([1, 2, 3, 4 , 5 , 6, 7, 8, 9, 10]);

    let shuffledCollection = collection.shuffle();

    t.is(shuffledCollection.count(), collection.count())

    t.assert(shuffledCollection !== collection)
})

test('Collection.sum', t => {
    let collection = new Collection([1, 2, 3]);
    let collectionWithObjects = new Collection([
        {'product': 'Desk', 'price': 200},
        {'product': 'Chair', 'price': 200}
    ])

    t.is(collectionWithObjects.sum('price'), 400)

    t.is(collection.sum(), 6)
})

test('Collection.avg', t => {
    let collection = new Collection([1, 2, 3]);
    let collectionWithObjects = new Collection([
        {'product': 'Desk', 'price': 200},
        {'product': 'Chair', 'price': 200}
    ])

    t.is(collectionWithObjects.avg('price'), 200)

    t.is(collection.avg(), 2)
})

test('Collection.each', t => {
    let collection = new Collection([1, 2, 3]);
    let counter = 0;

    collection.each(function (item) {
        counter += item
    })

    t.is(6, counter)
})

test('Collection.map', t => {
    let collection = new Collection([1, 2, 3]);

    t.deepEqual(collection.map(function (item) {
        item += 1

        return item;
    }), new Collection([2, 3, 4]))
})

test('Collection.filter', t => {
    let collection = new Collection([false, null, undefined]);

    t.deepEqual(collection.filter(), new Collection([]))

    let positiveCollection = new Collection([1, 2, 3, null])

    t.deepEqual(positiveCollection.filter(), new Collection([1, 2, 3]))

    t.deepEqual(positiveCollection.filter(function (item) {
        return item && item % 2 === 0
    }), new Collection([2]))
})

test('Collection.find', t => {
    let collection = new Collection([2, 1, 3]);

    t.deepEqual(collection.find(), collection)

    let positiveCollection = new Collection([1, 2, 3, 4])

    t.deepEqual(positiveCollection.find(function (item) {
        return item > 3
    }), new Collection([4]))
})




