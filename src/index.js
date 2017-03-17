/** 
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 * asynchroneous events aggregator (e.g. promise and setTimeout calls)
 * Useful to centralised things to wait for...
 */

export default class AsyncAggregator {
	constructor(parent = null) {
		this.parent = parent;
		this._async = {
			count: 0, // number of things to wait for
			errors: [], // errors produced by waited promises
			successes: [], // promises resolvers (of promises returned by whenStabilised)
			fails: [] // promises rejecters (of promises returned by whenStabilised)
		};
	}

	/**
	 * waiting a promise. 
	 * warning : 
	 *    this.waiting(prom.then(...).then(...)) ===> "then"(s) will be executed BEFORE "stabilised" resolution
	 *    this.waiting(prom).then(...).then(...) ===> "then"(s) will be executed AFTER "stabilised" resolution
	 * @param  {Promise} promise the promise to wait for
	 * @return {Promise}         a promise that will be resolved AFTER "stabilised" resolution
	 */
	waiting(promise) {
		this._async.count++;
		const p = promise.then((s) => {
			remove(this);
			return s;
		}, (e) => {
			this._async.errors.push(e);
			remove(this);
			throw e;
		});
		if (this.parent && this.parent.waiting)
			this.parent.waiting(p);
		return p;
	}

	/**
	 * wait before calling function
	 * @param  {[type]}    func [description]
	 * @param  {[type]}    ms   [description]
	 * @param  {...[type]} args [description]
	 * @return {[type]}         [description]
	 */
	delay(func, ms, ...args) {
		this._async.count++;
		const t = setTimeout(delayEnd, ms, func, ...args);
		if (this.parent && this.parent.delay)
			this.parent.delay(null, ms);
		return t;
	}

	/**
	 * return a promise that will be resolved when all waited promises or delays are done
	 * @return {[type]} [description]
	 */
	whenStabilised() {
		if (this._async.count === 0)
			return Promise.resolve(this);
		return new Promise((resolve, reject) => {
			this._async.successes.push(resolve);
			this._async.fails.push(reject);
		});
	}
}

function remove(mgr) {
	mgr._async.count--;
	if (mgr._async.count <= 0)
		trigger(mgr);
}

function trigger(mgr) {
	const async = mgr._async,
		list = async.errors.length ? async.fails : async.successes,
		args = async.errors.length ? async.errors : mgr;
	for (let j = 0; j < list.length; j++)
		list[j](args.length === 1 ? args[0] : args);
	async.successes = [];
	async.fails = [];
	async.errors = [];
}

function delayEnd(func, self, args) {
	if (func) func.apply(null, args);
	remove(self);
}

