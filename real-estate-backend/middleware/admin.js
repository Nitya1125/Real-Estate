const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied, admin Only" });
    } 
    next();
};

module.exports = adminMiddleware;