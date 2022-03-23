import Ember from "ember";
const { set, computed, getProperties, setProperties, get } = Ember;

export default Ember.Component.extend({
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
      let selectedEmailDetails = get(this, "emailList").filterBy("id", item.id);
      set(item, "read", true);
      set(this, "defaultEmailDetails", selectedEmailDetails);
    },
    toggleEmails() {
      let { emailList, isRead } = getProperties(this, "emailList", "isRead");
      set(this, "isRead", !isRead);
      return emailList.forEach((item) => {
        set(item, "read", !isRead);
      });
    },
    unreadFirst() {
      let { emailList } = getProperties(this, "emailList");
      let finalData = [
        emailList.filterBy("read", false),
        emailList.filterBy("read", true),
      ];
      return set(this, "emailList", finalData.flat());
    },
  },
});
