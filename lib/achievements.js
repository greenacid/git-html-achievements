
exports.achievements = function(criteria) {
	this.achieved = {};
	this.ach = criteria;
}

exports.achievements.prototype.calculate = function(data, cb) {
    for (var i in this.ach) {
        console.log([i]);
        // no need to redefine;
        if (typeof this.achieved[i] != 'undefined' &&
            this.achieved[i].done === true
        ) {
            continue;
        }
        res = this.ach[i](data);
        // use the callback
        this.achieved[i] = { done: res, date: new Date().toString() };
        if (res && typeof cb == 'function') {
            cb(i);
        }
    }
}
