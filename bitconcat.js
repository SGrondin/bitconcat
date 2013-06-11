"v0.1.0";
(function(){
	"use strict";
	var _bitconcat = function(init){
		var self = this;
		if (init && init.length > 0){
			self._arr = init.slice(0);
		}else{
			self._arr = [];
		}
		self._headBuffer = 0;
		self._headNB = 0;
		self._tailBuffer = 0;
		self._tailNB = 0;
		return self;
	};
	_bitconcat.prototype.append = function(val, nb){
		var self = this;
		self._tailBuffer = (self._tailBuffer << nb) | val;
		self._tailNB += nb;
		while (self._tailNB >= 8){
			self._arr.push(self._tailBuffer >>> (self._tailNB - 8));
			self._tailBuffer &= (1 << (self._tailNB - 8)) - 1;
			self._tailNB -= 8;
		}
		return self;
	};
	_bitconcat.prototype.prepend = function(val, nb){
		var self = this;
		self._headBuffer |= (val << self._headNB);
		self._headNB += nb;
		while (self._headNB >= 8){
			self._arr.unshift(self._headBuffer & 255);
			self._headBuffer >>>= 8;
			self._headNB -= 8;
		}
	};
	_bitconcat.prototype.flushHeadBuffer = function(){
		var buffer = 0;
		for (var i=0,len=self._arr.length;i<len;i++){
			buffer = self._arr[i] & ((1 << self._headNB) -1);
			self._arr[i] = (self._headBuffer << (8 - self._headNB)) | (self._arr[i] >>> self._headNB);
			self._headBuffer = buffer;
		}
		self._tailBuffer |= self._headBuffer << self._tailNB;
		self._tailNB += self._headNB;
		self._headBuffer = 0;
		self._headNB = 0;
		if (self._tailNB >= 8){
			self._arr.push(self._tailBuffer >>> (self._tailNB - 8));
			self._tailBuffer &= (1 << (self._tailNB - 8)) - 1;
			self._tailNB -= 8;
		}
	};
	_bitconcat.prototype.getData = function(){
		this.flushHeadBuffer();
		return this._arr.slice(0);
	};
	
	if (typeof module === "object" && typeof exports === "object"){//Node.js
		exports.bitstream = _bitconcat;
	}else if (typeof window === "object" && window.window === window && typeof window.navigator === "object"){//Browser
		window.bitstream = _bitconcat;
	}
})();

