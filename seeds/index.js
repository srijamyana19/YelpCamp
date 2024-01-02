const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *20) + 10;
        const camp = new Campground({
            author: '654968d12418370c1353c8f6',
            location: `${cities[random].city}, ${cities[random].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum recusandae non cumque dolores nulla corrupti alias odio expedita obcaecati ducimus, doloribus sapiente deleniti, itaque ab modi ut laboriosam. Natus, perferendis.',
            price: price,
            images: [
                {
                  url: 'https://res.cloudinary.com/donqs4v9d/image/upload/v1703842671/scott-goodwill-y8Ngwq34_Ak-unsplash_t6wsrx.jpg',
                  filename: 'YelpCamp/nipz0dushmad8lznmotc',
                },
                {
                  url: 'https://res.cloudinary.com/donqs4v9d/image/upload/v1703220939/YelpCamp/qojvqbyimotonqorm0fp.jpg',
                  filename: 'YelpCamp/qojvqbyimotonqorm0fp',
                }
              ],
              geometry: { type: 'Point', coordinates: [ cities[random].longitude, cities[random].latitude ] },
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});