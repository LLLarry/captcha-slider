
		class CaptchaSlider {
			constructor (options) {
				this.STATUS_IDLE = 'idle'
				this.STATUS_PROCESS = 'proces'
				this.STATUS_SUCCESS = 'success'
				this.STATUS_FAIL = 'fail'
				// 滑块元素
				this.slideBlock = null
				// 滑块父元素
				this.slideWrapper = null
				// 已经滑动的元素
				this.slideMoved = null
				// 验证成功的元素
				this.valideSuc = null 
				// 提示优化的元素
				this.slideTip = null
				// 是否在滑块元素上按下了鼠标左键
				this.isMouseDown = false
				// 唯一key
				this.key = '' 
				// 滑块滑动百分比
				this.rate = 0
				this.state = this.STATUS_IDLE // 状态 idle 空闲、 proces 正在发生、 success 成功、 fail 失败
				if (!options.el) {
					throw TypeError(`CaptchaSlider options el param must be [String、 Element]`)
				} else {
					if (typeof options.el === 'string') {
						options.el = document.querySelector(options.el)
					}
				}
				this.options = options
				this.init()
			}
			init () {
				this.key = this.createKey()
				this.render()
				this.bindEvent()
			}
			render () {
				// 创建元素
				this.createElement()
				// 添加样式
				this.createstyle()
			}

			// 创建元素
			createElement () {
				const html = `
					<!-- 已经移动的距离 -->
					<div class="captcha_slide_moved" captcha-slider="${this.key}"></div>
					<!-- 滑块 -->
					<div class="captcha_slide_block" captcha-slider="${this.key}">
						<i class="captcha-slider-iconfont icon-youfanyeyouhua captcha_slide_block_right"></i>
						<i class="captcha-slider-iconfont icon-guanbicuowu captcha_slide_block_fail"></i>
					</div>
					<div class="captcha_slide_tip" captcha-slider="${this.key}">向右滑动滑块完成验证</div>
					<div class="captcha_slide_valide_success" captcha-slider="${this.key}">
					<i class="captcha-slider-iconfont icon-duihao captcha_slide_success"></i>
					验证成功</div>
				`
				const wrapper = document.createElement('div')
				wrapper.setAttribute('class', `captcha_slide_wrapper`)
				wrapper.setAttribute('style', `width: ${this.options.el.offsetWidth}px`)
				wrapper.setAttribute('captcha-slider', this.key)
				wrapper.innerHTML = html
				this.options.el.appendChild(wrapper)
			}

			// 创建样式
			createstyle () {
					const style = document.createElement('style')
					style.innerHTML = `
					@font-face {
					  font-family: "captcha-slider-iconfont"; /* Project id 3734199 */
					  src: url('//at.alicdn.com/t/c/font_3734199_5kjacpterpd.woff2?t=1666878445141') format('woff2'),
					       url('//at.alicdn.com/t/c/font_3734199_5kjacpterpd.woff?t=1666878445141') format('woff'),
					       url('//at.alicdn.com/t/c/font_3734199_5kjacpterpd.ttf?t=1666878445141') format('truetype');
					}

					.captcha-slider-iconfont {
					  font-family: "captcha-slider-iconfont" !important;
					  font-size: 16px;
					  font-style: normal;
					  -webkit-font-smoothing: antialiased;
					  -moz-osx-font-smoothing: grayscale;
					}

					.icon-shuaxin:before {
					  content: "\\e62a";
					}

					.icon-loading:before {
					  content: "\\e644";
					}

					.icon-duihao:before {
					  content: "\\eaf1";
					}

					.icon-guanbicuowu:before {
					  content: "\\e62f";
					}

					.icon-youfanyeyouhua:before {
					  content: "\\e76e";
					}

					.icon-shuaxin1:before {
					  content: "\\e692";
					}
				   .captcha_slide_wrapper {
						width: 220px;
						height: 38px;
						border: 1px solid #13cbb9;
						border-radius: 6px;
						background-color: #F3F7FA;
						/*display: flex;*/
						position: relative;
						user-select: none;
					}
					.captcha_slide_block {
						width: 38px;
						border-radius: 6px;
						height: 38px;
						background-color: #13cbb9;
						position: absolute;
						left: 0;
						top: 0;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #ffffff;
						cursor: pointer;
					}
					.captcha_slide_block_right {
						font-size: 18px;
					}
					.captcha_slide_block_fail {
						font-size: 18px;
						display: none;
					}
					.captcha_slide_block.fail {
						background-color: #f15858;
					}
					.captcha_slide_block.fail .captcha_slide_block_right {
						display: none;
					}
					.captcha_slide_block.fail .captcha_slide_block_success {
						display: none;
					}
					.captcha_slide_block.fail .captcha_slide_block_fail {
						display: block;
					}

					.captcha_slide_success {
						margin-right: 10px;
					}
					
					.captcha_slide_moved {
						background-color: #1ee1ce;
						width: 0;
						height: 38px;
						position: absolute;
						left: 0;
						top: 0;
					}
					.captcha_slide_moved.fail {
						background-color: #f79f9f;
					}
					.captcha_slide_tip {
						font-size: 14px;
						color: #999;
						width: 100%;
						height: 100%; 
						display: flex;
						align-items: center;
						justify-content: center;

					    /* 这里可以随意加样式 */
					    background: #999 linear-gradient(
					        -135deg,
					        transparent 0%,
					        transparent 25%,
					        #13cbb9 25%, /* 这两个值是滑动条的颜色 */
					        #13cbb9 60%, /* 默认是绿色 自己更改即可 */
					        transparent 60%,
					        transparent
				        );
					    background-size: 60px 60px;
					    background-repeat: no-repeat;
					    -webkit-background-clip: text;
					    -webkit-text-fill-color: transparent;
					    animation: scratchy 3s linear infinite;

					}
					.captcha_slide_valide_success {
						font-size: 14px;
						color: #13cbb9;
						width: 100%;
						height: 100%; 
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #F3F7FA;
						display: none;
					}

					@keyframes scratchy {
					    0% {
					        background-position: -100% 0;
					    }
					    100% {
					        background-position: 130% 0;
					    }
					}
				`	
				this.style = style
				document.head.appendChild(style)
			}

			// 绑定事件
			bindEvent () {
				this.slideBlock = document.querySelector(`.captcha_slide_block[captcha-slider="${this.key}"]`)
				this.slideWrapper = document.querySelector(`.captcha_slide_wrapper[captcha-slider="${this.key}"]`)
				this.slideMoved = document.querySelector(`.captcha_slide_moved[captcha-slider="${this.key}"]`)
				this.valideSuc = document.querySelector(`.captcha_slide_valide_success[captcha-slider="${this.key}"]`)
				this.slideTip = document.querySelector(`.captcha_slide_tip[captcha-slider="${this.key}"]`)
				if (typeof document['ontouchstart'] !== 'undefined') {
					this.mobileBindEvent()
				} else {
					this.pcBindEvent()
				}
				
			}

			pcBindEvent () {
				// mousedown
				this.MOUSEDOWN = (event) => {
					const target = event.target
					this.rate = 0
					// 点击的是滑块元素并且状态是空闲状态
					if ((target.isSameNode(this.slideBlock) || target.parentNode.isSameNode(this.slideBlock)) && this.state === this.STATUS_IDLE) {
						this.state = this.STATUS_PROCESS
						this.isMouseDown = true
						// 将比例向外传递
						this.options.onStart && this.options.onStart(event)
					}
				}
				document.addEventListener('mousedown', this.MOUSEDOWN)

				// mousemove
				this.MOUSEMOVE = (event) => {
					if (this.isMouseDown) {
						const rect = this.slideWrapper.getBoundingClientRect()
						let moveX = event.clientX - rect.left
						// 将移动距离设置到一个合理的范围内
						moveX = Math.min(Math.max(0, moveX), rect.width)
						// 滑动百分比 0 ~ 1
						this.rate = moveX / rect.width
						this.setSlideBlockPostion()

						// 将比例向外传递
						this.options.onChange && this.options.onChange(this.rate, event)
					}
				}
				document.addEventListener('mousemove',  this.MOUSEMOVE)

				// mouchup
				this.MOUSEUP = (event) => {
					if (this.isMouseDown) {
						// 完成时，向外传递完成的信息
						if (this.options.finish) {
							const result = this.options.finish(this.rate, this)
							// 验证结果是否成功
							if (result) {
								this.valideSuccess()
							} else {
								this.validefail()
							}
						}
						this.validefail()
						this.options.onEnd && this.options.onEnd(this.rate, event)
					}
					this.isMouseDown = false
				}
				document.addEventListener('mouseup', this.MOUSEUP)
			}

			mobileBindEvent () {
				// touchstart
				this.TOUCHSTART = (event) => {
					const target = event.target
					this.rate = 0
					// 点击的是滑块元素并且状态是空闲状态
					if ((target.isSameNode(this.slideBlock) || target.parentNode.isSameNode(this.slideBlock)) && this.state === this.STATUS_IDLE) {
						this.state = this.STATUS_PROCESS
						this.isMouseDown = true
						this.options.onStart && this.options.onStart(event)
					}
				}
				document.addEventListener('touchstart', this.TOUCHSTART)

				// touchmove
				this.TOUCHMOVE = (event) => {
					if (this.isMouseDown) {
						const rect = this.slideWrapper.getBoundingClientRect()
						let moveX = event.changedTouches[0].clientX - rect.left
						// 将移动距离设置到一个合理的范围内
						moveX = Math.min(Math.max(0, moveX), rect.width)
						// 滑动百分比 0 ~ 1
						this.rate = moveX / rect.width
						this.setSlideBlockPostion()

						// 将比例向外传递
						this.options.onChange && this.options.onChange(this.rate, this, event)
					}
				}
				document.addEventListener('touchmove',  this.TOUCHMOVE)

				// touchend
				this.TOUCHEND = (event) => {
					if (this.isMouseDown) {
						// 完成时，向外传递完成的信息
						if (this.options.finish) {
							const result = this.options.finish(this.rate, this)
							// 验证结果是否成功
							if (result) {
								this.valideSuccess()
							} else {
								this.validefail()
							}
						}
						this.validefail()
						this.options.onEnd && this.options.onEnd(this.rate, event)
					}
					this.isMouseDown = false
				}
				document.addEventListener('touchend', this.TOUCHEND)
			}

			// 验证成功
			valideSuccess () {
				this.state = this.STATUS_SUCCESS
				this.slideBlock.style.display = 'none' 
				this.slideMoved.style.display = 'none' 
				this.slideTip.style.display = 'none' 
				this.valideSuc.style.display = 'flex'
			}

			// 验证失败
			validefail () {
				this.state = this.STATUS_FAIL
				this.slideBlock.classList.add('fail')	
				this.slideMoved.classList.add('fail')
			}

			// 重新设置
			reset () {
				this.state = this.STATUS_IDLE
				this.slideBlock.classList.remove('fail')	
				this.slideMoved.classList.remove('fail')

				this.slideBlock.style.display = 'flex' 
				this.slideMoved.style.display = 'flex' 
				this.slideTip.style.display = 'flex' 
				this.valideSuc.style.display = 'none'

				this.rate = 0
				this.setSlideBlockPostion()
			}

			// 销毁实例
			destory () {
				// 解绑事件
				this.unbindEvent()
				// 初始化值
				this.reset()
				// 移除元素
				if (this.slideWrapper && this.slideWrapper.parentNode) {
					this.slideWrapper.parentNode.removeChild(this.slideWrapper)
				}
				if (this.style && this.style.parentNode) {
					this.style.parentNode.removeChild(this.style)
				}
			}

			// 解绑事件
			unbindEvent () {
				// 移动端
				if (typeof document['ontouchstart'] !== 'undefined') {
					document.removeEventListener('touchstart', this.TOUCHSTART)
					document.removeEventListener('touchmove',  this.TOUCHMOVE)
					document.removeEventListener('touchend', this.TOUCHEND)
				} else {
					// pc端
					document.removeEventListener('mousedown', this.MOUSEDOWN)
					document.removeEventListener('mousemove',  this.MOUSEMOVE)
					document.removeEventListener('mouseup', this.MOUSEUP)
				}
			}


			// 创建唯一key
			createKey () {
				const getHex = () => Number.parseInt(Math.random() * 256).toString(16).padStart(2, '0')
				return `${getHex()}${getHex()}${getHex()}-${Date.now()}`
			}

			setSlideBlockPostion () {
				// 滑块宽度
				const slideBlockWidth = this.slideBlock.offsetWidth
				// 父容器的宽度
				const slideWrapperWidth = this.slideWrapper.offsetWidth - 2
				// 容器左边的距离 [0, slideWrapperWidth - slideBlockWidth]
				const left = (slideWrapperWidth - slideBlockWidth) * this.rate
				this.slideMoved.style.width = left + slideBlockWidth / 2 + 'px'
				this.slideBlock.style.left = left + 'px'
			}

		}

		export default CaptchaSlider