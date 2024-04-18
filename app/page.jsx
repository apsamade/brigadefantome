import Link from "next/link"

const Home = () => {
    return (
        <>
            <header className='sm:pt-24 pt-16 bg-header bg-cover min-h-[80vh]'>
                <div className='max-w-[800px] lg:ml-[15%] p-6 mx-auto lg:mx-0'>
                    <h1 className='text-4xl text-center sm:text-left xl:text-5xl xl:mr-[-150px] font-semibold'>Bienvenue dans la <strong className='bg-gradient-to-r from-sky-300 to-sky-600 text-transparent bg-clip-text'>Brigade Fantôme</strong></h1>
                    <p className='my-8 text-center sm:text-left leading-8 font-light'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel nemo impedit cum magnam expedita natus laborum odit minima, explicabo distinctio aspernatur dignissimos quae molestiae autem omnis deleniti! Illo, ipsum totam!</p>
                    <Link
                        className="p-4 mx-auto sm:mx-0 hover:text-white hover:bg-black bg-white rounded-md text-black uppercase font-semibold max-w-[100%] w-[250px] text-center min-w-[250px] hover:w-[450px] block duration-200"
                        href="/inscription"
                    >
                        S'inscrire
                    </Link>
                </div>
            </header>
            <section className="pt-16">
                <div className="mx-auto max-w-[700px] pb-8 p-4">
                    <h2 className="uppercase text-center p-8 text-2xl">Qui sommes-nous ?</h2>
                    <p className="font-light text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque autem, expedita provident sit quis blanditiis commodi. Quisquam optio assumenda, placeat, expedita.</p>
                </div>
            </section>
        </>
    )
}

export default Home