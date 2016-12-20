const DB = {
  init: function() {
    const config = {
      apiKey: "AIzaSyB6_Q_h5c4pvEF_fPG94yRo8lKeB-s-Ya0",
      authDomain: "activefriends-793cf.firebaseapp.com",
      databaseURL: "https://activefriends-793cf.firebaseio.com",
      storageBucket: "activefriends-793cf.appspot.com",
      messagingSenderId: "208402429591"
    };
    firebase.initializeApp(config);
    this.firebaseDB = firebase.database()
    this.firebaseRef = this.firebaseDB.ref();
  },
  createUser: function(options, callback) {
    let err = '';

    if (options.name.length < 4) {
      err = 'Username too short (min 4)/n';
    }
    let checked = 0;
    for (key in options.prefs) {
      if (options.prefs[key] === true) {
        checked++;
      }
    }

    if (checked !== 3) {
      err += "Wrong number of preferences (exactly 3)";
    }
    if (err === '') {
      this.firebaseRef.child('users').push({
        username: options.name,
        prefs: options.prefs
      });
      callback(null);
    } else {
      callback(err);
    }
  },
  createPreference: function(name) {
    this.firebaseRef.child('preferences').push({
      name: name
    });
  },
  getAllUsers: function(callback) {
    DB.requestAllUsers(function(users){
      DB.getAllPrefs(function(prefs){
        for (let u in users) {
          const preferences = [];
          for (let p in users[u].prefs) {
            if (users[u].prefs[p] === true) {
              preferences.push({'id':p, 'name': prefs[p].name});
            }
          }
          users[u].prefs = preferences;
          users[u].id = u;
        }
        callback(users);
      });
    });
  },
  getAllPrefs: function(callback) {
    this.firebaseDB.ref('/preferences/').once('value').then(function(snapshot) {
        callback(snapshot.val());
    });
  },
  getUserById: function(userId, callback) {
    this.firebaseDB.ref('/users/' + userId).once('value').then(function(snapshot) {
      callback(snapshot.val());
    });
  },
  requestAllUsers: function(callback) {
    this.firebaseDB.ref('/users/').once('value').then(function(snapshot) {
      const users = snapshot.val();
        callback(users);
    });

  }
}
