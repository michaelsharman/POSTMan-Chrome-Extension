var LN = {};
LN.request = {
    bodyData: [],
    setBodyData: function(key, value) {
        LN.request.bodyData[key] = value;
    },
    getBodyData: function() {
        return LN.request.bodyData;
    },
    signData: function() {
        // Hash the original data `security` and `request` keys and
        // add a signature key to the security packet.
        var data = LN.request.getBodyData(),
            preHash = '',
            hash,
            security,
            requestBody = {
                'security': {
                    'valid': false,
                    'data': null
                },
                'request': {
                    'valid': false,
                    'data': null
                },
                'action': {
                    'valid': false,
                    'data': null
                }
            };
        // Make sure the requestBody has all 3 required keys, otherwise we won't bother signing anything
        for (var key in data) {
            if (key === 'security' || key === 'request' || key === 'action') {
                requestBody[key].valid = true;
                requestBody[key].data = data[key];
            }
        }
        if (requestBody.security.valid && requestBody.request.valid && requestBody.action.valid) {
            var now = new Date();
            var timestamp = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
            timestamp = ''.concat(
                timestamp.getFullYear(),
                ('0' + (timestamp.getMonth()+1)).slice(-2),
                ('0' + (timestamp.getDate())).slice(-2), '-',
                ('0' + (timestamp.getHours())).slice(-2),
                ('0' + (timestamp.getMinutes())).slice(-2)
            );
            security = JSON.parse(requestBody.security.data);
            security.timestamp = timestamp;
            preHash = preHash.concat(security.consumer_key, '_', security.domain, '_', security.timestamp, '_', security.consumer_secret);
            preHash = preHash.concat('_', requestBody.request.data, '_', requestBody.action.data);
            hash = CryptoJS.SHA256(preHash);
            security.signature = hash.toString();
            delete security.consumer_secret;
            LN.request.bodyData.security = JSON.stringify(security);
        }
    }
};
