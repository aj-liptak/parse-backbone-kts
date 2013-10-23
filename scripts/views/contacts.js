// Filename: views/login
define([
  'jquery',
  'underscore',
  'parse',
  'handlebars',
  'scripts/router',
  'scripts/animate',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!templates/contacts.html',
  'scripts/collections/contacts',
  'scripts/models/contact'
], function($, _, Parse, Handlebars, Router, Animate, ContactsTemplate, ContactsCollection, ContactModel){
  var ContactsView = Parse.View.extend({

    el: $('#container'),

    build: function() {
      var contactsCollection = new ContactsCollection();
      var that = this;
      // Using Underscore we can compile our template with data
      Parse.Cloud.run('getContacts').then(function(contacts){
        _.each(contacts, function(contact) {
          contactsCollection.add(contact);
        });
        that.render(contactsCollection);
      }, function(error) {
        console.log(error);
      });
    },

    render: function(collection){
      var contacts = {contact: collection.toJSON()};
      var template = Handlebars.compile(ContactsTemplate);

      var compiledTemplate = template(contacts);
      // Append our compiled template to this Views "el"
      //this.$el.append( compiledTemplate );
      Animate.slideIn(this.el, compiledTemplate);
    },

    events: {

    }
  });
  // Our module now returns our view
  return ContactsView;
});
