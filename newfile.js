function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            let alertElement = document.getElementById("alert");
            alertElement.style.display = "inline";
            setTimeout(() => {
                alertElement.style.display = "none";
            }, 1000);
        },
        () => {
            alert("Clipboard copying failed");
        }
    );
}

const deletepassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    let arrupdated = arr.filter((e) => {
        return e.website != website;
    });
    localStorage.setItem("passwords", JSON.stringify(arrupdated));
    alert(`Successfully deleted ${website}'s password`);
    ShowPasswrd();
};

// Logic to fill table
const ShowPasswrd = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null) {
        tb.innerHTML = "No Data To Show";
    } else {
        tb.innerHTML = `
            <tr>
                <td>S No</td>
                <td>Website</td>
                <td>Username</td>
                <td>Password</td>
                <td>Action</td>
            </tr>`;
        let array = JSON.parse(data);
        let str = "";
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            str += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${element.website}<img onclick="copyText('${element.website}')" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiAvPgogIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMTYgMUg0Yy0xLjEgMC0yIC45LTIgMnYxNGgydi0xMkgxNlYxeiIgLz4KICA8cGF0aCBkPSJNMTEgNUg4Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDEwYzEuMSAwIDItLjkgMi0ydi05bC01LTR6bTMgMTZIOFY3aDd2NWg0djktem0tMSA1SDhWN2g3djVoNHY5eiIvPgo8L3N2Zz4K" alt="Copy Icon" /></td>
                    <td>${element.username}<img onclick="copyText('${element.username}')" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiAvPgogIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMTYgMUg0Yy0xLjEgMC0yIC45LTIgMnYxNGgydi0xMkgxNlYxeiIgLz4KICA8cGF0aCBkPSJNMTEgNUg4Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDEwYzEuMSAwIDItLjkgMi0ydi05bC01LTR6bTMgMTZIOFY3aDd2NWg0djktem0tMSA1SDhWN2g3djVoNHY5eiIvPgo8L3N2Zz4K" alt="Copy Icon" /></td>
                    <td>${element.password}<img onclick="copyText('${element.password}')" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiAvPgogIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNMTYgMUg0Yy0xLjEgMC0yIC45LTIgMnYxNGgydi0xMkgxNlYxeiIgLz4KICA8cGF0aCBkPSJNMTEgNUg4Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDEwYzEuMSAwIDItLjkgMi0ydi05bC01LTR6bTMgMTZIOFY3aDd2NWg0djktem0tMSA1SDhWN2g3djVoNHY5eiIvPgo8L3N2Zz4K" alt="Copy Icon" /></td>
                    <td><button class="btn-delete" onclick="deletepassword('${element.website}')">DELETE</button></td>
                </tr>`;
        }
        tb.innerHTML += str;
    }
    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
};

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();

    let website = document.getElementById("website").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (website && username && password) {
        let passwords = localStorage.getItem("passwords");
        let json;
        if (passwords == null) {
            json = [];
        } else {
            json = JSON.parse(passwords);
        }
        json.push({ website, username, password });
        alert("Password saved");
        localStorage.setItem("passwords", JSON.stringify(json));
        ShowPasswrd();
    } else {
        alert("Please fill in all fields.");
    }
});

ShowPasswrd();
