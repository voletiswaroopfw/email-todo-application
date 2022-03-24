import Ember from "ember";
const {
  set,
  computed,
  getProperties,
  setProperties,
  get,
  inject: { service },
} = Ember;

export default Ember.Component.extend({
  router: service(),
  emailWrapperClass: "",
  isRead: false,
  emailDetails: computed({
    get() {
      let settings = JSON.parse(localStorage.getItem("settings"));
      return setProperties(this, {
        emailDetails: settings !== null ? settings.detailsPage : false,
        emailWrapperClass:
          settings && settings.detailsPage == true
            ? "email-container email-details-disabled"
            : "email-container",
      });
    },
  }),
  markAllItemsRead: computed("emailList.@each.read", {
    get() {
      return get(this, "emailList").isEvery("read");
    },
  }),
  defaultEmailDetails: computed("emailList.@each.[]", {
    get() {
      return get(this, "emailList").filterBy("id", "1");
    },
  }),
  toggleEmailsLabel: computed("isRead", {
    get() {
      let isRead = get(this, "isRead");
      return `Mark all ${isRead ? "unread" : "read"}`;
    },
  }),
  actions: {
    getEmailDetails(item) {
      let { emailList, emailDetails, router } = getProperties(this, "emailList", "emailDetails", "router");
      set(item, "read", true);
      if (emailDetails) {
        this.get('router').transitionTo(`/inbox/email-details/${item.id}`);
      } else {
        set(this, "defaultEmailDetails", emailList.filterBy("id", item.id));
      }
      item.save();
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
        if (item.data.read == true) {
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
