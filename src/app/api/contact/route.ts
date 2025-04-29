import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    // 필수 필드 검증
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: '모든 필수 항목을 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 실제 이메일 전송 로직을 임시로 비활성화하고 콘솔에만 로그 남김
    console.log('문의 접수됨:', {
      name,
      email,
      phone,
      service,
      message
    });

    /* 
    // 트랜스포터 설정 (실제 사용 시 환경 변수로 관리)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // 또는 다른 이메일 서비스
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
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
      from: `"Masterpiece Alliance 웹사이트" <${process.env.EMAIL_USER}>`,
      to: 'leeyoon@ma-cc.co.kr', // 회사 이메일 주소
      subject: `[웹사이트 문의] ${name}님의 ${serviceTypes[service] || service} 문의`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Masterpiece Alliance 웹사이트 문의</h2>
          <p>다음 고객으로부터 문의가 접수되었습니다:</p>
          <hr style="border: 1px solid #eaeaea; margin: 20px 0;" />
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 100px;">이름:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">이메일:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">연락처:</td>
              <td style="padding: 8px 0;">${phone || '미입력'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">서비스:</td>
              <td style="padding: 8px 0;">${serviceTypes[service] || service}</td>
            </tr>
          </table>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">문의 내용:</h3>
            <p style="white-space: pre-line;">${message}</p>
          </div>
          
          <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">
            본 메일은 Masterpiece Alliance 웹사이트의 문의 양식을 통해 자동 발송되었습니다.
          </p>
        </div>
      `,
    };

    // 고객에게 자동 회신 이메일 설정
    const customerMailOptions = {
      from: `"Masterpiece Alliance" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `[Masterpiece Alliance] 문의가 접수되었습니다`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">문의가 접수되었습니다</h2>
          <p><strong>${name}</strong>님, Masterpiece Alliance에 문의해 주셔서 감사합니다.</p>
          <p>귀하의 ${serviceTypes[service] || service} 관련 문의가 성공적으로 접수되었습니다.</p>
          <p>담당자가 검토 후 빠른 시간 내에 연락드리겠습니다.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">문의 내용:</h3>
            <p style="white-space: pre-line;">${message}</p>
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

    // 이메일 전송 - 관리자
    await transporter.sendMail(adminMailOptions);
    
    // 이메일 전송 - 고객 자동 회신
    await transporter.sendMail(customerMailOptions);
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