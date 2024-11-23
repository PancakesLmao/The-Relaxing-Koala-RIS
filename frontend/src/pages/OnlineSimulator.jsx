import { useState } from "react"

export default function OnlineSimulator() {
    const [msg, SetMsg] = useState("")
    const mockOrder = {
        customer_name: "Customer A",
        orders: [
            {
                menu_item_id: 1,
                quantity: 1,
                note: "No Spicy"
            },
            {
                menu_item_id: 2,
                quantity: 2,
                note: "No Spicy"
            },
            {
                menu_item_id: 3,
                quantity: 3,
                note: ""
            },
            {
                menu_item_id: 4,
                quantity: 4,
                note: ""
            }
        ]
    }

    
    function createMockupOnlineOrder() {
        fetch('http://127.0.0.1:8000/orders/add-online-order', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mockOrder)
        }).then(
            response => {
                if (response.status === 204) {
                    SetMsg("Create online order success")
                    return
                }

                return Promise.reject()
            }
        ).catch(() => {
            SetMsg("Something went wrong")
        })
    }

    return (
        <div>
            <h1>Online Simulator</h1>
            <button className="p-[1vw] bg-gunmetal font-medium text-honeydew" onClick={() => createMockupOnlineOrder()}>Create mockup online orders</button>
            <p>{msg}</p>
        </div>
    )
}