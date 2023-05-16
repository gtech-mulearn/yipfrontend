import { createContext, useState } from "react";
import { useLocation } from 'react-router-dom';
import { DashboardContextProps } from "../service/dashboardService";
import { institutionProps } from "../service/dataHandler";


export const DashboardContext = createContext<DashboardContextProps>({} as DashboardContextProps)

export const DashboardContextProvider: React.FC<any> = ({ children }) => {
    const location = useLocation()
    const currentLocation = location.pathname
    let value = ''
    switch (currentLocation) {
        case '/club-dashboard': value = 'YIP Club'
            break
        case '/school-dashboard': value = 'Model School'
            break
    }
    const [currentOption, setCurrentOption] = useState(value)
    const [dataUpdate, setUpdateData] = useState(false)
    const [create, setCreate] = useState(false)
    const [institutions, setInstitutions] = useState<institutionProps[]>([])

    return (
        <DashboardContext.Provider value={{
            currentOption, setCurrentOption,
            dataUpdate, setUpdateData,
            create, setCreate,
            institutions, setInstitutions
        }}>
            {children}
        </DashboardContext.Provider>
    )
}