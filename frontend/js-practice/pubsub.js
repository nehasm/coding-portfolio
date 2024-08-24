function PubSub() {
    this.subscribers = new Map();

    this.subscribe = function (event, callback) { 
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        this.subscribers.get(event).push(callback);
    }

    this.publish = function (event, data) {
        if (this.subscribers.has(event)) {
            this.subscribers.get(event).forEach(callback => callback(data));
        }
    }

    this.subscribeOnce = function (event, callback) {
        const wrapper = (data) => {
            callback(data);
            this.unsubscribe(event, wrapper);
        }
        this.subscribe(event, wrapper);
    }

    this.unsubscribe = function (event, callback) { 
        if (this.subscribers.has(event)) {
            const index = this.subscribers.get(event).indexOf(callback);
            if (index !== -1) {
                this.subscribers.get(event).splice(index, 1);
            }
    }
    }

    this.removeSubscriber = function (event) { 
        this.subscribers.delete(event);
    }

    this.removeAllSubscribers = function () {
        this.subscribers.clear();
    }

    this.getSubscribers = function () {
        return this.subscribers;
    }

    this.publishAllSubscribers = function (data) {
        for (const [event, callbacks] of this.subscribers.entries()) {
            callbacks.forEach(callback => callback(data));
        }
    }

}

const pubsub = new PubSub();
pubsub.subscribe('event1', (data) => console.log(data));
pubsub.subscribe('event2', (data) => console.log(data));
pubsub.publish('event1', 'Hello');
pubsub.publish('event2', 'World');
pubsub.unsubscribe('event1', () => console.log(data));
pubsub.getSubscribers();

pubsub.subscribeOnce('event3', (data) => console.log(data));
pubsub.publish('event3', 'Once');
pubsub.publish('event3', 'Twice');
pubsub.removeSubscriber('event3');
pubsub.publishAllSubscribers('All Events');
pubsub.getSubscribers()