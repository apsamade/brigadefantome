import Link from "next/link"
import Image from "next/image"

const CardJeu = ({image, nom, description, modifier, supprimer, classChange}) => {
    return (
        <div className={classChange}>
            <Image
                src={image}
                alt={nom}
                width={1200}
                height={800}
                className="rounded-md min-h-[300px] bg-top object-cover"
            />
            <div className="absolute flex flex-col justify-end duration-200 p-4 overflow-hidden  btn-decouvrir left-0 bottom-0 right-0 top-0 rounded-lg">
                <h3 className="text-3xl whitespace-nowrap overflow-hidden text-ellipsis">{nom}</h3>
                <p className="mt-1 mb-4 font-light text-ellipsis">{description}</p>
                <div className="flex items-center justify-start md:flex-nowrap flex-wrap">
                    <Link
                        href={modifier}
                        className="py-3 m-2 grow md:grow-0 text-sm uppercase font-light md:hover:px-16 duration-200 hover:bg-black hover:text-white w-fit px-2 md:px-8 bg-sky-600 text-white rounded-md block text-center my-1"
                    >
                        Modifier
                    </Link>    
                    <Link
                        href={supprimer}
                        className="py-3 m-2 grow md:grow-0 text-sm uppercase font-light md:hover:px-16 duration-200 hover:bg-black hover:text-white w-fit px-2 md:px-8 bg-red-500 text-white rounded-md block text-center my-1"
                    >
                        Supprimer
                    </Link>                  
                </div>

            </div>
        </div>
    )
}

export default CardJeu