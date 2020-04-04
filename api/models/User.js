const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nanoid = require("nanoid");

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (value) {
                if (!this.isModified('username')) return true;
                const user = await User.findOne({username: value});
                if (user) throw new Error('This user is already registered');
                if (this.username.length < 3) {
                    throw new Error("Username should be 3 symbols at least");
                }
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function () {
                if (this.password.length < 6) {
                    throw new Error("Password should be 6 symbols at least");
                }
                if (this.password !== this.rePassword) {
                    throw new Error("You entered different passwords");
                }
            }
        }
    },
    rePassword: {
        type: String,
        required: true,
        validate: {
            validator: function () {
                if (this.password !== this.rePassword) {
                    throw new Error("You entered different passwords");
                }
            }
        }
    },
    displayName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

UserSchema.methods.generateToken = function () {
    this.token = nanoid();
};

UserSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();
    if (!this.isModified('rePassword')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    this.rePassword = await bcrypt.hash(this.rePassword, salt);
    next();

});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        delete ret.rePassword;
        return ret;
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;