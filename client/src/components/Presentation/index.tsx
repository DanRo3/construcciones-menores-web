import Link from 'next/link';
import React from 'react'
import Decorators from './../Decorators/index';

const Presentation = () => {
    return (
        <>
            <section
                id="home"
                className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
            >
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mx-auto max-w-[800px] text-center">
                                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                                    Construcciones menores
                                </h1>
                                <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Laudantium consequatur, vitae ratione unde beatae praesentium
                                    magni cumque quisquam explicabo asperiores esse fuga, dolore illo
                                    sunt iste odio, deserunt provident ab dolorum ipsa aspernatur! Sint
                                    officiis nisi perferendis iste tenetur vitae.
                                </p>
                                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                                    <Link
                                        href="/about"
                                        className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                                    >
                                        Sobre nosotros
                                    </Link>
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
