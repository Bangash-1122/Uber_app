import React from 'react'

function LocationSearchPenal(props) {

    //Simple array for location
    const  locations = [
        "House 51tb street 3 sector j5 Hayatabad peshawar",
        "Metro-stop arbab-road peshawar",
        "unvercity two peshawar university",
        "House 51tb street 3 sector j5  phase-2 Hayatabad peshawar",
        "main sadar bazar peshawar"
    ];


    return (
        <div>
            {/*  this is just a simple data */}
            {locations.map((location, index) => (
                <div onClick={() => {
                    props.setVehiclePanel(true);
                    props.setPanelOpen(false);
                }} className='flex items-center gap-4 my-4 justify-start'
                key={index}>
                    <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full ">
                        <i className="ri-map-pin-line"></i>
                    </h2>
                    <h4 className='font-medium'>{location}</h4>
                </div>
            ))}

            <div className='flex items-center gap-4 my-4 justify-start'>
                <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full ">
                    <i className="ri-map-pin-line"></i>
                </h2>
                <h4 className='font-medium'>House 51tb street 3 sector j5 Hayatabad peshawar</h4>
            </div>

            <div className='flex items-center border-2 p-3 border-gray-100 active:border-black rounded-xl gap-4 my-2 justify-start'>
                <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full ">
                    <i className="ri-map-pin-line"></i>
                </h2>
                <h4 className='font-medium'>House 51tb street 3 sector j5 Hayatabad peshawar</h4>
            </div>

            <div className='flex items-center border-2 p-3 border-gray-100 active:border-black rounded-xl gap-4 my-2 justify-start'>
                <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full ">
                    <i className="ri-map-pin-line"></i>
                </h2>
                <h4 className='font-medium'>House 51tb street 3 sector j5 Hayatabad peshawar</h4>
            </div>

            <div className='flex items-center border-2 p-3 border-gray-100 active:border-black rounded-xl gap-4 my-2 justify-start'>
                <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full ">
                    <i className="ri-map-pin-line"></i>
                </h2>
                <h4 className='font-medium'>House 51tb street 3 sector j5 Hayatabad peshawar</h4>
            </div>

            <div className='flex items-center border-2 p-3 border-gray-100 active:border-black rounded-xl gap-4 my-2 justify-start'>
                <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full ">
                    <i className="ri-map-pin-line"></i>
                </h2>
                <h4 className='font-medium'>House 51tb street 3 sector j5 Hayatabad peshawar</h4>
            </div>
        </div>
    )
}

export default LocationSearchPenal
