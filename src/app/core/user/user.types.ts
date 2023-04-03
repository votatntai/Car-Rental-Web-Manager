export interface User {
    accountId: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
    role: string;
    wallet: {
        id: string;
        balance: number;
        status: string;
    }
}
