import React, { Dispatch, FC, SetStateAction, createContext, useEffect, useRef } from 'react';
import { privateGateway } from '../services/apiGateway';
import { setupRoutes } from '../services/urls';
import { toast } from 'react-toastify';
interface userInfoProps {
    name: string
    role: string
}
interface selectProps {
    id: string
    name: string
}
interface GlobalState {
    userInfo: userInfoProps
    roles: selectProps[]
    districts: selectProps[]
}

export const GlobalContext = createContext<GlobalState>({} as GlobalState);

const GlobalVariableProvider: FC<any> = ({ children }) => {
    const [districts, setDistricts] = React.useState<selectProps[]>([]);
    const [userInfo, setUserInfo] = React.useState<userInfoProps>({} as userInfoProps);
    const [roles, setRoles] = React.useState<selectProps[]>([]);
    const fetchedUserInfo = useRef(false)
    useEffect(() => {
        if (!fetchedUserInfo.current) {
            console.log('fetchedUserInfo', fetchedUserInfo.current)
            fetchUserInfo(setUserInfo);
            fetchUserRoles(setRoles);
            fetchDistricts(setDistricts);
            fetchedUserInfo.current = true;
        }
    }, [])
    return (
        <GlobalContext.Provider value={{ userInfo, roles, districts }}>
            {children}
        </GlobalContext.Provider>
    );
}
function fetchUserInfo(setData: Dispatch<SetStateAction<userInfoProps>>) {
    const userRole = localStorage.getItem('userRole')
    if (userRole) {
        const user = JSON.parse(userRole)
        setData(user)
    }
    else {
        privateGateway.get(setupRoutes.user.info)
            .then((res) => {
                setData(res.data.response)
                localStorage.setItem('userRole', JSON.stringify(res.data.response))
            })
            .catch((err: any) => {
                toast.error('Error :', err?.response.data.message.general[0] || err.message)
            })
    }
}
function fetchUserRoles(setData: Dispatch<SetStateAction<selectProps[]>>) {
    const roles = localStorage.getItem('roles')
    if (roles) {
        const userRoles = JSON.parse(roles)
        setData(userRoles)
    }
    else {
        privateGateway.get(setupRoutes.user.roles.list)
            .then(res => res.data.response.roles)
            .then(data => {
                const optionizedRoles = data?.map((item: { value: string, label: string }) =>
                    ({ id: item.value, name: item.label }))
                setData(optionizedRoles)
                localStorage.setItem('roles', JSON.stringify(optionizedRoles))
            })
            .catch(err => console.error(err))
    }
}
function fetchDistricts(setData: Dispatch<SetStateAction<selectProps[]>>) {
    const districts = localStorage.getItem('districts')
    if (districts) {
        const districtsArray = JSON.parse(districts)
        setData(districtsArray)
    }
    else {
        privateGateway.get(setupRoutes.district.list)
            .then(res => res.data.response.districts)
            .then(data => {
                setData(data)
                localStorage.setItem('districts', JSON.stringify(data))
            })
            .catch(err => console.error(err))
    }
}
export default GlobalVariableProvider