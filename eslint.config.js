import { ignoreFile } from '@shgysk8zer0/eslint-config/ignoreFile.js';
import node from '@shgysk8zer0/eslint-config/browser.js';

export default [ignoreFile, node({ files: ['**/*.js'] })];
