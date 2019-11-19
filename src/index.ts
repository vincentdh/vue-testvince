import Vue from 'vue';

import {SweetAlertOptions} from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';

type VueSwalInstance = typeof Swal.fire;

declare module 'vue/types/vue' {
    interface Vue {
        $swal2: VueSwalInstance;
    }

    interface VueConstructor<V extends Vue = Vue> {
        swal2: VueSwalInstance;
    }
}

interface VueSweetalert2Options extends SweetAlertOptions {
    prefix: string,
    changeTypeToIcon: boolean
}

class VueSweetalert2 {
    static install(vue: Vue | any, options?: VueSweetalert2Options): void {

        let prefix: string = "swal2"
        let changeTypeToIcon: boolean = false

        if (options !== undefined) {
            prefix = options.prefix
            changeTypeToIcon = options.changeTypeToIcon
            delete options['prefix']
            delete options['changeTypeToIcon']
        }

        const swalFunction = (...args: [SweetAlertOptions]) => {
            if (options) {
                const mixed = Swal.mixin(options);

                return mixed.fire.apply(mixed, args);
            }

            return Swal.fire.apply(Swal, args);
        };

        let methodName: string | number | symbol;

        for (methodName in Swal) {
            if (
                Object.prototype.hasOwnProperty.call(Swal, methodName) &&
                typeof Swal[methodName] === 'function'
            ) {
                swalFunction[methodName] = (method => {
                    return (...args: any[]) => {
                        if (changeTypeToIcon && Object.prototype.hasOwnProperty.call(args, 'type')) {
                            args['icon'] = args['type']
                            delete args['type']
                        }
                        return Swal[method].apply(Swal, args);
                    };
                })(methodName);
            }
        }

        vue[prefix] = swalFunction;

        // add the instance method
        if (!vue.prototype.hasOwnProperty('$'+prefix)) {
            vue.prototype['$'+prefix] = swalFunction;
        }
    }
}

export default VueSweetalert2;