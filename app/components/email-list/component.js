import Ember from "ember";
const { set, computed, getProperties, get, getData } = Ember;

export default Ember.Component.extend({
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
    getEmailDetails(id) {
      let selectedEmailDetails = get(this, "emailList").filterBy("id", id);
      set(this, "defaultEmailDetails", selectedEmailDetails);
    },
    toggleAll() {
      let { emailList, markAllItemsRead } = getProperties(
        this,
        "emailList",
        "markAllItemsRead"
      );
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
    selectedList(selected) {
      let emailFullList = get(this, "emailList");
      console.log(selected);
      let selectedData;
      if (selected === "read") {
        selectedData = emailFullList.filterBy("read", true);
      } else if (selected === "unread") {
        selectedData = emailFullList.filterBy("read", false);
      } else {
        selectedData = emailList;
      }
      return set(this, "emailList", selectedData);
    },
  },
});
