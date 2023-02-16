let ticketObj = {source:"شیراز", destination:"اهواز", count:5, startHour:"12:50", reachHour:"15:00",
 priceBusiness:"13.000.000", priceEconomy:'1.300.00', date:"1401/02/20", isEconomy:false, people:["محمد رضایی","امین احمدزاده","‌ارسلان مسعودی‌فرد"]};
let ticketObj1 = {source:"شیراز", destination:"اهواز", count:15, startHour:"09:30", reachHour:"12:30",
 priceBusiness:"12.500.000", priceEconomy:'1.400.00', date:"1401/02/20", isEconomy:true, people:["محمد رضایی"]};
let ticketObj2 = {source:"شیراز", destination:"اهواز", count:25, startHour:"12:15", reachHour:"15:15",
 priceBusiness:"12.000.000", priceEconomy:'1.100.00', date:"1401/02/20", isEconomy:false, people:["محمد رضایی","امین احمدزاده","‌ارسلان مسعودی‌فرد"]};
let ticketBoughtList = [ticketObj,ticketObj1];



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

    let title = document.createElement('h2');
    title.classList.add('title');
    allTickets.appendChild(title);

    if (ticketBoughtList.length == 0){
        title.textContent="بلیطی خریده نشده است.";
        root.appendChild(allTickets);
    } else{
        title.textContent="لیست بلیط‌های خریداری شده";
    }

    for (let i = 0; i < ticketBoughtList.length; i++) {
        let ticketContainer = document.createElement('div'); 
        ticketContainer.classList.add('ticket-container');
        let row1 = document.createElement('div');
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
        textStartHour.textContent = ticketBoughtList[i].startHour;
        sourceInfo.appendChild(textStartHour);
        let textSource = document.createElement('h3');
        textSource.classList.add("time-text2");
        textSource.textContent =  ticketBoughtList[i].source;
        sourceInfo.appendChild(textSource);
    
    
        let imageBox = document.createElement('div');
        imageBox.classList.add('image-box2');
        let textImage = document.createElement('h3');
        let parsedReachHour = new Date('2019-06-11T'+ticketBoughtList[i].reachHour);
        let parsedStartHour = new Date('2019-06-11T'+ticketBoughtList[i].startHour);
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
        textReachHour.textContent =  ticketBoughtList[i].reachHour;
        destInfo.appendChild(textReachHour);
        let textDest = document.createElement('h3');
        textDest.classList.add("time-text1");
        textDest.textContent =  ticketBoughtList[i].destination;
        destInfo.appendChild(textDest);

        let priceContainer = document.createElement('a');
        priceContainer.classList.add('price2');
        let priceText = document.createElement('h1');
        priceText.classList.add('text');
        priceText.style = "text-align:center; margin-top:50px;";
        if (ticketBoughtList[i].isEconomy){
            priceText.textContent = "اکونومی:\n" +  ticketBoughtList[i].priceEconomy + "تومان";
        }else{
            priceText.textContent =  "بیزینس:\n" +  ticketBoughtList[i].priceBusiness + "تومان";
        }

        priceContainer.appendChild(priceText);
    
        let dateContainer = document.createElement('a');

        dateContainer.classList.add('price2');
        let dateText = document.createElement('h1');
        dateText.classList.add('text');
        dateText.style = "text-align:center; margin-top:50px;";
        dateText.textContent = "تاریخ: " + ticketBoughtList[i].date + "\n" + "تعداد مسافرین: " + ticketBoughtList[i].people.length + " نفر";
        dateContainer.appendChild(dateText);

        row2.appendChild(priceContainer);
        row2.appendChild(dateContainer);
        row1.appendChild(destInfo);
        row1.appendChild(imageBox);
        row1.appendChild(sourceInfo);

        let extraInfo = document.createElement('h3');
        extraInfo.classList.add("extra-info-ticket");
        let str2 = "مسافرین: ";
        for (let j = 0; j < ticketBoughtList[i].people.length; j++) { 
            if (j == ticketBoughtList[i].people.length -1){
                str2 = str2 + ticketBoughtList[i].people[j]
            }else{
                str2 = str2 + ticketBoughtList[i].people[j] + " ،";
        }
        
    }
    extraInfo.textContent = str2;
    ticketContainer.appendChild(extraInfo);
    }

    

    let space = document.createElement('div');
        space.classList.add('space');
        allTickets.appendChild(space);
}
function theme2(){
    
    let title = document.createElement('h2');
    title.classList.add('title');
    allTickets.appendChild(title);

    if (ticketBoughtList.length == 0){
        title.textContent="بلیطی خریده نشده است.";
        root.appendChild(allTickets);
    } else{
        title.textContent="لیست بلیط‌های خریداری شده";
    }

    for (let i = 0; i < ticketBoughtList.length; i++) {
        let ticketContainer = document.createElement('div'); 
        ticketContainer.classList.add('ticket-container');
        let row1 = document.createElement('div');
        row1.classList.add('row');
        allTickets.appendChild(ticketContainer);
        root.appendChild(allTickets);
        ticketContainer.appendChild(row1);
        

        let sourceInfo = document.createElement('div');
        sourceInfo.classList.add('time1');
        let textStartHour = document.createElement('h3');
        textStartHour.classList.add("time-text2");
        textStartHour.textContent = ticketBoughtList[i].startHour;
        sourceInfo.appendChild(textStartHour);
        let textSource = document.createElement('h3');
        textSource.classList.add("time-text2");
        textSource.textContent =  ticketBoughtList[i].source;
        sourceInfo.appendChild(textSource);
    
    
        let imageBox = document.createElement('div');
        imageBox.classList.add('image-box');
        let textImage = document.createElement('h3');

        let parsedReachHour = new Date('2019-06-11T'+ticketBoughtList[i].reachHour);
        let parsedStartHour = new Date('2019-06-11T'+ticketBoughtList[i].startHour);
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
        textReachHour.textContent =  ticketBoughtList[i].reachHour;
        destInfo.appendChild(textReachHour);
        let textDest = document.createElement('h3');
        textDest.classList.add("time-text1");
        textDest.textContent =  ticketBoughtList[i].destination;
        destInfo.appendChild(textDest);

        let priceContainer = document.createElement('a');
        priceContainer.classList.add('price');
        let priceText = document.createElement('h1');
        priceText.classList.add('text');
        priceText.style = "text-align:center; margin-top:50px;";
        if (ticketBoughtList[i].isEconomy){
            priceText.textContent = "اکونومی:\n" +  ticketBoughtList[i].priceEconomy + "تومان";
        }else{
            priceText.textContent =  "بیزینس:\n" +  ticketBoughtList[i].priceBusiness + "تومان";
        }
       
        priceContainer.appendChild(priceText);
    
    
        let dateContainer = document.createElement('a');
        dateContainer.classList.add('price');
        let dateText = document.createElement('h1');
        dateText.classList.add('text');
        dateText.style = "text-align:center; margin-top:30px;";
        dateText.textContent = "تاریخ: " + ticketBoughtList[i].date + "\n" + "تعداد مسافرین: " + ticketBoughtList[i].people.length + " نفر";
        dateContainer.appendChild(dateText);


        row1.appendChild(priceContainer);
        row1.appendChild(dateContainer);
        row1.appendChild(destInfo);
        row1.appendChild(imageBox);
        row1.appendChild(sourceInfo);

        let extraInfo = document.createElement('h3');
        extraInfo.classList.add("extra-info-ticket");
        let str2 = "مسافرین: ";
        for (let j = 0; j < ticketBoughtList[i].people.length; j++) { 
            if (j == ticketBoughtList[i].people.length -1){
                str2 = str2 + ticketBoughtList[i].people[j]
            }else{
                str2 = str2 + ticketBoughtList[i].people[j] + " ،";
            }
            
        }
        extraInfo.textContent = str2;
        ticketContainer.appendChild(extraInfo);
    }

    let space = document.createElement('div');
        space.classList.add('space');
        allTickets.appendChild(space);
    
}
        













let x = window.matchMedia("(max-width:950px)");
start(x); 
x.addListener(start);