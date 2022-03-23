import Ember from "ember";
const { set, getProperties } = Ember;

export default Ember.Component.extend({
  showMenu: false,
  activeMenuClass: 'hamburger-menu',
  actions: {
    toggleMenu() {
      let {showMenu} = getProperties(this, 'showMenu');
      set(this, 'activeMenuClass', !showMenu ? 'hamburger-menu menu-activated' : 'hamburger-menu');
      set(this,'showMenu', !showMenu);
    },
  },
});
