const Logo = () => {
  return (
    <svg
      width="189"
      height="40"
      viewBox="0 0 189 10"
      className="fill-secondary-foreground hover:fill-secondary-foreground/75 transition-all duration-500 ease-in-out cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10"
        y="10"
        width="180"
        height="80"
        fill="white"
        stroke="black"
        stroke-width="2"
      />
      <rect
        x="20"
        y="20"
        width="160"
        height="60"
        fill="white"
        stroke="black"
        stroke-width="1"
      />

      <text
        x="50%"
        y="50%"
        font-family="Arial"
        font-size="36"
        fill="green"
        stroke="blue"
        stroke-width="1"
        text-anchor="middle"
        alignment-baseline="middle"
      >
        Scribble
      </text>
    </svg>
  );
};
export default Logo;
