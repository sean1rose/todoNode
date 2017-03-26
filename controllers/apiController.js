var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');


// creating CRUD endpoints to export
module.exports = function(app) {
  
  /* MIDDLEWARE TO PARSE HTTP REQUEST */
  
  // bodyparser will parse out json out of http request body and make it available as a JS obj
  app.use(bodyParser.json());
  // make sure it can handle url encoded data (%s)
  app.use(bodyParser.urlencoded( {extended: true} ));



  /* CRUD API - REST FUNCTIONS */
  
  // 1. GET ALL todos for a user
  app.get('/api/todos/:uname', function(req, res) {

    // use mongoose model's find method to find doc w/ the passed in uname (uname in url)
    Todos.find({ username: req.params.uname }, function(err, todos) {
      if (err) throw err;

      // send back the todos associated w/ that user (sent back as json)
      res.send(todos);
    })
  });


  // 2. GET INDIVIDUAL todo
  app.get('/api/todo/:id', function(req, res) {
    Todos.findById({ _id: req.params.id }, function(err, todo){
      if (err) throw err;

      // return back the data as json
      res.send(todo);
    })
  });


  // 3. ADD/CREATE a todo (POST)
  app.post('/api/todo', function(req, res) {
    // post request -> sending json in shape of schema
    
    // check to see if what's being sent (if has an id -> know it's an update/not new; if no id -> assume it's a create)
    if (req.body.id){
      // this already exists... -> UPDATE properties w/ props that are passed in the post request
      Todos.findByIdAndUpdate(req.body.id, { todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment }, function(err, todo) {
        if (err) throw err;

        res.send('Successful update');
      });
    } 
    else {
      // no id -> then we're CREATING A NEW TODO
      var newTodo = Todos({
        username: 'test',
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      });
      // save to DB
      newTodo.save(function(err){
        if (err) throw err;
        res.send('Successful creation');
      });
    }
  });


  // 4. DELETE A TODO...
  app.delete('/api/todo', function(req, res) {
    
    Todos.findByIdAndRemove(req.body.id, function(err) {
      if (err) throw err;
      
      res.send('Successful delete');
    });

  });
}