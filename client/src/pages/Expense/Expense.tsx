import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

//Custom
import PageLayout from '../../Pagelayout/PageLayout';
import { getExpenseCount, getAllExpenses } from '../../API';
import CardLayout from '../../components/CardLayout';

const Expense = () => {
  //////////////////////////////////////////////////////
  /////////////////Load Total Expense Count/////////////
  //////////////////////////////////////////////////////

  const [totalExpense, setTotalExpense] = useState([]);

  const loadTotalExpenseCount = async () => {
    try {
      const res = await getExpenseCount();
      if (res) {
        setTotalExpense(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  //////////////////////////////////////////////////////
  ///////////////// Load all expense       /////////////
  //////////////////////////////////////////////////////

  const [allExpense, setAllExpense] = useState([]);

  const loadAllExpenses = async () => {
    try {
      const res = await getAllExpenses();
      if (res) {
        setAllExpense(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadTotalExpenseCount();
    loadAllExpenses();
  }, [totalExpense]);

  return (
    <PageLayout>
      <div>
        {totalExpense &&
          totalExpense.map((expense: any, index) => (
            <CardLayout backgroun_color="white">
              <h6>{expense._id}:</h6>
              <h4>{expense.total} EUR</h4>
            </CardLayout>
          ))}

        <h1>All Expenses</h1>
        {allExpense &&
          allExpense.map((allexpense: any, index) => (
            <CardLayout backgroun_color="white">
              <h4>{allexpense.name}</h4>
              <h4>{allexpense.amount}</h4>
              <p>{allexpense.expenseType}</p>
            </CardLayout>
          ))}
      </div>
    </PageLayout>
  );
};

export default Expense;
