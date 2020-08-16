const app = require("./app")

const port = process.env.port || 3000

async function main() {
    await app.listen(port);
    console.log('Server is running: ' + port);
}

main();