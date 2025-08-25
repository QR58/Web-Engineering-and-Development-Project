<?php

$conn = new mysqli("localhost", "root", "", "leaderboard_db");

// if error occurs 
if ($conn->connect_errno) {
    echo "Failed to connect to MySQL: " . $conn->connect_error;
    exit();
}

?>