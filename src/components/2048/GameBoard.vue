<template>
  <div class="settings">
    <b-container class="container">
      
      <b-card class="gameBoard" v-on:keyup="keyHandler($event)">

        <a> Here's the board! </a>
        <b-row v-for="row in board" :key="row"  >
          <b-col v-for="col in row" :key="col"> {{col}}</b-col>
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

    let self = this; 

    window.addEventListener('keyup', function(ev) {
        self.keyHandler(ev); // declared in your component methods
    });
}

  log() {
    console.log(this.selected);
  }

  // Generates a new 2 or 4 in an empty square
  generateNewTile() {

  }

  // Performs the move, sliding tiles in the direction
  performMove(direction) {

  }

  isValidMove(direction) : boolean{
    
    return true;
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
    if (direction == 0) return;

    if (this.isValidMove(direction)) {
      this.performMove(direction);
      this.generateNewTile();
    }
    
  }
  
}
</script>

<style scoped lang="scss">
.gameBoard {
  width: 200px;
}

.container {
  justify-content: center;
  width: 100%
}

</style>