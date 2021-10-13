<template>
  <div class="capture">
    <b-container class="main">
      <GameBoard/>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameBoard from '@/components/2048/GameBoard.vue'; // @ is an alias to /src

@Component({
  components: {
    GameBoard,
  },
})
export default class ListsView extends Vue {

  
}
</script>


<style scoped lang="scss">
.main {
  justify-content: center;
  text-align: center;
  width: 100%;
}

</style>