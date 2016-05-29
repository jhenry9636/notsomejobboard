(function () {
  'use strict'

  angular.module('nsj.wizard.slider')
    .directive('nsjSlider', nsjSlider)

  function nsjSlider() {

    return {
      scope: true,
      templateUrl: '/wizard/slider/slider.html',
      controller: 'SliderController',
      controllerAs: 'vm'
    }


  }




})()