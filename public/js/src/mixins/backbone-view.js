"use strict";

var _bindEvents = function(view, model) {
	model.on("change add remove reset", view._forceUpdate);
};

var _unbindEvents = function(view, model) {
	model.off("change add remove reset", view._forceUpdate);
};

var BackboneViewMixin = {
	componentWillMount: function() {
		this.models = {};

		if (typeof this._getBackboneModels === "function") {
			this.models = this._getBackboneModels();
		}

		for (var key in this.models) {
			if (typeof this.models[key] === "function") {
				var Model = this.models[key];
				this.models[key] = new Model();
			}

			_bindEvents(this, this.models[key]);
			this.models[key].fetch();
		}
	},

	componentWillUnmount: function() {
		for (var key in this.models) {
			_unbindEvents(this, this.models[key]);
		}
	},

	_forceUpdate: function() {
		this.forceUpdate();
	}
};

module.exports = BackboneViewMixin;
