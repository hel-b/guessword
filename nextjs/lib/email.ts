import { Resend } from "resend";

let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is required");
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

export async function sendEmail({
  from,
  to,
  subject,
  text,
}: {
  from: string;
  to: string;
  subject: string;
  text: string;
}): Promise<void> {
  if (!from) {
    throw new Error("From address required");
  }
  if (!to) {
    throw new Error("To address required");
  }
  if (!subject) {
    throw new Error("Subject required");
  }
  if (!text) {
    throw new Error("Email text required");
  }
  try {
    const resendClient = getResendClient();
    const data = await resendClient.emails.send({
      from,
      to,
      subject,
      text,
    });
    console.log(`Email ${data.data?.id} has been sent`);
  } catch (error) {
    console.error(error);
  }
}
