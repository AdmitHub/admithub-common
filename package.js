Package.describe({
  name: "admithub:admithub-common",
  summary: "Common styles, templates, and libraries for AdmitHub sites",
  version: "0.0.6",
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

    'aldeed:simple-schema',
    'aldeed:collection2',
    'aldeed:autoform',
    'matb33:collection-hooks'
  ]);

  api.addFiles('lib/_fields.js', ['client', 'server']);
  api.addFiles('lib/helpers.js', ['client', 'server']);
  api.addFiles('lib/ui.js', ['client']);
  api.addFiles('lib/simpleSchema.js');
  api.addFiles('collections/users.js');
  api.addFiles('collections/collegeOfficers.js');
  api.addFiles('collections/colleges.js');
  api.addFiles('collections/collegeEvents.js');
  api.addFiles('collections/highschools.js');
  api.addFiles('collections/matches.js');
  api.addFiles('collections/profile.js');
  api.addFiles('collections/smslogs.js');
  api.addFiles('collections/smsvalidations.js');
  api.addFiles('collections/sponsors.js');
  api.addFiles('collections/testimonials.js');
  api.addFiles('collections/leads.js');
  api.addFiles('collections/posts.js');
  api.addFiles('collections/ceebCodes.js');
  api.addFiles('collections/pendingEventReports.js');

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
