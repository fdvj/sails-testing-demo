describe('Posts endpoint', function(){

  function clear() {
    wolfpack.clearResults();
    wolfpack.clearErrors();
  }

  beforeEach(clear);

  describe('GET /posts', function(){

    it("should return an array of posts", function(done){
      wolfpack.setFindResults(fixtures.posts);
      
      request(server)
        .get('/posts')
        .expect(200, fixtures.posts, done);
    });

  });

  describe('GET /posts/:id', function(){
    beforeEach(function(){
      clear();
      Counters.increase.reset();
    });
    
    it("should return 404 if the post is not found", function(done){
      request(server)
        .get('/posts/1')
        .expect(function(){
          // Make sure the counter is not increased
          if (Counters.increase.called) { throw Error('Counter should have not increased'); }
        })
        .expect(404, done);
    });

    it("should return 200, the post, and increase the visited counter", function(done){
      Posts.setFindResults({id: fixtures.posts[0].id}, fixtures.posts[0]);
      Counters.setFindResults({postId: fixtures.posts[0].id}, fixtures.counters[0]);
      request(server)
        .get('/posts/1')
        .expect(function(res){
          // Verify that the correct counter was increased
          if (!Counters.increase.calledWith(1)) { throw Error('Counter for post should have increased'); }
        })
        .expect(200, fixtures.posts[0], done);
    });

  });

  describe('POST /posts', function(){
    var stub;
    beforeEach(function(){
      clear();
      stub = sinon.stub(Captcha, 'verifyCaptcha');
      Posts.create.reset();
    });

    afterEach(function(){
      stub.restore();
    });

    it("should return 400 and Invalid captcha if captcha verification fails", function(done){
      stub.returns(false);
      request(server)
        .post('/posts')
        .send(fixtures.posts[0])
        .expect(function(res){
          // Verify post was not created
          if (Posts.create.called) { throw Error('Post should have not been created'); }
        })
        .expect(400, {message: 'Invalid captcha'}, done);
    });

    it("should return 201 and the created post", function(done){
      stub.returns(true);
      wolfpack.setCreateResults(fixtures.posts[0]);
      request(server)
        .post('/posts')
        .send(fixtures.posts[0])
        .expect(201, fixtures.posts[0], done);
    });
  });

});