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
import { useMutateData, useFetchData } from "../hook/Request";

const YaraLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Consultation mutation
  const { mutate: submitConsultation, isLoading: isSubmitting } =
    useMutateData("consultations");

  // Fetch active properties from API
  const { data: propertiesData, isLoading: loadingProperties } = useFetchData(
    "/Property",
    "activeProperties",
  );

  console.log({
    yuuuu: propertiesData,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Default images mapping by property type
  const defaultImages = {
    Residential:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    "Land & Plots":
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    Commercial:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    "Palm Plantation":
      "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=800&q=80",
    "Farm Management":
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
    "Bulk Export":
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80",
  };

  // Get properties from API or use empty array
  const properties = propertiesData?.data?.properties || [];
  console.log({
    yuu: properties,
  });


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyInterest: "",
    propertyType: "",
    preferredDate: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // When propertyInterest changes, extract both display text and type
    if (name === "propertyInterest") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const displayText =
        selectedOption?.textContent || selectedOption?.innerText || value;

      setFormData({
        ...formData,
        propertyInterest: displayText.trim(), // Display text (e.g., "Residential Properties")
        propertyType: value, // Value (e.g., "residential-property")
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data for API
    const consultationData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      propertyInterest: formData.propertyInterest,
      propertyType: formData.propertyType,
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
            propertyInterest: "",
            propertyType: "",
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
            {loadingProperties ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                  <p className="mt-4 text-white/60">Loading properties...</p>
                </div>
              </div>
            ) : properties.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-white/60 text-lg">
                  No properties available at the moment.
                </p>
              </div>
            ) : (
              properties.map((property, idx) => (
                <div
                  key={property._id}
                  className={`property-card relative group overflow-hidden cursor-pointer animate-slide-up stagger-${idx + 3}`}
                >
                  <div className="relative h-[400px] overflow-hidden">
                    <img
                      src={property.images?.[0]}
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

                      {console.log({
                        cfff: property,
                      })}
                      <Link
                        to={`/property/${property._id}`}
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
              ))
            )}
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
                  value={formData.propertyType}
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
              disabled={isSubmitting}
              className={`w-full bg-gradient-gold py-4 text-sm font-bold tracking-widest hover:shadow-2xl hover:shadow-[#b7945e]/30 transition-all duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT CONSULTATION REQUEST"}
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

// // // import React, { useState, useEffect, useRef } from "react";
// // // import { Link } from "react-router-dom";
// // // import { useMutateData, useFetchData } from "../hook/Request";

// // // /* ─────────────────────────────────────────────
// // //    YARA GROUP – Agriculture-first landing page
// // //    Inspired by medwwidehome.com.ng
// // //    Aesthetic: Organic / Natural / Editorial
// // //    Colors: Deep forest green, warm cream, gold
// // // ───────────────────────────────────────────── */

// // // const YaraHome = () => {
// // //   const [webinarOpen, setWebinarOpen] = useState(false);
// // //   const [inspectionOpen, setInspectionOpen] = useState(false);
// // //   const [scrolled, setScrolled] = useState(false);
// // //   const [menuOpen, setMenuOpen] = useState(false);

// // //   // Webinar form state
// // //   const [webinarForm, setWebinarForm] = useState({
// // //     email: "",
// // //     phone: "",
// // //     name: "",
// // //     available: "",
// // //   });
// // //   const [inspectionForm, setInspectionForm] = useState({
// // //     email: "",
// // //     phone: "",
// // //     name: "",
// // //     source: "",
// // //   });

// // //   // Mutations
// // //   const { mutate: submitWebinar, isLoading: submittingWebinar } =
// // //     useMutateData("webinar");
// // //   const { mutate: submitInspection, isLoading: submittingInspection } =
// // //     useMutateData("inspection");

// // //   // Fetch active properties
// // //   const { data: propertiesData, isLoading: loadingProperties } = useFetchData(
// // //     "/Property",
// // //     "activeProperties",
// // //   );
// // //   const properties = propertiesData?.data?.properties || [];

// // //   useEffect(() => {
// // //     const handleScroll = () => setScrolled(window.scrollY > 60);
// // //     window.addEventListener("scroll", handleScroll);
// // //     // Auto-open webinar modal after 3s
// // //     const timer = setTimeout(() => setWebinarOpen(true), 3000);
// // //     return () => {
// // //       window.removeEventListener("scroll", handleScroll);
// // //       clearTimeout(timer);
// // //     };
// // //   }, []);

// // //   const handleWebinarSubmit = (e) => {
// // //     e.preventDefault();
// // //     submitWebinar(
// // //       { url: "/webinar-signup", data: webinarForm },
// // //       {
// // //         onSuccess: () => {
// // //           alert("You're registered! We'll send you the webinar link.");
// // //           setWebinarOpen(false);
// // //         },
// // //         onError: (err) => alert(err?.message || "Failed. Please try again."),
// // //       },
// // //     );
// // //   };

// // //   const handleInspectionSubmit = (e) => {
// // //     e.preventDefault();
// // //     submitInspection(
// // //       { url: "/inspection", data: inspectionForm },
// // //       {
// // //         onSuccess: () => {
// // //           alert("Inspection booked! We'll be in touch within 24 hours.");
// // //           setInspectionOpen(false);
// // //         },
// // //         onError: (err) => alert(err?.message || "Failed. Please try again."),
// // //       },
// // //     );
// // //   };

// // //   // Sold-out phases (static content matching the reference)
// // //   const phases = [
// // //     {
// // //       name: "Palmrich Phase 1",
// // //       img: "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=800&q=80",
// // //       desc: "Our very first development, Phase 1 laid the foundation — prime land, fully verified, and high-value appreciation. It sold out quickly and set the tone for future phases.",
// // //       soldOut: true,
// // //     },
// // //     {
// // //       name: "Palmrich Phase 2",
// // //       img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
// // //       desc: "Phase 2 attracted early land owners who recognized opportunity early. With great access roads and rapid development, it became a hotspot for savvy buyers seeking long-term returns.",
// // //       soldOut: true,
// // //     },
// // //     {
// // //       name: "Palmrich Phase 3",
// // //       img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
// // //       desc: "Tucked slightly off the main road, Phase 3 offered a perfect mix of privacy and value. It appealed to clients who wanted more space without compromising on location.",
// // //       soldOut: true,
// // //     },
// // //     {
// // //       name: "Palmrich Phase 4",
// // //       img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
// // //       desc: "This phase offered enhanced infrastructure and was our first to introduce perimeter fencing and estate layout design. Investors rushed in, and it sold out in record time.",
// // //       soldOut: true,
// // //     },
// // //     {
// // //       name: "Palmrich Phase 5",
// // //       img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80",
// // //       desc: "Located in Ibadan, this phase features a thriving agro palm plantation already fruiting — the perfect blend of land ownership and immediate agricultural returns.",
// // //       soldOut: false,
// // //     },
// // //     {
// // //       name: "Palmrich Phase 6",
// // //       img: "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=1200&q=80",
// // //       desc: "Known for its prime location and active oil palm plantation, Phase 6 attracted high-value buyers seeking both prestige and steady agricultural returns.",
// // //       soldOut: false,
// // //     },
// // //   ];

// // //   return (
// // //     <>
// // //       <style>{`
// // //         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

// // //         :root {
// // //           --cream: #f5f0e8;
// // //           --cream-dark: #ede6d6;
// // //           --forest: #1a2e1a;
// // //           --forest-mid: #2d4a2d;
// // //           --forest-light: #3d5c3d;
// // //           --gold: #c49a3c;
// // //           --gold-light: #e0b84a;
// // //           --text-dark: #1a1a1a;
// // //           --text-mid: #4a4a4a;
// // //           --text-light: #7a7a7a;
// // //         }

// // //         * { margin: 0; padding: 0; box-sizing: border-box; }

// // //         body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text-dark); }

// // //         .font-display { font-family: 'Playfair Display', serif; }

// // //         /* ── NAV ── */
// // //         .yara-nav {
// // //           position: fixed; top: 0; left: 0; right: 0; z-index: 100;
// // //           transition: all 0.4s ease;
// // //           padding: 1.5rem 0;
// // //         }
// // //         .yara-nav.scrolled {
// // //           background: rgba(245,240,232,0.97);
// // //           backdrop-filter: blur(12px);
// // //           padding: 1rem 0;
// // //           box-shadow: 0 2px 20px rgba(0,0,0,0.08);
// // //           border-bottom: 1px solid rgba(196,154,60,0.2);
// // //         }
// // //         .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; }
// // //         .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: var(--forest); text-decoration: none; }
// // //         .nav-logo span { color: var(--gold); }
// // //         .nav-links { display: flex; align-items: center; gap: 2.5rem; }
// // //         .nav-link { font-size: 0.85rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-dark); text-decoration: none; transition: color 0.2s; }
// // //         .nav-link:hover { color: var(--gold); }
// // //         .nav-cta { background: var(--forest); color: var(--cream) !important; padding: 0.65rem 1.5rem; font-size: 0.8rem !important; letter-spacing: 0.1em; transition: background 0.2s !important; }
// // //         .nav-cta:hover { background: var(--forest-light) !important; color: var(--cream) !important; }

// // //         /* ── HERO ── */
// // //         .hero {
// // //           min-height: 100vh;
// // //           background-image: url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=90');
// // //           background-size: cover;
// // //           background-position: center 30%;
// // //           position: relative;
// // //           display: flex; align-items: flex-end;
// // //           padding-bottom: 8rem;
// // //         }
// // //         .hero::before {
// // //           content: '';
// // //           position: absolute; inset: 0;
// // //           background: linear-gradient(
// // //             to bottom,
// // //             rgba(10,20,10,0.2) 0%,
// // //             rgba(10,20,10,0.1) 30%,
// // //             rgba(10,20,10,0.6) 70%,
// // //             rgba(10,20,10,0.85) 100%
// // //           );
// // //         }
// // //         .hero-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
// // //         .hero-tag { font-size: 0.8rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1rem; display: block; }
// // //         .hero-h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 700; color: #fff; line-height: 1.12; margin-bottom: 1.5rem; max-width: 700px; }
// // //         .hero-h1 em { font-style: italic; color: var(--gold-light); }
// // //         .hero-p { font-size: 1.05rem; color: rgba(255,255,255,0.8); max-width: 560px; line-height: 1.7; margin-bottom: 2.5rem; font-weight: 300; }
// // //         .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
// // //         .btn-primary {
// // //           background: var(--gold); color: var(--forest); font-weight: 600; font-size: 0.85rem;
// // //           letter-spacing: 0.1em; text-transform: uppercase; padding: 1rem 2.2rem;
// // //           border: none; cursor: pointer; text-decoration: none; transition: background 0.2s, transform 0.2s;
// // //           display: inline-block;
// // //         }
// // //         .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); }
// // //         .btn-outline {
// // //           background: transparent; color: #fff; font-weight: 500; font-size: 0.85rem;
// // //           letter-spacing: 0.08em; text-transform: uppercase; padding: 1rem 2.2rem;
// // //           border: 1px solid rgba(255,255,255,0.5); cursor: pointer; text-decoration: none;
// // //           transition: border-color 0.2s, background 0.2s; display: inline-block;
// // //         }
// // //         .btn-outline:hover { border-color: var(--gold-light); background: rgba(196,154,60,0.15); }

// // //         /* ── SECTION COMMONS ── */
// // //         .section { padding: 6rem 0; }
// // //         .section-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
// // //         .section-tag { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.75rem; }
// // //         .section-h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; color: var(--text-dark); line-height: 1.2; }
// // //         .section-h2 em { font-style: italic; color: var(--forest-mid); }
// // //         .section-sub { font-size: 1rem; color: var(--text-mid); line-height: 1.75; max-width: 600px; margin-top: 1rem; }
// // //         .divider { width: 60px; height: 3px; background: var(--gold); margin: 1.5rem 0; }

// // //         /* ── WHY INVEST ── */
// // //         .why-bg { background: var(--forest); }
// // //         .why-bg .section-h2 { color: var(--cream); }
// // //         .why-bg .section-tag { color: var(--gold-light); }
// // //         .why-bg .section-sub { color: rgba(245,240,232,0.7); }
// // //         .why-bg .divider { background: var(--gold-light); }
// // //         .reasons-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3rem; margin-top: 4rem; }
// // //         .reason-num { font-family: 'Playfair Display', serif; font-size: 3.5rem; font-weight: 900; color: rgba(196,154,60,0.25); line-height: 1; margin-bottom: 1rem; }
// // //         .reason-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 600; color: var(--cream); margin-bottom: 0.75rem; }
// // //         .reason-body { font-size: 0.9rem; color: rgba(245,240,232,0.65); line-height: 1.75; }
// // //         .reason-line { width: 40px; height: 2px; background: var(--gold); margin-bottom: 1rem; }

// // //         /* ── AGENT ── */
// // //         .agent-section { background: var(--cream-dark); }
// // //         .agent-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
// // //         .agent-img-wrap { position: relative; }
// // //         .agent-img {
// // //           width: 100%; aspect-ratio: 4/5; object-fit: cover; object-position: top;
// // //           filter: grayscale(10%);
// // //         }
// // //         .agent-img-frame {
// // //           position: absolute; bottom: -1.5rem; right: -1.5rem;
// // //           width: calc(100% - 2rem); height: calc(100% - 2rem);
// // //           border: 2px solid var(--gold); z-index: -1;
// // //         }
// // //         .agent-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3vw,2.8rem); font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem; }
// // //         .agent-role { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; }
// // //         .agent-body { font-size: 0.95rem; color: var(--text-mid); line-height: 1.85; }
// // //         .agent-body p { margin-bottom: 1.25rem; }

// // //         /* ── PHASES ── */
// // //         .phases-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; margin-top: 4rem; }
// // //         .phase-card { background: #fff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); transition: transform 0.3s, box-shadow 0.3s; }
// // //         .phase-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
// // //         .phase-img-wrap { position: relative; overflow: hidden; height: 220px; }
// // //         .phase-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
// // //         .phase-card:hover .phase-img { transform: scale(1.05); }
// // //         .sold-out-badge {
// // //           position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
// // //           background: rgba(10,20,10,0.35);
// // //         }
// // //         .sold-out-stamp {
// // //           border: 3px solid rgba(255,255,255,0.85); color: #fff;
// // //           font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700;
// // //           letter-spacing: 0.2em; text-transform: uppercase;
// // //           padding: 0.5rem 1.5rem;
// // //           transform: rotate(-8deg);
// // //           background: rgba(180,30,30,0.7);
// // //           text-shadow: 0 1px 3px rgba(0,0,0,0.4);
// // //         }
// // //         .phase-body { padding: 1.5rem; }
// // //         .phase-name { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.6rem; }
// // //         .phase-desc { font-size: 0.875rem; color: var(--text-mid); line-height: 1.7; }

// // //         /* ── STORY ── */
// // //         .story-section { background: #fff; }
// // //         .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
// // //         .story-video { position: relative; }
// // //         .story-video iframe { width: 100%; aspect-ratio: 16/9; border: none; }
// // //         .story-body p { font-size: 0.95rem; color: var(--text-mid); line-height: 1.85; margin-bottom: 1.25rem; }
// // //         .story-body em { font-style: italic; color: var(--forest-mid); font-weight: 500; }
// // //         .story-sign { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-style: italic; color: var(--forest); margin-top: 0.5rem; }

// // //         /* ── CTA BANNER ── */
// // //         .cta-banner {
// // //           background-image: url('https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=1920&q=80');
// // //           background-size: cover; background-position: center;
// // //           position: relative; text-align: center; padding: 7rem 2rem;
// // //         }
// // //         .cta-banner::before {
// // //           content: ''; position: absolute; inset: 0;
// // //           background: rgba(10,20,10,0.72);
// // //         }
// // //         .cta-banner-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
// // //         .cta-sup { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1rem; display: block; }
// // //         .cta-h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem,5vw,3.5rem); font-weight: 700; color: #fff; line-height: 1.15; margin-bottom: 1rem; }
// // //         .cta-sub { font-size: 1rem; color: rgba(255,255,255,0.75); margin-bottom: 2.5rem; line-height: 1.7; }

// // //         /* ── TESTIMONIALS ── */
// // //         .testimonials-section { background: var(--cream-dark); }
// // //         .testimonials-section .section-inner { text-align: center; }
// // //         .video-wrapper { max-width: 700px; margin: 3rem auto 0; background: var(--forest); padding: 0.5rem; }
// // //         .video-wrapper iframe { width: 100%; aspect-ratio: 16/9; border: none; display: block; }

// // //         /* ── FOOTER ── */
// // //         .footer { background: var(--forest); color: rgba(245,240,232,0.65); }
// // //         .footer-inner { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem 2rem; }
// // //         .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(245,240,232,0.1); }
// // //         .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: var(--cream); margin-bottom: 1rem; }
// // //         .footer-logo span { color: var(--gold-light); }
// // //         .footer-desc { font-size: 0.875rem; line-height: 1.75; }
// // //         .footer-col-title { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cream); margin-bottom: 1.25rem; }
// // //         .footer-link { display: block; font-size: 0.875rem; color: rgba(245,240,232,0.6); text-decoration: none; margin-bottom: 0.6rem; transition: color 0.2s; }
// // //         .footer-link:hover { color: var(--gold-light); }
// // //         .footer-contact-item { display: flex; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.875rem; align-items: flex-start; }
// // //         .footer-contact-icon { color: var(--gold-light); margin-top: 2px; flex-shrink: 0; }
// // //         .footer-bottom { padding-top: 1.5rem; text-align: center; font-size: 0.8rem; color: rgba(245,240,232,0.4); }

// // //         /* ── MODAL ── */
// // //         .modal-overlay {
// // //           position: fixed; inset: 0; z-index: 200;
// // //           background: rgba(0,0,0,0.65); display: flex; align-items: center; justify-content: center;
// // //           padding: 1rem;
// // //           animation: fadeIn 0.3s ease;
// // //         }
// // //         @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
// // //         .modal-box {
// // //           background: #fff; width: 100%; max-width: 520px;
// // //           padding: 3rem 2.5rem; position: relative;
// // //           animation: slideUp 0.35s ease;
// // //         }
// // //         @keyframes slideUp { from { transform: translateY(30px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
// // //         .modal-close {
// // //           position: absolute; top: 1rem; right: 1rem;
// // //           background: none; border: none; cursor: pointer;
// // //           font-size: 1.5rem; color: var(--text-light); line-height: 1;
// // //         }
// // //         .modal-logo { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; }
// // //         .modal-logo-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: var(--forest); }
// // //         .modal-logo-name span { color: var(--gold); }
// // //         .modal-h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.5rem; }
// // //         .modal-sub { font-size: 0.875rem; color: var(--text-mid); margin-bottom: 1.75rem; line-height: 1.6; }
// // //         .modal-form { display: flex; flex-direction: column; gap: 0.85rem; }
// // //         .modal-input {
// // //           padding: 0.85rem 1rem; border: 1px solid #ddd;
// // //           font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: var(--text-dark);
// // //           outline: none; transition: border-color 0.2s; background: var(--cream);
// // //         }
// // //         .modal-input:focus { border-color: var(--gold); }
// // //         .modal-btn {
// // //           background: var(--forest); color: var(--cream); border: none;
// // //           padding: 1rem; font-family: 'DM Sans', sans-serif; font-weight: 600;
// // //           font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase;
// // //           cursor: pointer; transition: background 0.2s; margin-top: 0.25rem;
// // //         }
// // //         .modal-btn:hover { background: var(--forest-light); }
// // //         .modal-btn:disabled { opacity: 0.7; cursor: not-allowed; }
// // //         .modal-skip { text-align: center; font-size: 0.8rem; color: var(--text-light); margin-top: 0.75rem; cursor: pointer; }
// // //         .modal-skip:hover { text-decoration: underline; }

// // //         /* ── MOBILE NAV ── */
// // //         .mobile-nav-overlay {
// // //           display: none;
// // //         }
// // //         .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
// // //         .hamburger span { display: block; width: 24px; height: 2px; background: var(--text-dark); transition: all 0.3s; }

// // //         /* ── RESPONSIVE ── */
// // //         @media (max-width: 1024px) {
// // //           .reasons-grid { grid-template-columns: 1fr 1fr; }
// // //           .phases-grid { grid-template-columns: repeat(2,1fr); }
// // //           .footer-grid { grid-template-columns: 1fr 1fr; }
// // //         }
// // //         @media (max-width: 768px) {
// // //           .nav-links { display: none; }
// // //           .hamburger { display: flex; }
// // //           .mobile-nav-overlay {
// // //             display: block;
// // //             position: fixed; inset: 0; background: var(--cream); z-index: 99;
// // //             padding: 6rem 2rem 2rem;
// // //             transform: translateX(100%);
// // //             transition: transform 0.3s ease;
// // //           }
// // //           .mobile-nav-overlay.open { transform: translateX(0); }
// // //           .mobile-nav-links { display: flex; flex-direction: column; gap: 1.5rem; }
// // //           .mobile-nav-link { font-size: 1.4rem; font-family: 'Playfair Display', serif; color: var(--text-dark); text-decoration: none; }
// // //           .agent-grid, .story-grid { grid-template-columns: 1fr; }
// // //           .agent-img-frame { display: none; }
// // //           .reasons-grid { grid-template-columns: 1fr; }
// // //           .phases-grid { grid-template-columns: 1fr; }
// // //           .footer-grid { grid-template-columns: 1fr; }
// // //           .hero-actions { flex-direction: column; }
// // //           .hero-actions a, .hero-actions button { text-align: center; }
// // //         }
// // //       `}</style>

// // //       {/* ── WEBINAR MODAL ── */}
// // //       {webinarOpen && (
// // //         <div
// // //           className="modal-overlay"
// // //           onClick={(e) => e.target === e.currentTarget && setWebinarOpen(false)}
// // //         >
// // //           <div className="modal-box">
// // //             <button
// // //               className="modal-close"
// // //               onClick={() => setWebinarOpen(false)}
// // //             >
// // //               ×
// // //             </button>
// // //             <div className="modal-logo">
// // //               <div className="modal-logo-name">
// // //                 <span>YARA</span> Group
// // //               </div>
// // //             </div>
// // //             <h3 className="modal-h3">
// // //               Free Webinar: Own a Profitable Plantation
// // //             </h3>
// // //             <p className="modal-sub">
// // //               Join our free webinar and learn the proven system for owning a
// // //               profitable oil palm plantation that generates passive income for
// // //               decades.
// // //             </p>
// // //             <form className="modal-form" onSubmit={handleWebinarSubmit}>
// // //               <input
// // //                 className="modal-input"
// // //                 placeholder="Enter your email address"
// // //                 type="email"
// // //                 required
// // //                 value={webinarForm.email}
// // //                 onChange={(e) =>
// // //                   setWebinarForm((p) => ({ ...p, email: e.target.value }))
// // //                 }
// // //               />
// // //               <input
// // //                 className="modal-input"
// // //                 placeholder="Phone Number"
// // //                 type="tel"
// // //                 required
// // //                 value={webinarForm.phone}
// // //                 onChange={(e) =>
// // //                   setWebinarForm((p) => ({ ...p, phone: e.target.value }))
// // //                 }
// // //               />
// // //               <input
// // //                 className="modal-input"
// // //                 placeholder="Your Name"
// // //                 type="text"
// // //                 required
// // //                 value={webinarForm.name}
// // //                 onChange={(e) =>
// // //                   setWebinarForm((p) => ({ ...p, name: e.target.value }))
// // //                 }
// // //               />
// // //               <input
// // //                 className="modal-input"
// // //                 placeholder="Would you be available for the webinar?"
// // //                 value={webinarForm.available}
// // //                 onChange={(e) =>
// // //                   setWebinarForm((p) => ({ ...p, available: e.target.value }))
// // //                 }
// // //               />
// // //               <button
// // //                 className="modal-btn"
// // //                 type="submit"
// // //                 disabled={submittingWebinar}
// // //               >
// // //                 {submittingWebinar ? "Signing up..." : "Sign Up"}
// // //               </button>
// // //             </form>
// // //             <p className="modal-skip" onClick={() => setWebinarOpen(false)}>
// // //               Thanks, I'm not interested
// // //             </p>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* ── INSPECTION MODAL ── */}
// // //       {inspectionOpen && (
// // //         <div
// // //           className="modal-overlay"
// // //           onClick={(e) =>
// // //             e.target === e.currentTarget && setInspectionOpen(false)
// // //           }
// // //         >
// // //           <div className="modal-box">
// // //             <button
// // //               className="modal-close"
// // //               onClick={() => setInspectionOpen(false)}
// // //             >
// // //               ×
// // //             </button>
// // //             <div className="modal-logo">
// // //               <div className="modal-logo-name">
// // //                 <span>YARA</span> Group
// // //               </div>
// // //             </div>
// // //             <h3 className="modal-h3">Book a Site Inspection</h3>
// // //             <p className="modal-sub">
// // //               See the land for yourself. Our team will walk you through the
// // //               plantation and answer every question you have.
// // //             </p>
// // //             <form className="modal-form" onSubmit={handleInspectionSubmit}>
// // //               <input
// // //                 className="modal-input"
// // //                 placeholder="Enter your email address"
// // //                 type="email"
// // //                 required
// // //                 value={inspectionForm.email}
// // //                 onChange={(e) =>
// // //                   setInspectionForm((p) => ({ ...p, email: e.target.value }))
// // //                 }
// // //               />
// // //               <input
// // //                 className="modal-input"
// // //                 placeholder="Your Name"
// // //                 type="text"
// // //                 required
// // //                 value={inspectionForm.name}
// // //                 onChange={(e) =>
// // //                   setInspectionForm((p) => ({ ...p, name: e.target.value }))
// // //                 }
// // //               />
// // //               <input
// // //                 className="modal-input"
// // //                 placeholder="Phone Number"
// // //                 type="tel"
// // //                 required
// // //                 value={inspectionForm.phone}
// // //                 onChange={(e) =>
// // //                   setInspectionForm((p) => ({ ...p, phone: e.target.value }))
// // //                 }
// // //               />
// // //               <input
// // //                 className="modal-input"
// // //                 placeholder="How did you hear about us?"
// // //                 value={inspectionForm.source}
// // //                 onChange={(e) =>
// // //                   setInspectionForm((p) => ({ ...p, source: e.target.value }))
// // //                 }
// // //               />
// // //               <button
// // //                 className="modal-btn"
// // //                 type="submit"
// // //                 disabled={submittingInspection}
// // //               >
// // //                 {submittingInspection ? "Booking..." : "Book Inspection"}
// // //               </button>
// // //             </form>
// // //             <p className="modal-skip" onClick={() => setInspectionOpen(false)}>
// // //               Thanks, I'm not interested
// // //             </p>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* ── NAV ── */}
// // //       <nav className={`yara-nav ${scrolled ? "scrolled" : ""}`}>
// // //         <div className="nav-inner">
// // //           <a href="#" className="nav-logo">
// // //             <span>YARA</span> Group
// // //           </a>
// // //           <div className="nav-links">
// // //             <a href="#why" className="nav-link">
// // //               Why Invest
// // //             </a>
// // //             <a href="#estates" className="nav-link">
// // //               Estates
// // //             </a>
// // //             <a href="#story" className="nav-link">
// // //               Our Story
// // //             </a>
// // //             <a href="#contact" className="nav-link">
// // //               Contact
// // //             </a>
// // //             <button
// // //               className="nav-link nav-cta"
// // //               onClick={() => setInspectionOpen(true)}
// // //             >
// // //               Book Inspection
// // //             </button>
// // //           </div>
// // //           <button
// // //             className="hamburger"
// // //             onClick={() => setMenuOpen(!menuOpen)}
// // //             aria-label="Menu"
// // //           >
// // //             <span />
// // //             <span />
// // //             <span />
// // //           </button>
// // //         </div>
// // //       </nav>

// // //       {/* Mobile Nav */}
// // //       <div className={`mobile-nav-overlay ${menuOpen ? "open" : ""}`}>
// // //         <div className="mobile-nav-links">
// // //           <a
// // //             href="#why"
// // //             className="mobile-nav-link"
// // //             onClick={() => setMenuOpen(false)}
// // //           >
// // //             Why Invest
// // //           </a>
// // //           <a
// // //             href="#estates"
// // //             className="mobile-nav-link"
// // //             onClick={() => setMenuOpen(false)}
// // //           >
// // //             Estates
// // //           </a>
// // //           <a
// // //             href="#story"
// // //             className="mobile-nav-link"
// // //             onClick={() => setMenuOpen(false)}
// // //           >
// // //             Our Story
// // //           </a>
// // //           <a
// // //             href="#contact"
// // //             className="mobile-nav-link"
// // //             onClick={() => setMenuOpen(false)}
// // //           >
// // //             Contact
// // //           </a>
// // //           <button
// // //             className="btn-primary"
// // //             style={{ border: "none" }}
// // //             onClick={() => {
// // //               setMenuOpen(false);
// // //               setInspectionOpen(true);
// // //             }}
// // //           >
// // //             Book Inspection
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* ── HERO ── */}
// // //       <section className="hero" id="home">
// // //         <div className="hero-content">
// // //           <span className="hero-tag">YARA Group · Agriculture Division</span>
// // //           <h1 className="hero-h1">
// // //             Build sustainable income with <em>oil palm</em> plantations
// // //           </h1>
// // //           <p className="hero-p">
// // //             A strategic avenue for building long-term wealth through an
// // //             agricultural asset class known for consistent global demand,
// // //             dependable yield cycles, and inflation-resistant returns —
// // //             positioning investors for steady cash flow and sustainable portfolio
// // //             growth.
// // //           </p>
// // //           <div className="hero-actions">
// // //             <button
// // //               className="btn-primary"
// // //               onClick={() => setInspectionOpen(true)}
// // //             >
// // //               Book Inspection
// // //             </button>
// // //             <a href="#estates" className="btn-outline">
// // //               Explore Estates
// // //             </a>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* ── WHY INVEST ── */}
// // //       <section className="section why-bg" id="why">
// // //         <div className="section-inner">
// // //           <span className="section-tag">Why Oil Palm?</span>
// // //           <h2 className="section-h2" style={{ color: "var(--cream)" }}>
// // //             A crop that works for you,
// // //             <br />
// // //             <em style={{ color: "var(--gold-light)" }}>year after year</em>
// // //           </h2>
// // //           <div className="divider" />
// // //           <div className="reasons-grid">
// // //             {[
// // //               {
// // //                 num: "01",
// // //                 title: "Strong and Predictable Cash Flow",
// // //                 body: "Oil palm produces harvests every year for decades, creating a dependable revenue stream that strengthens long-term financial planning.",
// // //               },
// // //               {
// // //                 num: "02",
// // //                 title: "High-Demand Commodity With Global Market Stability",
// // //                 body: "As a versatile product used across food, cosmetics, and energy industries, oil palm maintains steady international demand, reducing volatility and supporting sustainable price growth.",
// // //               },
// // //               {
// // //                 num: "03",
// // //                 title: "Inflation-Resistant Agricultural Asset",
// // //                 body: "Because its value is tied to essential consumer markets, oil palm consistently outperforms inflation over time, helping investors protect and grow their capital efficiently.",
// // //               },
// // //             ].map((r) => (
// // //               <div key={r.num}>
// // //                 <div className="reason-num">{r.num}</div>
// // //                 <div className="reason-line" />
// // //                 <div className="reason-title">{r.title}</div>
// // //                 <div className="reason-body">{r.body}</div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* ── AGENT ── */}
// // //       <section className="section agent-section">
// // //         <div className="section-inner">
// // //           <div className="agent-grid">
// // //             <div className="agent-img-wrap">
// // //               <img
// // //                 src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=800&q=80"
// // //                 alt="Our Consultant"
// // //                 className="agent-img"
// // //               />
// // //               <div className="agent-img-frame" />
// // //             </div>
// // //             <div>
// // //               <span className="section-tag">Meet the Expert</span>
// // //               <h2 className="agent-title">Your Investment Partner</h2>
// // //               <p className="agent-role">
// // //                 Professional Agro Real Estate Consultant
// // //               </p>
// // //               <div className="divider" />
// // //               <div className="agent-body">
// // //                 <p>
// // //                   Our lead consultant is a dedicated agro real estate
// // //                   professional committed to helping individuals and families
// // //                   build lasting wealth through strategic agricultural
// // //                   investments. With a strong understanding of both farmland
// // //                   value and long-term agribusiness potential, she guides clients
// // //                   toward opportunities that offer stability, passive income, and
// // //                   sustainable growth.
// // //                 </p>
// // //                 <p>
// // //                   Known for transparency, patience, and hands-on support, she
// // //                   simplifies the investment journey — from property discovery to
// // //                   documentation and after-sales guidance. Her goal is not just
// // //                   to sell land, but to empower clients with assets that
// // //                   appreciate, generate consistent returns, and contribute to
// // //                   generational prosperity.
// // //                 </p>
// // //                 <p>
// // //                   With YARA Group, clients don't just acquire land — they secure
// // //                   a future built on value, growth, and long-term opportunity.
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* ── ESTATES / PHASES ── */}
// // //       <section
// // //         className="section"
// // //         id="estates"
// // //         style={{ background: "var(--cream)" }}
// // //       >
// // //         <div className="section-inner">
// // //           <div
// // //             style={{
// // //               textAlign: "center",
// // //               maxWidth: 700,
// // //               margin: "0 auto 1rem",
// // //             }}
// // //           >
// // //             <span className="section-tag">Our Portfolio</span>
// // //             <h2 className="section-h2">
// // //               Explore All Our <em>Estates</em>
// // //             </h2>
// // //             <div className="divider" style={{ margin: "1.5rem auto" }} />
// // //             <p className="section-sub" style={{ margin: "0 auto" }}>
// // //               Palmrich is more than a land investment — it's a foundation for
// // //               generational wealth. Built to grow in value, it offers you the
// // //               opportunity to earn passive income, build lasting assets, and
// // //               secure a financial legacy that stands the test of time.
// // //             </p>
// // //           </div>
// // //           <div className="phases-grid">
// // //             {phases.map((phase) => (
// // //               <div className="phase-card" key={phase.name}>
// // //                 <div className="phase-img-wrap">
// // //                   <img src={phase.img} alt={phase.name} className="phase-img" />
// // //                   {phase.soldOut && (
// // //                     <div className="sold-out-badge">
// // //                       <div className="sold-out-stamp">Sold Out</div>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //                 <div className="phase-body">
// // //                   <div className="phase-name">{phase.name}</div>
// // //                   <div className="phase-desc">{phase.desc}</div>
// // //                   {!phase.soldOut && (
// // //                     <button
// // //                       className="btn-primary"
// // //                       style={{
// // //                         marginTop: "1rem",
// // //                         fontSize: "0.78rem",
// // //                         padding: "0.65rem 1.25rem",
// // //                       }}
// // //                       onClick={() => setInspectionOpen(true)}
// // //                     >
// // //                       Book Inspection →
// // //                     </button>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* ── STORY ── */}
// // //       <section className="section story-section" id="story">
// // //         <div className="section-inner">
// // //           <div className="story-grid">
// // //             <div>
// // //               <span className="section-tag">Who We Are</span>
// // //               <h2 className="section-h2">
// // //                 The <em>Palmrich</em> Story
// // //               </h2>
// // //               <div className="divider" />
// // //               <div className="story-body">
// // //                 <p>
// // //                   Palmrich began with a simple but powerful vision: to transform
// // //                   ordinary land into extraordinary long-term value. In a world
// // //                   where investments rise and fall overnight, Palmrich set out to
// // //                   create something different — an asset that grows steadily,
// // //                   pays consistently, and endures across generations.
// // //                 </p>
// // //                 <p>
// // //                   Built on fertile soil and backed by a team committed to
// // //                   transparency and real agricultural development, Palmrich
// // //                   Estate became more than just farmland. It evolved into a
// // //                   strategic wealth-building platform for everyday investors
// // //                   seeking stability, passive income, and meaningful legacy.
// // //                 </p>
// // //                 <p>
// // //                   Investors didn't just buy land — they secured a future. With
// // //                   clear processes, honest documentation, and reliable support,
// // //                   Palmrich earned the trust of families, professionals, and
// // //                   visionaries who wanted an asset that would stand the test of
// // //                   time.
// // //                 </p>
// // //                 <p>
// // //                   Today, Palmrich is known as a dependable gateway to{" "}
// // //                   <em>transgenerational wealth</em>, powered by a crop with
// // //                   consistent global demand and designed to appreciate year after
// // //                   year.
// // //                 </p>
// // //                 <p className="story-sign">
// // //                   Palmrich isn't just an estate. It's a story of prosperity that
// // //                   keeps growing.
// // //                 </p>
// // //               </div>
// // //             </div>
// // //             <div className="story-video">
// // //               <iframe
// // //                 src="https://www.youtube.com/embed/dQw4w9WgXcQ"
// // //                 title="YARA Group Story"
// // //                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// // //                 allowFullScreen
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* ── CTA BANNER ── */}
// // //       <section className="cta-banner">
// // //         <div className="cta-banner-inner">
// // //           <span className="cta-sup">Get Started With YARA Group</span>
// // //           <h2 className="cta-h2">Own An Oil Palm Plantation Today</h2>
// // //           <p className="cta-sub">
// // //             Discover how YARA Group helps you own a sustainable asset that pays
// // //             for decades. Get a quick overview of our solutions, features, and
// // //             how to get started.
// // //           </p>
// // //           <button className="btn-primary" onClick={() => setWebinarOpen(true)}>
// // //             Download Brochure
// // //           </button>
// // //         </div>
// // //       </section>

// // //       {/* ── TESTIMONIALS ── */}
// // //       <section className="section testimonials-section">
// // //         <div className="section-inner">
// // //           <span className="section-tag">Social Proof</span>
// // //           <h2 className="section-h2">Testimonials</h2>
// // //           <div className="video-wrapper">
// // //             <iframe
// // //               src="https://www.youtube.com/embed/dQw4w9WgXcQ"
// // //               title="Palmrich Testimonial"
// // //               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// // //               allowFullScreen
// // //             />
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* ── FOOTER ── */}
// // //       <footer className="footer" id="contact">
// // //         <div className="footer-inner">
// // //           <div className="footer-grid">
// // //             <div>
// // //               <div className="footer-logo">
// // //                 <span>YARA</span> Group
// // //               </div>
// // //               <p className="footer-desc">
// // //                 Whether you're buying, selling, or investing, real estate can be
// // //                 complex. That's why we provide expert advice, strategic
// // //                 direction, and personalized care — ensuring your goals are not
// // //                 only accomplished but surpassed with ease and profitability.
// // //               </p>
// // //             </div>
// // //             <div>
// // //               <div className="footer-col-title">About Us</div>
// // //               <a href="#" className="footer-link">
// // //                 About Organisation
// // //               </a>
// // //               <a href="#" className="footer-link">
// // //                 Our Journeys
// // //               </a>
// // //               <a href="#" className="footer-link">
// // //                 Our Partners
// // //               </a>
// // //             </div>
// // //             <div>
// // //               <div className="footer-col-title">Quick Links</div>
// // //               <a href="#" className="footer-link">
// // //                 Introduction
// // //               </a>
// // //               <a href="#" className="footer-link">
// // //                 Organisation Team
// // //               </a>
// // //               <a href="#" className="footer-link">
// // //                 Press Enquiries
// // //               </a>
// // //               <div className="footer-col-title" style={{ marginTop: "1.5rem" }}>
// // //                 Important Links
// // //               </div>
// // //               <a href="#" className="footer-link">
// // //                 Privacy Policy
// // //               </a>
// // //               <a href="#" className="footer-link">
// // //                 Terms & Conditions
// // //               </a>
// // //             </div>
// // //             <div>
// // //               <div className="footer-col-title">Contact Info</div>
// // //               <div className="footer-contact-item">
// // //                 <span className="footer-contact-icon">📍</span>
// // //                 <span>Lagos, Nigeria</span>
// // //               </div>
// // //               <div className="footer-contact-item">
// // //                 <span className="footer-contact-icon">📞</span>
// // //                 <a
// // //                   href="tel:+2348000000000"
// // //                   className="footer-link"
// // //                   style={{ margin: 0 }}
// // //                 >
// // //                   +234 800 YARA GROUP
// // //                 </a>
// // //               </div>
// // //               <div className="footer-contact-item">
// // //                 <span className="footer-contact-icon">✉️</span>
// // //                 <a
// // //                   href="mailto:info@yaragroup.ng"
// // //                   className="footer-link"
// // //                   style={{ margin: 0 }}
// // //                 >
// // //                   info@yaragroup.ng
// // //                 </a>
// // //               </div>
// // //             </div>
// // //           </div>
// // //           <div className="footer-bottom">
// // //             © 2025 YARA Group. All rights reserved.
// // //           </div>
// // //         </div>
// // //       </footer>
// // //     </>
// // //   );
// // // };

// // // export default YaraHome;

// // import React, { useState, useEffect, useRef } from "react";
// // import { Link } from "react-router-dom";
// // import { useMutateData, useFetchData } from "../hook/Request";

// // /* ─────────────────────────────────────────────
// //    YARA GROUP – Agriculture-first landing page
// //    Inspired by medwwidehome.com.ng
// //    Aesthetic: Organic / Natural / Editorial
// //    Colors: Deep forest green, warm cream, gold
// // ───────────────────────────────────────────── */

// // const YaraHome = () => {
// //   const [webinarOpen, setWebinarOpen] = useState(false);
// //   const [inspectionOpen, setInspectionOpen] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);
// //   const [menuOpen, setMenuOpen] = useState(false);

// //   // Webinar form state
// //   const [webinarForm, setWebinarForm] = useState({
// //     email: "",
// //     phone: "",
// //     name: "",
// //     available: "",
// //   });
// //   const [inspectionForm, setInspectionForm] = useState({
// //     email: "",
// //     phone: "",
// //     name: "",
// //     source: "",
// //   });

// //   // Mutations
// //   const { mutate: submitWebinar, isLoading: submittingWebinar } =
// //     useMutateData("webinar");
// //   const { mutate: submitInspection, isLoading: submittingInspection } =
// //     useMutateData("inspection");

// //   // Fetch active properties
// //   const { data: propertiesData, isLoading: loadingProperties } = useFetchData(
// //     "/Property",
// //     "activeProperties",
// //   );
// //   const properties = propertiesData?.data?.properties || [];

// //   useEffect(() => {
// //     const handleScroll = () => setScrolled(window.scrollY > 60);
// //     window.addEventListener("scroll", handleScroll);
// //     // Auto-open webinar modal after 3s
// //     const timer = setTimeout(() => setWebinarOpen(true), 3000);
// //     return () => {
// //       window.removeEventListener("scroll", handleScroll);
// //       clearTimeout(timer);
// //     };
// //   }, []);

// //   const handleWebinarSubmit = (e) => {
// //     e.preventDefault();
// //     submitWebinar(
// //       { url: "/webinar-signup", data: webinarForm },
// //       {
// //         onSuccess: () => {
// //           alert("You're registered! We'll send you the webinar link.");
// //           setWebinarOpen(false);
// //         },
// //         onError: (err) => alert(err?.message || "Failed. Please try again."),
// //       },
// //     );
// //   };

// //   const handleInspectionSubmit = (e) => {
// //     e.preventDefault();
// //     submitInspection(
// //       { url: "/inspection", data: inspectionForm },
// //       {
// //         onSuccess: () => {
// //           alert("Inspection booked! We'll be in touch within 24 hours.");
// //           setInspectionOpen(false);
// //         },
// //         onError: (err) => alert(err?.message || "Failed. Please try again."),
// //       },
// //     );
// //   };

// //   // Sold-out phases (static content matching the reference)
// //   const phases = [
// //     {
// //       name: "Palmrich Phase 1",
// //       img: "https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?w=800&q=80",
// //       desc: "Our very first development, Phase 1 laid the foundation — prime oil palm land, fully verified, and high-value appreciation. It sold out quickly and set the tone for future phases.",
// //       soldOut: true,
// //     },
// //     {
// //       name: "Palmrich Phase 2",
// //       img: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
// //       desc: "Phase 2 attracted early land owners who recognized opportunity early. With great access roads and a thriving palm canopy already established, it became a hotspot for savvy investors.",
// //       soldOut: true,
// //     },
// //     {
// //       name: "Palmrich Phase 3",
// //       img: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80",
// //       desc: "Tucked slightly off the main road, Phase 3 offered a perfect mix of privacy and value. Mature oil palms already in harvest cycle appealed to clients seeking immediate returns.",
// //       soldOut: true,
// //     },
// //     {
// //       name: "Palmrich Phase 4",
// //       img: "https://images.unsplash.com/photo-1589923188651-268a9765e432?w=800&q=80",
// //       desc: "This phase offered enhanced infrastructure and was our first to introduce perimeter fencing and estate layout design. Investors rushed in, and it sold out in record time after launch.",
// //       soldOut: true,
// //     },
// //     {
// //       name: "Palmrich Phase 5",
// //       img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80",
// //       desc: "Located in Ibadan, this phase features a thriving agro palm plantation already fruiting — the perfect blend of land ownership and immediate agricultural returns in a fast-growing city.",
// //       soldOut: false,
// //     },
// //     {
// //       name: "Palmrich Phase 6",
// //       img: "https://images.unsplash.com/photo-1598030473216-1e7e9e14d8d6?w=800&q=80",
// //       desc: "Known for its prime location and active oil palm plantation already bearing fruit, Phase 6 attracts high-value buyers seeking both prestige and steady agricultural returns.",
// //       soldOut: false,
// //     },
// //   ];

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

// //         :root {
// //           --cream: #f5f0e8;
// //           --cream-dark: #ede6d6;
// //           --forest: #1a2e1a;
// //           --forest-mid: #2d4a2d;
// //           --forest-light: #3d5c3d;
// //           --gold: #c49a3c;
// //           --gold-light: #e0b84a;
// //           --text-dark: #1a1a1a;
// //           --text-mid: #4a4a4a;
// //           --text-light: #7a7a7a;
// //         }

// //         * { margin: 0; padding: 0; box-sizing: border-box; }

// //         body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text-dark); }

// //         .font-display { font-family: 'Playfair Display', serif; }

// //         /* ── NAV ── */
// //         .yara-nav {
// //           position: fixed; top: 0; left: 0; right: 0; z-index: 100;
// //           transition: all 0.4s ease;
// //           padding: 1.5rem 0;
// //         }
// //         .yara-nav.scrolled {
// //           background: rgba(245,240,232,0.97);
// //           backdrop-filter: blur(12px);
// //           padding: 1rem 0;
// //           box-shadow: 0 2px 20px rgba(0,0,0,0.08);
// //           border-bottom: 1px solid rgba(196,154,60,0.2);
// //         }
// //         .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; }
// //         .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: var(--forest); text-decoration: none; }
// //         .nav-logo span { color: var(--gold); }
// //         .nav-links { display: flex; align-items: center; gap: 2.5rem; }
// //         .nav-link { font-size: 0.85rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-dark); text-decoration: none; transition: color 0.2s; }
// //         .nav-link:hover { color: var(--gold); }
// //         .nav-cta { background: var(--forest); color: var(--cream) !important; padding: 0.65rem 1.5rem; font-size: 0.8rem !important; letter-spacing: 0.1em; transition: background 0.2s !important; }
// //         .nav-cta:hover { background: var(--forest-light) !important; color: var(--cream) !important; }

// //         /* ── HERO ── */
// //         .hero {
// //           min-height: 100vh;
// //           background-image: url('https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?w=1920&q=90');
// //           background-size: cover;
// //           background-position: center 30%;
// //           position: relative;
// //           display: flex; align-items: flex-end;
// //           padding-bottom: 8rem;
// //         }
// //         .hero::before {
// //           content: '';
// //           position: absolute; inset: 0;
// //           background: linear-gradient(
// //             to bottom,
// //             rgba(10,20,10,0.2) 0%,
// //             rgba(10,20,10,0.1) 30%,
// //             rgba(10,20,10,0.6) 70%,
// //             rgba(10,20,10,0.85) 100%
// //           );
// //         }
// //         .hero-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
// //         .hero-tag { font-size: 0.8rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1rem; display: block; }
// //         .hero-h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 700; color: #fff; line-height: 1.12; margin-bottom: 1.5rem; max-width: 700px; }
// //         .hero-h1 em { font-style: italic; color: var(--gold-light); }
// //         .hero-p { font-size: 1.05rem; color: rgba(255,255,255,0.8); max-width: 560px; line-height: 1.7; margin-bottom: 2.5rem; font-weight: 300; }
// //         .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
// //         .btn-primary {
// //           background: var(--gold); color: var(--forest); font-weight: 600; font-size: 0.85rem;
// //           letter-spacing: 0.1em; text-transform: uppercase; padding: 1rem 2.2rem;
// //           border: none; cursor: pointer; text-decoration: none; transition: background 0.2s, transform 0.2s;
// //           display: inline-block;
// //         }
// //         .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); }
// //         .btn-outline {
// //           background: transparent; color: #fff; font-weight: 500; font-size: 0.85rem;
// //           letter-spacing: 0.08em; text-transform: uppercase; padding: 1rem 2.2rem;
// //           border: 1px solid rgba(255,255,255,0.5); cursor: pointer; text-decoration: none;
// //           transition: border-color 0.2s, background 0.2s; display: inline-block;
// //         }
// //         .btn-outline:hover { border-color: var(--gold-light); background: rgba(196,154,60,0.15); }

// //         /* ── SECTION COMMONS ── */
// //         .section { padding: 6rem 0; }
// //         .section-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
// //         .section-tag { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.75rem; }
// //         .section-h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; color: var(--text-dark); line-height: 1.2; }
// //         .section-h2 em { font-style: italic; color: var(--forest-mid); }
// //         .section-sub { font-size: 1rem; color: var(--text-mid); line-height: 1.75; max-width: 600px; margin-top: 1rem; }
// //         .divider { width: 60px; height: 3px; background: var(--gold); margin: 1.5rem 0; }

// //         /* ── WHY INVEST ── */
// //         .why-bg { background: var(--forest); }
// //         .why-bg .section-h2 { color: var(--cream); }
// //         .why-bg .section-tag { color: var(--gold-light); }
// //         .why-bg .section-sub { color: rgba(245,240,232,0.7); }
// //         .why-bg .divider { background: var(--gold-light); }
// //         .reasons-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3rem; margin-top: 4rem; }
// //         .reason-num { font-family: 'Playfair Display', serif; font-size: 3.5rem; font-weight: 900; color: rgba(196,154,60,0.25); line-height: 1; margin-bottom: 1rem; }
// //         .reason-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 600; color: var(--cream); margin-bottom: 0.75rem; }
// //         .reason-body { font-size: 0.9rem; color: rgba(245,240,232,0.65); line-height: 1.75; }
// //         .reason-line { width: 40px; height: 2px; background: var(--gold); margin-bottom: 1rem; }

// //         /* ── AGENT ── */
// //         .agent-section { background: var(--cream-dark); }
// //         .agent-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
// //         .agent-img-wrap { position: relative; }
// //         .agent-img {
// //           width: 100%; aspect-ratio: 4/5; object-fit: cover; object-position: top;
// //           filter: grayscale(10%);
// //         }
// //         .agent-img-frame {
// //           position: absolute; bottom: -1.5rem; right: -1.5rem;
// //           width: calc(100% - 2rem); height: calc(100% - 2rem);
// //           border: 2px solid var(--gold); z-index: -1;
// //         }
// //         .agent-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3vw,2.8rem); font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem; }
// //         .agent-role { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; }
// //         .agent-body { font-size: 0.95rem; color: var(--text-mid); line-height: 1.85; }
// //         .agent-body p { margin-bottom: 1.25rem; }

// //         /* ── PHASES ── */
// //         .phases-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; margin-top: 4rem; }
// //         .phase-card { background: #fff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); transition: transform 0.3s, box-shadow 0.3s; }
// //         .phase-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
// //         .phase-img-wrap { position: relative; overflow: hidden; height: 220px; }
// //         .phase-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
// //         .phase-card:hover .phase-img { transform: scale(1.05); }
// //         .sold-out-badge {
// //           position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
// //           background: rgba(10,20,10,0.35);
// //         }
// //         .sold-out-stamp {
// //           border: 3px solid rgba(255,255,255,0.85); color: #fff;
// //           font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700;
// //           letter-spacing: 0.2em; text-transform: uppercase;
// //           padding: 0.5rem 1.5rem;
// //           transform: rotate(-8deg);
// //           background: rgba(180,30,30,0.7);
// //           text-shadow: 0 1px 3px rgba(0,0,0,0.4);
// //         }
// //         .phase-body { padding: 1.5rem; }
// //         .phase-name { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.6rem; }
// //         .phase-desc { font-size: 0.875rem; color: var(--text-mid); line-height: 1.7; }

// //         /* ── STORY ── */
// //         .story-section { background: #fff; }
// //         .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
// //         .story-video { position: relative; }
// //         .story-video iframe { width: 100%; aspect-ratio: 16/9; border: none; }
// //         .story-body p { font-size: 0.95rem; color: var(--text-mid); line-height: 1.85; margin-bottom: 1.25rem; }
// //         .story-body em { font-style: italic; color: var(--forest-mid); font-weight: 500; }
// //         .story-sign { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-style: italic; color: var(--forest); margin-top: 0.5rem; }

// //         /* ── CTA BANNER ── */
// //         .cta-banner {
// //           background-image: url('https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1920&q=80');
// //           background-size: cover; background-position: center;
// //           position: relative; text-align: center; padding: 7rem 2rem;
// //         }
// //         .cta-banner::before {
// //           content: ''; position: absolute; inset: 0;
// //           background: rgba(10,20,10,0.72);
// //         }
// //         .cta-banner-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
// //         .cta-sup { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1rem; display: block; }
// //         .cta-h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem,5vw,3.5rem); font-weight: 700; color: #fff; line-height: 1.15; margin-bottom: 1rem; }
// //         .cta-sub { font-size: 1rem; color: rgba(255,255,255,0.75); margin-bottom: 2.5rem; line-height: 1.7; }

// //         /* ── TESTIMONIALS ── */
// //         .testimonials-section { background: var(--cream-dark); }
// //         .testimonials-section .section-inner { text-align: center; }
// //         .video-wrapper { max-width: 700px; margin: 3rem auto 0; background: var(--forest); padding: 0.5rem; }
// //         .video-wrapper iframe { width: 100%; aspect-ratio: 16/9; border: none; display: block; }

// //         /* ── FOOTER ── */
// //         .footer { background: var(--forest); color: rgba(245,240,232,0.65); }
// //         .footer-inner { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem 2rem; }
// //         .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(245,240,232,0.1); }
// //         .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: var(--cream); margin-bottom: 1rem; }
// //         .footer-logo span { color: var(--gold-light); }
// //         .footer-desc { font-size: 0.875rem; line-height: 1.75; }
// //         .footer-col-title { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cream); margin-bottom: 1.25rem; }
// //         .footer-link { display: block; font-size: 0.875rem; color: rgba(245,240,232,0.6); text-decoration: none; margin-bottom: 0.6rem; transition: color 0.2s; }
// //         .footer-link:hover { color: var(--gold-light); }
// //         .footer-contact-item { display: flex; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.875rem; align-items: flex-start; }
// //         .footer-contact-icon { color: var(--gold-light); margin-top: 2px; flex-shrink: 0; }
// //         .footer-bottom { padding-top: 1.5rem; text-align: center; font-size: 0.8rem; color: rgba(245,240,232,0.4); }

// //         /* ── MODAL ── */
// //         .modal-overlay {
// //           position: fixed; inset: 0; z-index: 200;
// //           background: rgba(0,0,0,0.65); display: flex; align-items: center; justify-content: center;
// //           padding: 1rem;
// //           animation: fadeIn 0.3s ease;
// //         }
// //         @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
// //         .modal-box {
// //           background: #fff; width: 100%; max-width: 520px;
// //           padding: 3rem 2.5rem; position: relative;
// //           animation: slideUp 0.35s ease;
// //         }
// //         @keyframes slideUp { from { transform: translateY(30px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
// //         .modal-close {
// //           position: absolute; top: 1rem; right: 1rem;
// //           background: none; border: none; cursor: pointer;
// //           font-size: 1.5rem; color: var(--text-light); line-height: 1;
// //         }
// //         .modal-logo { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; }
// //         .modal-logo-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: var(--forest); }
// //         .modal-logo-name span { color: var(--gold); }
// //         .modal-h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.5rem; }
// //         .modal-sub { font-size: 0.875rem; color: var(--text-mid); margin-bottom: 1.75rem; line-height: 1.6; }
// //         .modal-form { display: flex; flex-direction: column; gap: 0.85rem; }
// //         .modal-input {
// //           padding: 0.85rem 1rem; border: 1px solid #ddd;
// //           font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: var(--text-dark);
// //           outline: none; transition: border-color 0.2s; background: var(--cream);
// //         }
// //         .modal-input:focus { border-color: var(--gold); }
// //         .modal-btn {
// //           background: var(--forest); color: var(--cream); border: none;
// //           padding: 1rem; font-family: 'DM Sans', sans-serif; font-weight: 600;
// //           font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase;
// //           cursor: pointer; transition: background 0.2s; margin-top: 0.25rem;
// //         }
// //         .modal-btn:hover { background: var(--forest-light); }
// //         .modal-btn:disabled { opacity: 0.7; cursor: not-allowed; }
// //         .modal-skip { text-align: center; font-size: 0.8rem; color: var(--text-light); margin-top: 0.75rem; cursor: pointer; }
// //         .modal-skip:hover { text-decoration: underline; }

// //         /* ── MOBILE NAV ── */
// //         .mobile-nav-overlay {
// //           display: none;
// //         }
// //         .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
// //         .hamburger span { display: block; width: 24px; height: 2px; background: var(--text-dark); transition: all 0.3s; }

// //         /* ── RESPONSIVE ── */
// //         @media (max-width: 1024px) {
// //           .reasons-grid { grid-template-columns: 1fr 1fr; }
// //           .phases-grid { grid-template-columns: repeat(2,1fr); }
// //           .footer-grid { grid-template-columns: 1fr 1fr; }
// //         }
// //         @media (max-width: 768px) {
// //           .nav-links { display: none; }
// //           .hamburger { display: flex; }
// //           .mobile-nav-overlay {
// //             display: block;
// //             position: fixed; inset: 0; background: var(--cream); z-index: 99;
// //             padding: 6rem 2rem 2rem;
// //             transform: translateX(100%);
// //             transition: transform 0.3s ease;
// //           }
// //           .mobile-nav-overlay.open { transform: translateX(0); }
// //           .mobile-nav-links { display: flex; flex-direction: column; gap: 1.5rem; }
// //           .mobile-nav-link { font-size: 1.4rem; font-family: 'Playfair Display', serif; color: var(--text-dark); text-decoration: none; }
// //           .agent-grid, .story-grid { grid-template-columns: 1fr; }
// //           .agent-img-frame { display: none; }
// //           .reasons-grid { grid-template-columns: 1fr; }
// //           .phases-grid { grid-template-columns: 1fr; }
// //           .footer-grid { grid-template-columns: 1fr; }
// //           .hero-actions { flex-direction: column; }
// //           .hero-actions a, .hero-actions button { text-align: center; }
// //           [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
// //         }
// //       `}</style>

// //       {/* ── WEBINAR MODAL ── */}
// //       {webinarOpen && (
// //         <div
// //           className="modal-overlay"
// //           onClick={(e) => e.target === e.currentTarget && setWebinarOpen(false)}
// //         >
// //           <div className="modal-box">
// //             <button
// //               className="modal-close"
// //               onClick={() => setWebinarOpen(false)}
// //             >
// //               ×
// //             </button>
// //             <div className="modal-logo">
// //               <div className="modal-logo-name">
// //                 <span>YARA</span> Group
// //               </div>
// //             </div>
// //             <h3 className="modal-h3">
// //               Free Webinar: Own a Profitable Plantation
// //             </h3>
// //             <p className="modal-sub">
// //               Join our free webinar and learn the proven system for owning a
// //               profitable oil palm plantation that generates passive income for
// //               decades.
// //             </p>
// //             <form className="modal-form" onSubmit={handleWebinarSubmit}>
// //               <input
// //                 className="modal-input"
// //                 placeholder="Enter your email address"
// //                 type="email"
// //                 required
// //                 value={webinarForm.email}
// //                 onChange={(e) =>
// //                   setWebinarForm((p) => ({ ...p, email: e.target.value }))
// //                 }
// //               />
// //               <input
// //                 className="modal-input"
// //                 placeholder="Phone Number"
// //                 type="tel"
// //                 required
// //                 value={webinarForm.phone}
// //                 onChange={(e) =>
// //                   setWebinarForm((p) => ({ ...p, phone: e.target.value }))
// //                 }
// //               />
// //               <input
// //                 className="modal-input"
// //                 placeholder="Your Name"
// //                 type="text"
// //                 required
// //                 value={webinarForm.name}
// //                 onChange={(e) =>
// //                   setWebinarForm((p) => ({ ...p, name: e.target.value }))
// //                 }
// //               />
// //               <input
// //                 className="modal-input"
// //                 placeholder="Would you be available for the webinar?"
// //                 value={webinarForm.available}
// //                 onChange={(e) =>
// //                   setWebinarForm((p) => ({ ...p, available: e.target.value }))
// //                 }
// //               />
// //               <button
// //                 className="modal-btn"
// //                 type="submit"
// //                 disabled={submittingWebinar}
// //               >
// //                 {submittingWebinar ? "Signing up..." : "Sign Up"}
// //               </button>
// //             </form>
// //             <p className="modal-skip" onClick={() => setWebinarOpen(false)}>
// //               Thanks, I'm not interested
// //             </p>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── INSPECTION MODAL ── */}
// //       {inspectionOpen && (
// //         <div
// //           className="modal-overlay"
// //           onClick={(e) =>
// //             e.target === e.currentTarget && setInspectionOpen(false)
// //           }
// //         >
// //           <div className="modal-box">
// //             <button
// //               className="modal-close"
// //               onClick={() => setInspectionOpen(false)}
// //             >
// //               ×
// //             </button>
// //             <div className="modal-logo">
// //               <div className="modal-logo-name">
// //                 <span>YARA</span> Group
// //               </div>
// //             </div>
// //             <h3 className="modal-h3">Book a Site Inspection</h3>
// //             <p className="modal-sub">
// //               See the land for yourself. Our team will walk you through the
// //               plantation and answer every question you have.
// //             </p>
// //             <form className="modal-form" onSubmit={handleInspectionSubmit}>
// //               <input
// //                 className="modal-input"
// //                 placeholder="Enter your email address"
// //                 type="email"
// //                 required
// //                 value={inspectionForm.email}
// //                 onChange={(e) =>
// //                   setInspectionForm((p) => ({ ...p, email: e.target.value }))
// //                 }
// //               />
// //               <input
// //                 className="modal-input"
// //                 placeholder="Your Name"
// //                 type="text"
// //                 required
// //                 value={inspectionForm.name}
// //                 onChange={(e) =>
// //                   setInspectionForm((p) => ({ ...p, name: e.target.value }))
// //                 }
// //               />
// //               <input
// //                 className="modal-input"
// //                 placeholder="Phone Number"
// //                 type="tel"
// //                 required
// //                 value={inspectionForm.phone}
// //                 onChange={(e) =>
// //                   setInspectionForm((p) => ({ ...p, phone: e.target.value }))
// //                 }
// //               />
// //               <input
// //                 className="modal-input"
// //                 placeholder="How did you hear about us?"
// //                 value={inspectionForm.source}
// //                 onChange={(e) =>
// //                   setInspectionForm((p) => ({ ...p, source: e.target.value }))
// //                 }
// //               />
// //               <button
// //                 className="modal-btn"
// //                 type="submit"
// //                 disabled={submittingInspection}
// //               >
// //                 {submittingInspection ? "Booking..." : "Book Inspection"}
// //               </button>
// //             </form>
// //             <p className="modal-skip" onClick={() => setInspectionOpen(false)}>
// //               Thanks, I'm not interested
// //             </p>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── NAV ── */}
// //       <nav className={`yara-nav ${scrolled ? "scrolled" : ""}`}>
// //         <div className="nav-inner">
// //           <a href="#" className="nav-logo">
// //             <span>YARA</span> Group
// //           </a>
// //           <div className="nav-links">
// //             <a href="#why" className="nav-link">
// //               Why Invest
// //             </a>
// //             <a href="#estates" className="nav-link">
// //               Estates
// //             </a>
// //             <a href="#story" className="nav-link">
// //               Our Story
// //             </a>
// //             <a href="#contact" className="nav-link">
// //               Contact
// //             </a>
// //             <button
// //               className="nav-link nav-cta"
// //               onClick={() => setInspectionOpen(true)}
// //             >
// //               Book Inspection
// //             </button>
// //           </div>
// //           <button
// //             className="hamburger"
// //             onClick={() => setMenuOpen(!menuOpen)}
// //             aria-label="Menu"
// //           >
// //             <span />
// //             <span />
// //             <span />
// //           </button>
// //         </div>
// //       </nav>

// //       {/* Mobile Nav */}
// //       <div className={`mobile-nav-overlay ${menuOpen ? "open" : ""}`}>
// //         <div className="mobile-nav-links">
// //           <a
// //             href="#why"
// //             className="mobile-nav-link"
// //             onClick={() => setMenuOpen(false)}
// //           >
// //             Why Invest
// //           </a>
// //           <a
// //             href="#estates"
// //             className="mobile-nav-link"
// //             onClick={() => setMenuOpen(false)}
// //           >
// //             Estates
// //           </a>
// //           <a
// //             href="#story"
// //             className="mobile-nav-link"
// //             onClick={() => setMenuOpen(false)}
// //           >
// //             Our Story
// //           </a>
// //           <a
// //             href="#contact"
// //             className="mobile-nav-link"
// //             onClick={() => setMenuOpen(false)}
// //           >
// //             Contact
// //           </a>
// //           <button
// //             className="btn-primary"
// //             style={{ border: "none" }}
// //             onClick={() => {
// //               setMenuOpen(false);
// //               setInspectionOpen(true);
// //             }}
// //           >
// //             Book Inspection
// //           </button>
// //         </div>
// //       </div>

// //       {/* ── HERO ── */}
// //       <section className="hero" id="home">
// //         <div className="hero-content">
// //           <span className="hero-tag">YARA Group · Agriculture Division</span>
// //           <h1 className="hero-h1">
// //             Build sustainable income with <em>oil palm</em> plantations
// //           </h1>
// //           <p className="hero-p">
// //             Nigeria's most reliable agricultural investment. Oil palm produces
// //             harvests every single year for 25+ years — delivering consistent
// //             passive income, land appreciation, and a legacy that outlasts you.
// //           </p>
// //           <div className="hero-actions">
// //             <button
// //               className="btn-primary"
// //               onClick={() => setInspectionOpen(true)}
// //             >
// //               Book Inspection
// //             </button>
// //             <a href="#estates" className="btn-outline">
// //               Explore Estates
// //             </a>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── STATS STRIP ── */}
// //       <section style={{ background: "var(--forest-mid)", padding: "2.5rem 0" }}>
// //         <div className="section-inner">
// //           <div
// //             style={{
// //               display: "grid",
// //               gridTemplateColumns: "repeat(4,1fr)",
// //               gap: "1rem",
// //               textAlign: "center",
// //             }}
// //           >
// //             {[
// //               { num: "25+", label: "Years of Annual Harvest" },
// //               { num: "₦180B+", label: "Palm Oil Market Value in Nigeria" },
// //               { num: "3×", label: "Faster Growth Than Inflation" },
// //               { num: "6 Phases", label: "Of Palmrich — 4 Already Sold Out" },
// //             ].map((s) => (
// //               <div
// //                 key={s.num}
// //                 style={{
// //                   borderRight: "1px solid rgba(245,240,232,0.1)",
// //                   padding: "0 1rem",
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     fontFamily: "'Playfair Display',serif",
// //                     fontSize: "clamp(1.6rem,3vw,2.4rem)",
// //                     fontWeight: 700,
// //                     color: "var(--gold-light)",
// //                     marginBottom: "0.3rem",
// //                   }}
// //                 >
// //                   {s.num}
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "0.78rem",
// //                     color: "rgba(245,240,232,0.65)",
// //                     letterSpacing: "0.05em",
// //                     textTransform: "uppercase",
// //                   }}
// //                 >
// //                   {s.label}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── WHY INVEST ── */}
// //       <section className="section why-bg" id="why">
// //         <div className="section-inner">
// //           <span className="section-tag">Why Oil Palm?</span>
// //           <h2 className="section-h2" style={{ color: "var(--cream)" }}>
// //             A crop that works for you,
// //             <br />
// //             <em style={{ color: "var(--gold-light)" }}>year after year</em>
// //           </h2>
// //           <div className="divider" />
// //           <div className="reasons-grid">
// //             {[
// //               {
// //                 num: "01",
// //                 title: "Strong and Predictable Cash Flow",
// //                 body: "Oil palm produces harvests every year for decades, creating a dependable revenue stream that strengthens long-term financial planning.",
// //               },
// //               {
// //                 num: "02",
// //                 title: "High-Demand Commodity With Global Market Stability",
// //                 body: "As a versatile product used across food, cosmetics, and energy industries, oil palm maintains steady international demand, reducing volatility and supporting sustainable price growth.",
// //               },
// //               {
// //                 num: "03",
// //                 title: "Inflation-Resistant Agricultural Asset",
// //                 body: "Because its value is tied to essential consumer markets, oil palm consistently outperforms inflation over time, helping investors protect and grow their capital efficiently.",
// //               },
// //             ].map((r) => (
// //               <div key={r.num}>
// //                 <div className="reason-num">{r.num}</div>
// //                 <div className="reason-line" />
// //                 <div className="reason-title">{r.title}</div>
// //                 <div className="reason-body">{r.body}</div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── AGENT ── */}
// //       <section className="section agent-section">
// //         <div className="section-inner">
// //           <div className="agent-grid">
// //             <div className="agent-img-wrap">
// //               <img
// //                 src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=800&q=80"
// //                 alt="Our Consultant"
// //                 className="agent-img"
// //               />
// //               <div className="agent-img-frame" />
// //             </div>
// //             <div>
// //               <span className="section-tag">Meet the Expert</span>
// //               <h2 className="agent-title">Your Investment Partner</h2>
// //               <p className="agent-role">
// //                 Professional Agro Real Estate Consultant
// //               </p>
// //               <div className="divider" />
// //               <div className="agent-body">
// //                 <p>
// //                   Our lead consultant is a dedicated agro real estate
// //                   professional committed to helping individuals and families
// //                   build lasting wealth through strategic agricultural
// //                   investments. With a strong understanding of both farmland
// //                   value and long-term agribusiness potential, she guides clients
// //                   toward opportunities that offer stability, passive income, and
// //                   sustainable growth.
// //                 </p>
// //                 <p>
// //                   Known for transparency, patience, and hands-on support, she
// //                   simplifies the investment journey — from property discovery to
// //                   documentation and after-sales guidance. Her goal is not just
// //                   to sell land, but to empower clients with assets that
// //                   appreciate, generate consistent returns, and contribute to
// //                   generational prosperity.
// //                 </p>
// //                 <p>
// //                   With YARA Group, clients don't just acquire land — they secure
// //                   a future built on value, growth, and long-term opportunity.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── HOW IT WORKS ── */}
// //       <section style={{ background: "var(--cream)", padding: "5rem 0" }}>
// //         <div className="section-inner">
// //           <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
// //             <span className="section-tag">Simple Process</span>
// //             <h2 className="section-h2">
// //               From Investment to <em>Harvest</em>
// //             </h2>
// //             <div className="divider" style={{ margin: "1.5rem auto" }} />
// //           </div>
// //           <div
// //             style={{
// //               display: "grid",
// //               gridTemplateColumns: "repeat(4,1fr)",
// //               gap: "0",
// //               position: "relative",
// //             }}
// //           >
// //             {[
// //               {
// //                 step: "01",
// //                 icon: "🌱",
// //                 title: "Choose Your Plot",
// //                 body: "Select a plot size that fits your budget. Plots start from affordable entry points with clear documentation.",
// //               },
// //               {
// //                 step: "02",
// //                 icon: "📄",
// //                 title: "Get Your Title",
// //                 body: "Receive your Certificate of Occupancy and full legal documentation within weeks of purchase.",
// //               },
// //               {
// //                 step: "03",
// //                 icon: "🌴",
// //                 title: "We Manage Everything",
// //                 body: "YARA Group's agri-team plants, maintains, and manages your oil palms — completely hands-free for you.",
// //               },
// //               {
// //                 step: "04",
// //                 icon: "💰",
// //                 title: "Receive Harvest Income",
// //                 body: "From year 3 onward, your palms produce bunches of oil palm fruit twice a year, generating consistent passive income.",
// //               },
// //             ].map((item, i) => (
// //               <div
// //                 key={item.step}
// //                 style={{
// //                   padding: "2rem 1.5rem",
// //                   borderLeft: i > 0 ? "1px solid var(--cream-dark)" : "none",
// //                   position: "relative",
// //                 }}
// //               >
// //                 {i < 3 && (
// //                   <div
// //                     style={{
// //                       position: "absolute",
// //                       top: "2.5rem",
// //                       right: 0,
// //                       width: 24,
// //                       height: 24,
// //                       background: "var(--gold)",
// //                       borderRadius: "50%",
// //                       zIndex: 2,
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center",
// //                       fontSize: "0.6rem",
// //                       color: "var(--forest)",
// //                       fontWeight: 700,
// //                     }}
// //                   >
// //                     →
// //                   </div>
// //                 )}
// //                 <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
// //                   {item.icon}
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontFamily: "'Playfair Display',serif",
// //                     fontSize: "0.7rem",
// //                     fontWeight: 700,
// //                     letterSpacing: "0.2em",
// //                     color: "var(--gold)",
// //                     marginBottom: "0.5rem",
// //                   }}
// //                 >
// //                   {item.step}
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontFamily: "'Playfair Display',serif",
// //                     fontSize: "1.05rem",
// //                     fontWeight: 600,
// //                     color: "var(--text-dark)",
// //                     marginBottom: "0.75rem",
// //                   }}
// //                 >
// //                   {item.title}
// //                 </div>
// //                 <div
// //                   style={{
// //                     fontSize: "0.875rem",
// //                     color: "var(--text-mid)",
// //                     lineHeight: 1.75,
// //                   }}
// //                 >
// //                   {item.body}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── ESTATES / PHASES ── */}
// //       <section
// //         className="section"
// //         id="estates"
// //         style={{ background: "var(--cream)" }}
// //       >
// //         <div className="section-inner">
// //           <div
// //             style={{
// //               textAlign: "center",
// //               maxWidth: 700,
// //               margin: "0 auto 1rem",
// //             }}
// //           >
// //             <span className="section-tag">Our Portfolio</span>
// //             <h2 className="section-h2">
// //               Explore All Our <em>Estates</em>
// //             </h2>
// //             <div className="divider" style={{ margin: "1.5rem auto" }} />
// //             <p className="section-sub" style={{ margin: "0 auto" }}>
// //               Palmrich is more than a land investment — it's a foundation for
// //               generational wealth. Built to grow in value, it offers you the
// //               opportunity to earn passive income, build lasting assets, and
// //               secure a financial legacy that stands the test of time.
// //             </p>
// //           </div>
// //           <div className="phases-grid">
// //             {phases.map((phase) => (
// //               <div className="phase-card" key={phase.name}>
// //                 <div className="phase-img-wrap">
// //                   <img src={phase.img} alt={phase.name} className="phase-img" />
// //                   {phase.soldOut && (
// //                     <div className="sold-out-badge">
// //                       <div className="sold-out-stamp">Sold Out</div>
// //                     </div>
// //                   )}
// //                 </div>
// //                 <div className="phase-body">
// //                   <div className="phase-name">{phase.name}</div>
// //                   <div className="phase-desc">{phase.desc}</div>
// //                   {!phase.soldOut && (
// //                     <button
// //                       className="btn-primary"
// //                       style={{
// //                         marginTop: "1rem",
// //                         fontSize: "0.78rem",
// //                         padding: "0.65rem 1.25rem",
// //                       }}
// //                       onClick={() => setInspectionOpen(true)}
// //                     >
// //                       Book Inspection →
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── STORY ── */}
// //       <section className="section story-section" id="story">
// //         <div className="section-inner">
// //           <div className="story-grid">
// //             <div>
// //               <span className="section-tag">Who We Are</span>
// //               <h2 className="section-h2">
// //                 The <em>Palmrich</em> Story
// //               </h2>
// //               <div className="divider" />
// //               <div className="story-body">
// //                 <p>
// //                   Palmrich began with a simple but powerful vision: to transform
// //                   ordinary land into extraordinary long-term value. In a world
// //                   where investments rise and fall overnight, Palmrich set out to
// //                   create something different — an asset that grows steadily,
// //                   pays consistently, and endures across generations.
// //                 </p>
// //                 <p>
// //                   Built on fertile soil and backed by a team committed to
// //                   transparency and real agricultural development, Palmrich
// //                   Estate became more than just farmland. It evolved into a
// //                   strategic wealth-building platform for everyday investors
// //                   seeking stability, passive income, and meaningful legacy.
// //                 </p>
// //                 <p>
// //                   Investors didn't just buy land — they secured a future. With
// //                   clear processes, honest documentation, and reliable support,
// //                   Palmrich earned the trust of families, professionals, and
// //                   visionaries who wanted an asset that would stand the test of
// //                   time.
// //                 </p>
// //                 <p>
// //                   Today, Palmrich is known as a dependable gateway to{" "}
// //                   <em>transgenerational wealth</em>, powered by a crop with
// //                   consistent global demand and designed to appreciate year after
// //                   year.
// //                 </p>
// //                 <p className="story-sign">
// //                   Palmrich isn't just an estate. It's a story of prosperity that
// //                   keeps growing.
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="story-video">
// //               <iframe
// //                 src="https://www.youtube.com/embed/dQw4w9WgXcQ"
// //                 title="YARA Group Story"
// //                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //                 allowFullScreen
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── CTA BANNER ── */}
// //       <section className="cta-banner">
// //         <div className="cta-banner-inner">
// //           <span className="cta-sup">Get Started With YARA Group</span>
// //           <h2 className="cta-h2">Own An Oil Palm Plantation Today</h2>
// //           <p className="cta-sub">
// //             Discover how YARA Group helps you own a sustainable asset that pays
// //             for decades. Get a quick overview of our solutions, features, and
// //             how to get started.
// //           </p>
// //           <button className="btn-primary" onClick={() => setWebinarOpen(true)}>
// //             Download Brochure
// //           </button>
// //         </div>
// //       </section>

// //       {/* ── TESTIMONIALS ── */}
// //       <section className="section testimonials-section">
// //         <div className="section-inner">
// //           <span className="section-tag">Social Proof</span>
// //           <h2 className="section-h2">Testimonials</h2>
// //           <div className="video-wrapper">
// //             <iframe
// //               src="https://www.youtube.com/embed/dQw4w9WgXcQ"
// //               title="Palmrich Testimonial"
// //               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //               allowFullScreen
// //             />
// //           </div>
// //         </div>
// //       </section>

// //       {/* ── FOOTER ── */}
// //       <footer className="footer" id="contact">
// //         <div className="footer-inner">
// //           <div className="footer-grid">
// //             <div>
// //               <div className="footer-logo">
// //                 <span>YARA</span> Group
// //               </div>
// //               <p className="footer-desc">
// //                 Whether you're buying, selling, or investing, real estate can be
// //                 complex. That's why we provide expert advice, strategic
// //                 direction, and personalized care — ensuring your goals are not
// //                 only accomplished but surpassed with ease and profitability.
// //               </p>
// //             </div>
// //             <div>
// //               <div className="footer-col-title">About Us</div>
// //               <a href="#" className="footer-link">
// //                 About Organisation
// //               </a>
// //               <a href="#" className="footer-link">
// //                 Our Journeys
// //               </a>
// //               <a href="#" className="footer-link">
// //                 Our Partners
// //               </a>
// //             </div>
// //             <div>
// //               <div className="footer-col-title">Quick Links</div>
// //               <a href="#" className="footer-link">
// //                 Introduction
// //               </a>
// //               <a href="#" className="footer-link">
// //                 Organisation Team
// //               </a>
// //               <a href="#" className="footer-link">
// //                 Press Enquiries
// //               </a>
// //               <div className="footer-col-title" style={{ marginTop: "1.5rem" }}>
// //                 Important Links
// //               </div>
// //               <a href="#" className="footer-link">
// //                 Privacy Policy
// //               </a>
// //               <a href="#" className="footer-link">
// //                 Terms & Conditions
// //               </a>
// //             </div>
// //             <div>
// //               <div className="footer-col-title">Contact Info</div>
// //               <div className="footer-contact-item">
// //                 <span className="footer-contact-icon">📍</span>
// //                 <span>Lagos, Nigeria</span>
// //               </div>
// //               <div className="footer-contact-item">
// //                 <span className="footer-contact-icon">📞</span>
// //                 <a
// //                   href="tel:+2348000000000"
// //                   className="footer-link"
// //                   style={{ margin: 0 }}
// //                 >
// //                   +234 800 YARA GROUP
// //                 </a>
// //               </div>
// //               <div className="footer-contact-item">
// //                 <span className="footer-contact-icon">✉️</span>
// //                 <a
// //                   href="mailto:info@yaragroup.ng"
// //                   className="footer-link"
// //                   style={{ margin: 0 }}
// //                 >
// //                   info@yaragroup.ng
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="footer-bottom">
// //             © 2025 YARA Group. All rights reserved.
// //           </div>
// //         </div>
// //       </footer>
// //     </>
// //   );
// // };

// // export default YaraHome;

// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { useMutateData, useFetchData } from "../hook/Request";

// /* ─────────────────────────────────────────────
//    YARA GROUP – Agriculture-first landing page
//    Inspired by medwwidehome.com.ng
//    Aesthetic: Organic / Natural / Editorial
//    Colors: Deep forest green, warm cream, gold
// ───────────────────────────────────────────── */

// const YaraHome = () => {
//   const [webinarOpen, setWebinarOpen] = useState(false);
//   const [inspectionOpen, setInspectionOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Webinar form state
//   const [webinarForm, setWebinarForm] = useState({
//     email: "",
//     phone: "",
//     name: "",
//     available: "",
//   });
//   const [inspectionForm, setInspectionForm] = useState({
//     email: "",
//     phone: "",
//     name: "",
//     source: "",
//   });

//   // Mutations
//   const { mutate: submitWebinar, isLoading: submittingWebinar } =
//     useMutateData("webinar");
//   const { mutate: submitInspection, isLoading: submittingInspection } =
//     useMutateData("inspection");

//   // Fetch active properties
//   const { data: propertiesData, isLoading: loadingProperties } = useFetchData(
//     "/Property",
//     "activeProperties",
//   );
//   const properties = propertiesData?.data?.properties || [];

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", handleScroll);
//     // Auto-open webinar modal after 3s
//     const timer = setTimeout(() => setWebinarOpen(true), 3000);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       clearTimeout(timer);
//     };
//   }, []);

//   const handleWebinarSubmit = (e) => {
//     e.preventDefault();
//     submitWebinar(
//       { url: "/webinar-signup", data: webinarForm },
//       {
//         onSuccess: () => {
//           alert("You're registered! We'll send you the webinar link.");
//           setWebinarOpen(false);
//         },
//         onError: (err) => alert(err?.message || "Failed. Please try again."),
//       },
//     );
//   };

//   const handleInspectionSubmit = (e) => {
//     e.preventDefault();
//     submitInspection(
//       { url: "/inspection", data: inspectionForm },
//       {
//         onSuccess: () => {
//           alert("Inspection booked! We'll be in touch within 24 hours.");
//           setInspectionOpen(false);
//         },
//         onError: (err) => alert(err?.message || "Failed. Please try again."),
//       },
//     );
//   };

//   // Sold-out phases (static content matching the reference)
//   const phases = [
//     {
//       name: "Palmrich Phase 1",
//       img: "https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?w=800&q=80",
//       desc: "Our very first development, Phase 1 laid the foundation — prime oil palm land, fully verified, and high-value appreciation. It sold out quickly and set the tone for future phases.",
//       soldOut: true,
//     },
//     {
//       name: "Palmrich Phase 2",
//       img: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
//       desc: "Phase 2 attracted early land owners who recognized opportunity early. With great access roads and a thriving palm canopy already established, it became a hotspot for savvy investors.",
//       soldOut: true,
//     },
//     {
//       name: "Palmrich Phase 3",
//       img: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80",
//       desc: "Tucked slightly off the main road, Phase 3 offered a perfect mix of privacy and value. Mature oil palms already in harvest cycle appealed to clients seeking immediate returns.",
//       soldOut: true,
//     },
//     {
//       name: "Palmrich Phase 4",
//       img: "https://images.unsplash.com/photo-1589923188651-268a9765e432?w=800&q=80",
//       desc: "This phase offered enhanced infrastructure and was our first to introduce perimeter fencing and estate layout design. Investors rushed in, and it sold out in record time after launch.",
//       soldOut: true,
//     },
//     {
//       name: "Palmrich Phase 5",
//       img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80",
//       desc: "Located in Ibadan, this phase features a thriving agro palm plantation already fruiting — the perfect blend of land ownership and immediate agricultural returns in a fast-growing city.",
//       soldOut: false,
//     },
//     {
//       name: "Palmrich Phase 6",
//       img: "https://images.unsplash.com/photo-1598030473216-1e7e9e14d8d6?w=800&q=80",
//       desc: "Known for its prime location and active oil palm plantation already bearing fruit, Phase 6 attracts high-value buyers seeking both prestige and steady agricultural returns.",
//       soldOut: false,
//     },
//   ];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

//         :root {
//           --cream: #f5f0e8;
//           --cream-dark: #ede6d6;
//           --forest: #1a2e1a;
//           --forest-mid: #2d4a2d;
//           --forest-light: #3d5c3d;
//           --gold: #c49a3c;
//           --gold-light: #e0b84a;
//           --text-dark: #1a1a1a;
//           --text-mid: #4a4a4a;
//           --text-light: #7a7a7a;
//         }

//         * { margin: 0; padding: 0; box-sizing: border-box; }

//         body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text-dark); }

//         .font-display { font-family: 'Playfair Display', serif; }

//         /* ── NAV ── */
//         .yara-nav {
//           position: fixed; top: 0; left: 0; right: 0; z-index: 100;
//           transition: all 0.4s ease;
//           padding: 1.5rem 0;
//         }
//         .yara-nav.scrolled {
//           background: rgba(245,240,232,0.97);
//           backdrop-filter: blur(12px);
//           padding: 1rem 0;
//           box-shadow: 0 2px 20px rgba(0,0,0,0.08);
//           border-bottom: 1px solid rgba(196,154,60,0.2);
//         }
//         .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; }
//         .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: var(--forest); text-decoration: none; }
//         .nav-logo span { color: var(--gold); }
//         .nav-links { display: flex; align-items: center; gap: 2.5rem; }
//         .nav-link { font-size: 0.85rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-dark); text-decoration: none; transition: color 0.2s; }
//         .nav-link:hover { color: var(--gold); }
//         .nav-cta { background: var(--forest); color: var(--cream) !important; padding: 0.65rem 1.5rem; font-size: 0.8rem !important; letter-spacing: 0.1em; transition: background 0.2s !important; }
//         .nav-cta:hover { background: var(--forest-light) !important; color: var(--cream) !important; }

//         /* ── HERO ── */
//         .hero {
//           min-height: 100vh;
//           background-image: url('https://images.unsplash.com/photo-1598030304671-5aa1d6f21128?w=1920&q=90');
//           background-size: cover;
//           background-position: center 30%;
//           position: relative;
//           display: flex; align-items: flex-end;
//           padding-bottom: 8rem;
//         }
//         .hero::before {
//           content: '';
//           position: absolute; inset: 0;
//           background: linear-gradient(
//             to bottom,
//             rgba(10,20,10,0.2) 0%,
//             rgba(10,20,10,0.1) 30%,
//             rgba(10,20,10,0.6) 70%,
//             rgba(10,20,10,0.85) 100%
//           );
//         }
//         .hero-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
//         .hero-tag { font-size: 0.8rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1rem; display: block; }
//         .hero-h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 700; color: #fff; line-height: 1.12; margin-bottom: 1.5rem; max-width: 700px; }
//         .hero-h1 em { font-style: italic; color: var(--gold-light); }
//         .hero-p { font-size: 1.05rem; color: rgba(255,255,255,0.8); max-width: 560px; line-height: 1.7; margin-bottom: 2.5rem; font-weight: 300; }
//         .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
//         .btn-primary {
//           background: var(--gold); color: var(--forest); font-weight: 600; font-size: 0.85rem;
//           letter-spacing: 0.1em; text-transform: uppercase; padding: 1rem 2.2rem;
//           border: none; cursor: pointer; text-decoration: none; transition: background 0.2s, transform 0.2s;
//           display: inline-block;
//         }
//         .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); }
//         .btn-outline {
//           background: transparent; color: #fff; font-weight: 500; font-size: 0.85rem;
//           letter-spacing: 0.08em; text-transform: uppercase; padding: 1rem 2.2rem;
//           border: 1px solid rgba(255,255,255,0.5); cursor: pointer; text-decoration: none;
//           transition: border-color 0.2s, background 0.2s; display: inline-block;
//         }
//         .btn-outline:hover { border-color: var(--gold-light); background: rgba(196,154,60,0.15); }

//         /* ── SECTION COMMONS ── */
//         .section { padding: 6rem 0; }
//         .section-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
//         .section-tag { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.75rem; }
//         .section-h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; color: var(--text-dark); line-height: 1.2; }
//         .section-h2 em { font-style: italic; color: var(--forest-mid); }
//         .section-sub { font-size: 1rem; color: var(--text-mid); line-height: 1.75; max-width: 600px; margin-top: 1rem; }
//         .divider { width: 60px; height: 3px; background: var(--gold); margin: 1.5rem 0; }

//         /* ── WHY INVEST ── */
//         .why-bg { background: var(--forest); }
//         .why-bg .section-h2 { color: var(--cream); }
//         .why-bg .section-tag { color: var(--gold-light); }
//         .why-bg .section-sub { color: rgba(245,240,232,0.7); }
//         .why-bg .divider { background: var(--gold-light); }
//         .reasons-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3rem; margin-top: 4rem; }
//         .reason-num { font-family: 'Playfair Display', serif; font-size: 3.5rem; font-weight: 900; color: rgba(196,154,60,0.25); line-height: 1; margin-bottom: 1rem; }
//         .reason-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 600; color: var(--cream); margin-bottom: 0.75rem; }
//         .reason-body { font-size: 0.9rem; color: rgba(245,240,232,0.65); line-height: 1.75; }
//         .reason-line { width: 40px; height: 2px; background: var(--gold); margin-bottom: 1rem; }

//         /* ── AGENT ── */
//         .agent-section { background: var(--cream-dark); }
//         .agent-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
//         .agent-img-wrap { position: relative; }
//         .agent-img {
//           width: 100%; aspect-ratio: 4/5; object-fit: cover; object-position: top;
//           filter: grayscale(10%);
//         }
//         .agent-img-frame {
//           position: absolute; bottom: -1.5rem; right: -1.5rem;
//           width: calc(100% - 2rem); height: calc(100% - 2rem);
//           border: 2px solid var(--gold); z-index: -1;
//         }
//         .agent-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3vw,2.8rem); font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem; }
//         .agent-role { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; }
//         .agent-body { font-size: 0.95rem; color: var(--text-mid); line-height: 1.85; }
//         .agent-body p { margin-bottom: 1.25rem; }

//         /* ── PHASES ── */
//         .phases-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; margin-top: 4rem; }
//         .phase-card { background: #fff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); transition: transform 0.3s, box-shadow 0.3s; }
//         .phase-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
//         .phase-img-wrap { position: relative; overflow: hidden; height: 220px; }
//         .phase-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
//         .phase-card:hover .phase-img { transform: scale(1.05); }
//         .sold-out-badge {
//           position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
//           background: rgba(10,20,10,0.35);
//         }
//         .sold-out-stamp {
//           border: 3px solid rgba(255,255,255,0.85); color: #fff;
//           font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700;
//           letter-spacing: 0.2em; text-transform: uppercase;
//           padding: 0.5rem 1.5rem;
//           transform: rotate(-8deg);
//           background: rgba(180,30,30,0.7);
//           text-shadow: 0 1px 3px rgba(0,0,0,0.4);
//         }
//         .phase-body { padding: 1.5rem; }
//         .phase-name { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.6rem; }
//         .phase-desc { font-size: 0.875rem; color: var(--text-mid); line-height: 1.7; }

//         /* ── STORY ── */
//         .story-section { background: #fff; }
//         .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
//         .story-video { position: relative; }
//         .story-video iframe { width: 100%; aspect-ratio: 16/9; border: none; }
//         .story-body p { font-size: 0.95rem; color: var(--text-mid); line-height: 1.85; margin-bottom: 1.25rem; }
//         .story-body em { font-style: italic; color: var(--forest-mid); font-weight: 500; }
//         .story-sign { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-style: italic; color: var(--forest); margin-top: 0.5rem; }

//         /* ── CTA BANNER ── */
//         .cta-banner {
//           background-image: url('https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1920&q=80');
//           background-size: cover; background-position: center;
//           position: relative; text-align: center; padding: 7rem 2rem;
//         }
//         .cta-banner::before {
//           content: ''; position: absolute; inset: 0;
//           background: rgba(10,20,10,0.72);
//         }
//         .cta-banner-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
//         .cta-sup { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1rem; display: block; }
//         .cta-h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem,5vw,3.5rem); font-weight: 700; color: #fff; line-height: 1.15; margin-bottom: 1rem; }
//         .cta-sub { font-size: 1rem; color: rgba(255,255,255,0.75); margin-bottom: 2.5rem; line-height: 1.7; }

//         /* ── TESTIMONIALS ── */
//         .testimonials-section { background: var(--cream-dark); }
//         .testimonials-section .section-inner { text-align: center; }
//         .video-wrapper { max-width: 700px; margin: 3rem auto 0; background: var(--forest); padding: 0.5rem; }
//         .video-wrapper iframe { width: 100%; aspect-ratio: 16/9; border: none; display: block; }

//         /* ── FOOTER ── */
//         .footer { background: var(--forest); color: rgba(245,240,232,0.65); }
//         .footer-inner { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem 2rem; }
//         .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(245,240,232,0.1); }
//         .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: var(--cream); margin-bottom: 1rem; }
//         .footer-logo span { color: var(--gold-light); }
//         .footer-desc { font-size: 0.875rem; line-height: 1.75; }
//         .footer-col-title { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cream); margin-bottom: 1.25rem; }
//         .footer-link { display: block; font-size: 0.875rem; color: rgba(245,240,232,0.6); text-decoration: none; margin-bottom: 0.6rem; transition: color 0.2s; }
//         .footer-link:hover { color: var(--gold-light); }
//         .footer-contact-item { display: flex; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.875rem; align-items: flex-start; }
//         .footer-contact-icon { color: var(--gold-light); margin-top: 2px; flex-shrink: 0; }
//         .footer-bottom { padding-top: 1.5rem; text-align: center; font-size: 0.8rem; color: rgba(245,240,232,0.4); }

//         /* ── MODAL ── */
//         .modal-overlay {
//           position: fixed; inset: 0; z-index: 200;
//           background: rgba(0,0,0,0.65); display: flex; align-items: center; justify-content: center;
//           padding: 1rem;
//           animation: fadeIn 0.3s ease;
//         }
//         @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
//         .modal-box {
//           background: #fff; width: 100%; max-width: 520px;
//           padding: 3rem 2.5rem; position: relative;
//           animation: slideUp 0.35s ease;
//         }
//         @keyframes slideUp { from { transform: translateY(30px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
//         .modal-close {
//           position: absolute; top: 1rem; right: 1rem;
//           background: none; border: none; cursor: pointer;
//           font-size: 1.5rem; color: var(--text-light); line-height: 1;
//         }
//         .modal-logo { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; }
//         .modal-logo-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: var(--forest); }
//         .modal-logo-name span { color: var(--gold); }
//         .modal-h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.5rem; }
//         .modal-sub { font-size: 0.875rem; color: var(--text-mid); margin-bottom: 1.75rem; line-height: 1.6; }
//         .modal-form { display: flex; flex-direction: column; gap: 0.85rem; }
//         .modal-input {
//           padding: 0.85rem 1rem; border: 1px solid #ddd;
//           font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: var(--text-dark);
//           outline: none; transition: border-color 0.2s; background: var(--cream);
//         }
//         .modal-input:focus { border-color: var(--gold); }
//         .modal-btn {
//           background: var(--forest); color: var(--cream); border: none;
//           padding: 1rem; font-family: 'DM Sans', sans-serif; font-weight: 600;
//           font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase;
//           cursor: pointer; transition: background 0.2s; margin-top: 0.25rem;
//         }
//         .modal-btn:hover { background: var(--forest-light); }
//         .modal-btn:disabled { opacity: 0.7; cursor: not-allowed; }
//         .modal-skip { text-align: center; font-size: 0.8rem; color: var(--text-light); margin-top: 0.75rem; cursor: pointer; }
//         .modal-skip:hover { text-decoration: underline; }

//         /* ── MOBILE NAV ── */
//         .mobile-nav-overlay {
//           display: none;
//         }
//         .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
//         .hamburger span { display: block; width: 24px; height: 2px; background: var(--text-dark); transition: all 0.3s; }

//         /* ── RESPONSIVE ── */
//         @media (max-width: 1024px) {
//           .reasons-grid { grid-template-columns: 1fr 1fr; }
//           .phases-grid { grid-template-columns: repeat(2,1fr); }
//           .footer-grid { grid-template-columns: 1fr 1fr; }
//         }
//         @media (max-width: 768px) {
//           .nav-links { display: none; }
//           .hamburger { display: flex; }
//           .mobile-nav-overlay {
//             display: block;
//             position: fixed; inset: 0; background: var(--cream); z-index: 99;
//             padding: 6rem 2rem 2rem;
//             transform: translateX(100%);
//             transition: transform 0.3s ease;
//           }
//           .mobile-nav-overlay.open { transform: translateX(0); }
//           .mobile-nav-links { display: flex; flex-direction: column; gap: 1.5rem; }
//           .mobile-nav-link { font-size: 1.4rem; font-family: 'Playfair Display', serif; color: var(--text-dark); text-decoration: none; }
//           .agent-grid, .story-grid { grid-template-columns: 1fr; }
//           .agent-img-frame { display: none; }
//           .reasons-grid { grid-template-columns: 1fr; }
//           .phases-grid { grid-template-columns: 1fr; }
//           .footer-grid { grid-template-columns: 1fr; }
//           .hero-actions { flex-direction: column; }
//           .hero-actions a, .hero-actions button { text-align: center; }
//           [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
//         }
//       `}</style>

//       {/* ── WEBINAR MODAL ── */}
//       {webinarOpen && (
//         <div
//           className="modal-overlay"
//           onClick={(e) => e.target === e.currentTarget && setWebinarOpen(false)}
//         >
//           <div className="modal-box">
//             <button
//               className="modal-close"
//               onClick={() => setWebinarOpen(false)}
//             >
//               ×
//             </button>
//             <div className="modal-logo">
//               <div className="modal-logo-name">
//                 <span>YARA</span> Group
//               </div>
//             </div>
//             <h3 className="modal-h3">
//               Free Webinar: Own a Profitable Plantation
//             </h3>
//             <p className="modal-sub">
//               Join our free webinar and learn the proven system for owning a
//               profitable oil palm plantation that generates passive income for
//               decades.
//             </p>
//             <form className="modal-form" onSubmit={handleWebinarSubmit}>
//               <input
//                 className="modal-input"
//                 placeholder="Enter your email address"
//                 type="email"
//                 required
//                 value={webinarForm.email}
//                 onChange={(e) =>
//                   setWebinarForm((p) => ({ ...p, email: e.target.value }))
//                 }
//               />
//               <input
//                 className="modal-input"
//                 placeholder="Phone Number"
//                 type="tel"
//                 required
//                 value={webinarForm.phone}
//                 onChange={(e) =>
//                   setWebinarForm((p) => ({ ...p, phone: e.target.value }))
//                 }
//               />
//               <input
//                 className="modal-input"
//                 placeholder="Your Name"
//                 type="text"
//                 required
//                 value={webinarForm.name}
//                 onChange={(e) =>
//                   setWebinarForm((p) => ({ ...p, name: e.target.value }))
//                 }
//               />
//               <input
//                 className="modal-input"
//                 placeholder="Would you be available for the webinar?"
//                 value={webinarForm.available}
//                 onChange={(e) =>
//                   setWebinarForm((p) => ({ ...p, available: e.target.value }))
//                 }
//               />
//               <button
//                 className="modal-btn"
//                 type="submit"
//                 disabled={submittingWebinar}
//               >
//                 {submittingWebinar ? "Signing up..." : "Sign Up"}
//               </button>
//             </form>
//             <p className="modal-skip" onClick={() => setWebinarOpen(false)}>
//               Thanks, I'm not interested
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ── INSPECTION MODAL ── */}
//       {inspectionOpen && (
//         <div
//           className="modal-overlay"
//           onClick={(e) =>
//             e.target === e.currentTarget && setInspectionOpen(false)
//           }
//         >
//           <div className="modal-box">
//             <button
//               className="modal-close"
//               onClick={() => setInspectionOpen(false)}
//             >
//               ×
//             </button>
//             <div className="modal-logo">
//               <div className="modal-logo-name">
//                 <span>YARA</span> Group
//               </div>
//             </div>
//             <h3 className="modal-h3">Book a Site Inspection</h3>
//             <p className="modal-sub">
//               See the land for yourself. Our team will walk you through the
//               plantation and answer every question you have.
//             </p>
//             <form className="modal-form" onSubmit={handleInspectionSubmit}>
//               <input
//                 className="modal-input"
//                 placeholder="Enter your email address"
//                 type="email"
//                 required
//                 value={inspectionForm.email}
//                 onChange={(e) =>
//                   setInspectionForm((p) => ({ ...p, email: e.target.value }))
//                 }
//               />
//               <input
//                 className="modal-input"
//                 placeholder="Your Name"
//                 type="text"
//                 required
//                 value={inspectionForm.name}
//                 onChange={(e) =>
//                   setInspectionForm((p) => ({ ...p, name: e.target.value }))
//                 }
//               />
//               <input
//                 className="modal-input"
//                 placeholder="Phone Number"
//                 type="tel"
//                 required
//                 value={inspectionForm.phone}
//                 onChange={(e) =>
//                   setInspectionForm((p) => ({ ...p, phone: e.target.value }))
//                 }
//               />
//               <input
//                 className="modal-input"
//                 placeholder="How did you hear about us?"
//                 value={inspectionForm.source}
//                 onChange={(e) =>
//                   setInspectionForm((p) => ({ ...p, source: e.target.value }))
//                 }
//               />
//               <button
//                 className="modal-btn"
//                 type="submit"
//                 disabled={submittingInspection}
//               >
//                 {submittingInspection ? "Booking..." : "Book Inspection"}
//               </button>
//             </form>
//             <p className="modal-skip" onClick={() => setInspectionOpen(false)}>
//               Thanks, I'm not interested
//             </p>
//           </div>
//         </div>
//       )}

//       {/* ── NAV ── */}
//       <nav className={`yara-nav ${scrolled ? "scrolled" : ""}`}>
//         <div className="nav-inner">
//           <a href="#" className="nav-logo">
//             <span>YARA</span> Group
//           </a>
//           <div className="nav-links">
//             <a href="#why" className="nav-link">
//               Why Invest
//             </a>
//             <a href="#estates" className="nav-link">
//               Estates
//             </a>
//             <a href="#story" className="nav-link">
//               Our Story
//             </a>
//             <a href="#contact" className="nav-link">
//               Contact
//             </a>
//             <button
//               className="nav-link nav-cta"
//               onClick={() => setInspectionOpen(true)}
//             >
//               Book Inspection
//             </button>
//           </div>
//           <button
//             className="hamburger"
//             onClick={() => setMenuOpen(!menuOpen)}
//             aria-label="Menu"
//           >
//             <span />
//             <span />
//             <span />
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Nav */}
//       <div className={`mobile-nav-overlay ${menuOpen ? "open" : ""}`}>
//         <div className="mobile-nav-links">
//           <a
//             href="#why"
//             className="mobile-nav-link"
//             onClick={() => setMenuOpen(false)}
//           >
//             Why Invest
//           </a>
//           <a
//             href="#estates"
//             className="mobile-nav-link"
//             onClick={() => setMenuOpen(false)}
//           >
//             Estates
//           </a>
//           <a
//             href="#story"
//             className="mobile-nav-link"
//             onClick={() => setMenuOpen(false)}
//           >
//             Our Story
//           </a>
//           <a
//             href="#contact"
//             className="mobile-nav-link"
//             onClick={() => setMenuOpen(false)}
//           >
//             Contact
//           </a>
//           <button
//             className="btn-primary"
//             style={{ border: "none" }}
//             onClick={() => {
//               setMenuOpen(false);
//               setInspectionOpen(true);
//             }}
//           >
//             Book Inspection
//           </button>
//         </div>
//       </div>

//       {/* ── HERO ── */}
//       <section className="hero" id="home">
//         <div className="hero-content">
//           <span className="hero-tag">YARA Group · Agriculture Division</span>
//           <h1 className="hero-h1">
//             Build sustainable income with <em>oil palm</em> plantations
//           </h1>
//           <p className="hero-p">
//             Nigeria's most reliable agricultural investment. Oil palm produces
//             harvests every single year for 25+ years — delivering consistent
//             passive income, land appreciation, and a legacy that outlasts you.
//           </p>
//           <div className="hero-actions">
//             <button
//               className="btn-primary"
//               onClick={() => setInspectionOpen(true)}
//             >
//               Book Inspection
//             </button>
//             <a href="#estates" className="btn-outline">
//               Explore Estates
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ── STATS STRIP ── */}
//       <section style={{ background: "var(--forest-mid)", padding: "2.5rem 0" }}>
//         <div className="section-inner">
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(4,1fr)",
//               gap: "1rem",
//               textAlign: "center",
//             }}
//           >
//             {[
//               { num: "25+", label: "Years of Annual Harvest" },
//               { num: "₦180B+", label: "Palm Oil Market Value in Nigeria" },
//               { num: "3×", label: "Faster Growth Than Inflation" },
//               { num: "6 Phases", label: "Of Palmrich — 4 Already Sold Out" },
//             ].map((s) => (
//               <div
//                 key={s.num}
//                 style={{
//                   borderRight: "1px solid rgba(245,240,232,0.1)",
//                   padding: "0 1rem",
//                 }}
//               >
//                 <div
//                   style={{
//                     fontFamily: "'Playfair Display',serif",
//                     fontSize: "clamp(1.6rem,3vw,2.4rem)",
//                     fontWeight: 700,
//                     color: "var(--gold-light)",
//                     marginBottom: "0.3rem",
//                   }}
//                 >
//                   {s.num}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "0.78rem",
//                     color: "rgba(245,240,232,0.65)",
//                     letterSpacing: "0.05em",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   {s.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── WHY INVEST ── */}
//       <section className="section why-bg" id="why">
//         <div className="section-inner">
//           <span className="section-tag">Why Oil Palm?</span>
//           <h2 className="section-h2" style={{ color: "var(--cream)" }}>
//             A crop that works for you,
//             <br />
//             <em style={{ color: "var(--gold-light)" }}>year after year</em>
//           </h2>
//           <div className="divider" />
//           <div className="reasons-grid">
//             {[
//               {
//                 num: "01",
//                 title: "Strong and Predictable Cash Flow",
//                 body: "Oil palm produces harvests every year for decades, creating a dependable revenue stream that strengthens long-term financial planning.",
//               },
//               {
//                 num: "02",
//                 title: "High-Demand Commodity With Global Market Stability",
//                 body: "As a versatile product used across food, cosmetics, and energy industries, oil palm maintains steady international demand, reducing volatility and supporting sustainable price growth.",
//               },
//               {
//                 num: "03",
//                 title: "Inflation-Resistant Agricultural Asset",
//                 body: "Because its value is tied to essential consumer markets, oil palm consistently outperforms inflation over time, helping investors protect and grow their capital efficiently.",
//               },
//             ].map((r) => (
//               <div key={r.num}>
//                 <div className="reason-num">{r.num}</div>
//                 <div className="reason-line" />
//                 <div className="reason-title">{r.title}</div>
//                 <div className="reason-body">{r.body}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── AGENT ── */}
//       <section className="section agent-section">
//         <div className="section-inner">
//           <div className="agent-grid">
//             <div className="agent-img-wrap">
//               <img
//                 src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=800&q=80"
//                 alt="Our Consultant"
//                 className="agent-img"
//               />
//               <div className="agent-img-frame" />
//             </div>
//             <div>
//               <span className="section-tag">Meet the Expert</span>
//               <h2 className="agent-title">Your Investment Partner</h2>
//               <p className="agent-role">
//                 Professional Agro Real Estate Consultant
//               </p>
//               <div className="divider" />
//               <div className="agent-body">
//                 <p>
//                   Our lead consultant is a dedicated agro real estate
//                   professional committed to helping individuals and families
//                   build lasting wealth through strategic agricultural
//                   investments. With a strong understanding of both farmland
//                   value and long-term agribusiness potential, she guides clients
//                   toward opportunities that offer stability, passive income, and
//                   sustainable growth.
//                 </p>
//                 <p>
//                   Known for transparency, patience, and hands-on support, she
//                   simplifies the investment journey — from property discovery to
//                   documentation and after-sales guidance. Her goal is not just
//                   to sell land, but to empower clients with assets that
//                   appreciate, generate consistent returns, and contribute to
//                   generational prosperity.
//                 </p>
//                 <p>
//                   With YARA Group, clients don't just acquire land — they secure
//                   a future built on value, growth, and long-term opportunity.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── HOW IT WORKS ── */}
//       <section style={{ background: "var(--cream)", padding: "5rem 0" }}>
//         <div className="section-inner">
//           <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
//             <span className="section-tag">Simple Process</span>
//             <h2 className="section-h2">
//               From Investment to <em>Harvest</em>
//             </h2>
//             <div className="divider" style={{ margin: "1.5rem auto" }} />
//           </div>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(4,1fr)",
//               gap: "0",
//               position: "relative",
//             }}
//           >
//             {[
//               {
//                 step: "01",
//                 icon: "🌱",
//                 title: "Choose Your Plot",
//                 body: "Select a plot size that fits your budget. Plots start from affordable entry points with clear documentation.",
//               },
//               {
//                 step: "02",
//                 icon: "📄",
//                 title: "Get Your Title",
//                 body: "Receive your Certificate of Occupancy and full legal documentation within weeks of purchase.",
//               },
//               {
//                 step: "03",
//                 icon: "🌴",
//                 title: "We Manage Everything",
//                 body: "YARA Group's agri-team plants, maintains, and manages your oil palms — completely hands-free for you.",
//               },
//               {
//                 step: "04",
//                 icon: "💰",
//                 title: "Receive Harvest Income",
//                 body: "From year 3 onward, your palms produce bunches of oil palm fruit twice a year, generating consistent passive income.",
//               },
//             ].map((item, i) => (
//               <div
//                 key={item.step}
//                 style={{
//                   padding: "2rem 1.5rem",
//                   borderLeft: i > 0 ? "1px solid var(--cream-dark)" : "none",
//                   position: "relative",
//                 }}
//               >
//                 {i < 3 && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "2.5rem",
//                       right: 0,
//                       width: 24,
//                       height: 24,
//                       background: "var(--gold)",
//                       borderRadius: "50%",
//                       zIndex: 2,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "0.6rem",
//                       color: "var(--forest)",
//                       fontWeight: 700,
//                     }}
//                   >
//                     →
//                   </div>
//                 )}
//                 <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
//                   {item.icon}
//                 </div>
//                 <div
//                   style={{
//                     fontFamily: "'Playfair Display',serif",
//                     fontSize: "0.7rem",
//                     fontWeight: 700,
//                     letterSpacing: "0.2em",
//                     color: "var(--gold)",
//                     marginBottom: "0.5rem",
//                   }}
//                 >
//                   {item.step}
//                 </div>
//                 <div
//                   style={{
//                     fontFamily: "'Playfair Display',serif",
//                     fontSize: "1.05rem",
//                     fontWeight: 600,
//                     color: "var(--text-dark)",
//                     marginBottom: "0.75rem",
//                   }}
//                 >
//                   {item.title}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: "0.875rem",
//                     color: "var(--text-mid)",
//                     lineHeight: 1.75,
//                   }}
//                 >
//                   {item.body}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── ESTATES / PHASES ── */}
//       <section
//         className="section"
//         id="estates"
//         style={{ background: "var(--cream)" }}
//       >
//         <div className="section-inner">
//           <div
//             style={{
//               textAlign: "center",
//               maxWidth: 700,
//               margin: "0 auto 1rem",
//             }}
//           >
//             <span className="section-tag">Our Portfolio</span>
//             <h2 className="section-h2">
//               Explore All Our <em>Estates</em>
//             </h2>
//             <div className="divider" style={{ margin: "1.5rem auto" }} />
//             <p className="section-sub" style={{ margin: "0 auto" }}>
//               Palmrich is more than a land investment — it's a foundation for
//               generational wealth. Built to grow in value, it offers you the
//               opportunity to earn passive income, build lasting assets, and
//               secure a financial legacy that stands the test of time.
//             </p>
//           </div>
//           <div className="phases-grid">
//             {phases.map((phase) => (
//               <div className="phase-card" key={phase.name}>
//                 <div className="phase-img-wrap">
//                   <img src={phase.img} alt={phase.name} className="phase-img" />
//                   {phase.soldOut && (
//                     <div className="sold-out-badge">
//                       <div className="sold-out-stamp">Sold Out</div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="phase-body">
//                   <div className="phase-name">{phase.name}</div>
//                   <div className="phase-desc">{phase.desc}</div>
//                   {!phase.soldOut && (
//                     <button
//                       className="btn-primary"
//                       style={{
//                         marginTop: "1rem",
//                         fontSize: "0.78rem",
//                         padding: "0.65rem 1.25rem",
//                       }}
//                       onClick={() => setInspectionOpen(true)}
//                     >
//                       Book Inspection →
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── STORY ── */}
//       <section className="section story-section" id="story">
//         <div className="section-inner">
//           <div className="story-grid">
//             <div>
//               <span className="section-tag">Who We Are</span>
//               <h2 className="section-h2">
//                 The <em>Palmrich</em> Story
//               </h2>
//               <div className="divider" />
//               <div className="story-body">
//                 <p>
//                   Palmrich began with a simple but powerful vision: to transform
//                   ordinary land into extraordinary long-term value. In a world
//                   where investments rise and fall overnight, Palmrich set out to
//                   create something different — an asset that grows steadily,
//                   pays consistently, and endures across generations.
//                 </p>
//                 <p>
//                   Built on fertile soil and backed by a team committed to
//                   transparency and real agricultural development, Palmrich
//                   Estate became more than just farmland. It evolved into a
//                   strategic wealth-building platform for everyday investors
//                   seeking stability, passive income, and meaningful legacy.
//                 </p>
//                 <p>
//                   Investors didn't just buy land — they secured a future. With
//                   clear processes, honest documentation, and reliable support,
//                   Palmrich earned the trust of families, professionals, and
//                   visionaries who wanted an asset that would stand the test of
//                   time.
//                 </p>
//                 <p>
//                   Today, Palmrich is known as a dependable gateway to{" "}
//                   <em>transgenerational wealth</em>, powered by a crop with
//                   consistent global demand and designed to appreciate year after
//                   year.
//                 </p>
//                 <p className="story-sign">
//                   Palmrich isn't just an estate. It's a story of prosperity that
//                   keeps growing.
//                 </p>
//               </div>
//             </div>
//             <div className="story-video">
//               <iframe
//                 src="https://www.youtube.com/embed/dQw4w9WgXcQ"
//                 title="YARA Group Story"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── CTA BANNER ── */}
//       <section className="cta-banner">
//         <div className="cta-banner-inner">
//           <span className="cta-sup">Get Started With YARA Group</span>
//           <h2 className="cta-h2">Own An Oil Palm Plantation Today</h2>
//           <p className="cta-sub">
//             Discover how YARA Group helps you own a sustainable asset that pays
//             for decades. Get a quick overview of our solutions, features, and
//             how to get started.
//           </p>
//           <button className="btn-primary" onClick={() => setWebinarOpen(true)}>
//             Download Brochure
//           </button>
//         </div>
//       </section>

//       {/* ── TESTIMONIALS ── */}
//       <section className="section testimonials-section">
//         <div className="section-inner">
//           <span className="section-tag">Social Proof</span>
//           <h2 className="section-h2">Testimonials</h2>
//           <div className="video-wrapper">
//             <iframe
//               src="https://www.youtube.com/embed/dQw4w9WgXcQ"
//               title="Palmrich Testimonial"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           </div>
//         </div>
//       </section>

//       {/* ── FOOTER ── */}
//       <footer className="footer" id="contact">
//         <div className="footer-inner">
//           <div className="footer-grid">
//             <div>
//               <div className="footer-logo">
//                 <span>YARA</span> Group
//               </div>
//               <p className="footer-desc">
//                 Whether you're buying, selling, or investing, real estate can be
//                 complex. That's why we provide expert advice, strategic
//                 direction, and personalized care — ensuring your goals are not
//                 only accomplished but surpassed with ease and profitability.
//               </p>
//             </div>
//             <div>
//               <div className="footer-col-title">About Us</div>
//               <a href="#" className="footer-link">
//                 About Organisation
//               </a>
//               <a href="#" className="footer-link">
//                 Our Journeys
//               </a>
//               <a href="#" className="footer-link">
//                 Our Partners
//               </a>
//             </div>
//             <div>
//               <div className="footer-col-title">Quick Links</div>
//               <a href="#" className="footer-link">
//                 Introduction
//               </a>
//               <a href="#" className="footer-link">
//                 Organisation Team
//               </a>
//               <a href="#" className="footer-link">
//                 Press Enquiries
//               </a>
//               <div className="footer-col-title" style={{ marginTop: "1.5rem" }}>
//                 Important Links
//               </div>
//               <a href="#" className="footer-link">
//                 Privacy Policy
//               </a>
//               <a href="#" className="footer-link">
//                 Terms & Conditions
//               </a>
//             </div>
//             <div>
//               <div className="footer-col-title">Contact Info</div>
//               <div className="footer-contact-item">
//                 <span className="footer-contact-icon">📍</span>
//                 <span>Lagos, Nigeria</span>
//               </div>
//               <div className="footer-contact-item">
//                 <span className="footer-contact-icon">📞</span>
//                 <a
//                   href="tel:+2348000000000"
//                   className="footer-link"
//                   style={{ margin: 0 }}
//                 >
//                   +234 800 YARA GROUP
//                 </a>
//               </div>
//               <div className="footer-contact-item">
//                 <span className="footer-contact-icon">✉️</span>
//                 <a
//                   href="mailto:info@yaragroup.ng"
//                   className="footer-link"
//                   style={{ margin: 0 }}
//                 >
//                   info@yaragroup.ng
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="footer-bottom">
//             © 2025 YARA Group. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default YaraHome;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useMutateData, useFetchData } from "../hook/Request";

/* ─────────────────────────────────────────────
   YARA GROUP – Agriculture-first landing page
   Inspired by medwwidehome.com.ng
   Aesthetic: Organic / Natural / Editorial
   Colors: Deep forest green, warm cream, gold
───────────────────────────────────────────── */

const YaraHome = () => {
  const [webinarOpen, setWebinarOpen] = useState(false);
  const [inspectionOpen, setInspectionOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Webinar form state
  const [webinarForm, setWebinarForm] = useState({
    email: "",
    phone: "",
    name: "",
    available: "",
  });
  const [inspectionForm, setInspectionForm] = useState({
    email: "",
    phone: "",
    name: "",
    source: "",
  });

  // Mutations
  const { mutate: submitWebinar, isLoading: submittingWebinar } =
    useMutateData("webinar");
  const { mutate: submitInspection, isLoading: submittingInspection } =
    useMutateData("inspection");

  // Fetch active properties
  const { data: propertiesData, isLoading: loadingProperties } = useFetchData(
    "/Property",
    "activeProperties",
  );
  const properties = propertiesData?.data?.properties || [];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    // Auto-open webinar modal after 3s
    const timer = setTimeout(() => setWebinarOpen(true), 3000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleWebinarSubmit = (e) => {
    e.preventDefault();
    submitWebinar(
      { url: "/webinar-signup", data: webinarForm },
      {
        onSuccess: () => {
          alert("You're registered! We'll send you the webinar link.");
          setWebinarOpen(false);
        },
        onError: (err) => alert(err?.message || "Failed. Please try again."),
      },
    );
  };

  const handleInspectionSubmit = (e) => {
    e.preventDefault();
    submitInspection(
      { url: "/inspection", data: inspectionForm },
      {
        onSuccess: () => {
          alert("Inspection booked! We'll be in touch within 24 hours.");
          setInspectionOpen(false);
        },
        onError: (err) => alert(err?.message || "Failed. Please try again."),
      },
    );
  };

  // Sold-out phases (static content matching the reference)
  const phases = [
    {
      name: "Palmrich Phase 1",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Elaeis_guineensis_MS_3467.jpg/800px-Elaeis_guineensis_MS_3467.jpg",
      desc: "Our very first development, Phase 1 laid the foundation — prime oil palm land, fully verified, and high-value appreciation. It sold out quickly and set the tone for future phases.",
      soldOut: true,
    },
    {
      name: "Palmrich Phase 2",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Oil_palm_plantation_in_Mersing_District.jpg/800px-Oil_palm_plantation_in_Mersing_District.jpg",
      desc: "Phase 2 attracted early land owners who recognized opportunity early. With great access roads and a thriving palm canopy already established, it became a hotspot for savvy investors.",
      soldOut: true,
    },
    {
      name: "Palmrich Phase 3",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Oilpalm_malaysia.jpg/800px-Oilpalm_malaysia.jpg",
      desc: "Tucked slightly off the main road, Phase 3 offered a perfect mix of privacy and value. Mature oil palms already in harvest cycle appealed to clients seeking immediate returns.",
      soldOut: true,
    },
    {
      name: "Palmrich Phase 4",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/YosriLadangKelapaSawit.jpg/800px-YosriLadangKelapaSawit.jpg",
      desc: "This phase offered enhanced infrastructure and was our first to introduce perimeter fencing and estate layout design. Investors rushed in, and it sold out in record time after launch.",
      soldOut: true,
    },
    {
      name: "Palmrich Phase 5",
      img: "https://images.pexels.com/photos/2950868/pexels-photo-2950868.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Located in Ibadan, this phase features a thriving agro palm plantation already fruiting — the perfect blend of land ownership and immediate agricultural returns in a fast-growing city.",
      soldOut: false,
    },
    {
      name: "Palmrich Phase 6",
      img: "https://images.pexels.com/photos/30251970/pexels-photo-30251970.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Known for its prime location and active oil palm plantation already bearing fruit, Phase 6 attracts high-value buyers seeking both prestige and steady agricultural returns.",
      soldOut: false,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --cream: #f5f0e8;
          --cream-dark: #ede6d6;
          --forest: #1a2e1a;
          --forest-mid: #2d4a2d;
          --forest-light: #3d5c3d;
          --gold: #c49a3c;
          --gold-light: #e0b84a;
          --text-dark: #1a1a1a;
          --text-mid: #4a4a4a;
          --text-light: #7a7a7a;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text-dark); }

        .font-display { font-family: 'Playfair Display', serif; }

        /* ── NAV ── */
        .yara-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: all 0.4s ease;
          padding: 1.5rem 0;
        }
        .yara-nav.scrolled {
          background: rgba(245,240,232,0.97);
          backdrop-filter: blur(12px);
          padding: 1rem 0;
          box-shadow: 0 2px 20px rgba(0,0,0,0.08);
          border-bottom: 1px solid rgba(196,154,60,0.2);
        }
        .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: var(--forest); text-decoration: none; }
        .nav-logo span { color: var(--gold); }
        .nav-links { display: flex; align-items: center; gap: 2.5rem; }
        .nav-link { font-size: 0.85rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-dark); text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: var(--gold); }
        .nav-cta { background: var(--forest); color: var(--cream) !important; padding: 0.65rem 1.5rem; font-size: 0.8rem !important; letter-spacing: 0.1em; transition: background 0.2s !important; }
        .nav-cta:hover { background: var(--forest-light) !important; color: var(--cream) !important; }

        /* ── HERO ── */
        .hero {
          min-height: 100vh;
          background-image: url('https://images.pexels.com/photos/30251970/pexels-photo-30251970.jpeg?auto=compress&cs=tinysrgb&w=1920');
          background-size: cover;
          background-position: center 40%;
          position: relative;
          display: flex; align-items: flex-end;
          padding-bottom: 8rem;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,20,10,0.2) 0%,
            rgba(10,20,10,0.1) 30%,
            rgba(10,20,10,0.6) 70%,
            rgba(10,20,10,0.85) 100%
          );
        }
        .hero-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .hero-tag { font-size: 0.8rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1rem; display: block; }
        .hero-h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 700; color: #fff; line-height: 1.12; margin-bottom: 1.5rem; max-width: 700px; }
        .hero-h1 em { font-style: italic; color: var(--gold-light); }
        .hero-p { font-size: 1.05rem; color: rgba(255,255,255,0.8); max-width: 560px; line-height: 1.7; margin-bottom: 2.5rem; font-weight: 300; }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-primary {
          background: var(--gold); color: var(--forest); font-weight: 600; font-size: 0.85rem;
          letter-spacing: 0.1em; text-transform: uppercase; padding: 1rem 2.2rem;
          border: none; cursor: pointer; text-decoration: none; transition: background 0.2s, transform 0.2s;
          display: inline-block;
        }
        .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); }
        .btn-outline {
          background: transparent; color: #fff; font-weight: 500; font-size: 0.85rem;
          letter-spacing: 0.08em; text-transform: uppercase; padding: 1rem 2.2rem;
          border: 1px solid rgba(255,255,255,0.5); cursor: pointer; text-decoration: none;
          transition: border-color 0.2s, background 0.2s; display: inline-block;
        }
        .btn-outline:hover { border-color: var(--gold-light); background: rgba(196,154,60,0.15); }

        /* ── SECTION COMMONS ── */
        .section { padding: 6rem 0; }
        .section-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .section-tag { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.75rem; }
        .section-h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; color: var(--text-dark); line-height: 1.2; }
        .section-h2 em { font-style: italic; color: var(--forest-mid); }
        .section-sub { font-size: 1rem; color: var(--text-mid); line-height: 1.75; max-width: 600px; margin-top: 1rem; }
        .divider { width: 60px; height: 3px; background: var(--gold); margin: 1.5rem 0; }

        /* ── WHY INVEST ── */
        .why-bg { background: var(--forest); }
        .why-bg .section-h2 { color: var(--cream); }
        .why-bg .section-tag { color: var(--gold-light); }
        .why-bg .section-sub { color: rgba(245,240,232,0.7); }
        .why-bg .divider { background: var(--gold-light); }
        .reasons-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3rem; margin-top: 4rem; }
        .reason-num { font-family: 'Playfair Display', serif; font-size: 3.5rem; font-weight: 900; color: rgba(196,154,60,0.25); line-height: 1; margin-bottom: 1rem; }
        .reason-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 600; color: var(--cream); margin-bottom: 0.75rem; }
        .reason-body { font-size: 0.9rem; color: rgba(245,240,232,0.65); line-height: 1.75; }
        .reason-line { width: 40px; height: 2px; background: var(--gold); margin-bottom: 1rem; }

        /* ── AGENT ── */
        .agent-section { background: var(--cream-dark); }
        .agent-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
        .agent-img-wrap { position: relative; }
        .agent-img {
          width: 100%; aspect-ratio: 4/5; object-fit: cover; object-position: top;
          filter: grayscale(10%);
        }
        .agent-img-frame {
          position: absolute; bottom: -1.5rem; right: -1.5rem;
          width: calc(100% - 2rem); height: calc(100% - 2rem);
          border: 2px solid var(--gold); z-index: -1;
        }
        .agent-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3vw,2.8rem); font-weight: 700; color: var(--text-dark); margin-bottom: 0.25rem; }
        .agent-role { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem; }
        .agent-body { font-size: 0.95rem; color: var(--text-mid); line-height: 1.85; }
        .agent-body p { margin-bottom: 1.25rem; }

        /* ── PHASES ── */
        .phases-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; margin-top: 4rem; }
        .phase-card { background: #fff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); transition: transform 0.3s, box-shadow 0.3s; }
        .phase-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.12); }
        .phase-img-wrap { position: relative; overflow: hidden; height: 220px; }
        .phase-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .phase-card:hover .phase-img { transform: scale(1.05); }
        .sold-out-badge {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          background: rgba(10,20,10,0.35);
        }
        .sold-out-stamp {
          border: 3px solid rgba(255,255,255,0.85); color: #fff;
          font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 0.5rem 1.5rem;
          transform: rotate(-8deg);
          background: rgba(180,30,30,0.7);
          text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        .phase-body { padding: 1.5rem; }
        .phase-name { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.6rem; }
        .phase-desc { font-size: 0.875rem; color: var(--text-mid); line-height: 1.7; }

        /* ── STORY ── */
        .story-section { background: #fff; }
        .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        .story-video { position: relative; }
        .story-video iframe { width: 100%; aspect-ratio: 16/9; border: none; }
        .story-body p { font-size: 0.95rem; color: var(--text-mid); line-height: 1.85; margin-bottom: 1.25rem; }
        .story-body em { font-style: italic; color: var(--forest-mid); font-weight: 500; }
        .story-sign { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-style: italic; color: var(--forest); margin-top: 0.5rem; }

        /* ── CTA BANNER ── */
        .cta-banner {
          background-image: url('https://images.pexels.com/photos/2950868/pexels-photo-2950868.jpeg?auto=compress&cs=tinysrgb&w=1920');
          background-size: cover; background-position: center;
          position: relative; text-align: center; padding: 7rem 2rem;
        }
        .cta-banner::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(10,20,10,0.72);
        }
        .cta-banner-inner { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
        .cta-sup { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 1rem; display: block; }
        .cta-h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem,5vw,3.5rem); font-weight: 700; color: #fff; line-height: 1.15; margin-bottom: 1rem; }
        .cta-sub { font-size: 1rem; color: rgba(255,255,255,0.75); margin-bottom: 2.5rem; line-height: 1.7; }

        /* ── TESTIMONIALS ── */
        .testimonials-section { background: var(--cream-dark); }
        .testimonials-section .section-inner { text-align: center; }
        .video-wrapper { max-width: 700px; margin: 3rem auto 0; background: var(--forest); padding: 0.5rem; }
        .video-wrapper iframe { width: 100%; aspect-ratio: 16/9; border: none; display: block; }

        /* ── FOOTER ── */
        .footer { background: var(--forest); color: rgba(245,240,232,0.65); }
        .footer-inner { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem 2rem; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(245,240,232,0.1); }
        .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; color: var(--cream); margin-bottom: 1rem; }
        .footer-logo span { color: var(--gold-light); }
        .footer-desc { font-size: 0.875rem; line-height: 1.75; }
        .footer-col-title { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cream); margin-bottom: 1.25rem; }
        .footer-link { display: block; font-size: 0.875rem; color: rgba(245,240,232,0.6); text-decoration: none; margin-bottom: 0.6rem; transition: color 0.2s; }
        .footer-link:hover { color: var(--gold-light); }
        .footer-contact-item { display: flex; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.875rem; align-items: flex-start; }
        .footer-contact-icon { color: var(--gold-light); margin-top: 2px; flex-shrink: 0; }
        .footer-bottom { padding-top: 1.5rem; text-align: center; font-size: 0.8rem; color: rgba(245,240,232,0.4); }

        /* ── MODAL ── */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0.65); display: flex; align-items: center; justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .modal-box {
          background: #fff; width: 100%; max-width: 520px;
          padding: 3rem 2.5rem; position: relative;
          animation: slideUp 0.35s ease;
        }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .modal-close {
          position: absolute; top: 1rem; right: 1rem;
          background: none; border: none; cursor: pointer;
          font-size: 1.5rem; color: var(--text-light); line-height: 1;
        }
        .modal-logo { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; }
        .modal-logo-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: var(--forest); }
        .modal-logo-name span { color: var(--gold); }
        .modal-h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.5rem; }
        .modal-sub { font-size: 0.875rem; color: var(--text-mid); margin-bottom: 1.75rem; line-height: 1.6; }
        .modal-form { display: flex; flex-direction: column; gap: 0.85rem; }
        .modal-input {
          padding: 0.85rem 1rem; border: 1px solid #ddd;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: var(--text-dark);
          outline: none; transition: border-color 0.2s; background: var(--cream);
        }
        .modal-input:focus { border-color: var(--gold); }
        .modal-btn {
          background: var(--forest); color: var(--cream); border: none;
          padding: 1rem; font-family: 'DM Sans', sans-serif; font-weight: 600;
          font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s; margin-top: 0.25rem;
        }
        .modal-btn:hover { background: var(--forest-light); }
        .modal-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .modal-skip { text-align: center; font-size: 0.8rem; color: var(--text-light); margin-top: 0.75rem; cursor: pointer; }
        .modal-skip:hover { text-decoration: underline; }

        /* ── MOBILE NAV ── */
        .mobile-nav-overlay {
          display: none;
        }
        .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: var(--text-dark); transition: all 0.3s; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .reasons-grid { grid-template-columns: 1fr 1fr; }
          .phases-grid { grid-template-columns: repeat(2,1fr); }
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .mobile-nav-overlay {
            display: block;
            position: fixed; inset: 0; background: var(--cream); z-index: 99;
            padding: 6rem 2rem 2rem;
            transform: translateX(100%);
            transition: transform 0.3s ease;
          }
          .mobile-nav-overlay.open { transform: translateX(0); }
          .mobile-nav-links { display: flex; flex-direction: column; gap: 1.5rem; }
          .mobile-nav-link { font-size: 1.4rem; font-family: 'Playfair Display', serif; color: var(--text-dark); text-decoration: none; }
          .agent-grid, .story-grid { grid-template-columns: 1fr; }
          .agent-img-frame { display: none; }
          .reasons-grid { grid-template-columns: 1fr; }
          .phases-grid { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; }
          .hero-actions a, .hero-actions button { text-align: center; }
          [style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* ── WEBINAR MODAL ── */}
      {webinarOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setWebinarOpen(false)}
        >
          <div className="modal-box">
            <button
              className="modal-close"
              onClick={() => setWebinarOpen(false)}
            >
              ×
            </button>
            <div className="modal-logo">
              <div className="modal-logo-name">
                <span>YARA</span> Group
              </div>
            </div>
            <h3 className="modal-h3">
              Free Webinar: Own a Profitable Plantation
            </h3>
            <p className="modal-sub">
              Join our free webinar and learn the proven system for owning a
              profitable oil palm plantation that generates passive income for
              decades.
            </p>
            <form className="modal-form" onSubmit={handleWebinarSubmit}>
              <input
                className="modal-input"
                placeholder="Enter your email address"
                type="email"
                required
                value={webinarForm.email}
                onChange={(e) =>
                  setWebinarForm((p) => ({ ...p, email: e.target.value }))
                }
              />
              <input
                className="modal-input"
                placeholder="Phone Number"
                type="tel"
                required
                value={webinarForm.phone}
                onChange={(e) =>
                  setWebinarForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
              <input
                className="modal-input"
                placeholder="Your Name"
                type="text"
                required
                value={webinarForm.name}
                onChange={(e) =>
                  setWebinarForm((p) => ({ ...p, name: e.target.value }))
                }
              />
              <input
                className="modal-input"
                placeholder="Would you be available for the webinar?"
                value={webinarForm.available}
                onChange={(e) =>
                  setWebinarForm((p) => ({ ...p, available: e.target.value }))
                }
              />
              <button
                className="modal-btn"
                type="submit"
                disabled={submittingWebinar}
              >
                {submittingWebinar ? "Signing up..." : "Sign Up"}
              </button>
            </form>
            <p className="modal-skip" onClick={() => setWebinarOpen(false)}>
              Thanks, I'm not interested
            </p>
          </div>
        </div>
      )}

      {/* ── INSPECTION MODAL ── */}
      {inspectionOpen && (
        <div
          className="modal-overlay"
          onClick={(e) =>
            e.target === e.currentTarget && setInspectionOpen(false)
          }
        >
          <div className="modal-box">
            <button
              className="modal-close"
              onClick={() => setInspectionOpen(false)}
            >
              ×
            </button>
            <div className="modal-logo">
              <div className="modal-logo-name">
                <span>YARA</span> Group
              </div>
            </div>
            <h3 className="modal-h3">Book a Site Inspection</h3>
            <p className="modal-sub">
              See the land for yourself. Our team will walk you through the
              plantation and answer every question you have.
            </p>
            <form className="modal-form" onSubmit={handleInspectionSubmit}>
              <input
                className="modal-input"
                placeholder="Enter your email address"
                type="email"
                required
                value={inspectionForm.email}
                onChange={(e) =>
                  setInspectionForm((p) => ({ ...p, email: e.target.value }))
                }
              />
              <input
                className="modal-input"
                placeholder="Your Name"
                type="text"
                required
                value={inspectionForm.name}
                onChange={(e) =>
                  setInspectionForm((p) => ({ ...p, name: e.target.value }))
                }
              />
              <input
                className="modal-input"
                placeholder="Phone Number"
                type="tel"
                required
                value={inspectionForm.phone}
                onChange={(e) =>
                  setInspectionForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
              <input
                className="modal-input"
                placeholder="How did you hear about us?"
                value={inspectionForm.source}
                onChange={(e) =>
                  setInspectionForm((p) => ({ ...p, source: e.target.value }))
                }
              />
              <button
                className="modal-btn"
                type="submit"
                disabled={submittingInspection}
              >
                {submittingInspection ? "Booking..." : "Book Inspection"}
              </button>
            </form>
            <p className="modal-skip" onClick={() => setInspectionOpen(false)}>
              Thanks, I'm not interested
            </p>
          </div>
        </div>
      )}

      {/* ── NAV ── */}
      <nav className={`yara-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <span>YARA</span> Group
          </a>
          <div className="nav-links">
            <a href="#why" className="nav-link">
              Why Invest
            </a>
            <a href="#estates" className="nav-link">
              Estates
            </a>
            <a href="#story" className="nav-link">
              Our Story
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
            <button
              className="nav-link nav-cta"
              onClick={() => setInspectionOpen(true)}
            >
              Book Inspection
            </button>
          </div>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav-overlay ${menuOpen ? "open" : ""}`}>
        <div className="mobile-nav-links">
          <a
            href="#why"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Why Invest
          </a>
          <a
            href="#estates"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Estates
          </a>
          <a
            href="#story"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Our Story
          </a>
          <a
            href="#contact"
            className="mobile-nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
          <button
            className="btn-primary"
            style={{ border: "none" }}
            onClick={() => {
              setMenuOpen(false);
              setInspectionOpen(true);
            }}
          >
            Book Inspection
          </button>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="hero-tag">YARA Group · Agriculture Division</span>
          <h1 className="hero-h1">
            Build sustainable income with <em>oil palm</em> plantations
          </h1>
          <p className="hero-p">
            Nigeria's most reliable agricultural investment. Oil palm produces
            harvests every single year for 25+ years — delivering consistent
            passive income, land appreciation, and a legacy that outlasts you.
          </p>
          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => setInspectionOpen(true)}
            >
              Book Inspection
            </button>
            <a href="#estates" className="btn-outline">
              Explore Estates
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: "var(--forest-mid)", padding: "2.5rem 0" }}>
        <div className="section-inner">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "1rem",
              textAlign: "center",
            }}
          >
            {[
              { num: "25+", label: "Years of Annual Harvest" },
              { num: "₦180B+", label: "Palm Oil Market Value in Nigeria" },
              { num: "3×", label: "Faster Growth Than Inflation" },
              { num: "6 Phases", label: "Of Palmrich — 4 Already Sold Out" },
            ].map((s) => (
              <div
                key={s.num}
                style={{
                  borderRight: "1px solid rgba(245,240,232,0.1)",
                  padding: "0 1rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "clamp(1.6rem,3vw,2.4rem)",
                    fontWeight: 700,
                    color: "var(--gold-light)",
                    marginBottom: "0.3rem",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(245,240,232,0.65)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY INVEST ── */}
      <section className="section why-bg" id="why">
        <div className="section-inner">
          <span className="section-tag">Why Oil Palm?</span>
          <h2 className="section-h2" style={{ color: "var(--cream)" }}>
            A crop that works for you,
            <br />
            <em style={{ color: "var(--gold-light)" }}>year after year</em>
          </h2>
          <div className="divider" />
          <div className="reasons-grid">
            {[
              {
                num: "01",
                title: "Strong and Predictable Cash Flow",
                body: "Oil palm produces harvests every year for decades, creating a dependable revenue stream that strengthens long-term financial planning.",
              },
              {
                num: "02",
                title: "High-Demand Commodity With Global Market Stability",
                body: "As a versatile product used across food, cosmetics, and energy industries, oil palm maintains steady international demand, reducing volatility and supporting sustainable price growth.",
              },
              {
                num: "03",
                title: "Inflation-Resistant Agricultural Asset",
                body: "Because its value is tied to essential consumer markets, oil palm consistently outperforms inflation over time, helping investors protect and grow their capital efficiently.",
              },
            ].map((r) => (
              <div key={r.num}>
                <div className="reason-num">{r.num}</div>
                <div className="reason-line" />
                <div className="reason-title">{r.title}</div>
                <div className="reason-body">{r.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENT ── */}
      <section className="section agent-section">
        <div className="section-inner">
          <div className="agent-grid">
            <div className="agent-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=800&q=80"
                alt="Our Consultant"
                className="agent-img"
              />
              <div className="agent-img-frame" />
            </div>
            <div>
              <span className="section-tag">Meet the Expert</span>
              <h2 className="agent-title">Your Investment Partner</h2>
              <p className="agent-role">
                Professional Agro Real Estate Consultant
              </p>
              <div className="divider" />
              <div className="agent-body">
                <p>
                  Our lead consultant is a dedicated agro real estate
                  professional committed to helping individuals and families
                  build lasting wealth through strategic agricultural
                  investments. With a strong understanding of both farmland
                  value and long-term agribusiness potential, she guides clients
                  toward opportunities that offer stability, passive income, and
                  sustainable growth.
                </p>
                <p>
                  Known for transparency, patience, and hands-on support, she
                  simplifies the investment journey — from property discovery to
                  documentation and after-sales guidance. Her goal is not just
                  to sell land, but to empower clients with assets that
                  appreciate, generate consistent returns, and contribute to
                  generational prosperity.
                </p>
                <p>
                  With YARA Group, clients don't just acquire land — they secure
                  a future built on value, growth, and long-term opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "var(--cream)", padding: "5rem 0" }}>
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="section-tag">Simple Process</span>
            <h2 className="section-h2">
              From Investment to <em>Harvest</em>
            </h2>
            <div className="divider" style={{ margin: "1.5rem auto" }} />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "0",
              position: "relative",
            }}
          >
            {[
              {
                step: "01",
                icon: "🌱",
                title: "Choose Your Plot",
                body: "Select a plot size that fits your budget. Plots start from affordable entry points with clear documentation.",
              },
              {
                step: "02",
                icon: "📄",
                title: "Get Your Title",
                body: "Receive your Certificate of Occupancy and full legal documentation within weeks of purchase.",
              },
              {
                step: "03",
                icon: "🌴",
                title: "We Manage Everything",
                body: "YARA Group's agri-team plants, maintains, and manages your oil palms — completely hands-free for you.",
              },
              {
                step: "04",
                icon: "💰",
                title: "Receive Harvest Income",
                body: "From year 3 onward, your palms produce bunches of oil palm fruit twice a year, generating consistent passive income.",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                style={{
                  padding: "2rem 1.5rem",
                  borderLeft: i > 0 ? "1px solid var(--cream-dark)" : "none",
                  position: "relative",
                }}
              >
                {i < 3 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "2.5rem",
                      right: 0,
                      width: 24,
                      height: 24,
                      background: "var(--gold)",
                      borderRadius: "50%",
                      zIndex: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.6rem",
                      color: "var(--forest)",
                      fontWeight: 700,
                    }}
                  >
                    →
                  </div>
                )}
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                  {item.icon}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.step}
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "var(--text-dark)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-mid)",
                    lineHeight: 1.75,
                  }}
                >
                  {item.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESTATES / PHASES ── */}
      <section
        className="section"
        id="estates"
        style={{ background: "var(--cream)" }}
      >
        <div className="section-inner">
          <div
            style={{
              textAlign: "center",
              maxWidth: 700,
              margin: "0 auto 1rem",
            }}
          >
            <span className="section-tag">Our Portfolio</span>
            <h2 className="section-h2">
              Explore All Our <em>Estates</em>
            </h2>
            <div className="divider" style={{ margin: "1.5rem auto" }} />
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Palmrich is more than a land investment — it's a foundation for
              generational wealth. Built to grow in value, it offers you the
              opportunity to earn passive income, build lasting assets, and
              secure a financial legacy that stands the test of time.
            </p>
          </div>
          <div className="phases-grid">
            {phases.map((phase) => (
              <div className="phase-card" key={phase.name}>
                <div className="phase-img-wrap">
                  <img
                    src={phase.img}
                    alt={phase.name}
                    className="phase-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.pexels.com/photos/2950868/pexels-photo-2950868.jpeg?auto=compress&cs=tinysrgb&w=800";
                    }}
                  />
                  {phase.soldOut && (
                    <div className="sold-out-badge">
                      <div className="sold-out-stamp">Sold Out</div>
                    </div>
                  )}
                </div>
                <div className="phase-body">
                  <div className="phase-name">{phase.name}</div>
                  <div className="phase-desc">{phase.desc}</div>
                  {!phase.soldOut && (
                    <button
                      className="btn-primary"
                      style={{
                        marginTop: "1rem",
                        fontSize: "0.78rem",
                        padding: "0.65rem 1.25rem",
                      }}
                      onClick={() => setInspectionOpen(true)}
                    >
                      Book Inspection →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="section story-section" id="story">
        <div className="section-inner">
          <div className="story-grid">
            <div>
              <span className="section-tag">Who We Are</span>
              <h2 className="section-h2">
                The <em>Palmrich</em> Story
              </h2>
              <div className="divider" />
              <div className="story-body">
                <p>
                  Palmrich began with a simple but powerful vision: to transform
                  ordinary land into extraordinary long-term value. In a world
                  where investments rise and fall overnight, Palmrich set out to
                  create something different — an asset that grows steadily,
                  pays consistently, and endures across generations.
                </p>
                <p>
                  Built on fertile soil and backed by a team committed to
                  transparency and real agricultural development, Palmrich
                  Estate became more than just farmland. It evolved into a
                  strategic wealth-building platform for everyday investors
                  seeking stability, passive income, and meaningful legacy.
                </p>
                <p>
                  Investors didn't just buy land — they secured a future. With
                  clear processes, honest documentation, and reliable support,
                  Palmrich earned the trust of families, professionals, and
                  visionaries who wanted an asset that would stand the test of
                  time.
                </p>
                <p>
                  Today, Palmrich is known as a dependable gateway to{" "}
                  <em>transgenerational wealth</em>, powered by a crop with
                  consistent global demand and designed to appreciate year after
                  year.
                </p>
                <p className="story-sign">
                  Palmrich isn't just an estate. It's a story of prosperity that
                  keeps growing.
                </p>
              </div>
            </div>
            <div className="story-video">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YARA Group Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="cta-banner-inner">
          <span className="cta-sup">Get Started With YARA Group</span>
          <h2 className="cta-h2">Own An Oil Palm Plantation Today</h2>
          <p className="cta-sub">
            Discover how YARA Group helps you own a sustainable asset that pays
            for decades. Get a quick overview of our solutions, features, and
            how to get started.
          </p>
          <button className="btn-primary" onClick={() => setWebinarOpen(true)}>
            Download Brochure
          </button>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section">
        <div className="section-inner">
          <span className="section-tag">Social Proof</span>
          <h2 className="section-h2">Testimonials</h2>
          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Palmrich Testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer" id="contact">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                <span>YARA</span> Group
              </div>
              <p className="footer-desc">
                Whether you're buying, selling, or investing, real estate can be
                complex. That's why we provide expert advice, strategic
                direction, and personalized care — ensuring your goals are not
                only accomplished but surpassed with ease and profitability.
              </p>
            </div>
            <div>
              <div className="footer-col-title">About Us</div>
              <a href="#" className="footer-link">
                About Organisation
              </a>
              <a href="#" className="footer-link">
                Our Journeys
              </a>
              <a href="#" className="footer-link">
                Our Partners
              </a>
            </div>
            <div>
              <div className="footer-col-title">Quick Links</div>
              <a href="#" className="footer-link">
                Introduction
              </a>
              <a href="#" className="footer-link">
                Organisation Team
              </a>
              <a href="#" className="footer-link">
                Press Enquiries
              </a>
              <div className="footer-col-title" style={{ marginTop: "1.5rem" }}>
                Important Links
              </div>
              <a href="#" className="footer-link">
                Privacy Policy
              </a>
              <a href="#" className="footer-link">
                Terms & Conditions
              </a>
            </div>
            <div>
              <div className="footer-col-title">Contact Info</div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📍</span>
                <span>Lagos, Nigeria</span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📞</span>
                <a
                  href="tel:+2348000000000"
                  className="footer-link"
                  style={{ margin: 0 }}
                >
                  +234 800 YARA GROUP
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">✉️</span>
                <a
                  href="mailto:info@yaragroup.ng"
                  className="footer-link"
                  style={{ margin: 0 }}
                >
                  info@yaragroup.ng
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            © 2025 YARA Group. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default YaraHome;
