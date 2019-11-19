import Vue from 'vue';
import { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare type VueSwalInstance = typeof Swal.fire;
declare module 'vue/types/vue' {
    interface Vue {
        $swal2: VueSwalInstance;
    }
    interface VueConstructor<V extends Vue = Vue> {
        swal2: VueSwalInstance;
    }
}
interface VueSweetalert2Options extends SweetAlertOptions {
    prefix: string;
    changeTypeToIcon: boolean;
    type?: SweetAlertIcon;
}
declare class VueSweetalert2 {
    static install(vue: Vue | any, options?: VueSweetalert2Options): void;
}
export default VueSweetalert2;
