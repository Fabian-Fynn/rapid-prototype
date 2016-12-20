DB.init();

const invited_users = JSON.parse(localStorage.getItem('invitedusers'));
const user_id = localStorage.getItem('userid');

console.log(invited_users);

let tablecolor = 'white black-text';

let count = 0;

for (let i in invited_users){
  console.log(invited_users[i]);
  if(count%2 == 0) tablecolor = 'grey darken-3 white-text';
  else tablecolor = 'white black-text';

  $('#eventtable').append('<tr class="'+tablecolor+'" style="border-radius: 0;"><td class="center" style="border-radius: 0;">'+invited_users[i].username+'</td><td class="center" style="border-radius: 0;">invited</td></tr>');

  count++;
}