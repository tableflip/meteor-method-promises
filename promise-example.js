if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {

  Meteor.methods({

    'asyncMethod' () {
      var res = new Promise((resolve, reject) => {
        Meteor.setTimeout(resolve.bind(null, 'foobar'), 2000)
      }).await()

      // maybe do something else here?

      return res
    },

    'chainedPromises' () {
      return new Promise((resolve, reject) => {
        Meteor.setTimeout(resolve.bind(null, 'foobar'), 2000)
      }).then(res => {
        // return another promise
        return new Promise((resolve, reject) => {
          Meteor.setTimeout(resolve.bind(null, `${res} to you all`), 2000)
        })
      })// add another .then here if you want...
    }

  })
}
