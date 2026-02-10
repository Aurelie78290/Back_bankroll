import sessionRepository from "../repository/sessionRepository.js";

const sessionActions = {
  // Browse
  async browse(req, res) {
    try {
      const sessions = await sessionRepository.findAll();
      res.json(sessions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Read
  async read(req, res) {
    try {
      const { id } = req.params;
      const session = await sessionRepository.findById(id);
      if (!session) return res.status(404).json({ error: "Session not found" });

      const tags = await sessionRepository.getTagsBySessionId(id);
      res.json({ ...session, tags });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Add
  async add(req, res) {
    try {
      const {
        user_id,
        date,
        buy_in,
        cash_out,
        duration,
        game_type,
        notes,
        tag_ids,
      } = req.body;

      if (
        !user_id ||
        !date ||
        buy_in === undefined ||
        cash_out === undefined ||
        duration === undefined ||
        !game_type
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const sessionId = await sessionRepository.create(
        user_id,
        date,
        buy_in,
        cash_out,
        duration,
        game_type,
        notes,
      );

      if (tag_ids && tag_ids.length > 0) {
        await sessionRepository.addTags(sessionId, tag_ids);
      }

      res.status(201).json({ id: sessionId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Edit
  async edit(req, res) {
    try {
      const { id } = req.params;
      const {
        user_id,
        date,
        buy_in,
        cash_out,
        duration,
        game_type,
        notes,
        tag_ids,
      } = req.body;

      await sessionRepository.update(id, {
        userId: user_id,
        date,
        buyIn: buy_in,
        cashOut: cash_out,
        duration,
        gameType: game_type,
        notes,
      });

      // Gérer les tags
      await sessionRepository.removeTags(id);
      if (tag_ids && tag_ids.length > 0) {
        await sessionRepository.addTags(id, tag_ids);
      }

      res.json({ message: "Session updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Delete
  async destroy(req, res) {
    try {
      const { id } = req.params;
      await sessionRepository.delete(id);
      res.json({ message: "Session deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default sessionActions;
