import React, { useCallback, useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { validateImageFile, formatFileSize } from '../utils/fileUtils';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
  selectedFile?: File;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  error,
  selectedFile,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validationError = validateImageFile(file);
      if (!validationError) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validationError = validateImageFile(file);
      if (!validationError) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const removeFile = () => {
    onFileSelect(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        Company Logo (Optional)
      </label>
      
      {selectedFile ? (
        <div className="border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image className="w-8 h-8 text-primary-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
            dragActive
              ? 'border-primary-500 bg-primary-50'
              : error
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/gif"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="text-center">
            <Upload className={`mx-auto h-12 w-12 ${
              dragActive ? 'text-primary-600' : 'text-gray-400'
            }`} />
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900">
                Drop your logo here, or{' '}
                <span className="text-primary-600">browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPEG, GIF up to 16MB
              </p>
            </div>
          </div>
        </div>
      )}
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};