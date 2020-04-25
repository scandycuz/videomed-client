import API from 'util/API';

class Stream {
  constructor(token) {
    this.token = token;
  }

  static createStream = (constraints) => {
    return navigator.mediaDevices.getUserMedia(constraints);
  }

  static attachStream = (ref, stream) => {
    try {
      ref.srcObject = stream;
    } catch(e) {
      console.log(e);
    }
  }

  static stopStream = (stream) => {
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });
  }

  initialize = async (localStream) => {
    try {
      this.config = await this.getConfig(this.token);
      this.pc = this.createPeerConnection(localStream);
    } catch(e) {
      console.log(e);
    }
  }

  createPeerConnection = (localStream) => {
    try {
      const ice = { iceServers: this.config.ice_servers };
      const pc = new RTCPeerConnection(ice);

      for (const track of localStream.getTracks()) {
        pc.addTrack(track, localStream);
      }

      return pc;
    } catch(e) {
      console.log(e);
    }
  }

  getConfig = (token) => {
    return API.fetchTwilioConfig(token);
  }
}

export default Stream;
