import DS from 'ember-data';

export default DS.Model.extend({
  _id: DS.attr('number'),
  body: DS.attr('string'),
  subject: DS.attr('string'),
  recipent: DS.attr('string'),
  sender: DS.attr('string'),
  read: DS.attr('boolean')
});
