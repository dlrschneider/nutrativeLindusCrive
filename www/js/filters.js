app.filter('rawHtml', function($sce){
  return function(val) {
    return $sce.trustAsHtml(val);
  };
});

app.filter('parseDate', function() {
  return function(value) {
      return Date.parse(value);
  };
});