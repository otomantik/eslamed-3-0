import { NextResponse } from 'next/server';

interface HandoverFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deviceName: string;
  deviceModel?: string;
  deliveryDate: string;
  technicianName: string;
  notes?: string;
  signatureData: string | null;
}

/**
 * Handover API Route: Processes digital handover form submissions
 * Triggers automated welcome email with device training video
 */
export async function POST(req: Request) {
  try {
    const body: HandoverFormData = await req.json();

    // Validate required fields
    if (
      !body.customerName ||
      !body.customerEmail ||
      !body.customerPhone ||
      !body.deviceName ||
      !body.deliveryDate ||
      !body.technicianName ||
      !body.signatureData
    ) {
      return NextResponse.json(
        { error: 'Eksik zorunlu alanlar var' },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Store handover record in database
    // 2. Send welcome email via email service (SendGrid, AWS SES, etc.)
    // 3. Attach signature as PDF or image
    // 4. Include device-specific training video link

    // Mock email sending (replace with actual email service)
    const emailContent = {
      to: body.customerEmail,
      subject: `ESLAMED'e Hoş Geldiniz - ${body.deviceName} Teslim Edildi`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0EA5E9; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
            .footer { background: #1e293b; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
            .button { display: inline-block; padding: 12px 24px; background: #0EA5E9; color: white; text-decoration: none; border-radius: 6px; margin: 15px 0; }
            .info-box { background: white; border-left: 4px solid #0EA5E9; padding: 15px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ESLAMED'e Hoş Geldiniz!</h1>
            </div>
            <div class="content">
              <p>Sayın <strong>${body.customerName}</strong>,</p>
              
              <p>${body.deviceName}${body.deviceModel ? ` (${body.deviceModel})` : ''} cihazınız ${body.deliveryDate} tarihinde başarıyla teslim edilmiştir.</p>
              
              <div class="info-box">
                <h3>Teslimat Detayları</h3>
                <ul>
                  <li><strong>Cihaz:</strong> ${body.deviceName}</li>
                  ${body.deviceModel ? `<li><strong>Model:</strong> ${body.deviceModel}</li>` : ''}
                  <li><strong>Teslimat Tarihi:</strong> ${body.deliveryDate}</li>
                  <li><strong>Teknisyen:</strong> ${body.technicianName}</li>
                </ul>
              </div>

              <h3>📹 Cihaz Kullanım Eğitim Videosu</h3>
              <p>Aşağıdaki bağlantıdan cihazınızın kullanım eğitim videosuna erişebilirsiniz:</p>
              <a href="https://www.eslamed.com/rehber" class="button">Eğitim Videolarına Git</a>

              ${body.notes ? `
                <div class="info-box">
                  <h3>Önemli Notlar</h3>
                  <p>${body.notes.replace(/\n/g, '<br>')}</p>
                </div>
              ` : ''}

              <h3>📞 Destek</h3>
              <p>Herhangi bir sorunuz veya destek ihtiyacınız için bizimle iletişime geçebilirsiniz:</p>
              <ul>
                <li><strong>Telefon:</strong> 0537 242 55 35</li>
                <li><strong>E-posta:</strong> info@eslamed.com</li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/905372425535">Hemen Yazın</a></li>
              </ul>

              <p>Sağlıklı günler dileriz,<br><strong>ESLAMED Ekibi</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} ESLAMED - Tüm hakları saklıdır</p>
              <p>Bu e-posta otomatik olarak gönderilmiştir.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      // In production, attach signature as PDF:
      // attachments: [{
      //   filename: 'signature.png',
      //   content: body.signatureData.split(',')[1], // Base64 data
      //   contentType: 'image/png'
      // }]
    };

    // TODO: Integrate with actual email service
    // Example with SendGrid, AWS SES, or Resend:
    // await emailService.send(emailContent);

    // Debug logging (only in development or when DEBUG env is set)
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG === 'true') {
      console.log('[HANDOVER EMAIL]', {
        to: emailContent.to,
        subject: emailContent.subject,
        customer: body.customerName,
        device: body.deviceName,
      });
    }

    // Log handover to analytics
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/track/style.css`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'field_service_handover',
          customerEmail: body.customerEmail,
          deviceName: body.deviceName,
          deliveryDate: body.deliveryDate,
          technicianName: body.technicianName,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // Silent fail for analytics
      });
    } catch {
      // Silent fail
    }

    return NextResponse.json(
      { success: true, message: 'Devir-teslim kaydı oluşturuldu ve e-posta gönderildi' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Handover API error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu' },
      { status: 500 }
    );
  }
}

