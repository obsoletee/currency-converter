'use client';
import { useEffect, useState } from 'react';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import { supportedCurrencyList } from '@/model/SupportedCurrencyList';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';

interface State {
  isSupportedCurrencyListLoaded: boolean;
  page: number;
  rowsPerPage: number;
}

export default function Currency() {
  const [state, setState] = useState<State>({
    isSupportedCurrencyListLoaded: false,
    page: 0,
    rowsPerPage: 10,
  });

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setState((prevState) => {
      return {
        ...prevState,
        page: newPage,
      };
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setState((prevState) => {
      return {
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
        page: 0,
      };
    });
  };

  useEffect(() => {
    if (supportedCurrencyList.length) {
      setState((prevState) => {
        return {
          ...prevState,
          isSupportedCurrencyListLoaded: true,
        };
      });
    }
  }, []);

  return (
    <>
      {state.isSupportedCurrencyListLoaded ? (
        <div className="w-full flex justify-center overflow-hidden font-nunito">
          <div className="w-full flex justify-center p-10">
            <div className="flex-col w-full align-center">
              <div className="text-4xl w-full text-center mb-10 font-bold">
                Supported Currency List
              </div>
              <TableContainer component={Paper}>
                <Table aria-label="Supported Currency Table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell className="w-1/3" align="right">
                        CURRENCY CODE
                      </TableCell>
                      <TableCell className="w-1/3" align="right">
                        CURRENCY NAME
                      </TableCell>
                      <TableCell className="w-1/3" align="right">
                        CURRENCY COUNTRY
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(state.rowsPerPage > 0
                      ? supportedCurrencyList.slice(
                          state.page * state.rowsPerPage,
                          state.page * state.rowsPerPage + state.rowsPerPage,
                        )
                      : supportedCurrencyList
                    ).map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="right">{row.currencyCode}</TableCell>
                        <TableCell align="right">{row.currencyName}</TableCell>
                        <TableCell align="right">
                          {row.currencyCountry}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          10,
                          25,
                          50,
                          { label: 'All', value: -1 },
                        ]}
                        colSpan={4}
                        count={supportedCurrencyList.length}
                        rowsPerPage={state.rowsPerPage}
                        page={state.page}
                        slotProps={{
                          select: {
                            inputProps: {
                              'aria-label': 'rows per page',
                            },
                            native: true,
                          },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
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
}
