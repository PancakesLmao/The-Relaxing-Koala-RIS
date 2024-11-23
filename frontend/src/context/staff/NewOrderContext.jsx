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
        const existedItem = state.findIndex(item => item.menu_item.menu_item_id === action.payload.menu_item.menu_item_id)
        if (existedItem !== -1) {
            let newState = state;
            let newNote = ""
            if (action.payload.notes) {
                newNote = action.payload.notes
            } else {
                newNote = newState[existedItem].notes
            }
            newState[existedItem] = {
                ...action.payload,
                quantity: newState[existedItem].quantity + action.payload.quantity/2,
                notes: newNote
            }

            return [
                ...newState
            ]
        }
        return [
            ...state,
            action.payload
        ]
    }

    if (action.type === 'CLEAN_ORDERS') {
        return [

        ]
    }

    if (action.type === 'DELETE_ITEM') {
        let newStates = state

        return newStates.filter(item => item.menu_item.item_name !== action.payload.menu_item.item_name)
    }

    if (action.type === 'EDIT_ITEM') {
        const existedItem = state.findIndex(item => item.menu_item.menu_item_id === action.payload.menu_item.menu_item_id)
        if (existedItem !== -1) {
            let newState = state;
            newState[existedItem] = {
                ...action.payload,
                quantity: action.payload.quantity,
                notes: action.payload.notes
            }

            return [
                ...newState
            ]
        }

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
        clearOrder() {
            dispatch({
                type: 'CLEAN_ORDERS'
            })
        },
        deleteItem(orderItem) {
            dispatch({
                type: 'DELETE_ITEM',
                payload: orderItem
            })
        },
        editOrder(orderItem) {
            dispatch({
                type: 'EDIT_ITEM',
                payload: orderItem
            })
        }
    }

    return (
        <NewOrderContext.Provider value={ctx}>
            {children}
        </NewOrderContext.Provider>
    )
}