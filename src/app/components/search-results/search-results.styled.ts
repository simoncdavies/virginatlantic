'use client';

import styled from "styled-components";

export const SearchResultsTitle = styled.h1`
  color: var(--token-color-colour-text-primary);
`;

export const SearchResultsNumber = styled.span`
  color: var(--token-color-colour-brand-red);
`;

export const SearchResultsItem = styled.article`
  margin: 0 0 20px;
  padding: 0 10px 0 0;
  border: solid 1px white;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  display: flex;
  flex-direction: row;
  transition: border 0.2s ease-in;
  
  div {
    box-sizing: border-box;
    flex-basis: 33.3333%;
    margin-left: 10px;
    
    &:first-of-type {
      margin-left: 0;
    }
  }
  
  &:hover {
    border-color: var(--token-color-colour-brand-red);
  }
`;

export const SearchResultsItemImage = styled.img`
  display: block;
  width: 100%;
  border-radius: 5px;
`;

export const SearchResultsItemHotel = styled.a`
  display: block;
  font-size: 2rem;
  font-weight: 600;
  color: var(--token-color-colour-brand-red);
  text-decoration: none;
  margin: 10px 0;
`;

export const SearchResultsItemLocation = styled.p`
  font-size: 1.4rem;
  margin: 0 0 10px;
`;

export const SearchResultsItemRating = styled.p`
  font-size: 1.2rem;
  color: var(--token-color-colour-brand-red);
  margin: 0 0 20px;
`;

export const SearchResultsItemBoardBasis = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 10px;
`;

export const SearchResultsItemDescription = styled.div`
  font-size: 1.4rem;
  margin: 0 0 10px;
`;

export const SearchResultsItemPointsList = styled.ul`
  font-size: 1.3rem;
  margin: 10px 0;
  padding: 0;
  list-style-type: none;
`;

export const SearchResultsItemPointsListItem = styled.li`
  position: relative;
  font-size: 1.3rem;
  margin: 0 0 5px;
  padding: 0 0 0 25px;
  
  &:before {
    content: "\2022";
    font-size: 2rem;
    position: absolute;
    top: -4px;
    left: 0;
    color: var(--token-color-colour-brand-red);
  }
`;

export const SearchResultsItemTotal = styled.p`
  font-size: 1.2rem;
  margin: 0;
`;

export const SearchResultsItemPricePP = styled.p`
  font-size: 3rem;
  font-weight: 600;
  margin: 0 0 10px;
`;

export const SearchResultsItemPricePPBefore = styled.span`
  font-size: 1.4rem;
  font-weight: 300;
  text-decoration: line-through;
  color: var(--token-color-colour-brand-red);
`;

export const SearchResultsItemDiscount = styled.p`
  display: block;
  background-color: rgba(218, 5, 48, 0.2);
  font-size: 1.3rem;
  text-decoration: none;
  text-align: center;
  color: var(--token-color-colour-brand-red);
  margin: 0 0 20px;
  padding: 5px 10px;
  border: solid 1px var(--token-color-colour-brand-red);
  border-radius: 5px;
`;

export const SearchResultsItemViewDetails = styled.a`
  display: block;
  background-color: var(--token-color-colour-brand-red);
  font-size: 1.6rem;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  color: var(--token-color-colour-text-inverted-primary);
  margin: 0 0 10px;
  padding: 5px 10px;
  border: solid 1px var(--token-color-colour-brand-red);
  border-radius: 5px;
  transition: background-color 0.2s ease-in;
  
  &:hover {
    background-color: #c40909;
  }
`;
