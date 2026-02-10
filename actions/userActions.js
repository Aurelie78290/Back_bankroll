import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from "../repository/userRepository.js";

const userActions = {
  // Browse - Liste tous les users
  async browse(req, res) {
    try {
      const users = await userRepository.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Read - Récupère un user
  async read(req, res) {
    try {
      const { id } = req.params;
      const user = await userRepository.findById(id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Edit - Modifie un user
  async edit(req, res) {
    try {
      const { id } = req.params;
      const { username, email, initial_bankroll } = req.body;
      
      await userRepository.update(id, username, email, initial_bankroll);
      res.json({ message: 'User updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Add - Créer un user (register)
  async add(req, res) {
    try {
      const { username, email, password, initial_bankroll } = req.body;
      
      // Validation basique
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Créer l'utilisateur
      const userId = await userRepository.create(username, email, hashedPassword, initial_bankroll);
      
      res.status(201).json({ id: userId, username, email });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Delete - Supprimer un user
  async destroy(req, res) {
    try {
      const { id } = req.params;
      await userRepository.delete(id);
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Login (logique métier supplémentaire)
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Trouver l'utilisateur
      const user = await userRepository.findByEmail(email);
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Vérifier le mot de passe
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Créer le token JWT
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'secret_key_change_me',
        { expiresIn: '7d' }
      );
      
      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export default userActions;