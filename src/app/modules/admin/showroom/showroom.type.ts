export interface Showroom {
    id: string,
    name: string,
    description?: string,
    numberOfCar: number,
    location: Location,
    images: string[]
}

export interface ShowroomPagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}