/// <reference types="cypress" />

const appLocators = {
    username: "[placeholder='Username']",
    email: "[placeholder='Email']",
    password: "[placeholder='Password']",
    articlePreview: ".article-preview",
    menuItem: ".nav-item",
    profilePicUrl: "[placeholder='URL of profile picture']",
    logOutButton: "[class='btn btn-outline-danger']",
    tagItem: "[class='tag-default tag-pill']",
    commentForm: "[placeholder='Write a comment...']",
    submitButton: "[type='submit']",
    commentItem: ".card > .card-block > .card-text",
    deleteItem: "[class='ion-trash-a']"
}

describe('Tests for the frontend app', () => {

    //Custom sign up command with dummy credentials
    beforeEach('Sign Up to the Application', () => {
        cy.signUpToApplication()
    })

    //Cypress end-to-end test for the frontend app
    it('Sign up e2e test', () => {
        cy.get(appLocators.articlePreview).should('include.text','No articles are here... yet.'),
        cy.get(appLocators.menuItem).eq(2).click(),
        cy.url().should('contain', '/settings'),
        cy.get(appLocators.profilePicUrl).should('have.attr', 'value'),
        cy.get(appLocators.username).should('have.attr', 'value'),
        cy.get(appLocators.email).should('have.attr', 'value')

    })

    //Cypress UI integration test for the frontend app
    it('Navigation and comment tests for newly created user', () => {
        cy.contains('Global Feed').click(),
        cy.get(appLocators.articlePreview).should('have.length', 3),
        cy.get(appLocators.tagItem).first().click(),
        cy.get(appLocators.articlePreview).first().click(),
        cy.url().should('contain', '/article/'),
        cy.get(appLocators.commentForm).type("Test task from TestLauncher"),
        cy.get(appLocators.submitButton).click(),
        cy.get(appLocators.commentItem).should('have.length', 3),
        cy.get(appLocators.deleteItem).click(),
        cy.contains('Test task from TestLauncher').should('not.exist')
    })
})