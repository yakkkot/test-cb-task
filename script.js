const mainBlock = document.createElement("div");
mainBlock.classList.add("block");
document.body.appendChild(mainBlock);

const button = document.createElement("button");
button.classList.add("button");
button.innerText = "Copy table to Google Spreadsheet";
mainBlock.appendChild(button);

const ref = document.createElement("a");
ref.href = 'https://docs.google.com/spreadsheets/d/1hGyZbLlrAbVbWfe4yHd2tUM8f3e16D_iFqhYKBpW0Ls/edit#gid=0';
ref.target = '_blank';
ref.classList.add("ref");
ref.innerText = "Open Google Spreadsheet";
mainBlock.appendChild(ref);

button.addEventListener("click", buttonClick);

async function buttonClick() {
    try {
        const allRows = Array.from(document.querySelectorAll("grid-row"));
        const columnHeaders = Array.from(document.querySelectorAll("grid-column-header"));

        if (allRows.length === 0 || columnHeaders.length === 0) {
            throw new Error('The page does not have a table.');
        }

        const res = [];

        const headers = columnHeaders.reduce((acc, value, index) => {
            const i = index.toString();
            if (value.textContent.trim() && (value.textContent.trim() !== 'Add Column')) {
                acc[i] = value.textContent;
            }
            return acc;
        }, {});

        res.push(headers);

        allRows.forEach(row => {
            const resultFromRow = Array.from(row.childNodes).reduce((acc, value, index) => {
                const i = index.toString();
                if (value.textContent.trim()) {
                    acc[i] = value.textContent;
                }
                return acc;
            }, {});
            res.push(resultFromRow);
        });

        const data = await fetch("https://sheet.best/api/sheets/b6b47b3c-c01f-4f7b-a3f9-2ad49ff7dd2f", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(res),
        })
        const dataJSON = await data.json()
        console.log(dataJSON);
    }
    catch (e){
        console.log(e);
        window.alert(e);
    }
}




// allRows.forEach(row => {
//     const resultFromRow= Array.from(row.childNodes).reduce((acc, value,index) => {
//         const i = index.toString();
//         if(value.textContent.trim()) {
//             acc[i] = value.textContent;
//         }
//         return acc;
//     }, {});
//     res.push(resultFromRow);
// });
// console.log(res);
//
// fetch("https://sheet.best/api/sheets/b6b47b3c-c01f-4f7b-a3f9-2ad49ff7dd2f", {
//     method: "POST",
//     mode: "cors",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify(res),
// })
//     .then((r) => r.json())
//     .then((data) => {
//         // The response comes here
//         console.log(data);
//     })
//     .catch((error) => {
//         // Errors are reported there
//         console.log(error);
//     });


