'use client';
import { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import { BookingResponse, Holiday } from "@/types/booking";
import {
    SearchResultsItem,
    SearchResultsItemImage,
    SearchResultsItemHotel,
    SearchResultsTitle,
    SearchResultsNumber,
    SearchResultsItemLocation,
    SearchResultsItemBoardBasis,
    SearchResultsItemRating,
    SearchResultsItemDescription,
    SearchResultsItemPointsList,
    SearchResultsItemPointsListItem,
    SearchResultsItemTotal,
    SearchResultsItemPricePP,
    SearchResultsItemPricePPBefore,
    SearchResultsItemDiscount,
    SearchResultsItemViewDetails
} from './search-results.styled';
import { FilterSection, FilterSectionTitle, FilterButtonReset } from '../filters/filters.styled';
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
        console.log(response);
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
            <FilterSectionTitle>
                Filter by...
                <FilterButtonReset onClick={() => resetFilters()}>reset all</FilterButtonReset>
            </FilterSectionTitle>
            <FilterSection>
                <FilterByPrice changePrice={setFilterPrice}/>
                <FilterByRating ratings={uniqueRatings} changeRating={setFilterRating} changeType={setFilterType}/>
                <FilterByFacilities facilities={uniqueFacilities} changeFacilities={setFilterFacilities}/>
            </FilterSection>
            <section>
                <SearchResultsTitle><SearchResultsNumber>{holidays?.length}</SearchResultsNumber> results found</SearchResultsTitle>
                {
                    holidays.map((holiday, index) => {
                        {/* TODO: request params to be added to end of this URL */}
                        const url = `https://www.virginholidays.co.uk/holiday${holiday.hotel.content.url}`;

                        return (
                            <SearchResultsItem className="search-results-item" key={`hol-${index}`}>
                                <div>
                                    <SearchResultsItemImage src={holiday.hotel.content.images[0].RESULTS_CAROUSEL.url} alt={holiday.hotel.content.images[0].IMAGE_DESCRIPTION}/>
                                </div>
                                <div>
                                    <SearchResultsItemHotel href={url}>{holiday.hotel.name}</SearchResultsItemHotel>
                                    <SearchResultsItemLocation>{holiday.hotel.content.parentLocation}</SearchResultsItemLocation>
                                    <SearchResultsItemRating>Virgin Rating of {holiday.hotel.content.vRating}</SearchResultsItemRating>
                                    <SearchResultsItemBoardBasis>{holiday.hotel.boardBasis}</SearchResultsItemBoardBasis>
                                    <SearchResultsItemDescription>{decode(holiday.hotel.content.hotelDescription)}</SearchResultsItemDescription>
                                </div>
                                <div>
                                    <SearchResultsItemPointsList>
                                        {
                                            holiday.hotel.content.atAGlance.map((point, index) => {
                                                return (<SearchResultsItemPointsListItem key={`point-${index}`}>{decode(point)}</SearchResultsItemPointsListItem>);
                                            })
                                        }
                                    </SearchResultsItemPointsList>
                                    <SearchResultsItemTotal>
                                        {/* TODO: get guest data from params */}
                                        Total for 2 guests £{holiday.totalPrice}
                                    </SearchResultsItemTotal>
                                    <SearchResultsItemPricePP>
                                        <SearchResultsItemPricePPBefore>£{holiday.pricePerPersonBeforeDiscount}</SearchResultsItemPricePPBefore> £{holiday.pricePerPerson}pp
                                    </SearchResultsItemPricePP>
                                    <SearchResultsItemDiscount>Includes total discount of £{holiday.webDiscount}</SearchResultsItemDiscount>
                                    <SearchResultsItemViewDetails href={url}>View Details</SearchResultsItemViewDetails>
                                </div>
                            </SearchResultsItem>);
                    })
                }
            </section>
        </>
    );
};

export default SearchResults;
