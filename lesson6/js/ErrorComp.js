
Vue.component('error-component', {
    template: '<div class="error"><p>{{ message }}</p></div>',
    props: ['message'],
    data() {
        return{
            message:''
        }
    }
})




