DB.init();

/*DB.createUser({
 name: 'Peter',
 preferences: {
 'Eat': true,
 'Games': true
 }
 });

 DB.createUser({
 name: 'Hans',
 preferences: {
 'Eat': true,
 'Drinks': true
 }
 });

 DB.createUser({
 name: 'Mary',
 preferences: {
 'Eat': true,
 'Netflix': true
 }
 });*/

DB.getUserById('-KZN1oCPuUUP27dKQPMv', function(user) {

  let preferance = [];

  console.log(user);
  $('#name').append(user.username);

  DB.getAllPrefs(function (prefs) {
    console.log(prefs);
    for (let i in prefs) {
      preferance.push([i, prefs[i].name]);
    }

    for (let i in user.prefs){
      for (let x in preferance){
        console.log(preferance[x][0]);
        console.log(i);
        if(preferance[x][0] == i){
          $('#preference').append(preferance[x][1]);
          break;
        }
      }
    }

  });
});





