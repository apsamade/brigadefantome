
import Image from "next/image"
import Link from "next/link"

const Evenements = () => {
    return (
        <main className='min-h-[75vh] bg-bottom z-0 relative pt-24 bg-header-evenement bg-cover'>
            <div className="max-w-3xl mx-auto xl:ml-[300px] mt-12">
                <h1 className="uppercase text-3xl font-bold xl:text-5xl">Nos évenements</h1>
                <p className="pt-8 leading-6 uppercase font-light">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, aliquam eos. Adipisci, fugit expedita, inventore ipsam ipsa fugiat fuga architecto, dolores accusantium vel error omnis natus unde veritatis nihil mollitia.</p>
            </div>
            <div className="absolute left-0 right-0 flex items-center max-w-3xl w-[800px] flex-wrap justify-center -z-20 bottom-3 m-auto p-4">
                <Link
                    target="_blank"
                    href='https://m.twitch.tv/leszincouonair'
                    className="p-3 duration-200 hover:px-8 m-3 flex items-center justify-center bg-[#6441A7] rounded-md"
                >
                    <Image
                        src="/logo/twitch_logo.png"
                        alt="lien twicth"
                        width={50}
                        height={50}
                    />
                    <span>Lescouzonair</span>
                </Link>
                <Link
                    target="_blank"
                    href='https://twitch.tv/en_claquette'
                    className="p-3 duration-200 hover:px-8 m-3 flex items-center justify-center bg-[#6441A7] rounded-md"
                >
                    <Image
                        src="/logo/twitch_logo.png"
                        alt="lien twicth"
                        width={50}
                        height={50}
                    />
                    <span>En_claquette</span>
                </Link>
                <Link
                    target="_blank"
                    href='https://m.twitch.tv/overflyytv'
                    className="p-3 duration-200 hover:px-8 m-3 flex items-center justify-center bg-[#6441A7] rounded-md"
                >
                    <Image
                        src="/logo/twitch_logo.png"
                        alt="lien twicth"
                        width={50}
                        height={50}
                    />
                    <span>Overflyytv</span>
                </Link>
            </div>
        </main>
    )
}

export default Evenements