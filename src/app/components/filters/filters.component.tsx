'use client';
import {
    FilterTitle,
    FilterPrice,
    FilterRating,
    FilterFacilities,
    FilterInputWrapper,
    FilterInputLabel,
    FilterInputCheckbox
} from './filters.styled';
import {ChangeEvent} from "react";

export const FilterByPrice = ({ changePrice }: {
    changePrice: any
}) => {
    const prices = ['0,1000', '1000,1500', '1500,2000', '2000,50000'];
    const priceNames = ['up to £1000', '£1000 - £1500', '£1500 - £2000', 'over £2000'];
    const checkboxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const arrValue = value.split(',').map(Number);

        changePrice((prevState: number[][]) => {
            const newState = prevState.slice();
            const index = newState.findIndex(subArray => JSON.stringify(subArray) === JSON.stringify(arrValue));

            if (index === -1) {
                newState.push(arrValue);
            } else {
                newState.splice(index, 1);
            }

            return newState;
        });
    }

    return (
        <FilterPrice>
            <FilterTitle>Price (per person)</FilterTitle>
            {prices.map((price, index) => (
                <FilterInputWrapper key={`price-${index}`}>
                    <FilterInputCheckbox type="checkbox" value={price} id={`${price}-${index}`} onChange={checkboxPriceChange} className="filter-price"/>
                    <FilterInputLabel htmlFor={`${price}-${index}`}>{priceNames[index]}</FilterInputLabel>
                </FilterInputWrapper>
            ))}
        </FilterPrice>
    );
}

export const FilterByRating = ({ratings, changeRating, changeType}: {
    ratings: (string | number)[],
    changeRating: any,
    changeType: (value: string) => void
}) => {
    const checkboxRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const checked = e.currentTarget.checked;

        if (value === 'Villas') {
            if (checked) {
                changeType('villa');
            } else {
                changeType('');
            }
        } else {
            changeRating((prevState: (string | number)[]) => {
                const newState = prevState.slice();

                if (!newState.includes(value)) {
                    newState.push(value);
                } else {
                    newState.splice(newState.indexOf(value), 1);
                }

                return newState;
            });
        }
    };

    return (
        <FilterRating>
            <FilterTitle>Rating</FilterTitle>
            {ratings.map((rating, index) => (
                <FilterInputWrapper key={`rating-${index}`}>
                    <FilterInputCheckbox type="checkbox" value={rating} id={`${rating}-${index}`} onChange={checkboxRatingChange} className="filter-rating" />
                    <FilterInputLabel htmlFor={`${rating}-${index}`}>{rating}</FilterInputLabel>
                </FilterInputWrapper>
            ))}
        </FilterRating>
    );
}

export const FilterByFacilities = ({ facilities, changeFacilities }: {
    facilities: string[],
    changeFacilities: any
}) => {
    const checkboxFacilitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        changeFacilities((prevState: string[]) => {
            const newState = prevState.slice();

            if (!newState.includes(value)) {
                newState.push(value);
            } else {
                newState.splice(newState.indexOf(value), 1);
            }

            return newState;
        });
    };

    return (
        <FilterFacilities>
            <FilterTitle>Facilities</FilterTitle>
            {facilities.map((facility, index) => (
                <FilterInputWrapper key={`facilities-${index}`}>
                    <FilterInputCheckbox type="checkbox" value={facility} id={`${facility}-${index}`} onChange={checkboxFacilitiesChange} className="filter-facilities" />
                    <FilterInputLabel htmlFor={`${facility}-${index}`}>{facility}</FilterInputLabel>
                </FilterInputWrapper>
            ))}
        </FilterFacilities>
    );
}
