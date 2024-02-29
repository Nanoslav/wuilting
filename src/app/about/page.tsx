import Image from 'next/image';

export const metadata = {
    title: 'About us',
    description: 'Meet the team behind Wuilting',
}

export default function About() {
    return (
        <main className="relative flex flex-col justify-center h-screen overflow-hidden">
            <div className="p-0.5/10 lg:p-0.25/10 m-auto rounded-md shadow-md w-9/10 md:w-6/10 lg:w-4/10 bg-base-100 overflow-y-auto h-4/5">
                <h1 className="mb-1 text-5xl font-semibold text-center">
                    💫 Wuilting 💫
                </h1>
                <h2 className="mb-5 font-semibold text-center">
                    About us ❤️
                </h2>
                <div className='flex flex-col gap-[0.5dvw] h-3/5'>
                    <div>
                        <h5 className="font-semibold">Dragon</h5>
                        <Image
                            src="https://img.tpx.cz/uploads/Sn%C3%ADmek%20obrazovky%202024-02-04%20193040.png"
                            alt="Dragon"
                            width={300}
                            height={100}
                        />
                    </div>
                    <div>
                        <h5 className="font-semibold">Nano</h5>
                        <Image
                            src="https://img.tpx.cz/uploads/Sn%C3%ADmek%20obrazovky%202024-02-10%20152748.png"
                            alt="Nano"
                            width={300}
                            height={100}
                        />
                    </div>
                    <div>
                        <h5 className="font-semibold">Kuba</h5>
                        <Image
                            src="https://img.tpx.cz/uploads/Sn%C3%ADmek%20obrazovky%202023-06-25%20101657.png"
                            alt="Kuba"
                            width={250}
                            height={100}
                        />
                    </div>
                    <div>
                        <h5 className="font-semibold">Ninjonik</h5>
                        <Image
                            src="https://img.tpx.cz/uploads/Sn%C3%ADmek%20obrazovky%202023-06-25%20110657.png"
                            alt="Ninjonik"
                            width={50}
                            height={250}
                        />
                    </div>
                </div>
            </div>
        </main>
    );

}