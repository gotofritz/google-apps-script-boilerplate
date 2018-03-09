/**
 * A Google Apps Script Boilerplate.
 * Needs to be copied and pasted inside a script associated with your Google
 * Drive documents. For more info,
 * http://gotofritz.net/blog/weekly-challenge/google-apps-script-boilerplate/
 */

// NOTE: in the world of GAS functions are not hoisted, so these need to be
// above the onOpen function below
function menu1(){ ns.menu1(); }
function menu2(){ ns.menu2(); }


/*
 * onOpen
 * creates script menus
 */
function onOpen() {
  // The Google servers are in California, and sometime timezone get all
  // messed up.
  // This tries to remedy that.
  SpreadsheetApp.getActiveSpreadsheet().setSpreadsheetTimeZone( 'GMT') ;

  var menuEntries = [];
  menuEntries.push({
    name: 'Entry 1',
    functionName: 'menu1'
  });

  // a null entry shows a divider
  menuEntries.push(null);

  menuEntries.push({
    name: 'Entry 2',
    functionName: 'menu2'
  });

  //create the menu
  SpreadsheetApp.getActiveSpreadsheet().addMenu('MY MENU', menuEntries);
}

// Create a namespace - at the time of writing this Google didn't allow scripts
// to be imported, but whow knows what the future may hold...
var ns = (function(){

// =========================================================
// PROPERTIES
// =========================================================
  var spr = SpreadsheetApp.getActiveSpreadsheet();

  /**
   * VAR NAMING CONVENTION
   * r1xxx = row for range (where first cell has ref 1,1)
   * c1xxx = column for range (where first cell has ref 1,1)
   * r0xxx = row for js arrays (where first cell has ref 0,0)
   * c0xxx = column js arrays (where first cell has ref 0,0)
   * rc1xx = a pair of range coordinates
   * rc0xx = a pair of js coordinates
   */

  // RANGE INDICES - the same as Excel Macros, 1-indexed
  var r1Start = 1;  //starting Row
  var c1Start = 1;  //starting column

  // JS INDICES - 0-index as typically returned from range.getValues()
  var r0End = spr.getLastRow() - 1;
  var c0End = spr.getLastColumn() - 1;

  //pairs of points
  var rc1Start = [ 1, 1 ];


// =========================================================
// PRIVATE METHODS
// the standard naming in GAS for private functions is xxxx_
// =========================================================
  /**
   * indexOf_
   * goes through a sheet, doing each row. It can be limited to a range
   * (by rows and by cell) and finds the first occurrence of a value
   * @private
   *
   * @param {String} findme the value to find
   * @param {Sheet} shFindme the sheet with the range
   * @param {Number} rFindmeFrom the range in which to search, default 1
   * @param {Number} cFindmeFrom the range in which to search, default 1
   * @param {Number} cFindmeTo the range in which to search, default getLastRow
   * @param {Number} cFindme the range in which to search, default getLastColumn
   * @return {Array} the row and column indexes of the cell, -1, -1 if not found
   */
  function  indexOf_( findme, shFindme, rFindmeFrom, cFindmeFrom, rFindmeTo, cFindmeTo) {
    var r, c;  //coords
    var r2, c2; //loop bounds
    var grid;  //gets the range as js multi array

    if (!shFindme) {
      return [ -1, -1 ];
    }
    rFindmeFrom = rFindmeFrom || 1;
    cFindmeFrom = cFindmeFrom || 1;
    rFindmeTo = rFindmeTo || shFindme.getLastRow();
    cFindmeTo = cFindmeTo || shFindme.getLastColumn();

    grid = shFindme
      .getRange(rFindmeFrom, cFindmeFrom, rFindmeTo, cFindmeTo)
      .getValues();

    for (r = 0, r2 = grid.length; r < r2; r++) {
      for (c = 0, c2 = grid[r].length; c < c2; c++) {
        if (grid[r][c] === findme) {
          return [ r+rFindmeFrom, c+cFindmeFrom ];
        }
      }
    }
    return [ -1, -1 ];
  }


// =========================================================
// PUBLIC METHODS
// =========================================================

  var api = {

    /**
     * menu1
     */
    menu1 : function() {
      Browser.msgBox('Entry 1 works');
    },


    /**
     * menu2
     * only doing JavaDoc from habit
     */
    menu2 : function() {
      Browser.msgBox('Entry 2 works too');
    }

  }
  return api;
 })();
