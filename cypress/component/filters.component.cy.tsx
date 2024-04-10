import React from 'react';
import {mount} from '@cypress/react18';
import {FilterByPrice, FilterByRating, FilterByFacilities} from '@/app/components/filters/filters.component'; // Update with your actual file path

describe('FilterByPrice Component', () => {
    it('Changes price filter when checkboxes are clicked', () => {
        const changePrice = cy.stub().as('changePrice');
        mount(<FilterByPrice changePrice={changePrice}/>);

        cy.get('.filter-price').eq(0).check();
        cy.get('.filter-price').eq(1).check();
        cy.get('.filter-price').eq(2).check();
        cy.get('.filter-price').eq(3).check();

        cy.get('@changePrice').should('have.callCount', 4);
    });
});

describe('FilterByRating Component', () => {
    it('Changes rating filter when checkboxes are clicked', () => {
        const changeRating = cy.stub().as('changeRating');
        const changeType = cy.stub().as('changeType');
        const ratings = ['1 star', '2 star', '3 star', 'Villas'];
        mount(<FilterByRating ratings={ratings} changeRating={changeRating} changeType={changeType}/>);

        cy.get('.filter-rating').eq(0).check();
        cy.get('.filter-rating').eq(1).check();
        cy.get('.filter-rating').eq(2).check();

        cy.get('@changeRating').should('have.callCount', 3);
    });

    it('Changes type filter when "Villas "checkbox is clicked', () => {
        const changeRating = cy.stub().as('changeRating');
        const changeType = cy.stub().as('changeType');
        const ratings = ['1 star', '2 star', '3 star', 'Villas'];
        mount(<FilterByRating ratings={ratings} changeRating={changeRating} changeType={changeType}/>);

        cy.get('.filter-rating').eq(3).check();
        cy.get('@changeType').should('have.callCount', 1);
    });
});

describe('FilterByFacilities Component', () => {
    it('Changes facilities filter when checkboxes are clicked', () => {
        const changeFacilities = cy.stub().as('changeFacilities');
        const facilities = ['Swimming Pool', 'Gym'];
        mount(<FilterByFacilities facilities={facilities} changeFacilities={changeFacilities}/>);

        cy.get('.filter-facilities').eq(0).check();
        cy.get('.filter-facilities').eq(1).check();

        cy.get('@changeFacilities').should('have.callCount', 2);
    });
});
