'use client';

import styled from "styled-components";

export const SearchResultsItem = styled.article`
  background-color: palevioletred;
  border-radius: 5px;
  margin: 0 0 20px;
  padding: 10px;
  
  &.search-results-item {
    &__hidden {
      display: none;
    }
  }
`;
