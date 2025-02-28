import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT ?? 5000;

const start = async (pathToApp: string) => {
	try {
		import(pathToApp).then((module) =>
			module.default.listen(PORT, () => {
				const appName = path.basename(pathToApp, '.ts');
				console.log(`App ${appName} started on port ${PORT}`);
			}),
		);
	} catch (error) {
		console.error(error);
	}
};

export default start;
