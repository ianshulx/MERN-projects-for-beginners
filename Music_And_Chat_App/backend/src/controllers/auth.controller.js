const User = require('../models/user.model');


const NewUser = async (req, res) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;
        const user = await User.findOne({ clerkId: id });
        if (user) {
            return res.status(200).send(`User ${firstName} ${lastName} already exists`);
        }
        const newUser = new User({
            clerkId: id,
            fullName: `${firstName} ${lastName}`,
            imageUrl,
        });

        await newUser.save();
            res.status(201).json({
                success: true,
                message: `User ${firstName} ${lastName} created successfully`,
                user: newUser,
            });
    } catch (error) {
            console.error('Error in callback auth.controller:', error?.message || error);
            res.status(500).json({ success: false, message: 'Server Error' });
    }
}


module.exports = {
    NewUser,
};