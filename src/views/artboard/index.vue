<template>
<div class="artboard">
    <h3>Life is only 900 months</h3>
    <br />

    <p>You have lived {{ passedDays }} days</p>
    <br />

    <canvas ref="canvas"></canvas>
    <br />
    <br />

    <p>{{ remainMonths }} months is left. Enjoy</p>
</div>
</template>

<script>
import moment from 'moment'

export default {
    data() {
        return {
            row: 30,
            col: 30,
            cellH: 10,
            cellW: 10,
            passedDays: 0,
            passedMonths: 0
        }
    },

    props: {
        birthday: {
            type: Object
        }
    },

    computed: {
        remainMonths() {
            return this.row * this.col - this.passedMonths
        }
    },

    mounted() {
        this.drawGrid()
        this.drawLife()
    },

    methods: {
        drawGrid() {
            const canvas = this.$refs.canvas
            const context = canvas.getContext('2d')

            const backingStorePixelRatio = context.webkitBackingStorePixelRatio
                || context.mozBackingStorePixelRatio
                || context.msBackingStorePixelRatio
                || context.oBackingStorePixelRatio
                || context.backingStorePixelRatio
                || 1

            const ratio = (window.devicePixelRatio || 1) / backingStorePixelRatio

            const row = 30
            const col = 30
            const cellW = 10
            const cellH = 10
            const width = row * cellW
            const height = col * cellH

            canvas.width = width * ratio
            canvas.height = height * ratio

            canvas.style.width = width + 'px'
            canvas.style.height = height + 'px'

            context.scale(ratio, ratio)

            context.strokeStyle = '#ccc'

            for (let i = 1; i < row; i++) {
                context.beginPath()

                context.moveTo(0, i * cellH)

                context.lineTo(width, i * cellH)

                context.stroke()

                context.closePath()
            }

            for (let j = 1; j < col; j++) {
                context.beginPath()

                context.moveTo(j * cellW, 0)

                context.lineTo(j * cellW, height)

                context.stroke()

                context.closePath()
            }
        },

        drawLife() {
            const { year, month, date } = this.birthday

            const today = new Date()
            const todayYear = today.getFullYear()
            const todayMonth = today.getMonth()
            const todayDate = today.getDate()

            const sameYear = year === todayYear
            const sameMonth = month === todayMonth + 1
            let passedMonth = Math.max(0, (todayYear - year - (sameYear ? 0 : 1)) * 12 + ((sameYear ? 0 : 1) * 12 - month) + todayMonth)

            const daysOfBirthMonth = new Date(year, month, 0).getDate()
            const daysOfTodayMonth = new Date(year, todayMonth + 1, 0).getDate()
            let remain = todayDate + (sameMonth ? 0 : daysOfBirthMonth) - date + 1
            passedMonth += Math.floor(remain / daysOfBirthMonth)
            remain %= daysOfBirthMonth
            passedMonth += Math.floor(remain / daysOfTodayMonth)
            remain %= daysOfTodayMonth

            this.passedMonths = passedMonth
            this.passedDays = moment([todayYear, todayMonth, todayDate]).diff(moment([year, month - 1, date]), 'days')

            // draw passed life
            const canvas = this.$refs.canvas
            const context = canvas.getContext('2d')
            context.strokeStyle = '#fff'
            context.fillStyle = '#999'

            const col = passedMonth % 30
            const row = Math.floor(passedMonth / 30)

            context.fillRect(0, 0, row && this.col * this.cellW || 0, row * this.cellH)
            context.fillRect(0, row * this.cellH, col * this.cellW, this.cellH)

            for (let i = 1; i < row; i++) {
                context.beginPath()
                context.moveTo(0, i * this.cellH)
                context.lineTo(this.col * this.cellW, i * this.cellH)
                context.stroke()
                context.closePath()
            }
            for (let j = 1; j < (row && this.col || 0); j++) {
                context.beginPath()
                context.moveTo(j * this.cellW, 0)
                context.lineTo(j * this.cellW, row * this.cellH)
                context.stroke()
                context.closePath()
            }
            for (let j = 1; j <= col; j++) {
                if (j === col) {
                    context.fillStyle = '#f00'
                    context.fillRect((col - 1) * this.cellW, row * this.cellH, this.cellW, this.cellH)

                    context.beginPath()
                    context.moveTo((j - 1) * this.cellW, row * this.cellH)
                    context.lineTo((j - 1) * this.cellW, (row + 1) * this.cellH)
                    context.stroke()
                    context.closePath()
                }

                if (j !== col - 1) {
                    context.beginPath()
                    context.moveTo(j * this.cellW, row * this.cellH)
                    context.lineTo(j * this.cellW, (row + 1) * this.cellH)
                    context.stroke()
                    context.closePath()
                }

                context.beginPath()
                context.moveTo(0, row * this.cellH)
                context.lineTo(j * this.cellW, row * this.cellH)
                context.stroke()
                context.closePath()
            }
        }
    }
}
</script>
