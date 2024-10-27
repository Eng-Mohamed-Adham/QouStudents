const User = require('../models/users')
const asyncHandler = require('express-async-handler')
const bcrypt  = require('bcryptjs')


//@desc Get all User
//@route Get /users
//@access Private
const getAllUsers = asyncHandler(async (req,res) => {
    const Users = await  User.find().lean()

    if(!Users){
        return res.status(400).json({message:'No Users Found..'})
    }
     res.json(Users)

})

//@desc Create a New User
//@route Post /user/new
//@access Private
const createNewUser = asyncHandler(async (req,res) => {
    const {name,password,roles,image} = req.body

    if(!name || !password || !Array.isArray(roles) || !roles?.length || !image) {
        return res.status(400).json({message:'All Fields are required..'})
    }

    const duplicate = await User.findOne({name}).lean().exec()
    if(duplicate){
        return res.status(409).json({message: 'Duplicate name'})
    }

    //Hashed password
    const hashedPwd = await bcrypt.hash(password,10) // 10 is salt rounds
    const userObject = {name,"password": hashedPwd, roles,image}

    //Create and store new user
    const user = await User.create(userObject)

    if(user){
        //created
        res.status(201).json({message: `new user ${name} created`})
    }else{
        res.status(400).json({message: 'Invalid user data received'})
    }

})


//@desc update a user 
//@route PATCH /users
//@access Private
const updateUser = asyncHandler(async (req, res) => {
    const { name, roles, password, image, id } = req.body

    // Confirm data 
    if (!name || !Array.isArray(roles) || !roles.length  || !id) {
        return res.status(400).json({ message: 'All fields are required except password' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec() // استخدام id فقط

    if (!user) {
        return res.status(404).json({ message: 'User not found' }) // تغيير حالة الخطأ إلى 404
    }

    // Check for duplicate (if necessary based on unique fields like email, but not id)
    // const duplicate = await User.findOne({ email: req.body.email }).lean().exec()
    // if (duplicate && duplicate._id.toString() !== id) {
    //     return res.status(409).json({ message: 'Duplicate email' })
    // }

    user.name = name
    user.roles = roles
    user.image = image

    if (password) {
        // Hash password if provided
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.name} updated successfully` })
})

//@desc Delete a user 
//@route DELETE /users
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID is required' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(404).json({ message: 'User not found' }) // تغيير حالة الخطأ إلى 404
    }

    const result = await user.deleteOne()

    const reply = `User with ID ${result._id} deleted`

    res.json({ message: reply })
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}