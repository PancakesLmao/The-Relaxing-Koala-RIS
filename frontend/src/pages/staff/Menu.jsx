export default function Menu() {
    return (
        <div className="pl-[1vw]">
            <div className="flex pt-[1.2vw] justify-between h-[10vh]">
                <div className="text-[2.4vw] font-medium pt-[0.6vw]">
                    Menu/Order
                </div>
                <i className="material-symbols-outlined text-[4vw] act-circ">account_circle</i>
            </div>
            <div className="h-[0.2vw] w-[100%] bg-gunmetal"></div>
            <div className="flex">   
                <div className="flex-1 h-[90vh] overflow-y-auto grid grid-cols-4 auto-rows-[15vw]">
                </div>                   
                <div className="w-[27vw] h-[90vh] overflow-y-auto box-border border-l-[0.2vw] border-solid border-gunmetal">

                                
                </div>                   
            </div>         
        </div>
    )
}