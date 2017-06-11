<template>
<div class="calendar">
    <div class="calendar-datepicker">
        <u-datepicker v-on:change="dateChange"></u-datepicker>
    </div>
</div>
</template>

<script>
import UDatepicker from 'ui/datePicker'

export default {
    data() {
        return {
            date: null
        }
    },

    components: {
        UDatepicker
    },

    methods: {
        dateChange(date) {
            this.date = date
            this.$emit('showdate', this.date)
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
