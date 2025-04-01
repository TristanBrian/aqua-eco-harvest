
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Tilapia farming",
    caption: "Our sustainable tilapia farming practices",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1597088166607-fe31a3ff7771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "RAS system",
    caption: "Advanced RAS filtration systems",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1501195358109-2b68b2d6f530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Farm overview",
    caption: "Aerial view of our fish farm facilities",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Ornamental fish",
    caption: "Our vibrant collection of ornamental fish",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Research lab",
    caption: "Our research and development laboratory",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1563780834373-07eaab80577a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Farm workers",
    caption: "Our dedicated team of professionals",
  },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-aqua-950">Gallery</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-slate-700">
            A glimpse of Kamuthanga Fish Farm.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className="relative group overflow-hidden rounded-lg cursor-pointer shadow-md"
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/gallery">
              View Full Gallery <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            {selectedImage && (
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            )}
            {selectedImage && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                <p className="text-lg font-medium">{selectedImage.caption}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
