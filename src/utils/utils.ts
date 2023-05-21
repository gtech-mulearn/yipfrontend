import React, { Dispatch, SetStateAction } from 'react'
export interface urlProps {
    icon: string
    path: string
    content: string
    tableTitleList: string[]
}
export const link: urlProps[] = [
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
    },
    {
        icon: "fa-users",
        path: '/legislative-assembly',
        content: 'Legislative Assembly',
        tableTitleList: ["SL", "Name", "District", "Manage"]
    },
    {
        icon: 'fa-building',
        path: '/block',
        content: 'Block',
        tableTitleList: ["SL", "Name", "District", "Manage"]
    }
]
export const getCurrentPageUtils = (): urlProps => {
    for (let i in link) {
        if (window.location.pathname === link[i].path) {
            return link[i]
        }
    }
    return {} as urlProps
}
export function requirementSatisfied(value: string) {
    return value === 'Model School' || value === 'YIP Club'
}
export function updater(setState: Dispatch<SetStateAction<boolean>>) {
    setState(prev => !prev)
}