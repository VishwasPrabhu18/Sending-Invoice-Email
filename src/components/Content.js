import axios from "axios";

let fetchJson = async () => {
    const fetchData = await axios.get("http://localhost:3000/json.txt");
    const jsonData = fetchData["data"];
    return jsonData;
}

const renderRow = (dictVal) => {
    let rows = ``;

    dictVal.forEach((items, idx) => {
        rows += `
        <tr style="height: 30px;">
            <td style="height: 30px; text-align: center;">${dictVal[idx].date==="" ? " - " : dictVal[idx].date}</td>
            <td style="height: 30px; text-align: left;">&nbsp;${dictVal[idx].description==="" ? "&emsp;&emsp;&emsp;&emsp;- " : dictVal[idx].description}</td>
            <td style="height: 30px; text-align: center;">${dictVal[idx].qty==="" ? " - " : dictVal[idx].qty}</td>
            <td style="height: 30px; text-align: center;">${dictVal[idx].rate==="" ? " - " : dictVal[idx].rate}</td>
            <td style="height: 30px; text-align: center;">${dictVal[idx].amount==="" ? " - " : dictVal[idx].amount}</td>
        </tr> `
    });

    return rows;
}

const msgContent = async () => {

    const data = await fetchJson();
    const dictVal = data["dictVal"];
    let dictKey = data["dictKey"];

    let companyData = data["details"]["companyDetails"];
    let invoiceTo = data["details"]["invoice_to"];
    let bankData = data["details"]["bank"];

    const messages = 
    `
    <table style="border-collapse: collapse; width: 50rem; height: 544.984px; margin-left: auto; margin-right: auto;" border="1"><colgroup><col style="width: 38.3091%;"><col style="width: 31.3043%;"><col style="width: 30.2545%;"></colgroup>
        <tbody>
            <tr style="height: 84px;">
                <td style="height: 84px; text-align: left; padding-top: 10px;">
                    <p><strong>&nbsp; &nbsp;From,</strong></p>
                    <p style="padding-bottom: 10px;">&nbsp; &nbsp;${companyData.name} <br/>&nbsp; &nbsp; ${companyData.address} <br/>&nbsp; &nbsp; ${companyData.phone} <br/>&nbsp; &nbsp; ${companyData.website}</p>
                </td>
                <td style="text-align: center; height: 84px;">
                    <p><strong>Invoice #</strong></p>
                    <p>${companyData.invoice_id}</p>
                </td>
                <td style="text-align: center; height: 84px;">
                    <p style="text-align: center;"><strong>Invoice Date</strong></p>
                    <p style="text-align: center;">${companyData.invoice_date}</p>
                </td>
            </tr>
            
            <tr style="text-align: center; height: 84px;">
                <td style="height: 84px; padding-top: 10px;">
                    <p style="text-align: left;"><strong>&nbsp; &nbsp;Invoice To,</strong></p>
                    <p style="text-align: left; padding-bottom: 10px;"">&nbsp;&nbsp; ${invoiceTo.name} <br/>&nbsp; &nbsp; ${invoiceTo.address} <br/>&nbsp; &nbsp; ${invoiceTo.phone} <br/>&nbsp; &nbsp; ${invoiceTo.emailAddr} <br/></p>
                </td>
                <td style="height: 84px;">
                    <p><strong>Due Date</strong></p>
                    <p>${invoiceTo.due_date}</p>
                </td>
                <td style="height: 84px;">
                    <p><strong>Payment Date</strong></p>
                    <p>${invoiceTo.payment_date}</p>
                </td>
            </tr>

            <tr style="height: 376.984px;">
                <td style="height: 376.984px; padding: 20px;" colspan="3">
                    <table style="border-collapse: collapse; width: 100.12%; height: 270.984px;" border="1"><colgroup><col style="width: 20.0048%;"><col style="width: 20.4275%;"><col style="width: 20.0048%;"><col style="width: 20.0048%;"><col style="width: 19.7231%;"></colgroup>
                        <tbody>
                            <tr style="height: 45.6094px;">
                                <td style="text-align: center; height: 45.6094px;"><strong>${dictKey[0].dict_date}</strong></td>
                                <td style="height: 45.6094px; text-align: left;"><strong>&nbsp;${dictKey[1].dict_description}</strong></td>
                                <td style="text-align: center; height: 45.6094px;"><strong>${dictKey[2].dict_qty}</strong></td>
                                <td style="text-align: center; height: 45.6094px;"><strong>${dictKey[3].dict_rate}</strong></td>
                                <td style="text-align: center; height: 45.6094px;"><strong>${dictKey[4].dict_amount}</strong></td>
                            </tr>
                            
                            ` + renderRow(dictVal) + `

                            <tr style="height: 36px;">
                                <td style="text-align: center; height: 36px;" colspan="3">&nbsp;</td>
                                <td style="text-align: left; height: 36px;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; Subtotal :</strong></td>
                                <td style="text-align: center; height: 36px;"><strong>$200.00</strong></td>
                            </tr>
                            <tr style="height: 36px;">
                                <td style="height: 36px; text-align: left;" colspan="3">&nbsp; &nbsp; &nbsp;Payment Methods:</td>
                                <td style="text-align: left; height: 36px;"><strong>&nbsp; &nbsp; &nbsp;Tax @ 7% :</strong></td>
                                <td style="text-align: center; height: 36px;"><strong>$14.00</strong></td>
                            </tr>
                            <tr style="height: 36px;">
                                <td style="height: 36px; text-align: left;" colspan="3">&nbsp; &nbsp; &nbsp;[PayPal Id]<br>&nbsp; &nbsp; &nbsp;We accept Visa Master Card etc.</td>
                                <td style="text-align: left; height: 36px;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Others :</strong></td>
                                <td style="text-align: center; height: 36px;">-</td>
                            </tr>
                            <tr style="height: 36px;">
                                <td style="height: 36px; text-align: left;" colspan="3">&nbsp;</td>
                                <td style="text-align: left; height: 36px;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Total :</strong></td>
                                <td style="text-align: center; height: 36px;"><strong>$214.00</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    <p>&nbsp;</p>
                    <p><strong>Bank Details,</strong></p>
                    <p><strong>ACCNO :</strong>&ensp;${bankData.accNo};<br><strong>Bank :</strong>&ensp; ${bankData.name};<br><strong>IFSC :</strong>&ensp; ${bankData.ifsc};</strong></p>
                    <p>&nbsp;</p>
                    <p style="text-align: center;"><strong><em>Thank You For Your Business!</em></strong></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p>&nbsp;</p>
    `
    return messages;
}

export default msgContent;