interface Props {
  isActive: boolean;
  width?: number;
  height?: number;
}

const Star = ({ isActive, width = 24, height = 24 }: Props) => {
  return !isActive ? (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='24' height='24' fill='white' />
      <path
        d='M11.8396 3.80831C12.1228 3.28242 12.8772 3.28241 13.1604 3.80832L14.9765 7.18112L15.6368 6.82555L14.9765 7.18112C15.3186 7.81655 15.9448 8.24928 16.6602 8.34466L20.7887 8.89513C21.365 8.97197 21.6385 9.64704 21.2782 10.1034L18.2688 13.9141C17.8561 14.4367 17.6961 15.1153 17.8319 15.7672L18.6554 19.7217C18.7812 20.3262 18.1635 20.8153 17.6039 20.5542L13.4515 18.6164C12.8484 18.3349 12.1516 18.3349 11.5485 18.6164L7.32978 20.5851C6.77644 20.8433 6.16293 20.3674 6.27546 19.7673L7.09894 15.3754C7.22945 14.6793 7.02462 13.9624 6.54607 13.4403L3.51604 10.1349C3.10445 9.68584 3.37147 8.9594 3.97588 8.88385L8.32522 8.34018C9.04779 8.24986 9.68197 7.81543 10.0272 7.17428L11.8396 3.80831Z'
        stroke='#D4D5D8'
        strokeWidth='1.5'
      />
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.1604 3.80832L14.9765 7.18112C15.3186 7.81655 15.9448 8.24928 16.6602 8.34466L20.7887 8.89513C21.365 8.97197 21.6385 9.64704 21.2782 10.1034L18.2688 13.9141C17.8561 14.4367 17.6961 15.1153 17.8319 15.7672L18.6554 19.7217C18.7812 20.3262 18.1635 20.8153 17.6039 20.5542L13.4515 18.6164C12.8484 18.3349 12.1516 18.3349 11.5485 18.6164L7.32978 20.5851C6.77644 20.8433 6.16293 20.3674 6.27546 19.7673L7.09894 15.3754C7.22945 14.6793 7.02462 13.9624 6.54607 13.4403L3.51604 10.1349C3.10445 9.68584 3.37147 8.9594 3.97588 8.88385L8.32522 8.34018C9.04779 8.24986 9.68197 7.81543 10.0272 7.17428L11.8396 3.80831C12.1228 3.28242 12.8772 3.28241 13.1604 3.80832Z'
        fill='#F0F4FE'
        stroke='#6085EC'
        strokeWidth='1.5'
      />
    </svg>
    // <svg
    //   width={width}
    //   height={height}
    //   viewBox='0 0 24 24'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <rect width='24' height='24' fill='white' />
    //   <path
    //     d='M11.8396 3.80831C12.1228 3.28242 12.8772 3.28241 13.1604 3.80832L14.9765 7.18112L15.6368 6.82555L14.9765 7.18112C15.3186 7.81655 15.9448 8.24928 16.6602 8.34466L20.7887 8.89513C21.365 8.97197 21.6385 9.64704 21.2782 10.1034L18.2688 13.9141C17.8561 14.4367 17.6961 15.1153 17.8319 15.7672L18.6554 19.7217C18.7812 20.3262 18.1635 20.8153 17.6039 20.5542L13.4515 18.6164C12.8484 18.3349 12.1516 18.3349 11.5485 18.6164L7.32978 20.5851C6.77644 20.8433 6.16293 20.3674 6.27546 19.7673L7.09894 15.3754C7.22945 14.6793 7.02462 13.9624 6.54607 13.4403L3.51604 10.1349C3.10445 9.68584 3.37147 8.9594 3.97588 8.88385L8.32522 8.34018C9.04779 8.24986 9.68197 7.81543 10.0272 7.17428L11.8396 3.80831Z'
    //     fill='#F0F4FE'
    //     stroke='#6085EC'
    //     strokeWidth='1.5'
    //   />
    // </svg>
  );
};

export default Star;
