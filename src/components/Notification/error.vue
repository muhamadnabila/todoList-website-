<template>
    <p v-if="hide">{{msg}}</p>
</template>

<script>
export default {
    name: 'Card',
    props: {
        msg: String,
    },
    data() {
        return {
            hide: true
        }
    },
    created() {
        setTimeout(()=>{  
            this.hide=false
        }, 1000);
    }
}
</script>

<style scoped>
p {
    background-color: red;
    color: white;
    text-align: center;
    position: absolute;
    border-radius:10px;
    padding: 5px;
    font-size: 12px;
    top: 0;
    z-index: 2;
}
</style>
