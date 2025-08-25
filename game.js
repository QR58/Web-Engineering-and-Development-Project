function Hide(string) {
  document.getElementById(string).style.display = "none";
}

function Show(string) {
  document.getElementById(string).style.display = "block";
}

// block copy for right click on mouse
document
  .getElementById("gameword")
  .addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

// block copy for crtl+c
document.addEventListener("keydown", function (e) {
  if ((e.ctrlKey || e.metaKey) && (e.key === "c" || e.key === "C")) {
    e.preventDefault();
  }
});

// block copy form the pop up menu
document.addEventListener("copy", function (e) {
  e.preventDefault();
});

// to check the game word that the user and the user input and return true if equal and false if not.
function Check_word(game_word, input_word) {
  return game_word.toLowerCase() === input_word.toLowerCase();
}

let point = 0;
let life = 3;

function updateScoreAndLife(isCorrect) {
  if (isCorrect) {
    point++;
    document.getElementById("score").innerHTML = "Score: " + point;
  } else {
    life--;
    document.getElementById("life").innerHTML = "Life: " + life;
    // Game over
    if (life <= 0) {
      // Save score before showing popup
      saveScore();
    }
  }
}

function saveScore() {
  // Get player name from input
  const playerName =
    document.getElementById("player-name").value || "Anonymous";

  // Send score to server
  fetch("index.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `player_name=${encodeURIComponent(playerName)}&score=${point}&save_score=1`,
  })
    .then((response) => response.text())
    .then(() => {
      // Update leaderboard in the popup after saving score
      updateLeaderboard();
    })
    .catch((error) => console.error("Error submitting score:", error));

  // Show game over popUp.
  document.getElementById("popUp").classList.add("open");
}

function updateLeaderboard() {
  // Fetch updated popUp leaderboard data
  fetch("get_popUpLeaderboard.php")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(".leader-board").innerHTML = data;
    })
    .catch((error) => console.error("Error updating leaderboard:", error));
}

function restartGame() {
  // Reset game state, or simply reload it.
  location.reload();
}

// here create array and use fetch function

let words_array = ["hi."];

// fetch data for array (path,array)
function get_json_data(file_path, array) {
  fetch(file_path)
    //  check data fetching...
    .then((response) => {
      // check if response fail
      if (!response.ok) {
        throw new Error("fail to get response status:" + response.status);
      }

      // convert data to json
      return response.json();
    })

    //  now play with data
    .then((data) => {
      // access array values
      data.words.forEach((word) => {
        array.push(word);
      });
    })

    //  handle any unexpected error
    .catch((error) => {
      console.error("error while fetching...", error);
    });
}

get_json_data("wr.json", words_array);

console.log(words_array);

// to change the display word after the user input
function display_word(ele_id, array) {
  // take random word from the array
  var index = Math.floor(Math.random() * array.length);
  // print it and deleted so it would not repeat splice(index,1) goes to index and delete one ele from index position
  // , [0] to print the ele as word not array.
  var d_word = array.splice(index, 1)[0];
  document.getElementById(ele_id).innerHTML = d_word;
}

document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendInput();
    }
  });

function sendInput() {
  var inputText = document.getElementById("user-input").value;
  var gw = document.getElementById("gameword").innerText;
  var isCorrect = Check_word(gw, inputText);

  updateScoreAndLife(isCorrect);
  document.getElementById("timer-bar").style.width = "100%";
  // empty input box and update word for the next word.
  document.getElementById("user-input").value = "";
  display_word("gameword", words_array);

  clearInterval(wordTimer);
  startWordTimer();
}

// first time display word
display_word("gameword", words_array);

function start_time() {
  let countdown = 3;
  document.getElementById("countdown").innerHTML = countdown;
  Show("countdown");

  let countdownInterval = setInterval(function () {
    countdown--;
    document.getElementById("countdown").innerHTML = countdown;
    if (countdown === 0) {
      clearInterval(countdownInterval);
      Hide("countdown");
      Show("score");
      Show("gameword");
      Show("life");
      Show("timer-container");
      Show("user-input");
      startWordTimer();
    }
  }, 1000);
}

function goToLeaderBoard() {
  location.href = "leaderBoard.php";
}

var playerName = "";

function StartGame() {
  Hide("title");
  Hide("start-button");
  Hide("leaderBoard-button");
  Hide("player-name");
  Hide("enter-name");

  //Check the name of the player if it is empty or not.
  playerName = document.getElementById("player-name").value;
  if (!playerName) {
    alert("Please enter your name!");
    restartGame();
  }

  start_time();
}

let wordTimer;
const WORD_TIME_LIMIT = 10; // 10 seconds for each word

// This function starts the timer for each word.

function startWordTimer() {
  let timeLeft = WORD_TIME_LIMIT;

  document.getElementById("timer-bar").style.width = "100%";
  updateProgressBar(timeLeft);
  clearInterval(wordTimer);

  wordTimer = setInterval(() => {
    updateProgressBar(--timeLeft);
    if (timeLeft <= 0) {
      clearInterval(wordTimer);
      goToNextWord();
    }
  }, 1000);
}

// This function updates the progress bar on the screen.
// It also changes the bar color based on how much time is left.
function updateProgressBar(timeLeft) {
  const bar = document.getElementById("timer-bar");
  const percent = (timeLeft / WORD_TIME_LIMIT) * 100;
  bar.style.width = percent + "%";

  bar.style.backgroundColor =
    percent > 50 ? "green" : percent > 25 ? "orange" : "red";
}

// This function is used when the user doesn't answer in time.
// It moves to the next word and restarts the timer.
function goToNextWord() {
  updateScoreAndLife(false);
  document.getElementById("timer-bar").style.width = "100%";
  display_word("gameword", words_array);
  if (life != 0) {
    startWordTimer();
  }
}
