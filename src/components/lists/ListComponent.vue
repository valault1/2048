<template>
  <div class="list">
      <b-card bg-variant="primary" text-variant="white" :header="list.name + ' - ' + list.id" class="text-center">
        <b-card-text >
            <b-row v-for="(entry, index) in uncompletedListEntries()" :key="index">
              <b-col sm="1">
                <b-check v-model="entry.completed" @change="updateListEntry(entry, index)"/>
              </b-col>
              <b-col>
                <b-form-input 
                :ref="index"
                size="sm"
                v-model="list.entries[index].content"
                @blur="updateListEntry(entry, index)"
                @keypress="handleKeyPress($event, index)"
                />
              </b-col>
            </b-row>
        </b-card-text>
        <b-button @click="addListEntry">add item</b-button>
      </b-card>
      
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import List from '@/models/List';
import ListEntry from '@/models/ListEntry';
import ListService from '@/services/ListService';

@Component
export default class ListComponent extends Vue {
  @Prop() list: List;
  mounted() {
  }

  addListEntry() {
    var newEntry = {completed: false, content: ""};
    if (this.list.entries.length == 0) {
      this.list.entries = [newEntry];
    }
    else if (this.list.entries[this.list.entries.length - 1].content != "") {
      this.list.entries.push(newEntry);
    }
      
  }

  uncompletedListEntries() {
    return this.list.entries.filter(el => {
      return !el.completed;
    })
  }

  handleKeyPress(e, currentIndex) : void{
    if (e.key === "Enter") {
      this.addListEntry();
      e.preventDefault(); // stops it from still adding an enter character

      // Put focus on the new textbox
      var el = this.$refs[currentIndex+1][0];
      console.log(el);
      el.focus();
    }

    if (e.key === "Backspace") {

    }
    
  }

  updateListEntry(entry, index) {
    new ListService().updateListEntry(this.list.id, entry, index);

  }


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-card {
  background-color: $dark2;
  color: black;
}

</style>
