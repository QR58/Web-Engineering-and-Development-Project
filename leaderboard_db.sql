SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
CREATE DATABASE IF NOT EXISTS leaderboard_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE leaderboard_db;

CREATE TABLE IF NOT EXISTS leaderboard (
  pid int(5) NOT NULL AUTO_INCREMENT,
  pname varchar(25) NOT NULL,
  pscore int(10) NOT NULL,
  PRIMARY KEY (pid)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO leaderboard (pid, pname, pscore) VALUES
(1, 'Nawaf', 2),
(2, 'Mohammed', 7),
(3, 'Ali', 3);
