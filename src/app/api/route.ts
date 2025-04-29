import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

// 속도 제한 설정
const limiter = rateLimit({
  interval: 60 * 1000, // 1분
  uniqueTokenPerInterval: 500
});

// API 요청 ID 생성 함수
function generateRequestId(): string {
  return `req_${Math.random().toString(36).substring(2, 15)}`;
}

// 요청 헤더 검증
function validateHeaders(request: Request): boolean {
  // 필요한 헤더 검증 로직 추가
  const contentType = request.headers.get('content-type');
  return !!contentType && contentType.includes('application/json');
}

export async function GET(request: Request) {
  try {
    // 요청 ID 생성 (로깅용)
    const requestId = generateRequestId();
    
    // 속도 제한 확인
    const remaining = await limiter.check(request);
    
    if (!remaining.success) {
      console.warn(`[${requestId}] 요청 제한 초과: ${request.url}`);
      return new NextResponse(JSON.stringify({
        error: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
        requestId,
        retryAfter: remaining.reset
      }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': remaining.reset.toString(),
          'X-Request-ID': requestId
        }
      });
    }

    // API 로직
    const data = {
      message: '성공',
      requestId
    };

    return NextResponse.json(data, {
      headers: {
        'X-Request-ID': requestId
      }
    });
  } catch (error) {
    const requestId = generateRequestId();
    console.error(`[${requestId}] API 오류:`, error);
    return new NextResponse(JSON.stringify({
      error: '서버 내부 오류가 발생했습니다.',
      requestId
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': requestId
      }
    });
  }
}

export async function POST(request: Request) {
  try {
    // 요청 ID 생성 (로깅용)
    const requestId = generateRequestId();
    
    // 헤더 검증
    if (!validateHeaders(request)) {
      return new NextResponse(JSON.stringify({
        error: '유효하지 않은 헤더 형식입니다.',
        requestId
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': requestId
        }
      });
    }
    
    // 속도 제한 확인
    const remaining = await limiter.check(request);
    
    if (!remaining.success) {
      console.warn(`[${requestId}] 요청 제한 초과: ${request.url}`);
      return new NextResponse(JSON.stringify({
        error: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
        requestId,
        retryAfter: remaining.reset
      }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': remaining.reset.toString(),
          'X-Request-ID': requestId
        }
      });
    }

    // 요청 본문 파싱
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.warn(`[${requestId}] 잘못된 요청 형식:`, error);
      return new NextResponse(JSON.stringify({
        error: '유효하지 않은 요청 형식입니다.',
        requestId
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': requestId
        }
      });
    }
    
    // 본문 유효성 검증
    if (!body || typeof body !== 'object') {
      return new NextResponse(JSON.stringify({
        error: '유효하지 않은 요청 본문입니다.',
        requestId
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': requestId
        }
      });
    }

    // API 로직
    const data = {
      message: '성공',
      requestId,
      received: body
    };

    return NextResponse.json(data, {
      headers: {
        'X-Request-ID': requestId
      }
    });
  } catch (error) {
    const requestId = generateRequestId();
    console.error(`[${requestId}] API 오류:`, error);
    return new NextResponse(JSON.stringify({
      error: '서버 내부 오류가 발생했습니다.',
      requestId
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': requestId
      }
    });
  }
} 