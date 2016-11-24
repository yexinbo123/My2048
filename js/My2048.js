/**
 * Created by Administrator on 2016/10/13.
 */
var game={
    data:null,
    dh:null,
    interval:10,
    step:10,
    timer:null,
    score:0,
    start:function () {
        //初始化数组值都为0
        this.data=[];
        this.dh=[];
        this.score=0;
        for(var i=0;i<4;i++){
            this.data[i]=[];
            this.dh[i]=[];
            for(var j=0;j<4;j++){
                this.data[i][j]=0;
                this.dh[i][j]=0;
            }
        }
        this.updateDiv();
        this.RandomNum();
        this.RandomNum();
        document.getElementsByClassName("zz")[0].className="zz";
        document.getElementsByClassName("final")[0].className="final";
        document.getElementsByClassName("final")[0].style.display="none";
    },
    //取随机数并插入数组中
    RandomNum:function () {
        //为每个值为0的下标赋随机值，取最大的随机值下标位置
        var x=0,a=0,b=0;
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(this.data[i][j]==0){
                    var y=Math.random();
                    if(y>x){
                        x=y;
                        a=i;
                        b=j;
                    }
                }
            }
        }
        if(Math.random()<0.9){
            this.data[a][b]=2;
            document.getElementById("b"+a+b).innerHTML=2;
            document.getElementById("b"+a+b).className="ceil n2";
            document.getElementById("b"+a+b).style.animation="";
            document.getElementById("b"+a+b).style.animation="fd 0.2s linear";
        }
        else{
            this.data[a][b]=4;
            document.getElementById("b"+a+b).innerHTML=4;
            document.getElementById("b"+a+b).className="ceil n4";
            document.getElementById("b"+a+b).style.animation="";
            document.getElementById("b"+a+b).style.animation="fd 0.2s linear";
        }
        //随机生成值为0的下标位置
        /*while(true){
            var x=parseInt(Math.random()*4);
            var y=parseInt(Math.random()*4);
            if(this.data[x][y]==0){
                this.data[x][y]=Math.random()<0.5?2:4;
                break;
            }
        }*/
    },
    //更新页面数据
    updateDiv:function () {
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                document.getElementById("b"+i+j).style.animation="";
                if(this.data[i][j]!=0){
                    document.getElementById("b"+i+j).innerHTML=this.data[i][j];
                    document.getElementById("b"+i+j).className="ceil n"+this.data[i][j];
                }
                else{
                    document.getElementById("b"+i+j).innerHTML="";
                    document.getElementById("b"+i+j).className="ceil";
                }
                if(this.dh[i][j]==5){
                    document.getElementById("b"+i+j).style.animation="hfd 0.2s linear";
                }
                this.dh[i][j]=0;
                document.getElementById("b"+i+j).style.transform="";
            }
        }
        document.getElementById("score_main").innerHTML=this.score;
    },
    //得分增加
    //判断数组是否已满
    isFull:function () {
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(this.data[i][j]==0){return false;}
            }
        }
        return true;
    },
    //判断游戏是否结束
    isGameOver:function () {
        if(this.isFull()){
            for(var i=0;i<4;i++){
                for(var j=0;j<3;j++){
                    if(this.data[i][j]==this.data[i][j+1]){return;}
                    if(this.data[j][i]==this.data[j+1][i]){return;}
                }
            }
            return true;
        }
    },
    //左移
    LeftMove:function () {
        var self=this;
        var before=this.data.toString();
        clearInterval(self.timer);
        self.updateDiv();
        for(var i=0;i<4;i++){
            this.LeftMoveInRow(i);
        }
        if(before!=this.data.toString()) {
            var k=0;
            self.timer=setInterval( function () {
                for(var i=0;i<4;i++){
                    for (var j=0;j<4;j++){
                        if (self.dh[i][j]!=5){
                            document.getElementById("b"+i+j).style.transform="translateX(-"+self.dh[i][j]*110*k/10+"px)";
                        }
                    }
                }
                if(k++>self.step){
                    clearInterval(self.timer);
                    self.updateDiv();
                    self.RandomNum();
                }
            },self.interval);
        }
        if(this.isGameOver()){
            document.getElementsByClassName("zz")[0].className="zz cx";
            document.getElementsByClassName("final")[0].className="final cx1";
            document.getElementsByClassName("final")[0].style.display="block";
        }
    },
    LeftMoveInRow:function (r) {
        for(var i=0;i<3;i++){
            var next=this.RightNext(r,i);
            if(next==-1){break;}
            else if(this.data[r][i]==0){
                this.data[r][i]=this.data[r][next];
                this.data[r][next]=0;
                this.dh[r][next]=next-i;
                i--;
            }
            else if(this.data[r][next]==this.data[r][i]){
                this.data[r][i]*=2;
                this.data[r][next]=0;
                this.dh[r][i]=5;
                this.dh[r][next]=next-i;
                this.score+=this.data[r][i];
            }
        }
    },
    RightNext:function (r,x) {
        for(var i=x+1;i<4;i++){
            if(this.data[r][i]!=0){return i}
        }
        return -1;
    },
    //右移
    RightMove:function () {
        var self=this;
        var before=this.data.toString();
        clearInterval(self.timer);
        self.updateDiv();
        for(var i=0;i<4;i++){
            this.RightMoveInRow(i);
        }
        if(before!=this.data.toString()) {
            var k=0;
            clearInterval(self.timer);
            self.timer=setInterval( function () {
                for(var i=0;i<4;i++){
                    for (var j=0;j<4;j++){
                        if (self.dh[i][j]!=5){
                            document.getElementById("b"+i+j).style.transform="translateX("+self.dh[i][j]*110*k/10+"px)";
                        }
                    }
                }
                if(k++>self.step){
                    clearInterval(self.timer);
                    self.updateDiv();
                }
            },self.interval);
            self.RandomNum();
        }
        if(this.isGameOver()){
            document.getElementsByClassName("zz")[0].className="zz cx";
            document.getElementsByClassName("final")[0].className="final cx1";
            document.getElementsByClassName("final")[0].style.display="block";
        }
    },
    RightMoveInRow:function (r) {
        for(var i=3;i>0;i--){
            var next=this.LeftNext(r,i);
            if(next==-1){break;}
            else if(this.data[r][i]==0){
                this.data[r][i]=this.data[r][next];
                this.data[r][next]=0;
                this.dh[r][next]=i-next;
                i++;
            }
            else if(this.data[r][next]==this.data[r][i]){
                this.data[r][i]*=2;
                this.data[r][next]=0;
                this.dh[r][i]=5;
                this.dh[r][next]=i-next;
                this.score+=this.data[r][i];
            }
        }
    },
    LeftNext:function (r,x) {
        for(var i=x-1;i>=0;i--){
            if(this.data[r][i]!=0){return i}
        }
        return -1;
    },
    //上移
    UpMove:function () {
        var self=this;
        var before=this.data.toString();
        clearInterval(self.timer);
        self.updateDiv();
        for(var i=0;i<4;i++){
            this.UpMoveInRow(i);
        }
        if(before!=this.data.toString()) {
            var k=0;
            self.timer=setInterval( function () {
                for(var i=0;i<4;i++){
                    for (var j=0;j<4;j++){
                        if (self.dh[i][j]!=5){
                            document.getElementById("b"+i+j).style.transform="translateY(-"+self.dh[i][j]*110*k/10+"px)";
                        }
                    }
                }
                if(k++>self.step){
                    clearInterval(self.timer);
                    self.updateDiv();
                }
            },self.interval);
            self.RandomNum();
        }
        if(this.isGameOver()){
            document.getElementsByClassName("zz")[0].className="zz cx";
            document.getElementsByClassName("final")[0].className="final cx1";
            document.getElementsByClassName("final")[0].style.display="block";
        }
    },
    UpMoveInRow:function (r) {
        for(var i=0;i<3;i++){
            var next=this.DownNext(r,i);
            if(next==-1){break;}
            else if(this.data[i][r]==0){
                this.data[i][r]=this.data[next][r];
                this.data[next][r]=0;
                this.dh[next][r]=next-i;
                i--;
            }
            else if(this.data[next][r]==this.data[i][r]){
                this.data[i][r]*=2;
                this.data[next][r]=0;
                this.dh[i][r]=5;
                this.dh[next][r]=next-i;
                this.score+=this.data[i][r];
            }
        }
    },
    DownNext:function (r,x) {
        for(var i=x+1;i<4;i++){
            if(this.data[i][r]!=0){return i}
        }
        return -1;
    },
    //下移
    DownMove:function () {
        var self=this;
        var before=this.data.toString();
        clearInterval(self.timer);
        self.updateDiv();
        for(var i=0;i<4;i++){
            this.DownMoveInRow(i);
        }
        if(before!=this.data.toString()) {
            var k=0;
            clearInterval(self.timer);
            self.timer=setInterval( function () {
                for(var i=0;i<4;i++){
                    for (var j=0;j<4;j++){
                        if (self.dh[i][j]!=5){
                            document.getElementById("b"+i+j).style.transform="translateY("+self.dh[i][j]*110*k/10+"px)";
                        }
                    }
                }
                if(k++>=self.step){
                    clearInterval(self.timer);
                    self.updateDiv();
                }
            },self.interval);
            self.RandomNum();
        }
        if(this.isGameOver()){
            document.getElementsByClassName("zz")[0].className="zz cx";
            document.getElementsByClassName("final")[0].className="final cx1";
            document.getElementsByClassName("final")[0].style.display="block";
        }
    },
    DownMoveInRow:function (r) {
        for(var i=3;i>=0;i--){
            var next=this.UpNext(r,i);
            if(next==-1){break;}
            else if(this.data[i][r]==0){
                this.data[i][r]=this.data[next][r];
                this.data[next][r]=0;
                this.dh[next][r]=i-next;
                i++;
            }
            else if(this.data[next][r]==this.data[i][r]){
                this.data[i][r]*=2;
                this.data[next][r]=0;
                this.dh[i][r]=5;
                this.dh[next][r]=i-next;
                this.score+=this.data[i][r];
            }
        }
    },
    UpNext:function (r,x) {
        for(var i=x-1;i>=0;i--){
            if(this.data[i][r]!=0){return i}
        }
        return -1;
    }
};
window.onload=function () {
    document.getElementById("go").onclick=function(){game.start();};
    document.getElementById("again").onclick=function(){game.start();};
    document.onkeydown=function () {
        var e=window.event.keyCode;
        switch (e){
            case 37:
                game.LeftMove();
                break;
            case 38:
                game.UpMove();
                break;
            case 39:
                game.RightMove();
                break;
            case 40:
                game.DownMove();
                break;
            default:
                break;
        }
    };
    /*var x=[];
    function getChildren(curr) {
        var children=curr.childNodes;
        console.log(x.join("")+(curr.nodeType!=2&&curr.nodeType!=3?curr.nodeName:curr.nodeValue));
        for(var i=0,len=children.length;i<len;i++){
            x.unshift("\t");
            getChildren(children[i]);
            x.shift("\t");
        }
    }
    getChildren(document);*/
};