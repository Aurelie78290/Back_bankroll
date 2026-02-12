USE back_bankroll;

-- Désactiver les vérifications de clés étrangères et le mode safe update
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;

-- Vider les tables (TRUNCATE est plus rapide et reset l'auto_increment)
TRUNCATE TABLE session_tags;
TRUNCATE TABLE sessions;
TRUNCATE TABLE tags;
TRUNCATE TABLE users;

-- Réactiver les vérifications
SET FOREIGN_KEY_CHECKS = 1;
SET SQL_SAFE_UPDATES = 1;

-- 🔹 Users
INSERT INTO users (username, email, password, initial_bankroll)
VALUES 
('Aurélie', 'aurelie@email.com', '$2b$10$uo50oT8LoeeJL5ZwfZ.GuuC4ZpQljyLD8ly1.fkdWzkWz.qQDWSSa', 1000),
('Alex', 'alex@email.com', '$2b$10$uo50oT8LoeeJL5ZwfZ.GuuC4ZpQljyLD8ly1.fkdWzkWz.qQDWSSa', 500),
('Klara', 'klara@test.com','$2b$10$uo50oT8LoeeJL5ZwfZ.GuuC4ZpQljyLD8ly1.fkdWzkWz.qQDWSSa',1000);

-- 🔹 Sessions
-- Vérifier que les IDs des utilisateurs correspondent aux IDs générés
INSERT INTO sessions (user_id, date, room, buy_in, cash_out, duration, game_type, technical_rating, mental_rating, notes)
VALUES
(1, '2026-02-09','Winamax', 100, 150, 120, 'Cash Game', 8, 9, 'Bonne session, beaucoup de cartes favorables'),
(1, '2026-02-08','PMU Poker', 50, 30, 60, 'Cash Game', 5, 4, 'Session courte, pas de chance'),
(2, '2026-02-09', 'Casino Live Paris', 200, 250, 180, 'Tournoi', 9, 8, 'Session gagnante');

-- 🔹 Tags
INSERT INTO tags (name)
VALUES
('Tilt'),
('Good Game'),
('Bad Beat');

-- 🔹 Liaison session-tags
INSERT INTO session_tags (session_id, tag_id)
VALUES
(1, 2),  -- session 1 = Good Game
(2, 1),  -- session 2 = Tilt
(3, 2),  -- session 3 = Good Game
(3, 3);  -- session 3 = Bad Beat

-- Vérification
SELECT 'USERS:' as info;
SELECT * FROM users;

SELECT 'TAGS:' as info;
SELECT * FROM tags;

SELECT 'SESSIONS:' as info;
SELECT * FROM sessions;

SELECT 'SESSION_TAGS:' as info;
SELECT * FROM session_tags;