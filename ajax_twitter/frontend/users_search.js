const APIUtil = require('./api_util');

class UsersSearch {

  constructor($element) {
    this.$element = $element;
    this.$input = $("[name='query']");
    this.$ul = $element.find('ul');
    this.bindEvent();
  }

  bindEvent() {

    this.$input.on('input', (e) => {
      APIUtil.searchUsers(this.$input.val(),this.renderResults.bind(this));
    });
  }

  renderResults(users) {
    this.$ul.empty();
    console.log(users);
    users.forEach( (el) => {
      console.log('this');
      this.$ul.append(`<li><a href='/users/${el.id}'>${el.username}</a></li>`);
      
    });
  }
}


module.exports = UsersSearch;
