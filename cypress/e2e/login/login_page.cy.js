describe('Login page', () => {
	beforeEach(() => cy.clearSessionData())

	it('should successfully log into account', () => {
	  cy.visit('')
		
    cy.tryToLogIntoAccount()

    cy.url().should('include', '/inventory.html');
  })

  it('should load the login page without errors', () => {
		cy.visit('')
		
		cy.get('#login-button').should('exist')
  })

  it('should display an error message when login fails with invalid credentials', () => {
		cy.visit('')
		
		cy.get('#user-name').type('wrongUser')
    cy.get('#password').type('wrongPassword')
    cy.get('#login-button').click()
        
		cy.get('.error-message-container')
      .should('be.visible')
  		.and('contain', 'Username and password do not match any user');
  })
})