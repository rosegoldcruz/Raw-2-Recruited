import { NextRequest, NextResponse } from 'next/server';

export function handleApiError(error: unknown, context: string) {
  console.error(`[${context}] Error:`, error);
  
  if (error instanceof Error) {
    return NextResponse.json(
      { 
        error: error.message,
        context,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
  
  return NextResponse.json(
    { 
      error: 'Internal server error',
      context,
      timestamp: new Date().toISOString()
    },
    { status: 500 }
  );
}

export function validateRequest(request: NextRequest, requiredFields: string[]) {
  const missingFields: string[] = [];
  
  for (const field of requiredFields) {
    if (!request.body || !JSON.parse(JSON.stringify(request.body))[field]) {
      missingFields.push(field);
    }
  }
  
  if (missingFields.length > 0) {
    return NextResponse.json(
      { 
        error: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields,
        timestamp: new Date().toISOString()
      },
      { status: 400 }
    );
  }
  
  return null;
}

export function logApiCall(request: NextRequest, context: string, duration?: number) {
  const logData = {
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    timestamp: new Date().toISOString(),
    context,
    duration: duration ? `${duration}ms` : undefined,
  };
  
  console.log(`[${context}] API Call:`, logData);
}

export function createSuccessResponse(data: any, context: string) {
  return NextResponse.json({
    success: true,
    data,
    context,
    timestamp: new Date().toISOString(),
  });
}

export function createErrorResponse(message: string, status: number = 400, context: string) {
  return NextResponse.json({
    success: false,
    error: message,
    context,
    timestamp: new Date().toISOString(),
  }, { status });
}
