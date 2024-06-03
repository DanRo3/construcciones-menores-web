import Link from 'next/link';
import Decorators from './../Decorators/index';
import IMG1 from '../../../public/images/presentation/1.jpg'
import IMG2 from '../../../public/images/presentation/2.jpg'
import Image from 'next/image'
import 'animate.css';

const Presentation = () => {

    return (
        <>
            <section
                id="home"
                className="relative z-10 overflow-hidden bg-white pb-16 pt-[100px] dark:bg-gray-dark md:pb-[120px] md:pt-[130px] xl:pb-[160px] xl:pt-[140px] 2xl:pb-[200px] 2xl:pt-[160px]"
            >
                <div className="container"> 
                    <div className="flex flex-wrap">
                        <div className="w-full px-4 flex flex-wrap lg:justify-between lg:px-20">
                            <div className="text-left lg:w-1/2 lg:h-full flex h-[35%] lg:flex-col flex-wrap xs:flex-col-reverse">
                                <h1 className="mb-5 text-2xl italic font-bold leading-tight text-slate-900 dark:text-white sm:text-3xl sm:leading-tight md:text-5xl md:leading-tight animate-fade-down animate-once">
                                {" "}Construyendo sueños, ladrillo a ladrillo{" "}
                                </h1>
                                <p className='mb-12 text-base italic !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl'>
                                    Somos tú mejor socio de reformas
                                </p>   
                                <div className="lg:self-start flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                    <Link
                                        href="#about"
                                        className="animate__bounceInLeft rounded-full bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                                    >
                                        Sobre nosotros
                                    </Link>
                                </div>
                            </div>
                            <div className="animate-fade-left animate-once flex md:mb-16 lg:w-1/2 lg:h-full w-full h-1/2 mt-5">
                                <div className="relative p-3 left-12 top-12 z-10 -ml-12 dark:shadow-slate-500 overflow-hidden rounded-lg border-transparent backdrop-blur shadow-lg md:left-16 md:top-16 lg:ml-0 w-[500px] h-[300px]">
                                    <Image src={IMG1} placeholder='blur' alt="imagen1" className="h-full w-full object-cover object-center" />
                                </div>

                                <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg dark:shadow-slate-500 w-[500px] h-[300px]">
                                    <Image src={IMG2} placeholder='blur' alt="imagen2" className="h-full w-full object-cover object-center" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Decorators />
            </section>
        </>
    )
}

export default Presentation;
