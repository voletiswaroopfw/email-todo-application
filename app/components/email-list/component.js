import Ember from "ember";
import { task } from "ember-concurrency";
const {
  set,
  computed,
  getProperties,
  get,
  inject: { service },
} = Ember;

export default Ember.Component.extend({
  router: service(),
  emailWrapperClass: "",
  isRead: false,
  emailList: [],
  settings: JSON.parse(localStorage.getItem("settings")),
  emailDetails: computed('settings', {
    get() { 
      return get(this, 'settings') !== null ? settings.detailsPage : false;
    },
  }),
  emailWrapperClass: computed('settings', {
    get() { 
      return get(this, 'settings') && get(this, 'settings').detailsPage == true
        ? "email-container email-details-disabled"
        : "email-container";
    },
  }),
  markAllItemsRead: computed("emailList.@each.read", {
    get() {
      return get(this, "emailList").isEvery("read");
    },
  }),
  selectedEmail: computed("emailList", "emailList.@each.[]", {
    get() {
      return get(this, "emailList").findBy("id", 1);
    },
  }),
  toggleEmailsLabel: computed("isRead", {
    get() {
      let isRead = get(this, "isRead");
      return `Mark all ${isRead ? "unread" : "read"}`;
    },
  }),
  init() {
    this._super(...arguments);
    let fetchData = get(this, "fetchData");
    fetchData.perform();
  },
  fetchData: task(function* () {
    fetch("//my-json-server.typicode.com/voletiswaroop/demo/emails")
      .then((item) => item.json())
      .then((item) => {
        set(this, "emailList", item);
      });
  }).drop(),

  actions: {
    selectEmailDetails(item) {
      let { emailList, emailDetails } = getProperties(
        this,
        "emailList",
        "emailDetails"
      );
      set(item, "read", true);
      if (emailDetails) {
        this.get("router").transitionTo(`/inbox/email-details/${item.id}`);
      } else {
        set(this, "selectedEmail", emailList.findBy("id", item.id));
      }
    },
    toggleEmails() {
      let { emailList, isRead } = getProperties(this, "emailList", "isRead");
      set(this, "isRead", !isRead);
      return emailList.forEach((item) => {
        set(item, "read", !isRead);
      });
    },
    unreadFirst() {
      let emailList = get(this, "emailList");
      let read = [],
        unread = [],
        finalData = [];
      emailList.forEach((item) => {
        if (item.read == true) {
          read.push(item);
        } else {
          unread.push(item);
        }
      });
      finalData = [...unread, ...read];
      return set(this, "emailList", finalData);
    },
  },
});
