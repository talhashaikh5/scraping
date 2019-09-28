const puppeteer = require('puppeteer');
const fs = require('fs');
global.info = [];

(async () => {
  const link = 'https://studyabroad.shiksha.com/uk/universities/university-of-oxford'
  const browser = await puppeteer.launch({headless:false,devtools: false,slowMo:250});
  const page = await browser.newPage();
  await page.goto(link,{waitUntil: 'networkidle2'});
  // Get the "viewport" of the page, as reported by the page.


  //GET UNIVERSITY NAME
  const Uname = await page.evaluate(() => {
    try{
      var abc = document.getElementsByClassName('H1-sc-1225uyb-0 zIOxk')[0].innerText
    }
    catch(err){
      var abc = "NOT FOUND"
    }
    return abc
  });

  
  // GET TYPE OF UNIVERSITY
  const Utype = await page.evaluate(() => {
    try{
      var abc = document.getElementsByClassName('Styled__UnivLinks-sc-132amsi-4 fWPQDi')[0].children[2].innerText
      for(var i=0;i<5;i++){
        console.log(i)
      }
    }
    catch(err){
      var abc = "NOT FOUND"
    }
    return abc
  });


  // GET ESTABLISHED YEAR
  const Uest = await page.evaluate(() => {
    try{
      var abc = document.getElementsByClassName('Styled__UnivLinks-sc-132amsi-4 fWPQDi')[0].children[4].innerText
    }
    catch(err){
      var abc = "NOT FOUND"
    }
    return abc
  });
  
  //GET EMAIL
  const Uemail = await page.evaluate(() => {
    try{
      const abc = [];
    for( i=0; i<document.getElementsByClassName('Styled__ContactUsDiv-sc-1yl1nt-10 gMhFvI').length;i++){
         console.log(i);
          var lable = document.getElementsByClassName('Styled__ContactUsDiv-sc-1yl1nt-10 gMhFvI')[i].children[0].innerText;
          // const abc = lable.toString
          var text = document.getElementsByClassName('Styled__ContactUsDiv-sc-1yl1nt-10 gMhFvI')[i].children[1].innerText;
          // links.push({
          // abc.push(lable,text)
          // console.log(lable,text)
          abc.push({key:lable,value:text});
    }
    return abc

}


    
    catch(err){
      var abc = err;
    }
    return abc
  });
  

  //GET PHONE
    const Uphone = await page.evaluate(() => {
    try{
      var abc = document.getElementsByClassName('Styled__ContactUsDiv-sc-1yl1nt-10 gMhFvI')[1].children[1].innerText
    }
    catch(err){
      var abc = "NOT FOUND"
    }
    return abc
  });

  //GET ADDRESS
  const Uaddress = await page.evaluate(() => {
    try{
      var abc = document.getElementsByClassName('Styled__ContactUsDiv-sc-1yl1nt-10 gMhFvI')[2].children[1].innerText
    }
    catch(err){
      var abc = "NOT FOUND"
    }
    return abc
  });

  
  //GET INTERNATIONAL STUDENT
  const Uinterstudent = await page.evaluate(() => {
    try{
      var first = document.getElementsByClassName('Styled__TableStyle-sc-10ucg51-0 fhkXFT')[0].children[0].rows[0].children[0].
      innerText;
      if(first == "% International Students"|| first == "Total International Students"){
        var abc = document.getElementsByClassName('Styled__TableStyle-sc-10ucg51-0 fhkXFT')[0].children[0].rows[0].children[1].
        innerText
      }
      else{
        abc = "NOT FOUND"
      }
    }
    catch(err){
      var abc = "NOT FOUND"
    }
    return abc
  });



  await info.push({
    // Uemail.values(),
    name: Uname,
    type: Utype,
    Established: Uest,
    internationalstudent: Uinterstudent

  });
  await info.push(Uemail[0],Uemail[1],Uemail[2],Uemail[3]);
  // info.push(Uemail);
  // await console.log(test);
  await browser.close();
  
  const clink = link+'/courses'
  const browser1 = await puppeteer.launch({headless:true,devtools: false});
  const page1 = await browser1.newPage();
  await page1.goto(clink,{waitUntil: 'networkidle2'});
  const Unocourses = await page1.evaluate(() => {
    try{
      var abc = document.getElementsByClassName('Styled__LinkStyle-sc-19aj422-2 kxNRMN').length/2
        }
    catch(err){
      var abc = "NOT FOUND"
    }
    return abc
    
  });
  const Ucourses = await page1.evaluate(() => {
    try{
      var j = 0;
      var abc = [];
      for(var i=0;i<document.getElementsByClassName('Styled__LinkStyle-sc-19aj422-2 kxNRMN').length;i=i+2){
          
        var coursename = document.getElementsByClassName('Styled__LinkStyle-sc-19aj422-2 kxNRMN')[i].innerText
        var duration = document.getElementsByClassName('Styled__AllCourseLeftBox-sc-1yl1nt-36 Ngbpj')[j].children[0].children[1].innerText
        var fees = document.getElementsByClassName('Styled__AllCourseLeftBox-sc-1yl1nt-36 Ngbpj')[j].children[1].children[1].innerText
        var exams = document.getElementsByClassName('Styled__AllCourseLeftBox-sc-1yl1nt-36 Ngbpj')[j].children[2].children[1].innerText
        j++;
        abc.push(
            {coursename: coursename,
            Duration:duration,
            FEES:fees,
            EXAMINATION:exams}

        
        
        );
      
        }
    }
    
    catch(err){
      var abc = "NOT FOUND"
    }
    return abc
    
  });
  info.push({noofcourses:Unocourses})
  info.push(Ucourses)
  fs.writeFile(
    './json/data.json',
    JSON.stringify(info,null,2),
    (err) => err ? console.error('Page Data is not stored in links.json not written',err) : console.log("Page Data is stored in links.js file")
)


  await console.log(info);
  await browser1.close();
})();