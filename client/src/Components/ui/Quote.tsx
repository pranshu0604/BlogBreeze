import { DevPran } from "./dev-pran";

export const Quote = () => {
    return (
        <div className="flex flex-col justify-center mt-10 lg:mt-16 overflow-x-hidden">
        <div>
            <div className="p-4 max-w-md">
                <div className="text-3xl font-medium text-justify">
                    "The beautiful part of writing is that you don’t have to get it right the first time, unlike, say, a brain surgeon."
                </div>
                <div className="font-medium text-lg mt-2 text-end">– Robert Cormier</div>
            </div>
        </div>
        
        <div className="mt-14 mb-10">
            <div className="text-xl mb-4 mx-6">
            Hot BlogBreezers 🔥:
            </div>
            
            <DevPran/>
            </div>
        
        </div>
    );
};
