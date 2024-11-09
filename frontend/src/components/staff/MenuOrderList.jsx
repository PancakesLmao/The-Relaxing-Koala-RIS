

export default function MenuOrderList() {
    return (
        <div className="border-box w-[100%] flex flex-col gap-[1vw] mt-[1vw]">
            <div className="bg-antiflash-white flex gap-[1.5vw] items-center py-[1vw] px-[1.2vw]">
                <div className="flex-1">
                    <div className="text-left">
                        <p className="text-[1.3vw]">1. Dish Name x1</p>
                        <p className="font-normal">Price: </p>
                        <p className="font-normal">Note: Cupcakke </p>
                    </div>
                </div>
                <div className="w-auto flex items-center gap-[1.7vw]">
                    <i className="ri-check-line leading-[1] text-[2.3vw]"></i>
                    <i className="ri-close-line leading-[1] text-[2.5vw] text-white bg-red p-[0.1vw] rounded-[0.5vw]"></i>
                </div>
            </div>
            <div className="bg-antiflash-white flex gap-[1.5vw] items-center py-[1vw] px-[1.2vw]">
                <div className="flex-1">
                    <div className="text-left">
                        <p className="text-[1.3vw]">1. Dish Name x1</p>
                        <p className="font-normal">Price: </p>
                    </div>
                </div>
                <div className="w-auto flex items-center gap-[1.7vw]">
                    <i className="ri-knife-line leading-[1] text-[2.1vw]"></i>
                    <i className="ri-close-line leading-[1] text-[2.5vw] text-white bg-red p-[0.1vw] rounded-[0.5vw]"></i>
                </div>
            </div>
            
        </div>
    )
}