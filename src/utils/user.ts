export const getDisplayName = (user: any): string => {
    return user?.name || user?.email || "";
}
