const { clerkClient } = require('@clerk/express');

const protectRoute = async (req, res, next) => {
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({
            message: "unauthorized - you must be logged in"
        });
    }
    return next();
}

const requireAdmin = async (req, res, next) => {
    try {
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({ message: 'unauthorized - missing user id' });
        }

        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const primaryEmail = currentUser?.primaryEmailAddress?.emailAddress;
        const isAdmin = process.env.ADMIN_EMAIL && primaryEmail && process.env.ADMIN_EMAIL === primaryEmail;

        if (!isAdmin) {
            return res.status(403).json({
                message: "forbidden - admin only"
            });
        }

        return next();
    } catch (err) {
        console.error('requireAdmin error:', err?.message || err);
        return res.status(500).json({ message: 'internal server error' });
    }
}

module.exports = { protectRoute, requireAdmin };