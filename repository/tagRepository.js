import db from "../database/db.js";


const tagRepository = {
  // Create
  async create(name) {
    const [result] = await db.query('INSERT INTO tags (name) VALUES (?)', [name]);
    return result.insertId;
  },

  // Read All
  async findAll() {
    const [rows] = await db.query('SELECT * FROM tags ORDER BY name');
    return rows;
  },

  // Read One
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM tags WHERE id = ?', [id]);
    return rows[0] || null;
  },

  // Update
  async update(id, name) {
    await db.query('UPDATE tags SET name=? WHERE id=?', [name, id]);
  },

  // Delete
  async delete(id) {
    await db.query('DELETE FROM tags WHERE id=?', [id]);
  }
};

export default tagRepository;