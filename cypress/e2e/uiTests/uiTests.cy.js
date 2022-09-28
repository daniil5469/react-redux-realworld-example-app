/// <reference types="cypress" />

const appLocators = {
  articlePreview: "[class='article-preview']",
  menuItem: ".nav-item",
  userBio: "[placeholder='Short bio about you']",
  profilePicUrl: "[placeholder='URL of profile picture']",
  username: "[placeholder='Username']",
  email: "[placeholder='Email']",
  tagItem: "[class='tag-default tag-pill']",
  activeTab: "[class='nav-link active']",
  commentForm: "[placeholder='Write a comment...']",
  submitButton: "[type='submit']",
  commentItem: ".card > .card-block > .card-text",
  deleteItem: "[class='ion-trash-a']"
}

describe('Tests for the frontend app', () => {

  //Cypress end-to-end test for the frontend app
  it('Sign up and update user info e2e test', () => {
    
    cy.signUpToApplication() //Custom sign up command with dummy credentials

    //Update info
    cy.get(appLocators.articlePreview).should('include.text','No articles are here... yet.')
    cy.get(appLocators.menuItem).eq(2).click()
    cy.url().should('contain', '/settings')
    cy.get(appLocators.userBio).type('Lorem ipsum dolor sit amet')
    cy.contains('Update Settings').click()
    cy.url().should('eq', 'http://localhost:4100/')
    //Assertions for the updated user info
    cy.get(appLocators.menuItem).eq(2).click()
    cy.get(appLocators.profilePicUrl).should('have.attr', 'value')
    cy.get(appLocators.username).should('have.attr', 'value')
    cy.get(appLocators.userBio).should('have.text', 'Lorem ipsum dolor sit amet')
    cy.get(appLocators.email).should('have.attr', 'value')
  })

  //Cypress UI integration test for the frontend app
  it('Verify navigation to comments and manipulation with a comment', () => {
    cy.loginToApplication() //Custom log in command with credentials from 'cypress.config.js'

    cy.contains('Global Feed').click()
    cy.get(appLocators.tagItem).first().click()
    cy.get(appLocators.activeTab).should('have.text', ' implementations')
    .and(($el) => {
      expect($el).to.have.css('color', 'rgb(92, 184, 92)')
    })
    cy.get(appLocators.articlePreview).first().click()
    cy.get(appLocators.commentForm).type("Test comment")
    cy.get(appLocators.submitButton).click()
    cy.get(appLocators.commentItem).should('have.length', 3)
    cy.get(appLocators.deleteItem).click()
    cy.contains('Test comment').should('not.exist')
  })
})