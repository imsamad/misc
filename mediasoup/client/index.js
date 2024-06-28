const webSockUrl = 'http://localhost:4000/ws'
const connect = () => {
    const socket = new WebSocket(webSockUrl)
    socket.onopen=() => {
        const msg = {
            type:'getRouterRtpCapabilities'
        }

        const resp = JSON.stringify(msg)
        socket.send(resp)
    }
    socket.onmessage=(event) => {
        const resp = isJson(jsonMessage);
        if (!resp) return;
        switch(resp.type) {
            case 'routerCapabilities':
                onRouterRtpCapabilities(resp);
                break;
        }        
    }       

    const onRouterRtpCapabilities=(resp) => {

    }

    const loadDevices=async (rtrCapabilities) => {

    }
    
}

const isJson = (str) => {
    try {
      return JSON.parse(str);
    } catch (err) {
      return '';
    }
  };
