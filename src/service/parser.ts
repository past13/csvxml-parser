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

function validateXmlRow(row: any) {
    const stringPosition = 3;

    const id = row['$'].id;
    const date = row['TransactionDate'];
    const amount = row['PaymentDetails'][0]['Amount'];
    const currency = row['PaymentDetails'][0]['CurrencyCode'][0];
    const status = row['Status'];

    if (!transactionValid(id, stringPosition)) {
        return row;
    }

    if (!currencyValid(currency)) {
        return row;
    }

    return;
}

export function validateXmlData(rows: any) {
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