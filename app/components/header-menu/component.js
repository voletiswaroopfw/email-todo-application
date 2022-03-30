import Ember from "ember";
const { setProperties, getProperties } = Ember;

export default Ember.Component.extend({
  showMenu: false,
  activeMenuClass: "hamburger-menu",
  actions: {
    toggleMenu() {
      let { showMenu } = getProperties(this, "showMenu");
      setProperties(this, {
        activeMenuClass: !showMenu
          ? "hamburger-menu menu-activated"
          : "hamburger-menu",
        showMenu: !showMenu,
      });
    },
  },
});
