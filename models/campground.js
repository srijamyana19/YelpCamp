const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200,h_200');
})

const opts = { toJSON: { virtuals: true } };

const campgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: { 
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
}, opts);

campgroundSchema.virtual('properties.popUpMarkupText').get(function () {
    return `<img src="${this.images[0].url}" style="width: 90%; height: 100px; float: left;"><br>
            <strong><h4>${this.title}</h4></strong>
            <p>${this.description.substring(0,30)}...</p>
            <a href="/campgrounds/${this._id}">view details</a>`;
});

campgroundSchema.post('findOneAndDelete', async function(data){
    if(data){
        await Review.deleteMany({
            _id: {
                $in: data.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', campgroundSchema);
