<template>
    <div id="telon">
        <div class="d-flex flex-column align-items-center">
            <img id="logoTelon" src="../assets/logofinal.png" alt="Logo KFFW" class="mb-3">
             <b-spinner style="width: 3rem; height: 3rem;" label="Loading..." variant="light"></b-spinner>
        </div>
    </div>
</template>

<style scoped>
#telon {
    position: absolute;
    background-color: red;
    z-index: 9;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

#logoTelon {
    width: 200px;
    height: auto;
}
</style>