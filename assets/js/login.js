$(function () {
    //点击去注册账号的链接
    $("#link_rge").on('click', function () {
        $('.login-box').hide()
        $('.rge-box').show()
    })
    //点击去登录的链接
    $("#link_login").on('click', function () {
        $('.rge-box').hide()
        $('.login-box').show()
    })


    //从layui中获取form 对象
    var form = layui.form
    var layer = layui.layer
    form.verify({

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ped: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        pad: function (value) {
            var pwd = $('.rge-box  [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser',
            data, function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录');
                $('#link_login').click();
            }
        )

    })
    //监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        var ges = { username: $('#form_login [name=username]').val(), password: $('#form_login [name=password]').val() }
        $.ajax({
            url: '/api/login',
            method: 'post',
            //快速获取表单数据
            data: ges,
            success: function (res) {
                if (res.status !== 0) {
                    return  layer.msg('登录失败!');
                }
                layer.msg('登录成功!');
                //跳转到后台主页
                //成功登录得到token 字符串保存到 localStorage
              localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        }
        )
    })
});
