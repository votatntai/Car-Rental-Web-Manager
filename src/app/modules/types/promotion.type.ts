export interface Promotion {
    id: string,
    name: string,
    description?: string,
    discount: number,
    createAt: string,
    expiryAt: string
}