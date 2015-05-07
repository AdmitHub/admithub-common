Package.describe({
  name: "admithub:admithub-common",
  summary: "Common styles, templates, and libraries for AdmitHub sites",
  version: "0.0.6",
  git: "https://github.com/AdmitHub/admithub-common.git"
});

Package.onUse(function(api) {

  api.use([
    'accounts-base',
    'stylus',
    'templating',
    'underscore',

    'aldeed:simple-schema',
    'aldeed:collection2'
  ]);

  // begin styles
  api.addFiles('client/css/screen.styl', 'client');

  api.addFiles('client/css/mixins/mod.import.styl', 'client');
  api.addFiles('client/css/mixins/ui.import.styl', 'client');
  api.addFiles('client/css/mixins/type.import.styl', 'client');
  api.addFiles('client/css/mixins/common.import.styl', 'client');

  api.addFiles('client/css/common/base.import.styl', 'client');
  api.addFiles('client/css/common/variables.import.styl', 'client');
  api.addFiles('client/css/common/override.import.styl', 'client');

  api.addFiles('client/css/common/type.import.styl', 'client');
  api.addFiles('client/css/common/layout.import.styl', 'client');
  api.addFiles('client/css/common/position.import.styl', 'client');
  api.addFiles('client/css/common/grid.import.styl', 'client');
  api.addFiles('client/css/common/zindex.import.styl', 'client');
  api.addFiles('client/css/common/icons.import.styl', 'client');
  api.addFiles('client/css/common/ui.import.styl', 'client');
  api.addFiles('client/css/common/ui-form.import.styl', 'client');
  api.addFiles('client/css/common/markdown.import.styl', 'client');
  api.addFiles('client/css/common/tables.import.styl', 'client');
  api.addFiles('client/css/common/link.import.styl', 'client');
  api.addFiles('client/css/common/space.import.styl', 'client');
  api.addFiles('client/css/common/no.import.styl', 'client');
  api.addFiles('client/css/common/sidebar.import.styl', 'client');
  api.addFiles('client/css/common/responsive.import.styl', 'client');

  api.addFiles('client/css/modules/section.import.styl', 'client');
  api.addFiles('client/css/modules/hero.import.styl', 'client');
  api.addFiles('client/css/modules/dropdown.import.styl', 'client');
  api.addFiles('client/css/modules/markdown.import.styl', 'client');
  api.addFiles('client/css/modules/alerts.import.styl', 'client');
  api.addFiles('client/css/modules/progress-bar.import.styl', 'client');
  api.addFiles('client/css/modules/common.import.styl', 'client');

  api.addFiles('client/css/global/header.import.styl', 'client');
  api.addFiles('client/css/global/footer.import.styl', 'client');
  api.addFiles('client/css/global/content.import.styl', 'client');

  api.addFiles('client/css/pages/sign-in.import.styl', 'client');
  api.addFiles('client/css/pages/bot.import.styl', 'client');
  // end styles
  
  api.addFiles('lib/_fields.js', ['client', 'server']);
  api.addFiles('lib/helpers.js', ['client', 'server']);
  api.addFiles('lib/ui.js', ['client']);
  api.addFiles('collections/users.js');

  api.addFiles('public/icons/fonts/icons.eot');
  api.addFiles('public/icons/fonts/icons.svg');
  api.addFiles('public/icons/fonts/icons.ttf');
  api.addFiles('public/icons/fonts/icons.woff');
  
  api.export([
    'fields',
    'slugify', 'unslugify',
    'dotGet', 'dotSet', 'dotClear', 'dotFlatten',
    'mongoReplacementModifier',
    'quoteRe',
    'yesOrNo',
    'formatPhone',

    'UserSchema'
  ]);
});
