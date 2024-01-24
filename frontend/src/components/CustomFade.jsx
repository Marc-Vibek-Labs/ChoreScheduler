import { motion } from "framer-motion";

export const animations = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

export const CustomFade = ({ children, style }) => {
  return (
    <motion.div
      exit="exit"
      style={style}
      animate="animate"
      initial="initial"
      variants={animations}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};
