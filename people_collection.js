var people_collection = function(total){
  return _.range(1, (total + 1)).map(function(index){
    return {
      id:index,
      name: faker.name.findName()
    }
  });
}