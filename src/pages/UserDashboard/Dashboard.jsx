// YaraAdminDashboard.jsx
import React, { useState } from "react";
import {
  Building2,
  Calendar,
  Eye,
  Search,
  Filter,
  Check,
  XCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Plus,
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { useFetchData, useMutateData, useDeleteData } from "../../hook/Request";
import { uploadMultipleToCloudinary } from "../../utils/cloudinaryUpload";

const YaraAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreatePropertyModal, setShowCreatePropertyModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Fetch all consultations
  const { data: consultationsData, isLoading: loadingConsultations } =
    useFetchData("/consultation", "allConsultations");

  // Fetch consultation stats
  const { data: statsData } = useFetchData(
    "/api/v1/consultations/admin/stats",
    "consultationStats",
  );

  // Fetch admin properties
  const { data: propertiesData, isLoading: loadingProperties } = useFetchData(
    "/property/admin",
    "adminProperties",
  );

  // Create property mutation
  const { mutate: createProperty, isLoading: isCreating } =
    useMutateData("adminProperties");

  // Update consultation status mutation
  const { mutate: updateStatus } = useMutateData("allConsultations", "PATCH");

  // Delete consultation mutation
  const { mutate: deleteConsultation } = useDeleteData("allConsultations");

  // Get consultations from API
  const consultations = consultationsData?.data?.consultations || [];

  // Get stats from API
  const apiStats = statsData?.data?.stats || {};

  // Get properties from API
  const properties = propertiesData?.data?.properties || [];

  // Form state for creating property
  const [propertyForm, setPropertyForm] = useState({
    title: "",
    location: "",
    size: "",
    type: "",
    category: "",
    price: "",
    status: "active",
    images: [],
    features: "",
  });

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

  // Handle image selection
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      alert("You can only upload a maximum of 5 images");
      return;
    }

    const validFiles = files.filter((file) => {
      const isValid = file.type.startsWith("image/");
      if (!isValid) {
        alert(`${file.name} is not a valid image file`);
      }
      return isValid;
    });

    const validSizedFiles = validFiles.filter((file) => {
      const isValidSize = file.size <= 5 * 1024 * 1024;
      if (!isValidSize) {
        alert(`${file.name} is too large. Max size is 5MB`);
      }
      return isValidSize;
    });

    if (validSizedFiles.length === 0) {
      return;
    }

    setSelectedImages(validSizedFiles);
    const previews = validSizedFiles.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  // Remove selected image
  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    URL.revokeObjectURL(imagePreview[index]);
    setSelectedImages(newImages);
    setImagePreview(newPreviews);
  };

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

  // Handle property form change
  const handlePropertyFormChange = (e) => {
    const { name, value } = e.target;
    setPropertyForm({
      ...propertyForm,
      [name]: value,
    });
  };

  // Handle create property with image upload
  const handleCreateProperty = async (e) => {
    e.preventDefault();

    if (selectedImages.length === 0) {
      alert("Please upload at least one property image");
      return;
    }

    try {
      setUploadingImages(true);

      let uploadedImageUrls = [];
      if (selectedImages.length > 0) {
        console.log("Uploading images to Cloudinary...");
        const uploadResults = await uploadMultipleToCloudinary(selectedImages);
        uploadedImageUrls = uploadResults.map((result) => result.url);
        console.log("Images uploaded successfully:", uploadedImageUrls);
      }

      const propertyData = {
        ...propertyForm,
        images: uploadedImageUrls,
        features: propertyForm.features
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f),
      };

      console.log("Creating property with data:", propertyData);

      createProperty(
        {
          url: "/property/admin",
          data: propertyData,
        },
        {
          onSuccess: () => {
            alert("Property created successfully!");
            setShowCreatePropertyModal(false);

            setPropertyForm({
              title: "",
              location: "",
              size: "",
              type: "",
              category: "",
              price: "",
              status: "active",
              images: [],
              features: "",
            });

            imagePreview.forEach((url) => URL.revokeObjectURL(url));
            setSelectedImages([]);
            setImagePreview([]);
          },
          onError: (error) => {
            console.error("Error creating property:", error);
            alert(error?.message || "Failed to create property");
          },
        },
      );
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setUploadingImages(false);
    }
  };

  // Close modal and cleanup
  const handleCloseModal = () => {
    setShowCreatePropertyModal(false);
    imagePreview.forEach((url) => URL.revokeObjectURL(url));
    setImagePreview([]);
    setSelectedImages([]);
    setPropertyForm({
      title: "",
      location: "",
      size: "",
      type: "",
      category: "",
      price: "",
      status: "active",
      images: [],
      features: "",
    });
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
                  {properties.slice(0, 3).map((property, index) => (
                    <div
                      key={property._id || index}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={
                          property.images?.[0] ||
                          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80"
                        }
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
                          {consultation.fullName}
                        </div>
                        <div className="text-gray-500 text-xs truncate">
                          {consultation.interest}
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
                  key={property._id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={
                        property.images?.[0] ||
                        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80"
                      }
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
                      {property.features?.slice(0, 3).map((feature, idx) => (
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

            {filteredConsultations.length === 0 && !loadingConsultations && (
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full my-8">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10 rounded-t-xl">
              <h2 className="text-2xl font-semibold text-gray-900">
                Add New Property
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={uploadingImages}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateProperty} className="p-6 space-y-6">
              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Images *
                </label>

                <div className="mb-4">
                  <label className="flex flex-col items-center justify-center gap-3 w-full bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg px-4 py-8 cursor-pointer hover:bg-blue-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <Upload className="text-blue-600" size={24} />
                      <ImageIcon className="text-blue-600" size={24} />
                    </div>
                    <div className="text-center">
                      <span className="text-blue-600 font-medium block">
                        Click to upload property images
                      </span>
                      <span className="text-gray-500 text-sm">
                        or drag and drop
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                      disabled={uploadingImages}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Upload 1-5 images. Max size: 5MB per image. Supported
                    formats: JPG, PNG, WebP
                  </p>
                </div>

                {imagePreview.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Selected Images ({imagePreview.length})
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {imagePreview.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            disabled={uploadingImages}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                            title="Remove image"
                          >
                            <X size={16} />
                          </button>
                          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                            Image {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={propertyForm.title}
                    onChange={handlePropertyFormChange}
                    required
                    minLength={3}
                    placeholder="e.g., Luxury Villa - Eko Atlantic"
                    className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={uploadingImages}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={propertyForm.category}
                    onChange={handlePropertyFormChange}
                    required
                    className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={uploadingImages}
                  >
                    <option value="">Select Category</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Agriculture">Agriculture</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    name="type"
                    value={propertyForm.type}
                    onChange={handlePropertyFormChange}
                    required
                    className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={uploadingImages}
                  >
                    <option value="">Select Type</option>
                    <optgroup label="Real Estate">
                      <option value="Residential">Residential</option>
                      <option value="Land & Plots">Land & Plots</option>
                      <option value="Commercial">Commercial</option>
                    </optgroup>
                    <optgroup label="Agriculture">
                      <option value="Palm Plantation">Palm Plantation</option>
                      <option value="Farm Management">Farm Management</option>
                      <option value="Bulk Export">Bulk Palm Oil Export</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={propertyForm.location}
                    onChange={handlePropertyFormChange}
                    required
                    minLength={3}
                    placeholder="e.g., Eko Atlantic, Lagos"
                    className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={uploadingImages}
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
                    name="size"
                    value={propertyForm.size}
                    onChange={handlePropertyFormChange}
                    required
                    minLength={2}
                    placeholder="e.g., 5 Bedroom Duplex or 50 Hectares"
                    className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={uploadingImages}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={propertyForm.price}
                    onChange={handlePropertyFormChange}
                    required
                    minLength={2}
                    placeholder="e.g., ₦250M or Contact for Price"
                    className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={uploadingImages}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  name="features"
                  value={propertyForm.features}
                  onChange={handlePropertyFormChange}
                  placeholder="e.g., Waterfront, Smart Home, Pool, Gym, 24/7 Security"
                  className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={uploadingImages}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate each feature with a comma
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Status *
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={propertyForm.status === "active"}
                      onChange={handlePropertyFormChange}
                      className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      disabled={uploadingImages}
                    />
                    <span className="text-gray-700 font-medium">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={propertyForm.status === "inactive"}
                      onChange={handlePropertyFormChange}
                      className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      disabled={uploadingImages}
                    />
                    <span className="text-gray-700 font-medium">Inactive</span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={
                    isCreating || uploadingImages || selectedImages.length === 0
                  }
                  className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    isCreating || uploadingImages || selectedImages.length === 0
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {uploadingImages ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Uploading Images...</span>
                    </>
                  ) : isCreating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating Property...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      <span>Create Property</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={uploadingImages || isCreating}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>

              {selectedImages.length === 0 && (
                <p className="text-sm text-amber-600 text-center bg-amber-50 p-3 rounded-lg">
                  ⚠️ Please upload at least one property image before creating
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default YaraAdminDashboard;
