export interface ProductionCompany {
    id: string,
    name: string,
    description?: string
}

export interface ProductionCompanyPagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}