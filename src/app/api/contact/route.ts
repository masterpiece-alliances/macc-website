import { NextResponse } from 'next/server';
import { validateContactForm, sanitizeFormData, escapeHtml, ContactFormData } from '@/lib/sanitize';
import { rateLimit } from '@/lib/rate-limit';
// import nodemailer from 'nodemailer';

// 속도 제한 설정
const limiter = rateLimit({
  interval: 60 * 1000, // 1분
  uniqueTokenPerInterval: 10 // 최대 요청 수
});

export async function POST(req: Request) {
  try {
    // 속도 제한 확인
    const ip = req.headers.get('x-forwarded-for') || 
               req.headers.get('x-real-ip') || 
               'unknown';
    
    const remaining = await limiter.check(req);
    
    if (!remaining.success) {
      return NextResponse.json(
        { error: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.' },
        { 
          status: 429,
          headers: {
            'Retry-After': remaining.reset.toString(),
            'Content-Type': 'application/json'
          }
        }
      );
    }

    // 요청 본문 파싱
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        { error: '유효하지 않은 요청 형식입니다.' },
        { status: 400 }
      );
    }

    // 데이터 정리 및 유효성 검사
    const sanitizedData = sanitizeFormData<ContactFormData>(body as ContactFormData);
    const { isValid, errors } = validateContactForm(sanitizedData);

    if (!isValid) {
      return NextResponse.json(
        { error: '입력 데이터가 유효하지 않습니다.', details: errors },
        { status: 400 }
      );
    }

    const { name, email, phone, service, message } = sanitizedData;

    // 실제 이메일 전송 로직을 임시로 비활성화하고 콘솔에만 로그 남김
    console.log('문의 접수됨:', {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: phone ? escapeHtml(phone) : '미입력',
      service: escapeHtml(service),
      message: escapeHtml(message)
    });

    /* 
    // 트랜스포터 설정 (실제 사용 시 환경 변수로 관리)
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const adminEmail = process.env.ADMIN_EMAIL || 'leeyoon@ma-cc.co.kr';
    
    if (!emailUser || !emailPass) {
      console.error('이메일 서비스 자격 증명이 구성되지 않았습니다.');
      return NextResponse.json(
        { error: '서버 구성 오류가 발생했습니다. 관리자에게 문의하세요.' },
        { status: 500 }
      );
    }
    
    const transporter = nodemailer.createTransport({
      service: 'gmail', // 또는 다른 이메일 서비스
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      // TLS 설정 추가
      secure: true, // true면 TLS 사용
    });

    // 서비스 타입에 따른 한글 이름
    const serviceTypes: Record<string, string> = {
      business: '비즈니스 코칭',
      leadership: '리더십 코칭',
      career: '커리어 코칭',
      other: '기타',
    };

    // 관리자에게 보내는 이메일 설정
    const adminMailOptions = {
      from: `"Masterpiece Alliance 웹사이트" <${emailUser}>`,
      to: adminEmail,
      subject: `[웹사이트 문의] ${escapeHtml(name)}님의 ${serviceTypes[service] || escapeHtml(service)} 문의`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Masterpiece Alliance 웹사이트 문의</h2>
          <p>다음 고객으로부터 문의가 접수되었습니다:</p>
          <hr style="border: 1px solid #eaeaea; margin: 20px 0;" />
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 100px;">이름:</td>
              <td style="padding: 8px 0;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">이메일:</td>
              <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">연락처:</td>
              <td style="padding: 8px 0;">${phone ? escapeHtml(phone) : '미입력'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">서비스:</td>
              <td style="padding: 8px 0;">${serviceTypes[service] || escapeHtml(service)}</td>
            </tr>
          </table>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">문의 내용:</h3>
            <p style="white-space: pre-line;">${escapeHtml(message)}</p>
          </div>
          
          <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">
            본 메일은 Masterpiece Alliance 웹사이트의 문의 양식을 통해 자동 발송되었습니다.
          </p>
        </div>
      `,
    };

    // 고객에게 자동 회신 이메일 설정
    const customerMailOptions = {
      from: `"Masterpiece Alliance" <${emailUser}>`,
      to: email,
      subject: `[Masterpiece Alliance] 문의가 접수되었습니다`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">문의가 접수되었습니다</h2>
          <p><strong>${escapeHtml(name)}</strong>님, Masterpiece Alliance에 문의해 주셔서 감사합니다.</p>
          <p>귀하의 ${serviceTypes[service] || escapeHtml(service)} 관련 문의가 성공적으로 접수되었습니다.</p>
          <p>담당자가 검토 후 빠른 시간 내에 연락드리겠습니다.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">문의 내용:</h3>
            <p style="white-space: pre-line;">${escapeHtml(message)}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea;">
            <p style="margin: 5px 0;"><strong>Masterpiece Alliance</strong></p>
            <p style="margin: 5px 0;">문의: <a href="mailto:leeyoon@ma-cc.co.kr" style="color: #2563eb;">leeyoon@ma-cc.co.kr</a></p>
            <p style="margin: 5px 0;">전화: <a href="tel:+821034065414" style="color: #2563eb;">010-3406-5414</a></p>
            <p style="margin: 5px 0;">웹사이트: <a href="https://www.ma-cc.co.kr" style="color: #2563eb;">www.ma-cc.co.kr</a></p>
          </div>
        </div>
      `,
    };

    try {
      // 이메일 전송 - 관리자
      await transporter.sendMail(adminMailOptions);
      
      // 이메일 전송 - 고객 자동 회신
      await transporter.sendMail(customerMailOptions);
    } catch (error) {
      console.error('이메일 전송 오류:', error);
      return NextResponse.json(
        { error: '메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
        { status: 500 }
      );
    }
    */

    return NextResponse.json(
      { message: '문의가 성공적으로 접수되었습니다. 곧 답변 드리겠습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('문의 처리 오류:', error);
    return NextResponse.json(
      { error: '문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
} 