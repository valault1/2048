<template>
  <div class="lists">
    <h1>{{populatedListGroup.name}}</h1>
    <b-jumbotron class="jumbo" bg-dark>
      <b-container id="listGroup">
        
        <b-row id="row" class="row">
          <list-component v-for="list in populatedListGroup.lists" :key="list.id" :list="list" />
           <b-button @click="addList()" variant="outline-secondary"><b-icon icon="plus-square" aria-hidden="true"></b-icon> Add New List </b-button>
        </b-row>
        <b-row>
         
        </b-row>
      </b-container>
    </b-jumbotron>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ListComponent from './ListComponent.vue';
import PopulatedListGroup from '@/models/PopulatedListGroup';
import List from '@/models/List';
import ListService from '@/services/ListService'
@Component({
  components: {
    ListComponent,
  },
})
export default class ListGroupComponent extends Vue {
  @Prop() populatedListGroup: PopulatedListGroup;



  addList() : void {
    // Update the UI
    var newListGroup = {...this.populatedListGroup}; // deep copy
    // @ts-ignore
    var newList = {id: this.uniqueId(), name:"New List", userId: this.$session.get('userId'), entries: []};
    newListGroup.lists.push(newList);
    console.log(newListGroup);
    this.$emit('update:populatedListGroup', newListGroup)

    // Update the DB
    new ListService().createList(newListGroup.id, newList.name, newList.userId).then((response) => {
      console.log("created list successfully!");
      // update the list with the new id
      var newListGroup = {...this.populatedListGroup}; // deep copy
      const listToUpdate = newListGroup.lists.find(element => element.id === newList.id);
      console.log("updating list " + listToUpdate.name)
      listToUpdate.id = response.data;
      this.$emit('update:populatedListGroup', newListGroup);

    }, (error) => {
      console.log("Error creating list");
    })
  }

  uniqueId() : string{
    return Math.floor(Math.random() * Date.now()).toString();
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.row{
  justify-content: space-evenly;
  gap: 10px;
}

.jumbo{
  background-color:$dark1 !important;
}


</style>
