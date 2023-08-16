<template>
  <div class="w-full">
        <div class="h-screen w-full">
            <span class="flex flex-col items-centers space-y-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center">
                        <img class="w-8 h-8 mr-2" src="https://algotest.in/logo300.png" alt="">
                        <h1 class="text-xl font-bold">Hi, {{ v.first_name }}.</h1>
                    </div>
                    
                    <a
                        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        @click="signout"
                    >
                        Sign out
                    </a>
                </div>
                <nav class="flex justify-between p-4">
                    <div class="flex space-x-4">
                        <div>
                          <NuxtLink to="/profile/edit">
                            <button
                              class="text-gray-600 hover:text-gray-800"
                            >
                              Profile
                            </button>
                          </NuxtLink>
                        </div>
                        <div>
                          <NuxtLink to="/dashboard">
                            <button
                              class="text-gray-600 hover:text-gray-800"
                            >
                              Dashbaord
                            </button>
                          </NuxtLink>
                        </div>
                    </div>
                </nav>

                <div class="flex justify-center items-center h-96">
                    <NuxtLink to="/chat"
                        class="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Start Chat For Trading Updates
                    </NuxtLink>          
                </div>
            </span>
        </div>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: "Index",
  layout: "default",
  setup() {
    const { $router } = useNuxtApp();
    const auth = useAuth();
    const signout = () => {
      localStorage.clear();
      auth.setAuthState(null);
      auth.setUserState(null);
      $router.push("/signin");
    };
    const v = {
      email: String(auth.userState.value?.email),
      first_name: String(auth.userState.value?.first_name),
      last_name: String(auth.userState.value?.last_name),
    };
    return {
      signout,
      v,
    };
  },
  head() {
    return {
      title: "Welcome",
    };
  },
});
</script>
