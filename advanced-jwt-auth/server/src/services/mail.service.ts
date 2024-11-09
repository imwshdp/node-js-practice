import nodemailer, { Transporter } from 'nodemailer';

class MailService {
	public transporter: Transporter;
	public email: string;

	constructor() {
		const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

		if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
			throw new Error('SMTP environment variables are missing');
		}

		this.transporter = nodemailer.createTransport({
			host: SMTP_HOST,
			port: Number(SMTP_PORT),
			secure: Number(SMTP_PORT) === 465,
			auth: {
				user: SMTP_USER,
				pass: SMTP_PASSWORD
			}
		});

		this.email = SMTP_USER;
	}

	async sendActivationMail({ link, toEmail }: { toEmail: string; link: string }) {
		await this.transporter.sendMail({
			from: this.email,
			to: toEmail,
			subject: 'Account activation',
			html: `
				<div>
					<h1>Click the link below to activate your account</h1>
					<a href="${link}">Activate</a>
					</h1>
				</div>`
		});
	}
}

export default new MailService();
