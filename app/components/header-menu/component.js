import Ember from "ember";
const { set, computed, getProperties, get, getData } = Ember;

export default Ember.Component.extend({
  showMenu: false,
  actions: {
    toggleMenu() {
      let {showMenu} = getProperties(this, 'showMenu')
      set(this,'showMenu', !showMenu)
    },
  },
});
