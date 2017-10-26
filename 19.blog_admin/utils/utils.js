const crypto = require('crypto');

module.exports = {
    md5(password){
        return crypto.createHash('md5').update(password).digest('hex');
    }
}
