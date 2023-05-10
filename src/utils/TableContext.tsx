import { createContext, useState } from "react";
import { institutionProps } from "../service/dashboardService";


interface TableContextProps {
    showFilterBox: boolean;
    setShowFilterBox: React.Dispatch<React.SetStateAction<boolean>>;
    filterItem: string;
    setFilterItem: React.Dispatch<React.SetStateAction<string>>;
    showSortBox: boolean;
    setShowSortBox: React.Dispatch<React.SetStateAction<boolean>>;
    tableData: institutionProps[];
    setTableData: React.Dispatch<React.SetStateAction<institutionProps[]>>;
    modalTrigger: boolean;
    setModalTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    confirmDelete: boolean;
    setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
    deleteId: string;
    setDeleteId: React.Dispatch<React.SetStateAction<string>>;
    deleteData: boolean;
    setDelete: React.Dispatch<React.SetStateAction<boolean>>;
    statusFilter: string;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
    selectedData: any;
    setSelectedData: React.Dispatch<React.SetStateAction<any>>;
    club: any;
    setClub: React.Dispatch<React.SetStateAction<any>>;
    page: number;
    setPagination: React.Dispatch<React.SetStateAction<number>>;
}
export const TableContext = createContext({} as TableContextProps);

export const TableContextProvider: React.FC<any> = ({ children }) => {
    const [showFilterBox, setShowFilterBox] = useState(false);
    const [filterItem, setFilterItem] = useState("All")
    const [showSortBox, setShowSortBox] = useState(false);
    const [tableData, setTableData] = useState<institutionProps[]>([])
    const [modalTrigger, setModalTrigger] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [deleteData, setDelete] = useState<boolean>(false)
    const [statusFilter, setStatusFilter] = useState("All")
    const [selectedData, setSelectedData] = useState<any>({})
    const [club, setClub] = useState<any>({})
    const [page, setPagination] = useState(1)

    return (
        <TableContext.Provider value={{
            showFilterBox, filterItem,
            setFilterItem, setShowFilterBox,
            showSortBox, setShowSortBox,
            tableData, setTableData,
            modalTrigger, setModalTrigger,
            confirmDelete, setConfirmDelete,
            deleteId, setDeleteId,
            deleteData, setDelete,
            statusFilter, setStatusFilter,
            selectedData, setSelectedData,
            club, setClub,
            page, setPagination
        }}>
            {children}
        </TableContext.Provider>
    )
}