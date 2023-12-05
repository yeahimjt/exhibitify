'use client';
import React, { Dispatch } from 'react';
const category = [
  { value: 'software_engineer', title: 'Software Engineer' },
  { value: 'fullstack_developer', title: 'Full Stack Developer' },
  { value: 'frontend_developer', title: 'Front End Developer' },
  { value: 'backend_developer', title: 'Back End Developer' },
  { value: 'uiux_developer', title: 'UI/UX Developer' },
  { value: 'product_designer', title: 'Product Designer' },
];

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
              ? 'border-dark-less-text'
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
