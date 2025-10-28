import { ReportType } from "../../@types/report.type";
import { formatCurrency } from "../../utils/format-currency";
import { capitalizeFirstLetter } from "../../utils/helper";

export const getReportEmailTemplate = (
  reportData: ReportType & { username: string },
  frequency: string
) => {
  const {
    username,
    period,
    totalIncome,
    totalExpenses,
    availableBalance,
    savingsRate,
    topSpendingCategories,
    insights,
  } = reportData;

  const reportTitle = `${capitalizeFirstLetter(frequency)} Report`;

  const categoryList = topSpendingCategories
    .map(
      (cat: any) => `<li>
      ${cat.name} - ${formatCurrency(cat.amount)} (${cat.percent}%)
      </li>
    `
    )
    .join("");

  const insightsList = insights
    .map((insight: string) => `<li>${insight}</li>`)
    .join("");

  const currentYear = new Date().getFullYear();
  return `
  <!DOCTYPE html>
 <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <title>${reportTitle}</title>
     <!-- Google Fonts Link -->
     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
   </head>
   <body style="margin: 0; padding: 0; font-family: 'Roboto', Arial, sans-serif; background-color: #f7f7f7; font-size: 16px;">
     <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f7f7f7; padding: 20px;">
       <tr>
         <td>
           <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
             <tr>
               <td style="background-color: #00bc7d; padding: 20px 30px; color: #ffffff; text-align: center;">
                 <h2 style="margin: 0; font-size: 24px; text-transform: capitalize">${reportTitle}</h2>
               </td>
             </tr>
             <tr>
               <td style="padding: 20px 30px;">
                 <p style="margin: 0 0 10px; font-size: 16px;">Hi <strong>${username}</strong>,</p>
                 <p style="margin: 0 0 20px; font-size: 16px;">Here's your financial summary for <strong>${period}</strong>.</p>
 
                 <table width="100%" style="border-collapse: collapse;">
                   <tr>
                     <td style="padding: 8px 0; font-size: 16px;"><strong>Total Income:</strong></td>
                     <td style="text-align: right; font-size: 16px;">${formatCurrency(totalIncome)}</td>
                   </tr>
                   <tr>
                     <td style="padding: 8px 0; font-size: 16px;"><strong>Total Expenses:</strong></td>
                     <td style="text-align: right; font-size: 16px;">${formatCurrency(totalExpenses)}</td>
                   </tr>
                   <tr>
                     <td style="padding: 8px 0; font-size: 16px;"><strong>Available Balance:</strong></td>
                     <td style="text-align: right; font-size: 16px;">${formatCurrency(availableBalance)}</td>
                   </tr>
                   <tr>
                     <td style="padding: 8px 0; font-size: 16px;"><strong>Savings Rate:</strong></td>
                     <td style="text-align: right; font-size: 16px;">${savingsRate.toFixed(2)}%</td>
                   </tr>
                 </table>
                 <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;" />
                 <h4 style="margin: 0 0 10px; font-size: 16px;">Top Spending Categories</h4>
                 <ul style="padding-left: 20px; margin: 0; font-size: 16px;">
                   ${categoryList}
                 </ul>
                 <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;" />
                 <h4 style="margin: 0 0 10px; font-size: 16px;">Insights</h4>
                 <ul style="padding-left: 20px; margin: 0; font-size: 16px;">
                   ${insightsList}
                 </ul>
                 <p style="margin-top: 30px; font-size: 13px; color: #888;">This report was generated automatically based on your recent activity.</p>
               </td>
             </tr>
             <tr>
               <td style="background-color: #f0f0f0; text-align: center; padding: 15px; font-size: 12px; color: #999;">
                 &copy; ${currentYear} Finora. All rights reserved.
               </td>
             </tr>
           </table>
         </td>
       </tr>
     </table>
   </body>
 </html>
   `;
};
