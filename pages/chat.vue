<template>
    <div>
        <div class="h-screen w-full">
            <span class="flex flex-col h-full items-centers space-y-4">
                <div class="flex justify-between items-center">
                    <span>Welcome To Chat</span>
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
                <div class="flex-1">

                    <div class="text-slate-900 dark:text-gray-100 h-5/6">
                        <div
                            v-for="(message, index) in messages"
                            :key="index"
                            :class="message.side == 'left' ? ['text-left'] : ['text-right']"
                        >
                        {{message.data}}
                        </div>
                    </div>
                    <button @click="sendMessage" class="bg-gray-700 text-white font-bold px-4 py-2 rounded">Click me to send random number</button>
                </div>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
const messages = ref([])

// const { $socket } = useNuxtApp()
const auth = useAuth();

let $socket = new WebSocket(`ws://localhost:8001/ws?token=${String(auth.userState.value?.id)}`)

onMounted(() => {
   $socket.onopen = () => {
    // $socket.send(JSON.stringify({id: String(auth.userState.value?.id)}))
    messages.value.push({"side" : "left", "data" : "Hey " + String(auth.userState.value?.first_name) + " !"});
  }

  $socket.onmessage = ({ data }: any) => {
    messages.value.push({"side" : "left", "data" : data});
  }
  $socket.onclose = function () {
    console.log("disconnected")
  }
})

const sendMessage = () => {
    if($socket.readyState == 1){
        let random = Math.random()
        messages.value.push({"side" : "right", "data" : random});
        $socket.send(JSON.stringify({message: random}))
    } else {
      console.log("Connection not in ready state")
    }
}
</script>