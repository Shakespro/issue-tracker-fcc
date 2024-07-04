'use strict';

const { v4: uuidv4 } = require('uuid');

let issues = {};

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res) {
      let project = req.params.project;
      let query = req.query;
      let projectIssues = issues[project] || [];
      let filteredIssues = projectIssues.filter(issue => {
        return Object.keys(query).every(key => issue[key] == query[key]);
      });
      res.json(filteredIssues);
    })

    app.route('/api/issues/:project')

    .post(function (req, res) {
      let project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;

      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: 'required field(s) missing' });
      }

      const newIssue = {
        issue_title,
        issue_text,
        created_by,
        created_on: new Date(),
        updated_on: new Date(),
        open: true,
        _id: uuidv4()
      };

      // Only add optional fields if they were provided in the request
      if (assigned_to) {
        newIssue.assigned_to = assigned_to;
      }
      if (status_text) {
        newIssue.status_text = status_text;
      }

      if (!issues[project]) {
        issues[project] = [];
      }

      issues[project].push(newIssue);
      res.json(newIssue);
    })

    .put(function (req, res) {
      let project = req.params.project;
      const { _id, ...updateFields } = req.body;

      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      if (Object.keys(updateFields).length === 0) {
        return res.json({ error: 'no update field(s) sent', _id });
      }

      let projectIssues = issues[project] || [];
      let issue = projectIssues.find(issue => issue._id === _id);

      if (!issue) {
        return res.json({ error: 'could not update', _id });
      }

      Object.keys(updateFields).forEach(key => {
        issue[key] = updateFields[key];
      });
      issue.updated_on = new Date();

      res.json({ result: 'successfully updated', _id });
    })

    .delete(function (req, res) {
      let project = req.params.project;
      const { _id } = req.body;

      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      let projectIssues = issues[project] || [];
      let issueIndex = projectIssues.findIndex(issue => issue._id === _id);

      if (issueIndex === -1) {
        return res.json({ error: 'could not delete', _id });
      }

      projectIssues.splice(issueIndex, 1);
      res.json({ result: 'successfully deleted', _id });
    });
};
