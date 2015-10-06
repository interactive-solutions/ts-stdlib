/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */

module is.stdlib {

  /**
   * Utility query string class
   */
  export class QueryString {

    /**
     * Creates a query string from an object
     *
     * @param obj
     * @returns {string}
     */
    public static stringify(obj:any) {

      var queryString: string = obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];

        if (val === '' || val === undefined) {
          return;
        }

        if (Array.isArray(val)) {
          return val.sort().map(function (val2) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
          }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
      }).join('&') : '';

      var regExp = new RegExp('&+');

      queryString = queryString.replace(regExp, '&');

      if (queryString.charAt(0) === '&') {
        queryString = queryString.substr(1);
      }

      return queryString;
    }
  }
}