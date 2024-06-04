import { Resend } from 'resend';
import { readBody } from 'h3';


const resend = new Resend("re_LHrfn4H7_NVeVr4z8U91g4SCQP5aKNvVi");

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event); // Use readBody to extract POST data
    const { to, subject, html } = body;

    const data = await resend.emails.send({
      from: 'TechInnovative Solutions <TechInnovative@fh-kiel.com>',
      to: [to],
      subject: subject,
      html: html,
    });

    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    return { error: error.message };;
  }
});
