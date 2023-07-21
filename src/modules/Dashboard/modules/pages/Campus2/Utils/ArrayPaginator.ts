function paginateArray<T>(array: T[], page: number, countInPage: number): T[] {
    const startIndex = (page - 1) * countInPage;
    const endIndex = startIndex + countInPage;
    return array?.slice(startIndex, endIndex);
}
export default paginateArray