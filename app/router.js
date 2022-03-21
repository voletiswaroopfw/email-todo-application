import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  this.route("email-details", { path: "/email-details/:email_id" });
  this.route("settings");
});

export default Router;
