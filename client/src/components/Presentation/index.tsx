'use client';
import Decorators from './../Decorators/index';
import 'animate.css';
import { ShuffleGrid } from './Shuffle';
import { ArrowRightOutlined } from '@ant-design/icons';


const scrollToSection = () => {
      const section = document.getElementById('mision');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
}


const Presentation = () => {

    return (
            <section
                id="home"
                className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto mt-10"
            >
                <div>
                    <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium italic">
                    Mejor cada día
                    </span>
                    <h3 className="text-4xl md:text-6xl font-semibold italic">
                    Construyendo sueños ladrillo a ladrillo
                    </h3>
                    <p className="text-base md:text-lg text-slate-950 dark:text-gray-light my-4 md:my-6">
                    Construcciones menores. Tu mejor socio de reformas.
                    </p>
                    <button className="bg-primary text-white font-medium py-2 px-4 rounded-full transition-all hover:bg-opacity-90 active:scale-95 flex flex-row items-center gap-1 hover:gap-4" onClick={scrollToSection}> 
                        Sobre nosotros
                        <ArrowRightOutlined />    
                    </button>
                </div>
                <ShuffleGrid />
                <Decorators />
            </section>
    )
}

export default Presentation
