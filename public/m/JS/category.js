$(function () {
    // 分类页面滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 动态生成左侧分类栏
    $.ajax({
        url: '/category/queryTopCategory',
        success: function (data) {
            var html = template('categoryLeftTpl',data);
            $('.category-left ul').html(html);
        }
    });

    // 给左侧分类栏加点击事件
    // 通过ajax异步添加的元素，要使用事件委托来注册事件
    $('.category-left ul').on('tap','li a',function(){
        // 拿到当前点击元素的id值
        var id = $(this).data('id');
        // 发请求;
        // 封装成函数直接调用
        querySecondCategroy(id);
        // 给当前点击元素的对应li添加active类,注意当前元素是a，要给他的父元素加类
        $(this).parent().addClass('active').siblings().removeClass('active');
    });
    function querySecondCategroy (id) {
        $.ajax({
            url: '/category/querySecondCategory',
            data: {id: id},
            success: function (data) {
                var html = template('categoryRightTpl',data);
                $('.category-right ul').html(html);
            }
        })
    };
    // 页面加载好，默认显示第一项
    querySecondCategroy(1);
})

