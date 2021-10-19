const { Schema, model } = require('mongoose');
const ThoughtSchema = require('./Thought');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/[\w.]+@[\w.]+.[\w.]+/]
        },
        thoughts: [{type: Schema.Types.ObjectId, ref: 'Thought'}],
        friends: [{type: Schema.Types.ObjectId, ref: 'User'}]
    }
);

// UserSchema.virtual('friendCount').get(function() {
//     return this.friends.length
// });

const User = model('User', UserSchema);

module.exports = User;