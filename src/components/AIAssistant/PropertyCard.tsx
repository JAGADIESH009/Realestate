import { motion } from 'framer-motion';

interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  bhk: number;
  price: string;
  size: string;
  availability: string;
  description: string;
  image: string;
}

interface PropertyCardProps {
  property: Property;
  onBookVisit: () => void;
}

export default function PropertyCard({ property, onBookVisit }: PropertyCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-forest-charcoal/80 border border-warm-ivory/20 rounded-xl overflow-hidden shadow-lg"
    >
      <div className="h-32 w-full relative">
        <img 
          src={property.image} 
          alt={property.name} 
          className="w-full h-full object-cover saturate-[0.8] contrast-[1.1]"
        />
        <div className="absolute top-2 right-2 bg-forest-charcoal/90 backdrop-blur px-2 py-1 rounded text-[0.6rem] uppercase tracking-widest text-warm-ivory border border-warm-ivory/10">
          {property.availability}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-serif text-lg text-warm-ivory leading-tight">{property.name}</h4>
          <span className="font-sans text-sm font-semibold text-warm-ivory">{property.price}</span>
        </div>
        
        <p className="font-sans text-xs text-warm-ivory/60 mb-3">{property.location}</p>
        
        <div className="flex space-x-4 mb-4">
          <div className="flex flex-col">
            <span className="text-[0.6rem] uppercase tracking-wider text-warm-ivory/40">Type</span>
            <span className="text-xs text-warm-ivory">{property.bhk} BHK {property.type}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.6rem] uppercase tracking-wider text-warm-ivory/40">Size</span>
            <span className="text-xs text-warm-ivory">{property.size}</span>
          </div>
        </div>
        
        <p className="font-sans text-xs text-warm-ivory/70 line-clamp-2 leading-relaxed mb-4">
          {property.description}
        </p>
        
        <div className="flex space-x-2">
          <button 
            className="flex-1 bg-warm-ivory/10 border border-warm-ivory/30 text-warm-ivory text-xs uppercase tracking-widest py-2 rounded transition-colors hover:bg-warm-ivory hover:text-forest-charcoal"
          >
            View Property
          </button>
          <button 
            onClick={onBookVisit}
            className="flex-1 bg-warm-ivory text-forest-charcoal text-xs uppercase tracking-widest py-2 rounded transition-colors hover:bg-warm-ivory/90 font-medium"
          >
            Book Visit
          </button>
        </div>
      </div>
    </motion.div>
  );
}
