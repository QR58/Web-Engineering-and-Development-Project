<?php
require 'db_connection.php';
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
    <div class="leaderboard-container">

        <h1 class="leaderboard-header">Leader board</h1>

        <?php

        $result = $conn->query("SELECT pname, pscore FROM leaderboard ORDER BY pscore DESC LIMIT 10");

        if ($result->num_rows > 0) {
            echo "<table>";
            echo "<tr><th class = 'squeid-font'>Rank</th><th class = 'squeid-font' >Player</th><th class = 'squeid-font' >Score</th></tr>";
            $rank = 1;
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td class = 'records-font'>$rank</td>";
                echo "<td class = 'records-font' >{$row['pname']}</td>";
                echo "<td class = 'records-font' >{$row['pscore']}</td>";
                echo "</tr>";
                $rank++;
            }
            echo "</table>";
        } else {
            echo "<p>No scores yet!</p>";
        }
        ?>

        <button class="back-button" onclick="location.href='index.php'">Back to Game</button>
    </div>
</body>

</html>