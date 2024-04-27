import Link from "next/link"
import Image from "next/image"

const CardJeu = ({image, nom, description, id, classChange}) => {
    return (
        <div className={classChange}>
            <Image
                src={image}
                alt={nom}
                width={1200}
                height={800}
                className="rounded-md object-contain xl:object-cover xl:h-[100%]"
            />
            <div className="absolute lg:opacity-0 flex flex-col justify-end hover:opacity-100 duration-200 p-4 overflow-hidden  btn-decouvrir left-0 bottom-0 right-0 top-0 rounded-lg">
                <h3 className="text-3xl whitespace-nowrap overflow-hidden text-ellipsis">{nom}</h3>
                <p className="mt-1 mb-4 font-light text-ellipsis">{description}</p>
                <Link
                    href={id}
                    className="py-3 uppercase font-light hover:px-16 duration-200 hover:bg-black hover:text-white w-fit px-8 bg-white text-black rounded-md block text-center my-1"
                >
                    Découvrir
                </Link>
            </div>
        </div>
    )
}

export default CardJeu