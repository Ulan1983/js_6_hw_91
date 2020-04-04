const mongoose = require('mongoose');
const config = require('./config');
const nanoid = require('nanoid');


const User = require('./models/User');

const run = async () => {

    await mongoose.connect(config.database, config.databaseOptions);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [user1, user2] = await User.create({
        username: 'max',
        password: '123',
        displayName: 'Maksat Imanaliev',
        phoneNumber: '+996 550 60 30 35',
        token: nanoid()
    }, {
        username: 'nat',
        password: '123',
        displayName: 'Natalia Imanalieva',
        phoneNumber: '+996 553 126 219',
        token: nanoid()
    });

    mongoose.connection.close();
};

run().catch(e => {
    mongoose.connection.close();
    throw e;
});