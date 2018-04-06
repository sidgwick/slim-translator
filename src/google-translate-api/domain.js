
function getGoogleTranslatorDomain() {
    var offset = new Date().getTimezoneOffset();
    // Domain for China
    if (offset/60 == -8) {
        return "translate.google.cn"; 
    // Domain for rest of world
    } else { 
        return "translate.google.com"; 
    }
}

module.exports = getGoogleTranslatorDomain;