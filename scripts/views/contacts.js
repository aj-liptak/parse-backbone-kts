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
  'scripts/models/contact',
  'bootstrap'
], function($, _, Parse, Handlebars, Router, Animate, ContactsTemplate, ContactsCollection, ContactModel, Bootstrap){
  var ContactsView = Parse.View.extend({

    el: $('#container'),

    events: {
      'click div[data-name="newContact"]': 'newContact',
      'click button[data-name="saveContact"]': 'saveContact',
      'click div[data-name="logout"]': 'logout'
    },

    build: function() {
      this.user = Parse.User.current();
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

    newContact: function (e) {
      e.stopPropagation();
      $('#newContact').modal('show');
    },

    saveContact: function (e) {
      e.stopPropagation();
      var that = this;
      var contact = new ContactModel();

      contact.save({
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        phoneNumber: $('#phoneNumber').val(),
        user: this.user
      }, {
        success: function(contact) {
          that.build();
          $('#newContact').modal('hide');
        },
        error: function(contact, error) {
          console.log(error);
        }
      });
    },

    logout: function (e) {
      e.stopPropagation();
      Parse.User.logOut();
      Parse.history.navigate('login', true);
    }
  });
  // Our module now returns our view
  return ContactsView;
});
