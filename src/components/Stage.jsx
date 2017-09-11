import React, {
	Component,
	ReactDOM
} from 'react'
import ImgFigure from './ImgFigure'
import ControllerNav from './ControllerNav'
import lib from'../util/lib.js'
import '../less/Stage.less'
// console.log(lib);

let imageDatas = require("../data/imgdata.json");
imageDatas.forEach((imgItem, index) => {
		imgItem.imageURL = require("../assets/images/" + imgItem.fileName);

	})
	// console.log(imageDatas)

class Stage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imgArrangeArr:[]
		}
		
	this.Constant = { //常量的key ？
        centerPos: {
          left: 0,
          right: 0
        },
        hPosRange: { //水平方向取值范围
          leftSecX: [0, 0],
          rightSecX: [0, 0],
          y: [0, 0]
        },
        vPosRange: { //垂直方向取值范围
          x: [0, 0],
          topY: [0, 0]
        }
      }
	}
	rearrange(centerIndex){
		var imgArrangeArr=this.state.imgArrangeArr,
			Constant = this.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x;
		var imgsArrangeTopArr = [];
		var  topImgNum = Math.floor(Math.random() * 2); //一半概率，可有可无；
		var topImgSpliceIndex = 0;

		var imgsArrangeCenterArr = imgArrangeArr.splice(centerIndex, 1);
		 	imgsArrangeCenterArr[0] ={
		      pos: centerPos,
		      rotate : 0,
	    	  isCenter: true
	    	}
	    //随机获取一张图片放上面；
	    topImgSpliceIndex = Math.ceil(Math.random() * (imgArrangeArr.length - topImgNum));
	    
	    //布局在上册的数组；
	    imgsArrangeTopArr = imgArrangeArr.splice(topImgSpliceIndex, topImgNum);

	    imgsArrangeTopArr.forEach((item,index)=>{
	    	imgsArrangeTopArr[index]={
	    		pos:{
	    			top: lib.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),//随机范围；
          			left: lib.getRangeRandom(vPosRangeX[0], vPosRangeX[1])//随机范围；
	    		},
	    		rotate:lib.getDegRandom(), //随机角度；
	    		isCenter:false //不是居中；
	    	}
	    });
	    //布局左右两侧的图片
    for (var i = 0, j = imgArrangeArr.length, k = j / 2; i < j; i++) {
      var hPosRangeLORX = null; //左区域或者右区域的取值范围

      //前半部分布局左边，右半部分布局右边
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }
      imgArrangeArr[i] ={
        pos : {
          top: lib.getRangeRandom(hPosRange.y[0], hPosRange.y[1]),
          left: lib.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate:lib.getDegRandom(),
        isCenter:false
      };
    }
     //把取出来的图片放回去
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }

    imgArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]) //中间的图片放回去；

		this.setState({
			imgArrangeArr:imgArrangeArr
		})
	}
	componentDidMount() {
		//舞台大小；
		let stageDOM = this.refs.stage,
			stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,
			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);

		//图片组建大小；
		let imgFigureDOM = this.refs.imgfigure0.refs.figure,
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		};

		// 左右侧，图片位置取值范围；
		this.Constant.hPosRange.leftSecX[0]= -halfImgW;//左边最小的x；
		this.Constant.hPosRange.leftSecX[1]= halfStageW -halfImgW * 3 ; //左边最大值；
		this.Constant.hPosRange.rightSecX[0]= -halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1]= stageW - halfImgW;
		this.Constant.hPosRange.y[0]= -halfImgH
		this.Constant.hPosRange.y[1]= stageH - halfImgH;

		//计算上侧，图片位置的取值范围
      this.Constant.vPosRange.topY[0] = -halfImgH;
      this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
      this.Constant.vPosRange.x[0] = halfStageW - imgW;
      this.Constant.vPosRange.x[1] = halfStageW;
      this.rearrange(0);

	}
	inverse(index){
		return function(){
			var imgArrangeArr = this.state.imgArrangeArr;
				imgArrangeArr[index].isInverse=!imgArrangeArr[index].isInverse;
				this.setState({
					imgArrangeArr:imgArrangeArr
				})
		}.bind(this);
	}
	center(index){
		return function(){
			this.rearrange(index); //重新布局；;
		}.bind(this)
	}
	render() {
			let ImgFigures = [];
			let ControllerNavs = [];
			imageDatas.forEach((item, index) => {
					if(!this.state.imgArrangeArr[index]){	
						this.state.imgArrangeArr[index]={
							pos:{
								left:0,
								top:0
							},
							rotate:0, //旋转角度；
							isInverse:false,//是否反转；
							isCenter:false //是否居中；
						}
					}
					ImgFigures.push( <ImgFigure data = {item} 
												key = {index} 
												arrange={this.state.imgArrangeArr[index]}
												inverse={this.inverse(index).bind(this)} //反转事件函数；
												center={this.center(index).bind(this)} //居中事件函数；
												ref = {'imgfigure' + index}/>)
					ControllerNavs.push( <ControllerNav key = {index}
														arrange={this.state.imgArrangeArr[index]}
														inverse={this.inverse(index).bind(this)} //反转事件函数；
														center={this.center(index).bind(this)} //居中事件函数；
														ref = {'controllerUtil' + index} />);
							
							});
						// ImgFigures.
					return ( <div className = "stage"
						ref = "stage" >
						<div className = "img-sec-wrap" > {
							ImgFigures
						} </div> <div className = "controller-nav-wrap" > {
							ControllerNavs
						} </div> </div>
					);
				}
			}


export default Stage;