<template>
  <div class="lists">
    {{listName}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class ListComponent extends Vue {
  @Prop() listName: string;
  mounted() {
    console.log("listname is : " + this.listName)
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>
