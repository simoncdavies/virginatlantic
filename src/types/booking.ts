export interface BookingRequest {
    bookingType: string
    location: string
    direct: boolean
    departureDate: string
    duration: string
    gateway: string
    partyCompositions: PartyComposition[]
}

export interface BookingResponse {
    holidays: Holiday[]
}

export interface Holiday {
    totalPrice: number
    totalPriceBeforeDiscount: number
    pricePerPerson: number
    pricePerPersonBeforeDiscount: number
    deposit: number
    depositPerPerson: number
    webDiscount: number
    flyingClubMiles: number
    virginPoints: number
    tierPoints: number
    departureDate: string
    selectedDate: string
    hotel: Hotel
}

export interface PartyComposition {
    adults: number
    childAges: number[]
    infants: number
}

export interface Hotel {
    id: string
    name: string
    boardBasis: string
    content: HotelContent
}

export interface HotelContent {
   name: string
   vRating: number | string
   hotelDescription: string
   atAGlance: string[]
   parentLocation: string
   images: HotelImage[]
   holidayType: string[]
   boardBasis: string[]
   hotelLocation: string[]
   accommodationType: string[]
   hotelFacilities: string[]
   starRating: number | string
   propertyType: string
   url: string
}

export interface HotelImage {
    RESULTS_CAROUSEL: Image
    MOBILE_MAIN: Image
    IMAGE_DESCRIPTION: string
}

export interface Image {
    url: string
}
