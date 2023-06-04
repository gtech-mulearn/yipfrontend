export interface urlProps {
    icon: string
    url: string
    title: string
}
export const buttons: urlProps[] = [
    {
        icon: 'fa-school',
        url: '/school-dashboard',
        title: 'Model School',
    },
    {
        icon: 'fa-people-group',
        url: '/club-dashboard',
        title: 'YIP Club',
    },
    {
        icon: "fa-user",
        url: '/user',
        title: 'Users',
    },
    {
        icon: "fa-users",
        url: '/legislative-assembly',
        title: 'Legislative Assembly',
    },
    {
        icon: 'fa-building',
        url: '/block',
        title: 'Block',
    },
    {
        icon: 'fa-user-secret',
        url: '/intern-dashboard',
        title: 'Internship',
    },
    {
        icon: 'fa-flat',
        url: '/institute-management',
        title: 'Institute Management',
    }
]
export const getCurrentPageTitle = (): string => {
    /**
* Returns a string containing the title of the current page.
*
* @return {string} A string containing the title of the current page.
*/

    for (let i in buttons) if (window.location.pathname === buttons[i].url) return buttons[i].title
    return ''
}