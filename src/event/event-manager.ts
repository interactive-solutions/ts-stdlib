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
     *
     * @return number the id associated with this callback
     */
    attach(event: string, callback: (...args: any[]) => void): number;

    /**
     * Attaches a callback to the next emit of the given event
     *
     * @param event
     * @param callback
     *
     * @return number the id associated with this callback
     */
    once(event: string, callback: (...args: any[]) => void): number;

    /**
     * Detaches a callback from a given event
     *
     * @param event
     * @param id
     */
    detach(event: string, id: number): void;

    /**
     * Emits a given event
     *
     * @param event
     * @param args
     */
    emit(event: string, args: any): void;
  }

  /**
   * Different callback types
   */
  enum CallbackType {
    ONCE,
    CONTINUOUS
  }

  /**
   * Wraps a callback function and associates it with a callback type and id
   */
  class Callback {
    constructor(private _id: number, private _callback: (...args: any[]) => void, private _type: CallbackType) {}

    get id(): number {
      return this._id;
    }

    get callback(): (...args: any[]) => void {
      return this._callback;
    }

    get type(): CallbackType {
      return this._type;
    }
  }

  /**
   * Event manager
   */
  export class EventManager {
    private counter: number  = 0;
    private events: {[key: string]: {[key: number]: Callback}} = {};

    attach(event: string, callback: (...args: any[]) => void): number {

      if (this.events[event] === undefined) {
        this.events[event] = [];
      }

      var id: number = this.counter;

      this.events[event][id] = new Callback(id, callback, CallbackType.CONTINUOUS);

      // If everything worked without errors, increment counter
      this.counter++;

      return id;
    }

    once(event: string, callback: (...args: any[]) => void): number {

      if (this.events[event] === undefined) {
        this.events[event] = [];
      }

      var id: number = this.counter;

      this.events[event][id] = new Callback(id, callback, CallbackType.ONCE);

      // If everything worked without errors, increment counter
      this.counter++;

      return id;
    }

    detach(event: string, id: number): void {
      delete this.events[event][id];
    }

    emit(event: string, ...args: any[]) {

      var callbacks: {[key: number]: Callback} = this.events[event];

      for (var id in callbacks) {
        if (!callbacks.hasOwnProperty(id)) {
          continue;
        }

        var callback = callbacks[id];

        callback.callback(...args);

        if (callback.type === CallbackType.ONCE) {
          this.detach(event, callback.id);
        }
      }
    }
  }
}
