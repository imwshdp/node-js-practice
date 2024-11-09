declare namespace NodeJS {
	interface ProcessEnv {
		PORT?: string;
		MONGODB_CONNECTION_URL?: string;
		JWT_ACCESS_SECRET_KEY?: string;
		JWT_REFRESH_SECRET_KEY?: string;
		SMTP_HOST?: string;
		SMTP_PORT?: string;
		SMTP_USER?: string;
		SMTP_PASSWORD?: string;
		API_URL?: string;
		CLIENT_URL?: string;
	}
}
