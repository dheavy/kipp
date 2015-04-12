function onMessage(request, sender, sendResponse) {
  if (request.sendOnMission === true) {

    $(document).ready(function () {

      var version = '0.3.0';

      // State control.
      var isKippActive = false,
          hasBuiltUI = false,
          hasFoundSomething = false;

      // jQuery-wrapped elements used by the app.
      var $window = null,
          $body = null,
          $spinner = null,
          $overlay = null,
          $container = null,
          $thumbnails = null,
          $collector = null,
          $closeBtn = null;

      // Store old CSS values we'll be changing along the way.
      var oldBodyOverflowValue = '',
          oldBodyPosition = '',
          oldBodyWidth = '',
          oldBodyHeight = '';

      // Counter incremented on each created thumbnail, used to create IDs.
      var uiIndex = 0;

      // Stores buttons listening for events to unbind them on garbage collection.
      var eventListeningButtons = [];

      // Root URL for CASE, the website.
      var CASE = window.location.href.indexOf('localhost') != -1 ? 'https://mypleasure.local' : 'https://still-mountain-6425.herokuapp.com';

      function sendOnMission() {
        if (isKippActive) return;

        if ($window === null) {
          $window = $(window);
        }

        if ($body === null) {
          $body = $('body');
        }

        isKippActive = true;
        showExtensionLoader();
        start();
      }

      function showExtensionLoader() {
        if ($spinner === null) {
          $spinner = $('<div style="position:absolute;text-align:center;display:block;top:50%;left:50%;width:42px;height:42px;margin-left:-20px;margin-right:-20px;position:absolute;background:black;border:1px solid white;-webkit-border-radius:30px;-moz-border-radius:30px;-ms-border-radius:30px;border-radius:30px;" title="0"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"><path opacity="0.4" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/><path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/></path></svg></div>');
        }

        $body.append($spinner);
      }

      function hideExtensionLoader() {
        if ($spinner) {
          $spinner.fadeOut('slow', function () {
            $spinner.remove();
          });
        }
      }

      function start() {
        console.log('[KIPP] Start.');
        findPatterns();
        hideExtensionLoader();
      }

      function buildUI(addTnContainer) {
        console.log('[KIPP] Build UI.');

        addTnContainer = addTnContainer ? addTnContainer : true;

        // Singleton.
        if (hasBuiltUI) return;
        hasBuiltUI = true;

        // Endow body with version number.
        // Store body's original value for 'overflow' and apply a new one.
        $body = $('body');
        $body.attr('data-mypleasure-extension-installed', version);
        oldBodyOverflowValue = $body.css('overflow');
        oldBodyPosition = $body.css('position');
        oldBodyWidth = $body.css('width');
        oldBodyHeight = $body.css('height');
        $body.css({
          'overflow': 'hidden',
          'position': 'fixed',
          'width': '100%',
          'height': '100%'
        });

        // Build main container.
        $container = $('<div id="mp-kipp"></div>');
        $body.append($container);

        // Determine maximum z-index to apply it to the container.
        var maxZ = Math.max.apply(null, $.map($('body > *'), function apply(e) {
              var $e = $(e);
              if ($e.css('position') == 'absolute') {
                return parseInt($e.css('z-index')) || 1;
              }
            }));
        $container.css('z-index', maxZ);

        // Add overlay. Ensure it fits and remains so.
        $overlay = $('<div class="mp-kipp-overlay"></div>');
        $container.append($overlay);
        $window.on('resize', resizeOverlay);

        // Thumbnails container.
        if (addTnContainer) {
          $thumbnails = $('<div class="mp-kipp-tn-container"></div>');
          $container.append($thumbnails);
        }

        // Container for final input, where user effectively connects a video.
        $collector = $('<div class="mp-kipp-finalize-container"></div>');
        $container.append($collector);

        // Close button.
        $closeBtn = $('<a href="#" class="mp-kipp-close-btn">&times;</a>');
        $closeBtn.on('touchstart click', close);
        $container.append($closeBtn);
      }

      function nextCase() {

      }

      function findPatterns() {
        console.log('[KIPP] Find patterns.');

        // Loop through all patterns from defined sites.
        if (sites && sites.length > 0) {
          _.each(sites, function (pattern) {
            console.log('[KIPP] - ' + pattern.name);

            // If current location matches a pattern, it's a go.
            var cases = pattern.cases;
            _.each(cases, function (c) {
              if (c.urlPattern.test(window.location) && c.direct) {
                console.log('[KIPP] --- found!');
                hideExtensionLoader();
                hasFoundSomething = true;
                finalize(window.location);
                return false;
              }

              // Otherwise, try looking for it in the DOM.
              if (!hasFoundSomething) {
                searchDOM(pattern.name, c);
              }
            });
          });
        }
      };

      function searchDOM(name, searchCase) {
        if (hasFoundSomething) return;

        console.log("[KIPP] -- search DOM for " + name + " with selector '" + searchCase.selector + "'.");

        var $search = $(searchCase.selector);

        if ($search.length > 0) {
          hasFoundSomething = true;
          _.each($search, function (elm) {
            scrapeElement(elm, searchCase.urlGenerator, searchCase.thumbsStrategy, uiIndex);
            uiIndex++;
          });
        }

        return this;
      }

      function scrapeElement(element, urlGenerator, thumbsStrategy, index) {
        console.log('[KIPP] Scraping element.');

        // Build UI, if needed.
        if (!hasBuiltUI) {
          buildUI();
        }

        // Create UI for the element.
        var id = 'mp-kipp-elm-' + index,
            $element = $(element),
            $elementContainer = $('<div class="mp-kipp-elm" id="' + id + '"></div>'),
            $addBtn = $('<a href="#" class="mp-kipp-add-btn" rel="' + id + '">Ajouter cette vidéo</a>');

        // Append to the view container.
        $thumbnails.append($elementContainer);
        thumbsStrategy($element, $elementContainer);
        $elementContainer.append($addBtn);

        // Adjust the layout.
        $('iframe', $elementContainer).attr('width', 400).attr('height', 'auto');

        // Add and prepare button for collecting video.
        $addBtn.on('click', { urlGenerator: urlGenerator }, onAdd);

        // Add button to a list of element listing to events.
        // We'll unbind all events from elements in the list when we close the bookmarklet.
        eventListeningButtons.push($addBtn);
      }

      function finalize(url) {
        // Unbind obsolete event listeners.
        _.each(eventListeningButtons, function (b) {
          $(b).unbind();
        });

        // Require popup.
        chrome.runtime.sendMessage({
          action: 'finalize',
          url: CASE + '/me/videos/create?u=' + url
        });

        close();
      }

      function resizeOverlay() {
        if ($window && $overlay) {
          $overlay.width($window.width());
          $overlay.height($window.height());
        }
      }

      function onAdd(e) {
        var embedURL = $('iframe', $('#' + e.target.rel)).attr('src'),
          urlGenerator = e.data.urlGenerator,
          url = urlGenerator(embedURL);


        finalize(url);
      }

      function close() {
        console.log('[KIPP] Stop.');

        hideExtensionLoader();

        $window.off('resize', resizeOverlay);

        $body.css('overflow', oldBodyOverflowValue);
        $body.css('position', oldBodyPosition);
        $body.css('width', oldBodyWidth);
        $body.css('height', oldBodyHeight);

        // Free jQuery objects from memory.
        $body = null;

        if ($closeBtn) {
          $closeBtn.off('touchstart click', close);
          $closeBtn.remove();
          $closeBtn = null;
        }

        if ($collector) {
          $collector.remove();
          $collector = null;
        }

        if ($thumbnails) {
          $thumbnails.remove();
          $thumbnails = null;
        }

        if ($overlay) {
          $overlay.remove();
          $overlay = null;
        }

        if ($container) {
          $container.remove();
          $container = null
        }

        // Reset flags.
        hasBuiltUI = false;
        isActive = false;
        hasFoundSomething = false;
      }

      function fail() {
        alert("[mypleasu.re] Je n'arrive pas à trouver de vidéo sur cette page ! Désolé !");
        close();
      }

      sendOnMission();
      sendResponse({ result: '[mypleasu.re] This is KIPP Acknowleged. Mission is GO.' });

    });
  }
}

chrome.runtime.onMessage.addListener(onMessage);