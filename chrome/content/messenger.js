var ColumnHandler = {
    isString: function ( ) { return true; },

    getCellText: function ( aRow, aCol ) {
        return gDBView.getMsgHdrAt(aRow).getStringProperty("x-spam-score");
    },

    getSortStringForRow: function ( aHdr ) {
        return aHdr.getStringProperty("x-spam-score");
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
