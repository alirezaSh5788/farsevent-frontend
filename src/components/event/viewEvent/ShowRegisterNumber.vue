<template>
    <div>
        <p>{{getRegNumber}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        getRegNumber:function(){
            return this.$store.gettrs.getRegisterNumber
        }
    },
    created () {
        setTimeout( () => this.$router.push({ path: '/'}), 20000);
    }
}
</script>
<style scoped>

</style>