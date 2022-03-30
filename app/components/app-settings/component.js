import Ember from "ember";
const { set, computed, get } = Ember;

export default Ember.Component.extend({
  detailsPage: computed({
    get() {
      let settings = JSON.parse(localStorage.getItem("settings"));
      return set(this, "detailsPage", settings ? settings.detailsPage : false);
    },
  }),
  actions: {
    updateSetting(setting, e) {
      set(this, setting, e.target.checked);
    },
    saveSettings() {
      let detailsPage = get(this, "detailsPage");
      localStorage.setItem(
        "settings",
        JSON.stringify({
          detailsPage: detailsPage,
        })
      );
    },
  },
});
