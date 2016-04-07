module.exports = function (version, useOptionPage) {
  var manifest = {
    name: '__MSG_extName__',
    version: version,
    manifest_version: 2,
    description: '__MSG_extDescription__',
    default_locale: 'en',
    icons: {
      '16': 'images/icon-16.png',
      '128': 'images/icon-128.png'
    },
    permissions: [
      'storage',
      'activeTab',
      'http://*/*',
      'https://*/*'
    ],
    background: {
      persistent: false,
      page: 'background.html'
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
      default_title: '__MSG_browserActionTitle__',
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
