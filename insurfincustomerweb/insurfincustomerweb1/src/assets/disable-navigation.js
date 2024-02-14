// disable-navigation.js
window.history.pushState(null, null, window.location.href);
window.addEventListener('popstate', function(event) {
  window.history.pushState(null, null, window.location.href);
});