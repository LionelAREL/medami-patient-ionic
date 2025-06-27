type FontAwesomeIconDynamicProps = {
  code: number;
} & React.HTMLAttributes<HTMLSpanElement>;

const FontAwesomeIconDynamic = ({
  code,
  ...props
}: FontAwesomeIconDynamicProps) => (
  <span
    {...props}
    style={{
      fontFamily: "'Font Awesome 5 Free'",
      fontWeight: 900,
      ...props.style,
    }}
    aria-hidden="true"
  >
    {String.fromCodePoint(code)}
  </span>
);

export default FontAwesomeIconDynamic;
