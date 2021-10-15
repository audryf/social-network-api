const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

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
        thoughts: [ThoughtSchema],
        friends: [UserSchema]
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;