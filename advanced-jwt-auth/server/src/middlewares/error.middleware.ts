import type { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api.error';

export default function errorMiddleware(
	err: Error | ApiError,
	request: Request,
	response: Response,
	next: NextFunction
) {
	console.error(err);

	if (err instanceof ApiError) {
		response.status(err.status).json({
			success: false,
			message: err.message,
			errors: err.errors
		});
	} else {
		response.status(500).json({ message: 'Something went wrong' });
	}
}
