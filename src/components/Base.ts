import { Vue, Prop } from 'vue-property-decorator';
export default class Base extends Vue {
    @Prop({type: Object, default: {}}) readonly args: object = {};
}