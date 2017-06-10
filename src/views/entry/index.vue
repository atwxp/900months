<template>
<div class="main">
    <h1 class="main-title">FACT</h1>
    <h3 class="main-subtitle">Life is only<br /><em>900</em><br /><em>months</em></h3>

    <p>Draw 30 * 30 table on paper.</p>
    <p>Check a box every month.</p>
    <p>That's your whole life.</p>

    <u-button class="main-btn" v-on:clickHandler="goNext" type="primary" size="large" text="Set your day"></u-button>
</div>
</template>

<script>
import UButton from 'ui/button'

export default {
    name: 'entry',

    components: {
        UButton
    },

    methods: {
        goNext() {
            this.$emit('clickBtn', 'calendar')
        }
    }
}
</script>

<style lang="less">
@margin: 25px;

.main {
    color: #999;

    .main-title {
        font-size: 30px;
        color: #333;
    }

    .main-subtitle {
        margin: @margin 0;
        line-height: 28px;
        font-weight: normal;
    }
    .main-btn {
        margin-top: @margin;
    }
}
</style>
