'use client';
import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface CurrencyList {
  name: string;
  rate: number;
}

const fetchData = async () => {
  const response = await fetch('https://open.er-api.com/v6/latest/USD');
  const data = await response.json();
  return data.rates;
};

interface State {
  currencyList: CurrencyList[];
  rows: CurrencyList[];
  select: string;
  isCurrencyListLoaded: boolean;
  inputValues: { [key: string]: number };
}

export const CurrencyTable = () => {
  const [state, setState] = useState<State>({
    currencyList: [],
    rows: [],
    select: '',
    isCurrencyListLoaded: false,
    inputValues: {},
  });

  const addHandle = () => {
    const selectedCurrency = state.currencyList.find(
      (currency) => currency.name === state.select,
    );
    if (selectedCurrency) {
      setState((prevState) => {
        const newRows = [...prevState.rows, selectedCurrency];
        const newCurrencyList = prevState.currencyList
          .filter((currency) => currency.name !== state.select)
          .sort((a, b) => a.name.localeCompare(b.name));

        const newInputValues = {
          ...prevState.inputValues,
          [selectedCurrency.name]: 1,
        };

        newRows.forEach((row) => {
          if (row.name !== selectedCurrency.name) {
            newInputValues[row.name] = (1 * row.rate) / selectedCurrency.rate;
          }
        });

        return {
          ...prevState,
          rows: newRows,
          currencyList: newCurrencyList,
          select: '',
          inputValues: newInputValues,
        };
      });
    }
  };

  const handleDelete = (name: string) => {
    const removedCurrency = state.rows.find((row) => row.name === name);
    if (removedCurrency) {
      setState((prevState) => {
        const newRows = prevState.rows.filter((row) => row.name !== name);
        const newCurrencyList = [
          ...prevState.currencyList,
          removedCurrency,
        ].sort((a, b) => a.name.localeCompare(b.name));

        const newInputValues = { ...prevState.inputValues };
        delete newInputValues[name];

        if (newRows.length > 0) {
          const baseCurrency = newRows[0];
          newRows.forEach((row) => {
            if (row.name !== baseCurrency.name) {
              newInputValues[row.name] =
                (newInputValues[baseCurrency.name] * row.rate) /
                baseCurrency.rate;
            }
          });
        }

        return {
          ...prevState,
          rows: newRows,
          currencyList: newCurrencyList,
          inputValues: newInputValues,
        };
      });
    }
  };

  const handleInputChange = (name: string, value: string) => {
    const newValue = parseFloat(value);
    if (isNaN(newValue)) return;

    setState((prevState) => {
      const newInputValues = { ...prevState.inputValues, [name]: newValue };
      const baseRate =
        prevState.rows.find((row) => row.name === name)?.rate || 1;

      prevState.rows.forEach((row) => {
        if (row.name !== name) {
          newInputValues[row.name] = (newValue * row.rate) / baseRate;
        }
      });

      return {
        ...prevState,
        inputValues: newInputValues,
      };
    });
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      const formattedData = Object.keys(data).map((key) => ({
        name: key,
        rate: data[key],
      }));
      setState((prevState) => ({
        ...prevState,
        currencyList: formattedData,
        isCurrencyListLoaded: true,
      }));
    };
    getData();
  }, []);

  return (
    <>
      {state.isCurrencyListLoaded ? (
        <div className="w-full flex justify-center overflow-hidden font-nunito">
          <div className="w-full flex justify-center p-10">
            <div className="flex-col w-full align-center">
              <div className="w-full flex align-center justify-around mb-5">
                <select
                  value={state.select}
                  onChange={(e) => {
                    const value = (e.target as HTMLSelectElement).value;
                    setState((prevState) => ({
                      ...prevState,
                      select: value,
                    }));
                  }}
                  className="ease duration-200 w-1/3 text-2xl px-10 py-5 border-2 border-black border-solid rounded-xl hover:shadow-xl"
                >
                  <option value="" disabled>
                    Select a currency
                  </option>
                  {state.currencyList.map((row, index) => (
                    <option key={index} value={row.name}>
                      {row.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addHandle}
                  className="ease duration-200 w-1/3 text-3xl px-10 py-5 border-2 border-black border-solid rounded-xl hover:shadow-xl hover:translate-y-1 hover:bg-slate-200 active:bg-slate-700 active:text-white"
                >
                  Add
                </button>
              </div>
              <div className="flex w-full mb-5 border-2 border-black border-solid rounded-xl">
                <div className="flex items-center text-3xl w-1/2 px-10 py-5 border-r-2 border-black border-solid text-center">
                  Currency
                </div>
                <div className="text-3xl w-1/4 px-10 py-5 text-left border-r-2 border-black border-solid ">
                  Value
                </div>
                <div className="text-3xl w-1/4 px-10 py-5 text-left">
                  Actions
                </div>
              </div>
              {state.rows.length === 0 ? (
                <div className="text-center text-3xl underline">
                  No data found
                </div>
              ) : (
                state.rows.map((row, index) => (
                  <div
                    key={index}
                    className="flex w-full mb-5 border-2 border-black border-solid rounded-xl"
                  >
                    <div className="flex items-center text-3xl w-1/2 px-10 py-5 border-r-2 border-black border-solid text-center">
                      {row.name}
                    </div>
                    <input
                      className="text-3xl w-1/4 px-10 py-5 text-left border-r-2 border-black border-solid "
                      value={state.inputValues[row.name] || ''}
                      onChange={(e) =>
                        handleInputChange(row.name, e.target.value)
                      }
                    />
                    <div className="w-1/4 px-10 py-5 text-center">
                      <button
                        onClick={() => handleDelete(row.name)}
                        className="ease duration-200 text-3xl px-10 py-2 border-2 border-black border-solid rounded-lg hover:shadow-xl hover:translate-y-0.5 hover:bg-slate-200 active:bg-slate-700 active:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full text-center fixed top-1/3  ">
          <CircularProgress />
        </div>
      )}
    </>
  );
};
