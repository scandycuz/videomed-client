/**
 * Creates an instance of a
 * Websocket subscription.
 * @param {string}   url        url for the Actioncable connection
 * @param {string}   token      authorization token
 * @param {object}   identifier identifies the subscription
 * @param {function} onMessage  called when a message is received
 */
function Subscription(url, token, identifier, onMessage) {
  this.identifier = identifier;
  this.socket = null;
  this.pinging = null;

  /**
   * Connects the websocket and
   * subscribes to the channel.
   */
  this.initialize = async () => {
    await connect();

    const payload = {
      command: 'subscribe',
      identifier: JSON.stringify(this.identifier),
    };

    await this.socket.send(JSON.stringify(payload));

    this.pinging = setInterval(() => {
      this.ping();
    }, 60000);
  }

  /**
   * Sends an action and payload
   * to the signalling server.
   * @param  {string} action  action to be performed
   * @param  {object} content data for the request
   */
  this.send = async (action, content) => {
    if (!this.connected) await this.initialize();

    const payload = {
      command: 'message',
      identifier: JSON.stringify(this.identifier),
      data: JSON.stringify({ action, ...content }),
    }

    this.socket.send(JSON.stringify(payload));
  }

  this.ping = async () => {
    this.send('ping');
  }

  this.close = () => {
    this.socket.close();
  }

  const connect = () => {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`${url}?authorization=${token}`);

      this.socket.onopen = () => {
        console.log('Actioncable connected');

        this.connected = true;

        this.socket.onmessage = onMessage;

        resolve();
      };

      this.socket.onclose = () => {
        this.connected = false;

        console.log('Actioncable disconnected');
      };

      this.socket.onerror = (error) => reject(error);
    });
  }
}

/**
 * Used to create and store
 * subscription instances.
 */
const Cable = {
  subscriptions: [],

  initialize: function(url, token) {
    this.url = url;
    this.token = token;
  },

  /**
   * Retrieves a current subscription
   * @param  {object}   identifier identifies the subscription
   * @return {function}            subscription instance
   */
  subscription: function(identifier) {
    return this.subscriptions.find((subscription) => {
      return JSON.stringify(subscription.identifier) === JSON.stringify(identifier);
    })
  },

  /**
   * Creates and stores a websocket subscription.
   * @param  {object}   identifier identifies the subscription
   * @param  {function} onMessage  called when the websocket receives a message
   */
  subscribe: async function(identifier, onMessage) {
    const subscription = new Subscription(this.url, this.token, identifier, onMessage);
    await subscription.initialize(this.url, this.token);

    this.subscriptions.push(subscription);
  },

  disconnect: async function() {
    this.subscriptions.forEach((s) => {
      clearInterval(s.pinging);
      s.close();
    });

    this.subscriptions = [];
  }
}

export default Cable;
