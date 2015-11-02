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
    public static stringify(obj:any): string {

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

    public static parse():string|boolean {
      var queryString: any = {};
      var href: string = window.location.href;

      var query: string = href.split('?')[1];

      if (!query) {
        return false;
      }

      var vars: string[]  = query.split('&');

      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');

        if (typeof queryString[pair[0]] === 'undefined') {
          queryString[pair[0]] = decodeURIComponent(pair[1]);
        } else if (typeof queryString[pair[0]] === 'string') {
          queryString[pair[0]] = [queryString[pair[0]], decodeURIComponent(pair[1])];
        } else {
          queryString[pair[0]].push(decodeURIComponent(pair[1]));
        }
      }

      return queryString;
    }
  }
}
