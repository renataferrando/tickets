"use client";
// import classNames from "classnames";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLDivElement> | null;
  r?: React.RefObject<HTMLDivElement> | null;
  id?: string;
}

const Page = ({
  children,
  className,

  ref,
  id,
  ...r
}: Props) => {
  return (
    <motion.div
      className={className}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...r}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};

export default Page;
