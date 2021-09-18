<template>
  <div class="list">
      <b-card bg-variant="primary" text-variant="white" header-tag="header" class="text-center">
        <template #header>
          <div v-show = "!editName">
            <label @dblclick = "editName = true"> {{list.name}} </label>
          </div>
          <b-form-input v-show = "editName" v-model = "list.name"
          @blur= "editName=false; updateListName(); $emit('update'); "
          @keyup.enter = "editName=false;"/>
          
        </template>
        <b-card-text >
            <b-row v-for="(entry, index) in uncompletedListEntries()" :key="entry.index">
              <b-col sm="1">
                <b-check v-model="entry.completed" @change="updateListEntry(entry)"/>
              </b-col>
              <b-col>
                <b-form-input 
                :ref="index"
                size="sm"
                v-model="list.entries[index].content"
                @blur="updateListEntry(entry)"
                @keypress="handleKeyPress($event, entry.index)"
                @keydown="handleArrowKey($event, entry.index)"
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

  editName = false;

  addListEntry() {
    var newEntry = {completed: false, content: "", index: this.list.entries.length};
    if (this.list.entries.length == 0) {
      this.list.entries = [newEntry];
    }
    else if (this.list.entries[this.list.entries.length - 1].content != "") {
      this.list.entries.push(newEntry);
    }
      
  }

  uncompletedListEntries() {
    var newList : ListEntry[]= [];
    for (var i = 0; i < this.list.entries.length; i++) {
      newList.push(this.list.entries[i]);
      newList[i].index = i;
    }

    return this.list.entries.filter(el => {
      return true; //!el.completed; //uncommenting this only shows uncompleted tasks
    })
  }

  handleKeyPress(e, currentIndex) : void{
    if (e.key === "Enter" ) {
      if (currentIndex == this.uncompletedListEntries().length - 1) {
        this.addListEntry();
      }
      e.preventDefault(); // stops it from still adding an enter character

      // Put focus on the next textbox
      this.$nextTick(function () {
        // DOM updated
        var el = this.$refs[currentIndex+1][0];
        el.focus();
      });
      
    }

    

    console.log("key was pressed");
    // Down arrow
    if (e.key == "ArrowLeft") {
      console.log("pressed down");
      var el = this.$refs[currentIndex+1][0];
      el.focus();
    }

    if (e.key === "Backspace") {

    }
    
  }

  handleArrowKey(e, currentIndex) : void {
      if (e.key == "ArrowDown" && currentIndex < this.uncompletedListEntries().length - 1) {
        console.log("pressed down");
        var el = this.$refs[currentIndex+1][0];
        el.focus();
      }
      if (e.key == "ArrowUp" && currentIndex > 0) {
        console.log("pressed down");
        var el = this.$refs[currentIndex-1][0];
        el.focus();
      }
    }

  updateListEntry(entry) {
    console.log("updating list at index " + entry.index);
    new ListService().updateListEntry(this.list.id, entry, entry.index);

  }

  updateListName() {
    console.log("updating list name to  " + this.list.name);
    new ListService().updateListName(this.list.id, this.list.name);

  }


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-card {
  background-color: $dark2;
  color: black;
}

.list {
  flex-grow: 1;
  flex-shrink: 1;
}

</style>
