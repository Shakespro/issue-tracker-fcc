const { v4: uuidv4 } = require('uuid');

let issues = {};

module.exports = function(app) {
  app.route('/api/issues/:project')
    .post(function(req, res) {
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

      // Only include assigned_to and status_text if they are provided
      if (assigned_to) newIssue.assigned_to = assigned_to;
      if (status_text) newIssue.status_text = status_text;

      if (!issues[project]) {
        issues[project] = [];
      }

      issues[project].push(newIssue);
      res.json(newIssue);
    })
    .get(function(req, res) {
      let project = req.params.project;

      if (!issues[project]) {
        return res.json([]);
      }

      res.json(issues[project]);
    })
    .put(function(req, res) {
      let project = req.params.project;
      const { _id, issue_title, issue_text, created_by, assigned_to, status_text, open } = req.body;

      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      const issue = issues[project] && issues[project].find(issue => issue._id === _id);

      if (!issue) {
        return res.json({ error: 'could not update', _id });
      }

      if (!issue_title && !issue_text && !created_by && !assigned_to && !status_text && open === undefined) {
        return res.json({ error: 'no update field(s) sent', _id });
      }

      if (issue_title) issue.issue_title = issue_title;
      if (issue_text) issue.issue_text = issue_text;
      if (created_by) issue.created_by = created_by;
      if (assigned_to) issue.assigned_to = assigned_to;
      if (status_text) issue.status_text = status_text;
      if (open !== undefined) issue.open = open;
      issue.updated_on = new Date();

      res.json({ result: 'successfully updated', _id });
    })
    .delete(function(req, res) {
      let project = req.params.project;
      const { _id } = req.body;

      if (!_id) {
        return res.json({ error: 'missing _id' });
      }

      const issueIndex = issues[project] && issues[project].findIndex(issue => issue._id === _id);

      if (issueIndex === -1 || issueIndex === undefined) {
        return res.json({ error: 'could not delete', _id });
      }

      issues[project].splice(issueIndex, 1);
      res.json({ result: 'successfully deleted', _id });
    });
};
