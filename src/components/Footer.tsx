export default function Footer() {
  return (
    <footer className="py-12 bg-forest-charcoal text-warm-ivory border-t border-warm-ivory/10">
      <div className="container mx-auto px-6 md:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center text-xs tracking-widest uppercase font-sans text-warm-ivory/50">
          <div className="lg:col-span-7 mb-4 lg:mb-0 text-center lg:text-left">
            &copy; {new Date().getFullYear()} Sai Gaurav Real Estate. <br className="lg:hidden" /> All rights reserved.
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-start space-x-8">
            <a href="#" className="hover:text-warm-ivory transition-colors duration-300">Instagram</a>
            <a href="#" className="hover:text-warm-ivory transition-colors duration-300">LinkedIn</a>
            <a href="#" className="hover:text-warm-ivory transition-colors duration-300">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
