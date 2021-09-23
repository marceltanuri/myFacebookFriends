const axios = require('axios');
const credentials = require('./credentials')

let myFriends = []


async function callFB(page) {

    let cursor = (page != null && page != "") ? page : ""
    let variables_json = { "count": 30, "cursor": cursor, "name": null, "scale": 1 }
    const variables = JSON.stringify(variables_json)
    let postData = credentials.data.securityParams + "&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=FriendingCometFriendsListPaginationQuery&variables=" + variables + "&server_timestamps=true&doc_id=4268740419836267";

    let axiosConfig = {
        headers: {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,pt-PT;q=0.8,pt;q=0.7",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Google Chrome\";v=\"93\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"93\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-fb-friendly-name": "FriendingCometFriendsListPaginationQuery",
            "cookie": credentials.data.fbCookies
        },
        referrer: "https://www.facebook.com/friends/list",
        referrerPolicy: "strict-origin-when-cross-origin",
        mode: "cors"
    };

    await axios.post("https://www.facebook.com/api/graphql/", postData, axiosConfig)
        .then(async (response) => {
            if (response.data.errors != null) {
                console.log(response.data)
                return;
            }

            let json = response.data;

            for (var i in json.data.viewer.all_friends.edges) {
                myFriends.push(json.data.viewer.all_friends.edges[i].node)
            }

            let page_info = json["data"]["viewer"]["all_friends"]["page_info"]

            if (page_info.has_next_page || json.data.viewer.all_friends.edges.length == 30) {
                await callFB(page_info.end_cursor);
            }
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
}

var start = async function () {
    await callFB()
    console.log(myFriends.length)
}

start()