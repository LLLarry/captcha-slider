class CaptchaCavans {
	constructor (options) {
		// 主canvas元素
		this.canvas = null
		// 主画布context对象
		this.ctx = null
		// canvas画布的 纵横比
		this.rectRate = 3 / 5 
		// 唯一key
		this.key = '' 
		// 图片要在画布上铺满，所需要在横纵方向上缩放的倍数
		this.scale = [1, 1] // 比如 600 * 300 的图片，要在 300 * 180的画布上显示，需要缩放倍数 scale = [300 / 600, 180 / 300]

		// 滑块的圆心和边框连线的夹角度数
		this.deg = 45
		// 滑块正方形的宽度 画布宽度的 1 / 10
		this.slideWidth = 50
		// 滑块正方形的高度 （不包含漏出在外面的圆的部分）
		this.slidHeight = 50
		// 计算出内圆的半径 计算公式 r = slideWidth * (2 / 5) / 2
		this.r = 10 
		// 计算出圆与边框相交的长度的一半 计算公式 jx = Math.cos(deg / 180 * Math.PI) * r
		this.jx = Math.cos(this.deg / 180 * Math.PI) * this.r
		// 从相交的边线与原点之间的最小距离 计算公式 kx = Math.sin(deg / 180 * Math.PI) * r
		this.kx = Math.sin(this.deg / 180 * Math.PI) * this.r
		// 目标滑块绘制的坐标
		this.targetSlidePosition = [0, 0]
		// 滑动滑块时 滑块水平方向的横坐标
		this.slideX = 0
		// 当前正在使用的image图片的索引  
		this.imageIndex = 0
		// img对象
		this.img = null
		// 校验成功的值 目标元素和触发元素横向坐标的差值 小于等于 VAILIDE_VALUE 时，我们判断为成功
		this.VAILIDE_VALUE = 5 
		// 是否显示右上角reload图标
		this.showReload = true
		//  滑块尺寸比率： 滑块实际尺寸 = 容器width * slideSizeRate； 范围 [0.01, 0.3] 默认0.1
		this.slideSizeRate = 0.1

		if (!options.el) {
			throw TypeError(`CaptchaSlider options el param must be [String、 Element]`)
		} else {
			if (typeof options.el === 'string') {
				options.el = document.querySelector(options.el)
			}
		}

		if (!Array.isArray(options.picList) || options.picList.length <= 0) {
			options.picList = [
				'http://121.5.230.70/images/home.jpg',
				'http://121.5.230.70/images/article_default.jpg'
			]
		}
		if (typeof options.vailadeValue === 'number') {
			this.VAILIDE_VALUE = options.vailadeValue 
		}
		if (typeof options.showReload === 'boolean') {
			this.showReload = options.showReload
		}
		if (typeof options.slideSizeRate === 'number') {
			if (options.slideSizeRate < 0.01 || options.slideSizeRate > 0.3) {
				throw TypeError(`CaptchaSlider options slideSizeRate param range is 0.01 ~ 0.3`)
			}
			this.slideSizeRate = options.slideSizeRate
		}
		this.options = options
		this.init()
	}

	init () {
		this.key = this.createKey()
		// 渲染元素
		this.render()
		// 初始化value
		this.initValue()
		// 加载图片并且绘制图像
		this.loadImage()
		// 绑定事件
		this.bindEvent()

	}
	render () {
		// 创建元素	
		this.createElement()
	}
	createElement () {
		this.createStyle()
		const canvasWrapper = document.createElement('div')
		canvasWrapper.setAttribute('class' , 'captcha_canvas_wrapper')
		canvasWrapper.setAttribute('captcha-canvas', this.key)
		canvasWrapper.setAttribute('style' , 'position: relative; border-radius: 6px; overflow: hidden; margin-bottom: 10px; font-size: 0px;')
		const canvas = document.createElement('canvas')
		canvas.setAttribute('captcha-canvas', this.key)
		canvas.setAttribute('style' , 'border-radius: 6px;')

		const { width } = this.options.el.getBoundingClientRect()
		canvas.width = width
		canvas.height = width * this.rectRate

		this.canvas = canvas
		this.ctx = canvas.getContext('2d')
		
		// 创建loading元素
		const loadingElement = this.createLoadingElement()
		if (this.showReload) {
			// 创建reload图标
			const reloadWrapper = this.createReloadElement()
			canvasWrapper.appendChild(reloadWrapper)
		}
		// 添加到容器中
		canvasWrapper.appendChild(canvas)
		canvasWrapper.appendChild(loadingElement)
		this.canvasWrapper = canvasWrapper
		this.options.el.appendChild(canvasWrapper)
	}

	createLoadingElement () {
		const loadingElement = document.createElement('div')
		loadingElement.setAttribute('class' , 'captcha_canvas_loading_box')
		loadingElement.setAttribute('captcha-canvas', this.key)
		loadingElement.setAttribute('style' , 'position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: -1; background-color: #dddddd; display: flex; justify-content:center; align-items: center;')
		
		const loadingI = document.createElement('i')
		loadingI.setAttribute('class' , 'captcha-slider-iconfont icon-loading captcha_canvas_loading')
		loadingI.setAttribute('style' , 'color: #ffffff; font-size: 38px; animation: captcha_loading infinite 2s linear;')
		loadingElement.appendChild(loadingI)
		this.loadingElement = loadingElement
		return loadingElement
	}

	createReloadElement (wrapper) {
		const reloadWrapper = document.createElement('div')
		reloadWrapper.setAttribute('class' , 'captcha_canvas_reload_box')
		reloadWrapper.setAttribute('captcha-canvas', this.key)
		reloadWrapper.setAttribute('style' , 'position: absolute; right: 0; top: 0; padding: 10px; display: flex; justify-content:center; align-items: center; cursor: pointer;')
		
		const reloadI = document.createElement('i')
		reloadI.setAttribute('class' , 'captcha-slider-iconfont icon-shuaxin')
		reloadI.setAttribute('style' , 'color: #ffffff; font-size: 20px;')
		reloadWrapper.appendChild(reloadI)
		this.reloadWrapper = reloadWrapper
		return reloadWrapper	
	}


	// 绑定事件
	bindEvent () {
		if (!this.showReload) return
		const reload = document.querySelector(`.captcha_canvas_reload_box[captcha-canvas="${this.key}"]`)
		this.RELOAD_CLICK = () => {
			this.loadImage()
		}
		reload.addEventListener('click', this.RELOAD_CLICK)
	}

	// 初始化一些数据
	initValue () {
		this.slideX = 0
		this.imageIndex = 0
		// 设置滑块的宽高
		this.slideWidth = this.slidHeight = this.canvas.width * this.slideSizeRate
		// 计算出内圆的半径 计算公式 r = slideWidth * (2 / 5) / 2 
		this.r = this.slideWidth * (2 / 5) / 2

		// 计算出圆与边框相交的长度的一半 计算公式 jx = Math.cos(deg / 180 * Math.PI) * r
		this.jx = Math.cos(this.deg / 180 * Math.PI) * this.r
		// 从相交的边线与原点之间的最小距离 计算公式 kx = Math.sin(deg / 180 * Math.PI) * r
		this.kx = Math.sin(this.deg / 180 * Math.PI) * this.r
	}

	// 加载图片
	loadImage () {
		// 先将canvas给隐藏
		this.canvas.style.opacity = 0
		this.img = new Image()
		this.img.src = this.options.picList[this.imageIndex]
		this.img.onload = () => {
			// 设置滑动滑块的初始位置
			this.slideX = 0
			// 随机生成滑块的位置 
			this.getRandomPosition()
			// 初始化绘制图像
			this.initDraw()
			// 显示canvas
			this.canvas.style.opacity = 1
		}
		// 图片加载失败
		this.img.onerror = () => {
			this.loadingElement.innerHTML = `
				<span style="color: #999; font-size: 14px;">图片加载失败</span>
			`
		}
	}

	//  初始化绘制图像
	initDraw () {
		// 设置滑动滑块的初始位置
		this.slideX = 0
		// 随机生成滑块的位置 
		this.getRandomPosition()
		// 绘制图像
		this.draw()
	}

	// 移动绘制 rate是移动比率 0~1
	moveDraw (rate) {
		const width = this.canvas.width - (this.slideWidth + this.kx + this.r)
		this.slideX = width * rate
		this.draw()
	}

	// 获取滑块的随机位置
	getRandomPosition () {
		// 画布的宽高
		const { width, height } = this.canvas
		// 滑块的宽高
		const sWidth = this.slideWidth + this.kx + this.r
		const sHeight = this.slidHeight
		// 横向范围
		const x = Math.random() * (width - 2 * sWidth - 30) + sWidth + 30  // [this.slideWidth + 30, this.canvas.width - this.slideWidth)
		const y = Math.random() * (height - sHeight) // [0, this.canvas.height - this.slidHeight)
		this.targetSlidePosition = [x, y]
		return [x, y]
	}

	// 画图像、 画目标滑块、 画滑动滑块
	draw () {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.scale = [this.canvas.width / this.img.width, this.canvas.height / this.img.height] 
		this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height)
		// 获取随机位置
		const [x, y] = this.targetSlidePosition
		// 画目标位置的滑块
		this.drawSlider(this.ctx, x, y)
		this.ctx.fillStyle = 'rgba(255,255,255, .2)'
		this.ctx.fill()

		// 创建canvas 滑块, 并将img图像设置到canvas上
		const canvas = this.drawTargetSlider(x, y)
		this.ctx.drawImage(canvas, this.slideX, y)
	}

	/**
	 * 画滑块
	 * ctx： 要画的context
	 * x: 开始横坐标位置
	 * y: 开始纵坐标位置
	 */
	drawSlider (ctx, x, y) {
			const { slideWidth: w, slidHeight: h, jx, kx, r } = this
			ctx.beginPath()
			// 左下角
			ctx.moveTo(x, y + h)
			ctx.lineTo(x + (w / 2 - jx), y + h)
			ctx.arc(x + w / 2, y + h - kx, r, (3 / 4) * Math.PI, (1 / 4) * Math.PI)
			ctx.lineTo(x + w, y + h)
			ctx.lineTo(x + w, y + h - (w / 2 - jx))
			ctx.arc(x + w + jx , y + h / 2, r, (3 / 4) * Math.PI, (5 / 4) * Math.PI, true)
			ctx.lineTo(x + w, y)
			ctx.lineTo(x, y)
			ctx.closePath()
			ctx.strokeStyle = 'rgba(255,255,255, .8)'
			ctx.stroke()		
	}
	/*
	* 创建触发滑块
	* w 滑块宽度
	* h 滑块高度
	* deg 夹角角度
	* sx 裁剪位置x（缩放后的位置，也就是canvas的图片位置）
	* sx 裁剪位置y（缩放后的位置，也就是canvas的图片位置）
	* scale 缩放比例 [横向缩放比例，纵向缩放比例]
	*/
	 drawTargetSlider (sx, sy) {
	 	const { slideWidth: w, slidHeight: h, jx, kx, r, scale } = this
		const canvas = document.createElement('canvas')
		canvas.width = w + kx + r
		canvas.height = h
		const context = canvas.getContext('2d')
		this.drawSlider(context, 0, 0)
		context.clip()

		// 计算出在img上截取的位置以及宽高
		context.drawImage(this.img, sx / scale[0], sy / scale[1], canvas.width / scale[0], canvas.height / scale[1], 0, 0, canvas.width, canvas.height)
		// 画边缘线
		context.strokeStyle = 'rgba(255,255,255, .8)'
		context.stroke()
		return canvas
	}

   // 校验结果是否成功
	valide () {
		const v = Math.abs(this.slideX - this.targetSlidePosition[0])
		// 成功
		if (v <= this.VAILIDE_VALUE) {
			
			this.slideX =  this.targetSlidePosition[0]
			this.draw()
			return true
		} else {
			// this.setNextImageIndex()
			return false
			// 失败
			// setTimeout(() => {
			// 	this.imageIndex = this.imageIndex + 1 >= this.options.picList.length ? 0 : this.imageIndex + 1
			// 	this.initDraw()
			// 	reject(false)
			// }, 2000)
		}
	}

	// 销毁实例
	destory () {
		if (this.showReload) {
			// 解绑事件
			const reload = document.querySelector(`.captcha_canvas_reload_box[captcha-canvas="${this.key}"]`)
			reload.removeEventListener('click', this.RELOAD_CLICK)
		}
		// 初始化一些数据
		this.initValue()
		// 移除元素
		this.canvasWrapper && this.canvasWrapper.parentNode.removeChild(this.canvasWrapper)
		this.style && this.style.parentNode.removeChild(this.style)
	}

	setNextImageIndex () {
		this.imageIndex = this.imageIndex + 1 >= this.options.picList.length ? 0 : this.imageIndex + 1
	}
	// 创建唯一key
	createKey () {
		const getHex = () => Number.parseInt(Math.random() * 256).toString(16).padStart(2, '0')
		return `${getHex()}${getHex()}${getHex()}-${Date.now()}`
	}

	createStyle () {
		const style = document.createElement('style')
		style.setAttribute('captcha-canvas', this.key)
		style.innerHTML = `
			@keyframes captcha_loading {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
		`
		this.style = style
		document.head.appendChild(style)
	}
}

export default CaptchaCavans