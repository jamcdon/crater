const http = require('http');

const config = {
    host: "0.0.0.0",
    port: 3000,
    timeout: 4000
};

const healthCheck = http.request(config, (res) => {
    if (res.statusCode == 200) {
        process.exit(0);
    }
    else {
        process.exit(1);
    }
});

healthCheck.on('error', (err) => {
    console.error('ERROR');
    process.exit(1);
})

healthCheck.end();