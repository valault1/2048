<template>
  <div class="capture">
    <ListsComponent/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ListsComponent from '@/components/ListsComponent.vue'; // @ is an alias to /src

@Component({
  components: {
    ListsComponent,
  },
})
export default class ListsView extends Vue {

  
}
</script>
