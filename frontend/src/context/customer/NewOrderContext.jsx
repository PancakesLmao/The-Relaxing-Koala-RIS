import { createContext, useContext, useReducer } from "react";


const NewOrderContext = createContext(null);

export function useNewOrderContext() {
    const newOrderCtx = useContext(NewOrderContext)

    if (newOrderCtx === null) {
        throw new Error('newOrderContext is null')
    }

    return newOrderCtx;
}

function newOrderReducer(state, action) {
    if (action.type === 'ADD_ORDER') {
        return [
            ...state,
            action.payload
        ]
    }

    if (action.type === 'GET_ORDERS') {
        return state
    }

    return state
}

export default function NewOrdersContextProvider({children}) {
    const [newOrderState, dispatch] = useReducer(newOrderReducer, []);
    const ctx = {
        newOrders: newOrderState,
        addOrder(newOrderData) {
            dispatch({
                type: 'ADD_ORDER', 
                payload: newOrderData
            })
        },
        getOrder() {
            dispatch({
                type: 'GET_ORDERS'
            })
        }
    }

    return (
        <NewOrderContext.Provider value={ctx}>
            {children}
        </NewOrderContext.Provider>
    )
}