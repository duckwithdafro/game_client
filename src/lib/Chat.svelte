<script lang="ts">
    import axios from "axios"
    import SuperTokens from 'supertokens-website'
    
    
    
    // add axios interceptors
    
    SuperTokens.addAxiosInterceptors(axios)
    
    // create a websocket connection to the server
    let ws = new WebSocket('ws://localhost:9000/api/ws')
    let current_world

    ws.onopen = function() {
        console.log('connected to server')
    }
    
    ws.onerror = function(event) {
        console.log("error", event)
    }

    ws.addEventListener('message', function(event) {
        if (event.data.type === 'user_join') {
            
            console.log(event.data)
        }
        
        if (event.data.type === 'user_message') {
            
            console.log(event.data)
        }
    })

    async function sendMessageEvent() {
        // create a test user object
        let user = { // eventually this will get the user info from a different function that returns a user object
            name: 'test user',
            id: 1,
            current_world: "SpicyMackerel",
        }

        // create message object
        let message = {
            user: user,
            content: 'test message',
        }
        
        try {
            await axios.post("http://localhost:9000/api/message", message)
        }
        
        catch (err) {
            // alert(err)
            // throw err.response.message
            alert(`${err.response.status}: ${err.response.data.detail}`)
            throw err
        }

    }
</script>

<div>
    {#if current_world}
    <h1>Test send to server</h1>
    <button on:click={sendMessageEvent}>Send</button>
    {/if}
</div>
