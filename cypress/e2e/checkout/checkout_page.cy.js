describe('Checkout page', () => {
	beforeEach(() => cy.clearSessionData())

	it('should show only selected items', () => {
    const items = []
  
    cy.visit('')
    cy.tryToLogIntoAccount()
  
    cy.addItemByIndex(0, items).then(() => {
      cy.addItemByIndex(1, items)
    }).then(() => {
      cy.get('.shopping_cart_container').click()
      cy.get('button:contains("Checkout")').click()
      cy.fillPersonalInformation()
  
      cy.get('.checkout_summary_container .cart_item')
        .should('have.length', items.length)
        .each(($checkoutItem, index) => {
          cy.wrap($checkoutItem)
            .find('.inventory_item_name')
            .should('have.text', items[index])
        })
    })
  })

  it('should display the correct price', () => {
    const prices = []
    let itemTotal = 0
    let tax = 0
    let total = 0

    cy.visit('')
    cy.tryToLogIntoAccount()

    cy.addItemToCart(0, prices)
    cy.addItemToCart(1, prices)

    cy.get('.shopping_cart_container').click()
    cy.get('button:contains("Checkout")').click()
    cy.fillPersonalInformation()

    cy.get('.summary_subtotal_label')
      .invoke('text')
      .then((itemTotalText) => {
        itemTotal = parseFloat(itemTotalText.match(/[\d.]+/)[0])
      })
      .then(() => {
        cy.get('.summary_tax_label')
          .invoke('text')
          .then((taxText) => {
            tax = parseFloat(taxText.match(/[\d.]+/)[0])
          })
          .then(() => {
            cy.get('.summary_total_label')
              .invoke('text')
              .then((totalText) => {
                total = parseFloat(totalText.match(/[\d.]+/)[0])
              })
              .then(() => {
                const actualTotal = prices.reduce((acc, price) => acc + price, 0)

                cy.wrap(actualTotal).should('eq', itemTotal)
                cy.wrap(actualTotal + tax).should('eq', total)
              })
          })
      })
  })

  it('should successfully submit the checkout', () => {
    cy.visit('')
    cy.tryToLogIntoAccount()
    cy.addAllItemsToCart()
    cy.get('.shopping_cart_container').click()
    cy.get('button:contains("Checkout")').click()
    cy.fillPersonalInformation()
    cy.get('button:contains("Finish")').click()
    cy.contains('Your order has been dispatched').should('be.visible')
  })

  it('should successfully log out', () => {
    cy.visit('')
    cy.tryToLogIntoAccount()
    cy.addAllItemsToCart()
    cy.get('.shopping_cart_container').click()
    cy.get('button:contains("Checkout")').click()
    cy.fillPersonalInformation()
    cy.get('button:contains("Finish")').click()
    cy.get('button:contains("Back Home")').click()
    cy.get('button:contains("Open Menu")').click()
    cy.get('a:contains("Logout")').click()
    cy.get('#login-button').should('exist')
  })
})