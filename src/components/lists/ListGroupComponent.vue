<template>
  <div class="lists">
    <h1>{{populatedListGroup.name}}</h1>
    <b-jumbotron class="jumbo" bg-dark>
      <b-container id="listGroup">
        
        <b-row id="row">
          <list-component v-for="list in populatedListGroup.lists" :key="list.id" :list="list" />
        </b-row>
      </b-container>
    </b-jumbotron>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ListComponent from './ListComponent.vue';
import PopulatedListGroup from '@/models/PopulatedListGroup';

@Component({
  components: {
    ListComponent,
  },
})
export default class CaptureComponent extends Vue {
  @Prop() populatedListGroup: PopulatedListGroup;



}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.row{
  justify-content: space-evenly;
}

.jumbo{
  background-color:$dark1 !important;
}


</style>
