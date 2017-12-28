new Vue({
  el: 'body',
  data: {
    resource: people_collection(50),
    people: []
  },
  events: {
    updateRecords: function(data) {
      console.log('casa');
      this.people = data;
    }
  },
  methods: {
    addPerson: function(){
      this.resource.push({
        id: (_.max(this.resource, function(person){ return person.id; }).id + 1),
        name: faker.name.findName()
      })
    }
  }
});
