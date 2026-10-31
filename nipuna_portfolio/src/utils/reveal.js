export const reveal = (show) =>
  `transition duration-700 ease-out motion-reduce:transition-none ${
    show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
  }`;
