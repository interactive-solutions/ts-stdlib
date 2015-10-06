/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */

module is.stdlib {

  /**
   * Interface for the event manager
   */
  export interface EventManagerInterface {
    /**
     * Attaches a callback to a given event
     *
     * @param event
     * @param callback
     */
    attach(event:string, callback:(args?:any) => void): void;

    /**
     * Emits a given event
     *
     * @param event
     * @param args
     */
    emit(event:string, args:any): void
  }

  /**
   * Event manager
   */
  export class EventManager {

    private events:{[key:string]:((args?:any) => void)[]};

    constructor() {
      this.events = {};
    }

    attach(event:string, callback:(args?:any) => void): void {

      if (this.events[event] === undefined) {
        this.events[event] = [];
      }

      this.events[event].push(callback);
    }

    emit(event:string, args:any): void {
      _.forEach(this.events[event], (cb:(args?:any) => void) => {
        cb(args);
      });
    }
  }
}