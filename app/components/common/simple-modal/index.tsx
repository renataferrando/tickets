"use client";

import { AnimatePresence, motion } from "framer-motion";

interface SimpleModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const SimpleModal = ({
  open,
  onClose,
  children,
  className,
}: SimpleModalProps) => {
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.15 } },
  } as const;

  return (
    <AnimatePresence initial={false} mode="wait">
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-lenis-prevent
        >
          <motion.div
            className={
              className ??
              "w-[700px] max-w-[95vw] bg-white rounded-lg shadow-xl"
            }
            onClick={(e) => e.stopPropagation()}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SimpleModal;
