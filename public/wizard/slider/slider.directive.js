(function () {
  'use strict'

  angular.module('nsj.slider')
    .directive('nsjSlider', slider)

  function slider() {
    var directive = {
      link: link,
      templateUrl: './slider.html',
      restrict: 'E',
      controller: SliderController,
      controllerAs: vm
    };
    return directive;

    function link(scope, element, attrs) {
      var vm = this;

      vm.test = 'Jarrad'

      return vm
    }
  }

})()