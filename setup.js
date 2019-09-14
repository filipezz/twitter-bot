import { writeFile } from 'fs';

writeFile(process.env.KEYS, process.env.GCP_CRED, (err) => {});