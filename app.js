
let ism = document.getElementById("ism");
let raqam = document.getElementById("raqam");
let btn = document.getElementById("btn");
let box = document.getElementById("box");

const API = "https://68c0fea10b196b9ce1c58841.mockapi.io/ok";


window.addEventListener("DOMContentLoaded", () => {
    const savedList = JSON.parse(localStorage.getItem("userList")) || [];
    renderList(savedList);
});


function renderList(list) {
    box.innerHTML = ""; 
    list.forEach(item => {
        box.innerHTML += `
            <div style="margin-bottom:10px;">
                <p><strong>Ism:</strong> ${item.ism}</p>
                <p><strong>Raqam:</strong> ${item.raqam}</p>
                <hr/>
            </div>
        `;
    });
}


btn.addEventListener("click", () => {
    const user = {
        ism: ism.value,
        raqam: raqam.value
    };

    fetch(API, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      
        const currentList = JSON.parse(localStorage.getItem("userList")) || [];

        
        currentList.push(data);

       
        localStorage.setItem("userList", JSON.stringify(currentList));

       
        renderList(currentList);

       
        ism.value = "";
        raqam.value = "";
    })
    .catch(err => console.log("Xatolik:", err));
});

