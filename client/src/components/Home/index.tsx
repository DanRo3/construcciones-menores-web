"use client";
import { motion, useAnimation } from "framer-motion";
import Presentation from "../../components/Presentation/index";
import Mision from "@/components/Mision";
import Servicios from "@/components/Servicios";
import NewsLatterBox from "@/components/Contact/SubscriptionBox";
import Contact from "@/components/Contact";
import Products from "@/components/Products";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const HomeAnimated = () => {
  const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.1 });
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.1 });
  const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.1 });
  const { ref: ref4, inView: inView4 } = useInView({ threshold: 0.1 });
  const { ref: ref5, inView: inView5 } = useInView({ threshold: 0.1 });
  const { ref: ref6, inView: inView6 } = useInView({ threshold: 0.1 });

  const animation1 = useAnimation();
  const animation2 = useAnimation();
  const animation3 = useAnimation();
  const animation4 = useAnimation();
  const animation5 = useAnimation();
  const animation6 = useAnimation();

  useEffect(() => {
    if (inView1) animation1.start("visible");
    if (!inView1) animation1.start("hidden");
  }, [animation1, inView1]);

  useEffect(() => {
    if (inView2) animation2.start("visible");
    if (!inView2) animation2.start("hidden");
  }, [animation2, inView2]);

  useEffect(() => {
    if (inView3) animation3.start("visible");
    if (!inView3) animation3.start("hidden");
  }, [animation3, inView3]);

  useEffect(() => {
    if (inView4) animation4.start("visible");
    if (!inView4) animation4.start("hidden");
  }, [animation4, inView4]);

  useEffect(() => {
    if (inView5) animation5.start("visible");
    if (!inView5) animation5.start("hidden");
  }, [animation5, inView5]);

  useEffect(() => {
    if (inView6) animation6.start("visible");
    if (!inView6) animation6.start("hidden");
  }, [animation6, inView6]);

  return (
    <div>
      <motion.div
        ref={ref1}
        initial="hidden"
        animate={animation1}
        variants={fadeInUp}
      >
        <Presentation />
      </motion.div>
      <motion.div
        ref={ref2}
        initial="hidden"
        animate={animation2}
        variants={slideInLeft}
      >
        <Mision />
      </motion.div>
      <motion.div
        ref={ref3}
        initial="hidden"
        animate={animation3}
        variants={fadeInUp}
      >
        <Servicios />
      </motion.div>
      <motion.div
        ref={ref4}
        initial="hidden"
        animate={animation4}
        variants={scaleIn}
      >
        <NewsLatterBox />
      </motion.div>
      <motion.div
        ref={ref5}
        initial="hidden"
        animate={animation5}
        variants={fadeInUp}
      >
        <Products />
      </motion.div>
      <motion.div
        ref={ref6}
        initial="hidden"
        animate={animation6}
        variants={slideInLeft}
      >
        <Contact />
      </motion.div>
    </div>
  );
};

export default HomeAnimated;
