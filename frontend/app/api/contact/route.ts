import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Transporter setup using your Gmail + App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // honeysartgalleryy@gmail.com
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    /* ==========================================
        1) EMAIL SENT TO YOU (GALLERY OWNER)
    ============================================ */
    await transporter.sendMail({
      from: `"Honey’s Art Gallery" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
      <div style="font-family:Arial; font-size:16px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
      `,
    });

    /* ==========================================
        2) CONFIRMATION EMAIL TO THE VISITOR
    ============================================ */
    const confirmationHTML = `
      <div style="font-family: 'Georgia', serif; color: #3b2f23; line-height: 1.7; font-size: 16px;">
        <p>Dear ${name},</p>

        <p>
          Thank you for reaching out to <strong>Honey’s Art Gallery</strong>.
          Your message has been received with care.
        </p>

        <p>
          Every inquiry — whether about prints, commissions, collaborations or simple appreciation —
          is read personally. You can expect a warm response within <strong>24 hours</strong>.
        </p>

        <p>
          Until then, may inspiration find you gently.
        </p>

        <br/>
        <p>Warm regards,</p>
        <p><strong>Honey’s Art Gallery</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Honey’s Art Gallery" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We’ve received your message — Honey’s Art Gallery",
      html: confirmationHTML,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
