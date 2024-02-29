"use client"

import Image from 'next/image';


export default function About() {
    return (
        <div className="relative flex flex-col justify-center overflow-hidden mt-5">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
                <h1 className="mb-1 text-5xl font-semibold text-center text-purple-700">
                    💫 Wuilting 💫
                </h1>
                <h2 className="mb-5 font-semibold text-center text-purple-700">
                    About us ❤️
                </h2>
                <h5 className="font-semibold text-purple-700">Dragon</h5>
                <Image
                    src="https://img.tpx.cz/uploads/Sn%C3%ADmek%20obrazovky%202024-02-04%20193040.png"
                    alt="Dragon"
                    width={300}
                    height={100}
                />
                <h5 className="font-semibold text-purple-700">Nano</h5>
                <Image
                    src="https://img.tpx.cz/uploads/Sn%C3%ADmek%20obrazovky%202024-02-10%20152748.png"
                    alt="Nano"
                    width={300}
                    height={100}
                />
                <h5 className="font-semibold text-purple-700">Kuba</h5>
                <Image
                    src="https://img.tpx.cz/uploads/Sn%C3%ADmek%20obrazovky%202023-06-25%20101657.png"
                    alt="Kuba"
                    width={250}
                    height={100}
                />
                <h5 className="font-semibold text-purple-700">Ninjonik</h5>
                <Image
                    src="https://img.tpx.cz/uploads/Sn%C3%ADmek%20obrazovky%202023-06-25%20110657.png"
                    alt="Ninjonik"
                    width={50}
                    height={250}
                />
            </div>
        </div>
    );

}