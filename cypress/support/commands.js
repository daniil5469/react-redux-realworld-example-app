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

//  Cypress.Commands.add('loginToApplication', () => {
//      cy.visit('/login')
//      cy.get('[type="email"]').type('')
//      cy.get('[type="password"]').type('')
//      cy.get('form').submit()
//  })

//Custom sign up cypress command with dummy credentials
import { makeUsername, makeEmail, makePassword } from "../support/helpers/randomizer"

 Cypress.Commands.add('signUpToApplication', () => {
    cy.visit('/register'),
    cy.get('[placeholder="Username"]').type(makeUsername()),
    cy.get('[placeholder="Email"]').type(makeEmail()),
    cy.get('[placeholder="Password"]').type(makePassword()),
    cy.get('form').submit()
 })
