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
                return ['', 'primary', 'danger'].includes(t)
            },

            default: ''
        },

        size: {
            type: String,

            validator (t) {
                return ['', 'large', 'small'].includes(t)
            },

            default: ''
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
                    'u-primary': this.type === 'primary',

                    'u-danger': this.type === 'danger',

                    'u-large': this.size === 'large',

                    'u-small': this.size === 'small'
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
    margin: 0;

    display: inline-block;
    box-sizing: border-box;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    background-image: none;

    text-align: center;
    font-size: 14px;
    line-height: 1.5;
    color: #333;

    user-select: none;
    cursor: pointer;

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

    &.u-primary {
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

    &.u-danger {
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

    &.u-large {
        padding: 8px 16px;
    }

    &.u-small {
        padding: 5px 10px;
        font-size: 12px;
    }
}
</style>
