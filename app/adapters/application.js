import DS from "ember-data";
import ApiData from "../config/hosts";

export default DS.RESTAdapter.extend({
  host: ApiData.API_URL,
  pathForType() {
    return '';
  },
});
