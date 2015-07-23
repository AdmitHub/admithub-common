Sponsors = new Mongo.Collection("sponsors");
Sponsors.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
    optional: false
  },
  image_url: {
    type: String,
    label: 'Image URL',
    optional: false
  },
  url: {
    type: String,
    label: 'URL',
    optional: false
  },
  description: {
    type: String,
    label: 'Description',
    optional: true
  },
  visible_on: {
    type: [String],
    label: 'Visible on',
    autoform: {
      multiple: true,
      options: ['www.admithub.com', 'college.admithub.com']
    }
  }
}));