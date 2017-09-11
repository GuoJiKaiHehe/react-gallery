import React,{Component} from 'react'
import '../less/ControllerNav.less'

class ControllerNav extends Component{
	constructor(props) {
		super(props);
	}
	handleClick(e){
		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}

		e.stopPropagation();
		e.preventDefault();
	}

	render(){
		 var controllerUintClassName ='controller-unit';
		  if(this.props.arrange.isCenter) {
		      controllerUintClassName += ' is-center';
		    }
		      
		    // 如果对应翻转的图片
		    if(this.props.arrange.isInverse) {
		      controllerUintClassName += ' is-inverse';
		    }
		    
		return (
				<span className={controllerUintClassName} onClick={this.handleClick.bind(this)} >

				</span>
			);
	}
}

export default ControllerNav