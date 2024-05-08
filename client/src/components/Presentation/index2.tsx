import Image from 'next/image'
import IMG1 from '../../../public/images/presentation/1.jpg'
import IMG2 from '../../../public/images/presentation/2.jpg'

const Presentation2 = () => {
  return (
    <section>
       <div className="mb-8 flex flex-wrap justify-between md:mb-16">
      <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
        <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">Find your<br />style online</h1>

        <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">This is a section of some simple filler text, also known as placeholder text. It shares characteristics of real text.</p>
      </div>

      <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
        <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
          <Image src={IMG1} width={400} height={400} loading="lazy" alt="Photo by Kaung Htet" className="h-full w-full object-cover object-center" />
        </div>

        <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
          <Image src={IMG2} loading="lazy" alt="Photo by Manny Moreno" className="h-full w-full object-cover object-center" />
        </div>
      </div>
    </div>
    </section>
  )
}

export default Presentation2
