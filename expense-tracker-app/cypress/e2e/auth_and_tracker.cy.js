describe('Login + Expense Tracker Flow', () => {


it('displays login message and sign in button', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="cypress-title"]')
      .should('be.visible')
      .and('contain.text', 'sign in with google to continues');

    cy.contains('button', 'sign in')
      .should('be.visible')
      .click(); // test que le clic ne plante pas
  });
  it('shows the user dashboard after login', () => {
    cy.visit('http://localhost:5173/expense-tracker');
    cy.contains('Expense Tracker').should('exist');
  });

  it('should add a new income transaction and display it', () => {
    cy.visit('http://localhost:5173/expense-tracker');
    cy.get('input#description').type('Test Revenue');
    cy.get('input#amount').type('999');
    cy.get('input#income').check(); // coche le bouton radio "Income"
    cy.get('form').submit();
cy.wait(5500);  // attends 1.5s pour que Firestore actualise la liste

    // Vérifie que la transaction est affichée
    cy.contains('Test Revenue').should('exist');
    cy.contains('$999.00').should('exist');
    cy.contains('income').should('exist');
  });
  it('should send a message to the chatbot and receive a response', () => {
    cy.visit('http://localhost:5173/expense-tracker');

    cy.get('input[placeholder="Pose ta question..."]').type('Quel est mon solde ?');
    cy.contains('Envoyer').click();

    // Vérifie que la question apparaît
    cy.contains('Quel est mon solde ?').should('exist');

    // Patiente pour la réponse
    cy.wait(1000); // augmente si le hook utilise un `setTimeout` ou API

    // Vérifie qu'une réponse est générée par le bot (basé sur ton hook)
    cy.get('.bg-green-100').should('exist');
  });

});
