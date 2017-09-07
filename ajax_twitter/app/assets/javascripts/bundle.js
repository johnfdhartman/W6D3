/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(3);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map