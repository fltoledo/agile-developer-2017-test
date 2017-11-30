const express = require('express');
const router = express.Router();
const { issueStore } = require('../models');

router.get('/', function(req, res) {
  const openIssues = issueStore.getAllOpen();
  const openIssuesCount = openIssues.length;
  
  const highSeverityCount = openIssues.filter(issue => issue.severity === 'High').length;
  var highSeverityPercentage = 0;
  if (openIssuesCount != 0) {
    highSeverityPercentage = highSeverityCount/openIssuesCount;
  }

  const mediumSeverityCount = openIssues.filter(issue => issue.severity === 'Medium').length;
  var mediumSeverityPercentage = 0;
  if (openIssuesCount != 0) {
    mediumSeverityPercentage = mediumSeverityCount/openIssuesCount;
  }

  const lowSeverityCount = openIssues.filter(issue => issue.severity === 'Low').length;
  var lowSeverityPercentage = 0;
  if (openIssuesCount != 0) {
    lowSeverityPercentage = lowSeverityCount/openIssuesCount;
  }

  res.render('dashboard', {
    openIssuesCount,
    highSeverityPercentage,
    mediumSeverityPercentage,
    lowSeverityPercentage
  });
});

module.exports = router;
