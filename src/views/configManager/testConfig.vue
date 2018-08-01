<template>
    <info-panel id-name="dayIncomed_count"
                title="电话号"
                sub-title="12123512"
                iconType="social-yen"
                color="#F78C68"></info-panel>
</template>

<script>
    import infoPanel from '../custom-component/infoPanel.vue';

    export default {
        name: "employeeConfig",
        components: {
            infoPanel
        },
    }
</script>

<style scoped>

</style>