'use client';
import React, { Dispatch } from 'react';
import { category } from '../constants';

interface CategoryHandlerProps {
  selected: string[];
  setSelected: Dispatch<string[]>;
}

const Categories = ({ selected, setSelected }: CategoryHandlerProps) => {
  return (
    <div className='flex flex-wrap gap-4'>
      {category.map((item, index) => (
        <button
          type='button'
          className={`${
            selected.includes(item.value)
              ? 'border-dark-less-text dark:border-light-less-text'
              : 'border-light-less-text hover:border-dark-less-text hover:shadow-md dark:border-dark-less-text dark:hover:border-light-less-text'
          } rounded-[5px] border  p-[12px] transition-all `}
          key={index}
          onClick={() =>
            selected.includes(item.value)
              ? setSelected(
                  selected.filter((itemSearch) => itemSearch !== item.value)
                )
              : setSelected([item.value])
          }
        >
          <p className='text-[14px]'>{item.title}</p>
        </button>
      ))}
    </div>
  );
};

export default Categories;
