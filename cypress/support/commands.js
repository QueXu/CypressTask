// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clearSessionData', () => {
    cy.clearCookies()
    cy.clearLocalStorage()
    
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
  
    if (window.navigator && navigator.serviceWorker) {
      const cypressPromise = new Cypress.Promise((resolve, reject) => {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          if (!registrations.length) resolve()
          Promise.all(registrations.map(reg => reg.unregister())).then(() => {
            resolve();
          })
        })
      })
      cy.wrap(cypressPromise).then(() => {
        cy.log('Service workers unregistered')
      })
    }
  })

Cypress.Commands.add('addAllItemsToCart', () => {
  cy.get('.inventory_item')
    .get('button:contains("Add to cart")')
    .each(($el) => {
      cy.wrap($el).click()
    })
})

Cypress.Commands.add('addOneItemToCart', () => {
  cy.get('.inventory_item')
    .get('button:contains("Add to cart")')
    .first()
    .click()
})

Cypress.Commands.add('addItemToCart', (index, prices) => {
  cy.get('.inventory_item')
    .eq(index) // Отримуємо товар за індексом
    .within(() => {
      cy.get('button:contains("Add to cart")').click(); // Натискаємо кнопку "Add to cart"
      cy.get('.inventory_item_price')
        .invoke('text')
        .then((itemPrice) => {
          const parsedPrice = parseFloat(itemPrice.trim().slice(1)); // Парсимо ціну
          prices.push(parsedPrice); // Додаємо ціну до масиву
        });
    });
});

Cypress.Commands.add('fillPersonalInformation', () => {
  cy.get('#first-name').type('John')
  cy.get('#last-name').type('Doe')
  cy.get('#postal-code').type('79000')
  cy.get('#continue').click()
})

Cypress.Commands.add('tryToLogIntoAccount', () => {
  cy.get('#user-name').type('standard_user')
  cy.get('#password').type('secret_sauce')
  cy.get('#login-button').click()
})

Cypress.Commands.add('getSummaryValue', (selector) => {
  return cy.get(selector)
    .invoke('text')
    .then((text) => {
      return parseFloat(text.match(/[\d.]+/)[0])
    })
})

Cypress.Commands.add('addItemByIndex', (index, items) => {
  cy.get('.inventory_item').eq(index).within(() => {
    cy.get('button:contains("Add to cart")').click(); // Натискаємо "Add to cart"
    cy.get('.inventory_item_name')
      .invoke('text')
      .then((itemName) => {
        items.push(itemName.trim()); // Додаємо назву товару до масиву
      });
  });
});