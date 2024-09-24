const fs = require('fs');
const envConfigFile = `export const environment = {
  production: true,
  sanity: {
    projectId: '${process.env.SANITY_PROJECT_ID}',
    dataset: '${process.env.SANITY_DATASET}',
    apiVersion: '${process.env.SANITY_API_VERSION}',
    useCdn: ${process.env.SANITY_USE_CDN},
  },
  FORM_ACCESS_KEY: '${process.env.FORM_ACCESS_KEY}',
};
`;

fs.writeFile('./src/environments/environment.production.ts', envConfigFile, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Environment config file generated!');
});
