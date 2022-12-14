import React, { Component } from "react";
import "../css/calculator.css";
//import { withRouter } from '../common/with-router';

export default class Calculator extends Component {
   constructor(props) { 
      super(props);
     this.budgetFeedback = document.querySelector(".budget-feedback");
     this.expenseFeedback = document.querySelector(".expense-feedback");
     this.budgetForm = document.getElementById("budget-form");
     this.budgetInput = document.getElementById("budget-input");
     this.budgetAmount = document.getElementById("budget-amount");
     this.expenseAmount = document.getElementById("expense-amount");
     this.balance = document.getElementById("balance");
     this.balanceAmount = document.getElementById("balance-amount");
     this.expenseForm = document.getElementById("expense-form");
     this.expenseInput = document.getElementById("expense-input");
     this.amountInput = document.getElementById("amount-input");
     this.expenseList = document.getElementById("expense-list");
     this.itemList = [];
     this.itemID = 0;
   }
   //submit budget method
   submitBudgetForm(){
     const value = this.budgetInput.value;
     if(value === "" || value < 0) {
         this.budgetFeedback.classList.add('showItem');
         this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
         const self = this;
 
         setTimeout(function() {
           self.budgetFeedback.classList.remove("showItem");
         }, 4000);   
     } else {
       this.budgetAmount.textContent = value;
       this.budgetInput.value = "";
       this.showBalance();
     } 
   }
 // show balance
 showBalance(){
   const expense = this.totalExpense();
   const total = parseInt(this.budgetAmount.textContent) - expense;
   this.balanceAmount.textContent = total;
   if(total < 0){
     this.balance.classList.remove('showGreen', 'showBlack');
     this.balance.classList.add('showRed');
   }else if(total > 0){
     this.balance.classList.remove('showRed', 'showBlack');
     this.balance.classList.add('showGreen');
   }else if(total === 0){
     this.balance.classList.remove('showRed', 'showGreen');
     this.balance.classList.add('showBlack');
   }
 }  
 //submit expense form
 submitExpenseForm(){
   const expenseValue = this.expenseInput.value;
   const amountValue = this.amountInput.value;
   if(expenseValue === '' || amountValue === ''|| amountValue < 0){
     this.expenseFeedback.classList.add('showItem');
     this.expenseFeedback.innerHTML = `<p>values cannot be empty or negative<p>`
     const self = this;
     setTimeout(function(){
       self.expenseFeedback.classList.remove('showItem');
     }, 4000);
   } else { 
     let amount = parseInt(amountValue);
     this.expenseInput.value = "";
     this.amountInput.value = "";
 
     let expense = {
       id:this.itemID,
       title:expenseValue,
       amount:amount,
     }
     this.itemID++;
     this.itemList.push(expense);
     this.addExpense(expense); 
     this.showBalance();
   }
 }
 //add expense
 addExpense(expense){
   const div = document.createElement('div');
   div.classList.add('expense');
   div.innerHTML = ` 
   <div class="ex pense-item d-flex justify-content-between align-items-baseline">
 
   <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
   <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
 
   <div class="expense-icons list-item">
 
    <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
     <i class="fas fa-edit"></i>
    </a>
    <a href="#" class="delete-icon" data-id="${expense.id}">
     <i class="fas fa-trash"></i>
    </a>
   </div>
  </div>
  `;
  this.expenseList.appendChild(div);
 }
 
 //total expense
 totalExpense(){ 
  let total = 0;
  if(this.itemList.length>0){
   total = this.itemList.reduce(function(acc, curr){
     acc +=curr.amount;
     return acc;
   }, 0);
  }
  this.expenseAmount.textContent = total;  
 return total;
 }
 
 // edit expense
 editExpense(element){
   let id = parseInt(element.dataset.id);
   let parent = element.parentElement.parentElement.parentElement;
   //remove from dom
   this.expenseList.removeChild(parent);
   // remove from the list
   let expense = this.itemList.filter(function(item){
     return item.id === id;
   }); 
   //show value
   this.expenseInput.value = expense[0].title;
   this.amountInput.value = expense[0].amount;
   // remove from list
   let tempList = this.itemList.filter(function(item){
     return item.id !==id;
   });
   this.itemList = tempList;
   this.showBalance();
 }
 //delete expense
 deleteExpense(element){
   let id = parseInt(element.dataset.id);
   let parent = element.parentElement.parentElement.parentElement;
   //remove from dom
   this.expenseList.removeChild(parent);
   // remove from list
   let tempList = this.itemList.filter(function(item){
     return item.id !==id;
   });
   this.itemList = tempList;
   this.showBalance();
 }

 render() {
   return (
      <body>
      <div class="container-fluid">
       <div class="row">
        <div class="col-11 mx-auto pt-3">
         
         <h3 class="text-uppercase mb-4"> </h3>
         <div class="row">
          <div class="col-md-5 my-3">
           
           <div class="budget-feedback alert alert-danger text-capitalize">budget feedback</div>
           
           <form id="budget-form" class=" budget-form">
            <h5 class="text-capitalize">please enter your calorie budget</h5>
            <div class="form-group">
             <input type="number" class="form-control budget-input" id="budget-input"/>
            </div>
            
            <button onClick={this.saveSubmission} type="submit" class="btn text-capitalize budget-submit" id="budget-submit">calculate</button>
           </form>
          </div>
          <div class="col-md-7">
           
           <div class="row my-3">
            <div class="col-4 text-center mb-2">
             <h6 class="text-uppercase info-title">Target</h6>
             <span class="budget-icon"></span>
             <h4 class="text-uppercase mt-2 budget" id="budget"><span><i><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="M11.691 1.038A.5.5 0 0 1 12 1.5V4h2.5a.5.5 0 0 1 .354.854l-2 2A.5.5 0 0 1 12.5 7H9.707l-.74.741A1.001 1.001 0 0 1 8 9a1 1 0 0 1-1-1l.001-.046a1 1 0 0 1 1.258-.92L9 6.293V3.5a.5.5 0 0 1 .146-.354l2-2a.5.5 0 0 1 .545-.108ZM12.293 6l1-1H11.5a.5.5 0 0 1-.5-.5V2.707l-1 1V6h2.293Zm1.652 1.176a6 6 0 1 1-5.122-5.12l-.383.383a1.5 1.5 0 0 0-.354.562L8 3a5 5 0 1 0 5 4.914a1.5 1.5 0 0 0 .56-.353l.384-.385ZM8 4.5A3.5 3.5 0 1 0 11.5 8h-1A2.5 2.5 0 1 1 8 5.5v-1Z" /></svg></i></span><span id="budget-amount">0</span></h4>
            </div>
            <div class="col-4 text-center">
             <h6 class="text-uppercase info-title">Burned</h6>
             <span class="expense-icon"></span>
             <h4 class="text-uppercase mt-2 expense" id="expense"><span><i><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M28.5 17.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0Zm-2 0a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" /><path d="M9.004 6.06a1 1 0 0 1 1.08.913l.287 3.369c10.027-1.776 17.002-1.792 27.258.007l.286-3.376a1 1 0 0 1 1.081-.912l1.993.17a1 1 0 0 1 .912 1.08l-.329 3.869a1 1 0 0 1-.146 1.725l-.35 4.122a1 1 0 0 1-1.082.912l-1.992-.17a1 1 0 0 1-.912-1.08l.368-4.34a121.96 121.96 0 0 0-1.614-.274a3 3 0 0 1 .145.925l.004.35v.008c.013 1.151.048 4.188-.309 7.084c-.2 1.62-.549 3.459-1.23 4.974c-.509 1.13-1.554 2.802-3.454 3.38v1.088c.745-.264 1.492-.515 2.11-.67c.391-.1 1.105-.264 1.846-.198a3.404 3.404 0 0 1 1.857.736A3.221 3.221 0 0 1 38 32.263c0 .923-.297 3.116-.534 4.677c-.127.838-.26 1.638-.364 2.181l-.009.044c-.073.38-.183.947-.49 1.463v.001l-.002.003c-.07.117-.385.65-1.036 1.042a3.006 3.006 0 0 1-4.455-1.799c-.18-.663-.233-1.355-.26-1.974a38.07 38.07 0 0 1-.023-.6c-.012-.345-.022-.66-.048-.971a45.21 45.21 0 0 1-2.561.816c-1.3.365-2.803.696-4.218.696s-2.917-.33-4.218-.696a44.92 44.92 0 0 1-2.52-.802l-.02.261a177.709 177.709 0 0 1-.186 2.266c-.03.367-.079.94-.315 1.462a3 3 0 0 1-4.857.886c-.725-.725-.822-1.628-.884-2.198l-.02-.174c-.02-.168-.053-.388-.098-.66c-.077-.477-.178-1.04-.287-1.652l-.048-.267a87.29 87.29 0 0 1-.356-2.096C10.1 33.575 10 32.844 10 32.263c0-.839.329-1.813 1.187-2.51a3.404 3.404 0 0 1 2.047-.75c.528-.02 1.03.066 1.393.147c.099.022.187.044.263.063c.618.156 1.364.407 2.11.67V28.78a4.222 4.222 0 0 1-.369-.141c-1.207-.529-1.991-1.54-2.476-2.393a8.648 8.648 0 0 1-.522-1.088c-.56-1.386-.897-3.026-1.116-4.512C12.04 17.41 12 13.985 12 13c0-.326.052-.64.148-.933c-.527.086-1.062.178-1.607.276l.369 4.346a1 1 0 0 1-.912 1.08l-1.993.17a1 1 0 0 1-1.08-.912l-.35-4.122a.998.998 0 0 1-.147-1.725l-.329-3.87a1 1 0 0 1 .912-1.08l1.993-.17Zm8.497 5.282A2.99 2.99 0 0 1 18 13c0 .905.041 3.98.453 6.771c.207 1.406.479 2.526.78 3.229h9.727l.01-.023l.012-.024c.307-.683.57-1.806.747-3.245c.302-2.45.277-5.053.264-6.26v-.006L29.99 13c0-.609.18-1.175.492-1.648c-4.5-.46-8.547-.462-12.981-.01ZM29 28.782v-.802a1 1 0 0 1 .9-.995c1.362-.138 2.221-1.26 2.73-2.39c.557-1.238.877-2.839 1.07-4.398c.339-2.754.306-5.676.293-6.825v-.005L33.989 13a1 1 0 1 0-2 0l.004.427v.011c.012 1.207.04 3.924-.279 6.515c-.184 1.498-.476 2.86-.908 3.82c-.206.458-.407.762-.613.955a1 1 0 0 1-.685.272h-10.87a1 1 0 0 1-.804-.405a3.951 3.951 0 0 1-.42-.762c-.414-.948-.722-2.29-.94-3.77C16.04 17.123 16 13.932 16 13a1 1 0 1 0-2 0c0 .795.028 3.207.297 5.769c.055.526.12 1.06.198 1.586c.226 1.533.565 3.086 1.088 4.28c.456 1.042 1.242 2.208 2.526 2.35a1 1 0 0 1 .891.994v.803c.243.073.552.159.916.245c1.006.236 2.427.473 4.084.473a18 18 0 0 0 4.083-.473c.365-.086.674-.172.917-.245Zm-10 2.077a20 20 0 0 0 5 .64a20.002 20.002 0 0 0 5-.64v.444a1 1 0 0 0 1.336.942l.55-.197c1.022-.367 1.991-.713 2.713-.896c.366-.092.799-.178 1.18-.144c.194.017.5.074.772.296c.318.258.449.621.449.96c0 .737-.266 2.759-.511 4.376a57.915 57.915 0 0 1-.351 2.1c-.085.438-.142.679-.254.867l-.005.008a1.005 1.005 0 0 1-1.837-.258v-.002c-.12-.442-.168-.953-.195-1.545a50.463 50.463 0 0 1-.019-.499a20.49 20.49 0 0 0-.073-1.337l-.115-1.116a1 1 0 0 0-1.331-.837c-1.116.4-2.386.85-3.632 1.2s-2.538.621-3.677.621c-1.139 0-2.431-.271-3.677-.621c-1.17-.33-2.362-.747-3.427-1.127l-.197-.07a1 1 0 0 0-1.334.867c-.037.49-.077 1.032-.118 1.56c-.063.813-.125 1.6-.173 2.124l-.004.045c-.042.465-.063.696-.151.889l-.006.014a1.001 1.001 0 0 1-1.614.281c-.21-.21-.235-.408-.327-1.146l-.007-.058a19.94 19.94 0 0 0-.108-.733c-.08-.495-.184-1.073-.292-1.678l-.05-.273a85.276 85.276 0 0 1-.347-2.046c-.093-.607-.168-1.198-.168-1.607c0-.338.13-.7.449-.96c.191-.155.4-.23.573-.266c.074-.016.141-.024.198-.03c.382-.033.815.053 1.18.145c.18.046.374.1.58.164c.58.178 1.259.418 1.968.672l.716.257A1 1 0 0 0 19 31.303v-.444Z" /></g></svg></i></span><span id="expense-amount">0</span></h4>
            </div>
            <div class="col-4 text-center">
             <h6 class="text-uppercase info-title">Available</h6>
             <span class="balance-icon"></span>
             <h4 class="text-uppercase mt-2 balance" id="balance"><span><i><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><g fill="currentColor"><path d="M11.32 5.225a.59.59 0 0 1 .385.152l-.003.006a.544.544 0 0 1 .175.383a.145.145 0 0 1-.077.134a.144.144 0 0 1-.05.01h-.309a.555.555 0 0 0 .016-.137a.42.42 0 0 0-.361-.461a.3.3 0 0 0-.167.052a.59.59 0 0 1 .39-.14Zm-.016 2.313a.675.675 0 0 1-.512.041a.125.125 0 1 1 .076-.238a.426.426 0 0 0 .533-.27a.125.125 0 0 1 .238.078a.675.675 0 0 1-.335.39Z" /><path d="M10.91 5.67h-.014a.417.417 0 0 0 .002.242h.363a.401.401 0 0 0 .019-.123c0-.16-.09-.29-.2-.29a.158.158 0 0 0-.107.043a.13.13 0 0 1 .007.04a.081.081 0 0 1-.07.088Z" /><path d="m28.646 18.9l2.173 3.185a1.21 1.21 0 0 1 0 1.382l-.052.074l-.064.064a1.485 1.485 0 0 1-.211.176a1.524 1.524 0 0 1-1.091.531c-.182 0-.361-.042-.524-.124l-2.568-1.3L20.9 24.1a3 3 0 0 1-3.014-1.1l-.794-1.091l-.157.218c-.117.158-.255.3-.409.423a.161.161 0 0 0-.018.019a.19.19 0 0 1-.019.02h-.022a2.37 2.37 0 0 1-.252.182a2.256 2.256 0 0 1-1.115.294a2.262 2.262 0 0 1-.71-.13l-.032.005l-.033-.01a2.36 2.36 0 0 1-.225-.112a.369.369 0 0 0-.046-.018a.267.267 0 0 1-.054-.022l-.362.275l-3.236 5.673l-.753 1.394a1.476 1.476 0 0 1-2.021.621c-.29-.155-2.852-1.529-3.443-1.909a1.378 1.378 0 0 1-.43-1.616A1.335 1.335 0 0 1 5 26.15h2.408l1.639-4.389a8.45 8.45 0 0 1 1.178-2.518l.075-.108l.1-.085l1.7-1.45l.34-.3a9.647 9.647 0 0 1-.906-2.315a9.112 9.112 0 0 1-1.446.114a9.177 9.177 0 0 1-5.38-1.73l-.35-.193l-.05-.028l-.047-.033a3.013 3.013 0 0 1-.885-.99l-.046-.083l-.03-.09a2.37 2.37 0 0 1 .29-2.076l.021-.03l.023-.029a3.352 3.352 0 0 1 1.1-.9l.032-.017l.032-.011c.171-.073.355-.11.541-.11c.189-.001.375.04.547.117a1.388 1.388 0 0 1 .84.195c.413.23.73.6.89 1.044a4.928 4.928 0 0 0 3.83.473c.029-.136.06-.27.094-.405l.058-.223a1.02 1.02 0 0 1-.115-.02l-.076-.014a2.3 2.3 0 0 1-2.046-2.263a1.26 1.26 0 0 1-.5-1.143c.019-.31.134-.608.331-.849l.015-.02c.036-.05.08-.111.133-.199V4.99c.002-.17.019-.34.051-.506a2.16 2.16 0 0 1-.254-1.742A2.3 2.3 0 0 1 11.215.999c.205-.001.408.034.6.105c.139.048.257.094.363.136l.014.005c.09.044.185.075.284.092a1.36 1.36 0 0 0 .346-.068a4.581 4.581 0 0 1 1.247-.178a2.82 2.82 0 0 1 3.041 2.934a7.598 7.598 0 0 1-.155 1.762c.089.08.17.17.242.265c.204.254.355.545.446.857l.044-.016l.013.007l.14-.059a4.055 4.055 0 0 1 2.108-.272a4.071 4.071 0 0 1 1.967.831l1.504 1.176l.763.567l.676.5c.38.251.707.576.96.956l.056.084l.038.094a2.341 2.341 0 0 1-.577 2.168a3.13 3.13 0 0 1-1.15.84l-.036.015l-.037.013a1.343 1.343 0 0 1-1.248-.199h-.154a1.47 1.47 0 0 1-1.332-1.176l-2.015-1.57l-1.063.42l-.24.112a14.76 14.76 0 0 0 1.326 3.025c.157.2.291.417.4.647l.652 1.02l1.168 1.993c.239.39.35.844.316 1.3l3.87-.34l.74-.511l.129-.093c.217-.157.478-.241.746-.24a1.612 1.612 0 0 1 1.239.699Zm-10.492 2.741l2.226-1.411a1.203 1.203 0 0 0 .37-1.63l-.76-1.258l-.008.027l-1.016-1.682a2.649 2.649 0 0 0-.085-.19a.98.98 0 0 0-.066-.113l-.01-.015l-.034-.054l-5.042 2.177v.007l-.971.851l-1.048.9l2.5 2.453c.228.219.529.346.845.357h.143a1.297 1.297 0 0 0 .458-.133a.338.338 0 0 0 .058-.026a.228.228 0 0 0 .05-.044a.31.31 0 0 1 .042-.038a1.27 1.27 0 0 0 .31-.279l.045-.062l.47-.644l.138-.168a.5.5 0 0 1 .81.053l.575.922Zm.583.815a2 2 0 0 0 1.951.663l5.804-1.3l-.391-1.779l.029-.027l-4.554.401a2.2 2.2 0 0 1-.65.654l-.01.006l-2.18 1.382ZM19.4 7.53c-.402 0-.8.079-1.173.232l-.503.202c-.003.019-.003.039-.004.059c-.001.028-.002.057-.008.085a.378.378 0 0 1-.025.072a.42.42 0 0 0-.023.062a.05.05 0 0 0 .007.01c.004.006.009.012.009.018l.02.044l.727 1.842l.673-.266h.007a.773.773 0 0 1 .773.104l2.417 1.886c.02.312.118.704.477.728h.52a.473.473 0 0 0 .377.271a.432.432 0 0 0 .123-.02c.3-.128.568-.323.78-.57c.28-.33.52-.87.41-1.14a2.435 2.435 0 0 0-.7-.69l-.7-.52l-.015.017l-2.275-1.772A3.071 3.071 0 0 0 19.4 7.53Zm-9.183-1.58c-.09.15-.162.25-.217.326a.524.524 0 0 0-.14.314c-.03.31.26.39.4.41a.077.077 0 0 1 .07.08c.02 1.11.22 1.9 1.54 1.91h.03c.326-.004.65-.056.962-.155l.268.53c.231-.265.521-.472.847-.605a2.056 2.056 0 0 1-.787-1.69l.008-.437a.741.741 0 0 0 .552-.189a.748.748 0 0 0-.002-1.119a.754.754 0 0 0-.542-.189a1.076 1.076 0 0 0-.209-.506a.782.782 0 0 0-.5-.29h-.01a.773.773 0 0 0-.47.06a1.534 1.534 0 0 1-.74.127c.209.022.41.096.586.216a.13.13 0 0 1 .005.224a.13.13 0 0 1-.151-.01a1.03 1.03 0 0 0-.71-.168a.13.13 0 0 1-.034-.258c.088-.012.176-.014.263-.008a1.532 1.532 0 0 1-.439-.113c-.1-.047-.196-.1-.289-.158a1.81 1.81 0 0 0-.171.748v.5a.89.89 0 0 1-.12.45Zm.98 8.074c.377-.052.75-.13 1.117-.233h.003c-.06-.808-.059-1.62.004-2.427a5.928 5.928 0 0 1-5.56-.577a1.12 1.12 0 0 0-.538-.822a.387.387 0 0 0-.2-.063v.016c-.28.277-.532.581-.753.908a.262.262 0 0 0-.013.168a.228.228 0 0 0 .077.11a.26.26 0 0 0 .112.05a.08.08 0 0 0 .03 0c.097-.1.19-.2.277-.3a.423.423 0 0 1 .061-.085c.1-.109.183-.068.22-.023a.125.125 0 0 1 0 .158l-.074.09l-.009.02a1.315 1.315 0 0 0-.06.584a.112.112 0 0 1-.007.048a.11.11 0 0 1-.024.042a.115.115 0 0 1-.039.03a.133.133 0 0 1-.096.006a.14.14 0 0 1-.042-.025a.145.145 0 0 1-.03-.039a.132.132 0 0 1-.012-.047v-.273a.269.269 0 0 1-.233.055a.5.5 0 0 1-.228-.1a.462.462 0 0 1-.161-.234a.507.507 0 0 1 .024-.34l.01-.02c.178-.265.374-.517.589-.752a.413.413 0 0 0-.1-.1a.447.447 0 0 0-.2-.069a.367.367 0 0 0-.15.032a2.37 2.37 0 0 0-.77.63a1.368 1.368 0 0 0-.17 1.2c.145.261.347.486.59.66l.4.222a8.239 8.239 0 0 0 5.955 1.5ZM9.31 28.62l3.555-6.24l.344-.261l-2.23-2.185A7.455 7.455 0 0 0 10 22.07l-1.9 5.08h.09l1.044 1.419l.076.051Z" /></g></svg></i></span><span id="balance-amount">0</span></h4>
            </div>
           </div>
          </div>
         </div>
     
         <div class="row">
          <div class="col-md-5 my-3">
           
           <div class="expense-feedback alert alert-danger text-capitalize">expense feedback</div>
           
           <form id="expense-form" class=" expense-form">
            <h5 class="text-capitalize">please enter your activity</h5>
            <div class="form-group">
             <input type="text" class="form-control expense-input" id="expense-input"/>
            </div>
            <h5 class="text-capitalize">please enter calories burned</h5>
            <div class="form-group">
             <input type="number" class="form-control expense-input" id="amount-input"/>
            </div>
            
            <button type="submit" class="btn text-capitalize expense-submit" id="expense-submit">enter calories</button>
           </form>
          </div>
          <div class="col-md-7 my-3">
           
           <div class="expense-list" id="expense-list">
     
            <div class="expense-list__info d-flex justify-content-between text-capitalize">
             <h5 class="list-item">Activity</h5>
             <h5 class="list-item">Calories</h5>
             <h5 class="list-item"></h5>
            </div>
            
     
             <div class="expense">
             <div class="expense-item d-flex justify-content-between align-items-baseline">
     
              <h6 class="expense-title mb-0 text-uppercase list-item">- title</h6>
              <h5 class="expense-amount mb-0 list-item">amount</h5>
     
              <div class="expense-icons list-item">
     
               <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
                <i class="fas fa-edit"></i>
               </a>
               <a href="#" class="delete-icon" data-id="${expense.id}">
                <i class="fas fa-trash"></i>
               </a>
              </div>
             </div>
     
            </div>
     
     
           </div>
          </div>
         </div>
     
     
     
     
        </div>
       </div>
      </div>
     
     
     
     
     </body>
 );
 }
}

 
 









 

