exports.userAdd = {
  name: "userAdd",
  description: "I add a user",
  inputs: {
    userName: {required: true},
    password: {required: true},
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){
    api.users.add(connection.params.userName, connection.params.password, function(error){
      connection.error = error;
      next(connection, true);
    });
  }
};

exports.userDelete = {
  name: "userDelete",
  description: "I delete a user",
  inputs: {
    userName: {required: true},
    password: {required: true},
  },
  authenticated: true,
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){
    api.users.delete(connection.params.userName, connection.params.password, function(error){
      connection.error = error;
      next(connection, true);
    });
  }
};

exports.usersList = {
  name: "usersList",
  description: "I list all the users",
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){
    api.users.list(function(error, users){
      connection.error = error;
      connection.response.users = [];
      for(var i in users){
        connection.response.users.push(users[i].userName)
      }
      next(connection, true);
    });
  }
};

exports.authenticate = {
  name: "authenticate",
  description: "I authenticate a user",
  inputs: {
    userName: {required: true},
    password: {required: true},
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){
    api.users.authenticate(connection.params.userName, connection.params.password, function(error, match){
      connection.error = error;
      connection.response.authenticated = match;
      if(match === false && !connection.error){
        connection.error = "unable to log in";
      }
      next(connection, true);
    });
  }
};
