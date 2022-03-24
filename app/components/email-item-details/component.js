// model: function (params) {
//   return this.store.findRecord("email", params.email_id);
// },

import Ember from "ember";
import { task } from "ember-concurrency";
const { set, get } = Ember;

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    if (!this.get("item")) {
      let fetchData = get(this, "fetchData");
      fetchData.perform();
    }
  },
  fetchData: task(function* () {
    let emailId = window.location.pathname.split("/").pop();
    fetch(`//my-json-server.typicode.com/voletiswaroop/demo/emails/${emailId}`)
      .then((item) => item.json())
      .then((item) => {
        set(this, "item", item);
      });
  }).drop(),
});
