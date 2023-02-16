let ticketObj = {source:"شیراز", destination:"اهواز", count:5, startHour:"12:50", reachHour:"15:00",
 priceBusiness:"13.000.000", priceEconomy:'1.300.00', date:"1401/2/2", isEconomy:false, people:["محمد رضایی","امین احمدزاده","‌ارسلان مسعودی‌فرد"]};
let ticketObj1 = {source:"شیراز", destination:"اهواز", count:15, startHour:"09:30", reachHour:"12:30",
 priceBusiness:"12.500.000", priceEconomy:'1.400.00', date:"1401/2/2", isEconomy:true, people:["محمد رضایی"]};
let ticketObj2 = {source:"شیراز", destination:"اهواز", count:25, startHour:"12:15", reachHour:"15:15",
 priceBusiness:"12.000.000", priceEconomy:'1.100.00', date:"1401/2/2", isEconomy:false, people:["محمد رضایی","امین احمدزاده","‌ارسلان مسعودی‌فرد"]};

//add constructor when database added
let ticketList = [ticketObj,ticketObj1,ticketObj2];


function start(x) {
    if (x.matches) { 
        while(allTickets.firstChild){
            allTickets.removeChild(allTickets.firstChild);
        }
        theme1();
        
    } else{
        while(allTickets.firstChild){
            allTickets.removeChild(allTickets.firstChild);
        }
        theme2();
    }
  }

const root = document.getElementById("root");
let allTickets =  document.createElement('div');

function theme1(){
    let edit = document.createElement('button');
    edit.addEventListener('click', function() {
        window.location.href = "../home/home"
    })
    edit.classList.add("editButton");
    edit.style = "text-align: center;";
    edit.textContent = 'ویرایش';    
    let heading = document.createElement('div'); 
    heading.classList.add('heading'); 
    
    let headerRow = document.createElement('div'); 
    headerRow.classList.add('header-row');  
    let headerRow2 = document.createElement('div'); 
    headerRow2.classList.add('header-row2'); 
    let headerRow3 = document.createElement('div'); 
    headerRow3.classList.add('header-row');   

    let sourceHeader = document.createElement('div');
    sourceHeader.textContent = ticketObj.source; 
    sourceHeader.style ="text-align: right;";
    sourceHeader.classList.add('subHeading2');   
    let transferImageHeader = document.createElement('div'); 
    let transferImage = document.createElement('img');
    transferImageHeader.appendChild(transferImage);
    if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        transferImage.src = "../imgs/arrowW.png";
    } else{
        transferImage.src = "../imgs/arrow.png";
    }
    transferImage.style="height:25px";
    transferImageHeader.classList.add('subHeading2');    
    let destHeader = document.createElement('div');
    destHeader.textContent = ticketObj.destination; 
    destHeader.style ="text-align: left;";
    destHeader.classList.add('subHeading2');     
    let lineImageHeader = document.createElement('div'); 
    let lineImage = document.createElement('img');
    lineImageHeader.appendChild(lineImage);
    lineImage.src = "../imgs/line.png";
    lineImage.style="height:35px";
    lineImageHeader.classList.add('subHeadingLine');    

    let dateHeader = document.createElement('div');
    dateHeader.textContent = ticketObj.date; 
    dateHeader.classList.add('subHeading');     
    dateHeader.style ="text-align: right;";

    let passengerHeader = document.createElement('div');
    passengerHeader.textContent = ticketObj.people.length + " مسافر" ; 
    passengerHeader.classList.add('subHeading');
    passengerHeader.style ="text-align: left;";


    allTickets.appendChild(heading);
    heading.appendChild(headerRow);
    heading.appendChild(headerRow2);
    heading.appendChild(headerRow3);
    headerRow.appendChild(sourceHeader);
    headerRow.appendChild(transferImageHeader);
    headerRow.appendChild(destHeader);
    headerRow2.appendChild(dateHeader);
    headerRow2.appendChild(lineImageHeader);
    headerRow2.appendChild(passengerHeader);
    headerRow3.appendChild(edit);    

    let title = document.createElement('h2');
    title.classList.add('title');
    allTickets.appendChild(title);

    if (ticketList.length == 0){
        title.textContent="بلیطی پیدا نشد!";
        root.appendChild(allTickets);
    } else{
        title.textContent="لیست بلیط‌های یافت شده";
    }

    for (let i = 0; i < ticketList.length; i++) {
        let ticketContainer = document.createElement('div'); 
        ticketContainer.classList.add('ticket-container');
        let row1 = document.createElement('div');
        let limitedTicket = document.createElement('h1');
        limitedTicket.classList.add('limited-ticket');
        limitedTicket.textContent = '*ظرفیت محدود است.'
        row1.classList.add('row2');
        allTickets.appendChild(ticketContainer);
        root.appendChild(allTickets);
        ticketContainer.appendChild(row1);
        let row2 = document.createElement('div');
        row2.classList.add('row2');
        ticketContainer.appendChild(row2);
        ticketContainer.style= "height: 500px;";


        let sourceInfo = document.createElement('div');
        sourceInfo.classList.add('time2');
        let textStartHour = document.createElement('h3');
        textStartHour.classList.add("time-text2");
        textStartHour.textContent = ticketList[i].startHour;
        sourceInfo.appendChild(textStartHour);
        let textSource = document.createElement('h3');
        textSource.classList.add("time-text2");
        textSource.textContent =  ticketList[i].source;
        sourceInfo.appendChild(textSource);
    
    
        let imageBox = document.createElement('div');
        imageBox.classList.add('image-box2');
        let textImage = document.createElement('h3');
       
        let parsedReachHour = new Date('2019-06-11T'+ticketList[i].reachHour);
        let parsedStartHour = new Date('2019-06-11T'+ticketList[i].startHour);
        let diff = parsedReachHour.getTime() - parsedStartHour.getTime();
        diff = Math.floor(diff / (1000 * 60 * 60)) + ":" + Math.floor((diff / (1000 * 60)) % 60);
        diff = diff.replace(":0","");
        if (diff.includes("0:")){
            textImage.textContent =  "مدت حرکت: " + diff.replace("0:","") + "دقیقه";
        } else{
            textImage.textContent =  "مدت حرکت: " + diff + "ساعت";
        }

        imageBox.appendChild(textImage);
        let imageImage = document.createElement('img');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches){
            imageImage.src = "../imgs/airplaneW.png";
        } else{
            imageImage.src = "../imgs/airplane.png";
        }
        imageImage.style = " max-width:100%;";
        imageBox.appendChild(imageImage);
    
        let destInfo = document.createElement('div');
        destInfo.classList.add('time2');
        let textReachHour = document.createElement('h3');
        textReachHour.classList.add("time-text1");
        textReachHour.textContent =  ticketList[i].reachHour;
        destInfo.appendChild(textReachHour);
        let textDest = document.createElement('h3');
        textDest.classList.add("time-text1");
        textDest.textContent =  ticketList[i].destination;
        destInfo.appendChild(textDest);
    
        let ecoContainer = document.createElement('div');
        ecoContainer.classList.add('price2');
        let ecoText = document.createElement('h1');
        ecoText.classList.add('text');
        ecoText.style = "text-align:center; margin-top:50px;";
        ecoText.textContent = "اکونومی:\n" +  ticketList[i].priceEconomy + "تومان";
        ecoContainer.appendChild(ecoText);
        ecoContainer.style.cursor = "pointer";
        ecoContainer.addEventListener("click", e => routeToPurchase(ticketList[i]));
    
        let businessContainer = document.createElement('div');
        businessContainer.classList.add('price2');
        let businessText = document.createElement('h1');
        businessText.classList.add('text');
        businessText.style = "text-align:center; margin-top:50px;";
        businessText.textContent = "بیزینس:\n" +   ticketList[i].priceBusiness + "تومان";
        businessContainer.appendChild(businessText);
        businessContainer.style.cursor = "pointer";
        businessContainer.addEventListener("click", e => routeToPurchase(ticketList[i], businessContainer));
    
        row2.appendChild(businessContainer);
        row2.appendChild(ecoContainer);
        row1.appendChild(destInfo);
        row1.appendChild(imageBox);
        row1.appendChild(sourceInfo);
    
        
        if (ticketList[i].people.length * 3 >  ticketList[i].count){
            ticketContainer.appendChild(limitedTicket);
        }
    }

    let space = document.createElement('div');
    space.classList.add('space');
    allTickets.appendChild(space);
}

function theme2(){
    let edit = document.createElement('a');
    edit.classList.add('subHeading');
    edit.style = "text-align: left;";
    edit.textContent = 'ویرایش';    
    let heading = document.createElement('div'); 
    heading.classList.add('heading'); 
    let headerRow = document.createElement('div'); 
    headerRow.classList.add('header-row');  
    let sourceHeader = document.createElement('div');
    sourceHeader.textContent = ticketObj.source; 
    sourceHeader.style ="text-align: right;";
    sourceHeader.classList.add('subHeading');   
    let transferImageHeader = document.createElement('div'); 
    let transferImage = document.createElement('img');
    transferImageHeader.appendChild(transferImage);
    if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        transferImage.src = "../imgs/arrowW.png";
    } else{
        transferImage.src = "../imgs/arrow.png";
    }
    transferImage.style="height:25px";
    transferImageHeader.classList.add('subHeading');    
    let destHeader = document.createElement('div');
    destHeader.textContent = ticketObj.destination; 
    destHeader.style ="text-align: left;";
    destHeader.classList.add('subHeading');     
    let lineImageHeader = document.createElement('div'); 
    let lineImage = document.createElement('img');
    lineImageHeader.appendChild(lineImage);
    lineImage.src = "../imgs/line.png";
    lineImage.style="height:35px";
    lineImageHeader.classList.add('subHeadingLine');    
    let calendarImageHeader = document.createElement('div'); 
    let calendarImage = document.createElement('img');
    calendarImageHeader.appendChild(calendarImage);
    if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        calendarImage.src = "../imgs/calendarW.png";
    } else{
        calendarImage.src = "../imgs/calendar.png";
    }

    
    calendarImage.style="height:30px";
    calendarImageHeader.style = " margin-top: 30px;";
    calendarImageHeader.classList.add('subHeadingLine');

    let dateHeader = document.createElement('div');
    dateHeader.textContent = ticketObj.date; 
    dateHeader.style ="text-align: center;";
    dateHeader.classList.add('subHeading');     
    let passengerImageHeader = document.createElement('div'); 
    let passengerImage = document.createElement('img');
    passengerImageHeader.appendChild(passengerImage);
    if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        passengerImage.src = "../imgs/passengerW.png";
    } else{
        passengerImage.src = "../imgs/passenger.png";
    }

   


    passengerImage.style="height:22px";
    passengerImageHeader.style = " margin-top: 20px;";
    passengerImageHeader.classList.add('subHeadingLine');   
    let passengerHeader = document.createElement('div');
    passengerHeader.textContent = ticketObj.people.length + " مسافر" ; 
    passengerHeader.classList.add('subHeading');

    let lineImageHeader1 = document.createElement('div'); 
    let lineImage1 = document.createElement('img');
    lineImageHeader1.appendChild(lineImage1);
    lineImage1.src = "../imgs/line.png";
    lineImage1.style="height:35px";
    lineImageHeader1.classList.add('subHeadingLine');
    let lineImageHeader2 = document.createElement('div'); 
    let lineImage2 = document.createElement('img');
    lineImageHeader2.appendChild(lineImage2);
    lineImage2.src = "../imgs/line.png";
    lineImage2.style="height:35px";
    lineImageHeader2.classList.add('subHeadingLine');


    allTickets.appendChild(heading);
    heading.appendChild(headerRow);
    headerRow.appendChild(sourceHeader);
    headerRow.appendChild(transferImageHeader);
    headerRow.appendChild(destHeader);
    headerRow.appendChild(lineImageHeader);
    headerRow.appendChild(calendarImageHeader);
    headerRow.appendChild(dateHeader);
    headerRow.appendChild(lineImageHeader1);
    headerRow.appendChild(passengerImageHeader);
    headerRow.appendChild(passengerHeader);
    headerRow.appendChild(lineImageHeader2);
    headerRow.appendChild(edit);    

    let title = document.createElement('h2');
    title.classList.add('title');
    allTickets.appendChild(title);

    if (ticketList.length == 0){
        title.textContent="بلیطی پیدا نشد!";
        root.appendChild(allTickets);
    } else{
        title.textContent="لیست بلیط‌های یافت شده";
    }

    for (let i = 0; i < ticketList.length; i++) {
        let ticketContainer = document.createElement('div');
    
        ticketContainer.classList.add('ticket-container');
        let row = document.createElement('div');
        let limitedTicket = document.createElement('h1');
        limitedTicket.classList.add('limited-ticket');

        
        
   
        limitedTicket.textContent = '*ظرفیت محدود است.'
        row.classList.add('row');
        allTickets.appendChild(ticketContainer);
        root.appendChild(allTickets);
        ticketContainer.appendChild(row);
  
        let sourceInfo = document.createElement('div');
        sourceInfo.classList.add('time1');
        let textStartHour = document.createElement('h3');
        textStartHour.classList.add("time-text2");
        textStartHour.textContent = ticketList[i].startHour;
        sourceInfo.appendChild(textStartHour);
        let textSource = document.createElement('h3');
        textSource.classList.add("time-text2");
        textSource.textContent =  ticketList[i].source;
        sourceInfo.appendChild(textSource);
    
        let imageBox = document.createElement('div');
        imageBox.classList.add('image-box');
        let textImage = document.createElement('h3');


        let parsedReachHour = new Date('2019-06-11T'+ticketList[i].reachHour);
        let parsedStartHour = new Date('2019-06-11T'+ticketList[i].startHour);
        let diff = parsedReachHour.getTime() - parsedStartHour.getTime();
        diff = Math.floor(diff / (1000 * 60 * 60)) + ":" + Math.floor((diff / (1000 * 60)) % 60);
        diff = diff.replace(":0","");
        if (diff.includes("0:")){
            textImage.textContent =  "مدت حرکت: " + diff.replace("0:","") + "دقیقه";
        } else{
            textImage.textContent =  "مدت حرکت: " + diff + "ساعت";
        }

        imageBox.appendChild(textImage);
        let imageImage = document.createElement('img');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches){
            imageImage.src = "../imgs/airplaneW.png";
        } else{
            imageImage.src = "../imgs/airplane.png";
        }
        
        imageImage.style = " max-width:100%;";
        imageBox.appendChild(imageImage);
    
        let destInfo = document.createElement('div');
        destInfo.classList.add('time1');
        let textReachHour = document.createElement('h3');
        textReachHour.classList.add("time-text1");
        textReachHour.textContent =  ticketList[i].reachHour;
        destInfo.appendChild(textReachHour);
        let textDest = document.createElement('h3');
        textDest.classList.add("time-text1");
        textDest.textContent =  ticketList[i].destination;
        destInfo.appendChild(textDest);
    
        let ecoContainer = document.createElement('div');
        ecoContainer.classList.add('price');
        let ecoText = document.createElement('h1');
        ecoText.classList.add('text');
        ecoText.style = "text-align:center; margin-top:50px;";
        ecoText.textContent = "اکونومی:\n" +  ticketList[i].priceEconomy + "تومان";
        ecoContainer.appendChild(ecoText);
        ecoContainer.style.cursor = "pointer";
        ecoContainer.addEventListener("click", e => routeToPurchase(ticketList[i]));
    
        let businessContainer = document.createElement('div');
        businessContainer.classList.add('price');
        let businessText = document.createElement('h1');
        businessText.classList.add('text');
        businessText.style = "text-align:center; margin-top:50px;";
        businessText.textContent = "بیزینس:\n" +   ticketList[i].priceBusiness + "تومان";
        businessContainer.appendChild(businessText);
        businessContainer.style.cursor = "pointer";
        businessContainer.addEventListener("click", e => routeToPurchase(ticketList[i], businessContainer));
    
        row.appendChild(businessContainer);
        row.appendChild(ecoContainer);
        row.appendChild(destInfo);
        row.appendChild(imageBox);
        row.appendChild(sourceInfo);
    
        
        if (ticketList[i].people.length * 3 >  ticketList[i].count){
            ticketContainer.appendChild(limitedTicket);
        }

        let space = document.createElement('div');
        space.classList.add('space');
        allTickets.appendChild(space);
    }
}



let x = window.matchMedia("(max-width:950px)");
start(x); 
x.addListener(start);
     
  
function routeToPurchase(ticketObj) {
    if (!localStorage.getItem("user")) {
        alert("ابتدا وارد حساب کاربری خود شوید!")
    } else {
        localStorage.setItem("ticketObj", JSON.stringify(ticketObj));
        window.location.href = "../purchase/purchase";
    }
}
