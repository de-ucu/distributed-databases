const orders = [
    [
        {
            order_number: 5,
            date: new Date("2020-01-01"),
            customer: {first_name: "James", last_name: "Hetfield", phone_numbers: [12456398, 98564123], address: "Kyiv"},
            payment: {card_owner: "James Hetfield", card_id: 1452365274589856},
            items: [
                {model:"Tacoma", manufacturer: "Toyota", price: 10882},
                {model:"Diablo", manufacturer: "Lamborghini", price: 1317},
                {model:"S6", manufacturer: "Audi", price: 3467},
                {model:"Outback", manufacturer: "Subaru", price: 11234},
            ],
        },
        {
            order_number: 4,
            date: new Date("2019-06-05"),
            customer: {first_name: "James", last_name: "Hetfield", phone_numbers: [12456398, 98564123], address: "Kyiv"},
            payment: {card_owner: "James Hetfield", card_id: 1452365274589856},
            items: [
                {model:"Sunbird", manufacturer: "Pontiac", price: 17872},
                {model:"Spyder", manufacturer: "Maserati", price: 18138},
            ],
        },
    ],
    [
        {
            order_number: 2,
            date: new Date("2017-03-11"),
            customer: {first_name: "Lars", last_name: "Ulrich", phone_numbers: [74961328, 95123574], address: "London"},
            payment: {card_owner: "Lars Ulrich", card_id: 5419761203698410},
            items: [
                {model:"Sorento", manufacturer: "Kia", price: 4841},
                {model:"RAV4", manufacturer: "Toyota", price: 17050},
                {model:"S6", manufacturer: "Audi", price: 3467},
            ],
        },
    ],
    [
        {
            order_number: 3,
            date: new Date("2018-01-01"),
            customer: {first_name: "Kirk", last_name: "Hammett", phone_numbers: [74123698, 89632147], address: "Los-Angeles"},
            payment: {card_owner: "Kirk Hammett", card_id: 2703214512369015},
            items: [
                {model:"Jetta", manufacturer: "Volkswagen", price: 10967},
                {model:"Forester", manufacturer: "Subaru", price: 17468},
            ],
        },
        {
            order_number: 6,
            date: new Date("2021-02-02"),
            customer: {first_name: "Kirk", last_name: "Hammett", phone_numbers: [74123698, 89632147], address: "Los-Angeles"},
            payment: {card_owner: "Kirk Hammett", card_id: 2703214512369015},
            items: [
                {model:"Beretta", manufacturer: "Chevrolet", price: 19766},
                {model:"S60", manufacturer: "Volvo", price: 7974},
                {model:"4Runner", manufacturer: "Toyota", price: 7413},
            ],
        },
    ],
    [
        {
            order_number: 1,
            date: new Date("2017-01-01"),
            customer: {first_name: "Robert", last_name: "Trujillo", phone_numbers: [12568756, 32658745], address: "Tenerife"},
            payment: {card_owner: "Robert Trujillo", card_id: 7810023696962102},
            items: [
                {model:"S60", manufacturer: "Volvo", price: 7974},
            ],
        },
    ]
];

for (const customer of orders) {
    for (const order of customer) {
        order.total_sum = order.items.reduce((acc, curr) => acc + curr.price, 0);
        const items = db.items
            .find({
                "$or": order.items,
            }, {_id: 1})
            .map(item => ({
                "$ref" : "items",
                "$id" : item._id,
            }));
        order.items = items;
        db.orders.insert(order);
    }
}



