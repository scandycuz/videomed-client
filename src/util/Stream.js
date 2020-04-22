import API from 'util/API';

function Stream() {
  this.initialize = async (token, constraints) => {
    try {
      this.config = await getConfig(token);
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.peerConnection = createPeerConnection();
    } catch(e) {
      console.log(e);
    }
  }

  this.attachTo = async (ref) => {
    try {
      ref.srcObject = this.stream;
    } catch(e) {
      console.log(e);
    }
  }

  const getConfig = (token) => {
    return API.fetchTwilioConfig(token);
  }

  const createPeerConnection = () => {
    try {
      const ice = { iceServers: this.config.ice_servers };
      const peerConnection = new RTCPeerConnection(ice);

      for (const track of this.stream.getTracks()) {
        peerConnection.addTrack(track, this.stream);
      }

      return peerConnection;
    } catch(e) {
      console.log(e);
    }
  }
}

export default Stream;
