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

export const CurrencyTable = () => {
  const [currencyList, setCurrencyList] = useState<CurrencyList[]>([]);
  const [rows, setRows] = useState<CurrencyList[]>([]);
  const [select, setSelect] = useState('');
  const [isCurrencyListLoaded, setIsCurrencyListLoaded] = useState(false);
  const [inputValues, setInputValues] = useState<{ [key: string]: number }>({});

  const addHandle = () => {
    const selectedCurrency = currencyList.find(
      (currency) => currency.name === select,
    );
    if (selectedCurrency) {
      setRows((prevRows) => [...prevRows, selectedCurrency]);
      setCurrencyList((prevCurrencyList) =>
        prevCurrencyList.filter((currency) => currency.name !== select),
      );
      setSelect('');
      setInputValues((prevValues) => {
        const updatedValues = { ...prevValues, [selectedCurrency.name]: 1 };
        const baseRate = rows.length > 0 ? rows[0].rate : 1;

        rows.forEach((row) => {
          updatedValues[row.name] =
            (updatedValues[selectedCurrency.name] * row.rate) /
            selectedCurrency.rate;
        });

        return updatedValues;
      });
    }
  };

  const handleInputChange = (name: string, value: string) => {
    const newValue = parseFloat(value);
    if (isNaN(newValue)) return;

    setInputValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: newValue };
      const baseRate = rows.find((row) => row.name === name)?.rate || 1;

      rows.forEach((row) => {
        if (row.name !== name) {
          updatedValues[row.name] = (newValue * row.rate) / baseRate;
        }
      });

      return updatedValues;
    });
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      const formattedData = Object.keys(data).map((key) => ({
        name: key,
        rate: data[key],
      }));
      setCurrencyList(formattedData);
      setIsCurrencyListLoaded(true);
    };
    getData();
  }, []);

  return (
    <>
      {isCurrencyListLoaded ? (
        <div className="w-full flex justify-center overflow-hidden font-nunito">
          <div className="w-full flex justify-center p-10">
            <div className="flex-col w-full align-center">
              <div className="w-full flex align-center justify-around mb-5">
                <select
                  value={select}
                  onChange={(e) => {
                    setSelect(e.currentTarget.value);
                  }}
                  className="w-1/3 text-2xl px-10 py-5 border-2 border-black border-solid rounded-lg"
                >
                  <option value="" disabled>
                    Select a currency
                  </option>
                  {currencyList.map((row, index) => (
                    <option key={index} value={row.name}>
                      {row.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addHandle}
                  className="w-1/3 text-3xl px-10 py-5 border-2 border-black border-solid rounded-lg"
                >
                  Add
                </button>
              </div>
              {rows.map((row, index) => (
                <div
                  key={index}
                  className="flex w-full mb-5 border-2 border-black border-solid"
                >
                  <div className="text-3xl w-1/4 px-10 py-5 border-r-2 border-black border-solid text-center">
                    {row.name}
                  </div>
                  <input
                    className="text-3xl px-10 py-5 text-left"
                    value={inputValues[row.name] || ''}
                    onChange={(e) =>
                      handleInputChange(row.name, e.target.value)
                    }
                  />
                </div>
              ))}
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
