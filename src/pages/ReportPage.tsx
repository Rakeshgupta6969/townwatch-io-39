import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Camera, Send, Trash2, Zap, Droplet, Construction, Dog, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { 
    id: "waste-disposal", 
    label: "Waste Disposal",
    icon: Trash2,
    color: "waste",
    gradient: "from-category-waste to-category-waste/80"
  },
  { 
    id: "electric-fault", 
    label: "Electric Fault",
    icon: Zap,
    color: "electric", 
    gradient: "from-category-electric to-category-electric/80"
  },
  { 
    id: "water-problem", 
    label: "Water Problem",
    icon: Droplet,
    color: "water",
    gradient: "from-category-water to-category-water/80"
  },
  { 
    id: "road-maintenance", 
    label: "Road Maintenance",
    icon: Construction,
    color: "road",
    gradient: "from-category-road to-category-road/80"
  },
  { 
    id: "stray-animal", 
    label: "Stray Animal",
    icon: Dog,
    color: "animal",
    gradient: "from-category-animal to-category-animal/80"
  },
  { 
    id: "others", 
    label: "Others",
    icon: MoreHorizontal,
    color: "other",
    gradient: "from-category-other to-category-other/80"
  }
];

const getCategoryTheme = (categoryId: string) => {
  const categoryMap: { [key: string]: string } = {
    "waste-disposal": "waste",
    "electric-fault": "electric", 
    "water-problem": "water",
    "road-maintenance": "road",
    "stray-animal": "animal",
    "others": "other"
  };
  return categoryMap[categoryId] || "other";
};

export default function ReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "", 
    category: "",
    location: "",
    image: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - will be replaced with Supabase integration
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Issue Reported Successfully!",
        description: "Your report has been submitted and will be reviewed by city staff.",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        image: null
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategoryTheme = formData.category ? getCategoryTheme(formData.category) : null;
  
  return (
    <div className={`min-h-screen py-12 transition-all duration-700 ${
      selectedCategoryTheme 
        ? `bg-gradient-to-br from-category-${selectedCategoryTheme}-light via-white to-category-${selectedCategoryTheme}-light/50`
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
            Report a Civic Issue
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Help improve your community by reporting issues that need attention. Your voice makes a difference.
          </p>
        </div>

        <Card className={`shadow-2xl border-0 bg-white/90 backdrop-blur-sm transition-all duration-700 ${
          selectedCategoryTheme ? `ring-2 ring-category-${selectedCategoryTheme}/20` : ''
        }`}>
          <CardHeader className={`border-b transition-all duration-700 ${
            selectedCategoryTheme 
              ? `bg-gradient-to-r from-category-${selectedCategoryTheme}/5 to-category-${selectedCategoryTheme}/10 border-category-${selectedCategoryTheme}/20`
              : 'bg-gradient-to-r from-primary/5 to-blue-600/5 border-primary/10'
          }`}>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className={`p-2 rounded-lg transition-all duration-500 ${
                selectedCategoryTheme 
                  ? `bg-category-${selectedCategoryTheme}/10`
                  : 'bg-primary/10'
              }`}>
                <MapPin className={`w-6 h-6 transition-colors duration-500 ${
                  selectedCategoryTheme 
                    ? `text-category-${selectedCategoryTheme}`
                    : 'text-primary'
                }`} />
              </div>
              Issue Details
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Provide clear and detailed information about the issue you've encountered
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title */}
              <div className="space-y-3">
                <Label htmlFor="title" className="text-base font-semibold text-foreground">
                  Issue Title *
                </Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue (e.g., 'Broken streetlight on Main St')"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                  className="h-12 text-base border-2 focus:border-primary transition-colors"
                />
              </div>

              {/* Category Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-foreground">Select Category *</Label>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    const isSelected = formData.category === category.id;
                    const categoryTheme = category.color;
                    
                    return (
                      <div
                        key={category.id}
                        onClick={() => handleInputChange("category", category.id)}
                        className={`
                          group relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-500 transform hover:scale-105 overflow-hidden
                          ${isSelected 
                            ? `border-category-${categoryTheme} bg-gradient-to-br from-category-${categoryTheme}/15 to-category-${categoryTheme}/5 shadow-xl shadow-category-${categoryTheme}/25 ring-2 ring-category-${categoryTheme}/20` 
                            : `border-gray-200 hover:border-category-${categoryTheme}/60 hover:bg-gradient-to-br hover:from-category-${categoryTheme}/10 hover:to-transparent hover:shadow-lg hover:shadow-category-${categoryTheme}/15`
                          }
                        `}
                        style={{
                          boxShadow: isSelected 
                            ? `var(--shadow-category) hsl(var(--category-${categoryTheme}) / 0.25)`
                            : undefined
                        }}
                      >
                        {/* Animated background blob */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                          isSelected ? 'opacity-100' : ''
                        }`}>
                          <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${category.gradient} opacity-20 animate-pulse`}></div>
                          <div className={`absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-tl ${category.gradient} opacity-15 animate-pulse delay-300`}></div>
                        </div>
                        
                        <div className="relative flex flex-col items-center text-center space-y-3">
                          <div className={`p-4 rounded-full transition-all duration-500 transform ${
                            isSelected 
                              ? `bg-category-${categoryTheme}/25 scale-110 shadow-lg` 
                              : `bg-gray-100 group-hover:bg-category-${categoryTheme}/20 group-hover:scale-105`
                          }`}>
                            <IconComponent 
                              className={`w-8 h-8 transition-all duration-500 ${
                                isSelected 
                                  ? `text-category-${categoryTheme} scale-110` 
                                  : `text-gray-600 group-hover:text-category-${categoryTheme}`
                              }`} 
                            />
                          </div>
                          <div>
                            <p className={`font-semibold text-sm transition-all duration-500 ${
                              isSelected 
                                ? `text-category-${categoryTheme} scale-105` 
                                : `text-foreground group-hover:text-category-${categoryTheme}`
                            }`}>
                              {category.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {!formData.category && (
                  <p className="text-sm text-destructive font-medium">Please select a category to continue</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-3">
                <Label htmlFor="location" className="text-base font-semibold text-foreground">
                  Location *
                </Label>
                <Input
                  id="location"
                  placeholder="Street address, intersection, or landmark (e.g., '123 Main St' or 'Near City Park')"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                  className="h-12 text-base border-2 focus:border-primary transition-colors"
                />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label htmlFor="description" className="text-base font-semibold text-foreground">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the issue, including when you noticed it, severity level, and any safety concerns. The more details you provide, the better we can address the issue."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={5}
                  required
                  className="text-base border-2 focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <Label htmlFor="image" className="text-base font-semibold text-foreground">
                  Photo (Optional)
                </Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary/5 hover:to-primary/10 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                        <Camera className="w-10 h-10 text-gray-400 group-hover:text-primary transition-colors" />
                      </div>
                      <p className="mt-4 text-base text-gray-600 group-hover:text-primary transition-colors font-medium">
                        {formData.image ? formData.image.name : "Click to upload a photo of the issue"}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className={`w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] ${
                    selectedCategoryTheme && formData.category
                      ? `bg-gradient-to-r from-category-${selectedCategoryTheme} to-category-${selectedCategoryTheme}/80 hover:from-category-${selectedCategoryTheme}/90 hover:to-category-${selectedCategoryTheme}/70 text-white`
                      : 'bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90'
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting Report...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-5 h-5" />
                      Submit Report
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Section */}
        <Card className="mt-8 border-0 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">What happens next?</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Your report will be reviewed by city staff within 24-48 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>You'll receive updates on the status of your report via email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>City staff will assess and prioritize the issue based on severity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Work will be scheduled based on priority and available resources</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}