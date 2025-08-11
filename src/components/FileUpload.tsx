'use client';

import React, { useState, useRef } from 'react';

export interface FileUploadProps {
  onChange: (files: File[]) => void;
  onError?: (error: string) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  disabled?: boolean;
  className?: string;
  dropzoneText?: string;
  buttonText?: string;
  showPreview?: boolean;
  previewType?: 'list' | 'grid';
  variant?: 'default' | 'compact' | 'button-only';
  name?: string;
  required?: boolean;
  value?: File[];
  id?: string;
}

export default function FileUpload({
  onChange,
  onError,
  multiple = false,
  accept,
  maxSize,
  maxFiles = 5,
  disabled = false,
  className = '',
  dropzoneText = 'Drag and drop files here, or click to browse',
  buttonText = 'Browse Files',
  showPreview = true,
  previewType = 'list',
  variant = 'default',
  name,
  required = false,
  value,
  id,
}: FileUploadProps) {
  // State for selected files
  const [files, setFiles] = useState<File[]>(value || []);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Generate unique ID for accessibility
  const inputId = id || `file-upload-${Math.random().toString(36).substring(2, 9)}`;
  
  // Handle file selection
  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles || disabled) return;
    
    const fileArray = Array.from(selectedFiles);
    let validFiles: File[] = [];
    let errors: string[] = [];
    
    // Check max files
    if (multiple && fileArray.length + files.length > maxFiles) {
      const error = `You can only upload a maximum of ${maxFiles} files`;
      errors.push(error);
      if (onError) onError(error);
      return;
    }
    
    // Validate each file
    fileArray.forEach(file => {
      // Check file type if accept is specified
      if (accept) {
        const acceptTypes = accept.split(',').map(type => type.trim());
        const fileType = file.type;
        const fileExtension = `.${file.name.split('.').pop()}`;
        
        const isValidType = acceptTypes.some(type => {
          if (type.startsWith('.')) {
            // Extension check
            return fileExtension.toLowerCase() === type.toLowerCase();
          } else if (type.includes('*')) {
            // Wildcard MIME type check
            const [mainType, subType] = type.split('/');
            const [fileMainType, fileSubType] = fileType.split('/');
            return mainType === fileMainType && (subType === '*' || subType === fileSubType);
          } else {
            // Exact MIME type check
            return type === fileType;
          }
        });
        
        if (!isValidType) {
          const error = `File "${file.name}" has an invalid file type`;
          errors.push(error);
          if (onError) onError(error);
          return;
        }
      }
      
      // Check file size if maxSize is specified
      if (maxSize && file.size > maxSize) {
        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
        const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
        const error = `File "${file.name}" is too large (${fileSizeMB} MB). Maximum file size is ${maxSizeMB} MB`;
        errors.push(error);
        if (onError) onError(error);
        return;
      }
      
      validFiles.push(file);
    });
    
    if (validFiles.length > 0) {
      const newFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(newFiles);
      onChange(newFiles);
    }
  };
  
  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!disabled) {
      const droppedFiles = e.dataTransfer.files;
      handleFileChange(droppedFiles);
    }
  };
  
  // Handle file removal
  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onChange(newFiles);
  };
  
  // Handle click on dropzone
  const handleDropzoneClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Get file icon based on type
  const getFileIcon = (file: File) => {
    const fileType = file.type;
    
    if (fileType.startsWith('image/')) {
      return (
        <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      );
    } else if (fileType.startsWith('video/')) {
      return (
        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      );
    } else if (fileType.startsWith('audio/')) {
      return (
        <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
        </svg>
      );
    } else if (fileType === 'application/pdf') {
      return (
        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    } else if (fileType.includes('spreadsheet') || fileType.includes('excel')) {
      return (
        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
        </svg>
      );
    } else if (fileType.includes('document') || fileType.includes('word')) {
      return (
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    }
  };
  
  // Render file preview
  const renderFilePreview = () => {
    if (!showPreview || files.length === 0) return null;
    
    return (
      <div className={`mt-4 ${previewType === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-4' : 'space-y-2'}`}>
        {files.map((file, index) => (
          <div 
            key={`${file.name}-${index}`}
            className={`
              ${previewType === 'grid' 
                ? 'border rounded-lg p-3 bg-white shadow-sm' 
                : 'flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm'
              }
            `}
          >
            <div className={`${previewType === 'grid' ? '' : 'flex items-center space-x-3'}`}>
              {previewType === 'grid' && (
                <div className="flex justify-center mb-2">
                  {file.type.startsWith('image/') ? (
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={file.name}
                      className="h-24 object-contain rounded"
                    />
                  ) : (
                    <div className="h-24 w-full flex items-center justify-center bg-gray-100 rounded">
                      {getFileIcon(file)}
                    </div>
                  )}
                </div>
              )}
              
              {previewType === 'list' && (
                <div className="flex-shrink-0">
                  {getFileIcon(file)}
                </div>
              )}
              
              <div className={previewType === 'grid' ? '' : 'flex-1 min-w-0'}>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => handleRemoveFile(index)}
              className={`
                text-red-600 hover:text-red-800 focus:outline-none
                ${previewType === 'grid' ? 'mt-2 text-xs' : 'ml-2 flex-shrink-0'}
              `}
              disabled={disabled}
            >
              {previewType === 'grid' ? (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Remove
                </span>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  // Render dropzone
  const renderDropzone = () => {
    if (variant === 'button-only') {
      return (
        <button
          type="button"
          onClick={handleDropzoneClick}
          disabled={disabled}
          className={`
            inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white
            hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          {buttonText}
        </button>
      );
    }
    
    if (variant === 'compact') {
      return (
        <div
          className={`
            flex items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md
            ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
            ${className}
          `}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleDropzoneClick}
        >
          <div className="space-y-1 text-center">
            <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div className="text-sm text-gray-600">
              <label
                htmlFor={inputId}
                className="relative font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
              >
                {buttonText}
              </label>
            </div>
          </div>
        </div>
      );
    }
    
    // Default variant
    return (
      <div
        className={`
          flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md
          ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
          ${className}
        `}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleDropzoneClick}
      >
        <div className="space-y-1 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <div className="flex flex-col text-sm text-gray-600">
            <label
              htmlFor={inputId}
              className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            >
              <span>{dropzoneText}</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              {accept && `Allowed file types: ${accept}`}
              {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
              {multiple && maxFiles && ` • Max files: ${maxFiles}`}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-2">
      {renderDropzone()}
      
      <input
        ref={fileInputRef}
        id={inputId}
        name={name}
        type="file"
        className="sr-only"
        onChange={(e) => handleFileChange(e.target.files)}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        required={required}
      />
      
      {renderFilePreview()}
    </div>
  );
}
