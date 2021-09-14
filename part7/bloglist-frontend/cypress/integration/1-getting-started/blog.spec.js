/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'Khoapiterrr',
      password: '123456',
      name: 'trong khoa',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);

    cy.visit('http://localhost:3000');
    cy.contains('Login to application');
  });

  it('Login form is shown', () => {
    cy.contains('Login to application');
    cy.contains('Login');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login ', () => {
    it('fails with wrong credentials', () => {
      cy.contains('Login').click();
      cy.get('input[name="username"]').type('Khoapiterrr');
      cy.get('input[name="password"]').type('123123123');
      cy.get('button').contains('Login').click();
      cy.get('.error').should('contain', 'invalid username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('.error').should('have.css', 'border-style', 'solid');
    });

    it('succeeds with correct credentials', () => {
      cy.contains('Login').click();
      cy.get('input[name="username"]').type('Khoapiterrr');
      cy.get('input[name="password"]').type('123456');
      cy.get('button').contains('Login').click();
      cy.contains('blogs');
      cy.contains('trong khoa logged in');
    });
  });

  describe('When user is logged in', () => {
    beforeEach(function () {
      // log in user here
      cy.get('input[name="username"]').type('Khoapiterrr');
      cy.get('input[name="password"]').type('123456');
      cy.get('button').contains('Login').click();

      // cy.contains('Create new blog').click();
      // cy.get('input[name="title"]').type('fullstack1');
      // cy.get('input[name="author"]').type('khoapiterrr1');
      // cy.get('input[name="url"]').type('fb.com');
      // cy.get('form#createBlogForm').submit();
    });
    it('A blog can be created and like blog', function () {
      // ...
      cy.contains('Create new blog').click();
      cy.get('input[name="title"]').type('fullstack');
      cy.get('input[name="author"]').type('khoapiterrr');
      cy.get('input[name="url"]').type('fb.com');
      cy.get('form#createBlogForm').submit();
      cy.contains("a new blog You're NOT gonna need it! by trong khoa");
      
      cy.get('button').contains('View').click();

      cy.get('button').contains('Like').click();
      cy.contains('Likes 1');
      cy.get('button').contains('Like').click();
      cy.contains('Likes 2');
      cy.get('button').contains('Like').click();
      cy.contains('Likes 3');

     
      cy.contains('Create new blog').click();
      cy.get('input[name="title"]').type('facebook');
      cy.get('input[name="author"]').type('khoapiterrr');
      cy.get('input[name="url"]').type('fb.com');
      cy.get('form#createBlogForm').submit();

       cy.get('button').contains('Remove').click();
    });

  });
});
