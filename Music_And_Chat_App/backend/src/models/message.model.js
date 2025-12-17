const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        // ref: 'User',
        required: true,
    },
    receiverId: {
        type: String,
        // ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },


    // read: {
    //     type: Boolean,
    //     default: false
    // },
    // readAt: {
    //     type: Date
    // },
    // conversationId: {
    //     type: String,
    //     index: true
    // }


}, { timestamps: true });

// messageSchema.pre('save', function (next) {
//     const ids = [this.senderId, this.receiverId].sort();
//     this.conversationId = ids.join('_');
//     next();
// });

// // Get unread messages count for a user
// messageSchema.statics.getUnreadCount = async function (userId) {
//     return await this.countDocuments({
//         receiverId: userId,
//         read: false
//     });
// };


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;