export interface Driver {
    accountId: string,
    name: string,
    gender: string,
    phone: string,
    avatarUrl: string,
    address: string,
    status: string,
    star: number,
    finished: number,
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