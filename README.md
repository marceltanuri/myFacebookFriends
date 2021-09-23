# MyFriends on Facebook

It is a javascript aplication that consumes facebook graphqL API to list all friends of mine.
A credential file is needed to make the request valid.

1. Create a file called credentials.js
2. Set this content on it:
```
// find these values by inspecting a request from your facebook account.
const data = {
    securityParams : "", // inspect the body of the post request
    fbCookies : "", // inspect the request cookies
    docId : "" // inspect the body of the post request
}

exports.data = data
```
4. Install npm dependencies with the command `npm install`
3. Start de program by running `node index.js`