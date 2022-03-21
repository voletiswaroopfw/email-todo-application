import Ember from "ember";
const { set, computed, getProperties, get } = Ember;

export default Ember.Component.extend({
  actions: {
    toggleCompleted(e) {
      let { item } = getProperties(this, "item");
      set(item, "read", e.target.checked);
      item.save();
    },
  },
});
