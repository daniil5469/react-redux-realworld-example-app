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

//Custom sign up cypress command with dummy credentials
import { makeUsername, makeEmail, makePassword } from "../support/helpers/randomizer"

Cypress.Commands.add('signUpToApplication', () => {
  cy.visit('/register'),
  cy.get('[placeholder="Username"]').type(makeUsername()),
  cy.get('[placeholder="Email"]').type(makeEmail()),
  cy.get('[placeholder="Password"]').type(makePassword()),
  cy.get('form').submit()
})

Cypress.Commands.add('loginToApplication', () => {

   const userCredentials = {
       "user": {
           "email": Cypress.env('username'),
           "password": Cypress.env('password')
       }
   }

   cy.request('POST', Cypress.env('apiUrl')+'/users/login', userCredentials)
      .its('body').then( body => {
         const token = body.user.token
         cy.wrap(token).as('token')
         cy.visit('/', {
            onBeforeLoad (win){
               win.localStorage.setItem('jwt', token)
            }
         })
   })
})