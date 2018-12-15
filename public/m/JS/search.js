$(function(){
    // 页面加载完毕先显示搜索历史记录
    queryHistory();
    var historyData;
    function queryHistory () {
        // 1、获取本体存储
        historyData = JSON.parse(localStorage.getItem('searchHistory')) || [];
        // 2、制作模板，把内容显示到页面
        // 把本地储存拿到的数组包装成对象
        var historyDataObj = { list: historyData };
        var html = template('searchListTpl',historyDataObj);
        $('.mui-table-view').html(html);
    }

    // 1、给搜索按钮添加点击事件
    $('.btn-search').on('tap',function(){
        // 2、获取输入框的内容
        var search = $('.input-search').val();
        // 3、对搜索内容进行非空判断
        if (!search.trim()) {
            alert('请输搜索内容');
            return;
        }
        // 4、看本地储存里面有没有没有这个值，有就删掉这个值，重新加，没有就直接加
        if (historyData.indexOf(search) != -1) {
            historyData.splice(historyData.indexOf(search),1);
        };
        // 有重复的已经删了，直接加
        historyData.unshift(search);
        // 5、加完以后把数组内容加进localStorage
        localStorage.setItem('searchHistory',JSON.stringify(historyData));
        // 6、加完以后，把localStory里面的数据渲染到页面
        //    等下次进入当前页面的时候再显示
        // 7、清空搜索框内容
        $('.input-search').val('');
        // 8、跳转到商品列表页面
        location = 'productlist.html?search='+search;
    });
    // 2、给删除按钮添加点击事件
    $('.mui-table-view').on('tap','.btn-del',function(){
        // 拿到对应按钮的索引
        var index = $(this).data('index');
        // 根据索引删掉数组中的对应元素
        historyData.splice(index,1);
        // 把数组重新加到localStorage里面
        localStorage.setItem('searchHistory',JSON.stringify(historyData));
        // 重新渲染页面
        queryHistory();
    });
    // 3、给清空数据添加点击事件
    $('.btn-clear').on('tap',function(){
        localStorage.removeItem('searchHistory');
        queryHistory();
    });
})