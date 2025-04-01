
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";

// Gallery images data
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Tilapia farming",
    caption: "Our sustainable tilapia farming practices",
    category: "farm"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1597088166607-fe31a3ff7771?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "RAS system",
    caption: "Advanced RAS filtration systems",
    category: "technology"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1501195358109-2b68b2d6f530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Farm overview",
    caption: "Aerial view of our fish farm facilities",
    category: "farm"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Ornamental fish",
    caption: "Our vibrant collection of ornamental fish",
    category: "fish"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Research lab",
    caption: "Our research and development laboratory",
    category: "technology"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1563780834373-07eaab80577a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Farm workers",
    caption: "Our dedicated team of professionals",
    category: "people"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Fish tanks",
    caption: "Our modern fish tank system",
    category: "technology"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1508857650881-46850fcc7d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Fresh fish",
    caption: "Freshly harvested fish ready for market",
    category: "fish"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1598446830177-f55f7578130f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Fish feeding",
    caption: "Daily feeding of our fish stock",
    category: "farm"
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1540846708029-5b6aa0f8397b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Team meeting",
    caption: "Weekly team meeting and planning session",
    category: "people"
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1565012050574-e2b32f6cb43b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Water testing",
    caption: "Regular water quality testing",
    category: "technology"
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1516683037151-9a17603a8dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    alt: "Fish breeding",
    caption: "Our specialized breeding program",
    category: "fish"
  },
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-aqua-950">Our Gallery</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-slate-700">
              Take a visual journey through Kamuthanga Fish Farm and discover our sustainable aquaculture practices.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Photos</TabsTrigger>
                <TabsTrigger value="farm">Farm</TabsTrigger>
                <TabsTrigger value="fish">Fish</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="people">People</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image) => (
                  <GalleryItem 
                    key={image.id}
                    image={image}
                    onSelect={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            </TabsContent>
            
            {["farm", "fish", "technology", "people"].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryImages
                    .filter((image) => image.category === category)
                    .map((image) => (
                      <GalleryItem 
                        key={image.id}
                        image={image}
                        onSelect={() => setSelectedImage(image)}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
      
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
      
      <Footer />
    </div>
  );
};

interface GalleryItemProps {
  image: {
    id: number;
    src: string;
    alt: string;
    caption: string;
    category: string;
  };
  onSelect: () => void;
}

const GalleryItem = ({ image, onSelect }: GalleryItemProps) => {
  return (
    <div 
      className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
      onClick={onSelect}
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
  );
};

export default GalleryPage;
