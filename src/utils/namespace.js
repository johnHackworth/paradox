window.pdx = window.pdx || {};
window.pdx.namespace = function(input) {
  var path = input.split('.');
  var pointer = window;
  while (path.length) {
    var layer = path.shift();
    pointer[layer] = pointer[layer] || {};
    pointer = pointer[layer];
  }
};