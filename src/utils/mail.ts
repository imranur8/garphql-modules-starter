import * as dotenv from "dotenv";
import * as nodemailer from "nodemailer";
import * as  smtpTransport from "nodemailer-smtp-transport";
import logger from "./logger";

dotenv.config();

const mailService = class MailService {
  public transporter: any = null;

  constructor() {
    // initialize nodemailer transporter with smtpTransporter
    this.transporter = nodemailer.createTransport(smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
      }
    }));
  }

  /**
   * Sends email
   * @param emailOption
   * @returns
   */
  public async send(emailOption) {
    try {
      const status = await this.transporter.sendMail(emailOption);
      return status;
    } catch (error) {
      logger.error(error.toString());
      throw error;
    }
  }
};

export default mailService;
