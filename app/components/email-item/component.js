import Ember from "ember";
const { set, computed } = Ember;

export default Ember.Component.extend({
  emailDetailsEnabled: computed({
    get() {
      let settings = JSON.parse(localStorage.getItem("settings"));
      return settings ? settings.detailsPage : false
    },
  }),
});
