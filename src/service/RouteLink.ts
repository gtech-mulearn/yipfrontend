export interface urlProps {
    icon: string
    path: string
    content: string
    tableTitleList: string[]
}

export interface dashboardProps {
    content: string
}

export const link = [
    {
        icon: 'fa-school',
        path: '/school-dashboard',
        content: 'Model School',
        tableTitleList: ["SL", "Name", "District", "Legislative Assembly", "Block", "Status", "Manage"]
    },
    {
        icon: 'fa-people-group',
        path: '/club-dashboard',
        content: 'YIP Club',
        tableTitleList: ["SL", "Name", "District", "Status", "Manage"]
    },
    {
        icon: "fa-user",
        path: '/user',
        content: 'Users',
        tableTitleList: ["SL", "Name", "Email", "Phone", "Role", "Manage"]
    }
]