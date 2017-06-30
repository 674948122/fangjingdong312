;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-zuo" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M269.345448 512.352017c1.774413 1.213641 2.997264 1.816369 3.929496 2.718925 140.233881 135.802966 280.447297 271.628444 420.661735 407.452899 8.241708 7.983835 16.607236 15.845896 24.685215 23.99346 9.066493 9.145287 11.383258 20.107967 6.769171 32.042787-7.122211 18.418488-30.40959 24.303522-45.725414 11.833513-1.327228-1.080611-2.559289-2.281973-3.789303-3.474125C520.407484 836.325643 364.947829 685.7226 209.457476 535.151279c-4.444219-4.304026-8.259104-8.954953-9.807367-15.026228-2.829442-11.091616-0.442068-20.966521 7.732102-29.104875 8.691963-8.654101 17.585517-17.105586 26.396183-25.63996C381.188722 322.582953 528.60519 179.790806 675.985842 36.962843c5.281283-5.117554 11.181667-8.628518 18.560728-9.68764 15.994276-2.296299 31.725562 10.293437 32.891108 26.409486 0.725524 10.029424-2.835581 18.194384-10.026354 25.142633-44.00933 42.528606-87.946005 85.133959-131.904169 127.715777C481.5812 307.216987 377.655246 407.891897 273.722128 508.558621 272.682449 509.565555 271.535323 510.459924 269.345448 512.352017z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)