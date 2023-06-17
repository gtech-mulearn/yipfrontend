import React, { Dispatch, FC, SetStateAction, createContext, useEffect, useRef } from 'react';
import { privateGateway } from '../services/apiGateway';
import { setupRoutes } from '../services/urls';
import { toast } from 'react-toastify';
import { AES, enc } from 'crypto-js';
const secretKey = import.meta.env.VITE_SECRET_KEY || 'dwsdssecret'
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
function fetchData(setData: Dispatch<SetStateAction<userInfoProps>>) {
    privateGateway.get(setupRoutes.user.info)
        .then((res) => {
            setData(res.data.response)
            let encrypted = AES.encrypt(JSON.stringify(res.data.response), secretKey).toString()
            localStorage.setItem('userRole', encrypted)
        })
        .catch((err: any) => {
            toast.error('Error :', err?.response.data.message.general[0] || err.message)
        })
}
function fetchUserInfo(setData: Dispatch<SetStateAction<userInfoProps>>) {
    const userRole = localStorage.getItem('userRole')
    if (userRole) {
        let decrypted = ''
        try {
            decrypted = AES.decrypt(userRole, secretKey).toString(enc.Utf8);
            const user = JSON.parse(decrypted)
            setData(user)
        } catch (error) {
            fetchData(setData)
        }
    }
    else {
        fetchData(setData)
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