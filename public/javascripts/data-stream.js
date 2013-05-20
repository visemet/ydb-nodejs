$(function() {
  $(document).ready(function() {
    var source = new EventSource(window.location.pathname + '/stream');

    source.addEventListener('message', function(e) {
      var data = JSON.parse(e.data);
      console.log(data);
    }, false);
  });
});
