export function Category(type: string): string {
    if (type === 'school') {
        return 'Model School'
    }
    else if (type === 'club') {
        return 'YIP Club'
    }
    return ''
}