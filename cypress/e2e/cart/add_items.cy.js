describe('Adding to cart', () => {
	beforeEach(() => cy.clearSessionData())

	it('should successfully add all items to cart', () => {
		cy.visit('')
		
		cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
        
		cy.addAllItemsToCart()

    cy.get('.shopping_cart_container')
      .get('.shopping_cart_badge')
      .should('have.text', '6')
  })

  it('should successfully add only one item to cart', () => {
		cy.visit('')
		
		cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
        
		cy.addOneItemToCart()

    cy.get('.shopping_cart_container')
      .get('.shopping_cart_badge')
      .should('have.text', '1')
  })
})