const PurpleRedOrange = () => {
  return (
    <filter
      id="purple-red-orange"
      x="-10%"
      y="-10%"
      width="120%"
      height="120%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      colorInterpolationFilters="sRGB"
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
        <feFuncR type="table" tableValues="0.07 0.13 0.92 1 0.2" />
        <feFuncG type="table" tableValues="0.07 0 0.12 0.89 0.73" />
        <feFuncB type="table" tableValues="0.07 0.6 0.2 0.16 1" />
        <feFuncA type="table" tableValues="0 1" />
      </feComponentTransfer>
      <feBlend
        mode="color"
        in="componentTransfer"
        in2="SourceGraphic"
        result="blend"
      />
    </filter>
  );
};

export default PurpleRedOrange;
