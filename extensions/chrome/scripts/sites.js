var sites = [
  {
    name: 'youtube',

    // Youtube: all cases.
    cases: [
      {
        urlPattern: /www\.youtube\.com\/watch\?v=/,
        direct: true,
        selector: 'iframe[src*="youtube.com/embed"]',
        thumbsStrategy: function ($target, $container) {
          return $target.clone().appendTo($container);
        },
        urlGenerator: function (embedURL) {
          var id = embedURL.substring(embedURL.lastIndexOf('/') + 1);
          return 'https://www.youtube.com/watch?v=' + id;
        }
      }
    ]
  },

  {
    name: 'vimeo',

    // Vimeo: based on url.
    cases: [
      {
        urlPattern: /vimeo\.com\/(\d+)/,
        direct: true,
        selector: 'iframe[src*="player.vimeo.com/video/"]',
        thumbsStrategy: function ($target, $container) {
          return $target.clone().appendTo($container);
        },
        urlGenerator: function (embedURL) {
          var matches = /(\/)(\d+)/.exec(embedURL), id;
          if (matches[2]) {
            id = matches[2];
            return 'https://vimeo.com/' + id;
          }
        }
      },

      // Vimeo: listings of video (e.g. homepage).
      {
        urlPattern: /vimeo\.com(\/){0}(?! \d+)/gi,
        direct: false,
        selector: '.faux_player',
        thumbsStrategy: function ($target, $container) {
          var id = $target.attr('data-clip-id'),
              $iframe = $('<iframe src="https://player.vimeo.com/video/' + id + '?title=0&amp;byline=0&amp;portrait=0" width="400" height="auto" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" kwframeid="1"></iframe>');

          return $iframe.appendTo($container);
        },
        urlGenerator: function (embedURL) {
          var matches = /(\/)(\d+)/.exec(embedURL), id;
          if (matches[2]) {
            id = matches[2];
            return 'https://vimeo.com/' + id;
          }
        }
      },

      // Vimeo: hero video display.
      {
        urlPattern: /vimeo\.com/,
        direct: false,
        selector: '#video',
        thumbsStrategy: function($target, $container) {
          var id = $('.player_container', $target).attr('id').substr(5),
              $iframe = $('<iframe src="https://player.vimeo.com/video/' + id + '?title=0&amp;byline=0&amp;portrait=0" width="400" height="auto" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" kwframeid="1"></iframe>');

          return $iframe.appendTo($container);
        },
        urlGenerator: function(embedURL) {
          var matches = /(\/)(\d+)/.exec(embedURL), id;
          if (matches[2]) {
            id = matches[2];
            return 'https://vimeo.com/' + id;
          }
        }
      },

      // Vimeo: couchmode.
      {
        urlPattern: /vimeo\.com/,
        direct: false,
        selector: '#big_screen',
        thumbsStrategy: function($target, $container) {
          var videoSrc = $('video', $target).attr('src'),
              id = videoSrc.substring(videoSrc.indexOf('=') + 1, videoSrc.indexOf('_')),
              $iframe = $('<iframe src="https://player.vimeo.com/video/' + id + '?title=0&amp;byline=0&amp;portrait=0" width="400" height="auto" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" kwframeid="1"></iframe>');

          return $iframe.appendTo($container);
        },
        urlGenerator: function(embedURL) {
          var matches = /(\/)(\d+)/.exec(embedURL), id;
          if (matches[2]) {
            id = matches[2];
            return 'https://vimeo.com/' + id;
          }
        }
      }
    ]
  },
  {
    name: 'dailymotion',
    cases: [

      // Dailymotion: based on URL.
      {
        urlPattern: /dailymotion\.com\/video/,
        direct: true,
        selector: '#content.fluid[itemtype="http://schema.org/VideoObject"]',
        thumbsStrategy: function ($target, $container) {
          var link = $('link[itemprop="embedURL"]', $target).attr('href');
              id = link.substring(link.lastIndexOf('/') + 1),
              $iframe = $('<iframe frameborder="0" width="400" height="auto" src="//www.dailymotion.com/embed/video/' + id + '" allowfullscreen></iframe>');

          return $iframe.appendTo($container);
        },
        urlGenerator: function (embedURL) {
          return 'https://www.dailymotion.com/video/' + embedURL.substring(embedURL.lastIndexOf('/') + 1);
        }
      },

      {
        urlPattern: /dailymotion\.com/,
        direct: false,
        selector: 'iframe[src*="//www.dailymotion.com/embed/video"]',
        thumbsStrategy: function ($target, $container) {
          var $iframe = $('<iframe frameborder="0" width="400" height="auto" src="' + $target.attr('src') + '" allowfullscreen></iframe>');
          return $iframe.appendTo($container);
        },
        urlGenerator: function (embedURL) {
          return 'https://www.dailymotion.com/video/' + embedURL.substring(embedURL.lastIndexOf('/') + 1);
        }
      }
    ]
  }
];