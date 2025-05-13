//js
const outer_data = { 
    //新增一筆資料，資料為店名，店名為"水果店"
    store_name: "水果店",
    //新增一筆資料，資料為店的地址，店名地址為"淡水區某某路100號"
    store_address: "淡水區某某路100號",
    fruits: [
       { name: "蘋果", price: 30, num: 10 },
       { name: "香蕉", price: 60, num: 10},
       { name: "芭樂", price: 120, num: 10}
      ]
};

const app = Vue.createApp({
   data() { //相關資料儲存
       return {
           ...outer_data,
           selectedFruit: null, // 選擇的水果，初始為 null
           selectedQuantity: 0, // 選擇的數量
           cart: [], // 購物車
           totalAmount: 0 // 總金額
       };
   },
   methods: { //程式碼的設計
       addToCart() {
           if (this.selectedFruit && this.selectedQuantity > 0) {
               const totalPrice = this.selectedFruit.price * this.selectedQuantity;
               this.cart.push({
                   name: this.selectedFruit.name,
                   price: this.selectedFruit.price,
                   quantity: this.selectedQuantity,
                   totalPrice: totalPrice
               });
               this.totalAmount += totalPrice;
               this.selectedFruit.num -= this.selectedQuantity; // 減少庫存
           }
       },
       removeFromCart(index) {
           const item = this.cart[index];
           this.totalAmount -= item.totalPrice;
           const fruit = this.fruits.find(f => f.name === item.name);
           if (fruit) {
               fruit.num += item.quantity; // 恢復庫存
           }
           this.cart.splice(index, 1);
       },
       checkout() {
           if (this.cart.length === 0) {
               alert('購物車是空的，無法結帳！');
               return;
           }
           let summary = '結帳成功！\n';
           this.cart.forEach(item => {
               summary += `${item.name} - 數量: ${item.quantity} - 金額: ${item.totalPrice}元\n`;
           });
           summary += `\n總金額: ${this.totalAmount}元`;
           alert(summary);
           // 清空購物車
           this.cart = [];
           this.totalAmount = 0;
       }
   }
});

app.mount("#app1"); //#符號代表唯一的id