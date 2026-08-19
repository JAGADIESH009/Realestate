export default function Footer() {
  return (
    <footer className="py-12 bg-forest-charcoal text-warm-ivory border-t border-warm-ivory/10">
      <div className="container mx-auto px-6 md:px-12 xl:px-16 flex flex-col md:flex-row justify-between items-center text-[0.6rem] md:text-xs tracking-widest uppercase font-sans text-warm-ivory/50">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          &copy; {new Date().getFullYear()} Sai Gaurav Real Estate. <br className="md:hidden" /> All rights reserved.
        </div>
        <div className="flex space-x-8">
          <a href="#" className="hover:text-warm-ivory transition-colors duration-300">Instagram</a>
          <a href="#" className="hover:text-warm-ivory transition-colors duration-300">LinkedIn</a>
          <a href="#" className="hover:text-warm-ivory transition-colors duration-300">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
