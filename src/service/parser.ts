import { isNumber, isDecimal, isDateValid } from '../utils/numberCheck';

function transactionValid (transactionId: string, position: number) {
    if (transactionId.length > 50) {
        return false;
    }
  
    const conditions = ["Invoice", "Inv"];
    if (!conditions.some(el => transactionId.substring(0, position).includes(el))) {
        return false;
    }

    if (!isNumber(transactionId.substring(position, 50))) {
        return false;
    }
    return true;
}

function currencyValid(currencyCode: string) {
    const currencyCodeLength = 3;

    if (currencyCode.length > currencyCodeLength) {
        return false;
    }

    if (currencyCode != currencyCode.toUpperCase()) {
        return false;
    }

    if (isNumber(currencyCode)) {
        return false;
    }

    return true;
}

function amountValid(amount: number) {
    if (!isDecimal(amount)) {
        return false;
    }

    return true;
}

function dateValid(transactionDate: any) {
    if(!isDateValid(transactionDate)) {
        false;
    }

    return true;
}

function validateXmlRow(row: any) {
    const stringPosition = 3;

    const id = row.TransactionId;
    const date = row.TransactionDate;
    const status = row.Status;

    // const amount = row['PaymentDetails'][0]['Amount'];
    // const currency = row['PaymentDetails'][0]['CurrencyCode'][0];

    if (!transactionValid(id, stringPosition)) {
        return row;
    }

    // if (!currencyValid(currency)) {
    //     return row;
    // }

    // if (!amountValid(amount)) {
    //     return row;
    // }

    if (!dateValid(date)) {
        return row;
    }

    //check status [done reject applied]

    return;
}

function validateCsvRow(row: any) {
    const stringPosition = 8;

    //Transaction
    if (!transactionValid(row.TransactionId, stringPosition)) {
        return row;
    }
    // //Currency
    if (!currencyValid(row.CurrencyCode)) {
        return row;
    }
    //Amount
    if (!amountValid(row.Amount)) {
        return row;
    }
    //Date
    if (!dateValid(row.TransactionDate)) {
        return row;
    }
    
    return;
}

export async function validateXmlData(rows: any) {
    const dataRows = rows;
    let rowErrors = <any>[];

    for (let i = 0; i < dataRows.length; i++) {
        const rowError = validateXmlRow(dataRows[i]);
        if (rowError) {
            rowErrors.push(rowError);
        }
    }

    return rowErrors;
}

export function validateCsvData(rows: any) {
    const dataRows = rows.slice(0, rows.length);

    let rowErrors =[];

    for (let i = 0; i < dataRows.length; i++) {
        const rowError = validateCsvRow(dataRows[i]);
        if (rowError) {
            rowErrors.push(rowError);
        }
    }

    return rowErrors;
}