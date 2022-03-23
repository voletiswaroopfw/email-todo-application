import Ember from "ember";
const { set, getProperties, setProperties } = Ember;

export default Ember.Component.extend({
  emailDetailsEnabled: false,  
  init() {
    this._super(...arguments);
    let { emailDetailsEnabled } = getProperties(this, "emailDetailsEnabled");
    let settings = JSON.parse(localStorage.getItem("settings"));
    setProperties(this, { emailDetailsEnabled: settings ? settings.detailsPage : emailDetailsEnabled });
  },
});
