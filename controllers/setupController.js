var Todos = require('../models/todoModel');

module.exports = function(app) {
  
  // hitting this endpoint to set up seed data (prob only want to run once in development - can run checks to do this)
  app.get('/api/setupTodos', function(req, res) {
    // seed database
    var starterTodos = [
      {
        username: 'test',
        todo: 'Buy milk',
        isDone: false,
        hasAttachment: false
      },
      {
        username: 'test',
        todo: 'Feed dog',
        isDone: false,
        hasAttachment: false
      },
      {
        username: 'test',
        todo: 'Learn Node',
        isDone: false,
        hasAttachment: false
      },
    ];
    Todos.create(starterTodos, function(err, results){
      res.send(results);
    });
  });
}