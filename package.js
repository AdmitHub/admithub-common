Package.describe({
  name: 'admithub:admithub-common',
  summary: 'Common styles, templates, and libraries for AdmitHub sites',
  version: '0.1.2',
  git: 'https://github.com/AdmitHub/admithub-common.git'
})

Npm.depends({
  'aws-sdk': '2.125.0',
  'twilio': '2.1.0',
  'us-zcta-counties': '0.0.2',
  'zipcodes': '1.1.1'
});

Package.onUse(function (api) {
  api.use([
    'accounts-base',
    'stylus',
    'templating',
    'underscore',
    'ecmascript',
    'admithub:dot-get@1.0.0',
    'aldeed:simple-schema@1.3.3',
    'aldeed:collection2@2.5.0',
    'aldeed:autoform@5.5.1',
    'matb33:collection-hooks@0.8.0',
    'meteorhacks:npm'
  ])

  api.addFiles('lib/ui.js', 'client')

  api.addFiles('lib/_fields.js');
  api.addFiles('lib/helpers.js');
  api.addFiles('lib/simpleSchema.js');
  api.addFiles('collections/brandedApplicantConversations.js');
  api.addFiles('collections/brandedColleges.js');
  api.addFiles('collections/brandedCollegeApplicants.js');
  api.addFiles('collections/ceebCodes.js');
  api.addFiles('collections/collegeevents.js');
  api.addFiles('collections/collegeOfficers.js');
  api.addFiles('collections/colleges.js');
  api.addFiles('collections/dataWorkflows.js');
  api.addFiles('collections/heartbeat.js');
  api.addFiles('collections/highschools.js');
  api.addFiles('collections/leads.js');
  api.addFiles('collections/hsLeads.js');
  api.addFiles('collections/matches.js');
  api.addFiles('collections/pendingEventReports.js');
  api.addFiles('collections/posts.js');
  api.addFiles('collections/profile.js');
  api.addFiles('collections/smslogs.js');
  api.addFiles('collections/snapshots.js');
  api.addFiles('collections/sponsors.js');
  api.addFiles('collections/optOutEvents.js');
  api.addFiles('collections/testimonials.js');
  api.addFiles('collections/users.js');
  api.addFiles('collections/highschoolConversations.js');
  api.addFiles('collections/recentlyAsked.js');
  api.addFiles('collections/unverifiedEmailMessages.js');
  api.addFiles('collections/pendingOfficers.js');
  api.addFiles('collections/demoBotProfile.js');
  api.addFiles('collections/georgiaStateUsers.js');
  api.addFiles('collections/scheduledMessages.js');
  api.addFiles('collections/introducedMessages.js');
  api.addFiles('collections/messageTemplates.js');
  api.addFiles('collections/workflowScripts.js');
  api.addFiles('collections/workflows.js');
  api.addFiles('collections/twilioAccounts.js');
  api.addFiles('collections/brandedUserProfile.js');
  api.addFiles('collections/SavedQuery.js');
  api.addFiles('collections/CollegeUserDataFields.js');
  api.addFiles('collections/workflowResponses.js');
  api.addFiles('collections/smsAnalytics.js');
  api.addFiles('collections/smsHeatmapAnalytics.js');
  api.addFiles('collections/overallReachAnalytics.js');

  api.addFiles('server/collegesInMemory.js', 'server');
  api.addFiles('server/indexes.js', 'server');
  api.addFiles('server/methods.js', 'server');
  api.addFiles('server/neolith.js', 'server');


  api.export([
    'BrandedApplicantConversations',
    'BrandedColleges',
    'BrandedCollegeApplicants',
    'CeebCodes',
    'CollegeEvents',
    'CollegeProfiles',
    'DemoBotProfiles',
    'DemoBotProfileSchema',
    'CollegeProfileSchema',
    'collegeProfileCountAnsweredQuestions',
    'CollegeOfficers',
    'CollegesInMemory',
    'CollegeSchema',
    'Colleges',
    'Dialogs',
    'DialogStates',
    'fields',
    'formatPhone',
    'Heartbeats',
    'HighschoolConversations',
    'Highschools',
    'Leads',
    'HsLeads',
    'Matches',
    'Oli',
    'Neolith',
    'PendingEventReports',
    'TelescopePosts',
    'quoteRe',
    'RecentlyAsked',
    'slugify', 'unslugify',
    'SmsLogs',
    'Snapshots',
    'Sponsors',
    'SavedQuery',
    'CollegeUserDataFields',
    'Testimonials',
    'UnverifiedEmailMessages',
    'PendingOfficers',
    'UserSchema',
    'yesOrNo',
    'GeorgiaStateUsers',
    'ScheduledMessages',
    'IntroducedMessages',
    'Workflows',
    'MessageTemplates',
    'WorkflowScripts',
    'TwilioAccounts',
    'BrandedUserProfiles',
    'WorkflowResponses',
    'SmsHeatmapAnalytics',
    'SmsAnalytics',
    'OverallReachAnalytics'
  ]);
});
