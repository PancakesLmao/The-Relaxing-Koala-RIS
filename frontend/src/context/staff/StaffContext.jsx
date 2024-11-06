import { createContext, useContext } from "react"


const StaffContext = createContext()

export function useStaffContext() {
    const staff_context = useContext(StaffContext);

    return staff_context;
}