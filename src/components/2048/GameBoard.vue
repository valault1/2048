<template>
  <div class="settings">
    <b-container class="container">
      
      <b-card class="gameBoard" v-on:keyup="keyHandler($event)">

        <a> Here's the board! </a>
        <b-row v-for="(row, index) in board" :key="index"  >
          <b-col v-for="(col, index2) in row" :key="index.toString() + index2.toString()"> {{col}}</b-col>
        </b-row >
      </b-card>
      
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InboxEntry from '@/models/InboxEntry';
import router from '@/router/index';


@Component({
  components: {
  },
})
export default class GameBoard extends Vue {
  options = [ { text: 'Enter to Submit', value: 'red' }, { text: 'upside-down processing', value: 'upsd' }];
  selected = [];
  board = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];

  mounted() {
    this.generateNewTile();
    let self = this; 

    window.addEventListener('keyup', function(ev) {
        self.keyHandler(ev); // declared in your component methods
    });
}

  log() {
    console.log(this.selected);
  }

  // Generates a new 2 or 4 in an empty square
  // Strategy: go through the board, pushing coordinates of each 0 to an array
  // Pick a random number, grab that element from the array
  generateNewTile() {
    console.log("generating tile");
    let emptyTiles = [];
    for (let i in this.board) {
      for (let j in this.board[i]) {
        if (this.board[i][j] == 0) {
          emptyTiles.push([i,j]);
        }
      }
    }

    let index = Math.floor(Math.random() * emptyTiles.length);
    let location = emptyTiles[index];

    let numToBePlaced = Math.floor((Math.random() * 2) + 1) * 2;

    console.log("we will place a " + numToBePlaced);
    console.log("at " + location)

    

    let newBoard = [...this.board];
    newBoard[location[0]][location[1]] = numToBePlaced;

    this.board = newBoard;



  }



  // Performs the move, sliding tiles in the direction
  // First checks if the move is valid
  performMove(direction) {
    
    let gameBoard = [...this.board];
    if (!this.isValidMove(gameBoard, direction)) return;

    console.log("That move was valid!");

    // edit gameBoard, then asign back to this.board;
    for (let iteration = 0; iteration < gameBoard.length - 1; iteration++) {
      for (let i in gameBoard) {
        for (let j in gameBoard) {
          if (this.tileCanMove(gameBoard, direction, i, j)) {
            let newI = parseInt(i) + direction[0]
            let newJ = parseInt(j) + direction[1];
            gameBoard[newI][newJ] += gameBoard[i][j];
            gameBoard[i][j] = 0;
          }
        }
      }
    }


    this.generateNewTile()
    
  }

  // Tells whether a single tile will move
  tileCanMove(gameBoard, direction, i, j) : boolean {
    if (gameBoard[i][j] == 0 ) return false;
    let newI = parseInt(i) + direction[0];
    let newJ = parseInt(j) + direction[1];
    if (newI < 0 || newI >= gameBoard.length) return false;
    if (newJ < 0 || newJ >= gameBoard.length) return false;
    if (gameBoard[newI][newJ] == 0 || gameBoard[newI][newJ] == gameBoard[i][j]) return true;

    return false;
    

  }

  isValidMove(gameBoard, direction) : boolean{
    for (let i in gameBoard) {
      for (let j in gameBoard[i]) {
        if (this.tileCanMove(gameBoard, direction, i, j)) {
          return true;
        }
      }
    }
    return false;
  }

  keyHandler(event) {
    let direction = [0,0];
    if (event.key ==="ArrowUp") {
      console.log("Pressed key Up");
      direction = [-1,0];
    }
    if (event.key ==="ArrowRight") {
      console.log("Pressed key Right");
      direction = [0,1];
    }
    if (event.key ==="ArrowDown") {
      console.log("Pressed key Down");
      direction = [1,0];
    }
    if (event.key ==="ArrowLeft") {
      console.log("Pressed key Left");
      direction = [0,-1];
    }
    if (direction === [0,0]) return;

    this.performMove(direction);
    
  }
  
}
</script>

<style scoped lang="scss">
.gameBoard {
  width: 250px;
}

.container {
  justify-content: center;
  width: 100%
}

</style>