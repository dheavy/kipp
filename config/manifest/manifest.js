module.exports = function (name, title, description, version, useOptionPage) {
  var manifest = {
    name: name,
    version: version,
    manifest_version: 2,
    description: description,
    icons: {
      '16': 'images/icon-16.png',
      '128': 'images/icon-128.png'
    },
    permissions: [
      'activeTab',
      'http://*/*',
      'https://*/*'
    ],
    background: {
      persistent: false,
      scripts: ['js/event.js']
    },
    content_scripts: [
      {
        matches: [
          'http://*/*',
          'https://*/*'
        ],
        js: ['js/content.js'],
        run_at: 'document_end',
        all_frames: false
      }
    ],
    browser_action: {
      default_icon: {
        '19': 'images/icon-19.png',
        '38': 'images/icon-38.png'
      },
      default_title: title,
      default_popup: 'popup.html'
    }
  };

  if (useOptionPage) {
    manifest['options_ui'] = {
      page: 'options.html',
      chrome_style: true
    }
  }

  return JSON.stringify(manifest);
};
