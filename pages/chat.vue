<template>
    <div class="w-full">
        <div class="h-screen w-full">
            <span class="flex flex-col h-screen items-centers space-y-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <img class="w-8 h-8 mr-2" src="https://algotest.in/logo300.png" alt="">
                        <span>Algotest Chat</span>
                    </div>
                    <NuxtLink to="/">
                        <a
                            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            href="#"
                        >
                            Back
                        </a>
                    </NuxtLink>
                </div>
                <div class="text-slate-900 dark:text-gray-100 flex-1 max-h-5/6">
                    <div
                        v-for="(message, index) in messages"
                        :key="index"
                        :class="message.side == 'left' ? ['text-left'] : ['text-right']"
                    >
                        <div v-if="message.is_json">
                            <h1 class="text-sm mt-6 mb-2 text-gray-700">Trading Opportunities at {{message.current_time}}</h1>
                            <div class="grid grid-cols-1 gap-1">
                                <!-- Loop through the JSON data and generate cards for each currency -->
                                <div
                                    v-for="(opportunities, currency) in message.data"
                                    :key="currency"
                                >
                                    <div v-if="Object.keys(opportunities).length > 0" class="bg-white rounded-lg shadow-md p-2">
                                        <h2 class="text-sm font-semibold mb-2">{{ currency }}</h2>
                                        <div class="flex justify-between items-center" v-for="(profitDetails, exchangePair) in opportunities" :key="exchangePair">
                                            <p class="text-xs text-white rounded-full px-2 py-1 mb-2 bg-[#375A9E]">{{ exchangePair.split(',')[0] }} >> {{ exchangePair.split(',')[1] }}</p>
                                            <p class="text-xs text-white rounded-full px-2 py-1 mb-2 bg-[#49ADBB]">+ $ {{ parseFloat(profitDetails.split(',')[2]).toFixed(2) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="py-3">
                            <span 
                                class="text-xs bg-gray-700 text-white rounded-full px-2 py-1"
                                :class="message.side == 'left' ? ['bg-[#49ADBB]'] : ['bg-dark-700']"
                            >{{message.data}}</span>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <input v-model="inputValue" type="number" class="flex-1 bg-gray-100 h-12 p-2 rounded-l" placeholder="Enter Threshold In Dollars" >
                    <button @click="sendMessage" class="bg-gray-700 text-white font-bold px-4 py-2 rounded-r">Send</button>
                </div>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
const messages = ref([])

// const { $socket } = useNuxtApp()
const auth = useAuth();
const inputValue = ref('');
const IPAddress = process.env?.IP_ADDRESS || "localhost"
let $socket = new WebSocket(`ws://${IPAddress}:8001/ws?token=${String(auth.userState.value?.id)}`)

onMounted(() => {
   $socket.onopen = () => {
    // $socket.send(JSON.stringify({id: String(auth.userState.value?.id)}))
    messages.value.push({"side" : "left", "data" : "Hey " + String(auth.userState.value?.first_name) + " !", "is_json" : false});
  }

  $socket.onmessage = ({ data }: any) => {
    messages.value.push({"side" : "left", "data" : JSON.parse(data), "is_json" : true, "current_time" : new Date().getHours() + ':' + new Date().getMinutes()});
  }
  $socket.onclose = function () {
    console.log("disconnected")
  }
})

const sendMessage = () => {
    if($socket.readyState == 1){
        messages.value.push({"side" : "right", "data" : inputValue.value, "is_json" : false});
        $socket.send(JSON.stringify({message: inputValue.value}))
    } else {
      console.log("Connection not in ready state")
    }
}
</script>