import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendCustomEmail(
    to: string,
    subject: string,
    text: string,
    cc: string[] = [],
  ) {
    const msg = {
      to,
      from: 'ranuga.desitha@gmail.com',
      subject,
      text,
      cc: cc.length > 0 ? cc : undefined, // Include cc only if it's provided
    };

    try {
      var res = await sgMail.send(msg);
      console.log(res);
    } catch (error) {
      if (error.response) {
        console.error('SendGrid response:', error.response.body);
      }
      throw error;
    }
  }
}
