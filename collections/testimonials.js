Testimonials = new Mongo.Collection("testimonials");
Testimonials.attachSchema(new SimpleSchema({
  quote: {
    type: String,
    label: 'Quote',
    optional: false
  },
  attribution: {
    type: String,
    label: 'Attribution',
    optional: true
  },
  title: {
    type: String,
    label: 'Title',
    optional: true
  },
  disabled: {
    type: Boolean,
    label: 'Disabled'
  },
  order: {
    type: Number,
    label: 'Order',
    optional: false
  }
}));