import React, { Dispatch, FC, SetStateAction, createContext, useEffect, useRef } from 'react';
import { privateGateway } from '../services/apiGateway';
import { setupRoutes } from '../services/urls';
import { toast } from 'react-toastify';
interface userInfoProps {
    name: string
    role: string
}
interface GlobalState {
    userInfo: userInfoProps
}

export const GlobalContext = createContext<GlobalState>({} as GlobalState);

const GlobalVariableProvider: FC<any> = ({ children }) => {
    const [userInfo, setUserInfo] = React.useState<userInfoProps>({} as userInfoProps);
    const fetchedUserInfo = useRef(false)
    useEffect(() => {
        if (!fetchedUserInfo.current) {
            console.log('fetchedUserInfo', fetchedUserInfo.current)
            fetchUserInfo(setUserInfo);
            fetchedUserInfo.current = true;
        }
    }, [])
    return (
        <GlobalContext.Provider value={{ userInfo }}>
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
export default GlobalVariableProvider