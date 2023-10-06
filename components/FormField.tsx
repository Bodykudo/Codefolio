'use client';

import { ChangeEvent } from 'react';

type Props = {
  type?: string;
  title: string;
  state: string;
  placeholder?: string;
  prefixValue?: string;
  isRequired?: boolean;
  isTextArea?: boolean;
  isDisabled?: boolean;
  isURL?: boolean;
  maxChars?: number;
  setState: (value: string) => void;
};

export default function FormField({
  type,
  title,
  state,
  placeholder,
  prefixValue,
  isRequired = false,
  isTextArea,
  isDisabled = false,
  isURL = false,
  maxChars = 200,
  setState,
}: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-4">
      <label htmlFor="" className="w-full text-gray-100">
        {title}{' '}
        <span className="text-sm">
          {isTextArea && `(${state.length}/${maxChars})`}
        </span>
      </label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          required={isRequired}
          className="w-full rounded-xl bg-light-white-100 p-4 outline-0"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setState(e.target.value)
          }
          disabled={isDisabled}
          maxLength={maxChars}
        />
      ) : isURL ? (
        <div className="flex w-full items-center gap-4">
          <input
            type={type || 'text'}
            placeholder={placeholder}
            value={prefixValue}
            required={isRequired}
            className="flex-1 rounded-xl bg-light-white-100 p-4 outline-0"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setState(e.target.value)
            }
            disabled
          />
          <input
            type={type || 'text'}
            placeholder={placeholder}
            value={state}
            required={isRequired}
            className="rounded-xl bg-light-white-100 p-4 outline-0"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setState(e.target.value)
            }
            disabled={isDisabled}
          />
        </div>
      ) : (
        <input
          type={type || 'text'}
          placeholder={placeholder}
          value={state}
          required={isRequired}
          className="w-full rounded-xl bg-light-white-100 p-4 outline-0"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setState(e.target.value)
          }
          disabled={isDisabled}
        />
      )}
    </div>
  );
}
