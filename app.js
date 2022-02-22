const inputReason = document.querySelector('#input-reason');
const inputAmount = document.querySelector('#input-amount');
const btnClear = document.querySelector('#btn-clear');
const btnAdd = document.querySelector('#btn-add');
const expensesList = document.querySelector('#expenses-list');
const expensesTotal = document.querySelector('#expenses-total');
const https = require('https');

const cleanInputs = () => {
    inputReason.value = '';
    inputAmount.value = '';
}

btnClear.addEventListener('click', () => {
    cleanInputs();
})
var total = 0;
btnAdd.addEventListener('click', () => {
    const reason = inputReason.value;
    const amount = inputAmount.value;

    if (!reason.trim().length || !amount.trim().length) {
        return;
    }
    cleanInputs();
    total += +amount;
    expensesTotal.textContent = total;
    const newItem = document.createElement('ion-item');
    newItem.textContent = `${reason} - ${amount}`;
    expensesList.appendChild(newItem);

})


async function main() {
    let res = await httpsGet('https://movie-database-imdb-alternative.p.rapidapi.com/', '', {})
    console.log(res);
  }

  async function httpsGet(hostname, path, headers) {
    return new Promise(async (resolve, reject) => {
  
      const options = {
        hostname: hostname,
        path: path,
        port: 443,
        method: 'GET',
        headers: headers
      };
  
      let body = [];
  
      const req = https.request(options, res => {
        res.on('data', chunk => body.push(chunk));
        res.on('end', () => {
          const data = Buffer.concat(body).toString();
          resolve(data);
        });
      });
      req.on('error', e => {
        // console.log(`ERROR httpsGet: ${e}`);
        reject(e);
      });
      req.end();
  
    });
  
  }

  console.log(main())