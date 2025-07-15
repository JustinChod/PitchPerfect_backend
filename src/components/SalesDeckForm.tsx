import React, { useState } from 'react';
import { Presentation, Download, ArrowLeft } from 'lucide-react';
import { FormField } from './FormField';
import { FileUpload } from './FileUpload';
import { LoadingSpinner } from './LoadingSpinner';
import { apiService } from '../services/api';
import { convertFileToBase64 } from '../utils/fileUtils';
import { FormData, FormErrors, SalesDeckResponse } from '../types';

export const SalesDeckForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    industry: '',
    buyerPersona: '',
    mainPainPoint: '',
    useCase: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SalesDeckResponse | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    } else if (formData.companyName.length > 100) {
      newErrors.companyName = 'Company name must be less than 100 characters';
    }

    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required';
    } else if (formData.industry.length > 100) {
      newErrors.industry = 'Industry must be less than 100 characters';
    }

    if (!formData.buyerPersona.trim()) {
      newErrors.buyerPersona = 'Buyer persona is required';
    } else if (formData.buyerPersona.length > 200) {
      newErrors.buyerPersona = 'Buyer persona must be less than 200 characters';
    }

    if (!formData.mainPainPoint.trim()) {
      newErrors.mainPainPoint = 'Main pain point is required';
    } else if (formData.mainPainPoint.length > 500) {
      newErrors.mainPainPoint = 'Main pain point must be less than 500 characters';
    }

    if (!formData.useCase.trim()) {
      newErrors.useCase = 'Use case is required';
    } else if (formData.useCase.length > 500) {
      newErrors.useCase = 'Use case must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      let logoBase64 = '';
      if (formData.logo) {
        logoBase64 = await convertFileToBase64(formData.logo);
      }

      const requestData = {
        company_name: formData.companyName,
        industry: formData.industry,
        buyer_persona: formData.buyerPersona,
        main_pain_point: formData.mainPainPoint,
        use_case: formData.useCase,
        logo_base64: logoBase64,
      };

      const response = await apiService.generateSalesDeck(requestData);
      setResult(response);
    } catch (error) {
      setErrors({
        companyName: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const downloadUrl = apiService.getDownloadUrl(result.file_id);
      window.open(downloadUrl, '_blank');
    }
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      industry: '',
      buyerPersona: '',
      mainPainPoint: '',
      useCase: '',
    });
    setErrors({});
    setResult(null);
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Presentation className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sales Deck Generated Successfully!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Your presentation with {result.slides_generated} slides is ready for download.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              <strong>Filename:</strong> {result.filename}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Expires:</strong> {new Date(result.expires_at).toLocaleString()}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Presentation</span>
            </button>
            
            <button
              onClick={resetForm}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Create Another</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Presentation className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sales Deck Generator
          </h1>
          <p className="text-gray-600">
            Create professional sales presentations powered by AI
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={(value) => setFormData({ ...formData, companyName: value })}
            error={errors.companyName}
            placeholder="Enter your company name"
            maxLength={100}
            required
          />

          <FormField
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={(value) => setFormData({ ...formData, industry: value })}
            error={errors.industry}
            placeholder="e.g., Technology, Healthcare, Finance"
            maxLength={100}
            required
          />

          <FormField
            label="Buyer Persona"
            name="buyerPersona"
            value={formData.buyerPersona}
            onChange={(value) => setFormData({ ...formData, buyerPersona: value })}
            error={errors.buyerPersona}
            placeholder="e.g., IT Director, Marketing Manager, CEO"
            maxLength={200}
            required
          />

          <FormField
            label="Main Pain Point"
            name="mainPainPoint"
            type="textarea"
            value={formData.mainPainPoint}
            onChange={(value) => setFormData({ ...formData, mainPainPoint: value })}
            error={errors.mainPainPoint}
            placeholder="Describe the main challenge your prospect is facing"
            maxLength={500}
            rows={3}
            required
          />

          <FormField
            label="Use Case"
            name="useCase"
            type="textarea"
            value={formData.useCase}
            onChange={(value) => setFormData({ ...formData, useCase: value })}
            error={errors.useCase}
            placeholder="Describe how your solution addresses their specific needs"
            maxLength={500}
            rows={3}
            required
          />

          <FileUpload
            onFileSelect={(file) => setFormData({ ...formData, logo: file || undefined })}
            error={errors.logo}
            selectedFile={formData.logo}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" text="Generating your sales deck..." />
            ) : (
              <>
                <Presentation className="w-5 h-5" />
                <span>Generate Sales Deck</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};