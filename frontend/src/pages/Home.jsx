import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css'


function Home() {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: "70%"
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1,
            })
        } else {
            gsap.to(panelRef.current, {
                height: "0%"
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0,
            })
        }
    }, [panelOpen]);


    return (
        <div className="relative h-screen">
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
                <div ref={panelRef} className="h-[70%] bg-red-500 p-5 hidden">

                </div>
            </div>
        </div>
    )
}

export default Home
