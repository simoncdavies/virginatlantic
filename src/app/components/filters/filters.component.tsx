'use client';
import { FilterTitle, FilterPrice, FilterRating, FilterFacilities } from './filters.styled';
import {ChangeEvent} from "react";

export const FilterByPrice = ({ changePrice }: {
    changePrice: any
}) => {
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
            <h2>Price (per person)</h2>
            <p>
                <input type="checkbox" value="0,1000" id="price-1" onChange={checkboxPriceChange} className="filter-price"/>
                <label htmlFor="price-1">up to £1000</label>
            </p>
            <p>
                <input type="checkbox" value="1000,1500" id="price-2" onChange={checkboxPriceChange} className="filter-price"/>
                <label htmlFor="price-2">£1000 - £1500</label>
            </p>
            <p>
                <input type="checkbox" value="1500,2000" id="price-3" onChange={checkboxPriceChange} className="filter-price"/>
                <label htmlFor="price-3">£1500 - £2000</label>
            </p>
            <p>
                <input type="checkbox" value="2000,50000" id="price-4" onChange={checkboxPriceChange} className="filter-price"/>
                <label htmlFor="price-4">over £2000</label>
            </p>
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
            <h2>Rating</h2>
            {ratings.map((rating, index) => (
                <p key={`rating-${index}`}>
                    <input type="checkbox" value={rating} id={`${rating}-${index}`} onChange={checkboxRatingChange} className="filter-rating" />
                    <label htmlFor={`${rating}-${index}`}>{rating}</label>
                </p>
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
            <h2>Facilities</h2>
            {facilities.map((facility, index) => (
                <p key={`facilities-${index}`}>
                    <input type="checkbox" value={facility} id={`${facility}-${index}`} onChange={checkboxFacilitiesChange} className="filter-facilities" />
                    <label htmlFor={`${facility}-${index}`}>{facility}</label>
                </p>
            ))}
        </FilterFacilities>
    );
}
