import db from "../database/db.js";

const userRepository = {
  // Create
  async create(username, email, hashedPassword, initialBankroll = 0) {
    const [result] = await db.query(
      "INSERT INTO users (username, email, password, initial_bankroll) VALUES (?,?,?,?)",
      [username, email, hashedPassword, initialBankroll],
    );
    return result.insertId;
  },

  // Read All
  async findAll() {
    const [rows] = await db.query(
      "SELECT id, username, email, initial_bankroll, created_at FROM users",
    );
    return rows;
  },

  // Read One
  async findById(id) {
    const [rows] = await db.query(
      "SELECT id, username, email, CAST(initial_bankroll AS DOUBLE) AS initial_bankroll, created_at FROM users WHERE id = ?",
      [id],
    );
    return rows[0] || null;
  },

  // Read by Email (pour login)
  async findByEmail(email) {
    const [rows] = await db.query(
      `SELECT 
      id,
      username,
      email,
      password,
      CAST(initial_bankroll AS DOUBLE) AS initial_bankroll,
      created_at
     FROM users
     WHERE email = ?`,
      [email],
    );
    return rows[0] || null;
  },

  // Update
  async update(id, username, email, initialBankroll) {
    await db.query(
      "UPDATE users SET username=?, email=?, initial_bankroll=? WHERE id=?",
      [username, email, initialBankroll, id],
    );
  },

  // Delete
  async delete(id) {
    await db.query("DELETE FROM users WHERE id=?", [id]);
  },
};

export default userRepository;
