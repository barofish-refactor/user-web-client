import React, { useState } from 'react';
interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
export const Pagination = (props: PaginationProps) => {
  const numPages = Math.ceil(props.total / props.limit);
  const [number, setNumber] = useState(1);
  console.log(props.total);

  const next = () => {
    if (props.page === number + 4 && props.page !== numPages) {
      if (props.page + 3 >= numPages) setNumber(prev => prev + 1);
      else setNumber(prev => prev + 3);
    }
    props.setPage(props.page + 1);
  };

  const prev = () => {
    if (props.page === number && props.page !== 1) {
      if (props.page - 3 <= 1) setNumber(prev => prev - 1);
      else setNumber(prev => prev - 3);
    }
    props.setPage(props.page - 1);
  };
  console.log(number, 'number', props.page);

  return (
    <>
      <div className='paginationNev'>
        <button className='paginationButton' disabled={props.page === 1} onClick={prev}>
          &lt;
        </button>
        {Array(Math.ceil(props.total / props.limit) < 5 ? Math.ceil(props.total / props.limit) : 5)
          .fill()
          .slice(0, 5)
          .map((x, i: number) => (
            <button
              className=''
              key={i + number}
              // aria-current={
              //     props.page === i + number ? 'page' : null
              // }
              onClick={() => props.setPage(i + number)}
            >
              {i + number}
            </button>
          ))}
        <button
          className='paginationButton'
          onClick={next}
          // disabled={props.page === numPages}
        >
          &gt;
        </button>
      </div>
    </>
  );
};
