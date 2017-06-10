<template>
<div class="app">
    <component :is="activeView" :birthday="birthday" v-on:clickBtn="handleClick"></component>

    <u-button v-show="activeView != 'entry'" class="reset" v-on:clickHandler="handleClick('entry')" text="Reset"></u-button>
</div>
</template>

<script>
import UButton from 'ui/button'

import entry from 'views/entry'
import calendar from 'views/calendar'
import artboard from 'views/artboard'

const LS_KEY = '900birth'

export default {
    data() {
        return {
            activeView: 'entry'
        }
    },

    components: {
        entry,
        calendar,
        artboard,
        UButton
    },

    created() {
        const birth = this.readBirth()

        this.birthday = birth

        this.activeView = birth ? 'artboart' : 'entry'
    },

    methods: {
        handleClick(view) {
            this.activeView = view
        },

        readBirth() {
            // localStorage.getItem(LS_KEY)
        },

        saveBirth(birth) {
            try {
                // localStorage.setItem(LS_KEY, birth)
            }
            catch (e) {

            }
        }
    }
}
</script>

<style lang="less">
html, body,
h1, h2, h3, h4, h5, h6,
ul, ol,
p,
input, button {
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
}

a {
    text-decoration: none;
}

input, button {
    border: none;
    outline: none;
    -webkit-appearance: none;
}

i, em {
    font-style: normal;
}

// app
body {
    font: 14px/1.4 Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
}

html, body,
.app {
    height: 100%;
}

.app {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    > div {
        width: 100%;
    }
    .reset {
        position: fixed;
        bottom: 10px;
        right: 10px;
    }
}
</style>
