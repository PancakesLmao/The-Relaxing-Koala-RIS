

export default function ReceiptDisplay(receipt) {
    return (
        <div className="">
            <div className="text-[1.3vw]">
                <div className="flex flex-row justify-between">
                    <p>Dish Name</p>
                    <div className="flex flex-row gap-[1.7vw] text-center">
                        <p className="w-[6vw]">Quantity</p>
                        <p className="w-[6vw]">Price</p>
                        <p className="w-[6vw]">Amount</p>
                    </div>
                </div>
                <div className="w-[100%] h-[0.25vw] bg-gunmetal"></div>
            </div>
            <div className="font-normal text-[1.2vw]">
                <div className="flex flex-row justify-between my-[0.5vw]">
                    <p>Dish Name 1</p>
                    <div className="flex flex-row gap-[1.7vw] text-center">
                        <p className="w-[6vw]">1</p>
                        <p className="w-[6vw]">###</p>
                        <p className="w-[6vw]">###</p>
                    </div>
                </div>
                <div className="w-[100%] h-[0.1vw] bg-gunmetal"></div>
            </div>
            <div className="font-normal text-[1.2vw]">
                <div className="flex flex-row justify-between my-[0.5vw] ">
                    <p>Dish Name 1</p>
                    <div className="flex flex-row gap-[1.7vw] text-center">
                        <p className="w-[6vw]">1</p>
                        <p className="w-[6vw]">###</p>
                        <p className="w-[6vw]">###</p>
                    </div>
                </div>
                <div className="w-[100%] h-[0.1vw] bg-gunmetal"></div>
            </div>
            <div className="font-normal text-[1.2vw]">
                <div className="flex flex-row justify-between my-[0.5vw] ">
                    <p>Dish Name 1</p>
                    <div className="flex flex-row gap-[1.7vw] text-center">
                        <p className="w-[6vw]">1</p>
                        <p className="w-[6vw]">###</p>
                        <p className="w-[6vw]">###</p>
                    </div>
                </div>
                <div className="w-[100%] h-[0.1vw] bg-gunmetal"></div>
            </div>
            <div className="font-normal text-[1.2vw]">
                <div className="flex flex-row justify-between my-[0.5vw] ">
                    <p>Dish Name 1</p>
                    <div className="flex flex-row gap-[1.7vw] text-center">
                        <p className="w-[6vw]">1</p>
                        <p className="w-[6vw]">###</p>
                        <p className="w-[6vw]">###</p>
                    </div>
                </div>
                <div className="w-[100%] h-[0.1vw] bg-gunmetal"></div>
            </div>
            <div className="font-normal text-[1.2vw]">
                <div className="flex flex-row justify-between my-[0.5vw] ">
                    <p>Dish Name 1</p>
                    <div className="flex flex-row gap-[1.7vw] text-center">
                        <p className="w-[6vw]">1</p>
                        <p className="w-[6vw]">###</p>
                        <p className="w-[6vw]">###</p>
                    </div>
                </div>
                <div className="w-[100%] h-[0.1vw] bg-gunmetal"></div>
            </div>
            <div className="flex flex-row-reverse">
                <div className="right-0 w-[17vw] mr-[1.45vw] mt-[1vw]">
                    <div className="flex justify-between text-[1.4vw] my-[0.25vw]">
                        <p className="">Subtotal:</p>
                        <p className="font-normal">###</p>
                    </div>
                    <div className="flex justify-between text-[1.4vw] my-[0.25vw]">
                        <p className="">VAT (10%):</p>
                        <p className="font-normal">###</p>
                    </div>
                    <div className="w-[100%] h-[0.2vw] bg-gunmetal"></div>
                    <div className="flex justify-between text-[1.4vw] mt-[0.7vw]">
                        <p className="">Grand Total:</p>
                        <p className="font-normal">###</p>
                    </div>
                </div>
            </div>
            
                
        </div>
    )
}