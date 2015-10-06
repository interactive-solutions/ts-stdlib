### IS Typescript - Stdlib

Typescript library with commonly used functionality:
- Event manager
- QueryString builder from object
- Polling manager

## Event manager
Class that provides:
- Add a callback to a named event
- Emit an event

```javascript
import EventManager = is.stdlib.EventManager;
...
// Create an event manager
var eventManager: EventManger = new EventManager();

// Bind a callback to event 'event-name'
eventManager.attach('event-name', <callback>);

// Emit an event, all callbacks attached to 'event-name' will now run
eventManager.emit('event-name', <args?>);
```

## Polling manager
Wrapper for the setInterval/clearInterval functions

```javascript
import PollingManager = is.stdlib.PollingManager;
...
// Create a polling manager
var pollingManager: PollingManger = new PollingManager();

// Add a polling function with name 'poll-name' and timeOut 1 sec
pollingManager.add('poll-name', <callback>, 1000, <args?>);

// Clear a poll
pollingManager.remove('poll-name');
```

## Query string utility
Builds a query string from an object

```javascript
import QueryString = is.stdlib.QueryString;
...
var object: any = {
  name: 'name',
  field: 'field'
}

// Create query string from object fields
QueryString.stringify(object);
// Will return 'name=name&field=field'
```