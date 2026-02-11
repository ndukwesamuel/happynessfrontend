// import React, { useState } from "react";
// import {
//   Building2,
//   Calendar,
//   Eye,
//   EyeOff,
//   Search,
//   Filter,
//   Check,
//   XCircle,
//   Clock,
//   Phone,
//   Mail,
//   MapPin,
//   Plus,
//   Edit2,
//   Trash2,
//   X,
// } from "lucide-react";

// const YaraAdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [showCreatePropertyModal, setShowCreatePropertyModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");

//   // Mock Data - Properties
//   const [properties, setProperties] = useState([
//     {
//       id: 1,
//       title: "Luxury Villa - Eko Atlantic",
//       location: "Eko Atlantic, Lagos",
//       size: "5 Bedroom Duplex",
//       type: "Residential",
//       category: "Real Estate",
//       price: "₦250M",
//       status: "active",
//       image:
//         "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80",
//       features: ["Waterfront", "Smart Home", "Pool", "Gym"],
//       createdAt: "2025-02-01",
//     },
//     {
//       id: 2,
//       title: "Premium Land - Banana Island",
//       location: "Banana Island, Lagos",
//       size: "1500 SQM",
//       type: "Land & Plots",
//       category: "Real Estate",
//       price: "₦150M",
//       status: "active",
//       image:
//         "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80",
//       features: ["Waterfront", "C of O", "Fully Serviced"],
//       createdAt: "2025-01-28",
//     },
//     {
//       id: 3,
//       title: "Palm Plantation Estate",
//       location: "Delta State",
//       size: "50 Hectares",
//       type: "Palm Plantation",
//       category: "Agriculture",
//       price: "₦75M",
//       status: "active",
//       image:
//         "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=400&q=80",
//       features: ["Mature Trees", "Processing Unit", "Road Access"],
//       createdAt: "2025-01-25",
//     },
//     {
//       id: 4,
//       title: "Commercial Plaza - Victoria Island",
//       location: "Victoria Island, Lagos",
//       size: "2000 SQM",
//       type: "Commercial",
//       category: "Real Estate",
//       price: "₦500M",
//       status: "inactive",
//       image:
//         "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
//       features: ["Prime Location", "Parking", "Generator"],
//       createdAt: "2025-01-20",
//     },
//   ]);

//   // Mock Data - Consultation Bookings
//   const [consultations, setConsultations] = useState([
//     {
//       id: 1,
//       fullName: "Chukwuemeka Okonkwo",
//       email: "chukwu@email.com",
//       phone: "+234 803 123 4567",
//       interest: "Luxury Residential - Eko Atlantic",
//       propertyType: "residential-property",
//       preferredDate: "2025-02-15",
//       message:
//         "Interested in 5-bedroom luxury villa with waterfront view. Looking to close within 3 months.",
//       status: "pending",
//       submittedAt: "2025-02-10 14:30",
//     },
//     {
//       id: 2,
//       fullName: "Amara Nwosu",
//       email: "amara.nwosu@company.ng",
//       phone: "+234 810 987 6543",
//       interest: "Palm Plantation Ownership",
//       propertyType: "plantation-ownership",
//       preferredDate: "2025-02-18",
//       message:
//         "Looking to invest in 20-hectare palm plantation. Need information on ROI and management services.",
//       status: "approved",
//       submittedAt: "2025-02-09 10:15",
//     },
//     {
//       id: 3,
//       fullName: "Tunde Bakare",
//       email: "tbakare@gmail.com",
//       phone: "+234 802 555 1234",
//       interest: "Commercial Property - VI",
//       propertyType: "commercial-property",
//       preferredDate: "2025-02-20",
//       message: "Seeking office space for tech startup, 500-1000 sqm.",
//       status: "approved",
//       submittedAt: "2025-02-08 16:45",
//     },
//     {
//       id: 4,
//       fullName: "Ngozi Adeleke",
//       email: "ngozi.a@yahoo.com",
//       phone: "+234 805 777 8888",
//       interest: "Bulk Palm Oil Export",
//       propertyType: "bulk-palm-oil",
//       preferredDate: "2025-02-14",
//       message:
//         "Need 50,000 litres monthly for export to Ghana. Require pricing and logistics details.",
//       status: "rejected",
//       submittedAt: "2025-02-07 09:20",
//     },
//     {
//       id: 5,
//       fullName: "Ibrahim Musa",
//       email: "ibrahim.musa@outlook.com",
//       phone: "+234 813 444 9999",
//       interest: "Land & Plots - Lekki",
//       propertyType: "land-plots",
//       preferredDate: "2025-02-16",
//       message:
//         "Looking for 1000 sqm land in Lekki for residential development.",
//       status: "pending",
//       submittedAt: "2025-02-06 11:00",
//     },
//   ]);

//   // Stats
//   const stats = [
//     {
//       title: "Total Properties",
//       value: properties.length,
//       change: "+2 this month",
//       icon: Building2,
//       color: "bg-blue-50 text-blue-600",
//     },
//     {
//       title: "Active Properties",
//       value: properties.filter((p) => p.status === "active").length,
//       change: "0% this month",
//       icon: Eye,
//       color: "bg-green-50 text-green-600",
//     },
//     {
//       title: "Pending Consultations",
//       value: consultations.filter((c) => c.status === "pending").length,
//       change: "+3 this week",
//       icon: Clock,
//       color: "bg-yellow-50 text-yellow-600",
//     },
//     {
//       title: "Approved Consultations",
//       value: consultations.filter((c) => c.status === "approved").length,
//       change: "+5 this week",
//       icon: Check,
//       color: "bg-purple-50 text-purple-600",
//     },
//   ];

//   // Handle consultation status update
//   const updateConsultationStatus = (id, newStatus) => {
//     setConsultations(
//       consultations.map((c) => (c.id === id ? { ...c, status: newStatus } : c)),
//     );
//   };

//   // Handle property status toggle
//   const togglePropertyStatus = (id) => {
//     setProperties(
//       properties.map((p) =>
//         p.id === id
//           ? { ...p, status: p.status === "active" ? "inactive" : "active" }
//           : p,
//       ),
//     );
//   };

//   // Delete property
//   const deleteProperty = (id) => {
//     if (window.confirm("Are you sure you want to delete this property?")) {
//       setProperties(properties.filter((p) => p.id !== id));
//     }
//   };

//   // Filter consultations
//   const filteredConsultations = consultations.filter((c) => {
//     const matchesSearch =
//       c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       c.interest.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterStatus === "all" || c.status === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           <div>
//             <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
//               YARA Group Dashboard
//             </h1>
//             <p className="text-gray-600 mt-1 text-sm sm:text-base">
//               Manage properties and consultation requests
//             </p>
//           </div>
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
//             <button
//               onClick={() => setActiveTab("overview")}
//               className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
//                 activeTab === "overview"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Overview
//             </button>
//             <button
//               onClick={() => setActiveTab("properties")}
//               className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
//                 activeTab === "properties"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               <Building2 size={16} />
//               Properties
//             </button>
//             <button
//               onClick={() => setActiveTab("consultations")}
//               className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
//                 activeTab === "consultations"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               <Calendar size={16} />
//               Consultations
//               {consultations.filter((c) => c.status === "pending").length >
//                 0 && (
//                 <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                   {consultations.filter((c) => c.status === "pending").length}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-4 sm:p-6">
//         {/* Overview Tab */}
//         {activeTab === "overview" && (
//           <div>
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
//               {stats.map((stat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6"
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <p className="text-xs sm:text-sm font-medium text-gray-600">
//                       {stat.title}
//                     </p>
//                     <div
//                       className={`${stat.color} flex items-center p-2 rounded-lg`}
//                     >
//                       <stat.icon size={18} />
//                     </div>
//                   </div>
//                   <p className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
//                     {stat.value}
//                   </p>
//                   <div className="flex items-center text-xs sm:text-sm">
//                     <span className="text-gray-500">📈 {stat.change}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Recent Activity */}
//             <div className="grid lg:grid-cols-2 gap-6">
//               <div className="bg-white rounded-xl border border-gray-200 p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Recent Properties
//                 </h3>
//                 <div className="space-y-4">
//                   {properties.slice(0, 3).map((property) => (
//                     <div
//                       key={property.id}
//                       className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                     >
//                       <img
//                         src={property.image}
//                         alt={property.title}
//                         className="w-16 h-16 object-cover rounded-lg"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <div className="font-medium text-sm text-gray-900 truncate">
//                           {property.title}
//                         </div>
//                         <div className="text-gray-500 text-xs truncate">
//                           {property.location}
//                         </div>
//                       </div>
//                       <div className="text-blue-600 font-semibold text-sm whitespace-nowrap">
//                         {property.price}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl border border-gray-200 p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                   Recent Consultations
//                 </h3>
//                 <div className="space-y-4">
//                   {consultations.slice(0, 3).map((consultation) => (
//                     <div
//                       key={consultation.id}
//                       className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                     >
//                       <div className="flex-1 min-w-0">
//                         <div className="font-medium text-sm text-gray-900 truncate">
//                           {consultation.fullName}
//                         </div>
//                         <div className="text-gray-500 text-xs truncate">
//                           {consultation.interest}
//                         </div>
//                       </div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
//                           consultation.status === "pending"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : consultation.status === "approved"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {consultation.status}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Properties Tab */}
//         {activeTab === "properties" && (
//           <div>
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   Properties Management
//                 </h2>
//                 <p className="text-gray-600 text-sm">
//                   Manage all YARA Group properties
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowCreatePropertyModal(true)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
//               >
//                 <Plus size={18} />
//                 Add Property
//               </button>
//             </div>

//             {/* Properties Grid */}
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {properties.map((property) => (
//                 <div
//                   key={property.id}
//                   className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
//                 >
//                   <div className="relative h-48">
//                     <img
//                       src={property.image}
//                       alt={property.title}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute top-3 right-3">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           property.status === "active"
//                             ? "bg-green-100 text-green-700 border border-green-200"
//                             : "bg-gray-100 text-gray-700 border border-gray-200"
//                         }`}
//                       >
//                         {property.status}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="p-5">
//                     <div className="text-blue-600 text-xs uppercase tracking-wider font-semibold mb-2">
//                       {property.category}
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
//                       {property.title}
//                     </h3>
//                     <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
//                       <MapPin size={14} />
//                       <span className="line-clamp-1">{property.location}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
//                       <Building2 size={14} />
//                       {property.size}
//                     </div>

//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {property.features.slice(0, 3).map((feature, idx) => (
//                         <span
//                           key={idx}
//                           className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
//                         >
//                           {feature}
//                         </span>
//                       ))}
//                     </div>

//                     <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//                       <div className="text-xl font-bold text-blue-600">
//                         {property.price}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => togglePropertyStatus(property.id)}
//                           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                           title={
//                             property.status === "active"
//                               ? "Deactivate"
//                               : "Activate"
//                           }
//                         >
//                           {property.status === "active" ? (
//                             <Eye size={18} className="text-gray-600" />
//                           ) : (
//                             <EyeOff size={18} className="text-gray-400" />
//                           )}
//                         </button>
//                         <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                           <Edit2 size={18} className="text-gray-600" />
//                         </button>
//                         <button
//                           onClick={() => deleteProperty(property.id)}
//                           className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Consultations Tab */}
//         {activeTab === "consultations" && (
//           <div>
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Consultation Requests
//               </h2>
//               <p className="text-gray-600 text-sm">
//                 Manage client consultation bookings
//               </p>
//             </div>

//             {/* Filters */}
//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//               <div className="flex-1 relative">
//                 <Search
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search by name, email, or interest..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full bg-white border border-gray-300 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <Filter size={20} className="text-gray-400" />
//                 <select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   className="bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="approved">Approved</option>
//                   <option value="rejected">Rejected</option>
//                 </select>
//               </div>
//             </div>

//             {/* Consultations Table */}
//             <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="text-left p-4 text-sm font-semibold text-gray-700">
//                         Client
//                       </th>
//                       <th className="text-left p-4 text-sm font-semibold text-gray-700">
//                         Contact
//                       </th>
//                       <th className="text-left p-4 text-sm font-semibold text-gray-700">
//                         Interest
//                       </th>
//                       <th className="text-left p-4 text-sm font-semibold text-gray-700">
//                         Preferred Date
//                       </th>
//                       <th className="text-left p-4 text-sm font-semibold text-gray-700">
//                         Status
//                       </th>
//                       <th className="text-left p-4 text-sm font-semibold text-gray-700">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredConsultations.map((consultation, idx) => (
//                       <tr
//                         key={consultation.id}
//                         className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
//                           idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//                         }`}
//                       >
//                         <td className="p-4">
//                           <div className="font-medium text-gray-900">
//                             {consultation.fullName}
//                           </div>
//                           <div className="text-gray-500 text-xs">
//                             ID: #{consultation.id}
//                           </div>
//                         </td>
//                         <td className="p-4">
//                           <div className="flex items-center gap-2 text-sm mb-1">
//                             <Mail size={14} className="text-gray-400" />
//                             <span className="text-gray-700">
//                               {consultation.email}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-2 text-sm">
//                             <Phone size={14} className="text-gray-400" />
//                             <span className="text-gray-700">
//                               {consultation.phone}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="p-4">
//                           <div className="text-sm text-gray-900">
//                             {consultation.interest}
//                           </div>
//                           <div className="text-gray-500 text-xs mt-1 max-w-xs truncate">
//                             {consultation.message}
//                           </div>
//                         </td>
//                         <td className="p-4 text-sm text-gray-700">
//                           {consultation.preferredDate}
//                         </td>
//                         <td className="p-4">
//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                               consultation.status === "pending"
//                                 ? "bg-yellow-100 text-yellow-700"
//                                 : consultation.status === "approved"
//                                   ? "bg-green-100 text-green-700"
//                                   : "bg-red-100 text-red-700"
//                             }`}
//                           >
//                             {consultation.status}
//                           </span>
//                         </td>
//                         <td className="p-4">
//                           {consultation.status === "pending" && (
//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() =>
//                                   updateConsultationStatus(
//                                     consultation.id,
//                                     "approved",
//                                   )
//                                 }
//                                 className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
//                                 title="Approve"
//                               >
//                                 <Check size={18} />
//                               </button>
//                               <button
//                                 onClick={() =>
//                                   updateConsultationStatus(
//                                     consultation.id,
//                                     "rejected",
//                                   )
//                                 }
//                                 className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
//                                 title="Reject"
//                               >
//                                 <XCircle size={18} />
//                               </button>
//                             </div>
//                           )}
//                           {consultation.status !== "pending" && (
//                             <span className="text-gray-400 text-xs">
//                               No actions
//                             </span>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {filteredConsultations.length === 0 && (
//               <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200 mt-6">
//                 <Calendar size={48} className="mx-auto mb-4 opacity-40" />
//                 <p>No consultations found matching your criteria.</p>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Create Property Modal */}
//       {showCreatePropertyModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
//               <h2 className="text-2xl font-semibold text-gray-900">
//                 Add New Property
//               </h2>
//               <button
//                 onClick={() => setShowCreatePropertyModal(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Property Title *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., Luxury Villa - Eko Atlantic"
//                     className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Category *
//                   </label>
//                   <select className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                     <option value="">Select Category</option>
//                     <option value="real-estate">Real Estate</option>
//                     <option value="agriculture">Agriculture</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Property Type *
//                   </label>
//                   <select className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                     <option value="">Select Type</option>
//                     <optgroup label="Real Estate">
//                       <option value="residential">Residential</option>
//                       <option value="land-plots">Land & Plots</option>
//                       <option value="commercial">Commercial</option>
//                     </optgroup>
//                     <optgroup label="Agriculture">
//                       <option value="palm-plantation">Palm Plantation</option>
//                       <option value="farm-management">Farm Management</option>
//                       <option value="bulk-export">Bulk Palm Oil Export</option>
//                     </optgroup>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Location *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., Eko Atlantic, Lagos"
//                     className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Size *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., 5 Bedroom Duplex or 50 Hectares"
//                     className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Price *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g., ₦250M or Contact for Price"
//                     className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Features (comma separated)
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Waterfront, Smart Home, Pool, Gym"
//                   className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Image URL *
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="https://example.com/image.jpg"
//                   className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Or upload image when backend is connected
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Status
//                 </label>
//                 <div className="flex items-center gap-4">
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="status"
//                       value="active"
//                       defaultChecked
//                       className="text-blue-600"
//                     />
//                     <span className="text-gray-700">Active</span>
//                   </label>
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="status"
//                       value="inactive"
//                       className="text-blue-600"
//                     />
//                     <span className="text-gray-700">Inactive</span>
//                   </label>
//                 </div>
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
//                   Create Property
//                 </button>
//                 <button
//                   onClick={() => setShowCreatePropertyModal(false)}
//                   className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YaraAdminDashboard;

import React, { useState } from "react";
import {
  Building2,
  Calendar,
  Eye,
  EyeOff,
  Search,
  Filter,
  Check,
  XCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import { useFetchData, useMutateData, useDeleteData } from "../../hook/Request";

const YaraAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreatePropertyModal, setShowCreatePropertyModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch all consultations
  const { data: consultationsData, isLoading: loadingConsultations } =
    useFetchData("/consultation", "allConsultations");

  // Fetch consultation stats
  const { data: statsData } = useFetchData(
    "/api/v1/consultations/admin/stats",
    "consultationStats",
  );

  // Update consultation status mutation
  const { mutate: updateStatus } = useMutateData("allConsultations", "PATCH");

  // Delete consultation mutation
  const { mutate: deleteConsultation } = useDeleteData("allConsultations");

  // Get consultations from API
  const consultations = consultationsData?.data?.consultations || [];

  // Get stats from API
  const apiStats = statsData?.data?.stats || {};

  // Mock Data - Properties (keep this for now until properties API is ready)
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Luxury Villa - Eko Atlantic",
      location: "Eko Atlantic, Lagos",
      size: "5 Bedroom Duplex",
      type: "Residential",
      category: "Real Estate",
      price: "₦250M",
      status: "active",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80",
      features: ["Waterfront", "Smart Home", "Pool", "Gym"],
      createdAt: "2025-02-01",
    },
    {
      id: 2,
      title: "Premium Land - Banana Island",
      location: "Banana Island, Lagos",
      size: "1500 SQM",
      type: "Land & Plots",
      category: "Real Estate",
      price: "₦150M",
      status: "active",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80",
      features: ["Waterfront", "C of O", "Fully Serviced"],
      createdAt: "2025-01-28",
    },
    {
      id: 3,
      title: "Palm Plantation Estate",
      location: "Delta State",
      size: "50 Hectares",
      type: "Palm Plantation",
      category: "Agriculture",
      price: "₦75M",
      status: "active",
      image:
        "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=400&q=80",
      features: ["Mature Trees", "Processing Unit", "Road Access"],
      createdAt: "2025-01-25",
    },
    {
      id: 4,
      title: "Commercial Plaza - Victoria Island",
      location: "Victoria Island, Lagos",
      size: "2000 SQM",
      type: "Commercial",
      category: "Real Estate",
      price: "₦500M",
      status: "inactive",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
      features: ["Prime Location", "Parking", "Generator"],
      createdAt: "2025-01-20",
    },
  ]);

  // Stats using API data
  const stats = [
    {
      title: "Total Properties",
      value: properties.length,
      change: "+2 this month",
      icon: Building2,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Active Properties",
      value: properties.filter((p) => p.status === "active").length,
      change: "0% this month",
      icon: Eye,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Pending Consultations",
      value:
        apiStats.pendingConsultations ||
        consultations.filter((c) => c.status === "pending").length,
      change: "+3 this week",
      icon: Clock,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Approved Consultations",
      value:
        apiStats.approvedConsultations ||
        consultations.filter((c) => c.status === "approved").length,
      change: "+5 this week",
      icon: Check,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  // Handle consultation status update
  const updateConsultationStatus = (consultationId, newStatus) => {
    updateStatus(
      {
        url: `/api/v1/consultations/admin/${consultationId}/status`,
        data: { status: newStatus },
      },
      {
        onSuccess: () => {
          console.log(`Consultation ${newStatus} successfully`);
        },
        onError: (error) => {
          console.error("Error updating consultation:", error);
          alert("Failed to update consultation status");
        },
      },
    );
  };

  // Handle property status toggle
  const togglePropertyStatus = (id) => {
    setProperties(
      properties.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p,
      ),
    );
  };

  // Delete property
  const deleteProperty = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter((p) => p.id !== id));
    }
  };

  // Filter consultations
  const filteredConsultations = consultations.filter((c) => {
    const matchesSearch =
      c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.propertyInterest?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              YARA Group Dashboard
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Manage properties and consultation requests
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                activeTab === "overview"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("properties")}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                activeTab === "properties"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Building2 size={16} />
              Properties
            </button>
            <button
              onClick={() => setActiveTab("consultations")}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
                activeTab === "consultations"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Calendar size={16} />
              Consultations
              {consultations.filter((c) => c.status === "pending").length >
                0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {consultations.filter((c) => c.status === "pending").length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <div
                      className={`${stat.color} flex items-center p-2 rounded-lg`}
                    >
                      <stat.icon size={18} />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center text-xs sm:text-sm">
                    <span className="text-gray-500">📈 {stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Properties
                </h3>
                <div className="space-y-4">
                  {properties.slice(0, 3).map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900 truncate">
                          {property.title}
                        </div>
                        <div className="text-gray-500 text-xs truncate">
                          {property.location}
                        </div>
                      </div>
                      <div className="text-blue-600 font-semibold text-sm whitespace-nowrap">
                        {property.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Consultations
                </h3>
                <div className="space-y-4">
                  {consultations.slice(0, 3).map((consultation) => (
                    <div
                      key={consultation.id}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900 truncate">
                          {consultation?.fullName}
                        </div>

                        <div className="text-gray-500 text-xs truncate">
                          {consultation?.propertyInterest}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          consultation.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : consultation.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {consultation.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === "properties" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Properties Management
                </h2>
                <p className="text-gray-600 text-sm">
                  Manage all YARA Group properties
                </p>
              </div>
              <button
                onClick={() => setShowCreatePropertyModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus size={18} />
                Add Property
              </button>
            </div>

            {/* Properties Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          property.status === "active"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-gray-100 text-gray-700 border border-gray-200"
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-blue-600 text-xs uppercase tracking-wider font-semibold mb-2">
                      {property.category}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                      <MapPin size={14} />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                      <Building2 size={14} />
                      {property.size}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-xl font-bold text-blue-600">
                        {property.price}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => togglePropertyStatus(property.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title={
                            property.status === "active"
                              ? "Deactivate"
                              : "Activate"
                          }
                        >
                          {property.status === "active" ? (
                            <Eye size={18} className="text-gray-600" />
                          ) : (
                            <EyeOff size={18} className="text-gray-400" />
                          )}
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit2 size={18} className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => deleteProperty(property.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Consultations Tab */}
        {activeTab === "consultations" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Consultation Requests
              </h2>
              <p className="text-gray-600 text-sm">
                Manage client consultation bookings
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by name, email, or interest..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-gray-300 pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Consultations Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {loadingConsultations ? (
                <div className="p-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-600">Loading consultations...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left p-4 text-sm font-semibold text-gray-700">
                          Client
                        </th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-700">
                          Contact
                        </th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-700">
                          Interest
                        </th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-700">
                          Preferred Date
                        </th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="text-left p-4 text-sm font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredConsultations.map((consultation, idx) => (
                        <tr
                          key={consultation.id}
                          className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                            idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                        >
                          <td className="p-4">
                            <div className="font-medium text-gray-900">
                              {consultation.fullName}
                            </div>
                            <div className="text-gray-500 text-xs">
                              ID: #{consultation.id}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-sm mb-1">
                              <Mail size={14} className="text-gray-400" />
                              <span className="text-gray-700">
                                {consultation.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone size={14} className="text-gray-400" />
                              <span className="text-gray-700">
                                {consultation.phone}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-gray-900">
                              {consultation.propertyInterest}
                            </div>
                            <div className="text-gray-500 text-xs mt-1 max-w-xs truncate">
                              {consultation.message}
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-700">
                            {consultation.preferredDate
                              ? new Date(
                                  consultation.preferredDate,
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })
                              : "Not specified"}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                consultation.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : consultation.status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {consultation.status}
                            </span>
                          </td>
                          <td className="p-4">
                            {consultation.status === "pending" && (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    updateConsultationStatus(
                                      consultation.id,
                                      "approved",
                                    )
                                  }
                                  className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                                  title="Approve"
                                >
                                  <Check size={18} />
                                </button>
                                <button
                                  onClick={() =>
                                    updateConsultationStatus(
                                      consultation.id,
                                      "rejected",
                                    )
                                  }
                                  className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                  title="Reject"
                                >
                                  <XCircle size={18} />
                                </button>
                              </div>
                            )}
                            {consultation.status !== "pending" && (
                              <span className="text-gray-400 text-xs">
                                No actions
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {filteredConsultations.length === 0 && (
              <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-200 mt-6">
                <Calendar size={48} className="mx-auto mb-4 opacity-40" />
                <p>No consultations found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Property Modal */}
      {showCreatePropertyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                Add New Property
              </h2>
              <button
                onClick={() => setShowCreatePropertyModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Luxury Villa - Eko Atlantic"
                    className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select Category</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="agriculture">Agriculture</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select Type</option>
                    <optgroup label="Real Estate">
                      <option value="residential">Residential</option>
                      <option value="land-plots">Land & Plots</option>
                      <option value="commercial">Commercial</option>
                    </optgroup>
                    <optgroup label="Agriculture">
                      <option value="palm-plantation">Palm Plantation</option>
                      <option value="farm-management">Farm Management</option>
                      <option value="bulk-export">Bulk Palm Oil Export</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Eko Atlantic, Lagos"
                    className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 5 Bedroom Duplex or 50 Hectares"
                    className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ₦250M or Contact for Price"
                    className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Waterfront, Smart Home, Pool, Gym"
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Or upload image when backend is connected
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      defaultChecked
                      className="text-blue-600"
                    />
                    <span className="text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      className="text-blue-600"
                    />
                    <span className="text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Create Property
                </button>
                <button
                  onClick={() => setShowCreatePropertyModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YaraAdminDashboard;
