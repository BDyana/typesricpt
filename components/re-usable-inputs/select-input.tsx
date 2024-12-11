'use client';

import React, { useState } from 'react';
import Select from 'react-tailwindcss-select';
import { Option, Options } from 'react-tailwindcss-select/dist/components/type';
import AddNewButton from './add-new-button';
type FormSelectInputProps = {
  options: Options;
  label: string;
  option: Option;
  setOption: any;
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
};
export default function FormSelectInput({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
}: FormSelectInputProps) {
  return (
    <div className="">
      {labelShown && (
        <h2 className="pb-2 block text-sm font-medium leading-6 text-primary">
          Select {label}
        </h2>
      )}
      <div className="flex items-center space-x-2 bg-transparent">
        <Select
          isSearchable
          primaryColor="blue"
          value={option}
          onChange={(item) => setOption(item)}
          options={options}
          placeholder={label}
        />
        {href && toolTipText && (
          <AddNewButton toolTipText={toolTipText} href={href} />
        )}
      </div>
    </div>
  );
}
