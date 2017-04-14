app.service('jsonpSer',function(){
   this.jsonP = function(url,arg,fn){
       //1、创建script标签
       var scrip = document.createElement('script');

       var queryString = '';
       for(var key in arg){
           queryString += key + '=' + arg[key] + '&';
       }
       var funcName = 'myJsonp' + Math.random().toString().substr(2);
       url += '?' + queryString + 'callback=' + funcName;

       window[funcName] = function(data){
           fn(data);
       };

       scrip.src = url;

       window.document.body.appendChild(scrip);

   }
});