   const handleCategory = async () => {
     const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
     const data = await res.json();
     // console.log(data.data);

     const tabContainer = document.getElementById("tab-container");
     const trimData = data.data.slice(0, 4);
     trimData.forEach((data) => {
       const div = document.createElement("div");
       div.innerHTML = `                    
    <a onclick="handleLoadContent('${data.category_id}')" class="bg-gray-200 p-4 cursor-pointer rounded mx-2">${data.category}</a> 
    `;
       tabContainer.appendChild(div);
     });
   };

   const handleLoadContent = async (categoryID = '1000') => {
     const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`);
     const data = await res.json();

     const dataLoad = data.data;


     const cardContainer = document.getElementById("card-container");
     
     cardContainer.innerHTML = '';

     if (dataLoad.length === 0) {

       const div = document.createElement('div');
       div.innerHTML = `
            <div class="text-center mx-auto items-center mt-14" style="width: 100vw; grid-column: span 2">
            <img class="text-center w-44 mx-auto mb-6 " src="./Icon.png" alt="">
            <h1 class="font-bold text-2xl ">Oops!! Sorry, There is no <br> content here</h1>
          </div> 
          `;
       cardContainer.appendChild(div);
     }



     dataLoad.forEach((content) => {

       const {
         thumbnail,
         title,
         authors,
         profile_name,
         others,
         posted_date
       } = content;

       const secondsAgo = content.others.posted_date

       const hours = Math.floor(secondsAgo / 3600);
       const minutes = Math.floor((secondsAgo % 3600) / 60);

       let timeAgoText = '';
       if (hours > 0) {
         timeAgoText += `${hours} hr `;
       }
       if (minutes > 0) {
         timeAgoText += `${minutes} min `;
       }

       if (timeAgoText) {
         timeAgoText += 'ago';
       }

       const div = document.createElement("div");
       div.innerHTML = `
              <div class="card w-[320px] lg:w-auto h-72 bg-base-100 lg:mx-2 mx-auto space-y-3 shadow-xl">
                <figure>
                  <img class="w-full object-cover h-[200px]" src="${content?.thumbnail}" alt="" />
                </figure>
                <p class="absolute bg-black text-white bottom-24 left-2/4">${timeAgoText}</p>


                <div class="flex">
                            <div>
                                <img class="w-10 rounded-full mr-3 mt-3 h-10" src="${content?.authors[0].profile_picture}" alt="img is not found">
                            </div>
            
                            <div>
                            <h1 class="text-base font-bold">${content?.title}</h1>
                            <h3 class="flex gap-1">${content?.authors[0].profile_name}<span>
                            ${content.authors[0].verified?('<img src="fi_10629607.png" alt="">'):''}
                            </span></h3>
                            <p>${content?.others.views}</p> 
                        </div>                    
                    </div>
                </div>
            `
       cardContainer.appendChild(div);
     });

     document.getElementById('sort-views').addEventListener('click', function () {

       dataLoad.sort((a, b) => {
         return parseInt(b.others.views) - parseInt(a.others.views)

       })

       cardContainer.innerHTML = '';

       if (dataLoad.length === 0) {

         const div = document.createElement('div');
         div.innerHTML = `
            <div class="text-center mx-auto items-center mt-14" style="width: 100vw; grid-column: span 2">
            <img class="text-center w-44 mx-auto mb-6 " src="./Icon.png" alt="">
            <h1 class="font-bold text-2xl ">Oops!! Sorry, There is no <br> content here</h1>
          </div> 
          `;
         cardContainer.appendChild(div);
       }



       dataLoad.forEach((content) => {

         const {
           thumbnail,
           title,
           authors,
           profile_name,
           others,
           posted_date
         } = content;

         const secondsAgo = content.others.posted_date;

         const hours = Math.floor(secondsAgo / 3600);
         const minutes = Math.floor((secondsAgo % 3600) / 60);

         let timeAgoText = '';
         if (hours > 0) {
           timeAgoText += `${hours} hr `;
         }
         if (minutes > 0) {
           timeAgoText += `${minutes} min `;
         }

         if (timeAgoText) {
           timeAgoText += 'ago';
         }

         const div = document.createElement("div");
         div.innerHTML = `
              <div class="card w-[320px] lg:w-auto h-72 bg-base-100 lg:mx-2 mx-auto space-y-3 shadow-xl">
                <figure>
                  <img class="w-full object-cover h-[200px]" src="${content?.thumbnail}" alt="" />
                </figure>
                <p class="absolute bg-black text-white bottom-24 left-2/4">${timeAgoText}</p>


                <div class="flex">
                            <div>
                                <img class="w-10 rounded-full mr-3 mt-3 h-10" src="${content?.authors[0].profile_picture}" alt="img is not found">
                            </div>
            
                            <div>
                            <h1 class="text-base font-bold">${content?.title}</h1>
                            <h3 class="flex gap-1">${content?.authors[0].profile_name}<span>
                            ${content.authors[0].verified?('<img src="fi_10629607.png" alt="">'):''}
                            </span></h3>
                            <p>${content?.others.views}</p> 
                        </div>                    
                    </div>
                </div>
            `
         cardContainer.appendChild(div);
       });




     })

   };



   handleCategory();
   handleLoadContent()