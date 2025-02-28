require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token

    if (!token) {
        return res.status(401).json({ success: false, message: "Accès refusé. Aucun token fourni." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attacher l'utilisateur à la requête
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: "Token invalide." });
    }
};

module.exports = authMiddleware;
