import { AxiosError } from 'axios';

export function handleError(error: unknown) {
	if (error instanceof AxiosError) {
		console.error(error.response?.data?.message);
	} else if (error instanceof Error) {
		console.error(error.message);
	} else {
		console.error('An unexpected error occurred', error);
	}
}
