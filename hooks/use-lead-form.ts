'use client';

import { useState } from 'react';
import { validateEmail, validatePhone, sanitizeInput } from '@/lib/analytics-utils';

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  service_requested?: string;
  message?: string;
  lead_type?: 'quote' | 'general' | 'inquiry';
}

interface UseLeadFormReturn {
  formData: LeadFormData;
  isSubmitting: boolean;
  error: string | null;
  success: boolean;
  updateField: (field: keyof LeadFormData, value: string) => void;
  submitLead: () => Promise<void>;
  resetForm: () => void;
}

export function useLeadForm(initialData?: Partial<LeadFormData>): UseLeadFormReturn {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    service_requested: '',
    message: '',
    lead_type: 'general',
    ...initialData,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateField = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) {
      return 'Name is required';
    }

    if (!formData.phone && !formData.email) {
      return 'Either phone or email is required';
    }

    if (formData.email && !validateEmail(formData.email)) {
      return 'Please enter a valid email address';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      return 'Please enter a valid phone number';
    }

    return null;
  };

  const submitLead = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Get visitor hash from session storage if available
      const visitorHash = sessionStorage.getItem('visitor_hash');

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          visitor_hash: visitorHash,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit lead');
      }

      setSuccess(true);
      
      // Store visitor hash for future tracking
      if (result.lead?.id) {
        sessionStorage.setItem('last_lead_id', result.lead.id);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      service_requested: '',
      message: '',
      lead_type: 'general',
      ...initialData,
    });
    setError(null);
    setSuccess(false);
  };

  return {
    formData,
    isSubmitting,
    error,
    success,
    updateField,
    submitLead,
    resetForm,
  };
}
