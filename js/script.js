/**
 * Global variables
 */
"use strict";
(function () {
  var userAgent = navigator.userAgent.toLowerCase(),
    $window = $(window),
    $html = $("html"),
    isDesktop = $html.hasClass("desktop"),
    isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1,
    isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isNoviBuilder = window.xMode,
    plugins = {
      rdNavbar: $(".rd-navbar"),//ok
      swiper: document.querySelectorAll(".swiper-container"),//ok
      isotope: $(".isotope"),//ok
      progressLinear: $(".progress-linear"),//ok
      pageLoader: $(".preloader"),//ok
      materialParallax: $(".parallax-container"),//ok
      wow: $(".wow"),//ok
    };

  /**
   * @desc Check the element was been scrolled into the view
   * @param {object} elem - jQuery object
   * @return {boolean}
   */
  function isScrolledIntoView(elem) {
    if (isNoviBuilder) return true;
    return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
  }


  $window.on("load", function () {
    // Page loader
    if (plugins.pageLoader.length > 0 && !isNoviBuilder) {
      plugins.pageLoader.fadeOut("slow");
      $window.trigger("resize");
    } else {
      plugins.pageLoader.remove();
    }
  });

  /**
   * Initialize All Scripts
   */
  $(function () {
    /**
     * @desc Insert element after reference element
     * @param {Node} elem - inserted element
     * @param {object} refElem - reference element
     */
    function insertAfter(elem, refElem) {
      return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
    }

    /**
     * @desc Init custom background circle effect
     * @param {object} swiper - swiper instance
     */
    // function initCircleBg(swiper) {
    //   /**
    //    * @desc Recalculate svg circle parameters
    //    * @param {object} swiper - swiper instance
    //    * @return {object} - circle parameters
    //    */
    //   function calcCircle(swiper) {
    //     var activeSlide = swiper.$wrapperEl[0].children[swiper.activeIndex];
    //     return {
    //       centerX: activeSlide.getAttribute("data-circle-cx") ? swiper.width * activeSlide.getAttribute("data-circle-cx") : swiper.width / 2,
    //       centerY: activeSlide.getAttribute("data-circle-cy") ? swiper.height * activeSlide.getAttribute("data-circle-cy") : swiper.height / 2,
    //       radius: activeSlide.getAttribute("data-circle-r") ? swiper.width * activeSlide.getAttribute("data-circle-r") : swiper.height * 0.4,
    //     };
    //   }

    //   // Svg parameters
    //   swiper.params.svg = {
    //     fill: swiper.$el[0].getAttribute("data-circle-fill") || "#f1f1f1",
    //     easingIn: "easeOutQuad",
    //     easingOut: "easeOutQuad",
    //   };

    //   swiper.svg = {};
    //   swiper.svg.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //   swiper.svg.el.setAttribute("class", "swiper-svg");
    //   swiper.svg.el.setAttribute("width", "100%");
    //   swiper.svg.el.setAttribute("height", "100%");
    //   swiper.svg.el.setAttribute("viewbox", "0 0 " + swiper.width + " " + swiper.height);
    //   swiper.svg.circle = calcCircle(swiper);
    //   swiper.svg.el.innerHTML = '<circle fill="' + swiper.params.svg.fill + '"  cx="' + swiper.svg.circle.centerX + '" cy="' + swiper.svg.circle.centerY + '" r="' + swiper.svg.circle.radius + '"/>';
    //   swiper.$el[0].insertBefore(swiper.svg.el, swiper.$wrapperEl[0]);
    //   // insertAfter( swiper.svg.el, swiper.$wrapperEl[0] );
    //   swiper.svg.circleEl = swiper.svg.el.querySelector("circle");

    //   swiper.on("resize", function () {
    //     swiper.svg.circle = calcCircle(swiper);
    //     swiper.svg.circleEl.setAttribute("cx", swiper.svg.circle.centerX);
    //     swiper.svg.circleEl.setAttribute("cy", swiper.svg.circle.centerY);
    //     swiper.svg.circleEl.setAttribute("r", swiper.svg.circle.radius);
    //   });

    //   swiper.on("slideChangeTransitionStart", function () {
    //     var swiper = this;
    //     swiper.svg.circle = calcCircle(swiper);

    //     var shapeIn = function () {
    //       return new Promise(function (resolve, reject) {
    //         anime({
    //           targets: swiper.svg.circleEl,
    //           duration: swiper.params.speed / 4,
    //           easing: swiper.params.svg.easingIn,
    //           cx: swiper.width / 2,
    //           cy: swiper.height / 2,
    //           r: swiper.width,
    //           complete: resolve,
    //         });
    //       });
    //     };

    //     var shapeOut = function () {
    //       return new Promise(function (resolve, reject) {
    //         anime({
    //           targets: swiper.svg.circleEl,
    //           duration: swiper.params.speed / 4,
    //           delay: swiper.params.speed / 2,
    //           easing: swiper.params.svg.easingOut,
    //           cx: swiper.svg.circle.centerX,
    //           cy: swiper.svg.circle.centerY,
    //           r: swiper.svg.circle.radius,
    //           complete: resolve,
    //         });
    //       });
    //     };

    //     shapeIn().then(shapeOut);
    //   });
    // }

    /**
     * @desc Init custom serial rectangle frame effect
     * @param {object} swiper - swiper instance
     */
    // function initFrameRectSerial(swiper) {
    //   /**
    //    * @desc Path recalculation depending on the state
    //    * @param {object} swiper - swiper instance
    //    * @param {string} [state] - path state
    //    * @return {string} - path description for <path> element
    //    */
    //   var calculatePath = function (swiper, state) {
    //     switch (state) {
    //       case "step1":
    //         return "M 0,0 0," + swiper.height + " " + swiper.width + "," + swiper.height + " " + swiper.width + ",0 0,0 Z M " + swiper.frame.size + "," + swiper.frame.size + " " + swiper.width + ",0 " + swiper.width + "," + swiper.height + " 0," + swiper.height + " Z";
    //         break;
    //       case "step2":
    //         return "M 0,0 0," + swiper.height + " " + swiper.width + "," + swiper.height + " " + swiper.width + ",0 0,0 Z M " + swiper.frame.size + "," + swiper.frame.size + " " + (swiper.width - swiper.frame.size) + "," + swiper.frame.size + " " + swiper.width + "," + swiper.height + " 0," + swiper.height + " Z";
    //         break;
    //       case "step3":
    //         return "M 0,0 0," + swiper.height + " " + swiper.width + "," + swiper.height + " " + swiper.width + ",0 0,0 Z M " + swiper.frame.size + "," + swiper.frame.size + " " + (swiper.width - swiper.frame.size) + "," + swiper.frame.size + " " + (swiper.width - swiper.frame.size) + "," + (swiper.height - swiper.frame.size) + " 0," + swiper.height + " Z";
    //         break;
    //       case "step4":
    //         return "M 0,0 0," + swiper.height + " " + swiper.width + "," + swiper.height + " " + swiper.width + ",0 0,0 Z M " + swiper.frame.size + "," + swiper.frame.size + " " + (swiper.width - swiper.frame.size) + "," + swiper.frame.size + " " + (swiper.width - swiper.frame.size) + "," + (swiper.height - swiper.frame.size) + " " + swiper.frame.size + "," + (swiper.height - swiper.frame.size) + " Z";
    //         break;
    //       default:
    //         return "M 0,0 0," + swiper.height + " " + swiper.width + "," + swiper.height + " " + swiper.width + ",0 0,0 Z M 0,0 " + swiper.width + ",0 " + swiper.width + "," + swiper.height + " 0," + swiper.height + " Z";
    //         break;
    //     }
    //   };

    //   // Frame parameters
    //   swiper.params.frame = {
    //     fill: swiper.$el[0].getAttribute("data-frame-fill") || "#f1f1f1",
    //     easingIn: "easeOutQuad",
    //     easingOut: "easeOutQuad",
    //   };

    //   swiper.frame = {};
    //   swiper.frame.size = swiper.width / 12;
    //   swiper.frame.paths = {
    //     initial: calculatePath(swiper),
    //     step1: calculatePath(swiper, "step1"),
    //     step2: calculatePath(swiper, "step2"),
    //     step3: calculatePath(swiper, "step3"),
    //     step4: calculatePath(swiper, "step4"),
    //   };
    //   swiper.frame.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //   swiper.frame.el.setAttribute("class", "swiper-frame");
    //   swiper.frame.el.setAttribute("width", "100%");
    //   swiper.frame.el.setAttribute("height", "100%");
    //   swiper.frame.el.setAttribute("fill-rule", "evenodd");
    //   swiper.frame.el.setAttribute("viewbox", "0 0 " + swiper.width + " " + swiper.height);
    //   swiper.frame.el.innerHTML = '<path fill="' + swiper.params.frame.fill + '" d="' + swiper.frame.paths.initial + '"/>';
    //   swiper.$el[0].insertBefore(swiper.frame.el, swiper.$wrapperEl[0]);
    //   swiper.frame.shape = swiper.frame.el.querySelector("path");

    //   swiper.on("resize", function () {
    //     this.frame.size = this.width / 12;
    //     this.frame.paths.initial = calculatePath(this);
    //     this.frame.paths.step1 = calculatePath(this, "step1");
    //     this.frame.paths.step2 = calculatePath(this, "step2");
    //     this.frame.paths.step3 = calculatePath(this, "step3");
    //     this.frame.paths.step4 = calculatePath(this, "step4");
    //     this.frame.el.setAttribute("viewbox", "0 0 " + this.width + " " + this.height);
    //     this.frame.shape.setAttribute("d", this.animating ? this.frame.paths.final : this.frame.paths.initial);
    //   });

    //   swiper.on("slideChangeTransitionStart", function () {
    //     var swiper = this;

    //     var shapeIn = function () {
    //       return new Promise(function (resolve, reject) {
    //         var duration = swiper.params.speed * 0.14;

    //         var shapeTimeline = anime.timeline({
    //           duration: duration,
    //           easing: swiper.params.frame.easingIn,
    //         });

    //         shapeTimeline
    //           .add({
    //             targets: swiper.frame.shape,
    //             d: swiper.frame.paths.step1,
    //           })
    //           .add({
    //             targets: swiper.frame.shape,
    //             d: swiper.frame.paths.step2,
    //             offset: "-=" + duration * 0.5,
    //           })
    //           .add({
    //             targets: swiper.frame.shape,
    //             d: swiper.frame.paths.step3,
    //             offset: "-=" + duration * 0.5,
    //           })
    //           .add({
    //             targets: swiper.frame.shape,
    //             d: swiper.frame.paths.step4,
    //             offset: "-=" + duration * 0.5,
    //             complete: resolve,
    //           });
    //       });
    //     };

    //     var shapeOut = function () {
    //       return new Promise(function (resolve, reject) {
    //         var duration = swiper.params.speed * 0.14;

    //         var shapeTimeline = anime.timeline({
    //           duration: duration,
    //           easing: swiper.params.frame.easingIn,
    //         });

    //         shapeTimeline
    //           .add({
    //             targets: swiper.frame.shape,
    //             delay: swiper.params.speed * 0.25,
    //             d: swiper.frame.paths.step3,
    //           })
    //           .add({
    //             targets: swiper.frame.shape,
    //             d: swiper.frame.paths.step2,
    //             offset: "-=" + duration * 0.5,
    //           })
    //           .add({
    //             targets: swiper.frame.shape,
    //             d: swiper.frame.paths.step1,
    //             offset: "-=" + duration * 0.5,
    //           })
    //           .add({
    //             targets: swiper.frame.shape,
    //             d: swiper.frame.paths.initial,
    //             offset: "-=" + duration * 0.5,
    //             complete: resolve,
    //           });
    //       });
    //     };

    //     shapeIn().then(shapeOut);
    //   });
    // }

    /**
     * @desc Init custom trapeze frame effect
     * @param {object} swiper - swiper instance
     */
    function initFrameTrapeze(swiper) {
      /**
       * @desc Path recalculation depending on the state
       * @param {object} swiper - swiper instance
       * @param {string} [state] - path state
       * @return {string} - path description for <path> element
       */
      var calculatePath = function (swiper, state) {
        switch (state) {
          case "next":
            return "M 0,0 0," + swiper.height + " " + swiper.width + "," + swiper.height + " " + swiper.width + ",0 0,0 Z M " + swiper.frame.size + "," + swiper.frame.size + " " + (swiper.width - swiper.frame.size) + "," + swiper.frame.size / 2 + " " + (swiper.width - swiper.frame.size) + "," + (swiper.height - swiper.frame.size / 2) + " " + swiper.frame.size + "," + (swiper.height - swiper.frame.size) + " Z";
            break;
          case "prev":
            return "M 0,0 0," + swiper.height + " " + swiper.width + "," + swiper.height + " " + swiper.width + ",0 0,0 Z M " + swiper.frame.size + "," + swiper.frame.size / 2 + " " + (swiper.width - swiper.frame.size) + "," + swiper.frame.size + " " + (swiper.width - swiper.frame.size) + "," + (swiper.height - swiper.frame.size) + " " + swiper.frame.size + "," + (swiper.height - swiper.frame.size / 2) + " Z";
            break;
          default:
            return "M 0,0 0," + swiper.height + " " + swiper.width + "," + swiper.height + " " + swiper.width + ",0 0,0 Z M 0,0 " + swiper.width + ",0 " + swiper.width + "," + swiper.height + " 0," + swiper.height + " Z";
            break;
        }
      };

      var shapeNext = function (swiper) {
        return new Promise(function (resolve, reject) {
          anime({
            targets: swiper.frame.shape,
            duration: swiper.params.speed / 4,
            easing: swiper.params.frame.easingIn,
            d: swiper.frame.paths.next,
            complete: resolve,
          });
        });
      };

      var shapePrev = function (swiper) {
        return new Promise(function (resolve, reject) {
          anime({
            targets: swiper.frame.shape,
            duration: swiper.params.speed / 4,
            easing: swiper.params.frame.easingIn,
            d: swiper.frame.paths.prev,
            complete: resolve,
          });
        });
      };

      var shapeOut = function (swiper) {
        return function () {
          return new Promise(function (resolve, reject) {
            anime({
              targets: swiper.frame.shape,
              duration: swiper.params.speed / 4,
              delay: swiper.params.speed / 2,
              easing: swiper.params.frame.easingOut,
              d: swiper.frame.paths.initial,
              complete: resolve,
            });
          });
        };
      };

      // Frame parameters
      swiper.params.frame = {
        fill: swiper.$el[0].getAttribute("data-frame-fill") || "#f1f1f1",
        easingIn: "easeOutQuint",
        easingOut: "easeOutQuad",
      };

      swiper.frame = {};
      swiper.frame.size = swiper.width / 12;
      swiper.frame.paths = {
        initial: calculatePath(swiper),
        next: calculatePath(swiper, "next"),
        prev: calculatePath(swiper, "prev"),
      };
      swiper.frame.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      swiper.frame.el.setAttribute("class", "swiper-frame");
      swiper.frame.el.setAttribute("width", "100%");
      swiper.frame.el.setAttribute("height", "100%");
      swiper.frame.el.setAttribute("fill-rule", "evenodd");
      swiper.frame.el.setAttribute("viewbox", "0 0 " + swiper.width + " " + swiper.height);
      swiper.frame.el.innerHTML = '<path fill="' + swiper.params.frame.fill + '" d="' + swiper.frame.paths.initial + '"/>';
      swiper.$el[0].insertBefore(swiper.frame.el, swiper.$wrapperEl[0]);
      swiper.frame.shape = swiper.frame.el.querySelector("path");

      swiper.on("resize", function () {
        this.frame.size = this.width / 12;
        this.frame.paths.initial = calculatePath(this);
        this.frame.paths.next = calculatePath(this, "next");
        this.frame.paths.prev = calculatePath(this, "prev");
        this.frame.el.setAttribute("viewbox", "0 0 " + this.width + " " + this.height);
      });

      swiper.on("slideNextTransitionStart", function () {
        var swiper = this;
        shapeNext(swiper).then(shapeOut(swiper));
      });

      swiper.on("slidePrevTransitionStart", function () {
        var swiper = this;
        shapePrev(swiper).then(shapeOut(swiper));
      });
    }

    /**
     * @desc Init custom slash frame effect
     * @param {object} swiper - swiper instance
     */
    // function initFrameSlash(swiper) {
    //   /**
    //    * @desc Path recalculation depending on the state
    //    * @param {object} swiper - swiper instance
    //    * @param {string} [state] - path state
    //    * @return {string} - path description for <path> element
    //    */
    //   var calculatePath = function (swiper, state) {
    //     var w = swiper.width,
    //       h = swiper.height;
    //     switch (state) {
    //       case "slash":
    //         var p1 = { x: w / 4 - 50, y: h / 4 + 50 },
    //           p2 = { x: w / 4 + 50, y: h / 4 - 50 },
    //           p3 = { x: w - p2.x, y: h - p2.y },
    //           p4 = { x: w - p1.x, y: h - p1.y };
    //         return ["M 0,0", "0," + h, w + "," + h, w + ",0", "0,0 Z", "M " + p1.x + "," + p1.y, p2.x + "," + p2.y, p4.x + "," + p4.y, p3.x + "," + p3.y + " Z"].join(" ");
    //         break;
    //       default:
    //         return ["M 0,0", "0," + h, w + "," + h, w + ",0", "0,0 Z", "M 0,0", w + ",0", w + "," + h, "0," + h, "0,0 Z"].join(" ");
    //         break;
    //     }
    //   };

    //   // Frame parameters
    //   swiper.params.frame = {
    //     fill: swiper.$el[0].getAttribute("data-frame-fill") || "#f1f1f1",
    //     easingIn: "easeOutQuint",
    //     easingOut: "easeOutQuad",
    //   };

    //   separateCaptions(swiper);
    //   swiper.frame = {};
    //   swiper.frame.paths = {
    //     initial: calculatePath(swiper),
    //     final: calculatePath(swiper, "slash"),
    //   };
    //   swiper.frame.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //   swiper.frame.el.setAttribute("class", "swiper-frame");
    //   swiper.frame.el.setAttribute("width", "100%");
    //   swiper.frame.el.setAttribute("height", "100%");
    //   swiper.frame.el.setAttribute("fill-rule", "evenodd");
    //   swiper.frame.el.setAttribute("viewbox", "0 0 " + swiper.width + " " + swiper.height);
    //   swiper.frame.el.innerHTML = '<path fill="' + swiper.params.frame.fill + '" d="' + swiper.frame.paths.initial + '"/>';
    //   swiper.$el[0].insertBefore(swiper.frame.el, swiper.$wrapperEl[0]);
    //   swiper.frame.shape = swiper.frame.el.querySelector("path");

    //   swiper.on("resize", function () {
    //     this.frame.paths.initial = calculatePath(this);
    //     this.frame.paths.final = calculatePath(this, "slash");
    //     this.frame.el.setAttribute("viewbox", "0 0 " + this.width + " " + this.height);
    //     this.frame.shape.setAttribute("d", this.animating ? this.frame.paths.final : this.frame.paths.initial);
    //   });

    //   swiper.on("slideChangeTransitionStart", function () {
    //     var swiper = this;

    //     var shapeIn = function () {
    //       return new Promise(function (resolve, reject) {
    //         anime({
    //           targets: swiper.frame.shape,
    //           duration: swiper.params.speed / 4,
    //           easing: swiper.params.frame.easingIn,
    //           d: swiper.frame.paths.final,
    //           complete: resolve,
    //         });
    //       });
    //     };

    //     var shapeOut = function () {
    //       return new Promise(function (resolve, reject) {
    //         anime({
    //           targets: swiper.frame.shape,
    //           duration: swiper.params.speed / 4,
    //           delay: swiper.params.speed / 2,
    //           easing: swiper.params.frame.easingOut,
    //           d: swiper.frame.paths.initial,
    //           complete: resolve,
    //         });
    //       });
    //     };

    //     shapeIn().then(shapeOut);
    //   });
    // }

    /**
     * @desc Init custom random frame effect
     * @param {object} swiper - swiper instance
     */
    function initFrameRandom(swiper) {
      /**
       * @desc Returns random frame size considering the size of the slider
       * @param {object} swiper - swiper instance
       * @return {number} - frame size
       */
      var randomSize = function (swiper) {
        return swiper.frame.minSize + swiper.frame.maxSize * Math.random();
      };

      /**
       * @desc Path recalculation depending on the state
       * @param {object} swiper - swiper instance
       * @param {string} [state] - path state
       * @return {string} - path description for <path> element
       */
      var calcPath = function (swiper, state) {
        switch (state) {
          case "random":
            return "M 0,0 " + swiper.width + ",0 " + swiper.width + "," + swiper.height + " 0," + swiper.height + " Z M " + randomSize(swiper) + "," + randomSize(swiper) + " " + (swiper.width - randomSize(swiper)) + "," + randomSize(swiper) + " " + (swiper.width - randomSize(swiper)) + "," + (swiper.height - randomSize(swiper)) + " " + randomSize(swiper) + "," + (swiper.height - randomSize(swiper)) + " Z";
            break;
          default:
            return "M 0,0 " + swiper.width + ",0 " + swiper.width + "," + swiper.height + " 0," + swiper.height + " Z M 0,0 " + swiper.width + ",0 " + swiper.width + "," + swiper.height + " 0," + swiper.height + " Z";
            break;
        }
      };

      // Frame parameters
      swiper.params.frame = {
        fill: swiper.$el[0].getAttribute("data-frame-fill") || "#f1f1f1",
        easingIn: "easeOutQuint",
        easingOut: "easeOutQuad",
      };

      swiper.frame = {};
      swiper.frame.maxSize = swiper.width / 15;
      swiper.frame.minSize = swiper.width / 30;
      swiper.frame.paths = {
        initial: calcPath(swiper),
        final: calcPath(swiper, "random"),
      };
      swiper.frame.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      swiper.frame.el.setAttribute("class", "swiper-frame");
      swiper.frame.el.setAttribute("width", "100%");
      swiper.frame.el.setAttribute("height", "100%");
      swiper.frame.el.setAttribute("fill-rule", "evenodd");
      swiper.frame.el.setAttribute("viewbox", "0 0 " + swiper.width + " " + swiper.height);
      swiper.frame.el.innerHTML = '<path fill="' + swiper.params.frame.fill + '" d="' + swiper.frame.paths.initial + '"/>';
      swiper.$el[0].insertBefore(swiper.frame.el, swiper.$wrapperEl[0]);
      swiper.frame.shape = swiper.frame.el.querySelector("path");

      swiper.on("resize", function () {
        this.frame.maxSize = swiper.width / 10;
        this.frame.minSize = swiper.width / 30;
        this.frame.paths.initial = calcPath(this);
        this.frame.paths.final = calcPath(this, "random");
        this.frame.el.setAttribute("viewbox", "0 0 " + this.width + " " + this.height);
        this.frame.shape.setAttribute("d", this.animating ? this.frame.paths.final : this.frame.paths.initial);
      });

      swiper.on("slideChangeTransitionStart", function () {
        var swiper = this;

        var shapeIn = function () {
          return new Promise(function (resolve, reject) {
            anime({
              targets: swiper.frame.shape,
              duration: swiper.params.speed / 4,
              easing: swiper.params.frame.easingIn,
              d: calcPath(swiper, "random"),
              complete: resolve,
            });
          });
        };

        var shapeOut = function () {
          return new Promise(function (resolve, reject) {
            anime({
              targets: swiper.frame.shape,
              duration: swiper.params.speed / 4,
              delay: swiper.params.speed / 2,
              easing: swiper.params.frame.easingOut,
              d: swiper.frame.paths.initial,
              complete: resolve,
            });
          });
        };

        shapeIn().then(shapeOut);
      });
    }

    /**
     * @desc Init custom cropping circle effect
     * @param {object} swiper - swiper instance
     */
    // function initCroppingCircle(swiper) {
    //   /**
    //    * @desc Generates random center coordinates considering the size of the slider and the circle.
    //    * @param {object} swiper - swiper instance
    //    * @returns {{x: number, y: *}} - random center coordinates
    //    */
    //   var randomCenter = function (swiper) {
    //     return {
    //       x: (swiper.width - swiper.frame.radiusReduced * 2) * Math.random(),
    //       y: (swiper.height - swiper.frame.radiusReduced * 2) * Math.random() + swiper.frame.radiusReduced,
    //     };
    //   };

    //   /**
    //    * @desc Path recalculation depending on the state.
    //    * @param {object} swiper - swiper instance
    //    * @param {string} [state] - path state
    //    * @return {string} - path description for <path> element
    //    */
    //   var calculatePath = function (swiper, state) {
    //     var w = swiper.width,
    //       h = swiper.height,
    //       r,
    //       c = randomCenter(swiper);
    //     switch (state) {
    //       case "reduced":
    //         r = swiper.frame.radiusReduced;
    //         return ["M 0, 0", "H " + w, "V " + h, "H 0 Z", "M " + c.x + ", " + c.y, "a " + r + "," + r + " 0 0,0 " + r * 2 + ",0", "a " + r + "," + r + " 0 0,0 " + -r * 2 + ",0 Z"].join(" ");
    //         break;
    //       default:
    //         r = swiper.frame.radiusFull;
    //         return ["M 0, 0", "H " + w, "V " + h, "H 0 Z", "M " + (w / 2 - r) + ", " + h / 2, "a " + r + "," + r + " 0 0,0 " + r * 2 + ",0", "a " + r + "," + r + " 0 0,0 " + -r * 2 + ",0 Z"].join(" ");
    //         break;
    //     }
    //   };

    //   /**
    //    * @desc Generate dimensions for <image> element to fill slide.
    //    * @param {object} swiper - swiper instance
    //    * @return {{ width: number, height: number }}
    //    */
    //   var genImgFillSize = function (swiper) {
    //     var ratio = Math.max(swiper.width / swiper.frame.image.initialBox.width, swiper.height / swiper.frame.image.initialBox.height);
    //     return {
    //       width: swiper.frame.image.initialBox.width * ratio,
    //       height: swiper.frame.image.initialBox.height * ratio,
    //     };
    //   };

    //   /**
    //    * @desc Returns initial dimensions of <image> element. It is recommended to specify dimensions in the file name.
    //    * @param {object} swiper - swiper instance
    //    * @return {object} - initial dimensions
    //    */
    //   var getInitialBox = function (swiper) {
    //     var initialBox = swiper.params.frame.frameBg.match(/\d+x\d+/g);
    //     if (initialBox[0]) {
    //       initialBox = initialBox[0].split("x");
    //       return { width: initialBox[0], height: initialBox[1] };
    //     } else {
    //       return swiper.frame.image.el.getBBox();
    //     }
    //   };

    //   // Frame parameters
    //   swiper.params.frame = {
    //     frameBg: swiper.$el[0].getAttribute("data-frame-bg"),
    //     easingIn: "easeOutQuint",
    //     easingOut: "easeInQuad",
    //   };

    //   separateCaptions(swiper);
    //   swiper.frame = {};
    //   swiper.frame.radiusReduced = swiper.width * 0.15;
    //   swiper.frame.radiusFull = Math.sqrt(Math.pow(swiper.width, 2) + Math.pow(swiper.height, 2));
    //   swiper.frame.paths = {
    //     initial: calculatePath(swiper),
    //     final: calculatePath(swiper, "reduced"),
    //   };
    //   swiper.frame.el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //   swiper.frame.el.setAttribute("class", "swiper-frame");
    //   swiper.frame.el.setAttribute("width", "100%");
    //   swiper.frame.el.setAttribute("height", "100%");
    //   swiper.frame.el.setAttribute("fill-rule", "evenodd");
    //   swiper.frame.el.setAttribute("viewbox", "0 0 " + swiper.width + " " + swiper.height);
    //   swiper.frame.el.innerHTML = '<defs><clipPath id="shape__clip"><path d="' + swiper.frame.paths.initial + '"/></clipPath></defs><image xlink:href="' + swiper.params.frame.frameBg + '" clip-path="url(#shape__clip)" x="0" y="0"/>';
    //   swiper.$el[0].insertBefore(swiper.frame.el, swiper.$wrapperEl[0]);
    //   swiper.frame.shape = swiper.frame.el.querySelector("path");

    //   swiper.frame.image = {};
    //   swiper.frame.image.el = swiper.frame.el.querySelector("image");
    //   swiper.frame.image.initialBox = getInitialBox(swiper);
    //   swiper.frame.image.box = genImgFillSize(swiper);
    //   swiper.frame.image.el.setAttribute("width", swiper.frame.image.box.width);
    //   swiper.frame.image.el.setAttribute("height", swiper.frame.image.box.height);

    //   swiper.on("resize", function () {
    //     this.frame.radiusReduced = swiper.width / 8;
    //     this.frame.radiusFull = Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));

    //     this.frame.image.box = genImgFillSize(this);
    //     this.frame.image.el.setAttribute("width", this.frame.image.box.width);
    //     this.frame.image.el.setAttribute("height", this.frame.image.box.height);

    //     this.frame.paths.initial = calculatePath(this);
    //     this.frame.paths.final = calculatePath(this, "reduced");
    //     this.frame.el.setAttribute("viewbox", "0 0 " + this.width + " " + this.height);
    //     this.frame.shape.setAttribute("d", this.animating ? this.frame.paths.final : this.frame.paths.initial);
    //   });

    //   swiper.on("slideChangeTransitionStart", function () {
    //     var swiper = this;

    //     var shapeIn = function () {
    //       return new Promise(function (resolve, reject) {
    //         anime({
    //           targets: swiper.frame.shape,
    //           duration: swiper.params.speed / 3,
    //           easing: swiper.params.frame.easingIn,
    //           d: calculatePath(swiper, "reduced"),
    //           complete: resolve,
    //         });
    //       });
    //     };

    //     var shapeOut = function () {
    //       return new Promise(function (resolve, reject) {
    //         anime({
    //           targets: swiper.frame.shape,
    //           duration: swiper.params.speed / 3,
    //           delay: swiper.params.speed / 3,
    //           easing: swiper.params.frame.easingOut,
    //           d: swiper.frame.paths.initial,
    //           complete: resolve,
    //         });
    //       });
    //     };

    //     shapeIn().then(shapeOut);
    //   });
    // }

    /**
     * @desc Separate caption elements (.swiper-slide-caption) into other wrapper (.swiper-wrapper). Should only be used with a slide effect.
     * @param {object} swiper - swiper instance
     */
    // function separateCaptions(swiper) {
    //   // Add captions contatiner after .swiper-wrapper
    //   swiper.captWrapperEl = document.createElement("div");
    //   swiper.captWrapperEl.className = "swiper-wrapper separated";
    //   insertAfter(swiper.captWrapperEl, swiper.$wrapperEl[0]);

    //   // Move all caption to new container
    //   var captions = swiper.$wrapperEl[0].querySelectorAll(".swiper-slide-caption");
    //   for (var i = 0; i < captions.length; i++) {
    //     var caption = captions[i].cloneNode(true),
    //       captionSlide = document.createElement("div");

    //     captionSlide.className = "swiper-slide";
    //     swiper.captWrapperEl.appendChild(captionSlide);
    //     captionSlide.appendChild(caption);
    //     captions[i].remove();
    //   }

    //   // Switch slides
    //   swiper.captWrapperEl.children[swiper.activeIndex].classList.add("active");

    //   swiper.on("slideChangeTransitionStart", function () {
    //     swiper.captWrapperEl.children[swiper.activeIndex].classList.add("active");
    //   });

    //   swiper.on("slideChangeTransitionEnd", function () {
    //     swiper.captWrapperEl.children[swiper.realPrevious].classList.remove("active");
    //   });
    // }

    /**
     * toggleSwiperInnerVideos
     * @description  toggle swiper videos on active slides
     */
    function toggleSwiperInnerVideos(swiper) {
      var prevSlide = $(swiper.slides[swiper.previousIndex]),
        nextSlide = $(swiper.slides[swiper.activeIndex]),
        videos,
        videoItems = prevSlide.find("video");

      for (var i = 0; i < videoItems.length; i++) {
        videoItems[i].pause();
      }

      videos = nextSlide.find("video");
      if (!isNoviBuilder && videos.length) {
        videos.get(0).play();
        videos.css({ visibility: "visible", opacity: "1" });
      }
    }

    /**
     * @desc Sets the actual previous index based on the position of the slide in the markup. Should be the most recent action.
     * @param {object} swiper - swiper instance
     */
    function setRealPrevious(swiper) {
      var element = swiper.$wrapperEl[0].children[swiper.activeIndex];
      swiper.realPrevious = Array.prototype.indexOf.call(element.parentNode.children, element);
    }

    /**
     * @desc Plays required animation preset
     * @param {object} el - animating DOM node
     * @param {object} params - extra options
     * @param {string} params.animation - anime preset name
     * @param {string} [params.direction] - animation direction
     * @param {string|array} [params.easing] - animation easing
     * @param {number} [params.duration] - animation duration
     * @param {number} [params.delay] - animation delay
     */
    function bindAnimePreset(el, params) {
      params = params || {};

      var preset = {
        swiperContentRide: function () {
          el.animeReset = function () {
            this.style.transform = "none";
            this.style.opacity = 0;
          };
          el.animeStart = function (direction) {
            anime({
              targets: el,
              duration: params.duration || 600,
              delay: params.delay,
              easing: params.easing || "easeOutQuint",
              direction: params.direction,
              translateY: direction ? 0 : [100, 0],
              translateX: direction ? (direction === "next" ? [300, 0] : [-300, 0]) : 0,
              opacity: [0, 1],
            });
          };
          el.animeOut = function (direction) {
            anime({
              targets: el,
              duration: params.duration || 600,
              delay: params.delay * 0.3,
              easing: params.easing || "easeOutQuint",
              direction: params.direction,
              translateX: direction ? (direction === "next" ? [0, -300] : [0, 300]) : 0,
              opacity: [1, 0],
            });
          };
        },
        swiperContentStack: function () {
          el.animeReset = function () {
            this.style.transform = "none";
            this.style.opacity = 0;
          };
          el.animeStart = function (direction) {
            anime({
              targets: el,
              duration: params.duration || 600,
              delay: params.delay || 0,
              easing: params.easing || "easeOutQuint",
              direction: params.direction,
              translateY: [300, 0],
              rotate: [direction === "prev" ? 25 : -25, 0],
              opacity: [0, 1],
            });
          };
          el.animeOut = function (direction) {
            anime({
              targets: el,
              duration: params.duration || 600,
              delay: params.delay * 0.6 || 0,
              easing: params.easing || "easeOutQuint",
              direction: params.direction,
              translateY: [0, -300],
              rotate: [0, direction === "prev" ? -15 : 15],
              opacity: [1, 0],
            });
          };
        },
        swiperContentDiagonal: function () {
          el.animeReset = function () {
            this.style.transform = "none";
            this.style.opacity = 0;
          };
          el.animeStart = function (direction) {
            anime({
              targets: el,
              duration: params.duration || 600,
              delay: params.delay || 0,
              easing: params.easing || "easeOutQuint",
              direction: params.direction,
              translateY: [300, 0],
              translateX: [direction === "next" ? 300 : -300, 0],
              opacity: [0, 1],
            });
          };
          el.animeOut = function (direction) {
            anime({
              targets: el,
              duration: params.duration || 600,
              delay: params.delay * 0.6 || 0,
              easing: params.easing || "easeOutQuint",
              direction: params.direction,
              opacity: [1, 0],
            });
          };
        },
        swiperContentFade: function () {
          params.easing = params.easing || "easeOutQuint";
          el.animeReset = function () {
            this.style.transform = "none";
            this.style.opacity = 0;
          };
          el.animeStart = function (direction) {
            anime({
              targets: el,
              duration: params.duration || 600,
              delay: params.delay,
              easing: params.easing || "easeOutQuint",
              direction: params.direction,
              translateY: direction === "next" ? [100, 0] : [-100, 0],
              opacity: [0, 1],
            });
          };
          el.animeOut = function (direction) {
            anime({
              targets: el,
              duration: params.duration || 600,
              delay: params.delay * 0.6 || 0,
              easing: params.easing || "easeOutQuint",
              direction: params.direction,
              translateY: direction === "next" ? [0, -100] : [0, 100],
              opacity: [1, 0],
            });
          };
        },
        swiperSlideRide: function () {
          el.animeReset = function () {
            this.style.transform = "translateX(0) scale(1.2)";
          };
          el.animeStart = function (direction) {
            anime({
              targets: el,
              duration: params.duration || 600,
              delay: params.delay || 0,
              easing: params.easing || "easeInOutQuad",
              direction: params.direction,
              translateX: direction ? (direction === "next" ? [200, 0] : [-200, 0]) : 0,
              scale: { value: 1.2, duration: 0, delay: 0 },
            });
          };
        },
        swiperSlideRotate: function () {
          el.animeReset = function () {
            this.style.transform = "rotate(0) scale(1.2)";
          };
          el.animeStart = function (direction) {
            el.style.transformOrigin = direction === "next" ? "0% 50%" : "100% 50%";
            anime({
              targets: el,
              duration: params.duration || 600,
              delay: params.delay || 0,
              easing: params.easing || "easeOutElastic",
              direction: params.direction,
              elasticity: 350,
              rotate: direction ? (direction === "next" ? [5, 0] : [-5, 0]) : 0,
              scale: direction ? [1.3, 1.1] : 1,
            });
          };
        },
        swiperSlideZoomOut: function () {
          el.animeReset = function () {
            this.style.transform = "none";
          };
          el.animeStart = function (direction) {
            anime({
              targets: el,
              duration: params.duration || 600,
              delay: params.delay || 0,
              easing: params.easing || "easeInOutQuad",
              direction: params.direction,
              translateY: direction ? [300, 0] : 0,
              translateX: direction ? (direction === "next" ? [300, 0] : [-300, 0]) : 0,
              scale: direction ? [1.7, 1] : 1,
            });
          };
        },
        swiperSlideZoomIn: function () {
          el.animeReset = function () {
            this.style.transform = "none";
          };
          el.animeStart = function (direction) {
            anime({
              targets: el,
              duration: params.duration || 600,
              delay: params.delay || 0,
              easing: params.easing || "easeInQuad",
              direction: params.direction,
              scale: direction ? [0.7, 1.7] : { value: 1.7, duration: 0 },
            });
          };
        },
      };

      if (!preset[params.animation]) console.warn("Unknown anime on:", el, "This will cause further errors.");
      else preset[params.animation]();
    }

    /**
     * @desc Anime.js animations for swiper events
     * @param {object} swiper - swiper instance
     */
    function initSwiperAnime(swiper) {
      // Anime parameters
      swiper.params.anime = {
        animationEvent: "TransitionStart", // TransitionStart|TransitionEnd
      };

      // Variable "wrappers" required for separated captions
      var wrappers = swiper.$el[0].querySelectorAll(".swiper-wrapper");

      for (var w = 0; w < wrappers.length; w++) {
        var wrapper = wrappers[w];

        // Initialize Anime
        var nodeList = wrapper.querySelectorAll("[data-swiper-anime]");
        for (var i = 0; i < nodeList.length; i++) {
          var el = nodeList[i];
          bindAnimePreset(el, JSON.parse(el.getAttribute("data-swiper-anime")));
        }

        // First play active slide
        nodeList = wrapper.children[swiper.activeIndex].querySelectorAll("[data-swiper-anime]");
        for (var i = 0; i < nodeList.length; i++) if (nodeList[i].animeStart) nodeList[i].animeStart();

        swiper.on(
          "slideNext" + swiper.params.anime.animationEvent,
          (function (wrapper) {
            return function () {
              var nodeList = wrapper.children[swiper.activeIndex].querySelectorAll("[data-swiper-anime]");
              for (var i = 0; i < nodeList.length; i++) if (nodeList[i].animeStart) nodeList[i].animeStart("next");
            };
          })(wrapper)
        );

        swiper.on(
          "slidePrev" + swiper.params.anime.animationEvent,
          (function (wrapper) {
            return function () {
              var nodeList = wrapper.children[swiper.activeIndex].querySelectorAll("[data-swiper-anime]");
              for (var i = 0; i < nodeList.length; i++) if (nodeList[i].animeStart) nodeList[i].animeStart("prev");
            };
          })(wrapper)
        );

        swiper.on(
          "slideNextTransitionStart",
          (function (wrapper) {
            return function () {
              var nodeList;
              if (typeof swiper.realPrevious === "number" && swiper.previousIndex !== swiper.realPrevious) {
                nodeList = wrapper.children[swiper.realPrevious].querySelectorAll("[data-swiper-anime]");
                for (var i = 0; i < nodeList.length; i++) if (nodeList[i].animeOut) nodeList[i].animeOut("next");
              }
              nodeList = wrapper.children[swiper.previousIndex].querySelectorAll("[data-swiper-anime]");
              for (var i = 0; i < nodeList.length; i++) if (nodeList[i].animeOut) nodeList[i].animeOut("next");
            };
          })(wrapper)
        );

        swiper.on(
          "slidePrevTransitionStart",
          (function (wrapper) {
            return function () {
              var nodeList;
              if (typeof swiper.realPrevious === "number" && swiper.previousIndex !== swiper.realPrevious) {
                nodeList = wrapper.children[swiper.realPrevious].querySelectorAll("[data-swiper-anime]");
                for (var i = 0; i < nodeList.length; i++) if (nodeList[i].animeOut) nodeList[i].animeOut("prev");
              }
              nodeList = wrapper.children[swiper.previousIndex].querySelectorAll("[data-swiper-anime]");
              for (var i = 0; i < nodeList.length; i++) if (nodeList[i].animeOut) nodeList[i].animeOut("prev");
            };
          })(wrapper)
        );

        if (swiper.params.anime.animationEvent === "TransitionEnd") {
          swiper.on(
            "slideChangeTransitionStart",
            (function (wrapper) {
              return function () {
                var nodeList = wrapper.children[swiper.activeIndex].querySelectorAll("[data-swiper-anime]");
                for (var i = 0; i < nodeList.length; i++) if (nodeList[i].animeReset) nodeList[i].animeReset();
              };
            })(wrapper)
          );
        }
      }
    }

    /**
     * @desc Animate captions on active slides
     * @param {object} swiper - swiper instance
     */
    function initCaptionAnimate(swiper) {
      var animate = function (caption) {
          return function () {
            var duration;
            if ((duration = caption.getAttribute("data-caption-duration"))) caption.style.animationDuration = duration + "ms";
            caption.classList.remove("not-animated");
            caption.classList.add(caption.getAttribute("data-caption-animate"));
            caption.classList.add("animated");
          };
        },
        initializeAnimation = function (captions) {
          for (var i = 0; i < captions.length; i++) {
            var caption = captions[i];
            caption.classList.remove("animated");
            caption.classList.remove(caption.getAttribute("data-caption-animate"));
            caption.classList.add("not-animated");
          }
        },
        finalizeAnimation = function (captions) {
          for (var i = 0; i < captions.length; i++) {
            var caption = captions[i];
            if (caption.getAttribute("data-caption-delay")) {
              setTimeout(animate(caption), Number(caption.getAttribute("data-caption-delay")));
            } else {
              animate(caption)();
            }
          }
        };

      // Caption parameters
      swiper.params.caption = {
        animationEvent: "slideChangeTransitionEnd",
      };

      initializeAnimation(swiper.$wrapperEl[0].querySelectorAll("[data-caption-animate]"));
      finalizeAnimation(swiper.$wrapperEl[0].children[swiper.activeIndex].querySelectorAll("[data-caption-animate]"));

      if (swiper.params.caption.animationEvent === "slideChangeTransitionEnd") {
        swiper.on(swiper.params.caption.animationEvent, function () {
          initializeAnimation(swiper.$wrapperEl[0].children[swiper.previousIndex].querySelectorAll("[data-caption-animate]"));
          finalizeAnimation(swiper.$wrapperEl[0].children[swiper.activeIndex].querySelectorAll("[data-caption-animate]"));
        });
      } else {
        swiper.on("slideChangeTransitionEnd", function () {
          initializeAnimation(swiper.$wrapperEl[0].children[swiper.previousIndex].querySelectorAll("[data-caption-animate]"));
        });

        swiper.on(swiper.params.caption.animationEvent, function () {
          finalizeAnimation(swiper.$wrapperEl[0].children[swiper.activeIndex].querySelectorAll("[data-caption-animate]"));
        });
      }
    }

    /**
     * makeWaypointScroll
     * @description  init smooth anchor animations
     */
    function makeWaypointScroll(obj) {
      var $this = $(obj);
      if (!isNoviBuilder) {
        $this.on("click", function (e) {
          e.preventDefault();
          $("body, html")
            .stop()
            .animate(
              {
                scrollTop: $("#" + $(this).attr("data-custom-scroll-to")).offset().top,
              },
              1000,
              function () {
                $window.trigger("resize");
              }
            );
        });
      }
    }




    /**
     * Is Mac os
     * @description  add additional class on html if mac os.
     */
    if (navigator.platform.match(/(Mac)/i)) $html.addClass("mac-os");

    /**
     * Is Firefox
     * @description  add additional class on html if mac os.
     */
    if (isFirefox) $html.addClass("firefox");

    /**
     * IE Polyfills
     * @description  Adds some loosing functionality to IE browsers
     */
    if (isIE) {
      if (isIE < 10) {
        $html.addClass("lt-ie-10");
      }

      if (isIE < 11) {
      }

      if (isIE === 11) {
        $("html").addClass("ie-11");
      }

      if (isIE === 12) {
        $("html").addClass("ie-edge");
      }
    }




    /**
     * UI To Top
     * @description Enables ToTop Button
     */
    if (isDesktop ) {
      $().UItoTop({
        easingType: "easeOutQuart",
        containerClass: "ui-to-top",
      });
    }

    /**
     * RD Navbar
     * @description Enables RD Navbar plugin
     */
    if (plugins.rdNavbar.length) {
      var aliaces, i, j, len, value, values, responsiveNavbar;

      aliaces = ["-", "-sm-", "-md-", "-lg-", "-xl-", "-xxl-"];
      values = [0, 576, 768, 992, 1200, 1600];
      responsiveNavbar = {};

      for (i = j = 0, len = values.length; j < len; i = ++j) {
        value = values[i];
        if (!responsiveNavbar[values[i]]) {
          responsiveNavbar[values[i]] = {};
        }
        if (plugins.rdNavbar.attr("data" + aliaces[i] + "layout")) {
          responsiveNavbar[values[i]].layout = plugins.rdNavbar.attr("data" + aliaces[i] + "layout");
        }
        if (plugins.rdNavbar.attr("data" + aliaces[i] + "device-layout")) {
          responsiveNavbar[values[i]]["deviceLayout"] = plugins.rdNavbar.attr("data" + aliaces[i] + "device-layout");
        }
        if (plugins.rdNavbar.attr("data" + aliaces[i] + "hover-on")) {
          responsiveNavbar[values[i]]["focusOnHover"] = plugins.rdNavbar.attr("data" + aliaces[i] + "hover-on") === "true";
        }
        if (plugins.rdNavbar.attr("data" + aliaces[i] + "auto-height")) {
          responsiveNavbar[values[i]]["autoHeight"] = plugins.rdNavbar.attr("data" + aliaces[i] + "auto-height") === "true";
        }
        if (plugins.rdNavbar.attr("data" + aliaces[i] + "stick-up")) {
          responsiveNavbar[values[i]]["stickUp"] = isNoviBuilder ? false : plugins.rdNavbar.attr("data" + aliaces[i] + "stick-up") === "true";
        }
        if (plugins.rdNavbar.attr("data" + aliaces[i] + "stick-up-offset")) {
          responsiveNavbar[values[i]]["stickUpOffset"] = plugins.rdNavbar.attr("data" + aliaces[i] + "stick-up-offset");
        }
      }

      plugins.rdNavbar.RDNavbar({
        anchorNav: !isNoviBuilder,
        stickUpClone: plugins.rdNavbar.attr("data-stick-up-clone") && !isNoviBuilder ? plugins.rdNavbar.attr("data-stick-up-clone") === "true" : false,
        responsive: responsiveNavbar,
       
      });

      if (plugins.rdNavbar.attr("data-body-class")) {
        document.body.className += " " + plugins.rdNavbar.attr("data-body-class");
      }
    }

    /**
     * Swiper
     * @description  Enable Swiper Slider
     */
    if (plugins.swiper) {
      for (var i = 0; i < plugins.swiper.length; i++) {
        var sliderMarkup = plugins.swiper[i],
          swiper,
          swiperSlide = $(sliderMarkup).find(".swiper-slide"),
          options = {
            loop: sliderMarkup.getAttribute("data-loop") === "true" || false,
            effect: isIE || !isDesktop ? "slide" : sliderMarkup.getAttribute("data-effect") || "fade",
            direction: sliderMarkup.getAttribute("data-direction") || "horizontal",
            speed: sliderMarkup.getAttribute("data-speed") ? Number(sliderMarkup.getAttribute("data-speed")) : 1200,
            allowTouchMove: false,
            preventIntercationOnTransition: true,
            runCallbacksOnInit: false,
            separateCaptions: sliderMarkup.getAttribute("data-separate-captions") === "true" || false,
          };

        for (j = 0; j < swiperSlide.length; j++) {
          var $this = $(swiperSlide[j]),
            url;

          if ((url = $this.attr("data-slide-bg"))) {
            $this.css({
              "background-image": "url(" + url + ")",
              "background-size": "cover",
            });
          }
        }

        if (sliderMarkup.getAttribute("data-autoplay")) {
          options.autoplay = {
            delay: Number(sliderMarkup.getAttribute("data-autoplay")) || 6000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
            reverseDirection: false,
          };
        }

        if (sliderMarkup.getAttribute("data-keyboard") === "true") {
          options.keyboard = {
            enabled: sliderMarkup.getAttribute("data-keyboard") === "true",
            onlyInViewport: true,
          };
        }

        if (sliderMarkup.getAttribute("data-mousewheel") === "true") {
          options.mousewheel = {
            releaseOnEdges: true,
            sensitivity: 0.1,
          };
        }

        if (sliderMarkup.querySelector(".swiper-button-next, .swiper-button-prev")) {
          options.navigation = {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          };
        }

        if (sliderMarkup.querySelector(".swiper-pagination")) {
          options.pagination = {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
          };
        }

        if (sliderMarkup.querySelector(".swiper-scrollbar")) {
          options.scrollbar = {
            el: ".swiper-scrollbar",
            hide: true,
            draggable: true,
          };
        }

        options.on = {
          init: function () {
            setRealPrevious(this);
            switch (options.effect) {
              case "circle-bg":
                initCircleBg(this);
                break;
              case "frame-rect-serial":
                initFrameRectSerial(this);
                break;
              case "frame-trapeze":
                initFrameTrapeze(this);
                break;
              case "frame-slash":
                initFrameSlash(this);
                break;
              case "frame-random":
                initFrameRandom(this);
                break;
              case "cropping-circle":
                initCroppingCircle(this);
                break;
            }
            initSwiperAnime(this);
            initCaptionAnimate(this);
            toggleSwiperInnerVideos(this);

            // Real Previous Index must be set recent
            this.on("slideChangeTransitionEnd", function () {
              setRealPrevious(this);
            });
          },
          transitionStart: function () {
            toggleSwiperInnerVideos(this);
          },
        };

        swiper = new Swiper(plugins.swiper[i], options);
      }
    }

    /**
     * Isotope
     * @description Enables Isotope plugin
     */
    // Isotope
    if (plugins.isotope.length) {
      var isogroup = [];
      for (var i = 0; i < plugins.isotope.length; i++) {
        var isotopeItem = plugins.isotope[i],
          isotopeInitAttrs = {
            itemSelector: ".isotope-item",
            layoutMode: isotopeItem.getAttribute("data-isotope-layout") ? isotopeItem.getAttribute("data-isotope-layout") : "masonry",
            filter: "*",
          };

        var iso = new Isotope(isotopeItem, isotopeInitAttrs);
        isotopeItem.isotope = iso;
        isogroup.push(iso);
      }

      $("[data-isotope-filter]")
        .on("click", function (e) {
          e.preventDefault();
          var filter = $(this);

          filter.parents(".isotope-filters").find(".active").removeClass("active");
          filter.addClass("active");
          var iso = $('.isotope[data-isotope-group="' + this.getAttribute("data-isotope-group") + '"]'),
            isotopeAttrs = {
              itemSelector: ".isotope-item",
              layoutMode: iso.attr("data-isotope-layout") ? iso.attr("data-isotope-layout") : "masonry",
              filter: this.getAttribute("data-isotope-filter") === "*" ? "*" : '[data-filter*="' + this.getAttribute("data-isotope-filter") + '"]',
            };

          iso.isotope(isotopeAttrs);
        })
        .eq(0)
        .trigger("click");
    }

    /**
     * WOW
     * @description Enables Wow animation plugin
     */
    if ($html.hasClass("wow-animation") && plugins.wow.length && !isNoviBuilder && isDesktop) {
      new WOW().init();
    }



    /**
     * Linear Progress bar
     * @description  Enable progress bar
     */
    if (plugins.progressLinear.length) {
      for (i = 0; i < plugins.progressLinear.length; i++) {
        var progressBar = $(plugins.progressLinear[i]);
        $window.on(
          "scroll load",
          $.proxy(function () {
            var bar = $(this);
            if (!bar.hasClass("animated-first") && isScrolledIntoView(bar)) {
              var end = parseInt($(this).find(".progress-value").text(), 10);
              bar.find(".progress-bar-linear").css({ width: end + "%" });
              bar.find(".progress-value").countTo({
                refreshInterval: 40,
                from: 0,
                to: end,
                speed: 500,
              });
              bar.addClass("animated-first");
            }
          }, progressBar)
        );
      }
    }


    /**
     * Bootstrap collapse
     *
     */
    var bootstrapCollapse = $(".calendar-box-list-view");
    bootstrapCollapse.collapse({
      toggle: false,
    });

    $("body").on("click", bootstrapCollapse, function (e) {
      bootstrapCollapse.collapse("hide");
    });

 

    /**
     * Material Parallax
     * @description Enables Material Parallax plugin
     */
    if (plugins.materialParallax.length) {
      if (!isNoviBuilder && !isIE && !isMobile) {
        plugins.materialParallax.parallax();
      } else {
        for (var i = 0; i < plugins.materialParallax.length; i++) {
          var parallax = $(plugins.materialParallax[i]),
            imgPath = parallax.data("parallax-img");

          parallax.css({
            "width": "1942px",
            "height": "765px",
            "background-image": "url(" + imgPath + ")",
            "background-size": "cover",
          });
        }
      }
    }

    /**
     * parallax scroll function
     */
    if ($("[data-parallax-scroll]").length && !isNoviBuilder && !isMobile) {
      ParallaxScroll.init();
    }
  });
})();
