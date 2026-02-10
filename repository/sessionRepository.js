import db from "../database/db.js";

const sessionRepository = {
  // Create
  async create(userId, date, buyIn, cashOut, duration, gameType, notes) {
    const [result] = await db.query(
      "INSERT INTO sessions (user_id, date, buy_in, cash_out, duration, game_type, notes) VALUES (?,?,?,?,?,?,?)",
      [userId, date, buyIn, cashOut, duration, gameType, notes],
    );
    return result.insertId;
  },

  // Read All (avec infos user et tags)
  async findAll() {
    const [rows] = await db.query(`
      SELECT s.*, 
             u.username,
             (s.cash_out - s.buy_in) as profit,
             GROUP_CONCAT(t.name) as tags
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      LEFT JOIN session_tags st ON s.id = st.session_id
      LEFT JOIN tags t ON st.tag_id = t.id
      GROUP BY s.id
      ORDER BY s.date DESC
    `);
    return rows;
  },

  // Read One
  async findById(id) {
    const [sessions] = await db.query(
      `
      SELECT s.*, 
             u.username,
             (s.cash_out - s.buy_in) as profit
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.id = ?
    `,
      [id],
    );
    return sessions[0] || null;
  },

  // Read sessions by user
  async findByUserId(userId) {
    const [rows] = await db.query(
      `
      SELECT s.*, (s.cash_out - s.buy_in) as profit
      FROM sessions s
      WHERE s.user_id = ?
      ORDER BY s.date DESC
    `,
      [userId],
    );
    return rows;
  },

  // Update
  async update(
    id,
    { userId, date, buyIn, cashOut, duration, gameType, notes },
  ) {
    await db.query(
      "UPDATE sessions SET user_id=?, date=?, buy_in=?, cash_out=?, duration=?, game_type=?, notes=? WHERE id=?",
      [userId, date, buyIn, cashOut, duration, gameType, notes, id],
    );
  },

  // Delete
  async delete(id) {
    await db.query("DELETE FROM sessions WHERE id=?", [id]);
  },

  // Opérations sur les tags de session
  async addTags(sessionId, tagIds) {
    if (tagIds && tagIds.length > 0) {
      const values = tagIds
        .map((tagId) => `(${sessionId}, ${tagId})`)
        .join(",");
      await db.query(
        `INSERT INTO session_tags (session_id, tag_id) VALUES ${values}`,
      );
    }
  },

  async removeTags(sessionId) {
    await db.query("DELETE FROM session_tags WHERE session_id=?", [sessionId]);
  },

  async getTagsBySessionId(sessionId) {
    const [rows] = await db.query(
      `
      SELECT t.id, t.name
      FROM tags t
      JOIN session_tags st ON t.id = st.tag_id
      WHERE st.session_id = ?
    `,
      [sessionId],
    );
    return rows;
  },
};

export default sessionRepository;
