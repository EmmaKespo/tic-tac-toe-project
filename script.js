
const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setCell = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };
    const resetBoard = () => {
        ["", "", "", "", "", "", "", "", "",];
    };
    return { getBoard, setCell, resetBoard };

})();

const GameController = (() => {
   
   let currentPlayer = "x"
   let gameOver = false;

   const statusText = document.getElementById("status");
   const boardDiv = document.getElementById("game-board");

     const winningCombos = [
     [0,1,2], [3,4,5], [6,7,8],
     [0,3,6], [1,4,7], [2,5,8]

     [0,4,8], [2,4,6]

     ];

     const checkWinner = () => {
        const board = gameBoard.getBoard();

        for (combo of winningCombos) {
            const [a,b,c] = combo;

            if (
                board[a] && board[a] === board[b] && board[a] === board[c]
            ) {
                return board[a];
            }
        }
        if (!board.includes("")) return "draw";
         return null;
     };
     const switchPlayer = () => {
          currentPlayer = currentPlayer === "x" ? "o" : "x"
     };
     
     const handleClick = (index) => {
        if (gameOver) return;

        const played = GameBoard.setCell(index, currentPlayer);
        if (!played) return;

        render();

        const result = checkWinner();

        if (result === "draw") {
            statusText.textContent = "its a draw!"

            gameOver = true;
            return;
        }
        if (result) {
            statusText.textContent = `player ${result} wins!`;
            gameOver = true;
            return;
        }

        switchPlayer();
        statusText.textContent = `player ${currentPlayer}'s turn`;
     };
     const render = () => {
        boardDiv.innerHTML = "";
        const board = GameBoard.getBoard();
         board.forEach((cell, index) => {
            const div = document.createElement("div")
              div.classList.add("cell");
              div.textContent = cell;
              div.addEventListener("click", () => handleClick(index));
              boardDiv.appendChild("div");
            
         });
     };
     const restartGame = () => {
        GameBoard.resetBoard();
        currentPlayer = "x";
        gameOver = false;
        statusText.textContent = "player x's turn"
        render();
     };
     document.getElementById("restart").addEventListener("click", restartGame);
     render();
     return {};

})();