import API from 'util/API';

class PeerConnection {
  constructor(token) {
    this.token = token;
  }

  static createStream = async (constraints) => {
    return navigator.mediaDevices.getUserMedia(constraints);
  }

  static attachStream = (ref, stream) => {
    try {
      ref.srcObject = stream;
    } catch(e) {
      console.error(e);
    }
  }

  static stopStream = (stream) => {
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });
  }

  initialize = async () => {
    try {
      const resp = await this.getConfig(this.token);
      return this.create(resp.data);
    } catch(e) {
      console.log(e);
    }
  }

  create = (config) => {
    try {
      const ice = { iceServers: config.ice_servers };
      return new RTCPeerConnection(ice);
    } catch(e) {
      console.error(e);
    }
  }

  getConfig = async (token) => {
    return API.fetchTwilioConfig(token);
  }
}

export default PeerConnection;
