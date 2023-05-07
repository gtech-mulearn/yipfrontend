export interface navMenuProps {
    icon: string
    name: string
    link: string
}
export interface drawerProps {
    setCurrentOption: (value: string) => void
    currentOption: string
}
export const handleItemClick = (item: string, setActiveItem: Function, setCurrentOption: Function) => {
    setActiveItem(item)
    setCurrentOption(item)
}
export const navMenu: navMenuProps[] = [
    {
        icon: 'fa-school',
        name: 'Model School',
        link: '/school-dashboard'
    },
    {
        icon: 'fa-people-group',
        name: 'YIP Club',
        link: '/club-dashboard'
    }
]
export const removeAccesstoken = () => {
    localStorage.removeItem('accessToken')
    window.location.href = "/"
}