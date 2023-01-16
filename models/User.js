const mongoose = require('mongoose') 
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Enter an email'], 
        unique:  [true,'Email already registered'],
        lowercase : true,
    },
    name: {
        type: String, 
        unique:  [true,'Name already Exists'],
        required: [true,'Enter Full Name'],
        minlength : [4,'Name should have atleast 6 characters']
    },
    password: {
        type: String, 
        required: [true,'Enter Password'],
        minlength : [8,'Password should have atleast 8 characters']
    }

},{ collection: 'users', timestamps: true})


userSchema.pre('save',async function(next){
    // const salt = await bcrypt.genSalt();
    this.password = await bcryptjs.hash(this.password,12)
    // console.log('User is about to be stored in database',this);
    next();
})



const User = mongoose.model('User', userSchema)

module.exports = User;

// User.create ({
    // email : "rakesh.b20@iiits.in",
    // name : "Rakesh Bodavula",
    // password: "Rakesh@fsd2",
// })