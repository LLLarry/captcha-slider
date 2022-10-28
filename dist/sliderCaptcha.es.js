import 'core-js/modules/es7.string.pad-start.js';
import 'core-js/modules/es6.object.to-string.js';
import 'core-js/modules/es6.regexp.to-string.js';
import 'core-js/modules/es6.number.parse-int.js';
import 'core-js/modules/es6.number.constructor.js';
import 'core-js/modules/es6.array.fill.js';

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var CaptchaSlider = /*#__PURE__*/function () {
  function CaptchaSlider(options) {
    _classCallCheck(this, CaptchaSlider);
    _defineProperty(this, "STATUS_IDLE", 'idle');
    _defineProperty(this, "STATUS_PROCESS", 'proces');
    _defineProperty(this, "STATUS_SUCCESS", 'success');
    _defineProperty(this, "STATUS_FAIL", 'fail');
    // 滑块元素
    this.slideBlock = null;
    // 滑块父元素
    this.slideWrapper = null;
    // 已经滑动的元素
    this.slideMoved = null;
    // 验证成功的元素
    this.valideSuc = null;
    // 提示优化的元素
    this.slideTip = null;
    // 是否在滑块元素上按下了鼠标左键
    this.isMouseDown = false;
    // 唯一key
    this.key = '';
    // 滑块滑动百分比
    this.rate = 0;
    this.state = this.STATUS_IDLE; // 状态 idle 空闲、 proces 正在发生、 success 成功、 fail 失败
    if (!options.el) {
      throw TypeError("CaptchaSlider options el param must be [String\u3001 Element]");
    } else {
      if (typeof options.el === 'string') {
        options.el = document.querySelector(options.el);
      }
    }
    this.options = options;
    this.init();
  }
  _createClass(CaptchaSlider, [{
    key: "init",
    value: function init() {
      this.key = this.createKey();
      this.render();
      this.bindEvent();
    }
  }, {
    key: "render",
    value: function render() {
      // 创建元素
      this.createElement();
      // 添加样式
      this.createstyle();
    }

    // 创建元素
  }, {
    key: "createElement",
    value: function createElement() {
      var html = "\n\t\t\t\t\t<!-- \u5DF2\u7ECF\u79FB\u52A8\u7684\u8DDD\u79BB -->\n\t\t\t\t\t<div class=\"captcha_slide_moved\" captcha-slider=\"".concat(this.key, "\"></div>\n\t\t\t\t\t<!-- \u6ED1\u5757 -->\n\t\t\t\t\t<div class=\"captcha_slide_block\" captcha-slider=\"").concat(this.key, "\">\n\t\t\t\t\t\t<i class=\"iconfont icon-youfanyeyouhua captcha_slide_block_right\"></i>\n\t\t\t\t\t\t<i class=\"iconfont icon-guanbicuowu captcha_slide_block_fail\"></i>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"captcha_slide_tip\" captcha-slider=\"").concat(this.key, "\">\u5411\u53F3\u6ED1\u52A8\u6ED1\u5757\u5B8C\u6210\u9A8C\u8BC1</div>\n\t\t\t\t\t<div class=\"captcha_slide_valide_success\" captcha-slider=\"").concat(this.key, "\">\n\t\t\t\t\t<i class=\"iconfont icon-duihao captcha_slide_success\"></i>\n\t\t\t\t\t\u9A8C\u8BC1\u6210\u529F</div>\n\t\t\t\t");
      var wrapper = document.createElement('div');
      wrapper.setAttribute('class', "captcha_slide_wrapper");
      wrapper.setAttribute('style', "width: ".concat(this.options.el.offsetWidth, "px"));
      wrapper.setAttribute('captcha-slider', this.key);
      wrapper.innerHTML = html;
      this.options.el.appendChild(wrapper);
    }

    // 创建样式
  }, {
    key: "createstyle",
    value: function createstyle() {
      var style = document.createElement('style');
      style.innerHTML = "\n\t\t\t\t   .captcha_slide_wrapper {\n\t\t\t\t\t\twidth: 220px;\n\t\t\t\t\t\theight: 38px;\n\t\t\t\t\t\tborder: 1px solid #13cbb9;\n\t\t\t\t\t\tborder-radius: 6px;\n\t\t\t\t\t\tbackground-color: #F3F7FA;\n\t\t\t\t\t\t/*display: flex;*/\n\t\t\t\t\t\tposition: relative;\n\t\t\t\t\t\tuser-select: none;\n\t\t\t\t\t}\n\t\t\t\t\t.captcha_slide_block {\n\t\t\t\t\t\twidth: 38px;\n\t\t\t\t\t\tborder-radius: 6px;\n\t\t\t\t\t\theight: 38px;\n\t\t\t\t\t\tbackground-color: #13cbb9;\n\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\talign-items: center;\n\t\t\t\t\t\tjustify-content: center;\n\t\t\t\t\t\tcolor: #ffffff;\n\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t}\n\t\t\t\t\t.captcha_slide_block_right {\n\t\t\t\t\t\tfont-size: 18px;\n\t\t\t\t\t}\n\t\t\t\t\t.captcha_slide_block_fail {\n\t\t\t\t\t\tfont-size: 18px;\n\t\t\t\t\t\tdisplay: none;\n\t\t\t\t\t}\n\t\t\t\t\t.captcha_slide_block.fail {\n\t\t\t\t\t\tbackground-color: #f15858;\n\t\t\t\t\t}\n\t\t\t\t\t.captcha_slide_block.fail .captcha_slide_block_right {\n\t\t\t\t\t\tdisplay: none;\n\t\t\t\t\t}\n\t\t\t\t\t.captcha_slide_block.fail .captcha_slide_block_success {\n\t\t\t\t\t\tdisplay: none;\n\t\t\t\t\t}\n\t\t\t\t\t.captcha_slide_block.fail .captcha_slide_block_fail {\n\t\t\t\t\t\tdisplay: block;\n\t\t\t\t\t}\n\n\t\t\t\t\t.captcha_slide_success {\n\t\t\t\t\t\tmargin-right: 10px;\n\t\t\t\t\t}\n\t\t\t\t\t\n\t\t\t\t\t.captcha_slide_moved {\n\t\t\t\t\t\tbackground-color: #1ee1ce;\n\t\t\t\t\t\twidth: 0;\n\t\t\t\t\t\theight: 38px;\n\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t}\n\t\t\t\t\t.captcha_slide_moved.fail {\n\t\t\t\t\t\tbackground-color: #f79f9f;\n\t\t\t\t\t}\n\t\t\t\t\t.captcha_slide_tip {\n\t\t\t\t\t\tfont-size: 14px;\n\t\t\t\t\t\tcolor: #999;\n\t\t\t\t\t\twidth: 100%;\n\t\t\t\t\t\theight: 100%; \n\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\talign-items: center;\n\t\t\t\t\t\tjustify-content: center;\n\n\t\t\t\t\t    /* \u8FD9\u91CC\u53EF\u4EE5\u968F\u610F\u52A0\u6837\u5F0F */\n\t\t\t\t\t    background: #999 linear-gradient(\n\t\t\t\t\t        -135deg,\n\t\t\t\t\t        transparent 0%,\n\t\t\t\t\t        transparent 25%,\n\t\t\t\t\t        #13cbb9 25%, /* \u8FD9\u4E24\u4E2A\u503C\u662F\u6ED1\u52A8\u6761\u7684\u989C\u8272 */\n\t\t\t\t\t        #13cbb9 60%, /* \u9ED8\u8BA4\u662F\u7EFF\u8272 \u81EA\u5DF1\u66F4\u6539\u5373\u53EF */\n\t\t\t\t\t        transparent 60%,\n\t\t\t\t\t        transparent\n\t\t\t\t        );\n\t\t\t\t\t    background-size: 60px 60px;\n\t\t\t\t\t    background-repeat: no-repeat;\n\t\t\t\t\t    -webkit-background-clip: text;\n\t\t\t\t\t    -webkit-text-fill-color: transparent;\n\t\t\t\t\t    animation: scratchy 3s linear infinite;\n\n\t\t\t\t\t}\n\t\t\t\t\t.captcha_slide_valide_success {\n\t\t\t\t\t\tfont-size: 14px;\n\t\t\t\t\t\tcolor: #13cbb9;\n\t\t\t\t\t\twidth: 100%;\n\t\t\t\t\t\theight: 100%; \n\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\talign-items: center;\n\t\t\t\t\t\tjustify-content: center;\n\t\t\t\t\t\tbackground-color: #F3F7FA;\n\t\t\t\t\t\tdisplay: none;\n\t\t\t\t\t}\n\n\t\t\t\t\t@keyframes scratchy {\n\t\t\t\t\t    0% {\n\t\t\t\t\t        background-position: -100% 0;\n\t\t\t\t\t    }\n\t\t\t\t\t    100% {\n\t\t\t\t\t        background-position: 130% 0;\n\t\t\t\t\t    }\n\t\t\t\t\t}\n\t\t\t\t";
      document.body.appendChild(style);
    }

    // 绑定事件
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      this.slideBlock = document.querySelector(".captcha_slide_block[captcha-slider=\"".concat(this.key, "\"]"));
      this.slideWrapper = document.querySelector(".captcha_slide_wrapper[captcha-slider=\"".concat(this.key, "\"]"));
      this.slideMoved = document.querySelector(".captcha_slide_moved[captcha-slider=\"".concat(this.key, "\"]"));
      this.valideSuc = document.querySelector(".captcha_slide_valide_success[captcha-slider=\"".concat(this.key, "\"]"));
      this.slideTip = document.querySelector(".captcha_slide_tip[captcha-slider=\"".concat(this.key, "\"]"));
      if (typeof document['ontouchstart'] !== 'undefined') {
        this.mobileBindEvent();
      } else {
        this.pcBindEvent();
      }
    }
  }, {
    key: "pcBindEvent",
    value: function pcBindEvent() {
      var _this = this;
      // mousedown
      this.MOUSEDOWN = function (event) {
        var target = event.target;
        _this.rate = 0;
        // 点击的是滑块元素并且状态是空闲状态
        if ((target.isSameNode(_this.slideBlock) || target.parentNode.isSameNode(_this.slideBlock)) && _this.state === _this.STATUS_IDLE) {
          _this.state = _this.STATUS_PROCESS;
          _this.isMouseDown = true;
          // 将比例向外传递
          _this.options.onStart && _this.options.onStart(event);
        }
      };
      document.addEventListener('mousedown', this.MOUSEDOWN);

      // mousemove
      this.MOUSEMOVE = function (event) {
        if (_this.isMouseDown) {
          var rect = _this.slideWrapper.getBoundingClientRect();
          var moveX = event.clientX - rect.left;
          // 将移动距离设置到一个合理的范围内
          moveX = Math.min(Math.max(0, moveX), rect.width);
          // 滑动百分比 0 ~ 1
          _this.rate = moveX / rect.width;
          _this.setSlideBlockPostion();

          // 将比例向外传递
          _this.options.onChange && _this.options.onChange(_this.rate, event);
        }
      };
      document.addEventListener('mousemove', this.MOUSEMOVE);

      // mouchup
      this.MOUSEUP = function (event) {
        if (_this.isMouseDown) {
          // 完成时，向外传递完成的信息
          if (_this.options.finish) {
            var result = _this.options.finish(_this.rate, _this);
            // 验证结果是否成功
            if (result) {
              _this.valideSuccess();
            } else {
              _this.validefail();
            }
          }
          _this.validefail();
          _this.options.onEnd && _this.options.onEnd(_this.rate, event);
        }
        _this.isMouseDown = false;
      };
      document.addEventListener('mouseup', this.MOUSEUP);
    }
  }, {
    key: "mobileBindEvent",
    value: function mobileBindEvent() {
      var _this2 = this;
      // touchstart
      this.TOUCHSTART = function (event) {
        var target = event.target;
        _this2.rate = 0;
        // 点击的是滑块元素并且状态是空闲状态
        if ((target.isSameNode(_this2.slideBlock) || target.parentNode.isSameNode(_this2.slideBlock)) && _this2.state === _this2.STATUS_IDLE) {
          _this2.state = _this2.STATUS_PROCESS;
          _this2.isMouseDown = true;
          _this2.options.onStart && _this2.options.onStart(event);
        }
      };
      document.addEventListener('touchstart', this.TOUCHSTART);

      // touchmove
      this.TOUCHMOVE = function (event) {
        if (_this2.isMouseDown) {
          var rect = _this2.slideWrapper.getBoundingClientRect();
          var moveX = event.changedTouches[0].clientX - rect.left;
          // 将移动距离设置到一个合理的范围内
          moveX = Math.min(Math.max(0, moveX), rect.width);
          // 滑动百分比 0 ~ 1
          _this2.rate = moveX / rect.width;
          _this2.setSlideBlockPostion();

          // 将比例向外传递
          _this2.options.onChange && _this2.options.onChange(_this2.rate, _this2, event);
        }
      };
      document.addEventListener('touchmove', this.TOUCHMOVE);

      // touchend
      this.TOUCHEND = function (event) {
        if (_this2.isMouseDown) {
          // 完成时，向外传递完成的信息
          if (_this2.options.finish) {
            var result = _this2.options.finish(_this2.rate, _this2);
            // 验证结果是否成功
            if (result) {
              _this2.valideSuccess();
            } else {
              _this2.validefail();
            }
          }
          _this2.validefail();
          _this2.options.onEnd && _this2.options.onEnd(_this2.rate, event);
        }
        _this2.isMouseDown = false;
      };
      document.addEventListener('touchend', this.TOUCHEND);
    }

    // 验证成功
  }, {
    key: "valideSuccess",
    value: function valideSuccess() {
      this.state = this.STATUS_SUCCESS;
      this.slideBlock.style.display = 'none';
      this.slideMoved.style.display = 'none';
      this.slideTip.style.display = 'none';
      this.valideSuc.style.display = 'flex';
    }

    // 验证失败
  }, {
    key: "validefail",
    value: function validefail() {
      this.state = this.STATUS_FAIL;
      this.slideBlock.classList.add('fail');
      this.slideMoved.classList.add('fail');
    }

    // 重新设置
  }, {
    key: "reset",
    value: function reset() {
      this.state = this.STATUS_IDLE;
      this.slideBlock.classList.remove('fail');
      this.slideMoved.classList.remove('fail');
      this.slideBlock.style.display = 'flex';
      this.slideMoved.style.display = 'flex';
      this.slideTip.style.display = 'flex';
      this.valideSuc.style.display = 'none';
      this.rate = 0;
      this.setSlideBlockPostion();
    }

    // 销毁实例
  }, {
    key: "destory",
    value: function destory() {
      // 解绑事件
      this.unbindEvent();
      // 初始化值
      this.reset();
      // 移除元素
      if (this.slideWrapper && this.slideWrapper.parentNode) {
        this.slideWrapper.parentNode.removeChild(this.slideWrapper);
      }
    }

    // 解绑事件
  }, {
    key: "unbindEvent",
    value: function unbindEvent() {
      // 移动端
      if (typeof document['ontouchstart'] !== 'undefined') {
        document.removeEventListener('touchstart', this.TOUCHSTART);
        document.removeEventListener('touchmove', this.TOUCHMOVE);
        document.removeEventListener('touchend', this.TOUCHEND);
      } else {
        // pc端
        document.removeEventListener('mousedown', this.MOUSEDOWN);
        document.removeEventListener('mousemove', this.MOUSEMOVE);
        document.removeEventListener('mouseup', this.MOUSEUP);
      }
    }

    // 创建唯一key
  }, {
    key: "createKey",
    value: function createKey() {
      var getHex = function getHex() {
        return Number.parseInt(Math.random() * 256).toString(16).padStart(2, '0');
      };
      return "".concat(getHex()).concat(getHex()).concat(getHex(), "-").concat(Date.now());
    }
  }, {
    key: "setSlideBlockPostion",
    value: function setSlideBlockPostion() {
      // 滑块宽度
      var slideBlockWidth = this.slideBlock.offsetWidth;
      // 父容器的宽度
      var slideWrapperWidth = this.slideWrapper.offsetWidth - 2;
      // 容器左边的距离 [0, slideWrapperWidth - slideBlockWidth]
      var left = (slideWrapperWidth - slideBlockWidth) * this.rate;
      this.slideMoved.style.width = left + slideBlockWidth / 2 + 'px';
      this.slideBlock.style.left = left + 'px';
    }
  }]);
  return CaptchaSlider;
}();

var CaptchaCavans = /*#__PURE__*/function () {
  function CaptchaCavans(options) {
    _classCallCheck(this, CaptchaCavans);
    // 主canvas元素
    this.canvas = null;
    // 主画布context对象
    this.ctx = null;
    // canvas画布的 纵横比
    this.rectRate = 3 / 5;
    // 唯一key
    this.key = '';
    // 图片要在画布上铺满，所需要在横纵方向上缩放的倍数
    this.scale = [1, 1]; // 比如 600 * 300 的图片，要在 300 * 180的画布上显示，需要缩放倍数 scale = [300 / 600, 180 / 300]

    // 滑块的圆心和边框连线的夹角度数
    this.deg = 45;
    // 滑块正方形的宽度 画布宽度的 1 / 10
    this.slideWidth = 50;
    // 滑块正方形的高度 （不包含漏出在外面的圆的部分）
    this.slidHeight = 50;
    // 计算出内圆的半径 计算公式 r = slideWidth * (2 / 5) / 2
    this.r = 10;
    // 计算出圆与边框相交的长度的一半 计算公式 jx = Math.cos(deg / 180 * Math.PI) * r
    this.jx = Math.cos(this.deg / 180 * Math.PI) * this.r;
    // 从相交的边线与原点之间的最小距离 计算公式 kx = Math.sin(deg / 180 * Math.PI) * r
    this.kx = Math.sin(this.deg / 180 * Math.PI) * this.r;
    // 目标滑块绘制的坐标
    this.targetSlidePosition = [0, 0];
    // 滑动滑块时 滑块水平方向的横坐标
    this.slideX = 0;
    // 当前正在使用的image图片的索引  
    this.imageIndex = 0;
    // img对象
    this.img = null;
    // 校验成功的值 目标元素和触发元素横向坐标的差值 小于等于 VAILIDE_VALUE 时，我们判断为成功
    this.VAILIDE_VALUE = 5;
    // 是否显示右上角reload图标
    this.showReload = true;
    //  滑块尺寸比率： 滑块实际尺寸 = 容器width * slideSizeRate； 范围 [0.01, 0.3] 默认0.1
    this.slideSizeRate = 0.1;
    if (!options.el) {
      throw TypeError("CaptchaSlider options el param must be [String\u3001 Element]");
    } else {
      if (typeof options.el === 'string') {
        options.el = document.querySelector(options.el);
      }
    }
    if (!Array.isArray(options.picList) || options.picList.length <= 0) {
      options.picList = ['http://121.5.230.70/images/home.jpg', 'http://121.5.230.70/images/article_default.jpg'];
    }
    if (typeof options.vailadeValue === 'number') {
      this.VAILIDE_VALUE = options.vailadeValue;
    }
    if (typeof options.showReload === 'boolean') {
      this.showReload = options.showReload;
    }
    if (typeof options.slideSizeRate === 'number') {
      if (options.slideSizeRate < 0.01 || options.slideSizeRate > 0.3) {
        throw TypeError("CaptchaSlider options slideSizeRate param range is 0.01 ~ 0.3");
      }
      this.slideSizeRate = options.slideSizeRate;
    }
    this.options = options;
    this.init();
  }
  _createClass(CaptchaCavans, [{
    key: "init",
    value: function init() {
      this.key = this.createKey();
      // 渲染元素
      this.render();
      // 初始化value
      this.initValue();
      // 加载图片并且绘制图像
      this.loadImage();
      // 绑定事件
      this.bindEvent();
    }
  }, {
    key: "render",
    value: function render() {
      // 创建元素	
      this.createElement();
    }
  }, {
    key: "createElement",
    value: function createElement() {
      var canvasWrapper = document.createElement('div');
      canvasWrapper.setAttribute('class', 'captcha_canvas_wrapper');
      canvasWrapper.setAttribute('captcha-canvas', this.key);
      canvasWrapper.setAttribute('style', 'position: relative; border-radius: 6px; overflow: hidden; margin-bottom: 10px; font-size: 0px;');
      var canvas = document.createElement('canvas');
      canvas.setAttribute('captcha-canvas', this.key);
      canvas.setAttribute('style', 'border-radius: 6px;');
      var _this$options$el$getB = this.options.el.getBoundingClientRect(),
        width = _this$options$el$getB.width;
      canvas.width = width;
      canvas.height = width * this.rectRate;
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');

      // 创建loading元素
      var loadingElement = this.createLoadingElement();
      if (this.showReload) {
        // 创建reload图标
        var reloadWrapper = this.createReloadElement();
        canvasWrapper.appendChild(reloadWrapper);
      }
      // 添加到容器中
      canvasWrapper.appendChild(canvas);
      canvasWrapper.appendChild(loadingElement);
      this.canvasWrapper = canvasWrapper;
      this.options.el.appendChild(canvasWrapper);
    }
  }, {
    key: "createLoadingElement",
    value: function createLoadingElement() {
      var loadingElement = document.createElement('div');
      loadingElement.setAttribute('class', 'captcha_canvas_loading_box');
      loadingElement.setAttribute('captcha-canvas', this.key);
      loadingElement.setAttribute('style', 'position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: -1; background-color: #dddddd; display: flex; justify-content:center; align-items: center;');
      var loadingI = document.createElement('i');
      loadingI.setAttribute('class', 'iconfont icon-loading captcha_canvas_loading');
      loadingI.setAttribute('style', 'color: #ffffff; font-size: 38px;');
      loadingElement.appendChild(loadingI);
      this.loadingElement = loadingElement;
      return loadingElement;
    }
  }, {
    key: "createReloadElement",
    value: function createReloadElement(wrapper) {
      var reloadWrapper = document.createElement('div');
      reloadWrapper.setAttribute('class', 'captcha_canvas_reload_box');
      reloadWrapper.setAttribute('captcha-canvas', this.key);
      reloadWrapper.setAttribute('style', 'position: absolute; right: 0; top: 0; padding: 10px; display: flex; justify-content:center; align-items: center; cursor: pointer;');
      var reloadI = document.createElement('i');
      reloadI.setAttribute('class', 'iconfont icon-shuaxin');
      reloadI.setAttribute('style', 'color: #ffffff; font-size: 20px;');
      reloadWrapper.appendChild(reloadI);
      this.reloadWrapper = reloadWrapper;
      return reloadWrapper;
    }

    // 绑定事件
  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this = this;
      if (!this.showReload) return;
      var reload = document.querySelector(".captcha_canvas_reload_box[captcha-canvas=\"".concat(this.key, "\"]"));
      this.RELOAD_CLICK = function () {
        _this.loadImage();
      };
      reload.addEventListener('click', this.RELOAD_CLICK);
    }

    // 初始化一些数据
  }, {
    key: "initValue",
    value: function initValue() {
      this.slideX = 0;
      this.imageIndex = 0;
      // 设置滑块的宽高
      this.slideWidth = this.slidHeight = this.canvas.width * this.slideSizeRate;
      // 计算出内圆的半径 计算公式 r = slideWidth * (2 / 5) / 2 
      this.r = this.slideWidth * (2 / 5) / 2;

      // 计算出圆与边框相交的长度的一半 计算公式 jx = Math.cos(deg / 180 * Math.PI) * r
      this.jx = Math.cos(this.deg / 180 * Math.PI) * this.r;
      // 从相交的边线与原点之间的最小距离 计算公式 kx = Math.sin(deg / 180 * Math.PI) * r
      this.kx = Math.sin(this.deg / 180 * Math.PI) * this.r;
    }

    // 加载图片
  }, {
    key: "loadImage",
    value: function loadImage() {
      var _this2 = this;
      // 先将canvas给隐藏
      this.canvas.style.opacity = 0;
      this.img = new Image();
      this.img.src = this.options.picList[this.imageIndex];
      this.img.onload = function () {
        // 设置滑动滑块的初始位置
        _this2.slideX = 0;
        // 随机生成滑块的位置 
        _this2.getRandomPosition();
        // 初始化绘制图像
        _this2.initDraw();
        // 显示canvas
        _this2.canvas.style.opacity = 1;
      };
      // 图片加载失败
      this.img.onerror = function () {
        _this2.loadingElement.innerHTML = "\n\t\t\t\t<span style=\"color: #999; font-size: 14px;\">\u56FE\u7247\u52A0\u8F7D\u5931\u8D25</span>\n\t\t\t";
      };
    }

    //  初始化绘制图像
  }, {
    key: "initDraw",
    value: function initDraw() {
      // 设置滑动滑块的初始位置
      this.slideX = 0;
      // 随机生成滑块的位置 
      this.getRandomPosition();
      // 绘制图像
      this.draw();
    }

    // 移动绘制 rate是移动比率 0~1
  }, {
    key: "moveDraw",
    value: function moveDraw(rate) {
      var width = this.canvas.width - (this.slideWidth + this.kx + this.r);
      this.slideX = width * rate;
      this.draw();
    }

    // 获取滑块的随机位置
  }, {
    key: "getRandomPosition",
    value: function getRandomPosition() {
      // 画布的宽高
      var _this$canvas = this.canvas,
        width = _this$canvas.width,
        height = _this$canvas.height;
      // 滑块的宽高
      var sWidth = this.slideWidth + this.kx + this.r;
      var sHeight = this.slidHeight;
      // 横向范围
      var x = Math.random() * (width - 2 * sWidth - 30) + sWidth + 30; // [this.slideWidth + 30, this.canvas.width - this.slideWidth)
      var y = Math.random() * (height - sHeight); // [0, this.canvas.height - this.slidHeight)
      this.targetSlidePosition = [x, y];
      return [x, y];
    }

    // 画图像、 画目标滑块、 画滑动滑块
  }, {
    key: "draw",
    value: function draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.scale = [this.canvas.width / this.img.width, this.canvas.height / this.img.height];
      this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
      // 获取随机位置
      var _this$targetSlidePosi = _slicedToArray(this.targetSlidePosition, 2),
        x = _this$targetSlidePosi[0],
        y = _this$targetSlidePosi[1];
      // 画目标位置的滑块
      this.drawSlider(this.ctx, x, y);
      this.ctx.fillStyle = 'rgba(255,255,255, .2)';
      this.ctx.fill();

      // 创建canvas 滑块, 并将img图像设置到canvas上
      var canvas = this.drawTargetSlider(x, y);
      this.ctx.drawImage(canvas, this.slideX, y);
    }

    /**
     * 画滑块
     * ctx： 要画的context
     * x: 开始横坐标位置
     * y: 开始纵坐标位置
     */
  }, {
    key: "drawSlider",
    value: function drawSlider(ctx, x, y) {
      var w = this.slideWidth,
        h = this.slidHeight,
        jx = this.jx,
        kx = this.kx,
        r = this.r;
      ctx.beginPath();
      // 左下角
      ctx.moveTo(x, y + h);
      ctx.lineTo(x + (w / 2 - jx), y + h);
      ctx.arc(x + w / 2, y + h - kx, r, 3 / 4 * Math.PI, 1 / 4 * Math.PI);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x + w, y + h - (w / 2 - jx));
      ctx.arc(x + w + jx, y + h / 2, r, 3 / 4 * Math.PI, 5 / 4 * Math.PI, true);
      ctx.lineTo(x + w, y);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255, .8)';
      ctx.stroke();
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
  }, {
    key: "drawTargetSlider",
    value: function drawTargetSlider(sx, sy) {
      var w = this.slideWidth,
        h = this.slidHeight;
        this.jx;
        var kx = this.kx,
        r = this.r,
        scale = this.scale;
      var canvas = document.createElement('canvas');
      canvas.width = w + kx + r;
      canvas.height = h;
      var context = canvas.getContext('2d');
      this.drawSlider(context, 0, 0);
      context.clip();

      // 计算出在img上截取的位置以及宽高
      context.drawImage(this.img, sx / scale[0], sy / scale[1], canvas.width / scale[0], canvas.height / scale[1], 0, 0, canvas.width, canvas.height);
      // 画边缘线
      context.strokeStyle = 'rgba(255,255,255, .8)';
      context.stroke();
      return canvas;
    }

    // 校验结果是否成功
  }, {
    key: "valide",
    value: function valide() {
      var v = Math.abs(this.slideX - this.targetSlidePosition[0]);
      console.log(v);
      // 成功
      if (v <= this.VAILIDE_VALUE) {
        this.slideX = this.targetSlidePosition[0];
        this.draw();
        return true;
      } else {
        // this.setNextImageIndex()
        return false;
        // 失败
        // setTimeout(() => {
        // 	this.imageIndex = this.imageIndex + 1 >= this.options.picList.length ? 0 : this.imageIndex + 1
        // 	this.initDraw()
        // 	reject(false)
        // }, 2000)
      }
    }

    // 销毁实例
  }, {
    key: "destory",
    value: function destory() {
      if (this.showReload) {
        // 解绑事件
        var reload = document.querySelector(".captcha_canvas_reload_box[captcha-canvas=\"".concat(this.key, "\"]"));
        reload.removeEventListener('click', this.RELOAD_CLICK);
      }
      // 初始化一些数据
      this.initValue();
      // 移除元素
      this.canvasWrapper && this.canvasWrapper.parentNode.removeChild(this.canvasWrapper);
    }
  }, {
    key: "setNextImageIndex",
    value: function setNextImageIndex() {
      this.imageIndex = this.imageIndex + 1 >= this.options.picList.length ? 0 : this.imageIndex + 1;
    }
    // 创建唯一key
  }, {
    key: "createKey",
    value: function createKey() {
      var getHex = function getHex() {
        return Number.parseInt(Math.random() * 256).toString(16).padStart(2, '0');
      };
      return "".concat(getHex()).concat(getHex()).concat(getHex(), "-").concat(Date.now());
    }
  }]);
  return CaptchaCavans;
}();

var SliderCaptcha = /*#__PURE__*/function () {
  /**
   * el 容器 String、Element (必传)
   * vailadeValue: Number 验证容错偏差值 默认5个像素偏差即认为验证通过
   * picList： String[] 图片地址list
   * onSuccess: Function 验证成功时回调
   * onFail: Function 验证失败时回调
   * onStart: Function 开始点击时回调
   * onChange: Function 开始滑动时回调 （获取鼠标运动轨迹可以在这里获取）
   * onEnd: Function 结束滑动时回调
   * vaildResultShowTime: Number （单位ms） 验证结果展示事件 默认1500ms
   * showReload Boolean 是否显示右上角重新加载按钮 (默认true)
   * slideSizeRate: Number 滑块尺寸比率： 滑块实际尺寸 = 容器width * slideSizeRate； 范围 [0.01, 0.3] 默认0.1
   */
  function SliderCaptcha(options) {
    _classCallCheck(this, SliderCaptcha);
    // 校验options
    this.options = this._valideOptions(options);
    this._init();
  }
  // 初始化数据
  _createClass(SliderCaptcha, [{
    key: "_init",
    value: function _init() {
      this._initInstance();
    }

    // 实例化对象
  }, {
    key: "_initInstance",
    value: function _initInstance() {
      var _this = this;
      // canvas
      this.captchaCavans = new CaptchaCavans({
        el: this.options.el,
        picList: this.options.picList,
        vailadeValue: this.options.vailadeValue,
        showReload: this.options.showReload,
        slideSizeRate: this.options.slideSizeRate
      });
      this.captchaSlider = new CaptchaSlider({
        el: this.options.el,
        onStart: this.options.onStart,
        onEnd: this.options.onEnd,
        onChange: function onChange(rate, event) {
          _this.options.onChange(rate, event);
          _this.captchaCavans && _this.captchaCavans.moveDraw(rate);
        },
        finish: function finish(rate) {
          var result = _this.captchaCavans.valide();
          if (result) {
            _this.captchaSlider.valideSuccess();
            _this.options.onSuccess(rate);
            // setTimeout(() => {
            // 	this.destory()
            // 	setTimeout(() => {
            // 		this.captchaCavans.init()
            // 		this.captchaSlider.init()

            // 	}, this.options.vaildResultShowTime)
            // }, this.options.vaildResultShowTime)
          } else {
            _this.captchaSlider.validefail();
            _this.options.onFail(rate);
            setTimeout(function () {
              // this.captchaCavans.loadImage()
              // this.captchaSlider.reset()
              // 加载下一个图片
              _this.loadNextImage();
            }, _this.options.vaildResultShowTime);
          }
        }
      });
    }

    // 重置控件
  }, {
    key: "reset",
    value: function reset(options) {
      // 判断options是佛存在？ 存在也使用新的options，不存在则使用旧的options
      if (_typeof(options) === 'object' && options !== null) {
        this.options = this._valideOptions(options);
      }
      // 先销毁
      this.destory();
      // 创建Canvas 和 Slider示例
      this._init();
    }

    // 销毁
  }, {
    key: "destory",
    value: function destory() {
      if (this.captchaSlider) {
        this.captchaSlider.destory();
        this.captchaSlider = null;
      }
      if (this.captchaCavans) {
        this.captchaCavans.destory();
        this.captchaCavans = null;
      }
    }

    // 重置并加载下一个图片
  }, {
    key: "loadNextImage",
    value: function loadNextImage() {
      // 设置下一个图片索引
      this.captchaCavans.setNextImageIndex();
      // 绘制图片
      this.captchaCavans.loadImage();
      this.captchaSlider.reset();
    }
  }, {
    key: "_valideOptions",
    value: function _valideOptions(options) {
      if (!options.el) {
        throw TypeError("CaptchaSlider options el param must be [String\u3001 Element]");
      } else {
        if (typeof options.el === 'string') {
          options.el = document.querySelector(options.el);
        }
      }
      options.onStart = options.onStart || function () {};
      options.onChange = options.onChange || function () {};
      options.onEnd = options.onEnd || function () {};
      options.onSuccess = options.onSuccess || function () {};
      options.onFail = options.onFail || function () {};
      options.vaildResultShowTime = typeof options.vaildResultShowTime === 'number' ? options.vaildResultShowTime : 1500;
      return options;
    }
  }]);
  return SliderCaptcha;
}();

export { SliderCaptcha as default };
