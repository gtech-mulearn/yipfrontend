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

}

export const GlobalContext = createContext<GlobalState>({} as GlobalState);

const GlobalVariableProvider: FC<any> = ({ children }) => {

    const [userInfo, setUserInfo] = React.useState<userInfoProps>({} as userInfoProps);
    const [roles, setRoles] = React.useState<selectProps[]>([]);
    const fetchedUserInfo = useRef(false)
    useEffect(() => {
        if (!fetchedUserInfo.current) {
            console.log('fetchedUserInfo', fetchedUserInfo.current)
            fetchUserInfo(setUserInfo);
            fetchUserRoles(setRoles);
            fetchedUserInfo.current = true;
        }
    }, [])
    return (
        <GlobalContext.Provider value={{ userInfo, roles }}>
            {children}
        </GlobalContext.Provider>
    );
}
function fetchUserInfo(setData: Dispatch<SetStateAction<userInfoProps>>) {
    privateGateway.get(setupRoutes.user.info)
        .then((res) => {
            setData(res.data.response)
        })
        .catch((err: any) => {
            toast.error('Error :', err?.response.data.message.general[0] || err.message)
        })
}
function fetchUserRoles(setData: Dispatch<SetStateAction<selectProps[]>>) {
    privateGateway.get(setupRoutes.user.roles.list)
        .then(res => res.data.response.roles)
        .then(data =>
            setData(data?.map((item: { value: string, label: string }) =>
                ({ id: item.value, name: item.label }))))
        .catch(err => console.error(err))
}
export default GlobalVariableProvider