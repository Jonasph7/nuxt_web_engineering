import { Resend } from 'resend';

const resend = new Resend("re_LHrfn4H7_NVeVr4z8U91g4SCQP5aKNvVi");

export default defineEventHandler(async () => {
  try {
    const data = await resend.emails.send({
      from: 'Acme <resend@fh-kiel.com>',
      to: ['lukasjohannesmoeller@proton.me'],
      subject: 'Hello world',
      html: '<strong>It works!</strong>',
    });

    return data;
  } catch (error) {
    return { error };
  }
});
