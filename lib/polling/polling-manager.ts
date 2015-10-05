/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */

module is.stdlib {

  export class PollNameExists extends Error {}

  export class PollingManager {
    private polls: {[key:string]: number};

    constructor() {
      this.polls = {};
    }

    add(name: string, callback: () => void, timeOut: number): void {
      if (this.polls[name] !== undefined) {
         throw new PollNameExists();
      }

      this.polls[name] = setInterval(callback, timeOut);
    }

    remove(name: string): void {
      if (this.polls[name] !== undefined) {
        clearInterval(this.polls[name]);

        this.polls[name] = undefined;
      }
    }
  }
}