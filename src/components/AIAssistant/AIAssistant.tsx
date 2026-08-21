import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import ChatPanel from './ChatPanel';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex items-center justify-center w-14 h-14 rounded-full bg-forest-charcoal/90 border border-warm-ivory/20 text-warm-ivory backdrop-blur-md shadow-2xl transition-all duration-300 hover:bg-forest-charcoal hover:border-warm-ivory/40 focus:outline-none focus:ring-2 focus:ring-warm-ivory/50 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open Sai Gaurav AI Assistant"
        aria-expanded={isOpen}
      >
        <Sparkles size={24} className="text-warm-ivory" />
      </motion.button>

      {/* Chat Panel Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 right-0 md:bottom-10 md:right-10 z-[110] w-full md:w-[420px] h-[85vh] md:h-[600px] max-h-screen bg-forest-charcoal/95 backdrop-blur-xl border-t md:border border-warm-ivory/20 md:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-warm-ivory/10 bg-forest-charcoal/50">
              <div className="flex items-center space-x-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warm-ivory/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-warm-ivory/80"></span>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-warm-ivory tracking-wide leading-none">Sai Gaurav AI</h3>
                  <span className="font-sans text-[0.65rem] text-warm-ivory/50 uppercase tracking-widest block mt-1">Your personal property assistant</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-warm-ivory/60 hover:text-warm-ivory transition-colors focus:outline-none focus:ring-2 focus:ring-warm-ivory/50 rounded-full"
                aria-label="Close AI Assistant"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <ChatPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
