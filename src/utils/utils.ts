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
        tableTitleList: ["Name", "District", "Legislative Assembly", "Block", "Status"]
    },
    {
        icon: 'fa-people-group',
        path: '/club-dashboard',
        content: 'YIP Club',
        tableTitleList: ["Name", "District", "Status"]
    },
    {
        icon: "fa-user",
        path: '/user',
        content: 'Users',
        tableTitleList: ["Name", "Email", "Phone", "Role"]
    },
    {
        icon: "fa-users",
        path: '/legislative-assembly',
        content: 'Legislative Assembly',
        tableTitleList: ["Name", "District"]
    },
    {
        icon: 'fa-building',
        path: '/block',
        content: 'Block',
        tableTitleList: ["Name", "District"]
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
export function paginateArray<T>(array: T[], page: number): T[] {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    return array.slice(startIndex, endIndex);
}