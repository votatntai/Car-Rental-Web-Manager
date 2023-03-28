export interface CarOwner {
    id: string,
    name: string,
    gender: string,
    phone: string,
    avatarUrl: string,
    address: string,
    status: boolean,
    bankName: string,
    bankAccountNumber: string,
    wallet: {
        id: string,
        balance: number,
        status: string,
    },
}

export interface CarOwnerPagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}