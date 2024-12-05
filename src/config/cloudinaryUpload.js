export async function uploadImageToCloudinary(file) {
   
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Replace with your Cloudinary upload preset
  
    const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error uploading image:', errorData);
      throw new Error('Failed to upload image');
    }
  
    const data = await response.json();
    return data.secure_url; // Get the secure URL of the uploaded image
  }