var YellowSidd = YellowSidd || {};

YellowSidd.FacebookAPI = function () {};

YellowSidd.FacebookAPI.prototype.shareGame = function () {
  FBInstant.shareAsync({
    intent: 'SHARE',
    image: 'https://doyban.com/logos/yellowsidd.png',
    text: 'Play PirateBay on Messenger!',
    data: { myReplayData: '...' }
  }).then(function() {
    // continue with the game.
  });

};

YellowSidd.FacebookAPI.prototype.shareScore = function (score) {
  FBInstant.shareAsync({
    intent: 'SHARE',
    image: 'https://doyban.com/logos/yellowsidd.png',
    text: 'My score in YellowSidd is ' + score + '.',
    data: { myReplayData: '...' }
  }).then(function() {
    // continue with the game.
  });
};


YellowSidd.FacebookAPI.prototype.inviteFriends = function () {
  FBInstant.shareAsync({
    intent: 'INVITE',
    image: 'https://doyban.com/logos/yellowsidd.png',
    text: 'Play YellowSidd on Messenger!',
    data: { myReplayData: '...' }
  }).then(function() {
    // continue with the game.
  });
};

// TODO: Think about it.
YellowSidd.FacebookAPI.prototype.showProducts = function () {
  // Show Facebook products to purchase in that game.
  FB.api(
    '/app/products',
    'get',
    function (response) {
      // console.log('Products:');
      // console.log(response);
    }
  );
};

// TODO: Think about it.
YellowSidd.FacebookAPI.prototype.showPurchases = function () {
  // Show Facebook purchases in that game.
  var that = this;

  FB.getLoginStatus(function (response) {
    // console.log('Method showPurchases getLoginStatus: ' + response.authResponse.accessToken);
    that.token = response.authResponse.accessToken;
  });

  FB.api(
    '/app/purchases',
    'get',
    {access_token: that.token},      // user access token
    function (payload) {        // callback function
      // console.log('Purchases payload:');
      // console.log(payload);
    }
  );
};

// TODO: Think about it.
YellowSidd.FacebookAPI.prototype.consumePurchase = function (purchase_token, product_id) {
  // Consume Facebook purchases in that game.
  var that = this;

  FB.getLoginStatus(function (response) {
    // console.log('User access token: ' + response.authResponse.accessToken);
    that.token = response.authResponse.accessToken;
  });

  FB.api(
    '/' + purchase_token + '/consume',    // Replace the PURCHASE_TOKEN
    'post',
    {access_token: that.token},         // Replace with a user access token TODO: find access_token of user
    function (result) {
      // console.log('Consuming product: ', product_id, 'with purchase token', purchase_token);
      // console.log('Result:');
      // console.log(result);
    }
  );
};

// TODO: Think about it.
YellowSidd.FacebookAPI.prototype.check_purchase = function (extraGems, response) {
  var that = this;
  // console.log(response);

  if (response.hasOwnProperty("product_id")) {
    // Purchase has been done.
    localStorage.gems = parseInt(localStorage.gems) + parseInt(extraGems);
    that.consumePurchase(response.purchase_token, response.product_id); // Consume purchase to make possibility to buy later on more product with the same ID.
    // console.log("Purchase has been done.");
  } else {
    // Purchase has not been done.
    // console.log("Purchase has not been done.")
  }
};

// TODO: Think about it.
YellowSidd.FacebookAPI.prototype.gems5 = function () {
  var that = this;

  // Facebook API to purchase gems5.
  FB.ui(
    {
      method: 'pay',
      action: 'purchaseiap',
      product_id: 'gems5'
    }, function (response) { // Callback function
      // console.log('5 gems response: ' + response);
      this.extraGems = 5;
      that.check_purchase(this.extraGems, response); // Check if item has been purchased.
    }
  );
};

// TODO: Think about it.
YellowSidd.FacebookAPI.prototype.gems20 = function () {
  var that = this;

  // Facebook API to purchase gems20.
  FB.ui(
    {
      method: 'pay',
      action: 'purchaseiap',
      product_id: 'gems20'
    }, function (response) { // Callback function
      // console.log('20 gems response: ' + response);
      this.extraGems = 20;
      that.check_purchase(this.extraGems, response); // Check if item has been purchased.
    }
  );
};

// TODO: Think about it.
YellowSidd.FacebookAPI.prototype.gems50 = function () {
  var that = this;

  // Facebook API to purchase gems50.
  FB.ui(
    {
      method: 'pay',
      action: 'purchaseiap',
      product_id: 'gems50'
    }, function (response) { // Callback function
      // console.log('50 gems response: ' + response);
      this.extraGems = 50;
      that.check_purchase(this.extraGems, response); // Check if item has been purchased.
    }
  );
};

// TODO: Think about it.
YellowSidd.FacebookAPI.prototype.gems100 = function () {
  var that = this;

  // Facebook API to purchase gems100.
  FB.ui(
    {
      method: 'pay',
      action: 'purchaseiap',
      product_id: 'gems100'
    }, function (response) { // Callback function
      // console.log('100 gems response: ' + response);
      this.extraGems = 100;
      that.check_purchase(this.extraGems, response); // Check if item has been purchased.
    }
  );
};

// TODO: Think about it.
YellowSidd.FacebookAPI.prototype.gems200 = function () {
  var that = this;

  // Facebook API to purchase gems200.
  FB.ui(
    {
      method: 'pay',
      action: 'purchaseiap',
      product_id: 'gems200'
    }, function (response) { // Callback function
      // console.log('200 gems response: ' + response);
      this.extraGems = 200;
      that.check_purchase(this.extraGems, response); // Check if item has been purchased.
    }
  );
};
