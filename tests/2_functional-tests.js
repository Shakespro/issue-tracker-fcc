const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
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
          done();
        });
    });

    test('Create an issue with only required fields', function(done) {
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
            assert.property(res.body, 'assigned_to'); 
            assert.property(res.body, 'status_text'); 
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
          assert.equal(res.body.error, 'required field(s) missing');
          done();
        });
    });

  });

  suite('GET /api/issues/{project}', function() {

    test('View issues on a project', function(done) {
      chai.request(server)
        .get('/api/issues/test-project')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        });
    });

    test('View issues on a project with one filter', function(done) {
      chai.request(server)
        .get('/api/issues/test-project?open=true')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        });
    });

    test('View issues on a project with multiple filters', function(done) {
      chai.request(server)
        .get('/api/issues/test-project?open=true&status_text=In Progress')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        });
    });

  });

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
          done();
        });
    });

    test('Update multiple fields on an issue', function(done) {
      chai.request(server)
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
          done();
        });
    });

    test('Update an issue with missing _id', function(done) {
      chai.request(server)
        .put('/api/issues/test-project')
        .send({
          issue_title: 'Updated Test Issue'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'missing _id');
          done();
        });
    });

    test('Update an issue with no fields to update', function(done) {
      chai.request(server)
        .put('/api/issues/test-project')
        .send({
          _id: createdIssueId
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'no update field(s) sent');
          assert.property(res.body, '_id');
          done();
        });
    });

    test('Update an issue with an invalid _id', function(done) {
      chai.request(server)
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
          done();
        });
    });

  });

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
          done();
        });
    });

    test('Delete an issue with an invalid _id', function(done) {
      chai.request(server)
        .delete('/api/issues/test-project')
        .send({
          _id: 'invalid_id'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'could not delete');
          assert.property(res.body, '_id');
          done();
        });
    });

    test('Delete an issue with missing _id', function(done) {
      chai.request(server)
        .delete('/api/issues/test-project')
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.property(res.body, 'error');
          assert.equal(res.body.error, 'missing _id');
          done();
        });
    });

  });

});