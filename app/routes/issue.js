const express = require('express');
const { issueStore, severityStore } = require('../models');
const router = express.Router();

router.get('/', function(req, res) {
  var issues;

  switch(req.query.is){
    case 'open':
      issues = issueStore.getAllOpen();
    break;
    case 'closed':
      issues = issueStore.getAllClosed();
    break;
    default:
      issues = issueStore.getAll();
    break;
  }
  
  res.render('issues/index', { issues });
});

router.get('/new', function(req, res) {
  const issue = {};
  const errors = {};
  const severities = severityStore.getAll();

  res.render('issues/new', { issue, errors, severities });
});

router.post('/new', function(req, res) {
  const issue = req.body.issue;
  issue.status = 'open';
  var changeset = issueStore.add(issue);
  const severities = severityStore.getAll();

  if (changeset.isValid()) {
    res.redirect('/issues');
  } else {
    res.render('issues/new', { issue: changeset.entity, errors: changeset.errors, severities });
  }
});

router.get('/:id', function(req, res) {
  const issue = issueStore.get(req.params.id);
  res.render('issues/show', { issue });
});

module.exports = router;
