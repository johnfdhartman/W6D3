const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');

$( function () {
  $('.follow-toggle').each( (idx, element) => {
    const button = new FollowToggle($(element));
  });

});

$( function () {
  $('nav.users-search').each( (idx, element) => {
    const search = new UsersSearch($(element));
  });
});
