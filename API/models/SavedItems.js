const mongoose = require('mongoose');

const savedItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    }
    
});

const SavedItem = mongoose.model('SavedItem', savedItemSchema);

module.exports = SavedItem;
