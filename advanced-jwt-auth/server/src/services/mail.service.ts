class MailService {
	sendActivationMail = ({}: { toEmail: string; link: string }) => {};
}

export default new MailService();
