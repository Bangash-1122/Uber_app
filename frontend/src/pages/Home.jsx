import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPenal from '../components/LocationSearchPenal';


function Home() {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const[vehiclePanel, setVehiclePanel] = useState(false);
    const vehiclePanelRef = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: "70%",
                padding: 24
                // opacity: 1,
            })
            gsap.to(panelCloseRef.current, {
                // opacity: 1,
            })
        } else {
            gsap.to(panelRef.current, {
                height: "0%",
                opacity: 0,
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0,
            })
        }
    }, [panelOpen]);

    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0%)',
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)',
            })
        }
    }, [vehiclePanel]);

    return (
        <div className="relative h-screen overflow-hidden">
            <img className="w-16 absolute top-5 left-5" src="https://e7.pngegg.com/pngimages/631/1023/png-clipart-logo-brand-product-design-font-uber-logo-text-logo.png" alt="Uber Logo" />

            <div className="h-screen w-screen ">
                {/* image for temporary use */}
                <img className="w-full h-full object-cover" src="https://i.sstatic.net/gtiI7.gif" alt="Placeholder" />
            </div>
            <div className="bg-white flex flex-col justify-end absolute top-0 h-screen w-full">
                <div className="h-[30%] p-6 bg-white relative">
                    <h5
                        ref={panelCloseRef}
                        onClick={() => setPanelOpen(false)}
                        className='absolute opacity-0 top-6 right-6 text-2xl'>
                        <i className="ri-arrow-down-wide-fill"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a trip</h4>
                    <form onSubmit={(e) => { submitHandler(e) }}>
                        <div className='line absolute h-16 w-1 top-[45%] left-5 bg-gray-700 rounded-full'></div>
                        <input
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
                            type="text"
                            placeholder="add pick-up location"
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            onClick={() => setPanelOpen(true)}
                        />
                        <input
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
                            type="text"
                            placeholder="Enter your destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            onClick={() => setPanelOpen(true)}
                        />
                    </form>
                </div>
                <div ref={panelRef} className="h-[70%] bg-white p-5 hidden">
                        <LocationSearchPenal panelOpen={panelOpen} setPanelOpen={setPanelOpen} vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} />
                </div>
            </div>


            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-1 py-10 pt-14 bg-white'>
                <h5 className='p-3 w-[93%] text-center absolute top-0' onClick={() => setVehiclePanel(false)}>
                    <i className="ri-arrow-down-wide-line text-3xl text-gray-200"></i>
                    </h5>
                <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

            <div className='flex w-full border-2 mb-2 active:border-black rounded-xl p-3 items-center justify-between'>
                <img className='h-12' src='https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos-preview.webp' alt="Uber car" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill">4</i></span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>$143.30</h2>
                </div>

            <div className='flex w-full border-2 mb-2 active:border-black rounded-xl p-3 items-center justify-between'>
                <img className='h-12' src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n' alt="Uber Moto" />
                <div className='-ml-2 w-1/2'>
                    <h4 className='font-medium text-base'>Uber Moto<span><i className="ri-user-fill">1</i></span></h4>
                    <h5 className='font-medium text-sm'>4 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, Motorcycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>$60.30</h2>
                </div>

            <div className='flex w-full border-2 mb-2 active:border-black rounded-xl p-3 items-center justify-between'>
                <img className='h-12' src='https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png' alt="Uber Auto" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-base'>Uber Auto<span><i className="ri-user-fill">3</i></span></h4>
                    <h5 className='font-medium text-sm'>5 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, Auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'>$95.30</h2>
                </div>
            </div>
        </div>
    )
}

export default Home
