import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Récupérer le token depuis le header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];

    // Vérifier le token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret_key_change_me",
    );

    // Ajouter l'userId à la requête
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalide" });
  }
};
