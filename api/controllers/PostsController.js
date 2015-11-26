/**
 * PostsController
 *
 * @description :: Simple post controller example
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getAllPosts: function(req, res) {
    Posts.find().then(function(posts){
      return res.json(200, posts);
    });
  },

  getPost: function(req, res) {
    Posts.findOne({id: req.params.id}).then(function(post){
      if (!post) {
        return res.send(404);
      }
      Counters.increase(post.id);
      return res.json(200, post);
    });
  },

  createPost: function(req, res) {
    var body = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    };
    var valid = Captcha.verifyCaptcha(req.body.captcha);
    if (!valid) {
      return res.json(400, {message: 'Invalid captcha'});
    }

    return Posts.create(body).then(function(post){
      return res.json(201, post);
    }).catch(function(err){
      return res.json(500, {error: err.originalError});
    });
  }
	
};

