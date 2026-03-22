async function check() {
    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyAldY9TLEXhrMVGLngED47ZCwQKL1Chr7o");
        const data = await response.json();
        const fs = require('fs');
        fs.writeFileSync('error.log', JSON.stringify(data, null, 2), 'utf8');
    } catch(e) {
        const fs = require('fs');
        fs.writeFileSync('error.log', e.message, 'utf8');
    }
}
check();
