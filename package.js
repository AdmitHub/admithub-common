Package.describe({
  name: "admithub:admithub-common",
  summary: "Common styles, templates, and libraries for AdmitHub sites",
  version: "0.0.7",
  git: "https://github.com/AdmitHub/admithub-common.git"
});

Npm.depends({
  'zipcodes': '1.1.1'
});

Package.onUse(function(api) {

  api.use([
    'accounts-base',
    'stylus',
    'templating',
    'underscore',

    'aldeed:simple-schema@1.3.3',
    'aldeed:collection2@2.5.0',
    'aldeed:autoform@5.5.1',
    'matb33:collection-hooks@0.8.0'
  ]);

  // begin styles
  api.addFiles('client/css/screen.styl', 'client');

  api.addFiles('client/css/common/variables.import.styl', 'client');
  api.addFiles('client/css/common/grid.import.styl', 'client');
  api.addFiles('client/css/common/base.import.styl', 'client');
  api.addFiles('client/css/common/type.import.styl', 'client');
  api.addFiles('client/css/common/layout.import.styl', 'client');
  api.addFiles('client/css/common/icons.import.styl', 'client');
  api.addFiles('client/css/common/mixin.import.styl', 'client');
  api.addFiles('client/css/common/override.import.styl', 'client');

  api.addFiles('client/css/common/position.import.styl', 'client');
  api.addFiles('client/css/common/zindex.import.styl', 'client');
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
  api.addFiles('client/css/modules/page.import.styl', 'client');
  api.addFiles('client/css/modules/tables.import.styl', 'client');
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
  api.addFiles('lib/simpleSchema.js');
  api.addFiles('collections/users.js');
  api.addFiles('collections/collegeOfficers.js');
  api.addFiles('collections/colleges.js');
  api.addFiles('collections/highschools.js');
  api.addFiles('collections/matches.js');
  api.addFiles('collections/profile.js');
  api.addFiles('collections/smslogs.js');
  api.addFiles('collections/smsvalidations.js');
  api.addFiles('collections/sponsors.js');
  api.addFiles('collections/testimonials.js');
  api.addFiles('collections/leads.js');
  api.addFiles('collections/collegeevents.js');
  api.addFiles('collections/posts.js');
  api.addFiles('collections/ceebCodes.js');
  api.addFiles('collections/pendingEventReports.js');
  api.addAssets('public/icons/fonts/icons.eot', 'client');
  api.addAssets('public/icons/fonts/icons.svg', 'client');
  api.addAssets('public/icons/fonts/icons.ttf', 'client');
  api.addAssets('public/icons/fonts/icons.woff', 'client');

  api.export([
    'fields',
    'slugify', 'unslugify',
    'dotGet', 'dotSet', 'dotClear', 'dotFlatten',
    'mongoReplacementModifier',
    'quoteRe',
    'yesOrNo',
    'formatPhone',
    'UserSchema',
    'CollegeSchema',
    'CollegeProfileSchema',
    'CollegeOfficers',
    'Colleges',
    'Highschools',
    'Matches',
    'CollegeProfiles',
    'SmsLogs',
    'SmsValidations',
    'CollegesInMemory',
    'collegeProfileCountAnsweredQuestions',
    'Sponsors',
    'Testimonials',
    'Leads',
    'CollegeEvents',
    'Posts',
    'CeebCodes',
    'PendingEventReports'
  ]);
});
