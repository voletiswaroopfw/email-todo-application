import Ember from "ember";
const { set, computed, getProperties,setProperties } = Ember;

export default Ember.Component.extend({
  emailDetailsPage:'',

  init() {
    this._super(...arguments);
    let settings = JSON.parse(localStorage.getItem("settings"));
    setProperties(this, { emailDetailsPage: settings ? settings.emailDetailsPage : true });
  },

  actions: {
    updateSetting(setting, e) {
      set(this, setting, e.target.checked);
    },
    
    saveSettings() {
      let { emailDetailsPage } = getProperties(
        this,
        "emailDetailsPage", 
      );
      localStorage.setItem('settings', JSON.stringify({ 
        emailDetailsPage: emailDetailsPage, 
      })); 
    },
  },
});
