export interface Notification {
    id: string,
    title: string,
    body: string,
    data: NotificationData
}

export interface NotificationData {
    isRead: boolean,
    createAt: string,
    type: 'Order' | 'None',
    link: string,
}

export interface NotificationPagination {
    pageSize: number;
    pageNumber: number;
    totalRow: number;
}