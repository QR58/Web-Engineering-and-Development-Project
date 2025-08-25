<?php
require 'db_connection.php';

if (isset($_POST['save_score'])) {
    $player_name = $_POST['player_name'];
    $score = $_POST['score'];

    //Validate name input,(if player hve the same name, only the score will be updated for him)
    $sql = "SELECT * FROM leaderboard WHERE pname = '$player_name'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $result = $conn->query("UPDATE leaderboard SET pscore = '$score' WHERE pname = '$player_name'");
    } else {
        if (
            strlen($player_name) > 0 &&
            strlen($score) > 0
        ) {
            $result = $conn->query("INSERT INTO leaderboard VALUES (DEFAULT, '$player_name', '$score')");
        } else {
            echo " Empty text fields ...";
        }
    }

    exit();
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Words War</title>
    <link rel="stylesheet" type="text/css" href="style.css">


</head>

<body>

    <div class="titleAnimation">
        <h1 id="title" class="typewriter">Words War The Game</h1>
    </div>

    <h2 id="score">Score: 0</h2>
    <h2 id="life">Life: 3</h2>

    <p id="enter-name" class="enter-name">Enter Your Name:</p>


    <input id="player-name" name="player-name" type="text" placeholder="Enter Your Name">
    <button id="start-button" type="button" onclick="StartGame()">Start</button><br>

    <button id="leaderBoard-button" type="button" onclick="goToLeaderBoard()">Leader Board</button>

    <p id="gameword"></p>
    <input id="user-input" type="text" placeholder="Enter the sentence">

    <h1 id="countdown">3</h1>

    <!-- Timer structure -->
    <div id="timer-container">
        <div id="timer-bar"></div>
    </div>

    <!-- Pop up structure -->
    <div class="container-popUp" id="popUp">
        <div class="popUp">
            <h1 class="squeid-font">Game Over</h1>
            <div class="leader-board"></div> <!-- Here the popUp data will appear, because of updateLeaderboard();-->

            <button class="restart-button" id="restart-button" type="button" onclick="restartGame()">Restart</button>
        </div>
    </div>

    <script src="game.js"></script>
</body>

</html>