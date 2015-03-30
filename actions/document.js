exports.documentAdd = {
  name: "documentAdd",
  description: "I add a document",
  inputs: {
    userName: {required: true},
    content: {required: true},
  },
  authenticated: true,
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){
    api.safedoc.documentAdd(connection.params.userName, connection.params.content, function(error, objID){
      connection.error = error;
      connection.response.inserted = objID;
      next(connection, true);
    });
  }
};

exports.documentSearch = {
  name: "documentSearch",
  description: "I search for documents",
  inputs: {
    userName: {required: true},
    queryParams: {required: false},
  },
  authenticated: true,
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){
    api.safedoc.documentSearch(connection.params.userName, connection.params.queryparams, function(error, documents){
      connection.error = error;
      connection.response.documents = documents;
      next(connection, true);
    });
  }
};

/*exports.postsList = {
  name: "postsList",
  description: "I list all of a user's posts",
  inputs: {
    userName: {required: true},
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){
    api.blog.postsList(connection.params.userName, function(error, posts){
      connection.error = error;
      connection.response.posts = posts;
      next(connection, true);
    });
  }
};

exports.postEdit = {
  name: "postEdit",
  description: "I edit a post",
  inputs: {
    userName: {required: true},
    password: {required: true},
    title: {required: true},
    content: {required: true},
  },
  authenticated: true,
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){
    api.blog.postEdit(connection.params.userName, connection.params.title, connection.params.content, function(error){
      connection.error = error;
      next(connection, true);
    });
  }
};

exports.postDelete = {
  name: "postDelete",
  description: "I delete a post",
  inputs: {
    userName: {required: true},
    password: {required: true},
    title: {required: true},
  },
  authenticated: true,
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){
    api.blog.postDelete(connection.params.userName, connection.params.title, function(error){
      connection.error = error;
      next(connection, true);
    });
  }
};

exports.commentAdd = {
  name: "commentAdd",
  description: "I add a comment",
  inputs: {
    userName: {required: true},
    commenterName: {required: true},
    title: {required: true},
    comment: {required: true},
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){
    api.blog.commentAdd(connection.params.userName, connection.params.title, connection.params.commenterName, connection.params.comment, function(error){
      connection.error = error;
      next(connection, true);
    });
  }
};

exports.commentsView = {
  name: "commentsView",
  description: "I show all comments for a post",
  inputs: {
    userName: {required: true},
    title: {required: true},
  },
  authenticated: false,
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){
    api.blog.commentsView(connection.params.userName, connection.params.title, function(error, comments){
      connection.error = error;
      connection.response.comments = comments;
      next(connection, true);
    });
  }
};

exports.commentDelete = {
  name: "commentDelete",
  description: "I delete a comment",
  inputs: {
    userName: {required: true},
    password: {required: true},
    commentId: {required: true},
    title: {required: true},
  },
  authenticated: true,
  outputExample: {},
  version: 1.0,
  run: function(api, connection, next){
    api.blog.commentDelete(connection.params.userName, connection.params.title, connection.params.commentId, function(error){
      connection.error = error;
      next(connection, true);
    });
  }
};
*/
