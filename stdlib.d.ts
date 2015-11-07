/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */
declare module is.stdlib {
    /**
     * Interface for the event manager
     */
    interface EventManagerInterface {
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
     * Event manager
     */
    class EventManager {
        private counter;
        private events;
        attach(event: string, callback: (...args: any[]) => void): number;
        once(event: string, callback: (...args: any[]) => void): number;
        detach(event: string, id: number): void;
        emit(event: string, ...args: any[]): void;
    }
}
/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */
declare module is.stdlib {
    /**
     * Interface for the polling manager
     */
    interface PollingManagerInterface {
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
        add(name: string, callback: (...args: any[]) => void, timeOut: number, ...args: any[]): void;
        /**
         * Removes (clears) poll with name
         *
         * @param name
         */
        remove(name: string): void;
    }
    /**
     * Error that is thrown if a poll with a given name already exists
     */
    class PollNameExists {
    }
    /**
     * Wrapper for set/clear interval functions
     */
    class PollingManager implements PollingManagerInterface {
        private polls;
        constructor();
        add(name: string, callback: (...args: any[]) => void, timeOut: number, ...args: any[]): void;
        remove(name: string): void;
    }
}
/**
 * @author Erik Norgren <erik.norgren@interactivesolutions.se>
 * @copyright Interactive Solutions
 */
declare module is.stdlib {
    /**
     * Utility query string class
     */
    class QueryString {
        /**
         * Creates a query string from an object
         *
         * @param obj
         * @returns {string}
         */
        static stringify(obj: any): string;
        static parse(): string | boolean;
    }
}
