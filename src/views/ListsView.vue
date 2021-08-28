<template>
  <div class="capture">
    <AllListGroupsComponent/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AllListGroupsComponent from '@/components/lists/AllListGroupsComponent.vue'; // @ is an alias to /src

@Component({
  components: {
    AllListGroupsComponent,
  },
})
export default class ListsView extends Vue {

  
}
</script>
