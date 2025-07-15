export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsDataURL(file);
  });
};

export const validateImageFile = (file: File): string | null => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  const maxSize = 16 * 1024 * 1024; // 16MB

  if (!allowedTypes.includes(file.type)) {
    return 'Please upload a PNG, JPEG, or GIF image';
  }

  if (file.size > maxSize) {
    return 'File size must be less than 16MB';
  }

  return null;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};