/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */

/**
 * Interface for the polling manager
 */
export interface PollingManagerInterface {

  /**
   * Adds a named poll
   *
   * @throws PollNameExists
   *
   * @param name
   * @param callback
   * @param timeOut
   * @param args
   */
  add(name:string, callback:(...args:any[]) => void, timeOut:number, ...args:any[]): void;

  /**
   * Removes (clears) poll with name
   *
   * @param name
   */
  remove(name:string): void;
}

/**
 * Error that is thrown if a poll with a given name already exists
 */
export class PollNameExists {
}

/**
 * Wrapper for set/clear interval functions
 */
export class PollingManager implements PollingManagerInterface {
  private polls:{[key:string]: number};

  constructor() {
    this.polls = {};
  }

  add(name:string, callback:(...args:any[]) => void, timeOut:number, ...args:any[]):void {
    if (this.polls[name] !== undefined) {
      throw new PollNameExists();
    }

    this.polls[name] = setInterval(callback, timeOut, args);
  }

  remove(name:string):void {
    if (this.polls[name] !== undefined) {
      clearInterval(this.polls[name]);

      this.polls[name] = undefined;
    }
  }
}
