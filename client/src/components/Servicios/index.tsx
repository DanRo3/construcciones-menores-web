import Image from 'next/image'
import com from '../../../public/images/servicios/720x400.png'

const Servicios = () => {
  return (
        <div className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                    <div className="xl:w-1/4 md:w-1/2 p-4">
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
