<template>
  <filter
    id="pink-cyan"
    x="-10%"
    y="-10%"
    width="120%"
    height="120%"
    filterUnits="objectBoundingBox"
    primitiveUnits="userSpaceOnUse"
    color-interpolation-filters="sRGB"
  >
    <feColorMatrix
      type="matrix"
      result="gray"
      values="1 0 0 0 0
                              1 0 0 0 0
                              1 0 0 0 0
                              0 0 0 1 0"
    ></feColorMatrix>

    <feComponentTransfer color-interpolation-filters="sRGB" result="duotone">
      <feFuncR type="table" tableValues="0.78 0.53" />
      <feFuncG type="table" tableValues="0.09 0.98" />
      <feFuncB type="table" tableValues="0.44 0.99" />
      <feFuncA type="table" tableValues="0 1"></feFuncA>
    </feComponentTransfer>
    <feBlend
      mode="normal"
      in="componentTransfer"
      in2="SourceGraphic"
      result="blend"
    />
  </filter>
  <!-- <filter
    id="pink-cyan"
    x="-10%"
    y="-10%"
    width="120%"
    height="120%"
    filterUnits="objectBoundingBox"
    primitiveUnits="userSpaceOnUse"
    color-interpolation-filters="sRGB"
  >
    <feColorMatrix
      type="matrix"
      values=".33 .33 .33 0 0
            .33 .33 .33 0 0
            .33 .33 .33 0 0
            0 0 0 1 0"
      in="SourceGraphic"
      result="colormatrix"
    />
    <feComponentTransfer in="colormatrix" result="componentTransfer">
      <feFuncR type="table" tableValues="0.87 0.5" />
      <feFuncG type="table" tableValues="0.13 0.96" />
      <feFuncB type="table" tableValues="0.8 1" />
      <feFuncA type="table" tableValues="0 1" />
    </feComponentTransfer>
    <feBlend
      mode="normal"
      in="componentTransfer"
      in2="SourceGraphic"
      result="blend"
    />
  </filter> -->
</template>
