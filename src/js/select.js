DB.init();


//Todo: delete the ref to local storage
//localStorage.setItem('userid', '-KZQptxQ1phPaCxUMz0t');

DB.getUserById(localStorage.getItem('userid'), function (user) {

  let preferance = [];
  let preferance_id = [];
  let innertable = '';
  let count = 0;
  let tablecolor = 'white black-text';

  for (let pref of user.prefs) {
    if(count%2 == 0) tablecolor = 'grey darken-3 white-text';
    else tablecolor = 'white black-text';
    preferance.push(pref.name);
    preferance_id.push(pref.id);
    innertable += '<tr class="'+tablecolor+'" style="border-radius: 0;"><td style="border-radius: 0;">'+pref.name+'</td><td style="border-radius: 0;"><button class="btn green" id="'+pref.id+'"><i class="large material-icons">thumb_up</i></button></td></tr>';

    $('#select_secondary').on('click', 'button#'+pref.id, function () {
      localStorage.setItem('prefid', pref.id);
      window.location = 'map.html';
    });


    count++;

  }

  let random = Math.floor(Math.random() * preferance.length);

  DB.getUsersByPref(preferance_id[random], function(users) {
    console.log(users);
    let count = 0;
    for (let i in users){

      if (i != localStorage.getItem('userid')){
        count++;
      }

    }
    $('#people_near').append('There are '+count+' people around you who also wants to '+preferance[random]+'');
  });

  $('#name').append(user.username);
  $('#preference').append(preferance[random]);
  $('#preferencepic').append('<img class="center small-img" src="assets/icons/'+preferance_id[random]+'.png" />');






  $('#select_button_true').click(function () {
    localStorage.setItem('prefid', preferance_id[random]);
    window.location = 'map.html';
  })

  $('#select_button_false').click(function () {


    $('#select_primary').hide();
    $('#select_secondary').append('<table class="centered">'+innertable+'</table>')
  })

});