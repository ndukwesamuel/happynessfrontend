// import React, { useState } from "react";
// import {
//   ArrowLeft,
//   MapPin,
//   Maximize2,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Phone,
//   Mail,
//   Calendar,
//   Share2,
//   Heart,
//   Home,
// } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";

// const PropertyDetailsPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get property ID from URL
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     preferredDate: "",
//     message: "",
//   });

//   // Mock data - In real app, fetch based on ID from backend
//   const property = {
//     id: 1,
//     title: "Luxury Villa - Eko Atlantic",
//     location: "Eko Atlantic, Lagos",
//     size: "5 Bedroom Duplex",
//     type: "Residential",
//     category: "Real Estate",
//     price: "₦250M",
//     status: "active",
//     image:
//       "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
//     features: ["Waterfront", "Smart Home", "Pool", "Gym"],
//     description:
//       "This exceptional residential property represents a unique investment opportunity in Eko Atlantic. Featuring modern architecture and premium finishes, this property is situated in one of Nigeria's most prestigious locations. With easy access to major business districts, luxury amenities, and world-class infrastructure, this is an ideal choice for discerning investors and homeowners alike.",
//     images: [
//       "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
//       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
//       "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
//       "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
//     ],
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + property.images.length) % property.images.length,
//     );
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const consultationData = {
//       ...formData,
//       propertyInterest: property.title,
//       propertyId: property.id,
//     };
//     console.log("Consultation Request:", consultationData);
//     alert(
//       "Thank you! Your consultation request has been submitted. We will contact you within 24-48 hours.",
//     );
//     setFormData({
//       fullName: "",
//       email: "",
//       phone: "",
//       preferredDate: "",
//       message: "",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0e0f] text-white">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');

//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           font-family: 'Montserrat', sans-serif;
//         }

//         .font-display {
//           font-family: 'Cormorant Garamond', serif;
//         }

//         .bg-gradient-gold {
//           background: linear-gradient(135deg, #b7945e 0%, #8b7355 100%);
//         }

//         .text-gold {
//           color: #b7945e;
//         }

//         .border-gold {
//           border-color: #b7945e;
//         }

//         .hover-gold:hover {
//           background-color: #b7945e;
//           border-color: #b7945e;
//           color: #0a0e0f;
//         }

//         .image-gallery-nav {
//           transition: opacity 0.3s ease;
//         }

//         .gallery-wrapper:hover .image-gallery-nav {
//           opacity: 1;
//         }

//         .thumbnail {
//           transition: all 0.3s ease;
//           cursor: pointer;
//         }

//         .thumbnail:hover {
//           transform: scale(1.05);
//         }

//         .thumbnail.active {
//           border-color: #b7945e;
//           opacity: 1;
//         }
//       `}</style>

//       {/* Top Navigation */}
//       <nav className="sticky top-0 bg-[#0a0e0f]/95 backdrop-blur-lg border-b border-white/10 z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => navigate("/")}
//               className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
//             >
//               <ArrowLeft size={20} />
//               <span className="text-sm tracking-wide">Back to Properties</span>
//             </button>

//             <div className="font-display text-2xl font-bold">
//               <span className="text-gold">YARA</span>
//               <span className="text-white/90 ml-2 text-base font-light">
//                 Group
//               </span>
//             </div>

//             <div className="flex items-center gap-3">
//               <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
//                 <Share2 size={20} className="text-white/70" />
//               </button>
//               <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
//                 <Heart size={20} className="text-white/70" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Property Header */}
//       <div className="bg-[#0f1415] border-b border-white/10">
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <div className="text-gold text-xs uppercase tracking-widest mb-2">
//                 {property.type} • {property.category}
//               </div>
//               <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
//                 {property.title}
//               </h1>
//               <div className="flex flex-wrap items-center gap-6 text-white/70">
//                 <div className="flex items-center gap-2">
//                   <MapPin size={18} className="text-gold" />
//                   <span>{property.location}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Maximize2 size={18} className="text-gold" />
//                   <span>{property.size}</span>
//                 </div>
//               </div>
//             </div>
//             <div className="text-left md:text-right">
//               <div className="text-white/60 text-sm mb-2">Price</div>
//               <div className="font-display text-5xl font-bold text-gold">
//                 {property.price}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Image Gallery */}
//       <div className="bg-black">
//         <div className="max-w-7xl mx-auto">
//           <div className="gallery-wrapper relative h-[400px] md:h-[600px] group">
//             <img
//               src={property.images[currentImageIndex]}
//               alt={property.title}
//               className="w-full h-full object-cover"
//             />

//             {/* Gallery Navigation */}
//             <button
//               onClick={prevImage}
//               className="image-gallery-nav absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 transition-all"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <button
//               onClick={nextImage}
//               className="image-gallery-nav absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 transition-all"
//             >
//               <ChevronRight size={24} />
//             </button>

//             {/* Image Counter */}
//             <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
//               {currentImageIndex + 1} / {property.images.length}
//             </div>
//           </div>

//           {/* Thumbnail Gallery */}
//           <div className="bg-[#0f1415] p-4">
//             <div className="grid grid-cols-4 gap-4">
//               {property.images.map((img, idx) => (
//                 <div
//                   key={idx}
//                   onClick={() => setCurrentImageIndex(idx)}
//                   className={`thumbnail h-24 rounded-lg overflow-hidden border-2 ${
//                     currentImageIndex === idx
//                       ? "active"
//                       : "border-white/10 opacity-60"
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`View ${idx + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Left Column - Details */}
//           <div className="lg:col-span-2 space-y-10">
//             {/* Description */}
//             <div>
//               <h2 className="font-display text-3xl font-bold text-white mb-6 pb-3 border-b border-white/10">
//                 Property Description
//               </h2>
//               <p className="text-white/70 leading-relaxed text-lg">
//                 {property.description}
//               </p>
//             </div>

//             {/* Features */}
//             <div>
//               <h2 className="font-display text-3xl font-bold text-white mb-6 pb-3 border-b border-white/10">
//                 Key Features & Amenities
//               </h2>
//               <div className="grid sm:grid-cols-2 gap-4">
//                 {property.features.map((feature, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-lg"
//                   >
//                     <div className="bg-gold/20 p-2 rounded">
//                       <Check size={18} className="text-gold" />
//                     </div>
//                     <span className="font-medium">{feature}</span>
//                   </div>
//                 ))}
//                 {/* Additional features */}
//                 <div className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-lg">
//                   <div className="bg-gold/20 p-2 rounded">
//                     <Check size={18} className="text-gold" />
//                   </div>
//                   <span className="font-medium">24/7 Security</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-lg">
//                   <div className="bg-gold/20 p-2 rounded">
//                     <Check size={18} className="text-gold" />
//                   </div>
//                   <span className="font-medium">Prime Location</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-lg">
//                   <div className="bg-gold/20 p-2 rounded">
//                     <Check size={18} className="text-gold" />
//                   </div>
//                   <span className="font-medium">Modern Infrastructure</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-lg">
//                   <div className="bg-gold/20 p-2 rounded">
//                     <Check size={18} className="text-gold" />
//                   </div>
//                   <span className="font-medium">Backup Generator</span>
//                 </div>
//               </div>
//             </div>

//             {/* Investment Highlights */}
//             <div className="bg-[#0f1415] border border-white/10 p-8 rounded-lg">
//               <h2 className="font-display text-3xl font-bold text-white mb-6">
//                 Investment Highlights
//               </h2>
//               <div className="space-y-4 text-white/70">
//                 <div className="flex items-start gap-4">
//                   <div className="bg-gold/20 p-2 rounded mt-1">
//                     <Check size={16} className="text-gold" />
//                   </div>
//                   <div>
//                     <h3 className="text-white font-semibold mb-1">
//                       Prime Location
//                     </h3>
//                     <p className="text-sm">
//                       Located in {property.location}, one of Nigeria's most
//                       prestigious addresses with high appreciation potential.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <div className="bg-gold/20 p-2 rounded mt-1">
//                     <Check size={16} className="text-gold" />
//                   </div>
//                   <div>
//                     <h3 className="text-white font-semibold mb-1">
//                       Clear Title Documentation
//                     </h3>
//                     <p className="text-sm">
//                       Full Certificate of Occupancy (C of O) / Governor's
//                       Consent with verified documentation.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <div className="bg-gold/20 p-2 rounded mt-1">
//                     <Check size={16} className="text-gold" />
//                   </div>
//                   <div>
//                     <h3 className="text-white font-semibold mb-1">
//                       Modern Infrastructure
//                     </h3>
//                     <p className="text-sm">
//                       Immediate access to paved roads, electricity, water
//                       supply, and fiber optic internet.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <div className="bg-gold/20 p-2 rounded mt-1">
//                     <Check size={16} className="text-gold" />
//                   </div>
//                   <div>
//                     <h3 className="text-white font-semibold mb-1">
//                       Flexible Payment
//                     </h3>
//                     <p className="text-sm">
//                       Multiple payment plans available to suit different
//                       investment strategies.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Location Map Placeholder */}
//             <div>
//               <h2 className="font-display text-3xl font-bold text-white mb-6 pb-3 border-b border-white/10">
//                 Location
//               </h2>
//               <div className="bg-[#0f1415] border border-white/10 rounded-lg h-80 flex items-center justify-center">
//                 <div className="text-center text-white/40">
//                   <MapPin size={48} className="mx-auto mb-4 opacity-40" />
//                   <p>Map integration coming soon</p>
//                   <p className="text-sm mt-2">{property.location}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Contact Form */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-24 space-y-6">
//               {/* Contact Card */}
//               <div className="bg-[#0f1415] border border-white/10 rounded-lg p-6">
//                 <h3 className="font-display text-2xl font-bold text-white mb-6">
//                   Book a Consultation
//                 </h3>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div>
//                     <label className="block text-sm text-white/70 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white rounded-lg focus:border-gold focus:outline-none transition-colors"
//                       placeholder="John Doe"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm text-white/70 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white rounded-lg focus:border-gold focus:outline-none transition-colors"
//                       placeholder="john@example.com"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm text-white/70 mb-2">
//                       Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white rounded-lg focus:border-gold focus:outline-none transition-colors"
//                       placeholder="+234 800 000 0000"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm text-white/70 mb-2">
//                       Preferred Date
//                     </label>
//                     <input
//                       type="date"
//                       name="preferredDate"
//                       value={formData.preferredDate}
//                       onChange={handleInputChange}
//                       className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white rounded-lg focus:border-gold focus:outline-none transition-colors"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm text-white/70 mb-2">
//                       Additional Information
//                     </label>
//                     <textarea
//                       name="message"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       rows="4"
//                       className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white rounded-lg focus:border-gold focus:outline-none resize-none transition-colors"
//                       placeholder="Any specific requirements or questions..."
//                     ></textarea>
//                   </div>

//                   <button
//                     type="submit"
//                     className="w-full bg-gradient-gold py-4 font-semibold tracking-wide hover:shadow-xl hover:shadow-[#b7945e]/30 transition-all rounded-lg"
//                   >
//                     SUBMIT REQUEST
//                   </button>

//                   <p className="text-xs text-white/40 text-center">
//                     We'll review your request and contact you within 24-48 hours
//                   </p>
//                 </form>
//               </div>

//               {/* Contact Info */}
//               <div className="bg-[#0f1415] border border-white/10 rounded-lg p-6">
//                 <h4 className="font-semibold text-white mb-4">
//                   Contact Information
//                 </h4>
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3 text-white/70">
//                     <div className="bg-gold/10 p-2 rounded">
//                       <Phone size={18} className="text-gold" />
//                     </div>
//                     <div>
//                       <div className="text-xs text-white/50">Call us</div>
//                       <div className="text-sm">+234 800 YARA GROUP</div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 text-white/70">
//                     <div className="bg-gold/10 p-2 rounded">
//                       <Mail size={18} className="text-gold" />
//                     </div>
//                     <div>
//                       <div className="text-xs text-white/50">Email us</div>
//                       <div className="text-sm">info@yaragroup.ng</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Property ID */}
//               <div className="bg-[#0f1415] border border-white/10 rounded-lg p-6">
//                 <div className="text-xs text-white/50 mb-2">
//                   Property Reference
//                 </div>
//                 <div className="text-lg font-mono text-gold font-semibold">
//                   YARA-{property.id.toString().padStart(4, "0")}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-[#0a0e0f] border-t border-white/10 py-12 mt-12">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center">
//             <div className="font-display text-2xl font-bold mb-2">
//               <span className="text-gold">YARA</span> Group
//             </div>
//             <p className="text-white/60 text-sm">
//               Luxury real estate and premium agricultural investments
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default PropertyDetailsPage;

import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Maximize2,
  Check,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
  Share2,
  Heart,
  Home,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutateData } from "../hook/Request";
// import { useMutateData } from "../../hook/Request";

const PropertyDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get property ID from URL
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Consultation mutation
  const { mutate: submitConsultation, isLoading: isSubmitting } =
    useMutateData("consultations");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
  });

  // Mock data - In real app, fetch based on ID from backend
  const property = {
    id: 1,
    title: "Luxury Villa - Eko Atlantic",
    location: "Eko Atlantic, Lagos",
    size: "5 Bedroom Duplex",
    type: "Residential",
    category: "Real Estate",
    price: "₦250M",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    features: ["Waterfront", "Smart Home", "Pool", "Gym"],
    description:
      "This exceptional residential property represents a unique investment opportunity in Eko Atlantic. Featuring modern architecture and premium finishes, this property is situated in one of Nigeria's most prestigious locations. With easy access to major business districts, luxury amenities, and world-class infrastructure, this is an ideal choice for discerning investors and homeowners alike.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length,
    );
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get propertyType from property.type
    const propertyTypeMap = {
      Residential: "residential-property",
      "Land & Plots": "land-plots",
      Commercial: "commercial-property",
      "Palm Plantation": "plantation-ownership",
      "Farm Management": "farm-management",
      "Bulk Export": "bulk-palm-oil",
    };

    const consultationData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      propertyInterest: property.title,
      propertyType: propertyTypeMap[property.type] || "residential-property",
      propertyId: property.id.toString(),
      preferredDate: formData.preferredDate || undefined,
      message: formData.message || undefined,
    };

    // Submit to API
    submitConsultation(
      {
        url: "/consultation",
        data: consultationData,
      },
      {
        onSuccess: (response) => {
          console.log("Success:", response);
          alert(
            "Thank you! Your consultation request has been submitted successfully. We will contact you within 24-48 hours.",
          );

          // Reset form
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            preferredDate: "",
            message: "",
          });
        },
        onError: (error) => {
          console.error("Error:", error);
          alert(
            error?.message ||
              "Failed to submit consultation request. Please try again.",
          );
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0e0f] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Montserrat', sans-serif;
        }

        .font-display {
          font-family: 'Cormorant Garamond', serif;
        }

        .bg-gradient-gold {
          background: linear-gradient(135deg, #b7945e 0%, #8b7355 100%);
        }

        .text-gold {
          color: #b7945e;
        }

        .border-gold {
          border-color: #b7945e;
        }

        .hover-gold:hover {
          background-color: #b7945e;
          border-color: #b7945e;
          color: #0a0e0f;
        }

        .image-gallery-nav {
          transition: opacity 0.3s ease;
        }

        .gallery-wrapper:hover .image-gallery-nav {
          opacity: 1;
        }

        .thumbnail {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .thumbnail:hover {
          transform: scale(1.05);
        }

        .thumbnail.active {
          border-color: #b7945e;
          opacity: 1;
        }
      `}</style>

      {/* Top Navigation */}
      <nav className="sticky top-0 bg-[#0a0e0f]/95 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm tracking-wide">Back to Properties</span>
            </button>

            <div className="font-display text-2xl font-bold">
              <span className="text-gold">YARA</span>
              <span className="text-white/90 ml-2 text-base font-light">
                Group
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Share2 size={20} className="text-white/70" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Heart size={20} className="text-white/70" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Property Header */}
      <div className="bg-[#0f1415] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-gold text-xs uppercase tracking-widest mb-2">
                {property.type} • {property.category}
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
                {property.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gold" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize2 size={18} className="text-gold" />
                  <span>{property.size}</span>
                </div>
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-white/60 text-sm mb-2">Price</div>
              <div className="font-display text-5xl font-bold text-gold">
                {property.price}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Image Gallery */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="gallery-wrapper relative h-[400px] md:h-[600px] group">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />

            {/* Gallery Navigation */}
            <button
              onClick={prevImage}
              className="image-gallery-nav absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="image-gallery-nav absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 transition-all"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="bg-[#0f1415] p-4">
            <div className="grid grid-cols-4 gap-4">
              {property.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`thumbnail h-24 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === idx
                      ? "active"
                      : "border-white/10 opacity-60"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-6 pb-3 border-b border-white/10">
                Property Description
              </h2>
              <p className="text-white/70 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-6 pb-3 border-b border-white/10">
                Key Features & Amenities
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {property.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-lg"
                  >
                    <div className="bg-gold/20 p-2 rounded">
                      <Check size={18} className="text-gold" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
                {/* Additional features */}
                <div className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-lg">
                  <div className="bg-gold/20 p-2 rounded">
                    <Check size={18} className="text-gold" />
                  </div>
                  <span className="font-medium">24/7 Security</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-lg">
                  <div className="bg-gold/20 p-2 rounded">
                    <Check size={18} className="text-gold" />
                  </div>
                  <span className="font-medium">Prime Location</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-lg">
                  <div className="bg-gold/20 p-2 rounded">
                    <Check size={18} className="text-gold" />
                  </div>
                  <span className="font-medium">Modern Infrastructure</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 bg-white/5 p-4 rounded-lg">
                  <div className="bg-gold/20 p-2 rounded">
                    <Check size={18} className="text-gold" />
                  </div>
                  <span className="font-medium">Backup Generator</span>
                </div>
              </div>
            </div>

            {/* Investment Highlights */}
            <div className="bg-[#0f1415] border border-white/10 p-8 rounded-lg">
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                Investment Highlights
              </h2>
              <div className="space-y-4 text-white/70">
                <div className="flex items-start gap-4">
                  <div className="bg-gold/20 p-2 rounded mt-1">
                    <Check size={16} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Prime Location
                    </h3>
                    <p className="text-sm">
                      Located in {property.location}, one of Nigeria's most
                      prestigious addresses with high appreciation potential.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gold/20 p-2 rounded mt-1">
                    <Check size={16} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Clear Title Documentation
                    </h3>
                    <p className="text-sm">
                      Full Certificate of Occupancy (C of O) / Governor's
                      Consent with verified documentation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gold/20 p-2 rounded mt-1">
                    <Check size={16} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Modern Infrastructure
                    </h3>
                    <p className="text-sm">
                      Immediate access to paved roads, electricity, water
                      supply, and fiber optic internet.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gold/20 p-2 rounded mt-1">
                    <Check size={16} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Flexible Payment
                    </h3>
                    <p className="text-sm">
                      Multiple payment plans available to suit different
                      investment strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-6 pb-3 border-b border-white/10">
                Location
              </h2>
              <div className="bg-[#0f1415] border border-white/10 rounded-lg h-80 flex items-center justify-center">
                <div className="text-center text-white/40">
                  <MapPin size={48} className="mx-auto mb-4 opacity-40" />
                  <p>Map integration coming soon</p>
                  <p className="text-sm mt-2">{property.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Card */}
              <div className="bg-[#0f1415] border border-white/10 rounded-lg p-6">
                <h3 className="font-display text-2xl font-bold text-white mb-6">
                  Book a Consultation
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white rounded-lg focus:border-gold focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white rounded-lg focus:border-gold focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white rounded-lg focus:border-gold focus:outline-none transition-colors"
                      placeholder="+234 800 000 0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white rounded-lg focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/70 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white rounded-lg focus:border-gold focus:outline-none resize-none transition-colors"
                      placeholder="Any specific requirements or questions..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-gold py-4 font-semibold tracking-wide hover:shadow-xl hover:shadow-[#b7945e]/30 transition-all rounded-lg ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? "SUBMITTING..." : "SUBMIT REQUEST"}
                  </button>

                  <p className="text-xs text-white/40 text-center">
                    We'll review your request and contact you within 24-48 hours
                  </p>
                </form>
              </div>

              {/* Contact Info */}
              <div className="bg-[#0f1415] border border-white/10 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-4">
                  Contact Information
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="bg-gold/10 p-2 rounded">
                      <Phone size={18} className="text-gold" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Call us</div>
                      <div className="text-sm">+234 800 YARA GROUP</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-white/70">
                    <div className="bg-gold/10 p-2 rounded">
                      <Mail size={18} className="text-gold" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Email us</div>
                      <div className="text-sm">info@yaragroup.ng</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property ID */}
              <div className="bg-[#0f1415] border border-white/10 rounded-lg p-6">
                <div className="text-xs text-white/50 mb-2">
                  Property Reference
                </div>
                <div className="text-lg font-mono text-gold font-semibold">
                  YARA-{property.id.toString().padStart(4, "0")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a0e0f] border-t border-white/10 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="font-display text-2xl font-bold mb-2">
              <span className="text-gold">YARA</span> Group
            </div>
            <p className="text-white/60 text-sm">
              Luxury real estate and premium agricultural investments
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PropertyDetailsPage;
