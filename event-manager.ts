/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */

module is.stdlib {
  export class EventManager {

    private events:{[key:string]:((args?:any) => void)[]};

    constructor() {
      this.events = {};
    }

    attach(event:string, callback:(args?:any) => void) {

      if (this.events[event] === undefined) {
        this.events[event] = [];
      }

      this.events[event].push(callback);
    }

    emit(event:string, args:any) {
      angular.forEach(this.events[event], (cb:(args?:any) => void) => {
        cb(args);
      });
    }
  }
}