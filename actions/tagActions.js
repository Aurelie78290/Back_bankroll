import tagRepository from "../repository/tagRepository.js";

const tagActions = {
  // Browse
  async browse(req, res) {
    try {
      const tags = await tagRepository.findAll();
      res.json(tags);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Read
  async read(req, res) {
    try {
      const { id } = req.params;
      const tag = await tagRepository.findById(id);
      
      if (!tag) {
        return res.status(404).json({ error: 'Tag not found' });
      }
      
      res.json(tag);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Edit
  async edit(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      
      await tagRepository.update(id, name);
      res.json({ message: 'Tag updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Add
  async add(req, res) {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      
      const tagId = await tagRepository.create(name);
      res.status(201).json({ id: tagId, name });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Delete
  async destroy(req, res) {
    try {
      const { id } = req.params;
      await tagRepository.delete(id);
      res.json({ message: 'Tag deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

export default tagActions;