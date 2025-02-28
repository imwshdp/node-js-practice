import path from 'path';

import start from './src/server';

const appToRun = process.env.APP_TO_RUN;

if (!appToRun) {
	console.error('Please specify an app to run using the APP_TO_RUN environment variable.');
	process.exit(1);
}

let appPath = path.join(__dirname, 'src', 'apps');

switch (appToRun) {
	case 'webSockets':
		appPath = path.join(appPath, 'webSockets.ts');
		break;
	case 'eventSourcing':
		appPath = path.join(appPath, 'eventSourcing.ts');
		break;
	case 'longPolling':
		appPath = path.join(appPath, 'longPolling.ts');
		break;
	default:
		console.error(`Invalid app specified: ${appToRun}`);
		process.exit(1);
}

start(appPath);
