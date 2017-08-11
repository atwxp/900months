<template>
<div class="app">
    <component :is="activeView" :birthday="birthday.raw"
        v-on:showdate="showdate">
    </component>

    <template v-if="activeView === 'entry'">
        <u-button class="set-btn" type="primary" size="large"
            v-on:clickHandler="toView('calendar')" text="Set your day">
        </u-button>
    </template>

    <template v-if="activeView === 'calendar' && birthday.text">
    <div>
        <p class="calendar-info">Your date is: {{ birthday.text }}</p>
        <u-button type="primary" size="large"
            v-on:clickHandler="toView('artboard')" text="Draw my life">
        </u-button>
    </div>
    </template>

    <u-button v-if="activeView != 'entry'" class="reset-btn"
        v-on:clickHandler="toView('entry')" text="Reset">
    </u-button>
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
            activeView: 'entry',
            birthday: {}
        }
    },

    components: {
        entry,
        calendar,
        artboard,
        UButton
    },

    created() {
        this.birthday.raw = this.readBirth()
        this.toView(this.birthday.raw ? 'artboard' : 'entry')
    },

    methods: {
        showdate(date) {
            this.birthday = date
        },

        toView(view) {
            if (view === 'artboard') {
                this.saveBirth(this.birthday.raw)

                // this.saveBirth(this.birthday.raw).then(() => {
                //     this.activeView = view
                // })
            }

            if (view === 'entry') {
                this.clearBirth()
                this.birthday = {}
            }

            this.activeView = view
        },

        readBirth() {
            try {
                return JSON.parse(localStorage.getItem(LS_KEY))
            }
            catch (e) {
                return null
            }
        },

        saveBirth(birth) {
            try {
                localStorage.setItem(LS_KEY, JSON.stringify(birth))
            }
            catch (e) {

            }
        },

        clearBirth() {
            localStorage.removeItem(LS_KEY)
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
    -webkit-tap-highlight-color: rgba(255,255,255,0);
}

.app {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    box-sizing: border-box;
    width: 80%;
    padding: 50px 0;
    margin: 0 auto;

    > div {
        width: 100%;
    }

    .set-btn {
        margin-top: auto;
    }

    .reset-btn {
        position: fixed;
        bottom: 20px;
        width: 80%;
    }
}
</style>
