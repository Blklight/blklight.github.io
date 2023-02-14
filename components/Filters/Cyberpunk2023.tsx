const Cyberpunk2023 = () => {
  return (
    <filter
      id="cyberpunk-v"
      x="-10%"
      y="-10%"
      width="120%"
      height="120%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      colorInterpolationFilters="linearRGB"
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
        <feFuncR type="table" tableValues="0 0.28 0.01 0.97 1 1" />
        <feFuncG type="table" tableValues="0 0.04 0.66 0.56 1 1" />
        <feFuncB type="table" tableValues="0 1 0.96 1 0 1" />
        <feFuncA type="table" tableValues="0 1" />
      </feComponentTransfer>
      <feBlend
        mode="normal"
        in="componentTransfer"
        in2="SourceGraphic"
        result="blend"
      />
    </filter>
  );
};

export default Cyberpunk2023;
