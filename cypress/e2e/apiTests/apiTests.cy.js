/// <reference types="cypress" />

describe('API tests', () => {

    beforeEach('Log In to the Application', () => {
        cy.loginToApplication()
    })

    it('Create new article', () => {

        const bodyRequest = {
            "article": {
                "tagList": [],
                "title": "Article name from API",
                "description": "Article description from API",
                "body": "Article body from API"
            }
        }

        //Create a new article using API request
        cy.get('@token').then(token => {
            cy.request({
                url: 'https://api.realworld.io/api/articles',
                headers: { 'Authorization': 'Token ' + token },
                method: 'POST',
                body: bodyRequest,
            }).then(response => {
                expect(response.status).to.equal(200)
            })

            //Verify that article was created
            cy.request({
                url: 'https://api.realworld.io/api/articles?limit=10&offset=0',
                headers: { 'Authorization': 'Token ' + token },
                method: 'GET'
            }).its('body').then(body => {
                expect(body.articles[0].title).to.equal('Article name from API')
            })
        })
    })

    it('Delete newly created article at the Global Feed', () => {
        cy.get('@token').then(token => {
            cy.request({
                url: 'https://api.realworld.io/api/articles/Article-name-from-API-102206',
                headers: { 'Authorization': 'Token ' + token },
                method: 'DELETE'
            }).then(response => {
                expect(response.status).to.equal(204)
            })

            //Verify that article was created
            cy.request({
                url: 'https://api.realworld.io/api/articles?limit=10&offset=0',
                headers: { 'Authorization': 'Token ' + token },
                method: 'GET'
            }).its('body').then(body => {
                expect(body.articles[0].title).not.to.equal('Article name from API')
            })
        })
    })
})
