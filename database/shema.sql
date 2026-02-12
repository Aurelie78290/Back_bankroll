CREATE DATABASE IF NOT EXISTS back_bankroll;
USE back_bankroll;

-- Suppression des tables existantes (réinitialisation)
DROP TABLE IF EXISTS session_tags;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;

-- ==========================================
-- TABLE: users
-- ==========================================
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  initial_bankroll DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================
-- TABLE: sessions
-- ==========================================
CREATE TABLE sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  room VARCHAR(100) COMMENT 'Salle où la session a été jouée (ex: Winamax, PMU, Live Casino)',
  buy_in DECIMAL(10,2) NOT NULL,
  cash_out DECIMAL(10,2) NOT NULL,
  duration INT COMMENT 'Durée en minutes',
  game_type VARCHAR(50) COMMENT 'Type de jeu (cash, tournoi, etc.)',
  technical_rating TINYINT CHECK (technical_rating BETWEEN 1 AND 10) COMMENT 'Note technique sur 10',
  mental_rating TINYINT CHECK (mental_rating BETWEEN 1 AND 10) COMMENT 'Note mentale/cooldown sur 10',
  notes TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================
-- TABLE: tags
-- ==========================================
CREATE TABLE tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================
-- TABLE DE JOINTURE: session_tags
-- ==========================================
CREATE TABLE session_tags (
  session_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (session_id, tag_id),
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;