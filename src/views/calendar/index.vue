<template>
<div class="calendar">
    <div class="calendar-datepicker">
        <u-datepicker v-on:change="dateChange"></u-datepicker>
    </div>

    <template v-if="showArtBoard">
    <div>
        <p class="calendar-info">Your date is: {{ date }}</p>
        <u-button v-on:clickHandler="goNext" type="primary" size="large" text="Draw my life"></u-button>
    </div>
    </template>
</div>
</template>

<script>
import UButton from 'ui/button'
import UDatepicker from 'ui/datePicker'

export default {
    data() {
        return {
            date: '',
            showArtBoard: false
        }
    },

    components: {
        UButton,
        UDatepicker
    },

    methods: {
        goNext() {
            this.$emit('clickBtn', 'artboard')
        },

        dateChange(date) {
            this.date = date
            this.showArtBoard = true
        }
    }
}
</script>

<style lang="less">
.calendar-datepicker {
    width: 70%;
    margin: 0 auto;
}

.calendar-info {
    margin: 20px 0;
}
</style>
