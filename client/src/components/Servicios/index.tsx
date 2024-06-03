import Image from 'next/image'
import com from '../../../public/images/servicios/720x400.png'

const Servicios = () => {
  return (
        <div className="text-gray-600 body-font w-full h-full px-4 lg:px-20">
            <div className="container px-5 py-24 mx-auto ">
                <div className="">
                    <div className="w-full p-4 flex flex-wrap gap-10">
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <Image className="h-40 rounded w-full object-cover object-center mb-6" src={com} alt="content" />
                            <h3 className="tracking-widest text-red-500 text-xs font-medium title-font">SUBTITULO</h3>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Nombre</h2>
                            <p className="leading-relaxed text-base">Lorem ipsum dolor sit. Lorem ipsum dolor sit.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <Image className="h-40 rounded w-full object-cover object-center mb-6" src={com} alt="content" />
                            <h3 className="tracking-widest text-red-500 text-xs font-medium title-font">SUBTITULO</h3>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Nombre</h2>
                            <p className="leading-relaxed text-base">Lorem ipsum dolor sit. Lorem ipsum dolor sit.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <Image className="h-40 rounded w-full object-cover object-center mb-6" src={com} alt="content" />
                            <h3 className="tracking-widest text-red-500 text-xs font-medium title-font">SUBTITULO</h3>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Nombre</h2>
                            <p className="leading-relaxed text-base">Lorem ipsum dolor sit. Lorem ipsum dolor sit.</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg">
                            <Image className="h-40 rounded w-full object-cover object-center mb-6" src={com} alt="content" />
                            <h3 className="tracking-widest text-red-500 text-xs font-medium title-font">SUBTITULO</h3>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Nombre</h2>
                            <p className="leading-relaxed text-base">Lorem ipsum dolor sit. Lorem ipsum dolor sit.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Servicios
