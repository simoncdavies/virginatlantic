'use client';
import styled, { css } from "styled-components";

export const FilterSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  margin-bottom: 20px
`;

export const FilterSectionTitle = styled.h1`
  color: var(--token-color-colour-text-primary);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  margin: 0 0 5px;
`;

export const FilterButtonReset = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 300;
  color: var(--token-color-colour-text-interactive);
  
  &:hover {
    text-decoration: underline;
  }
`;

export const FilterTitle = styled.h2`
  color: var(--token-color-colour-text-primary);
  font-size: 1.3rem;
  margin: 0 0 5px;
`;

const FilterSharedSection = css`
  border: solid 1px var(--token-color-colour-brand-red);
  border-radius: 5px;
  padding: 5px;
  flex-grow: 1;
  box-sizing: border-box;
  margin-left: 10px;
`;

export const FilterPrice = styled.div`
  ${FilterSharedSection};
  margin-left: 0;
`;

export const FilterRating = styled.div`
  ${FilterSharedSection};
`;

export const FilterFacilities = styled.div`
  ${FilterSharedSection};
  flex-grow: 2;
`;

export const FilterInputWrapper = styled.span`
  display: inline-block;
  margin: 0 3px 3px;
`;

export const FilterInputLabel = styled.label`
  font-size: 1.2rem;
  display: inline-block;
  padding: 2px 5px;
  border: solid 1px var(--token-color-colour-border-decorative);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in;
`;

export const FilterInputCheckbox = styled.input`
  display: none;
  margin: 0 5px;
  
  &:checked + label {
    background-color: var(--token-color-colour-brand-red);
    border-color: var(--token-color-colour-brand-red);
    color: var(--token-color-colour-text-inverted-primary);
  }
`;
