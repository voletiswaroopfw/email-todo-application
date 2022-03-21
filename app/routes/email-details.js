import Ember from "ember";

export default Ember.Route.extend({
  model: function (params) {
    console.log(this.store.findRecord("email", params.email_id),params,'params');
    return this.store.findRecord("email", params.email_id);
  },
});
