export function Avatar({name}: {name:string}) {

    return (

        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-gray-600">
            <span className="font-medium text-gray-300">{name[0]}</span>
        </div>

    );
}