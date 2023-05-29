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
        create: '/api/v1/yip/create-user/',
    },
    assembly: {
        create: '/api/v1/yip/create-legislative-assembly/',
    },
    district: {
        list: '/api/v1/yip/district/',
        college: '/api/v1/yip/list-colleges/',
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
    school: {
        list: '/api/v1/yip/get-model-schools/',
        delete: '/api/v1/yip/delete-model-schools/'
    },
    club: {
        list: '/api/v1/yip/get-colleges/',
        delete: '/api/v1/yip/delete-model-schools/'
    },
    assembly: {
        list: '/api/v1/yip/list-legislative-assembly/',
        delete: '/api/v1/yip/delete-legislative-assembly/'
    },
    block: {
        list: '/api/v1/yip/list-blocks/',
        delete: '/api/v1/yip/delete-block/'
    },
    status: {
        list: '/api/v1/yip/list-clubs-status/',
        update: '/api/v1/yip/update-club/'
    },
    user: {
        list: '/api/v1/yip/list-users/',
        delete: '/api/v1/yip/delete-user/'
    }
}
export const campusRoutes = {
    designation: {
        list: '/api/v1/yip/sub-user-role-choices/'
    },
    subUser: {
        create: '/api/v1/yip/create-sub-user/',
        list: '/api/v1/yip/list-sub-user/',
        delete: '/api/v1/yip/delete-sub-user/'
    }
}