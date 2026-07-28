 import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

/**
 * Creates Ethereal transporter once.
 */
async function getTransporter() {
  if (transporter) {
    return transporter;
  }

  console.log("Creating Ethereal Account...");

  const testAccount = await nodemailer.createTestAccount();

  console.log("========================================");
  console.log("ETHEREAL ACCOUNT");
  console.log(testAccount);
  console.log("========================================");

  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return transporter;
}

/**
 * Common Mail Sender
 */
async function sendMail(
  to: string,
  subject: string,
  html: string,
) {
  const mailer = await getTransporter();

  const info = await mailer.sendMail({
    from: '"PropIntel-AI" <no-reply@propintel.ai>',
    to,
    subject,
    html,
  });

  console.log("========================================");
  console.log("MESSAGE ID:");
  console.log(info.messageId);

  console.log("PREVIEW URL:");
  console.log(nodemailer.getTestMessageUrl(info));

  console.log("========================================");

  return info;
}

/**
 * Password Reset Email
 */
export async function sendPasswordResetEmail(
  email: string,
  name: string,
  resetUrl: string,
) {
  try {
    await sendMail(
      email,
      "Reset Your Password",
      `
      <div style="font-family:Arial;padding:20px">

        <h2>Hello ${name},</h2>

        <p>
          We received a request to reset your password.
        </p>

        <p>
          Click the button below to reset it.
        </p>

        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#2563eb;
            color:white;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Reset Password
        </a>

        <p style="margin-top:25px">
          This link expires in 15 minutes.
        </p>

        <p>
          If you didn't request this,
          you can safely ignore this email.
        </p>

      </div>
      `,
    );
  } catch (err) {
    console.error("PASSWORD RESET EMAIL ERROR");
    console.error(err);
    throw err;
  }
}

/**
 * Email Verification
 */
export async function sendVerificationEmail(
  email: string,
  name: string,
  verificationUrl: string,
) {
  try {
    await sendMail(
      email,
      "Verify Your Email",
      `
      <div style="font-family:Arial;padding:20px">

        <h2>Welcome to PropIntel-AI, ${name}!</h2>

        <p>
          Thank you for creating your account.
        </p>

        <p>
          Please verify your email address before
          accessing all features.
        </p>

        <a
          href="${verificationUrl}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#16a34a;
            color:white;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Verify Email
        </a>

        <p style="margin-top:25px">
          This verification link expires in
          <strong>24 hours</strong>.
        </p>

        <p>
          If you didn't create this account,
          simply ignore this email.
        </p>

      </div>
      `,
    );
  } catch (err) {
    console.error("EMAIL VERIFICATION ERROR");
    console.error(err);
    throw err;
  }
}