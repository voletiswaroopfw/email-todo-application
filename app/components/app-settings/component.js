import Ember from "ember";
const { set, getProperties, setProperties } = Ember;

export default Ember.Component.extend({
  detailsPage: "",

  init() {
    this._super(...arguments);
    let settings = JSON.parse(localStorage.getItem("settings"));
    setProperties(this, {
      detailsPage: settings ? settings.detailsPage : true,
    });
  },

  actions: {
    updateSetting(setting, e) {
      set(this, setting, e.target.checked);
    },

    saveSettings() {
      let { detailsPage } = getProperties(this, "detailsPage");
      localStorage.setItem(
        "settings",
        JSON.stringify({
          detailsPage: detailsPage,
        })
      );
    },
  },
});
