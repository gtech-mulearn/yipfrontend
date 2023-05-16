export const handleItemClick = (item: string, setActiveItem: Function, setCurrentOption: Function) => {
    setActiveItem(item)
    setCurrentOption(item)
}

export const removeAccesstoken = () => {
    localStorage.removeItem('accessToken')
    window.location.href = "/"
}