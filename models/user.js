const mongoose = require('mongoose')
const { Schema, model } = mongoose
const bcrypt = require('bcryptjs')

  const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: null,
      }
    }, 
  { versionKey: false },
)

    userSchema.pre('save', async function(next) {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(6)
            this.password = await bcrypt.hash(this.password, salt)
        }
        next()
    })

    userSchema.methods.isValidPassword = async function(password) {
        return await bcrypt.compare(password, this.password)
    }

  const User = model('user', userSchema)
  
  module.exports = User