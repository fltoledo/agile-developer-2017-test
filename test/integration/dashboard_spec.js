describe('Dashboard', function() {

  it('Shows the number of open issues in the Dashboard', function() {
    cy.resetDB();
    cy.fixture({
        status: 'open'
    });
    cy.fixture({
        status: 'open'
    });
    cy.fixture({
        status: 'closed'
    });

    cy.visit('/dashboard');

    cy.get('[data-test-open-issues]').should('contain', '2 open issues');
  });
});
