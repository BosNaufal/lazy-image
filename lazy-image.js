/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
* Licensed Under MIT (http://opensource.org/licenses/MIT)
*
* Lazy Image JS - Version@0.0.1
*
*/

(function() {

  function lazyImageInit(conf) {

    // Add Style To Head
    var head = document.querySelector('head');
    var style = document.createElement('style')
    style.innerText = 'img[data-lazy=true] {'+
      'transition: '+ conf.transProp + ' ' + conf.transDuration +'s '+ conf.transType +';'+
      '-moz-transition: '+ conf.transProp + ' ' + conf.transDuration +'s '+ conf.transType +';' +
      '-webkit-transition: '+ conf.transProp + ' ' + conf.transDuration +'s '+ conf.transType +';' +
      '-o-transition: '+ conf.transProp + ' ' + conf.transDuration +'s '+ conf.transType +';';
    '};'
    head.appendChild(style);


    // Process when in viewport
    function checkImagePosition() {

      // Get All Image Tag
      var imgs = document.querySelectorAll('img[data-src]');

      // Process Image One By One
      for (var i = 0; i < imgs.length; i++) {

        // Get Window Height
        var windowHeight = window.innerHeight

        // Get All Information about image
        var img = imgs[i];

        // Process It
        loadImage(img);
        hideImage(img);

      }
    }


    // Load The Image
    function loadImage(img) {
      var src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      img.src = src;

    }

    // Hide First
    function hideImage(img) {
      var imageHasLoaded = hasImageLoaded(img);
      if(imageHasLoaded) {
        setTimeout(function() {

          // Set the Size
          var height = img.clientHeight;
          var width = img.clientWidth;

          // Save the original
          img.setAttribute('data-original', img.src);

          // Loading State of Image
          img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAACKaQAAimkBsWWzMgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAYSURBVBiVY3z27Nl/BiIAEzGKRhVSTyEA8gMDxYLXl28AAAAASUVORK5CYII=";
          img.style.width = width + 'px'
          img.style.height = height + 'px'
        })
      }
      img.setAttribute('data-lazy', false);
    }

    // Process when in viewport
    function checkLoadedImagePosition() {

      // Get All Image Tag
      var imgs = document.querySelectorAll('img[data-lazy=false]');

      // Process Image One By One
      for (var i = 0; i < imgs.length; i++) {

        // Get Window Height
        var windowHeight = window.innerHeight

        // Get All Information about image
        var img = imgs[i];
        var imgPos = img.getBoundingClientRect();
        var onCenterViewPort = imgPos.top + (windowHeight / 2) < windowHeight;

        if(onCenterViewPort) showImage(img)


      }
    }

    // Show Fade In Effect and remove event listener~
    function showImage(img) {

      // For Fade Effect
      img.style.opacity = 0;

      setTimeout(function() {
        img.style.opacity = 1;
        img.src = img.getAttribute('data-original');
        img.setAttribute('data-lazy', true);

        // Make the size Responsive Again
        img.style.width = null
        img.style.height = null
      },100)

    }

    function hasImageLoaded(img) {
      var loaded = img.complete;
      var repeat = function() {
        return setTimeout(function() { hasImageLoaded(img) }, 300)
      }
      return loaded ? loaded : repeat();
    }

    // Initial Checking
    checkImagePosition();

    // Add Event Listener To Window
    window.onscroll = function() {
      checkImagePosition();
      checkLoadedImagePosition();
    };

  }


  /*! Copyright UMD Contributor - https://github.com/umdjs/umd/
  * Licensed Under MIT (http://opensource.org/licenses/MIT)
  *
  * For Universal Module Support
  *
  */

  // If support node / ES6 module
  if( typeof module === 'object' && module.exports ){
    module.exports = lazyImageInit;
  }

  // if using require (AMD) js
  else if (typeof define === 'function' && define.amd) {
    define(function (){ return lazyImageInit; });
  }

  // if script loaded by script tag in HTML file
  else if (typeof window !== undefined) {
    window.lazyImageInit = lazyImageInit;
  }

})()
