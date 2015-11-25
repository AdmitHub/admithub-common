Package.describe({
  name: "admithub:admithub-common",
  summary: "Common styles, templates, and libraries for AdmitHub sites",
  version: "0.1.1",
  git: "https://github.com/AdmitHub/admithub-common.git"
});

Npm.depends({
  'zipcodes': '1.1.1',
  'twilio': '2.1.0',
  'fuzzy': '0.1.1'
});

Package.onUse(function(api) {

  api.use([
    'accounts-base',
    'stylus',
    'templating',
    'underscore',

    'admithub:dot-get@1.0.0',
    'aldeed:simple-schema@1.3.3',
    'aldeed:collection2@2.5.0',
    'aldeed:autoform@5.5.1',
    'matb33:collection-hooks@0.8.0',
    'meteorhacks:npm'
  ]);

  api.addFiles('lib/ui.js', 'client');

  api.addFiles('lib/_fields.js');
  api.addFiles('lib/helpers.js');
  api.addFiles('lib/simpleSchema.js');
  api.addFiles('collections/ceebCodes.js');
  api.addFiles('collections/collegeevents.js');
  api.addFiles('collections/collegeOfficers.js');
  api.addFiles('collections/colleges.js');
  api.addFiles('collections/highschools.js');
  api.addFiles('collections/leads.js');
  api.addFiles('collections/matches.js');
  api.addFiles('collections/pendingEventReports.js');
  api.addFiles('collections/posts.js');
  api.addFiles('collections/profile.js');
  api.addFiles('collections/smslogs.js');
  api.addFiles('collections/sponsors.js');
  api.addFiles('collections/testimonials.js');
  api.addFiles('collections/users.js');
  api.addFiles('collections/highschoolConversations.js');
  api.addFiles('collections/recentlyAsked.js');

  api.addFiles('server/collegesInMemory.js', 'server');
  api.addFiles('server/indexes.js', 'server');
  api.addFiles('server/methods.js', 'server');
  api.addFiles('server/oli.js', 'server');

  api.export([
    'CeebCodes',
    'CollegeEvents',
    'CollegeProfiles',
    'CollegeProfileSchema',
    'collegeProfileCountAnsweredQuestions',
    'CollegeOfficers',
    'CollegesInMemory',
    'CollegeSchema',
    'Colleges',
    'fields',
    'formatPhone',
    'HighschoolConversations',
    'Highschools',
    'Leads',
    'Matches',
    'Oli',
    'PendingEventReports',
    'Posts',
    'quoteRe',
    'RecentlyAsked',
    'slugify', 'unslugify',
    'SmsLogs',
    'Sponsors',
    'Testimonials',
    'UserSchema',
    'yesOrNo',
  ]);
});
