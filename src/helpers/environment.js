let APIURL = ''

switch (window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:3000'
        break
    case 'jhkn-my-travelapp-client':
        APIURL = 'https://jhkn-my-travelapp.herokuapp.com'
}

export default APIURL