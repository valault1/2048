// I created this file mostly to get rid of errors like "Property '$session' does not exist on type ..." when compiling
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}