import Ember from "ember";
const { set, computed, getProperties, setProperties, get } = Ember;

export default Ember.Component.extend({
  emailDetails: false,
  emailWrapperClass: "",
  toggleAllLabel: true,
  init() {
    this._super(...arguments);
    let settings = JSON.parse(localStorage.getItem("settings"));
    let { emailDetails } = getProperties(this, "emailDetails");
    setProperties(this, {
      emailDetails: settings !== null ? settings.detailsPage : emailDetails,
      emailWrapperClass:
        settings && settings.detailsPage == true
          ? "email-container email-details-disabled"
          : "email-container",
    });
  },
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
  actions: {
    getEmailDetails(item) {
      let selectedEmailDetails = get(this, "emailList").filterBy("id", item.id);
      set(item, "read", true);
      set(this, "defaultEmailDetails", selectedEmailDetails);
    },
    toggleAll() {
      let { emailList, markAllItemsRead, toggleAllLabel } = getProperties(
        this,
        "emailList",
        "markAllItemsRead",
        "toggleAllLabel"
      );
      set(this, "toggleAllLabel", !toggleAllLabel);
      return emailList.forEach((item) => {
        set(item, "read", !markAllItemsRead);
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
