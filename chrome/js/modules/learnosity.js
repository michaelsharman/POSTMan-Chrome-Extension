var LN = {};
LN.request = {
    bodyData: [],
    clearBodyData: function(key, value) {
        LN.request.bodyData = [];
    },
    getBodyData: function() {
        return LN.request.bodyData;
    },
    setBodyData: function(key, value) {
        LN.request.bodyData[key] = value;
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
        if (requestBody.security.valid) {
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
            if (security.user_id === undefined) {
                preHash = preHash.concat(security.consumer_key, '_', security.domain, '_', security.timestamp, '_', security.consumer_secret);
            } else {
                preHash = preHash.concat(security.consumer_key, '_', security.domain, '_', security.timestamp, '_', security.user_id, '_', security.consumer_secret);
            }
            // Nasty hack to give the ability to not sign requests (a-la author api)
            if (requestBody.request.valid && data.nosignrequest === undefined) {
                preHash = preHash.concat('_', requestBody.request.data);
            }
            if (requestBody.action.valid) {
                preHash = preHash.concat('_', requestBody.action.data);
            }
            hash = CryptoJS.SHA256(preHash);
            security.signature = hash.toString();
            delete security.consumer_secret;
            LN.request.bodyData.security = JSON.stringify(security);
        }
    }
};

$(function() {
    // Setup a visual cue for each environment type
    $('#request-builder').append('<div class="row"><div id="env-alert" class="span7"></div></div>');
    var $envAlert = $('#env-alert');

    // Set the environment visual cue based on the environment selection
    $('#environment-selector').on("click", ".environment-list-item", function () {
        var id = $(this).attr('data-id');
        var selectedEnv = pm.envManager.getEnvironmentFromId(id);
        var cssClass = 'info';
        if (selectedEnv.name.indexOf('Production') >= 0) {
            cssClass = 'error';
        } else if (selectedEnv.name.indexOf('Development') >= 0) {
            cssClass = 'success';
        }
        $envAlert.html('<div class="alert alert-' + cssClass + '">You are pointing at <strong>' + selectedEnv.name + '</strong></div>');
    });
});
