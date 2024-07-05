const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
<<<<<<< HEAD
  let createdIssueId; // This will store the _id of the issue created for testing

  suite('POST /api/issues/{project}', function() {
    
    test('Create an issue with every field', function(done) {
      chai.request(server)
        .post('/api/issues/test-project')
        .send({
          issue_title: 'Test Issue',
          issue_text: 'This is a test issue',
          created_by: 'Functional Test',
          assigned_to: 'John Doe',
          status_text: 'In Progress'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'issue_title');
          assert.property(res.body, 'issue_text');
          assert.property(res.body, 'created_by');
          assert.property(res.body, 'assigned_to');
          assert.property(res.body, 'status_text');
          assert.property(res.body, 'created_on');
          assert.property(res.body, 'updated_on');
          assert.property(res.body, 'open');
          assert.property(res.body, '_id');
          createdIssueId = res.body._id; // Store the _id for later use
=======
  suite('POST /api/issues/:project', function() {
    
    test('Create an issue with every field', function(done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Creator',
          assigned_to: 'Assignee',
          status_text: 'Status'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'Text');
          assert.equal(res.body.created_by, 'Creator');
          assert.equal(res.body.assigned_to, 'Assignee');
          assert.equal(res.body.status_text, 'Status');
>>>>>>> 9782063 (second try)
          done();
        });
    });

    test('Create an issue with only required fields', function(done) {
<<<<<<< HEAD
        chai.request(server)
          .post('/api/issues/test-project')
          .send({
            issue_title: 'Test Issue',
            issue_text: 'This is a test issue',
            created_by: 'Functional Test'
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.property(res.body, 'issue_title');
            assert.property(res.body, 'issue_text');
            assert.property(res.body, 'created_by');
            assert.notProperty(res.body, 'assigned_to'); // Updated assertion here
            assert.notProperty(res.body, 'status_text'); // Optional field not sent
            assert.property(res.body, 'created_on');
            assert.property(res.body, 'updated_on');
            assert.property(res.body, 'open');
            assert.property(res.body, '_id');
            done();
          });
      });
          

    test('Create an issue with missing required fields', function(done) {
      chai.request(server)
        .post('/api/issues/test-project')
        .send({
          issue_text: 'This is a test issue',
          created_by: 'Functional Test'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
=======
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Creator'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.issue_title, 'Title');
          assert.equal(res.body.issue_text, 'Text');
          assert.equal(res.body.created_by, 'Creator');
          assert.equal(res.body.assigned_to, '');
          assert.equal(res.body.status_text, '');
          done();
        });
    });

    test('Create an issue with missing required fields', function(done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
>>>>>>> 9782063 (second try)
          assert.equal(res.body.error, 'required field(s) missing');
          done();
        });
    });

  });

<<<<<<< HEAD
  suite('GET /api/issues/{project}', function() {

    test('View issues on a project', function(done) {
      chai.request(server)
        .get('/api/issues/test-project')
        .end(function(err, res) {
=======
  suite('GET /api/issues/:project', function() {

    test('View issues on a project', function(done) {
      chai.request(server)
        .get('/api/issues/test')
        .end(function(err, res){
>>>>>>> 9782063 (second try)
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        });
    });

    test('View issues on a project with one filter', function(done) {
      chai.request(server)
<<<<<<< HEAD
        .get('/api/issues/test-project?open=true')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
=======
        .get('/api/issues/test')
        .query({ open: true })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          res.body.forEach(issue => {
            assert.equal(issue.open, true);
          });
>>>>>>> 9782063 (second try)
          done();
        });
    });

    test('View issues on a project with multiple filters', function(done) {
      chai.request(server)
<<<<<<< HEAD
        .get('/api/issues/test-project?open=true&status_text=In Progress')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
=======
        .get('/api/issues/test')
        .query({ open: true, created_by: 'Creator' })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          res.body.forEach(issue => {
            assert.equal(issue.open, true);
            assert.equal(issue.created_by, 'Creator');
          });
>>>>>>> 9782063 (second try)
          done();
        });
    });

  });

<<<<<<< HEAD
  suite('PUT /api/issues/{project}', function() {

    test('Update one field on an issue', function(done) {
      chai.request(server)
        .put('/api/issues/test-project')
        .send({
          _id: createdIssueId,
          issue_title: 'Updated Test Issue'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'result');
          assert.equal(res.body.result, 'successfully updated');
          assert.property(res.body, '_id');
=======
  suite('PUT /api/issues/:project', function() {

    let testId;

    before(function(done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Creator'
        })
        .end(function(err, res){
          testId = res.body._id;
          done();
        });
    });

    test('Update one field on an issue', function(done) {
      chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: testId,
          issue_text: 'New Text'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.result, 'successfully updated');
          assert.equal(res.body._id, testId);
>>>>>>> 9782063 (second try)
          done();
        });
    });

    test('Update multiple fields on an issue', function(done) {
      chai.request(server)
<<<<<<< HEAD
        .put('/api/issues/test-project')
        .send({
          _id: createdIssueId,
          issue_text: 'Updated issue text',
          status_text: 'Done'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'result');
          assert.equal(res.body.result, 'successfully updated');
          assert.property(res.body, '_id');
=======
        .put('/api/issues/test')
        .send({
          _id: testId,
          issue_text: 'New Text',
          status_text: 'New Status'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.result, 'successfully updated');
          assert.equal(res.body._id, testId);
>>>>>>> 9782063 (second try)
          done();
        });
    });

    test('Update an issue with missing _id', function(done) {
      chai.request(server)
<<<<<<< HEAD
        .put('/api/issues/test-project')
        .send({
          issue_title: 'Updated Test Issue'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
=======
        .put('/api/issues/test')
        .send({
          issue_text: 'New Text'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
>>>>>>> 9782063 (second try)
          assert.equal(res.body.error, 'missing _id');
          done();
        });
    });

    test('Update an issue with no fields to update', function(done) {
      chai.request(server)
<<<<<<< HEAD
        .put('/api/issues/test-project')
        .send({
          _id: createdIssueId
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'no update field(s) sent');
          assert.property(res.body, '_id');
=======
        .put('/api/issues/test')
        .send({
          _id: testId
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'no update field(s) sent');
          assert.equal(res.body._id, testId);
>>>>>>> 9782063 (second try)
          done();
        });
    });

    test('Update an issue with an invalid _id', function(done) {
      chai.request(server)
<<<<<<< HEAD
        .put('/api/issues/test-project')
        .send({
          _id: 'invalid_id',
          issue_title: 'Updated Test Issue'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'could not update');
          assert.property(res.body, '_id');
=======
        .put('/api/issues/test')
        .send({
          _id: 'invalid_id',
          issue_text: 'New Text'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'could not update');
          assert.equal(res.body._id, 'invalid_id');
>>>>>>> 9782063 (second try)
          done();
        });
    });

  });

<<<<<<< HEAD
  suite('DELETE /api/issues/{project}', function() {

    test('Delete an issue', function(done) {
      chai.request(server)
        .delete('/api/issues/test-project')
        .send({
          _id: createdIssueId
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'result');
          assert.equal(res.body.result, 'successfully deleted');
          assert.property(res.body, '_id');
=======
  suite('DELETE /api/issues/:project', function() {

    let testId;

    before(function(done) {
      chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'Text',
          created_by: 'Creator'
        })
        .end(function(err, res){
          testId = res.body._id;
          done();
        });
    });

    test('Delete an issue', function(done) {
      chai.request(server)
        .delete('/api/issues/test')
        .send({
          _id: testId
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.result, 'successfully deleted');
          assert.equal(res.body._id, testId);
>>>>>>> 9782063 (second try)
          done();
        });
    });

    test('Delete an issue with an invalid _id', function(done) {
      chai.request(server)
<<<<<<< HEAD
        .delete('/api/issues/test-project')
        .send({
          _id: 'invalid_id'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'could not delete');
          assert.property(res.body, '_id');
=======
        .delete('/api/issues/test')
        .send({
          _id: 'invalid_id'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'could not delete');
          assert.equal(res.body._id, 'invalid_id');
>>>>>>> 9782063 (second try)
          done();
        });
    });

    test('Delete an issue with missing _id', function(done) {
      chai.request(server)
<<<<<<< HEAD
        .delete('/api/issues/test-project')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
=======
        .delete('/api/issues/test')
        .send({})
        .end(function(err, res){
          assert.equal(res.status, 200);
>>>>>>> 9782063 (second try)
          assert.equal(res.body.error, 'missing _id');
          done();
        });
    });

  });

});
