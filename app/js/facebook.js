var preloadedInterstitial = null;

// Initialize Messenger SDK.
(function initSDK() {
  // Required methods to open Messenger game.
  FBInstant.initializeAsync();
  FBInstant.setLoadingProgress(100); // Assets are 50% loaded
  FBInstant.startGameAsync();
}());
// Initialize Messenger ads.
function initAds() {
  FBInstant.getInterstitialAdAsync(
    '327736978026913_335734790560465' // Your Ad Placement Id, TODO: Change this ID.
  ).then(function(interstitial) {
    // Load the Ad asynchronously
    preloadedInterstitial = interstitial;
    return preloadedInterstitial.loadAsync();
  }).then(function() {
  }).catch(function(err){
  });
}
// Initialize code to display ads.
function showAds() {
  preloadedInterstitial.showAsync()
    .then(function() {
    })
    .catch(function(e) {
    });
}
// Quit game.
function exitGame() {
  FBInstant.quit();
}
  