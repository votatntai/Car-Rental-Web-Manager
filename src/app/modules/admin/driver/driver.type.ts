export interface Driver {
    id: string,
    name: string,
    gender: string,
    phone: string,
    avatarUrl: string,
    address: string,
    status: string,
    bankName: string,
    bankAccountNumber: string,
    wallet: {
        id: string,
        balance: number,
        status: string,
    },
    accountStatus: boolean,
}

export interface DriverPagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}