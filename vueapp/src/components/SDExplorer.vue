<template>
    <div class="hello" style="display: flex;">
        <Card style="width: 100px; height:100px">
            <template #content>1</template>
            

        </Card>
        <Card style="width: 100px; height:100px">
            <template #content>2</template>

        </Card>
        <Card style="width: 100px; height:100px">
            <template #content>3</template>

        </Card>
        <Card style="width: 50px; height:50px">
            <template #content>4</template>

        </Card>
    </div>
</template>

<script>
import Card from 'primevue/card';

export default {
    name: 'SDExplorer',
    props: {
        msg: String
    },
    components:{
        Card
    }
}
</script>