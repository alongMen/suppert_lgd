<template>
    <div class="Partner">
        <div class="title_p">合作伙伴 for partner</div>
        <div class="p_logs">
            <img src="/image/partner.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Partner',
    data(){
        return{

        }
    }
}
</script>

<style lang="less">
    .Partner{
        width: 1000px;
        position: relative;
        .title_p{
            position: absolute;
            top:-40px;
            padding-left: 20px;
            color: #808080;
            font-size: 16px;
            line-height: 40px;
        }
    }
</style>