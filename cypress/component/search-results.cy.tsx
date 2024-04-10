import React from 'react';
import {mount} from '@cypress/react18';
import {BookingResponse, Holiday} from "@/types/booking"; // Update with your types import
import SearchResults from '../../src/app/components/search-results/search-results'; // Update with the correct file path
import results from "../data/results";
import {last} from "rxjs";

describe('SearchResults Component', () => {
    const response: BookingResponse = results;

    beforeEach(() => {
        mount(<SearchResults response={response}/>);
    });

    it('Renders correct number of holidays', () => {
        cy.get('.search-results-item').should('have.length', response.holidays.length);
    });

    it('Filter results by price', () => {
        cy.get('.filter-price').eq(0).check(); // up tp 1000
        cy.get('.search-results-item').should('have.length', 39);
    });

    it('Filter results by rating', () => {
        cy.get('.filter-rating').eq(0).check(); // 4 star
        cy.get('.search-results-item').should('have.length', 11);
    });

    it('Filter results by rating (Villas)', () => {
        cy.get('.filter-rating').eq(6).check(); // Villas
        cy.get('.search-results-item').should('have.length', 16);
    });

    it('Filter results by facilities', () => {
        cy.get('.filter-facilities').eq(0).check(); // restaurant
        cy.get('.search-results-item').should('have.length', 65);
    });
});
