<template>
  <router-view/>
</template>

<style>
/* width */
::-webkit-scrollbar {
    width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #00000000;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(119, 118, 118);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}

html .hide-overflow {
    overflow: hidden;
}
.v-icon {
    user-select: none;
  }
</style>
