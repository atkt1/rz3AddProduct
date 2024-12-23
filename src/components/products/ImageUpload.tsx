import { useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  error?: string;
}

export function ImageUpload({ onImageSelect, error }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    onImageSelect(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200">
        Product Image
      </label>
      
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="product-image"
        />
        
        <label
          htmlFor="product-image"
          className={`
            relative flex flex-col items-center justify-center w-full h-64
            border-2 border-dashed rounded-lg cursor-pointer
            transition-colors duration-200
            ${error 
              ? 'border-red-500 bg-red-500/10' 
              : 'border-gray-600 bg-gray-800/50 hover:bg-gray-800'
            }
          `}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="text-sm text-gray-400">
                Click to upload product image
              </p>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG up to 5MB
              </p>
            </div>
          )}
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}