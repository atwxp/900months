<template>
<div class="u-datepicker" :class="classView">
    <table>
        <thead>
            <tr>
                <th @click="prev">‹</th>
                <th colspan="5" @click="setView(false)">{{ title }}</th>
                <th @click="next">›</th>
            </tr>
        </thead>

        <tbody @click="goNext($event)">
            <template v-if="this.curView == 'date'">
            <tr>
                <td v-for="(w, i) in weeks" :class="{weekend: i === 6 || i === 5}">{{ w }}</td>
            </tr>
            <tr v-for="row in range">
                <td v-for="col in row">
                    <span :data-text="col.text"
                        :class="{weekend: col.weekend, gray: col.gray, selected: value.date && !col.gray && col.text == value.date}">
                        {{ col.text }}
                    </span>
                </td>
            </tr>
            </template>

            <template v-else>
            <tr>
                <td colspan="7">
                    <span v-for="r in this.range" :data-text="r" :class="{selected: r==value[curView]}">{{ r }}</span>
                </td>
            </tr>
            </template>
        </tbody>
    </table>
</div>
</template>

<script>
import moment from 'moment'

const VIEW_LEVEL = ['year', 'month', 'date', 'hours', 'minutes']
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const defaultMaxView = 'year'
const defaultMinView = 'date'

export default {
    name: 'u-datepicker',

    data() {
        return {
            weeks: ['一', '二', '三', '四', '五', '六', '日'],

            viewLevel: [],

            title: '',

            range: [],

            value: {},

            curView: ''
        }
    },

    computed: {
        classView() {
            return `u-datepicker-${this.curView}`
        }
    },

    props: {
        format: {
            type: String,
            default: 'YYYY-MM-DD'
        },

        minView: {
            type: [Boolean, String],

            default: defaultMinView,

            validator(val) {
                return typeof val === 'boolean' || VIEW_LEVEL.includes(val)
            }
        },

        maxView: {
            type: [Boolean, String],

            default: defaultMaxView,

            validator(val) {
                return typeof val === 'boolean' || VIEW_LEVEL.includes(val)
            }
        },

        view: {
            type: String,

            default: 'year',

            validator(val) {
                return VIEW_LEVEL.includes(val)
            }
        }
    },

    watch: {
        value: {
            handler: 'setTitleAndRange',
            deep: true
        },

        curView: 'setTitleAndRange'
    },

    created() {
        // [maxView, minView]
        if (typeof this.maxView === 'boolean') {
            this.maxView = this.maxView && defaultMaxView
        }
        if (typeof this.minView === 'boolean') {
            this.minView = this.minView && defaultMinView
        }
        const maxViewIndex = VIEW_LEVEL.includes(this.maxView) && VIEW_LEVEL.indexOf(this.maxView)
        const minViewIndex = VIEW_LEVEL.includes(this.minView) && VIEW_LEVEL.indexOf(this.minView)
        this.viewLevel = VIEW_LEVEL.slice(maxViewIndex || 0, (minViewIndex || 0) + 1)

        // set current view
        this.setView()

        // init date
        this.initDate()
    },

    methods: {
        prev() {
            switch (this.curView) {
                case 'year':
                    this.value.year -= 10
                    break
                case 'month':
                    this.value.year -= 1
                    break
                case 'date':
                    const index = MONTH.indexOf(this.value.month)

                    Object.assign(this.value, Object.assign(
                        {
                            month: MONTH[index && index - 1 || MONTH.length - 1]
                        },
                        index ? {} : { year: this.value.year - 1}
                    ))

                    break

                default:

            }
        },

        next() {
            switch (this.curView) {
                case 'year':
                    this.value.year += 10
                    break
                case 'month':
                    this.value.year += 1
                    break
                case 'date':
                    const index = (MONTH.indexOf(this.value.month) + 1) % 12
                    
                    Object.assign(this.value, Object.assign(
                        { month: MONTH[index] },
                        index === 0 ? { year: this.value.year + 1} : {}
                    ))

                    break
                default:

            }
        },

        setView(forward = false) {
            const toView = VIEW_LEVEL[
                forward
                ? Math.min(VIEW_LEVEL.length - 1, VIEW_LEVEL.indexOf(this.curView || this.view) + 1)
                : Math.max(0, VIEW_LEVEL.indexOf(this.curView || this.view) - 1)
            ]

            if (this.viewLevel.includes(toView)) {
                this.curView = toView
            }
        },

        initDate(time) {
            const date = new Date()

            this.value = {
                year: date.getFullYear(),

                month: MONTH[date.getMonth()],

                date: date.getDate(),

                hours: date.getHours(),

                minute: date.getMinutes()
            }        
        },

        // total days one month
        getToalDaysOfMonth(offset = 0) {
            const time = new Date(this.value.year, MONTH.indexOf(this.value.month) + 1 + offset, 0)
            return time.getDate()
        },

        // first day of today's month
        getFirstDayOfMonth() {
            return new Date(this.value.year, MONTH.indexOf(this.value.month), 1).getDay()
        },

        setTitleAndRange() {
            let title = ''

            const range = []

            const value = this.value

            switch (this.curView) {
                case 'year':

                    const index = value.year % 10 

                    // 12 years one group
                    for (let i = 0; i < index; i++) {
                        range[i] = value.year - (index - i)
                    }
                    for (let i = index; i < 12; i++) {
                        range[i] = value.year + (i - index)
                    }

                    title = [range[0], range[range.length - 1]].join(' - ')

                    break

                case 'month':
                    title = value.year

                    // 12 months one year
                    range.push(...MONTH)

                    break

                case 'date':
                    title = [value.year, value.month].join(' ')

                    const firstDayOfMonth = this.getFirstDayOfMonth() || 7

                    const totalDaysOfMonth = this.getToalDaysOfMonth()

                    const totalDaysOfPrevMonth = this.getToalDaysOfMonth(-1)

                    for (let row = 0; row < 6; row++) {
                        range[row] = []

                        for (let col = 0; col < 7; col++) {
                            const cell = row * 7 + col + 1

                            if (cell < firstDayOfMonth) {
                                range[row][col] = {
                                    gray: true,
                                    text: cell + totalDaysOfPrevMonth - firstDayOfMonth + 1
                                }
                            }

                            else if (cell < firstDayOfMonth + totalDaysOfMonth) {
                                range[row][col] = {
                                    weekend: col === 5 || col === 6,
                                    text: cell - firstDayOfMonth + 1,
                                    selected: cell == this.value.date + firstDayOfMonth - 1
                                }
                            }

                            else {
                                range[row][col] = {
                                    gray: true,
                                    text: cell - firstDayOfMonth - totalDaysOfMonth + 1
                                }
                            }
                        }
                    }

                    break

                case 'hours':
                    title = [value.date, value.month, value.year].join(' ')

                    // 24h on day
                    for (let i = 0; i < 24; i++) {
                        range[i] = i.padStart(2, 0) + ' : 00'
                    }

                    break

                case 'minute':
                    title = [value.date, value.month, value.year].join(' ')

                    const h = this.value.hours.split(/\s*:\s*/)[0]

                    // every 5min
                    for (let i = 0; i < 12; i++) {
                        range[i] = h + ' : ' + ('' + i * 5).padStart(2, 0)
                    }

                    break

                default:
            }

            this.title = title

            this.range = range
        },

        goNext(e) {
            const text = e.target.dataset['text']

            this.value[this.curView] = ['year', 'date'].includes(this.curView) ? parseInt(text, 10) : text

            let { year, month, date } = this.value
            month = MONTH.indexOf(month) + 1
            this.$emit('change', {
                text: moment(`${month}-${date}-${year}`, ['MM-DD-YYYY']).format(`${this.format}`),
                raw: Object.assign({}, this.value, { month })
            })

            this.setView(true)
        }
    }
}
</script>

<style lang="less">
.u-datepicker {
    table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
    }

    td, th {
        width: 20px;
        height: 20px;
        padding: 4px 5px;
        border-radius: 4px;
        color: #333;
    }

    span {
        float: left;
        margin: 1%;
        width: 23%;
        line-height: 50px;
        border-radius: 4px;

        &.gray {
            color: #bfbfbf;
        }

        &.selected {
            background-image: linear-gradient(to bottom, #4ededa, #0cb3af);
            color: #fff;
            &:hover {
                background: #0cb3af;
            }
        }
    }

    th, span {
        cursor: pointer;

        &:hover, &:active {
            background-color: #eee;
        }
    }

    &.u-datepicker-date {
        td {
            padding: 0;

            &.weekend {
                color: #e02d2d;
            }
        }
        th {
            padding: 15px 0;
        }
        span {
            width: 100%;
            line-height: 26px;
            margin: 6px 2px 0;

            &.weekend {
                color: #e02d2d;
            }
        }
    }
}
</style>

