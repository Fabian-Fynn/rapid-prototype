DB.init();

//Todo: delete the ref to local storage
localStorage.setItem('userid', '-KZQptxQ1phPaCxUMz0t');

DB.getUserById(localStorage.getItem('userid'), function (user) {



  let preferance = [];
  let preferance_id = [];
  let innertable = '';

  for (let pref of user.prefs) {
    console.log(pref);
    preferance.push(pref.name);
    preferance_id.push(pref.id);
    innertable += '<tr><td>'+pref.name+'</td> <td><button id="'+pref.id+'">Lets go!</button></td></tr>';

    $('#select_secondary').on('click', 'button#'+pref.id, function () {
      alert(pref.id)
    })

  }

  let random = Math.floor(Math.random() * preferance.length);

  console.log(random);
  console.log(preferance);
  console.log(preferance_id);

  $('#name').append(user.username);
  $('#preference').append(preferance[random]);
  if(preferance_id[random] == '-KZQpS72sYzV64D7Z3Xk' || preferance_id[random] == '-KZQpBcI-U4U0Jh7pcTk' ){
    $('#preferencepic').append('<img src="assets/icons/'+preferance_id[random]+'.ico" />');
  }else{
    $('#preferencepic').append('<img src="assets/icons/'+preferance_id[random]+'.png" />');
  }



  $('#select_button_true').click(function () {
    localStorage.setItem('prefid', preferance_id[random]);
    console.log(localStorage.getItem('prefid'));
    window.location = 'map.html';
  })

  $('#select_button_false').click(function () {


    $('#select_primary').hide();
    $('#select_secondary').append('<table>'+innertable+'</table>')
  })

});







