// utils/cloudinaryUpload.js
const CLOUDINARY_CLOUD_NAME = "dkzds0azx";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ebi2u3yu"); // Using your existing "checks" preset
  formData.append("folder", "yara_properties");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export const uploadMultipleToCloudinary = async (files) => {
  try {
    const uploadPromises = files.map((file) => uploadToCloudinary(file));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error("Multiple upload error:", error);
    throw error;
  }
};
