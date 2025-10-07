// API service functions for VR NextGEN Solutions

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Contact form submission - DEPRECATED: Use /api/contact endpoint instead
export async function submitContactForm(formData: ContactFormData): Promise<ApiResponse<void>> {
  try {
    // Redirect to secure API endpoint
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to send message'
      };
    }

    return {
      success: true,
      data: undefined
    };
  } catch (error) {
    // Ensure API errors stay isolated with a stable shape
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

// Future API functions can be added here
// - fetchClientLogos()
// - fetchTeamMembers()
// - fetchCaseStudies()
// etc.
