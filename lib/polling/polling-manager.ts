/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */

module is.stdlib {

  export class PollAliasExists extends Error {}

  export class PollingManager {
    private polls: {[key:string]: number};

    constructor() {
      this.polls = {};
    }

    add(alias: string, callback: () => void, timeOut: number): void {
      if (this.polls[alias] !== undefined) {
         throw new PollAliasExists();
      }

      this.polls[alias] = setInterval(callback, timeOut);
    }

    remove(alias: string): void {
      if (this.polls[alias] !== undefined) {
        clearInterval(this.polls[alias]);

        this.polls[alias] = undefined;
      }
    }
  }
}