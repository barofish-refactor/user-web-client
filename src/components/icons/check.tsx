interface Props {
  isActive: boolean;
  width?: number;
  height?: number;
}

const Check = ({ isActive, width = 20, height = 20 }: Props) => {
  return !isActive ? (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
      stroke='#D4D5D8'
      stroke-width='1.5'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect x='0.75' y='0.75' width='18.5' height='18.5' rx='9.25' fill='white' />
      <path d='M6 10.5L9 13.5L15 7' stroke-linecap='round' stroke-linejoin='round' />
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect y='0.70874' width='20' height='20' rx='10' fill='#2659E5' />
      <path
        d='M6 11.2087L9 14.2087L15 7.70874'
        stroke='white'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};

export default Check;
