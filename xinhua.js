jQuery(document).ready(function(){
    var miniBlogShare = function() {

        //附加位置
        $('<img id="huaci" title="查一下" src="https://static.oschina.net/uploads/space/2017/0117/165834_aa9T_199060(V).png" />').appendTo('body');
        //图标定位
        $('#huaci').css({ display : 'none', position : 'absolute', cursor : 'pointer' });

        //获取划词
        var funGetSelectTxt = function() {
            var txt = '';
            if(document.selection) {
                txt = document.selection.createRange().text;
            } else {
                txt = document.getSelection();
            }
            return txt.toString();
        };

        //定位
        $('html,body').mouseup(function(e) {
            $('#result').remove();
            if (e.target.id == 'huaci') { return } e = e || window.event;
            var txt = funGetSelectTxt(), sh = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, left = (e.clientX - 40 < 0) ? e.clientX + 20 : e.clientX + 5, top = (e.clientY - 40 < 0) ? e.clientY + sh + 20 : e.clientY + sh + 10;
            if (txt) {
                $('#huaci').css({ display : 'inline', left : left, top : top });
            } else {
                $('#huaci').css('display', 'none');
            }
        });

        //查词
        $('#huaci').click(function() {
            var txt = funGetSelectTxt(), title = $('title').html();
            var left = $('#huaci').position().left;
            var top = $('#huaci').position().top;

            if (txt) {
                var APP_ID = '3FTO9gUwLI5pPgnaJt2hPQV5-gzGzoHsz';
                var APP_KEY = 'wgrgYQe9TBtCdtnXqs87FbD9';
                AV.init({
                  appId: APP_ID,
                  appKey: APP_KEY
                });
                  var query = new AV.Query('XinHuaZiD');
                  query.equalTo('hanzi', txt);
                  query.first().then(function (res) {
                  var content = '汉字：' + res.get('hanzi') + '<hr /><br />五笔：' + res.get('wubi') + '<hr /><br />拼音：' + res.get('pinyin') + '<hr /><br />笔画数：' + res.get('bihuashu') + '<hr /><br />除部首笔画数：' + res.get('chubushoubihuashu') + '<hr /><br />部首：' + res.get('bushou') + '<hr /><br />简解：<br />' + res.get('jianjie') + '<hr /><br />详解：<br />' + res.get('xiangjie');

                  $('<div id="result" width="50">'+ content +'</div>').appendTo('body');
                  $('#result').css({ display : 'inline', position : 'absolute', left : left, top : top });
                }, function (error) {
                  // 异常处理
                });
            }
        });
    }();
});
