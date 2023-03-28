export interface Notification {
    id: string,
    title: string,
    body: string,
    isRead: boolean,
    createAt: string,
}

export interface NotificationPagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}