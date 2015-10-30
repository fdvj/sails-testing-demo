
module.exports.routes = {

  'GET /posts': {
    controller: 'PostsController',
    action: 'getAllPosts'
  },

  'GET /posts/:id': {
    controller: 'PostsController',
    action: 'getPost'
  },

  'POST /posts': {
    controller: 'PostsController',
    action: 'createPost'
  }

};
