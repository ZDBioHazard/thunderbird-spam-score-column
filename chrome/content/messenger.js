function getSpamScore ( aHdr ) {
    var score = parseFloat(aHdr.getStringProperty("x-spam-score"));

    if ( isNaN(score) )
        return "";

    return score.toFixed(3);
}

var ColumnHandler = {
    isString: function ( ) { return false; },

    getCellText: function ( aRow, aCol ) {
        return getSpamScore(gDBView.getMsgHdrAt(aRow));
    },

    getSortLongForRow: function ( aHdr ) {
        // Good for scores above -1000000.000 (Negative one million.)
        return (parseFloat(getSpamScore(aHdr)) * 1000) + 10000000000;
    },
};

var CreateDBObserver = {
    observe: function ( aMsgFolder, aTopic, aData ) {
        gDBView.addColumnHandler("colSpamScore", ColumnHandler);
    },
};

function doOnceLoaded ( ) {
    var observer_service = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
    observer_service.addObserver(CreateDBObserver, "MsgCreateDBView", false);

    // Add the "X-Spam-Score" header to the DB list if it's not present.
    var user_prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    var db_headers = user_prefs.getCharPref("mailnews.customDBHeaders");
    if ( db_headers.split(" ").indexOf("x-spam-score") == -1 )
        user_prefs.setCharPref("mailnews.customDBHeaders", db_headers + " x-spam-score");
};

window.addEventListener("load", doOnceLoaded, false);
