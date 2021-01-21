## [109-1] Web Programming Final

### (Group 33) NTU twEATer

**Deployed 連結: https://ntutweater.herokuapp.com/**

**Demo 影片連結: https://www.youtube.com/watch?fbclid=IwAR2Ot46D7vMZxYggBj-QDutk0sRp5e4VHGfKZrV_MPV3SHPSzdXzBtkxLd0&v=yeOhAuze8gE&feature=youtu.be**

這是一個美食交流平台，讓使用者分享餐廳、撰寫評論並建立美食資料庫，讓使用者創建和查詢餐廳的詳細資訊。
除此之外，我們還提供了「好手氣」和「揪吃飯」的功能，讓有選擇障礙或找不到朋友的使用者也能擁有美好的用餐體驗！

使用/操作方式 (含伺服器端以及使用者端)
使用者第一次使用時，在登入介面按"Create Account"來創建帳戶，之後便可以直接登入。主畫面有6個切換模式：
1. Post: 瀏覽社群中各使用者撰寫的餐廳評價，可以對評價按讚或留言，也可以點入餐廳查看詳細資訊。
2. Search: 透過名字/種類/營業時間/價格/地點等資訊，查詢符合條件的餐廳。
3. Roulette: 好手氣! 隨機挑選餐廳並提供詳細資訊，是選擇障礙的救星！
4. twEAT!: 瀏覽目前別人開揪的飯局，包含餐廳、人數、時間等資訊，在喜歡的飯局點選"Join"即可加入。
5. Add: 有以下三種模式：
   (1) 撰寫餐廳評價(必須附帶照片)
   (2) 新增餐廳資訊 
   (3) 開揪飯局！
6. Profile: 瀏覽並更新個人資料與頭貼。
伺服器端以GraphQL和MongoDB寫成，可在GraphQL playground進行開發。

> Github link: https://github.com/hsiangchang20/twEATer

其他說明: 本網站提供無限制的撰寫貼文與回應的服務，為了保持網站內資訊簡潔，將在評分完後再釋出網站連結，歡迎大家來使用~

#### 使用與參考之框架/模組/原始碼: 

* 參考原始碼: Modern GraphQL Tutorial: https://github.com/ian13456/modern-graphql-tutorial
* 參考框架: colorlib.com 的 Login Form Template: https://colorlib.com/wp/html5-and-css3-login-forms/

#### 專題製作心得:
這次我們試著用所有學過的東西，將一個完整的服務建立起來，前端除了背景和字體外幾乎都是從頭開始寫，後端則完整使用上課教過的GraphQL各式功能建構社群軟體的資料處理，整個網路服務就像是美食版的twitter，成就感很高。
整個project的開發中，最讓我們感到挫折的是各種不合常理的bug，總讓看似尋常的程式碼中整個崩潰，但隨著經驗的累積，我們漸漸能掌握網路服務程式的脈絡，也學習如何利用各種蛛絲馬跡和網路資源找到解方。
同時，我們也了解到不倚賴模板、獨立刻出網路服務是多麼困難的事，將來如果還有機會寫網頁，一定要善加利用可取得的資源，才不會事倍功半。

* 使用之第三方套件、框架、程式碼
  Frontend(js, css): React, React-router, Bootstrap, Apollo, React-icons, google maps javascript api, React-geocode, imgur api, material-ui
  Backend(js): GraphQL, Mongoose
  Database: MongoDB

---

#### 每位組員之貢獻 (請詳述)

* 詹侑昕：後端程式設計、資料庫操作、Schema制定、後端GraphQL Resolver設計與維護
* 陳永縉：前後端資料傳輸、前端程式介面設計、前端資料整理
* 張家翔：前端程式介面設計與排版、Google Map API開發
