/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'materials',
        title: 'Vật tư',
        subtitle: 'Quản lý vật tư',
        type: 'group',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'materials.machines',
                title: 'Quản Lý Xe',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/materials/machines'
            },
            {
                id: 'materials.carRegistration',
                title: 'Quản Lý Đăng Ký Xe',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/materials/car-registrations'
            },
            {
                id: 'materials.models',
                title: 'Quản Lý Mẫu Xe',
                type: 'basic',
                icon: 'heroicons_outline:database',
                link: '/materials/models'
            },
            {
                id: 'materials.showrooms',
                title: 'Quản Lý Showroom (Chưa hoàn thành)',
                type: 'basic',
                icon: 'heroicons_outline:library',
                link: '/materials/showrooms'
            },
            {
                id: 'materials.showroom-machines',
                title: 'Xe Của Showroom (Chưa hoàn thành)',
                type: 'basic',
                icon: 'heroicons_outline:puzzle',
                link: '/materials/showroom-machines'
            },
        ]
    },
    {
        id: 'comercials',
        title: 'Dịch vụ',
        subtitle: 'Quản lý dịch vụ',
        type: 'group',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'comercials.orders',
                title: 'Quản Lý Đơn hàng',
                type: 'basic',
                icon: 'heroicons_outline:library',
                link: '/comercials/orders'
            },
        ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'materials',
        title: 'Vật tư',
        subtitle: 'Quản lý vật tư',
        type: 'group',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'materials.machines',
                title: 'Quản Lý Xe',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/materials/machines'
            },
            {
                id: 'materials.carRegistration',
                title: 'Quản Lý Đăng Ký Xe',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/materials/car-registrations'
            },
            {
                id: 'materials.models',
                title: 'Quản Lý Mẫu Xe',
                type: 'basic',
                icon: 'heroicons_outline:database',
                link: '/materials/models'
            },
            {
                id: 'materials.showrooms',
                title: 'Quản Lý Showroom (Chưa hoàn thành)',
                type: 'basic',
                icon: 'heroicons_outline:library',
                link: '/materials/showrooms'
            },
            {
                id: 'materials.showroom-machines',
                title: 'Xe Của Showroom (Chưa hoàn thành)',
                type: 'basic',
                icon: 'heroicons_outline:puzzle',
                link: '/materials/showroom-machines'
            },
        ]
    },
    {
        id: 'comercials',
        title: 'Dịch vụ',
        subtitle: 'Quản lý dịch vụ',
        type: 'group',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'comercials.orders',
                title: 'Quản Lý Đơn hàng',
                type: 'basic',
                icon: 'heroicons_outline:library',
                link: '/comercials/orders'
            },
        ]
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'materials',
        title: 'Vật tư',
        subtitle: 'Quản lý vật tư',
        type: 'group',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'materials.machines',
                title: 'Quản Lý Xe',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/materials/machines'
            },
            {
                id: 'materials.carRegistration',
                title: 'Quản Lý Đăng Ký Xe',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/materials/car-registrations'
            },
            {
                id: 'materials.models',
                title: 'Quản Lý Mẫu Xe',
                type: 'basic',
                icon: 'heroicons_outline:database',
                link: '/materials/models'
            },
            {
                id: 'materials.showrooms',
                title: 'Quản Lý Showroom (Chưa hoàn thành)',
                type: 'basic',
                icon: 'heroicons_outline:library',
                link: '/materials/showrooms'
            },
            {
                id: 'materials.showroom-machines',
                title: 'Xe Của Showroom (Chưa hoàn thành)',
                type: 'basic',
                icon: 'heroicons_outline:puzzle',
                link: '/materials/showroom-machines'
            },
        ]
    },
    {
        id: 'comercials',
        title: 'Dịch vụ',
        subtitle: 'Quản lý dịch vụ',
        type: 'group',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'comercials.orders',
                title: 'Quản Lý Đơn hàng',
                type: 'basic',
                icon: 'heroicons_outline:library',
                link: '/comercials/orders'
            },
        ]
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'materials',
        title: 'Vật tư',
        subtitle: 'Quản lý vật tư',
        type: 'group',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'materials.machines',
                title: 'Quản Lý Xe',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/materials/machines'
            },
            {
                id: 'materials.carRegistration',
                title: 'Quản Lý Đăng Ký Xe',
                type: 'basic',
                icon: 'heroicons_outline:pencil-alt',
                link: '/materials/car-registrations'
            },
            {
                id: 'materials.models',
                title: 'Quản Lý Mẫu Xe',
                type: 'basic',
                icon: 'heroicons_outline:database',
                link: '/materials/models'
            },
            {
                id: 'materials.showrooms',
                title: 'Quản Lý Showroom (Chưa hoàn thành)',
                type: 'basic',
                icon: 'heroicons_outline:library',
                link: '/materials/showrooms'
            },
            {
                id: 'materials.showroom-machines',
                title: 'Xe Của Showroom (Chưa hoàn thành)',
                type: 'basic',
                icon: 'heroicons_outline:puzzle',
                link: '/materials/showroom-machines'
            },
        ]
    },
    {
        id: 'comercials',
        title: 'Dịch vụ',
        subtitle: 'Quản lý dịch vụ',
        type: 'group',
        icon: 'heroicons_outline:user',
        children: [
            {
                id: 'comercials.orders',
                title: 'Quản Lý Đơn hàng',
                type: 'basic',
                icon: 'heroicons_outline:library',
                link: '/comercials/orders'
            },
        ]
    }
];
