import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils';

export function Modal({ isOpen, onClose, title, children, size = 'md', className }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const sizeMap = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0.2 }}
            className={cn(
              'relative w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl',
              'border border-slate-200 dark:border-slate-700',
              sizeMap[size],
              className
            )}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Drawer({ isOpen, onClose, title, children, side = 'right', className }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const sideMap = {
    right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' }, pos: 'right-0 top-0 h-full' },
    left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' }, pos: 'left-0 top-0 h-full' },
    bottom: { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' }, pos: 'bottom-0 left-0 right-0' },
  };
  const config = sideMap[side];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={config.initial}
            animate={config.animate}
            exit={config.exit}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.1 }}
            className={cn(
              'absolute w-full max-w-sm bg-white dark:bg-slate-800 shadow-2xl',
              'border-slate-200 dark:border-slate-700',
              side === 'left' ? 'border-r' : side === 'right' ? 'border-l' : 'border-t rounded-t-2xl',
              config.pos,
              className
            )}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            <div className="p-6 overflow-y-auto h-[calc(100%-73px)]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
