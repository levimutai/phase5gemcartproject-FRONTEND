import React, { useState } from 'react';

const ImageUpload = ({ onUpload, multiple = false, maxFiles = 5 }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(multiple ? [] : null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Create preview
    if (multiple) {
      const previews = files.map(file => URL.createObjectURL(file));
      setPreview(previews);
    } else {
      setPreview(URL.createObjectURL(files[0]));
    }

    uploadFiles(files);
  };

  const uploadFiles = async (files) => {
    setUploading(true);
    try {
      const formData = new FormData();
      
      if (multiple) {
        files.forEach(file => formData.append('images', file));
        const response = await fetch('/api/upload/multiple', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        onUpload(data.images);
      } else {
        formData.append('image', files[0]);
        const response = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        onUpload(data.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-400 transition-colors">
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
          disabled={uploading}
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          {uploading ? (
            <div className="text-gray-500">
              <div className="animate-spin text-2xl mb-2">⏳</div>
              <p>Uploading...</p>
            </div>
          ) : (
            <div className="text-gray-500">
              <div className="text-4xl mb-2">📸</div>
              <p className="text-lg font-medium">Click to upload {multiple ? 'images' : 'image'}</p>
              <p className="text-sm">PNG, JPG up to 10MB</p>
            </div>
          )}
        </label>
      </div>

      {/* Preview */}
      {preview && (
        <div className="space-y-2">
          <h4 className="font-medium">Preview:</h4>
          {multiple ? (
            <div className="grid grid-cols-3 gap-2">
              {preview.map((src, index) => (
                <img key={index} src={src} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded" />
              ))}
            </div>
          ) : (
            <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;