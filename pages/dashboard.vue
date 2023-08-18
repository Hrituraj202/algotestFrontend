<template>
    <div class="w-full">
        <div class="h-screen w-full">
            <span class="flex flex-col h-full items-centers space-y-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <img class="w-8 h-8 mr-2" src="https://algotest.in/logo300.png" alt="">
                        <span>Algotest Dash</span>
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
                <div class="flex-1">
                    <section class="mt-10">
                        <div>
                            <!-- Transaction Table -->
                            <div class="w-full lg:w-auto">
                                <h1 class="font-medium text-xl">All Trades</h1>
                                <div class="overflow-x-auto mt-5">
                                    <table class="w-full border border-slate-100">
                                        <thead class="w-full">
                                            <tr class="border-y border-slate-100 text-left">
                                                <th class="pl-2">
                                                </th>
                                                <th class="font-normal text-slate-500 py-4 text-sm">Asset</th>
                                                <th class="font-normal text-slate-500 py-4 text-sm">Exchange</th>
                                                <th class="font-normal text-slate-500 py-4 text-sm">Profit</th>
                                                <th class="font-normal text-slate-500 py-4 text-sm">Time</th>
                                                <th class="font-normal text-slate-500 py-4 text-sm">Margin</th>
                                            </tr>
                                        </thead>
                                        <tbody class="w-full">
                                            <tr v-for="(item, index) in data" :key="index" class="border-b hover:bg-blue-50 border-slate-100">
                                                <td class="pl-2 whitespace-nowrap">
                                                </td>
                                                <td class="flex items-center space-x-2 py-4 whitespace-nowrap">
                                                    <img
                                                        src="https://bitcoin.org/favicon.png?1691626078"
                                                        alt="Jolly Rancher"
                                                        class="w-4 h-4 rounded-full"
                                                    />
                                                    <h1 class="text-slate-700 text-sm">{{item.asset}}</h1>
                                                </td>
                                                <td class="text-sm whitespace-nowrap">
                                                    <!-- {{JSON.parse(item.exchanges).exchange1.price+" >> "+JSON.parse(item.exchanges).exchange2.price}} -->
                                                </td>
                                                <td class="text-sm text-blue-800 cursor-pointer underline underline-offset-2 whitespace-nowrap">
                                                    {{item.profit_percent}} %
                                                </td>
                                                <td class="text-sm whitespace-nowrap">{{item.timestamp}}</td>
                                                <td class="text-xs whitespace-nowrap">
                                                    <span
                                                        :class="[item.profit_percent < 0.5 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600']"
                                                        class="px-2 py-1 rounded-md"
                                                        >{{ item.profit_percent < 0.5 ? "Avg" : "Great" }}</span
                                                    >
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import ApiService from "lib/axios/endpoints";

const data = ref([])

const auth = useAuth();

// async onMounted(() => {
    const res = await ApiService.getTrades(auth.userState.value.id);
    data.value = res.data;
// })

</script>