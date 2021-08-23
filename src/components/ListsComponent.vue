<template>
  <div class="lists">
    Welcome to Lists!
    <div>
      <h1>Action Lists</h1>
      <list-component listName="Action Lists"/>
    </div>
    <div>
      <h1>Agendas</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ListComponent from '@/components/ListComponent.vue';

@Component({
  components: {
    ListComponent,
  },
})
export default class CaptureComponent extends Vue {
  



}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
