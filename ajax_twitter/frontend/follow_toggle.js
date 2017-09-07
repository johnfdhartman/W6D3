const APIUtil = require('./api_util');

class FollowToggle {

  constructor($button) {
    this.userId = $button.data('user-id');
    this.followState = $button.data('initial-follow-state');
    this.$button = $button;
    this.bindEvent();
    this.render();
  }

  bindEvent() {
    this.$button.click( (e) => {
      e.preventDefault();
      this.changeState();
    });
  }

  render() {
    this.$button.text(this.followState === 'followed' ? 'Unfollow' : 'Follow');

  }

  changeState() {

    if (this.followState === 'unfollowed') {
      APIUtil.followUser(this.userId).then( () => {
        this.followState = 'followed';
        this.render();
      }
      );
    } else {
      APIUtil.unfollowUser(this.userId).then( () => {
        this.followState = 'unfollowed';
        this.render();
      });
    }


    console.log('about to render');

  }

}

module.exports = FollowToggle;
