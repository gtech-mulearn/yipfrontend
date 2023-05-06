interface urlProps {
    path: string
    content: string
}

export interface dashboardProps {
    content: string
    dataUpdate: boolean
    create: boolean
    setCreate: Function
    setUpdateData: Function
}

export const link = [
    {
        path: '/school-dashboard',
        content: 'Model School',
    },
    {
        path: '/club-dashboard',
        content: 'YIP Club',
    }

]