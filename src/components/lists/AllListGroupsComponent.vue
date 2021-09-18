<template>
  <div class="lists">
    <div>
      <list-group-component v-for="(listGroup, index) in populatedListGroups" :key="listGroup.id" :populatedListGroup.sync="populatedListGroups[index]" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ListGroupComponent from './ListGroupComponent.vue';
import ListGroup from '@/models/ListGroup';
import PopulatedListGroup from '@/models/PopulatedListGroup';
import ListGroupService from '@/services/ListGroupService';
import ListService from '@/services/ListService';

@Component({
  components: {
    ListGroupComponent,
  },
})
export default class AllListGroupsComponent extends Vue {
  populatedListGroups: PopulatedListGroup[] = [
    {name: "List Group 1", userId:"Val", id:"1", lists: []},
    {name: "List Group 2", userId:"Val", id:"2", lists: []},
    {name: "List Group 3", userId:"Val", id:"3", lists: []}
  ]

  mounted() {
    // @ts-ignore
    let userId = this.$session.get("userId");
    console.log("getting groups for user " + userId)
    new ListGroupService().getPopulatedListGroupsByUser(userId).then((result) => {
      this.populatedListGroups = result.data;
      console.log("listGroups:");
      console.log(this.populatedListGroups)
    });
  }


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
