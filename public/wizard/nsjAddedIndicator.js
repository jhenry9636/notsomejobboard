(function () {
  'use strict'

  angular.module('nsj.wizard')
    .directive('nsjAddedIndicator', nsjAddedIndicator)

    function nsjAddedIndicator() {
      return {
        link: link,
        scope: true
      }
    }

  function link(scope, el, attrs) {
    el.on('click', function(ev) {
      var elem = $(this);
      var currentText = elem.text()
      var newText = 'Added!';
      

      elem.html(newText)
      setTimeout(function(){
        elem.html(currentText)
      }, 400)
    })
  }

})()