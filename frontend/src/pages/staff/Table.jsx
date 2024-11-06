export default function Table() {
    return (
        <div className="pl-[1vw]">
            <div className="flex pt-[1.2vw] justify-between h-[5.4vw]">
                <div className="text-[2.4vw] font-medium pt-[0.6vw]">
                    Table Management
                </div>
                <i className="material-symbols-outlined text-[4vw] act-circ">account_circle</i>
            </div>
            <div className="h-[0.2vw] w-[100%] bg-gunmetal"></div>
            <div className="flex">
                <div className>
                    Table
                </div>
                <div>
                    Table Info
                </div>
            </div>
        </div>
    )
}