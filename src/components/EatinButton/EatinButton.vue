<template>
    <component
        :is="type === 'link' ? 'a' : 'button'"
        :type="type === 'link' ? null : type"
        class="eatin-button"
        :class="this.class"
        @click="this.type !== 'link' && onClick"
        v-bind="this.args"
    >
        <span class="eatin-button--text" v-text="text"></span>
    </component>
</template>

<script lang="ts">
import Base from '../Base';
import { Emit, Vue, Prop } from 'vue-property-decorator';

export default class EatinButton extends Base {
    @Prop({type: String, default: ""}) readonly text: string | undefined;
    @Prop({
        type: String,
        default: "button",
        validator: (v: string) =>
            ["button", "submit", "reset", "link"].indexOf(v) !== -1,
    })
    readonly type: string | undefined;
    @Prop({ type: Boolean, default: false }) flat = false;
    @Prop({ type: Boolean, default: false }) primary = false;
    @Prop({ type: Boolean, default: false }) secondary = false;
    @Prop({ type: Boolean, default: false }) danger = false;
    @Prop(String) href = ""
    @Prop(String) target = "_blank"

    get class(): string {
        let classes: string[] = [];
        if (this.type === "link") {
            classes.push("--link");
        }
        if (this.flat) {
            classes.push("--flat");
        } else if (this.primary) {
            classes.push("--primary");
        } else if (this.secondary) {
            classes.push("--secondary");
        } else if (this.danger) {
            classes.push("--danger");
        }
        return classes.join(" ");
    }

    get args() : object {
        return this.type === 'link' ? {"href": this.href} : {"type": this.type}
    }

    @Emit("onClick")
    onClick(e: Event) : void {}
}
</script>
<style lang="scss">

@import "scss/_variables";

.eatin-button {
    display: inline-block;
    
    border: 1px solid transparent;
    border-radius: $border-radius;

    padding: $spacing-xs $spacing-xl;
    &--text {
        display: inline-block;
        line-height: $line-height;
    }

    background-color: $background-variant;
    color: $on-background;

    &:hover {
        background-color: $background;
        cursor: pointer;
    }
    &.--link {
        &,
        &:visited {
            text-decoration: none;
        }
    }
    &.--disabled {
        background-color: $background-disabled;
        color: $on-background-disabled;
        &:hover {
            background-color: $background-disabled;
        }
        cursor: not-allowed;
    }
    &.--secondary {
        background-color: $background;
        color: $on-background;
        border-color: $on-background;
        &:hover {
            background-color: $background-variant;
        }
    }
    &.--flat {
        background-color: $background;
        color: $on-background;        &:hover {
            background-color: $background-variant;
        }
    }
    &.--primary {
        background-color: $primary;
        color: $on-primary;
        &:hover {
            background-color: $primary-variant;
        }
        &.--disabled {
            background-color: $primary-disabled;
            color: $on-primary-disabled;
            &:hover {
                background-color: $primary-disabled;
            }
        }
    }
    &.--danger {
        background-color: $danger;
        color: $on-danger;
        &:hover {
            background-color: $danger-variant;
        }
        &.--disabled {
            background-color: $danger-disabled;
            color: $on-danger-disabled;
            &:hover {
                background-color: $danger-disabled;
            }
        }
    }
}
</style>