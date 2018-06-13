const fetch = require('node-fetch');
// URL status check function makes GET requests to provided list of URLs to get status codes / errors

// Delay helper to prevent too many requests at once
const sleeper = (ms) => (x) => new Promise(resolve => setTimeout(() => resolve(x), ms));

// Checks status code of provided links and return object organized by errors / statuscodes
const requestCheck = async (urls) => {
  const parsedUrls = {
    ERROR: [],
    STATUSCODE: {}
  };
  for (let i = 0; i < urls.length; i++) {
    let linkName = Object.keys(urls[i])[0];
    let url = Object.values(urls[i])[0];

    // Skip for mailto email links
    if(url[0] !== 'h') {
      continue;
    }
    const status = await fetch(url, { timeout: 10000})
      .then(async (res) => {
        let statusCode = await res.status;
        if(!parsedUrls['STATUSCODE'][statusCode]) {
          parsedUrls['STATUSCODE'][statusCode] = [];
        }
        parsedUrls['STATUSCODE'][statusCode].push({[linkName]: url});
      })
      .then(sleeper(500))
      .catch((err) => {
        parsedUrls['ERROR'].push({[linkName]: url});
      })
  }
  return await parsedUrls;
}

// Get urls with errors/status codes organized into an object
const	getURLStatusCodeCollection = async function(urls) {
	// const parsedUrls = await getUrlLinks(urls);
  const checkStatus = await requestCheck(urls);
  // Log out number of links with errors/status codes
  console.log(`
URL STATUSCODE RESULTS:
${'-'.repeat(66)}
  ERRORS: \x1b[31m${checkStatus['ERROR'].length}\x1b[0m
  STATUSCODE:`);
  for(let code in checkStatus['STATUSCODE']) {
    let preColor = '\x1b[33m';
    if (code == '200') {
      preColor = '\x1b[32m';
    } else if (Number(code) >= 400) {
      preColor = '\x1b[31m';
    }
    console.log(`    ${code}: ${preColor + checkStatus['STATUSCODE'][code].length}\x1b[0m`);
  }
  return checkStatus;
};

module.exports = getURLStatusCodeCollection;