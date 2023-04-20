<template>
    <div class="">
      <div class="h-full transition-all duration-150 shadow-lg hover:shadow-2xl shadow-theme-primary-300 bg-theme-secondary-50 hover:bg-theme-primary-500 hover:text-white rounded-3xl border-theme-primary-300 border"> 
        <div class="flex flex-col p-6 min-h-full w-full ">
        <div class="flex justify-start items-center -translate-y-16 ">
          <img
            class="h-32 w-32"
            :src="item.image"
            :alt="item.title"
          />
        </div>
        <div class="flex flex-col space-y-4">
          <h4
          :class="{
            'text-left': align == 'left',
            'text-center': align == 'center', 
            'text-right': align == 'right',
          }"
          class="text-2xl text-theme-text-primary font-bold flex-1"
        >
          {{ item.title }}
        </h4>
        <p
          class="text-theme-text-secondary text-justify flex-1"
        >
          {{ item.desc }}
        </p>
        </div>
       
      </div>
    </div>
    </div>
    </template>
    
    <script setup>
    
    const props = defineProps({
      item : {
        type:Object,

      },
      align :{
        type:String,
        default:"center"
      }
    });
    </script>
    
    <style>
    
    
    
    @property --angle {
      syntax: '<angle>';
      initial-value: 90deg;
      inherits: true;
    }
    
    @property --gradX {
      syntax: '<percentage>';
      initial-value: 50%;
      inherits: true;
    }
    
    @property --gradY {
      syntax: '<percentage>';
      initial-value: 0%;
      inherits: true;
    }
    
    
    
    
    :root {
        --d: 2500ms;
        --angle: 90deg;
        --gradX: 100%;
        --gradY: 50%;
        --c2: rgba(10, 101, 158, 0.357);
    }
    .wrapper:hover{
        --c1: rgb(9, 92, 165);
    }
    
    .wrapper {
        margin-left: 8px;
      margin-right: 8px;
        min-width: min(10rem, 100%);
    }
    
    .box {
        border: 3px solid rgb(15, 103, 190)  ;
        border-image: conic-gradient(from var(--angle), var(--c2), var(--c1) 0.1turn, var(--c1) 0.15turn, var(--c2) 0.25turn) 30;
        animation: borderRotate var(--d) linear infinite forwards;
    }
    
    .box:nth-child(2) {
        border-image: radial-gradient(ellipse at var(--gradX) var(--gradY), var(--c1), var(--c1) 10%, var(--c1) 40%) 30;
        animation: borderRadial var(--d) linear infinite forwards;
    }
    
    @keyframes borderRotate {
        100% {
            --angle: 420deg;
        }
    }
    
    @keyframes borderRadial {
        20% {
            --gradX: 100%;
            --gradY: 50%;
        }
        40% {
            --gradX: 100%;
            --gradY: 100%;
        }
        60% {
            --gradX: 50%;
            --gradY: 100%;
        }
        80% {
            --gradX: 0%;
            --gradY: 50%;
        }
        100% {
            --gradX: 50%;
            --gradY: 0%;
        }
    }
    </style>