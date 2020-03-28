import { collect } from "./Collection"

let items = [
    {'product': 'Desk', 'price': 200},
    {'product': 'Chair', 'price': 100},
    {'product': 'Chair', 'price': 100},
    {'product': 'Chaira', 'price': 100},
    {'product': 'Desk', 'price': 2100},
    {'product': 'Desk', 'price': 200},
];

console.log(
    collect([1, 2, 3, 3]).all()
)
