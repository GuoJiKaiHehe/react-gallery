let lib={
	getRangeRandom(high,low){
		return Math.ceil(Math.random()*(high-low)+low );
	},
	getDegRandom(){
		//随机角度；
		let baseDeg=30;
		return (Math.random()>0.5?'-':'')+(Math.random()*baseDeg);
	}
}



export default lib;