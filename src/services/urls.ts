export const version = 'v1/'
export const consumer = 'yip/'
const header = `/api/${version}${consumer}`
const userManagement = header + 'user-management/'
export const user = {
    // C -Create
    create: `${userManagement}create-user/`,
    // R -Read
    all: `${userManagement}list-users/`,
    role: `${userManagement}list-users-by-roles/`,
    campus: `${userManagement}list-campus-details/`,
    intern: `${userManagement}list-intern-details/`,
    district: `${userManagement}list-district-details/`,
    zone: `${userManagement}list-zone-details/`,
    state: `${userManagement}list-state-details/`,
    report: `${userManagement}list-intern-district-details/`,
    // U -Update
    update: `${userManagement}edit-user/`,
    upload: `${userManagement}upload-submissions/`,
    reset: `${userManagement}reset-password/`,
    // D -Delete
    delete: `${userManagement}delete-user/`,
    // E - Export
    submissions: `${userManagement}get-submissions/`,
    // V - Validate
    forgot: `${userManagement}forgot-password/`,
    //  *** NON-MANAGEMENT *** //
    login: `${header}login/`,
    // R - Read
    roles: `${header}list-roles/`,
    info: `${header}info/`,
}
const instituteManagement = `${header}institute-management/`
const count = `${header}get-clubs-count/`
const institute = {
    // C -Create
    create: `${instituteManagement}create-institute/`,
    // R -Read
    all: `${instituteManagement}list-institutes/`,
    district: `${instituteManagement}list-new-institutes/`,
    user: `${instituteManagement}list-institutes-by-user/`,
    // U -Update
    update: `${instituteManagement}edit-institute/`,
    // D -Delete
    delete: `${instituteManagement}delete-institute/`,
    // *** NON-MANAGEMENT *** //

    // R - Read
    collegeStatus: `${count}College/`,
    schoolCount: `${count}School/`,
}
const location = {
    // C -Create
    create: {
        assembly: `${header}create-legislative-assembly/`,
        block: `${header}create-block/`,
        school: `${header}create-model-school-club/`,
        club: `${header}create-college-club/`,
    },
    // R -Read
    district: `${header}district/`,
    school: `${header}list-model-schools/`,
    assembly: `${header}get-legislative-assembly/`,
    block: `${header}get-blocks/`,
}






export const authRoutes = {
    login: "/api/v1/yip/login/"
}
export const bannerRoutes = {
    schoolBanner: "/api/v1/yip/get-clubs-count/School/",
    clubBanner: "/api/v1/yip/get-clubs-count/College/"
}
export const setupRoutes = {
    user: {
        info: '/api/v1/yip/info/',
        roles: {
            list: "/api/v1/yip/list-roles/",
        },
        create: '/api/v1/yip/user-management/create-user/',
        update: '/api/v1/yip/user-management/edit-user/',
        instituteDisconnect: '/api/v1/yip/user-management/remove-user-institute-link/',
    },
    assembly: {
        create: '/api/v1/yip/create-legislative-assembly/',
    },
    district: {
        list: '/api/v1/yip/district/',
        // college: '/api/v1/yip/list-colleges/',
        school: '/api/v1/yip/list-model-schools/',
        assembly: '/api/v1/yip/get-legislative-assembly/',
        block: '/api/v1/yip/get-blocks/',
    },
    block: {
        create: '/api/v1/yip/create-block/'
    },
    school: {
        create: '/api/v1/yip/create-model-school-club/'
    },
    club: {
        create: '/api/v1/yip/create-college-club/'
    }
}
export const tableRoutes = {
    institutes: {
        list: "/api/v1/yip/institute-management/list-institutes/",
        create: 'api/v1/yip/institute-management/create-institute/'
    },
    school: {
        list: "/api/v1/yip/get-model-schools/",
        delete: "/api/v1/yip/delete-model-schools/",
    },
    club: {
        create: 'api/v1/yip/club-management/create-college-club/',
        list: "/api/v1/yip/list-yip-clubs/",
        delete: "/api/v1/yip/delete-model-schools/",
    },
    assembly: {
        list: "/api/v1/yip/list-legislative-assembly/",
        delete: "/api/v1/yip/delete-legislative-assembly/",
    },
    block: {
        list: "/api/v1/yip/list-blocks/",
        delete: "/api/v1/yip/delete-block/",
    },
    status: {
        list: "/api/v1/yip/list-clubs-status/",
        update: "/api/v1/yip/update-club/",
    },
    user: {
        list: "/api/v1/yip/user-management/list-users/",
        delete: "/api/v1/yip/user-management/delete-user/",
        listByRoles: "api/v1/yip/user-management/list-users-by-roles/",
        uploadSubmissions: "api/v1/yip/user-management/upload-submissions/",
    },
};
export const campusRoutes = {
    designation: {
        list: {
            facilitator: '/api/v1/yip/sub-user-role-choices/POC/',
            execom: '/api/v1/yip/sub-user-role-choices/Execom/',
        }

    },
    subUser: {
        create: '/api/v1/yip/create-sub-user/',
        list: '/api/v1/yip/list-sub-user/',
        listExecom: '/api/v1/yip/list-sub-user/',
        delete: '/api/v1/yip/delete-sub-user/',
    },
    districtCoordinator: {
        listByDistrict: '/api/v1/yip/list-district-cordinator/',
    },
    campus: {
        info: '/api/v1/yip/club-info/',
    },
    createEvent: '/api/v1/yip/create-event/',
    listEvent: '/api/v1/yip/list-events/',
    updateEvent: '/api/v1/yip/edit-event/',
    listInstitutesByDistrict: '/api/v1/yip/institute-management/list-new-institutes/',
    connectIctToInstitute: "api/v1/yip/institute-management/create-institute/",
    listInstitutes: '/api/v1/yip/institute-management/list-institutes/',
    listInstituteByUser: '/api/v1/yip/institute-management/list-institutes-by-user/',
    editIctId: 'api/v1/yip/institute-management/edit-institute/',
    listDistrict: 'api/v1/yip/district/'

}
export const yip5Routes = {
    bannerData: '/api/v1/yip/user-management/get-submissions/',
    zoneList: '/api/v1/yip/zone-management/list-zones/',
    campusList: '/api/v1/yip/user-management/list-campus-details/',
    internList: '/api/v1/yip/user-management/list-intern-details/',
    // listCoordinator: '/api/v1/yip/user-management/list-pe-or-dc-details/',
    // listPE: '/api/v1/yip/user-management/list-pe-or-dc-details/PE/',
    // listDC: '/api/v1/yip/user-management/list-pe-or-dc-details/DC/',
    listDistrict: '/api/v1/yip/user-management/list-district-details/',
    zoneBasedData: '/api/v1/yip/user-management/list-zone-details/',
    stateBasedData: '/api/v1/yip/user-management/list-state-details/',
}
export const password = {
    forgotPassword: '/api/v1/yip/user-management/forgot-password/',
    resetPassword: 'api/v1/yip/user-management/reset-password/'
}
