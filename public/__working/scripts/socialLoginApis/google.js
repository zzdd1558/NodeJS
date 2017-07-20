/**
 * Created by parkjp on 2017-07-20.
 */

class GoogleLoginApi {

    handleClientLoad() {
        gapi.load('client:auth2', this.initClient);
    }

    initClient() {
        gapi.client.init({
            apiKey: 'AIzaSyCtYWWs0WsnAfC4EmYFMoLIoETvPvoPKMg',
            discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
            clientId: '393277494210-pefadhtq8di5fqcfooo6hghp60fvjfeu.apps.googleusercontent.com',
            scope: 'profile'
        }).then(function () {
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

     handleSignInClick(event) {
        gapi.auth2.getAuthInstance().signIn();
    }

     handleSignOutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
    }
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCall();
    }
}

function makeApiCall() {
    gapi.client.people.people.get({
        'resourceName': 'people/me',
        'requestMask.includeField': 'person.names'
    }).then(function (response) {
        console.log('Hello, ' + response.result.names[0].givenName);
    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
}

module.exports = GoogleLoginApi;