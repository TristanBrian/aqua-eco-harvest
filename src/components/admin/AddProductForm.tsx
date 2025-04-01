
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check, Image, Loader2, Plus, Upload } from "lucide-react";

const AddProductForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    features: ["", "", "", ""],
    image: null as File | null,
  });

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({ ...formData, features: updatedFeatures });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.category || !formData.description || !formData.price) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.image) {
      toast({
        title: "Image Required",
        description: "Please upload a product image.",
        variant: "destructive",
      });
      return;
    }

    // Filter out empty features
    const filteredFeatures = formData.features.filter(feature => feature.trim() !== "");
    
    if (filteredFeatures.length === 0) {
      toast({
        title: "Features Required",
        description: "Please add at least one product feature.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // In a real application, you would send this data to your backend
    // Mock API call with setTimeout
    setTimeout(() => {
      toast({
        title: "Product Added",
        description: `${formData.name} has been successfully added to the marketplace.`,
      });
      
      // Reset form
      setFormData({
        name: "",
        category: "",
        description: "",
        price: "",
        features: ["", "", "", ""],
        image: null,
      });
      setImagePreview(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">Add New Product to Marketplace</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name*</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Fresh Tilapia"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category*</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tilapia">Tilapia</SelectItem>
                        <SelectItem value="catfish">Catfish</SelectItem>
                        <SelectItem value="ornamental">Ornamental</SelectItem>
                        <SelectItem value="fingerlings">Fingerlings</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="feed">Fish Feed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description*</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detailed description of the product"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price*</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      KSh
                    </span>
                    <Input
                      id="price"
                      className="pl-10"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="e.g., 850 per kg"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Key Features (at least one required)</Label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                      </div>
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}, e.g., "100% Sustainable"`}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Product Image*</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      id="image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="image" className="cursor-pointer block">
                      {!imagePreview ? (
                        <div className="space-y-2 py-4">
                          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Image className="h-6 w-6 text-primary" />
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium text-primary">Click to upload</span> or drag and drop
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG or WEBP (max. 5MB)
                          </p>
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Product preview"
                            className="mx-auto max-h-40 object-contain rounded-md"
                          />
                          <div className="absolute top-2 right-2">
                            <div className="bg-green-100 text-green-700 rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          </div>
                          <p className="mt-2 text-xs text-gray-500">Click to change image</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding Product...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Admin Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium mb-1">Product Naming</h3>
                  <p className="text-gray-600">
                    Use clear, descriptive names that highlight the product's main characteristic.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Quality Images</h3>
                  <p className="text-gray-600">
                    Upload high-resolution images (at least 1000x1000px) with good lighting on a clean background.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Detailed Descriptions</h3>
                  <p className="text-gray-600">
                    Include information about quality, size, source, and any special characteristics.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Pricing Format</h3>
                  <p className="text-gray-600">
                    Use the format "KSh X per kg" or "KSh X-Y each" for price ranges.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Key Features</h3>
                  <p className="text-gray-600">
                    List 3-4 standout features that highlight the product's value and uniqueness.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-1">Admin Note</h3>
                <p className="text-blue-700 text-sm">
                  All product additions are logged and will be visible in the marketplace immediately. 
                  Please ensure all information is accurate before submission.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
