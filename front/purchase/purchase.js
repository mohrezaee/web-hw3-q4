let ticket = localStorage.getItem("ticketObj");
ticket = JSON.parse(ticket);

let table = document.getElementById("passenger-table");
for (let i = 0; i < ticket.people.length; i++) {
    const element = ticket.people[i];
    table.innerHTML +=
        `
    <tr>
        <td>
            <input class="text-input" type="string" name="fullname" placeholder="نام مسافر">
        </td>
        <td>
            <input class="text-input" type="string" name="passport-number" placeholder="شماره گذرنامه مسافر">
        </td>
        <td>
        ${ticket.isEconomy ? ticket.priceEconomy : ticket.priceBusiness}
        </td>
    </tr>
    `
}

function buyTicket() {
    alert('بلیط برای شما خریداری شد')
    window.location.href = "../home/home"
}