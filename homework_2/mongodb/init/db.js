db.auth("root", "example")

hw2 = db.getSiblingDB("hw2")
hw2.createUser(
    {
        user: "user",
        pwd: "example",
        roles: [
            {
                role: "readWrite",
                db: "hw2"
            }
        ]
    }
);
