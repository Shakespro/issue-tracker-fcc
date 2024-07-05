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
        _id: uuidv4(),
        assigned_to: assigned_to || '',
        status_text: status_text || ''
      };

      if (!issues[project]) {
        issues[project] = [];
      }

      issues[project].push(newIssue);
      res.json(newIssue);
    })
    .get(function(req, res) {
      let project = req.params.project;
      let query = req.query;

      if (!issues[project]) {
        return res.json([]);
      }

      let filteredIssues = issues[project].filter(issue => {
        for (let key in query) {
          if (issue[key] != query[key]) {
            return false;
          }
        }
        return true;
      });

      res.json(filteredIssues);
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
