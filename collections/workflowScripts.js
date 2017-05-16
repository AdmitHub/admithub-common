WorkflowScripts = new Mongo.Collection('workflowScripts')
WorkflowScripts.attachSchema(new SimpleSchema({
  workflow: {type: String},
  scripts: {type: [
    new SimpleSchema({
      name: {type: String},
      description: {type: String},
      exchanges: {
        type: [new SimpleSchema({
          step: {type: String},
          response: {type: String, optional: true}
        })]
      }
    })
  ]},
  description: {type: String}
}))
