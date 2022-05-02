const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { randomUUID } = require('crypto')
const { Subscription } = require('../libs/constants')
const { Schema, model } = mongoose

  const userSchema = new Schema({
      name: { 
        type: String, 
        default: 'Guest user' 
        },
      password: {
        type: String,
        required: [true, 'Password is required'],
        },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate(value) {
          const re = /\S+@\S+\.\S+/
          return re.test(String(value).toLowerCase())
        },
      },
      subscription: {
        type: String,
        enum: { values: Object.values(Subscription), message: 'Invalid subscription!' },
        default: Subscription.STARTER,
      },
      avatarURL: {
        type: String,
        default: function() {
          return gravatar.url(this.email,{ s: '300' }, true)
        }
      },
      token: {
        type: String,
        default: null,
      },
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        default: randomUUID(),
        // required: [true, 'Verify token is required'],
      },
    }, 
  { versionKey: false, 
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id
        return ret
      },
    },
    toObject: { virtuals: true },
  },
)

    userSchema.pre('save', async function(next) {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(6)
            // console.log('salt', salt);
            this.password = await bcrypt.hash(this.password, salt)
        }
        next()
    })

    userSchema.methods.isValidPassword = async function(password) {
        return await bcrypt.compare(password, this.password)
    }

  const User = model('user', userSchema)
  
  module.exports = User