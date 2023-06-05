import roles from "../../../utils/roles"

export interface urlProps {
    icon: string
    url: string
    title: string
    roles?: string[]
}
export const buttons: urlProps[] = [
    {
        icon: "fa-user-secret",
        url: "/intern-dashboard",
        title: "YIP 5.0",
        roles: [
            roles.SUPER_ADMIN,
            roles.ADMIN,
            roles.HQ_STAFF,
            roles.ZONAL_COORDINATOR,
            roles.DISTRICT_COORDINATOR,
            roles.PROGRAMME_EXECUTIVE,
            roles.INTERN,
        ],
    },
    {
        icon: "fa-building",
        url: "/institute-management",
        title: "Institute Management",
        roles: [
            roles.SUPER_ADMIN,
            roles.ADMIN,
            roles.HQ_STAFF
        ],
    },
    {
        icon: "fa-school",
        url: "/school-dashboard",
        title: "Model School",
        roles: [
            roles.SUPER_ADMIN,
            roles.ADMIN,
            roles.HQ_STAFF,
            roles.ZONAL_COORDINATOR,
            roles.DISTRICT_COORDINATOR,
            roles.PROGRAMME_EXECUTIVE,
        ],
    },
    {
        icon: "fa-people-group",
        url: "/club-dashboard",
        title: "YIP Club",
        roles: [
            roles.SUPER_ADMIN,
            roles.ADMIN,
            roles.HQ_STAFF,
            roles.ZONAL_COORDINATOR,
            roles.DISTRICT_COORDINATOR,
            roles.PROGRAMME_EXECUTIVE,
        ],
    },
    {
        icon: "fa-user",
        url: "/user",
        title: "Users",
        roles: [
            roles.SUPER_ADMIN,
            roles.ADMIN,
            roles.HQ_STAFF,
            roles.ZONAL_COORDINATOR,
            roles.DISTRICT_COORDINATOR,
            roles.PROGRAMME_EXECUTIVE,
        ],
    },
    {
        icon: "fa-users",
        url: "/legislative-assembly",
        title: "Legislative Assembly",
        roles: [roles.SUPER_ADMIN, roles.ADMIN],
    },
    {
        icon: "fa-building",
        url: "/block",
        title: "Block",
        roles: [roles.SUPER_ADMIN, roles.ADMIN],
    },
];
export const getCurrentPageTitle = (): string => {
    /**
* Returns a string containing the title of the current page.
*
* @return {string} A string containing the title of the current page.
*/

    for (let i in buttons) if (window.location.pathname === buttons[i].url) return buttons[i].title
    return ''
}