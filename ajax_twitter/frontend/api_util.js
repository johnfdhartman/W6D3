const APIUtil = {
  followUser: (id )=> (
    $.ajax({
      method: 'POST',
      url: `/users/${id}/follow`,
      dataType: 'json'
    })
  ),

  unfollowUser: (id )=> (
    $.ajax({
      method: 'DELETE',
      url: `/users/${id}/follow`,
      dataType: 'json'
    })
  ),

  searchUsers: (queryVal, success) => {
    $.ajax({
      url: `/users/search?query=${queryVal}`,
      dataType: 'json',
      success: (users) => {
        success(users);
      }
    });
  }

};

module.exports = APIUtil;
