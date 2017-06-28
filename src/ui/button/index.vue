<template>
<button :class="className" :disabled="disabled" @click="doClick">{{ text }}</button>
</template>

<script>
export default {
    name: 'u-button',

    props: {
        text: {
            required: true,
            type: String,
            default: ''
        },
        clickHandler: {
            type: Function,
            default: function () {}
        },
        type: {
            type: String,
            validator (t) {
                return [t, 'primary', 'danger'].includes(t)
            }
        },
        size: {
            type: String,
            validator (t) {
                return [t, 'large', 'small'].includes(t)
            }
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        className() {
            return [
                'u-button',
                {
                    [`u-button-${this.type}`]: !!this.type,
                    [`u-button-${this.size}`]: !!this.size
                }
            ]
        }
    },
    methods: {
        doClick() {
            this.$emit('clickHandler')
        }
    }
}
</script>

<style lang="less">
.u-button {
    display: inline-block;
    width: 100%;
    margin: 0;
    padding: 6px 12px;
    border: 1px solid #ccc;

    box-sizing: border-box;
    border-radius: 4px;
    background-color: #fff;
    background-image: none;

    text-align: center;
    font-size: 14px;
    line-height: 1.5;
    color: #333;

    user-select: none;
    cursor: pointer;
    outline: none;

    &:active, &:hover {
        background-color: #eee;
    }
    &[disabled] {
        cursor: not-allowed;
        opacity: .65;
        &:active, &:hover {
            background-color: #fff;
        }
    }
    &.u-button-primary {
        background-color: #13b5b1;
        border-color: #13b5b1;
        color: #fff;
        &:active, &:hover {
            background-color: #10a7a3;
            border-color: #10a7a3;
        }
        &[disabled] {
            &:active, &:hover {
                background-color: #13b5b1;
                border-color: #13b5b1;
            }
        }
    }
    &.u-button-danger {
        background-color: #f04134;
        border-color: #f04134;
        color: #fff;
        &:active, &:hover {
            background-color: #e04034;
            border-color: #e04034;
        }
        &[disabled] {
            &:active, &:hover {
                background-color: #f04134;
                border-color: #f04134;
            }
        }
    }
    &.u-button-large {
        padding: 8px 16px;
    }
    &.u-button-small {
        padding: 5px 10px;
        font-size: 12px;
    }
}
</style>
