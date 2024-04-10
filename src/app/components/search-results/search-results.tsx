'use client';
import { useEffect, useState } from 'react';
import { BookingResponse, Holiday } from "@/types/booking";
import { SearchResultsItem } from './search-results.styled';
import { FilterByPrice, FilterByRating, FilterByFacilities } from "../filters/filters.component";

const SearchResults = ({ response }: { response: BookingResponse }) => {
    const [results, setResults] = useState<BookingResponse>(response);
    const [holidays, setHolidays] = useState<Holiday[]>(results.holidays);
    const [filterPrice, setFilterPrice] = useState<number[][]>([]);
    const [filterRating, setFilterRating] = useState<string[]>([]);
    const [filterType, setFilterType] = useState<string>('');
    const [filterFacilities, setFilterFacilities] = useState<string[]>([]);

    useEffect(() => {
        setResults(response);
    }, []);

    useEffect(() => {
        let filteredHolidays: Holiday[] = results.holidays.slice();

        if (filterPrice.length > 0) {
            filteredHolidays = filteredHolidays.filter(holiday => {
                const pricePerPerson = holiday.pricePerPerson;
                return filterPrice.some(range => pricePerPerson >= range[0] && pricePerPerson <= range[1]);
            });
        }

        if (filterRating.length > 0) {
            filteredHolidays = filteredHolidays.filter(holiday => filterRating.includes(holiday.hotel.content.vRating as string));
        }

        if (filterFacilities.length > 0) {
            filteredHolidays = filteredHolidays.filter(holiday => {
                const facilities = holiday.hotel.content.hotelFacilities;
                return filterFacilities.every(facility => facilities.includes(facility));
            });
        }

        if (filterType !== '') {
            filteredHolidays = filteredHolidays.filter((holiday: Holiday) => holiday.hotel.content.propertyType.toLowerCase() === filterType);
        }

        setHolidays(filteredHolidays);
    }, [filterPrice, filterRating, filterType, filterFacilities]);

    const resetFilters = () => {
        const checkboxesPrice: NodeListOf<HTMLInputElement> = document.querySelectorAll('.filter-price');
        const checkboxesRating: NodeListOf<HTMLInputElement> = document.querySelectorAll('.filter-rating');
        const checkboxesFacilities: NodeListOf<HTMLInputElement> = document.querySelectorAll('.filter-facilities');

        checkboxesPrice.forEach((cb: HTMLInputElement) => cb.checked = false);
        checkboxesRating.forEach((cb: HTMLInputElement) => cb.checked = false);
        checkboxesFacilities.forEach((cb: HTMLInputElement) => cb.checked = false);

        setFilterPrice([]);
        setFilterRating([]);
        setFilterType('');
        setFilterFacilities([]);
        setHolidays(results.holidays);
    };

    const allFacilities = results.holidays.flatMap(holiday => holiday.hotel.content.hotelFacilities);
    const filteredFacilities = allFacilities.filter(item => item !== "NA" && typeof item !== 'undefined');
    const uniqueFacilities = Array.from(new Set(filteredFacilities));

    const allRatings = results.holidays.flatMap(holiday => holiday.hotel.content.vRating);
    const filteredRatings = allRatings.filter(item => item !== "NA" && typeof item !== 'undefined');
    const uniqueRatings = Array.from(new Set(filteredRatings));
    uniqueRatings.push('Villas');

    return (
        <>
            <section>
                <button onClick={() => resetFilters()}>reset</button>
                <FilterByPrice changePrice={setFilterPrice}/>
                <FilterByRating ratings={uniqueRatings} changeRating={setFilterRating} changeType={setFilterType}/>
                <FilterByFacilities facilities={uniqueFacilities} changeFacilities={setFilterFacilities}/>
            </section>
            <section>
                <h2>{holidays?.length} results found</h2>
                {
                    holidays.map((holiday, index) => {
                        return (
                            <SearchResultsItem className="search-results-item" key={`hol-${index}`} data-rating={holiday.hotel.content.vRating} data-facilities={holiday.hotel.content.hotelFacilities} data-price={holiday.totalPrice}>
                                <h1>{holiday.hotel.name}</h1>
                                <h1>{holiday.hotel.content.vRating}</h1>
                                <h2>{holiday.hotel.boardBasis}</h2>
                                <h3>
                                    <span style={{'textDecoration': 'line-through'}}>{holiday.totalPriceBeforeDiscount}</span> {holiday.totalPrice}
                                </h3>
                                <h4>
                                    <span style={{'textDecoration': 'line-through'}}>{holiday.pricePerPersonBeforeDiscount}</span> {holiday.pricePerPerson}
                                </h4>
                                <h5>{holiday.webDiscount}</h5>
                                <img src={holiday.hotel.content.images[0].RESULTS_CAROUSEL.url} alt={holiday.hotel.content.images[0].IMAGE_DESCRIPTION}/>
                                <p>{holiday.hotel.content.images.length}</p>
                                <p>{holiday.hotel.content.parentLocation}</p>
                            </SearchResultsItem>);
                    })
                }
            </section>
        </>
    );
};

export default SearchResults;
