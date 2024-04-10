import React from 'react';
import {mount} from '@cypress/react18';
import {BookingResponse} from "@/types/booking"; // Update with your types import
import SearchResults from '@/app/components/search-results/search-results'; // Update with the correct file path
import results from "../data/results";

describe('SearchResults Component', () => {
    const response: BookingResponse = results;

    beforeEach(() => {
        mount(<SearchResults response={response}/>);
    });

    it('Renders correct number of holidays', () => {
        cy.get('.search-results-item').should('have.length', response.holidays.length);
    });

    it('Filter results by price', () => {
        cy.get('.filter-price').eq(0).check({force: true}); // up to 1000
        cy.get('.search-results-item').should('have.length', 39);
    });

    it('Filter results by rating', () => {
        cy.get('.filter-rating').eq(0).check({force: true}); // 4 star
        cy.get('.search-results-item').should('have.length', 11);
    });

    it('Filter results by rating (Villas)', () => {
        cy.get('.filter-rating').eq(6).check({force: true}); // Villas
        cy.get('.search-results-item').should('have.length', 16);
    });

    it('Filter results by facilities', () => {
        cy.get('.filter-facilities').eq(0).check({force: true}); // restaurant
        cy.get('.search-results-item').should('have.length', 65);
    });

    it('Filter results by multiple', () => {
        cy.get('.filter-price').eq(1).check({force: true}); // 1000 to 1500
        cy.get('.filter-price').eq(2).check({force: true}); // 1500 to 2000
        cy.get('.filter-rating').eq(0).check({force: true}); // 4 star
        cy.get('.filter-rating').eq(2).check({force: true}); // 4+ star
        cy.get('.filter-rating').eq(3).check({force: true}); // 3+ star
        cy.get('.filter-facilities').eq(2).check({force: true}); // free parking
        cy.get('.filter-facilities').eq(12).check({force: true}); // swimming pool
        cy.get('.search-results-item').should('have.length', 4);
    });
});
