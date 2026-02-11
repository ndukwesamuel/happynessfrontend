// import React, { useState, useEffect } from "react";
// import {
//   Menu,
//   X,
//   ChevronRight,
//   MapPin,
//   Maximize2,
//   Phone,
//   Mail,
//   Calendar,
// } from "lucide-react";

// const YaraLanding = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeProperty, setActiveProperty] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const properties = [
//     {
//       id: 1,
//       title: "Luxury Residential Properties",
//       location: "Eko Atlantic, Banana Island, Ikoyi",
//       size: "3-6 Bedroom Villas",
//       type: "Real Estate",
//       price: "From ₦150M",
//       image:
//         "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
//       features: [
//         "Waterfront Views",
//         "Smart Home Tech",
//         "Private Security",
//         "Premium Finishes",
//       ],
//     },
//     {
//       id: 2,
//       title: "Premium Land & Plots",
//       location: "Victoria Island, Lekki, Abuja",
//       size: "500-2000 SQM",
//       type: "Real Estate",
//       price: "From ₦80M",
//       image:
//         "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
//       features: [
//         "Governor's Consent",
//         "Beachfront Options",
//         "Fully Serviced",
//         "High Appreciation",
//       ],
//     },
//     {
//       id: 3,
//       title: "Palm Plantation Ownership",
//       location: "Delta, Edo, Cross River",
//       size: "From 5 Hectares",
//       type: "Agriculture",
//       price: "From ₦15M",
//       image:
//         "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=800&q=80",
//       features: [
//         "Full Ownership",
//         "Professional Management",
//         "Annual Yields",
//         "Export Support",
//       ],
//     },
//     {
//       id: 4,
//       title: "Bulk Palm Oil Export",
//       location: "Pan-African Markets",
//       size: "10,000+ Litres",
//       type: "Agriculture",
//       price: "Wholesale Pricing",
//       image:
//         "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80",
//       features: [
//         "Quality CPO",
//         "Export Docs",
//         "Container Shipping",
//         "Reliable Supply",
//       ],
//     },
//     {
//       id: 5,
//       title: "Farm Management Services",
//       location: "Nationwide Coverage",
//       size: "Any Scale",
//       type: "Agriculture",
//       price: "Custom Packages",
//       image:
//         "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
//       features: [
//         "End-to-End Care",
//         "Pest Control",
//         "Harvest Optimization",
//         "Yield Reports",
//       ],
//     },
//     {
//       id: 6,
//       title: "Premium Commercial Spaces",
//       location: "Victoria Island, Ikoyi, Abuja CBD",
//       size: "Offices, Retail, Mixed-Use",
//       type: "Real Estate",
//       price: "Contact for Price",
//       image:
//         "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
//       features: [
//         "Grade A Buildings",
//         "Premium Tenants",
//         "High Visibility",
//         "Long-term ROI",
//       ],
//     },
//   ];

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     propertyInterest: "",
//     preferredDate: "",
//     message: "",
//   });

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Consultation Request:", formData);
//     alert(
//       "Thank you! Your consultation request has been submitted. We will review and get back to you shortly.",
//     );
//     setFormData({
//       fullName: "",
//       email: "",
//       phone: "",
//       propertyInterest: "",
//       preferredDate: "",
//       message: "",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0e0f] text-white overflow-x-hidden">
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

//         .animate-fade-in {
//           animation: fadeIn 1.2s ease-out forwards;
//         }

//         .animate-slide-up {
//           animation: slideUp 1s ease-out forwards;
//           opacity: 0;
//         }

//         .animate-slide-left {
//           animation: slideLeft 0.8s ease-out forwards;
//           opacity: 0;
//         }

//         .animate-slide-right {
//           animation: slideRight 0.8s ease-out forwards;
//           opacity: 0;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }

//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(40px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideLeft {
//           from {
//             opacity: 0;
//             transform: translateX(60px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes slideRight {
//           from {
//             opacity: 0;
//             transform: translateX(-60px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .property-card {
//           transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .property-card:hover {
//           transform: translateY(-12px);
//         }

//         .property-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: linear-gradient(135deg, rgba(183, 148, 94, 0.1) 0%, rgba(10, 14, 15, 0.9) 100%);
//           opacity: 0;
//           transition: opacity 0.5s ease;
//         }

//         .property-card:hover::before {
//           opacity: 1;
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

//         .hero-overlay {
//           background: linear-gradient(180deg,
//             rgba(10, 14, 15, 0.3) 0%,
//             rgba(10, 14, 15, 0.7) 50%,
//             rgba(10, 14, 15, 0.95) 100%
//           );
//         }

//         .grain {
//           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
//         }

//         .stagger-1 { animation-delay: 0.1s; }
//         .stagger-2 { animation-delay: 0.2s; }
//         .stagger-3 { animation-delay: 0.3s; }
//         .stagger-4 { animation-delay: 0.4s; }
//         .stagger-5 { animation-delay: 0.5s; }
//         .stagger-6 { animation-delay: 0.6s; }
//       `}</style>

//       {/* Navigation */}
//       <nav
//         className={`fixed w-full z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-[#0a0e0f]/95 backdrop-blur-lg py-4 shadow-2xl"
//             : "bg-transparent py-6"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
//           <div className="font-display text-3xl font-bold tracking-wider animate-slide-right">
//             <span className="text-gold">YARA</span>
//             <span className="text-white/90 ml-2 text-lg font-light">Group</span>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-8 animate-slide-left">
//             <a
//               href="#home"
//               className="text-sm tracking-wide hover:text-gold transition-colors duration-300"
//             >
//               HOME
//             </a>
//             <a
//               href="#offerings"
//               className="text-sm tracking-wide hover:text-gold transition-colors duration-300"
//             >
//               OFFERINGS
//             </a>
//             <a
//               href="#about"
//               className="text-sm tracking-wide hover:text-gold transition-colors duration-300"
//             >
//               ABOUT
//             </a>
//             <a
//               href="#consultation"
//               className="bg-gradient-gold px-6 py-2.5 rounded-none text-sm font-medium tracking-wide hover:shadow-xl hover:shadow-[#b7945e]/20 transition-all duration-300"
//             >
//               BOOK CONSULTATION
//             </a>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden text-gold"
//           >
//             {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-[#0a0e0f] border-t border-gold/20 animate-slide-up">
//             <div className="px-6 py-8 flex flex-col gap-6">
//               <a
//                 href="#home"
//                 className="text-sm tracking-wide hover:text-gold transition-colors"
//               >
//                 HOME
//               </a>
//               <a
//                 href="#offerings"
//                 className="text-sm tracking-wide hover:text-gold transition-colors"
//               >
//                 OFFERINGS
//               </a>
//               <a
//                 href="#about"
//                 className="text-sm tracking-wide hover:text-gold transition-colors"
//               >
//                 ABOUT
//               </a>
//               <a
//                 href="#consultation"
//                 className="bg-gradient-gold px-6 py-3 text-center text-sm font-medium tracking-wide"
//               >
//                 BOOK CONSULTATION
//               </a>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <section
//         id="home"
//         className="relative h-screen flex items-center justify-center overflow-hidden"
//       >
//         <div className="absolute inset-0 z-0 flex">
//           {/* Left Half - Real Estate */}
//           <div className="w-1/2 relative">
//             <img
//               src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80"
//               alt="Luxury Real Estate"
//               className="w-full h-full object-cover animate-fade-in"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e0f]/80 via-[#0a0e0f]/60 to-[#0a0e0f]/40"></div>
//           </div>

//           {/* Right Half - Agriculture */}
//           <div className="w-1/2 relative">
//             <img
//               src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80"
//               alt="Palm Plantation"
//               className="w-full h-full object-cover animate-fade-in"
//             />
//             <div className="absolute inset-0 bg-gradient-to-l from-[#0a0e0f]/80 via-[#0a0e0f]/60 to-[#0a0e0f]/40"></div>
//           </div>

//           {/* Center gradient blend */}
//           <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e0f]/20 via-[#0a0e0f]/70 to-[#0a0e0f]/95"></div>
//           <div className="grain absolute inset-0"></div>
//         </div>

//         <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
//           {/* Side Labels */}
//           <div className="hidden md:flex justify-between absolute left-0 right-0 top-20 px-12 lg:px-24">
//             <div className="animate-slide-right stagger-1">
//               <div className="text-gold/40 text-xs tracking-[0.3em] uppercase mb-2">
//                 Real Estate
//               </div>
//               <div className="w-16 h-px bg-gold/30"></div>
//             </div>
//             <div className="animate-slide-left stagger-1">
//               <div className="text-gold/40 text-xs tracking-[0.3em] uppercase mb-2">
//                 Agriculture
//               </div>
//               <div className="w-16 h-px bg-gold/30"></div>
//             </div>
//           </div>

//           <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 animate-slide-up leading-tight">
//             <span className="text-gold">Properties</span> &{" "}
//             <span className="text-gold">Agriculture</span>
//             <br />
//             Investment Solutions
//           </h1>
//           <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto animate-slide-up stagger-2 font-light tracking-wide">
//             Luxury properties in Eko Atlantic, Banana Island, Ikoyi, Victoria
//             Island & Abuja. Premium palm plantations and bulk export across
//             Africa.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up stagger-3">
//             <a
//               href="#offerings"
//               className="bg-gradient-gold px-10 py-4 text-sm font-semibold tracking-widest hover:shadow-2xl hover:shadow-[#b7945e]/30 transition-all duration-300 group"
//             >
//               VIEW OFFERINGS
//               <ChevronRight
//                 className="inline ml-2 group-hover:translate-x-1 transition-transform"
//                 size={18}
//               />
//             </a>
//             <a
//               href="#consultation"
//               className="border-2 border-gold px-10 py-4 text-sm font-semibold tracking-widest hover-gold transition-all duration-300"
//             >
//               BOOK CONSULTATION
//             </a>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex items-start justify-center p-2">
//             <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse"></div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 bg-[#0f1415] relative overflow-hidden">
//         <div className="grain absolute inset-0 opacity-30"></div>
//         <div className="max-w-7xl mx-auto px-6 relative z-10">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {[
//               { number: "2,000+", label: "Properties Sold" },
//               { number: "500+", label: "Hectares Farmland" },
//               { number: "₦5B+", label: "Assets Value" },
//               { number: "1,000+", label: "Happy Clients" },
//             ].map((stat, idx) => (
//               <div
//                 key={idx}
//                 className={`text-center animate-slide-up stagger-${idx + 1}`}
//               >
//                 <div className="font-display text-5xl md:text-6xl font-bold text-gold mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-sm text-white/60 tracking-wider uppercase">
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Offerings Section */}
//       <section id="offerings" className="py-24 bg-[#0a0e0f] relative">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16 animate-slide-up">
//             <div className="text-gold text-sm tracking-widest uppercase mb-3">
//               What We Offer
//             </div>
//             <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">
//               Properties & Agriculture
//             </h2>
//             <p className="text-white/60 max-w-2xl mx-auto text-lg">
//               From residential estates to palm plantations - comprehensive real
//               estate and agricultural investment solutions
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {properties.map((property, idx) => (
//               <div
//                 key={property.id}
//                 className={`property-card relative group overflow-hidden cursor-pointer animate-slide-up stagger-${idx + 3}`}
//                 onClick={() => setActiveProperty(property)}
//               >
//                 <div className="relative h-[400px] overflow-hidden">
//                   <img
//                     src={property.image}
//                     alt={property.title}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e0f] via-[#0a0e0f]/50 to-transparent"></div>
//                 </div>

//                 <div className="absolute bottom-0 left-0 right-0 p-8">
//                   <div className="flex items-center gap-2 text-gold text-xs tracking-widest mb-3">
//                     <span className="w-8 h-px bg-gold"></span>
//                     {property.type}
//                   </div>

//                   <h3 className="font-display text-3xl font-bold mb-3 group-hover:text-gold transition-colors duration-300">
//                     {property.title}
//                   </h3>

//                   <div className="flex items-center gap-6 text-sm text-white/70 mb-4">
//                     <div className="flex items-center gap-2">
//                       <MapPin size={16} className="text-gold" />
//                       {property.location}
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Maximize2 size={16} className="text-gold" />
//                       {property.size}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {property.features.slice(0, 3).map((feature, i) => (
//                       <span
//                         key={i}
//                         className="text-xs bg-white/5 px-3 py-1 border border-white/10"
//                       >
//                         {feature}
//                       </span>
//                     ))}
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <div className="font-display text-2xl font-bold text-gold">
//                       {property.price}
//                     </div>
//                     <button className="text-gold text-sm tracking-wide group-hover:gap-3 flex items-center gap-2 transition-all">
//                       VIEW DETAILS
//                       <ChevronRight
//                         size={18}
//                         className="group-hover:translate-x-1 transition-transform"
//                       />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Consultation Section */}
//       <section
//         id="consultation"
//         className="py-24 bg-[#0f1415] relative overflow-hidden"
//       >
//         <div className="grain absolute inset-0"></div>
//         <div className="max-w-4xl mx-auto px-6 relative z-10">
//           <div className="text-center mb-12 animate-slide-up">
//             <div className="text-gold text-sm tracking-widest uppercase mb-3">
//               Get Started
//             </div>
//             <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">
//               Book a Consultation
//             </h2>
//             <p className="text-white/60 text-lg">
//               Schedule a personalized session with our property experts
//             </p>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-6 animate-slide-up stagger-2"
//           >
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm tracking-wide mb-2 text-white/70">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold focus:outline-none transition-colors"
//                   placeholder="John Doe"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm tracking-wide mb-2 text-white/70">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold focus:outline-none transition-colors"
//                   placeholder="john@example.com"
//                 />
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm tracking-wide mb-2 text-white/70">
//                   Phone Number *
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold focus:outline-none transition-colors"
//                   placeholder="+234 800 000 0000"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm tracking-wide mb-2 text-white/70">
//                   Interest *
//                 </label>
//                 <select
//                   name="propertyInterest"
//                   value={formData.propertyInterest}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold focus:outline-none transition-colors"
//                 >
//                   <option value="">Select Your Interest</option>
//                   <optgroup label="Real Estate">
//                     <option value="residential-property">
//                       Residential Properties
//                     </option>
//                     <option value="land-plots">Land & Plots</option>
//                     <option value="commercial-property">
//                       Commercial Properties
//                     </option>
//                   </optgroup>
//                   <optgroup label="Agriculture">
//                     <option value="plantation-ownership">
//                       Palm Plantation Ownership
//                     </option>
//                     <option value="bulk-palm-oil">Bulk Palm Oil Export</option>
//                     <option value="farm-management">
//                       Farm Management Services
//                     </option>
//                   </optgroup>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm tracking-wide mb-2 text-white/70">
//                 Preferred Consultation Date
//               </label>
//               <input
//                 type="date"
//                 name="preferredDate"
//                 value={formData.preferredDate}
//                 onChange={handleInputChange}
//                 className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold focus:outline-none transition-colors"
//               />
//             </div>

//             <div>
//               <label className="block text-sm tracking-wide mb-2 text-white/70">
//                 Additional Information
//               </label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleInputChange}
//                 rows="4"
//                 className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold focus:outline-none transition-colors resize-none"
//                 placeholder="Tell us about your investment goals..."
//               ></textarea>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-gold py-4 text-sm font-bold tracking-widest hover:shadow-2xl hover:shadow-[#b7945e]/30 transition-all duration-300"
//             >
//               SUBMIT CONSULTATION REQUEST
//             </button>

//             <p className="text-xs text-white/50 text-center">
//               * All consultation requests are reviewed before approval. We'll
//               contact you within 24-48 hours.
//             </p>
//           </form>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-[#0a0e0f] border-t border-white/10 py-12">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid md:grid-cols-3 gap-12 mb-8">
//             <div>
//               <div className="font-display text-2xl font-bold mb-4">
//                 <span className="text-gold">YARA</span> Group
//               </div>
//               <p className="text-white/60 text-sm leading-relaxed">
//                 Luxury real estate in Nigeria's most prestigious locations and
//                 premium agricultural investments across Africa.
//               </p>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4 tracking-wide">Quick Links</h4>
//               <div className="space-y-2 text-sm">
//                 <a
//                   href="#home"
//                   className="block text-white/60 hover:text-gold transition-colors"
//                 >
//                   Home
//                 </a>
//                 <a
//                   href="#offerings"
//                   className="block text-white/60 hover:text-gold transition-colors"
//                 >
//                   Offerings
//                 </a>
//                 <a
//                   href="#consultation"
//                   className="block text-white/60 hover:text-gold transition-colors"
//                 >
//                   Book Consultation
//                 </a>
//               </div>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-4 tracking-wide">Contact</h4>
//               <div className="space-y-3 text-sm text-white/60">
//                 <div className="flex items-center gap-2">
//                   <Phone size={16} className="text-gold" />
//                   <span>+234 800 YARA FARM</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Mail size={16} className="text-gold" />
//                   <span>info@yarafarm.ng</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <MapPin size={16} className="text-gold" />
//                   <span>Lagos, Nigeria</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-white/10 pt-8 text-center text-sm text-white/40">
//             <p>&copy; 2025 YARA Group. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default YaraLanding;

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  MapPin,
  Maximize2,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

const YaraLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const properties = [
    {
      id: 1,
      title: "Luxury Residential Properties",
      location: "Eko Atlantic, Banana Island, Ikoyi",
      size: "3-6 Bedroom Villas",
      type: "Real Estate",
      price: "From ₦150M",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      features: [
        "Waterfront Views",
        "Smart Home Tech",
        "Private Security",
        "Premium Finishes",
      ],
    },
    {
      id: 2,
      title: "Premium Land & Plots",
      location: "Victoria Island, Lekki, Abuja",
      size: "500-2000 SQM",
      type: "Real Estate",
      price: "From ₦80M",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      features: [
        "Governor's Consent",
        "Beachfront Options",
        "Fully Serviced",
        "High Appreciation",
      ],
    },
    {
      id: 3,
      title: "Palm Plantation Ownership",
      location: "Delta, Edo, Cross River",
      size: "From 5 Hectares",
      type: "Agriculture",
      price: "From ₦15M",
      image:
        "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=800&q=80",
      features: [
        "Full Ownership",
        "Professional Management",
        "Annual Yields",
        "Export Support",
      ],
    },
    {
      id: 4,
      title: "Bulk Palm Oil Export",
      location: "Pan-African Markets",
      size: "10,000+ Litres",
      type: "Agriculture",
      price: "Wholesale Pricing",
      image:
        "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80",
      features: [
        "Quality CPO",
        "Export Docs",
        "Container Shipping",
        "Reliable Supply",
      ],
    },
    {
      id: 5,
      title: "Farm Management Services",
      location: "Nationwide Coverage",
      size: "Any Scale",
      type: "Agriculture",
      price: "Custom Packages",
      image:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
      features: [
        "End-to-End Care",
        "Pest Control",
        "Harvest Optimization",
        "Yield Reports",
      ],
    },
    {
      id: 6,
      title: "Premium Commercial Spaces",
      location: "Victoria Island, Ikoyi, Abuja CBD",
      size: "Offices, Retail, Mixed-Use",
      type: "Real Estate",
      price: "Contact for Price",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      features: [
        "Grade A Buildings",
        "Premium Tenants",
        "High Visibility",
        "Long-term ROI",
      ],
    },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyInterest: "",
    preferredDate: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Consultation Request:", formData);
    alert(
      "Thank you! Your consultation request has been submitted. We will review and get back to you shortly.",
    );
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      propertyInterest: "",
      preferredDate: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0e0f] text-white overflow-x-hidden">
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

        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-left {
          animation: slideLeft 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-right {
          animation: slideRight 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .property-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .property-card:hover {
          transform: translateY(-12px);
        }

        .property-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(183, 148, 94, 0.1) 0%, rgba(10, 14, 15, 0.9) 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .property-card:hover::before {
          opacity: 1;
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

        .hero-overlay {
          background: linear-gradient(180deg, 
            rgba(10, 14, 15, 0.3) 0%, 
            rgba(10, 14, 15, 0.7) 50%,
            rgba(10, 14, 15, 0.95) 100%
          );
        }

        .grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
      `}</style>

      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0e0f]/95 backdrop-blur-lg py-4 shadow-2xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="font-display text-3xl font-bold tracking-wider animate-slide-right">
            <span className="text-gold">YARA</span>
            <span className="text-white/90 ml-2 text-lg font-light">Group</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 animate-slide-left">
            <a
              href="#home"
              className="text-sm tracking-wide hover:text-gold transition-colors duration-300"
            >
              HOME
            </a>
            <a
              href="#offerings"
              className="text-sm tracking-wide hover:text-gold transition-colors duration-300"
            >
              OFFERINGS
            </a>
            <a
              href="#about"
              className="text-sm tracking-wide hover:text-gold transition-colors duration-300"
            >
              ABOUT
            </a>
            <a
              href="#consultation"
              className="bg-gradient-gold px-6 py-2.5 rounded-none text-sm font-medium tracking-wide hover:shadow-xl hover:shadow-[#b7945e]/20 transition-all duration-300"
            >
              BOOK CONSULTATION
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gold"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0a0e0f] border-t border-gold/20 animate-slide-up">
            <div className="px-6 py-8 flex flex-col gap-6">
              <a
                href="#home"
                className="text-sm tracking-wide hover:text-gold transition-colors"
              >
                HOME
              </a>
              <a
                href="#offerings"
                className="text-sm tracking-wide hover:text-gold transition-colors"
              >
                OFFERINGS
              </a>
              <a
                href="#about"
                className="text-sm tracking-wide hover:text-gold transition-colors"
              >
                ABOUT
              </a>
              <a
                href="#consultation"
                className="bg-gradient-gold px-6 py-3 text-center text-sm font-medium tracking-wide"
              >
                BOOK CONSULTATION
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 flex">
          {/* Left Half - Real Estate */}
          <div className="w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80"
              alt="Luxury Real Estate"
              className="w-full h-full object-cover animate-fade-in"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e0f]/80 via-[#0a0e0f]/60 to-[#0a0e0f]/40"></div>
          </div>

          {/* Right Half - Agriculture */}
          <div className="w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80"
              alt="Palm Plantation"
              className="w-full h-full object-cover animate-fade-in"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0a0e0f]/80 via-[#0a0e0f]/60 to-[#0a0e0f]/40"></div>
          </div>

          {/* Center gradient blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e0f]/20 via-[#0a0e0f]/70 to-[#0a0e0f]/95"></div>
          <div className="grain absolute inset-0"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Side Labels */}
          <div className="hidden md:flex justify-between absolute left-0 right-0 top-20 px-12 lg:px-24">
            <div className="animate-slide-right stagger-1">
              <div className="text-gold/40 text-xs tracking-[0.3em] uppercase mb-2">
                Real Estate
              </div>
              <div className="w-16 h-px bg-gold/30"></div>
            </div>
            <div className="animate-slide-left stagger-1">
              <div className="text-gold/40 text-xs tracking-[0.3em] uppercase mb-2">
                Agriculture
              </div>
              <div className="w-16 h-px bg-gold/30"></div>
            </div>
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 animate-slide-up leading-tight">
            <span className="text-gold">Properties</span> &{" "}
            <span className="text-gold">Agriculture</span>
            <br />
            Investment Solutions
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto animate-slide-up stagger-2 font-light tracking-wide">
            Luxury properties in Eko Atlantic, Banana Island, Ikoyi, Victoria
            Island & Abuja. Premium palm plantations and bulk export across
            Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up stagger-3">
            <a
              href="#offerings"
              className="bg-gradient-gold px-10 py-4 text-sm font-semibold tracking-widest hover:shadow-2xl hover:shadow-[#b7945e]/30 transition-all duration-300 group"
            >
              VIEW OFFERINGS
              <ChevronRight
                className="inline ml-2 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </a>
            <a
              href="#consultation"
              className="border-2 border-gold px-10 py-4 text-sm font-semibold tracking-widest hover-gold transition-all duration-300"
            >
              BOOK CONSULTATION
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#0f1415] relative overflow-hidden">
        <div className="grain absolute inset-0 opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "2,000+", label: "Properties Sold" },
              { number: "500+", label: "Hectares Farmland" },
              { number: "₦5B+", label: "Assets Value" },
              { number: "1,000+", label: "Happy Clients" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`text-center animate-slide-up stagger-${idx + 1}`}
              >
                <div className="font-display text-5xl md:text-6xl font-bold text-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-white/60 tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section id="offerings" className="py-24 bg-[#0a0e0f] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-slide-up">
            <div className="text-gold text-sm tracking-widest uppercase mb-3">
              What We Offer
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">
              Properties & Agriculture
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              From residential estates to palm plantations - comprehensive real
              estate and agricultural investment solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, idx) => (
              <div
                key={property.id}
                className={`property-card relative group overflow-hidden cursor-pointer animate-slide-up stagger-${idx + 3}`}
              >
                <div className="relative h-[400px] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e0f] via-[#0a0e0f]/50 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 text-gold text-xs tracking-widest mb-3">
                    <span className="w-8 h-px bg-gold"></span>
                    {property.type}
                  </div>

                  <h3 className="font-display text-3xl font-bold mb-3 group-hover:text-gold transition-colors duration-300">
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-6 text-sm text-white/70 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gold" />
                      {property.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize2 size={16} className="text-gold" />
                      {property.size}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.features.slice(0, 3).map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/5 px-3 py-1 border border-white/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="font-display text-2xl font-bold text-gold">
                      {property.price}
                    </div>
                    <Link
                      to={`/property/${property.id}`}
                      className="text-gold text-sm tracking-wide group-hover:gap-3 flex items-center gap-2 transition-all"
                    >
                      VIEW DETAILS
                      <ChevronRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section
        id="consultation"
        className="py-24 bg-[#0f1415] relative overflow-hidden"
      >
        <div className="grain absolute inset-0"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12 animate-slide-up">
            <div className="text-gold text-sm tracking-widest uppercase mb-3">
              Get Started
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">
              Book a Consultation
            </h2>
            <p className="text-white/60 text-lg">
              Schedule a personalized session with our property experts
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 animate-slide-up stagger-2"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm tracking-wide mb-2 text-white/70">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm tracking-wide mb-2 text-white/70">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm tracking-wide mb-2 text-white/70">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                  placeholder="+234 800 000 0000"
                />
              </div>

              <div>
                <label className="block text-sm tracking-wide mb-2 text-white/70">
                  Interest *
                </label>
                <select
                  name="propertyInterest"
                  value={formData.propertyInterest}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold focus:outline-none transition-colors"
                >
                  <option value="">Select Your Interest</option>
                  <optgroup label="Real Estate">
                    <option value="residential-property">
                      Residential Properties
                    </option>
                    <option value="land-plots">Land & Plots</option>
                    <option value="commercial-property">
                      Commercial Properties
                    </option>
                  </optgroup>
                  <optgroup label="Agriculture">
                    <option value="plantation-ownership">
                      Palm Plantation Ownership
                    </option>
                    <option value="bulk-palm-oil">Bulk Palm Oil Export</option>
                    <option value="farm-management">
                      Farm Management Services
                    </option>
                  </optgroup>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm tracking-wide mb-2 text-white/70">
                Preferred Consultation Date
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm tracking-wide mb-2 text-white/70">
                Additional Information
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-gold focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your investment goals..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-gold py-4 text-sm font-bold tracking-widest hover:shadow-2xl hover:shadow-[#b7945e]/30 transition-all duration-300"
            >
              SUBMIT CONSULTATION REQUEST
            </button>

            <p className="text-xs text-white/50 text-center">
              * All consultation requests are reviewed before approval. We'll
              contact you within 24-48 hours.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0e0f] border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            <div>
              <div className="font-display text-2xl font-bold mb-4">
                <span className="text-gold">YARA</span> Group
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Luxury real estate in Nigeria's most prestigious locations and
                premium agricultural investments across Africa.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 tracking-wide">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a
                  href="#home"
                  className="block text-white/60 hover:text-gold transition-colors"
                >
                  Home
                </a>
                <a
                  href="#offerings"
                  className="block text-white/60 hover:text-gold transition-colors"
                >
                  Offerings
                </a>
                <a
                  href="#consultation"
                  className="block text-white/60 hover:text-gold transition-colors"
                >
                  Book Consultation
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 tracking-wide">Contact</h4>
              <div className="space-y-3 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gold" />
                  <span>+234 800 YARA FARM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gold" />
                  <span>info@yarafarm.ng</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gold" />
                  <span>Lagos, Nigeria</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/40">
            <p>&copy; 2025 YARA Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default YaraLanding;
