<?php
require 'db_connection.php';

// Display top 5 scores
$result = $conn->query("SELECT pname, pscore FROM leaderboard ORDER BY pscore DESC LIMIT 5");
if ($result->num_rows > 0) {
    echo "<table style='width:100%; color:black;'>";
    echo "<tr><th class = 'squeid-font' >Rank</th><th class = 'squeid-font'>Player</th><th class = 'squeid-font' >Score</th></tr>";
    $rank = 1;
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td class = 'records-font' >$rank</td>";
        echo "<td class = 'records-font' >{$row['pname']}</td>";
        echo "<td class = 'records-font' >{$row['pscore']}</td>";
        echo "</tr>";
        $rank++;
    }
    echo "</table>";
} else {
    echo "<p style='color:white;'>No scores yet!</p>";
}
?>