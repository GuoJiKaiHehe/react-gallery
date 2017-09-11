import React,{Component} from 'react'
import '../less/ImgFigure.less'
class ImgFigure extends Component{
	constructor(props) {
		super(props);
		
	}
	handleClick(e){
		if(this.props.arrange.isCenter){
			//如果是居中了，就让其反转；
			this.props.inverse(); //之所以不用传；是因为；在用props传过来的时候调用的时候就传了index;
		}else{
			this.props.center();
		}
		e.stopPropagation();
   		e.preventDefault();
	}
	render(){
		var styleObj = {};
		if (this.props.arrange.pos) {
	      styleObj = this.props.arrange.pos;
	    }
	    if(this.props.arrange.rotate){
	      ['MozTransform','msTransform','WebkitTransform','transform'].forEach(function(value){
	        styleObj[value] = 'rotate('+this.props.arrange.rotate+'deg)';
	      }.bind(this));
	    }
	    //添加z-index 避免遮盖
	    if(this.props.arrange.isCenter){
	      styleObj.zIndex = 11;
	    } else {
	      styleObj.zIndex = 0;
	    }
	    var imgFigureClassName='img-figure';
	    	imgFigureClassName+= this.props.arrange.isInverse?' is-inverse':'';
		return (
				<figure className={imgFigureClassName} 
						style = {styleObj}
						onClick={this.handleClick.bind(this)}
						ref="figure">
					<img className="img" src={this.props.data.imageURL} alt={this.props.data.desc} />
					<figcaption>
						<h2 className="img-title">{this.props.data.title}</h2>
						<div className="img-back" onClick={this.handleClick.bind(this)} >
							<p>{this.props.data.desc}</p>
						</div>
					</figcaption>
				</figure>
			);
	}
}

export default ImgFigure