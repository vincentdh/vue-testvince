// import 'jest';
import {mount, createLocalVue} from "@vue/test-utils";
import VueSwal2 from '../src/index'
import {CreateElement} from "vue";

const factory = () => {
    const vue = createLocalVue();
    vue.use(VueSwal2)
    return vue
}

const factoryComponent = () => {
    const vue = createLocalVue();
    vue.use(VueSwal2);
    return mount(
        {
            render(h) {
                return h('div');
            },
        },
        {localVue: vue},
    );
};

const retroCompatibleFactoryComponent = () => {
    const vue = createLocalVue();
    vue.use(VueSwal2, {
        prefix: 'swal',
        changeTypeToIcon: true
    });
    return mount(
        {
            render(h) {
                return h('div');
            },
        },
        {localVue: vue},
    );
};

describe('Vue-Swal2 without parameters', () => {
    const vue = createLocalVue()
    vue.use(VueSwal2)

    it('should exists', () => {
        expect(typeof VueSwal2).toBe('function');
    });

    it('should exists', () => {
        const Vue = factory();
        expect(typeof Vue.swal2).toBe('function');
    });

    it('should has promise', () => {
        const Vue = factory();
        const pr = Vue.swal2('Test');
        expect(pr.then).toBeTruthy();
    });
});

describe('Vue-Swal2 vm', () => {
    it('should vm', () => {
        const wrapper = factoryComponent();

        expect(typeof wrapper.vm.$swal2).toBe('function');
    });

    it('should vm has', () => {
        const wrapper = factoryComponent();
        const pr = wrapper.vm.$swal2('Test');
        expect(pr.then).toBeTruthy();
    });

    it('can fire original swal', () => {
        const wrapper = factoryComponent();
        const pr = wrapper.vm.$swal2.fire('test')
        expect(pr.then).toBeTruthy();
    })
});

describe('Vue-Swal2 vm with retro compatibility options', () => {
    it('should vm', () => {
        const wrapper = retroCompatibleFactoryComponent();

        expect(typeof wrapper.vm.$swal).toBe('function');
    });

    it('should vm has', () => {
        const wrapper = retroCompatibleFactoryComponent();
        const pr = wrapper.vm.$swal({
            text: 'test',
            type: 'question'
        });
        expect(pr.then).toBeTruthy();
    });
});