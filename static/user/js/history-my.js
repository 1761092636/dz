var nowuser;
$.ajax({
    "type": "GET",
    "url": "http://127.0.0.1:9526/router/GetUser",
    xhrFields: {
      withCredentials: true // 允许携带凭证  
    },
    crossDomain: true, // 允许跨域请求  
    "success": function (data) {
      nowuser = data.data[0].address;
$.ajax({
  "type": "POST",
  "url": "http://127.0.0.1:9526/router/GetHistoryByUser",
  xhrFields: {
      withCredentials: true // 允许携带凭证  
  },
  crossDomain: true, // 允许跨域请求 
  dataType: "json",
  contentType: "application/json",
  data: JSON.stringify({
    "operator":nowuser,
  }),
  "success": function (mydata) {
      for (let i = 0; i < mydata.data.length; i++) {
          let historyItem = mydata.data[i];
          let lostDataArray = []; // 存储每次循环中的 lostdata
          $.ajax({
              "type": "GET",
              "url": "http://127.0.0.1:9526/router/GetLostItemById",
              xhrFields: {
                  withCredentials: true // 允许携带凭证  
              },
              crossDomain: true, // 允许跨域请求 
              dataType: "JSON",
              contentType: "application/json", // 设置 content-type
              data: { "lostItemId": historyItem.RelatedLostItemID },
              "success": function (data1) {
                  for (let j = 0; j < data1.data.length; j++) {
                      let lostItem = data1.data[j];
                      console.log(lostItem.lostItemName)
                      var lostdata = lostItem.lostItemName;
                      lostDataArray.push(lostdata); // 将每次循环中的 lostdata 存入数组
                  }
                  // 在此处使用 lostDataArray
                  var timestamp = historyItem.OperationTime;
                  
                  // 使用 Date 对象将时间戳转换为日期时间
                  var date = new Date(timestamp * 1000);
                  // 使用 Date 对象的方法获取年、月、日、小时、分钟和秒
                  var year = date.getFullYear();
                  var month = date.getMonth() + 1; //  JavaScript 中月份从 0 开始，需要加 1
                  var day = date.getDate();
                  var hours = date.getHours();
                  var minutes = date.getMinutes();
                  var seconds = date.getSeconds();
                  var formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
                  $("#news").append(`
                      <article class="post-modern">
                          <h3 class="post-modern-title"><a href="single-post.html">操作：${historyItem.Operation}</a></h3>
                          <div class="post-modern-body">
                              <div class="row row-20 justify-content-between">
                                  <div class="col-auto">
                                      <div class="post-modern-meta">操作者：<a href="#">${historyItem.operator}</a></div>
                                  </div>
                              </div>
                              <p class="post-modern-text">操作失物：#${historyItem.RelatedLostItemID} / ${lostDataArray.join(', ')}</p>
                              <p class="post-modern-text">操作时间：${formattedDateTime}</p>
                          </div>
                      </article>
                  `);
              }
          });
      }
  }
});
}});

