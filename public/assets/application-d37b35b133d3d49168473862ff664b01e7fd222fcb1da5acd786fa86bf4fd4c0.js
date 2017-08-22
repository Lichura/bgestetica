/*!
 * jQuery JavaScript Library v1.12.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:07Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
/*!
 * Bootstrap v4.0.0-beta (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
}

(function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
})(jQuery);

(function () {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'

    // shoutout AngusCroll (https://goo.gl/pxwQGp)
  };function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');
      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || '';
      }

      try {
        var $selector = $(selector);
        return $selector.length > 0 ? selector : null;
      } catch (error) {
        return null;
      }
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Alert = function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    // getters

    // public

    Alert.prototype.close = function close(element) {
      element = element || this._element;

      var rootElement = this._getRootElement(element);
      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    Alert.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Alert.prototype._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = $(selector)[0];
      }

      if (!parent) {
        parent = $(element).closest('.' + ClassName.ALERT)[0];
      }

      return parent;
    };

    Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);

      $(element).trigger(closeEvent);
      return closeEvent;
    };

    Alert.prototype._removeElement = function _removeElement(element) {
      var _this2 = this;

      $(element).removeClass(ClassName.SHOW);

      if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);
        return;
      }

      $(element).one(Util.TRANSITION_END, function (event) {
        return _this2._destroyElement(element, event);
      }).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Alert.prototype._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    };

    // static

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Button = function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    // getters

    // public

    Button.prototype.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = $(this._element).find(Selector.INPUT)[0];

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }
            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName.ACTIVE);
      }
    };

    Button.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // static

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key
  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    TOUCHEND: 'touchend' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Carousel = function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this.touchTimeout = null;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    // getters

    // public

    Carousel.prototype.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      if (!document.hidden) {
        this.next();
      }
    };

    Carousel.prototype.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    Carousel.prototype.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    Carousel.prototype.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    Carousel.prototype.to = function to(index) {
      var _this3 = this;

      this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event.SLID, function () {
          return _this3.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    Carousel.prototype.dispose = function dispose() {
      $(this._element).off(EVENT_KEY);
      $.removeData(this._element, DATA_KEY);

      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    };

    // private

    Carousel.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Carousel.prototype._addEventListeners = function _addEventListeners() {
      var _this4 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN, function (event) {
          return _this4._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(Event.MOUSEENTER, function (event) {
          return _this4.pause(event);
        }).on(Event.MOUSELEAVE, function (event) {
          return _this4.cycle(event);
        });
        if ('ontouchstart' in document.documentElement) {
          // if it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          $(this._element).on(Event.TOUCHEND, function () {
            _this4.pause();
            if (_this4.touchTimeout) {
              clearTimeout(_this4.touchTimeout);
            }
            _this4.touchTimeout = setTimeout(function (event) {
              return _this4.cycle(event);
            }, TOUCHEVENT_COMPAT_WAIT + _this4._config.interval);
          });
        }
      }
    };

    Carousel.prototype._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;
        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
        default:
          return;
      }
    };

    Carousel.prototype._getItemIndex = function _getItemIndex(element) {
      this._items = $.makeArray($(element).parent().find(Selector.ITEM));
      return this._items.indexOf(element);
    };

    Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;
      var activeIndex = this._getItemIndex(activeElement);
      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;

      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);
      var fromIndex = this._getItemIndex($(this._element).find(Selector.ACTIVE_ITEM)[0]);
      var slideEvent = $.Event(Event.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });

      $(this._element).trigger(slideEvent);

      return slideEvent;
    };

    Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName.ACTIVE);
        }
      }
    };

    Carousel.prototype._slide = function _slide(direction, element) {
      var _this5 = this;

      var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
      var activeElementIndex = this._getItemIndex(activeElement);
      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);
      var nextElementIndex = this._getItemIndex(nextElement);
      var isCycling = Boolean(this._interval);

      var directionalClassName = void 0;
      var orderClassName = void 0;
      var eventDirectionName = void 0;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName.LEFT;
        orderClassName = ClassName.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName.RIGHT;
        orderClassName = ClassName.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

        $(nextElement).addClass(orderClassName);

        Util.reflow(nextElement);

        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);

        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + ' ' + orderClassName).addClass(ClassName.ACTIVE);

          $(activeElement).removeClass(ClassName.ACTIVE + ' ' + orderClassName + ' ' + directionalClassName);

          _this5._isSliding = false;

          setTimeout(function () {
            return $(_this5._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        $(activeElement).removeClass(ClassName.ACTIVE);
        $(nextElement).addClass(ClassName.ACTIVE);

        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    };

    // static

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Default, $(this).data());

        if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
          $.extend(_config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (data[action] === undefined) {
            throw new Error('No method named "' + action + '"');
          }
          data[action]();
        } else if (_config.interval) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
        return;
      }

      var config = $.extend({}, $(target).data(), $(this).data());
      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Collapse = function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));
      var tabToggles = $(Selector.DATA_TOGGLE);
      for (var i = 0; i < tabToggles.length; i++) {
        var elem = tabToggles[i];
        var selector = Util.getSelectorFromElement(elem);
        if (selector !== null && $(selector).filter(element).length > 0) {
          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    // public

    Collapse.prototype.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show() {
      var _this6 = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives = void 0;
      var activesData = void 0;

      if (this._parent) {
        actives = $.makeArray($(this._parent).children().children(Selector.ACTIVES));
        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this6._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

        _this6._element.style[dimension] = '';

        _this6.setTransitioning(false);

        $(_this6._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = 'scroll' + capitalizedDimension;

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

      this._element.style[dimension] = this._element[scrollSize] + 'px';
    };

    Collapse.prototype.hide = function hide() {
      var _this7 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + 'px';

      Util.reflow(this._element);

      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      if (this._triggerArray.length) {
        for (var i = 0; i < this._triggerArray.length; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);
          if (selector !== null) {
            var $elem = $(selector);
            if (!$elem.hasClass(ClassName.SHOW)) {
              $(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this7.setTransitioning(false);
        $(_this7._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    Collapse.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };

    // private

    Collapse.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    Collapse.prototype._getParent = function _getParent() {
      var _this8 = this;

      var parent = $(this._config.parent)[0];
      var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

      $(parent).find(selector).each(function (i, element) {
        _this8._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });

      return parent;
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.SHOW);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    };

    // static

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);
        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    if (!/input|textarea/i.test(event.target.tagName)) {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    $(selector).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY);
      var config = data ? 'toggle' : $trigger.data();
      Collapse._jQueryInterface.call($target, config);
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);

/* global Popper */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * Check for Popper dependency
   * Popper - https://popper.js.org
   */
  if (typeof Popper === 'undefined') {
    throw new Error('Bootstrap dropdown require Popper.js (https://popper.js.org)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + '|' + ARROW_DOWN_KEYCODE + '|' + ESCAPE_KEYCODE);

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY,
    KEYUP_DATA_API: 'keyup' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left'
  };

  var Selector = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled)'
  };

  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end'
  };

  var Default = {
    placement: AttachmentMap.BOTTOM,
    offset: 0,
    flip: true
  };

  var DefaultType = {
    placement: 'string',
    offset: '(number|string)',
    flip: 'boolean'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Dropdown = function () {
    function Dropdown(element, config) {
      _classCallCheck(this, Dropdown);

      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    }

    // getters

    // public

    Dropdown.prototype.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);
      var isActive = $(this._menu).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      var element = this._element;
      // for dropup with alignment we use the parent as popper container
      if ($(parent).hasClass(ClassName.DROPUP)) {
        if ($(this._menu).hasClass(ClassName.MENULEFT) || $(this._menu).hasClass(ClassName.MENURIGHT)) {
          element = parent;
        }
      }
      this._popper = new Popper(element, this._menu, this._getPopperConfig());

      // if this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {
        $('body').children().on('mouseover', null, $.noop);
      }

      this._element.focus();
      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName.SHOW);
      $(parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.SHOWN, relatedTarget));
    };

    Dropdown.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
      this._menu = null;
      if (this._popper !== null) {
        this._popper.destroy();
      }
      this._popper = null;
    };

    Dropdown.prototype.update = function update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    };

    // private

    Dropdown.prototype._addEventListeners = function _addEventListeners() {
      var _this9 = this;

      $(this._element).on(Event.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();
        _this9.toggle();
      });
    };

    Dropdown.prototype._getConfig = function _getConfig(config) {
      var elementData = $(this._element).data();
      if (elementData.placement !== undefined) {
        elementData.placement = AttachmentMap[elementData.placement.toUpperCase()];
      }

      config = $.extend({}, this.constructor.Default, $(this._element).data(), config);

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Dropdown.prototype._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);
        this._menu = $(parent).find(Selector.MENU)[0];
      }
      return this._menu;
    };

    Dropdown.prototype._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element).parent();
      var placement = this._config.placement;

      // Handle dropup
      if ($parentDropdown.hasClass(ClassName.DROPUP) || this._config.placement === AttachmentMap.TOP) {
        placement = AttachmentMap.TOP;
        if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }
      return placement;
    };

    Dropdown.prototype._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    Dropdown.prototype._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: {
            offset: this._config.offset
          },
          flip: {
            enabled: this._config.flip
          }
        }

        // Disable Popper.js for Dropdown in Navbar
      };if (this._inNavbar) {
        popperConfig.modifiers.applyStyle = {
          enabled: !this._inNavbar
        };
      }
      return popperConfig;
    };

    // static

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));
      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var context = $(toggles[i]).data(DATA_KEY);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;
        if (!$(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue;
        }

        // if this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
          $('body').children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        $(dropdownMenu).removeClass(ClassName.SHOW);
        $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent = void 0;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!REGEXP_KEYDOWN.test(event.which) || /button/i.test(event.target.tagName) && event.which === SPACE_KEYCODE || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {

        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();
    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    NAVBAR_TOGGLER: '.navbar-toggler'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Modal = function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    // getters

    // public

    Modal.prototype.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    Modal.prototype.show = function show(relatedTarget) {
      var _this10 = this;

      if (this._isTransitioning) {
        return;
      }

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });

      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();
      this._setScrollbar();

      $(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();
      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this10.hide(event);
      });

      $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this10._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this10._element)) {
            _this10._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this10._showElement(relatedTarget);
      });
    };

    Modal.prototype.hide = function hide(event) {
      var _this11 = this;

      if (event) {
        event.preventDefault();
      }

      if (this._isTransitioning || !this._isShown) {
        return;
      }

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      var hideEvent = $.Event(Event.HIDE);

      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;

      this._setEscapeEvent();
      this._setResizeEvent();

      $(document).off(Event.FOCUSIN);

      $(this._element).removeClass(ClassName.SHOW);

      $(this._element).off(Event.CLICK_DISMISS);
      $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {

        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this11._hideModal(event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        this._hideModal();
      }
    };

    Modal.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      $(window, document, this._element, this._backdrop).off(EVENT_KEY);

      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._scrollbarWidth = null;
    };

    Modal.prototype.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    };

    // private

    Modal.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Modal.prototype._showElement = function _showElement(relatedTarget) {
      var _this12 = this;

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // don't move modals dom position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.scrollTop = 0;

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this12._config.focus) {
          _this12._element.focus();
        }
        _this12._isTransitioning = false;
        $(_this12._element).trigger(shownEvent);
      };

      if (transition) {
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        transitionComplete();
      }
    };

    Modal.prototype._enforceFocus = function _enforceFocus() {
      var _this13 = this;

      $(document).off(Event.FOCUSIN) // guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this13._element !== event.target && !$(_this13._element).has(event.target).length) {
          _this13._element.focus();
        }
      });
    };

    Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
      var _this14 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            event.preventDefault();
            _this14.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    Modal.prototype._setResizeEvent = function _setResizeEvent() {
      var _this15 = this;

      if (this._isShown) {
        $(window).on(Event.RESIZE, function (event) {
          return _this15.handleUpdate(event);
        });
      } else {
        $(window).off(Event.RESIZE);
      }
    };

    Modal.prototype._hideModal = function _hideModal() {
      var _this16 = this;

      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);
      this._isTransitioning = false;
      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);
        _this16._resetAdjustments();
        _this16._resetScrollbar();
        $(_this16._element).trigger(Event.HIDDEN);
      });
    };

    Modal.prototype._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    Modal.prototype._showBackdrop = function _showBackdrop(callback) {
      var _this17 = this;

      var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        var doAnimate = Util.supportsTransitionEnd() && animate;

        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          $(this._backdrop).addClass(animate);
        }

        $(this._backdrop).appendTo(document.body);

        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this17._ignoreBackdropClick) {
            _this17._ignoreBackdropClick = false;
            return;
          }
          if (event.target !== event.currentTarget) {
            return;
          }
          if (_this17._config.backdrop === 'static') {
            _this17._element.focus();
          } else {
            _this17.hide();
          }
        });

        if (doAnimate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!doAnimate) {
          callback();
          return;
        }

        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this17._removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    };

    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------

    Modal.prototype._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + 'px';
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    Modal.prototype._checkScrollbar = function _checkScrollbar() {
      this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    Modal.prototype._setScrollbar = function _setScrollbar() {
      var _this18 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set

        // Adjust fixed content padding
        $(Selector.FIXED_CONTENT).each(function (index, element) {
          var actualPadding = $(element)[0].style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this18._scrollbarWidth + 'px');
        });

        // Adjust navbar-toggler margin
        $(Selector.NAVBAR_TOGGLER).each(function (index, element) {
          var actualMargin = $(element)[0].style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) + _this18._scrollbarWidth + 'px');
        });

        // Adjust body padding
        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $('body').css('padding-right');
        $('body').data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + 'px');
      }
    };

    Modal.prototype._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      $(Selector.FIXED_CONTENT).each(function (index, element) {
        var padding = $(element).data('padding-right');
        if (typeof padding !== 'undefined') {
          $(element).css('padding-right', padding).removeData('padding-right');
        }
      });

      // Restore navbar-toggler margin
      $(Selector.NAVBAR_TOGGLER).each(function (index, element) {
        var margin = $(element).data('margin-right');
        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      });

      // Restore body padding
      var padding = $('body').data('padding-right');
      if (typeof padding !== 'undefined') {
        $('body').css('padding-right', padding).removeData('padding-right');
      }
    };

    Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    };

    // static

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this19 = this;

    var target = void 0;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this19).is(':visible')) {
          _this19.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var ScrollSpy = function () {
    function ScrollSpy(element, config) {
      var _this20 = this;

      _classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.LIST_ITEMS + ',') + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, function (event) {
        return _this20._process(event);
      });

      this.refresh();
      this._process();
    }

    // getters

    // public

    ScrollSpy.prototype.refresh = function refresh() {
      var _this21 = this;

      var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

      this._offsets = [];
      this._targets = [];

      this._scrollHeight = this._getScrollHeight();

      var targets = $.makeArray($(this._selector));

      targets.map(function (element) {
        var target = void 0;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = $(targetSelector)[0];
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();
          if (targetBCR.width || targetBCR.height) {
            // todo (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }
        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this21._offsets.push(item[0]);
        _this21._targets.push(item[1]);
      });
    };

    ScrollSpy.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._scrollElement).off(EVENT_KEY);

      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    };

    // private

    ScrollSpy.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');
        if (!id) {
          id = Util.getUID(NAME);
          $(config.target).attr('id', id);
        }
        config.target = '#' + id;
      }

      Util.typeCheckConfig(NAME, config, DefaultType);

      return config;
    };

    ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    ScrollSpy.prototype._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;
      var scrollHeight = this._getScrollHeight();
      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }
        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    ScrollSpy.prototype._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',');
      queries = queries.map(function (selector) {
        return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
      });

      var $link = $(queries.join(','));

      if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        $link.addClass(ClassName.ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(ClassName.ACTIVE);
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ', ' + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE);
      }

      $(this._scrollElement).trigger(Event.ACTIVATE, {
        relatedTarget: target
      });
    };

    ScrollSpy.prototype._clear = function _clear() {
      $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
    };

    // static

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Tab = function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    // getters

    // public

    Tab.prototype.show = function show() {
      var _this22 = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var target = void 0;
      var previous = void 0;
      var listElement = $(this._element).closest(Selector.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        previous = $.makeArray($(listElement).find(Selector.ACTIVE));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event.HIDE, {
        relatedTarget: this._element
      });

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $(selector)[0];
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event.HIDDEN, {
          relatedTarget: _this22._element
        });

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: previous
        });

        $(previous).trigger(hiddenEvent);
        $(_this22._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    Tab.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Tab.prototype._activate = function _activate(element, container, callback) {
      var _this23 = this;

      var active = $(container).find(Selector.ACTIVE)[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && active && $(active).hasClass(ClassName.FADE);

      var complete = function complete() {
        return _this23._transitionComplete(element, active, isTransitioning, callback);
      };

      if (active && isTransitioning) {
        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      if (active) {
        $(active).removeClass(ClassName.SHOW);
      }
    };

    Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
      if (active) {
        $(active).removeClass(ClassName.ACTIVE);

        var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        active.setAttribute('aria-expanded', false);
      }

      $(element).addClass(ClassName.ACTIVE);
      element.setAttribute('aria-expanded', true);

      if (isTransitioning) {
        Util.reflow(element);
        $(element).addClass(ClassName.SHOW);
      } else {
        $(element).removeClass(ClassName.FADE);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
        if (dropdownElement) {
          $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    };

    // static

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}(jQuery);

/* global Popper */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($) {

  /**
   * Check for Popper dependency
   * Popper - https://popper.js.org
   */
  if (typeof Popper === 'undefined') {
    throw new Error('Bootstrap tooltips require Popper.js (https://popper.js.org)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp('(^|\\s)' + CLASS_PREFIX + '\\S+', 'g');

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)'
  };

  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip'
  };

  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Tooltip = function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    // getters

    // public

    Tooltip.prototype.enable = function enable() {
      this._isEnabled = true;
    };

    Tooltip.prototype.disable = function disable() {
      this._isEnabled = false;
    };

    Tooltip.prototype.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    Tooltip.prototype.toggle = function toggle(event) {
      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {

        if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
          this._leave(null, this);
          return;
        }

        this._enter(null, this);
      }
    };

    Tooltip.prototype.dispose = function dispose() {
      clearTimeout(this._timeout);

      $.removeData(this.element, this.constructor.DATA_KEY);

      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;
      if (this._popper !== null) {
        this._popper.destroy();
      }
      this._popper = null;

      this.element = null;
      this.config = null;
      this.tip = null;
    };

    Tooltip.prototype.show = function show() {
      var _this24 = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);

        var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);

        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);
        this.addAttachmentClass(attachment);

        var container = this.config.container === false ? document.body : $(this.config.container);

        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);

        this._popper = new Popper(this.element, tip, {
          placement: attachment,
          modifiers: {
            offset: {
              offset: this.config.offset
            },
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: Selector.ARROW
            }
          },
          onCreate: function onCreate(data) {
            if (data.originalPlacement !== data.placement) {
              _this24._handlePopperPlacementChange(data);
            }
          },
          onUpdate: function onUpdate(data) {
            _this24._handlePopperPlacementChange(data);
          }
        });

        $(tip).addClass(ClassName.SHOW);

        // if this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement) {
          $('body').children().on('mouseover', null, $.noop);
        }

        var complete = function complete() {
          if (_this24.config.animation) {
            _this24._fixTransition();
          }
          var prevHoverState = _this24._hoverState;
          _this24._hoverState = null;

          $(_this24.element).trigger(_this24.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this24._leave(null, _this24);
          }
        };

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
        } else {
          complete();
        }
      }
    };

    Tooltip.prototype.hide = function hide(callback) {
      var _this25 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);
      var complete = function complete() {
        if (_this25._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this25._cleanTipClass();
        _this25.element.removeAttribute('aria-describedby');
        $(_this25.element).trigger(_this25.constructor.Event.HIDDEN);
        if (_this25._popper !== null) {
          _this25._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName.SHOW);

      // if this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        $('body').children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {

        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    Tooltip.prototype.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    };

    // protected

    Tooltip.prototype.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    Tooltip.prototype.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + '-' + attachment);
    };

    Tooltip.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Tooltip.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());
      this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());
      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);
    };

    Tooltip.prototype.setElementContent = function setElementContent($element, content) {
      var html = this.config.html;
      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
        // content is a DOM node or a jQuery
        if (html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }
      } else {
        $element[html ? 'html' : 'text'](content);
      }
    };

    Tooltip.prototype.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    };

    // private

    Tooltip.prototype._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    Tooltip.prototype._setListeners = function _setListeners() {
      var _this26 = this;

      var triggers = this.config.trigger.split(' ');

      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this26.element).on(_this26.constructor.Event.CLICK, _this26.config.selector, function (event) {
            return _this26.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this26.constructor.Event.MOUSEENTER : _this26.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this26.constructor.Event.MOUSELEAVE : _this26.constructor.Event.FOCUSOUT;

          $(_this26.element).on(eventIn, _this26.config.selector, function (event) {
            return _this26._enter(event);
          }).on(eventOut, _this26.config.selector, function (event) {
            return _this26._leave(event);
          });
        }

        $(_this26.element).closest('.modal').on('hide.bs.modal', function () {
          return _this26.hide();
        });
      });

      if (this.config.selector) {
        this.config = $.extend({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    Tooltip.prototype._fixTitle = function _fixTitle() {
      var titleType = _typeof(this.element.getAttribute('data-original-title'));
      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    Tooltip.prototype._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    Tooltip.prototype._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    Tooltip.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

      if (config.delay && typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (config.title && typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (config.content && typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    Tooltip.prototype._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    Tooltip.prototype._handlePopperPlacementChange = function _handlePopperPlacementChange(data) {
      this._cleanTipClass();
      this.addAttachmentClass(this._getAttachment(data.placement));
    };

    Tooltip.prototype._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;
      if (tip.getAttribute('x-placement') !== null) {
        return;
      }
      $(tip).removeClass(ClassName.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    };

    // static

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var CLASS_PREFIX = 'bs-popover';
  var BSCLS_PREFIX_REGEX = new RegExp('(^|\\s)' + CLASS_PREFIX + '\\S+', 'g');

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Popover = function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
    }

    // overrides

    Popover.prototype.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    Popover.prototype.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + '-' + attachment);
    };

    Popover.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Popover.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      // we use append for html objects to maintain js events
      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
      this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);
    };

    // private

    Popover.prototype._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
    };

    Popover.prototype._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    // static

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: 'VERSION',


      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  }(Tooltip);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}(jQuery);


})();
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
/*
Product Name: dhtmlxCombo 
Version: 5.1.0 
Edition: Standard 
License: content of this file is covered by DHTMLX Commercial or enterpri. Usage outside GPL terms is prohibited. To obtain Commercial or Enterprise license contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/


if(typeof(window.dhx)=="undefined"){window.dhx=window.dhx4={version:"5.1.0",skin:null,skinDetect:function(a){var b=Math.floor(dhx4.readFromCss(a+"_skin_detect")/10)*10;return{10:"dhx_skyblue",20:"dhx_web",30:"dhx_terrace",40:"material"}[b]||null},readFromCss:function(c,d,e){var b=document.createElement("DIV");b.className=c;if(document.body.firstChild!=null){document.body.insertBefore(b,document.body.firstChild)}else{document.body.appendChild(b)}if(typeof(e)=="string"){b.innerHTML=e}var a=b[d||"offsetWidth"];b.parentNode.removeChild(b);b=null;return a},lastId:1,newId:function(){return this.lastId++},zim:{data:{},step:5,first:function(){return 100},last:function(){var c=this.first();for(var b in this.data){c=Math.max(c,this.data[b])}return c},reserve:function(a){this.data[a]=this.last()+this.step;return this.data[a]},clear:function(a){if(this.data[a]!=null){this.data[a]=null;delete this.data[a]}}},s2b:function(a){if(typeof(a)=="string"){a=a.toLowerCase()}return(a==true||a==1||a=="true"||a=="1"||a=="yes"||a=="y"||a=="on")},s2j:function(s){var obj=null;dhx4.temp=null;try{eval("dhx4.temp="+s)}catch(e){dhx4.temp=null}obj=dhx4.temp;dhx4.temp=null;return obj},absLeft:function(a){if(typeof(a)=="string"){a=document.getElementById(a)}return this.getOffset(a).left},absTop:function(a){if(typeof(a)=="string"){a=document.getElementById(a)}return this.getOffset(a).top},_aOfs:function(a){var c=0,b=0;while(a){c=c+parseInt(a.offsetTop);b=b+parseInt(a.offsetLeft);a=a.offsetParent}return{top:c,left:b}},_aOfsRect:function(d){var g=d.getBoundingClientRect();var h=document.body;var b=document.documentElement;var a=window.pageYOffset||b.scrollTop||h.scrollTop;var e=window.pageXOffset||b.scrollLeft||h.scrollLeft;var f=b.clientTop||h.clientTop||0;var i=b.clientLeft||h.clientLeft||0;var j=g.top+a-f;var c=g.left+e-i;return{top:Math.round(j),left:Math.round(c)}},getOffset:function(a){if(a.getBoundingClientRect){return this._aOfsRect(a)}else{return this._aOfs(a)}},_isObj:function(a){return(a!=null&&typeof(a)=="object"&&typeof(a.length)=="undefined")},_copyObj:function(d){if(this._isObj(d)){var c={};for(var b in d){if(typeof(d[b])=="object"&&d[b]!=null){c[b]=this._copyObj(d[b])}else{c[b]=d[b]}}}else{var c=[];for(var b=0;b<d.length;b++){if(typeof(d[b])=="object"&&d[b]!=null){c[b]=this._copyObj(d[b])}else{c[b]=d[b]}}}return c},screenDim:function(){var a=(navigator.userAgent.indexOf("MSIE")>=0);var b={};b.left=document.body.scrollLeft;b.right=b.left+(window.innerWidth||document.body.clientWidth);b.top=Math.max((a?document.documentElement:document.getElementsByTagName("html")[0]).scrollTop,document.body.scrollTop);b.bottom=b.top+(a?Math.max(document.documentElement.clientHeight||0,document.documentElement.offsetHeight||0):window.innerHeight);return b},selectTextRange:function(d,g,b){d=(typeof(d)=="string"?document.getElementById(d):d);var a=d.value.length;g=Math.max(Math.min(g,a),0);b=Math.min(b,a);if(d.setSelectionRange){try{d.setSelectionRange(g,b)}catch(f){}}else{if(d.createTextRange){var c=d.createTextRange();c.moveStart("character",g);c.moveEnd("character",b-a);try{c.select()}catch(f){}}}},transData:null,transDetect:function(){if(this.transData==null){this.transData={transProp:false,transEv:null};var c={MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd",OTransition:"oTransitionEnd",msTransition:"transitionend",transition:"transitionend"};for(var b in c){if(this.transData.transProp==false&&document.documentElement.style[b]!=null){this.transData.transProp=b;this.transData.transEv=c[b]}}c=null}return this.transData},_xmlNodeValue:function(a){var c="";for(var b=0;b<a.childNodes.length;b++){c+=(a.childNodes[b].nodeValue!=null?a.childNodes[b].nodeValue.toString().replace(/^[\n\r\s]{0,}/,"").replace(/[\n\r\s]{0,}$/,""):"")}return c}};window.dhx4.isIE=(navigator.userAgent.indexOf("MSIE")>=0||navigator.userAgent.indexOf("Trident")>=0);window.dhx4.isIE6=(window.XMLHttpRequest==null&&navigator.userAgent.indexOf("MSIE")>=0);window.dhx4.isIE7=(navigator.userAgent.indexOf("MSIE 7.0")>=0&&navigator.userAgent.indexOf("Trident")<0);window.dhx4.isIE8=(navigator.userAgent.indexOf("MSIE 8.0")>=0&&navigator.userAgent.indexOf("Trident")>=0);window.dhx4.isIE9=(navigator.userAgent.indexOf("MSIE 9.0")>=0&&navigator.userAgent.indexOf("Trident")>=0);window.dhx4.isIE10=(navigator.userAgent.indexOf("MSIE 10.0")>=0&&navigator.userAgent.indexOf("Trident")>=0&&window.navigator.pointerEnabled!=true);window.dhx4.isIE11=(navigator.userAgent.indexOf("Trident")>=0&&window.navigator.pointerEnabled==true);window.dhx4.isEdge=(navigator.userAgent.indexOf("Edge")>=0);window.dhx4.isOpera=(navigator.userAgent.indexOf("Opera")>=0);window.dhx4.isChrome=(navigator.userAgent.indexOf("Chrome")>=0)&&!window.dhx4.isEdge;window.dhx4.isKHTML=(navigator.userAgent.indexOf("Safari")>=0||navigator.userAgent.indexOf("Konqueror")>=0)&&!window.dhx4.isEdge;window.dhx4.isFF=(navigator.userAgent.indexOf("Firefox")>=0);window.dhx4.isIPad=(navigator.userAgent.search(/iPad/gi)>=0);window.dhx4.dnd={evs:{},p_en:((window.dhx4.isIE||window.dhx4.isEdge)&&(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)),_mTouch:function(a){return(window.dhx4.isIE10&&a.pointerType==a.MSPOINTER_TYPE_MOUSE||window.dhx4.isIE11&&a.pointerType=="mouse"||window.dhx4.isEdge&&a.pointerType=="mouse")},_touchOn:function(a){if(a==null){a=document.body}a.style.touchAction=a.style.msTouchAction="";a=null},_touchOff:function(a){if(a==null){a=document.body}a.style.touchAction=a.style.msTouchAction="none";a=null}};if(window.navigator.pointerEnabled==true){window.dhx4.dnd.evs={start:"pointerdown",move:"pointermove",end:"pointerup"}}else{if(window.navigator.msPointerEnabled==true){window.dhx4.dnd.evs={start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}}else{if(typeof(window.addEventListener)!="undefined"){window.dhx4.dnd.evs={start:"touchstart",move:"touchmove",end:"touchend"}}}}}if(typeof(window.dhx4.template)=="undefined"){window.dhx4.trim=function(a){return String(a).replace(/^\s{1,}/,"").replace(/\s{1,}$/,"")};window.dhx4.template=function(b,c,a){return b.replace(/#([a-z0-9_-]{1,})(\|([^#]*))?#/gi,function(){var g=arguments[1];var f=window.dhx4.trim(arguments[3]);var h=null;var e=[c[g]];if(f.length>0){f=f.split(":");var d=[];for(var i=0;i<f.length;i++){if(i>0&&d[d.length-1].match(/\\$/)!=null){d[d.length-1]=d[d.length-1].replace(/\\$/,"")+":"+f[i]}else{d.push(f[i])}}h=d[0];for(var i=1;i<d.length;i++){e.push(d[i])}}if(typeof(h)=="string"&&typeof(window.dhx4.template[h])=="function"){return window.dhx4.template[h].apply(window.dhx4.template,e)}if(g.length>0&&typeof(c[g])!="undefined"){if(a==true){return window.dhx4.trim(c[g])}return String(c[g])}return""})};window.dhx4.template.date=function(a,b){if(a!=null){if(a instanceof Date){return window.dhx4.date2str(a,b)}else{a=a.toString();if(a.match(/^\d*$/)!=null){return window.dhx4.date2str(new Date(parseInt(a)),b)}return a}}return""};window.dhx4.template.maxlength=function(b,a){return String(b).substr(0,a)};window.dhx4.template.number_format=function(d,e,c,a){var b=window.dhx4.template._parseFmt(e,c,a);if(b==false){return d}return window.dhx4.template._getFmtValue(d,b)};window.dhx4.template.lowercase=function(a){if(typeof(a)=="undefined"||a==null){a=""}return String(a).toLowerCase()};window.dhx4.template.uppercase=function(a){if(typeof(a)=="undefined"||a==null){a=""}return String(a).toUpperCase()};window.dhx4.template._parseFmt=function(h,c,a){var d=h.match(/^([^\.\,0-9]*)([0\.\,]*)([^\.\,0-9]*)/);if(d==null||d.length!=4){return false}var b={i_len:false,i_sep:(typeof(c)=="string"?c:","),d_len:false,d_sep:(typeof(a)=="string"?a:"."),s_bef:(typeof(d[1])=="string"?d[1]:""),s_aft:(typeof(d[3])=="string"?d[3]:"")};var g=d[2].split(".");if(g[1]!=null){b.d_len=g[1].length}var e=g[0].split(",");if(e.length>1){b.i_len=e[e.length-1].length}return b};window.dhx4.template._getFmtValue=function(value,fmt){var r=String(value).match(/^(-)?([0-9]{1,})(\.([0-9]{1,}))?$/);if(r!=null&&r.length==5){var v0="";if(r[1]!=null){v0+=r[1]}v0+=fmt.s_bef;if(fmt.i_len!==false){var i=0;var v1="";for(var q=r[2].length-1;q>=0;q--){v1=""+r[2].charAt(q)+v1;if(++i==fmt.i_len&&q>0){v1=fmt.i_sep+v1;i=0}}v0+=v1}else{v0+=r[2]}if(fmt.d_len!==false){if(r[4]==null){r[4]=""}while(r[4].length<fmt.d_len){r[4]+="0"}eval("dhx4.temp = new RegExp(/\\d{"+fmt.d_len+"}/);");var t1=(r[4]).match(dhx4.temp);if(t1!=null){v0+=fmt.d_sep+t1}dhx4.temp=t1=null}v0+=fmt.s_aft;return v0}return value}}if(typeof(window.dhx4.dateLang)=="undefined"){window.dhx4.dateLang="en";window.dhx4.dateStrings={en:{monthFullName:["January","February","March","April","May","June","July","August","September","October","November","December"],monthShortName:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayFullName:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayShortName:["Su","Mo","Tu","We","Th","Fr","Sa"]}};window.dhx4.dateFormat={en:"%Y-%m-%d"};window.dhx4.date2str=function(f,d,a){if(d==null||typeof(d)=="undefined"){d=window.dhx4.dateFormat[window.dhx4.dateLang]}if(a==null||typeof(a)=="undefined"){a=window.dhx4.dateStrings[window.dhx4.dateLang]}if(f instanceof Date){var e=function(g){return(String(g).length==1?"0"+String(g):g)};var b=function(i){switch(i){case"%d":return e(f.getDate());case"%j":return f.getDate();case"%D":return a.dayShortName[f.getDay()];case"%l":return a.dayFullName[f.getDay()];case"%m":return e(f.getMonth()+1);case"%n":return f.getMonth()+1;case"%M":return a.monthShortName[f.getMonth()];case"%F":return a.monthFullName[f.getMonth()];case"%y":return e(f.getYear()%100);case"%Y":return f.getFullYear();case"%g":return(f.getHours()+11)%12+1;case"%h":return e((f.getHours()+11)%12+1);case"%G":return f.getHours();case"%H":return e(f.getHours());case"%i":return e(f.getMinutes());case"%s":return e(f.getSeconds());case"%a":return(f.getHours()>11?"pm":"am");case"%A":return(f.getHours()>11?"PM":"AM");case"%%":return"%";case"%u":return f.getMilliseconds();case"%P":if(window.dhx4.temp_calendar!=null&&window.dhx4.temp_calendar.tz!=null){return window.dhx4.temp_calendar.tz}var l=f.getTimezoneOffset();var j=Math.abs(Math.floor(l/60));var g=Math.abs(l)-j*60;return(l>0?"-":"+")+e(j)+":"+e(g);default:return i}};var c=String(d||window.dhx4.dateFormat).replace(/%[a-zA-Z]/g,b)}return(c||String(f))};window.dhx4.str2date=function(g,s,x){if(s==null||typeof(s)=="undefined"){s=window.dhx4.dateFormat[window.dhx4.dateLang]}if(x==null||typeof(x)=="undefined"){x=window.dhx4.dateStrings[window.dhx4.dateLang]}s=s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\\:|]/g,"\\$&");var u=[];var j=[];s=s.replace(/%[a-z]/gi,function(e){switch(e){case"%d":case"%m":case"%y":case"%h":case"%H":case"%i":case"%s":j.push(e);return"(\\d{2})";case"%D":case"%l":case"%M":case"%F":j.push(e);return"([a-zéûä\u0430-\u044F\u0451]{1,})";case"%j":case"%n":case"%g":case"%G":j.push(e);return"(\\d{1,2})";case"%Y":j.push(e);return"(\\d{4})";case"%a":j.push(e);return"([a|p]m)";case"%A":j.push(e);return"([A|P]M)";case"%u":j.push(e);return"(\\d{1,6})";case"%P":j.push(e);return"([+-]\\d{1,2}:\\d{1,2})"}return e});var y=new RegExp(s,"i");var l=g.match(y);if(l==null||l.length-1!=j.length){return"Invalid Date"}for(var b=1;b<l.length;b++){u.push(l[b])}var c={"%y":1,"%Y":1,"%n":2,"%m":2,"%M":2,"%F":2,"%d":3,"%j":3,"%a":4,"%A":4,"%H":5,"%G":5,"%h":5,"%g":5,"%i":6,"%s":7,"%u":7,"%P":7};var m={};var i={};for(var b=0;b<j.length;b++){if(typeof(c[j[b]])!="undefined"){var d=c[j[b]];if(!m[d]){m[d]=[];i[d]=[]}m[d].push(u[b]);i[d].push(j[b])}}u=[];j=[];for(var b=1;b<=7;b++){if(m[b]!=null){for(var o=0;o<m[b].length;o++){u.push(m[b][o]);j.push(i[b][o])}}}var a=new Date();a.setDate(1);a.setHours(0);a.setMinutes(0);a.setSeconds(0);a.setMilliseconds(0);var n=function(p,e){for(var f=0;f<e.length;f++){if(e[f].toLowerCase()==p){return f}}return -1};for(var b=0;b<u.length;b++){switch(j[b]){case"%d":case"%j":case"%n":case"%m":case"%Y":case"%H":case"%G":case"%i":case"%s":case"%u":if(!isNaN(u[b])){a[{"%d":"setDate","%j":"setDate","%n":"setMonth","%m":"setMonth","%Y":"setFullYear","%H":"setHours","%G":"setHours","%i":"setMinutes","%s":"setSeconds","%u":"setMilliseconds"}[j[b]]](Number(u[b])+(j[b]=="%m"||j[b]=="%n"?-1:0))}break;case"%M":case"%F":var h=n(u[b].toLowerCase(),x[{"%M":"monthShortName","%F":"monthFullName"}[j[b]]]);if(h>=0){a.setMonth(h)}break;case"%y":if(!isNaN(u[b])){var t=Number(u[b]);a.setFullYear(t+(t>50?1900:2000))}break;case"%g":case"%h":if(!isNaN(u[b])){var t=Number(u[b]);if(t<=12&&t>=0){a.setHours(t+(n("pm",u)>=0?(t==12?0:12):(t==12?-12:0)))}}break;case"%P":if(window.dhx4.temp_calendar!=null){window.dhx4.temp_calendar.tz=u[b]}break}}return a}}if(typeof(window.dhx4.ajax)=="undefined"){window.dhx4.ajax={cache:false,method:"get",parse:function(a){if(typeof a!=="string"){return a}a=a.replace(/^[\s]+/,"");if(window.DOMParser&&!dhx4.isIE){var b=(new window.DOMParser()).parseFromString(a,"text/xml")}else{if(window.ActiveXObject!==window.undefined){var b=new window.ActiveXObject("Microsoft.XMLDOM");b.async="false";b.loadXML(a)}}return b},xmltop:function(a,d,c){if(typeof d.status=="undefined"||d.status<400){xml=(!d.responseXML)?dhx4.ajax.parse(d.responseText||d):(d.responseXML||d);if(xml&&xml.documentElement!==null){try{if(!xml.getElementsByTagName("parsererror").length){return xml.getElementsByTagName(a)[0]}}catch(b){}}}if(c!==-1){dhx4.callEvent("onLoadXMLError",["Incorrect XML",arguments[1],c])}return document.createElement("DIV")},xpath:function(c,a){if(!a.nodeName){a=a.responseXML||a}if(dhx4.isIE){try{return a.selectNodes(c)||[]}catch(f){return[]}}else{var d=[];var g;var b=(a.ownerDocument||a).evaluate(c,a,null,XPathResult.ANY_TYPE,null);while(g=b.iterateNext()){d.push(g)}return d}},query:function(a){return dhx4.ajax._call((a.method||"GET"),a.url,a.data||"",(a.async||true),a.callback,null,a.headers)},get:function(a,b){return this._call("GET",a,null,true,b)},getSync:function(a){return this._call("GET",a,null,false)},put:function(b,a,c){return this._call("PUT",b,a,true,c)},del:function(b,a,c){return this._call("DELETE",b,a,true,c)},post:function(b,a,c){if(arguments.length==1){a=""}else{if(arguments.length==2&&(typeof(a)=="function"||typeof(window[a])=="function")){c=a;a=""}else{a=String(a)}}return this._call("POST",b,a,true,c)},postSync:function(b,a){a=(a==null?"":String(a));return this._call("POST",b,a,false)},getLong:function(a,b){this._call("GET",a,null,true,b,{url:a})},postLong:function(b,a,c){if(arguments.length==2&&(typeof(a)=="function"||typeof(window[a]))){c=a;a=""}this._call("POST",b,a,true,c,{url:b,postData:a})},_call:function(b,c,d,h,j,o,f){if(typeof d==="object"){var g=[];for(var l in d){g.push(l+"="+encodeURIComponent(d[l]))}d=g.join("&")}var e=dhx.promise.defer();var n=(window.XMLHttpRequest&&!dhx4.isIE?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP"));var i=(navigator.userAgent.match(/AppleWebKit/)!=null&&navigator.userAgent.match(/Qt/)!=null&&navigator.userAgent.match(/Safari/)!=null);if(h==true){n.onreadystatechange=function(){if((n.readyState==4)||(i==true&&n.readyState==3)){if(n.status!=200||n.responseText==""){e.reject(n);if(!dhx4.callEvent("onAjaxError",[{xmlDoc:n,filePath:c,async:h}])){return}}window.setTimeout(function(){if(typeof(j)=="function"){try{j.apply(window,[{xmlDoc:n,filePath:c,async:h}])}catch(a){e.reject(a)}e.resolve(n.responseText)}if(o!=null){if(typeof(o.postData)!="undefined"){dhx4.ajax.postLong(o.url,o.postData,j)}else{dhx4.ajax.getLong(o.url,j)}}j=null;n=null},1)}}}if(b=="GET"){c+=this._dhxr(c)}n.open(b,c,h);if(f!=null){for(var m in f){n.setRequestHeader(m,f[m])}}else{if(b=="POST"||b=="PUT"||b=="DELETE"){n.setRequestHeader("Content-Type","application/x-www-form-urlencoded")}else{if(b=="GET"){d=null}}}n.setRequestHeader("X-Requested-With","XMLHttpRequest");n.send(d);if(h!=true){if((n.readyState==4)||(i==true&&n.readyState==3)){if(n.status!=200||n.responseText==""){dhx4.callEvent("onAjaxError",[{xmlDoc:n,filePath:c,async:h}])}}}e.xmlDoc=n;e.filePath=c;e.async=h;return e},_dhxr:function(a,b){if(this.cache!=true){if(a.match(/^[\?\&]$/)==null){a=(a.indexOf("?")>=0?"&":"?")}if(typeof(b)=="undefined"){b=true}return a+"dhxr"+new Date().getTime()+(b==true?"=1":"")}return""}}}if(typeof(window.dhx4._enableDataLoading)=="undefined"){window.dhx4._enableDataLoading=function(g,c,f,e,h){if(h=="clear"){for(var b in g._dhxdataload){g._dhxdataload[b]=null;delete g._dhxdataload[b]}g._loadData=null;g._dhxdataload=null;g.load=null;g.loadStruct=null;g=null;return}g._dhxdataload={initObj:c,xmlToJson:f,xmlRootTag:e,onBeforeXLS:null};g._loadData=function(n,o,p){if(arguments.length==2){p=o;o=null}var m=null;if(arguments.length==3){p=arguments[2]}this.callEvent("onXLS",[]);if(typeof(n)=="string"){var l=n.replace(/^\s{1,}/,"").replace(/\s{1,}$/,"");var s=new RegExp("^<"+this._dhxdataload.xmlRootTag);if(s.test(l.replace(/^<\?xml[^\?]*\?>\s*/,""))){m=dhx4.ajax.parse(n);if(m!=null){m=this[this._dhxdataload.xmlToJson].apply(this,[m])}}if(m==null&&(l.match(/^[\s\S]*{[.\s\S]*}[\s\S]*$/)!=null||l.match(/^[\s\S]*\[[.\s\S]*\][\s\S]*$/)!=null)){m=dhx4.s2j(l)}if(m==null){var j=[];if(typeof(this._dhxdataload.onBeforeXLS)=="function"){var l=this._dhxdataload.onBeforeXLS.apply(this,[n]);if(l!=null&&typeof(l)=="object"){if(l.url!=null){n=l.url}if(l.params!=null){for(var q in l.params){j.push(q+"="+encodeURIComponent(l.params[q]))}}}}var r=this;var i=function(a){var t=null;if((a.xmlDoc.getResponseHeader("Content-Type")||"").search(/xml/gi)>=0||(a.xmlDoc.responseText.replace(/^\s{1,}/,"")).match(/^</)!=null){t=r[r._dhxdataload.xmlToJson].apply(r,[a.xmlDoc.responseXML])}else{t=dhx4.s2j(a.xmlDoc.responseText)}if(t!=null){r[r._dhxdataload.initObj].apply(r,[t,n])}r.callEvent("onXLE",[]);if(p!=null){if(typeof(p)=="function"){p.apply(r,[])}else{if(typeof(window[p])=="function"){window[p].apply(r,[])}}}i=p=null;t=a=r=null};j=j.join("&")+(typeof(o)=="string"?"&"+o:"");if(dhx4.ajax.method=="post"){return dhx4.ajax.post(n,j,i)}else{if(dhx4.ajax.method=="get"){return dhx4.ajax.get(n+(j.length>0?(n.indexOf("?")>0?"&":"?")+j:""),i)}}return}}else{if(typeof(n.documentElement)=="object"||(typeof(n.tagName)!="undefined"&&typeof(n.getElementsByTagName)!="undefined"&&n.getElementsByTagName(this._dhxdataload.xmlRootTag).length>0)){m=this[this._dhxdataload.xmlToJson].apply(this,[n])}else{m=window.dhx4._copyObj(n)}}if(m!=null){this[this._dhxdataload.initObj].apply(this,[m])}this.callEvent("onXLE",[]);if(p!=null){if(typeof(p)=="function"){p.apply(this,[])}else{if(typeof(window[p])=="function"){window[p].apply(this,[])}}p=null}};if(h!=null){var d={struct:"loadStruct",data:"load"};for(var b in h){if(h[b]==true){g[d[b]]=function(){return this._loadData.apply(this,arguments)}}}}g=null}}if(typeof(window.dhx4._eventable)=="undefined"){window.dhx4._eventable=function(a,b){if(b=="clear"){a.detachAllEvents();a.dhxevs=null;a.attachEvent=null;a.detachEvent=null;a.checkEvent=null;a.callEvent=null;a.detachAllEvents=null;a=null;return}a.dhxevs={data:{}};a.attachEvent=function(c,e){c=String(c).toLowerCase();if(!this.dhxevs.data[c]){this.dhxevs.data[c]={}}var d=window.dhx4.newId();this.dhxevs.data[c][d]=e;return d};a.detachEvent=function(f){for(var d in this.dhxevs.data){var e=0;for(var c in this.dhxevs.data[d]){if(c==f){this.dhxevs.data[d][c]=null;delete this.dhxevs.data[d][c]}else{e++}}if(e==0){this.dhxevs.data[d]=null;delete this.dhxevs.data[d]}}};a.checkEvent=function(c){c=String(c).toLowerCase();return(this.dhxevs.data[c]!=null)};a.callEvent=function(d,f){d=String(d).toLowerCase();if(this.dhxevs.data[d]==null){return true}var e=true;for(var c in this.dhxevs.data[d]){e=this.dhxevs.data[d][c].apply(this,f)&&e}return e};a.detachAllEvents=function(){for(var d in this.dhxevs.data){for(var c in this.dhxevs.data[d]){this.dhxevs.data[d][c]=null;delete this.dhxevs.data[d][c]}this.dhxevs.data[d]=null;delete this.dhxevs.data[d]}};a=null};dhx4._eventable(dhx4)}if(!window.dhtmlxValidation){dhtmlxValidation=function(){};dhtmlxValidation.prototype={isEmpty:function(a){return a==""},isNotEmpty:function(a){return(a instanceof Array?a.length>0:!a=="")},isValidBoolean:function(a){return !!a.toString().match(/^(0|1|true|false)$/)},isValidEmail:function(a){return !!a.toString().match(/(^[a-z0-9]([0-9a-z\-_\.]*)@([0-9a-z_\-\.]*)([.][a-z]{3})$)|(^[a-z]([0-9a-z_\.\-]*)@([0-9a-z_\-\.]*)(\.[a-z]{2,5})$)/i)},isValidInteger:function(a){return !!a.toString().match(/(^-?\d+$)/)},isValidNumeric:function(a){return !!a.toString().match(/(^-?\d\d*[\.|,]\d*$)|(^-?\d\d*$)|(^-?[\.|,]\d\d*$)/)},isValidAplhaNumeric:function(a){return !!a.toString().match(/^[_\-a-z0-9]+$/gi)},isValidDatetime:function(b){var a=b.toString().match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/);return a&&!!(a[1]<=9999&&a[2]<=12&&a[3]<=31&&a[4]<=59&&a[5]<=59&&a[6]<=59)||false},isValidDate:function(a){var b=a.toString().match(/^(\d{4})-(\d{2})-(\d{2})$/);return b&&!!(b[1]<=9999&&b[2]<=12&&b[3]<=31)||false},isValidTime:function(b){var a=b.toString().match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);return a&&!!(a[1]<=24&&a[2]<=59&&a[3]<=59)||false},isValidIPv4:function(a){var b=a.toString().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);return b&&!!(b[1]<=255&&b[2]<=255&&b[3]<=255&&b[4]<=255)||false},isValidCurrency:function(a){return a.toString().match(/^\$?\s?\d+?([\.,\,]?\d+)?\s?\$?$/)&&true||false},isValidSSN:function(a){return a.toString().match(/^\d{3}\-?\d{2}\-?\d{4}$/)&&true||false},isValidSIN:function(a){return a.toString().match(/^\d{9}$/)&&true||false}};dhtmlxValidation=new dhtmlxValidation()}if(typeof(window.dhtmlx)=="undefined"){window.dhtmlx={extend:function(d,c){for(var e in c){if(!d[e]){d[e]=c[e]}}return d},extend_api:function(a,d,c){var b=window[a];if(!b){return}window[a]=function(g){if(g&&typeof g=="object"&&!g.tagName){var f=b.apply(this,(d._init?d._init(g):arguments));for(var e in dhtmlx){if(d[e]){this[d[e]](dhtmlx[e])}}for(var e in g){if(d[e]){this[d[e]](g[e])}else{if(e.indexOf("on")===0){this.attachEvent(e,g[e])}}}}else{var f=b.apply(this,arguments)}if(d._patch){d._patch(this)}return f||this};window[a].prototype=b.prototype;if(c){dhtmlx.extend(window[a].prototype,c)}},url:function(a){if(a.indexOf("?")!=-1){return"&"}else{return"?"}}}}function dhtmlDragAndDropObject(){if(window.dhtmlDragAndDrop){return window.dhtmlDragAndDrop}this.lastLanding=0;this.dragNode=0;this.dragStartNode=0;this.dragStartObject=0;this.tempDOMU=null;this.tempDOMM=null;this.waitDrag=0;window.dhtmlDragAndDrop=this;return this}dhtmlDragAndDropObject.prototype.removeDraggableItem=function(a){a.onmousedown=null;a.dragStarter=null;a.dragLanding=null};dhtmlDragAndDropObject.prototype.addDraggableItem=function(a,b){a.onmousedown=this.preCreateDragCopy;a.dragStarter=b;this.addDragLanding(a,b)};dhtmlDragAndDropObject.prototype.addDragLanding=function(a,b){a.dragLanding=b};dhtmlDragAndDropObject.prototype.preCreateDragCopy=function(a){if((a||window.event)&&(a||event).button==2){return}if(window.dhtmlDragAndDrop.waitDrag){window.dhtmlDragAndDrop.waitDrag=0;document.body.onmouseup=window.dhtmlDragAndDrop.tempDOMU;document.body.onmousemove=window.dhtmlDragAndDrop.tempDOMM;return false}if(window.dhtmlDragAndDrop.dragNode){window.dhtmlDragAndDrop.stopDrag(a)}window.dhtmlDragAndDrop.waitDrag=1;window.dhtmlDragAndDrop.tempDOMU=document.body.onmouseup;window.dhtmlDragAndDrop.tempDOMM=document.body.onmousemove;window.dhtmlDragAndDrop.dragStartNode=this;window.dhtmlDragAndDrop.dragStartObject=this.dragStarter;document.body.onmouseup=window.dhtmlDragAndDrop.preCreateDragCopy;document.body.onmousemove=window.dhtmlDragAndDrop.callDrag;window.dhtmlDragAndDrop.downtime=new Date().valueOf();if((a)&&(a.preventDefault)){a.preventDefault();return false}return false};dhtmlDragAndDropObject.prototype.callDrag=function(c){if(!c){c=window.event}dragger=window.dhtmlDragAndDrop;if((new Date()).valueOf()-dragger.downtime<100){return}if(!dragger.dragNode){if(dragger.waitDrag){dragger.dragNode=dragger.dragStartObject._createDragNode(dragger.dragStartNode,c);if(!dragger.dragNode){return dragger.stopDrag()}dragger.dragNode.onselectstart=function(){return false};dragger.gldragNode=dragger.dragNode;document.body.appendChild(dragger.dragNode);document.body.onmouseup=dragger.stopDrag;dragger.waitDrag=0;dragger.dragNode.pWindow=window;dragger.initFrameRoute()}else{return dragger.stopDrag(c,true)}}if(dragger.dragNode.parentNode!=window.document.body&&dragger.gldragNode){var a=dragger.gldragNode;if(dragger.gldragNode.old){a=dragger.gldragNode.old}a.parentNode.removeChild(a);var b=dragger.dragNode.pWindow;if(a.pWindow&&a.pWindow.dhtmlDragAndDrop.lastLanding){a.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(a.pWindow.dhtmlDragAndDrop.lastLanding)}if(_isIE){var f=document.createElement("Div");f.innerHTML=dragger.dragNode.outerHTML;dragger.dragNode=f.childNodes[0]}else{dragger.dragNode=dragger.dragNode.cloneNode(true)}dragger.dragNode.pWindow=window;dragger.gldragNode.old=dragger.dragNode;document.body.appendChild(dragger.dragNode);b.dhtmlDragAndDrop.dragNode=dragger.dragNode}dragger.dragNode.style.left=c.clientX+15+(dragger.fx?dragger.fx*(-1):0)+(document.body.scrollLeft||document.documentElement.scrollLeft)+"px";dragger.dragNode.style.top=c.clientY+3+(dragger.fy?dragger.fy*(-1):0)+(document.body.scrollTop||document.documentElement.scrollTop)+"px";if(!c.srcElement){var d=c.target}else{d=c.srcElement}dragger.checkLanding(d,c)};dhtmlDragAndDropObject.prototype.calculateFramePosition=function(e){if(window.name){var c=parent.frames[window.name].frameElement.offsetParent;var d=0;var b=0;while(c){d+=c.offsetLeft;b+=c.offsetTop;c=c.offsetParent}if((parent.dhtmlDragAndDrop)){var a=parent.dhtmlDragAndDrop.calculateFramePosition(1);d+=a.split("_")[0]*1;b+=a.split("_")[1]*1}if(e){return d+"_"+b}else{this.fx=d}this.fy=b}return"0_0"};dhtmlDragAndDropObject.prototype.checkLanding=function(b,a){if((b)&&(b.dragLanding)){if(this.lastLanding){this.lastLanding.dragLanding._dragOut(this.lastLanding)}this.lastLanding=b;this.lastLanding=this.lastLanding.dragLanding._dragIn(this.lastLanding,this.dragStartNode,a.clientX,a.clientY,a);this.lastLanding_scr=(_isIE?a.srcElement:a.target)}else{if((b)&&(b.tagName!="BODY")){this.checkLanding(b.parentNode,a)}else{if(this.lastLanding){this.lastLanding.dragLanding._dragOut(this.lastLanding,a.clientX,a.clientY,a)}this.lastLanding=0;if(this._onNotFound){this._onNotFound()}}}};dhtmlDragAndDropObject.prototype.stopDrag=function(b,c){dragger=window.dhtmlDragAndDrop;if(!c){dragger.stopFrameRoute();var a=dragger.lastLanding;dragger.lastLanding=null;if(a){a.dragLanding._drag(dragger.dragStartNode,dragger.dragStartObject,a,(_isIE?event.srcElement:b.target))}}dragger.lastLanding=null;if((dragger.dragNode)&&(dragger.dragNode.parentNode==document.body)){dragger.dragNode.parentNode.removeChild(dragger.dragNode)}dragger.dragNode=0;dragger.gldragNode=0;dragger.fx=0;dragger.fy=0;dragger.dragStartNode=0;dragger.dragStartObject=0;document.body.onmouseup=dragger.tempDOMU;document.body.onmousemove=dragger.tempDOMM;dragger.tempDOMU=null;dragger.tempDOMM=null;dragger.waitDrag=0};dhtmlDragAndDropObject.prototype.stopFrameRoute=function(c){if(c){window.dhtmlDragAndDrop.stopDrag(1,1)}for(var a=0;a<window.frames.length;a++){try{if((window.frames[a]!=c)&&(window.frames[a].dhtmlDragAndDrop)){window.frames[a].dhtmlDragAndDrop.stopFrameRoute(window)}}catch(b){}}try{if((parent.dhtmlDragAndDrop)&&(parent!=window)&&(parent!=c)){parent.dhtmlDragAndDrop.stopFrameRoute(window)}}catch(b){}};dhtmlDragAndDropObject.prototype.initFrameRoute=function(c,d){if(c){window.dhtmlDragAndDrop.preCreateDragCopy();window.dhtmlDragAndDrop.dragStartNode=c.dhtmlDragAndDrop.dragStartNode;window.dhtmlDragAndDrop.dragStartObject=c.dhtmlDragAndDrop.dragStartObject;window.dhtmlDragAndDrop.dragNode=c.dhtmlDragAndDrop.dragNode;window.dhtmlDragAndDrop.gldragNode=c.dhtmlDragAndDrop.dragNode;window.document.body.onmouseup=window.dhtmlDragAndDrop.stopDrag;window.waitDrag=0;if(((!_isIE)&&(d))&&((!_isFF)||(_FFrv<1.8))){window.dhtmlDragAndDrop.calculateFramePosition()}}try{if((parent.dhtmlDragAndDrop)&&(parent!=window)&&(parent!=c)){parent.dhtmlDragAndDrop.initFrameRoute(window)}}catch(b){}for(var a=0;a<window.frames.length;a++){try{if((window.frames[a]!=c)&&(window.frames[a].dhtmlDragAndDrop)){window.frames[a].dhtmlDragAndDrop.initFrameRoute(window,((!c||d)?1:0))}}catch(b){}}};_isFF=false;_isIE=false;_isOpera=false;_isKHTML=false;_isMacOS=false;_isChrome=false;_FFrv=false;_KHTMLrv=false;_OperaRv=false;if(navigator.userAgent.indexOf("Macintosh")!=-1){_isMacOS=true}if(navigator.userAgent.toLowerCase().indexOf("chrome")>-1){_isChrome=true}if((navigator.userAgent.indexOf("Safari")!=-1)||(navigator.userAgent.indexOf("Konqueror")!=-1)){_KHTMLrv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari")+7,5));if(_KHTMLrv>525){_isFF=true;_FFrv=1.9}else{_isKHTML=true}}else{if(navigator.userAgent.indexOf("Opera")!=-1){_isOpera=true;_OperaRv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera")+6,3))}else{if(navigator.appName.indexOf("Microsoft")!=-1){_isIE=true;if((navigator.appVersion.indexOf("MSIE 8.0")!=-1||navigator.appVersion.indexOf("MSIE 9.0")!=-1||navigator.appVersion.indexOf("MSIE 10.0")!=-1||document.documentMode>7)&&document.compatMode!="BackCompat"){_isIE=8}}else{if(navigator.appName=="Netscape"&&navigator.userAgent.indexOf("Trident")!=-1){_isIE=8}else{_isFF=true;_FFrv=parseFloat(navigator.userAgent.split("rv:")[1])}}}}if(typeof(window.dhtmlxEvent)=="undefined"){function dhtmlxEvent(b,c,a){if(b.addEventListener){b.addEventListener(c,a,false)}else{if(b.attachEvent){b.attachEvent("on"+c,a)}}}}if(dhtmlxEvent.touchDelay==null){dhtmlxEvent.touchDelay=2000}if(typeof(dhtmlxEvent.initTouch)=="undefined"){dhtmlxEvent.initTouch=function(){var d;var e;var b,a;dhtmlxEvent(document.body,"touchstart",function(f){e=f.touches[0].target;b=f.touches[0].clientX;a=f.touches[0].clientY;d=window.setTimeout(c,dhtmlxEvent.touchDelay)});function c(){if(e){var f=document.createEvent("HTMLEvents");f.initEvent("dblclick",true,true);e.dispatchEvent(f);d=e=null}}dhtmlxEvent(document.body,"touchmove",function(f){if(d){if(Math.abs(f.touches[0].clientX-b)>50||Math.abs(f.touches[0].clientY-a)>50){window.clearTimeout(d);d=e=false}}});dhtmlxEvent(document.body,"touchend",function(f){if(d){window.clearTimeout(d);d=e=false}});dhtmlxEvent.initTouch=function(){}}}(function(b){var c=typeof setImmediate!=="undefined"?setImmediate:function(e){setTimeout(e,0)};function d(f,g){var e=this;e.promise=e;e.state="pending";e.val=null;e.fn=f||null;e.er=g||null;e.next=[]}d.prototype.resolve=function(f){var e=this;if(e.state==="pending"){e.val=f;e.state="resolving";c(function(){e.fire()})}};d.prototype.reject=function(f){var e=this;if(e.state==="pending"){e.val=f;e.state="rejecting";c(function(){e.fire()})}};d.prototype.then=function(f,h){var e=this;var g=new d(f,h);e.next.push(g);if(e.state==="resolved"){g.resolve(e.val)}if(e.state==="rejected"){g.reject(e.val)}return g};d.prototype.fail=function(e){return this.then(null,e)};d.prototype.finish=function(g){var e=this;e.state=g;if(e.state==="resolved"){for(var f=0;f<e.next.length;f++){e.next[f].resolve(e.val)}}if(e.state==="rejected"){for(var f=0;f<e.next.length;f++){e.next[f].reject(e.val)}if(!e.next.length){throw (e.val)}}};d.prototype.thennable=function(j,f,h,n,m){var g=this;m=m||g.val;if(typeof m==="object"&&typeof j==="function"){try{var i=0;j.call(m,function(e){if(i++!==0){return}f(e)},function(e){if(i++!==0){return}h(e)})}catch(l){h(l)}}else{n(m)}};d.prototype.fire=function(){var f=this;var g;try{g=f.val&&f.val.then}catch(h){f.val=h;f.state="rejecting";return f.fire()}f.thennable(g,function(e){f.val=e;f.state="resolving";f.fire()},function(e){f.val=e;f.state="rejecting";f.fire()},function(i){f.val=i;if(f.state==="resolving"&&typeof f.fn==="function"){try{f.val=f.fn.call(undefined,f.val)}catch(j){f.val=j;return f.finish("rejected")}}if(f.state==="rejecting"&&typeof f.er==="function"){try{f.val=f.er.call(undefined,f.val);f.state="resolving"}catch(j){f.val=j;return f.finish("rejected")}}if(f.val===f){f.val=TypeError();return f.finish("rejected")}f.thennable(g,function(e){f.val=e;f.finish("resolved")},function(e){f.val=e;f.finish("rejected")},function(e){f.val=e;f.state==="resolving"?f.finish("resolved"):f.finish("rejected")})})};d.prototype.done=function(){if(this.state="rejected"&&!this.next){throw this.val}return null};d.prototype.nodeify=function(e){if(typeof e==="function"){return this.then(function(g){try{e(null,g)}catch(f){setImmediate(function(){throw f})}return g},function(g){try{e(g)}catch(f){setImmediate(function(){throw f})}return g})}return this};d.prototype.spread=function(e,f){return this.all().then(function(g){return typeof e==="function"&&e.apply(null,g)},f)};d.prototype.all=function(){var e=this;return this.then(function(r){var f=new d();if(!(r instanceof Array)){f.reject(TypeError);return f}var h=0;var q=r.length;function m(){if(++h===q){f.resolve(r)}}for(var n=0,j=r.length;n<j;n++){var s=r[n];var g;try{g=s&&s.then}catch(o){f.reject(o);break}(function(l){e.thennable(g,function(i){r[l]=i;m()},function(i){f.reject(i)},function(){m()},s)})(n)}return f})};var a={all:function(e){var f=new d(null,null);f.resolve(e);return f.all()},defer:function(){return new d(null,null)},fcall:function(){var h=new d();var f=Array.apply([],arguments);var g=f.shift();try{var j=g.apply(null,f);h.resolve(j)}catch(i){h.reject(i)}return h},nfcall:function(){var h=new d();var f=Array.apply([],arguments);var g=f.shift();try{f.push(function(e,j){if(e){return h.reject(e)}return h.resolve(j)});g.apply(null,f)}catch(i){h.reject(i)}return h}};b.promise=a})(dhx);function dhtmlXCombo(f,j,c,h,e){var g=this;var d=null;var l=null;if(typeof(f)=="object"&&!f.tagName){d=f;f=d.parent;c=d.width;j=d.name;h=d.mode;l=d.skin}this.cont=(typeof(f)=="string"?document.getElementById(f):f);this.conf={skin:null,form_name:j||"dhxcombo",combo_width:(parseInt(c)||this.cont.offsetWidth||120)-(dhx4.isFF||dhx4.isIE||dhx4.isChrome||dhx4.isOpera?2:0),combo_image:false,combo_focus:false,opts_type:(typeof(h)=="string"&&typeof(this.modes[h])!="undefined"?h:"option"),opts_count:8,opts_count_min:3,opts_width:null,item_h:null,list_zi_id:window.dhx4.newId(),allow_free_text:true,allow_empty_value:true,free_text_empty:false,enabled:true,btn_left:((window.dhx4.isIE6||window.dhx4.isIE7||window.dhx4.isIE8)&&typeof(window.addEventListener)=="undefined"?1:0),ro_mode:false,ro_text:"",ro_tm:null,ro_tm_time:750,img_path:"",img_def:"",img_def_dis:true,template:{header:true,input:"#text#",option:"#text#"},f_func:null,f_mode:false,f_url:false,f_cache:false,f_cache_data:{},f_dyn:false,f_dyn_end:false,f_mask:"",f_ac:true,f_ac_text:"",f_server_tm:null,f_server_last:"",f_loading:false,s_tm:null,s_time:200,s_mode:"select",last_hover:null,last_selected:null,last_match:null,last_text:"",last_value:"",tm_hover:null,tm_confirm_blur:null,clear_click:false,clear_blur:false,clear_bsp:false,clear_key:false,i_ofs:23,sp:{dhx_skyblue:{list_ofs:1,hdr_ofs:1,scr_ofs:1},dhx_web:{list_ofs:0,hdr_ofs:1,scr_ofs:0},dhx_terrace:{list_ofs:1,hdr_ofs:1,scr_ofs:1},material:{list_ofs:0,hdr_ofs:1,scr_ofs:1}},col_w:null};this.conf.combo_image=(this.modes[this.conf.opts_type].image==true);this.t={};this.base=document.createElement("DIV");this.base.style.width=this.conf.combo_width+"px";this.base.innerHTML="<input type='text' class='dhxcombo_input' style='width:"+(this.conf.combo_width-(this.conf.i_ofs+1)-(this.conf.combo_image?this.conf.i_ofs:0))+"px;"+(this.conf.combo_image?"margin-left:"+this.conf.i_ofs+"px;":"")+"' autocomplete='off'><input type='hidden' value=''><input type='hidden' value='false'><div class='dhxcombo_select_button'><div class='dhxcombo_select_img'></div></div>"+(this.conf.combo_image?"<div class='dhxcombo_top_image'>"+this.modes[this.conf.opts_type].getTopImage(null,this.conf.enabled)+"</div>":"");this.cont.appendChild(this.base);this.list=document.createElement("DIV");this.list._listId=window.dhx4.newId();this.list.style.display="none";document.body.insertBefore(this.list,document.body.firstChild);this._doOnListScroll=function(){if(g.conf.s_tm!=null){window.clearTimeout(g.conf.s_tm)}g.conf.s_tm=window.setTimeout(g._doOnListScrollAction,g.conf.s_time)};this._doOnListScrollAction=function(){g.conf.s_tm=null;if(g.conf.s_mode=="scroll"&&g.list.scrollHeight-g.list.scrollTop-10<g.list.clientHeight){g._subloadRequest()}};if(typeof(window.addEventListener)=="function"){this.list.addEventListener("scroll",this._doOnListScroll,false)}else{this.list.attachEvent("onscroll",this._doOnListScroll)}this.setSkin(l||window.dhx4.skin||(typeof(dhtmlx)!="undefined"?dhtmlx.skin:null)||window.dhx4.skinDetect("dhxcombo")||"material");this._updateTopImage=function(a){if(!this.conf.combo_image){return}if(a!=null){this.base.lastChild.innerHTML=this.t[a].obj.getTopImage(this.t[a].item,this.conf.enabled)}else{this.base.lastChild.innerHTML=this.modes[this.conf.opts_type].getTopImage(null,this.conf.enabled)}};this._filterOpts=function(u){if(this.conf.f_server_tm){window.clearTimeout(this.conf.f_server_tm)}var o=String(this.base.firstChild.value).replace(new RegExp(this._fixRE(this.conf.f_ac_text)+"$","i"),"");if(this.conf.f_server_last==o.toLowerCase()){this._checkForMatch();return}if(this.conf.f_url!=null&&this.checkEvent("onDynXLS")){this.conf.f_server_last=o.toLowerCase();this.callEvent("onDynXLS",[o]);return}if(this.conf.f_url!=null){if(o.length==0){this.conf.f_server_last=o.toLowerCase();this.clearAll();return}if(this.conf.f_cache==true&&this.conf.f_cache_data[o]!=null){this.clearAll();this.conf.f_server_last=o.toLowerCase();for(var n=0;n<this.conf.f_cache_data[o].data.length;n++){this.load(this.conf.f_cache_data[o].data[n])}if(this.conf.f_dyn){this.conf.f_dyn_end=this.conf.f_cache_data[o].dyn_end;this.conf.f_mask=this.conf.f_cache_data[o].mask}if(u!==true){this._showList(true);this._checkForMatch()}}else{this.conf.f_server_tm=window.setTimeout(function(){g.conf.f_server_last=o.toLowerCase();g.conf.f_mask=o;var q="mask="+encodeURIComponent(o);if(g.conf.f_dyn){q+="&pos=0";g.conf.f_dyn_end=false}var a=function(z){if(g.conf.f_cache){if(!g.conf.f_cache_data[o]){g.conf.f_cache_data[o]={data:[],dyn_end:false,mask:o}}g.conf.f_cache_data[o].data.push(z.xmlDoc.responseXML)}g.clearAll();g.load(z.xmlDoc.responseText);var y=(g.base.offsetWidth>0&&g.base.offsetHeight>0);if(y==true&&g.conf.enabled==true&&g.conf.combo_focus==true&&u!==true){if(g.conf.f_ac&&g.conf.f_mode=="start"&&g.conf.clear_bsp==false&&g.list.firstChild!=null){var t=g.list.firstChild._optId;var A=String(g.t[t].obj.getText(g.list.firstChild,true));if(o==g.base.firstChild.value&&String(A).toLowerCase().indexOf(String(o).toLowerCase())===0){g.base.firstChild.value=A;g.conf.f_ac_text=A.substr(o.length);g._selectRange(o.length,A.length)}}g._showList(true);g._checkForMatch()}a=null};if(window.dhx4.ajax.method=="post"){window.dhx4.ajax.post(g.conf.f_url,q,a)}else{if(window.dhx4.ajax.method=="get"){window.dhx4.ajax.get(g.conf.f_url+(String(g.conf.f_url).indexOf("?")>=0?"&":"?")+q,a)}}},200)}}else{this.conf.f_server_last=o.toLowerCase();var m=(o.length==0?true:new RegExp((this.conf.f_mode=="start"?"^":"")+this._fixRE(o),"i"));var p=null;for(var v in this.t){var x=false;if(m!==true){if(this.conf.f_func!=null){var s=this._getOption(this.t[v].item._optId,n);x=(this.conf.f_func.apply(window,[o,s])==true)}else{var w=this.t[v].obj.getText(this.t[v].item,true);x=(m.test(w)==true)}}if(m===true||x==true){this.t[v].item.style.display="";if(p==null&&o.length>0){p=String(this.t[v].obj.getText(this.t[v].item,true))}}else{this.t[v].item.style.display="none"}}if(this.conf.f_ac&&this.conf.f_mode=="start"&&this.conf.clear_bsp==false&&p!=null){this.conf.f_ac_text=p.replace(new RegExp("^"+o,"i"),"");this.base.firstChild.value=p;this._selectRange(this.conf.f_server_last.length,this.base.firstChild.value.length)}if(this.conf.f_mode=="between"&&this.conf.clear_bsp==true){this._checkForMatch(true)}if(u!==true){this._showList(true);this._checkForMatch()}}};this._searchRO=function(m){if(this.conf.ro_tm){window.clearTimeout(this.conf.ro_tm)}this.conf.ro_text+=m;this._showList();for(var n=0;n<this.list.childNodes.length;n++){var a=this.list.childNodes[n]._optId;var o=String(this.t[a].obj.getText(this.list.childNodes[n],true)).toLowerCase();if(o.indexOf(this.conf.ro_text)===0){this._setSelected(a,true,true);this._confirmSelect("script",false);break}}this.conf.ro_tm=window.setTimeout(function(){g.conf.ro_text=""},this.conf.ro_tm_time)};this._fixRE=function(a){return String(a).replace(/[\\\^\$\*\+\?\.\(\)\|\{\}\[\]]/gi,"\\$&")};this._initObj=function(a){if(typeof(a.template)!="undefined"){this.setTemplate(a.template)}if(a.add!=true&&this.conf.f_loading!=true){this.clearAll(false)}this.addOption(a.options)};this._xmlToObj=function(H,p,o){var u={add:false,options:[]};var B=(p==true?H:H.getElementsByTagName("complete"));if(B.length>0){if(window.dhx4.s2b(B[0].getAttribute("add"))==true){u.add=true}var A=B[0].childNodes;for(var y=0;y<A.length;y++){if(typeof(A[y].tagName)!="undefined"){if(String(A[y].tagName).toLowerCase()=="template"){var G={};for(var s=0;s<A[y].childNodes.length;s++){var z=A[y].childNodes[s];if(z.tagName!=null){var C=z.tagName;if(typeof(this.conf.template[C])!="undefined"){G[C]=window.dhx4._xmlNodeValue(z)}if(C=="columns"){for(var E=0;E<z.childNodes.length;E++){var r=z.childNodes[E];if(r.tagName!=null&&r.tagName=="column"){var x={};for(var F in {width:1,css:1,header:1,option:1}){if(r.getAttribute(F)!=null){x[F]=r.getAttribute(F)}}for(var F in {header:1,option:1}){var D=r.getElementsByTagName(F);if(D[0]!=null&&D[0].firstChild!=null){x[F]=window.dhx4._xmlNodeValue(D[0])}}if(G.columns==null){G.columns=[]}G.columns.push(x)}r=null}}}z=null}this.setTemplate(G)}if(String(A[y].tagName).toLowerCase()=="option"){var v=false;if(p==true){v=(u.options.length==o)}else{v=window.dhx4.s2b(A[y].getAttribute("selected"))}var m={value:A[y].getAttribute("value"),text:window.dhx4._xmlNodeValue(A[y]),selected:v,checked:window.dhx4.s2b(A[y].getAttribute("checked"))};for(var F in {img:1,img_dis:1,img_src:1,img_src_dis:1,css:1}){if(A[y].getAttribute(F)!=null){m[F]=A[y].getAttribute(F)}}for(var s=0;s<A[y].childNodes.length;s++){if(A[y].childNodes[s].tagName!=null&&String(A[y].childNodes[s].tagName).toLowerCase()=="text"){m.text={};var z=A[y].childNodes[s];for(var E=0;E<z.childNodes.length;E++){if(z.childNodes[E].tagName!=null){m.text[z.childNodes[E].tagName]=window.dhx4._xmlNodeValue(z.childNodes[E])}}}}u.options.push(m)}}}B=A=null}return u};window.dhx4._enableDataLoading(this,"_initObj","_xmlToObj","complete",{data:true});window.dhx4._eventable(this);this._getNearItem=function(n,m){var a=null;while(n!=null){n=n[m<0?"previousSibling":"nextSibling"];if(a==null&&n!=null&&n.style.display==""&&n._optId!=null){a=n;n=null}}return a};this.setName(this.conf.form_name);this._doOnListMouseMove=function(m){m=m||event;var a=m.target||m.srcElement;while(a!=null&&a!=this){if(typeof(a._optId)!="undefined"){if(g.conf.tm_hover){window.clearTimeout(g.conf.tm_hover)}g._setSelected(a._optId,false,false,true)}a=a.parentNode}a=null};this._doOnListMouseDown=function(a){a=a||event;a.cancelBubble=true;g.conf.clear_click=true;window.setTimeout(function(){g.base.firstChild.focus()},1)};this._doOnListMouseUp=function(n){n=n||event;if(n.button!=g.conf.btn_left){return}var a=n.target||n.srcElement;while(a!=null&&a!=this){if(typeof(a._optId)!="undefined"){var m=true;if(typeof(g.t[a._optId].obj.optionClick)=="function"&&g.t[a._optId].obj.optionClick(a,n,g)!==true){m=false}if(m){g._setSelected(a._optId,null,true);g._confirmSelect("click")}}a=a.parentNode}a=null};this._doOnListMouseOut=function(a){if(g.conf.tm_hover){window.clearTimeout(g.conf.tm_hover)}g.conf.tm_hover=window.setTimeout(function(){var m=g.conf.last_match||g.conf.last_selected;if(g.conf.last_match==null&&g.t[m]!=null){if(g.base.firstChild.value!=g.t[m].obj.getText(g.t[m].item,true)){m=null}}g._setSelected(m,null,true,true)},1)};this._doOnBaseMouseDown=function(q){if(!g.conf.enabled){return}g.conf.clear_click=true;q=q||event;if(q.button!=g.conf.btn_left){return}var m=q.target||q.srcElement;if(m!=this.firstChild){window.setTimeout(function(){g.base.firstChild.focus()},1);var o=m;while(o!=this&&o!=null){if(o==this.lastChild){if(typeof(g.modes[g.conf.opts_type].topImageClick)=="function"){var n=(g.conf.last_hover||g.conf.last_selected);var a=(n!=null?g.t[n].item:null);if(g.modes[g.conf.opts_type].topImageClick(a,g)!==true){n=a=null;return}}o=null}else{o=o.parentNode}}}if(g._isListVisible()){g._hideList()}else{if(m!=this.firstChild){g.conf.clear_blur=true}g._showList();g._setSelected(g.conf.last_selected,true,true)}m=null};this._doOnBodyMouseDown=function(){if(g.conf.clear_click){g.conf.clear_click=false;return}g._confirmSelect("blur")};this._doOnInputFocus=function(){g.conf.clear_blur=false;if(g.conf.tm_confirm_blur){window.clearTimeout(g.conf.tm_confirm_blur)}if(g.conf.combo_focus==false){g.conf.combo_focus=true;if(g.conf.skin=="material"&&g.base.className.match(/dhxcombo_actv/)==null){g.base.className+=" dhxcombo_actv"}g.callEvent("onFocus",[])}};this._doOnInputBlur=function(){if(g.conf.clear_blur==true){g.conf.clear_blur=false;return}if(g.conf.tm_confirm_blur){window.clearTimeout(g.conf.tm_confirm_blur)}g.conf.tm_confirm_blur=window.setTimeout(function(){if(g.conf.clear_click==false){g._confirmSelect("blur");g.conf.combo_focus=false;if(g.conf.skin=="material"&&g.base.className.match(/dhxcombo_actv/)!=null){g.base.className=g.base.className.replace(/\s*dhxcombo_actv/gi,"")}g.callEvent("onBlur",[])}},20)};this._doOnInputKeyUp=function(a){a=a||event;if(g.conf.f_mode!=false){g.conf.clear_bsp=(a.keyCode==8||a.keyCode==46);g._filterOpts();return}else{g._checkForMatch()}};this._doOnInputKeyDown=function(a){a=a||event;if((a.keyCode==38||a.keyCode==40)&&!a.ctrlKey&&!a.shiftKey&&!a.altKey){if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}a.cancelBubble=true;g._keyOnUpDown(a.keyCode==38?-1:1)}if(a.keyCode==113){if(!g._isListVisible()){g._showList();if(g.base.firstChild.value==g.conf.last_text){g._setSelected(g.conf.last_selected,true,true);g.base.firstChild.value=g.conf.last_text;g.conf.f_server_last=g.base.firstChild.value.toLowerCase()}else{g.conf.f_server_last=g.base.firstChild.value.toLowerCase();if(g.conf.f_mode==false){g._checkForMatch()}}}else{}}if(a.keyCode==27){if(a.preventDefault){a.preventDefault()}else{a.returnValue=false}a.cancelBubble=true;g._cancelSelect()}if(a.keyCode==13){if(a.preventDefault){a.preventDefault()}g._confirmSelect("kbd")}if(g.conf.ro_mode==true&&((a.keyCode>=48&&a.keyCode<=57)||(a.keyCode>=65&&a.keyCode<=90))){g._searchRO(String.fromCharCode(a.keyCode).toLowerCase());a.cancelBubble=true}g.conf.clear_key=true;g.callEvent("onKeyPressed",[a.keyCode||a.charCode])};this._doOnInputKeyPress=function(a){if(g.conf.clear_key){g.conf.clear_key=false;return}a=a||event;g.callEvent("onKeyPressed",[a.keyCode||a.charCode])};this._keyOnUpDown=function(a){var m=null;if(this.conf.last_hover){m=this.t[this.conf.last_hover].item}else{if(this.conf.last_selected){m=this.t[this.conf.last_selected].item}}if(!m&&this._getListVisibleCount()==0){return}if(m!=null&&m.style.display!=""){m=null}this._showList();if(m!=null){if(this.t[m._optId].obj.isSelected(m)){m=this._getNearItem(m,a)}}else{m=this.list.firstChild;if(m.style.display!=""){m=this._getNearItem(m,1)}}if(m==null){return}this._setSelected(m._optId,true,true);if(this.conf.f_mode==false){this.base.firstChild.value=this.t[m._optId].obj.getText(m,true)}else{var n=String(this.t[m._optId].obj.getText(m,true));if(this.conf.f_mode=="start"&&this.conf.f_ac==true){if(n.toLowerCase().indexOf(this.conf.f_server_last)===0){this.conf.f_ac_text=n.substring(this.conf.f_server_last.length,n.length);this.base.firstChild.value=n;this._selectRange(this.conf.f_server_last.length,this.base.firstChild.value.length)}else{this.base.firstChild.value=n;this.conf.f_server_last=this.base.firstChild.value.toLowerCase();this._selectRange(0,this.base.firstChild.value.length)}}else{this.base.firstChild.value=n;this.conf.f_server_last=this.base.firstChild.value.toLowerCase()}}m=null};this.conf.evs_nodes=[{node:document.body,evs:{mousedown:"_doOnBodyMouseDown"}},{node:this.base,evs:{mousedown:"_doOnBaseMouseDown"}},{node:this.base.firstChild,evs:{keyup:"_doOnInputKeyUp",keydown:"_doOnInputKeyDown",keypress:"_doOnInputKeyPress",focus:"_doOnInputFocus",blur:"_doOnInputBlur"}},{node:this.list,evs:{mousemove:"_doOnListMouseMove",mousedown:"_doOnListMouseDown",mouseup:"_doOnListMouseUp",mouseout:"_doOnListMouseOut"}}];for(var b=0;b<this.conf.evs_nodes.length;b++){for(var i in this.conf.evs_nodes[b].evs){if(typeof(window.addEventListener)=="function"){this.conf.evs_nodes[b].node.addEventListener(i,this[this.conf.evs_nodes[b].evs[i]],false)}else{this.conf.evs_nodes[b].node.attachEvent("on"+i,this[this.conf.evs_nodes[b].evs[i]])}}}this.unload=function(){this.clearAll();this.t=null;for(var n=0;n<this.conf.evs_nodes.length;n++){for(var m in this.conf.evs_nodes[n].evs){if(typeof(window.addEventListener)=="function"){this.conf.evs_nodes[n].node.removeEventListener(m,this[this.conf.evs_nodes[n].evs[m]],false)}else{this.conf.evs_nodes[n].node.detachEvent("on"+m,this[this.conf.evs_nodes[n].evs[m]])}this.conf.evs_nodes[n].evs[m]=null;delete this.conf.evs_nodes[n].evs[m]}this.conf.evs_nodes[n].node=null;this.conf.evs_nodes[n].evs=null;delete this.conf.evs_nodes[n].node;delete this.conf.evs_nodes[n].evs;this.conf.evs_nodes[n]=null}window.dhx4._eventable(this,"clear");window.dhx4._enableDataLoading(this,null,null,null,"clear");this._mcDetachHeader();this.DOMelem_input=this.DOMelem_button=this.DOMlist=this.DOMelem=this.DOMParent=null;for(var m in this.conf){this.conf[m]=null;delete this.conf[m]}this.conf=null;if(typeof(window.addEventListener)=="function"){this.list.removeEventListener("scroll",this._doOnListScroll,false)}else{this.list.detachEvent("onscroll",this._doOnListScroll)}this.base.parentNode.removeChild(this.base);this.list.parentNode.removeChild(this.list);this.base=this.list=this.cont=null;this.modes=null;for(var m in this){if(typeof(this[m])=="function"){this[m]=null}}g=null};this.DOMelem_input=this.base.firstChild;this.DOMelem_button=this.base.childNodes[this.base.childNodes.length-(this.conf.combo_image?2:1)];this.DOMlist=this.list;this.DOMelem=this.base;this.DOMParent=f;f=null;if(d!=null){if(d.filter!=null){if(typeof(d.filter)=="string"){this.enableFilteringMode(true,d.filter,window.dhx4.s2b(d.filter_cache),window.dhx4.s2b(d.filter_sub_load))}else{this.enableFilteringMode(true)}}if(d.image_path!=null){this.setImagePath(d.image_path)}if(d.default_image!=null||d.default_image_dis!=null){this.setDefaultImage(d.default_image,d.default_image_dis)}if(d.items||d.options){this.addOption(d.items||d.options)}if(d.xml||d.json){this.load(d.xml||d.json)}if(typeof(d.readonly)!="undefined"){this.readonly(d.readonly)}d=null}return this}function dhtmlXComboFromSelect(c){if(typeof(c)=="string"){c=document.getElementById(c)}var b=c.offsetWidth;var j=c.getAttribute("name")||null;var d=document.createElement("SPAN");c.parentNode.insertBefore(d,c);var f=c.getAttribute("mode")||c.getAttribute("opt_type")||"option";var e=new dhtmlXCombo(d,j,b,f);d=null;var h=c.getAttribute("imagePath");if(h){e.setImagePath(h)}var i=c.getAttribute("defaultImage");var g=c.getAttribute("defaultImageDis");if(window.dhx4.s2b(g)==true){g=true}if(i!=null||g!=null){e.setDefaultImage(i,g)}var a=e._xmlToObj([c],true,c.selectedIndex);if(a.options.length>0){e.addOption(a.options)}a=null;c.parentNode.removeChild(c);c=null;return e}dhtmlXCombo.prototype.setName=function(a){this.conf.form_name=a;this.base.childNodes[1].name=a;this.base.childNodes[2].name=a.replace(/(\[.*)?$/,"_new_value$1")};dhtmlXCombo.prototype.readonly=function(a){if(window.dhx4.s2b(a)){this.base.firstChild.setAttribute("readOnly","true");this.conf.ro_mode=true}else{this.base.firstChild.removeAttribute("readOnly");this.conf.ro_mode=false}};dhtmlXCombo.prototype.setPlaceholder=function(a){if(typeof(a)=="undefined"||a==null){a=""}this.base.firstChild.setAttribute("placeholder",String(a))};dhtmlXCombo.prototype.setTemplate=function(c){for(var b in c){if(typeof(this.conf.template[b])!="undefined"){if(b=="header"){this.conf.template[b]=window.dhx4.s2b(c[b])}else{this.conf.template[b]=String(c[b])}}}if(c.columns!=null){this._mcMakeTemplate(c.columns)}else{this._mcDetachHeader()}for(var b in this.t){this.t[b].obj.setText(this.t[b].item,this.t[b].item._conf.text)}this._confirmSelect("template")};dhtmlXCombo.prototype.setSkin=function(a){if(a==this.conf.skin){return}this.conf.skin=a;this.base.className="dhxcombo_"+this.conf.skin+(this.conf.enabled?"":" dhxcombo_disabled");this.list.className="dhxcombolist_"+this.conf.skin+(this.hdr!=null?" dhxcombolist_multicolumn":"");if(this.hdr!=null){this.hdr.className="dhxcombolist_"+this.conf.skin+" dhxcombolist_hdr"}this.conf.i_ofs=(a=="material"?26:23);this._adjustBase()};dhtmlXCombo.prototype.getInput=function(){return this.base.firstChild};dhtmlXCombo.prototype.getButton=function(){return this.base.childNodes[this.base.childNodes.length-(this.conf.combo_image?2:1)]};dhtmlXCombo.prototype.getList=function(){return this.list};dhtmlXCombo.prototype.getBase=function(){return this.base};dhtmlXCombo.prototype.getParent=function(){return this.DOMParent};dhtmlXCombo.prototype.forEachOption=function(a){for(var b=0;b<this.list.childNodes.length;b++){a.apply(window,[this._getOption(this.list.childNodes[b]._optId,b)])}};dhtmlXCombo.prototype.setFocus=function(){if(this.conf.enabled){this.base.firstChild.focus()}};dhtmlXCombo.prototype.setFontSize=function(a,b){if(a!=null){this.base.firstChild.style.fontSize=a}if(b!=null){this.list.style.fontSize=b}};dhtmlXCombo.prototype.getOption=function(e){var f=null;var c=null;for(var d=0;d<this.list.childNodes.length;d++){if(f==null){var b=this.list.childNodes[d]._optId;if(this.t[b].obj.getValue(this.t[b].item)==e){f=b;c=d}}}return(f==null?null:this._getOption(f,c))};dhtmlXCombo.prototype.getOptionByIndex=function(a){if(a<0){return null}if(this.list.childNodes[a]==null){return null}return this._getOption(this.list.childNodes[a]._optId,a)};dhtmlXCombo.prototype.getOptionByLabel=function(e){var f=null;var c=null;for(var d=0;d<this.list.childNodes.length;d++){if(f==null){var b=this.list.childNodes[d]._optId;if(this.t[b].obj.getText(this.t[b].item,true)==e){f=b;c=d}}}return(f==null?null:this._getOption(f,c))};dhtmlXCombo.prototype.getSelectedIndex=function(){return this._getOptionProp(this.conf.last_selected,"index",-1)};dhtmlXCombo.prototype.getSelectedText=function(){return this._getOptionProp(this.conf.last_selected,"text","")};dhtmlXCombo.prototype.getSelectedValue=function(){return this._getOptionProp(this.conf.temp_selected||this.conf.last_selected,"value",null)};dhtmlXCombo.prototype.getActualValue=function(){return this.base.childNodes[1].value};dhtmlXCombo.prototype.getComboText=function(){return this.base.childNodes[0].value};dhtmlXCombo.prototype.getIndexByValue=function(b){var a=this.getOption(b);return(a!=null?a.index:-1)};dhtmlXCombo.prototype.setComboText=function(a){if(this.conf.allow_free_text!=true){return}this.unSelectOption();this.conf.last_text=this.base.firstChild.value=a;this.conf.f_server_last=this.base.firstChild.value.toLowerCase()};dhtmlXCombo.prototype.setComboValue=function(b){var a=this.getOption(b);if(a!=null){this.selectOption(a.index)}else{this.conf.last_value=b;this.base.childNodes[1].value=this.conf.last_value;this.base.childNodes[2].value="true"}};dhtmlXCombo.prototype.selectOption=function(b,c,a){if(b<0||b>=this.list.childNodes.length){return}var d=this.list.childNodes[b]._optId;this._setSelected(d,this._isListVisible(),true);this._confirmSelect("script")};dhtmlXCombo.prototype.unSelectOption=function(){if(this.conf.last_hover!=null){this.t[this.conf.last_hover].obj.setSelected(this.t[this.conf.last_hover].item,false);this.conf.last_hover=null}this.base.firstChild.value="";if(this.conf.f_mode!=false){this._filterOpts(true)}this._hideList();this._updateTopImage(null);this._confirmSelect("script")};dhtmlXCombo.prototype.confirmValue=function(){this._confirmSelect("script")};dhtmlXCombo.prototype.enable=function(a){a=(typeof(a)=="undefined"?true:window.dhx4.s2b(a));if(this.conf.enabled==a){return}this.conf.enabled=a;if(a){this.base.className="dhxcombo_"+this.conf.skin;this.base.firstChild.removeAttribute("disabled")}else{this._hideList();this.base.className="dhxcombo_"+this.conf.skin+" dhxcombo_disabled";this.base.firstChild.setAttribute("disabled","true")}this._updateTopImage(this.conf.last_selected)};dhtmlXCombo.prototype.disable=function(a){a=(typeof(a)=="undefined"?true:window.dhx4.s2b(a));this.enable(!a)};dhtmlXCombo.prototype.isEnabled=function(){return(this.conf.enabled==true)};dhtmlXCombo.prototype.show=function(a){if(typeof(a)=="undefined"){a=true}else{a=window.dhx4.s2b(a)}this.base.style.display=(a==true?"":"none")};dhtmlXCombo.prototype.hide=function(a){if(typeof(a)=="undefined"){a=true}this.show(!a)};dhtmlXCombo.prototype.isVisible=function(){return(this.base.style.display=="")};dhtmlXCombo.prototype.setFilterHandler=function(a){if(typeof(a)=="function"){this.conf.f_func=a;this.conf.f_mode=true;this.conf.f_dyn=this.conf.f_cache=this.conf.f_url=null}else{if(typeof(a)=="string"&&typeof(window[a])=="function"){this.conf.f_func=window[a];this.conf.f_mode=true;this.conf.f_dyn=this.conf.f_cache=this.conf.f_url=null}else{this.conf.f_func=null}}};dhtmlXCombo.prototype.enableFilteringMode=function(d,b,a,c){if(d==true||d=="between"){this.conf.f_mode=(d==true?"start":"between");if(b){this.conf.f_url=b;this.conf.f_cache=window.dhx4.s2b(a);this.conf.f_dyn=window.dhx4.s2b(c)}else{this.conf.f_url=null;this.conf.f_cache=false;this.conf.f_dyn=false}}else{this.conf.f_mode=false;this.conf.f_url=null;this.conf.f_cache=false;this.conf.f_dyn=false}};dhtmlXCombo.prototype.filter=function(c,a){for(var d=0;d<this.list.childNodes.length;d++){var b=c.apply(window,[this._getOption(this.list.childNodes[d]._optId,d)]);this.list.childNodes[d].style.display=(b===true?"":"none")}if(typeof(a)=="undefined"||a==true){this._showList(true)}};dhtmlXCombo.prototype.sort=function(c){var a=[];for(var b=0;b<this.list.childNodes.length;b++){var d=this.list.childNodes[b]._optId;a.push([d,this._getOption(d,b)])}if(c=="asc"||c=="desc"){k=true;a.sort(function(f,e){f=f[1].text_option.toLowerCase();e=e[1].text_option.toLowerCase();var g=(c=="asc"?1:-1);return(f>e?g:-1*g)})}else{if(typeof(c)=="function"||typeof(window[c])=="function"){if(typeof(window[c])=="function"){c=window[c]}a.sort(function(f,e){return c.apply(window,[f[1],e[1]])})}}while(this.list.childNodes.length>0){this.list.removeChild(this.list.lastChild)}for(var b=0;b<a.length;b++){this.list.appendChild(this.t[a[b][0]].item)}};dhtmlXCombo.prototype.enableAutocomplete=function(a){if(typeof(a)=="undefined"){a=true}else{a=window.dhx4.s2b(a)}this.conf.f_ac=a};dhtmlXCombo.prototype.disableAutocomplete=function(a){if(typeof(a)=="undefined"){a=true}else{a=window.dhx4.s2b(a)}this.enableAutocomplete(!a)};dhtmlXCombo.prototype.allowFreeText=function(b,a){this.conf.allow_free_text=(typeof(b)=="undefined"?true:window.dhx4.s2b(b));this.conf.free_text_empty=(typeof(a)=="undefined"?false:window.dhx4.s2b(a))};dhtmlXCombo.prototype._checkForMatch=function(d){var a=window.dhx4.trim(this.base.firstChild.value).toLowerCase();var e=null;var b=this.list.firstChild;while(b!=null){if(b.style.display==""&&b._optId!=null){var c=window.dhx4.trim(this.t[b._optId].obj.getText(b,true)).toLowerCase();if(a==c){e=b._optId;b=null}}if(b!=null){b=b.nextSibling}}if(this.conf.last_match==null){if(e!=null){this._setSelected(e,true,true);this.conf.last_match=e}else{if(this.conf.f_mode!="between"||d==true){this._setSelected(null,true,true);this.conf.last_match=null}}}else{if(e!=null){if(e!=this.conf.last_match){this._setSelected(e,true,true);this.conf.last_match=e}}else{this._setSelected(null,true,true);this.conf.last_match=null}}};dhtmlXCombo.prototype._selectRange=function(b,a){if(this.conf.combo_focus==true){window.dhx4.selectTextRange(this.base.firstChild,b,a)}};dhtmlXCombo.prototype.openSelect=function(){if(!this._isListVisible()){this._showList()}};dhtmlXCombo.prototype.closeAll=function(){this._hideList()};dhtmlXCombo.prototype._showList=function(a){if(this._getListVisibleCount()==0){if(a&&this._isListVisible()){this._hideList()}return}if(this._isListVisible()){this._checkListHeight();return}this.list.style.zIndex=window.dhx4.zim.reserve(this.conf.list_zi_id);if(this.hdr!=null&&this.conf.template.header==true){this.hdr.style.zIndex=Number(this.list.style.zIndex)+1}this.list.style.visibility="hidden";this.list.style.display="";if(this.hdr!=null&&this.conf.template.header==true){this.hdr.style.visibility=this.list.style.visibility;this.hdr.style.display=this.list.style.display}var b=(this.hdr!=null&&this.conf.template.header==true?this.hdr.offsetHeight:0);this.list.style.width=Math.max(this.conf.opts_width||this.conf.col_w||0,this.conf.combo_width)+"px";this.list.style.top=window.dhx4.absTop(this.base)+b+this.base.offsetHeight-1+"px";this.list.style.left=window.dhx4.absLeft(this.base)+"px";if(this.hdr!=null&&this.conf.template.header==true){this.hdr.style.width=this.list.style.width;this.hdr.style.left=this.list.style.left;this.hdr.style.top=parseInt(this.list.style.top)-b+"px"}this._checkListHeight();this.list.style.visibility="visible";if(this.hdr!=null&&this.conf.template.header==true){this.hdr.style.visibility="visible"}this.callEvent("onOpen",[])};dhtmlXCombo.prototype._hideList=function(){if(!this._isListVisible()){return}window.dhx4.zim.clear(this.conf.list_zi_id);this.list.style.display="none";if(this.hdr!=null&&this.conf.template.header==true){this.hdr.style.display="none"}this.conf.clear_click=false;this.callEvent("onClose",[])};dhtmlXCombo.prototype._isListVisible=function(){return(this.list.style.display=="")};dhtmlXCombo.prototype._getListVisibleCount=function(){var a=0;for(var b=0;b<this.list.childNodes.length;b++){a+=(this.list.childNodes[b].style.display==""?1:0)}return a};dhtmlXCombo.prototype._checkListHeight=function(){if(!this._isListVisible()){return}if(this.conf.item_h==null){var j=this.list.firstChild;while(j!=null){if(j.style.display==""){this.conf.item_h=j.offsetHeight+(this.hdr!=null?-1:0);j=null}else{j=j.nextSibling}}j=null}var l=window.dhx4.screenDim();var f=window.dhx4.absTop(this.base);var b=this.base.offsetHeight;var a=(this.hdr!=null&&this.conf.template.header==true?this.hdr.offsetHeight:0);var c=Math.max(0,Math.floor((f-a-l.top)/this.conf.item_h));var i=Math.max(0,Math.floor((l.bottom-(f+b+a))/this.conf.item_h));var m=this._getListVisibleCount();if(i<Math.min(this.conf.opts_count_min,m)&&c>i){i=null}var g=Math.min((i==null?c:i),this.conf.opts_count,m);var d=(g<m?(g*this.conf.item_h)+"px":"");var e=this.conf.sp[this.conf.skin][this.hdr!=null&&this.conf.template.header==true?"hdr_ofs":"list_ofs"];this.list.style.height=d;this.list.style.top=(i==null?f-this.list.offsetHeight+e:f+b+a-e)+"px";if(this.hdr!=null&&this.conf.template.header==true){this.hdr.style.top=(i==null?f-a-this.list.offsetHeight+e:f+b-e)+"px"}};dhtmlXCombo.prototype._scrollToItem=function(e){var d=this.t[e].item.offsetTop;var c=d+this.t[e].item.offsetHeight;var b=this.list.scrollTop;var a=b+this.list.clientHeight;if(d<b){this.list.scrollTop=d+(this.hdr!=null&&this.conf.template.header==true?1:0)}else{if(c>a){this.list.scrollTop=c-this.list.clientHeight+(this.hdr!=null&&this.conf.template.header==true?-this.conf.sp[this.conf.skin].scr_ofs:0)}}};dhtmlXCombo.prototype._setSelected=function(d,c,b,a){this.conf.temp_selected=null;if(b){this._updateTopImage(d)}if(d!=null&&this.conf.last_hover==d){if(c){this._scrollToItem(d)}return}if(this.conf.last_hover!=null){this.t[this.conf.last_hover].obj.setSelected(this.t[this.conf.last_hover].item,false);this.conf.last_hover=null;if(d==null){this.callEvent("onSelectionChange",[])}}if(d!=null){this.t[d].obj.setSelected(this.t[d].item,true);this.conf.last_hover=d;if(a!=true){this.conf.temp_selected=d;this.callEvent("onSelectionChange",[])}if(this.conf.s_mode=="select"&&this.t[d].item==this.t[d].item.parentNode.lastChild){this._subloadRequest()}if(c){this._scrollToItem(d)}}};dhtmlXCombo.prototype._subloadRequest=function(){if(this.conf.f_url!=null&&this.conf.f_dyn==true&&this.conf.f_dyn_end==false){var c="mask="+encodeURIComponent(this.conf.f_mask)+"&pos="+this.list.childNodes.length;var a=this;var b=function(e){if(a.conf.f_cache){a.conf.f_cache_data[a.conf.f_mask].data.push(e.xmlDoc.responseXML)}var d=a.list.childNodes.length;a.conf.f_loading=true;a.load(e.xmlDoc.responseXML);a.conf.f_loading=false;if(d==a.list.childNodes.length){a.conf.f_dyn_end=true;if(a.conf.f_cache){a.conf.f_cache_data[a.conf.f_mask].dyn_end=true}}b=a=null};if(window.dhx4.ajax.method=="post"){window.dhx4.ajax.post(this.conf.f_url,c,b)}else{if(window.dhx4.ajax.method=="get"){window.dhx4.ajax.get(this.conf.f_url+(String(this.conf.f_url).indexOf("?")>=0?"&":"?")+c,b)}}}};dhtmlXCombo.prototype.addOption=function(f,g,b,a,d){var c=null;if(!(f instanceof Array)){var h=this._renderOption({value:f,text:g,css:b,img:a});if(c==null&&window.dhx4.s2b(d)==true){c=h}}else{for(var e=0;e<f.length;e++){if(typeof(f[e])=="undefined"){continue}if(f[e] instanceof Array){h=this._renderOption({value:f[e][0],text:f[e][1],css:f[e][2],img:f[e][3]});if(c==null&&window.dhx4.s2b(f[e][4])==true){c=h}}else{var h=this._renderOption(f[e]);if(c==null&&window.dhx4.s2b(f[e].selected)==true){c=h}}}}if(c!=null){this._setSelected(c,this._isListVisible(),true);this._confirmSelect("onInit")}};dhtmlXCombo.prototype.updateOption=function(a,c,b,d){var e=this._getOptionId(a);if(e==null){return}this.t[e].obj.update(this.t[e].item,{value:c,text:b,css:d});if(this.conf.last_selected==e){this.conf.last_text=this.base.firstChild.value=this.t[e].obj.getText(this.t[e].item,true);this.conf.f_server_last=this.base.firstChild.value.toLowerCase()}};dhtmlXCombo.prototype.deleteOption=function(d){for(var b in this.t){var c=this.t[b].obj.getValue(this.t[b].item);if(c==d){this._removeOption(b)}}if(this._isListVisible()){this._showList(true)}};dhtmlXCombo.prototype.clearAll=function(b){b=(typeof(b)=="undefined"?true:window.dhx4.s2b(b));for(var c in this.t){this._removeOption(c)}if(this.conf.tm_hover){window.clearTimeout(this.conf.tm_hover)}this.conf.last_hover=null;this.conf.last_selected=null;this.list.scrollTop=0;if(b==true){this._hideList()}};dhtmlXCombo.prototype._renderOption=function(d){var e=window.dhx4.newId();var c=document.createElement("DIV");c._optId=e;c._tpl=this.conf.template;if(typeof(d.img)=="undefined"&&typeof(d.img_src)!="undefined"){d.img=d.img_src;delete d.img_src}if(typeof(d.img_dis)=="undefined"&&typeof(d.img_src_dis)!="undefined"){d.img_dis=d.img_src_dis;delete d.img_src_dis}d.img_path=this.conf.img_path;d.img_def=this.conf.img_def;d.img_def_dis=this.conf.img_def_dis;this.list.appendChild(c);var b=(this._isListVisible()&&window.dhx4.isFF==true);if(b==true){var a=this.list.scrollTop;this.list.scrollTop-=1}if(this.hdr!=null){d.multicol=true}this.t[c._optId]={obj:this.modes[this.conf.opts_type].render(c,d),item:c,conf:{type:this.conf.opts_type}};c=null;if(b==true){this.list.scrollTop+=1}return e};dhtmlXCombo.prototype._removeOption=function(a){this.t[a].obj.destruct(this.t[a].item);this.t[a].obj=null;this.t[a].item.parentNode.removeChild(this.t[a].item);this.t[a].item=null;this.t[a].conf=null;this.t[a]=null;delete this.t[a];if(this.conf.last_hover==a){this.conf.last_hover=null}if(this.conf.last_selected==a){this.conf.last_selected=null;this._confirmSelect("onDelete")}};dhtmlXCombo.prototype._confirmSelect=function(c,a){var b=false;if(typeof(a)=="undefined"){a=true}if(this.conf.f_server_tm){window.clearTimeout(this.conf.f_server_tm)}if(this.conf.last_hover!=null){b=b||(this.conf.last_value!=this._getOptionValue(this.conf.last_hover));this.conf.last_match=this.conf.last_selected=this.conf.last_hover;this.conf.last_value=this._getOptionValue(this.conf.last_selected);this.conf.last_text=this.base.firstChild.value=this.t[this.conf.last_selected].obj.getText(this.t[this.conf.last_selected].item,true);this.conf.f_server_last=this.base.firstChild.value.toLowerCase();this.base.childNodes[1].value=this.conf.last_value;this.base.childNodes[2].value="false"}else{if(this.conf.allow_free_text||(this.base.firstChild.value==""&&this.conf.allow_empty_value)){b=b||(this.conf.last_text!=this.base.firstChild.value);this.conf.last_match=this.conf.last_value=this.conf.last_selected=null;this.conf.last_text=this.base.firstChild.value;this.conf.f_server_last=this.base.firstChild.value.toLowerCase();this.base.childNodes[1].value=this.conf.last_text;this.base.childNodes[2].value="true"}else{if(c!="template"){this._cancelSelect(true);this._updateTopImage(this.conf.last_selected);return}}}if(this.conf.f_ac&&this.conf.f_mode=="start"){this.conf.f_ac_text="";if(c!="blur"){this._selectRange(this.base.firstChild.value.length,this.base.firstChild.value.length)}}if(a){this._hideList()}if(b==true&&c!="onInit"&&c!="onDelete"){this.callEvent("onSelectionChange",[]);this.callEvent("onChange",[this.conf.last_value,this.conf.last_text])}};dhtmlXCombo.prototype._cancelSelect=function(a){this._hideList();if(a==true&&this.conf.allow_free_text==false&&this.conf.free_text_empty==true){this.conf.f_server_last=this.conf.last_match=this.conf.last_value=this.conf.last_selected=null;this.base.childNodes[1].value=this.conf.last_text=this.base.firstChild.value="";this.base.childNodes[2].value="false"}else{this.base.firstChild.value=this.conf.last_text}if(this.conf.f_mode!=false){this._filterOpts(true)}};dhtmlXCombo.prototype._getOption=function(g,d){if(!this.t[g]){return null}if(typeof(d)=="undefined"){d=-1}if(d<0){for(var f=0;f<this.list.childNodes.length;f++){if(d<0&&this.list.childNodes[f]._optId==g){d=f}}}var e={value:this.t[g].obj.getValue(this.t[g].item),text:this.t[g].obj.getText(this.t[g].item),text_input:this.t[g].obj.getText(this.t[g].item,true),text_option:this.t[g].obj.getText(this.t[g].item,null,true),css:this.t[g].obj.getCss(this.t[g].item),selected:(g==this.conf.last_selected),index:d};if(typeof(this.t[g].obj.getExtraData)=="function"){var c=this.t[g].obj.getExtraData(this.t[g].item);for(var b in c){if(typeof(e[b])=="undefined"){e[b]=c[b]}}}return e};dhtmlXCombo.prototype._getOptionProp=function(d,c,b){if(d!=null){var a=this._getOption(d);if(a!=null){return a[c]}}return b};dhtmlXCombo.prototype._getOptionId=function(b){var d=null;for(var a=0;a<this.list.childNodes.length;a++){if(d==null){var c=this.list.childNodes[a]._optId;if(b==this.t[c].obj.getValue(this.t[c].item)){d=c}}}return d};dhtmlXCombo.prototype._getOptionValue=function(a){return this._getOptionProp(a,"value",null)};dhtmlXCombo.prototype.setSize=function(a){this.conf.combo_width=parseInt(a)-(dhx4.isFF||dhx4.isIE||dhx4.isChrome||dhx4.isOpera?2:0);this.base.style.width=Math.max(0,this.conf.combo_width)+"px";this._adjustBase();if(this._isListVisible()){this._hideList();this._showList()}};dhtmlXCombo.prototype._adjustBase=function(){this.base.firstChild.style.width=Math.max(0,(this.conf.combo_width-(this.conf.i_ofs+1)-(this.conf.combo_image?this.conf.i_ofs:0)))+"px";this.base.firstChild.style.marginLeft=(this.conf.combo_image?this.conf.i_ofs+"px":"0px")};dhtmlXCombo.prototype.setOptionWidth=function(a){this.conf.opts_width=(parseInt(a)||null)};dhtmlXCombo.prototype.setOptionIndex=function(c,a){if(isNaN(a)||a<0){return}var d=this.getOption(c);if(d==null){return}if(a==d.index){return}var b=this.list.childNodes[d.index];b.parentNode.removeChild(b);if(this.list.childNodes[a]!=null){this.list.insertBefore(b,this.list.childNodes[a])}else{this.list.appendChild(b)}b=null};dhtmlXCombo.prototype.getOptionsCount=function(){return this.list.childNodes.length};dhtmlXCombo.prototype._mcMakeTemplate=function(i){var e="";var d="";this.conf.col_w=0;for(var f=0;f<i.length;f++){var a=Number(parseInt(i[f].width)||50);var c=(i[f].css||"");var g=(f==0&&window.dhx4.isIE6==true?"_first":"");d+="<div class='dhxcombo_cell"+g+" "+c+"' style='width:"+a+"px;'><div class='dhxcombo_cell_text'>"+(i[f].option||"&nbsp;")+"</div></div>";e+="<div class='dhxcombo_hdrcell"+g+" "+c+"' style='width:"+a+"px;'><div class='dhxcombo_hdrcell_text'>"+(i[f].header||"&nbsp;")+"</div></div>";this.conf.col_w+=a+1}var a=500;var b=document.createElement("DIV");b.style.position="absolute";b.style.top="10px";b.style.left=-a*2+"px";b.style.width=a+"px";b.style.height="50px";b.style.overflowY="scroll";b.innerHTML="<div>&nbsp;</div>";document.body.appendChild(b);this.conf.col_w+=a-b.firstChild.offsetWidth+10;b.parentNode.removeChild(b);b=null;this.conf.template.option=d;this._mcAttachHeader(e);this.list.className+=" dhxcombolist_multicolumn"};dhtmlXCombo.prototype._mcAttachHeader=function(a){if(this.hdr==null){this.hdr=document.createElement("DIV");this.hdr.className="dhxcombolist_"+this.conf.skin+" dhxcombolist_hdr";this.hdr.style.display="none";this.list.parentNode.insertBefore(this.hdr,this.list);if(typeof(window.addEventListener)=="function"){this.hdr.addEventListener("mousedown",this._doOnListMouseDown,false)}else{this.hdr.attachEvent("onmousedown",this._doOnListMouseDown)}if(this.conf.opts_type=="checkbox"&&this.conf.combo_image==true){this.conf.combo_image=false;if(this.base.lastChild.className.match(/dhxcombo_top_image/)!=null){this.base.removeChild(this.base.lastChild)}this._adjustBase()}}this.hdr.innerHTML="<div class='dhxcombo_hdrtext'>"+a+"</div>"};dhtmlXCombo.prototype._mcDetachHeader=function(){if(this.hdr!=null){if(typeof(window.addEventListener)=="function"){this.hdr.removeEventListener("mousedown",this._doOnListMouseDown,false)}else{this.hdr.detachEvent("onmousedown",this._doOnListMouseDown)}this.hdr.parentNode.removeChild(this.hdr);this.hdr=null}this.conf.col_w=null;this.conf.item_h=null};dhtmlXCombo.prototype.modes={};dhtmlXCombo.prototype.doWithItem=function(a,g,e,c){var f=(a>=0&&a<this.list.childNodes.length?this.list.childNodes[a]._optId:null);if(f==null){return null}if(typeof(this.t[f].obj[g])!="function"){return null}var d=[this.t[f].item];for(var b=2;b<arguments.length;b++){d.push(arguments[b])}return this.t[f].obj[g].apply(this.t[f].obj,d)};function dhtmlXComboExtend(d,c){for(var b in dhtmlXCombo.prototype.modes[c]){if(typeof(dhtmlXCombo.prototype.modes[d][b])=="undefined"){dhtmlXCombo.prototype.modes[d][b]=dhtmlXCombo.prototype.modes[c][b]}}}dhtmlXCombo.prototype.modes.option={image:false,html:false,option_css:"dhxcombo_option_text",render:function(a,b){a._conf={value:b.value,css:""};a.className="dhxcombo_option";a.innerHTML="<div class='"+this.option_css+"'>&nbsp;</div>";if(b.css!=null){a.lastChild.style.cssText=b.css;a._conf.css=b.css}this.setText(a,b.text);return this},destruct:function(a){a._conf=null},update:function(a,b){a._conf.value=b.value;a._conf.css=b.css;a.lastChild.style.cssText=b.css;this.setText(a,b.text)},setText:function(c,d,b){c._conf.text=d;var a=(typeof(d)=="object"?window.dhx4.template(c._tpl.option,this.replaceHtml(c._conf.text,b),true):window.dhx4.trim(this.replaceHtml(c._conf.text,b)||""));c.lastChild.innerHTML=(a.length==0?"&nbsp;":a)},getText:function(c,a,b){if(window.dhx4.s2b(a)&&typeof(c._conf.text)=="object"){return window.dhx4.template(c._tpl.input,c._conf.text,true)}if(window.dhx4.s2b(b)&&typeof(c._conf.text)=="object"){return window.dhx4.template(c._tpl.option,c._conf.text,true)}return c._conf.text},getValue:function(a){return a._conf.value},getCss:function(a){return a._conf.css},setSelected:function(a,b){a.className="dhxcombo_option"+(b?" dhxcombo_option_selected":"")},isSelected:function(a){return String(a.className).indexOf("dhxcombo_option_selected")>=0},getExtraData:function(a){return{type:"option"}},replaceHtml:function(e,d){if(this.html==true){return e}if(typeof(d)=="undefined"||d==null){d={}}if(typeof(e)=="object"){var c={};for(var b in e){c[b]=(d[b]==true?e[b]:this.replaceHtml(e[b]))}}else{var c=(e||"").replace(/[\<\>\&\s]/g,function(a){switch(a){case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";case" ":return"&nbsp;"}return a})}return c}};dhtmlXCombo.prototype.modes.checkbox={image:true,html:false,image_css:"dhxcombo_checkbox dhxcombo_chbx_#state#",option_css:"dhxcombo_option_text dhxcombo_option_text_chbx",render:function(b,c){if(this.image_css_regexp==null){this.image_css_regexp=new RegExp(this.image_css.replace("#state#","\\d*"))}b._conf={value:c.value,css:"",checked:window.dhx4.s2b(c.checked)};b.className="dhxcombo_option";var a={};if(c.multicol==true){c.text.checkbox="<div class='"+String(this.image_css).replace("#state#",(b._conf.checked?"1":"0"))+"'></div>&nbsp;";a.checkbox=true;b.innerHTML="<div class='"+dhtmlXCombo.prototype.modes.option.option_css+"'></div>"}else{b.innerHTML="<div class='"+String(this.image_css).replace("#state#",(b._conf.checked?"1":"0"))+"'></div><div class='"+this.option_css+"'>&nbsp;</div>"}if(c.css!=null){b.lastChild.style.cssText+=c.css;b._conf.css=c.css}this.setText(b,c.text,a);return this},setChecked:function(b,c){b._conf.checked=window.dhx4.s2b(c);var a=String(this.image_css).replace("#state#",(b._conf.checked?"1":"0"));this._changeChbxCss(b.childNodes,a)},_changeChbxCss:function(a,b){for(var c=0;c<a.length;c++){if(a[c].tagName!=null&&a[c].className!=null&&a[c].className.match(this.image_css_regexp)!=null){a[c].className=b}else{if(a[c].childNodes.length>0){this._changeChbxCss(a[c].childNodes,b)}}}},isChecked:function(a){return(a._conf.checked==true)},getExtraData:function(a){return{type:"checkbox",checked:a._conf.checked}},optionClick:function(e,d,f){var c=true;var b=(d.target||d.srcElement);while(c==true&&b!=null&&b!=e&&b.className!=null){if(b.className.match(this.image_css_regexp)!=null){var a=[e._conf.value,!e._conf.checked];if(f.callEvent("onBeforeCheck",a)===true){this.setChecked(e,!this.isChecked(e));f.callEvent("onCheck",a)}c=false;a=null}else{b=b.parentNode}}b=f=e=null;return c},getTopImage:function(b,a){return""},topImageClick:function(a,b){return true}};dhtmlXComboExtend("checkbox","option");dhtmlXCombo.prototype.setChecked=function(a,b){this.doWithItem(a,"setChecked",b)};dhtmlXCombo.prototype.getChecked=function(a){var b=[];for(var c=0;c<this.list.childNodes.length;c++){if(this.isChecked(c)){b.push(this._getOptionProp(this.list.childNodes[c]._optId,"value",""))}}return b};dhtmlXCombo.prototype.isChecked=function(a){return this.doWithItem(a,"isChecked")};dhtmlXCombo.prototype.modes.image={image:true,html:false,image_css:"dhxcombo_image",option_css:"dhxcombo_option_text dhxcombo_option_text_image",render:function(a,b){a._conf={value:b.value,css:""};a.className="dhxcombo_option";a.innerHTML="<div class='"+this.image_css+"'></div><div class='"+this.option_css+"'>&nbsp;</div>";if(b.css!=null){a.lastChild.style.cssText+=b.css;a._conf.css=b.css}this.setText(a,b.text);this.setImage(a,b.img,b.img_dis,b.img_path,b.img_def,b.img_def_dis);return this},update:function(a,b){a._conf.value=b.value;a._conf.css=b.css;a.lastChild.style.cssText=b.css;this.setText(a,b.text);this.setImage(a,b.img,b.img_dis,b.img_path,b.img_def,b.img_def_dis)},setImage:function(c,a,e,f,d,b){if(a!=null&&a.length>0){a=f+a}else{if(d!=null&&d.length>0){a=f+d}else{a=null}}if(e!=null&&e.length>0){e=f+e}else{if(b!=null&&b.length>0){e=f+b}else{if(b==true){e=a}else{e=null}}}c._conf.img=a;c._conf.img_dis=e;c.firstChild.style.backgroundImage=(a!=null?"url("+a+")":"none")},getExtraData:function(a){return{type:"image"}},getTopImage:function(d,c){var b=(c?"img":"img_dis");if(d!=null&&d._conf[b]!=null){return"<div class='"+this.image_css+"' style='background-image:url("+d._conf[b]+");'></div>"}return""}};dhtmlXComboExtend("image","option");dhtmlXCombo.prototype.setDefaultImage=function(a,b){if(a!=null){this.conf.img_def=a}if(b!=null){this.conf.img_def_dis=b}};dhtmlXCombo.prototype.setImagePath=function(a){this.conf.img_path=a};
/*
@license
dhtmlxScheduler v.4.4.0 Stardard

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

function dtmlXMLLoaderObject(e,t,i,a){return this.xmlDoc="","undefined"!=typeof i?this.async=i:this.async=!0,this.onloadAction=e||null,this.mainObject=t||null,this.waitCall=null,this.rSeed=a||!1,this}function callerFunction(e,t){return this.handler=function(i){return i||(i=window.event),e(i,t),!0},this.handler}function getAbsoluteLeft(e){return getOffset(e).left}function getAbsoluteTop(e){return getOffset(e).top}function getOffsetSum(e){for(var t=0,i=0;e;)t+=parseInt(e.offsetTop),i+=parseInt(e.offsetLeft),
e=e.offsetParent;return{top:t,left:i}}function getOffsetRect(e){var t=e.getBoundingClientRect(),i=document.body,a=document.documentElement,r=window.pageYOffset||a.scrollTop||i.scrollTop,s=window.pageXOffset||a.scrollLeft||i.scrollLeft,n=a.clientTop||i.clientTop||0,d=a.clientLeft||i.clientLeft||0,l=t.top+r-n,o=t.left+s-d;return{top:Math.round(l),left:Math.round(o)}}function getOffset(e){return e.getBoundingClientRect?getOffsetRect(e):getOffsetSum(e)}function convertStringToBoolean(e){switch("string"==typeof e&&(e=e.toLowerCase()),
e){case"1":case"true":case"yes":case"y":case 1:case!0:return!0;default:return!1}}function getUrlSymbol(e){return-1!=e.indexOf("?")?"&":"?"}function dhtmlDragAndDropObject(){return window.dhtmlDragAndDrop?window.dhtmlDragAndDrop:(this.lastLanding=0,this.dragNode=0,this.dragStartNode=0,this.dragStartObject=0,this.tempDOMU=null,this.tempDOMM=null,this.waitDrag=0,window.dhtmlDragAndDrop=this,this)}function _dhtmlxError(e,t,i){return this.catches||(this.catches=[]),this}function dhtmlXHeir(e,t){for(var i in t)"function"==typeof t[i]&&(e[i]=t[i]);
return e}function dataProcessor(e){return this.serverProcessor=e,this.action_param="!nativeeditor_status",this.object=null,this.updatedRows=[],this.autoUpdate=!0,this.updateMode="cell",this._tMode="GET",this.post_delim="_",this._waitMode=0,this._in_progress={},this._invalid={},this.mandatoryFields=[],this.messages=[],this.styles={updated:"font-weight:bold;",inserted:"font-weight:bold;",deleted:"text-decoration : line-through;",invalid:"background-color:FFE0E0;",invalid_cell:"border-bottom:2px solid red;",
error:"color:red;",clear:"font-weight:normal;text-decoration:none;"},this.enableUTFencoding(!0),dhtmlxEventable(this),this}window.dhtmlXScheduler=window.scheduler={version:"4.4.0"},window.dhtmlx||(dhtmlx=function(e){for(var t in e)dhtmlx[t]=e[t];return dhtmlx}),dhtmlx.extend_api=function(e,t,i){var a=window[e];a&&(window[e]=function(e){var i;if(e&&"object"==typeof e&&!e.tagName){i=a.apply(this,t._init?t._init(e):arguments);for(var r in dhtmlx)t[r]&&this[t[r]](dhtmlx[r]);for(var r in e)t[r]?this[t[r]](e[r]):0===r.indexOf("on")&&this.attachEvent(r,e[r]);
}else i=a.apply(this,arguments);return t._patch&&t._patch(this),i||this},window[e].prototype=a.prototype,i&&dhtmlXHeir(window[e].prototype,i))},dhtmlxAjax={get:function(e,t){var i=new dtmlXMLLoaderObject(!0);return i.async=arguments.length<3,i.waitCall=t,i.loadXML(e),i},post:function(e,t,i){var a=new dtmlXMLLoaderObject(!0);return a.async=arguments.length<4,a.waitCall=i,a.loadXML(e,!0,t),a},getSync:function(e){return this.get(e,null,!0)},postSync:function(e,t){return this.post(e,t,null,!0)}},dtmlXMLLoaderObject.count=0,
dtmlXMLLoaderObject.prototype.waitLoadFunction=function(e){var t=!0;return this.check=function(){if(e&&e.onloadAction&&(!e.xmlDoc.readyState||4==e.xmlDoc.readyState)){if(!t)return;t=!1,dtmlXMLLoaderObject.count++,"function"==typeof e.onloadAction&&e.onloadAction(e.mainObject,null,null,null,e),e.waitCall&&(e.waitCall.call(this,e),e.waitCall=null)}},this.check},dtmlXMLLoaderObject.prototype.getXMLTopNode=function(e,t){var i;if(this.xmlDoc.responseXML){var a=this.xmlDoc.responseXML.getElementsByTagName(e);
if(0===a.length&&-1!=e.indexOf(":"))var a=this.xmlDoc.responseXML.getElementsByTagName(e.split(":")[1]);i=a[0]}else i=this.xmlDoc.documentElement;if(i)return this._retry=!1,i;if(!this._retry&&_isIE){this._retry=!0;var t=this.xmlDoc;return this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/,""),!0),this.getXMLTopNode(e,t)}return dhtmlxError.throwError("LoadXML","Incorrect XML",[t||this.xmlDoc,this.mainObject]),document.createElement("DIV")},dtmlXMLLoaderObject.prototype.loadXMLString=function(e,t){
if(_isIE)this.xmlDoc=new ActiveXObject("Microsoft.XMLDOM"),this.xmlDoc.async=this.async,this.xmlDoc.onreadystatechange=function(){},this.xmlDoc.loadXML(e);else{var i=new DOMParser;this.xmlDoc=i.parseFromString(e,"text/xml")}t||(this.onloadAction&&this.onloadAction(this.mainObject,null,null,null,this),this.waitCall&&(this.waitCall(),this.waitCall=null))},dtmlXMLLoaderObject.prototype.loadXML=function(e,t,i,a){this.rSeed&&(e+=(-1!=e.indexOf("?")?"&":"?")+"a_dhx_rSeed="+(new Date).valueOf()),this.filePath=e,
!_isIE&&window.XMLHttpRequest?this.xmlDoc=new XMLHttpRequest:this.xmlDoc=new ActiveXObject("Microsoft.XMLHTTP"),this.async&&(this.xmlDoc.onreadystatechange=new this.waitLoadFunction(this)),"string"==typeof t?this.xmlDoc.open(t,e,this.async):this.xmlDoc.open(t?"POST":"GET",e,this.async),a?(this.xmlDoc.setRequestHeader("User-Agent","dhtmlxRPC v0.1 ("+navigator.userAgent+")"),this.xmlDoc.setRequestHeader("Content-type","text/xml")):t&&this.xmlDoc.setRequestHeader("Content-type","application/x-www-form-urlencoded"),
this.xmlDoc.setRequestHeader("X-Requested-With","XMLHttpRequest"),this.xmlDoc.send(i),this.async||new this.waitLoadFunction(this)()},dtmlXMLLoaderObject.prototype.destructor=function(){return this._filterXPath=null,this._getAllNamedChilds=null,this._retry=null,this.async=null,this.rSeed=null,this.filePath=null,this.onloadAction=null,this.mainObject=null,this.xmlDoc=null,this.doXPath=null,this.doXPathOpera=null,this.doXSLTransToObject=null,this.doXSLTransToString=null,this.loadXML=null,this.loadXMLString=null,
this.doSerialization=null,this.xmlNodeToJSON=null,this.getXMLTopNode=null,this.setXSLParamValue=null,null},dtmlXMLLoaderObject.prototype.xmlNodeToJSON=function(e){for(var t={},i=0;i<e.attributes.length;i++)t[e.attributes[i].name]=e.attributes[i].value;t._tagvalue=e.firstChild?e.firstChild.nodeValue:"";for(var i=0;i<e.childNodes.length;i++){var a=e.childNodes[i].tagName;a&&(t[a]||(t[a]=[]),t[a].push(this.xmlNodeToJSON(e.childNodes[i])))}return t},dhtmlDragAndDropObject.prototype.removeDraggableItem=function(e){
e.onmousedown=null,e.dragStarter=null,e.dragLanding=null},dhtmlDragAndDropObject.prototype.addDraggableItem=function(e,t){e.onmousedown=this.preCreateDragCopy,e.dragStarter=t,this.addDragLanding(e,t)},dhtmlDragAndDropObject.prototype.addDragLanding=function(e,t){e.dragLanding=t},dhtmlDragAndDropObject.prototype.preCreateDragCopy=function(e){return!e&&!window.event||2!=(e||event).button?window.dhtmlDragAndDrop.waitDrag?(window.dhtmlDragAndDrop.waitDrag=0,document.body.onmouseup=window.dhtmlDragAndDrop.tempDOMU,
document.body.onmousemove=window.dhtmlDragAndDrop.tempDOMM,!1):(window.dhtmlDragAndDrop.dragNode&&window.dhtmlDragAndDrop.stopDrag(e),window.dhtmlDragAndDrop.waitDrag=1,window.dhtmlDragAndDrop.tempDOMU=document.body.onmouseup,window.dhtmlDragAndDrop.tempDOMM=document.body.onmousemove,window.dhtmlDragAndDrop.dragStartNode=this,window.dhtmlDragAndDrop.dragStartObject=this.dragStarter,document.body.onmouseup=window.dhtmlDragAndDrop.preCreateDragCopy,document.body.onmousemove=window.dhtmlDragAndDrop.callDrag,
window.dhtmlDragAndDrop.downtime=(new Date).valueOf(),e&&e.preventDefault?(e.preventDefault(),!1):!1):void 0},dhtmlDragAndDropObject.prototype.callDrag=function(e){e||(e=window.event);var t=window.dhtmlDragAndDrop;if(!((new Date).valueOf()-t.downtime<100)){if(!t.dragNode){if(!t.waitDrag)return t.stopDrag(e,!0);if(t.dragNode=t.dragStartObject._createDragNode(t.dragStartNode,e),!t.dragNode)return t.stopDrag();t.dragNode.onselectstart=function(){return!1},t.gldragNode=t.dragNode,document.body.appendChild(t.dragNode),
document.body.onmouseup=t.stopDrag,t.waitDrag=0,t.dragNode.pWindow=window,t.initFrameRoute()}if(t.dragNode.parentNode!=window.document.body&&t.gldragNode){var i=t.gldragNode;t.gldragNode.old&&(i=t.gldragNode.old),i.parentNode.removeChild(i);var a=t.dragNode.pWindow;if(i.pWindow&&i.pWindow.dhtmlDragAndDrop.lastLanding&&i.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(i.pWindow.dhtmlDragAndDrop.lastLanding),_isIE){var r=document.createElement("Div");r.innerHTML=t.dragNode.outerHTML,t.dragNode=r.childNodes[0];
}else t.dragNode=t.dragNode.cloneNode(!0);t.dragNode.pWindow=window,t.gldragNode.old=t.dragNode,document.body.appendChild(t.dragNode),a.dhtmlDragAndDrop.dragNode=t.dragNode}t.dragNode.style.left=e.clientX+15+(t.fx?-1*t.fx:0)+(document.body.scrollLeft||document.documentElement.scrollLeft)+"px",t.dragNode.style.top=e.clientY+3+(t.fy?-1*t.fy:0)+(document.body.scrollTop||document.documentElement.scrollTop)+"px";var s;s=e.srcElement?e.srcElement:e.target,t.checkLanding(s,e)}},dhtmlDragAndDropObject.prototype.calculateFramePosition=function(e){
if(window.name){for(var t=parent.frames[window.name].frameElement.offsetParent,i=0,a=0;t;)i+=t.offsetLeft,a+=t.offsetTop,t=t.offsetParent;if(parent.dhtmlDragAndDrop){var r=parent.dhtmlDragAndDrop.calculateFramePosition(1);i+=1*r.split("_")[0],a+=1*r.split("_")[1]}if(e)return i+"_"+a;this.fx=i,this.fy=a}return"0_0"},dhtmlDragAndDropObject.prototype.checkLanding=function(e,t){e&&e.dragLanding?(this.lastLanding&&this.lastLanding.dragLanding._dragOut(this.lastLanding),this.lastLanding=e,this.lastLanding=this.lastLanding.dragLanding._dragIn(this.lastLanding,this.dragStartNode,t.clientX,t.clientY,t),
this.lastLanding_scr=_isIE?t.srcElement:t.target):e&&"BODY"!=e.tagName?this.checkLanding(e.parentNode,t):(this.lastLanding&&this.lastLanding.dragLanding._dragOut(this.lastLanding,t.clientX,t.clientY,t),this.lastLanding=0,this._onNotFound&&this._onNotFound())},dhtmlDragAndDropObject.prototype.stopDrag=function(e,t){var i=window.dhtmlDragAndDrop;if(!t){i.stopFrameRoute();var a=i.lastLanding;i.lastLanding=null,a&&a.dragLanding._drag(i.dragStartNode,i.dragStartObject,a,_isIE?event.srcElement:e.target);
}i.lastLanding=null,i.dragNode&&i.dragNode.parentNode==document.body&&i.dragNode.parentNode.removeChild(i.dragNode),i.dragNode=0,i.gldragNode=0,i.fx=0,i.fy=0,i.dragStartNode=0,i.dragStartObject=0,document.body.onmouseup=i.tempDOMU,document.body.onmousemove=i.tempDOMM,i.tempDOMU=null,i.tempDOMM=null,i.waitDrag=0},dhtmlDragAndDropObject.prototype.stopFrameRoute=function(e){e&&window.dhtmlDragAndDrop.stopDrag(1,1);for(var t=0;t<window.frames.length;t++)try{window.frames[t]!=e&&window.frames[t].dhtmlDragAndDrop&&window.frames[t].dhtmlDragAndDrop.stopFrameRoute(window);
}catch(i){}try{parent.dhtmlDragAndDrop&&parent!=window&&parent!=e&&parent.dhtmlDragAndDrop.stopFrameRoute(window)}catch(i){}},dhtmlDragAndDropObject.prototype.initFrameRoute=function(e,t){e&&(window.dhtmlDragAndDrop.preCreateDragCopy(),window.dhtmlDragAndDrop.dragStartNode=e.dhtmlDragAndDrop.dragStartNode,window.dhtmlDragAndDrop.dragStartObject=e.dhtmlDragAndDrop.dragStartObject,window.dhtmlDragAndDrop.dragNode=e.dhtmlDragAndDrop.dragNode,window.dhtmlDragAndDrop.gldragNode=e.dhtmlDragAndDrop.dragNode,
window.document.body.onmouseup=window.dhtmlDragAndDrop.stopDrag,window.waitDrag=0,!_isIE&&t&&(!_isFF||_FFrv<1.8)&&window.dhtmlDragAndDrop.calculateFramePosition());try{parent.dhtmlDragAndDrop&&parent!=window&&parent!=e&&parent.dhtmlDragAndDrop.initFrameRoute(window)}catch(i){}for(var a=0;a<window.frames.length;a++)try{window.frames[a]!=e&&window.frames[a].dhtmlDragAndDrop&&window.frames[a].dhtmlDragAndDrop.initFrameRoute(window,!e||t?1:0)}catch(i){}},_isFF=!1,_isIE=!1,_isOpera=!1,_isKHTML=!1,_isMacOS=!1,
_isChrome=!1,_FFrv=!1,_KHTMLrv=!1,_OperaRv=!1,-1!=navigator.userAgent.indexOf("Macintosh")&&(_isMacOS=!0),navigator.userAgent.toLowerCase().indexOf("chrome")>-1&&(_isChrome=!0),-1!=navigator.userAgent.indexOf("Safari")||-1!=navigator.userAgent.indexOf("Konqueror")?(_KHTMLrv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari")+7,5)),_KHTMLrv>525?(_isFF=!0,_FFrv=1.9):_isKHTML=!0):-1!=navigator.userAgent.indexOf("Opera")?(_isOpera=!0,_OperaRv=parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera")+6,3))):-1!=navigator.appName.indexOf("Microsoft")?(_isIE=!0,
-1==navigator.appVersion.indexOf("MSIE 8.0")&&-1==navigator.appVersion.indexOf("MSIE 9.0")&&-1==navigator.appVersion.indexOf("MSIE 10.0")||"BackCompat"==document.compatMode||(_isIE=8)):"Netscape"==navigator.appName&&-1!=navigator.userAgent.indexOf("Trident")?_isIE=8:(_isFF=!0,_FFrv=parseFloat(navigator.userAgent.split("rv:")[1])),dtmlXMLLoaderObject.prototype.doXPath=function(e,t,i,a){if(_isKHTML||!_isIE&&!window.XPathResult)return this.doXPathOpera(e,t);if(_isIE)return t||(t=this.xmlDoc.nodeName?this.xmlDoc:this.xmlDoc.responseXML),
t||dhtmlxError.throwError("LoadXML","Incorrect XML",[t||this.xmlDoc,this.mainObject]),i&&t.setProperty("SelectionNamespaces","xmlns:xsl='"+i+"'"),"single"==a?t.selectSingleNode(e):t.selectNodes(e)||new Array(0);var r=t;t||(t=this.xmlDoc.nodeName?this.xmlDoc:this.xmlDoc.responseXML),t||dhtmlxError.throwError("LoadXML","Incorrect XML",[t||this.xmlDoc,this.mainObject]),-1!=t.nodeName.indexOf("document")?r=t:(r=t,t=t.ownerDocument);var s=XPathResult.ANY_TYPE;"single"==a&&(s=XPathResult.FIRST_ORDERED_NODE_TYPE);
var n=[],d=t.evaluate(e,r,function(e){return i},s,null);if(s==XPathResult.FIRST_ORDERED_NODE_TYPE)return d.singleNodeValue;for(var l=d.iterateNext();l;)n[n.length]=l,l=d.iterateNext();return n},_dhtmlxError.prototype.catchError=function(e,t){this.catches[e]=t},_dhtmlxError.prototype.throwError=function(e,t,i){return this.catches[e]?this.catches[e](e,t,i):this.catches.ALL?this.catches.ALL(e,t,i):(window.alert("Error type: "+arguments[0]+"\nDescription: "+arguments[1]),null)},window.dhtmlxError=new _dhtmlxError,
dtmlXMLLoaderObject.prototype.doXPathOpera=function(e,t){var i=e.replace(/[\/]+/gi,"/").split("/"),a=null,r=1;if(!i.length)return[];if("."==i[0])a=[t];else{if(""!==i[0])return[];a=(this.xmlDoc.responseXML||this.xmlDoc).getElementsByTagName(i[r].replace(/\[[^\]]*\]/g,"")),r++}for(r;r<i.length;r++)a=this._getAllNamedChilds(a,i[r]);return-1!=i[r-1].indexOf("[")&&(a=this._filterXPath(a,i[r-1])),a},dtmlXMLLoaderObject.prototype._filterXPath=function(e,t){for(var i=[],t=t.replace(/[^\[]*\[\@/g,"").replace(/[\[\]\@]*/g,""),a=0;a<e.length;a++)e[a].getAttribute(t)&&(i[i.length]=e[a]);
return i},dtmlXMLLoaderObject.prototype._getAllNamedChilds=function(e,t){var i=[];_isKHTML&&(t=t.toUpperCase());for(var a=0;a<e.length;a++)for(var r=0;r<e[a].childNodes.length;r++)_isKHTML?e[a].childNodes[r].tagName&&e[a].childNodes[r].tagName.toUpperCase()==t&&(i[i.length]=e[a].childNodes[r]):e[a].childNodes[r].tagName==t&&(i[i.length]=e[a].childNodes[r]);return i},"undefined"==typeof window.dhtmlxEvent&&(window.dhtmlxEvent=function(e,t,i){e.addEventListener?e.addEventListener(t,i,!1):e.attachEvent&&e.attachEvent("on"+t,i);
}),dtmlXMLLoaderObject.prototype.xslDoc=null,dtmlXMLLoaderObject.prototype.setXSLParamValue=function(e,t,i){i||(i=this.xslDoc),i.responseXML&&(i=i.responseXML);var a=this.doXPath("/xsl:stylesheet/xsl:variable[@name='"+e+"']",i,"http://www.w3.org/1999/XSL/Transform","single");a&&(a.firstChild.nodeValue=t)},dtmlXMLLoaderObject.prototype.doXSLTransToObject=function(e,t){e||(e=this.xslDoc),e.responseXML&&(e=e.responseXML),t||(t=this.xmlDoc),t.responseXML&&(t=t.responseXML);var i;if(_isIE){i=new ActiveXObject("Msxml2.DOMDocument.3.0");
try{t.transformNodeToObject(e,i)}catch(a){i=t.transformNode(e)}}else this.XSLProcessor||(this.XSLProcessor=new XSLTProcessor,this.XSLProcessor.importStylesheet(e)),i=this.XSLProcessor.transformToDocument(t);return i},dtmlXMLLoaderObject.prototype.doXSLTransToString=function(e,t){var i=this.doXSLTransToObject(e,t);return"string"==typeof i?i:this.doSerialization(i)},dtmlXMLLoaderObject.prototype.doSerialization=function(e){if(e||(e=this.xmlDoc),e.responseXML&&(e=e.responseXML),_isIE)return e.xml;var t=new XMLSerializer;
return t.serializeToString(e)},dhtmlxEventable=function(obj){obj.attachEvent=function(e,t,i){return e="ev_"+e.toLowerCase(),this[e]||(this[e]=new this.eventCatcher(i||this)),e+":"+this[e].addEvent(t)},obj.callEvent=function(e,t){return e="ev_"+e.toLowerCase(),this[e]?this[e].apply(this,t):!0},obj.checkEvent=function(e){return!!this["ev_"+e.toLowerCase()]},obj.eventCatcher=function(obj){var dhx_catch=[],z=function(){for(var e=!0,t=0;t<dhx_catch.length;t++)if(dhx_catch[t]){var i=dhx_catch[t].apply(obj,arguments);
e=e&&i}return e};return z.addEvent=function(ev){return"function"!=typeof ev&&(ev=eval(ev)),ev?dhx_catch.push(ev)-1:!1},z.removeEvent=function(e){dhx_catch[e]=null},z},obj.detachEvent=function(e){if(e){var t=e.split(":");this[t[0]].removeEvent(t[1])}},obj.detachAllEvents=function(){for(var e in this)0===e.indexOf("ev_")&&(this.detachEvent(e),this[e]=null)},obj=null},scheduler.event=window.dhtmlxEvent,scheduler.eventRemove=function(e,t,i){e.removeEventListener?e.removeEventListener(t,i,!1):e.detachEvent&&e.detachEvent("on"+t,i);
},function(){function e(e){var t=!1,i=!1;if(window.getComputedStyle){var a=window.getComputedStyle(e,null);t=a.display,i=a.visibility}else e.currentStyle&&(t=e.currentStyle.display,i=e.currentStyle.visibility);var r=!1,s=scheduler._locate_css({target:e},"dhx_form_repeat",!1);return s&&(r=!("0px"!=s.style.height)),r=r||!e.offsetHeight,"none"!=t&&"hidden"!=i&&!r}function t(e){return!isNaN(e.getAttribute("tabindex"))&&1*e.getAttribute("tabindex")>=0}function i(e){var t={a:!0,area:!0};return t[e.nodeName.loLowerCase()]?!!e.getAttribute("href"):!0;
}function a(e){var t={input:!0,select:!0,textarea:!0,button:!0,object:!0};return t[e.nodeName.toLowerCase()]?!e.hasAttribute("disabled"):!0}scheduler._getFocusableNodes=function(r){for(var s=r.querySelectorAll(["a[href]","area[href]","input","select","textarea","button","iframe","object","embed","[tabindex]","[contenteditable]"].join(", ")),n=Array.prototype.slice.call(s,0),d=0;d<n.length;d++){var l=n[d],o=(t(l)||a(l)||i(l))&&e(l);o||(n.splice(d,1),d--)}return n}}(),scheduler._trim=function(e){var t=String.prototype.trim||function(){
return this.replace(/^\s+|\s+$/g,"")};return t.apply(e)},window.dhtmlx||(window.dhtmlx={}),function(){function e(e,t){setTimeout(function(){if(e.box){var a=e.callback;i(!1),e.box.parentNode.removeChild(e.box),dhtmlx.callEvent("onAfterMessagePopup",[e.box]),c=e.box=null,a&&a(t)}},1)}function t(t){if(c){t=t||event;var i=t.which||event.keyCode,a=!1;if(dhtmlx.message.keyboard){if(13==i||32==i){var r=t.target||t.srcElement;scheduler._getClassName(r).indexOf("dhtmlx_popup_button")>-1&&r.click?r.click():(e(c,!0),
a=!0)}27==i&&(e(c,!1),a=!0)}if(a)return t.preventDefault&&t.preventDefault(),!(t.cancelBubble=!0)}else;}function i(e){i.cover||(i.cover=document.createElement("DIV"),i.cover.onkeydown=t,i.cover.className="dhx_modal_cover",document.body.appendChild(i.cover));document.body.scrollHeight;i.cover.style.display=e?"inline-block":"none"}function a(e,t,i){var a=scheduler._waiAria.messageButtonAttrString(e),r=i?i:e||"",s="dhtmlx_"+r.toLowerCase().replace(/ /g,"_")+"_button";return"<div "+a+"class='dhtmlx_popup_button "+s+"' result='"+t+"' ><div>"+e+"</div></div>";
}function r(e){u.area||(u.area=document.createElement("DIV"),u.area.className="dhtmlx_message_area",u.area.style[u.position]="5px",document.body.appendChild(u.area)),u.hide(e.id);var t=document.createElement("DIV");return t.innerHTML="<div>"+e.text+"</div>",t.className="dhtmlx-info dhtmlx-"+e.type,t.onclick=function(){u.hide(e.id),e=null},scheduler._waiAria.messageInfoAttr(t),"bottom"==u.position&&u.area.firstChild?u.area.insertBefore(t,u.area.firstChild):u.area.appendChild(t),e.expire>0&&(u.timers[e.id]=window.setTimeout(function(){
u.hide(e.id)},e.expire)),u.pull[e.id]=t,t=null,e.id}function s(t,i,r){var s=document.createElement("DIV");s.className=" dhtmlx_modal_box dhtmlx-"+t.type,s.setAttribute("dhxbox",1);var n=scheduler.uid();scheduler._waiAria.messageModalAttr(s,n);var d="",l=!1;if(t.width&&(s.style.width=t.width),t.height&&(s.style.height=t.height),t.title&&(d+='<div class="dhtmlx_popup_title" id="'+n+'">'+t.title+"</div>",l=!0),d+='<div class="dhtmlx_popup_text" '+(l?"":' id="'+n+'" ')+"><span>"+(t.content?"":t.text)+'</span></div><div  class="dhtmlx_popup_controls">',
i){var o=t.ok||scheduler.locale.labels.message_ok;void 0===o&&(o="OK"),d+=a(o,!0,"ok")}if(r){var h=t.cancel||scheduler.locale.labels.message_cancel;void 0===h&&(h="Cancel"),d+=a(h,!1,"cancel")}if(t.buttons)for(var _=0;_<t.buttons.length;_++)d+=a(t.buttons[_],_);if(d+="</div>",s.innerHTML=d,t.content){var u=t.content;"string"==typeof u&&(u=document.getElementById(u)),"none"==u.style.display&&(u.style.display=""),s.childNodes[t.title?1:0].appendChild(u)}return s.onclick=function(i){i=i||event;var a=i.target||i.srcElement,r=scheduler._getClassName(a);
if(r||(a=a.parentNode),r=scheduler._getClassName(a),"dhtmlx_popup_button"==r.split(" ")[0]){var s=a.getAttribute("result");s="true"==s||("false"==s?!1:s),e(t,s)}},t.box=s,c=t,s}function n(e,a,r){var n=e.tagName?e:s(e,a,r);e.hidden||i(!0),document.body.appendChild(n);var d=Math.abs(Math.floor(((window.innerWidth||document.documentElement.offsetWidth)-n.offsetWidth)/2)),l=Math.abs(Math.floor(((window.innerHeight||document.documentElement.offsetHeight)-n.offsetHeight)/2));return"top"==e.position?n.style.top="-3px":n.style.top=l+"px",
n.style.left=d+"px",n.onkeydown=t,dhtmlx.modalbox.focus(n),e.hidden&&dhtmlx.modalbox.hide(n),dhtmlx.callEvent("onMessagePopup",[n]),n}function d(e){return n(e,!0,!1)}function l(e){return n(e,!0,!0)}function o(e){return n(e)}function h(e,t,i){return"object"!=typeof e&&("function"==typeof t&&(i=t,t=""),e={text:e,type:t,callback:i}),e}function _(e,t,i,a){return"object"!=typeof e&&(e={text:e,type:t,expire:i,id:a}),e.id=e.id||u.uid(),e.expire=e.expire||u.expire,e}var c=null;document.attachEvent?document.attachEvent("onkeydown",t):document.addEventListener("keydown",t,!0),
dhtmlx.alert=function(){var e=h.apply(this,arguments);return e.type=e.type||"confirm",d(e)},dhtmlx.confirm=function(){var e=h.apply(this,arguments);return e.type=e.type||"alert",l(e)},dhtmlx.modalbox=function(){var e=h.apply(this,arguments);return e.type=e.type||"alert",o(e)},dhtmlx.modalbox.hide=function(e){for(;e&&e.getAttribute&&!e.getAttribute("dhxbox");)e=e.parentNode;e&&(e.parentNode.removeChild(e),i(!1))},dhtmlx.modalbox.focus=function(e){setTimeout(function(){var t=scheduler._getFocusableNodes(e);
t.length&&t[0].focus&&t[0].focus()},1)};var u=dhtmlx.message=function(e,t,i,a){e=_.apply(this,arguments),e.type=e.type||"info";var s=e.type.split("-")[0];switch(s){case"alert":return d(e);case"confirm":return l(e);case"modalbox":return o(e);default:return r(e)}};u.seed=(new Date).valueOf(),u.uid=function(){return u.seed++},u.expire=4e3,u.keyboard=!0,u.position="top",u.pull={},u.timers={},u.hideAll=function(){for(var e in u.pull)u.hide(e)},u.hide=function(e){var t=u.pull[e];t&&t.parentNode&&(window.setTimeout(function(){
t.parentNode.removeChild(t),t=null},2e3),t.className+=" hidden",u.timers[e]&&window.clearTimeout(u.timers[e]),delete u.pull[e])}}(),dhtmlx.attachEvent||dhtmlxEventable(dhtmlx),dataProcessor.prototype={setTransactionMode:function(e,t){this._tMode=e,this._tSend=t,"REST"==e&&(this._tSend=!1,this._endnm=!0)},escape:function(e){return this._utf?encodeURIComponent(e):escape(e)},enableUTFencoding:function(e){this._utf=convertStringToBoolean(e)},setDataColumns:function(e){this._columns="string"==typeof e?e.split(","):e;
},getSyncState:function(){return!this.updatedRows.length},enableDataNames:function(e){this._endnm=convertStringToBoolean(e)},enablePartialDataSend:function(e){this._changed=convertStringToBoolean(e)},setUpdateMode:function(e,t){this.autoUpdate="cell"==e,this.updateMode=e,this.dnd=t},ignore:function(e,t){this._silent_mode=!0,e.call(t||window),this._silent_mode=!1},setUpdated:function(e,t,i){if(!this._silent_mode){var a=this.findRow(e);i=i||"updated";var r=this.obj.getUserData(e,this.action_param);r&&"updated"==i&&(i=r),
t?(this.set_invalid(e,!1),this.updatedRows[a]=e,this.obj.setUserData(e,this.action_param,i),this._in_progress[e]&&(this._in_progress[e]="wait")):this.is_invalid(e)||(this.updatedRows.splice(a,1),this.obj.setUserData(e,this.action_param,"")),t||this._clearUpdateFlag(e),this.markRow(e,t,i),t&&this.autoUpdate&&this.sendData(e)}},_clearUpdateFlag:function(e){},markRow:function(e,t,i){var a="",r=this.is_invalid(e);if(r&&(a=this.styles[r],t=!0),this.callEvent("onRowMark",[e,t,i,r])&&(a=this.styles[t?i:"clear"]+a,
this.obj[this._methods[0]](e,a),r&&r.details)){a+=this.styles[r+"_cell"];for(var s=0;s<r.details.length;s++)r.details[s]&&this.obj[this._methods[1]](e,s,a)}},getState:function(e){return this.obj.getUserData(e,this.action_param)},is_invalid:function(e){return this._invalid[e]},set_invalid:function(e,t,i){i&&(t={value:t,details:i,toString:function(){return this.value.toString()}}),this._invalid[e]=t},checkBeforeUpdate:function(e){return!0},sendData:function(e){return!this._waitMode||"tree"!=this.obj.mytype&&!this.obj._h2?(this.obj.editStop&&this.obj.editStop(),
"undefined"==typeof e||this._tSend?this.sendAllData():this._in_progress[e]?!1:(this.messages=[],!this.checkBeforeUpdate(e)&&this.callEvent("onValidationError",[e,this.messages])?!1:void this._beforeSendData(this._getRowData(e),e))):void 0},_beforeSendData:function(e,t){return this.callEvent("onBeforeUpdate",[t,this.getState(t),e])?void this._sendData(e,t):!1},serialize:function(e,t){if("string"==typeof e)return e;if("undefined"!=typeof t)return this.serialize_one(e,"");var i=[],a=[];for(var r in e)e.hasOwnProperty(r)&&(i.push(this.serialize_one(e[r],r+this.post_delim)),
a.push(r));return i.push("ids="+this.escape(a.join(","))),dhtmlx.security_key&&i.push("dhx_security="+dhtmlx.security_key),i.join("&")},serialize_one:function(e,t){if("string"==typeof e)return e;var i=[];for(var a in e)if(e.hasOwnProperty(a)){if(("id"==a||a==this.action_param)&&"REST"==this._tMode)continue;i.push(this.escape((t||"")+a)+"="+this.escape(e[a]))}return i.join("&")},_sendData:function(e,t){if(e){if(!this.callEvent("onBeforeDataSending",t?[t,this.getState(t),e]:[null,null,e]))return!1;t&&(this._in_progress[t]=(new Date).valueOf());
var i=new dtmlXMLLoaderObject(function(i,a,r,s,n){var d=[];if(t)d.push(t);else if(e)for(var l in e)d.push(l);return i.afterUpdate(i,n,d)},this,!0),a=this.serverProcessor+(this._user?getUrlSymbol(this.serverProcessor)+["dhx_user="+this._user,"dhx_version="+this.obj.getUserData(0,"version")].join("&"):"");if("GET"==this._tMode)i.loadXML(a+(-1!=a.indexOf("?")?"&":"?")+this.serialize(e,t));else if("POST"==this._tMode)i.loadXML(a,!0,this.serialize(e,t));else if("REST"==this._tMode){var r=this.getState(t),s=a.replace(/(\&|\?)editing\=true/,"");
"inserted"==r?i.loadXML(s+t,"POST",this.serialize(e,t)):"deleted"==r?i.loadXML(s+t,"DELETE",""):i.loadXML(s+t,"PUT",this.serialize(e,t))}this._waitMode++}},sendAllData:function(){if(this.updatedRows.length){this.messages=[];for(var e=!0,t=0;t<this.updatedRows.length;t++)e&=this.checkBeforeUpdate(this.updatedRows[t]);if(!e&&!this.callEvent("onValidationError",["",this.messages]))return!1;if(this._tSend)this._sendData(this._getAllData());else for(var t=0;t<this.updatedRows.length;t++)if(!this._in_progress[this.updatedRows[t]]){
if(this.is_invalid(this.updatedRows[t]))continue;if(this._beforeSendData(this._getRowData(this.updatedRows[t]),this.updatedRows[t]),this._waitMode&&("tree"==this.obj.mytype||this.obj._h2))return}}},_getAllData:function(e){for(var t={},i=!1,a=0;a<this.updatedRows.length;a++){var r=this.updatedRows[a];this._in_progress[r]||this.is_invalid(r)||this.callEvent("onBeforeUpdate",[r,this.getState(r),this._getRowData(r)])&&(t[r]=this._getRowData(r,r+this.post_delim),i=!0,this._in_progress[r]=(new Date).valueOf());
}return i?t:null},setVerificator:function(e,t){this.mandatoryFields[e]=t||function(e){return""!==e}},clearVerificator:function(e){this.mandatoryFields[e]=!1},findRow:function(e){var t=0;for(t=0;t<this.updatedRows.length&&e!=this.updatedRows[t];t++);return t},defineAction:function(e,t){this._uActions||(this._uActions=[]),this._uActions[e]=t},afterUpdateCallback:function(e,t,i,a){var r=e,s="error"!=i&&"invalid"!=i;if(s||this.set_invalid(e,i),this._uActions&&this._uActions[i]&&!this._uActions[i](a))return delete this._in_progress[r];
"wait"!=this._in_progress[r]&&this.setUpdated(e,!1);var n=e;switch(i){case"inserted":case"insert":t!=e&&(this.obj[this._methods[2]](e,t),e=t);break;case"delete":case"deleted":return this.obj.setUserData(e,this.action_param,"true_deleted"),this.obj[this._methods[3]](e,t),delete this._in_progress[r],this.callEvent("onAfterUpdate",[e,i,t,a])}"wait"!=this._in_progress[r]?(s&&this.obj.setUserData(e,this.action_param,""),delete this._in_progress[r]):(delete this._in_progress[r],this.setUpdated(t,!0,this.obj.getUserData(e,this.action_param))),
this.callEvent("onAfterUpdate",[n,i,t,a])},afterUpdate:function(e,t,i){if(window.JSON)try{var a=JSON.parse(t.xmlDoc.responseText),r=a.action||this.getState(i)||"updated",s=a.sid||i[0],n=a.tid||i[0];return e.afterUpdateCallback(s,n,r,a),void e.finalizeUpdate()}catch(d){}if(t.getXMLTopNode("data"),!t.xmlDoc.responseXML)return this.obj&&this.obj.callEvent&&this.obj.callEvent("onSaveError",[i,t.xmlDoc]),this.cleanUpdate(i);var l=t.doXPath("//data/action");if(!l.length)return this.cleanUpdate(i);for(var o=0;o<l.length;o++){
var h=l[o],r=h.getAttribute("type"),s=h.getAttribute("sid"),n=h.getAttribute("tid");e.afterUpdateCallback(s,n,r,h)}e.finalizeUpdate()},cleanUpdate:function(e){if(e)for(var t=0;t<e.length;t++)delete this._in_progress[e[t]]},finalizeUpdate:function(){this._waitMode&&this._waitMode--,("tree"==this.obj.mytype||this.obj._h2)&&this.updatedRows.length&&this.sendData(),this.callEvent("onAfterUpdateFinish",[]),this.updatedRows.length||this.callEvent("onFullSync",[])},init:function(e){this.obj=e,this.obj._dp_init&&this.obj._dp_init(this);
},setOnAfterUpdate:function(e){this.attachEvent("onAfterUpdate",e)},enableDebug:function(e){},setOnBeforeUpdateHandler:function(e){this.attachEvent("onBeforeDataSending",e)},setAutoUpdate:function(e,t){e=e||2e3,this._user=t||(new Date).valueOf(),this._need_update=!1,this._loader=null,this._update_busy=!1,this.attachEvent("onAfterUpdate",function(e,t,i,a){this.afterAutoUpdate(e,t,i,a)}),this.attachEvent("onFullSync",function(){this.fullSync()});var i=this;window.setInterval(function(){i.loadUpdate();
},e)},afterAutoUpdate:function(e,t,i,a){return"collision"==t?(this._need_update=!0,!1):!0},fullSync:function(){return this._need_update&&(this._need_update=!1,this.loadUpdate()),!0},getUpdates:function(e,t){return this._update_busy?!1:(this._update_busy=!0,this._loader=this._loader||new dtmlXMLLoaderObject(!0),this._loader.async=!0,this._loader.waitCall=t,void this._loader.loadXML(e))},_v:function(e){return e.firstChild?e.firstChild.nodeValue:""},_a:function(e){for(var t=[],i=0;i<e.length;i++)t[i]=this._v(e[i]);
return t},loadUpdate:function(){var e=this,t=this.obj.getUserData(0,"version"),i=this.serverProcessor+getUrlSymbol(this.serverProcessor)+["dhx_user="+this._user,"dhx_version="+t].join("&");i=i.replace("editing=true&",""),this.getUpdates(i,function(){var t;try{t=e._loader.doXPath("//userdata")}catch(i){return void(e._update_busy=!1)}e.obj.setUserData(0,"version",e._v(t[0]));var a=e._loader.doXPath("//update");if(a.length){e._silent_mode=!0;for(var r=0;r<a.length;r++){var s=a[r].getAttribute("status"),n=a[r].getAttribute("id"),d=a[r].getAttribute("parent");
switch(s){case"inserted":e.callEvent("insertCallback",[a[r],n,d]);break;case"updated":e.callEvent("updateCallback",[a[r],n,d]);break;case"deleted":e.callEvent("deleteCallback",[a[r],n,d])}}e._silent_mode=!1}e._update_busy=!1,e=null})}},window.dataProcessor&&!dataProcessor.prototype.init_original&&(dataProcessor.prototype.init_original=dataProcessor.prototype.init,dataProcessor.prototype.init=function(e){this.init_original(e),e._dataprocessor=this,this.setTransactionMode("POST",!0),this.serverProcessor+=(-1!=this.serverProcessor.indexOf("?")?"&":"?")+"editing=true";
}),dhtmlxError.catchError("LoadXML",function(e,t,i){var a=i[0].responseText;switch(scheduler.config.ajax_error){case"alert":window.alert(a);break;case"console":window.console.log(a)}}),function(){function e(e){return(e+"").replace(a," ").replace(r," ")}function t(e){return(e+"").replace(s,"&#39;")}function i(){return!scheduler.config.wai_aria_attributes}var a=new RegExp("<(?:.|\n)*?>","gm"),r=new RegExp(" +","gm"),s=new RegExp("'","gm");scheduler._waiAria={getAttributeString:function(i){var a=[" "];
for(var r in i)if("function"!=typeof i[r]&&"object"!=typeof i[r]){var s=t(e(i[r]));a.push(r+"='"+s+"'")}return a.push(" "),a.join(" ")},setAttributes:function(t,i){for(var a in i)t.setAttribute(a,e(i[a]));return t},labelAttr:function(e,t){return this.setAttributes(e,{"aria-label":t})},label:function(e){return scheduler._waiAria.getAttributeString({"aria-label":e})},hourScaleAttr:function(e,t){this.labelAttr(e,t)},monthCellAttr:function(e,t){this.labelAttr(e,scheduler.templates.day_date(t))},navBarDateAttr:function(e,t){
this.labelAttr(e,t)},dayHeaderAttr:function(e,t){this.labelAttr(e,t)},dayColumnAttr:function(e,t){this.dayHeaderAttr(e,scheduler.templates.day_date(t))},headerButtonsAttributes:function(e,t){return this.setAttributes(e,{role:"button","aria-label":t})},headerToggleState:function(e,t){return this.setAttributes(e,{"aria-pressed":t?"true":"false"})},getHeaderCellAttr:function(e){return scheduler._waiAria.getAttributeString({"aria-label":e})},eventAttr:function(e,t){!scheduler.config.readonly&&scheduler.config.drag_move&&(e.id!=scheduler.getState().drag_id?t.setAttribute("aria-grabbed",!1):t.setAttribute("aria-grabbed",!0)),
this._eventCommonAttr(e,t)},_eventCommonAttr:function(t,i){i.setAttribute("aria-label",e(scheduler.templates.tooltip_text(t.start_date,t.end_date,t))),scheduler.config.readonly&&i.setAttribute("aria-readonly",!0),t.$dataprocessor_class&&i.setAttribute("aria-busy",!0),i.setAttribute("aria-selected",scheduler.getState().select_id==t.id?"true":"false")},setEventBarAttr:function(e,t){this._eventCommonAttr(e,t),!scheduler.config.readonly&&scheduler.config.drag_move&&(e.id!=scheduler.getState().drag_id?t.setAttribute("aria-grabbed",!1):t.setAttribute("aria-grabbed",!0));
},_getAttributes:function(e,t){var i={setAttribute:function(e,t){this[e]=t}};return e.apply(this,[t,i]),i},eventBarAttrString:function(e){return this.getAttributeString(this._getAttributes(this.setEventBarAttr,e))},agendaHeadAttrString:function(){return this.getAttributeString({role:"row"})},agendaHeadDateString:function(e){return this.getAttributeString({role:"columnheader","aria-label":e})},agendaHeadDescriptionString:function(e){return this.agendaHeadDateString(e)},agendaDataAttrString:function(){
return this.getAttributeString({role:"grid"})},agendaEventAttrString:function(e){var t=this._getAttributes(this._eventCommonAttr,e);return t.role="row",this.getAttributeString(t)},agendaDetailsBtnString:function(){return this.getAttributeString({role:"button","aria-label":scheduler.locale.labels.icon_details})},gridAttrString:function(){return this.getAttributeString({role:"grid"})},gridRowAttrString:function(e){return this.agendaEventAttrString(e)},gridCellAttrString:function(e,t,i){return this.getAttributeString({
role:"gridcell","aria-label":[void 0===t.label?t.id:t.label,": ",i]})},mapAttrString:function(){return this.gridAttrString()},mapRowAttrString:function(e){return this.gridRowAttrString(e)},mapDetailsBtnString:function(){return this.agendaDetailsBtnString()},minicalHeader:function(e,t){this.setAttributes(e,{id:t+"","aria-live":"assertice","aria-atomic":"true"})},minicalGrid:function(e,t){this.setAttributes(e,{"aria-labelledby":t+"",role:"grid"})},minicalRow:function(e){this.setAttributes(e,{role:"row"
})},minicalDayCell:function(e,t){var i=t.valueOf()<scheduler._max_date.valueOf()&&t.valueOf()>=scheduler._min_date.valueOf();this.setAttributes(e,{role:"gridcell","aria-label":scheduler.templates.day_date(t),"aria-selected":i?"true":"false"})},minicalHeadCell:function(e){this.setAttributes(e,{role:"columnheader"})},weekAgendaDayCell:function(e,t){var i=e.querySelector(".dhx_wa_scale_bar"),a=e.querySelector(".dhx_wa_day_data"),r=scheduler.uid()+"";this.setAttributes(i,{id:r}),this.setAttributes(a,{
"aria-labelledby":r})},weekAgendaEvent:function(e,t){this.eventAttr(t,e)},lightboxHiddenAttr:function(e){e.setAttribute("aria-hidden","true")},lightboxVisibleAttr:function(e){e.setAttribute("aria-hidden","false")},lightboxSectionButtonAttrString:function(e){return this.getAttributeString({role:"button","aria-label":e,tabindex:"0"})},yearHeader:function(e,t){this.setAttributes(e,{id:t+""})},yearGrid:function(e,t){this.minicalGrid(e,t)},yearHeadCell:function(e){return this.minicalHeadCell(e)},yearRow:function(e){
return this.minicalRow(e)},yearDayCell:function(e){this.setAttributes(e,{role:"gridcell"})},lightboxAttr:function(e){e.setAttribute("role","dialog"),e.setAttribute("aria-hidden","true"),e.firstChild.setAttribute("role","heading")},lightboxButtonAttrString:function(e){return this.getAttributeString({role:"button","aria-label":scheduler.locale.labels[e],tabindex:"0"})},eventMenuAttrString:function(e){return this.getAttributeString({role:"button","aria-label":scheduler.locale.labels[e]})},lightboxHeader:function(e,t){
e.setAttribute("aria-label",t)},lightboxSelectAttrString:function(e){var t="";switch(e){case"%Y":t=scheduler.locale.labels.year;break;case"%m":t=scheduler.locale.labels.month;break;case"%d":t=scheduler.locale.labels.day;break;case"%H:%i":t=scheduler.locale.labels.hour+" "+scheduler.locale.labels.minute}return scheduler._waiAria.getAttributeString({"aria-label":t})},messageButtonAttrString:function(e){return"tabindex='0' role='button' aria-label='"+e+"'"},messageInfoAttr:function(e){e.setAttribute("role","alert");
},messageModalAttr:function(e,t){e.setAttribute("role","dialog"),t&&e.setAttribute("aria-labelledby",t)},quickInfoAttr:function(e){e.setAttribute("role","dialog")},quickInfoHeaderAttrString:function(){return" role='heading' "},quickInfoHeader:function(e,t){e.setAttribute("aria-label",t)},quickInfoButtonAttrString:function(e){return scheduler._waiAria.getAttributeString({role:"button","aria-label":e,tabindex:"0"})},tooltipAttr:function(e){e.setAttribute("role","tooltip")},tooltipVisibleAttr:function(e){
e.setAttribute("aria-hidden","false")},tooltipHiddenAttr:function(e){e.setAttribute("aria-hidden","true")}};for(var n in scheduler._waiAria)scheduler._waiAria[n]=function(e){return function(){return i()?"":e.apply(this,arguments)}}(scheduler._waiAria[n])}(),dhtmlxEventable(scheduler),scheduler._detachDomEvent=function(e,t,i){e.removeEventListener?e.removeEventListener(t,i,!1):e.detachEvent&&e.detachEvent("on"+t,i)},scheduler._init_once=function(){function e(e){for(var t=document.body;e&&e!=t;)e=e.parentNode;
return!(t!=e)}function t(){return{w:window.innerWidth||document.documentElement.clientWidth,h:window.innerHeight||document.documentElement.clientHeight}}function i(e,t){return e.w==t.w&&e.h==t.h}var a=t();dhtmlxEvent(window,"resize",function(){e(scheduler._obj)&&(window.clearTimeout(scheduler._resize_timer),scheduler._resize_timer=window.setTimeout(function(){var r=t();if(!i(a,r)){if(!e(scheduler._obj))return;scheduler.callEvent("onSchedulerResize",[])&&(scheduler.update_view(),scheduler.callEvent("onAfterSchedulerResize",[]));
}a=r},20))}),scheduler._init_once=function(){}},scheduler.init=function(e,t,i){t=t||scheduler._currentDate(),i=i||"week",this._obj&&this.unset_actions(),this._obj="string"==typeof e?document.getElementById(e):e,this.$container=this._obj,this._skin_init&&scheduler._skin_init(),scheduler.date.init(),this._els=[],this._scroll=!0,this._quirks=_isIE&&"BackCompat"==document.compatMode,this._quirks7=_isIE&&-1==navigator.appVersion.indexOf("MSIE 8"),this.get_elements(),this.init_templates(),this.set_actions(),
this._init_once(),this._init_touch_events(),this.set_sizes(),scheduler.callEvent("onSchedulerReady",[]),this.setCurrentView(t,i)},scheduler.xy={min_event_height:40,scale_width:50,scroll_width:18,scale_height:20,month_scale_height:20,menu_width:25,margin_top:0,margin_left:0,editor_width:140,month_head_height:22},scheduler.keys={edit_save:13,edit_cancel:27},scheduler.set_sizes=function(){var e=this._x=this._obj.clientWidth-this.xy.margin_left,t=this._y=this._obj.clientHeight-this.xy.margin_top,i=this._table_view?0:this.xy.scale_width+this.xy.scroll_width,a=this._table_view?-1:this.xy.scale_width;
this.set_xy(this._els.dhx_cal_navline[0],e,this.xy.nav_height,0,0),this.set_xy(this._els.dhx_cal_header[0],e-i,this.xy.scale_height,a,this.xy.nav_height+(this._quirks?-1:1));var r=this._els.dhx_cal_navline[0].offsetHeight;r>0&&(this.xy.nav_height=r);var s=this.xy.scale_height+this.xy.nav_height+(this._quirks?-2:0);this.set_xy(this._els.dhx_cal_data[0],e,t-(s+2),0,s+2)},scheduler.set_xy=function(e,t,i,a,r){e.style.width=Math.max(0,t)+"px",e.style.height=Math.max(0,i)+"px",arguments.length>3&&(e.style.left=a+"px",
e.style.top=r+"px")},scheduler.get_elements=function(){for(var e=this._obj.getElementsByTagName("DIV"),t=0;t<e.length;t++){var i=scheduler._getClassName(e[t]),a=e[t].getAttribute("name")||"";i&&(i=i.split(" ")[0]),this._els[i]||(this._els[i]=[]),this._els[i].push(e[t]);var r=scheduler.locale.labels[a||i];"string"!=typeof r&&a&&!e[t].innerHTML&&(r=a.split("_")[0]),r&&(this._waiAria.labelAttr(e[t],r),e[t].innerHTML=r)}},scheduler.unset_actions=function(){for(var e in this._els)if(this._click[e])for(var t=0;t<this._els[e].length;t++)this._els[e][t].onclick=null;
this._obj.onselectstart=null,this._obj.onmousemove=null,this._obj.onmousedown=null,this._obj.onmouseup=null,this._obj.ondblclick=null,this._obj.oncontextmenu=null},scheduler.set_actions=function(){for(var e in this._els)if(this._click[e])for(var t=0;t<this._els[e].length;t++)this._els[e][t].onclick=scheduler._click[e];this._obj.onselectstart=function(e){return!1},this._obj.onmousemove=function(e){scheduler._temp_touch_block||scheduler._on_mouse_move(e||event)},this._obj.onmousedown=function(e){scheduler._ignore_next_click||scheduler._on_mouse_down(e||event);
},this._obj.onmouseup=function(e){scheduler._ignore_next_click||scheduler._on_mouse_up(e||event)},this._obj.ondblclick=function(e){scheduler._on_dbl_click(e||event)},this._obj.oncontextmenu=function(e){var t=e||event,i=t.target||t.srcElement,a=scheduler.callEvent("onContextMenu",[scheduler._locate_event(i),t]);return a}},scheduler.select=function(e){this._select_id!=e&&(scheduler._close_not_saved(),this.editStop(!1),this.unselect(),this._select_id=e,this.updateEvent(e))},scheduler.unselect=function(e){
if(!e||e==this._select_id){var t=this._select_id;this._select_id=null,t&&this.getEvent(t)&&this.updateEvent(t)}},scheduler.getState=function(){return{mode:this._mode,date:new Date(this._date),min_date:new Date(this._min_date),max_date:new Date(this._max_date),editor_id:this._edit_id,lightbox_id:this._lightbox_id,new_event:this._new_event,select_id:this._select_id,expanded:this.expanded,drag_id:this._drag_id,drag_mode:this._drag_mode}},scheduler._click={dhx_cal_data:function(e){if(scheduler._ignore_next_click)return e.preventDefault&&e.preventDefault(),
e.cancelBubble=!0,scheduler._ignore_next_click=!1,!1;var t=e?e.target:event.srcElement,i=scheduler._locate_event(t);if(e=e||event,i){if(!scheduler.callEvent("onClick",[i,e])||scheduler.config.readonly)return}else scheduler.callEvent("onEmptyClick",[scheduler.getActionData(e).date,e]);if(i&&scheduler.config.select){scheduler.select(i);var a=scheduler._getClassName(t);-1!=a.indexOf("_icon")&&scheduler._click.buttons[a.split(" ")[1].replace("icon_","")](i)}else scheduler._close_not_saved(),(new Date).valueOf()-(scheduler._new_event||0)>500&&scheduler.unselect();
},dhx_cal_prev_button:function(){scheduler._click.dhx_cal_next_button(0,-1)},dhx_cal_next_button:function(e,t){scheduler.setCurrentView(scheduler.date.add(scheduler.date[scheduler._mode+"_start"](scheduler._date),t||1,scheduler._mode))},dhx_cal_today_button:function(){scheduler.callEvent("onBeforeTodayDisplayed",[])&&scheduler.setCurrentView(scheduler._currentDate())},dhx_cal_tab:function(){var e=this.getAttribute("name"),t=e.substring(0,e.search("_tab"));scheduler.setCurrentView(scheduler._date,t);
},buttons:{"delete":function(e){var t=scheduler.locale.labels.confirm_deleting;scheduler._dhtmlx_confirm(t,scheduler.locale.labels.title_confirm_deleting,function(){scheduler.deleteEvent(e)})},edit:function(e){scheduler.edit(e)},save:function(e){scheduler.editStop(!0)},details:function(e){scheduler.showLightbox(e)},cancel:function(e){scheduler.editStop(!1)}}},scheduler._dhtmlx_confirm=function(e,t,i){if(!e)return i();var a={text:e};t&&(a.title=t),i&&(a.callback=function(e){e&&i()}),dhtmlx.confirm(a);
},scheduler.addEventNow=function(e,t,i){var a={};e&&null!==e.constructor.toString().match(/object/i)&&(a=e,e=null);var r=6e4*(this.config.event_duration||this.config.time_step);e||(e=a.start_date||Math.round(scheduler._currentDate().valueOf()/r)*r);var s=new Date(e);if(!t){var n=this.config.first_hour;n>s.getHours()&&(s.setHours(n),e=s.valueOf()),t=e.valueOf()+r}var d=new Date(t);s.valueOf()==d.valueOf()&&d.setTime(d.valueOf()+r),a.start_date=a.start_date||s,a.end_date=a.end_date||d,a.text=a.text||this.locale.labels.new_event,
a.id=this._drag_id=a.id||this.uid(),this._drag_mode="new-size",this._loading=!0;var l=this.addEvent(a);return this.callEvent("onEventCreated",[this._drag_id,i]),this._loading=!1,this._drag_event={},this._on_mouse_up(i),l},scheduler._on_dbl_click=function(e,t){if(t=t||e.target||e.srcElement,!this.config.readonly){var i=scheduler._getClassName(t).split(" ")[0];switch(i){case"dhx_scale_holder":case"dhx_scale_holder_now":case"dhx_month_body":case"dhx_wa_day_data":if(!scheduler.config.dblclick_create)break;
this.addEventNow(this.getActionData(e).date,null,e);break;case"dhx_cal_event":case"dhx_wa_ev_body":case"dhx_agenda_line":case"dhx_grid_event":case"dhx_cal_event_line":case"dhx_cal_event_clear":var a=this._locate_event(t);if(!this.callEvent("onDblClick",[a,e]))return;this.config.details_on_dblclick||this._table_view||!this.getEvent(a)._timed||!this.config.select?this.showLightbox(a):this.edit(a);break;case"dhx_time_block":case"dhx_cal_container":return;default:var r=this["dblclick_"+i];if(r)r.call(this,e);else if(t.parentNode&&t!=this)return scheduler._on_dbl_click(e,t.parentNode);
}}},scheduler._get_column_index=function(e){var t=0;if(this._cols){for(var i=0,a=0;i+this._cols[a]<e&&a<this._cols.length;)i+=this._cols[a],a++;if(t=a+(this._cols[t]?(e-i)/this._cols[t]:0),this._ignores&&t>=this._cols.length)for(;t>=1&&this._ignores[Math.floor(t)];)t--}return t},scheduler._week_indexes_from_pos=function(e){if(this._cols){var t=this._get_column_index(e.x);return e.x=Math.min(this._cols.length-1,Math.max(0,Math.ceil(t)-1)),e.y=Math.max(0,Math.ceil(60*e.y/(this.config.time_step*this.config.hour_size_px))-1)+this.config.first_hour*(60/this.config.time_step),
e}return e},scheduler._mouse_coords=function(e){var t,i=document.body,a=document.documentElement;t=_isIE||!e.pageX&&!e.pageY?{x:e.clientX+(i.scrollLeft||a.scrollLeft||0)-i.clientLeft,y:e.clientY+(i.scrollTop||a.scrollTop||0)-i.clientTop}:{x:e.pageX,y:e.pageY},t.x-=getAbsoluteLeft(this._obj)+(this._table_view?0:this.xy.scale_width),t.y-=getAbsoluteTop(this._obj)+this.xy.nav_height+(this._dy_shift||0)+this.xy.scale_height-this._els.dhx_cal_data[0].scrollTop,t.ev=e;var r=this["mouse_"+this._mode];if(r)t=r.call(this,t);else if(this._table_view){
var s=this._get_column_index(t.x);if(!this._cols||!this._colsS)return t;var n=0;for(n=1;n<this._colsS.heights.length&&!(this._colsS.heights[n]>t.y);n++);t.y=Math.ceil(24*(Math.max(0,s)+7*Math.max(0,n-1))*60/this.config.time_step),(scheduler._drag_mode||"month"==this._mode)&&(t.y=24*(Math.max(0,Math.ceil(s)-1)+7*Math.max(0,n-1))*60/this.config.time_step),"move"==this._drag_mode&&scheduler._ignores_detected&&scheduler.config.preserve_length&&(t._ignores=!0,this._drag_event._event_length||(this._drag_event._event_length=this._get_real_event_length(this._drag_event.start_date,this._drag_event.end_date,{
x_step:1,x_unit:"day"}))),t.x=0}else t=this._week_indexes_from_pos(t);return t.timestamp=+new Date,t},scheduler._close_not_saved=function(){if((new Date).valueOf()-(scheduler._new_event||0)>500&&scheduler._edit_id){var e=scheduler.locale.labels.confirm_closing;scheduler._dhtmlx_confirm(e,scheduler.locale.labels.title_confirm_closing,function(){scheduler.editStop(scheduler.config.positive_closing)}),e&&(this._drag_id=this._drag_pos=this._drag_mode=null)}},scheduler._correct_shift=function(e,t){return e-=6e4*(new Date(scheduler._min_date).getTimezoneOffset()-new Date(e).getTimezoneOffset())*(t?-1:1);
},scheduler._is_pos_changed=function(e,t){function i(e,t,i){return!!(Math.abs(e-t)>i)}if(!e||!this._drag_pos)return!0;var a=100,r=5;return!!(this._drag_pos.has_moved||!this._drag_pos.timestamp||t.timestamp-this._drag_pos.timestamp>a||i(e.ev.clientX,t.ev.clientX,r)||i(e.ev.clientY,t.ev.clientY,r))},scheduler._correct_drag_start_date=function(e){var t;scheduler.matrix&&(t=scheduler.matrix[scheduler._mode]),t=t||{x_step:1,x_unit:"day"},e=new Date(e);var i=1;return(t._start_correction||t._end_correction)&&(i=60*(t.last_hour||0)-(60*e.getHours()+e.getMinutes())||1),
1*e+(scheduler._get_fictional_event_length(e,i,t)-i)},scheduler._correct_drag_end_date=function(e,t){var i;scheduler.matrix&&(i=scheduler.matrix[scheduler._mode]),i=i||{x_step:1,x_unit:"day"};var a=1*e+scheduler._get_fictional_event_length(e,t,i);return new Date(1*a-(scheduler._get_fictional_event_length(a,-1,i,-1)+1))},scheduler._on_mouse_move=function(e){if(this._drag_mode){var t=this._mouse_coords(e);if(this._is_pos_changed(this._drag_pos,t)){var i,a;if(this._edit_id!=this._drag_id&&this._close_not_saved(),
!this._drag_mode)return;if(this._drag_pos=t,this._drag_pos.has_moved=!0,"create"==this._drag_mode){if(this._close_not_saved(),this.unselect(this._select_id),this._loading=!0,i=this._get_date_from_pos(t).valueOf(),!this._drag_start){var r=this.callEvent("onBeforeEventCreated",[e,this._drag_id]);return r?(this._loading=!1,void(this._drag_start=i)):void(this._loading=!1)}a=i,a==this._drag_start;var s=new Date(this._drag_start),n=new Date(a);"day"!=this._mode&&"week"!=this._mode||s.getHours()!=n.getHours()||s.getMinutes()!=n.getMinutes()||(n=new Date(this._drag_start+1e3)),
this._drag_id=this.uid(),this.addEvent(s,n,this.locale.labels.new_event,this._drag_id,t.fields),this.callEvent("onEventCreated",[this._drag_id,e]),this._loading=!1,this._drag_mode="new-size"}var d,l=this.getEvent(this._drag_id);if(scheduler.matrix&&(d=scheduler.matrix[scheduler._mode]),d=d||{x_step:1,x_unit:"day"},"move"==this._drag_mode)i=this._min_date.valueOf()+6e4*(t.y*this.config.time_step+24*t.x*60-(scheduler._move_pos_shift||0)),!t.custom&&this._table_view&&(i+=1e3*this.date.time_part(l.start_date)),
i=this._correct_shift(i),t._ignores&&this.config.preserve_length&&this._table_view?(i=scheduler._correct_drag_start_date(i),a=scheduler._correct_drag_end_date(i,this._drag_event._event_length)):a=l.end_date.valueOf()-(l.start_date.valueOf()-i);else{if(i=l.start_date.valueOf(),a=l.end_date.valueOf(),this._table_view){var o=this._min_date.valueOf()+t.y*this.config.time_step*6e4+(t.custom?0:864e5);if("month"==this._mode)if(o=this._correct_shift(o,!1),this._drag_from_start){var h=864e5;o<=scheduler.date.date_part(new Date(a+h-1)).valueOf()&&(i=o-h);
}else a=o;else t.resize_from_start?i=scheduler._correct_drag_start_date(o):a=scheduler._correct_drag_end_date(o,0)}else{var _=this.date.date_part(new Date(l.end_date.valueOf()-1)).valueOf(),c=new Date(_);a=_+t.y*this.config.time_step*6e4,a+=6e4*(new Date(a).getTimezoneOffset()-c.getTimezoneOffset()),this._els.dhx_cal_data[0].style.cursor="s-resize",("week"==this._mode||"day"==this._mode)&&(a=this._correct_shift(a))}if("new-size"==this._drag_mode)if(a<=this._drag_start){var u=t.shift||(this._table_view&&!t.custom?864e5:0);
i=a-(t.shift?0:u),a=this._drag_start+(u||6e4*this.config.time_step)}else i=this._drag_start;else i>=a&&(a=i+6e4*this.config.time_step)}var g=new Date(a-1),v=new Date(i);if("move"==this._drag_mode&&scheduler.config.limit_drag_out&&(+v<+scheduler._min_date||+a>+scheduler._max_date)){if(+l.start_date<+scheduler._min_date||+l.end_date>+scheduler._max_date)v=new Date(l.start_date),a=new Date(l.end_date);else{var f=a-v;+v<+scheduler._min_date?(v=new Date(scheduler._min_date),t._ignores&&this.config.preserve_length&&this._table_view?(v=new Date(scheduler._correct_drag_start_date(v)),
d._start_correction&&(v=new Date(v.valueOf()+d._start_correction)),a=new Date(1*v+this._get_fictional_event_length(v,this._drag_event._event_length,d))):a=new Date(+v+f)):(a=new Date(scheduler._max_date),t._ignores&&this.config.preserve_length&&this._table_view?(d._end_correction&&(a=new Date(a.valueOf()-d._end_correction)),a=new Date(1*a-this._get_fictional_event_length(a,0,d,!0)),v=new Date(1*a-this._get_fictional_event_length(a,this._drag_event._event_length,d,!0)),this._ignores_detected&&(v=scheduler.date.add(v,d.x_step,d.x_unit),
a=new Date(1*a-this._get_fictional_event_length(a,0,d,!0)),a=scheduler.date.add(a,d.x_step,d.x_unit))):v=new Date(+a-f))}var g=new Date(a-1)}if(!this._table_view&&!scheduler.config.all_timed&&(!scheduler._get_section_view()&&t.x!=this._get_event_sday({start_date:new Date(a),end_date:new Date(a)})||new Date(a).getHours()>=this.config.last_hour)){var f=a-v,h=this._min_date.valueOf()+24*t.x*60*6e4;a=scheduler.date.date_part(new Date(h)),a.setHours(this.config.last_hour),g=new Date(a-1),"move"==this._drag_mode&&(v=new Date(+a-f));
}if(this._table_view||g.getDate()==v.getDate()&&g.getHours()<this.config.last_hour||scheduler._allow_dnd)if(l.start_date=v,l.end_date=new Date(a),this.config.update_render){var m=scheduler._els.dhx_cal_data[0].scrollTop;this.update_view(),scheduler._els.dhx_cal_data[0].scrollTop=m}else this.updateEvent(this._drag_id);this._table_view&&this.for_rendered(this._drag_id,function(e){e.className+=" dhx_in_move"}),this.callEvent("onEventDrag",[this._drag_id,this._drag_mode,e])}}else if(scheduler.checkEvent("onMouseMove")){
var p=this._locate_event(e.target||e.srcElement);this.callEvent("onMouseMove",[p,e])}},scheduler._on_mouse_down=function(e,t){if(2!=e.button&&!this.config.readonly&&!this._drag_mode){t=t||e.target||e.srcElement;var i=scheduler._getClassName(t).split(" ")[0];switch(i){case"dhx_cal_event_line":case"dhx_cal_event_clear":this._table_view&&(this._drag_mode="move");break;case"dhx_event_move":case"dhx_wa_ev_body":this._drag_mode="move";break;case"dhx_event_resize":this._drag_mode="resize";var a=scheduler._getClassName(t);
a.indexOf("dhx_event_resize_end")<0?scheduler._drag_from_start=!0:scheduler._drag_from_start=!1;break;case"dhx_scale_holder":case"dhx_scale_holder_now":case"dhx_month_body":case"dhx_matrix_cell":case"dhx_marked_timespan":this._drag_mode="create";break;case"":if(t.parentNode)return scheduler._on_mouse_down(e,t.parentNode);break;default:if((!scheduler.checkEvent("onMouseDown")||scheduler.callEvent("onMouseDown",[i]))&&t.parentNode&&t!=this&&"dhx_body"!=i)return scheduler._on_mouse_down(e,t.parentNode);
this._drag_mode=null,this._drag_id=null}if(this._drag_mode){var r=this._locate_event(t);if(this.config["drag_"+this._drag_mode]&&this.callEvent("onBeforeDrag",[r,this._drag_mode,e])){if(this._drag_id=r,(this._edit_id!=this._drag_id||this._edit_id&&"create"==this._drag_mode)&&this._close_not_saved(),!this._drag_mode)return;this._drag_event=scheduler._lame_clone(this.getEvent(this._drag_id)||{}),this._drag_pos=this._mouse_coords(e)}else this._drag_mode=this._drag_id=0}this._drag_start=null}},scheduler._get_private_properties=function(e){
var t={};for(var i in e)0===i.indexOf("_")&&(t[i]=!0);return t},scheduler._clear_temporary_properties=function(e,t){var i=this._get_private_properties(e),a=this._get_private_properties(t);for(var r in a)i[r]||delete t[r]},scheduler._on_mouse_up=function(e){if(!e||2!=e.button||!scheduler.config.touch){if(this._drag_mode&&this._drag_id){this._els.dhx_cal_data[0].style.cursor="default";var t=this._drag_id,i=this._drag_mode,a=!this._drag_pos||this._drag_pos.has_moved,r=this.getEvent(this._drag_id);if(a&&(this._drag_event._dhx_changed||!this._drag_event.start_date||r.start_date.valueOf()!=this._drag_event.start_date.valueOf()||r.end_date.valueOf()!=this._drag_event.end_date.valueOf())){
var s="new-size"==this._drag_mode;if(this.callEvent("onBeforeEventChanged",[r,e,s,this._drag_event]))if(this._drag_id=this._drag_mode=null,s&&this.config.edit_on_create){if(this.unselect(),this._new_event=new Date,this._table_view||this.config.details_on_create||!this.config.select||!this.isOneDayEvent(this.getEvent(t)))return scheduler.callEvent("onDragEnd",[t,i,e]),this.showLightbox(t);this._drag_pos=!0,this._select_id=this._edit_id=t}else this._new_event||this.callEvent(s?"onEventAdded":"onEventChanged",[t,this.getEvent(t)]);else s?this.deleteEvent(r.id,!0):(this._drag_event._dhx_changed=!1,
this._clear_temporary_properties(r,this._drag_event),scheduler._lame_copy(r,this._drag_event),this.updateEvent(r.id))}this._drag_pos&&(this._drag_pos.has_moved||this._drag_pos===!0)&&(this._drag_id=this._drag_mode=null,this.render_view_data()),scheduler.callEvent("onDragEnd",[t,i,e])}this._drag_id=null,this._drag_mode=null,this._drag_pos=null}},scheduler._trigger_dyn_loading=function(){return this._load_mode&&this._load()?(this._render_wait=!0,!0):!1},scheduler.update_view=function(){this._reset_ignores();
var e=this[this._mode+"_view"];return e?e(!0):this._reset_scale(),this._trigger_dyn_loading()?!0:void this.render_view_data()},scheduler.isViewExists=function(e){return!!(scheduler[e+"_view"]||scheduler.date[e+"_start"]&&scheduler.templates[e+"_date"]&&scheduler.templates[e+"_scale_date"])},scheduler._set_aria_buttons_attrs=function(){for(var e=["dhx_cal_next_button","dhx_cal_prev_button","dhx_cal_tab","dhx_cal_today_button"],t=0;t<e.length;t++)for(var i=this._els[e[t]],a=0;i&&a<i.length;a++){var r=i[a].getAttribute("name"),s=this.locale.labels[e[t]];
r&&(s=this.locale.labels[r]||s),"dhx_cal_next_button"==e[t]?s=this.locale.labels.next:"dhx_cal_prev_button"==e[t]&&(s=this.locale.labels.prev),this._waiAria.headerButtonsAttributes(i[a],s||"")}},scheduler.updateView=function(e,t){e=e||this._date,t=t||this._mode;var i="dhx_cal_data",a=this._obj,r="dhx_scheduler_"+this._mode,s="dhx_scheduler_"+t;this._mode&&-1!=a.className.indexOf(r)?a.className=a.className.replace(r,s):a.className+=" "+s;var n=this._mode==t&&this.config.preserve_scroll?this._els[i][0].scrollTop:!1;
this[this._mode+"_view"]&&t&&this._mode!=t&&this[this._mode+"_view"](!1),this._close_not_saved();var d="dhx_multi_day";this._els[d]&&(this._els[d][0].parentNode.removeChild(this._els[d][0]),this._els[d]=null),this._mode=t,this._date=e,this._table_view="month"==this._mode,this._dy_shift=0,this._set_aria_buttons_attrs();var l=this._els.dhx_cal_tab;if(l)for(var o=0;o<l.length;o++){var h=l[o],_=h.className;_=_.replace(/ active/g,""),h.getAttribute("name")==this._mode+"_tab"?(_+=" active",this._waiAria.headerToggleState(h,!0)):this._waiAria.headerToggleState(h,!1),
h.className=_}this.update_view(),"number"==typeof n&&(this._els[i][0].scrollTop=n)},scheduler.setCurrentView=function(e,t){this.callEvent("onBeforeViewChange",[this._mode,this._date,t||this._mode,e||this._date])&&(this.updateView(e,t),this.callEvent("onViewChange",[this._mode,this._date]))},scheduler._render_x_header=function(e,t,i,a,r){r=r||0;var s=document.createElement("DIV");s.className="dhx_scale_bar",this.templates[this._mode+"_scalex_class"]&&(s.className+=" "+this.templates[this._mode+"_scalex_class"](i));
var n=this._cols[e]-1;"month"==this._mode&&0===e&&this.config.left_border&&(s.className+=" dhx_scale_bar_border",t+=1),this.set_xy(s,n,this.xy.scale_height-2,t,r);var d=this.templates[this._mode+"_scale_date"](i,this._mode);s.innerHTML=d,this._waiAria.dayHeaderAttr(s,d),a.appendChild(s)},scheduler._get_columns_num=function(e,t){var i=7;if(!scheduler._table_view){var a=scheduler.date["get_"+scheduler._mode+"_end"];a&&(t=a(e)),i=Math.round((t.valueOf()-e.valueOf())/864e5)}return i},scheduler._get_timeunit_start=function(){
return this.date[this._mode+"_start"](new Date(this._date.valueOf()))},scheduler._get_view_end=function(){var e=this._get_timeunit_start(),t=scheduler.date.add(e,1,this._mode);if(!scheduler._table_view){var i=scheduler.date["get_"+scheduler._mode+"_end"];i&&(t=i(e))}return t},scheduler._calc_scale_sizes=function(e,t,i){var a=e,r=this._get_columns_num(t,i);this._process_ignores(t,r,"day",1);for(var s=r-this._ignores_detected,n=0;r>n;n++)this._ignores[n]?(this._cols[n]=0,s++):this._cols[n]=Math.floor(a/(s-n)),
a-=this._cols[n],this._colsS[n]=(this._cols[n-1]||0)+(this._colsS[n-1]||(this._table_view?0:this.xy.scale_width+2));this._colsS.col_length=r,this._colsS[r]=this._cols[r-1]+this._colsS[r-1]||0},scheduler._set_scale_col_size=function(e,t,i){var a=this.config;this.set_xy(e,t-1,a.hour_size_px*(a.last_hour-a.first_hour),i+this.xy.scale_width+1,0)},scheduler._render_scales=function(e,t){var i=new Date(scheduler._min_date),a=new Date(scheduler._max_date),r=this.date.date_part(scheduler._currentDate()),s=parseInt(e.style.width,10),n=new Date(this._min_date),d=this._get_columns_num(i,a);
this._calc_scale_sizes(s,i,a);var l=0;e.innerHTML="";for(var o=0;d>o;o++){if(this._ignores[o]||this._render_x_header(o,l,n,e),!this._table_view){var h=document.createElement("DIV"),_="dhx_scale_holder";n.valueOf()==r.valueOf()&&(_="dhx_scale_holder_now"),this._ignores_detected&&this._ignores[o]&&(_+=" dhx_scale_ignore"),h.className=_+" "+this.templates.week_date_class(n,r),this._waiAria.dayColumnAttr(h,n),this._set_scale_col_size(h,this._cols[o],l),t.appendChild(h),this.callEvent("onScaleAdd",[h,n]);
}l+=this._cols[o],n=this.date.add(n,1,"day"),n=this.date.day_start(n)}},scheduler._reset_scale=function(){if(this.templates[this._mode+"_date"]){var e=this._els.dhx_cal_header[0],t=this._els.dhx_cal_data[0],i=this.config;e.innerHTML="",t.innerHTML="";var a=(i.readonly||!i.drag_resize?" dhx_resize_denied":"")+(i.readonly||!i.drag_move?" dhx_move_denied":"");t.className="dhx_cal_data"+a,this._scales={},this._cols=[],this._colsS={height:0},this._dy_shift=0,this.set_sizes();var r,s,n=this._get_timeunit_start(),d=scheduler._get_view_end();
r=s=this._table_view?scheduler.date.week_start(n):n,this._min_date=r;var l=this.templates[this._mode+"_date"](n,d,this._mode);if(this._els.dhx_cal_date[0].innerHTML=l,this._waiAria.navBarDateAttr(this._els.dhx_cal_date[0],l),this._max_date=d,scheduler._render_scales(e,t),this._table_view)this._reset_month_scale(t,n,s);else if(this._reset_hours_scale(t,n,s),i.multi_day){var o="dhx_multi_day";this._els[o]&&(this._els[o][0].parentNode.removeChild(this._els[o][0]),this._els[o]=null);var h=this._els.dhx_cal_navline[0],_=h.offsetHeight+this._els.dhx_cal_header[0].offsetHeight+1,c=document.createElement("DIV");
c.className=o,c.style.visibility="hidden",this.set_xy(c,Math.max(this._colsS[this._colsS.col_length]+this.xy.scroll_width-2,0),0,0,_),t.parentNode.insertBefore(c,t);var u=c.cloneNode(!0);u.className=o+"_icon",u.style.visibility="hidden",this.set_xy(u,this.xy.scale_width,0,0,_),c.appendChild(u),this._els[o]=[c,u],this._els[o][0].onclick=this._click.dhx_cal_data}}},scheduler._reset_hours_scale=function(e,t,i){var a=document.createElement("DIV");a.className="dhx_scale_holder";for(var r=new Date(1980,1,1,this.config.first_hour,0,0),s=1*this.config.first_hour;s<this.config.last_hour;s++){
var n=document.createElement("DIV");n.className="dhx_scale_hour",n.style.height=this.config.hour_size_px+"px";var d=this.xy.scale_width;this.config.left_border&&(n.className+=" dhx_scale_hour_border"),n.style.width=d+"px";var l=scheduler.templates.hour_scale(r);n.innerHTML=l,this._waiAria.hourScaleAttr(n,l),a.appendChild(n),r=this.date.add(r,1,"hour")}e.appendChild(a),this.config.scroll_hour&&(e.scrollTop=this.config.hour_size_px*(this.config.scroll_hour-this.config.first_hour))},scheduler._currentDate=function(){
return scheduler.config.now_date?new Date(scheduler.config.now_date):new Date},scheduler._reset_ignores=function(){this._ignores={},this._ignores_detected=0},scheduler._process_ignores=function(e,t,i,a,r){this._reset_ignores();var s=scheduler["ignore_"+this._mode];if(s)for(var n=new Date(e),d=0;t>d;d++)s(n)&&(this._ignores_detected+=1,this._ignores[d]=!0,r&&t++),n=scheduler.date.add(n,a,i),scheduler.date[i+"_start"]&&(n=scheduler.date[i+"_start"](n))},scheduler._render_month_scale=function(e,t,i,a){
function r(e){var t=scheduler._colsS.height;return void 0!==scheduler._colsS.heights[e+1]&&(t=scheduler._colsS.heights[e+1]-(scheduler._colsS.heights[e]||0)),t}var s=scheduler.date.add(t,1,"month"),n=new Date(i),d=scheduler._currentDate();this.date.date_part(d),this.date.date_part(i),a=a||Math.ceil(Math.round((s.valueOf()-i.valueOf())/864e5)/7);for(var l=[],o=0;7>=o;o++){var h=(this._cols[o]||0)-1;0===o&&this.config.left_border&&(h-=1),l[o]=h+"px"}var _=0,c=document.createElement("table");c.setAttribute("cellpadding","0"),
c.setAttribute("cellspacing","0");var u=document.createElement("tbody");c.appendChild(u);for(var g=[],o=0;a>o;o++){var v=document.createElement("tr");u.appendChild(v);for(var f=Math.max(r(o)-scheduler.xy.month_head_height,0),m=0;7>m;m++){var p=document.createElement("td");v.appendChild(p);var b="";t>i?b="dhx_before":i>=s?b="dhx_after":i.valueOf()==d.valueOf()&&(b="dhx_now"),this._ignores_detected&&this._ignores[m]&&(b+=" dhx_scale_ignore"),p.className=b+" "+this.templates.month_date_class(i,d);var x="dhx_month_body",y="dhx_month_head";
if(0===m&&this.config.left_border&&(x+=" dhx_month_body_border",y+=" dhx_month_head_border"),this._ignores_detected&&this._ignores[m])p.appendChild(document.createElement("div")),p.appendChild(document.createElement("div"));else{this._waiAria.monthCellAttr(p,i);var w=document.createElement("DIV");w.className=y,w.innerHTML=this.templates.month_day(i),p.appendChild(w);var D=document.createElement("DIV");D.className=x,D.style.height=f+"px",D.style.width=l[m],p.appendChild(D)}g.push(i);var E=i.getDate();
i=this.date.add(i,1,"day"),i.getDate()-E>1&&(i=new Date(i.getFullYear(),i.getMonth(),E+1,12,0))}scheduler._colsS.heights[o]=_,_+=r(o)}this._min_date=n,this._max_date=i,e.innerHTML="",e.appendChild(c),this._scales={};for(var A=e.getElementsByTagName("div"),o=0;o<g.length;o++){var e=A[2*o+1],k=g[o];this._scales[+k]=e}for(var o=0;o<g.length;o++){var k=g[o];this.callEvent("onScaleAdd",[this._scales[+k],k])}return this._max_date},scheduler._reset_month_scale=function(e,t,i,a){var r=scheduler.date.add(t,1,"month"),s=scheduler._currentDate();
this.date.date_part(s),this.date.date_part(i),a=a||Math.ceil(Math.round((r.valueOf()-i.valueOf())/864e5)/7);var n=Math.floor(e.clientHeight/a)-this.xy.month_head_height;return this._colsS.height=n+this.xy.month_head_height,this._colsS.heights=[],scheduler._render_month_scale(e,t,i,a)},scheduler.getLabel=function(e,t){for(var i=this.config.lightbox.sections,a=0;a<i.length;a++)if(i[a].map_to==e)for(var r=i[a].options,s=0;s<r.length;s++)if(r[s].key==t)return r[s].label;return""},scheduler.updateCollection=function(e,t){
var i=scheduler.serverList(e);return i?(i.splice(0,i.length),i.push.apply(i,t||[]),scheduler.callEvent("onOptionsLoad",[]),scheduler.resetLightbox(),!0):!1},scheduler._lame_clone=function(e,t){var i,a,r;for(t=t||[],i=0;i<t.length;i+=2)if(e===t[i])return t[i+1];if(e&&"object"==typeof e){for(r={},a=[Array,Date,Number,String,Boolean],i=0;i<a.length;i++)e instanceof a[i]&&(r=i?new a[i](e):new a[i]);t.push(e,r);for(i in e)Object.prototype.hasOwnProperty.apply(e,[i])&&(r[i]=scheduler._lame_clone(e[i],t));
}return r||e},scheduler._lame_copy=function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return e},scheduler._get_date_from_pos=function(e){var t=this._min_date.valueOf()+6e4*(e.y*this.config.time_step+24*(this._table_view?0:e.x)*60);return new Date(this._correct_shift(t))},scheduler.getActionData=function(e){var t=this._mouse_coords(e);return{date:this._get_date_from_pos(t),section:t.section}},scheduler._focus=function(e,t){e&&e.focus&&(this.config.touch?window.setTimeout(function(){e.focus();
},10):(t&&e.select&&e.select(),e.focus()))},scheduler._get_real_event_length=function(e,t,i){var a,r=t-e,s=i._start_correction+i._end_correction||0,n=this["ignore_"+this._mode],d=0;i.render?(d=this._get_date_index(i,e),a=this._get_date_index(i,t)):a=Math.round(r/60/60/1e3/24);for(var l=!0;a>d;){var o=scheduler.date.add(t,-i.x_step,i.x_unit);n&&n(t)&&(!l||l&&n(o))?r-=t-o:(l=!1,r-=s),t=o,a--}return r},scheduler._get_fictional_event_length=function(e,t,i,a){var r=new Date(e),s=a?-1:1;if(i._start_correction||i._end_correction){
var n;n=a?60*r.getHours()+r.getMinutes()-60*(i.first_hour||0):60*(i.last_hour||0)-(60*r.getHours()+r.getMinutes());var d=60*(i.last_hour-i.first_hour),l=Math.ceil((t/6e4-n)/d);0>l&&(l=0),t+=l*(1440-d)*60*1e3}var o,h=new Date(1*e+t*s),_=this["ignore_"+this._mode],c=0;for(i.render?(c=this._get_date_index(i,r),o=this._get_date_index(i,h)):o=Math.round(t/60/60/1e3/24);o*s>=c*s;){var u=scheduler.date.add(r,i.x_step*s,i.x_unit);_&&_(r)&&(t+=(u-r)*s,o+=s),r=u,c+=s}return t},scheduler._get_section_view=function(){
return this.matrix&&this.matrix[this._mode]?this.matrix[this._mode]:this._props&&this._props[this._mode]?this._props[this._mode]:null},scheduler._get_section_property=function(){return this.matrix&&this.matrix[this._mode]?this.matrix[this._mode].y_property:this._props&&this._props[this._mode]?this._props[this._mode].map_to:null},scheduler._is_initialized=function(){var e=this.getState();return this._obj&&e.date&&e.mode},scheduler._is_lightbox_open=function(){var e=this.getState();return null!==e.lightbox_id&&void 0!==e.lightbox_id;
},scheduler._getClassName=function(e){if(!e)return"";var t=e.className||"";return t.baseVal&&(t=t.baseVal),t.indexOf||(t=""),t||""},scheduler.date={init:function(){for(var e=scheduler.locale.date.month_short,t=scheduler.locale.date.month_short_hash={},i=0;i<e.length;i++)t[e[i]]=i;for(var e=scheduler.locale.date.month_full,t=scheduler.locale.date.month_full_hash={},i=0;i<e.length;i++)t[e[i]]=i},date_part:function(e){var t=new Date(e);return e.setHours(0),e.setMinutes(0),e.setSeconds(0),e.setMilliseconds(0),
e.getHours()&&(e.getDate()<t.getDate()||e.getMonth()<t.getMonth()||e.getFullYear()<t.getFullYear())&&e.setTime(e.getTime()+36e5*(24-e.getHours())),e},time_part:function(e){return(e.valueOf()/1e3-60*e.getTimezoneOffset())%86400},week_start:function(e){var t=e.getDay();return scheduler.config.start_on_monday&&(0===t?t=6:t--),this.date_part(this.add(e,-1*t,"day"))},month_start:function(e){return e.setDate(1),this.date_part(e)},year_start:function(e){return e.setMonth(0),this.month_start(e)},day_start:function(e){
return this.date_part(e)},_add_days:function(e,t){var i=new Date(e.valueOf());if(i.setDate(i.getDate()+t),t==Math.round(t)&&t>0){var a=+i-+e,r=a%864e5;if(r&&e.getTimezoneOffset()==i.getTimezoneOffset()){var s=r/36e5;i.setTime(i.getTime()+60*(24-s)*60*1e3)}}return t>=0&&!e.getHours()&&i.getHours()&&(i.getDate()<e.getDate()||i.getMonth()<e.getMonth()||i.getFullYear()<e.getFullYear())&&i.setTime(i.getTime()+36e5*(24-i.getHours())),i},add:function(e,t,i){var a=new Date(e.valueOf());switch(i){case"day":
a=scheduler.date._add_days(a,t);break;case"week":a=scheduler.date._add_days(a,7*t);break;case"month":a.setMonth(a.getMonth()+t);break;case"year":a.setYear(a.getFullYear()+t);break;case"hour":a.setTime(a.getTime()+60*t*60*1e3);break;case"minute":a.setTime(a.getTime()+60*t*1e3);break;default:return scheduler.date["add_"+i](e,t,i)}return a},to_fixed:function(e){return 10>e?"0"+e:e},copy:function(e){return new Date(e.valueOf())},date_to_str:function(e,t){return e=e.replace(/%[a-zA-Z]/g,function(e){switch(e){
case"%d":return'"+scheduler.date.to_fixed(date.getDate())+"';case"%m":return'"+scheduler.date.to_fixed((date.getMonth()+1))+"';case"%j":return'"+date.getDate()+"';case"%n":return'"+(date.getMonth()+1)+"';case"%y":return'"+scheduler.date.to_fixed(date.getFullYear()%100)+"';case"%Y":return'"+date.getFullYear()+"';case"%D":return'"+scheduler.locale.date.day_short[date.getDay()]+"';case"%l":return'"+scheduler.locale.date.day_full[date.getDay()]+"';case"%M":return'"+scheduler.locale.date.month_short[date.getMonth()]+"';
case"%F":return'"+scheduler.locale.date.month_full[date.getMonth()]+"';case"%h":return'"+scheduler.date.to_fixed((date.getHours()+11)%12+1)+"';case"%g":return'"+((date.getHours()+11)%12+1)+"';case"%G":return'"+date.getHours()+"';case"%H":return'"+scheduler.date.to_fixed(date.getHours())+"';case"%i":return'"+scheduler.date.to_fixed(date.getMinutes())+"';case"%a":return'"+(date.getHours()>11?"pm":"am")+"';case"%A":return'"+(date.getHours()>11?"PM":"AM")+"';case"%s":return'"+scheduler.date.to_fixed(date.getSeconds())+"';
case"%W":return'"+scheduler.date.to_fixed(scheduler.date.getISOWeek(date))+"';default:return e}}),t&&(e=e.replace(/date\.get/g,"date.getUTC")),new Function("date",'return "'+e+'";')},str_to_date:function(e,t){for(var i="var temp=date.match(/[a-zA-Z]+|[0-9]+/g);",a=e.match(/%[a-zA-Z]/g),r=0;r<a.length;r++)switch(a[r]){case"%j":case"%d":i+="set[2]=temp["+r+"]||1;";break;case"%n":case"%m":i+="set[1]=(temp["+r+"]||1)-1;";break;case"%y":i+="set[0]=temp["+r+"]*1+(temp["+r+"]>50?1900:2000);";break;case"%g":
case"%G":case"%h":case"%H":i+="set[3]=temp["+r+"]||0;";break;case"%i":i+="set[4]=temp["+r+"]||0;";break;case"%Y":i+="set[0]=temp["+r+"]||0;";break;case"%a":case"%A":i+="set[3]=set[3]%12+((temp["+r+"]||'').toLowerCase()=='am'?0:12);";break;case"%s":i+="set[5]=temp["+r+"]||0;";break;case"%M":i+="set[1]=scheduler.locale.date.month_short_hash[temp["+r+"]]||0;";break;case"%F":i+="set[1]=scheduler.locale.date.month_full_hash[temp["+r+"]]||0;"}var s="set[0],set[1],set[2],set[3],set[4],set[5]";return t&&(s=" Date.UTC("+s+")"),
new Function("date","var set=[0,0,1,0,0,0]; "+i+" return new Date("+s+");")},getISOWeek:function(e){if(!e)return!1;e=this.date_part(new Date(e));var t=e.getDay();0===t&&(t=7);var i=new Date(e.valueOf());i.setDate(e.getDate()+(4-t));var a=i.getFullYear(),r=Math.round((i.getTime()-new Date(a,0,1).getTime())/864e5),s=1+Math.floor(r/7);return s},getUTCISOWeek:function(e){return this.getISOWeek(this.convert_to_utc(e))},convert_to_utc:function(e){return new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds());
}},scheduler.locale={date:{month_full:["January","February","March","April","May","June","July","August","September","October","November","December"],month_short:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],day_full:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],day_short:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},labels:{dhx_cal_today_button:"Today",day_tab:"Day",week_tab:"Week",month_tab:"Month",new_event:"New event",icon_save:"Save",icon_cancel:"Cancel",
icon_details:"Details",icon_edit:"Edit",icon_delete:"Delete",confirm_closing:"",confirm_deleting:"Event will be deleted permanently, are you sure?",section_description:"Description",section_time:"Time period",full_day:"Full day",confirm_recurring:"Do you want to edit the whole set of repeated events?",section_recurring:"Repeat event",button_recurring:"Disabled",button_recurring_open:"Enabled",button_edit_series:"Edit series",button_edit_occurrence:"Edit occurrence",agenda_tab:"Agenda",date:"Date",
description:"Description",year_tab:"Year",week_agenda_tab:"Agenda",grid_tab:"Grid",drag_to_create:"Drag to create",drag_to_move:"Drag to move",message_ok:"OK",message_cancel:"Cancel",next:"Next",prev:"Previous",year:"Year",month:"Month",day:"Day",hour:"Hour",minute:"Minute"}},scheduler.config={default_date:"%j %M %Y",month_date:"%F %Y",load_date:"%Y-%m-%d",week_date:"%l",day_date:"%D, %F %j",hour_date:"%H:%i",month_day:"%d",xml_date:"%m/%d/%Y %H:%i",api_date:"%d-%m-%Y %H:%i",preserve_length:!0,time_step:5,
start_on_monday:1,first_hour:0,last_hour:24,readonly:!1,drag_resize:1,drag_move:1,drag_create:1,dblclick_create:1,edit_on_create:1,details_on_create:0,resize_month_events:!1,resize_month_timed:!1,cascade_event_display:!1,cascade_event_count:4,cascade_event_margin:30,multi_day:!0,multi_day_height_limit:0,drag_lightbox:!0,preserve_scroll:!0,select:!0,server_utc:!1,touch:!0,touch_tip:!0,touch_drag:500,quick_info_detached:!0,positive_closing:!1,drag_highlight:!0,limit_drag_out:!1,icons_edit:["icon_save","icon_cancel"],
icons_select:["icon_details","icon_edit","icon_delete"],buttons_left:["dhx_save_btn","dhx_cancel_btn"],buttons_right:["dhx_delete_btn"],lightbox:{sections:[{name:"description",height:200,map_to:"text",type:"textarea",focus:!0},{name:"time",height:72,type:"time",map_to:"auto"}]},highlight_displayed_event:!0,left_border:!1,ajax_error:"alert",delay_render:0,timeline_swap_resize:!0,wai_aria_attributes:!0},scheduler.templates={},scheduler.init_templates=function(){var e=scheduler.locale.labels;e.dhx_save_btn=e.icon_save,
e.dhx_cancel_btn=e.icon_cancel,e.dhx_delete_btn=e.icon_delete;var t=scheduler.date.date_to_str,i=scheduler.config,a=function(e,t){for(var i in t)e[i]||(e[i]=t[i])};a(scheduler.templates,{day_date:t(i.default_date),month_date:t(i.month_date),week_date:function(e,t){return scheduler.templates.day_date(e)+" &ndash; "+scheduler.templates.day_date(scheduler.date.add(t,-1,"day"))},day_scale_date:t(i.default_date),month_scale_date:t(i.week_date),week_scale_date:t(i.day_date),hour_scale:t(i.hour_date),time_picker:t(i.hour_date),
event_date:t(i.hour_date),month_day:t(i.month_day),xml_date:scheduler.date.str_to_date(i.xml_date,i.server_utc),load_format:t(i.load_date,i.server_utc),xml_format:t(i.xml_date,i.server_utc),api_date:scheduler.date.str_to_date(i.api_date),event_header:function(e,t,i){return scheduler.templates.event_date(e)+" - "+scheduler.templates.event_date(t)},event_text:function(e,t,i){return i.text},event_class:function(e,t,i){return""},month_date_class:function(e){return""},week_date_class:function(e){return"";
},event_bar_date:function(e,t,i){return scheduler.templates.event_date(e)+" "},event_bar_text:function(e,t,i){return i.text},month_events_link:function(e,t){return"<a>View more("+t+" events)</a>"},drag_marker_class:function(e,t,i){return""},drag_marker_content:function(e,t,i){return""}}),this.callEvent("onTemplatesReady",[])},scheduler.templates.tooltip_date_format=scheduler.date.date_to_str("%Y-%m-%d %H:%i"),scheduler.templates.tooltip_text=function(e,t,i){return"<b>Event:</b> "+i.text+"<br/><b>Start date:</b> "+scheduler.templates.tooltip_date_format(e)+"<br/><b>End date:</b> "+scheduler.templates.tooltip_date_format(t);
},scheduler.uid=function(){return this._seed||(this._seed=(new Date).valueOf()),this._seed++},scheduler._events={},scheduler.clearAll=function(){this._events={},this._loaded={},this._edit_id=null,this._select_id=null,this._drag_id=null,this._drag_mode=null,this._drag_pos=null,this.clear_view(),this.callEvent("onClearAll",[])},scheduler.addEvent=function(e,t,i,a,r){if(!arguments.length)return this.addEventNow();var s=e;1!=arguments.length&&(s=r||{},s.start_date=e,s.end_date=t,s.text=i,s.id=a),s.id=s.id||scheduler.uid(),
s.text=s.text||"","string"==typeof s.start_date&&(s.start_date=this.templates.api_date(s.start_date)),"string"==typeof s.end_date&&(s.end_date=this.templates.api_date(s.end_date));var n=6e4*(this.config.event_duration||this.config.time_step);s.start_date.valueOf()==s.end_date.valueOf()&&s.end_date.setTime(s.end_date.valueOf()+n),s._timed=this.isOneDayEvent(s);var d=!this._events[s.id];return this._events[s.id]=s,this.event_updated(s),this._loading||this.callEvent(d?"onEventAdded":"onEventChanged",[s.id,s]),
s.id},scheduler.deleteEvent=function(e,t){var i=this._events[e];(t||this.callEvent("onBeforeEventDelete",[e,i])&&this.callEvent("onConfirmedBeforeEventDelete",[e,i]))&&(i&&(this._select_id=null,delete this._events[e],this.event_updated(i)),this.callEvent("onEventDeleted",[e,i]))},scheduler.getEvent=function(e){return this._events[e]},scheduler.setEvent=function(e,t){t.id||(t.id=e),this._events[e]=t},scheduler.for_rendered=function(e,t){for(var i=this._rendered.length-1;i>=0;i--)this._rendered[i].getAttribute("event_id")==e&&t(this._rendered[i],i);
},scheduler.changeEventId=function(e,t){if(e!=t){var i=this._events[e];i&&(i.id=t,this._events[t]=i,delete this._events[e]),this.for_rendered(e,function(e){e.setAttribute("event_id",t)}),this._select_id==e&&(this._select_id=t),this._edit_id==e&&(this._edit_id=t),this.callEvent("onEventIdChange",[e,t])}},function(){for(var e=["text","Text","start_date","StartDate","end_date","EndDate"],t=function(e){return function(t){return scheduler.getEvent(t)[e]}},i=function(e){return function(t,i){var a=scheduler.getEvent(t);
a[e]=i,a._changed=!0,a._timed=this.isOneDayEvent(a),scheduler.event_updated(a,!0)}},a=0;a<e.length;a+=2)scheduler["getEvent"+e[a+1]]=t(e[a]),scheduler["setEvent"+e[a+1]]=i(e[a])}(),scheduler.event_updated=function(e,t){this.is_visible_events(e)?this.render_view_data():this.clear_event(e.id)},scheduler.is_visible_events=function(e){var t=e.start_date.valueOf()<this._max_date.valueOf()&&this._min_date.valueOf()<e.end_date.valueOf();if(t){var i=e.start_date.getHours(),a=e.end_date.getHours()+e.end_date.getMinutes()/60,r=this.config.last_hour,s=this.config.first_hour,n=this._table_view||!((a>r||s>a)&&(i>=r||s>i));
if(n)return!0;var d=(e.end_date.valueOf()-e.start_date.valueOf())/36e5,l=24-(this.config.last_hour-this.config.first_hour);return!!(d>l||r>i&&a>=s)}return!1},scheduler.isOneDayEvent=function(e){var t=e.end_date.getDate()-e.start_date.getDate();return t?(0>t&&(t=Math.ceil((e.end_date.valueOf()-e.start_date.valueOf())/864e5)),1==t&&!e.end_date.getHours()&&!e.end_date.getMinutes()&&(e.start_date.getHours()||e.start_date.getMinutes())):e.start_date.getMonth()==e.end_date.getMonth()&&e.start_date.getFullYear()==e.end_date.getFullYear();
},scheduler.get_visible_events=function(e){var t=[];for(var i in this._events)this.is_visible_events(this._events[i])&&(!e||this._events[i]._timed)&&this.filter_event(i,this._events[i])&&t.push(this._events[i]);return t},scheduler.filter_event=function(e,t){var i=this["filter_"+this._mode];return i?i(e,t):!0},scheduler._is_main_area_event=function(e){return!!e._timed},scheduler.render_view_data=function(e,t){var i=!1;if(!e){if(i=!0,this._not_render)return void(this._render_wait=!0);this._render_wait=!1,
this.clear_view(),e=this.get_visible_events(!(this._table_view||this.config.multi_day))}for(var a=0,r=e.length;r>a;a++)this._recalculate_timed(e[a]);if(this.config.multi_day&&!this._table_view){for(var s=[],n=[],a=0;a<e.length;a++)this._is_main_area_event(e[a])?s.push(e[a]):n.push(e[a]);this._rendered_location=this._els.dhx_multi_day[0],this._table_view=!0,this.render_data(n,t),this._table_view=!1,this._rendered_location=this._els.dhx_cal_data[0],this._table_view=!1,this.render_data(s,t)}else this._rendered_location=this._els.dhx_cal_data[0],
this.render_data(e,t);i&&this.callEvent("onDataRender",[])},scheduler._view_month_day=function(e){var t=scheduler.getActionData(e).date;scheduler.callEvent("onViewMoreClick",[t])&&scheduler.setCurrentView(t,"day")},scheduler._render_month_link=function(e){for(var t=this._rendered_location,i=this._lame_clone(e),a=e._sday;a<e._eday;a++){i._sday=a,i._eday=a+1;var r=scheduler.date,s=scheduler._min_date;s=r.add(s,i._sweek,"week"),s=r.add(s,i._sday,"day");var n=scheduler.getEvents(s,r.add(s,1,"day")).length,d=this._get_event_bar_pos(i),l=d.x2-d.x,o=document.createElement("div");
o.onclick=function(e){scheduler._view_month_day(e||event)},o.className="dhx_month_link",o.style.top=d.y+"px",o.style.left=d.x+"px",o.style.width=l+"px",o.innerHTML=scheduler.templates.month_events_link(s,n),this._rendered.push(o),t.appendChild(o)}},scheduler._recalculate_timed=function(e){if(e){var t;t="object"!=typeof e?this._events[e]:e,t&&(t._timed=scheduler.isOneDayEvent(t))}},scheduler.attachEvent("onEventChanged",scheduler._recalculate_timed),scheduler.attachEvent("onEventAdded",scheduler._recalculate_timed),
scheduler.render_data=function(e,t){e=this._pre_render_events(e,t);for(var i=0;i<e.length;i++)if(this._table_view)if("month"!=scheduler._mode)this.render_event_bar(e[i]);else{var a=scheduler.config.max_month_events;a!==1*a||e[i]._sorder<a?this.render_event_bar(e[i]):void 0!==a&&e[i]._sorder==a&&scheduler._render_month_link(e[i])}else this.render_event(e[i])},scheduler._get_first_visible_cell=function(e){for(var t=0;t<e.length;t++)if(-1==(e[t].className||"").indexOf("dhx_scale_ignore"))return e[t];
return e[0]},scheduler._pre_render_events=function(e,t){var i=this.xy.bar_height,a=this._colsS.heights,r=this._colsS.heights=[0,0,0,0,0,0,0],s=this._els.dhx_cal_data[0];if(e=this._table_view?this._pre_render_events_table(e,t):this._pre_render_events_line(e,t),this._table_view)if(t)this._colsS.heights=a;else{var n=s.firstChild;if(n.rows){for(var d=0;d<n.rows.length;d++){r[d]++;var l=n.rows[d].cells,o=this._colsS.height-this.xy.month_head_height;if(r[d]*i>o){var h=o;1*this.config.max_month_events!==this.config.max_month_events||r[d]<=this.config.max_month_events?h=r[d]*i:(this.config.max_month_events+1)*i>o&&(h=(this.config.max_month_events+1)*i);
for(var _=0;_<l.length;_++)l[_].childNodes[1].style.height=h+"px"}r[d]=(r[d-1]||0)+scheduler._get_first_visible_cell(l).offsetHeight}if(r.unshift(0),n.parentNode.offsetHeight<n.parentNode.scrollHeight&&!scheduler._colsS.scroll_fix&&scheduler.xy.scroll_width){var c=scheduler._colsS,u=c[c.col_length],g=c.heights.slice();u-=scheduler.xy.scroll_width||0,this._calc_scale_sizes(u,this._min_date,this._max_date),scheduler._colsS.heights=g,this.set_xy(this._els.dhx_cal_header[0],u,this.xy.scale_height),scheduler._render_scales(this._els.dhx_cal_header[0]),
scheduler._render_month_scale(this._els.dhx_cal_data[0],this._get_timeunit_start(),this._min_date),c.scroll_fix=!0}}else if(e.length||"visible"!=this._els.dhx_multi_day[0].style.visibility||(r[0]=-1),e.length||-1==r[0]){var v=(n.parentNode.childNodes,(r[0]+1)*i+1),f=v,m=v+"px";this.config.multi_day_height_limit&&(f=Math.min(v,this.config.multi_day_height_limit),m=f+"px"),s.style.top=this._els.dhx_cal_navline[0].offsetHeight+this._els.dhx_cal_header[0].offsetHeight+f+"px",s.style.height=this._obj.offsetHeight-parseInt(s.style.top,10)-(this.xy.margin_top||0)+"px";
var p=this._els.dhx_multi_day[0];p.style.height=m,p.style.visibility=-1==r[0]?"hidden":"visible";var b=this._els.dhx_multi_day[1];b.style.height=m,b.style.visibility=-1==r[0]?"hidden":"visible",b.className=r[0]?"dhx_multi_day_icon":"dhx_multi_day_icon_small",this._dy_shift=(r[0]+1)*i,this.config.multi_day_height_limit&&(this._dy_shift=Math.min(this.config.multi_day_height_limit,this._dy_shift)),r[0]=0,f!=v&&(s.style.top=parseInt(s.style.top)+2+"px",p.style.overflowY="auto",b.style.position="fixed",
b.style.top="",b.style.left="")}}return e},scheduler._get_event_sday=function(e){var t=this.date.day_start(new Date(e.start_date));return Math.round((t.valueOf()-this._min_date.valueOf())/864e5)},scheduler._get_event_mapped_end_date=function(e){var t=e.end_date;if(this.config.separate_short_events){var i=(e.end_date-e.start_date)/6e4;i<this._min_mapped_duration&&(t=this.date.add(t,this._min_mapped_duration-i,"minute"))}return t},scheduler._pre_render_events_line=function(e,t){e.sort(function(e,t){
return e.start_date.valueOf()==t.start_date.valueOf()?e.id>t.id?1:-1:e.start_date>t.start_date?1:-1});var i=[],a=[];this._min_mapped_duration=Math.ceil(60*this.xy.min_event_height/this.config.hour_size_px);for(var r=0;r<e.length;r++){var s=e[r],n=s.start_date,d=s.end_date,l=n.getHours(),o=d.getHours();if(s._sday=this._get_event_sday(s),this._ignores[s._sday])e.splice(r,1),r--;else{if(i[s._sday]||(i[s._sday]=[]),!t){s._inner=!1;for(var h=i[s._sday];h.length;){var _=h[h.length-1],c=this._get_event_mapped_end_date(_);
if(!(c.valueOf()<=s.start_date.valueOf()))break;h.splice(h.length-1,1)}for(var u=h.length,g=!1,v=0;v<h.length;v++){var _=h[v],c=this._get_event_mapped_end_date(_);if(c.valueOf()<=s.start_date.valueOf()){g=!0,s._sorder=_._sorder,u=v,s._inner=!0;break}}if(h.length&&(h[h.length-1]._inner=!0),!g)if(h.length)if(h.length<=h[h.length-1]._sorder){if(h[h.length-1]._sorder)for(v=0;v<h.length;v++){for(var f=!1,m=0;m<h.length;m++)if(h[m]._sorder==v){f=!0;break}if(!f){s._sorder=v;break}}else s._sorder=0;s._inner=!0;
}else{var p=h[0]._sorder;for(v=1;v<h.length;v++)h[v]._sorder>p&&(p=h[v]._sorder);s._sorder=p+1,s._inner=!1}else s._sorder=0;h.splice(u,u==h.length?0:1,s),h.length>(h.max_count||0)?(h.max_count=h.length,s._count=h.length):s._count=s._count?s._count:1}(l<this.config.first_hour||o>=this.config.last_hour)&&(a.push(s),e[r]=s=this._copy_event(s),l<this.config.first_hour&&(s.start_date.setHours(this.config.first_hour),s.start_date.setMinutes(0)),o>=this.config.last_hour&&(s.end_date.setMinutes(0),s.end_date.setHours(this.config.last_hour)),
s.start_date>s.end_date||l==this.config.last_hour)&&(e.splice(r,1),r--)}}if(!t){for(var r=0;r<e.length;r++)e[r]._count=i[e[r]._sday].max_count;for(var r=0;r<a.length;r++)a[r]._count=i[a[r]._sday].max_count}return e},scheduler._time_order=function(e){e.sort(function(e,t){return e.start_date.valueOf()==t.start_date.valueOf()?e._timed&&!t._timed?1:!e._timed&&t._timed?-1:e.id>t.id?1:-1:e.start_date>t.start_date?1:-1})},scheduler._pre_render_events_table=function(e,t){this._time_order(e);for(var i,a=[],r=[[],[],[],[],[],[],[]],s=this._colsS.heights,n=this._cols.length,d={},l=0;l<e.length;l++){
var o=e[l],h=o.id;d[h]||(d[h]={first_chunk:!0,last_chunk:!0});var _=d[h],c=i||o.start_date,u=o.end_date;c<this._min_date&&(_.first_chunk=!1,c=this._min_date),u>this._max_date&&(_.last_chunk=!1,u=this._max_date);var g=this.locate_holder_day(c,!1,o);if(o._sday=g%n,!this._ignores[o._sday]||!o._timed){var v=this.locate_holder_day(u,!0,o)||n;o._eday=v%n||n,o._length=v-g,o._sweek=Math.floor((this._correct_shift(c.valueOf(),1)-this._min_date.valueOf())/(864e5*n));var f,m=r[o._sweek];for(f=0;f<m.length&&!(m[f]._eday<=o._sday);f++);
if(o._sorder&&t||(o._sorder=f),o._sday+o._length<=n)i=null,a.push(o),m[f]=o,s[o._sweek]=m.length-1,o._first_chunk=_.first_chunk,o._last_chunk=_.last_chunk;else{var p=this._copy_event(o);p.id=o.id,p._length=n-o._sday,p._eday=n,p._sday=o._sday,p._sweek=o._sweek,p._sorder=o._sorder,p.end_date=this.date.add(c,p._length,"day"),p._first_chunk=_.first_chunk,_.first_chunk&&(_.first_chunk=!1),a.push(p),m[f]=p,i=p.end_date,s[o._sweek]=m.length-1,l--}}}return a},scheduler._copy_dummy=function(){var e=new Date(this.start_date),t=new Date(this.end_date);
this.start_date=e,this.end_date=t},scheduler._copy_event=function(e){return this._copy_dummy.prototype=e,new this._copy_dummy},scheduler._rendered=[],scheduler.clear_view=function(){for(var e=0;e<this._rendered.length;e++){var t=this._rendered[e];t.parentNode&&t.parentNode.removeChild(t)}this._rendered=[]},scheduler.updateEvent=function(e){var t=this.getEvent(e);this.clear_event(e),t&&this.is_visible_events(t)&&this.filter_event(e,t)&&(this._table_view||this.config.multi_day||t._timed)&&(this.config.update_render?this.render_view_data():"month"!=this.getState().mode||this.getState().drag_id||this.isOneDayEvent(t)?this.render_view_data([t],!0):this.render_view_data());
},scheduler.clear_event=function(e){this.for_rendered(e,function(e,t){e.parentNode&&e.parentNode.removeChild(e),scheduler._rendered.splice(t,1)})},scheduler._y_from_date=function(e){var t=60*e.getHours()+e.getMinutes();return Math.round((60*t*1e3-60*this.config.first_hour*60*1e3)*this.config.hour_size_px/36e5)%(24*this.config.hour_size_px)},scheduler._calc_event_y=function(e,t){t=t||0;var i=60*e.start_date.getHours()+e.start_date.getMinutes(),a=60*e.end_date.getHours()+e.end_date.getMinutes()||60*scheduler.config.last_hour,r=this._y_from_date(e.start_date),s=Math.max(t,(a-i)*this.config.hour_size_px/60);
return{top:r,height:s}},scheduler.render_event=function(e){var t=scheduler.xy.menu_width,i=this.config.use_select_menu_space?0:t;if(!(e._sday<0)){var a=scheduler.locate_holder(e._sday);if(a){var r=this._calc_event_y(e,scheduler.xy.min_event_height),s=r.top,n=r.height,d=e._count||1,l=e._sorder||0,o=Math.floor((a.clientWidth-i)/d),h=l*o+1;if(e._inner||(o*=d-l),this.config.cascade_event_display){var _=this.config.cascade_event_count,c=this.config.cascade_event_margin;h=l%_*c;var u=e._inner?(d-l-1)%_*c/2:0;
o=Math.floor(a.clientWidth-i-h-u)}var g=this._render_v_bar(e,i+h,s,o,n,e._text_style,scheduler.templates.event_header(e.start_date,e.end_date,e),scheduler.templates.event_text(e.start_date,e.end_date,e));if(this._waiAria.eventAttr(e,g),this._rendered.push(g),a.appendChild(g),h=h+parseInt(a.style.left,10)+i,this._edit_id==e.id){g.style.zIndex=1,o=Math.max(o-4,scheduler.xy.editor_width),g=document.createElement("DIV"),g.setAttribute("event_id",e.id),this._waiAria.eventAttr(e,g),this.set_xy(g,o,n-20,h,s+14),
g.className="dhx_cal_event dhx_cal_editor";var v=scheduler.templates.event_class(e.start_date,e.end_date,e);v&&(g.className+=" "+v);var f=document.createElement("DIV");this.set_xy(f,o-6,n-26),f.style.cssText+=";margin:2px 2px 2px 2px;overflow:hidden;",g.appendChild(f),this._els.dhx_cal_data[0].appendChild(g),this._rendered.push(g),f.innerHTML="<textarea class='dhx_cal_editor'>"+e.text+"</textarea>",this._quirks7&&(f.firstChild.style.height=n-12+"px"),this._editor=f.firstChild,this._editor.onkeydown=function(e){
if((e||event).shiftKey)return!0;var t=(e||event).keyCode;t==scheduler.keys.edit_save&&scheduler.editStop(!0),t==scheduler.keys.edit_cancel&&scheduler.editStop(!1)},this._editor.onselectstart=function(e){return(e||event).cancelBubble=!0,!0},scheduler._focus(f.firstChild,!0),this._els.dhx_cal_data[0].scrollLeft=0}if(0!==this.xy.menu_width&&this._select_id==e.id){this.config.cascade_event_display&&this._drag_mode&&(g.style.zIndex=1);for(var m,p=this.config["icons_"+(this._edit_id==e.id?"edit":"select")],b="",x=e.color?"background-color: "+e.color+";":"",y=e.textColor?"color: "+e.textColor+";":"",w=0;w<p.length;w++)m=this._waiAria.eventMenuAttrString(p[w]),
b+="<div class='dhx_menu_icon "+p[w]+"' style='"+x+y+"' title='"+this.locale.labels[p[w]]+"'"+m+"></div>";var D=this._render_v_bar(e,h-t+1,s,t,20*p.length+26-2,"","<div style='"+x+y+"' class='dhx_menu_head'></div>",b,!0);D.style.left=h-t+1,this._els.dhx_cal_data[0].appendChild(D),this._rendered.push(D)}this.config.drag_highlight&&this._drag_id==e.id&&this.highlightEventPosition(e)}}},scheduler._render_v_bar=function(e,t,i,a,r,s,n,d,l){var o=document.createElement("DIV"),h=e.id,_=l?"dhx_cal_event dhx_cal_select_menu":"dhx_cal_event",c=scheduler.templates.event_class(e.start_date,e.end_date,e);
c&&(_=_+" "+c);var u=e.color?"background:"+e.color+";":"",g=e.textColor?"color:"+e.textColor+";":"",v='<div event_id="'+h+'" class="'+_+'" style="position:absolute; top:'+i+"px; left:"+t+"px; width:"+(a-4)+"px; height:"+r+"px;"+(s||"")+'"></div>';o.innerHTML=v;var f=o.cloneNode(!0).firstChild;if(!l&&scheduler.renderEvent(f,e,a,r,n,d))return f;f=o.firstChild;var m='<div class="dhx_event_move dhx_header" style=" width:'+(a-6)+"px;"+u+'" >&nbsp;</div>';m+='<div class="dhx_event_move dhx_title" style="'+u+g+'">'+n+"</div>",
m+='<div class="dhx_body" style=" width:'+(a-(this._quirks?4:14))+"px; height:"+(r-(this._quirks?20:30)+1)+"px;"+u+g+'">'+d+"</div>";var p="dhx_event_resize dhx_footer";return l&&(p="dhx_resize_denied "+p),m+='<div class="'+p+'" style=" width:'+(a-8)+"px;"+(l?" margin-top:-1px;":"")+u+g+'" ></div>',f.innerHTML=m,f},scheduler.renderEvent=function(){return!1},scheduler.locate_holder=function(e){return"day"==this._mode?this._els.dhx_cal_data[0].firstChild:this._els.dhx_cal_data[0].childNodes[e]},scheduler.locate_holder_day=function(e,t){
var i=Math.floor((this._correct_shift(e,1)-this._min_date)/864e5);return t&&this.date.time_part(e)&&i++,i},scheduler._get_dnd_order=function(e,t,i){if(!this._drag_event)return e;this._drag_event._orig_sorder?e=this._drag_event._orig_sorder:this._drag_event._orig_sorder=e;for(var a=t*e;a+t>i;)e--,a-=t;return e=Math.max(e,0)},scheduler._get_event_bar_pos=function(e){var t=this._colsS[e._sday],i=this._colsS[e._eday];i==t&&(i=this._colsS[e._eday+1]);var a=this.xy.bar_height,r=e._sorder;if(e.id==this._drag_id){
var s=this._colsS.heights[e._sweek+1]-this._colsS.heights[e._sweek]-this.xy.month_head_height;r=scheduler._get_dnd_order(r,a,s)}var n=r*a,d=this._colsS.heights[e._sweek]+(this._colsS.height?this.xy.month_scale_height+2:2)+n;return{x:t,x2:i,y:d}},scheduler.render_event_bar=function(e){var t=this._rendered_location,i=this._get_event_bar_pos(e),a=i.y,r=i.x,s=i.x2,n="";if(s){var d=scheduler.config.resize_month_events&&"month"==this._mode&&(!e._timed||scheduler.config.resize_month_timed),l=document.createElement("DIV"),o=e.hasOwnProperty("_first_chunk")&&e._first_chunk,h=e.hasOwnProperty("_last_chunk")&&e._last_chunk,_=d&&(e._timed||o),c=d&&(e._timed||h),u="dhx_cal_event_clear";
(!e._timed||d)&&(u="dhx_cal_event_line"),o&&(u+=" dhx_cal_event_line_start"),h&&(u+=" dhx_cal_event_line_end"),_&&(n+="<div class='dhx_event_resize dhx_event_resize_start'></div>"),c&&(n+="<div class='dhx_event_resize dhx_event_resize_end'></div>");var g=scheduler.templates.event_class(e.start_date,e.end_date,e);g&&(u+=" "+g);var v=e.color?"background:"+e.color+";":"",f=e.textColor?"color:"+e.textColor+";":"",m=["position:absolute","top:"+a+"px","left:"+r+"px","width:"+(s-r-15)+"px",f,v,e._text_style||""].join(";"),p="<div event_id='"+e.id+"' class='"+u+"' style='"+m+"'"+this._waiAria.eventBarAttrString(e)+">";
d&&(p+=n),"month"==scheduler.getState().mode&&(e=scheduler.getEvent(e.id)),e._timed&&(p+=scheduler.templates.event_bar_date(e.start_date,e.end_date,e)),p+=scheduler.templates.event_bar_text(e.start_date,e.end_date,e)+"</div>",p+="</div>",l.innerHTML=p,this._rendered.push(l.firstChild),t.appendChild(l.firstChild)}},scheduler._locate_event=function(e){for(var t=null;e&&!t&&e.getAttribute;)t=e.getAttribute("event_id"),e=e.parentNode;return t},scheduler._locate_css=function(e,t,i){void 0===i&&(i=!0);for(var a=e.target||e.srcElement,r="";a;){
if(r=scheduler._getClassName(a)){var s=r.indexOf(t);if(s>=0){if(!i)return a;var n=0===s||!scheduler._trim(r.charAt(s-1)),d=s+t.length>=r.length||!scheduler._trim(r.charAt(s+t.length));if(n&&d)return a}}a=a.parentNode}return null},scheduler.edit=function(e){this._edit_id!=e&&(this.editStop(!1,e),this._edit_id=e,this.updateEvent(e))},scheduler.editStop=function(e,t){if(!t||this._edit_id!=t){var i=this.getEvent(this._edit_id);i&&(e&&(i.text=this._editor.value),this._edit_id=null,this._editor=null,this.updateEvent(i.id),
this._edit_stop_event(i,e))}},scheduler._edit_stop_event=function(e,t){this._new_event?(t?this.callEvent("onEventAdded",[e.id,e]):e&&this.deleteEvent(e.id,!0),this._new_event=null):t&&this.callEvent("onEventChanged",[e.id,e])},scheduler.getEvents=function(e,t){var i=[];for(var a in this._events){var r=this._events[a];r&&(!e&&!t||r.start_date<t&&r.end_date>e)&&i.push(r)}return i},scheduler.getRenderedEvent=function(e){if(e){for(var t=scheduler._rendered,i=0;i<t.length;i++){var a=t[i];if(a.getAttribute("event_id")==e)return a;
}return null}},scheduler.showEvent=function(e,t){var i="number"==typeof e||"string"==typeof e?scheduler.getEvent(e):e;if(t=t||scheduler._mode,i&&(!this.checkEvent("onBeforeEventDisplay")||this.callEvent("onBeforeEventDisplay",[i,t]))){var a=scheduler.config.scroll_hour;scheduler.config.scroll_hour=i.start_date.getHours();var r=scheduler.config.preserve_scroll;scheduler.config.preserve_scroll=!1;var s=i.color,n=i.textColor;if(scheduler.config.highlight_displayed_event&&(i.color=scheduler.config.displayed_event_color,
i.textColor=scheduler.config.displayed_event_text_color),scheduler.setCurrentView(new Date(i.start_date),t),i.color=s,i.textColor=n,scheduler.config.scroll_hour=a,scheduler.config.preserve_scroll=r,scheduler.matrix&&scheduler.matrix[t]){var d=scheduler.getRenderedEvent(i.id);d&&(scheduler._els.dhx_cal_data[0].scrollTop=getAbsoluteTop(d)-getAbsoluteTop(scheduler._els.dhx_cal_data[0])-20)}scheduler.callEvent("onAfterEventDisplay",[i,t])}},scheduler._append_drag_marker=function(e){if(!e.parentNode){
var t=scheduler._els.dhx_cal_data[0],i=t.lastChild,a=scheduler._getClassName(i);a.indexOf("dhx_scale_holder")<0&&i.previousSibling&&(i=i.previousSibling),a=scheduler._getClassName(i),i&&0===a.indexOf("dhx_scale_holder")&&i.appendChild(e)}},scheduler._update_marker_position=function(e,t){var i=scheduler._calc_event_y(t,0);e.style.top=i.top+"px",e.style.height=i.height+"px"},scheduler.highlightEventPosition=function(e){var t=document.createElement("div");t.setAttribute("event_id",e.id),this._rendered.push(t),
this._update_marker_position(t,e);var i=this.templates.drag_marker_class(e.start_date,e.end_date,e),a=this.templates.drag_marker_content(e.start_date,e.end_date,e);t.className="dhx_drag_marker",i&&(t.className+=" "+i),a&&(t.innerHTML=a),this._append_drag_marker(t)},scheduler._loaded={},scheduler._load=function(e,t){if(e=e||this._load_url){e+=(-1==e.indexOf("?")?"?":"&")+"timeshift="+(new Date).getTimezoneOffset(),this.config.prevent_cache&&(e+="&uid="+this.uid());var i;if(t=t||this._date,this._load_mode){
var a=this.templates.load_format;for(t=this.date[this._load_mode+"_start"](new Date(t.valueOf()));t>this._min_date;)t=this.date.add(t,-1,this._load_mode);i=t;for(var r=!0;i<this._max_date;)i=this.date.add(i,1,this._load_mode),this._loaded[a(t)]&&r?t=this.date.add(t,1,this._load_mode):r=!1;var s=i;do i=s,s=this.date.add(i,-1,this._load_mode);while(s>t&&this._loaded[a(s)]);if(t>=i)return!1;for(dhtmlxAjax.get(e+"&from="+a(t)+"&to="+a(i),function(e){scheduler.on_load(e)});i>t;)this._loaded[a(t)]=!0,t=this.date.add(t,1,this._load_mode);
}else dhtmlxAjax.get(e,function(e){scheduler.on_load(e)});return this.callEvent("onXLS",[]),!0}},scheduler.on_load=function(e){var t,i=!1;if(this._process&&"xml"!=this._process)try{t=this[this._process].parse(e.xmlDoc.responseText)}catch(a){i=!0}else t=this._magic_parser(e),t||(i=!0);i&&(this.callEvent("onLoadError",[e.xmlDoc]),t=[]),scheduler._process_loading(t),this.callEvent("onXLE",[])},scheduler._process_loading=function(e){this._loading=!0,this._not_render=!0;for(var t=0;t<e.length;t++)this.callEvent("onEventLoading",[e[t]])&&this.addEvent(e[t]);
this._not_render=!1,this._render_wait&&this.render_view_data(),this._loading=!1,this._after_call&&this._after_call(),this._after_call=null},scheduler._init_event=function(e){e.text=e.text||e._tagvalue||"",e.start_date=scheduler._init_date(e.start_date),e.end_date=scheduler._init_date(e.end_date)},scheduler._init_date=function(e){return e?"string"==typeof e?scheduler.templates.xml_date(e):new Date(e):null},scheduler.json={},scheduler.json.parse=function(data){"string"==typeof data&&(window.JSON?scheduler._temp=JSON.parse(data):scheduler._temp=eval("("+data+")"),
data=scheduler._temp?scheduler._temp.data||scheduler._temp.d||scheduler._temp:[]),data.dhx_security&&(dhtmlx.security_key=data.dhx_security);var collections=scheduler._temp&&scheduler._temp.collections?scheduler._temp.collections:{},collections_loaded=!1;for(var key in collections)if(collections.hasOwnProperty(key)){collections_loaded=!0;var collection=collections[key],arr=scheduler.serverList[key];if(!arr)continue;arr.splice(0,arr.length);for(var j=0;j<collection.length;j++){var option=collection[j],obj={
key:option.value,label:option.label};for(var option_key in option)if(option.hasOwnProperty(option_key)){if("value"==option_key||"label"==option_key)continue;obj[option_key]=option[option_key]}arr.push(obj)}}collections_loaded&&scheduler.callEvent("onOptionsLoad",[]);for(var evs=[],i=0;i<data.length;i++){var event=data[i];scheduler._init_event(event),evs.push(event)}return evs},scheduler.parse=function(e,t){this._process=t,this.on_load({xmlDoc:{responseText:e}})},scheduler.load=function(e,t){"string"==typeof t&&(this._process=t,
t=arguments[2]),this._load_url=e,this._after_call=t,this._load(e,this._date)},scheduler.setLoadMode=function(e){"all"==e&&(e=""),this._load_mode=e},scheduler.serverList=function(e,t){return t?(this.serverList[e]=t.slice(0),this.serverList[e]):(this.serverList[e]=this.serverList[e]||[],this.serverList[e])},scheduler._userdata={},scheduler._magic_parser=function(e){var t;if(!e.getXMLTopNode){var i=e.xmlDoc.responseText;e=new dtmlXMLLoaderObject(function(){}),e.loadXMLString(i)}if(t=e.getXMLTopNode("data"),
"data"!=t.tagName)return null;var a=t.getAttribute("dhx_security");a&&(dhtmlx.security_key=a);for(var r=e.doXPath("//coll_options"),s=0;s<r.length;s++){var n=r[s].getAttribute("for"),d=this.serverList[n];if(d){d.splice(0,d.length);for(var l=e.doXPath(".//item",r[s]),o=0;o<l.length;o++){for(var h=l[o],_=h.attributes,c={key:l[o].getAttribute("value"),label:l[o].getAttribute("label")},u=0;u<_.length;u++){var g=_[u];"value"!=g.nodeName&&"label"!=g.nodeName&&(c[g.nodeName]=g.nodeValue)}d.push(c)}}}r.length&&scheduler.callEvent("onOptionsLoad",[]);
for(var v=e.doXPath("//userdata"),s=0;s<v.length;s++){var f=this._xmlNodeToJSON(v[s]);this._userdata[f.name]=f.text}var m=[];t=e.doXPath("//event");for(var s=0;s<t.length;s++){var p=m[s]=this._xmlNodeToJSON(t[s]);scheduler._init_event(p)}return m},scheduler._xmlNodeToJSON=function(e){for(var t={},i=0;i<e.attributes.length;i++)t[e.attributes[i].name]=e.attributes[i].value;for(var i=0;i<e.childNodes.length;i++){var a=e.childNodes[i];1==a.nodeType&&(t[a.tagName]=a.firstChild?a.firstChild.nodeValue:"");
}return t.text||(t.text=e.firstChild?e.firstChild.nodeValue:""),t},scheduler.attachEvent("onXLS",function(){if(this.config.show_loading===!0){var e;e=this.config.show_loading=document.createElement("DIV"),e.className="dhx_loading",e.style.left=Math.round((this._x-128)/2)+"px",e.style.top=Math.round((this._y-15)/2)+"px",this._obj.appendChild(e)}}),scheduler.attachEvent("onXLE",function(){var e=this.config.show_loading;e&&"object"==typeof e&&(this._obj.removeChild(e),this.config.show_loading=!0)}),
scheduler.ical={parse:function(e){var t=e.match(RegExp(this.c_start+"[^\f]*"+this.c_end,""));if(t.length){t[0]=t[0].replace(/[\r\n]+(?=[a-z \t])/g," "),t[0]=t[0].replace(/\;[^:\r\n]*:/g,":");for(var i,a=[],r=RegExp("(?:"+this.e_start+")([^\f]*?)(?:"+this.e_end+")","g");null!==(i=r.exec(t));){for(var s,n={},d=/[^\r\n]+[\r\n]+/g;null!==(s=d.exec(i[1]));)this.parse_param(s.toString(),n);n.uid&&!n.id&&(n.id=n.uid),a.push(n)}return a}},parse_param:function(e,t){var i=e.indexOf(":");if(-1!=i){var a=e.substr(0,i).toLowerCase(),r=e.substr(i+1).replace(/\\\,/g,",").replace(/[\r\n]+$/,"");
"summary"==a?a="text":"dtstart"==a?(a="start_date",r=this.parse_date(r,0,0)):"dtend"==a&&(a="end_date",r=this.parse_date(r,0,0)),t[a]=r}},parse_date:function(e,t,i){var a=e.split("T");a[1]&&(t=a[1].substr(0,2),i=a[1].substr(2,2));var r=a[0].substr(0,4),s=parseInt(a[0].substr(4,2),10)-1,n=a[0].substr(6,2);return scheduler.config.server_utc&&!a[1]?new Date(Date.UTC(r,s,n,t,i)):new Date(r,s,n,t,i)},c_start:"BEGIN:VCALENDAR",e_start:"BEGIN:VEVENT",e_end:"END:VEVENT",c_end:"END:VCALENDAR"},scheduler._lightbox_controls={},
scheduler.formSection=function(e){var t=this.config.lightbox.sections,i=0;for(i;i<t.length&&t[i].name!=e;i++);var a=t[i];scheduler._lightbox||scheduler.getLightbox();var r=document.getElementById(a.id),s=r.nextSibling,n={section:a,header:r,node:s,getValue:function(e){return scheduler.form_blocks[a.type].get_value(s,e||{},a)},setValue:function(e,t){return scheduler.form_blocks[a.type].set_value(s,e,t||{},a)}},d=scheduler._lightbox_controls["get_"+a.type+"_control"];return d?d(n):n},scheduler._lightbox_controls.get_template_control=function(e){
return e.control=e.node,e},scheduler._lightbox_controls.get_select_control=function(e){return e.control=e.node.getElementsByTagName("select")[0],e},scheduler._lightbox_controls.get_textarea_control=function(e){return e.control=e.node.getElementsByTagName("textarea")[0],e},scheduler._lightbox_controls.get_time_control=function(e){return e.control=e.node.getElementsByTagName("select"),e},scheduler.form_blocks={template:{render:function(e){var t=(e.height||"30")+"px";return"<div class='dhx_cal_ltext dhx_cal_template' style='height:"+t+";'></div>";
},set_value:function(e,t,i,a){e.innerHTML=t||""},get_value:function(e,t,i){return e.innerHTML||""},focus:function(e){}},textarea:{render:function(e){var t=(e.height||"130")+"px";return"<div class='dhx_cal_ltext' style='height:"+t+";'><textarea></textarea></div>"},set_value:function(e,t,i){scheduler.form_blocks.textarea._get_input(e).value=t||""},get_value:function(e,t){return scheduler.form_blocks.textarea._get_input(e).value},focus:function(e){var t=scheduler.form_blocks.textarea._get_input(e);scheduler._focus(t,!0);
},_get_input:function(e){return e.getElementsByTagName("textarea")[0]}},select:{render:function(e){for(var t=(e.height||"23")+"px",i="<div class='dhx_cal_ltext' style='height:"+t+";'><select style='width:100%;'>",a=0;a<e.options.length;a++)i+="<option value='"+e.options[a].key+"'>"+e.options[a].label+"</option>";return i+="</select></div>"},set_value:function(e,t,i,a){var r=e.firstChild;!r._dhx_onchange&&a.onchange&&(r.onchange=a.onchange,r._dhx_onchange=!0),"undefined"==typeof t&&(t=(r.options[0]||{}).value),
r.value=t||""},get_value:function(e,t){return e.firstChild.value},focus:function(e){var t=e.firstChild;scheduler._focus(t,!0)}},time:{render:function(e){e.time_format||(e.time_format=["%H:%i","%d","%m","%Y"]),e._time_format_order={};var t=e.time_format,i=scheduler.config,a=this.date.date_part(scheduler._currentDate()),r=1440,s=0;scheduler.config.limit_time_select&&(r=60*i.last_hour+1,s=60*i.first_hour,a.setHours(i.first_hour));for(var n="",d=0;d<t.length;d++){var l=t[d];d>0&&(n+=" ");var o="";switch(l){
case"%Y":e._time_format_order[3]=d;for(var h=a.getFullYear()-5,_=0;10>_;_++)o+="<option value='"+(h+_)+"'>"+(h+_)+"</option>";break;case"%m":e._time_format_order[2]=d;for(var _=0;12>_;_++)o+="<option value='"+_+"'>"+this.locale.date.month_full[_]+"</option>";break;case"%d":e._time_format_order[1]=d;for(var _=1;32>_;_++)o+="<option value='"+_+"'>"+_+"</option>";break;case"%H:%i":e._time_format_order[0]=d;var _=s,c=a.getDate();for(e._time_values=[];r>_;){var u=this.templates.time_picker(a);o+="<option value='"+_+"'>"+u+"</option>",
e._time_values.push(_),a.setTime(a.valueOf()+60*this.config.time_step*1e3);var g=a.getDate()!=c?1:0;_=24*g*60+60*a.getHours()+a.getMinutes()}}if(o){var v=scheduler._waiAria.lightboxSelectAttrString(l),f=e.readonly?"disabled='disabled'":"";n+="<select "+f+v+">"+o+"</select> "}}return"<div style='height:30px;padding-top:0px;font-size:inherit;' class='dhx_section_time'>"+n+"<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>"+n+"</div>"},set_value:function(e,t,i,a){function r(e,t,i){
for(var r=a._time_values,s=60*i.getHours()+i.getMinutes(),n=s,d=!1,l=0;l<r.length;l++){var h=r[l];if(h===s){d=!0;break}s>h&&(n=h)}e[t+o[0]].value=d?s:n,d||n||(e[t+o[0]].selectedIndex=-1),e[t+o[1]].value=i.getDate(),e[t+o[2]].value=i.getMonth(),e[t+o[3]].value=i.getFullYear()}var s,n,d=scheduler.config,l=e.getElementsByTagName("select"),o=a._time_format_order;if(d.full_day){if(!e._full_day){var h="<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> "+scheduler.locale.labels.full_day+"&nbsp;</label></input>";
scheduler.config.wide_form||(h=e.previousSibling.innerHTML+h),e.previousSibling.innerHTML=h,e._full_day=!0}var _=e.previousSibling.getElementsByTagName("input")[0];_.checked=0===scheduler.date.time_part(i.start_date)&&0===scheduler.date.time_part(i.end_date),l[o[0]].disabled=_.checked,l[o[0]+l.length/2].disabled=_.checked,_.onclick=function(){if(_.checked){var t={};scheduler.form_blocks.time.get_value(e,t,a),s=scheduler.date.date_part(t.start_date),n=scheduler.date.date_part(t.end_date),(+n==+s||+n>=+s&&(0!==i.end_date.getHours()||0!==i.end_date.getMinutes()))&&(n=scheduler.date.add(n,1,"day"));
}else s=null,n=null;l[o[0]].disabled=_.checked,l[o[0]+l.length/2].disabled=_.checked,r(l,0,s||i.start_date),r(l,4,n||i.end_date)}}if(d.auto_end_date&&d.event_duration)for(var c=function(){s=new Date(l[o[3]].value,l[o[2]].value,l[o[1]].value,0,l[o[0]].value),n=new Date(s.getTime()+60*scheduler.config.event_duration*1e3),r(l,4,n)},u=0;4>u;u++)l[u].onchange=c;r(l,0,i.start_date),r(l,4,i.end_date)},get_value:function(e,t,i){var a=e.getElementsByTagName("select"),r=i._time_format_order;if(t.start_date=new Date(a[r[3]].value,a[r[2]].value,a[r[1]].value,0,a[r[0]].value),
t.end_date=new Date(a[r[3]+4].value,a[r[2]+4].value,a[r[1]+4].value,0,a[r[0]+4].value),!a[r[3]].value||!a[r[3]+4].value){var s=this.getEvent(this._lightbox_id);s&&(t.start_date=s.start_date,t.end_date=s.end_date)}return t.end_date<=t.start_date&&(t.end_date=scheduler.date.add(t.start_date,scheduler.config.time_step,"minute")),{start_date:new Date(t.start_date),end_date:new Date(t.end_date)}},focus:function(e){scheduler._focus(e.getElementsByTagName("select")[0])}}},scheduler.showCover=function(e){
if(e){e.style.display="block";var t=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop,i=window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft,a=window.innerHeight||document.documentElement.clientHeight;t?e.style.top=Math.round(t+Math.max((a-e.offsetHeight)/2,0))+"px":e.style.top=Math.round(Math.max((a-e.offsetHeight)/2,0)+9)+"px",document.documentElement.scrollWidth>document.body.offsetWidth?e.style.left=Math.round(i+(document.body.offsetWidth-e.offsetWidth)/2)+"px":e.style.left=Math.round((document.body.offsetWidth-e.offsetWidth)/2)+"px";
}this.show_cover()},scheduler.showLightbox=function(e){if(e){if(!this.callEvent("onBeforeLightbox",[e]))return void(this._new_event&&(this._new_event=null));var t=this.getLightbox();this.showCover(t),this._fill_lightbox(e,t),this._waiAria.lightboxVisibleAttr(t),this.callEvent("onLightbox",[e])}},scheduler._fill_lightbox=function(e,t){var i=this.getEvent(e),a=t.getElementsByTagName("span"),r=[];if(scheduler.templates.lightbox_header){r.push("");var s=scheduler.templates.lightbox_header(i.start_date,i.end_date,i);
r.push(s),a[1].innerHTML="",a[2].innerHTML=s}else{var n=this.templates.event_header(i.start_date,i.end_date,i),d=(this.templates.event_bar_text(i.start_date,i.end_date,i)||"").substr(0,70);r.push(n),r.push(d),a[1].innerHTML=n,a[2].innerHTML=d}this._waiAria.lightboxHeader(t,r.join(" "));for(var l=this.config.lightbox.sections,o=0;o<l.length;o++){var h=l[o],_=document.getElementById(h.id).nextSibling,c=this.form_blocks[h.type],u=void 0!==i[h.map_to]?i[h.map_to]:h.default_value;c.set_value.call(this,_,u,i,h),
l[o].focus&&c.focus.call(this,_)}scheduler._lightbox_id=e},scheduler._lightbox_out=function(e){for(var t=this.config.lightbox.sections,i=0;i<t.length;i++){var a=document.getElementById(t[i].id);a=a?a.nextSibling:a;var r=this.form_blocks[t[i].type],s=r.get_value.call(this,a,e,t[i]);"auto"!=t[i].map_to&&(e[t[i].map_to]=s)}return e},scheduler._empty_lightbox=function(e){var t=scheduler._lightbox_id,i=this.getEvent(t);this.getLightbox();this._lame_copy(i,e),this.setEvent(i.id,i),this._edit_stop_event(i,!0),
this.render_view_data()},scheduler.hide_lightbox=function(e){var t=this.getLightbox();this.hideCover(t),this._waiAria.lightboxHiddenAttr(t),this._lightbox_id=null,this.callEvent("onAfterLightbox",[])},scheduler.hideCover=function(e){e&&(e.style.display="none"),this.hide_cover()},scheduler.hide_cover=function(){this._cover&&this._cover.parentNode.removeChild(this._cover),this._cover=null},scheduler.show_cover=function(){if(!this._cover){this._cover=document.createElement("DIV"),this._cover.className="dhx_cal_cover";
var e=void 0!==document.height?document.height:document.body.offsetHeight,t=document.documentElement?document.documentElement.scrollHeight:0;this._cover.style.height=Math.max(e,t)+"px",document.body.appendChild(this._cover)}},scheduler.save_lightbox=function(){var e=this._lightbox_out({},this._lame_copy(this.getEvent(this._lightbox_id)));(!this.checkEvent("onEventSave")||this.callEvent("onEventSave",[this._lightbox_id,e,this._new_event]))&&(this._empty_lightbox(e),this.hide_lightbox())},scheduler.startLightbox=function(e,t){
this._lightbox_id=e,this._custom_lightbox=!0,this._temp_lightbox=this._lightbox,this._lightbox=t,this.showCover(t)},scheduler.endLightbox=function(e,t){this._edit_stop_event(scheduler.getEvent(this._lightbox_id),e),e&&scheduler.render_view_data(),this.hideCover(t),this._custom_lightbox&&(this._lightbox=this._temp_lightbox,this._custom_lightbox=!1),this._temp_lightbox=this._lightbox_id=null},scheduler.resetLightbox=function(){scheduler._lightbox&&!scheduler._custom_lightbox&&scheduler._lightbox.parentNode.removeChild(scheduler._lightbox),
scheduler._lightbox=null},scheduler.cancel_lightbox=function(){this.callEvent("onEventCancel",[this._lightbox_id,this._new_event]),this.endLightbox(!1),this.hide_lightbox()},scheduler._init_lightbox_events=function(){this.getLightbox().onclick=function(e){var t=e?e.target:event.srcElement;t.className||(t=t.previousSibling);var i=scheduler._getClassName(t);if(t&&i)switch(i){case"dhx_save_btn":scheduler.save_lightbox();break;case"dhx_delete_btn":var a=scheduler.locale.labels.confirm_deleting;scheduler._dhtmlx_confirm(a,scheduler.locale.labels.title_confirm_deleting,function(){
scheduler.deleteEvent(scheduler._lightbox_id),scheduler._new_event=null,scheduler.hide_lightbox()});break;case"dhx_cancel_btn":scheduler.cancel_lightbox();break;default:if(t.getAttribute("dhx_button"))scheduler.callEvent("onLightboxButton",[i,t,e]);else{var r,s,n;-1!=i.indexOf("dhx_custom_button")&&(-1!=i.indexOf("dhx_custom_button_")?(r=t.parentNode.getAttribute("index"),n=t.parentNode.parentNode):(r=t.getAttribute("index"),n=t.parentNode,t=t.firstChild)),r&&(s=scheduler.form_blocks[scheduler.config.lightbox.sections[r].type],
s.button_click(r,t,n,n.nextSibling))}}},this.getLightbox().onkeydown=function(e){var t=e||window.event,i=e.target||e.srcElement,a=i.querySelector("[dhx_button]");switch(a||(a=i.parentNode.querySelector(".dhx_custom_button, .dhx_readonly")),(e||t).keyCode){case 32:if((e||t).shiftKey)return;a&&a.click&&a.click();break;case scheduler.keys.edit_save:if((e||t).shiftKey)return;a&&a.click?a.click():scheduler.save_lightbox();break;case scheduler.keys.edit_cancel:scheduler.cancel_lightbox()}}},scheduler.setLightboxSize=function(){
var e=this._lightbox;if(e){var t=e.childNodes[1];t.style.height="0px",t.style.height=t.scrollHeight+"px",e.style.height=t.scrollHeight+scheduler.xy.lightbox_additional_height+"px",t.style.height=t.scrollHeight+"px"}},scheduler._init_dnd_events=function(){dhtmlxEvent(document.body,"mousemove",scheduler._move_while_dnd),dhtmlxEvent(document.body,"mouseup",scheduler._finish_dnd),scheduler._init_dnd_events=function(){}},scheduler._move_while_dnd=function(e){if(scheduler._dnd_start_lb){document.dhx_unselectable||(document.body.className+=" dhx_unselectable",
document.dhx_unselectable=!0);var t=scheduler.getLightbox(),i=e&&e.target?[e.pageX,e.pageY]:[event.clientX,event.clientY];t.style.top=scheduler._lb_start[1]+i[1]-scheduler._dnd_start_lb[1]+"px",t.style.left=scheduler._lb_start[0]+i[0]-scheduler._dnd_start_lb[0]+"px"}},scheduler._ready_to_dnd=function(e){var t=scheduler.getLightbox();scheduler._lb_start=[parseInt(t.style.left,10),parseInt(t.style.top,10)],scheduler._dnd_start_lb=e&&e.target?[e.pageX,e.pageY]:[event.clientX,event.clientY]},scheduler._finish_dnd=function(){
scheduler._lb_start&&(scheduler._lb_start=scheduler._dnd_start_lb=!1,document.body.className=document.body.className.replace(" dhx_unselectable",""),document.dhx_unselectable=!1)},scheduler.getLightbox=function(){if(!this._lightbox){var e=document.createElement("DIV");e.className="dhx_cal_light",scheduler.config.wide_form&&(e.className+=" dhx_cal_light_wide"),scheduler.form_blocks.recurring&&(e.className+=" dhx_cal_light_rec"),/msie|MSIE 6/.test(navigator.userAgent)&&(e.className+=" dhx_ie6"),e.style.visibility="hidden";
for(var t=this._lightbox_template,i=this.config.buttons_left,a="",r=0;r<i.length;r++)a=this._waiAria.lightboxButtonAttrString(i[r]),t+="<div "+a+" class='dhx_btn_set dhx_left_btn_set "+i[r]+"_set'><div dhx_button='1' class='"+i[r]+"'></div><div>"+scheduler.locale.labels[i[r]]+"</div></div>";i=this.config.buttons_right;for(var r=0;r<i.length;r++)a=this._waiAria.lightboxButtonAttrString(i[r]),t+="<div "+a+" class='dhx_btn_set dhx_right_btn_set "+i[r]+"_set' style='float:right;'><div dhx_button='1' class='"+i[r]+"'></div><div>"+scheduler.locale.labels[i[r]]+"</div></div>";
t+="</div>",e.innerHTML=t,scheduler.config.drag_lightbox&&(e.firstChild.onmousedown=scheduler._ready_to_dnd,e.firstChild.onselectstart=function(){return!1},e.firstChild.style.cursor="pointer",scheduler._init_dnd_events()),this._waiAria.lightboxAttr(e),document.body.insertBefore(e,document.body.firstChild),this._lightbox=e;var s=this.config.lightbox.sections;t="";for(var r=0;r<s.length;r++){var n=this.form_blocks[s[r].type];if(n){s[r].id="area_"+this.uid();var d="";if(s[r].button){var a=scheduler._waiAria.lightboxSectionButtonAttrString(this.locale.labels["button_"+s[r].button]);
d="<div "+a+" class='dhx_custom_button' index='"+r+"'><div class='dhx_custom_button_"+s[r].button+"'></div><div>"+this.locale.labels["button_"+s[r].button]+"</div></div>"}this.config.wide_form&&(t+="<div class='dhx_wrap_section'>");var l=this.locale.labels["section_"+s[r].name];"string"!=typeof l&&(l=s[r].name),t+="<div id='"+s[r].id+"' class='dhx_cal_lsection'>"+d+"<label>"+l+"</label></div>"+n.render.call(this,s[r]),t+="</div>"}}for(var o=e.getElementsByTagName("div"),r=0;r<o.length;r++){var h=o[r],_=scheduler._getClassName(h);
if("dhx_cal_larea"==_){h.innerHTML=t;break}}for(var r=0;r<s.length;r++){var c=s[r];if(c.id&&document.getElementById(c.id)){var u=document.getElementById(c.id),g=u.querySelector("label"),v=u.nextSibling;if(v){var f=v.querySelector("input, select, textarea");f&&(c.inputId=f.id||"input_"+scheduler.uid(),f.id||(f.id=c.inputId),g.setAttribute("for",c.inputId))}}}this.setLightboxSize(),this._init_lightbox_events(this),e.style.display="none",e.style.visibility="visible"}return this._lightbox},scheduler.attachEvent("onEventIdChange",function(e,t){
this._lightbox_id==e&&(this._lightbox_id=t)}),scheduler._lightbox_template="<div class='dhx_cal_ltitle'><span class='dhx_mark'>&nbsp;</span><span class='dhx_time'></span><span class='dhx_title'></span></div><div class='dhx_cal_larea'></div>",scheduler._init_touch_events=function(){"force"!=this.config.touch&&(this.config.touch=this.config.touch&&(-1!=navigator.userAgent.indexOf("Mobile")||-1!=navigator.userAgent.indexOf("iPad")||-1!=navigator.userAgent.indexOf("Android")||-1!=navigator.userAgent.indexOf("Touch"))),
this.config.touch&&(this.xy.scroll_width=0,window.navigator.msPointerEnabled?(this._touch_events(["MSPointerMove","MSPointerDown","MSPointerUp"],function(e){return e.pointerType==e.MSPOINTER_TYPE_MOUSE?null:e},function(e){return!e||e.pointerType==e.MSPOINTER_TYPE_MOUSE||scheduler._pointerDragId&&scheduler._pointerDragId!=e.pointerId}),this._obj.ondblclick=function(){}):this._touch_events(["touchmove","touchstart","touchend"],function(e){return e.touches&&e.touches.length>1?null:e.touches&&e.touches[0]?{
target:e.target,pageX:e.touches[0].pageX,pageY:e.touches[0].pageY}:e},function(e){return!!(e.touches&&e.touches.length>1)}))},scheduler._touch_events=function(e,t,i){function a(e,t,i){dhtmlxEvent(e,t,function(e){return scheduler._is_lightbox_open()?!0:i(e)})}function r(e,t,i,a){if(e&&t){for(var r=e.target;r&&r!=scheduler._obj;)r=r.parentNode;if(r==scheduler._obj){var s=Math.abs(e.pageY-t.pageY),n=Math.abs(e.pageX-t.pageX);a>s&&n>i&&(!s||n/s>3)&&(e.pageX>t.pageX?scheduler._click.dhx_cal_next_button():scheduler._click.dhx_cal_prev_button());
}}}function s(e){var t=scheduler.getState().drag_mode,i=scheduler.matrix?scheduler.matrix[scheduler._mode]:!1,a=scheduler.render_view_data;"create"==t&&i&&(scheduler.render_view_data=function(){for(var e=scheduler.getState().drag_id,t=scheduler.getEvent(e),a=i.y_property,r=scheduler.getEvents(t.start_date,t.end_date),s=0;s<r.length;s++)r[s][a]!=t[a]&&(r.splice(s,1),s--);t._sorder=r.length-1,t._count=r.length,this.render_data([t],scheduler.getState().mode)}),scheduler._on_mouse_move(e),"create"==t&&i&&(scheduler.render_view_data=a);
}function n(e){scheduler._hide_global_tip(),h&&(scheduler._on_mouse_up(t(e||event)),scheduler._temp_touch_block=!1),scheduler._drag_id=null,scheduler._drag_mode=null,scheduler._drag_pos=null,scheduler._pointerDragId=null,clearTimeout(o),h=c=!1,_=!0}var d,l,o,h,_,c,u=(-1!=navigator.userAgent.indexOf("Android")&&-1!=navigator.userAgent.indexOf("WebKit"),0);a(document.body,e[0],function(e){if(!i(e)){var a=t(e);if(a){if(h)return s(a),scheduler._update_global_tip(),e.preventDefault&&e.preventDefault(),
e.cancelBubble=!0,!1;if(l=t(e),c)return l?void((d.target!=l.target||Math.abs(d.pageX-l.pageX)>5||Math.abs(d.pageY-l.pageY)>5)&&(_=!0,clearTimeout(o))):void(_=!0)}}}),a(this._els.dhx_cal_data[0],"scroll",n),a(this._els.dhx_cal_data[0],"touchcancel",n),a(this._els.dhx_cal_data[0],"contextmenu",function(e){return c?(e&&e.preventDefault&&e.preventDefault(),(e||event).cancelBubble=!0,!1):void 0}),a(this._obj,e[1],function(e){if(!i(e)){scheduler._pointerDragId=e.pointerId;var a;if(h=_=!1,c=!0,scheduler._temp_touch_block=!0,
a=l=t(e),!a)return void(_=!0);var r=new Date;if(!_&&!h&&250>r-u)return scheduler._click.dhx_cal_data(a),window.setTimeout(function(){a.type="dblclick",scheduler._on_dbl_click(a)},50),e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,scheduler._block_next_stop=!0,!1;if(u=r,!_&&!h&&scheduler.config.touch_drag){var s=scheduler._locate_event(document.activeElement),n=scheduler._locate_event(a.target),g=d?scheduler._locate_event(d.target):null;if(s&&n&&s==n&&s!=g)return e.preventDefault&&e.preventDefault(),
e.cancelBubble=!0,scheduler._ignore_next_click=!1,scheduler._click.dhx_cal_data(a),d=a,!1;o=setTimeout(function(){h=!0;var e=d.target,t=scheduler._getClassName(e);e&&-1!=t.indexOf("dhx_body")&&(e=e.previousSibling),scheduler._on_mouse_down(d,e),scheduler._drag_mode&&"create"!=scheduler._drag_mode&&scheduler.for_rendered(scheduler._drag_id,function(e,t){e.style.display="none",scheduler._rendered.splice(t,1)}),scheduler.config.touch_tip&&scheduler._show_global_tip(),scheduler.updateEvent(scheduler._drag_id);
},scheduler.config.touch_drag),d=a}}}),a(this._els.dhx_cal_data[0],e[2],function(e){return i(e)?void 0:(h||r(d,l,200,100),h&&(scheduler._ignore_next_click=!0),n(e),scheduler._block_next_stop?(scheduler._block_next_stop=!1,e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,!1):void 0)}),dhtmlxEvent(document.body,e[2],n)},scheduler._show_global_tip=function(){scheduler._hide_global_tip();var e=scheduler._global_tip=document.createElement("DIV");e.className="dhx_global_tip",scheduler._update_global_tip(1),
document.body.appendChild(e)},scheduler._update_global_tip=function(e){var t=scheduler._global_tip;if(t){var i="";if(scheduler._drag_id&&!e){var a=scheduler.getEvent(scheduler._drag_id);a&&(i="<div>"+(a._timed?scheduler.templates.event_header(a.start_date,a.end_date,a):scheduler.templates.day_date(a.start_date,a.end_date,a))+"</div>")}"create"==scheduler._drag_mode||"new-size"==scheduler._drag_mode?t.innerHTML=(scheduler.locale.labels.drag_to_create||"Drag to create")+i:t.innerHTML=(scheduler.locale.labels.drag_to_move||"Drag to move")+i;
}},scheduler._hide_global_tip=function(){var e=scheduler._global_tip;e&&e.parentNode&&(e.parentNode.removeChild(e),scheduler._global_tip=0)},scheduler._dp_init=function(e){e._methods=["_set_event_text_style","","_dp_change_event_id","_dp_hook_delete"],this._dp_change_event_id=function(e,t){scheduler.getEvent(e)&&scheduler.changeEventId(e,t)},this._dp_hook_delete=function(t,i){return scheduler.getEvent(t)?(t!=i&&("true_deleted"==this.getUserData(t,e.action_param)&&this.setUserData(t,e.action_param,"updated"),
this.changeEventId(t,i)),this.deleteEvent(i,!0)):void 0},this.attachEvent("onEventAdded",function(t){!this._loading&&this._validId(t)&&e.setUpdated(t,!0,"inserted")}),this.attachEvent("onConfirmedBeforeEventDelete",function(t){if(this._validId(t)){var i=e.getState(t);return"inserted"==i||this._new_event?(e.setUpdated(t,!1),!0):"deleted"==i?!1:"true_deleted"==i?!0:(e.setUpdated(t,!0,"deleted"),!1)}}),this.attachEvent("onEventChanged",function(t){!this._loading&&this._validId(t)&&e.setUpdated(t,!0,"updated");
}),scheduler.attachEvent("onClearAll",function(){e._in_progress={},e._invalid={},e.updatedRows=[],e._waitMode=0}),e._objToJson=function(t,i,a){a=a||"",i=i||{};for(var r in t)0!==r.indexOf("_")&&(t[r]&&t[r].getUTCFullYear?i[a+r]=this.obj.templates.xml_format(t[r]):t[r]&&"object"==typeof t[r]?e._objToJson(t[r],i,a+r+"."):i[a+r]=t[r]);return i},e._getRowData=function(e,t){var i=this.obj.getEvent(e);return this._objToJson(i)},e._clearUpdateFlag=function(){},e.attachEvent("insertCallback",scheduler._update_callback),
e.attachEvent("updateCallback",scheduler._update_callback),e.attachEvent("deleteCallback",function(e,t){this.obj.getEvent(t)?(this.obj.setUserData(t,this.action_param,"true_deleted"),this.obj.deleteEvent(t)):this.obj._add_rec_marker&&this.obj._update_callback(e,t)})},scheduler._validId=function(e){return!0},scheduler.setUserData=function(e,t,i){if(e){var a=this.getEvent(e);a&&(a[t]=i)}else this._userdata[t]=i},scheduler.getUserData=function(e,t){if(e){var i=this.getEvent(e);return i?i[t]:null}return this._userdata[t];
},scheduler._set_event_text_style=function(e,t){if(scheduler.getEvent(e)){this.for_rendered(e,function(e){e.style.cssText+=";"+t});var i=this.getEvent(e);i._text_style=t,this.event_updated(i)}},scheduler._update_callback=function(e,t){var i=scheduler._xmlNodeToJSON(e.firstChild);"none"==i.rec_type&&(i.rec_pattern="none"),i.text=i.text||i._tagvalue,i.start_date=scheduler.templates.xml_date(i.start_date),i.end_date=scheduler.templates.xml_date(i.end_date),scheduler.addEvent(i),scheduler._add_rec_marker&&scheduler.setCurrentView();
},scheduler._skin_settings={fix_tab_position:[1,0],use_select_menu_space:[1,0],wide_form:[1,0],hour_size_px:[44,42],displayed_event_color:["#ff4a4a","ffc5ab"],displayed_event_text_color:["#ffef80","7e2727"]},scheduler._skin_xy={lightbox_additional_height:[90,50],nav_height:[59,22],bar_height:[24,20]},scheduler._configure=function(e,t,i){for(var a in t)"undefined"==typeof e[a]&&(e[a]=t[a][i])},scheduler._skin_init=function(){if(!scheduler.skin)for(var e=document.getElementsByTagName("link"),t=0;t<e.length;t++){
var i=e[t].href.match("dhtmlxscheduler_([a-z]+).css");if(i){scheduler.skin=i[1];break}}var a=0;if(!scheduler.skin||"classic"!==scheduler.skin&&"glossy"!==scheduler.skin||(a=1),this._configure(scheduler.config,scheduler._skin_settings,a),this._configure(scheduler.xy,scheduler._skin_xy,a),"flat"===scheduler.skin&&(scheduler.xy.scale_height=35,scheduler.templates.hour_scale=function(e){var t=e.getMinutes();t=10>t?"0"+t:t;var i="<span class='dhx_scale_h'>"+e.getHours()+"</span><span class='dhx_scale_m'>&nbsp;"+t+"</span>";
return i}),!a){var r=scheduler.config.minicalendar;r&&(r.padding=14),scheduler.templates.event_bar_date=function(e,t,i){return"• <b>"+scheduler.templates.event_date(e)+"</b> "},scheduler.attachEvent("onTemplatesReady",function(){var e=scheduler.date.date_to_str("%d");scheduler.templates._old_month_day||(scheduler.templates._old_month_day=scheduler.templates.month_day);var t=scheduler.templates._old_month_day;if(scheduler.templates.month_day=function(i){if("month"==this._mode){var a=e(i);return 1==i.getDate()&&(a=scheduler.locale.date.month_full[i.getMonth()]+" "+a),
+i==+scheduler.date.date_part(this._currentDate())&&(a=scheduler.locale.labels.dhx_cal_today_button+" "+a),a}return t.call(this,i)},scheduler.config.fix_tab_position){for(var i=scheduler._els.dhx_cal_navline[0].getElementsByTagName("div"),a=null,r=211,s=0;s<i.length;s++){var n=i[s],d=n.getAttribute("name");if(d)switch(n.style.right="auto",d){case"day_tab":n.style.left="14px",n.className+=" dhx_cal_tab_first";break;case"week_tab":n.style.left="75px";break;case"month_tab":n.style.left="136px",n.className+=" dhx_cal_tab_last";
break;default:n.style.left=r+"px",n.className+=" dhx_cal_tab_standalone",r=r+14+n.offsetWidth}else 0===(n.className||"").indexOf("dhx_minical_icon")&&n.parentNode==scheduler._els.dhx_cal_navline[0]&&(a=n)}a&&(a.style.left=r+"px")}}),scheduler._skin_init=function(){}}},window.jQuery&&!function(e){var t=[];e.fn.dhx_scheduler=function(i){if("string"!=typeof i){var a=[];return this.each(function(){if(this&&this.getAttribute&&!this.getAttribute("dhxscheduler")){for(var e in i)"data"!=e&&(scheduler.config[e]=i[e]);
this.getElementsByTagName("div").length||(this.innerHTML='<div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div><div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div></div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>',
this.className+=" dhx_cal_container"),scheduler.init(this,scheduler.config.date,scheduler.config.mode),i.data&&scheduler.parse(i.data),a.push(scheduler)}}),1===a.length?a[0]:a}return t[i]?t[i].apply(this,[]):void e.error("Method "+i+" does not exist on jQuery.dhx_scheduler")}}(jQuery),function(){function e(e,t,i){t&&(e._date=t),i&&(e._mode=i)}var t=scheduler.setCurrentView,i=scheduler.updateView,a=null,r=null,s=function(t,s){var n=this;window.clearTimeout(r),window.clearTimeout(a),e(this,t,s),r=setTimeout(function(){
n.callEvent("onBeforeViewChange",[n._mode,n._date,s||n._mode,t||n._date])&&(i.call(n,t,s),n.callEvent("onViewChange",[n._mode,n._date]),window.clearTimeout(a),r=0)},scheduler.config.delay_render)},n=function(t,s){var n=this,d=arguments;e(this,t,s),window.clearTimeout(a),a=setTimeout(function(){r||i.apply(n,d)},scheduler.config.delay_render)};scheduler.attachEvent("onSchedulerReady",function(){scheduler.config.delay_render?(scheduler.setCurrentView=s,scheduler.updateView=n):(scheduler.setCurrentView=t,
scheduler.updateView=i)})}();
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.date.add_agenda=function(t){return e.date.add(t,1,"year")},e.templates.agenda_time=function(t,i,a){return a._timed?this.day_date(a.start_date,a.end_date,a)+" "+this.event_date(t):e.templates.day_date(t)+" &ndash; "+e.templates.day_date(i)},e.templates.agenda_text=function(e,t,i){return i.text},e.templates.agenda_date=function(){return""},e.date.agenda_start=function(){return e.date.date_part(e._currentDate())},e.attachEvent("onTemplatesReady",function(){function t(t){
if(t){var i=e.locale.labels,a=e._waiAria.agendaHeadAttrString(),r=e._waiAria.agendaHeadDateString(i.date),s=e._waiAria.agendaHeadDescriptionString(i.description);e._els.dhx_cal_header[0].innerHTML="<div "+a+" class='dhx_agenda_line'><div "+r+">"+i.date+"</div><span style='padding-left:25px' "+s+">"+i.description+"</span></div>",e._table_view=!0,e.set_sizes()}}function i(){var t=(e._date,e.get_visible_events());t.sort(function(e,t){return e.start_date>t.start_date?1:-1});for(var i,a=e._waiAria.agendaDataAttrString(),r="<div class='dhx_agenda_area' "+a+">",s=0;s<t.length;s++){
var n=t[s],d=n.color?"background:"+n.color+";":"",l=n.textColor?"color:"+n.textColor+";":"",o=e.templates.event_class(n.start_date,n.end_date,n);i=e._waiAria.agendaEventAttrString(n);var h=e._waiAria.agendaDetailsBtnString();r+="<div "+i+" class='dhx_agenda_line"+(o?" "+o:"")+"' event_id='"+n.id+"' style='"+l+d+(n._text_style||"")+"'><div class='dhx_agenda_event_time'>"+e.templates.agenda_time(n.start_date,n.end_date,n)+"</div>",r+="<div "+h+" class='dhx_event_icon icon_details'>&nbsp</div>",r+="<span>"+e.templates.agenda_text(n.start_date,n.end_date,n)+"</span></div>";
}r+="<div class='dhx_v_border'></div></div>",e._els.dhx_cal_data[0].innerHTML=r,e._els.dhx_cal_data[0].childNodes[0].scrollTop=e._agendaScrollTop||0;var _=e._els.dhx_cal_data[0].childNodes[0],c=_.childNodes[_.childNodes.length-1];c.style.height=_.offsetHeight<e._els.dhx_cal_data[0].offsetHeight?"100%":_.offsetHeight+"px";var u=e._els.dhx_cal_data[0].firstChild.childNodes;e._els.dhx_cal_date[0].innerHTML=e.templates.agenda_date(e._min_date,e._max_date,e._mode),e._rendered=[];for(var s=0;s<u.length-1;s++)e._rendered[s]=u[s];
}var a=e.dblclick_dhx_cal_data;e.dblclick_dhx_cal_data=function(){if("agenda"==this._mode)!this.config.readonly&&this.config.dblclick_create&&this.addEventNow();else if(a)return a.apply(this,arguments)},e.attachEvent("onSchedulerResize",function(){return"agenda"==this._mode?(this.agenda_view(!0),!1):!0});var r=e.render_data;e.render_data=function(e){return"agenda"!=this._mode?r.apply(this,arguments):void i()};var s=e.render_view_data;e.render_view_data=function(){return"agenda"==this._mode&&(e._agendaScrollTop=e._els.dhx_cal_data[0].childNodes[0].scrollTop,
e._els.dhx_cal_data[0].childNodes[0].scrollTop=0),s.apply(this,arguments)},e.agenda_view=function(a){e._min_date=e.config.agenda_start||e.date.agenda_start(e._date),e._max_date=e.config.agenda_end||e.date.add_agenda(e._min_date,1),t(a),a?(e._cols=null,e._colsS=null,e._table_view=!0,i()):e._table_view=!1}})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.form_blocks.combo={render:function(e){e.cached_options||(e.cached_options={});var t="";return t+="<div class='"+e.type+"' style='height:"+(e.height||20)+"px;' ></div>"},set_value:function(t,i,a,n){!function(){function i(){if(t._combo&&t._combo.DOMParent){var e=t._combo;e.unload?e.unload():e.destructor&&e.destructor(),e.DOMParent=e.DOMelem=null}}i();var a=e.attachEvent("onAfterLightbox",function(){i(),e.detachEvent(a)})}(),window.dhx_globalImgPath=n.image_path||"/",t._combo=new dhtmlXCombo(t,n.name,t.offsetWidth-8),
n.onchange&&t._combo.attachEvent("onChange",n.onchange),n.options_height&&t._combo.setOptionHeight(n.options_height);var r=t._combo;if(r.enableFilteringMode(n.filtering,n.script_path||null,!!n.cache),n.script_path){var s=a[n.map_to];s?n.cached_options[s]?(r.addOption(s,n.cached_options[s]),r.disable(1),r.selectOption(0),r.disable(0)):dhtmlxAjax.get(n.script_path+"?id="+s+"&uid="+e.uid(),function(e){var t=e.doXPath("//option")[0],i=t.childNodes[0].nodeValue;n.cached_options[s]=i,r.addOption(s,i),r.disable(1),
r.selectOption(0),r.disable(0)}):r.setComboValue("")}else{for(var d=[],o=0;o<n.options.length;o++){var l=n.options[o],_=[l.key,l.label,l.css];d.push(_)}if(r.addOption(d),a[n.map_to]){var h=r.getIndexByValue(a[n.map_to]);r.selectOption(h)}}},get_value:function(e,t,i){var a=e._combo.getSelectedValue();return i.script_path&&(i.cached_options[a]=e._combo.getSelectedText()),a},focus:function(e){}},e.form_blocks.radio={render:function(t){var i="";i+="<div class='dhx_cal_ltext dhx_cal_radio' style='height:"+t.height+"px;' >";
for(var a=0;a<t.options.length;a++){var n=e.uid();i+="<input id='"+n+"' type='radio' name='"+t.name+"' value='"+t.options[a].key+"'><label for='"+n+"'> "+t.options[a].label+"</label>",t.vertical&&(i+="<br/>")}return i+="</div>"},set_value:function(e,t,i,a){for(var n=e.getElementsByTagName("input"),r=0;r<n.length;r++){n[r].checked=!1;var s=i[a.map_to]||t;n[r].value==s&&(n[r].checked=!0)}},get_value:function(e,t,i){for(var a=e.getElementsByTagName("input"),n=0;n<a.length;n++)if(a[n].checked)return a[n].value;
},focus:function(e){}},e.form_blocks.checkbox={render:function(t){return e.config.wide_form?'<div class="dhx_cal_wide_checkbox" '+(t.height?"style='height:"+t.height+"px;'":"")+"></div>":""},set_value:function(t,i,a,n){t=document.getElementById(n.id);var r=e.uid(),s="undefined"!=typeof n.checked_value?i==n.checked_value:!!i;t.className+=" dhx_cal_checkbox";var d="<input id='"+r+"' type='checkbox' value='true' name='"+n.name+"'"+(s?"checked='true'":"")+"'>",o="<label for='"+r+"'>"+(e.locale.labels["section_"+n.name]||n.name)+"</label>";
if(e.config.wide_form?(t.innerHTML=o,t.nextSibling.innerHTML=d):t.innerHTML=d+o,n.handler){var l=t.getElementsByTagName("input")[0];l.onclick=n.handler}},get_value:function(e,t,i){e=document.getElementById(i.id);var a=e.getElementsByTagName("input")[0];return a||(a=e.nextSibling.getElementsByTagName("input")[0]),a.checked?i.checked_value||!0:i.unchecked_value||!1},focus:function(e){}}});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.config.occurrence_timestamp_in_utc=!1,e.config.recurring_workdays=[1,2,3,4,5],e.form_blocks.recurring={_get_node:function(e){return"string"==typeof e&&(e=document.getElementById(e)),"none"==e.style.display&&(e.style.display=""),e},_outer_html:function(e){function t(e){var t,a=document.createElement("div");return a.appendChild(e.cloneNode(!0)),t=a.innerHTML,a=null,t}return e.outerHTML||t(e)},render:function(t){if(t.form){var a=e.form_blocks.recurring,n=a._get_node(t.form),i=a._outer_html(n);
return n.style.display="none",i}return e.__recurring_template},_ds:{},_get_form_node:function(e,t,a){var n=e[t];if(!n)return null;if(n.nodeName)return n;if(n.length)for(var i=0;i<n.length;i++)if(n[i].value==a)return n[i]},_get_node_value:function(e,t,a){var n=e[t];if(!n)return"";if(n.length){if(a){for(var i=[],r=0;r<n.length;r++)n[r].checked&&i.push(n[r].value);return i}for(var r=0;r<n.length;r++)if(n[r].checked)return n[r].value}return n.value?a?[n.value]:n.value:void 0},_get_node_numeric_value:function(t,a){
var n=e.form_blocks.recurring._get_node_value(t,a);return 1*n||0},_set_node_value:function(e,t,a){var n=e[t];if(n)if(n.name==t)n.value=a;else if(n.length)for(var i="object"==typeof a,r=0;r<n.length;r++)(i||n[r].value==a)&&(n[r].checked=i?!!a[n[r].value]:!!a)},_init_set_value:function(t,a,n){function i(e){for(var t=0;t<e.length;t++){var a=e[t];if(a.name)if(p[a.name])if(p[a.name].nodeType){var n=p[a.name];p[a.name]=[n,a]}else p[a.name].push(a);else p[a.name]=a}}function r(){y("dhx_repeat_day").style.display="none",
y("dhx_repeat_week").style.display="none",y("dhx_repeat_month").style.display="none",y("dhx_repeat_year").style.display="none",y("dhx_repeat_"+this.value).style.display="block",e.setLightboxSize()}function s(t){var a=[c(p,"repeat")];for(b[a[0]](a,t);a.length<5;)a.push("");var n="",i=d(p);if("no"==i)t.end=new Date(9999,1,1),n="no";else if("date_of_end"==i)t.end=v(c(p,"date_of_end"));else{e.transpose_type(a.join("_")),n=Math.max(1,c(p,"occurences_count"));var r=0;t.end=e.date.add(new Date(t.start),n+r,a.join("_"));
}return a.join("_")+"#"+n}function d(e){var t=e.end;if(t.length){for(var a=0;a<t.length;a++)if(t[a].checked)return t[a].value&&"on"!=t[a].value?t[a].value:a?2==a?"date_of_end":"occurences_count":"no"}else if(t.value)return t.value;return"no"}function o(e,t){var a=e.end;if(a.length){var n=!!a[0].value&&"on"!=a[0].value;if(n)for(var i=0;i<a.length;i++)a[i].value==t&&(a[i].checked=!0);else{var r=0;switch(t){case"no":r=0;break;case"date_of_end":r=2;break;default:r=1}a[r].checked=!0}}else a.value=t}function l(t,a){
var n=e.form_blocks.recurring._set_node_value,i=t.split("#");switch(t=i[0].split("_"),x[t[0]](t,a),i[1]){case"no":o(p,"no");break;case"":o(p,"date_of_end");var r=a.end;e.config.include_end_by&&(r=e.date.add(r,-1,"day")),n(p,"date_of_end",f(r));break;default:o(p,"occurences_count"),n(p,"occurences_count",i[1])}n(p,"repeat",t[0]);var s=e.form_blocks.recurring._get_form_node(p,"repeat",t[0]);"SELECT"==s.nodeName&&s.onchange?s.onchange():s.onclick&&s.onclick()}var _=e.form_blocks.recurring,c=_._get_node_value,h=_._set_node_value;
e.form_blocks.recurring._ds={start:n.start_date,end:n._end_date};var u=e.date.str_to_date(e.config.repeat_date),v=function(t){var a=u(t);return e.config.include_end_by&&(a=e.date.add(a,1,"day")),a},f=e.date.date_to_str(e.config.repeat_date),g=t.getElementsByTagName("FORM")[0],p={};if(i(g.getElementsByTagName("INPUT")),i(g.getElementsByTagName("SELECT")),!e.config.repeat_date_of_end){var m=e.date.date_to_str(e.config.repeat_date);e.config.repeat_date_of_end=m(e.date.add(e._currentDate(),30,"day"));
}h(p,"date_of_end",e.config.repeat_date_of_end);var y=function(e){return document.getElementById(e)||{style:{}}};e.form_blocks.recurring._get_repeat_code=s;var b={month:function(t,a){var n=e.form_blocks.recurring._get_node_value,i=e.form_blocks.recurring._get_node_numeric_value;"d"==n(p,"month_type")?(t.push(Math.max(1,i(p,"month_count"))),a.start.setDate(n(p,"month_day"))):(t.push(Math.max(1,i(p,"month_count2"))),t.push(n(p,"month_day2")),t.push(Math.max(1,i(p,"month_week2"))),e.config.repeat_precise||a.start.setDate(1)),
a._start=!0},week:function(t,a){var n=e.form_blocks.recurring._get_node_value,i=e.form_blocks.recurring._get_node_numeric_value;t.push(Math.max(1,i(p,"week_count"))),t.push(""),t.push("");for(var r=[],s=n(p,"week_day",!0),d=a.start.getDay(),o=!1,l=0;l<s.length;l++)r.push(s[l]),o=o||s[l]==d;r.length||(r.push(d),o=!0),r.sort(),e.config.repeat_precise?o||(e.transpose_day_week(a.start,r,1,7),a._start=!0):(a.start=e.date.week_start(a.start),a._start=!0),t.push(r.join(","))},day:function(t){var a=e.form_blocks.recurring._get_node_value,n=e.form_blocks.recurring._get_node_numeric_value;
"d"==a(p,"day_type")?t.push(Math.max(1,n(p,"day_count"))):(t.push("week"),t.push(1),t.push(""),t.push(""),t.push(e.config.recurring_workdays.join(",")),t.splice(0,1))},year:function(t,a){var n=e.form_blocks.recurring._get_node_value;"d"==n(p,"year_type")?(t.push("1"),a.start.setMonth(0),a.start.setDate(n(p,"year_day")),a.start.setMonth(n(p,"year_month"))):(t.push("1"),t.push(n(p,"year_day2")),t.push(n(p,"year_week2")),a.start.setDate(1),a.start.setMonth(n(p,"year_month2"))),a._start=!0}},x={week:function(t,a){
var n=e.form_blocks.recurring._set_node_value;n(p,"week_count",t[1]);for(var i=t[4].split(","),r={},s=0;s<i.length;s++)r[i[s]]=!0;n(p,"week_day",r)},month:function(t,a){var n=e.form_blocks.recurring._set_node_value;""===t[2]?(n(p,"month_type","d"),n(p,"month_count",t[1]),n(p,"month_day",a.start.getDate())):(n(p,"month_type","w"),n(p,"month_count2",t[1]),n(p,"month_week2",t[3]),n(p,"month_day2",t[2]))},day:function(t,a){var n=e.form_blocks.recurring._set_node_value;n(p,"day_type","d"),n(p,"day_count",t[1]);
},year:function(t,a){var n=e.form_blocks.recurring._set_node_value;""===t[2]?(n(p,"year_type","d"),n(p,"year_day",a.start.getDate()),n(p,"year_month",a.start.getMonth())):(n(p,"year_type","w"),n(p,"year_week2",t[3]),n(p,"year_day2",t[2]),n(p,"year_month2",a.start.getMonth()))}};e.form_blocks.recurring._set_repeat_code=l;for(var w=0;w<g.elements.length;w++){var k=g.elements[w];switch(k.name){case"repeat":"SELECT"==k.nodeName?k.onchange=r:k.onclick=r}}e._lightbox._rec_init_done=!0},set_value:function(t,a,n){
var i=e.form_blocks.recurring;e._lightbox._rec_init_done||i._init_set_value(t,a,n),t.open=!n.rec_type,this._is_modified_occurence(n)?t.blocked=!0:t.blocked=!1;var r=i._ds;r.start=n.start_date,r.end=n._end_date,i.button_click(0,t.previousSibling.firstChild.firstChild,t,t),a&&i._set_repeat_code(a,r)},get_value:function(t,a){if(t.open){var n=e.form_blocks.recurring._ds,i={};this.formSection("time").getValue(i),n.start=i.start_date,a.rec_type=e.form_blocks.recurring._get_repeat_code(n),n._start?(a.start_date=new Date(n.start),
a._start_date=new Date(n.start),n._start=!1):a._start_date=null,a._end_date=n.end,a.rec_pattern=a.rec_type.split("#")[0]}else a.rec_type=a.rec_pattern="",a._end_date=a.end_date;return a.rec_type},_get_button:function(){var t=e.formSection("recurring").header;return t.firstChild.firstChild},_get_form:function(){return e.formSection("recurring").node},open:function(){var t=e.form_blocks.recurring,a=t._get_form();a.open||t._toggle_block()},close:function(){var t=e.form_blocks.recurring,a=t._get_form();
a.open&&t._toggle_block()},_toggle_block:function(){var t=e.form_blocks.recurring,a=t._get_form(),n=t._get_button();a.open||a.blocked?(a.style.height="0px",n&&(n.style.backgroundPosition="-5px 20px",n.nextSibling.innerHTML=e.locale.labels.button_recurring)):(a.style.height="auto",n&&(n.style.backgroundPosition="-5px 0px",n.nextSibling.innerHTML=e.locale.labels.button_recurring_open)),a.open=!a.open,e.setLightboxSize()},focus:function(e){},button_click:function(t,a,n,i){e.form_blocks.recurring._toggle_block();
}},e._rec_markers={},e._rec_markers_pull={},e._add_rec_marker=function(e,t){e._pid_time=t,this._rec_markers[e.id]=e,this._rec_markers_pull[e.event_pid]||(this._rec_markers_pull[e.event_pid]={}),this._rec_markers_pull[e.event_pid][t]=e},e._get_rec_marker=function(e,t){var a=this._rec_markers_pull[t];return a?a[e]:null},e._get_rec_markers=function(e){return this._rec_markers_pull[e]||[]},e._rec_temp=[],function(){var t=e.addEvent;e.addEvent=function(a,n,i,r,s){var d=t.apply(this,arguments);if(d){var o=e.getEvent(d);
this._is_modified_occurence(o)&&e._add_rec_marker(o,1e3*o.event_length),o.rec_type&&(o.rec_pattern=o.rec_type.split("#")[0])}return d}}(),e.attachEvent("onEventIdChange",function(t,a){if(!this._ignore_call){this._ignore_call=!0,e._rec_markers[t]&&(e._rec_markers[a]=e._rec_markers[t],delete e._rec_markers[t]),e._rec_markers_pull[t]&&(e._rec_markers_pull[a]=e._rec_markers_pull[t],delete e._rec_markers_pull[t]);for(var n=0;n<this._rec_temp.length;n++){var i=this._rec_temp[n];i.event_pid==t&&(i.event_pid=a,
this.changeEventId(i.id,a+"#"+i.id.split("#")[1]))}for(var n in this._rec_markers){var i=this._rec_markers[n];i.event_pid==t&&(i.event_pid=a,i._pid_changed=!0)}var r=e._rec_markers[a];r&&r._pid_changed&&(delete r._pid_changed,setTimeout(function(){e.callEvent("onEventChanged",[a,e.getEvent(a)])},1)),delete this._ignore_call}}),e.attachEvent("onConfirmedBeforeEventDelete",function(e){var t=this.getEvent(e);if(this._is_virtual_event(e)||this._is_modified_occurence(t)&&t.rec_type&&"none"!=t.rec_type){
e=e.split("#");var a=this.uid(),n=e[1]?e[1]:t._pid_time/1e3,i=this._copy_event(t);i.id=a,i.event_pid=t.event_pid||e[0];var r=n;i.event_length=r,i.rec_type=i.rec_pattern="none",this.addEvent(i),this._add_rec_marker(i,1e3*r)}else{t.rec_type&&this._lightbox_id&&this._roll_back_dates(t);var s=this._get_rec_markers(e);for(var d in s)s.hasOwnProperty(d)&&(e=s[d].id,this.getEvent(e)&&this.deleteEvent(e,!0))}return!0}),e.attachEvent("onEventDeleted",function(t,a){!this._is_virtual_event(t)&&this._is_modified_occurence(a)&&(e._events[t]||(a.rec_type=a.rec_pattern="none",
this.setEvent(t,a)))}),e.attachEvent("onEventChanged",function(e){if(this._loading)return!0;var t=this.getEvent(e);if(this._is_virtual_event(e)){var e=e.split("#"),a=this.uid();this._not_render=!0;var n=this._copy_event(t);n.id=a,n.event_pid=e[0];var i=e[1];n.event_length=i,n.rec_type=n.rec_pattern="",this._add_rec_marker(n,1e3*i),this.addEvent(n),this._not_render=!1}else{t.rec_type&&this._lightbox_id&&this._roll_back_dates(t);var r=this._get_rec_markers(e);for(var s in r)r.hasOwnProperty(s)&&(delete this._rec_markers[r[s].id],
this.deleteEvent(r[s].id,!0));delete this._rec_markers_pull[e];for(var d=!1,o=0;o<this._rendered.length;o++)this._rendered[o].getAttribute("event_id")==e&&(d=!0);d||(this._select_id=null)}return!0}),e.attachEvent("onEventAdded",function(e){if(!this._loading){var t=this.getEvent(e);t.rec_type&&!t.event_length&&this._roll_back_dates(t)}return!0}),e.attachEvent("onEventSave",function(e,t,a){var n=this.getEvent(e);return n.rec_type||!t.rec_type||this._is_virtual_event(e)||(this._select_id=null),!0}),
e.attachEvent("onEventCreated",function(e){var t=this.getEvent(e);return t.rec_type||(t.rec_type=t.rec_pattern=t.event_length=t.event_pid=""),!0}),e.attachEvent("onEventCancel",function(e){var t=this.getEvent(e);t.rec_type&&(this._roll_back_dates(t),this.render_view_data())}),e._roll_back_dates=function(e){e.event_length=(e.end_date.valueOf()-e.start_date.valueOf())/1e3,e.end_date=e._end_date,e._start_date&&(e.start_date.setMonth(0),e.start_date.setDate(e._start_date.getDate()),e.start_date.setMonth(e._start_date.getMonth()),
e.start_date.setFullYear(e._start_date.getFullYear()))},e._is_virtual_event=function(e){return-1!=e.toString().indexOf("#")},e._is_modified_occurence=function(e){return e.event_pid&&"0"!=e.event_pid},e._validId=function(e){return!this._is_virtual_event(e)},e.showLightbox_rec=e.showLightbox,e.showLightbox=function(t){var a=this.locale,n=e.config.lightbox_recurring,i=this.getEvent(t),r=i.event_pid,s=this._is_virtual_event(t);s&&(r=t.split("#")[0]);var d=function(t){var a=e.getEvent(t);return a._end_date=a.end_date,
a.end_date=new Date(a.start_date.valueOf()+1e3*a.event_length),e.showLightbox_rec(t)};if((r||1*r===0)&&i.rec_type)return d(t);if(!r||"0"===r||!a.labels.confirm_recurring||"instance"==n||"series"==n&&!s)return this.showLightbox_rec(t);if("ask"==n){var o=this;dhtmlx.modalbox({text:a.labels.confirm_recurring,title:a.labels.title_confirm_recurring,width:"500px",position:"middle",buttons:[a.labels.button_edit_series,a.labels.button_edit_occurrence,a.labels.icon_cancel],callback:function(e){switch(+e){
case 0:return d(r);case 1:return o.showLightbox_rec(t);case 2:return}}})}else d(r)},e.get_visible_events_rec=e.get_visible_events,e.get_visible_events=function(e){for(var t=0;t<this._rec_temp.length;t++)delete this._events[this._rec_temp[t].id];this._rec_temp=[];for(var a=this.get_visible_events_rec(e),n=[],t=0;t<a.length;t++)a[t].rec_type?"none"!=a[t].rec_pattern&&this.repeat_date(a[t],n):n.push(a[t]);return n},function(){var t=e.isOneDayEvent;e.isOneDayEvent=function(e){return e.rec_type?!0:t.call(this,e);
};var a=e.updateEvent;e.updateEvent=function(t){var n=e.getEvent(t);n&&n.rec_type&&(n.rec_pattern=(n.rec_type||"").split("#")[0]),n&&n.rec_type&&!this._is_virtual_event(t)?e.update_view():a.call(this,t)}}(),e.transponse_size={day:1,week:7,month:1,year:12},e.date.day_week=function(e,t,a){e.setDate(1),a=7*(a-1);var n=e.getDay(),i=1*t+a-n+1;e.setDate(a>=i?i+7:i)},e.transpose_day_week=function(t,a,n,i,r){for(var s=(t.getDay()||(e.config.start_on_monday?7:0))-n,d=0;d<a.length;d++)if(a[d]>s)return t.setDate(t.getDate()+1*a[d]-s-(i?n:r));
this.transpose_day_week(t,a,n+i,null,n)},e.transpose_type=function(t){var a="transpose_"+t;if(!this.date[a]){var n=t.split("_"),i=864e5,r="add_"+t,s=this.transponse_size[n[0]]*n[1];if("day"==n[0]||"week"==n[0]){var d=null;if(n[4]&&(d=n[4].split(","),e.config.start_on_monday)){for(var o=0;o<d.length;o++)d[o]=1*d[o]||7;d.sort()}this.date[a]=function(t,a){var n=Math.floor((a.valueOf()-t.valueOf())/(i*s));n>0&&t.setDate(t.getDate()+n*s),d&&e.transpose_day_week(t,d,1,s)},this.date[r]=function(t,a){var n=new Date(t.valueOf());
if(d)for(var i=0;a>i;i++)e.transpose_day_week(n,d,0,s);else n.setDate(n.getDate()+a*s);return n}}else("month"==n[0]||"year"==n[0])&&(this.date[a]=function(t,a){var i=Math.ceil((12*a.getFullYear()+1*a.getMonth()-(12*t.getFullYear()+1*t.getMonth()))/s);i>=0&&t.setMonth(t.getMonth()+i*s),n[3]&&e.date.day_week(t,n[2],n[3])},this.date[r]=function(t,a){var i=new Date(t.valueOf());return i.setMonth(i.getMonth()+a*s),n[3]&&e.date.day_week(i,n[2],n[3]),i})}},e.repeat_date=function(t,a,n,i,r,s){i=i||this._min_date,
r=r||this._max_date;var d=s||-1,o=new Date(t.start_date.valueOf()),l=0;for(!t.rec_pattern&&t.rec_type&&(t.rec_pattern=t.rec_type.split("#")[0]),this.transpose_type(t.rec_pattern),e.date["transpose_"+t.rec_pattern](o,i);o<t.start_date||e._fix_daylight_saving_date(o,i,t,o,new Date(o.valueOf()+1e3*t.event_length)).valueOf()<=i.valueOf()||o.valueOf()+1e3*t.event_length<=i.valueOf();)o=this.date.add(o,1,t.rec_pattern);for(;r>o&&o<t.end_date&&(0>d||d>l);){var _=e.config.occurrence_timestamp_in_utc?Date.UTC(o.getFullYear(),o.getMonth(),o.getDate(),o.getHours(),o.getMinutes(),o.getSeconds()):o.valueOf(),c=this._get_rec_marker(_,t.id);
if(c)n&&("none"!=c.rec_type&&l++,a.push(c));else{var h=new Date(o.valueOf()+1e3*t.event_length),u=this._copy_event(t);if(u.text=t.text,u.start_date=o,u.event_pid=t.id,u.id=t.id+"#"+Math.ceil(_/1e3),u.end_date=h,u.end_date=e._fix_daylight_saving_date(u.start_date,u.end_date,t,o,u.end_date),u._timed=this.isOneDayEvent(u),!u._timed&&!this._table_view&&!this.config.multi_day)return;a.push(u),n||(this._events[u.id]=u,this._rec_temp.push(u)),l++}o=this.date.add(o,1,t.rec_pattern)}},e._fix_daylight_saving_date=function(e,t,a,n,i){
var r=e.getTimezoneOffset()-t.getTimezoneOffset();return r?r>0?new Date(n.valueOf()+1e3*a.event_length-60*r*1e3):new Date(t.valueOf()-60*r*1e3):new Date(i.valueOf())},e.getRecDates=function(t,a){var n="object"==typeof t?t:e.getEvent(t),i=[];if(a=a||100,!n.rec_type)return[{start_date:n.start_date,end_date:n.end_date}];if("none"==n.rec_type)return[];e.repeat_date(n,i,!0,n.start_date,n.end_date,a);for(var r=[],s=0;s<i.length;s++)"none"!=i[s].rec_type&&r.push({start_date:i[s].start_date,end_date:i[s].end_date
});return r},e.getEvents=function(e,t){var a=[];for(var n in this._events){var i=this._events[n];if(i&&i.start_date<t&&i.end_date>e)if(i.rec_pattern){if("none"==i.rec_pattern)continue;var r=[];this.repeat_date(i,r,!0,e,t);for(var s=0;s<r.length;s++)!r[s].rec_pattern&&r[s].start_date<t&&r[s].end_date>e&&!this._rec_markers[r[s].id]&&a.push(r[s])}else this._is_virtual_event(i.id)||a.push(i)}return a},e.config.repeat_date="%m.%d.%Y",e.config.lightbox.sections=[{name:"description",height:130,map_to:"text",
type:"textarea",focus:!0},{name:"recurring",type:"recurring",map_to:"rec_type",button:"recurring"},{name:"time",height:72,type:"time",map_to:"auto"}],e._copy_dummy=function(e){var t=new Date(this.start_date),a=new Date(this.end_date);this.start_date=t,this.end_date=a,this.event_length=this.event_pid=this.rec_pattern=this.rec_type=null},e.config.include_end_by=!1,e.config.lightbox_recurring="ask",e.attachEvent("onClearAll",function(){e._rec_markers={},e._rec_markers_pull={},e._rec_temp=[]}),e.__recurring_template='<div class="dhx_form_repeat"> <form> <div class="dhx_repeat_left"> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="day" />Daily</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="week"/>Weekly</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="month" checked />Monthly</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="year" />Yearly</label> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_center"> <div style="display:none;" id="dhx_repeat_day"> <label><input class="dhx_repeat_radio" type="radio" name="day_type" value="d"/>Every</label><input class="dhx_repeat_text" type="text" name="day_count" value="1" />day<br /> <label><input class="dhx_repeat_radio" type="radio" name="day_type" checked value="w"/>Every workday</label> </div> <div style="display:none;" id="dhx_repeat_week"> Repeat every<input class="dhx_repeat_text" type="text" name="week_count" value="1" />week next days:<br /> <table class="dhx_repeat_days"> <tr> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="1" />Monday</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="4" />Thursday</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="2" />Tuesday</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="5" />Friday</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="3" />Wednesday</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="6" />Saturday</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="0" />Sunday</label><br /><br /> </td> </tr> </table> </div> <div id="dhx_repeat_month"> <label><input class="dhx_repeat_radio" type="radio" name="month_type" value="d"/>Repeat</label><input class="dhx_repeat_text" type="text" name="month_day" value="1" />day every<input class="dhx_repeat_text" type="text" name="month_count" value="1" />month<br /> <label><input class="dhx_repeat_radio" type="radio" name="month_type" checked value="w"/>On</label><input class="dhx_repeat_text" type="text" name="month_week2" value="1" /><select name="month_day2"><option value="1" selected >Monday<option value="2">Tuesday<option value="3">Wednesday<option value="4">Thursday<option value="5">Friday<option value="6">Saturday<option value="0">Sunday</select>every<input class="dhx_repeat_text" type="text" name="month_count2" value="1" />month<br /> </div> <div style="display:none;" id="dhx_repeat_year"> <label><input class="dhx_repeat_radio" type="radio" name="year_type" value="d"/>Every</label><input class="dhx_repeat_text" type="text" name="year_day" value="1" />day<select name="year_month"><option value="0" selected >January<option value="1">February<option value="2">March<option value="3">April<option value="4">May<option value="5">June<option value="6">July<option value="7">August<option value="8">September<option value="9">October<option value="10">November<option value="11">December</select>month<br /> <label><input class="dhx_repeat_radio" type="radio" name="year_type" checked value="w"/>On</label><input class="dhx_repeat_text" type="text" name="year_week2" value="1" /><select name="year_day2"><option value="1" selected >Monday<option value="2">Tuesday<option value="3">Wednesday<option value="4">Thursday<option value="5">Friday<option value="6">Saturday<option value="7">Sunday</select>of<select name="year_month2"><option value="0" selected >January<option value="1">February<option value="2">March<option value="3">April<option value="4">May<option value="5">June<option value="6">July<option value="7">August<option value="8">September<option value="9">October<option value="10">November<option value="11">December</select><br /> </div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_right"> <label><input class="dhx_repeat_radio" type="radio" name="end" checked/>No end date</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="end" />After</label><input class="dhx_repeat_text" type="text" name="occurences_count" value="1" />occurrences<br /> <label><input class="dhx_repeat_radio" type="radio" name="end" />End by</label><input class="dhx_repeat_date" type="text" name="date_of_end" value="'+e.config.repeat_date_of_end+'" /><br /> </div> </form> </div> <div style="clear:both"> </div>';
});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e._temp_matrix_scope=function(){e.matrix={},e._merge=function(e,t){for(var a in t)"undefined"==typeof e[a]&&(e[a]=t[a])},e.createTimelineView=function(t){e._skin_init(),e._merge(t,{section_autoheight:!0,name:"matrix",x:"time",y:"time",x_step:1,x_unit:"hour",y_unit:"day",y_step:1,x_start:0,x_size:24,y_start:0,y_size:7,render:"cell",dx:200,dy:50,event_dy:e.xy.bar_height-5,event_min_dy:e.xy.bar_height-5,resize_events:!0,fit_events:!0,show_unassigned:!1,second_scale:!1,round_position:!1,
_logic:function(t,a,i){var n={};return e.checkEvent("onBeforeSectionRender")&&(n=e.callEvent("onBeforeSectionRender",[t,a,i])),n}}),t._original_x_start=t.x_start,"day"!=t.x_unit&&(t.first_hour=t.last_hour=0),t._start_correction=t.first_hour?60*t.first_hour*60*1e3:0,t._end_correction=t.last_hour?60*(24-t.last_hour)*60*1e3:0,e.checkEvent("onTimelineCreated")&&e.callEvent("onTimelineCreated",[t]);var a=e.render_data;e.render_data=function(i,n){if(this._mode!=t.name)return a.apply(this,arguments);if(n&&!t.show_unassigned&&"cell"!=t.render)for(var r=0;r<i.length;r++)this.clear_event(i[r]),
this.render_timeline_event.call(this.matrix[this._mode],i[r],!0);else e._renderMatrix.call(t,!0,!0)},e.matrix[t.name]=t,e.templates[t.name+"_cell_value"]=function(e){return e?e.length:""},e.templates[t.name+"_cell_class"]=function(e){return""},e.templates[t.name+"_scalex_class"]=function(e){return""},e.templates[t.name+"_second_scalex_class"]=function(e){return""},e.templates[t.name+"_scaley_class"]=function(e,t,a){return""},e.templates[t.name+"_scale_label"]=function(e,t,a){return t},e.templates[t.name+"_tooltip"]=function(e,t,a){
return a.text},e.templates[t.name+"_date"]=function(t,a){return t.getDay()==a.getDay()&&864e5>a-t||+t==+e.date.date_part(new Date(a))||+e.date.add(t,1,"day")==+a&&0===a.getHours()&&0===a.getMinutes()?e.templates.day_date(t):t.getDay()!=a.getDay()&&864e5>a-t?e.templates.day_date(t)+" &ndash; "+e.templates.day_date(a):e.templates.week_date(t,a)},e.templates[t.name+"_scale_date"]=e.date.date_to_str(t.x_date||e.config.hour_date),e.templates[t.name+"_second_scale_date"]=e.date.date_to_str(t.second_scale&&t.second_scale.x_date?t.second_scale.x_date:e.config.hour_date),
e.date["add_"+t.name+"_private"]=function(a,i){var n=i,r=t.x_unit;if("minute"==t.x_unit||"hour"==t.x_unit){var s=n;"hour"==t.x_unit&&(s*=60),s%1440||(n=s/1440,r="day")}return e.date.add(a,n,r)},e.date["add_"+t.name]=function(a,i,n){var r=e.date["add_"+t.name+"_private"](a,(t.x_length||t.x_size)*t.x_step*i);if("minute"==t.x_unit||"hour"==t.x_unit){var s=t.x_length||t.x_size,d="hour"==t.x_unit?60*t.x_step:t.x_step;if(d*s%1440)if(+e.date.date_part(new Date(a))==+e.date.date_part(new Date(r)))t.x_start+=i*s;else{
var o=1440/(s*d)-1,_=Math.round(o*s);i>0?t.x_start=t.x_start-_:t.x_start=_+t.x_start}}return r},e.date[t.name+"_start"]=function(a){var i=e.date[t.x_unit+"_start"]||e.date.day_start,n=i.call(e.date,a),r=n.getTimezoneOffset();n=e.date.add(n,t.x_step*t.x_start,t.x_unit);var s=n.getTimezoneOffset();return r!=s&&n.setTime(n.getTime()+6e4*(s-r)),n},e.callEvent("onOptionsLoad",[t]),e[t.name+"_view"]=function(a){a?e._set_timeline_dates(t):e._renderMatrix.apply(t,arguments)};var i=new Date;e.date.add(i,t.x_step,t.x_unit).valueOf()-i.valueOf();
e["mouse_"+t.name]=function(a){var i=this._drag_event;this._drag_id&&(i=this.getEvent(this._drag_id)),a.x-=t.dx;var n=e._timeline_drag_date(t,a.x);if(a.x=0,a.force_redraw=!0,a.custom=!0,"move"==this._drag_mode&&this._drag_id&&this._drag_event){var i=this.getEvent(this._drag_id),r=this._drag_event;if(a._ignores=this._ignores_detected||t._start_correction||t._end_correction,void 0===r._move_delta&&(r._move_delta=(i.start_date-n)/6e4,this.config.preserve_length&&a._ignores&&(r._move_delta=this._get_real_event_length(i.start_date,n,t),
r._event_length=this._get_real_event_length(i.start_date,i.end_date,t))),this.config.preserve_length&&a._ignores){var s=(r._event_length,this._get_fictional_event_length(n,r._move_delta,t,!0));n=new Date(n-s)}else n=e.date.add(n,r._move_delta,"minute")}if("resize"==this._drag_mode&&i&&(this.config.timeline_swap_resize&&this._drag_id&&(this._drag_from_start&&+n>+i.end_date?this._drag_from_start=!1:!this._drag_from_start&&+n<+i.start_date&&(this._drag_from_start=!0)),a.resize_from_start=this._drag_from_start,
!this.config.timeline_swap_resize&&this._drag_id&&this._drag_from_start&&+n>=+e.date.add(i.end_date,-e.config.time_step,"minute")&&(n=e.date.add(i.end_date,-e.config.time_step,"minute"))),t.round_position)switch(this._drag_mode){case"move":this.config.preserve_length||(n=e._timeline_get_rounded_date.call(t,n,!1),"day"==t.x_unit&&(a.custom=!1));break;case"resize":this._drag_event&&((null===this._drag_event._resize_from_start||void 0===this._drag_event._resize_from_start)&&(this._drag_event._resize_from_start=a.resize_from_start),
a.resize_from_start=this._drag_event._resize_from_start,n=e._timeline_get_rounded_date.call(t,n,!this._drag_event._resize_from_start))}this._resolve_timeline_section(t,a),a.section&&this._update_timeline_section({pos:a,event:this.getEvent(this._drag_id),view:t}),a.y=Math.round((this._correct_shift(n,1)-this._min_date)/(6e4*this.config.time_step)),a.shift=this.config.time_step,t.round_position&&"new-size"==this._drag_mode&&n<=this._drag_start&&(a.shift=e.date.add(this._drag_start,t.x_step,t.x_unit)-this._drag_start);
var d=this._is_pos_changed(this._drag_pos,a);return this._drag_pos&&d&&(this._drag_event._dhx_changed=!0),d||this._drag_pos.has_moved||(a.force_redraw=!1),a}},e._prepare_timeline_events=function(t){var a=[];if("cell"==t.render)a=e._timeline_trace_events.call(t);else for(var i=e.get_visible_events(),n=t.order,r=0;r<i.length;r++){var s=i[r],d=s[t.y_property],o=t.order[d];if(t.show_unassigned&&!d){for(var _ in n)if(n.hasOwnProperty(_)){o=n[_],a[o]||(a[o]=[]);var l=e._lame_copy({},s);l[t.y_property]=_,
a[o].push(l)}}else a[o]||(a[o]=[]),a[o].push(s)}return a},e._populate_timeline_rendered=function(t){e._rendered=[];for(var a=t.getElementsByTagName("DIV"),i=0;i<a.length;i++)a[i].getAttribute("event_id")&&e._rendered.push(a[i])},e._get_timeline_event_height=function(e,t){var a=e[t.y_property],i=t.event_dy;return"full"==t.event_dy&&(i=t.section_autoheight?t._section_height[a]-6:t.dy-3),t.resize_events&&(i=Math.max(Math.floor(i/e._count),t.event_min_dy)),i},e._get_timeline_event_y=function(t,a){var i=t,n=2+i*a+(i?2*i:0);
return e.config.cascade_event_display&&(n=2+i*e.config.cascade_event_margin+(i?2*i:0)),n},e.render_timeline_event=function(t,a){var i=t[this.y_property];if(!i)return"";var n=t._sorder,r=e._timeline_getX(t,!1,this),s=e._timeline_getX(t,!0,this),d=e._get_timeline_event_height(t,this),o=d-2;t._inner||"full"!=this.event_dy||(o=(o+2)*(t._count-n)-2);var _=e._get_timeline_event_y(t._sorder,d),l=d+_+2;(!this._events_height[i]||this._events_height[i]<l)&&(this._events_height[i]=l);var c=e.templates.event_class(t.start_date,t.end_date,t);
c="dhx_cal_event_line "+(c||""),t._no_drag_move&&(c+=" no_drag_move");var h=t.color?"background:"+t.color+";":"",u=t.textColor?"color:"+t.textColor+";":"",v=e.templates.event_bar_text(t.start_date,t.end_date,t),f="<div "+e._waiAria.eventBarAttrString(t)+" event_id='"+t.id+"' class='"+c+"' style='"+h+u+"position:absolute; top:"+_+"px; height: "+o+"px; left:"+r+"px; width:"+Math.max(0,s-r)+"px;"+(t._text_style||"")+"'>";if(e.config.drag_resize&&!e.config.readonly){var g="dhx_event_resize",m="<div class='"+g+" "+g+"_start' style='height: "+o+"px;'></div>",p="<div class='"+g+" "+g+"_end' style='height: "+o+"px;'></div>";
f+=(t._no_resize_start?"":m)+(t._no_resize_end?"":p)}if(f+=v+"</div>",!a)return f;var y=document.createElement("DIV");y.innerHTML=f;var x=this.order[i],b=e._els.dhx_cal_data[0].firstChild.rows[x];if(b){var w=b.cells[1].firstChild;e._rendered.push(y.firstChild),w.appendChild(y.firstChild)}},e._timeline_trace_events=function(){for(var t=e.get_visible_events(),a=[],i=0;i<this.y_unit.length;i++)a[i]=[];var n;a[n]||(a[n]=[]);for(var i=0;i<t.length;i++){n=this.order[t[i][this.y_property]];for(var r=0;this._trace_x[r+1]&&t[i].start_date>=this._trace_x[r+1];)r++;
for(;this._trace_x[r]&&t[i].end_date>this._trace_x[r];)a[n][r]||(a[n][r]=[]),a[n][r].push(t[i]),r++}return a},e._timeline_getX=function(t,a,i){var n=0,r=i._step,s=i.round_position,d=0,o=a?t.end_date:t.start_date;o.valueOf()>e._max_date.valueOf()&&(o=e._max_date);var _=o-e._min_date_timeline;if(_>0){var l=e._get_date_index(i,o);e._ignores[l]&&(s=!0);for(var c=0;l>c;c++)n+=e._cols[c];var h=e._timeline_get_rounded_date.apply(i,[o,!1]);s?+o>+h&&a&&(d=e._cols[l]):(_=o-h,i.first_hour||i.last_hour?(_-=i._start_correction,
0>_&&(_=0),d=Math.round(_/r),d>e._cols[l]&&(d=e._cols[l])):d=Math.round(_/r))}return n+=a?0===_||s?d-14:d-12:d+1},e._timeline_get_rounded_date=function(t,a){var i=e._get_date_index(this,t),n=this._trace_x[i];return a&&+t!=+this._trace_x[i]&&(n=this._trace_x[i+1]?this._trace_x[i+1]:e.date.add(this._trace_x[i],this.x_step,this.x_unit)),new Date(n)},e._timeline_skip_ignored=function(t){if(e._ignores_detected)for(var a,i,n,r,s=0;s<t.length;s++){for(r=t[s],n=!1,a=e._get_date_index(this,r.start_date),i=e._get_date_index(this,r.end_date);i>a;){
if(!e._ignores[a]){n=!0;break}a++}n||a!=i||e._ignores[i]||+r.end_date>+this._trace_x[i]&&(n=!0),n||(t.splice(s,1),s--)}},e._timeline_get_events_html=function(t){var a="";if(t&&"cell"!=this.render){e._timeline_skip_ignored.call(this,t),t.sort(this.sort||function(e,t){return e.start_date.valueOf()==t.start_date.valueOf()?e.id>t.id?1:-1:e.start_date>t.start_date?1:-1});for(var i=[],n=t.length,r=0;n>r;r++){var s=t[r];s._inner=!1;var d=this.round_position?e._timeline_get_rounded_date.apply(this,[s.start_date,!1]):s.start_date;
for(this.round_position?e._timeline_get_rounded_date.apply(this,[s.end_date,!0]):s.end_date;i.length;){var o=i[i.length-1];if(!(o.end_date.valueOf()<=d.valueOf()))break;i.splice(i.length-1,1)}for(var _=!1,l=0;l<i.length;l++){var c=i[l];if(c.end_date.valueOf()<=d.valueOf()){_=!0,s._sorder=c._sorder,i.splice(l,1),s._inner=!0;break}}if(i.length&&(i[i.length-1]._inner=!0),!_)if(i.length)if(i.length<=i[i.length-1]._sorder){if(i[i.length-1]._sorder)for(var h=0;h<i.length;h++){for(var u=!1,v=0;v<i.length;v++)if(i[v]._sorder==h){
u=!0;break}if(!u){s._sorder=h;break}}else s._sorder=0;s._inner=!0}else{for(var f=i[0]._sorder,g=1;g<i.length;g++)i[g]._sorder>f&&(f=i[g]._sorder);s._sorder=f+1,s._inner=!1}else s._sorder=0;i.push(s),i.length>(i.max_count||0)?(i.max_count=i.length,s._count=i.length):s._count=s._count?s._count:1}for(var m=0;m<t.length;m++)t[m]._count=i.max_count;for(var p=0;n>p;p++)a+=e.render_timeline_event.call(this,t[p],!1)}return a},e._timeline_y_scale=function(t){var a="<table style='table-layout:fixed;' cellspacing='0' cellpadding='0'>";
e._load_mode&&e._load();for(var i=e._prepare_timeline_events(this),n=0,r=0;r<e._cols.length;r++)n+=e._cols[r];var s=new Date,d=e._cols.length-e._ignores_detected;s=(e.date.add(s,this.x_step*d,this.x_unit)-s-(this._start_correction+this._end_correction)*d)/n,this._step=s,this._summ=n;var o=e._colsS.heights=[],_=[];this._events_height={},this._section_height={};for(var r=0;r<this.y_unit.length;r++){var l=this._logic(this.render,this.y_unit[r],this);e._merge(l,{height:this.dy}),this.section_autoheight&&(this.y_unit.length*l.height<t.offsetHeight&&(l.height=Math.max(l.height,Math.floor((t.offsetHeight-1)/this.y_unit.length))),
this._section_height[this.y_unit[r].key]=l.height),l.td_className||(l.td_className="dhx_matrix_scell"+(e.templates[this.name+"_scaley_class"](this.y_unit[r].key,this.y_unit[r].label,this.y_unit[r])?" "+e.templates[this.name+"_scaley_class"](this.y_unit[r].key,this.y_unit[r].label,this.y_unit[r]):"")),l.td_content||(l.td_content=e.templates[this.name+"_scale_label"](this.y_unit[r].key,this.y_unit[r].label,this.y_unit[r])),e._merge(l,{tr_className:"",style_height:"height:"+l.height+"px;",style_width:"width:"+this.dx+"px;",
summ_width:"width:"+n+"px;",table_className:""});var c=e._timeline_get_events_html.call(this,i[r]);if(this.fit_events){var h=this._events_height[this.y_unit[r].key]||0;l.height=h>l.height?h:l.height,l.style_height="height:"+l.height+"px;",this._section_height[this.y_unit[r].key]=l.height}if(a+="<tr class='"+l.tr_className+"' style='"+l.style_height+"'><td class='"+l.td_className+"' style='"+l.style_width+" height:"+(l.height-1)+"px;' "+e._waiAria.label(l.td_content)+">"+l.td_content+"</td>","cell"==this.render)for(var u=0;u<e._cols.length;u++)a+=e._ignores[u]?"<td></td>":"<td class='dhx_matrix_cell "+e.templates[this.name+"_cell_class"](i[r][u],this._trace_x[u],this.y_unit[r])+"' style='width:"+e._cols[u]+"px'><div style='width:auto'>"+e.templates[this.name+"_cell_value"](i[r][u],this._trace_x[u],this.y_unit[r])+"</div></td>";else{
a+="<td><div style='"+l.summ_width+" "+l.style_height+" position:relative;' class='dhx_matrix_line'>",a+=c,a+="<table class='"+l.table_className+"' cellpadding='0' cellspacing='0' style='"+l.summ_width+" "+l.style_height+"' >";for(var u=0;u<e._cols.length;u++)a+=e._ignores[u]?"<td></td>":"<td class='dhx_matrix_cell "+e.templates[this.name+"_cell_class"](i[r],this._trace_x[u],this.y_unit[r])+"' style='width:"+e._cols[u]+"px'></td>";a+="</table>",a+="</div></td>"}a+="</tr>",_.push(l)}a+="</table>",
this._matrix=i,t.innerHTML=a,e._populate_timeline_rendered(t),this._scales={};for(var v=t.firstChild.rows,f=null,r=0,g=_.length;g>r;r++){f=this.y_unit[r],o.push(_[r].height);var m=f.key,p=this._scales[m]=e._isRender("cell")?v[r]:v[r].childNodes[1].getElementsByTagName("div")[0];e.callEvent("onScaleAdd",[p,m])}},e._timeline_x_dates=function(t){var a=e._min_date,i=e._max_date;e._process_ignores(a,this.x_size,this.x_unit,this.x_step,t);for(var n=(this.x_size+(t?e._ignores_detected:0),0),r=0;+i>+a;)if(this._trace_x[r]=new Date(a),
"month"==this.x_unit&&e.date[this.x_unit+"_start"]&&(a=e.date[this.x_unit+"_start"](new Date(a))),a=e.date.add(a,this.x_step,this.x_unit),e.date[this.x_unit+"_start"]&&(a=e.date[this.x_unit+"_start"](a)),e._ignores[r]||n++,r++,t)if(n<this.x_size&&!(+i>+a))i=e.date["add_"+this.name+"_private"](i,(this.x_length||this.x_size)*this.x_step);else if(n>=this.x_size){e._max_date=a;break}return{total:r,displayed:n}},e._timeline_x_scale=function(t){var a=e.xy.scale_height,i=this._header_resized||e.xy.scale_height;
e._cols=[],e._colsS={height:0},this._trace_x=[];var n=e._x-this.dx-e.xy.scroll_width,r=[this.dx],s=e._els.dhx_cal_header[0];s.style.width=r[0]+n+"px";for(var d=e._min_date_timeline=e._min_date,o=e.config.preserve_scale_length,_=e._timeline_x_dates.call(this,o),l=_.displayed,c=_.total,h=0;c>h;h++)e._ignores[h]?(e._cols[h]=0,l++):e._cols[h]=Math.floor(n/(l-h)),n-=e._cols[h],r[h+1]=r[h]+e._cols[h];if(t.innerHTML="<div></div>",this.second_scale){for(var u=this.second_scale.x_unit,v=[this._trace_x[0]],f=[],g=[this.dx,this.dx],m=0,p=0;p<this._trace_x.length;p++){
var y=this._trace_x[p],x=e._timeline_is_new_interval(u,y,v[m]);x&&(++m,v[m]=y,g[m+1]=g[m]);var b=m+1;f[m]=e._cols[p]+(f[m]||0),g[b]+=e._cols[p]}t.innerHTML="<div></div><div></div>";var w=t.firstChild;w.style.height=i+"px";var k=t.lastChild;k.style.position="relative";for(var E=0;E<v.length;E++){var D=v[E],N=e.templates[this.name+"_second_scalex_class"](D),S=document.createElement("DIV");S.className="dhx_scale_bar dhx_second_scale_bar"+(N?" "+N:""),e.set_xy(S,f[E]-1,i-3,g[E],0),S.innerHTML=e.templates[this.name+"_second_scale_date"](D),
w.appendChild(S)}}e.xy.scale_height=i,t=t.lastChild;for(var C=0;C<this._trace_x.length;C++)if(!e._ignores[C]){d=this._trace_x[C],e._render_x_header(C,r[C],d,t);var M=e.templates[this.name+"_scalex_class"](d);M&&(t.lastChild.className+=" "+M)}e.xy.scale_height=a;var A=this._trace_x;t.onclick=function(t){var a=e._timeline_locate_hcell(t);a&&e.callEvent("onXScaleClick",[a.x,A[a.x],t||event])},t.ondblclick=function(t){var a=e._timeline_locate_hcell(t);a&&e.callEvent("onXScaleDblClick",[a.x,A[a.x],t||event]);
}},e._timeline_is_new_interval=function(t,a,i){switch(t){case"hour":return a.getHours()!=i.getHours()||e._timeline_is_new_interval("day",a,i);case"day":return!(a.getDate()==i.getDate()&&a.getMonth()==i.getMonth()&&a.getFullYear()==i.getFullYear());case"week":return!(e.date.week_start(new Date(a)).valueOf()==e.date.week_start(new Date(i)).valueOf());case"month":return!(a.getMonth()==i.getMonth()&&a.getFullYear()==i.getFullYear());case"year":return!(a.getFullYear()==i.getFullYear());default:return!1;
}},e._timeline_reset_scale_height=function(t){if(this._header_resized&&(!t||!this.second_scale)){e.xy.scale_height/=2,this._header_resized=!1;var a=e._els.dhx_cal_header[0];a.className=a.className.replace(/ dhx_second_cal_header/gi,"")}},e._timeline_set_full_view=function(t){if(e._timeline_reset_scale_height.call(this,t),t){this.second_scale&&!this._header_resized&&(this._header_resized=e.xy.scale_height,e.xy.scale_height*=2,e._els.dhx_cal_header[0].className+=" dhx_second_cal_header"),e.set_sizes(),
e._init_matrix_tooltip();var a=e._min_date;e._timeline_x_scale.call(this,e._els.dhx_cal_header[0]),e._timeline_y_scale.call(this,e._els.dhx_cal_data[0]),e._min_date=a,e._els.dhx_cal_date[0].innerHTML=e.templates[this.name+"_date"](e._min_date,e._max_date),e._mark_now&&e._mark_now(),e._timeline_reset_scale_height.call(this,t)}e._timeline_hideToolTip()},e._timeline_hideToolTip=function(){e._tooltip&&(e._tooltip.style.display="none",e._tooltip.date="")},e._timeline_showToolTip=function(t,a,i){if("cell"==t.render){
var n=a.x+"_"+a.y,r=t._matrix[a.y][a.x];if(!r)return e._timeline_hideToolTip();if(r.sort(function(e,t){return e.start_date>t.start_date?1:-1}),e._tooltip){if(e._tooltip.date==n)return;e._tooltip.innerHTML=""}else{var s=e._tooltip=document.createElement("DIV");s.className="dhx_year_tooltip",document.body.appendChild(s),s.onclick=e._click.dhx_cal_data}for(var d="",o=0;o<r.length;o++){var _=r[o].color?"background-color:"+r[o].color+";":"",l=r[o].textColor?"color:"+r[o].textColor+";":"";d+="<div class='dhx_tooltip_line' event_id='"+r[o].id+"' style='"+_+l+"'>",
d+="<div class='dhx_tooltip_date'>"+(r[o]._timed?e.templates.event_date(r[o].start_date):"")+"</div>",d+="<div class='dhx_event_icon icon_details'>&nbsp;</div>",d+=e.templates[t.name+"_tooltip"](r[o].start_date,r[o].end_date,r[o])+"</div>"}e._tooltip.style.display="",e._tooltip.style.top="0px",document.body.offsetWidth-i.left-e._tooltip.offsetWidth<0?e._tooltip.style.left=i.left-e._tooltip.offsetWidth+"px":e._tooltip.style.left=i.left+a.src.offsetWidth+"px",e._tooltip.date=n,e._tooltip.innerHTML=d,
document.body.offsetHeight-i.top-e._tooltip.offsetHeight<0?e._tooltip.style.top=i.top-e._tooltip.offsetHeight+a.src.offsetHeight+"px":e._tooltip.style.top=i.top+"px"}},e._matrix_tooltip_handler=function(t){var a=e.matrix[e._mode];if(a&&"cell"==a.render){if(a){var i=e._locate_cell_timeline(t),t=t||event;t.target||t.srcElement;if(i)return e._timeline_showToolTip(a,i,getOffset(i.src))}e._timeline_hideToolTip()}},e._init_matrix_tooltip=function(){e._detachDomEvent(e._els.dhx_cal_data[0],"mouseover",e._matrix_tooltip_handler),
dhtmlxEvent(e._els.dhx_cal_data[0],"mouseover",e._matrix_tooltip_handler)},e._set_timeline_dates=function(t){e._min_date=e.date[t.name+"_start"](new Date(e._date)),e._max_date=e.date["add_"+t.name+"_private"](e._min_date,t.x_size*t.x_step),e.date[t.x_unit+"_start"]&&(e._max_date=e.date[t.x_unit+"_start"](e._max_date)),e._table_view=!0},e._renderMatrix=function(t,a){a||(e._els.dhx_cal_data[0].scrollTop=0),e._set_timeline_dates(this),e._timeline_set_full_view.call(this,t)},e._timeline_html_index=function(t){
for(var a=t.parentNode.childNodes,i=-1,n=0;n<a.length;n++)if(a[n]==t){i=n;break}var r=i;if(e._ignores_detected)for(var s in e._ignores)e._ignores[s]&&r>=1*s&&r++;return r},e._timeline_locate_hcell=function(t){t=t||event;for(var a=t.target?t.target:t.srcElement;a&&"DIV"!=a.tagName;)a=a.parentNode;if(a&&"DIV"==a.tagName){var i=e._getClassName(a).split(" ")[0];if("dhx_scale_bar"==i)return{x:e._timeline_html_index(a),y:-1,src:a,scale:!0}}},e._locate_cell_timeline=function(t){t=t||event;for(var a=t.target?t.target:t.srcElement,i={},n=e.matrix[e._mode],r=e.getActionData(t),s=e._ignores,d=0,o=0;o<n._trace_x.length-1&&!(+r.date<n._trace_x[o+1]);o++)s[o]||d++;
i.x=0===d?0:o,i.y=n.order[r.section];var _=e._isRender("cell")?1:0;i.src=n._scales[r.section]?n._scales[r.section].getElementsByTagName("td")[o+_]:null;for(var l=!1;0===i.x&&"dhx_cal_data"!=e._getClassName(a)&&a.parentNode;){if("dhx_matrix_scell"==e._getClassName(a).split(" ")[0]){l=!0;break}a=a.parentNode}return l?(i.x=-1,i.src=a,i.scale=!0):i.x=o,i};var t=e._click.dhx_cal_data;e._click.dhx_marked_timespan=e._click.dhx_cal_data=function(a){var i=t.apply(this,arguments),n=e.matrix[e._mode];if(n){
var r=e._locate_cell_timeline(a);r&&(r.scale?e.callEvent("onYScaleClick",[r.y,n.y_unit[r.y],a||event]):e.callEvent("onCellClick",[r.x,r.y,n._trace_x[r.x],(n._matrix[r.y]||{})[r.x]||[],a||event]))}return i},e.dblclick_dhx_matrix_cell=function(t){var a=e.matrix[e._mode];if(a){var i=e._locate_cell_timeline(t);i&&(i.scale?e.callEvent("onYScaleDblClick",[i.y,a.y_unit[i.y],t||event]):e.callEvent("onCellDblClick",[i.x,i.y,a._trace_x[i.x],(a._matrix[i.y]||{})[i.x]||[],t||event]))}};var a=e.dblclick_dhx_marked_timespan||function(){};
e.dblclick_dhx_marked_timespan=function(t){var i=e.matrix[e._mode];return i?e.dblclick_dhx_matrix_cell(t):a.apply(this,arguments)},e.dblclick_dhx_matrix_scell=function(t){return e.dblclick_dhx_matrix_cell(t)},e._isRender=function(t){return e.matrix[e._mode]&&e.matrix[e._mode].render==t},e.attachEvent("onCellDblClick",function(t,a,i,n,r){if(!this.config.readonly&&("dblclick"!=r.type||this.config.dblclick_create)){var s=e.matrix[e._mode],d={};d.start_date=s._trace_x[t],d.end_date=s._trace_x[t+1]?s._trace_x[t+1]:e.date.add(s._trace_x[t],s.x_step,s.x_unit),
s._start_correction&&(d.start_date=new Date(1*d.start_date+s._start_correction)),s._end_correction&&(d.end_date=new Date(d.end_date-s._end_correction)),d[s.y_property]=s.y_unit[a].key,e.addEventNow(d,null,r)}}),e.attachEvent("onBeforeDrag",function(t,a,i){return!e._isRender("cell")}),e.attachEvent("onEventChanged",function(e,t){t._timed=this.isOneDayEvent(t)}),e.attachEvent("onBeforeEventChanged",function(e,t,a,i){return e&&(e._move_delta=void 0),i&&(i._move_delta=void 0),!0}),e._is_column_visible=function(t){
var a=e.matrix[e._mode],i=e._get_date_index(a,t);return!e._ignores[i]};var i=e._render_marked_timespan;e._render_marked_timespan=function(t,a,n,r,s){if(!e.config.display_marked_timespans)return[];if(e.matrix&&e.matrix[e._mode]){if(e._isRender("cell"))return;var d=e._lame_copy({},e.matrix[e._mode]);d.round_position=!1;var o=[],_=[],l=[],c=t.sections?t.sections.units||t.sections.timeline:null;if(n)l=[a],_=[n];else{var h=d.order;if(c)h.hasOwnProperty(c)&&(_.push(c),l.push(d._scales[c]));else if(d._scales)for(var u in h)h.hasOwnProperty(u)&&(_.push(u),
l.push(d._scales[u]))}var r=r?new Date(r):e._min_date,s=s?new Date(s):e._max_date;if(r.valueOf()<e._min_date.valueOf()&&(r=new Date(e._min_date)),s.valueOf()>e._max_date.valueOf()&&(s=new Date(e._max_date)),!d._trace_x)return;for(var v=0;v<d._trace_x.length&&!e._is_column_visible(d._trace_x[v]);v++);if(v==d._trace_x.length)return;var f=[];if(t.days>6){var g=new Date(t.days);e.date.date_part(new Date(r))<=+g&&+s>=+g&&f.push(g)}else f.push.apply(f,e._get_dates_by_index(t.days));for(var m=t.zones,p=e._get_css_classes_by_config(t),y=0;y<_.length;y++){
a=l[y],n=_[y];for(var v=0;v<f.length;v++)for(var x=f[v],b=0;b<m.length;b+=2){var w=m[b],k=m[b+1],E=new Date(+x+60*w*1e3),D=new Date(+x+60*k*1e3);if(E=new Date(E.valueOf()+1e3*(E.getTimezoneOffset()-x.getTimezoneOffset())*60),D=new Date(D.valueOf()+1e3*(D.getTimezoneOffset()-x.getTimezoneOffset())*60),D>r&&s>E){var N=e._get_block_by_config(t);N.className=p;var S=e._timeline_getX({start_date:E},!1,d)-1,C=e._timeline_getX({start_date:D},!1,d)-1,M=Math.max(1,C-S-1),A=d._section_height[n]-1||d.dy-1;N.style.cssText="height: "+A+"px; left: "+S+"px; width: "+M+"px; top: 0;",
a.insertBefore(N,a.firstChild),o.push(N)}}}return o}return i.apply(e,[t,a,n])};var n=e._append_mark_now;e._append_mark_now=function(t,a){if(e.matrix&&e.matrix[e._mode]){var i=e._currentDate(),r=e._get_zone_minutes(i),s={days:+e.date.date_part(i),zones:[r,r+1],css:"dhx_matrix_now_time",type:"dhx_now_time"};return e._render_marked_timespan(s)}return n.apply(e,[t,a])};var r=e._mark_timespans;e._mark_timespans=function(){if(e.matrix&&e.matrix[e.getState().mode]){for(var t=[],a=e.matrix[e.getState().mode],i=a.y_unit,n=0;n<i.length;n++){
var s=i[n].key,d=a._scales[s],o=e._on_scale_add_marker(d,s);t.push.apply(t,o)}return t}return r.apply(this,arguments)};var s=e._on_scale_add_marker;e._on_scale_add_marker=function(t,a){if(e.matrix&&e.matrix[e._mode]){var i=[],n=e._marked_timespans;if(n&&e.matrix&&e.matrix[e._mode])for(var r=e._mode,d=e._min_date,o=e._max_date,_=n.global,l=e.date.date_part(new Date(d));o>l;l=e.date.add(l,1,"day")){var c=+l,h=l.getDay(),u=[],v=_[c]||_[h];if(u.push.apply(u,e._get_configs_to_render(v)),n[r]&&n[r][a]){
var f=[],g=e._get_types_to_render(n[r][a][h],n[r][a][c]);f.push.apply(f,e._get_configs_to_render(g)),f.length&&(u=f)}for(var m=0;m<u.length;m++){var p=u[m],y=p.days;7>y?(y=c,i.push.apply(i,e._render_marked_timespan(p,t,a,l,e.date.add(l,1,"day"))),y=h):i.push.apply(i,e._render_marked_timespan(p,t,a,l,e.date.add(l,1,"day")))}}return i}return s.apply(this,arguments)},e._resolve_timeline_section=function(e,t){var a=0,i=0;for(a;a<this._colsS.heights.length&&(i+=this._colsS.heights[a],!(i>t.y));a++);e.y_unit[a]||(a=e.y_unit.length-1),
this._drag_event&&!this._drag_event._orig_section&&(this._drag_event._orig_section=e.y_unit[a].key),t.fields={},a>=0&&e.y_unit[a]&&(t.section=t.fields[e.y_property]=e.y_unit[a].key)},e._update_timeline_section=function(e){var t=e.view,a=e.event,i=e.pos;if(a){if(a[t.y_property]!=i.section){var n=this._get_timeline_event_height(a,t);a._sorder=this._get_dnd_order(a._sorder,n,t._section_height[i.section])}a[t.y_property]=i.section}},e._get_date_index=function(e,t){for(var a=0,i=e._trace_x;a<i.length-1&&+t>=+i[a+1];)a++;
return a},e._timeline_drag_date=function(t,a){var i,n,r=t,s={x:a},d=0,o=0;for(o;o<=this._cols.length-1;o++)if(n=this._cols[o],d+=n,d>s.x){i=(s.x-(d-n))/n,i=0>i?0:i;break}if(r.round_position){var _=1,l=e.getState().drag_mode;l&&"move"!=l&&"create"!=l&&(_=.5),i>=_&&o++,i=0}if(0===o&&this._ignores[0])for(o=1,i=0;this._ignores[o];)o++;else if(o==this._cols.length&&this._ignores[o-1]){for(o=this._cols.length-1,i=0;this._ignores[o];)o--;o++}var c;if(o>=r._trace_x.length)c=e.date.add(r._trace_x[r._trace_x.length-1],r.x_step,r.x_unit),
r._end_correction&&(c=new Date(c-r._end_correction));else{var h=i*n*r._step+r._start_correction;c=new Date(+r._trace_x[o]+h)}return c},e.attachEvent("onBeforeTodayDisplayed",function(){for(var t in e.matrix){var a=e.matrix[t];a.x_start=a._original_x_start}return!0}),e.attachEvent("onOptionsLoad",function(){for(var t in e.matrix){var a=e.matrix[t];a.order={},e.callEvent("onOptionsLoadStart",[]);for(var t=0;t<a.y_unit.length;t++)a.order[a.y_unit[t].key]=t;e.callEvent("onOptionsLoadFinal",[]),e._date&&a.name==e._mode&&e.setCurrentView(e._date,e._mode);
}}),e.attachEvent("onSchedulerResize",function(){if(e.matrix[this._mode]){var t=e.matrix[this._mode];return e._renderMatrix.call(t,!0,!0),!1}return!0}),e.attachEvent("onBeforeDrag",function(t,a,i){if("resize"==a){var n=i.target||i.srcElement,r=e._getClassName(n);r.indexOf("dhx_event_resize_end")<0?e._drag_from_start=!0:e._drag_from_start=!1}return!0})},e._temp_matrix_scope()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e._props={},e.createUnitsView=function(t,a,i,n,r,s,o){"object"==typeof t&&(i=t.list,a=t.property,n=t.size||0,r=t.step||1,s=t.skip_incorrect,o=t.days||1,t=t.name),e._props[t]={map_to:a,options:i,step:r,position:0,days:o},n>e._props[t].options.length&&(e._props[t]._original_size=n,n=0),e._props[t].size=n,e._props[t].skip_incorrect=s||!1,e.date[t+"_start"]=e.date.day_start,e.templates[t+"_date"]=function(a,i){var n=e._props[t];return n.days>1?e.templates.week_date(a,i):e.templates.day_date(a);
},e._get_unit_index=function(t,a){var i=t.position||0,n=Math.round((e._correct_shift(+a,1)-+e._min_date)/864e5),r=t.options.length;return n>=r&&(n%=r),i+n},e.templates[t+"_scale_text"]=function(e,t,a){return a.css?"<span class='"+a.css+"'>"+t+"</span>":t},e.templates[t+"_scale_date"]=function(a){var i=e._props[t],n=i.options;if(!n.length)return"";var r=e._get_unit_index(i,a),s=n[r];return e.templates[t+"_scale_text"](s.key,s.label,s)},e.templates[t+"_second_scale_date"]=function(t){return e.templates.week_scale_date(t);
},e.date["add_"+t]=function(a,i){return e.date.add(a,i*e._props[t].days,"day")},e.date["get_"+t+"_end"]=function(a){return e.date.add(a,(e._props[t].size||e._props[t].options.length)*e._props[t].days,"day")},e.attachEvent("onOptionsLoad",function(){for(var a=e._props[t],i=a.order={},n=a.options,r=0;r<n.length;r++)i[n[r].key]=r;a._original_size&&0===a.size&&(a.size=a._original_size,delete a.original_size),a.size>n.length?(a._original_size=a.size,a.size=0):a.size=a._original_size||a.size,e._date&&e._mode==t&&e.setCurrentView(e._date,e._mode);
}),e["mouse_"+t]=function(t){var a=e._props[this._mode];if(a){if(t=this._week_indexes_from_pos(t),this._drag_event||(this._drag_event={}),this._drag_id&&this._drag_mode&&(this._drag_event._dhx_changed=!0),this._drag_mode&&"new-size"==this._drag_mode){var i=e._get_event_sday(e._events[e._drag_id]);Math.floor(t.x/a.options.length)!=Math.floor(i/a.options.length)&&(t.x=i)}var n=t.x%a.options.length,r=Math.min(n+a.position,a.options.length-1);t.section=(a.options[r]||{}).key,t.x=Math.floor(t.x/a.options.length);
var s=this.getEvent(this._drag_id);this._update_unit_section({view:a,event:s,pos:t})}return t.force_redraw=!0,t},e.callEvent("onOptionsLoad",[])},e._update_unit_section=function(e){var t=e.view,a=e.event,i=e.pos;a&&(a[t.map_to]=i.section)},e.scrollUnit=function(t){var a=e._props[this._mode];a&&(a.position=Math.min(Math.max(0,a.position+t),a.options.length-a.size),this.setCurrentView())},function(){var t=function(t){var a=e._props[e._mode];if(a&&a.order&&a.skip_incorrect){for(var i=[],n=0;n<t.length;n++)"undefined"!=typeof a.order[t[n][a.map_to]]&&i.push(t[n]);
t.splice(0,t.length),t.push.apply(t,i)}return t},a=e._pre_render_events_table;e._pre_render_events_table=function(e,i){return e=t(e),a.apply(this,[e,i])};var i=e._pre_render_events_line;e._pre_render_events_line=function(e,a){return e=t(e),i.apply(this,[e,a])};var n=function(t,a){if(t&&"undefined"==typeof t.order[a[t.map_to]]){var i=e,n=864e5,r=Math.floor((a.end_date-i._min_date)/n);return t.options.length&&(a[t.map_to]=t.options[Math.min(r+t.position,t.options.length-1)].key),!0}},r=e.is_visible_events;
e.is_visible_events=function(t){var a=r.apply(this,arguments);if(a){var i=e._props[this._mode];if(i&&i.size){var n=i.order[t[i.map_to]];if(n<i.position||n>=i.size+i.position)return!1}}return a};var s=e._process_ignores;e._process_ignores=function(t,a,i,n,r){if(!e._props[this._mode])return void s.call(this,t,a,i,n,r);this._ignores={},this._ignores_detected=0;var o=e["ignore_"+this._mode];if(o){var d=e._props&&e._props[this._mode]?e._props[this._mode].size||e._props[this._mode].options.length:1;a/=d;
for(var _=new Date(t),l=0;a>l;l++){if(o(_))for(var c=l*d,h=(l+1)*d,u=c;h>u;u++)this._ignores_detected+=1,this._ignores[u]=!0,r&&a++;_=e.date.add(_,n,i),e.date[i+"_start"]&&(_=e.date[i+"_start"](_))}}};var o=e._reset_scale;e._reset_scale=function(){var t=e._props[this._mode],a=o.apply(this,arguments);if(t){this._max_date=this.date.add(this._min_date,t.days,"day");for(var i=this._els.dhx_cal_data[0].childNodes,n=0;n<i.length;n++)i[n].className=i[n].className.replace("_now","");var r=this._currentDate();
if(r.valueOf()>=this._min_date&&r.valueOf()<this._max_date){var s=864e5,d=Math.floor((r-e._min_date)/s),_=t.options.length,l=d*_,c=l+_;for(n=l;c>n;n++)i[n]&&(i[n].className=i[n].className.replace("dhx_scale_holder","dhx_scale_holder_now"))}if(t.size&&t.size<t.options.length){var h=this._els.dhx_cal_header[0],u=document.createElement("DIV");t.position&&(this._waiAria.headerButtonsAttributes(u,""),u.className="dhx_cal_prev_button",u.style.cssText="left:1px;top:2px;position:absolute;",u.innerHTML="&nbsp;",
h.firstChild.appendChild(u),u.onclick=function(){e.scrollUnit(-1*t.step)}),t.position+t.size<t.options.length&&(this._waiAria.headerButtonsAttributes(u,""),u=document.createElement("DIV"),u.className="dhx_cal_next_button",u.style.cssText="left:auto; right:0px;top:2px;position:absolute;",u.innerHTML="&nbsp;",h.lastChild.appendChild(u),u.onclick=function(){e.scrollUnit(t.step)})}}return a};var d=e._reset_scale;e._reset_scale=function(){var t=e._props[this._mode],a=e.xy.scale_height;t&&t.days>1?this._header_resized||(this._header_resized=e.xy.scale_height,
e.xy.scale_height=2*a):this._header_resized&&(e.xy.scale_height/=2,this._header_resized=!1),d.apply(this,arguments)};var _=e._get_view_end;e._get_view_end=function(){var t=e._props[this._mode];if(t&&t.days>1){var a=this._get_timeunit_start();return e.date.add(a,t.days,"day")}return _.apply(this,arguments)};var l=e._render_x_header;e._render_x_header=function(t,a,i,n){var r=e._props[this._mode];if(!r||r.days<=1)return l.apply(this,arguments);if(r.days>1){var s=e.xy.scale_height;e.xy.scale_height=Math.ceil(s/2),
l.call(this,t,a,i,n,Math.ceil(e.xy.scale_height));var o=r.options.length;if((t+1)%o===0){var d=document.createElement("DIV");d.className="dhx_scale_bar dhx_second_scale_bar";var _=this.date.add(this._min_date,Math.floor(t/o),"day");this.templates[this._mode+"_second_scalex_class"]&&(d.className+=" "+this.templates[this._mode+"_second_scalex_class"](new Date(_)));var c,h=this._cols[t]*o-1;c=o>1?this._colsS[t-(o-1)]-this.xy.scale_width-2:a,this.set_xy(d,h,this.xy.scale_height-2,c,0),d.innerHTML=this.templates[this._mode+"_second_scale_date"](new Date(_),this._mode),
n.appendChild(d)}e.xy.scale_height=s}};var c=e._get_event_sday;e._get_event_sday=function(t){var a=e._props[this._mode];if(a){if(a.days<=1)return n(a,t),this._get_section_sday(t[a.map_to]);var i=864e5,r=Math.floor((t.end_date.valueOf()-1-60*t.end_date.getTimezoneOffset()*1e3-(e._min_date.valueOf()-60*e._min_date.getTimezoneOffset()*1e3))/i),s=a.options.length,o=a.order[t[a.map_to]];return r*s+o-a.position}return c.call(this,t)},e._get_section_sday=function(t){var a=e._props[this._mode];return a.order[t]-a.position;
};var h=e.locate_holder_day;e.locate_holder_day=function(t,a,i){var r=e._props[this._mode];if(!r)return h.apply(this,arguments);var s;if(i?n(r,i):(i={start_date:t,end_date:t},s=0),r.days<=1)return 1*(void 0===s?r.order[i[r.map_to]]:s)+(a?1:0)-r.position;var o=864e5,d=Math.floor((i.start_date.valueOf()-e._min_date.valueOf())/o),_=r.options.length,l=void 0===s?r.order[i[r.map_to]]:s;return d*_+1*l+(a?1:0)-r.position};var u=e._time_order;e._time_order=function(t){var a=e._props[this._mode];a?t.sort(function(e,t){
return a.order[e[a.map_to]]>a.order[t[a.map_to]]?1:-1}):u.apply(this,arguments)};var v=e._pre_render_events_table;e._pre_render_events_table=function(t,a){function i(t){var a=e.date.add(t,1,"day");return a=e.date.date_part(a)}var n=e._props[this._mode];if(n&&n.days>1&&!this.config.all_timed){for(var r={},s=0;s<t.length;s++){var o=t[s];if(this.isOneDayEvent(t[s])){var d=+e.date.date_part(new Date(o.start_date));r[d]||(r[d]=[]),r[d].push(o)}else{var _=new Date(Math.min(+o.end_date,+this._max_date)),l=new Date(Math.max(+o.start_date,+this._min_date));
for(t.splice(s,1);+_>+l;){var c=this._copy_event(o);c.start_date=l,c.end_date=i(c.start_date),l=e.date.add(l,1,"day");var d=+e.date.date_part(new Date(l));r[d]||(r[d]=[]),r[d].push(c),t.splice(s,0,c),s++}s--}}var h=[];for(var s in r)h.splice.apply(h,[h.length-1,0].concat(v.apply(this,[r[s],a])));for(var s=0;s<h.length;s++)this._ignores[h[s]._sday]?(h.splice(s,1),s--):h[s]._first_chunk=h[s]._last_chunk=!1;h.sort(function(e,t){return e.start_date.valueOf()==t.start_date.valueOf()?e.id>t.id?1:-1:e.start_date>t.start_date?1:-1;
}),t=h}else t=v.apply(this,[t,a]);return t},e.attachEvent("onEventAdded",function(t,a){if(this._loading)return!0;for(var i in e._props){var n=e._props[i];"undefined"==typeof a[n.map_to]&&(a[n.map_to]=n.options[0].key)}return!0}),e.attachEvent("onEventCreated",function(t,a){var i=e._props[this._mode];if(i&&a){var r=this.getEvent(t);n(i,r);var s=this._mouse_coords(a);this._update_unit_section({view:i,event:r,pos:s}),this.event_updated(r)}return!0})}()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.config.active_link_view="day",e._active_link_click=function(t){var i=t.target||event.srcElement,r=i.getAttribute("jump_to"),s=e.date.str_to_date(e.config.api_date);return r?(e.setCurrentView(s(r),e.config.active_link_view),t&&t.preventDefault&&t.preventDefault(),!1):void 0},e.attachEvent("onTemplatesReady",function(){var t=function(t,i){i=i||t+"_scale_date",e.templates["_active_links_old_"+i]||(e.templates["_active_links_old_"+i]=e.templates[i]);var r=e.templates["_active_links_old_"+i],s=e.date.date_to_str(e.config.api_date);
e.templates[i]=function(e){return"<a jump_to='"+s(e)+"' href='#'>"+r(e)+"</a>"}};if(t("week"),t("","month_day"),this.matrix)for(var i in this.matrix)t(i);this._detachDomEvent(this._obj,"click",e._active_link_click),dhtmlxEvent(this._obj,"click",e._active_link_click)})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.date.add_agenda=function(t){return e.date.add(t,1,"year")},e.templates.agenda_time=function(t,i,a){return a._timed?this.day_date(a.start_date,a.end_date,a)+" "+this.event_date(t):e.templates.day_date(t)+" &ndash; "+e.templates.day_date(i)},e.templates.agenda_text=function(e,t,i){return i.text},e.templates.agenda_date=function(){return""},e.date.agenda_start=function(){return e.date.date_part(e._currentDate())},e.attachEvent("onTemplatesReady",function(){function t(t){
if(t){var i=e.locale.labels,a=e._waiAria.agendaHeadAttrString(),r=e._waiAria.agendaHeadDateString(i.date),s=e._waiAria.agendaHeadDescriptionString(i.description);e._els.dhx_cal_header[0].innerHTML="<div "+a+" class='dhx_agenda_line'><div "+r+">"+i.date+"</div><span style='padding-left:25px' "+s+">"+i.description+"</span></div>",e._table_view=!0,e.set_sizes()}}function i(){var t=(e._date,e.get_visible_events());t.sort(function(e,t){return e.start_date>t.start_date?1:-1});for(var i,a=e._waiAria.agendaDataAttrString(),r="<div class='dhx_agenda_area' "+a+">",s=0;s<t.length;s++){
var n=t[s],d=n.color?"background:"+n.color+";":"",l=n.textColor?"color:"+n.textColor+";":"",o=e.templates.event_class(n.start_date,n.end_date,n);i=e._waiAria.agendaEventAttrString(n);var h=e._waiAria.agendaDetailsBtnString();r+="<div "+i+" class='dhx_agenda_line"+(o?" "+o:"")+"' event_id='"+n.id+"' style='"+l+d+(n._text_style||"")+"'><div class='dhx_agenda_event_time'>"+e.templates.agenda_time(n.start_date,n.end_date,n)+"</div>",r+="<div "+h+" class='dhx_event_icon icon_details'>&nbsp</div>",r+="<span>"+e.templates.agenda_text(n.start_date,n.end_date,n)+"</span></div>";
}r+="<div class='dhx_v_border'></div></div>",e._els.dhx_cal_data[0].innerHTML=r,e._els.dhx_cal_data[0].childNodes[0].scrollTop=e._agendaScrollTop||0;var _=e._els.dhx_cal_data[0].childNodes[0],c=_.childNodes[_.childNodes.length-1];c.style.height=_.offsetHeight<e._els.dhx_cal_data[0].offsetHeight?"100%":_.offsetHeight+"px";var u=e._els.dhx_cal_data[0].firstChild.childNodes;e._els.dhx_cal_date[0].innerHTML=e.templates.agenda_date(e._min_date,e._max_date,e._mode),e._rendered=[];for(var s=0;s<u.length-1;s++)e._rendered[s]=u[s];
}var a=e.dblclick_dhx_cal_data;e.dblclick_dhx_cal_data=function(){if("agenda"==this._mode)!this.config.readonly&&this.config.dblclick_create&&this.addEventNow();else if(a)return a.apply(this,arguments)},e.attachEvent("onSchedulerResize",function(){return"agenda"==this._mode?(this.agenda_view(!0),!1):!0});var r=e.render_data;e.render_data=function(e){return"agenda"!=this._mode?r.apply(this,arguments):void i()};var s=e.render_view_data;e.render_view_data=function(){return"agenda"==this._mode&&(e._agendaScrollTop=e._els.dhx_cal_data[0].childNodes[0].scrollTop,
e._els.dhx_cal_data[0].childNodes[0].scrollTop=0),s.apply(this,arguments)},e.agenda_view=function(a){e._min_date=e.config.agenda_start||e.date.agenda_start(e._date),e._max_date=e.config.agenda_end||e.date.add_agenda(e._min_date,1),t(a),a?(e._cols=null,e._colsS=null,e._table_view=!0,i()):e._table_view=!1}})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){!function(){e.config.all_timed="short",e.config.all_timed_month=!1;var t=function(e){return!((e.end_date-e.start_date)/36e5>=24)};e._safe_copy=function(t){var i=null,a=e._copy_event(t);return t.event_pid&&(i=e.getEvent(t.event_pid)),i&&i.isPrototypeOf(t)&&(delete a.event_length,delete a.event_pid,delete a.rec_pattern,delete a.rec_type),a};var i=e._pre_render_events_line,a=e._pre_render_events_table,r=function(e,t){return this._table_view?a.call(this,e,t):i.call(this,e,t);
};e._pre_render_events_line=e._pre_render_events_table=function(i,a){function s(e){var t=n(e.start_date);return+e.end_date>+t}function n(t){var i=e.date.add(t,1,"day");return i=e.date.date_part(i)}function d(t,i){var a=e.date.date_part(new Date(t));return a.setHours(i),a}if(!this.config.all_timed||this._table_view&&"month"!=this._mode||"month"==this._mode&&!this.config.all_timed_month)return r.call(this,i,a);for(var l=0;l<i.length;l++){var o=i[l];if(!o._timed)if("short"!=this.config.all_timed||t(o)){
var _=this._safe_copy(o);_.start_date=new Date(_.start_date),s(o)?(_.end_date=n(_.start_date),24!=this.config.last_hour&&(_.end_date=d(_.start_date,this.config.last_hour))):_.end_date=new Date(o.end_date);var h=!1;_.start_date<this._max_date&&_.end_date>this._min_date&&_.start_date<_.end_date&&(i[l]=_,h=!0);var c=this._safe_copy(o);if(c.end_date=new Date(c.end_date),c.start_date<this._min_date?c.start_date=d(this._min_date,this.config.first_hour):c.start_date=d(n(o.start_date),this.config.first_hour),
c.start_date<this._max_date&&c.start_date<c.end_date){if(!h){i[l--]=c;continue}i.splice(l+1,0,c)}}else"month"!=this._mode&&i.splice(l--,1)}var u="move"==this._drag_mode?!1:a;return r.call(this,i,u)};var s=e.get_visible_events;e.get_visible_events=function(e){return this.config.all_timed&&this.config.multi_day?s.call(this,!1):s.call(this,e)},e.attachEvent("onBeforeViewChange",function(t,i,a,r){return e._allow_dnd="day"==a||"week"==a,!0}),e._is_main_area_event=function(e){return!!(e._timed||this.config.all_timed===!0||"short"==this.config.all_timed&&t(e));
};var n=e.updateEvent;e.updateEvent=function(t){var i,a,r=e.getEvent(t);r&&(i=e.config.all_timed&&!(e.isOneDayEvent(e._events[t])||e.getState().drag_id),i&&(a=e.config.update_render,e.config.update_render=!0)),n.apply(e,arguments),r&&i&&(e.config.update_render=a)}}()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){!function(){function t(t){var a=e._get_section_view();a&&t&&(i=e.getEvent(t)[e._get_section_property()])}var i,a;e.config.collision_limit=1,e.attachEvent("onBeforeDrag",function(e){return t(e),!0}),e.attachEvent("onBeforeLightbox",function(i){var r=e.getEvent(i);return a=[r.start_date,r.end_date],t(i),!0}),e.attachEvent("onEventChanged",function(t){if(!t||!e.getEvent(t))return!0;var i=e.getEvent(t);if(!e.checkCollision(i)){if(!a)return!1;i.start_date=a[0],i.end_date=a[1],
i._timed=this.isOneDayEvent(i)}return!0}),e.attachEvent("onBeforeEventChanged",function(t,i,a){return e.checkCollision(t)}),e.attachEvent("onEventAdded",function(t,i){var a=e.checkCollision(i);a||e.deleteEvent(t)}),e.attachEvent("onEventSave",function(t,i,a){if(i=e._lame_clone(i),i.id=t,!i.start_date||!i.end_date){var r=e.getEvent(t);i.start_date=new Date(r.start_date),i.end_date=new Date(r.end_date)}return i.rec_type&&e._roll_back_dates(i),e.checkCollision(i)}),e._check_sections_collision=function(t,i){
var a=e._get_section_property();return t[a]==i[a]&&t.id!=i.id?!0:!1},e.checkCollision=function(t){var a=[],r=e.config.collision_limit;if(t.rec_type)for(var n=e.getRecDates(t),s=0;s<n.length;s++)for(var d=e.getEvents(n[s].start_date,n[s].end_date),o=0;o<d.length;o++)(d[o].event_pid||d[o].id)!=t.id&&a.push(d[o]);else{a=e.getEvents(t.start_date,t.end_date);for(var l=0;l<a.length;l++)if(a[l].id==t.id){a.splice(l,1);break}}var _=e._get_section_view(),h=e._get_section_property(),c=!0;if(_){for(var u=0,l=0;l<a.length;l++)a[l].id!=t.id&&this._check_sections_collision(a[l],t)&&u++;
u>=r&&(c=!1)}else a.length>=r&&(c=!1);if(!c){var g=!e.callEvent("onEventCollision",[t,a]);return g||(t[h]=i||t[h]),g}return c}}()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){!function(){e.config.container_autoresize=!0,e.config.month_day_min_height=90,e.config.min_grid_size=25,e.config.min_map_size=400;var t=e._pre_render_events,i=!0,a=0,r=0;e._pre_render_events=function(n,s){if(!e.config.container_autoresize||!i)return t.apply(this,arguments);var d=this.xy.bar_height,o=this._colsS.heights,l=this._colsS.heights=[0,0,0,0,0,0,0],_=this._els.dhx_cal_data[0];if(n=this._table_view?this._pre_render_events_table(n,s):this._pre_render_events_line(n,s),
this._table_view)if(s)this._colsS.heights=o;else{var h=_.firstChild;if(h.rows){for(var c=0;c<h.rows.length;c++){if(l[c]++,l[c]*d>this._colsS.height-this.xy.month_head_height){var u=h.rows[c].cells,g=this._colsS.height-this.xy.month_head_height;1*this.config.max_month_events!==this.config.max_month_events||l[c]<=this.config.max_month_events?g=l[c]*d:(this.config.max_month_events+1)*d>this._colsS.height-this.xy.month_head_height&&(g=(this.config.max_month_events+1)*d);for(var f=0;f<u.length;f++)u[f].childNodes[1].style.height=g+"px";
l[c]=(l[c-1]||0)+u[0].offsetHeight}l[c]=(l[c-1]||0)+h.rows[c].cells[0].offsetHeight}l.unshift(0),h.parentNode.offsetHeight<h.parentNode.scrollHeight&&!h._h_fix}else if(n.length||"visible"!=this._els.dhx_multi_day[0].style.visibility||(l[0]=-1),n.length||-1==l[0]){var v=(h.parentNode.childNodes,(l[0]+1)*d+1);r!=v+1&&(this._obj.style.height=a-r+v-1+"px"),v+="px",_.style.top=this._els.dhx_cal_navline[0].offsetHeight+this._els.dhx_cal_header[0].offsetHeight+parseInt(v,10)+"px",_.style.height=this._obj.offsetHeight-parseInt(_.style.top,10)-(this.xy.margin_top||0)+"px";
var m=this._els.dhx_multi_day[0];m.style.height=v,m.style.visibility=-1==l[0]?"hidden":"visible",m=this._els.dhx_multi_day[1],m.style.height=v,m.style.visibility=-1==l[0]?"hidden":"visible",m.className=l[0]?"dhx_multi_day_icon":"dhx_multi_day_icon_small",this._dy_shift=(l[0]+1)*d,l[0]=0}}return n};var n=["dhx_cal_navline","dhx_cal_header","dhx_multi_day","dhx_cal_data"],s=function(t){a=0;for(var i=0;i<n.length;i++){var s=n[i],d=e._els[s]?e._els[s][0]:null,o=0;switch(s){case"dhx_cal_navline":case"dhx_cal_header":
o=parseInt(d.style.height,10);break;case"dhx_multi_day":o=d?d.offsetHeight-1:0,r=o;break;case"dhx_cal_data":var l=e.getState().mode;if(o=d.childNodes[1]&&"month"!=l?d.childNodes[1].offsetHeight:Math.max(d.offsetHeight-1,d.scrollHeight),"month"==l){if(e.config.month_day_min_height&&!t){var _=d.getElementsByTagName("tr").length;o=_*e.config.month_day_min_height}t&&(d.style.height=o+"px")}else if("year"==l)o=190*e.config.year_y;else if("agenda"==l){if(o=0,d.childNodes&&d.childNodes.length)for(var h=0;h<d.childNodes.length;h++)o+=d.childNodes[h].offsetHeight;
o+2<e.config.min_grid_size?o=e.config.min_grid_size:o+=2}else if("week_agenda"==l){for(var c,u,g=e.xy.week_agenda_scale_height+e.config.min_grid_size,f=0;f<d.childNodes.length;f++){u=d.childNodes[f];for(var h=0;h<u.childNodes.length;h++){for(var v=0,m=u.childNodes[h].childNodes[1],p=0;p<m.childNodes.length;p++)v+=m.childNodes[p].offsetHeight;c=v+e.xy.week_agenda_scale_height,c=1!=f||2!=h&&3!=h?c:2*c,c>g&&(g=c)}}o=3*g}else if("map"==l){o=0;for(var b=d.querySelectorAll(".dhx_map_line"),h=0;h<b.length;h++)o+=b[h].offsetHeight;
o+2<e.config.min_map_size?o=e.config.min_map_size:o+=2}else if(e._gridView)if(o=0,d.childNodes[1].childNodes[0].childNodes&&d.childNodes[1].childNodes[0].childNodes.length){for(var b=d.childNodes[1].childNodes[0].childNodes[0].childNodes,h=0;h<b.length;h++)o+=b[h].offsetHeight;o+=2,o<e.config.min_grid_size&&(o=e.config.min_grid_size)}else o=e.config.min_grid_size;if(e.matrix&&e.matrix[l])if(t)o+=2,d.style.height=o+"px";else{o=2;for(var x=e.matrix[l],y=x.y_unit,w=0;w<y.length;w++)o+=y[w].children?x.folder_dy||x.dy:x.dy;
}("day"==l||"week"==l||e._props&&e._props[l])&&(o+=2)}a+=o}e._obj.style.height=a+"px",t||e.updateView()},d=function(){if(!e.config.container_autoresize||!i)return!0;var t=e.getState().mode;s(),(e.matrix&&e.matrix[t]||"month"==t)&&window.setTimeout(function(){s(!0)},1)};e.attachEvent("onViewChange",d),e.attachEvent("onXLE",d),e.attachEvent("onEventChanged",d),e.attachEvent("onEventCreated",d),e.attachEvent("onEventAdded",d),e.attachEvent("onEventDeleted",d),e.attachEvent("onAfterSchedulerResize",d),
e.attachEvent("onClearAll",d),e.attachEvent("onBeforeExpand",function(){return i=!1,!0}),e.attachEvent("onBeforeCollapse",function(){return i=!0,!0})}()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){!function(){function t(e,t,i){var a=e+"="+i+(t?"; "+t:"");document.cookie=a}function i(e){var t=e+"=";if(document.cookie.length>0){var i=document.cookie.indexOf(t);if(-1!=i){i+=t.length;var a=document.cookie.indexOf(";",i);return-1==a&&(a=document.cookie.length),document.cookie.substring(i,a)}}return""}var a=!0;e.attachEvent("onBeforeViewChange",function(n,r,s,d){if(a&&e._get_url_nav){var o=e._get_url_nav();(o.date||o.mode||o.event)&&(a=!1)}var l=(e._obj.id||"scheduler")+"_settings";
if(a){a=!1;var _=i(l);if(_){e._min_date||(e._min_date=d),_=unescape(_).split("@"),_[0]=this.templates.xml_date(_[0]);var h=this.isViewExists(_[1])?_[1]:s,c=isNaN(+_[0])?d:_[0];return window.setTimeout(function(){e.setCurrentView(c,h)},1),!1}}var u=escape(this.templates.xml_format(d||r)+"@"+(s||n));return t(l,"expires=Sun, 31 Jan 9999 22:00:00 GMT",u),!0});var n=e._load;e._load=function(){var t=arguments;if(e._date)n.apply(this,t);else{var i=this;window.setTimeout(function(){n.apply(i,t)},1)}}}()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

scheduler.date.date_to_str=function(e,t){return function(i){return e.replace(/%[a-zA-Z]/g,function(e){switch(e){case"%d":return t?scheduler.date.to_fixed(i.getUTCDate()):scheduler.date.to_fixed(i.getDate());case"%m":return t?scheduler.date.to_fixed(i.getUTCMonth()+1):scheduler.date.to_fixed(i.getMonth()+1);case"%j":return t?i.getUTCDate():i.getDate();case"%n":return t?i.getUTCMonth()+1:i.getMonth()+1;case"%y":return t?scheduler.date.to_fixed(i.getUTCFullYear()%100):scheduler.date.to_fixed(i.getFullYear()%100);
case"%Y":return t?i.getUTCFullYear():i.getFullYear();case"%D":return t?scheduler.locale.date.day_short[i.getUTCDay()]:scheduler.locale.date.day_short[i.getDay()];case"%l":return t?scheduler.locale.date.day_full[i.getUTCDay()]:scheduler.locale.date.day_full[i.getDay()];case"%M":return t?scheduler.locale.date.month_short[i.getUTCMonth()]:scheduler.locale.date.month_short[i.getMonth()];case"%F":return t?scheduler.locale.date.month_full[i.getUTCMonth()]:scheduler.locale.date.month_full[i.getMonth()];case"%h":
return t?scheduler.date.to_fixed((i.getUTCHours()+11)%12+1):scheduler.date.to_fixed((i.getHours()+11)%12+1);case"%g":return t?(i.getUTCHours()+11)%12+1:(i.getHours()+11)%12+1;case"%G":return t?i.getUTCHours():i.getHours();case"%H":return t?scheduler.date.to_fixed(i.getUTCHours()):scheduler.date.to_fixed(i.getHours());case"%i":return t?scheduler.date.to_fixed(i.getUTCMinutes()):scheduler.date.to_fixed(i.getMinutes());case"%a":return t?i.getUTCHours()>11?"pm":"am":i.getHours()>11?"pm":"am";case"%A":
return t?i.getUTCHours()>11?"PM":"AM":i.getHours()>11?"PM":"AM";case"%s":return t?scheduler.date.to_fixed(i.getUTCSeconds()):scheduler.date.to_fixed(i.getSeconds());case"%W":return t?scheduler.date.to_fixed(scheduler.date.getUTCISOWeek(i)):scheduler.date.to_fixed(scheduler.date.getISOWeek(i));default:return e}})}},scheduler.date.str_to_date=function(e,t){return function(i){for(var a=[0,0,1,0,0,0],r=i.match(/[a-zA-Z]+|[0-9]+/g),n=e.match(/%[a-zA-Z]/g),s=0;s<n.length;s++)switch(n[s]){case"%j":case"%d":
a[2]=r[s]||1;break;case"%n":case"%m":a[1]=(r[s]||1)-1;break;case"%y":a[0]=1*r[s]+(r[s]>50?1900:2e3);break;case"%g":case"%G":case"%h":case"%H":a[3]=r[s]||0;break;case"%i":a[4]=r[s]||0;break;case"%Y":a[0]=r[s]||0;break;case"%a":case"%A":a[3]=a[3]%12+("am"==(r[s]||"").toLowerCase()?0:12);break;case"%s":a[5]=r[s]||0;break;case"%M":a[1]=scheduler.locale.date.month_short_hash[r[s]]||0;break;case"%F":a[1]=scheduler.locale.date.month_full_hash[r[s]]||0}return t?new Date(Date.UTC(a[0],a[1],a[2],a[3],a[4],a[5])):new Date(a[0],a[1],a[2],a[3],a[4],a[5]);
}};
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){!function(){e._inited_multisection_copies||(e.attachEvent("onEventIdChange",function(e,t){var i=this._multisection_copies;if(i&&i[e]&&!i[t]){var a=i[e];delete i[e],i[t]=a}}),e._inited_multisection_copies=!0),e._register_copies_array=function(e){for(var t=0;t<e.length;t++)this._register_copy(e[t])},e._register_copy=function(e){this._multisection_copies[e.id]||(this._multisection_copies[e.id]={});var t=e[this._get_section_property()],i=this._multisection_copies[e.id];i[t]||(i[t]=e);
},e._get_copied_event=function(t,i){if(!this._multisection_copies[t])return null;if(this._multisection_copies[t][i])return this._multisection_copies[t][i];var a=this._multisection_copies[t];if(e._drag_event&&e._drag_event._orig_section&&a[e._drag_event._orig_section])return a[e._drag_event._orig_section];var r=1/0,n=null;for(var s in a)a[s]._sorder<r&&(n=a[s],r=a[s]._sorder);return n},e._clear_copied_events=function(){this._multisection_copies={}},e._restore_render_flags=function(t){for(var i=this._get_section_property(),a=0;a<t.length;a++){
var r=t[a],n=e._get_copied_event(r.id,r[i]);if(n)for(var s in n)0===s.indexOf("_")&&(r[s]=n[s])}};var t=e.createTimelineView;e.createTimelineView=function(i){function a(){var t=new Date(e.getState().date),a=e.date[c+"_start"](t);a=e.date.date_part(a);var r=[],n=e.matrix[c];n.y_unit=r,n.order={};for(var s=0;s<i.days;s++)r.push({key:+a,label:a}),n.order[n.y_unit[s].key]=s,a=e.date.add(a,1,"day")}function r(e){var t={};for(var i in e)t[i]=e[i];return t}function n(e,t){t.setDate(1),t.setFullYear(e.getFullYear()),
t.setMonth(e.getMonth()),t.setDate(e.getDate())}function s(t){for(var i=[],a=0;a<t.length;a++){var r=o(t[a]);if(e.isOneDayEvent(r))l(r),i.push(r);else{for(var n=new Date(Math.min(+r.end_date,+e._max_date)),s=new Date(Math.max(+r.start_date,+e._min_date)),_=[];+n>+s;){var c=o(r);c.start_date=s,c.end_date=new Date(Math.min(+h(c.start_date),+n)),s=h(s),l(c),i.push(c),_.push(c)}d(_,r)}}return i}function d(e,t){for(var i=!1,a=!1,r=0,n=e.length;n>r;r++){var s=e[r];i=+s._w_start_date==+t.start_date,a=+s._w_end_date==+t.end_date,
s._no_resize_start=s._no_resize_end=!0,i&&(s._no_resize_start=!1),a&&(s._no_resize_end=!1)}}function o(t){var i=e.getEvent(t.event_pid);return i&&i.isPrototypeOf(t)?(t=e._copy_event(t),delete t.event_length,delete t.event_pid,delete t.rec_pattern,delete t.rec_type):t=e._lame_clone(t),t}function l(t){if(!t._w_start_date||!t._w_end_date){var i=e.date,a=t._w_start_date=new Date(t.start_date),r=t._w_end_date=new Date(t.end_date);t[u]=+i.date_part(t.start_date),t._count||(t._count=1),t._sorder||(t._sorder=0);
var n=r-a;t.start_date=new Date(e._min_date),_(a,t.start_date),t.end_date=new Date(+t.start_date+n)}}function _(e,t){t.setMinutes(e.getMinutes()),t.setHours(e.getHours())}function h(t){var i=e.date.add(t,1,"day");return i=e.date.date_part(i)}if("days"!=i.render)return void t.apply(this,arguments);var c=i.name,u=i.y_property="timeline-week"+c;i.y_unit=[],i.render="bar",i.days=i.days||7,t.call(this,i),e.templates[c+"_scalex_class"]=function(){},e.templates[c+"_scaley_class"]=function(){},e.templates[c+"_scale_label"]=function(t,i,a){
return e.templates.day_date(i)},e.date[c+"_start"]=function(t){return t=e.date.week_start(t),t=e.date.add(t,i.x_step*i.x_start,i.x_unit)},e.date["add_"+c]=function(t,a){return e.date.add(t,a*i.days,"day")};var g=e._renderMatrix;e._renderMatrix=function(e,t){e&&a(),g.apply(this,arguments)};var f=e.checkCollision;e.checkCollision=function(t){if(t[u]){var t=r(t);delete t[u]}return f.apply(e,[t])},e.attachEvent("onBeforeDrag",function(t,i,a){var r=a.target||a.srcElement,n=e._getClassName(r);if("resize"==i)n.indexOf("dhx_event_resize_end")<0?e._w_line_drag_from_start=!0:e._w_line_drag_from_start=!1;else if("move"==i&&n.indexOf("no_drag_move")>=0)return!1;
return!0});var v=e["mouse_"+c];e["mouse_"+c]=function(t){var i;if(this._drag_event&&(i=this._drag_event._move_delta),void 0===i&&"move"==e._drag_mode){var a=e.matrix[this._mode],r={y:t.y};e._resolve_timeline_section(a,r);var n=t.x-a.dx,s=new Date(r.section);_(e._timeline_drag_date(a,n),s);var d=e._drag_event,o=this.getEvent(this._drag_id);d._move_delta=(o.start_date-s)/6e4,this.config.preserve_length&&t._ignores&&(d._move_delta=this._get_real_event_length(o.start_date,s,a),d._event_length=this._get_real_event_length(o.start_date,o.end_date,a));
}var t=v.apply(e,arguments);if(e._drag_mode&&"move"!=e._drag_mode){var l=null;l=e._drag_event&&e._drag_event["timeline-week"+c]?new Date(e._drag_event["timeline-week"+c]):new Date(t.section),t.y+=Math.round((l-e.date.date_part(new Date(e._min_date)))/(6e4*this.config.time_step)),"resize"==e._drag_mode&&(t.resize_from_start=e._w_line_drag_from_start)}else if(e._drag_event){var h=Math.floor(Math.abs(t.y/(1440/e.config.time_step)));h*=t.y>0?1:-1,t.y=t.y%(1440/e.config.time_step);var u=e.date.date_part(new Date(e._min_date));
u.valueOf()!=new Date(t.section).valueOf()&&(t.x=Math.floor((t.section-u)/864e5),t.x+=h)}return t},e.attachEvent("onEventCreated",function(t,i){return e._events[t]&&delete e._events[t][u],!0}),e.attachEvent("onBeforeEventChanged",function(t,i,a,r){return e._events[t.id]&&delete e._events[t.id][u],!0});var m=e.render_view_data;e.render_view_data=function(t,i){return this._mode==c&&t&&(t=s(t),e._restore_render_flags(t)),m.apply(e,[t,i])};var p=e.get_visible_events;e.get_visible_events=function(){if(this._mode==c){
this._clear_copied_events(),e._max_date=e.date.date_part(e.date.add(e._min_date,i.days,"day"));var t=p.apply(e,arguments);return t=s(t),e._register_copies_array(t),t}return p.apply(e,arguments)};var x=e.addEventNow;e.addEventNow=function(t){if(e.getState().mode==c)if(t[u]){var i=new Date(t[u]);n(i,t.start_date),n(i,t.end_date)}else{var a=new Date(t.start_date);t[u]=+e.date.date_part(a)}return x.apply(e,arguments)};var b=e._render_marked_timespan;e._render_marked_timespan=function(){return e._mode!=c?b.apply(this,arguments):void 0;
}}}()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler._external_drag={from_scheduler:null,to_scheduler:null,drag_data:null,drag_placeholder:null,delete_dnd_holder:function(){var e=this.drag_placeholder;e&&(e.parentNode&&e.parentNode.removeChild(e),document.body.className=document.body.className.replace(" dhx_no_select",""),this.drag_placeholder=null)},copy_event_node:function(e,t){for(var i=null,a=0;a<t._rendered.length;a++){var r=t._rendered[a];if(r.getAttribute("event_id")==e.id||r.getAttribute("event_id")==t._drag_id){i=r.cloneNode(!0),
i.style.position=i.style.top=i.style.left="";break}}return i||document.createElement("div")},create_dnd_holder:function(e,t){if(this.drag_placeholder)return this.drag_placeholder;var i=document.createElement("div"),a=t.templates.event_outside(e.start_date,e.end_date,e);return a?i.innerHTML=a:i.appendChild(this.copy_event_node(e,t)),i.className="dhx_drag_placeholder",i.style.position="absolute",this.drag_placeholder=i,document.body.appendChild(i),document.body.className+=" dhx_no_select",i},move_dnd_holder:function(e){
var t={x:e.clientX,y:e.clientY};if(this.create_dnd_holder(this.drag_data.ev,this.from_scheduler),this.drag_placeholder){var i=t.x,a=t.y,r=document.documentElement,n=document.body,s=this.drag_placeholder;s.style.left=10+i+(r&&r.scrollLeft||n&&n.scrollLeft||0)-(r.clientLeft||0)+"px",s.style.top=10+a+(r&&r.scrollTop||n&&n.scrollTop||0)-(r.clientTop||0)+"px"}},clear_scheduler_dnd:function(e){e._drag_id=e._drag_mode=e._drag_event=e._new_event=null},stop_drag:function(e){e&&this.clear_scheduler_dnd(e),
this.delete_dnd_holder(),this.drag_data=null},inject_into_scheduler:function(e,t,i){e._count=1,e._sorder=0,e.event_pid&&"0"!=e.event_pid&&(e.event_pid=null,e.rec_type=e.rec_pattern="",e.event_length=0),t._drag_event=e,t._events[e.id]=e,t._drag_id=e.id,t._drag_mode="move",i&&t._on_mouse_move(i)},start_dnd:function(e){if(e.config.drag_out){this.from_scheduler=e,this.to_scheduler=e;var t=this.drag_data={};t.ev=e._drag_event,t.orig_id=e._drag_event.id}},land_into_scheduler:function(e,t){if(!e.config.drag_in)return this.move_dnd_holder(t),
!1;var i=this.drag_data,a=e._lame_clone(i.ev);if(e!=this.from_scheduler){a.id=e.uid();var r=a.end_date-a.start_date;a.start_date=new Date(e.getState().min_date),a.end_date=new Date(a.start_date.valueOf()+r)}else a.id=this.drag_data.orig_id,a._dhx_changed=!0;return this.drag_data.target_id=a.id,e.callEvent("onBeforeEventDragIn",[a.id,a,t])?(this.to_scheduler=e,this.inject_into_scheduler(a,e,t),this.delete_dnd_holder(),e.updateView(),e.callEvent("onEventDragIn",[a.id,a,t]),!0):!1},drag_from_scheduler:function(e,t){
if(this.drag_data&&e._drag_id&&e.config.drag_out){if(this.to_scheduler==e&&(this.to_scheduler=null),!e.callEvent("onBeforeEventDragOut",[e._drag_id,e._drag_event,t]))return!1;this.create_dnd_holder(this.drag_data.ev,e);var i=e._drag_id;return this.drag_data.target_id=null,delete e._events[i],this.clear_scheduler_dnd(e),e.updateEvent(i),e.callEvent("onEventDragOut",[i,this.drag_data.ev,t]),!0}return!1},reset_event:function(e,t){this.inject_into_scheduler(e,t),this.stop_drag(t),t.updateView()},move_permanently:function(e,t,i,a){
a.callEvent("onEventAdded",[t.id,t]),this.inject_into_scheduler(e,i),this.stop_drag(i),e.event_pid&&"0"!=e.event_pid?(i.callEvent("onConfirmedBeforeEventDelete",[e.id]),i.updateEvent(t.event_pid)):i.deleteEvent(e.id),i.updateView(),a.updateView()}},dhtmlxEvent(window,"load",function(){dhtmlxEvent(document.body,"mousemove",function(e){var t=Scheduler._external_drag,i=t.target_scheduler;if(i)if(t.from_scheduler)if(i._drag_id);else{var a=t.to_scheduler;(!a||t.drag_from_scheduler(a,e))&&t.land_into_scheduler(i,e);
}else"move"==i.getState().drag_mode&&i.config.drag_out&&t.start_dnd(i);else t.from_scheduler&&(t.to_scheduler?t.drag_from_scheduler(t.to_scheduler,e):t.move_dnd_holder(e));t.target_scheduler=null}),dhtmlxEvent(document.body,"mouseup",function(e){var t=Scheduler._external_drag,i=t.from_scheduler,a=t.to_scheduler;if(i)if(a&&i==a)i.updateEvent(t.drag_data.target_id);else if(a&&i!==a){var r=t.drag_data.ev,n=a.getEvent(t.drag_data.target_id);i.callEvent("onEventDropOut",[r.id,r,a,e])?t.move_permanently(r,n,i,a):t.reset_event(r,i);
}else{var r=t.drag_data.ev;i.callEvent("onEventDropOut",[r.id,r,null,e])&&t.reset_event(r,i)}t.stop_drag(),t.current_scheduler=t.from_scheduler=t.to_scheduler=null})}),Scheduler.plugin(function(e){e.config.drag_in=!0,e.config.drag_out=!0,e.templates.event_outside=function(e,t,i){};var t=Scheduler._external_drag;e.attachEvent("onTemplatesReady",function(){dhtmlxEvent(e._obj,"mousemove",function(i){t.target_scheduler=e}),dhtmlxEvent(e._obj,"mouseup",function(i){t.target_scheduler=e})})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.form_blocks.combo={render:function(e){e.cached_options||(e.cached_options={});var t="";return t+="<div class='"+e.type+"' style='height:"+(e.height||20)+"px;' ></div>"},set_value:function(t,i,a,n){!function(){function i(){if(t._combo&&t._combo.DOMParent){var e=t._combo;e.unload?e.unload():e.destructor&&e.destructor(),e.DOMParent=e.DOMelem=null}}i();var a=e.attachEvent("onAfterLightbox",function(){i(),e.detachEvent(a)})}(),window.dhx_globalImgPath=n.image_path||"/",t._combo=new dhtmlXCombo(t,n.name,t.offsetWidth-8),
n.onchange&&t._combo.attachEvent("onChange",n.onchange),n.options_height&&t._combo.setOptionHeight(n.options_height);var r=t._combo;if(r.enableFilteringMode(n.filtering,n.script_path||null,!!n.cache),n.script_path){var s=a[n.map_to];s?n.cached_options[s]?(r.addOption(s,n.cached_options[s]),r.disable(1),r.selectOption(0),r.disable(0)):dhtmlxAjax.get(n.script_path+"?id="+s+"&uid="+e.uid(),function(e){var t=e.doXPath("//option")[0],i=t.childNodes[0].nodeValue;n.cached_options[s]=i,r.addOption(s,i),r.disable(1),
r.selectOption(0),r.disable(0)}):r.setComboValue("")}else{for(var d=[],o=0;o<n.options.length;o++){var l=n.options[o],_=[l.key,l.label,l.css];d.push(_)}if(r.addOption(d),a[n.map_to]){var h=r.getIndexByValue(a[n.map_to]);r.selectOption(h)}}},get_value:function(e,t,i){var a=e._combo.getSelectedValue();return i.script_path&&(i.cached_options[a]=e._combo.getSelectedText()),a},focus:function(e){}},e.form_blocks.radio={render:function(t){var i="";i+="<div class='dhx_cal_ltext dhx_cal_radio' style='height:"+t.height+"px;' >";
for(var a=0;a<t.options.length;a++){var n=e.uid();i+="<input id='"+n+"' type='radio' name='"+t.name+"' value='"+t.options[a].key+"'><label for='"+n+"'> "+t.options[a].label+"</label>",t.vertical&&(i+="<br/>")}return i+="</div>"},set_value:function(e,t,i,a){for(var n=e.getElementsByTagName("input"),r=0;r<n.length;r++){n[r].checked=!1;var s=i[a.map_to]||t;n[r].value==s&&(n[r].checked=!0)}},get_value:function(e,t,i){for(var a=e.getElementsByTagName("input"),n=0;n<a.length;n++)if(a[n].checked)return a[n].value;
},focus:function(e){}},e.form_blocks.checkbox={render:function(t){return e.config.wide_form?'<div class="dhx_cal_wide_checkbox" '+(t.height?"style='height:"+t.height+"px;'":"")+"></div>":""},set_value:function(t,i,a,n){t=document.getElementById(n.id);var r=e.uid(),s="undefined"!=typeof n.checked_value?i==n.checked_value:!!i;t.className+=" dhx_cal_checkbox";var d="<input id='"+r+"' type='checkbox' value='true' name='"+n.name+"'"+(s?"checked='true'":"")+"'>",o="<label for='"+r+"'>"+(e.locale.labels["section_"+n.name]||n.name)+"</label>";
if(e.config.wide_form?(t.innerHTML=o,t.nextSibling.innerHTML=d):t.innerHTML=d+o,n.handler){var l=t.getElementsByTagName("input")[0];l.onclick=n.handler}},get_value:function(e,t,i){e=document.getElementById(i.id);var a=e.getElementsByTagName("input")[0];return a||(a=e.nextSibling.getElementsByTagName("input")[0]),a.checked?i.checked_value||!0:i.unchecked_value||!1},focus:function(e){}}});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.expand=function(){if(e.callEvent("onBeforeExpand",[])){var t=e._obj;do t._position=t.style.position||"",t.style.position="static";while((t=t.parentNode)&&t.style);t=e._obj,t.style.position="absolute",t._width=t.style.width,t._height=t.style.height,t.style.width=t.style.height="100%",t.style.top=t.style.left="0px";var i=document.body;i.scrollTop=0,i=i.parentNode,i&&(i.scrollTop=0),document.body._overflow=document.body.style.overflow||"",document.body.style.overflow="hidden",
e._maximize(),e.callEvent("onExpand",[])}},e.collapse=function(){if(e.callEvent("onBeforeCollapse",[])){var t=e._obj;do t.style.position=t._position;while((t=t.parentNode)&&t.style);t=e._obj,t.style.width=t._width,t.style.height=t._height,document.body.style.overflow=document.body._overflow,e._maximize(),e.callEvent("onCollapse",[])}},e.attachEvent("onTemplatesReady",function(){var t=document.createElement("DIV");t.className="dhx_expand_icon",e.toggleIcon=t,e._obj.appendChild(t),t.onclick=function(){
e.expanded?e.collapse():e.expand()}}),e._maximize=function(){this.expanded=!this.expanded,this.toggleIcon.style.backgroundPosition="0 "+(this.expanded?"0":"18")+"px";for(var t=["left","top"],i=0;i<t.length;i++){var a=(e.xy["margin_"+t[i]],e["_prev_margin_"+t[i]]);e.xy["margin_"+t[i]]?(e["_prev_margin_"+t[i]]=e.xy["margin_"+t[i]],e.xy["margin_"+t[i]]=0):a&&(e.xy["margin_"+t[i]]=e["_prev_margin_"+t[i]],delete e["_prev_margin_"+t[i]])}e.callEvent("onSchedulerResize",[])&&(e.update_view(),e.callEvent("onAfterSchedulerResize"));
}});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){!function(){e._grid={sort_rules:{"int":function(e,t,i){return 1*i(e)<1*i(t)?1:-1},str:function(e,t,i){return i(e)<i(t)?1:-1},date:function(e,t,i){return new Date(i(e))<new Date(i(t))?1:-1}},_getObjName:function(e){return"grid_"+e},_getViewName:function(e){return e.replace(/^grid_/,"")}}}(),e.createGridView=function(t){function i(e){return!(void 0!==e&&(1*e!=e||0>e))}var a=t.name||"grid",r=e._grid._getObjName(a);e.config[a+"_start"]=t.from||new Date(0),e.config[a+"_end"]=t.to||new Date(9999,1,1),
e[r]=t,e[r].defPadding=8,e[r].columns=e[r].fields,e[r].unit=t.unit||"month",e[r].step=t.step||1,delete e[r].fields;for(var n=e[r].columns,s=0;s<n.length;s++)i(n[s].width)&&(n[s].initialWidth=n[s].width),i(n[s].paddingLeft)||delete n[s].paddingLeft,i(n[s].paddingRight)||delete n[s].paddingRight;e[r].select=void 0===t.select?!0:t.select,void 0===e.locale.labels[a+"_tab"]&&(e.locale.labels[a+"_tab"]=e[r].label||e.locale.labels.grid_tab),e[r]._selected_divs=[],e.date[a+"_start"]=function(i){return e.date[t.unit+"_start"]?e.date[t.unit+"_start"](i):i;
},e.date["add_"+a]=function(t,i){return e.date.add(t,i*e[r].step,e[r].unit)},e.templates[a+"_date"]=function(t,i){return e.templates.day_date(t)+" - "+e.templates.day_date(i)},e.templates[a+"_full_date"]=function(t,i,r){return e.isOneDayEvent(r)?this[a+"_single_date"](t):e.templates.day_date(t)+" &ndash; "+e.templates.day_date(i)},e.templates[a+"_single_date"]=function(t){return e.templates.day_date(t)+" "+this.event_date(t)},e.templates[a+"_field"]=function(e,t){return t[e]},e.attachEvent("onTemplatesReady",function(){
e.attachEvent("onDblClick",function(t,i){return this._mode==a?(e._click.buttons.details(t),!1):!0}),e.attachEvent("onClick",function(t,i){return this._mode==a&&e[r].select?(e._grid.unselectEvent("",a),e._grid.selectEvent(t,a,i),!1):!0});var t=e.render_data;e.render_data=function(i){return this._mode!=a?t.apply(this,arguments):void e._grid._fill_grid_tab(r)};var i=e.render_view_data;e.render_view_data=function(){var t=e._els.dhx_cal_data[0].lastChild;return this._mode==a&&t&&(e._grid._gridScrollTop=t.scrollTop),
i.apply(this,arguments)}}),e[a+"_view"]=function(t){if(e._grid._sort_marker=null,delete e._gridView,e._grid._gridScrollTop=0,e._rendered=[],e[r]._selected_divs=[],t){var i=null,n=null,s=e[r];s.paging?(i=e.date[a+"_start"](new Date(e._date)),n=e.date["add_"+a](i,1)):(i=e.config[a+"_start"],n=e.config[a+"_end"]),e._min_date=i,e._max_date=n,e._grid.set_full_view(r);var d="";+i>+new Date(0)&&+n<+new Date(9999,1,1)&&(d=e.templates[a+"_date"](i,n)),e._els.dhx_cal_date[0].innerHTML=d,e._gridView=r}}},e.dblclick_dhx_grid_area=function(){
!this.config.readonly&&this.config.dblclick_create&&this.addEventNow()},e._click.dhx_cal_header&&(e._old_header_click=e._click.dhx_cal_header),e._click.dhx_cal_header=function(t){if(e._gridView){var i=t||window.event,a=e._grid._get_target_column(i,e._gridView);e._grid._toggle_sort_state(e._gridView,a.id),e.clear_view(),e._grid._fill_grid_tab(e._gridView)}else if(e._old_header_click)return e._old_header_click.apply(this,arguments)},e._grid.selectEvent=function(t,i,a){if(e.callEvent("onBeforeRowSelect",[t,a])){
var r=e._grid._getObjName(i);e.for_rendered(t,function(t){t.className+=" dhx_grid_event_selected",e[r]._selected_divs.push(t)}),e._select_id=t}},e._grid._unselectDiv=function(e){e.className=e.className.replace(/ dhx_grid_event_selected/,"")},e._grid.unselectEvent=function(t,i){var a=e._grid._getObjName(i);if(a&&e[a]._selected_divs)if(t){for(var r=0;r<e[a]._selected_divs.length;r++)if(e[a]._selected_divs[r].getAttribute("event_id")==t){e._grid._unselectDiv(e[a]._selected_divs[r]),e[a]._selected_divs.slice(r,1);
break}}else{for(var r=0;r<e[a]._selected_divs.length;r++)e._grid._unselectDiv(e[a]._selected_divs[r]);e[a]._selected_divs=[]}},e._grid._get_target_column=function(t,i){var a=t.originalTarget||t.srcElement,r=e._getClassName(a);"dhx_grid_view_sort"==r&&(a=a.parentNode);for(var n=0,s=0;s<a.parentNode.childNodes.length;s++)if(a.parentNode.childNodes[s]==a){n=s;break}return e[i].columns[n]},e._grid._get_sort_state=function(t){var i=e[t];return i.sort},e._grid._toggle_sort_state=function(t,i){var a=this._get_sort_state(t),r=e[t];
a&&a.column==i?a.direction="asc"==a.direction?"desc":"asc":r.sort={column:i,direction:"desc"}},e._grid._get_sort_value_for_column=function(e){var t=null;if(e.template){var i=e.template;t=function(e){return i(e.start_date,e.end_date,e)}}else{var a=e.id;"date"==a&&(a="start_date"),t=function(e){return e[a]}}return t},e._grid.draw_sort_marker=function(t,i){if(e._grid._sort_marker&&(e._grid._sort_marker.className=e._grid._sort_marker.className.replace(/( )?dhx_grid_sort_(asc|desc)/,""),e._grid._sort_marker.removeChild(e._grid._sort_marker.lastChild)),
i){var a=e._grid._get_column_node(t,i.column);a.className+=" dhx_grid_sort_"+i.direction,e._grid._sort_marker=a;var r="<div class='dhx_grid_view_sort' style='left:"+(+a.style.width.replace("px","")-15+a.offsetLeft)+"px'>&nbsp;</div>";a.innerHTML+=r}},e._grid.sort_grid=function(t){t=t||{direction:"desc",value:function(e){return e.start_date},rule:e._grid.sort_rules.date};var i=e.get_visible_events();return i.sort(function(e,i){return t.rule(e,i,t.value)}),"asc"==t.direction&&(i=i.reverse()),i},e._grid.set_full_view=function(t){
if(t){var i=(e.locale.labels,e._grid._print_grid_header(t));e._els.dhx_cal_header[0].innerHTML=i,e._table_view=!0,e.set_sizes()}},e._grid._calcPadding=function(t,i){return(void 0!==t.paddingLeft?1*t.paddingLeft:e[i].defPadding)+(void 0!==t.paddingRight?1*t.paddingRight:e[i].defPadding)},e._grid._getStyles=function(e,t){for(var i=[],a="",r=0;t[r];r++)switch(a=t[r]+":",t[r]){case"text-align":e.align&&i.push(a+e.align);break;case"vertical-align":e.valign&&i.push(a+e.valign);break;case"padding-left":
void 0!==e.paddingLeft&&i.push(a+(e.paddingLeft||"0")+"px");break;case"padding-right":void 0!==e.paddingRight&&i.push(a+(e.paddingRight||"0")+"px")}return i},e._grid._get_column_node=function(t,i){for(var a=-1,r=0;r<t.length;r++)if(t[r].id==i){a=r;break}return 0>a?null:e._obj.querySelectorAll(".dhx_grid_line > div")[a]},e._grid._get_sort_rule=function(t){var i,a=e[t],r=this._get_sort_state(t);if(r){for(var n,s=0;s<a.columns.length;s++)if(a.columns[s].id==r.column){n=a.columns[s];break}if(n){var d=e._grid._get_sort_value_for_column(n),o=n.sort;
"function"!=typeof o&&(o=e._grid.sort_rules[o]||e._grid.sort_rules.str),i={direction:r.direction,rule:o,value:d}}}return i},e._grid._fill_grid_tab=function(t){var i=e[t],a=this._get_sort_state(t),r=this._get_sort_rule(t);r&&e._grid.draw_sort_marker(i.columns,a);for(var n=(e._date,e._grid.sort_grid(r)),s=e[t].columns,d="<div>",o=-2,l=0;l<s.length;l++){var _=e._grid._calcPadding(s[l],t);o+=s[l].width+_,l<s.length-1&&(d+="<div class='dhx_grid_v_border' style='left:"+o+"px'></div>")}d+="</div>";var h=e._waiAria.gridAttrString();
d+="<div class='dhx_grid_area'><table "+h+">";for(var l=0;l<n.length;l++)d+=e._grid._print_event_row(n[l],t);d+="</table></div>",e._els.dhx_cal_data[0].innerHTML=d,e._els.dhx_cal_data[0].lastChild.scrollTop=e._grid._gridScrollTop||0;var c=e._els.dhx_cal_data[0].getElementsByTagName("tr");e._rendered=[];for(var l=0;l<c.length;l++)e._rendered[l]=c[l]},e._grid._getCellContent=function(t,i){var a,r=e.getState().mode;return a=i.template?i.template(t.start_date,t.end_date,t):"date"==i.id?e.templates[r+"_full_date"](t.start_date,t.end_date,t):"start_date"==i.id||"end_date"==i.id?e.templates[r+"_single_date"](t[i.id]):e.templates[r+"_field"](i.id,t);
},e._grid._print_event_row=function(t,i){var a=[];t.color&&a.push("background:"+t.color),t.textColor&&a.push("color:"+t.textColor),t._text_style&&a.push(t._text_style),e[i].rowHeight&&a.push("height:"+e[i].rowHeight+"px");var r="";a.length&&(r="style='"+a.join(";")+"'");for(var n=e[i].columns,s=e.templates.event_class(t.start_date,t.end_date,t),d=e._waiAria.gridRowAttrString(t),o="<tr "+d+" class='dhx_grid_event"+(s?" "+s:"")+"' event_id='"+t.id+"' "+r+">",l=(e._grid._getViewName(i),["text-align","vertical-align","padding-left","padding-right"]),_=0;_<n.length;_++){
var h=e._grid._getCellContent(t,n[_]),c=e._waiAria.gridCellAttrString(t,n[_],h),u=e._grid._getStyles(n[_],l),g=n[_].css?' class="'+n[_].css+'"':"";o+="<td "+c+" style='width:"+n[_].width+"px;"+u.join(";")+"' "+g+">"+h+"</td>"}return o+="<td class='dhx_grid_dummy'></td></tr>"},e._grid._print_grid_header=function(t){for(var i="<div class='dhx_grid_line'>",a=e[t].columns,r=[],n=a.length,s=e._obj.clientWidth-2*a.length-20,d=0;d<a.length;d++){var o=1*a[d].initialWidth;isNaN(o)||""===a[d].initialWidth||null===a[d].initialWidth||"boolean"==typeof a[d].initialWidth?r[d]=null:(n--,
s-=o,r[d]=o)}for(var l=Math.floor(s/n),_=["text-align","padding-left","padding-right"],h=0;h<a.length;h++){var c=r[h]?r[h]:l;a[h].width=c-e._grid._calcPadding(a[h],t);var u=e._grid._getStyles(a[h],_);i+="<div style='width:"+(a[h].width-1)+"px;"+u.join(";")+"'>"+(void 0===a[h].label?a[h].id:a[h].label)+"</div>"}return i+="</div>"}});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.attachEvent("onTemplatesReady",function(){for(var t=document.body.getElementsByTagName("DIV"),i=0;i<t.length;i++){var a=t[i].className||"";if(a=a.split(":"),2==a.length&&"template"==a[0]){var r='return "'+(t[i].innerHTML||"").replace(/\"/g,'\\"').replace(/[\n\r]+/g,"")+'";';r=unescape(r).replace(/\{event\.([a-z]+)\}/g,function(e,t){return'"+ev.'+t+'+"'}),e.templates[a[1]]=Function("start","end","ev",r),t[i].style.display="none"}}})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

!function(){function e(e){function t(t){var a={minicalButton:e.$keyboardNavigation.MinicalButton,minicalDate:e.$keyboardNavigation.MinicalCell,scheduler:e.$keyboardNavigation.SchedulerNode,dataArea:e.$keyboardNavigation.DataArea,timeSlot:e.$keyboardNavigation.TimeSlot,event:e.$keyboardNavigation.Event},i={};for(var n in a)i[n.toLowerCase()]=a[n];return t=(t+"").toLowerCase(),i[t]||a.scheduler}e.config.key_nav=!0,e.config.key_nav_step=30,e.addShortcut=function(e,a,i){var n=t(i);n&&n.prototype.bind(e,a);
},e.getShortcutHandler=function(a,i){var n=t(i);if(n){var r=e.$keyboardNavigation.shortcuts.parse(a);if(r.length)return n.prototype.findHandler(r[0])}},e.removeShortcut=function(e,a){var i=t(a);i&&i.prototype.unbind(e)},e.focus=function(){if(e.config.key_nav){var t=e.$keyboardNavigation.dispatcher;t.enable();var a=t.getActiveNode();!a||a instanceof e.$keyboardNavigation.MinicalButton||a instanceof e.$keyboardNavigation.MinicalCell?t.setDefaultNode():t.focusNode(t.getActiveNode())}},e.$keyboardNavigation={},
e._compose=function(){for(var e=Array.prototype.slice.call(arguments,0),t={},a=0;a<e.length;a++){var i=e[a];"function"==typeof i&&(i=new i);for(var n in i)t[n]=i[n]}return t},e.$keyboardNavigation.shortcuts={createCommand:function(){return{modifiers:{shift:!1,alt:!1,ctrl:!1,meta:!1},keyCode:null}},parse:function(e){for(var t=[],a=this.getExpressions(this.trim(e)),i=0;i<a.length;i++){for(var n=this.getWords(a[i]),r=this.createCommand(),s=0;s<n.length;s++)this.commandKeys[n[s]]?r.modifiers[n[s]]=!0:this.specialKeys[n[s]]?r.keyCode=this.specialKeys[n[s]]:r.keyCode=n[s].charCodeAt(0);
t.push(r)}return t},getCommandFromEvent:function(e){var t=this.createCommand();t.modifiers.shift=!!e.shiftKey,t.modifiers.alt=!!e.altKey,t.modifiers.ctrl=!!e.ctrlKey,t.modifiers.meta=!!e.metaKey,t.keyCode=e.which||e.keyCode;var a=String.fromCharCode(t.keyCode);return a&&(t.keyCode=a.toLowerCase().charCodeAt(0)),t},getHashFromEvent:function(e){return this.getHash(this.getCommandFromEvent(e))},getHash:function(e){var t=[];for(var a in e.modifiers)e.modifiers[a]&&t.push(a);return t.push(e.keyCode),t.join(this.junctionChar);
},getExpressions:function(e){return e.split(this.junctionChar)},getWords:function(e){return e.split(this.combinationChar)},trim:function(e){return e.replace(/\s/g,"")},junctionChar:",",combinationChar:"+",commandKeys:{shift:16,alt:18,ctrl:17,meta:!0},specialKeys:{backspace:8,tab:9,enter:13,esc:27,space:32,up:38,down:40,left:37,right:39,home:36,end:35,pageup:33,pagedown:34,"delete":46,insert:45,plus:107,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123}},e.$keyboardNavigation.EventHandler={
_handlers:null,findHandler:function(t){this._handlers||(this._handlers={});var a=e.$keyboardNavigation.shortcuts,i=a.getHash(t);return this._handlers[i]},doAction:function(e,t){var a=this.findHandler(e);a&&(a.call(this,t),t.preventDefault?t.preventDefault():t.returnValue=!1)},bind:function(t,a){this._handlers||(this._handlers={});for(var i=e.$keyboardNavigation.shortcuts,n=i.parse(t),r=0;r<n.length;r++)this._handlers[i.getHash(n[r])]=a},unbind:function(t){for(var a=e.$keyboardNavigation.shortcuts,i=a.parse(t),n=0;n<i.length;n++)this._handlers[a.getHash(i[n])]&&delete this._handlers[a.getHash(i[n])];
},bindAll:function(e){for(var t in e)this.bind(t,e[t])},initKeys:function(){this._handlers||(this._handlers={}),this.keys&&this.bindAll(this.keys)}},function(){e.$keyboardNavigation.getFocusableNodes=e._getFocusableNodes,e.$keyboardNavigation.trapFocus=function(t,a){if(9!=a.keyCode)return!1;for(var i=e.$keyboardNavigation.getFocusableNodes(t),n=document.activeElement,r=-1,s=0;s<i.length;s++)if(i[s]==n){r=s;break}var d,o;if(a.shiftKey){if(d=0>=r?i[i.length-1]:r-1,o=i[d])return o.focus(),a.preventDefault(),
!0}else if(d=r>=i.length-1?0:r+1,o=i[d])return o.focus(),a.preventDefault(),!0;return!1}}(),e.$keyboardNavigation.marker={clear:function(){for(var t=e.$container.querySelectorAll(".dhx_focus_slot"),a=0;a<t.length;a++)t[a].parentNode.removeChild(t[a])},createElement:function(){var e=document.createElement("DIV");return e.setAttribute("tabindex",-1),e.className="dhx_focus_slot",e},renderMultiple:function(t,a,i){for(var n=[],r=new Date(t),s=new Date(Math.min(a.valueOf(),e.date.add(e.date.day_start(new Date(t)),1,"day").valueOf()));r.valueOf()<a.valueOf();)n=n.concat(i.call(this,r,new Date(Math.min(s.valueOf(),a.valueOf())))),
r=e.date.day_start(e.date.add(r,1,"day")),s=e.date.day_start(e.date.add(r,1,"day")),s=new Date(Math.min(s.valueOf(),a.valueOf()));return n},render:function(t,a,i){this.clear();var n=[],r=e.$keyboardNavigation.TimeSlot.prototype._modes,s=e.$keyboardNavigation.TimeSlot.prototype._getMode();switch(s){case r.units:n=this.renderVerticalMarker(t,a,i);break;case r.timeline:n=this.renderTimelineMarker(t,a,i);break;case r.year:n=n.concat(this.renderMultiple(t,a,this.renderYearMarker));break;case r.month:n=this.renderMonthMarker(t,a);
break;case r.weekAgenda:n=n.concat(this.renderMultiple(t,a,this.renderWeekAgendaMarker));break;case r.list:n=this.renderAgendaMarker(t,a);break;case r.dayColumns:n=n.concat(this.renderMultiple(t,a,this.renderVerticalMarker))}this.addWaiAriaLabel(n,t,a,i),this.addDataAttributes(n,t,a,i);for(var d=n.length-1;d>=0;d--)if(n[d].offsetWidth)return n[d];return null},addDataAttributes:function(t,a,i,n){for(var r=e.date.date_to_str(e.config.api_date),s=r(a),d=r(i),o=0;o<t.length;o++)t[o].setAttribute("data-start-date",s),
t[o].setAttribute("data-end-date",d),n&&t[o].setAttribute("data-section",n)},addWaiAriaLabel:function(t,a,i,n){var r="",s=e.getState(),d=s.mode,o=!1;r+=e.templates.day_date(a),e.date.day_start(new Date(a)).valueOf()!=a.valueOf()&&(r+=" "+e.templates.hour_scale(a),o=!0),e.date.day_start(new Date(a)).valueOf()!=e.date.day_start(new Date(i)).valueOf()&&(r+=" - "+e.templates.day_date(i),(o||e.date.day_start(new Date(i)).valueOf()!=i.valueOf())&&(r+=" "+e.templates.hour_scale(i))),n&&(e.matrix&&e.matrix[d]?r+=", "+e.templates[d+"_scale_label"](n.key,n.label,n):e._props&&e._props[d]&&(r+=", "+e.templates[d+"_scale_text"](n.key,n.label,n)));
for(var l=0;l<t.length;l++)e._waiAria.setAttributes(t[l],{"aria-label":r,"aria-live":"polite"})},renderWeekAgendaMarker:function(t,a){for(var i=e.$container.querySelectorAll(".dhx_wa_day_cont .dhx_wa_scale_bar"),n=e.date.week_start(new Date(e.getState().min_date)),r=-1,s=e.date.day_start(new Date(t)),d=0;d<i.length&&(r++,e.date.day_start(new Date(n)).valueOf()!=s.valueOf());d++)n=e.date.add(n,1,"day");return-1!=r?this._wrapDiv(i[r]):[]},_wrapDiv:function(e){var t=this.createElement();return t.style.top=e.offsetTop+"px",
t.style.left=e.offsetLeft+"px",t.style.width=e.offsetWidth+"px",t.style.height=e.offsetHeight+"px",e.appendChild(t),[t]},renderYearMarker:function(t,a){var i=e._get_year_cell(t);i.style.position="relative";var n=this.createElement();return n.style.top="0px",n.style.left="0px",n.style.width="100%",n.style.height="100%",i.appendChild(n),[n]},renderAgendaMarker:function(t,a){var i=this.createElement();return i.style.height="1px",i.style.width="100%",i.style.opacity=1,i.style.top="0px",i.style.left="0px",
e.$container.querySelector(".dhx_cal_data").appendChild(i),[i]},renderTimelineMarker:function(t,a,i){var n=e._lame_copy({},e.matrix[e._mode]),r=n._scales;n.round_position=!1;var s=[],d=t?new Date(t):e._min_date,o=a?new Date(a):e._max_date;if(d.valueOf()<e._min_date.valueOf()&&(d=new Date(e._min_date)),o.valueOf()>e._max_date.valueOf()&&(o=new Date(e._max_date)),!n._trace_x)return s;for(var l=0;l<n._trace_x.length&&!e._is_column_visible(n._trace_x[l]);l++);if(l==n._trace_x.length)return s;var _=r[i];
if(!(a>d&&o>t))return s;var c=this.createElement(),h=e._timeline_getX({start_date:t},!1,n)-1,u=e._timeline_getX({start_date:a},!1,n)-1,g=n._section_height[i]-1||n.dy-1,v=0;e._isRender("cell")&&(v=_.offsetTop,h+=n.dx,u+=n.dx,_=e.$container.querySelector(".dhx_cal_data"));var f=Math.max(1,u-h-1);return c.style.cssText="height: "+g+"px; left: "+h+"px; width: "+f+"px; top: "+v+"px;",_.insertBefore(c,_.firstChild),s.push(c),s},renderMonthCell:function(t){for(var a=e.$container.querySelectorAll(".dhx_month_head"),i=[],n=0;n<a.length;n++)i.push(a[n].parentNode);
for(var r=e.date.week_start(new Date(e.getState().min_date)),s=-1,d=0,o=-1,l=r,_=e.date.day_start(new Date(t)),n=0;n<i.length&&(s++,6==o?(d++,o=0):o++,e.date.day_start(new Date(l)).valueOf()!=_.valueOf());n++)l=e.date.add(l,1,"day");if(-1==s)return[];var c=e._colsS[o],h=e._colsS.heights[d],u=this.createElement();u.style.top=h+"px",u.style.left=c+"px",u.style.width=e._cols[o]+"px",u.style.height=(e._colsS.heights[d+1]-h||e._colsS.height)+"px";var g=e.$container.querySelector(".dhx_cal_data"),v=g.querySelector("table");
return v.nextSibling?g.insertBefore(u,v.nextSibling):g.appendChild(u),u},renderMonthMarker:function(t,a){for(var i=[],n=t;n.valueOf()<a.valueOf();)i.push(this.renderMonthCell(n)),n=e.date.add(n,1,"day");return i},renderVerticalMarker:function(t,a,i){var n=e.locate_holder_day(t),r=[],s=null,d=e.config;if(e._ignores[n])return r;if(e._props&&e._props[e._mode]&&i){var o=e._props[e._mode];n=o.order[i];var l=o.order[i];o.days>1?n=e.locate_holder_day(t)+l:(n=l,o.size&&n>o.position+o.size&&(n=0))}if(s=e.locate_holder(n),
!s||s.querySelector(".dhx_scale_hour"))return document.createElement("div");var _=Math.max(60*t.getHours()+t.getMinutes(),60*d.first_hour),c=Math.min(60*a.getHours()+a.getMinutes(),60*d.last_hour);if(!c&&e.date.day_start(new Date(a)).valueOf()>e.date.day_start(new Date(t)).valueOf()&&(c=60*d.last_hour),_>=c)return[];var h=this.createElement(),u=e.config.hour_size_px*d.last_hour+1,g=36e5;return h.style.top=Math.round((60*_*1e3-e.config.first_hour*g)*e.config.hour_size_px/g)%u+"px",h.style.lineHeight=h.style.height=Math.max(Math.round(60*(c-_)*1e3*e.config.hour_size_px/g)%u,1)+"px",
h.style.width="100%",s.appendChild(h),r.push(h),r[0]}},e.$keyboardNavigation.SchedulerNode=function(){},e.$keyboardNavigation.SchedulerNode.prototype=e._compose(e.$keyboardNavigation.EventHandler,{getDefaultNode:function(){var t=new e.$keyboardNavigation.TimeSlot;return t.isValid()||(t=t.fallback()),t},_modes:{month:"month",year:"year",dayColumns:"dayColumns",timeline:"timeline",units:"units",weekAgenda:"weekAgenda",list:"list"},getMode:function(){var t=e.getState(),a=t.mode;return e.matrix&&e.matrix[a]?this._modes.timeline:e._props&&e._props[a]?this._modes.units:"month"==a?this._modes.month:"year"==a?this._modes.year:"week_agenda"==a?this._modes.weekAgenda:"map"==a||"agenda"==a||e._grid&&e["grid_"+a]?this._modes.list:this._modes.dayColumns;
},focus:function(){e.focus()},blur:function(){},disable:function(){e.$container.setAttribute("tabindex","0")},enable:function(){e.$container&&e.$container.removeAttribute("tabindex")},isEnabled:function(){return e.$container.hasAttribute("tabindex")},_compareEvents:function(e,t){return e.start_date.valueOf()==t.start_date.valueOf()?e.id>t.id?1:-1:e.start_date.valueOf()>t.start_date.valueOf()?1:-1},_pickEvent:function(t,a,i,n){var r=e.getState();t=new Date(Math.max(r.min_date.valueOf(),t.valueOf())),
a=new Date(Math.min(r.max_date.valueOf(),a.valueOf()));var s=e.getEvents(t,a);s.sort(this._compareEvents),n&&(s=s.reverse());for(var d=!!i,o=0;o<s.length&&d;o++)s[o].id==i&&(d=!1),s.splice(o,1),o--;return s[0]},nextEventHandler:function(t){var a=e.$keyboardNavigation.dispatcher.activeNode,i=t||a&&a.eventId,n=null;if(i&&e.getEvent(i)){var r=e.getEvent(i);n=e.$keyboardNavigation.SchedulerNode.prototype._pickEvent(r.start_date,e.date.add(r.start_date,1,"year"),r.id,!1)}if(!n&&!t){var s=e.getState();n=e.$keyboardNavigation.SchedulerNode.prototype._pickEvent(s.min_date,e.date.add(s.min_date,1,"year"),null,!1);
}if(n){var d=new e.$keyboardNavigation.Event(n.id);d.isValid()?(a&&a.blur(),e.$keyboardNavigation.dispatcher.setActiveNode(d)):this.nextEventHandler(n.id)}},prevEventHandler:function(t){var a=e.$keyboardNavigation.dispatcher.activeNode,i=t||a&&a.eventId,n=null;if(i&&e.getEvent(i)){var r=e.getEvent(i);n=e.$keyboardNavigation.SchedulerNode.prototype._pickEvent(e.date.add(r.end_date,-1,"year"),r.end_date,r.id,!0)}if(!n&&!t){var s=e.getState();n=e.$keyboardNavigation.SchedulerNode.prototype._pickEvent(e.date.add(s.max_date,-1,"year"),s.max_date,null,!0);
}if(n){var d=new e.$keyboardNavigation.Event(n.id);d.isValid()?(a&&a.blur(),e.$keyboardNavigation.dispatcher.setActiveNode(d)):this.prevEventHandler(n.id)}},keys:{"alt+1, alt+2, alt+3, alt+4, alt+5, alt+6, alt+7, alt+8, alt+9":function(t){var a=e.$keyboardNavigation.HeaderCell.prototype.getNodes(".dhx_cal_navline .dhx_cal_tab"),i=t.key;void 0===i&&(i=t.keyCode-48),a[1*i-1]&&a[1*i-1].click()},"ctrl+left,meta+left":function(t){e._click.dhx_cal_prev_button()},"ctrl+right,meta+right":function(t){e._click.dhx_cal_next_button();
},"ctrl+up,meta+up":function(t){var a=e.$container.querySelector(".dhx_cal_data");a.scrollTop-=20},"ctrl+down,meta+down":function(t){var a=e.$container.querySelector(".dhx_cal_data");a.scrollTop+=20},e:function(){this.nextEventHandler()},home:function(){e.setCurrentView(new Date)},"shift+e":function(){this.prevEventHandler()},"ctrl+enter,meta+enter":function(){e.addEventNow({start_date:new Date(e.getState().date)})},"ctrl+c,meta+c":function(t){e._key_nav_copy_paste(t)},"ctrl+v,meta+v":function(t){
e._key_nav_copy_paste(t)},"ctrl+x,meta+x":function(t){e._key_nav_copy_paste(t)}}}),e.$keyboardNavigation.SchedulerNode.prototype.bindAll(e.$keyboardNavigation.SchedulerNode.prototype.keys),e.$keyboardNavigation.KeyNavNode=function(){},e.$keyboardNavigation.KeyNavNode.prototype=e._compose(e.$keyboardNavigation.EventHandler,{isValid:function(){return!0},fallback:function(){return null},moveTo:function(t){e.$keyboardNavigation.dispatcher.setActiveNode(t)},compareTo:function(e){if(!e)return!1;for(var t in this){
if(!!this[t]!=!!e[t])return!1;var a=!(!this[t]||!this[t].toString),i=!(!e[t]||!e[t].toString);if(i!=a)return!1;if(i&&a){if(e[t].toString()!=this[t].toString())return!1}else if(e[t]!=this[t])return!1}return!0},getNode:function(){},focus:function(){var e=this.getNode();e&&(e.setAttribute("tabindex","-1"),e.focus&&e.focus())},blur:function(){var e=this.getNode();e&&e.setAttribute("tabindex","-1")}}),e.$keyboardNavigation.HeaderCell=function(e){this.index=e||0},e.$keyboardNavigation.HeaderCell.prototype=e._compose(e.$keyboardNavigation.KeyNavNode,{
getNode:function(e){e=e||this.index||0;var t=this.getNodes();return t[e]?t[e]:void 0},getNodes:function(t){t=t||[".dhx_cal_navline .dhx_cal_prev_button",".dhx_cal_navline .dhx_cal_next_button",".dhx_cal_navline .dhx_cal_today_button",".dhx_cal_navline .dhx_cal_tab"].join(", ");var a=Array.prototype.slice.call(e.$container.querySelectorAll(t));return a.sort(function(e,t){return e.offsetLeft-t.offsetLeft}),a},_handlers:null,isValid:function(){return!!this.getNode(this.index)},fallback:function(){var t=this.getNode(0);
return t||(t=new e.$keyboardNavigation.TimeSlot),t},keys:{left:function(){var t=this.index-1;0>t&&(t=this.getNodes().length-1),this.moveTo(new e.$keyboardNavigation.HeaderCell(t))},right:function(){var t=this.index+1;t>=this.getNodes().length&&(t=0),this.moveTo(new e.$keyboardNavigation.HeaderCell(t))},down:function(){this.moveTo(new e.$keyboardNavigation.TimeSlot)},enter:function(){var e=this.getNode();e&&e.click()}}}),e.$keyboardNavigation.HeaderCell.prototype.bindAll(e.$keyboardNavigation.HeaderCell.prototype.keys),
e.$keyboardNavigation.Event=function(t){if(this.eventId=null,e.getEvent(t)){var a=e.getEvent(t);this.start=new Date(a.start_date),this.end=new Date(a.end_date),this.section=this._getSection(a),this.eventId=t}},e.$keyboardNavigation.Event.prototype=e._compose(e.$keyboardNavigation.KeyNavNode,{_getNodes:function(){return Array.prototype.slice.call(e.$container.querySelectorAll("[event_id]"))},_modes:e.$keyboardNavigation.SchedulerNode.prototype._modes,getMode:e.$keyboardNavigation.SchedulerNode.prototype.getMode,
_handlers:null,isValid:function(){return!(!e.getEvent(this.eventId)||!this.getNode())},fallback:function(){var t=this._getNodes()[0],a=null;if(t&&e._locate_event(t)){var i=e._locate_event(t);a=new e.$keyboardNavigation.Event(i)}else a=new e.$keyboardNavigation.TimeSlot;return a},getNode:function(){var t="[event_id='"+this.eventId+"']",a=e.$keyboardNavigation.dispatcher.getInlineEditor(this.eventId);return a?a:e.$container.querySelector(t)},focus:function(){var t=e.getEvent(this.eventId),a=e.getState();
(t.start_date.valueOf()>a.max_date.valueOf()||t.end_date.valueOf()<=a.min_date.valueOf())&&e.setCurrentView(t.start_date),e.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this)},blur:function(){e.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this)},_getSection:function(t){var a=null,i=e.getState().mode;if(e.matrix&&e.matrix[i]){var n=e.matrix[e.getState().mode];a=t[n.y_property]}else if(e._props&&e._props[i]){var r=e._props[i];a=t[r.map_to]}return a},_moveToSlot:function(t){var a=e.getEvent(this.eventId);
if(a){var i=this._getSection(a),n=new e.$keyboardNavigation.TimeSlot(a.start_date,null,i);this.moveTo(n.nextSlot(n,t))}else this.moveTo(new e.$keyboardNavigation.TimeSlot)},keys:{left:function(){this._moveToSlot("left")},right:function(){this._moveToSlot("right")},down:function(){this.getMode()==this._modes.list?e.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler():this._moveToSlot("down")},space:function(){var t=this.getNode();t&&t.click?t.click():this.moveTo(new e.$keyboardNavigation.TimeSlot);
},up:function(){this.getMode()==this._modes.list?e.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler():this._moveToSlot("up")},"delete":function(){e.getEvent(this.eventId)?e._click.buttons["delete"](this.eventId):this.moveTo(new e.$keyboardNavigation.TimeSlot)},enter:function(){e.getEvent(this.eventId)?e.showLightbox(this.eventId):this.moveTo(new e.$keyboardNavigation.TimeSlot)}}}),e.$keyboardNavigation.Event.prototype.bindAll(e.$keyboardNavigation.Event.prototype.keys),e.$keyboardNavigation.TimeSlot=function(t,a,i,n){
var r=e.getState(),s=e.matrix&&e.matrix[r.mode];t||(t=this.getDefaultDate()),a||(a=s?e.date.add(t,s.x_step,s.x_unit):e.date.add(t,e.config.key_nav_step,"minute")),this.section=i||this._getDefaultSection(),this.start_date=new Date(t),this.end_date=new Date(a),this.movingDate=n||null},e.$keyboardNavigation.TimeSlot.prototype=e._compose(e.$keyboardNavigation.KeyNavNode,{_handlers:null,getDefaultDate:function(){var t,a=e.getState(),i=e.matrix&&e.matrix[a.mode];if(i)t=e.date[i.name+"_start"](new Date(a.date)),
t=this.findVisibleColumn(t);else if(t=new Date(e.getState().min_date),t=this.findVisibleColumn(t),t.setHours(e.config.first_hour),!e._table_view){var n=e.$container.querySelector(".dhx_cal_data");n.scrollTop&&t.setHours(e.config.first_hour+Math.ceil(n.scrollTop/e.config.hour_size_px))}return t},clone:function(t){return new e.$keyboardNavigation.TimeSlot(t.start_date,t.end_date,t.section,t.movingDate)},_getMultisectionView:function(){var t,a=e.getState();return e._props&&e._props[a.mode]?t=e._props[a.mode]:e.matrix&&e.matrix[a.mode]&&(t=e.matrix[a.mode]),
t},_getDefaultSection:function(){var e=null,t=this._getMultisectionView();return t&&!e&&(e=this._getNextSection()),e},_getNextSection:function(e,t){var a=this._getMultisectionView(),i=a.order[e],n=i;n=void 0!==i?i+t:a.size&&a.position?a.position:0,n=0>n?n=(a.options||a.y_unit).length-1:n;var r=a.options||a.y_unit;return r[n]?r[n].key:null},isValid:function(){var t=e.getState(),a=!(this.start_date.valueOf()<t.min_date.valueOf()||this.start_date.valueOf()>=t.max_date.valueOf());if(!a)return!1;if(!this.isVisible(this.start_date,this.end_date))return!1;
var i=this._getMultisectionView();return i?void 0!==i.order[this.section]:!0},fallback:function(){var t=new e.$keyboardNavigation.TimeSlot;return t.isValid()?t:new e.$keyboardNavigation.DataArea},getNodes:function(){return Array.prototype.slice.call(e.$container.querySelectorAll(".dhx_focus_slot"))},getNode:function(){return this.getNodes()[0]},focus:function(){e.$keyboardNavigation.marker.render(this.start_date,this.end_date,this.section),e.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this),
e.$keyboardNavigation._pasteDate=this.start_date,e.$keyboardNavigation._pasteSection=this.section},blur:function(){e.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this),e.$keyboardNavigation.marker.clear()},_modes:e.$keyboardNavigation.SchedulerNode.prototype._modes,_getMode:e.$keyboardNavigation.SchedulerNode.prototype.getMode,addMonthDate:function(t,a,i){var n;switch(a){case"up":n=e.date.add(t,-1,"week");break;case"down":n=e.date.add(t,1,"week");break;case"left":n=e.date.day_start(e.date.add(t,-1,"day")),
n=this.findVisibleColumn(n,-1);break;case"right":n=e.date.day_start(e.date.add(t,1,"day")),n=this.findVisibleColumn(n,1);break;default:n=e.date.day_start(new Date(t))}var r=e.getState();return(t.valueOf()<r.min_date.valueOf()||!i&&t.valueOf()>=r.max_date.valueOf())&&(n=new Date(r.min_date)),n},nextMonthSlot:function(t,a,i){var n,r;return n=this.addMonthDate(t.start_date,a,i),n.setHours(e.config.first_hour),r=new Date(n),r.setHours(e.config.last_hour),{start_date:n,end_date:r}},_alignTimeSlot:function(t,a,i,n){
for(var r=new Date(a);r.valueOf()<t.valueOf();)r=e.date.add(r,n,i);return r.valueOf()>t.valueOf()&&(r=e.date.add(r,-n,i)),r},nextTimelineSlot:function(t,a,i){var n=e.getState(),r=e.matrix[n.mode],s=this._alignTimeSlot(t.start_date,e.date[r.name+"_start"](new Date(t.start_date)),r.x_unit,r.x_step),d=this._alignTimeSlot(t.end_date,e.date[r.name+"_start"](new Date(t.end_date)),r.x_unit,r.x_step);d.valueOf()<=s.valueOf()&&(d=e.date.add(s,r.x_step,r.x_unit));var o=this.clone(t);switch(o.start_date=s,o.end_date=d,
o.section=t.section||this._getNextSection(),a){case"up":o.section=this._getNextSection(t.section,-1);break;case"down":o.section=this._getNextSection(t.section,1);break;case"left":o.start_date=this.findVisibleColumn(e.date.add(o.start_date,-r.x_step,r.x_unit),-1),o.end_date=e.date.add(o.start_date,r.x_step,r.x_unit);break;case"right":o.start_date=this.findVisibleColumn(e.date.add(o.start_date,r.x_step,r.x_unit),1),o.end_date=e.date.add(o.start_date,r.x_step,r.x_unit)}return(o.start_date.valueOf()<n.min_date.valueOf()||o.start_date.valueOf()>=n.max_date.valueOf())&&(i&&o.start_date.valueOf()>=n.max_date.valueOf()?o.start_date=new Date(n.max_date):(o.start_date=e.date[n.mode+"_start"](e.date.add(n.date,"left"==a?-1:1,n.mode)),
o.end_date=e.date.add(o.start_date,r.x_step,r.x_unit))),o},nextUnitsSlot:function(t,a,i){var n=this.clone(t);n.section=t.section||this._getNextSection();var r=t.section||this._getNextSection(),s=e.getState(),d=e._props[s.mode];switch(a){case"left":r=this._getNextSection(t.section,-1);var o=d.size?d.size-1:d.options.length;d.days>1&&d.order[r]==o-1&&e.date.add(t.start_date,-1,"day").valueOf()>=s.min_date.valueOf()&&(n=this.nextDaySlot(t,a,i));break;case"right":r=this._getNextSection(t.section,1),d.days>1&&!d.order[r]&&e.date.add(t.start_date,1,"day").valueOf()<s.max_date.valueOf()&&(n=this.nextDaySlot(t,a,i));
break;default:n=this.nextDaySlot(t,a,i),r=t.section}return n.section=r,n},_moveDate:function(t,a){var i=this.findVisibleColumn(e.date.add(t,a,"day"),a);return i.setHours(t.getHours()),i.setMinutes(t.getMinutes()),i},isBeforeLastHour:function(t,a){var i=t.getMinutes(),n=t.getHours(),r=e.config.last_hour;return r>n||!a&&(24==r||n==r)&&!i},isAfterFirstHour:function(t,a){var i=t.getMinutes(),n=t.getHours(),r=e.config.first_hour,s=e.config.last_hour;return n>=r||!a&&!i&&(!n&&24==s||n==s)},isInVisibleDayTime:function(e,t){
return this.isBeforeLastHour(e,t)&&this.isAfterFirstHour(e,t)},nextDaySlot:function(t,a,i){var n,r,s=e.config.key_nav_step,d=this._alignTimeSlot(t.start_date,e.date.day_start(new Date(t.start_date)),"minute",s),o=t.start_date;switch(a){case"up":if(n=e.date.add(d,-s,"minute"),!this.isInVisibleDayTime(n,!0)&&(!i||this.isInVisibleDayTime(o,!0))){var l=!0;i&&e.date.date_part(new Date(n)).valueOf()!=e.date.date_part(new Date(o)).valueOf()&&(l=!1),l&&(n=this.findVisibleColumn(e.date.add(t.start_date,-1,"day"),-1)),
n.setHours(e.config.last_hour),n.setMinutes(0),n=e.date.add(n,-s,"minute")}r=e.date.add(n,s,"minute");break;case"down":n=e.date.add(d,s,"minute");var _=i?n:e.date.add(n,s,"minute");if(!this.isInVisibleDayTime(_,!1)&&(!i||this.isInVisibleDayTime(o,!1)))if(i){var l=!0;e.date.date_part(new Date(o)).valueOf()==o.valueOf()&&(l=!1),l&&(n=this.findVisibleColumn(e.date.add(t.start_date,1,"day"),1)),n.setHours(e.config.first_hour),n.setMinutes(0),n=e.date.add(n,s,"minute")}else n=this.findVisibleColumn(e.date.add(t.start_date,1,"day"),1),
n.setHours(e.config.first_hour),n.setMinutes(0);r=e.date.add(n,s,"minute");break;case"left":n=this._moveDate(t.start_date,-1),r=this._moveDate(t.end_date,-1);break;case"right":n=this._moveDate(t.start_date,1),r=this._moveDate(t.end_date,1);break;default:n=d,r=e.date.add(n,s,"minute")}return{start_date:n,end_date:r}},nextWeekAgendaSlot:function(t,a){var i,n,r=e.getState();switch(a){case"down":case"left":i=e.date.day_start(e.date.add(t.start_date,-1,"day")),i=this.findVisibleColumn(i,-1);break;case"up":
case"right":i=e.date.day_start(e.date.add(t.start_date,1,"day")),i=this.findVisibleColumn(i,1);break;default:i=e.date.day_start(t.start_date)}return(t.start_date.valueOf()<r.min_date.valueOf()||t.start_date.valueOf()>=r.max_date.valueOf())&&(i=new Date(r.min_date)),n=new Date(i),n.setHours(e.config.last_hour),{start_date:i,end_date:n}},nextAgendaSlot:function(e,t){return{start_date:e.start_date,end_date:e.end_date}},isDateVisible:function(t){if(!e._ignores_detected)return!0;var a,i=e.matrix&&e.matrix[e.getState().mode];
return a=i?e._get_date_index(i,t):e.locate_holder_day(t),!e._ignores[a]},findVisibleColumn:function(t,a){var i=t;a=a||1;for(var n=e.getState();!this.isDateVisible(i)&&(a>0&&i.valueOf()<=n.max_date.valueOf()||0>a&&i.valueOf()>=n.min_date.valueOf());)i=this.nextDateColumn(i,a);return i},nextDateColumn:function(t,a){a=a||1;var i,n=e.matrix&&e.matrix[e.getState().mode];return i=n?e.date.add(t,a*n.x_step,n.x_unit):e.date.day_start(e.date.add(t,a,"day"))},isVisible:function(t,a){if(!e._ignores_detected)return!0;
for(var i=new Date(t);i.valueOf()<a.valueOf();){if(this.isDateVisible(i))return!0;i=this.nextDateColumn(i)}return!1},nextSlot:function(t,a,i,n){var r;i=i||this._getMode();var s=e.$keyboardNavigation.TimeSlot.prototype.clone(t);switch(i){case this._modes.units:r=this.nextUnitsSlot(s,a,n);break;case this._modes.timeline:r=this.nextTimelineSlot(s,a,n);break;case this._modes.year:r=this.nextMonthSlot(s,a,n);break;case this._modes.month:r=this.nextMonthSlot(s,a,n);break;case this._modes.weekAgenda:r=this.nextWeekAgendaSlot(s,a,n);
break;case this._modes.list:r=this.nextAgendaSlot(s,a,n);break;case this._modes.dayColumns:r=this.nextDaySlot(s,a,n)}return r.start_date.valueOf()>=r.end_date.valueOf()&&(r=this.nextSlot(r,a,i)),e.$keyboardNavigation.TimeSlot.prototype.clone(r)},extendSlot:function(t,a){var i,n=this._getMode();switch(n){case this._modes.units:i="left"==a||"right"==a?this.nextUnitsSlot(t,a):this.extendUnitsSlot(t,a);break;case this._modes.timeline:i="down"==a||"up"==a?this.nextTimelineSlot(t,a):this.extendTimelineSlot(t,a);
break;case this._modes.year:i=this.extendMonthSlot(t,a);break;case this._modes.month:i=this.extendMonthSlot(t,a);break;case this._modes.dayColumns:i=this.extendDaySlot(t,a);break;case this._modes.weekAgenda:i=this.extendWeekAgendaSlot(t,a);break;default:i=t}var r=e.getState();return i.start_date.valueOf()<r.min_date.valueOf()&&(i.start_date=this.findVisibleColumn(r.min_date),i.start_date.setHours(e.config.first_hour)),i.end_date.valueOf()>r.max_date.valueOf()&&(i.end_date=this.findVisibleColumn(r.max_date,-1)),
e.$keyboardNavigation.TimeSlot.prototype.clone(i)},extendTimelineSlot:function(e,t){return this.extendGenericSlot({left:"start_date",right:"end_date"},e,t,"timeline")},extendWeekAgendaSlot:function(e,t){return this.extendGenericSlot({left:"start_date",right:"end_date"},e,t,"weekAgenda")},extendGenericSlot:function(t,a,i,n){var r,s=a.movingDate;if(s||(s=t[i]),!s||!t[i])return a;if(!i)return e.$keyboardNavigation.TimeSlot.prototype.clone(a);r=this.nextSlot({start_date:a[s],section:a.section},i,n,!0),
r.start_date.valueOf()==a.start_date.valueOf()&&(r=this.nextSlot({start_date:r.start_date,section:r.section},i,n,!0)),r.movingDate=s;var d=this.extendSlotDates(a,r,r.movingDate);return d.end_date.valueOf()<=d.start_date.valueOf()&&(r.movingDate="end_date"==r.movingDate?"start_date":"end_date"),d=this.extendSlotDates(a,r,r.movingDate),r.start_date=d.start_date,r.end_date=d.end_date,r},extendSlotDates:function(e,t,a){var i={start_date:null,end_date:null};return"start_date"==a?(i.start_date=t.start_date,
i.end_date=e.end_date):(i.start_date=e.start_date,i.end_date=t.start_date),i},extendMonthSlot:function(t,a){var t=this.extendGenericSlot({up:"start_date",down:"end_date",left:"start_date",right:"end_date"},t,a,"month");return t.start_date.setHours(e.config.first_hour),t.end_date=e.date.add(t.end_date,-1,"day"),t.end_date.setHours(e.config.last_hour),t},extendUnitsSlot:function(e,t){var a;switch(t){case"down":case"up":a=this.extendDaySlot(e,t);break;default:a=e}return a.section=e.section,a},extendDaySlot:function(e,t){
return this.extendGenericSlot({up:"start_date",down:"end_date",left:"start_date",right:"end_date"},e,t,"dayColumns")},scrollSlot:function(t){var a=e.getState(),i=this.nextSlot(this,t);(i.start_date.valueOf()<a.min_date.valueOf()||i.start_date.valueOf()>=a.max_date.valueOf())&&e.setCurrentView(new Date(i.start_date)),this.moveTo(i)},keys:{left:function(){this.scrollSlot("left")},right:function(){this.scrollSlot("right")},down:function(){var t=this._getMode();t==this._modes.list?e.$keyboardNavigation.SchedulerNode.prototype.nextEventHandler():this.scrollSlot("down");
},up:function(){var t=this._getMode();t==this._modes.list?e.$keyboardNavigation.SchedulerNode.prototype.prevEventHandler():this.scrollSlot("up")},"shift+down":function(){this.moveTo(this.extendSlot(this,"down"))},"shift+up":function(){this.moveTo(this.extendSlot(this,"up"))},"shift+right":function(){this.moveTo(this.extendSlot(this,"right"))},"shift+left":function(){this.moveTo(this.extendSlot(this,"left"))},enter:function(){var t={start_date:new Date(this.start_date),end_date:new Date(this.end_date)
},a=e.getState().mode;if(e.matrix&&e.matrix[a]){var i=e.matrix[e.getState().mode];t[i.y_property]=this.section}else if(e._props&&e._props[a]){var n=e._props[a];t[n.map_to]=this.section}e.addEventNow(t)}}}),e.$keyboardNavigation.TimeSlot.prototype.bindAll(e.$keyboardNavigation.TimeSlot.prototype.keys),e.$keyboardNavigation.MinicalButton=function(e,t){this.container=e,this.index=t||0},e.$keyboardNavigation.MinicalButton.prototype=e._compose(e.$keyboardNavigation.KeyNavNode,{isValid:function(){var e=this.container;
return!!e.offsetWidth},fallback:function(){var t=new e.$keyboardNavigation.TimeSlot;return t.isValid()?t:new e.$keyboardNavigation.DataArea},focus:function(){e.$keyboardNavigation.dispatcher.globalNode.disable(),this.container.removeAttribute("tabindex"),e.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this)},blur:function(){this.container.setAttribute("tabindex","0"),e.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this)},getNode:function(){return this.index?this.container.querySelector(".dhx_cal_next_button"):this.container.querySelector(".dhx_cal_prev_button");
},keys:{right:function(t){this.moveTo(new e.$keyboardNavigation.MinicalButton(this.container,this.index?0:1))},left:function(t){this.moveTo(new e.$keyboardNavigation.MinicalButton(this.container,this.index?0:1))},down:function(){var t=new e.$keyboardNavigation.MinicalCell(this.container,0,0);t&&!t.isValid()&&(t=t.fallback()),this.moveTo(t)},enter:function(e){this.getNode().click()}}}),e.$keyboardNavigation.MinicalButton.prototype.bindAll(e.$keyboardNavigation.MinicalButton.prototype.keys),e.$keyboardNavigation.MinicalCell=function(e,t,a){
this.container=e,this.row=t||0,this.col=a||0},e.$keyboardNavigation.MinicalCell.prototype=e._compose(e.$keyboardNavigation.KeyNavNode,{isValid:function(){var e=this._getGrid();return!(!e[this.row]||!e[this.row][this.col])},fallback:function(){var t=this.row,a=this.col,i=this._getGrid();i[t]||(t=0);var n=!0;if(t>i.length/2&&(n=!1),!i[t]){var r=new e.$keyboardNavigation.TimeSlot;return r.isValid()?r:new e.$keyboardNavigation.DataArea}if(n){for(var s=a;i[t]&&s<i[t].length;s++)if(i[t][s]||s!=i[t].length-1||(t++,
a=0),i[t][s])return new e.$keyboardNavigation.MinicalCell(this.container,t,s)}else for(var s=a;i[t]&&s<i[t].length;s--)if(i[t][s]||s||(t--,a=i[t].length-1),i[t][s])return new e.$keyboardNavigation.MinicalCell(this.container,t,s);return new e.$keyboardNavigation.MinicalButton(this.container,0)},focus:function(){e.$keyboardNavigation.dispatcher.globalNode.disable(),this.container.removeAttribute("tabindex"),e.$keyboardNavigation.KeyNavNode.prototype.focus.apply(this)},blur:function(){this.container.setAttribute("tabindex","0"),
e.$keyboardNavigation.KeyNavNode.prototype.blur.apply(this)},_getNode:function(e,t){return this.container.querySelector(".dhx_year_body tr:nth-child("+(e+1)+") td:nth-child("+(t+1)+")")},getNode:function(){return this._getNode(this.row,this.col)},_getGrid:function(){for(var t=this.container.querySelectorAll(".dhx_year_body tr"),a=[],i=0;i<t.length;i++){a[i]=[];for(var n=t[i],r=n.querySelectorAll("td"),s=0;s<r.length;s++){var d=r[s],o=!0,l=e._getClassName(d);(l.indexOf("dhx_after")>-1||l.indexOf("dhx_before")>-1||l.indexOf("dhx_scale_ignore")>-1)&&(o=!1),
a[i][s]=o}}return a},keys:{right:function(t){var a=this._getGrid(),i=this.row,n=this.col+1;a[i]&&a[i][n]||(a[i+1]?(i+=1,n=0):n=this.col);var r=new e.$keyboardNavigation.MinicalCell(this.container,i,n);r.isValid()||(r=r.fallback()),this.moveTo(r)},left:function(t){var a=this._getGrid(),i=this.row,n=this.col-1;a[i]&&a[i][n]||(a[i-1]?(i-=1,n=a[i].length-1):n=this.col);var r=new e.$keyboardNavigation.MinicalCell(this.container,i,n);r.isValid()||(r=r.fallback()),this.moveTo(r)},down:function(){var t=this._getGrid(),a=this.row+1,i=this.col;
t[a]&&t[a][i]||(a=this.row);var n=new e.$keyboardNavigation.MinicalCell(this.container,a,i);n.isValid()||(n=n.fallback()),this.moveTo(n)},up:function(){var t=this._getGrid(),a=this.row-1,i=this.col;if(t[a]&&t[a][i]){var n=new e.$keyboardNavigation.MinicalCell(this.container,a,i);n.isValid()||(n=n.fallback()),this.moveTo(n)}else{var r=0;this.col>t[this.row].length/2&&(r=1),this.moveTo(new e.$keyboardNavigation.MinicalButton(this.container,r))}},enter:function(e){this.getNode().querySelector(".dhx_month_head").click();
}}}),e.$keyboardNavigation.MinicalCell.prototype.bindAll(e.$keyboardNavigation.MinicalCell.prototype.keys),e.$keyboardNavigation.DataArea=function(e){this.index=e||0},e.$keyboardNavigation.DataArea.prototype=e._compose(e.$keyboardNavigation.KeyNavNode,{getNode:function(t){return e.$container.querySelector(".dhx_cal_data")},_handlers:null,isValid:function(){return!0},fallback:function(){return this},keys:{"up,down,right,left":function(){this.moveTo(new e.$keyboardNavigation.TimeSlot)}}}),e.$keyboardNavigation.DataArea.prototype.bindAll(e.$keyboardNavigation.DataArea.prototype.keys),
dhtmlx._modalsStack||(dhtmlx._modalsStack=[]),function(){function t(){return!(!l.length&&!dhtmlx._modalsStack.length)}function a(e,t){for(;e&&e!=t;)e=e.parentNode;return!(e!=t)}function i(i){setTimeout(function(){t()||a(document.activeElement,e.$container)||e.focus()},1)}function n(t){e.eventRemove(t,"keydown",d),e.event(t,"keydown",d),l.push(t)}function r(){var t=l.pop();t&&e.eventRemove(t,"keydown",d),i(t)}function s(e){return dhtmlx._modalsStack.length?e==dhtmlx._modalsStack[dhtmlx._modalsStack.length-1]:e==l[l.length-1];
}function d(t){var t=t||window.event,a=t.currentTarget;s(a)&&e.$keyboardNavigation.trapFocus(a,t)}function o(){n(e.getLightbox())}var l=[];if(e.attachEvent("onLightbox",o),e.attachEvent("onAfterLightbox",r),e.attachEvent("onAfterQuickInfo",function(){i()}),!dhtmlx._keyNavMessagePopup){dhtmlx._keyNavMessagePopup=!0;var _=null,c=null;dhtmlx.attachEvent("onMessagePopup",function(t){for(_=document.activeElement,c=_;c&&e._getClassName(c).indexOf("dhx_cal_data")<0;)c=c.parentNode;c&&(c=c.parentNode),e.eventRemove(t,"keydown",d),
e.event(t,"keydown",d),dhtmlx._modalsStack.push(t)}),dhtmlx.attachEvent("onAfterMessagePopup",function(){var t=dhtmlx._modalsStack.pop();t&&e.eventRemove(t,"keydown",d),setTimeout(function(){for(var t=document.activeElement;t&&e._getClassName(t).indexOf("dhx_cal_light")<0;)t=t.parentNode;t||(_&&_.parentNode?_.focus():c&&c.parentNode&&c.focus(),_=null,c=null)},1)})}e.$keyboardNavigation.isModal=t}(),e.$keyboardNavigation.dispatcher={isActive:!1,activeNode:null,globalNode:new e.$keyboardNavigation.SchedulerNode,
enable:function(){e.$container&&(this.isActive=!0,this.globalNode.enable(),this.setActiveNode(this.getActiveNode()))},disable:function(){this.isActive=!1,this.globalNode.disable()},isEnabled:function(){return!!this.isActive},getDefaultNode:function(){return this.globalNode.getDefaultNode()},setDefaultNode:function(){this.setActiveNode(this.getDefaultNode())},getActiveNode:function(){var e=this.activeNode;return e&&!e.isValid()&&(e=e.fallback()),e},focusGlobalNode:function(){this.blurNode(this.globalNode),
this.focusNode(this.globalNode)},setActiveNode:function(e){e&&e.isValid()&&(this.activeNode&&this.activeNode.compareTo(e)||this.isEnabled()&&(this.blurNode(this.activeNode),this.activeNode=e,this.focusNode(this.activeNode)))},focusNode:function(t){t&&t.focus&&(t.focus(),t.getNode&&document.activeElement!=t.getNode()&&this.setActiveNode(new e.$keyboardNavigation.DataArea))},blurNode:function(e){e&&e.blur&&e.blur()},getInlineEditor:function(t){var a=e.$container.querySelector(".dhx_cal_editor[event_id='"+t+"'] textarea");
return a&&a.offsetWidth?a:null},keyDownHandler:function(t){if(!t.defaultPrevented){var a=this.getActiveNode();if((!e.$keyboardNavigation.isModal()||a&&a.container&&e._locate_css({target:a.container},"dhx_minical_popup",!1))&&(!e.getState().editor_id||!this.getInlineEditor(e.getState().editor_id))&&this.isEnabled()){t=t||window.event;var i=this.globalNode,n=e.$keyboardNavigation.shortcuts.getCommandFromEvent(t);a?a.findHandler(n)?a.doAction(n,t):i.findHandler(n)&&i.doAction(n,t):this.setDefaultNode();
}}},_timeout:null,delay:function(e,t){clearTimeout(this._timeout),this._timeout=setTimeout(e,t||1)}},e._temp_key_scope=function(){function t(e){e=e||window.event,d.x=e.clientX,d.y=e.clientY}function a(){for(var t=!1,a=!1,i=document.elementFromPoint(d.x,d.y);i&&i!=e._obj;)i=i.parentNode;return t=!(i!=e._obj),a=e.$keyboardNavigation.dispatcher.isEnabled(),t||a}function i(e){delete e.rec_type,delete e.rec_pattern,delete e.event_pid,delete e.event_length}function n(t){return e._lame_copy({},t)}function r(){
var t=e.$keyboardNavigation.dispatcher.getActiveNode();return t&&t.eventId?t.eventId:e._select_id}e.config.key_nav=!0,e.$keyboardNavigation._pasteDate=null,e.$keyboardNavigation._pasteSection=null;var s=null,d={};document.body?dhtmlxEvent(document.body,"mousemove",t):dhtmlxEvent(window,"load",function(){dhtmlxEvent(document.body,"mousemove",t)}),e.attachEvent("onMouseMove",function(t,a){var i=e.getState();if(i.mode&&i.min_date){var n=e.getActionData(a);e.$keyboardNavigation._pasteDate=n.date,e.$keyboardNavigation._pasteSection=n.section;
}}),e._make_pasted_event=function(t){var a=e.$keyboardNavigation._pasteDate,r=e.$keyboardNavigation._pasteSection,s=t.end_date-t.start_date,d=n(t);if(i(d),d.start_date=new Date(a),d.end_date=new Date(d.start_date.valueOf()+s),r){var o=e._get_section_property();e.config.multisection?d[o]=t[o]:d[o]=r}return d},e._do_paste=function(t,a,i){e.addEvent(a),e.callEvent("onEventPasted",[t,a,i])},e._is_key_nav_active=function(){return this._is_initialized()&&!this._is_lightbox_open()&&this.config.key_nav?!0:!1;
},e.event(document,"keydown",function(t){(t.ctrlKey||t.metaKey)&&86==t.keyCode&&e._buffer_event&&!e.$keyboardNavigation.dispatcher.isEnabled()&&(e.$keyboardNavigation.dispatcher.isActive=a())}),e._key_nav_copy_paste=function(t){if(!e._is_key_nav_active())return!0;if(t=t||event,37==t.keyCode||39==t.keyCode){t.cancelBubble=!0;var i=e.date.add(e._date,37==t.keyCode?-1:1,e._mode);return e.setCurrentView(i),!0}var d=r();if((t.ctrlKey||t.metaKey)&&67==t.keyCode)return d&&(e._buffer_event=n(e.getEvent(d)),
s=!0,e.callEvent("onEventCopied",[e.getEvent(d)])),!0;if((t.ctrlKey||t.metaKey)&&88==t.keyCode&&d){s=!1;var o=e._buffer_event=n(e.getEvent(d));e.updateEvent(o.id),e.callEvent("onEventCut",[o])}if((t.ctrlKey||t.metaKey)&&86==t.keyCode&&a(t)){var o=e._buffer_event?e.getEvent(e._buffer_event.id):e._buffer_event;if(o=o||e._buffer_event){var l=e._make_pasted_event(o);if(s)l.id=e.uid(),e._do_paste(s,l,o);else{var _=e.callEvent("onBeforeEventChanged",[l,t,!1,o]);_&&(e._do_paste(s,l,o),s=!0)}}return!0}}},
e._temp_key_scope(),function(){function t(){if(e.config.key_nav){var t,a=document.activeElement;return t=!a||e._locate_css(a,"dhx_cal_quick_info",!1)?!1:e.$keyboardNavigation.isChildOf(a,e.$container)||e.$keyboardNavigation.isMinical(a)}}function a(e){e&&!i.isEnabled()?i.enable():!e&&i.isEnabled()&&i.disable()}e.$keyboardNavigation.attachSchedulerHandlers=function(){function t(t){if(!e.config.key_nav)return!0;var a,i=e.$keyboardNavigation.isChildOf(t.target||t.srcElement,e.$container.querySelector(".dhx_cal_data")),r=e.getActionData(t);
e._locate_event(t.target||t.srcElement)?a=new e.$keyboardNavigation.Event(e._locate_event(t.target||t.srcElement)):i&&(a=new e.$keyboardNavigation.TimeSlot,r.date&&i&&(a=a.nextSlot(new e.$keyboardNavigation.TimeSlot(r.date,null,r.section)))),a&&(n.isEnabled()?r.date&&i&&n.delay(function(){n.setActiveNode(a)}):n.activeNode=a)}function a(t){if(e.config.key_nav&&n.isEnabled()){var a=t,i=new e.$keyboardNavigation.Event(a.eventId);if(!i.isValid()){var r=i.start||a.start,s=i.end||a.end,d=i.section||a.section;
i=new e.$keyboardNavigation.TimeSlot(r,s,d),i.isValid()||(i=new e.$keyboardNavigation.TimeSlot)}n.setActiveNode(i);var o=n.getActiveNode();o&&o.getNode&&document.activeElement!=o.getNode()&&n.focusNode(n.getActiveNode())}}var i,n=e.$keyboardNavigation.dispatcher,r=function(t){return e.config.key_nav?n.keyDownHandler(t):void 0},s=function(){n.focusGlobalNode()};e.attachEvent("onDataRender",function(){e.config.key_nav&&n.isEnabled()&&!e.getState().editor_id&&(clearTimeout(i),i=setTimeout(function(){
n.isEnabled()||n.enable();var t=n.getActiveNode();t instanceof e.$keyboardNavigation.MinicalButton||t instanceof e.$keyboardNavigation.MinicalCell||(t.isValid()?n.focusNode(t):n.setActiveNode(t.fallback()),n.focusNode(n.getActiveNode()))}))}),e.attachEvent("onSchedulerReady",function(){var a=e.$container;e.eventRemove(document,"keydown",r),e.eventRemove(a,"mousedown",t),e.eventRemove(a,"focus",s),e.config.key_nav?(e.event(document,"keydown",r),e.event(a,"mousedown",t),e.event(a,"focus",s),a.setAttribute("tabindex","0")):a.removeAttribute("tabindex");
});var d=e.updateEvent;e.updateEvent=function(t){var i=d.apply(this,arguments);if(e.config.key_nav&&n.isEnabled()&&e.getState().select_id==t){var r=new e.$keyboardNavigation.Event(t);e.getState().lightbox_id||a(r)}return i},e.attachEvent("onEventDeleted",function(t){if(!e.config.key_nav)return!0;if(n.isEnabled()){var a=n.getActiveNode();a.eventId==t&&n.setActiveNode(new e.$keyboardNavigation.TimeSlot)}return!0}),e.attachEvent("onClearAll",function(){return e.config.key_nav?void(n.isEnabled()&&n.getActiveNode()instanceof e.$keyboardNavigation.Event&&n.setActiveNode(new e.$keyboardNavigation.TimeSlot)):!0;
})},e.$keyboardNavigation._minicalendars=[],e.$keyboardNavigation.isMinical=function(t){for(var a=e.$keyboardNavigation._minicalendars,i=0;i<a.length;i++)if(this.isChildOf(t,a[i]))return!0;return!1},e.$keyboardNavigation.isChildOf=function(e,t){for(;e&&e!==t;)e=e.parentNode;return!(e!==t)},e.$keyboardNavigation.patchMinicalendar=function(){function t(t){var a=t.target;i.enable(),i.setActiveNode(new e.$keyboardNavigation.MinicalButton(a,0))}function a(t){var a=t.target||t.srcElement,n=e._locate_css(t,"dhx_cal_prev_button",!1),r=e._locate_css(t,"dhx_cal_next_button",!1),s=e._locate_css(t,"dhx_year_body",!1),d=0,o=0;
if(s){for(var l,_,c=a;c&&"td"!=c.tagName.toLowerCase();)c=c.parentNode;if(c&&(_=c,l=_.parentNode),l&&_){for(var h=l.parentNode.querySelectorAll("tr"),u=0;u<h.length;u++)if(h[u]==l){d=u;break}for(var g=l.querySelectorAll("td"),u=0;u<g.length;u++)if(g[u]==_){o=u;break}}}var v=t.currentTarget;i.delay(function(){if(n||r||s){var t;n?(t=new e.$keyboardNavigation.MinicalButton(v,0),i.setActiveNode(new e.$keyboardNavigation.MinicalButton(v,0))):r?t=new e.$keyboardNavigation.MinicalButton(v,1):s&&(t=new e.$keyboardNavigation.MinicalCell(v,d,o)),
t&&(i.enable(),t.isValid()&&(i.activeNode=null,i.setActiveNode(t)))}})}var i=e.$keyboardNavigation.dispatcher;if(e.renderCalendar){var n=e.renderCalendar;e.renderCalendar=function(){var r=n.apply(this,arguments),s=e.$keyboardNavigation._minicalendars;e.eventRemove(r,"click",a),e.event(r,"click",a),e.eventRemove(r,"focus",t),e.event(r,"focus",t);for(var d=!1,o=0;o<s.length;o++)if(s[o]==r){d=!0;break}if(d||s.push(r),i.isEnabled()){var l=i.getActiveNode();l&&l.container==r?i.focusNode(l):r.setAttribute("tabindex","0");
}else r.setAttribute("tabindex","0");return r}}if(e.destroyCalendar){var r=e.destroyCalendar;e.destroyCalendar=function(a,i){a=a||(e._def_count?e._def_count.firstChild:null);var n=r.apply(this,arguments);if(!a||!a.parentNode)for(var s=e.$keyboardNavigation._minicalendars,d=0;d<s.length;d++)s[d]==a&&(e.eventRemove(s[d],"focus",t),s.splice(d,1),d--);return n}}};var i=e.$keyboardNavigation.dispatcher;if(e.$keyboardNavigation.attachSchedulerHandlers(),e.renderCalendar)e.$keyboardNavigation.patchMinicalendar();else var n=e.attachEvent("onSchedulerReady",function(){
e.detachEvent(n),e.$keyboardNavigation.patchMinicalendar()});setInterval(function(){if(e.$container&&e.$keyboardNavigation.isChildOf(e.$container,document.body)){var n=t();n?a(n):!n&&i.isEnabled()&&setTimeout(function(){e.config.key_nav?a(t()):e.$container.removeAttribute("tabindex")},100)}},500)}()}window.Scheduler?window.Scheduler.plugin(e):e(window.scheduler)}();
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.attachEvent("onTemplatesReady",function(){this.layers.sort(function(e,t){return e.zIndex-t.zIndex}),e._dp_init=function(t){t._methods=["_set_event_text_style","","changeEventId","deleteEvent"],this.attachEvent("onEventAdded",function(e){!this._loading&&this.validId(e)&&this.getEvent(e)&&this.getEvent(e).layer==t.layer&&t.setUpdated(e,!0,"inserted")}),this.attachEvent("onBeforeEventDelete",function(e){if(this.getEvent(e)&&this.getEvent(e).layer==t.layer){if(!this.validId(e))return;
var a=t.getState(e);return"inserted"==a||this._new_event?(t.setUpdated(e,!1),!0):"deleted"==a?!1:"true_deleted"==a?!0:(t.setUpdated(e,!0,"deleted"),!1)}return!0}),this.attachEvent("onEventChanged",function(e){!this._loading&&this.validId(e)&&this.getEvent(e)&&this.getEvent(e).layer==t.layer&&t.setUpdated(e,!0,"updated")}),t._getRowData=function(e,t){var a=this.obj.getEvent(e),i={};for(var n in a)0!==n.indexOf("_")&&(a[n]&&a[n].getUTCFullYear?i[n]=this.obj.templates.xml_format(a[n]):i[n]=a[n]);return i;
},t._clearUpdateFlag=function(){},t.attachEvent("insertCallback",e._update_callback),t.attachEvent("updateCallback",e._update_callback),t.attachEvent("deleteCallback",function(e,t){this.obj.setUserData(t,this.action_param,"true_deleted"),this.obj.deleteEvent(t)})},function(){var t=function(e){if(null===e||"object"!=typeof e)return e;var a=new e.constructor;for(var i in e)a[i]=t(e[i]);return a};e._dataprocessors=[],e._layers_zindex={};for(var a=0;a<e.layers.length;a++){if(e.config["lightbox_"+e.layers[a].name]={},
e.config["lightbox_"+e.layers[a].name].sections=t(e.config.lightbox.sections),e._layers_zindex[e.layers[a].name]=e.config.inital_layer_zindex||5+3*a,e.layers[a].url){var i=new dataProcessor(e.layers[a].url);i.layer=e.layers[a].name,e._dataprocessors.push(i),e._dataprocessors[a].init(e)}e.layers[a].isDefault&&(e.defaultLayer=e.layers[a].name)}}(),e.showLayer=function(e){this.toggleLayer(e,!0)},e.hideLayer=function(e){this.toggleLayer(e,!1)},e.toggleLayer=function(e,t){var a=this.getLayer(e);"undefined"!=typeof t?a.visible=!!t:a.visible=!a.visible,
this.setCurrentView(this._date,this._mode)},e.getLayer=function(t){var a,i;"string"==typeof t&&(i=t),"object"==typeof t&&(i=t.layer);for(var n=0;n<e.layers.length;n++)e.layers[n].name==i&&(a=e.layers[n]);return a},e.attachEvent("onBeforeLightbox",function(t){var a=this.getEvent(t);return this.config.lightbox.sections=this.config["lightbox_"+a.layer].sections,e.resetLightbox(),!0}),e.attachEvent("onClick",function(t,a){var i=e.getEvent(t);return!e.getLayer(i.layer).noMenu}),e.attachEvent("onEventCollision",function(t,a){
var i=this.getLayer(t);if(!i.checkCollision)return!1;for(var n=0,r=0;r<a.length;r++)a[r].layer==i.name&&a[r].id!=t.id&&n++;return n>=e.config.collision_limit}),e.addEvent=function(t,a,i,n,r){var s=t;1!=arguments.length&&(s=r||{},s.start_date=t,s.end_date=a,s.text=i,s.id=n,s.layer=this.defaultLayer),s.id=s.id||e.uid(),s.text=s.text||"","string"==typeof s.start_date&&(s.start_date=this.templates.api_date(s.start_date)),"string"==typeof s.end_date&&(s.end_date=this.templates.api_date(s.end_date)),s._timed=this.isOneDayEvent(s);
var d=!this._events[s.id];this._events[s.id]=s,this.event_updated(s),this._loading||this.callEvent(d?"onEventAdded":"onEventChanged",[s.id,s])},this._evs_layer={};for(var t=0;t<this.layers.length;t++)this._evs_layer[this.layers[t].name]=[];e.addEventNow=function(t,a,i){var n={};"object"==typeof t&&(n=t,t=null);var r=6e4*(this.config.event_duration||this.config.time_step);t||(t=Math.round(e._currentDate().valueOf()/r)*r);var s=new Date(t);if(!a){var d=this.config.first_hour;d>s.getHours()&&(s.setHours(d),
t=s.valueOf()),a=t+r}n.start_date=n.start_date||s,n.end_date=n.end_date||new Date(a),n.text=n.text||this.locale.labels.new_event,n.id=this._drag_id=this.uid(),n.layer=this.defaultLayer,this._drag_mode="new-size",this._loading=!0,this.addEvent(n),this.callEvent("onEventCreated",[this._drag_id,i]),this._loading=!1,this._drag_event={},this._on_mouse_up(i)},e._t_render_view_data=function(e){if(this.config.multi_day&&!this._table_view){for(var t=[],a=[],i=0;i<e.length;i++)e[i]._timed?t.push(e[i]):a.push(e[i]);
this._table_view=!0,this.render_data(a),this._table_view=!1,this.render_data(t)}else this.render_data(e)},e.render_view_data=function(){if(this._not_render)return void(this._render_wait=!0);this._render_wait=!1,this.clear_view(),this._evs_layer={};for(var e=0;e<this.layers.length;e++)this._evs_layer[this.layers[e].name]=[];for(var t=this.get_visible_events(),e=0;e<t.length;e++)this._evs_layer[t[e].layer]&&this._evs_layer[t[e].layer].push(t[e]);if("month"==this._mode){for(var a=[],e=0;e<this.layers.length;e++)this.layers[e].visible&&(a=a.concat(this._evs_layer[this.layers[e].name]));
this._t_render_view_data(a)}else for(var e=0;e<this.layers.length;e++)if(this.layers[e].visible){var i=this._evs_layer[this.layers[e].name];this._t_render_view_data(i)}},e._render_v_bar=function(t,a,i,n,r,s,d,o,l){var _=t.id;-1==d.indexOf("<div class=")&&(d=e.templates["event_header_"+t.layer]?e.templates["event_header_"+t.layer](t.start_date,t.end_date,t):d),-1==o.indexOf("<div class=")&&(o=e.templates["event_text_"+t.layer]?e.templates["event_text_"+t.layer](t.start_date,t.end_date,t):o);var h=document.createElement("DIV"),c="dhx_cal_event",u=e.templates["event_class_"+t.layer]?e.templates["event_class_"+t.layer](t.start_date,t.end_date,t):e.templates.event_class(t.start_date,t.end_date,t);
u&&(c=c+" "+u);var v='<div event_id="'+_+'" class="'+c+'" style="position:absolute; top:'+i+"px; left:"+a+"px; width:"+(n-4)+"px; height:"+r+"px;"+(s||"")+'">';return v+='<div class="dhx_header" style=" width:'+(n-6)+'px;" >&nbsp;</div>',v+='<div class="dhx_title">'+d+"</div>",v+='<div class="dhx_body" style=" width:'+(n-(this._quirks?4:14))+"px; height:"+(r-(this._quirks?20:30))+'px;">'+o+"</div>",v+='<div class="dhx_footer" style=" width:'+(n-8)+"px;"+(l?" margin-top:-1px;":"")+'" ></div></div>',
h.innerHTML=v,h.style.zIndex=100,h.firstChild},e.render_event_bar=function(t){var a=this._els.dhx_cal_data[0],i=this._colsS[t._sday],n=this._colsS[t._eday];n==i&&(n=this._colsS[t._eday+1]);var r=this.xy.bar_height,s=this._colsS.heights[t._sweek]+(this._colsS.height?this.xy.month_scale_height+2:2)+t._sorder*r,d=document.createElement("DIV"),o=t._timed?"dhx_cal_event_clear":"dhx_cal_event_line",l=e.templates["event_class_"+t.layer]?e.templates["event_class_"+t.layer](t.start_date,t.end_date,t):e.templates.event_class(t.start_date,t.end_date,t);
l&&(o=o+" "+l);var _='<div event_id="'+t.id+'" class="'+o+'" style="position:absolute; top:'+s+"px; left:"+i+"px; width:"+(n-i-15)+"px;"+(t._text_style||"")+'">';t._timed&&(_+=e.templates["event_bar_date_"+t.layer]?e.templates["event_bar_date_"+t.layer](t.start_date,t.end_date,t):e.templates.event_bar_date(t.start_date,t.end_date,t)),_+=e.templates["event_bar_text_"+t.layer]?e.templates["event_bar_text_"+t.layer](t.start_date,t.end_date,t):e.templates.event_bar_text(t.start_date,t.end_date,t)+"</div>)",
_+="</div>",d.innerHTML=_,this._rendered.push(d.firstChild),a.appendChild(d.firstChild)},e.render_event=function(t){var a=e.xy.menu_width;if(e.getLayer(t.layer).noMenu&&(a=0),!(t._sday<0)){var i=e.locate_holder(t._sday);if(i){var n=60*t.start_date.getHours()+t.start_date.getMinutes(),r=60*t.end_date.getHours()+t.end_date.getMinutes()||60*e.config.last_hour,s=Math.round((60*n*1e3-60*this.config.first_hour*60*1e3)*this.config.hour_size_px/36e5)%(24*this.config.hour_size_px)+1,d=Math.max(e.xy.min_event_height,(r-n)*this.config.hour_size_px/60)+1,o=Math.floor((i.clientWidth-a)/t._count),l=t._sorder*o+1;
t._inner||(o*=t._count-t._sorder);var _=this._render_v_bar(t.id,a+l,s,o,d,t._text_style,e.templates.event_header(t.start_date,t.end_date,t),e.templates.event_text(t.start_date,t.end_date,t));if(this._rendered.push(_),i.appendChild(_),l=l+parseInt(i.style.left,10)+a,s+=this._dy_shift,_.style.zIndex=this._layers_zindex[t.layer],this._edit_id==t.id){_.style.zIndex=parseInt(_.style.zIndex)+1;var h=_.style.zIndex;o=Math.max(o-4,e.xy.editor_width);var _=document.createElement("DIV");_.setAttribute("event_id",t.id),
this.set_xy(_,o,d-20,l,s+14),_.className="dhx_cal_editor",_.style.zIndex=h;var c=document.createElement("DIV");this.set_xy(c,o-6,d-26),c.style.cssText+=";margin:2px 2px 2px 2px;overflow:hidden;",c.style.zIndex=h,_.appendChild(c),this._els.dhx_cal_data[0].appendChild(_),this._rendered.push(_),c.innerHTML="<textarea class='dhx_cal_editor'>"+t.text+"</textarea>",this._quirks7&&(c.firstChild.style.height=d-12+"px"),this._editor=c.firstChild,this._editor.onkeypress=function(t){if((t||event).shiftKey)return!0;
var a=(t||event).keyCode;a==e.keys.edit_save&&e.editStop(!0),a==e.keys.edit_cancel&&e.editStop(!1)},this._editor.onselectstart=function(e){return(e||event).cancelBubble=!0,!0},c.firstChild.focus(),this._els.dhx_cal_data[0].scrollLeft=0,c.firstChild.select()}if(this._select_id==t.id){_.style.zIndex=parseInt(_.style.zIndex)+1;for(var u=this.config["icons_"+(this._edit_id==t.id?"edit":"select")],v="",g=0;g<u.length;g++)v+="<div class='dhx_menu_icon "+u[g]+"' title='"+this.locale.labels[u[g]]+"'></div>";
var f=this._render_v_bar(t.id,l-a+1,s,a,20*u.length+26,"","<div class='dhx_menu_head'></div>",v,!0);f.style.left=l-a+1,f.style.zIndex=_.style.zIndex,this._els.dhx_cal_data[0].appendChild(f),this._rendered.push(f)}}}},e.filter_agenda=function(t,a){var i=e.getLayer(a.layer);return i&&i.visible}})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.config.limit_start=null,e.config.limit_end=null,e.config.limit_view=!1,e.config.check_limits=!0,e.config.mark_now=!0,e.config.display_marked_timespans=!0,e._temp_limit_scope=function(){function t(t,a,i,n,r){var s=e,d=[],o={_props:"map_to",matrix:"y_property"};for(var l in o){var _=o[l];if(s[l])for(var h in s[l]){var c=s[l][h],u=c[_];t[u]&&(d=s._add_timespan_zones(d,e._get_blocked_zones(a[h],t[u],i,n,r)))}}return d=s._add_timespan_zones(d,e._get_blocked_zones(a,"global",i,n,r));
}var a=null,i="dhx_time_block",n="default",r=function(e,t,a){return t instanceof Date&&a instanceof Date?(e.start_date=t,e.end_date=a):(e.days=t,e.zones=a),e},s=function(e,t,a){var n="object"==typeof e?e:{days:e};return n.type=i,n.css="",t&&(a&&(n.sections=a),n=r(n,e,t)),n};e.blockTime=function(t,a,i){var n=s(t,a,i);return e.addMarkedTimespan(n)},e.unblockTime=function(t,a,i){a=a||"fullday";var n=s(t,a,i);return e.deleteMarkedTimespan(n)},e.attachEvent("onBeforeViewChange",function(t,a,i,n){function r(t,a){
var i=e.config.limit_start,n=e.config.limit_end,r=e.date.add(t,1,a);return t.valueOf()>n.valueOf()||r<=i.valueOf()}return e.config.limit_view&&(n=n||a,i=i||t,r(n,i)&&a.valueOf()!=n.valueOf())?(setTimeout(function(){var t=r(a,i)?e.config.limit_start:a;e.setCurrentView(r(t,i)?null:t,i)},1),!1):!0}),e.checkInMarkedTimespan=function(a,i,r){i=i||n;for(var s=!0,d=new Date(a.start_date.valueOf()),o=e.date.add(d,1,"day"),l=e._marked_timespans;d<a.end_date;d=e.date.date_part(o),o=e.date.add(d,1,"day")){var _=+e.date.date_part(new Date(d)),h=d.getDay(),c=t(a,l,h,_,i);
if(c)for(var u=0;u<c.length;u+=2){var v=e._get_zone_minutes(d),f=a.end_date>o||a.end_date.getDate()!=d.getDate()?1440:e._get_zone_minutes(a.end_date),g=c[u],m=c[u+1];if(f>g&&m>v&&(s="function"==typeof r?r(a,v,f,g,m):!1,!s))break}}return!s};var d=e.checkLimitViolation=function(t){if(!t)return!0;if(!e.config.check_limits)return!0;var a=e,n=a.config,r=[];if(t.rec_type)for(var s=e.getRecDates(t),d=0;d<s.length;d++){var o=e._copy_event(t);e._lame_copy(o,s[d]),r.push(o)}else r=[t];for(var l=!0,_=0;_<r.length;_++){
var h=!0,o=r[_];o._timed=e.isOneDayEvent(o),h=n.limit_start&&n.limit_end?o.start_date.valueOf()>=n.limit_start.valueOf()&&o.end_date.valueOf()<=n.limit_end.valueOf():!0,h&&(h=!e.checkInMarkedTimespan(o,i,function(e,t,i,n,r){var s=!0;return r>=t&&t>=n&&((1440==r||r>i)&&(s=!1),e._timed&&a._drag_id&&"new-size"==a._drag_mode?(e.start_date.setHours(0),e.start_date.setMinutes(r)):s=!1),(i>=n&&r>i||n>t&&i>r)&&(e._timed&&a._drag_id&&"new-size"==a._drag_mode?(e.end_date.setHours(0),e.end_date.setMinutes(n)):s=!1),
s})),h||(h=a.checkEvent("onLimitViolation")?a.callEvent("onLimitViolation",[o.id,o]):h),l=l&&h}return l||(a._drag_id=null,a._drag_mode=null),l};e._get_blocked_zones=function(e,t,a,i,n){var r=[];if(e&&e[t])for(var s=e[t],d=this._get_relevant_blocked_zones(a,i,s,n),o=0;o<d.length;o++)r=this._add_timespan_zones(r,d[o].zones);return r},e._get_relevant_blocked_zones=function(e,t,a,i){var n=a[t]&&a[t][i]?a[t][i]:a[e]&&a[e][i]?a[e][i]:[];return n},e.attachEvent("onMouseDown",function(e){return!(e==i)}),
e.attachEvent("onBeforeDrag",function(t){return t?d(e.getEvent(t)):!0}),e.attachEvent("onClick",function(t,a){return d(e.getEvent(t))}),e.attachEvent("onBeforeLightbox",function(t){var i=e.getEvent(t);return a=[i.start_date,i.end_date],d(i)}),e.attachEvent("onEventSave",function(t,a,i){if(!a.start_date||!a.end_date){var n=e.getEvent(t);a.start_date=new Date(n.start_date),a.end_date=new Date(n.end_date)}if(a.rec_type){var r=e._lame_clone(a);return e._roll_back_dates(r),d(r)}return d(a)}),e.attachEvent("onEventAdded",function(t){
if(!t)return!0;var a=e.getEvent(t);return!d(a)&&e.config.limit_start&&e.config.limit_end&&(a.start_date<e.config.limit_start&&(a.start_date=new Date(e.config.limit_start)),a.start_date.valueOf()>=e.config.limit_end.valueOf()&&(a.start_date=this.date.add(e.config.limit_end,-1,"day")),a.end_date<e.config.limit_start&&(a.end_date=new Date(e.config.limit_start)),a.end_date.valueOf()>=e.config.limit_end.valueOf()&&(a.end_date=this.date.add(e.config.limit_end,-1,"day")),a.start_date.valueOf()>=a.end_date.valueOf()&&(a.end_date=this.date.add(a.start_date,this.config.event_duration||this.config.time_step,"minute")),
a._timed=this.isOneDayEvent(a)),!0}),e.attachEvent("onEventChanged",function(t){if(!t)return!0;var i=e.getEvent(t);if(!d(i)){if(!a)return!1;i.start_date=a[0],i.end_date=a[1],i._timed=this.isOneDayEvent(i)}return!0}),e.attachEvent("onBeforeEventChanged",function(e,t,a){return d(e)}),e.attachEvent("onBeforeEventCreated",function(t){var a=e.getActionData(t).date,i={_timed:!0,start_date:a,end_date:e.date.add(a,e.config.time_step,"minute")};return d(i)}),e.attachEvent("onViewChange",function(){e._mark_now();
}),e.attachEvent("onSchedulerResize",function(){return window.setTimeout(function(){e._mark_now()},1),!0}),e.attachEvent("onTemplatesReady",function(){e._mark_now_timer=window.setInterval(function(){e._is_initialized()&&e._mark_now()},6e4)}),e._mark_now=function(t){var a="dhx_now_time";this._els[a]||(this._els[a]=[]);var i=e._currentDate(),n=this.config;if(e._remove_mark_now(),!t&&n.mark_now&&i<this._max_date&&i>this._min_date&&i.getHours()>=n.first_hour&&i.getHours()<n.last_hour){var r=this.locate_holder_day(i);
this._els[a]=e._append_mark_now(r,i)}},e._append_mark_now=function(t,a){var i="dhx_now_time",n=e._get_zone_minutes(a),r={zones:[n,n+1],css:i,type:i};if(!this._table_view){if(this._props&&this._props[this._mode]){var s,d,o=this._props[this._mode],l=o.size||o.options.length;o.days>1?(s=t,d=t+l):(s=0,d=s+l);for(var _=[],h=s;d>h;h++){var c=h;r.days=c;var u=e._render_marked_timespan(r,null,c)[0];_.push(u)}return _}return r.days=t,e._render_marked_timespan(r,null,t)}return"month"==this._mode?(r.days=+e.date.date_part(a),
e._render_marked_timespan(r,null,null)):void 0},e._remove_mark_now=function(){for(var e="dhx_now_time",t=this._els[e],a=0;a<t.length;a++){var i=t[a],n=i.parentNode;n&&n.removeChild(i)}this._els[e]=[]},e._marked_timespans={global:{}},e._get_zone_minutes=function(e){return 60*e.getHours()+e.getMinutes()},e._prepare_timespan_options=function(t){var a=[],i=[];if("fullweek"==t.days&&(t.days=[0,1,2,3,4,5,6]),t.days instanceof Array){for(var r=t.days.slice(),s=0;s<r.length;s++){var d=e._lame_clone(t);d.days=r[s],
a.push.apply(a,e._prepare_timespan_options(d))}return a}if(!t||!(t.start_date&&t.end_date&&t.end_date>t.start_date||void 0!==t.days&&t.zones)&&!t.type)return a;var o=0,l=1440;"fullday"==t.zones&&(t.zones=[o,l]),t.zones&&t.invert_zones&&(t.zones=e.invertZones(t.zones)),t.id=e.uid(),t.css=t.css||"",t.type=t.type||n;var _=t.sections;if(_){for(var h in _)if(_.hasOwnProperty(h)){var c=_[h];c instanceof Array||(c=[c]);for(var s=0;s<c.length;s++){var u=e._lame_copy({},t);u.sections={},u.sections[h]=c[s],
i.push(u)}}}else i.push(t);for(var v=0;v<i.length;v++){var f=i[v],g=f.start_date,m=f.end_date;if(g&&m)for(var p=e.date.date_part(new Date(g)),y=e.date.add(p,1,"day");m>p;){var u=e._lame_copy({},f);delete u.start_date,delete u.end_date,u.days=p.valueOf();var b=g>p?e._get_zone_minutes(g):o,x=m>y||m.getDate()!=p.getDate()?l:e._get_zone_minutes(m);u.zones=[b,x],a.push(u),p=y,y=e.date.add(y,1,"day")}else f.days instanceof Date&&(f.days=e.date.date_part(f.days).valueOf()),f.zones=t.zones.slice(),a.push(f);
}return a},e._get_dates_by_index=function(t,a,i){var n=[];a=e.date.date_part(new Date(a||e._min_date)),i=new Date(i||e._max_date);for(var r=a.getDay(),s=t-r>=0?t-r:7-a.getDay()+t,d=e.date.add(a,s,"day");i>d;d=e.date.add(d,1,"week"))n.push(d);return n},e._get_css_classes_by_config=function(e){var t=[];return e.type==i&&(t.push(i),e.css&&t.push(i+"_reset")),t.push("dhx_marked_timespan",e.css),t.join(" ")},e._get_block_by_config=function(e){var t=document.createElement("DIV");return e.html&&("string"==typeof e.html?t.innerHTML=e.html:t.appendChild(e.html)),
t},e._render_marked_timespan=function(t,a,i){var n=[],r=e.config,s=this._min_date,d=this._max_date,o=!1;if(!r.display_marked_timespans)return n;if(!i&&0!==i){if(t.days<7)i=t.days;else{var l=new Date(t.days);if(o=+l,!(+d>+l&&+l>=+s))return n;i=l.getDay()}var _=s.getDay();_>i?i=7-(_-i):i-=_}var h=t.zones,c=e._get_css_classes_by_config(t);if(e._table_view&&"month"==e._mode){var u=[],v=[];if(a)u.push(a),v.push(i);else{v=o?[o]:e._get_dates_by_index(i);for(var f=0;f<v.length;f++)u.push(this._scales[v[f]]);
}for(var f=0;f<u.length;f++){a=u[f],i=v[f];var g=Math.floor((this._correct_shift(i,1)-s.valueOf())/(864e5*this._cols.length)),m=this.locate_holder_day(i,!1)%this._cols.length;if(!this._ignores[m]){var p=e._get_block_by_config(t),y=Math.max(a.offsetHeight-1,0),b=Math.max(a.offsetWidth-1,0),x=this._colsS[m],w=this._colsS.heights[g]+(this._colsS.height?this.xy.month_scale_height+2:2)-1;p.className=c,p.style.top=w+"px",p.style.lineHeight=p.style.height=y+"px";for(var k=0;k<h.length;k+=2){var E=h[f],D=h[f+1];
if(E>=D)return[];var N=p.cloneNode(!0);N.style.left=x+Math.round(E/1440*b)+"px",N.style.width=Math.round((D-E)/1440*b)+"px",a.appendChild(N),n.push(N)}}}}else{var S=i;if(this._ignores[this.locate_holder_day(i,!1)])return n;if(this._props&&this._props[this._mode]&&t.sections&&t.sections[this._mode]){var A=this._props[this._mode];S=A.order[t.sections[this._mode]];var M=A.order[t.sections[this._mode]];if(A.days>1){var C=A.size||A.options.length;S=S*C+M}else S=M,A.size&&S>A.position+A.size&&(S=0)}a=a?a:e.locate_holder(S);
for(var f=0;f<h.length;f+=2){var E=Math.max(h[f],60*r.first_hour),D=Math.min(h[f+1],60*r.last_hour);if(E>=D){if(f+2<h.length)continue;return[]}var N=e._get_block_by_config(t);N.className=c;var O=24*this.config.hour_size_px+1,T=36e5;N.style.top=Math.round((60*E*1e3-this.config.first_hour*T)*this.config.hour_size_px/T)%O+"px",N.style.lineHeight=N.style.height=Math.max(Math.round(60*(D-E)*1e3*this.config.hour_size_px/T)%O,1)+"px",a.appendChild(N),n.push(N)}}return n},e._mark_timespans=function(){var t=this._els.dhx_cal_data[0],a=[];
if(e._table_view&&"month"==e._mode)for(var i in this._scales){var n=new Date(+i);a.push.apply(a,e._on_scale_add_marker(this._scales[i],n))}else for(var n=new Date(e._min_date),r=0,s=t.childNodes.length;s>r;r++){var d=t.childNodes[r];d.firstChild&&e._getClassName(d.firstChild).indexOf("dhx_scale_hour")>-1||(a.push.apply(a,e._on_scale_add_marker(d,n)),n=e.date.add(n,1,"day"))}return a},e.markTimespan=function(t){var a=!1;this._els.dhx_cal_data||(e.get_elements(),a=!0);var i=e._marked_timespans_ids,n=e._marked_timespans_types,r=e._marked_timespans;
e.deleteMarkedTimespan(),e.addMarkedTimespan(t);var s=e._mark_timespans();return a&&(e._els=[]),e._marked_timespans_ids=i,e._marked_timespans_types=n,e._marked_timespans=r,s},e.unmarkTimespan=function(e){if(e)for(var t=0;t<e.length;t++){var a=e[t];a.parentNode&&a.parentNode.removeChild(a)}},e._addMarkerTimespanConfig=function(t){var a="global",i=e._marked_timespans,n=t.id,r=e._marked_timespans_ids;r[n]||(r[n]=[]);var s=t.days,d=t.sections,o=t.type;if(t.id=n,d){for(var l in d)if(d.hasOwnProperty(l)){
i[l]||(i[l]={});var _=d[l],h=i[l];h[_]||(h[_]={}),h[_][s]||(h[_][s]={}),h[_][s][o]||(h[_][s][o]=[],e._marked_timespans_types||(e._marked_timespans_types={}),e._marked_timespans_types[o]||(e._marked_timespans_types[o]=!0));var c=h[_][s][o];t._array=c,c.push(t),r[n].push(t)}}else{i[a][s]||(i[a][s]={}),i[a][s][o]||(i[a][s][o]=[]),e._marked_timespans_types||(e._marked_timespans_types={}),e._marked_timespans_types[o]||(e._marked_timespans_types[o]=!0);var c=i[a][s][o];t._array=c,c.push(t),r[n].push(t);
}},e._marked_timespans_ids={},e.addMarkedTimespan=function(t){var a=e._prepare_timespan_options(t);if(a.length){for(var i=a[0].id,n=0;n<a.length;n++)e._addMarkerTimespanConfig(a[n]);return i}},e._add_timespan_zones=function(e,t){var a=e.slice();if(t=t.slice(),!a.length)return t;for(var i=0;i<a.length;i+=2)for(var n=a[i],r=a[i+1],s=i+2==a.length,d=0;d<t.length;d+=2){var o=t[d],l=t[d+1];if(l>r&&r>=o||n>o&&l>=n)a[i]=Math.min(n,o),a[i+1]=Math.max(r,l),i-=2;else{if(!s)continue;var _=n>o?0:2;a.splice(i+_,0,o,l);
}t.splice(d--,2);break}return a},e._subtract_timespan_zones=function(e,t){for(var a=e.slice(),i=0;i<a.length;i+=2)for(var n=a[i],r=a[i+1],s=0;s<t.length;s+=2){var d=t[s],o=t[s+1];if(o>n&&r>d){var l=!1;n>=d&&o>=r&&a.splice(i,2),d>n&&(a.splice(i,2,n,d),l=!0),r>o&&a.splice(l?i+2:i,l?0:2,o,r),i-=2;break}}return a},e.invertZones=function(t){return e._subtract_timespan_zones([0,1440],t.slice())},e._delete_marked_timespan_by_id=function(t){var a=e._marked_timespans_ids[t];if(a)for(var i=0;i<a.length;i++)for(var n=a[i],r=n._array,s=0;s<r.length;s++)if(r[s]==n){
r.splice(s,1);break}},e._delete_marked_timespan_by_config=function(t){var a,i=e._marked_timespans,r=t.sections,s=t.days,d=t.type||n;if(r){for(var o in r)if(r.hasOwnProperty(o)&&i[o]){var l=r[o];i[o][l]&&(a=i[o][l])}}else a=i.global;if(a)if(void 0!==s)a[s]&&a[s][d]&&(e._addMarkerTimespanConfig(t),e._delete_marked_timespans_list(a[s][d],t));else for(var _ in a)if(a[_][d]){var h=e._lame_clone(t);t.days=_,e._addMarkerTimespanConfig(h),e._delete_marked_timespans_list(a[_][d],t)}},e._delete_marked_timespans_list=function(t,a){
for(var i=0;i<t.length;i++){var n=t[i],r=e._subtract_timespan_zones(n.zones,a.zones);if(r.length)n.zones=r;else{t.splice(i,1),i--;for(var s=e._marked_timespans_ids[n.id],d=0;d<s.length;d++)if(s[d]==n){s.splice(d,1);break}}}},e.deleteMarkedTimespan=function(t){if(arguments.length||(e._marked_timespans={global:{}},e._marked_timespans_ids={},e._marked_timespans_types={}),"object"!=typeof t)e._delete_marked_timespan_by_id(t);else{t.start_date&&t.end_date||(void 0!==t.days||t.type||(t.days="fullweek"),
t.zones||(t.zones="fullday"));var a=[];if(t.type)a.push(t.type);else for(var i in e._marked_timespans_types)a.push(i);for(var n=e._prepare_timespan_options(t),r=0;r<n.length;r++)for(var s=n[r],d=0;d<a.length;d++){var o=e._lame_clone(s);o.type=a[d],e._delete_marked_timespan_by_config(o)}}},e._get_types_to_render=function(t,a){var i=t?e._lame_copy({},t):{};for(var n in a||{})a.hasOwnProperty(n)&&(i[n]=a[n]);return i},e._get_configs_to_render=function(e){var t=[];for(var a in e)e.hasOwnProperty(a)&&t.push.apply(t,e[a]);
return t},e._on_scale_add_marker=function(t,a){if(!e._table_view||"month"==e._mode){var i=a.getDay(),n=a.valueOf(),r=this._mode,s=e._marked_timespans,d=[],o=[];if(this._props&&this._props[r]){var l=this._props[r],_=l.options,h=e._get_unit_index(l,a),c=_[h];if(l.days>1){var u=864e5,v=Math.round((a-e._min_date)/u);a=e.date.add(e._min_date,Math.floor(v/_.length),"day"),a=e.date.date_part(a)}else a=e.date.date_part(new Date(this._date));if(i=a.getDay(),n=a.valueOf(),s[r]&&s[r][c.key]){var f=s[r][c.key],g=e._get_types_to_render(f[i],f[n]);
d.push.apply(d,e._get_configs_to_render(g))}}var m=s.global,p=m[n]||m[i];d.push.apply(d,e._get_configs_to_render(p));for(var y=0;y<d.length;y++)o.push.apply(o,e._render_marked_timespan(d[y],t,a));return o}},e.attachEvent("onScaleAdd",function(){e._on_scale_add_marker.apply(e,arguments)}),e.dblclick_dhx_marked_timespan=function(t,a){e.callEvent("onScaleDblClick",[e.getActionData(t).date,a,t]),e.config.dblclick_create&&e.addEventNow(e.getActionData(t).date,null,t)}},e._temp_limit_scope()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.xy.map_date_width=188,e.xy.map_description_width=400,e.config.map_resolve_event_location=!0,e.config.map_resolve_user_location=!0,e.config.map_initial_position=new google.maps.LatLng(48.724,8.215),e.config.map_error_position=new google.maps.LatLng(15,15),e.config.map_infowindow_max_width=300,e.config.map_type=google.maps.MapTypeId.ROADMAP,e.config.map_zoom_after_resolve=15,e.locale.labels.marker_geo_success="It seems you are here.",e.locale.labels.marker_geo_fail="Sorry, could not get your current position using geolocation.",
e.templates.marker_date=e.date.date_to_str("%Y-%m-%d %H:%i"),e.templates.marker_text=function(t,a,i){return"<div><b>"+i.text+"</b><br/><br/>"+(i.event_location||"")+"<br/><br/>"+e.templates.marker_date(t)+" - "+e.templates.marker_date(a)+"</div>"},e.dblclick_dhx_map_area=function(){!this.config.readonly&&this.config.dblclick_create&&this.addEventNow({start_date:e._date,end_date:e.date.add(e._date,e.config.time_step,"minute")})},e.templates.map_time=function(t,a,i){return i._timed?this.day_date(i.start_date,i.end_date,i)+" "+this.event_date(t):e.templates.day_date(t)+" &ndash; "+e.templates.day_date(a);
},e.templates.map_text=function(e,t,a){return a.text},e.date.map_start=function(e){return e},e.date.add_map=function(e,t,a){return new Date(e.valueOf())},e.templates.map_date=function(e,t,a){return""},e._latLngUpdate=!1,e.attachEvent("onSchedulerReady",function(){function t(t){if(t){var a=e.locale.labels;e._els.dhx_cal_header[0].innerHTML="<div class='dhx_map_line' style='width: "+(e.xy.map_date_width+e.xy.map_description_width+2)+"px;' ><div class='headline_date' style='width: "+e.xy.map_date_width+"px;'>"+a.date+"</div><div class='headline_description' style='width: "+e.xy.map_description_width+"px;'>"+a.description+"</div></div>",
e._table_view=!0,e.set_sizes()}}function a(){e._selected_event_id=null,e.map._infowindow.close();var t=e.map._markers;for(var a in t)t.hasOwnProperty(a)&&(t[a].setMap(null),delete e.map._markers[a],e.map._infowindows_content[a]&&delete e.map._infowindows_content[a])}function i(){var t=e.get_visible_events();t.sort(function(e,t){return e.start_date.valueOf()==t.start_date.valueOf()?e.id>t.id?1:-1:e.start_date>t.start_date?1:-1});for(var a=e._waiAria.mapAttrString(),i="<div "+a+" class='dhx_map_area'>",n=0;n<t.length;n++){
var r=t[n],s=r.id==e._selected_event_id?"dhx_map_line highlight":"dhx_map_line",d=r.color?"background:"+r.color+";":"",o=r.textColor?"color:"+r.textColor+";":"",a=e._waiAria.mapRowAttrString(r),l=e._waiAria.mapDetailsBtnString();i+="<div "+a+" class='"+s+"' event_id='"+r.id+"' style='"+d+o+(r._text_style||"")+" width: "+(e.xy.map_date_width+e.xy.map_description_width+2)+"px;'><div style='width: "+e.xy.map_date_width+"px;' >"+e.templates.map_time(r.start_date,r.end_date,r)+"</div>",i+="<div "+l+" class='dhx_event_icon icon_details'>&nbsp</div>",
i+="<div class='line_description' style='width:"+(e.xy.map_description_width-25)+"px;'>"+e.templates.map_text(r.start_date,r.end_date,r)+"</div></div>"}i+="<div class='dhx_v_border' style='left: "+(e.xy.map_date_width-2)+"px;'></div><div class='dhx_v_border_description'></div></div>",e._els.dhx_cal_data[0].scrollTop=0,e._els.dhx_cal_data[0].innerHTML=i,e._els.dhx_cal_data[0].style.width=e.xy.map_date_width+e.xy.map_description_width+1+"px";var _=e._els.dhx_cal_data[0].firstChild.childNodes;e._els.dhx_cal_date[0].innerHTML=e.templates[e._mode+"_date"](e._min_date,e._max_date,e._mode),
e._rendered=[];for(var n=0;n<_.length-2;n++)e._rendered[n]=_[n]}function n(t){var a=document.getElementById(t),i=e._y-e.xy.nav_height;0>i&&(i=0);var n=e._x-e.xy.map_date_width-e.xy.map_description_width-1;0>n&&(n=0),a.style.height=i+"px",a.style.width=n+"px",a.style.marginLeft=e.xy.map_date_width+e.xy.map_description_width+1+"px",a.style.marginTop=e.xy.nav_height+2+"px"}e._isMapPositionSet=!1;var r=document.createElement("div");r.className="dhx_map",r.id="dhx_gmap",r.style.dispay="none";var s=e._obj;
s.appendChild(r),e._els.dhx_gmap=[],e._els.dhx_gmap.push(r),n("dhx_gmap");var d={zoom:e.config.map_inital_zoom||10,center:e.config.map_initial_position,mapTypeId:e.config.map_type||google.maps.MapTypeId.ROADMAP},o=new google.maps.Map(document.getElementById("dhx_gmap"),d);o.disableDefaultUI=!1,o.disableDoubleClickZoom=!e.config.readonly,google.maps.event.addListener(o,"dblclick",function(t){if(!e.config.readonly&&e.config.dblclick_create){var a=t.latLng;geocoder.geocode({latLng:a},function(t,i){i==google.maps.GeocoderStatus.OK&&(a=t[0].geometry.location,
e.addEventNow({lat:a.lat(),lng:a.lng(),event_location:t[0].formatted_address,start_date:e._date,end_date:e.date.add(e._date,e.config.time_step,"minute")}))})}});var l={content:""};e.config.map_infowindow_max_width&&(l.maxWidth=e.config.map_infowindow_max_width),e.map={_points:[],_markers:[],_infowindow:new google.maps.InfoWindow(l),_infowindows_content:[],_initialization_count:-1,_obj:o},geocoder=new google.maps.Geocoder,e.config.map_resolve_user_location&&navigator.geolocation&&(e._isMapPositionSet||navigator.geolocation.getCurrentPosition(function(t){
var a=new google.maps.LatLng(t.coords.latitude,t.coords.longitude);o.setCenter(a),o.setZoom(e.config.map_zoom_after_resolve||10),e.map._infowindow.setContent(e.locale.labels.marker_geo_success),e.map._infowindow.position=o.getCenter(),e.map._infowindow.open(o),e._isMapPositionSet=!0},function(){e.map._infowindow.setContent(e.locale.labels.marker_geo_fail),e.map._infowindow.setPosition(o.getCenter()),e.map._infowindow.open(o),e._isMapPositionSet=!0})),google.maps.event.addListener(o,"resize",function(e){
r.style.zIndex="5",o.setZoom(o.getZoom())}),google.maps.event.addListener(o,"tilesloaded",function(e){r.style.zIndex="5"}),r.style.display="none",e.attachEvent("onSchedulerResize",function(){return"map"==this._mode?(this.map_view(!0),!1):!0});var _=e.render_data;e.render_data=function(t,a){if("map"!=this._mode)return _.apply(this,arguments);i();for(var n=e.get_visible_events(),r=0;r<n.length;r++)e.map._markers[n[r].id]||h(n[r],!1,!1)},e.map_view=function(r){e.map._initialization_count++;var s,d=e._els.dhx_gmap[0];
if(e._els.dhx_cal_data[0].style.width=e.xy.map_date_width+e.xy.map_description_width+1+"px",e._min_date=e.config.map_start||e._currentDate(),e._max_date=e.config.map_end||e.date.add(e._currentDate(),1,"year"),e._table_view=!0,t(r),r){a(),i(),d.style.display="block",n("dhx_gmap"),s=e.map._obj.getCenter();for(var o=e.get_visible_events(),l=0;l<o.length;l++)e.map._markers[o[l].id]||h(o[l])}else d.style.display="none";google.maps.event.trigger(e.map._obj,"resize"),0===e.map._initialization_count&&s&&e.map._obj.setCenter(s),
e._selected_event_id&&c(e._selected_event_id)};var c=function(t){e.map._obj.setCenter(e.map._points[t]),e.callEvent("onClick",[t])},h=function(t,a,i){var n=e.config.map_error_position;t.lat&&t.lng&&(n=new google.maps.LatLng(t.lat,t.lng));var r=e.templates.marker_text(t.start_date,t.end_date,t);e._new_event||(e.map._infowindows_content[t.id]=r,e.map._markers[t.id]&&e.map._markers[t.id].setMap(null),e.map._markers[t.id]=new google.maps.Marker({position:n,map:e.map._obj}),google.maps.event.addListener(e.map._markers[t.id],"click",function(){
e.map._infowindow.setContent(e.map._infowindows_content[t.id]),e.map._infowindow.open(e.map._obj,e.map._markers[t.id]),e._selected_event_id=t.id,e.render_data()}),e.map._points[t.id]=n,a&&e.map._obj.setCenter(e.map._points[t.id]),i&&e.callEvent("onClick",[t.id]))};e.attachEvent("onClick",function(t,a){if("map"==this._mode){e._selected_event_id=t;for(var i=0;i<e._rendered.length;i++)e._rendered[i].className="dhx_map_line",e._rendered[i].getAttribute("event_id")==t&&(e._rendered[i].className+=" highlight");
e.map._points[t]&&e.map._markers[t]&&(e.map._obj.setCenter(e.map._points[t]),google.maps.event.trigger(e.map._markers[t],"click"))}return!0});var u=function(t){t.event_location&&geocoder?geocoder.geocode({address:t.event_location,language:e.uid().toString()},function(a,i){var n={};i!=google.maps.GeocoderStatus.OK?(n=e.callEvent("onLocationError",[t.id]),n&&n!==!0||(n=e.config.map_error_position)):n=a[0].geometry.location,t.lat=n.lat(),t.lng=n.lng(),e._selected_event_id=t.id,e._latLngUpdate=!0,e.callEvent("onEventChanged",[t.id,t]),
h(t,!0,!0)}):h(t,!0,!0)},v=function(t){t.event_location&&geocoder&&geocoder.geocode({address:t.event_location,language:e.uid().toString()},function(a,i){var n={};i!=google.maps.GeocoderStatus.OK?(n=e.callEvent("onLocationError",[t.id]),n&&n!==!0||(n=e.config.map_error_position)):n=a[0].geometry.location,t.lat=n.lat(),t.lng=n.lng(),e._latLngUpdate=!0,e.callEvent("onEventChanged",[t.id,t])})},f=function(e,t,a,i){setTimeout(function(){var i=e.apply(t,a);return e=t=a=null,i},i||1)};e.attachEvent("onEventChanged",function(t,a){
if(this._latLngUpdate)this._latLngUpdate=!1;else{var i=e.getEvent(t);i.start_date<e._min_date&&i.end_date>e._min_date||i.start_date<e._max_date&&i.end_date>e._max_date||i.start_date.valueOf()>=e._min_date&&i.end_date.valueOf()<=e._max_date?(e.map._markers[t]&&e.map._markers[t].setMap(null),u(i)):(e._selected_event_id=null,e.map._infowindow.close(),e.map._markers[t]&&e.map._markers[t].setMap(null))}return!0}),e.attachEvent("onEventIdChange",function(t,a){var i=e.getEvent(a);return(i.start_date<e._min_date&&i.end_date>e._min_date||i.start_date<e._max_date&&i.end_date>e._max_date||i.start_date.valueOf()>=e._min_date&&i.end_date.valueOf()<=e._max_date)&&(e.map._markers[t]&&(e.map._markers[t].setMap(null),
delete e.map._markers[t]),e.map._infowindows_content[t]&&delete e.map._infowindows_content[t],u(i)),!0}),e.attachEvent("onEventAdded",function(t,a){return e._dataprocessor||(a.start_date<e._min_date&&a.end_date>e._min_date||a.start_date<e._max_date&&a.end_date>e._max_date||a.start_date.valueOf()>=e._min_date&&a.end_date.valueOf()<=e._max_date)&&(e.map._markers[t]&&e.map._markers[t].setMap(null),u(a)),!0}),e.attachEvent("onBeforeEventDelete",function(t,a){return e.map._markers[t]&&e.map._markers[t].setMap(null),
e._selected_event_id=null,e.map._infowindow.close(),!0}),e._event_resolve_delay=1500,e.attachEvent("onEventLoading",function(t){return e.config.map_resolve_event_location&&t.event_location&&!t.lat&&!t.lng&&(e._event_resolve_delay+=1500,f(v,this,[t],e._event_resolve_delay)),!0}),e.attachEvent("onEventCancel",function(t,a){return a&&(e.map._markers[t]&&e.map._markers[t].setMap(null),e.map._infowindow.close()),!0})})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.templates.calendar_month=e.date.date_to_str("%F %Y"),e.templates.calendar_scale_date=e.date.date_to_str("%D"),e.templates.calendar_date=e.date.date_to_str("%d"),e.config.minicalendar={mark_events:!0},e._synced_minicalendars=[],e.renderCalendar=function(t,a,i){var n=null,r=t.date||e._currentDate();if("string"==typeof r&&(r=this.templates.api_date(r)),a)n=this._render_calendar(a.parentNode,r,t,a),e.unmarkCalendar(n);else{var s=t.container,d=t.position;if("string"==typeof s&&(s=document.getElementById(s)),
"string"==typeof d&&(d=document.getElementById(d)),d&&"undefined"==typeof d.left){var o=getOffset(d);d={top:o.top+d.offsetHeight,left:o.left}}s||(s=e._get_def_cont(d)),n=this._render_calendar(s,r,t),n.onclick=function(t){t=t||event;var a=t.target||t.srcElement;if(-1!=a.className.indexOf("dhx_month_head")){var i=a.parentNode.className;if(-1==i.indexOf("dhx_after")&&-1==i.indexOf("dhx_before")){var n=e.templates.xml_date(this.getAttribute("date"));n.setDate(parseInt(a.innerHTML,10)),e.unmarkCalendar(this),
e.markCalendar(this,n,"dhx_calendar_click"),this._last_date=n,this.conf.handler&&this.conf.handler.call(e,n,this)}}}}if(e.config.minicalendar.mark_events)for(var l=e.date.month_start(r),_=e.date.add(l,1,"month"),c=this.getEvents(l,_),h=this["filter_"+this._mode],u={},v=0;v<c.length;v++){var f=c[v];if(!h||h(f.id,f)){var g=f.start_date;for(g.valueOf()<l.valueOf()&&(g=l),g=e.date.date_part(new Date(g.valueOf()));g<f.end_date&&(u[+g]||(u[+g]=!0,this.markCalendar(n,g,"dhx_year_event")),g=this.date.add(g,1,"day"),
!(g.valueOf()>=_.valueOf())););}}return this._markCalendarCurrentDate(n),n.conf=t,t.sync&&!i&&this._synced_minicalendars.push(n),n.conf._on_xle_handler||(n.conf._on_xle_handler=e.attachEvent("onXLE",function(){e.updateCalendar(n,n.conf.date)})),this.config.wai_aria_attributes&&this.config.wai_aria_application_role&&n.setAttribute("role","application"),n},e._get_def_cont=function(e){return this._def_count||(this._def_count=document.createElement("DIV"),this._def_count.className="dhx_minical_popup",
this._def_count.onclick=function(e){(e||event).cancelBubble=!0},document.body.appendChild(this._def_count)),this._def_count.style.left=e.left+"px",this._def_count.style.top=e.top+"px",this._def_count._created=new Date,this._def_count},e._locateCalendar=function(t,a){if("string"==typeof a&&(a=e.templates.api_date(a)),+a>+t._max_date||+a<+t._min_date)return null;for(var i=t.querySelector(".dhx_year_body").childNodes[0],n=0,r=new Date(t._min_date);+this.date.add(r,1,"week")<=+a;)r=this.date.add(r,1,"week"),
n++;var s=e.config.start_on_monday,d=(a.getDay()||(s?7:0))-(s?1:0);return i.rows[n].cells[d].firstChild},e.markCalendar=function(e,t,a){var i=this._locateCalendar(e,t);i&&(i.className+=" "+a)},e.unmarkCalendar=function(e,t,a){if(t=t||e._last_date,a=a||"dhx_calendar_click",t){var i=this._locateCalendar(e,t);i&&(i.className=(i.className||"").replace(RegExp(a,"g")))}},e._week_template=function(t){for(var a=t||250,i=0,n=document.createElement("div"),r=this.date.week_start(e._currentDate()),s=0;7>s;s++)this._cols[s]=Math.floor(a/(7-s)),
this._render_x_header(s,i,r,n),r=this.date.add(r,1,"day"),a-=this._cols[s],i+=this._cols[s];return n.lastChild.className+=" dhx_scale_bar_last",n},e.updateCalendar=function(e,t){e.conf.date=t,this.renderCalendar(e.conf,e,!0)},e._mini_cal_arrows=["&nbsp","&nbsp"],e._render_calendar=function(t,a,i,n){var r=e.templates,s=this._cols;this._cols=[];var d=this._mode;this._mode="calendar";var o=this._colsS;this._colsS={height:0};var l=new Date(this._min_date),_=new Date(this._max_date),c=new Date(e._date),h=r.month_day,u=this._ignores_detected;
this._ignores_detected=0,r.month_day=r.calendar_date,a=this.date.month_start(a);var v,f=this._week_template(t.offsetWidth-1-this.config.minicalendar.padding);n?v=n:(v=document.createElement("DIV"),v.className="dhx_cal_container dhx_mini_calendar"),v.setAttribute("date",this.templates.xml_format(a)),v.innerHTML="<div class='dhx_year_month'></div><div class='dhx_year_grid'><div class='dhx_year_week'>"+(f?f.innerHTML:"")+"</div><div class='dhx_year_body'></div></div>";var g=v.querySelector(".dhx_year_month"),m=v.querySelector(".dhx_year_week"),p=v.querySelector(".dhx_year_body");
if(g.innerHTML=this.templates.calendar_month(a),i.navigation)for(var y=function(t,a){var i=e.date.add(t._date,a,"month");e.updateCalendar(t,i),e._date.getMonth()==t._date.getMonth()&&e._date.getFullYear()==t._date.getFullYear()&&e._markCalendarCurrentDate(t)},b=["dhx_cal_prev_button","dhx_cal_next_button"],x=["left:1px;top:2px;position:absolute;","left:auto; right:1px;top:2px;position:absolute;"],w=[-1,1],k=function(t){return function(){if(i.sync)for(var a=e._synced_minicalendars,n=0;n<a.length;n++)y(a[n],t);else y(v,t);
}},E=[e.locale.labels.prev,e.locale.labels.next],D=0;2>D;D++){var N=document.createElement("DIV");N.className=b[D],e._waiAria.headerButtonsAttributes(N,E[D]),N.style.cssText=x[D],N.innerHTML=this._mini_cal_arrows[D],g.appendChild(N),N.onclick=k(w[D])}v._date=new Date(a),v.week_start=(a.getDay()-(this.config.start_on_monday?1:0)+7)%7;var S=v._min_date=this.date.week_start(a);v._max_date=this.date.add(v._min_date,6,"week"),this._reset_month_scale(p,a,S,6),n||t.appendChild(v),m.style.height=m.childNodes[0].offsetHeight-1+"px";
var A=e.uid();e._waiAria.minicalHeader(g,A),e._waiAria.minicalGrid(v.querySelector(".dhx_year_grid"),A),e._waiAria.minicalRow(m);for(var M=m.querySelectorAll(".dhx_scale_bar"),C=0;C<M.length;C++)e._waiAria.minicalHeadCell(M[C]);for(var O=p.querySelectorAll("td"),T=new Date(S),C=0;C<O.length;C++)e._waiAria.minicalDayCell(O[C],new Date(T)),T=e.date.add(T,1,"day");return e._waiAria.minicalHeader(g,A),this._cols=s,this._mode=d,this._colsS=o,this._min_date=l,this._max_date=_,e._date=c,r.month_day=h,this._ignores_detected=u,
v},e.destroyCalendar=function(t,a){!t&&this._def_count&&this._def_count.firstChild&&(a||(new Date).valueOf()-this._def_count._created.valueOf()>500)&&(t=this._def_count.firstChild),t&&(t.onclick=null,t.innerHTML="",t.parentNode&&t.parentNode.removeChild(t),this._def_count&&(this._def_count.style.top="-1000px"),t.conf&&t.conf._on_xle_handler&&e.detachEvent(t.conf._on_xle_handler))},e.isCalendarVisible=function(){return this._def_count&&parseInt(this._def_count.style.top,10)>0?this._def_count:!1},e._attach_minical_events=function(){
dhtmlxEvent(document.body,"click",function(){e.destroyCalendar()}),e._attach_minical_events=function(){}},e.attachEvent("onTemplatesReady",function(){e._attach_minical_events()}),e.templates.calendar_time=e.date.date_to_str("%d-%m-%Y"),e.form_blocks.calendar_time={render:function(t){var a="<input class='dhx_readonly' type='text' readonly='true'>",i=e.config,n=this.date.date_part(e._currentDate()),r=1440,s=0;i.limit_time_select&&(s=60*i.first_hour,r=60*i.last_hour+1),n.setHours(s/60),t._time_values=[],
a+=" <select>";for(var d=s;r>d;d+=1*this.config.time_step){var o=this.templates.time_picker(n);a+="<option value='"+d+"'>"+o+"</option>",t._time_values.push(d),n=this.date.add(n,this.config.time_step,"minute")}a+="</select>";e.config.full_day;return"<div style='height:30px;padding-top:0; font-size:inherit;' class='dhx_section_time'>"+a+"<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>"+a+"</div>"},set_value:function(t,a,i,n){function r(t,a,i){c(t,a,i),t.value=e.templates.calendar_time(a),
t._date=e.date.date_part(new Date(a))}function s(e){for(var t=n._time_values,a=60*e.getHours()+e.getMinutes(),i=a,r=!1,s=0;s<t.length;s++){var d=t[s];if(d===a){r=!0;break}a>d&&(i=d)}return r||i?r?a:i:-1}var d,o,l=t.getElementsByTagName("input"),_=t.getElementsByTagName("select"),c=function(t,a,i){t.onclick=function(){e.destroyCalendar(null,!0),e.renderCalendar({position:t,date:new Date(this._date),navigation:!0,handler:function(a){t.value=e.templates.calendar_time(a),t._date=new Date(a),e.destroyCalendar(),
e.config.event_duration&&e.config.auto_end_date&&0===i&&f()}})}};if(e.config.full_day){if(!t._full_day){var h="<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> "+e.locale.labels.full_day+"&nbsp;</label></input>";e.config.wide_form||(h=t.previousSibling.innerHTML+h),t.previousSibling.innerHTML=h,t._full_day=!0}var u=t.previousSibling.getElementsByTagName("input")[0],v=0===e.date.time_part(i.start_date)&&0===e.date.time_part(i.end_date);u.checked=v,_[0].disabled=u.checked,
_[1].disabled=u.checked,u.onclick=function(){if(u.checked===!0){var a={};e.form_blocks.calendar_time.get_value(t,a),d=e.date.date_part(a.start_date),o=e.date.date_part(a.end_date),(+o==+d||+o>=+d&&(0!==i.end_date.getHours()||0!==i.end_date.getMinutes()))&&(o=e.date.add(o,1,"day"))}var n=d||i.start_date,s=o||i.end_date;r(l[0],n),r(l[1],s),_[0].value=60*n.getHours()+n.getMinutes(),_[1].value=60*s.getHours()+s.getMinutes(),_[0].disabled=u.checked,_[1].disabled=u.checked}}if(e.config.event_duration&&e.config.auto_end_date){
var f=function(){d=e.date.add(l[0]._date,_[0].value,"minute"),o=new Date(d.getTime()+60*e.config.event_duration*1e3),l[1].value=e.templates.calendar_time(o),l[1]._date=e.date.date_part(new Date(o)),_[1].value=60*o.getHours()+o.getMinutes()};_[0].onchange=f}r(l[0],i.start_date,0),r(l[1],i.end_date,1),c=function(){},_[0].value=s(i.start_date),_[1].value=s(i.end_date)},get_value:function(t,a){var i=t.getElementsByTagName("input"),n=t.getElementsByTagName("select");return a.start_date=e.date.add(i[0]._date,n[0].value,"minute"),
a.end_date=e.date.add(i[1]._date,n[1].value,"minute"),a.end_date<=a.start_date&&(a.end_date=e.date.add(a.start_date,e.config.time_step,"minute")),{start_date:new Date(a.start_date),end_date:new Date(a.end_date)}},focus:function(e){}},e.linkCalendar=function(t,a){var i=function(){var i=e._date,n=new Date(i.valueOf());return a&&(n=a(n)),n.setDate(1),e.updateCalendar(t,n),!0};e.attachEvent("onViewChange",i),e.attachEvent("onXLE",i),e.attachEvent("onEventAdded",i),e.attachEvent("onEventChanged",i),e.attachEvent("onAfterEventDelete",i),
i()},e._markCalendarCurrentDate=function(t){var a=e._date,i=e._mode,n=e.date.month_start(new Date(t._date)),r=e.date.add(n,1,"month");if("day"==i||this._props&&this._props[i])n.valueOf()<=a.valueOf()&&r>a&&e.markCalendar(t,a,"dhx_calendar_click");else if("week"==i)for(var s=e.date.week_start(new Date(a.valueOf())),d=0;7>d;d++)n.valueOf()<=s.valueOf()&&r>s&&e.markCalendar(t,s,"dhx_calendar_click"),s=e.date.add(s,1,"day")},e.attachEvent("onEventCancel",function(){e.destroyCalendar(null,!0)})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.attachEvent("onTemplatesReady",function(){e.xy.scroll_width=0;var t=e.render_view_data;e.render_view_data=function(){var a=this._els.dhx_cal_data[0];a.firstChild._h_fix=!0,t.apply(e,arguments);var i=parseInt(a.style.height);a.style.height="1px",a.style.height=a.scrollHeight+"px",this._obj.style.height=this._obj.clientHeight+a.scrollHeight-i+"px"};var a=e._reset_month_scale;e._reset_month_scale=function(t,i,n,r){var s={clientHeight:100};a.apply(e,[s,i,n,r]),t.innerHTML=s.innerHTML;
}})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.config.multisection=!0,e.config.multisection_shift_all=!0,e.config.section_delimiter=",",e.attachEvent("onSchedulerReady",function(){e._inited_multisection_copies||(e.attachEvent("onEventIdChange",function(e,t){var a=this._multisection_copies;if(a&&a[e]&&!a[t]){var i=a[e];delete a[e],a[t]=i}}),e._inited_multisection_copies=!0),e._register_copies_array=function(e){for(var t=0;t<e.length;t++)this._register_copy(e[t])},e._register_copy=function(e){this._multisection_copies[e.id]||(this._multisection_copies[e.id]={});
var t=e[this._get_section_property()],a=this._multisection_copies[e.id];a[t]||(a[t]=e)},e._get_copied_event=function(t,a){if(!this._multisection_copies[t])return null;if(this._multisection_copies[t][a])return this._multisection_copies[t][a];var i=this._multisection_copies[t];if(e._drag_event&&e._drag_event._orig_section&&i[e._drag_event._orig_section])return i[e._drag_event._orig_section];var n=1/0,r=null;for(var s in i)i[s]._sorder<n&&(r=i[s],n=i[s]._sorder);return r},e._clear_copied_events=function(){
this._multisection_copies={}},e._restore_render_flags=function(t){for(var a=this._get_section_property(),i=0;i<t.length;i++){var n=t[i],r=e._get_copied_event(n.id,n[a]);if(r)for(var s in r)0===s.indexOf("_")&&(n[s]=r[s])}};var t=e._update_unit_section;e._update_unit_section=function(a){return e._update_sections(a,t)};var a=e._update_timeline_section;e._update_timeline_section=function(t){return e._update_sections(t,a)},e.isMultisectionEvent=function(e){if(e&&this._get_multisection_view()){var t=this._get_event_sections(e);
return t.length>1}return!1},e._get_event_sections=function(e){var t=this._get_section_property(),a=e[t]||"";return this._parse_event_sections(a)},e._parse_event_sections=function(t){return t instanceof Array?t:t.toString().split(e.config.section_delimiter)},e._clear_copied_events(),e._split_events=function(t){var a=[],i=this._get_multisection_view(),n=this._get_section_property();if(i)for(var r=0;r<t.length;r++){var s=this._get_event_sections(t[r]);if(s.length>1){for(var d=0;d<s.length;d++)if("undefined"!=typeof i.order[s[d]]){
var o=e._copy_event(t[r]);o[n]=s[d],a.push(o)}}else a.push(t[r])}else a=t;return a},e._get_multisection_view=function(){return this.config.multisection?e._get_section_view():!1};var i=e.get_visible_events;e.get_visible_events=function(e){this._clear_copied_events();var t=i.apply(this,arguments);if(this._get_multisection_view()){t=this._split_events(t);for(var a=0;a<t.length;a++)this.is_visible_events(t[a])||(t.splice(a,1),a--);this._register_copies_array(t)}return t},e._rendered_events={};var n=e.render_view_data;
e.render_view_data=function(e,t){return this._get_multisection_view()&&e&&(e=this._split_events(e),this._restore_render_flags(e)),n.apply(this,[e,t])},e._update_sections=function(t,a){var i=t.view,n=t.event,r=t.pos;if(e.isMultisectionEvent(n)){if(e._drag_event._orig_section||(e._drag_event._orig_section=r.section),e._drag_event._orig_section!=r.section){var s=i.order[r.section]-i.order[e._drag_event._orig_section];if(s){var d=this._get_event_sections(n),o=[],l=!0;if(e.config.multisection_shift_all)for(var _=0;_<d.length;_++){
var c=e._shift_sections(i,d[_],s);if(null===c){o=d,l=!1;break}o[_]=c}else for(var _=0;_<d.length;_++){if(d[_]==r.section){o=d,l=!1;break}if(d[_]==e._drag_event._orig_section){var c=e._shift_sections(i,d[_],s);if(null===c){o=d,l=!1;break}o[_]=c}else o[_]=d[_]}l&&(e._drag_event._orig_section=r.section),n[e._get_section_property()]=o.join(e.config.section_delimiter)}}}else a.apply(e,[t])},e._shift_sections=function(e,t,a){for(var i=null,n=e.y_unit||e.options,r=0;r<n.length;r++)if(n[r].key==t){i=r;break;
}var s=n[i+a];return s?s.key:null};var r=e._get_blocked_zones;e._get_blocked_zones=function(e,t,a,i,n){if(t&&this.config.multisection){t=this._parse_event_sections(t);for(var s=[],d=0;d<t.length;d++)s=s.concat(r.apply(this,[e,t[d],a,i,n]));return s}return r.apply(this,arguments)};var s=e._check_sections_collision;e._check_sections_collision=function(e,t){if(this.config.multisection&&this._get_section_view()){e=this._split_events([e]),t=this._split_events([t]);for(var a=!1,i=0,n=e.length;n>i&&!a;i++)for(var r=0,d=t.length;d>r;r++)if(s.apply(this,[e[i],t[r]])){
a=!0;break}return a}return s.apply(this,arguments)}})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.form_blocks.multiselect={render:function(e){for(var t="<div class='dhx_multi_select_"+e.name+"' style='overflow: auto; height: "+e.height+"px; position: relative;' >",a=0;a<e.options.length;a++)t+="<label><input type='checkbox' value='"+e.options[a].key+"'/>"+e.options[a].label+"</label>",convertStringToBoolean(e.vertical)&&(t+="<br/>");return t+="</div>"},set_value:function(t,a,i,n){function r(e){for(var a=t.getElementsByTagName("input"),i=0;i<a.length;i++)a[i].checked=!!e[a[i].value];
}for(var s=t.getElementsByTagName("input"),d=0;d<s.length;d++)s[d].checked=!1;var o={};if(i[n.map_to]){for(var l=(i[n.map_to]+"").split(n.delimiter||e.config.section_delimiter||","),d=0;d<l.length;d++)o[l[d]]=!0;r(o)}else{if(e._new_event||!n.script_url)return;var _=document.createElement("div");_.className="dhx_loading",_.style.cssText="position: absolute; top: 40%; left: 40%;",t.appendChild(_);var c=[n.script_url,-1==n.script_url.indexOf("?")?"?":"&","dhx_crosslink_"+n.map_to+"="+i.id+"&uid="+e.uid()].join("");
dhtmlxAjax.get(c,function(e){for(var a=e.doXPath("//data/item"),i={},s=0;s<a.length;s++)i[a[s].getAttribute(n.map_to)]=!0;r(i),t.removeChild(_)})}},get_value:function(t,a,i){for(var n=[],r=t.getElementsByTagName("input"),s=0;s<r.length;s++)r[s].checked&&n.push(r[s].value);return n.join(i.delimiter||e.config.section_delimiter||",")},focus:function(e){}}});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){!function(){function t(e){var t=function(){};return t.prototype=e,t}var a=e._load;e._load=function(e,i){if(e=e||this._load_url,"object"==typeof e)for(var n=t(this._loaded),r=0;r<e.length;r++)this._loaded=new n,a.call(this,e[r],i);else a.apply(this,arguments)}}()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){!function(){function t(e){var t={};for(var a in e)0!==a.indexOf("_")&&(t[a]=e[a]);return d.use_id||delete t.id,t}function a(){clearTimeout(s),s=setTimeout(function(){e.updateView()},1)}function i(e){e._loading=!0,e._not_render=!0,e.callEvent("onXLS",[])}function n(e){e._not_render=!1,e._render_wait&&e.render_view_data(),e._loading=!1,e.callEvent("onXLE",[])}function r(e){return d.use_id?e.id:e.cid}var s,d={use_id:!1};e.backbone=function(s,o){function l(){_.length&&(e.parse(_,"json"),
_=[])}o&&(d=o),s.bind("change",function(t,i){var n=r(t),s=e._events[n]=t.toJSON();s.id=n,e._init_event(s),a()}),s.bind("remove",function(t,a){var i=r(t);e._events[i]&&e.deleteEvent(i)});var _=[];s.bind("add",function(t,a){var i=r(t);if(!e._events[i]){var n=t.toJSON();n.id=i,e._init_event(n),_.push(n),1==_.length&&setTimeout(l,1)}}),s.bind("request",function(t){t instanceof Backbone.Collection&&i(e)}),s.bind("sync",function(t){t instanceof Backbone.Collection&&n(e)}),s.bind("error",function(t){t instanceof Backbone.Collection&&n(e);
}),e.attachEvent("onEventCreated",function(t){var a=new s.model(e.getEvent(t));return e._events[t]=a.toJSON(),e._events[t].id=t,!0}),e.attachEvent("onEventAdded",function(a){if(!s.get(a)){var i=t(e.getEvent(a)),n=new s.model(i),d=r(n);d!=a&&this.changeEventId(a,d),s.add(n),s.trigger("scheduler:add",n)}return!0}),e.attachEvent("onEventChanged",function(a){var i=s.get(a),n=t(e.getEvent(a));return i.set(n),s.trigger("scheduler:change",i),!0}),e.attachEvent("onEventDeleted",function(e){var t=s.get(e);
return t&&(s.trigger("scheduler:remove",t),s.remove(e)),!0})}}()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.load=function(e,t){var a;return"string"==typeof t&&(this._process=t,a=t,t=arguments[2]),this._load_url=e,this._after_call=t,e.$proxy?void e.load(this,"string"==typeof a?a:null):void this._load(e,this._date)},e._dp_init_backup=e._dp_init,e._dp_init=function(e){e._sendData=function(e,t){if(e){if(!this.callEvent("onBeforeDataSending",t?[t,this.getState(t),e]:[null,null,e]))return!1;if(t&&(this._in_progress[t]=(new Date).valueOf()),this.serverProcessor.$proxy){var a="POST"!=this._tMode?"get":"post",i=[];
for(var n in e)i.push({id:n,data:e[n],operation:this.getState(n)});return void this.serverProcessor._send(i,a,this)}var r=new dtmlXMLLoaderObject(this.afterUpdate,this,!0),s=this.serverProcessor+(this._user?getUrlSymbol(this.serverProcessor)+["dhx_user="+this._user,"dhx_version="+this.obj.getUserData(0,"version")].join("&"):"");"POST"!=this._tMode?r.loadXML(s+(-1!=s.indexOf("?")?"&":"?")+this.serialize(e,t)):r.loadXML(s,!0,this.serialize(e,t)),this._waitMode++}},e._updatesToParams=function(e){for(var t={},a=0;a<e.length;a++)t[e[a].id]=e[a].data;
return this.serialize(t)},e._processResult=function(e,t,a){if(200==a.status)t=new dtmlXMLLoaderObject(function(){},this,!0),t.loadXMLString(e),t.xmlDoc=a,this.afterUpdate(this,null,null,null,t);else for(var i in this._in_progress){var n=this.getState(i);this.afterUpdateCallback(i,i,n,null)}},this._dp_init_backup(e)},window.dataProcessor&&(dataProcessor.prototype.init=function(e){this.init_original(e),e._dataprocessor=this,this.setTransactionMode("POST",!0),this.serverProcessor.$proxy||(this.serverProcessor+=(-1!=this.serverProcessor.indexOf("?")?"&":"?")+"editing=true");
})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.attachEvent("onTemplatesReady",function(){function t(t,i,n,r){if(!e.checkEvent("onBeforeExternalDragIn")||e.callEvent("onBeforeExternalDragIn",[t,i,n,r,a])){var s=e.attachEvent("onEventCreated",function(i){e.callEvent("onExternalDragIn",[i,t,a])||(this._drag_mode=this._drag_id=null,this.deleteEvent(i))}),d=e.getActionData(a),o={start_date:new Date(d.date)};if(e.matrix&&e.matrix[e._mode]){var l=e.matrix[e._mode];o[l.y_property]=d.section;var _=e._locate_cell_timeline(a);
o.start_date=l._trace_x[_.x],o.end_date=e.date.add(o.start_date,l.x_step,l.x_unit)}e._props&&e._props[e._mode]&&(o[e._props[e._mode].map_to]=d.section),e.addEventNow(o),e.detachEvent(s)}}var a,i=new dhtmlDragAndDropObject,n=i.stopDrag;i.stopDrag=function(e){return a=e||event,n.apply(this,arguments)},i.addDragLanding(e._els.dhx_cal_data[0],{_drag:function(e,a,i,n){t(e,a,i,n)},_dragIn:function(e,t){return e},_dragOut:function(e){return this}}),dhtmlx.DragControl&&dhtmlx.DragControl.addDrop(e._els.dhx_cal_data[0],{
onDrop:function(e,i,n,r){var s=dhtmlx.DragControl.getMaster(e);a=r,t(e,s,i,r.target||r.srcElement)},onDragIn:function(e,t,a){return t}},!0)})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){!function(){function t(e){return e.replace(k,"\n").replace(w,"")}function a(e,t){e=parseFloat(e),t=parseFloat(t),isNaN(t)||(e-=t);var a=n(e);return e=e-a.width+a.cols*b,isNaN(e)?"auto":100*e/b}function i(e,t,a){e=parseFloat(e),t=parseFloat(t),!isNaN(t)&&a&&(e-=t);var i=n(e);return e=e-i.width+i.cols*b,isNaN(e)?"auto":100*e/(b-(isNaN(t)?0:t))}function n(t){for(var a=0,i=e._els.dhx_cal_header[0].childNodes,n=i[1]?i[1].childNodes:i[0].childNodes,r=0;r<n.length;r++){var s=n[r].style?n[r]:n[r].parentNode,d=parseFloat(s.style.width);
if(!(t>d))break;t-=d+1,a+=d+1}return{width:a,cols:r}}function r(e){return e=parseFloat(e),isNaN(e)?"auto":100*e/x}function s(e,t){return(window.getComputedStyle?window.getComputedStyle(e,null)[t]:e.currentStyle?e.currentStyle[t]:null)||""}function d(t,a){for(var i=parseInt(t.style.left,10),n=0;n<e._cols.length;n++)if(i-=e._cols[n],0>i)return n;return a}function o(t,a){for(var i=parseInt(t.style.top,10),n=0;n<e._colsS.heights.length;n++)if(e._colsS.heights[n]>i)return n;return a}function l(e){return e?"<"+e+">":"";
}function _(e){return e?"</"+e+">":""}function c(e,t,a,i){var n="<"+e+" profile='"+t+"'";return a&&(n+=" header='"+a+"'"),i&&(n+=" footer='"+i+"'"),n+=">"}function h(){var a="",i=e._mode;if(e.matrix&&e.matrix[e._mode]&&(i="cell"==e.matrix[e._mode].render?"matrix":"timeline"),a+="<scale mode='"+i+"' today='"+e._els.dhx_cal_date[0].innerHTML+"'>","week_agenda"==e._mode)for(var n=e._els.dhx_cal_data[0].getElementsByTagName("DIV"),r=0;r<n.length;r++)"dhx_wa_scale_bar"==n[r].className&&(a+="<column>"+t(n[r].innerHTML)+"</column>");else if("agenda"==e._mode||"map"==e._mode){
var n=e._els.dhx_cal_header[0].childNodes[0].childNodes;a+="<column>"+t(n[0].innerHTML)+"</column><column>"+t(n[1].innerHTML)+"</column>"}else if("year"==e._mode)for(var n=e._els.dhx_cal_data[0].childNodes,r=0;r<n.length;r++)a+="<month label='"+t(n[r].childNodes[0].innerHTML)+"'>",a+=f(n[r].childNodes[1].childNodes),a+=u(n[r].childNodes[2]),a+="</month>";else{a+="<x>";var n=e._els.dhx_cal_header[0].childNodes;a+=f(n),a+="</x>";var s=e._els.dhx_cal_data[0];if(e.matrix&&e.matrix[e._mode]){a+="<y>";for(var r=0;r<s.firstChild.rows.length;r++){
var d=s.firstChild.rows[r];a+="<row><![CDATA["+t(d.cells[0].innerHTML)+"]]></row>"}a+="</y>",x=s.firstChild.rows[0].cells[0].offsetHeight}else if("TABLE"==s.firstChild.tagName)a+=u(s);else{for(s=s.childNodes[s.childNodes.length-1];-1==s.className.indexOf("dhx_scale_holder");)s=s.previousSibling;s=s.childNodes,a+="<y>";for(var r=0;r<s.length;r++)a+="\n<row><![CDATA["+t(s[r].innerHTML)+"]]></row>";a+="</y>",x=s[0].offsetHeight}}return a+="</scale>"}function u(e){for(var a="",i=e.firstChild.rows,n=0;n<i.length;n++){
for(var r=[],s=0;s<i[n].cells.length;s++)r.push(i[n].cells[s].firstChild.innerHTML);a+="\n<row height='"+e.firstChild.rows[n].cells[0].offsetHeight+"'><![CDATA["+t(r.join("|"))+"]]></row>",x=e.firstChild.rows[0].cells[0].offsetHeight}return a}function f(a){var i,n="";e.matrix&&e.matrix[e._mode]&&(e.matrix[e._mode].second_scale&&(i=a[1].childNodes),a=a[0].childNodes);for(var r=0;r<a.length;r++)n+="\n<column><![CDATA["+t(a[r].innerHTML)+"]]></column>";if(b=a[0].offsetWidth,i)for(var s=0,d=a[0].offsetWidth,o=1,r=0;r<i.length;r++)n+="\n<column second_scale='"+o+"'><![CDATA["+t(i[r].innerHTML)+"]]></column>",
s+=i[r].offsetWidth,s>=d&&(d+=a[o]?a[o].offsetWidth:0,o++),b=i[0].offsetWidth;return n}function v(n){var l="",_=e._rendered,c=e.matrix&&e.matrix[e._mode];if("agenda"==e._mode||"map"==e._mode)for(var h=0;h<_.length;h++)l+="<event><head><![CDATA["+t(_[h].childNodes[0].innerHTML)+"]]></head><body><![CDATA["+t(_[h].childNodes[2].innerHTML)+"]]></body></event>";else if("week_agenda"==e._mode)for(var h=0;h<_.length;h++)l+="<event day='"+_[h].parentNode.getAttribute("day")+"'><body>"+t(_[h].innerHTML)+"</body></event>";else if("year"==e._mode)for(var _=e.get_visible_events(),h=0;h<_.length;h++){
var u=_[h].start_date;for(u.valueOf()<e._min_date.valueOf()&&(u=e._min_date);u<_[h].end_date;){var f=u.getMonth()+12*(u.getFullYear()-e._min_date.getFullYear())-e.week_starts._month,v=e.week_starts[f]+u.getDate()-1,g=n?s(e._get_year_cell(u),"color"):"",m=n?s(e._get_year_cell(u),"backgroundColor"):"";if(l+="<event day='"+v%7+"' week='"+Math.floor(v/7)+"' month='"+f+"' backgroundColor='"+m+"' color='"+g+"'></event>",u=e.date.add(u,1,"day"),u.valueOf()>=e._max_date.valueOf())break}}else if(c&&"cell"==c.render)for(var _=e._els.dhx_cal_data[0].getElementsByTagName("TD"),h=0;h<_.length;h++){
var g=n?s(_[h],"color"):"",m=n?s(_[h],"backgroundColor"):"";l+="\n<event><body backgroundColor='"+m+"' color='"+g+"'><![CDATA["+t(_[h].innerHTML)+"]]></body></event>"}else for(var h=0;h<_.length;h++){var p,y;if(e.matrix&&e.matrix[e._mode])p=a(_[h].style.left),y=a(_[h].offsetWidth)-1;else{var b=e.config.use_select_menu_space?0:26;p=i(_[h].style.left,b,!0),y=i(_[h].style.width,b)-1}if(!isNaN(1*y)){var w=r(_[h].style.top),k=r(_[h].style.height),E=_[h].className.split(" ")[0].replace("dhx_cal_","");if("dhx_tooltip_line"!==E){
var D=e.getEvent(_[h].getAttribute("event_id"));if(D){var v=D._sday,N=D._sweek,S=D._length||0;if("month"==e._mode)k=parseInt(_[h].offsetHeight,10),w=parseInt(_[h].style.top,10)-e.xy.month_head_height,v=d(_[h],v),N=o(_[h],N);else if(e.matrix&&e.matrix[e._mode]){v=0;var A=_[h].parentNode.parentNode.parentNode;N=A.rowIndex;var C=x;x=_[h].parentNode.offsetHeight,w=r(_[h].style.top),w-=.2*w,x=C}else{if(_[h].parentNode==e._els.dhx_cal_data[0])continue;var M=e._els.dhx_cal_data[0].childNodes[0],O=parseFloat(-1!=M.className.indexOf("dhx_scale_holder")?M.style.left:0);
p+=a(_[h].parentNode.style.left,O)}if(l+="\n<event week='"+N+"' day='"+v+"' type='"+E+"' x='"+p+"' y='"+w+"' width='"+y+"' height='"+k+"' len='"+S+"'>","event"==E){l+="<header><![CDATA["+t(_[h].childNodes[1].innerHTML)+"]]></header>";var g=n?s(_[h].childNodes[2],"color"):"",m=n?s(_[h].childNodes[2],"backgroundColor"):"";l+="<body backgroundColor='"+m+"' color='"+g+"'><![CDATA["+t(_[h].childNodes[2].innerHTML)+"]]></body>"}else{var g=n?s(_[h],"color"):"",m=n?s(_[h],"backgroundColor"):"";l+="<body backgroundColor='"+m+"' color='"+g+"'><![CDATA["+t(_[h].innerHTML)+"]]></body>";
}l+="</event>"}}}}return l}function g(t,a,i,n,r,s){var d=!1;"fullcolor"==n&&(d=!0,n="color"),n=n||"color";var o="";if(t){var u=e._date,f=e._mode;a=e.date[i+"_start"](a),a=e.date["get_"+i+"_end"]?e.date["get_"+i+"_end"](a):e.date.add(a,1,i),o=c("pages",n,r,s);for(var g=new Date(t);+a>+g;g=this.date.add(g,1,i))this.setCurrentView(g,i),o+=l("page")+h().replace("–","-")+v(d)+_("page");o+=_("pages"),this.setCurrentView(u,f)}else o=c("data",n,r,s)+h().replace("–","-")+v(d)+_("data");return o}function m(t,a){
var i=e.uid(),n=document.createElement("div");n.style.display="none",document.body.appendChild(n),n.innerHTML='<form id="'+i+'" method="post" target="_blank" action="'+a+'" accept-charset="utf-8" enctype="application/x-www-form-urlencoded"><input type="hidden" name="mycoolxmlbody"/> </form>',document.getElementById(i).firstChild.value=encodeURIComponent(t),document.getElementById(i).submit(),n.parentNode.removeChild(n)}function p(e,t,a,i,n,r,s){var d="";d="object"==typeof n?y(n):g.apply(this,[e,t,a,n,r,s]),
m(d,i)}function y(e){for(var t="<data>",a=0;a<e.length;a++)t+=e[a].source.getPDFData(e[a].start,e[a].end,e[a].view,e[a].mode,e[a].header,e[a].footer);return t+="</data>"}var b,x,w=new RegExp("<[^>]*>","g"),k=new RegExp("<br[^>]*>","g");e.getPDFData=g,e.toPDF=function(e,t,a,i){return p.apply(this,[null,null,null,e,t,a,i])},e.toPDFRange=function(t,a,i,n,r,s,d){return"string"==typeof t&&(t=e.templates.api_date(t),a=e.templates.api_date(a)),p.apply(this,arguments)}}()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.config.icons_select=["icon_details","icon_delete"],e.config.details_on_create=!0,e.config.show_quick_info=!0,e.xy.menu_width=0,e.attachEvent("onClick",function(t){return e.showQuickInfo(t),!0}),function(){for(var t=["onEmptyClick","onViewChange","onLightbox","onBeforeEventDelete","onBeforeDrag"],a=function(){return e._hideQuickInfo(),!0},i=0;i<t.length;i++)e.attachEvent(t[i],a)}(),e.templates.quick_info_title=function(e,t,a){return a.text.substr(0,50)},e.templates.quick_info_content=function(e,t,a){
return a.details||a.text},e.templates.quick_info_date=function(t,a,i){return e.isOneDayEvent(i)?e.templates.day_date(t,a,i)+" "+e.templates.event_header(t,a,i):e.templates.week_date(t,a,i)},e.showQuickInfo=function(e){if(e!=this._quick_info_box_id&&this.config.show_quick_info){this.hideQuickInfo(!0);var t=this._get_event_counter_part(e);t&&(this._quick_info_box=this._init_quick_info(t),this._fill_quick_data(e),this._show_quick_info(t),this.callEvent("onQuickInfo",[e]))}},e._hideQuickInfo=function(){
e.hideQuickInfo()},e.hideQuickInfo=function(t){var a=this._quick_info_box,i=this._quick_info_box_id;if(this._quick_info_box_id=0,a&&a.parentNode){var n=a.offsetWidth;if(e.config.quick_info_detached)return this.callEvent("onAfterQuickInfo",[i]),a.parentNode.removeChild(a);"auto"==a.style.right?a.style.left=-n+"px":a.style.right=-n+"px",t&&a.parentNode.removeChild(a),this.callEvent("onAfterQuickInfo",[i])}},dhtmlxEvent(window,"keydown",function(t){27==t.keyCode&&e.hideQuickInfo()}),e._show_quick_info=function(t){
var a=e._quick_info_box;e._obj.appendChild(a);var i=a.offsetWidth,n=a.offsetHeight;e.config.quick_info_detached?(a.style.left=t.left-t.dx*(i-t.width)+"px",a.style.top=t.top-(t.dy?n:-t.height)+"px"):(a.style.top=this.xy.scale_height+this.xy.nav_height+20+"px",1==t.dx?(a.style.right="auto",a.style.left=-i+"px",setTimeout(function(){a.style.left="-10px"},1)):(a.style.left="auto",a.style.right=-i+"px",setTimeout(function(){a.style.right="-10px"},1)),a.className=a.className.replace(" dhx_qi_left","").replace(" dhx_qi_right","")+" dhx_qi_"+(1==t.dx?"left":"right"));
},e.attachEvent("onTemplatesReady",function(){if(e.hideQuickInfo(),this._quick_info_box){var t=this._quick_info_box;t.parentNode&&t.parentNode.removeChild(t),this._quick_info_box=null}}),e._quick_info_onscroll_handler=function(t){e.hideQuickInfo()},e._init_quick_info=function(){if(!this._quick_info_box){var t=e.xy,a=this._quick_info_box=document.createElement("div");this._waiAria.quickInfoAttr(a),a.className="dhx_cal_quick_info",e.$testmode&&(a.className+=" dhx_no_animate");var i=this._waiAria.quickInfoHeaderAttrString(),n='<div class="dhx_cal_qi_title" style="height:'+t.quick_info_title+'px" '+i+'><div class="dhx_cal_qi_tcontent"></div><div  class="dhx_cal_qi_tdate"></div></div><div class="dhx_cal_qi_content"></div>';
n+='<div class="dhx_cal_qi_controls" style="height:'+t.quick_info_buttons+'px">';for(var r=e.config.icons_select,s=0;s<r.length;s++){var i=this._waiAria.quickInfoButtonAttrString(this.locale.labels[r[s]]);n+="<div "+i+' class="dhx_qi_big_icon '+r[s]+'" title="'+e.locale.labels[r[s]]+"\"><div class='dhx_menu_icon "+r[s]+"'></div><div>"+e.locale.labels[r[s]]+"</div></div>"}n+="</div>",a.innerHTML=n,dhtmlxEvent(a,"click",function(t){t=t||event,e._qi_button_click(t.target||t.srcElement)}),e.config.quick_info_detached&&(e._detachDomEvent(e._els.dhx_cal_data[0],"scroll",e._quick_info_onscroll_handler),
dhtmlxEvent(e._els.dhx_cal_data[0],"scroll",e._quick_info_onscroll_handler))}return this._quick_info_box},e._qi_button_click=function(t){var a=e._quick_info_box;if(t&&t!=a){var i=e._getClassName(t);if(-1!=i.indexOf("_icon")){var n=e._quick_info_box_id;e._click.buttons[i.split(" ")[1].replace("icon_","")](n)}else e._qi_button_click(t.parentNode)}},e._get_event_counter_part=function(t){for(var a=e.getRenderedEvent(t),i=0,n=0,r=a;r&&r!=e._obj;)i+=r.offsetLeft,n+=r.offsetTop-r.scrollTop,r=r.offsetParent;
if(r){var s=i+a.offsetWidth/2>e._x/2?1:0,d=n+a.offsetHeight/2>e._y/2?1:0;return{left:i,top:n,dx:s,dy:d,width:a.offsetWidth,height:a.offsetHeight}}return 0},e._fill_quick_data=function(t){var a=e.getEvent(t),i=e._quick_info_box;e._quick_info_box_id=t;var n={content:e.templates.quick_info_title(a.start_date,a.end_date,a),date:e.templates.quick_info_date(a.start_date,a.end_date,a)},r=i.firstChild.firstChild;r.innerHTML=n.content;var s=r.nextSibling;s.innerHTML=n.date,e._waiAria.quickInfoHeader(i,[n.content,n.date].join(" "));
var d=i.firstChild.nextSibling;d.innerHTML=e.templates.quick_info_content(a.start_date,a.end_date,a)}});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.attachEvent("onTemplatesReady",function(){function t(e,t,a,i){for(var n=t.getElementsByTagName(e),r=a.getElementsByTagName(e),s=r.length-1;s>=0;s--){var a=r[s];if(i){var d=document.createElement("SPAN");d.className="dhx_text_disabled",d.innerHTML=i(n[s]),a.parentNode.insertBefore(d,a),a.parentNode.removeChild(a)}else a.disabled=!0,t.checked&&(a.checked=!0)}}var a=e.config.lightbox.sections.slice(),i=e.config.buttons_left.slice(),n=e.config.buttons_right.slice();e.attachEvent("onBeforeLightbox",function(t){
if(this.config.readonly_form||this.getEvent(t).readonly){this.config.readonly_active=!0;for(var r=0;r<this.config.lightbox.sections.length;r++)this.config.lightbox.sections[r].focus=!1}else this.config.readonly_active=!1,e.config.lightbox.sections=a.slice(),e.config.buttons_left=i.slice(),e.config.buttons_right=n.slice();var s=this.config.lightbox.sections;if(this.config.readonly_active){for(var r=0;r<s.length;r++)if("recurring"==s[r].type){this.config.readonly_active&&s.splice(r,1);break}for(var d=["dhx_delete_btn","dhx_save_btn"],o=[e.config.buttons_left,e.config.buttons_right],r=0;r<d.length;r++)for(var l=d[r],_=0;_<o.length;_++){
for(var c=o[_],h=-1,u=0;u<c.length;u++)if(c[u]==l){h=u;break}-1!=h&&c.splice(h,1)}}return this.resetLightbox(),!0});var r=e._fill_lightbox;e._fill_lightbox=function(){var a=this.getLightbox();this.config.readonly_active&&(a.style.visibility="hidden",a.style.display="block");var i=r.apply(this,arguments);if(this.config.readonly_active&&(a.style.visibility="",a.style.display="none"),this.config.readonly_active){var n=this.getLightbox(),d=this._lightbox_r=n.cloneNode(!0);d.id=e.uid(),t("textarea",n,d,function(e){
return e.value}),t("input",n,d,!1),t("select",n,d,function(e){return e.options.length?e.options[Math.max(e.selectedIndex||0,0)].text:""}),n.parentNode.insertBefore(d,n),s.call(this,d),e._lightbox&&e._lightbox.parentNode.removeChild(e._lightbox),this._lightbox=d,e.config.drag_lightbox&&(d.firstChild.onmousedown=e._ready_to_dnd),this.setLightboxSize(),d.onclick=function(t){var a=t?t.target:event.srcElement;if(e._getClassName(a)||(a=a.previousSibling),a&&a.className)switch(e._getClassName(a)){case"dhx_cancel_btn":
e.callEvent("onEventCancel",[e._lightbox_id]),e._edit_stop_event(e.getEvent(e._lightbox_id),!1),e.hide_lightbox()}},d.onkeydown=function(t){var a=t||window.event,i=t.target||t.srcElement,n=i.querySelector("[dhx_button]");switch(n||(n=i.parentNode.querySelector(".dhx_custom_button, .dhx_readonly")),(t||a).keyCode){case 32:if((t||a).shiftKey)return;n&&n.click&&n.click();break;case e.keys.edit_cancel:e.cancel_lightbox()}}}return i};var s=e.showCover;e.showCover=function(){this.config.readonly_active||s.apply(this,arguments);
};var d=e.hide_lightbox;e.hide_lightbox=function(){return this._lightbox_r&&(this._lightbox_r.parentNode.removeChild(this._lightbox_r),this._lightbox_r=this._lightbox=null),d.apply(this,arguments)}})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.config.occurrence_timestamp_in_utc=!1,e.config.recurring_workdays=[1,2,3,4,5],e.form_blocks.recurring={_get_node:function(e){return"string"==typeof e&&(e=document.getElementById(e)),"none"==e.style.display&&(e.style.display=""),e},_outer_html:function(e){function t(e){var t,a=document.createElement("div");return a.appendChild(e.cloneNode(!0)),t=a.innerHTML,a=null,t}return e.outerHTML||t(e)},render:function(t){if(t.form){var a=e.form_blocks.recurring,n=a._get_node(t.form),i=a._outer_html(n);
return n.style.display="none",i}return e.__recurring_template},_ds:{},_get_form_node:function(e,t,a){var n=e[t];if(!n)return null;if(n.nodeName)return n;if(n.length)for(var i=0;i<n.length;i++)if(n[i].value==a)return n[i]},_get_node_value:function(e,t,a){var n=e[t];if(!n)return"";if(n.length){if(a){for(var i=[],r=0;r<n.length;r++)n[r].checked&&i.push(n[r].value);return i}for(var r=0;r<n.length;r++)if(n[r].checked)return n[r].value}return n.value?a?[n.value]:n.value:void 0},_get_node_numeric_value:function(t,a){
var n=e.form_blocks.recurring._get_node_value(t,a);return 1*n||0},_set_node_value:function(e,t,a){var n=e[t];if(n)if(n.name==t)n.value=a;else if(n.length)for(var i="object"==typeof a,r=0;r<n.length;r++)(i||n[r].value==a)&&(n[r].checked=i?!!a[n[r].value]:!!a)},_init_set_value:function(t,a,n){function i(e){for(var t=0;t<e.length;t++){var a=e[t];if(a.name)if(p[a.name])if(p[a.name].nodeType){var n=p[a.name];p[a.name]=[n,a]}else p[a.name].push(a);else p[a.name]=a}}function r(){y("dhx_repeat_day").style.display="none",
y("dhx_repeat_week").style.display="none",y("dhx_repeat_month").style.display="none",y("dhx_repeat_year").style.display="none",y("dhx_repeat_"+this.value).style.display="block",e.setLightboxSize()}function s(t){var a=[c(p,"repeat")];for(b[a[0]](a,t);a.length<5;)a.push("");var n="",i=d(p);if("no"==i)t.end=new Date(9999,1,1),n="no";else if("date_of_end"==i)t.end=v(c(p,"date_of_end"));else{e.transpose_type(a.join("_")),n=Math.max(1,c(p,"occurences_count"));var r=0;t.end=e.date.add(new Date(t.start),n+r,a.join("_"));
}return a.join("_")+"#"+n}function d(e){var t=e.end;if(t.length){for(var a=0;a<t.length;a++)if(t[a].checked)return t[a].value&&"on"!=t[a].value?t[a].value:a?2==a?"date_of_end":"occurences_count":"no"}else if(t.value)return t.value;return"no"}function o(e,t){var a=e.end;if(a.length){var n=!!a[0].value&&"on"!=a[0].value;if(n)for(var i=0;i<a.length;i++)a[i].value==t&&(a[i].checked=!0);else{var r=0;switch(t){case"no":r=0;break;case"date_of_end":r=2;break;default:r=1}a[r].checked=!0}}else a.value=t}function l(t,a){
var n=e.form_blocks.recurring._set_node_value,i=t.split("#");switch(t=i[0].split("_"),x[t[0]](t,a),i[1]){case"no":o(p,"no");break;case"":o(p,"date_of_end");var r=a.end;e.config.include_end_by&&(r=e.date.add(r,-1,"day")),n(p,"date_of_end",f(r));break;default:o(p,"occurences_count"),n(p,"occurences_count",i[1])}n(p,"repeat",t[0]);var s=e.form_blocks.recurring._get_form_node(p,"repeat",t[0]);"SELECT"==s.nodeName&&s.onchange?s.onchange():s.onclick&&s.onclick()}var _=e.form_blocks.recurring,c=_._get_node_value,h=_._set_node_value;
e.form_blocks.recurring._ds={start:n.start_date,end:n._end_date};var u=e.date.str_to_date(e.config.repeat_date),v=function(t){var a=u(t);return e.config.include_end_by&&(a=e.date.add(a,1,"day")),a},f=e.date.date_to_str(e.config.repeat_date),g=t.getElementsByTagName("FORM")[0],p={};if(i(g.getElementsByTagName("INPUT")),i(g.getElementsByTagName("SELECT")),!e.config.repeat_date_of_end){var m=e.date.date_to_str(e.config.repeat_date);e.config.repeat_date_of_end=m(e.date.add(e._currentDate(),30,"day"));
}h(p,"date_of_end",e.config.repeat_date_of_end);var y=function(e){return document.getElementById(e)||{style:{}}};e.form_blocks.recurring._get_repeat_code=s;var b={month:function(t,a){var n=e.form_blocks.recurring._get_node_value,i=e.form_blocks.recurring._get_node_numeric_value;"d"==n(p,"month_type")?(t.push(Math.max(1,i(p,"month_count"))),a.start.setDate(n(p,"month_day"))):(t.push(Math.max(1,i(p,"month_count2"))),t.push(n(p,"month_day2")),t.push(Math.max(1,i(p,"month_week2"))),e.config.repeat_precise||a.start.setDate(1)),
a._start=!0},week:function(t,a){var n=e.form_blocks.recurring._get_node_value,i=e.form_blocks.recurring._get_node_numeric_value;t.push(Math.max(1,i(p,"week_count"))),t.push(""),t.push("");for(var r=[],s=n(p,"week_day",!0),d=a.start.getDay(),o=!1,l=0;l<s.length;l++)r.push(s[l]),o=o||s[l]==d;r.length||(r.push(d),o=!0),r.sort(),e.config.repeat_precise?o||(e.transpose_day_week(a.start,r,1,7),a._start=!0):(a.start=e.date.week_start(a.start),a._start=!0),t.push(r.join(","))},day:function(t){var a=e.form_blocks.recurring._get_node_value,n=e.form_blocks.recurring._get_node_numeric_value;
"d"==a(p,"day_type")?t.push(Math.max(1,n(p,"day_count"))):(t.push("week"),t.push(1),t.push(""),t.push(""),t.push(e.config.recurring_workdays.join(",")),t.splice(0,1))},year:function(t,a){var n=e.form_blocks.recurring._get_node_value;"d"==n(p,"year_type")?(t.push("1"),a.start.setMonth(0),a.start.setDate(n(p,"year_day")),a.start.setMonth(n(p,"year_month"))):(t.push("1"),t.push(n(p,"year_day2")),t.push(n(p,"year_week2")),a.start.setDate(1),a.start.setMonth(n(p,"year_month2"))),a._start=!0}},x={week:function(t,a){
var n=e.form_blocks.recurring._set_node_value;n(p,"week_count",t[1]);for(var i=t[4].split(","),r={},s=0;s<i.length;s++)r[i[s]]=!0;n(p,"week_day",r)},month:function(t,a){var n=e.form_blocks.recurring._set_node_value;""===t[2]?(n(p,"month_type","d"),n(p,"month_count",t[1]),n(p,"month_day",a.start.getDate())):(n(p,"month_type","w"),n(p,"month_count2",t[1]),n(p,"month_week2",t[3]),n(p,"month_day2",t[2]))},day:function(t,a){var n=e.form_blocks.recurring._set_node_value;n(p,"day_type","d"),n(p,"day_count",t[1]);
},year:function(t,a){var n=e.form_blocks.recurring._set_node_value;""===t[2]?(n(p,"year_type","d"),n(p,"year_day",a.start.getDate()),n(p,"year_month",a.start.getMonth())):(n(p,"year_type","w"),n(p,"year_week2",t[3]),n(p,"year_day2",t[2]),n(p,"year_month2",a.start.getMonth()))}};e.form_blocks.recurring._set_repeat_code=l;for(var w=0;w<g.elements.length;w++){var k=g.elements[w];switch(k.name){case"repeat":"SELECT"==k.nodeName?k.onchange=r:k.onclick=r}}e._lightbox._rec_init_done=!0},set_value:function(t,a,n){
var i=e.form_blocks.recurring;e._lightbox._rec_init_done||i._init_set_value(t,a,n),t.open=!n.rec_type,this._is_modified_occurence(n)?t.blocked=!0:t.blocked=!1;var r=i._ds;r.start=n.start_date,r.end=n._end_date,i.button_click(0,t.previousSibling.firstChild.firstChild,t,t),a&&i._set_repeat_code(a,r)},get_value:function(t,a){if(t.open){var n=e.form_blocks.recurring._ds,i={};this.formSection("time").getValue(i),n.start=i.start_date,a.rec_type=e.form_blocks.recurring._get_repeat_code(n),n._start?(a.start_date=new Date(n.start),
a._start_date=new Date(n.start),n._start=!1):a._start_date=null,a._end_date=n.end,a.rec_pattern=a.rec_type.split("#")[0]}else a.rec_type=a.rec_pattern="",a._end_date=a.end_date;return a.rec_type},_get_button:function(){var t=e.formSection("recurring").header;return t.firstChild.firstChild},_get_form:function(){return e.formSection("recurring").node},open:function(){var t=e.form_blocks.recurring,a=t._get_form();a.open||t._toggle_block()},close:function(){var t=e.form_blocks.recurring,a=t._get_form();
a.open&&t._toggle_block()},_toggle_block:function(){var t=e.form_blocks.recurring,a=t._get_form(),n=t._get_button();a.open||a.blocked?(a.style.height="0px",n&&(n.style.backgroundPosition="-5px 20px",n.nextSibling.innerHTML=e.locale.labels.button_recurring)):(a.style.height="auto",n&&(n.style.backgroundPosition="-5px 0px",n.nextSibling.innerHTML=e.locale.labels.button_recurring_open)),a.open=!a.open,e.setLightboxSize()},focus:function(e){},button_click:function(t,a,n,i){e.form_blocks.recurring._toggle_block();
}},e._rec_markers={},e._rec_markers_pull={},e._add_rec_marker=function(e,t){e._pid_time=t,this._rec_markers[e.id]=e,this._rec_markers_pull[e.event_pid]||(this._rec_markers_pull[e.event_pid]={}),this._rec_markers_pull[e.event_pid][t]=e},e._get_rec_marker=function(e,t){var a=this._rec_markers_pull[t];return a?a[e]:null},e._get_rec_markers=function(e){return this._rec_markers_pull[e]||[]},e._rec_temp=[],function(){var t=e.addEvent;e.addEvent=function(a,n,i,r,s){var d=t.apply(this,arguments);if(d){var o=e.getEvent(d);
this._is_modified_occurence(o)&&e._add_rec_marker(o,1e3*o.event_length),o.rec_type&&(o.rec_pattern=o.rec_type.split("#")[0])}return d}}(),e.attachEvent("onEventIdChange",function(t,a){if(!this._ignore_call){this._ignore_call=!0,e._rec_markers[t]&&(e._rec_markers[a]=e._rec_markers[t],delete e._rec_markers[t]),e._rec_markers_pull[t]&&(e._rec_markers_pull[a]=e._rec_markers_pull[t],delete e._rec_markers_pull[t]);for(var n=0;n<this._rec_temp.length;n++){var i=this._rec_temp[n];i.event_pid==t&&(i.event_pid=a,
this.changeEventId(i.id,a+"#"+i.id.split("#")[1]))}for(var n in this._rec_markers){var i=this._rec_markers[n];i.event_pid==t&&(i.event_pid=a,i._pid_changed=!0)}var r=e._rec_markers[a];r&&r._pid_changed&&(delete r._pid_changed,setTimeout(function(){e.callEvent("onEventChanged",[a,e.getEvent(a)])},1)),delete this._ignore_call}}),e.attachEvent("onConfirmedBeforeEventDelete",function(e){var t=this.getEvent(e);if(this._is_virtual_event(e)||this._is_modified_occurence(t)&&t.rec_type&&"none"!=t.rec_type){
e=e.split("#");var a=this.uid(),n=e[1]?e[1]:t._pid_time/1e3,i=this._copy_event(t);i.id=a,i.event_pid=t.event_pid||e[0];var r=n;i.event_length=r,i.rec_type=i.rec_pattern="none",this.addEvent(i),this._add_rec_marker(i,1e3*r)}else{t.rec_type&&this._lightbox_id&&this._roll_back_dates(t);var s=this._get_rec_markers(e);for(var d in s)s.hasOwnProperty(d)&&(e=s[d].id,this.getEvent(e)&&this.deleteEvent(e,!0))}return!0}),e.attachEvent("onEventDeleted",function(t,a){!this._is_virtual_event(t)&&this._is_modified_occurence(a)&&(e._events[t]||(a.rec_type=a.rec_pattern="none",
this.setEvent(t,a)))}),e.attachEvent("onEventChanged",function(e){if(this._loading)return!0;var t=this.getEvent(e);if(this._is_virtual_event(e)){var e=e.split("#"),a=this.uid();this._not_render=!0;var n=this._copy_event(t);n.id=a,n.event_pid=e[0];var i=e[1];n.event_length=i,n.rec_type=n.rec_pattern="",this._add_rec_marker(n,1e3*i),this.addEvent(n),this._not_render=!1}else{t.rec_type&&this._lightbox_id&&this._roll_back_dates(t);var r=this._get_rec_markers(e);for(var s in r)r.hasOwnProperty(s)&&(delete this._rec_markers[r[s].id],
this.deleteEvent(r[s].id,!0));delete this._rec_markers_pull[e];for(var d=!1,o=0;o<this._rendered.length;o++)this._rendered[o].getAttribute("event_id")==e&&(d=!0);d||(this._select_id=null)}return!0}),e.attachEvent("onEventAdded",function(e){if(!this._loading){var t=this.getEvent(e);t.rec_type&&!t.event_length&&this._roll_back_dates(t)}return!0}),e.attachEvent("onEventSave",function(e,t,a){var n=this.getEvent(e);return n.rec_type||!t.rec_type||this._is_virtual_event(e)||(this._select_id=null),!0}),
e.attachEvent("onEventCreated",function(e){var t=this.getEvent(e);return t.rec_type||(t.rec_type=t.rec_pattern=t.event_length=t.event_pid=""),!0}),e.attachEvent("onEventCancel",function(e){var t=this.getEvent(e);t.rec_type&&(this._roll_back_dates(t),this.render_view_data())}),e._roll_back_dates=function(e){e.event_length=(e.end_date.valueOf()-e.start_date.valueOf())/1e3,e.end_date=e._end_date,e._start_date&&(e.start_date.setMonth(0),e.start_date.setDate(e._start_date.getDate()),e.start_date.setMonth(e._start_date.getMonth()),
e.start_date.setFullYear(e._start_date.getFullYear()))},e._is_virtual_event=function(e){return-1!=e.toString().indexOf("#")},e._is_modified_occurence=function(e){return e.event_pid&&"0"!=e.event_pid},e._validId=function(e){return!this._is_virtual_event(e)},e.showLightbox_rec=e.showLightbox,e.showLightbox=function(t){var a=this.locale,n=e.config.lightbox_recurring,i=this.getEvent(t),r=i.event_pid,s=this._is_virtual_event(t);s&&(r=t.split("#")[0]);var d=function(t){var a=e.getEvent(t);return a._end_date=a.end_date,
a.end_date=new Date(a.start_date.valueOf()+1e3*a.event_length),e.showLightbox_rec(t)};if((r||1*r===0)&&i.rec_type)return d(t);if(!r||"0"===r||!a.labels.confirm_recurring||"instance"==n||"series"==n&&!s)return this.showLightbox_rec(t);if("ask"==n){var o=this;dhtmlx.modalbox({text:a.labels.confirm_recurring,title:a.labels.title_confirm_recurring,width:"500px",position:"middle",buttons:[a.labels.button_edit_series,a.labels.button_edit_occurrence,a.labels.icon_cancel],callback:function(e){switch(+e){
case 0:return d(r);case 1:return o.showLightbox_rec(t);case 2:return}}})}else d(r)},e.get_visible_events_rec=e.get_visible_events,e.get_visible_events=function(e){for(var t=0;t<this._rec_temp.length;t++)delete this._events[this._rec_temp[t].id];this._rec_temp=[];for(var a=this.get_visible_events_rec(e),n=[],t=0;t<a.length;t++)a[t].rec_type?"none"!=a[t].rec_pattern&&this.repeat_date(a[t],n):n.push(a[t]);return n},function(){var t=e.isOneDayEvent;e.isOneDayEvent=function(e){return e.rec_type?!0:t.call(this,e);
};var a=e.updateEvent;e.updateEvent=function(t){var n=e.getEvent(t);n&&n.rec_type&&(n.rec_pattern=(n.rec_type||"").split("#")[0]),n&&n.rec_type&&!this._is_virtual_event(t)?e.update_view():a.call(this,t)}}(),e.transponse_size={day:1,week:7,month:1,year:12},e.date.day_week=function(e,t,a){e.setDate(1),a=7*(a-1);var n=e.getDay(),i=1*t+a-n+1;e.setDate(a>=i?i+7:i)},e.transpose_day_week=function(t,a,n,i,r){for(var s=(t.getDay()||(e.config.start_on_monday?7:0))-n,d=0;d<a.length;d++)if(a[d]>s)return t.setDate(t.getDate()+1*a[d]-s-(i?n:r));
this.transpose_day_week(t,a,n+i,null,n)},e.transpose_type=function(t){var a="transpose_"+t;if(!this.date[a]){var n=t.split("_"),i=864e5,r="add_"+t,s=this.transponse_size[n[0]]*n[1];if("day"==n[0]||"week"==n[0]){var d=null;if(n[4]&&(d=n[4].split(","),e.config.start_on_monday)){for(var o=0;o<d.length;o++)d[o]=1*d[o]||7;d.sort()}this.date[a]=function(t,a){var n=Math.floor((a.valueOf()-t.valueOf())/(i*s));n>0&&t.setDate(t.getDate()+n*s),d&&e.transpose_day_week(t,d,1,s)},this.date[r]=function(t,a){var n=new Date(t.valueOf());
if(d)for(var i=0;a>i;i++)e.transpose_day_week(n,d,0,s);else n.setDate(n.getDate()+a*s);return n}}else("month"==n[0]||"year"==n[0])&&(this.date[a]=function(t,a){var i=Math.ceil((12*a.getFullYear()+1*a.getMonth()-(12*t.getFullYear()+1*t.getMonth()))/s);i>=0&&t.setMonth(t.getMonth()+i*s),n[3]&&e.date.day_week(t,n[2],n[3])},this.date[r]=function(t,a){var i=new Date(t.valueOf());return i.setMonth(i.getMonth()+a*s),n[3]&&e.date.day_week(i,n[2],n[3]),i})}},e.repeat_date=function(t,a,n,i,r,s){i=i||this._min_date,
r=r||this._max_date;var d=s||-1,o=new Date(t.start_date.valueOf()),l=0;for(!t.rec_pattern&&t.rec_type&&(t.rec_pattern=t.rec_type.split("#")[0]),this.transpose_type(t.rec_pattern),e.date["transpose_"+t.rec_pattern](o,i);o<t.start_date||e._fix_daylight_saving_date(o,i,t,o,new Date(o.valueOf()+1e3*t.event_length)).valueOf()<=i.valueOf()||o.valueOf()+1e3*t.event_length<=i.valueOf();)o=this.date.add(o,1,t.rec_pattern);for(;r>o&&o<t.end_date&&(0>d||d>l);){var _=e.config.occurrence_timestamp_in_utc?Date.UTC(o.getFullYear(),o.getMonth(),o.getDate(),o.getHours(),o.getMinutes(),o.getSeconds()):o.valueOf(),c=this._get_rec_marker(_,t.id);
if(c)n&&("none"!=c.rec_type&&l++,a.push(c));else{var h=new Date(o.valueOf()+1e3*t.event_length),u=this._copy_event(t);if(u.text=t.text,u.start_date=o,u.event_pid=t.id,u.id=t.id+"#"+Math.ceil(_/1e3),u.end_date=h,u.end_date=e._fix_daylight_saving_date(u.start_date,u.end_date,t,o,u.end_date),u._timed=this.isOneDayEvent(u),!u._timed&&!this._table_view&&!this.config.multi_day)return;a.push(u),n||(this._events[u.id]=u,this._rec_temp.push(u)),l++}o=this.date.add(o,1,t.rec_pattern)}},e._fix_daylight_saving_date=function(e,t,a,n,i){
var r=e.getTimezoneOffset()-t.getTimezoneOffset();return r?r>0?new Date(n.valueOf()+1e3*a.event_length-60*r*1e3):new Date(t.valueOf()-60*r*1e3):new Date(i.valueOf())},e.getRecDates=function(t,a){var n="object"==typeof t?t:e.getEvent(t),i=[];if(a=a||100,!n.rec_type)return[{start_date:n.start_date,end_date:n.end_date}];if("none"==n.rec_type)return[];e.repeat_date(n,i,!0,n.start_date,n.end_date,a);for(var r=[],s=0;s<i.length;s++)"none"!=i[s].rec_type&&r.push({start_date:i[s].start_date,end_date:i[s].end_date
});return r},e.getEvents=function(e,t){var a=[];for(var n in this._events){var i=this._events[n];if(i&&i.start_date<t&&i.end_date>e)if(i.rec_pattern){if("none"==i.rec_pattern)continue;var r=[];this.repeat_date(i,r,!0,e,t);for(var s=0;s<r.length;s++)!r[s].rec_pattern&&r[s].start_date<t&&r[s].end_date>e&&!this._rec_markers[r[s].id]&&a.push(r[s])}else this._is_virtual_event(i.id)||a.push(i)}return a},e.config.repeat_date="%m.%d.%Y",e.config.lightbox.sections=[{name:"description",height:130,map_to:"text",
type:"textarea",focus:!0},{name:"recurring",type:"recurring",map_to:"rec_type",button:"recurring"},{name:"time",height:72,type:"time",map_to:"auto"}],e._copy_dummy=function(e){var t=new Date(this.start_date),a=new Date(this.end_date);this.start_date=t,this.end_date=a,this.event_length=this.event_pid=this.rec_pattern=this.rec_type=null},e.config.include_end_by=!1,e.config.lightbox_recurring="ask",e.attachEvent("onClearAll",function(){e._rec_markers={},e._rec_markers_pull={},e._rec_temp=[]}),e.__recurring_template='<div class="dhx_form_repeat"> <form> <div class="dhx_repeat_left"> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="day" />Daily</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="week"/>Weekly</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="month" checked />Monthly</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="repeat" value="year" />Yearly</label> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_center"> <div style="display:none;" id="dhx_repeat_day"> <label><input class="dhx_repeat_radio" type="radio" name="day_type" value="d"/>Every</label><input class="dhx_repeat_text" type="text" name="day_count" value="1" />day<br /> <label><input class="dhx_repeat_radio" type="radio" name="day_type" checked value="w"/>Every workday</label> </div> <div style="display:none;" id="dhx_repeat_week"> Repeat every<input class="dhx_repeat_text" type="text" name="week_count" value="1" />week next days:<br /> <table class="dhx_repeat_days"> <tr> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="1" />Monday</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="4" />Thursday</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="2" />Tuesday</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="5" />Friday</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="3" />Wednesday</label><br /> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="6" />Saturday</label> </td> <td> <label><input class="dhx_repeat_checkbox" type="checkbox" name="week_day" value="0" />Sunday</label><br /><br /> </td> </tr> </table> </div> <div id="dhx_repeat_month"> <label><input class="dhx_repeat_radio" type="radio" name="month_type" value="d"/>Repeat</label><input class="dhx_repeat_text" type="text" name="month_day" value="1" />day every<input class="dhx_repeat_text" type="text" name="month_count" value="1" />month<br /> <label><input class="dhx_repeat_radio" type="radio" name="month_type" checked value="w"/>On</label><input class="dhx_repeat_text" type="text" name="month_week2" value="1" /><select name="month_day2"><option value="1" selected >Monday<option value="2">Tuesday<option value="3">Wednesday<option value="4">Thursday<option value="5">Friday<option value="6">Saturday<option value="0">Sunday</select>every<input class="dhx_repeat_text" type="text" name="month_count2" value="1" />month<br /> </div> <div style="display:none;" id="dhx_repeat_year"> <label><input class="dhx_repeat_radio" type="radio" name="year_type" value="d"/>Every</label><input class="dhx_repeat_text" type="text" name="year_day" value="1" />day<select name="year_month"><option value="0" selected >January<option value="1">February<option value="2">March<option value="3">April<option value="4">May<option value="5">June<option value="6">July<option value="7">August<option value="8">September<option value="9">October<option value="10">November<option value="11">December</select>month<br /> <label><input class="dhx_repeat_radio" type="radio" name="year_type" checked value="w"/>On</label><input class="dhx_repeat_text" type="text" name="year_week2" value="1" /><select name="year_day2"><option value="1" selected >Monday<option value="2">Tuesday<option value="3">Wednesday<option value="4">Thursday<option value="5">Friday<option value="6">Saturday<option value="7">Sunday</select>of<select name="year_month2"><option value="0" selected >January<option value="1">February<option value="2">March<option value="3">April<option value="4">May<option value="5">June<option value="6">July<option value="7">August<option value="8">September<option value="9">October<option value="10">November<option value="11">December</select><br /> </div> </div> <div class="dhx_repeat_divider"></div> <div class="dhx_repeat_right"> <label><input class="dhx_repeat_radio" type="radio" name="end" checked/>No end date</label><br /> <label><input class="dhx_repeat_radio" type="radio" name="end" />After</label><input class="dhx_repeat_text" type="text" name="occurences_count" value="1" />occurrences<br /> <label><input class="dhx_repeat_radio" type="radio" name="end" />End by</label><input class="dhx_repeat_date" type="text" name="date_of_end" value="'+e.config.repeat_date_of_end+'" /><br /> </div> </form> </div> <div style="clear:both"> </div>';
});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e._get_serializable_data=function(){var e={};for(var t in this._events){var a=this._events[t];-1==a.id.toString().indexOf("#")&&(e[a.id]=a)}return e},e.data_attributes=function(){var t=[],a=e.templates.xml_format,n=this._get_serializable_data();for(var i in n){var r=n[i];for(var s in r)"_"!=s.substr(0,1)&&t.push([s,"start_date"==s||"end_date"==s?a:null]);break}return t},e.toXML=function(e){var t=[],a=this.data_attributes(),n=this._get_serializable_data();for(var i in n){
var r=n[i];t.push("<event>");for(var s=0;s<a.length;s++)t.push("<"+a[s][0]+"><![CDATA["+(a[s][1]?a[s][1](r[a[s][0]]):r[a[s][0]])+"]]></"+a[s][0]+">");t.push("</event>")}return(e||"")+"<data>"+t.join("\n")+"</data>"},e._serialize_json_value=function(e){return null===e||"boolean"==typeof e?e=""+e:(e||0===e||(e=""),e='"'+e.toString().replace(/\n/g,"").replace(/\\/g,"\\\\").replace(/\"/g,'\\"')+'"'),e},e.toJSON=function(){var e=[],t="",a=this.data_attributes(),n=this._get_serializable_data();for(var i in n){
for(var r=n[i],s=[],d=0;d<a.length;d++)t=a[d][1]?a[d][1](r[a[d][0]]):r[a[d][0]],s.push(' "'+a[d][0]+'": '+this._serialize_json_value(t));e.push("{"+s.join(",")+"}")}return"["+e.join(",\n")+"]"},e.toICal=function(t){var a="BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//dhtmlXScheduler//NONSGML v2.2//EN\nDESCRIPTION:",n="END:VCALENDAR",i=e.date.date_to_str("%Y%m%dT%H%i%s"),r=e.date.date_to_str("%Y%m%d"),s=[],d=this._get_serializable_data();for(var o in d){var l=d[o];s.push("BEGIN:VEVENT"),l._timed&&(l.start_date.getHours()||l.start_date.getMinutes())?s.push("DTSTART:"+i(l.start_date)):s.push("DTSTART:"+r(l.start_date)),
l._timed&&(l.end_date.getHours()||l.end_date.getMinutes())?s.push("DTEND:"+i(l.end_date)):s.push("DTEND:"+r(l.end_date)),s.push("SUMMARY:"+l.text),s.push("END:VEVENT")}return a+(t||"")+"\n"+s.join("\n")+"\n"+n}});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e._temp_matrix_scope=function(){e.matrix={},e._merge=function(e,t){for(var a in t)"undefined"==typeof e[a]&&(e[a]=t[a])},e.createTimelineView=function(t){e._skin_init(),e._merge(t,{section_autoheight:!0,name:"matrix",x:"time",y:"time",x_step:1,x_unit:"hour",y_unit:"day",y_step:1,x_start:0,x_size:24,y_start:0,y_size:7,render:"cell",dx:200,dy:50,event_dy:e.xy.bar_height-5,event_min_dy:e.xy.bar_height-5,resize_events:!0,fit_events:!0,show_unassigned:!1,second_scale:!1,round_position:!1,
_logic:function(t,a,i){var n={};return e.checkEvent("onBeforeSectionRender")&&(n=e.callEvent("onBeforeSectionRender",[t,a,i])),n}}),t._original_x_start=t.x_start,"day"!=t.x_unit&&(t.first_hour=t.last_hour=0),t._start_correction=t.first_hour?60*t.first_hour*60*1e3:0,t._end_correction=t.last_hour?60*(24-t.last_hour)*60*1e3:0,e.checkEvent("onTimelineCreated")&&e.callEvent("onTimelineCreated",[t]);var a=e.render_data;e.render_data=function(i,n){if(this._mode!=t.name)return a.apply(this,arguments);if(n&&!t.show_unassigned&&"cell"!=t.render)for(var r=0;r<i.length;r++)this.clear_event(i[r]),
this.render_timeline_event.call(this.matrix[this._mode],i[r],!0);else e._renderMatrix.call(t,!0,!0)},e.matrix[t.name]=t,e.templates[t.name+"_cell_value"]=function(e){return e?e.length:""},e.templates[t.name+"_cell_class"]=function(e){return""},e.templates[t.name+"_scalex_class"]=function(e){return""},e.templates[t.name+"_second_scalex_class"]=function(e){return""},e.templates[t.name+"_scaley_class"]=function(e,t,a){return""},e.templates[t.name+"_scale_label"]=function(e,t,a){return t},e.templates[t.name+"_tooltip"]=function(e,t,a){
return a.text},e.templates[t.name+"_date"]=function(t,a){return t.getDay()==a.getDay()&&864e5>a-t||+t==+e.date.date_part(new Date(a))||+e.date.add(t,1,"day")==+a&&0===a.getHours()&&0===a.getMinutes()?e.templates.day_date(t):t.getDay()!=a.getDay()&&864e5>a-t?e.templates.day_date(t)+" &ndash; "+e.templates.day_date(a):e.templates.week_date(t,a)},e.templates[t.name+"_scale_date"]=e.date.date_to_str(t.x_date||e.config.hour_date),e.templates[t.name+"_second_scale_date"]=e.date.date_to_str(t.second_scale&&t.second_scale.x_date?t.second_scale.x_date:e.config.hour_date),
e.date["add_"+t.name+"_private"]=function(a,i){var n=i,r=t.x_unit;if("minute"==t.x_unit||"hour"==t.x_unit){var s=n;"hour"==t.x_unit&&(s*=60),s%1440||(n=s/1440,r="day")}return e.date.add(a,n,r)},e.date["add_"+t.name]=function(a,i,n){var r=e.date["add_"+t.name+"_private"](a,(t.x_length||t.x_size)*t.x_step*i);if("minute"==t.x_unit||"hour"==t.x_unit){var s=t.x_length||t.x_size,d="hour"==t.x_unit?60*t.x_step:t.x_step;if(d*s%1440)if(+e.date.date_part(new Date(a))==+e.date.date_part(new Date(r)))t.x_start+=i*s;else{
var o=1440/(s*d)-1,_=Math.round(o*s);i>0?t.x_start=t.x_start-_:t.x_start=_+t.x_start}}return r},e.date[t.name+"_start"]=function(a){var i=e.date[t.x_unit+"_start"]||e.date.day_start,n=i.call(e.date,a),r=n.getTimezoneOffset();n=e.date.add(n,t.x_step*t.x_start,t.x_unit);var s=n.getTimezoneOffset();return r!=s&&n.setTime(n.getTime()+6e4*(s-r)),n},e.callEvent("onOptionsLoad",[t]),e[t.name+"_view"]=function(a){a?e._set_timeline_dates(t):e._renderMatrix.apply(t,arguments)};var i=new Date;e.date.add(i,t.x_step,t.x_unit).valueOf()-i.valueOf();
e["mouse_"+t.name]=function(a){var i=this._drag_event;this._drag_id&&(i=this.getEvent(this._drag_id)),a.x-=t.dx;var n=e._timeline_drag_date(t,a.x);if(a.x=0,a.force_redraw=!0,a.custom=!0,"move"==this._drag_mode&&this._drag_id&&this._drag_event){var i=this.getEvent(this._drag_id),r=this._drag_event;if(a._ignores=this._ignores_detected||t._start_correction||t._end_correction,void 0===r._move_delta&&(r._move_delta=(i.start_date-n)/6e4,this.config.preserve_length&&a._ignores&&(r._move_delta=this._get_real_event_length(i.start_date,n,t),
r._event_length=this._get_real_event_length(i.start_date,i.end_date,t))),this.config.preserve_length&&a._ignores){var s=(r._event_length,this._get_fictional_event_length(n,r._move_delta,t,!0));n=new Date(n-s)}else n=e.date.add(n,r._move_delta,"minute")}if("resize"==this._drag_mode&&i&&(this.config.timeline_swap_resize&&this._drag_id&&(this._drag_from_start&&+n>+i.end_date?this._drag_from_start=!1:!this._drag_from_start&&+n<+i.start_date&&(this._drag_from_start=!0)),a.resize_from_start=this._drag_from_start,
!this.config.timeline_swap_resize&&this._drag_id&&this._drag_from_start&&+n>=+e.date.add(i.end_date,-e.config.time_step,"minute")&&(n=e.date.add(i.end_date,-e.config.time_step,"minute"))),t.round_position)switch(this._drag_mode){case"move":this.config.preserve_length||(n=e._timeline_get_rounded_date.call(t,n,!1),"day"==t.x_unit&&(a.custom=!1));break;case"resize":this._drag_event&&((null===this._drag_event._resize_from_start||void 0===this._drag_event._resize_from_start)&&(this._drag_event._resize_from_start=a.resize_from_start),
a.resize_from_start=this._drag_event._resize_from_start,n=e._timeline_get_rounded_date.call(t,n,!this._drag_event._resize_from_start))}this._resolve_timeline_section(t,a),a.section&&this._update_timeline_section({pos:a,event:this.getEvent(this._drag_id),view:t}),a.y=Math.round((this._correct_shift(n,1)-this._min_date)/(6e4*this.config.time_step)),a.shift=this.config.time_step,t.round_position&&"new-size"==this._drag_mode&&n<=this._drag_start&&(a.shift=e.date.add(this._drag_start,t.x_step,t.x_unit)-this._drag_start);
var d=this._is_pos_changed(this._drag_pos,a);return this._drag_pos&&d&&(this._drag_event._dhx_changed=!0),d||this._drag_pos.has_moved||(a.force_redraw=!1),a}},e._prepare_timeline_events=function(t){var a=[];if("cell"==t.render)a=e._timeline_trace_events.call(t);else for(var i=e.get_visible_events(),n=t.order,r=0;r<i.length;r++){var s=i[r],d=s[t.y_property],o=t.order[d];if(t.show_unassigned&&!d){for(var _ in n)if(n.hasOwnProperty(_)){o=n[_],a[o]||(a[o]=[]);var l=e._lame_copy({},s);l[t.y_property]=_,
a[o].push(l)}}else a[o]||(a[o]=[]),a[o].push(s)}return a},e._populate_timeline_rendered=function(t){e._rendered=[];for(var a=t.getElementsByTagName("DIV"),i=0;i<a.length;i++)a[i].getAttribute("event_id")&&e._rendered.push(a[i])},e._get_timeline_event_height=function(e,t){var a=e[t.y_property],i=t.event_dy;return"full"==t.event_dy&&(i=t.section_autoheight?t._section_height[a]-6:t.dy-3),t.resize_events&&(i=Math.max(Math.floor(i/e._count),t.event_min_dy)),i},e._get_timeline_event_y=function(t,a){var i=t,n=2+i*a+(i?2*i:0);
return e.config.cascade_event_display&&(n=2+i*e.config.cascade_event_margin+(i?2*i:0)),n},e.render_timeline_event=function(t,a){var i=t[this.y_property];if(!i)return"";var n=t._sorder,r=e._timeline_getX(t,!1,this),s=e._timeline_getX(t,!0,this),d=e._get_timeline_event_height(t,this),o=d-2;t._inner||"full"!=this.event_dy||(o=(o+2)*(t._count-n)-2);var _=e._get_timeline_event_y(t._sorder,d),l=d+_+2;(!this._events_height[i]||this._events_height[i]<l)&&(this._events_height[i]=l);var c=e.templates.event_class(t.start_date,t.end_date,t);
c="dhx_cal_event_line "+(c||""),t._no_drag_move&&(c+=" no_drag_move");var h=t.color?"background:"+t.color+";":"",u=t.textColor?"color:"+t.textColor+";":"",v=e.templates.event_bar_text(t.start_date,t.end_date,t),f="<div "+e._waiAria.eventBarAttrString(t)+" event_id='"+t.id+"' class='"+c+"' style='"+h+u+"position:absolute; top:"+_+"px; height: "+o+"px; left:"+r+"px; width:"+Math.max(0,s-r)+"px;"+(t._text_style||"")+"'>";if(e.config.drag_resize&&!e.config.readonly){var g="dhx_event_resize",m="<div class='"+g+" "+g+"_start' style='height: "+o+"px;'></div>",p="<div class='"+g+" "+g+"_end' style='height: "+o+"px;'></div>";
f+=(t._no_resize_start?"":m)+(t._no_resize_end?"":p)}if(f+=v+"</div>",!a)return f;var y=document.createElement("DIV");y.innerHTML=f;var x=this.order[i],b=e._els.dhx_cal_data[0].firstChild.rows[x];if(b){var w=b.cells[1].firstChild;e._rendered.push(y.firstChild),w.appendChild(y.firstChild)}},e._timeline_trace_events=function(){for(var t=e.get_visible_events(),a=[],i=0;i<this.y_unit.length;i++)a[i]=[];var n;a[n]||(a[n]=[]);for(var i=0;i<t.length;i++){n=this.order[t[i][this.y_property]];for(var r=0;this._trace_x[r+1]&&t[i].start_date>=this._trace_x[r+1];)r++;
for(;this._trace_x[r]&&t[i].end_date>this._trace_x[r];)a[n][r]||(a[n][r]=[]),a[n][r].push(t[i]),r++}return a},e._timeline_getX=function(t,a,i){var n=0,r=i._step,s=i.round_position,d=0,o=a?t.end_date:t.start_date;o.valueOf()>e._max_date.valueOf()&&(o=e._max_date);var _=o-e._min_date_timeline;if(_>0){var l=e._get_date_index(i,o);e._ignores[l]&&(s=!0);for(var c=0;l>c;c++)n+=e._cols[c];var h=e._timeline_get_rounded_date.apply(i,[o,!1]);s?+o>+h&&a&&(d=e._cols[l]):(_=o-h,i.first_hour||i.last_hour?(_-=i._start_correction,
0>_&&(_=0),d=Math.round(_/r),d>e._cols[l]&&(d=e._cols[l])):d=Math.round(_/r))}return n+=a?0===_||s?d-14:d-12:d+1},e._timeline_get_rounded_date=function(t,a){var i=e._get_date_index(this,t),n=this._trace_x[i];return a&&+t!=+this._trace_x[i]&&(n=this._trace_x[i+1]?this._trace_x[i+1]:e.date.add(this._trace_x[i],this.x_step,this.x_unit)),new Date(n)},e._timeline_skip_ignored=function(t){if(e._ignores_detected)for(var a,i,n,r,s=0;s<t.length;s++){for(r=t[s],n=!1,a=e._get_date_index(this,r.start_date),i=e._get_date_index(this,r.end_date);i>a;){
if(!e._ignores[a]){n=!0;break}a++}n||a!=i||e._ignores[i]||+r.end_date>+this._trace_x[i]&&(n=!0),n||(t.splice(s,1),s--)}},e._timeline_get_events_html=function(t){var a="";if(t&&"cell"!=this.render){e._timeline_skip_ignored.call(this,t),t.sort(this.sort||function(e,t){return e.start_date.valueOf()==t.start_date.valueOf()?e.id>t.id?1:-1:e.start_date>t.start_date?1:-1});for(var i=[],n=t.length,r=0;n>r;r++){var s=t[r];s._inner=!1;var d=this.round_position?e._timeline_get_rounded_date.apply(this,[s.start_date,!1]):s.start_date;
for(this.round_position?e._timeline_get_rounded_date.apply(this,[s.end_date,!0]):s.end_date;i.length;){var o=i[i.length-1];if(!(o.end_date.valueOf()<=d.valueOf()))break;i.splice(i.length-1,1)}for(var _=!1,l=0;l<i.length;l++){var c=i[l];if(c.end_date.valueOf()<=d.valueOf()){_=!0,s._sorder=c._sorder,i.splice(l,1),s._inner=!0;break}}if(i.length&&(i[i.length-1]._inner=!0),!_)if(i.length)if(i.length<=i[i.length-1]._sorder){if(i[i.length-1]._sorder)for(var h=0;h<i.length;h++){for(var u=!1,v=0;v<i.length;v++)if(i[v]._sorder==h){
u=!0;break}if(!u){s._sorder=h;break}}else s._sorder=0;s._inner=!0}else{for(var f=i[0]._sorder,g=1;g<i.length;g++)i[g]._sorder>f&&(f=i[g]._sorder);s._sorder=f+1,s._inner=!1}else s._sorder=0;i.push(s),i.length>(i.max_count||0)?(i.max_count=i.length,s._count=i.length):s._count=s._count?s._count:1}for(var m=0;m<t.length;m++)t[m]._count=i.max_count;for(var p=0;n>p;p++)a+=e.render_timeline_event.call(this,t[p],!1)}return a},e._timeline_y_scale=function(t){var a="<table style='table-layout:fixed;' cellspacing='0' cellpadding='0'>";
e._load_mode&&e._load();for(var i=e._prepare_timeline_events(this),n=0,r=0;r<e._cols.length;r++)n+=e._cols[r];var s=new Date,d=e._cols.length-e._ignores_detected;s=(e.date.add(s,this.x_step*d,this.x_unit)-s-(this._start_correction+this._end_correction)*d)/n,this._step=s,this._summ=n;var o=e._colsS.heights=[],_=[];this._events_height={},this._section_height={};for(var r=0;r<this.y_unit.length;r++){var l=this._logic(this.render,this.y_unit[r],this);e._merge(l,{height:this.dy}),this.section_autoheight&&(this.y_unit.length*l.height<t.offsetHeight&&(l.height=Math.max(l.height,Math.floor((t.offsetHeight-1)/this.y_unit.length))),
this._section_height[this.y_unit[r].key]=l.height),l.td_className||(l.td_className="dhx_matrix_scell"+(e.templates[this.name+"_scaley_class"](this.y_unit[r].key,this.y_unit[r].label,this.y_unit[r])?" "+e.templates[this.name+"_scaley_class"](this.y_unit[r].key,this.y_unit[r].label,this.y_unit[r]):"")),l.td_content||(l.td_content=e.templates[this.name+"_scale_label"](this.y_unit[r].key,this.y_unit[r].label,this.y_unit[r])),e._merge(l,{tr_className:"",style_height:"height:"+l.height+"px;",style_width:"width:"+this.dx+"px;",
summ_width:"width:"+n+"px;",table_className:""});var c=e._timeline_get_events_html.call(this,i[r]);if(this.fit_events){var h=this._events_height[this.y_unit[r].key]||0;l.height=h>l.height?h:l.height,l.style_height="height:"+l.height+"px;",this._section_height[this.y_unit[r].key]=l.height}if(a+="<tr class='"+l.tr_className+"' style='"+l.style_height+"'><td class='"+l.td_className+"' style='"+l.style_width+" height:"+(l.height-1)+"px;' "+e._waiAria.label(l.td_content)+">"+l.td_content+"</td>","cell"==this.render)for(var u=0;u<e._cols.length;u++)a+=e._ignores[u]?"<td></td>":"<td class='dhx_matrix_cell "+e.templates[this.name+"_cell_class"](i[r][u],this._trace_x[u],this.y_unit[r])+"' style='width:"+e._cols[u]+"px'><div style='width:auto'>"+e.templates[this.name+"_cell_value"](i[r][u],this._trace_x[u],this.y_unit[r])+"</div></td>";else{
a+="<td><div style='"+l.summ_width+" "+l.style_height+" position:relative;' class='dhx_matrix_line'>",a+=c,a+="<table class='"+l.table_className+"' cellpadding='0' cellspacing='0' style='"+l.summ_width+" "+l.style_height+"' >";for(var u=0;u<e._cols.length;u++)a+=e._ignores[u]?"<td></td>":"<td class='dhx_matrix_cell "+e.templates[this.name+"_cell_class"](i[r],this._trace_x[u],this.y_unit[r])+"' style='width:"+e._cols[u]+"px'></td>";a+="</table>",a+="</div></td>"}a+="</tr>",_.push(l)}a+="</table>",
this._matrix=i,t.innerHTML=a,e._populate_timeline_rendered(t),this._scales={};for(var v=t.firstChild.rows,f=null,r=0,g=_.length;g>r;r++){f=this.y_unit[r],o.push(_[r].height);var m=f.key,p=this._scales[m]=e._isRender("cell")?v[r]:v[r].childNodes[1].getElementsByTagName("div")[0];e.callEvent("onScaleAdd",[p,m])}},e._timeline_x_dates=function(t){var a=e._min_date,i=e._max_date;e._process_ignores(a,this.x_size,this.x_unit,this.x_step,t);for(var n=(this.x_size+(t?e._ignores_detected:0),0),r=0;+i>+a;)if(this._trace_x[r]=new Date(a),
"month"==this.x_unit&&e.date[this.x_unit+"_start"]&&(a=e.date[this.x_unit+"_start"](new Date(a))),a=e.date.add(a,this.x_step,this.x_unit),e.date[this.x_unit+"_start"]&&(a=e.date[this.x_unit+"_start"](a)),e._ignores[r]||n++,r++,t)if(n<this.x_size&&!(+i>+a))i=e.date["add_"+this.name+"_private"](i,(this.x_length||this.x_size)*this.x_step);else if(n>=this.x_size){e._max_date=a;break}return{total:r,displayed:n}},e._timeline_x_scale=function(t){var a=e.xy.scale_height,i=this._header_resized||e.xy.scale_height;
e._cols=[],e._colsS={height:0},this._trace_x=[];var n=e._x-this.dx-e.xy.scroll_width,r=[this.dx],s=e._els.dhx_cal_header[0];s.style.width=r[0]+n+"px";for(var d=e._min_date_timeline=e._min_date,o=e.config.preserve_scale_length,_=e._timeline_x_dates.call(this,o),l=_.displayed,c=_.total,h=0;c>h;h++)e._ignores[h]?(e._cols[h]=0,l++):e._cols[h]=Math.floor(n/(l-h)),n-=e._cols[h],r[h+1]=r[h]+e._cols[h];if(t.innerHTML="<div></div>",this.second_scale){for(var u=this.second_scale.x_unit,v=[this._trace_x[0]],f=[],g=[this.dx,this.dx],m=0,p=0;p<this._trace_x.length;p++){
var y=this._trace_x[p],x=e._timeline_is_new_interval(u,y,v[m]);x&&(++m,v[m]=y,g[m+1]=g[m]);var b=m+1;f[m]=e._cols[p]+(f[m]||0),g[b]+=e._cols[p]}t.innerHTML="<div></div><div></div>";var w=t.firstChild;w.style.height=i+"px";var k=t.lastChild;k.style.position="relative";for(var E=0;E<v.length;E++){var D=v[E],N=e.templates[this.name+"_second_scalex_class"](D),S=document.createElement("DIV");S.className="dhx_scale_bar dhx_second_scale_bar"+(N?" "+N:""),e.set_xy(S,f[E]-1,i-3,g[E],0),S.innerHTML=e.templates[this.name+"_second_scale_date"](D),
w.appendChild(S)}}e.xy.scale_height=i,t=t.lastChild;for(var C=0;C<this._trace_x.length;C++)if(!e._ignores[C]){d=this._trace_x[C],e._render_x_header(C,r[C],d,t);var M=e.templates[this.name+"_scalex_class"](d);M&&(t.lastChild.className+=" "+M)}e.xy.scale_height=a;var A=this._trace_x;t.onclick=function(t){var a=e._timeline_locate_hcell(t);a&&e.callEvent("onXScaleClick",[a.x,A[a.x],t||event])},t.ondblclick=function(t){var a=e._timeline_locate_hcell(t);a&&e.callEvent("onXScaleDblClick",[a.x,A[a.x],t||event]);
}},e._timeline_is_new_interval=function(t,a,i){switch(t){case"hour":return a.getHours()!=i.getHours()||e._timeline_is_new_interval("day",a,i);case"day":return!(a.getDate()==i.getDate()&&a.getMonth()==i.getMonth()&&a.getFullYear()==i.getFullYear());case"week":return!(e.date.week_start(new Date(a)).valueOf()==e.date.week_start(new Date(i)).valueOf());case"month":return!(a.getMonth()==i.getMonth()&&a.getFullYear()==i.getFullYear());case"year":return!(a.getFullYear()==i.getFullYear());default:return!1;
}},e._timeline_reset_scale_height=function(t){if(this._header_resized&&(!t||!this.second_scale)){e.xy.scale_height/=2,this._header_resized=!1;var a=e._els.dhx_cal_header[0];a.className=a.className.replace(/ dhx_second_cal_header/gi,"")}},e._timeline_set_full_view=function(t){if(e._timeline_reset_scale_height.call(this,t),t){this.second_scale&&!this._header_resized&&(this._header_resized=e.xy.scale_height,e.xy.scale_height*=2,e._els.dhx_cal_header[0].className+=" dhx_second_cal_header"),e.set_sizes(),
e._init_matrix_tooltip();var a=e._min_date;e._timeline_x_scale.call(this,e._els.dhx_cal_header[0]),e._timeline_y_scale.call(this,e._els.dhx_cal_data[0]),e._min_date=a,e._els.dhx_cal_date[0].innerHTML=e.templates[this.name+"_date"](e._min_date,e._max_date),e._mark_now&&e._mark_now(),e._timeline_reset_scale_height.call(this,t)}e._timeline_hideToolTip()},e._timeline_hideToolTip=function(){e._tooltip&&(e._tooltip.style.display="none",e._tooltip.date="")},e._timeline_showToolTip=function(t,a,i){if("cell"==t.render){
var n=a.x+"_"+a.y,r=t._matrix[a.y][a.x];if(!r)return e._timeline_hideToolTip();if(r.sort(function(e,t){return e.start_date>t.start_date?1:-1}),e._tooltip){if(e._tooltip.date==n)return;e._tooltip.innerHTML=""}else{var s=e._tooltip=document.createElement("DIV");s.className="dhx_year_tooltip",document.body.appendChild(s),s.onclick=e._click.dhx_cal_data}for(var d="",o=0;o<r.length;o++){var _=r[o].color?"background-color:"+r[o].color+";":"",l=r[o].textColor?"color:"+r[o].textColor+";":"";d+="<div class='dhx_tooltip_line' event_id='"+r[o].id+"' style='"+_+l+"'>",
d+="<div class='dhx_tooltip_date'>"+(r[o]._timed?e.templates.event_date(r[o].start_date):"")+"</div>",d+="<div class='dhx_event_icon icon_details'>&nbsp;</div>",d+=e.templates[t.name+"_tooltip"](r[o].start_date,r[o].end_date,r[o])+"</div>"}e._tooltip.style.display="",e._tooltip.style.top="0px",document.body.offsetWidth-i.left-e._tooltip.offsetWidth<0?e._tooltip.style.left=i.left-e._tooltip.offsetWidth+"px":e._tooltip.style.left=i.left+a.src.offsetWidth+"px",e._tooltip.date=n,e._tooltip.innerHTML=d,
document.body.offsetHeight-i.top-e._tooltip.offsetHeight<0?e._tooltip.style.top=i.top-e._tooltip.offsetHeight+a.src.offsetHeight+"px":e._tooltip.style.top=i.top+"px"}},e._matrix_tooltip_handler=function(t){var a=e.matrix[e._mode];if(a&&"cell"==a.render){if(a){var i=e._locate_cell_timeline(t),t=t||event;t.target||t.srcElement;if(i)return e._timeline_showToolTip(a,i,getOffset(i.src))}e._timeline_hideToolTip()}},e._init_matrix_tooltip=function(){e._detachDomEvent(e._els.dhx_cal_data[0],"mouseover",e._matrix_tooltip_handler),
dhtmlxEvent(e._els.dhx_cal_data[0],"mouseover",e._matrix_tooltip_handler)},e._set_timeline_dates=function(t){e._min_date=e.date[t.name+"_start"](new Date(e._date)),e._max_date=e.date["add_"+t.name+"_private"](e._min_date,t.x_size*t.x_step),e.date[t.x_unit+"_start"]&&(e._max_date=e.date[t.x_unit+"_start"](e._max_date)),e._table_view=!0},e._renderMatrix=function(t,a){a||(e._els.dhx_cal_data[0].scrollTop=0),e._set_timeline_dates(this),e._timeline_set_full_view.call(this,t)},e._timeline_html_index=function(t){
for(var a=t.parentNode.childNodes,i=-1,n=0;n<a.length;n++)if(a[n]==t){i=n;break}var r=i;if(e._ignores_detected)for(var s in e._ignores)e._ignores[s]&&r>=1*s&&r++;return r},e._timeline_locate_hcell=function(t){t=t||event;for(var a=t.target?t.target:t.srcElement;a&&"DIV"!=a.tagName;)a=a.parentNode;if(a&&"DIV"==a.tagName){var i=e._getClassName(a).split(" ")[0];if("dhx_scale_bar"==i)return{x:e._timeline_html_index(a),y:-1,src:a,scale:!0}}},e._locate_cell_timeline=function(t){t=t||event;for(var a=t.target?t.target:t.srcElement,i={},n=e.matrix[e._mode],r=e.getActionData(t),s=e._ignores,d=0,o=0;o<n._trace_x.length-1&&!(+r.date<n._trace_x[o+1]);o++)s[o]||d++;
i.x=0===d?0:o,i.y=n.order[r.section];var _=e._isRender("cell")?1:0;i.src=n._scales[r.section]?n._scales[r.section].getElementsByTagName("td")[o+_]:null;for(var l=!1;0===i.x&&"dhx_cal_data"!=e._getClassName(a)&&a.parentNode;){if("dhx_matrix_scell"==e._getClassName(a).split(" ")[0]){l=!0;break}a=a.parentNode}return l?(i.x=-1,i.src=a,i.scale=!0):i.x=o,i};var t=e._click.dhx_cal_data;e._click.dhx_marked_timespan=e._click.dhx_cal_data=function(a){var i=t.apply(this,arguments),n=e.matrix[e._mode];if(n){
var r=e._locate_cell_timeline(a);r&&(r.scale?e.callEvent("onYScaleClick",[r.y,n.y_unit[r.y],a||event]):e.callEvent("onCellClick",[r.x,r.y,n._trace_x[r.x],(n._matrix[r.y]||{})[r.x]||[],a||event]))}return i},e.dblclick_dhx_matrix_cell=function(t){var a=e.matrix[e._mode];if(a){var i=e._locate_cell_timeline(t);i&&(i.scale?e.callEvent("onYScaleDblClick",[i.y,a.y_unit[i.y],t||event]):e.callEvent("onCellDblClick",[i.x,i.y,a._trace_x[i.x],(a._matrix[i.y]||{})[i.x]||[],t||event]))}};var a=e.dblclick_dhx_marked_timespan||function(){};
e.dblclick_dhx_marked_timespan=function(t){var i=e.matrix[e._mode];return i?e.dblclick_dhx_matrix_cell(t):a.apply(this,arguments)},e.dblclick_dhx_matrix_scell=function(t){return e.dblclick_dhx_matrix_cell(t)},e._isRender=function(t){return e.matrix[e._mode]&&e.matrix[e._mode].render==t},e.attachEvent("onCellDblClick",function(t,a,i,n,r){if(!this.config.readonly&&("dblclick"!=r.type||this.config.dblclick_create)){var s=e.matrix[e._mode],d={};d.start_date=s._trace_x[t],d.end_date=s._trace_x[t+1]?s._trace_x[t+1]:e.date.add(s._trace_x[t],s.x_step,s.x_unit),
s._start_correction&&(d.start_date=new Date(1*d.start_date+s._start_correction)),s._end_correction&&(d.end_date=new Date(d.end_date-s._end_correction)),d[s.y_property]=s.y_unit[a].key,e.addEventNow(d,null,r)}}),e.attachEvent("onBeforeDrag",function(t,a,i){return!e._isRender("cell")}),e.attachEvent("onEventChanged",function(e,t){t._timed=this.isOneDayEvent(t)}),e.attachEvent("onBeforeEventChanged",function(e,t,a,i){return e&&(e._move_delta=void 0),i&&(i._move_delta=void 0),!0}),e._is_column_visible=function(t){
var a=e.matrix[e._mode],i=e._get_date_index(a,t);return!e._ignores[i]};var i=e._render_marked_timespan;e._render_marked_timespan=function(t,a,n,r,s){if(!e.config.display_marked_timespans)return[];if(e.matrix&&e.matrix[e._mode]){if(e._isRender("cell"))return;var d=e._lame_copy({},e.matrix[e._mode]);d.round_position=!1;var o=[],_=[],l=[],c=t.sections?t.sections.units||t.sections.timeline:null;if(n)l=[a],_=[n];else{var h=d.order;if(c)h.hasOwnProperty(c)&&(_.push(c),l.push(d._scales[c]));else if(d._scales)for(var u in h)h.hasOwnProperty(u)&&(_.push(u),
l.push(d._scales[u]))}var r=r?new Date(r):e._min_date,s=s?new Date(s):e._max_date;if(r.valueOf()<e._min_date.valueOf()&&(r=new Date(e._min_date)),s.valueOf()>e._max_date.valueOf()&&(s=new Date(e._max_date)),!d._trace_x)return;for(var v=0;v<d._trace_x.length&&!e._is_column_visible(d._trace_x[v]);v++);if(v==d._trace_x.length)return;var f=[];if(t.days>6){var g=new Date(t.days);e.date.date_part(new Date(r))<=+g&&+s>=+g&&f.push(g)}else f.push.apply(f,e._get_dates_by_index(t.days));for(var m=t.zones,p=e._get_css_classes_by_config(t),y=0;y<_.length;y++){
a=l[y],n=_[y];for(var v=0;v<f.length;v++)for(var x=f[v],b=0;b<m.length;b+=2){var w=m[b],k=m[b+1],E=new Date(+x+60*w*1e3),D=new Date(+x+60*k*1e3);if(E=new Date(E.valueOf()+1e3*(E.getTimezoneOffset()-x.getTimezoneOffset())*60),D=new Date(D.valueOf()+1e3*(D.getTimezoneOffset()-x.getTimezoneOffset())*60),D>r&&s>E){var N=e._get_block_by_config(t);N.className=p;var S=e._timeline_getX({start_date:E},!1,d)-1,C=e._timeline_getX({start_date:D},!1,d)-1,M=Math.max(1,C-S-1),A=d._section_height[n]-1||d.dy-1;N.style.cssText="height: "+A+"px; left: "+S+"px; width: "+M+"px; top: 0;",
a.insertBefore(N,a.firstChild),o.push(N)}}}return o}return i.apply(e,[t,a,n])};var n=e._append_mark_now;e._append_mark_now=function(t,a){if(e.matrix&&e.matrix[e._mode]){var i=e._currentDate(),r=e._get_zone_minutes(i),s={days:+e.date.date_part(i),zones:[r,r+1],css:"dhx_matrix_now_time",type:"dhx_now_time"};return e._render_marked_timespan(s)}return n.apply(e,[t,a])};var r=e._mark_timespans;e._mark_timespans=function(){if(e.matrix&&e.matrix[e.getState().mode]){for(var t=[],a=e.matrix[e.getState().mode],i=a.y_unit,n=0;n<i.length;n++){
var s=i[n].key,d=a._scales[s],o=e._on_scale_add_marker(d,s);t.push.apply(t,o)}return t}return r.apply(this,arguments)};var s=e._on_scale_add_marker;e._on_scale_add_marker=function(t,a){if(e.matrix&&e.matrix[e._mode]){var i=[],n=e._marked_timespans;if(n&&e.matrix&&e.matrix[e._mode])for(var r=e._mode,d=e._min_date,o=e._max_date,_=n.global,l=e.date.date_part(new Date(d));o>l;l=e.date.add(l,1,"day")){var c=+l,h=l.getDay(),u=[],v=_[c]||_[h];if(u.push.apply(u,e._get_configs_to_render(v)),n[r]&&n[r][a]){
var f=[],g=e._get_types_to_render(n[r][a][h],n[r][a][c]);f.push.apply(f,e._get_configs_to_render(g)),f.length&&(u=f)}for(var m=0;m<u.length;m++){var p=u[m],y=p.days;7>y?(y=c,i.push.apply(i,e._render_marked_timespan(p,t,a,l,e.date.add(l,1,"day"))),y=h):i.push.apply(i,e._render_marked_timespan(p,t,a,l,e.date.add(l,1,"day")))}}return i}return s.apply(this,arguments)},e._resolve_timeline_section=function(e,t){var a=0,i=0;for(a;a<this._colsS.heights.length&&(i+=this._colsS.heights[a],!(i>t.y));a++);e.y_unit[a]||(a=e.y_unit.length-1),
this._drag_event&&!this._drag_event._orig_section&&(this._drag_event._orig_section=e.y_unit[a].key),t.fields={},a>=0&&e.y_unit[a]&&(t.section=t.fields[e.y_property]=e.y_unit[a].key)},e._update_timeline_section=function(e){var t=e.view,a=e.event,i=e.pos;if(a){if(a[t.y_property]!=i.section){var n=this._get_timeline_event_height(a,t);a._sorder=this._get_dnd_order(a._sorder,n,t._section_height[i.section])}a[t.y_property]=i.section}},e._get_date_index=function(e,t){for(var a=0,i=e._trace_x;a<i.length-1&&+t>=+i[a+1];)a++;
return a},e._timeline_drag_date=function(t,a){var i,n,r=t,s={x:a},d=0,o=0;for(o;o<=this._cols.length-1;o++)if(n=this._cols[o],d+=n,d>s.x){i=(s.x-(d-n))/n,i=0>i?0:i;break}if(r.round_position){var _=1,l=e.getState().drag_mode;l&&"move"!=l&&"create"!=l&&(_=.5),i>=_&&o++,i=0}if(0===o&&this._ignores[0])for(o=1,i=0;this._ignores[o];)o++;else if(o==this._cols.length&&this._ignores[o-1]){for(o=this._cols.length-1,i=0;this._ignores[o];)o--;o++}var c;if(o>=r._trace_x.length)c=e.date.add(r._trace_x[r._trace_x.length-1],r.x_step,r.x_unit),
r._end_correction&&(c=new Date(c-r._end_correction));else{var h=i*n*r._step+r._start_correction;c=new Date(+r._trace_x[o]+h)}return c},e.attachEvent("onBeforeTodayDisplayed",function(){for(var t in e.matrix){var a=e.matrix[t];a.x_start=a._original_x_start}return!0}),e.attachEvent("onOptionsLoad",function(){for(var t in e.matrix){var a=e.matrix[t];a.order={},e.callEvent("onOptionsLoadStart",[]);for(var t=0;t<a.y_unit.length;t++)a.order[a.y_unit[t].key]=t;e.callEvent("onOptionsLoadFinal",[]),e._date&&a.name==e._mode&&e.setCurrentView(e._date,e._mode);
}}),e.attachEvent("onSchedulerResize",function(){if(e.matrix[this._mode]){var t=e.matrix[this._mode];return e._renderMatrix.call(t,!0,!0),!1}return!0}),e.attachEvent("onBeforeDrag",function(t,a,i){if("resize"==a){var n=i.target||i.srcElement,r=e._getClassName(n);r.indexOf("dhx_event_resize_end")<0?e._drag_from_start=!0:e._drag_from_start=!1}return!0})},e._temp_matrix_scope()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){!function(){var t=e.dhtmlXTooltip=e.tooltip={};t.config={className:"dhtmlXTooltip tooltip",timeout_to_display:50,timeout_to_hide:50,delta_x:15,delta_y:-20},t.tooltip=document.createElement("div"),t.tooltip.className=t.config.className,e._waiAria.tooltipAttr(t.tooltip),t.show=function(a,i){if(!e.config.touch||e.config.touch_tooltip){var n=t,r=this.tooltip,s=r.style;n.tooltip.className=n.config.className;var o=this.position(a),d=a.target||a.srcElement;if(!this.isTooltip(d)){
var _=o.x+(n.config.delta_x||0),l=o.y-(n.config.delta_y||0);s.visibility="hidden",s.removeAttribute?(s.removeAttribute("right"),s.removeAttribute("bottom")):(s.removeProperty("right"),s.removeProperty("bottom")),s.left="0",s.top="0",this.tooltip.innerHTML=i,document.body.appendChild(this.tooltip);var c=this.tooltip.offsetWidth,h=this.tooltip.offsetHeight;document.documentElement.clientWidth-_-c<0?(s.removeAttribute?s.removeAttribute("left"):s.removeProperty("left"),s.right=document.documentElement.clientWidth-_+2*(n.config.delta_x||0)+"px"):0>_?s.left=o.x+Math.abs(n.config.delta_x||0)+"px":s.left=_+"px",
document.documentElement.clientHeight-l-h<0?(s.removeAttribute?s.removeAttribute("top"):s.removeProperty("top"),s.bottom=document.documentElement.clientHeight-l-2*(n.config.delta_y||0)+"px"):0>l?s.top=o.y+Math.abs(n.config.delta_y||0)+"px":s.top=l+"px",e._waiAria.tooltipVisibleAttr(this.tooltip),s.visibility="visible",this.tooltip.onmouseleave=function(t){t=t||window.event;for(var a=e.dhtmlXTooltip,i=t.relatedTarget;i!=e._obj&&i;)i=i.parentNode;i!=e._obj&&a.delay(a.hide,a,[],a.config.timeout_to_hide);
},e.callEvent("onTooltipDisplayed",[this.tooltip,this.tooltip.event_id])}}},t._clearTimeout=function(){this.tooltip._timeout_id&&window.clearTimeout(this.tooltip._timeout_id)},t.hide=function(){if(this.tooltip.parentNode){e._waiAria.tooltipHiddenAttr(this.tooltip);var t=this.tooltip.event_id;this.tooltip.event_id=null,this.tooltip.onmouseleave=null,this.tooltip.parentNode.removeChild(this.tooltip),e.callEvent("onAfterTooltip",[t])}this._clearTimeout()},t.delay=function(e,t,a,i){this._clearTimeout(),
this.tooltip._timeout_id=setTimeout(function(){var i=e.apply(t,a);return e=t=a=null,i},i||this.config.timeout_to_display)},t.isTooltip=function(e){for(var t=!1;e&&!t;)t=e.className==this.tooltip.className,e=e.parentNode;return t},t.position=function(e){return e=e||window.event,{x:e.clientX,y:e.clientY}},e.attachEvent("onMouseMove",function(a,i){var n=window.event||i,r=n.target||n.srcElement,s=t,o=s.isTooltip(r),d=s.isTooltipTarget&&s.isTooltipTarget(r);if(a||o||d){var _;if(a||s.tooltip.event_id){
var l=e.getEvent(a)||e.getEvent(s.tooltip.event_id);if(!l)return;if(s.tooltip.event_id=l.id,_=e.templates.tooltip_text(l.start_date,l.end_date,l),!_)return s.hide()}d&&(_="");var c;if(_isIE){c={pageX:void 0,pageY:void 0,clientX:void 0,clientY:void 0,target:void 0,srcElement:void 0};for(var h in c)c[h]=n[h]}if(!e.callEvent("onBeforeTooltip",[a])||!_)return;s.delay(s.show,s,[c||n,_])}else s.delay(s.hide,s,[],s.config.timeout_to_hide)}),e.attachEvent("onBeforeDrag",function(){return t.hide(),!0}),e.attachEvent("onEventDeleted",function(){
return t.hide(),!0})}()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.attachEvent("onTimelineCreated",function(t){"tree"==t.render&&(t.y_unit_original=t.y_unit,t.y_unit=e._getArrayToDisplay(t.y_unit_original),e.attachEvent("onOptionsLoadStart",function(){t.y_unit=e._getArrayToDisplay(t.y_unit_original)}),e.form_blocks[t.name]={render:function(e){var t="<div class='dhx_section_timeline' style='overflow: hidden; height: "+e.height+"px'></div>";return t},set_value:function(t,a,i,n){var r=e._getArrayForSelect(e.matrix[n.type].y_unit_original,n.type);
t.innerHTML="";var s=document.createElement("select");t.appendChild(s);var o=t.getElementsByTagName("select")[0];!o._dhx_onchange&&n.onchange&&(o.onchange=n.onchange,o._dhx_onchange=!0);for(var d=0;d<r.length;d++){var _=document.createElement("option");_.value=r[d].key,_.value==i[e.matrix[n.type].y_property]&&(_.selected=!0),_.innerHTML=r[d].label,o.appendChild(_)}},get_value:function(e,t,a){return e.firstChild.value},focus:function(e){}})}),e.attachEvent("onBeforeSectionRender",function(t,a,i){var n={};
if("tree"==t){var r,s,o,d,_,l;d="dhx_matrix_scell",a.children?(r=i.folder_dy||i.dy,i.folder_dy&&!i.section_autoheight&&(o="height:"+i.folder_dy+"px;"),s="dhx_row_folder",d+=" folder",_="<div class='dhx_scell_expand'>"+(a.open?"-":"+")+"</div>",l=i.folder_events_available?"dhx_data_table folder_events":"dhx_data_table folder"):(r=i.dy,s="dhx_row_item",d+=" item",_="",l="dhx_data_table"),d+=e.templates[i.name+"_scaley_class"](a.key,a.label,a)?" "+e.templates[i.name+"_scaley_class"](a.key,a.label,a):"";
var c="<div class='dhx_scell_level"+a.level+"'>"+_+"<div class='dhx_scell_name'>"+(e.templates[i.name+"_scale_label"](a.key,a.label,a)||a.label)+"</div></div>";n={height:r,style_height:o,tr_className:s,td_className:d,td_content:c,table_className:l}}return n});var t;e.attachEvent("onBeforeEventChanged",function(a,i,n){if(e._isRender("tree"))for(var r=e._get_event_sections?e._get_event_sections(a):[a[e.matrix[e._mode].y_property]],s=0;s<r.length;s++){var o=e.getSection(r[s]);if(o&&o.children&&!e.matrix[e._mode].folder_events_available)return n||(a[e.matrix[e._mode].y_property]=t),
!1}return!0}),e.attachEvent("onBeforeDrag",function(a,i,n){if(e._isRender("tree")){var r,s=e._locate_cell_timeline(n);if(s&&(r=e.matrix[e._mode].y_unit[s.y].key,e.matrix[e._mode].y_unit[s.y].children&&!e.matrix[e._mode].folder_events_available))return!1;var o=e.getEvent(a),d=e.matrix[e._mode].y_property;t=o&&o[d]?o[d]:r}return!0}),e._getArrayToDisplay=function(t){var a=[],i=function(t,n){for(var r=n||0,s=0;s<t.length;s++)t[s].level=r,t[s].children&&"undefined"==typeof t[s].key&&(t[s].key=e.uid()),
a.push(t[s]),t[s].open&&t[s].children&&i(t[s].children,r+1)};return i(t),a},e._getArrayForSelect=function(t,a){var i=[],n=function(t){for(var r=0;r<t.length;r++)e.matrix[a].folder_events_available?i.push(t[r]):t[r].children||i.push(t[r]),t[r].children&&n(t[r].children,a)};return n(t),i},e._toggleFolderDisplay=function(t,a,i){var n,r=function(e,t,a,i){for(var s=0;s<t.length&&(t[s].key!=e&&!i||!t[s].children||(t[s].open="undefined"!=typeof a?a:!t[s].open,n=!0,i||!n));s++)t[s].children&&r(e,t[s].children,a,i);
},s=e.getSection(t);"undefined"!=typeof a||i||(a=!s.open),e.callEvent("onBeforeFolderToggle",[s,a,i])&&(r(t,e.matrix[e._mode].y_unit_original,a,i),e.matrix[e._mode].y_unit=e._getArrayToDisplay(e.matrix[e._mode].y_unit_original),e.callEvent("onOptionsLoad",[]),e.callEvent("onAfterFolderToggle",[s,a,i]))},e.attachEvent("onCellClick",function(t,a,i,n,r){e._isRender("tree")&&(e.matrix[e._mode].folder_events_available||"undefined"!=typeof e.matrix[e._mode].y_unit[a]&&e.matrix[e._mode].y_unit[a].children&&e._toggleFolderDisplay(e.matrix[e._mode].y_unit[a].key));
}),e.attachEvent("onYScaleClick",function(t,a,i){e._isRender("tree")&&a.children&&e._toggleFolderDisplay(a.key)}),e.getSection=function(t){if(e._isRender("tree")){var a,i=function(e,t){for(var n=0;n<t.length;n++)t[n].key==e&&(a=t[n]),t[n].children&&i(e,t[n].children)};return i(t,e.matrix[e._mode].y_unit_original),a||null}},e.deleteSection=function(t){if(e._isRender("tree")){var a=!1,i=function(e,t){for(var n=0;n<t.length&&(t[n].key==e&&(t.splice(n,1),a=!0),!a);n++)t[n].children&&i(e,t[n].children);
};return i(t,e.matrix[e._mode].y_unit_original),e.matrix[e._mode].y_unit=e._getArrayToDisplay(e.matrix[e._mode].y_unit_original),e.callEvent("onOptionsLoad",[]),a}},e.deleteAllSections=function(){e._isRender("tree")&&(e.matrix[e._mode].y_unit_original=[],e.matrix[e._mode].y_unit=e._getArrayToDisplay(e.matrix[e._mode].y_unit_original),e.callEvent("onOptionsLoad",[]))},e.addSection=function(t,a){if(e._isRender("tree")){var i=!1,n=function(e,t,r){if(a)for(var s=0;s<r.length&&(r[s].key==t&&r[s].children&&(r[s].children.push(e),
i=!0),!i);s++)r[s].children&&n(e,t,r[s].children);else r.push(e),i=!0};return n(t,a,e.matrix[e._mode].y_unit_original),e.matrix[e._mode].y_unit=e._getArrayToDisplay(e.matrix[e._mode].y_unit_original),e.callEvent("onOptionsLoad",[]),i}},e.openAllSections=function(){e._isRender("tree")&&e._toggleFolderDisplay(1,!0,!0)},e.closeAllSections=function(){e._isRender("tree")&&e._toggleFolderDisplay(1,!1,!0)},e.openSection=function(t){e._isRender("tree")&&e._toggleFolderDisplay(t,!0)},e.closeSection=function(t){
e._isRender("tree")&&e._toggleFolderDisplay(t,!1)}});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e._props={},e.createUnitsView=function(t,a,i,n,r,s,o){"object"==typeof t&&(i=t.list,a=t.property,n=t.size||0,r=t.step||1,s=t.skip_incorrect,o=t.days||1,t=t.name),e._props[t]={map_to:a,options:i,step:r,position:0,days:o},n>e._props[t].options.length&&(e._props[t]._original_size=n,n=0),e._props[t].size=n,e._props[t].skip_incorrect=s||!1,e.date[t+"_start"]=e.date.day_start,e.templates[t+"_date"]=function(a,i){var n=e._props[t];return n.days>1?e.templates.week_date(a,i):e.templates.day_date(a);
},e._get_unit_index=function(t,a){var i=t.position||0,n=Math.round((e._correct_shift(+a,1)-+e._min_date)/864e5),r=t.options.length;return n>=r&&(n%=r),i+n},e.templates[t+"_scale_text"]=function(e,t,a){return a.css?"<span class='"+a.css+"'>"+t+"</span>":t},e.templates[t+"_scale_date"]=function(a){var i=e._props[t],n=i.options;if(!n.length)return"";var r=e._get_unit_index(i,a),s=n[r];return e.templates[t+"_scale_text"](s.key,s.label,s)},e.templates[t+"_second_scale_date"]=function(t){return e.templates.week_scale_date(t);
},e.date["add_"+t]=function(a,i){return e.date.add(a,i*e._props[t].days,"day")},e.date["get_"+t+"_end"]=function(a){return e.date.add(a,(e._props[t].size||e._props[t].options.length)*e._props[t].days,"day")},e.attachEvent("onOptionsLoad",function(){for(var a=e._props[t],i=a.order={},n=a.options,r=0;r<n.length;r++)i[n[r].key]=r;a._original_size&&0===a.size&&(a.size=a._original_size,delete a.original_size),a.size>n.length?(a._original_size=a.size,a.size=0):a.size=a._original_size||a.size,e._date&&e._mode==t&&e.setCurrentView(e._date,e._mode);
}),e["mouse_"+t]=function(t){var a=e._props[this._mode];if(a){if(t=this._week_indexes_from_pos(t),this._drag_event||(this._drag_event={}),this._drag_id&&this._drag_mode&&(this._drag_event._dhx_changed=!0),this._drag_mode&&"new-size"==this._drag_mode){var i=e._get_event_sday(e._events[e._drag_id]);Math.floor(t.x/a.options.length)!=Math.floor(i/a.options.length)&&(t.x=i)}var n=t.x%a.options.length,r=Math.min(n+a.position,a.options.length-1);t.section=(a.options[r]||{}).key,t.x=Math.floor(t.x/a.options.length);
var s=this.getEvent(this._drag_id);this._update_unit_section({view:a,event:s,pos:t})}return t.force_redraw=!0,t},e.callEvent("onOptionsLoad",[])},e._update_unit_section=function(e){var t=e.view,a=e.event,i=e.pos;a&&(a[t.map_to]=i.section)},e.scrollUnit=function(t){var a=e._props[this._mode];a&&(a.position=Math.min(Math.max(0,a.position+t),a.options.length-a.size),this.setCurrentView())},function(){var t=function(t){var a=e._props[e._mode];if(a&&a.order&&a.skip_incorrect){for(var i=[],n=0;n<t.length;n++)"undefined"!=typeof a.order[t[n][a.map_to]]&&i.push(t[n]);
t.splice(0,t.length),t.push.apply(t,i)}return t},a=e._pre_render_events_table;e._pre_render_events_table=function(e,i){return e=t(e),a.apply(this,[e,i])};var i=e._pre_render_events_line;e._pre_render_events_line=function(e,a){return e=t(e),i.apply(this,[e,a])};var n=function(t,a){if(t&&"undefined"==typeof t.order[a[t.map_to]]){var i=e,n=864e5,r=Math.floor((a.end_date-i._min_date)/n);return t.options.length&&(a[t.map_to]=t.options[Math.min(r+t.position,t.options.length-1)].key),!0}},r=e.is_visible_events;
e.is_visible_events=function(t){var a=r.apply(this,arguments);if(a){var i=e._props[this._mode];if(i&&i.size){var n=i.order[t[i.map_to]];if(n<i.position||n>=i.size+i.position)return!1}}return a};var s=e._process_ignores;e._process_ignores=function(t,a,i,n,r){if(!e._props[this._mode])return void s.call(this,t,a,i,n,r);this._ignores={},this._ignores_detected=0;var o=e["ignore_"+this._mode];if(o){var d=e._props&&e._props[this._mode]?e._props[this._mode].size||e._props[this._mode].options.length:1;a/=d;
for(var _=new Date(t),l=0;a>l;l++){if(o(_))for(var c=l*d,h=(l+1)*d,u=c;h>u;u++)this._ignores_detected+=1,this._ignores[u]=!0,r&&a++;_=e.date.add(_,n,i),e.date[i+"_start"]&&(_=e.date[i+"_start"](_))}}};var o=e._reset_scale;e._reset_scale=function(){var t=e._props[this._mode],a=o.apply(this,arguments);if(t){this._max_date=this.date.add(this._min_date,t.days,"day");for(var i=this._els.dhx_cal_data[0].childNodes,n=0;n<i.length;n++)i[n].className=i[n].className.replace("_now","");var r=this._currentDate();
if(r.valueOf()>=this._min_date&&r.valueOf()<this._max_date){var s=864e5,d=Math.floor((r-e._min_date)/s),_=t.options.length,l=d*_,c=l+_;for(n=l;c>n;n++)i[n]&&(i[n].className=i[n].className.replace("dhx_scale_holder","dhx_scale_holder_now"))}if(t.size&&t.size<t.options.length){var h=this._els.dhx_cal_header[0],u=document.createElement("DIV");t.position&&(this._waiAria.headerButtonsAttributes(u,""),u.className="dhx_cal_prev_button",u.style.cssText="left:1px;top:2px;position:absolute;",u.innerHTML="&nbsp;",
h.firstChild.appendChild(u),u.onclick=function(){e.scrollUnit(-1*t.step)}),t.position+t.size<t.options.length&&(this._waiAria.headerButtonsAttributes(u,""),u=document.createElement("DIV"),u.className="dhx_cal_next_button",u.style.cssText="left:auto; right:0px;top:2px;position:absolute;",u.innerHTML="&nbsp;",h.lastChild.appendChild(u),u.onclick=function(){e.scrollUnit(t.step)})}}return a};var d=e._reset_scale;e._reset_scale=function(){var t=e._props[this._mode],a=e.xy.scale_height;t&&t.days>1?this._header_resized||(this._header_resized=e.xy.scale_height,
e.xy.scale_height=2*a):this._header_resized&&(e.xy.scale_height/=2,this._header_resized=!1),d.apply(this,arguments)};var _=e._get_view_end;e._get_view_end=function(){var t=e._props[this._mode];if(t&&t.days>1){var a=this._get_timeunit_start();return e.date.add(a,t.days,"day")}return _.apply(this,arguments)};var l=e._render_x_header;e._render_x_header=function(t,a,i,n){var r=e._props[this._mode];if(!r||r.days<=1)return l.apply(this,arguments);if(r.days>1){var s=e.xy.scale_height;e.xy.scale_height=Math.ceil(s/2),
l.call(this,t,a,i,n,Math.ceil(e.xy.scale_height));var o=r.options.length;if((t+1)%o===0){var d=document.createElement("DIV");d.className="dhx_scale_bar dhx_second_scale_bar";var _=this.date.add(this._min_date,Math.floor(t/o),"day");this.templates[this._mode+"_second_scalex_class"]&&(d.className+=" "+this.templates[this._mode+"_second_scalex_class"](new Date(_)));var c,h=this._cols[t]*o-1;c=o>1?this._colsS[t-(o-1)]-this.xy.scale_width-2:a,this.set_xy(d,h,this.xy.scale_height-2,c,0),d.innerHTML=this.templates[this._mode+"_second_scale_date"](new Date(_),this._mode),
n.appendChild(d)}e.xy.scale_height=s}};var c=e._get_event_sday;e._get_event_sday=function(t){var a=e._props[this._mode];if(a){if(a.days<=1)return n(a,t),this._get_section_sday(t[a.map_to]);var i=864e5,r=Math.floor((t.end_date.valueOf()-1-60*t.end_date.getTimezoneOffset()*1e3-(e._min_date.valueOf()-60*e._min_date.getTimezoneOffset()*1e3))/i),s=a.options.length,o=a.order[t[a.map_to]];return r*s+o-a.position}return c.call(this,t)},e._get_section_sday=function(t){var a=e._props[this._mode];return a.order[t]-a.position;
};var h=e.locate_holder_day;e.locate_holder_day=function(t,a,i){var r=e._props[this._mode];if(!r)return h.apply(this,arguments);var s;if(i?n(r,i):(i={start_date:t,end_date:t},s=0),r.days<=1)return 1*(void 0===s?r.order[i[r.map_to]]:s)+(a?1:0)-r.position;var o=864e5,d=Math.floor((i.start_date.valueOf()-e._min_date.valueOf())/o),_=r.options.length,l=void 0===s?r.order[i[r.map_to]]:s;return d*_+1*l+(a?1:0)-r.position};var u=e._time_order;e._time_order=function(t){var a=e._props[this._mode];a?t.sort(function(e,t){
return a.order[e[a.map_to]]>a.order[t[a.map_to]]?1:-1}):u.apply(this,arguments)};var v=e._pre_render_events_table;e._pre_render_events_table=function(t,a){function i(t){var a=e.date.add(t,1,"day");return a=e.date.date_part(a)}var n=e._props[this._mode];if(n&&n.days>1&&!this.config.all_timed){for(var r={},s=0;s<t.length;s++){var o=t[s];if(this.isOneDayEvent(t[s])){var d=+e.date.date_part(new Date(o.start_date));r[d]||(r[d]=[]),r[d].push(o)}else{var _=new Date(Math.min(+o.end_date,+this._max_date)),l=new Date(Math.max(+o.start_date,+this._min_date));
for(t.splice(s,1);+_>+l;){var c=this._copy_event(o);c.start_date=l,c.end_date=i(c.start_date),l=e.date.add(l,1,"day");var d=+e.date.date_part(new Date(l));r[d]||(r[d]=[]),r[d].push(c),t.splice(s,0,c),s++}s--}}var h=[];for(var s in r)h.splice.apply(h,[h.length-1,0].concat(v.apply(this,[r[s],a])));for(var s=0;s<h.length;s++)this._ignores[h[s]._sday]?(h.splice(s,1),s--):h[s]._first_chunk=h[s]._last_chunk=!1;h.sort(function(e,t){return e.start_date.valueOf()==t.start_date.valueOf()?e.id>t.id?1:-1:e.start_date>t.start_date?1:-1;
}),t=h}else t=v.apply(this,[t,a]);return t},e.attachEvent("onEventAdded",function(t,a){if(this._loading)return!0;for(var i in e._props){var n=e._props[i];"undefined"==typeof a[n.map_to]&&(a[n.map_to]=n.options[0].key)}return!0}),e.attachEvent("onEventCreated",function(t,a){var i=e._props[this._mode];if(i&&a){var r=this.getEvent(t);n(i,r);var s=this._mouse_coords(a);this._update_unit_section({view:i,event:r,pos:s}),this.event_updated(r)}return!0})}()});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e._get_url_nav=function(){for(var e={},t=(document.location.hash||"").replace("#","").split(","),a=0;a<t.length;a++){var i=t[a].split("=");2==i.length&&(e[i[0]]=i[1])}return e},e.attachEvent("onTemplatesReady",function(){function t(t){r=t,e.getEvent(t)&&e.showEvent(t)}var a=!0,i=e.date.str_to_date("%Y-%m-%d"),n=e.date.date_to_str("%Y-%m-%d"),r=e._get_url_nav().event||null;e.attachEvent("onAfterEventDisplay",function(e){return r=null,!0}),e.attachEvent("onBeforeViewChange",function(s,o,d,_){
if(a){a=!1;var l=e._get_url_nav();if(l.event)try{if(e.getEvent(l.event))return t(l.event),!1;var c=e.attachEvent("onXLE",function(){t(l.event),e.detachEvent(c)})}catch(h){}if(l.date||l.mode){try{this.setCurrentView(l.date?i(l.date):null,l.mode||null)}catch(h){this.setCurrentView(l.date?i(l.date):null,d)}return!1}}var u=["date="+n(_||o),"mode="+(d||s)];r&&u.push("event="+r);var v="#"+u.join(",");return document.location.hash=v,!0})})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e._wa={},e.xy.week_agenda_scale_height=20,e.templates.week_agenda_event_text=function(t,a,i,n){return e.templates.event_date(t)+" "+i.text},e.date.week_agenda_start=e.date.week_start,e.date.week_agenda_end=function(t){return e.date.add(t,7,"day")},e.date.add_week_agenda=function(t,a){return e.date.add(t,7*a,"day")},e.attachEvent("onSchedulerReady",function(){var t=e.templates;t.week_agenda_date||(t.week_agenda_date=t.week_date)}),function(){var t=e.date.date_to_str("%l, %F %d");
e.templates.week_agenda_scale_date=function(e){return t(e)}}(),e.attachEvent("onTemplatesReady",function(){e.attachEvent("onSchedulerResize",function(){return"week_agenda"==this._mode?(this.week_agenda_view(!0),!1):!0});var t=e.render_data;e.render_data=function(a){return"week_agenda"!=this._mode?t.apply(this,arguments):void e.week_agenda_view(!0)};var a=function(){e._cols=[];var t=parseInt(e._els.dhx_cal_data[0].style.width);e._cols.push(Math.floor(t/2)),e._cols.push(t-e._cols[0]-1),e._colsS={0:[],
1:[]};for(var a=parseInt(e._els.dhx_cal_data[0].style.height),i=0;3>i;i++)e._colsS[0].push(Math.floor(a/(3-e._colsS[0].length))),a-=e._colsS[0][i];e._colsS[1].push(e._colsS[0][0]),e._colsS[1].push(e._colsS[0][1]),a=e._colsS[0][e._colsS[0].length-1],e._colsS[1].push(Math.floor(a/2)),e._colsS[1].push(a-e._colsS[1][e._colsS[1].length-1])},i=function(){a(),e._els.dhx_cal_data[0].innerHTML="",e._rendered=[];for(var t="",i=0;2>i;i++){var n=e._cols[i],r="dhx_wa_column";1==i&&(r+=" dhx_wa_column_last"),t+="<div class='"+r+"' style='width: "+n+"px;'>";
for(var s=0;s<e._colsS[i].length;s++){var o=e.xy.week_agenda_scale_height-2,d=e._colsS[i][s]-o-2,_=Math.min(6,2*s+i);t+="<div class='dhx_wa_day_cont'><div style='height:"+o+"px; line-height:"+o+"px;' class='dhx_wa_scale_bar'></div><div style='height:"+d+"px;' class='dhx_wa_day_data' day='"+_+"'></div></div>"}t+="</div>"}e._els.dhx_cal_date[0].innerHTML=e.templates[e._mode+"_date"](e._min_date,e._max_date,e._mode),e._els.dhx_cal_data[0].innerHTML=t;for(var l=e._els.dhx_cal_data[0].getElementsByTagName("div"),c=[],i=0;i<l.length;i++)"dhx_wa_day_cont"==l[i].className&&c.push(l[i]);
e._wa._selected_divs=[];for(var h=e.get_visible_events(),u=e.date.week_start(e._date),v=e.date.add(u,1,"day"),i=0;7>i;i++){c[i]._date=u,e._waiAria.weekAgendaDayCell(c[i],u);var f=c[i].childNodes[0],g=c[i].childNodes[1];f.innerHTML=e.templates.week_agenda_scale_date(u);for(var p=[],m=0;m<h.length;m++){var y=h[m];y.start_date<v&&y.end_date>u&&p.push(y)}p.sort(function(e,t){return e.start_date.valueOf()==t.start_date.valueOf()?e.id>t.id?1:-1:e.start_date>t.start_date?1:-1});for(var s=0;s<p.length;s++){
var x=p[s],b=document.createElement("div");e._rendered.push(b);var w=e.templates.event_class(x.start_date,x.end_date,x);b.className="dhx_wa_ev_body"+(w?" "+w:""),x._text_style&&(b.style.cssText=x._text_style),x.color&&(b.style.background=x.color),x.textColor&&(b.style.color=x.textColor),e._select_id&&x.id==e._select_id&&(e.config.week_agenda_select||void 0===e.config.week_agenda_select)&&(b.className+=" dhx_cal_event_selected",e._wa._selected_divs.push(b));var k="";x._timed||(k="middle",x.start_date.valueOf()>=u.valueOf()&&x.start_date.valueOf()<=v.valueOf()&&(k="start"),
x.end_date.valueOf()>=u.valueOf()&&x.end_date.valueOf()<=v.valueOf()&&(k="end")),b.innerHTML=e.templates.week_agenda_event_text(x.start_date,x.end_date,x,u,k),b.setAttribute("event_id",x.id),e._waiAria.weekAgendaEvent(b,x),g.appendChild(b)}u=e.date.add(u,1,"day"),v=e.date.add(v,1,"day")}};e.week_agenda_view=function(t){e._min_date=e.date.week_start(e._date),e._max_date=e.date.add(e._min_date,1,"week"),e.set_sizes(),t?(e._table_view=e._allow_dnd=!0,void 0===e._wa._prev_data_border&&(e._wa._prev_data_border=e._els.dhx_cal_data[0].style.borderTopWidth),
e._els.dhx_cal_data[0].style.borderTopWidth=0,e._els.dhx_cal_data[0].style.overflowY="hidden",e._els.dhx_cal_date[0].innerHTML="",e._els.dhx_cal_data[0].style.top=parseInt(e._els.dhx_cal_data[0].style.top)-20-1+"px",e._els.dhx_cal_data[0].style.height=parseInt(e._els.dhx_cal_data[0].style.height)+20+1+"px",e._els.dhx_cal_header[0].style.display="none",i()):(e._table_view=e._allow_dnd=!1,void 0!==e._wa._prev_data_border&&(e._els.dhx_cal_data[0].style.borderTopWidth=e._wa._prev_data_border,delete e._wa._prev_data_border),
e._els.dhx_cal_data[0].style.overflowY="auto",e._els.dhx_cal_data[0].style.top=parseInt(e._els.dhx_cal_data[0].style.top)+20+"px",e._els.dhx_cal_data[0].style.height=parseInt(e._els.dhx_cal_data[0].style.height)-20+"px",e._els.dhx_cal_header[0].style.display="block")},e.mouse_week_agenda=function(t){for(var a,i=t.ev,n=i.srcElement||i.target;n.parentNode;)n._date&&(a=n._date),n=n.parentNode;if(!a)return t;t.x=0;var r=a.valueOf()-e._min_date.valueOf();if(t.y=Math.ceil(r/6e4/this.config.time_step),"move"==this._drag_mode&&this._drag_pos&&this._is_pos_changed(this._drag_pos,t)){
var s;this._drag_event._dhx_changed=!0,this._select_id=this._drag_id;for(var o=0;o<e._rendered.length;o++)e._drag_id==this._rendered[o].getAttribute("event_id")&&(s=this._rendered[o]);if(!e._wa._dnd){var d=s.cloneNode(!0);this._wa._dnd=d,d.className=s.className,d.id="dhx_wa_dnd",d.className+=" dhx_wa_dnd",document.body.appendChild(d)}var _=document.getElementById("dhx_wa_dnd");_.style.top=(i.pageY||i.clientY)+20+"px",_.style.left=(i.pageX||i.clientX)+20+"px"}return t},e.attachEvent("onBeforeEventChanged",function(t,a,i){
if("week_agenda"==this._mode&&"move"==this._drag_mode){var n=document.getElementById("dhx_wa_dnd");n.parentNode.removeChild(n),e._wa._dnd=!1}return!0}),e.attachEvent("onEventSave",function(e,t,a){return a&&"week_agenda"==this._mode&&(this._select_id=e),!0}),e._wa._selected_divs=[],e.attachEvent("onClick",function(t,a){if("week_agenda"==this._mode&&(e.config.week_agenda_select||void 0===e.config.week_agenda_select)){if(e._wa._selected_divs)for(var i=0;i<this._wa._selected_divs.length;i++){var n=this._wa._selected_divs[i];
n.className=n.className.replace(/ dhx_cal_event_selected/,"")}return this.for_rendered(t,function(t){t.className+=" dhx_cal_event_selected",e._wa._selected_divs.push(t)}),e._select_id=t,!1}return!0})})});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.attachEvent("onLightBox",function(){if(this._cover)try{this._cover.style.height=this.expanded?"100%":(document.body.parentNode||document.body).scrollHeight+"px"}catch(e){}}),e.form_blocks.select.set_value=function(e,t,a){("undefined"==typeof t||""===t)&&(t=(e.firstChild.options[0]||{}).value),e.firstChild.value=t||""}});
/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/

Scheduler.plugin(function(e){e.config.year_x=4,e.config.year_y=3,e.xy.year_top=0,e.templates.year_date=function(t){return e.date.date_to_str(e.locale.labels.year_tab+" %Y")(t)},e.templates.year_month=e.date.date_to_str("%F"),e.templates.year_scale_date=e.date.date_to_str("%D"),e.templates.year_tooltip=function(e,t,a){return a.text},function(){var t=function(){return"year"==e._mode};e.dblclick_dhx_month_head=function(a){if(t()){var i=a.target||a.srcElement,n=e._getClassName(i.parentNode);if(-1!=n.indexOf("dhx_before")||-1!=n.indexOf("dhx_after"))return!1;
for(var r=i;r&&(!r.hasAttribute||!r.hasAttribute("date"));)r=r.parentNode;if(r){var s=this.templates.xml_date(r.getAttribute("date"));s.setDate(parseInt(i.innerHTML,10));var o=this.date.add(s,1,"day");!this.config.readonly&&this.config.dblclick_create&&this.addEventNow(s.valueOf(),o.valueOf(),a)}}};var a=e.changeEventId;e.changeEventId=function(){a.apply(this,arguments),t()&&this.year_view(!0)};var i=e.render_data,n=e.date.date_to_str("%Y/%m/%d"),r=e.date.str_to_date("%Y/%m/%d");e.render_data=function(e){
if(!t())return i.apply(this,arguments);for(var a=0;a<e.length;a++)this._year_render_event(e[a])};var s=e.clear_view;e.clear_view=function(){if(!t())return s.apply(this,arguments);var a=e._year_marked_cells,i=null;for(var n in a)a.hasOwnProperty(n)&&(i=a[n],i.className="dhx_month_head",i.setAttribute("date",""));e._year_marked_cells={}},e._hideToolTip=function(){this._tooltip&&(this._tooltip.style.display="none",this._tooltip.date=new Date(9999,1,1))},e._showToolTip=function(t,a,i,n){if(this._tooltip){
if(this._tooltip.date.valueOf()==t.valueOf())return;this._tooltip.innerHTML=""}else{var r=this._tooltip=document.createElement("DIV");r.className="dhx_year_tooltip",document.body.appendChild(r),r.onclick=e._click.dhx_cal_data}for(var s=this.getEvents(t,this.date.add(t,1,"day")),o="",d=0;d<s.length;d++){var _=s[d];if(this.filter_event(_.id,_)){var l=_.color?"background:"+_.color+";":"",c=_.textColor?"color:"+_.textColor+";":"";o+="<div class='dhx_tooltip_line' style='"+l+c+"' event_id='"+s[d].id+"'>",
o+="<div class='dhx_tooltip_date' style='"+l+c+"'>"+(s[d]._timed?this.templates.event_date(s[d].start_date):"")+"</div>",o+="<div class='dhx_event_icon icon_details'>&nbsp;</div>",o+=this.templates.year_tooltip(s[d].start_date,s[d].end_date,s[d])+"</div>"}}this._tooltip.style.display="",this._tooltip.style.top="0px",document.body.offsetWidth-a.left-this._tooltip.offsetWidth<0?this._tooltip.style.left=a.left-this._tooltip.offsetWidth+"px":this._tooltip.style.left=a.left+n.offsetWidth+"px",this._tooltip.date=t,
this._tooltip.innerHTML=o,document.body.offsetHeight-a.top-this._tooltip.offsetHeight<0?this._tooltip.style.top=a.top-this._tooltip.offsetHeight+n.offsetHeight+"px":this._tooltip.style.top=a.top+"px"},e._year_view_tooltip_handler=function(a){if(t()){var a=a||event,i=a.target||a.srcElement;"a"==i.tagName.toLowerCase()&&(i=i.parentNode),-1!=e._getClassName(i).indexOf("dhx_year_event")?e._showToolTip(r(i.getAttribute("date")),getOffset(i),a,i):e._hideToolTip()}},e._init_year_tooltip=function(){e._detachDomEvent(e._els.dhx_cal_data[0],"mouseover",e._year_view_tooltip_handler),
dhtmlxEvent(e._els.dhx_cal_data[0],"mouseover",e._year_view_tooltip_handler)},e.attachEvent("onSchedulerResize",function(){return t()?(this.year_view(!0),!1):!0}),e._get_year_cell=function(e){var t=e.getMonth()+12*(e.getFullYear()-this._min_date.getFullYear())-this.week_starts._month,a=this._els.dhx_cal_data[0].childNodes[t],e=this.week_starts[t]+e.getDate()-1;return a.querySelector(".dhx_year_body").firstChild.rows[Math.floor(e/7)].cells[e%7].firstChild},e._year_marked_cells={},e._mark_year_date=function(t,a){
var i=n(t),r=this._get_year_cell(t),s=this.templates.event_class(a.start_date,a.end_date,a);e._year_marked_cells[i]||(r.className="dhx_month_head dhx_year_event",r.setAttribute("date",i),e._year_marked_cells[i]=r),r.className+=s?" "+s:""},e._unmark_year_date=function(e){this._get_year_cell(e).className="dhx_month_head"},e._year_render_event=function(e){var t=e.start_date;for(t=t.valueOf()<this._min_date.valueOf()?this._min_date:this.date.date_part(new Date(t));t<e.end_date;)if(this._mark_year_date(t,e),
t=this.date.add(t,1,"day"),t.valueOf()>=this._max_date.valueOf())return},e.year_view=function(t){var a;if(t&&(a=e.xy.scale_height,e.xy.scale_height=-1),e._els.dhx_cal_header[0].style.display=t?"none":"",e.set_sizes(),t&&(e.xy.scale_height=a),e._table_view=t,!this._load_mode||!this._load())if(t){if(e._init_year_tooltip(),e._reset_year_scale(),e._load_mode&&e._load())return void(e._render_wait=!0);e.render_view_data()}else e._hideToolTip()},e._reset_year_scale=function(){this._cols=[],this._colsS={};
var t=[],a=this._els.dhx_cal_data[0],i=this.config;a.scrollTop=0,a.innerHTML="";var n=Math.floor(parseInt(a.style.width)/i.year_x),r=Math.floor((parseInt(a.style.height)-e.xy.year_top)/i.year_y);190>r&&(r=190,n=Math.floor((parseInt(a.style.width)-e.xy.scroll_width)/i.year_x));var s=n-11,o=0,d=document.createElement("div"),_=this.date.week_start(e._currentDate());this._process_ignores(_,7,"day",1);for(var l=7-(this._ignores_detected||0),c=0,h=0;7>h;h++)this._ignores&&this._ignores[h]||(this._cols[h]=Math.floor(s/(l-c)),
this._render_x_header(h,o,_,d),s-=this._cols[h],o+=this._cols[h],c++),_=this.date.add(_,1,"day");d.lastChild.className+=" dhx_scale_bar_last";for(var h=0;h<d.childNodes.length;h++)this._waiAria.yearHeadCell(d.childNodes[h]);for(var u=this.date[this._mode+"_start"](this.date.copy(this._date)),v=u,f=null,h=0;h<i.year_y;h++)for(var g=0;g<i.year_x;g++){f=document.createElement("DIV"),f.style.cssText="position:absolute;",f.setAttribute("date",this.templates.xml_format(u)),f.innerHTML="<div class='dhx_year_month'></div><div class='dhx_year_grid'><div class='dhx_year_week'>"+d.innerHTML+"</div><div class='dhx_year_body'></div></div>";
var p=f.querySelector(".dhx_year_month"),m=f.querySelector(".dhx_year_grid"),y=f.querySelector(".dhx_year_week"),x=f.querySelector(".dhx_year_body"),b=e.uid();this._waiAria.yearHeader(p,b),this._waiAria.yearGrid(m,b),p.innerHTML=this.templates.year_month(u);for(var w=this.date.week_start(u),k=(this._reset_month_scale(x,u,w,6),x.querySelectorAll("td")),E=0;E<k.length;E++)this._waiAria.yearDayCell(k[E]);a.appendChild(f),y.style.height=y.childNodes[0].offsetHeight+"px";var D=Math.round((r-190)/2);f.style.marginTop=D+"px",
this.set_xy(f,n-10,r-D-10,n*g+5,r*h+5+e.xy.year_top),t[h*i.year_x+g]=(u.getDay()-(this.config.start_on_monday?1:0)+7)%7,u=this.date.add(u,1,"month")}this._els.dhx_cal_date[0].innerHTML=this.templates[this._mode+"_date"](v,u,this._mode),this.week_starts=t,t._month=v.getMonth(),this._min_date=v,this._max_date=u};var o=e.getActionData;e.getActionData=function(a){if(!t())return o.apply(e,arguments);var i=a?a.target:event.srcElement,n=e._get_year_month_date(i),r=e._get_year_month_cell(i),s=e._get_year_day_indexes(r);
return s&&n?(n=e.date.add(n,s.week,"week"),n=e.date.add(n,s.day,"day")):n=null,{date:n,section:null}},e._get_year_day_indexes=function(t){var a=e._get_year_el_node(t,this._locate_year_month_table);if(!a)return null;for(var i=0,n=0,i=0,r=a.rows.length;r>i;i++){for(var s=a.rows[i].getElementsByTagName("td"),n=0,o=s.length;o>n&&s[n]!=t;n++);if(o>n)break}return r>i?{day:n,week:i}:null},e._get_year_month_date=function(t){var t=e._get_year_el_node(t,e._locate_year_month_root);if(!t)return null;var a=t.getAttribute("date");
return a?e.date.week_start(e.date.month_start(r(a))):null},e._locate_year_month_day=function(t){return-1!=e._getClassName(t).indexOf("dhx_year_event")&&t.hasAttribute&&t.hasAttribute("date")};var d=e._locate_event;e._locate_event=function(t){var a=d.apply(e,arguments);if(!a){var i=e._get_year_el_node(t,e._locate_year_month_day);if(!i||!i.hasAttribute("date"))return null;var n=r(i.getAttribute("date")),s=e.getEvents(n,e.date.add(n,1,"day"));if(!s.length)return null;a=s[0].id}return a},e._locate_year_month_cell=function(e){
return"td"==e.nodeName.toLowerCase()},e._locate_year_month_table=function(e){return"table"==e.nodeName.toLowerCase()},e._locate_year_month_root=function(e){return e.hasAttribute&&e.hasAttribute("date")},e._get_year_month_cell=function(e){return this._get_year_el_node(e,this._locate_year_month_cell)},e._get_year_month_table=function(e){return this._get_year_el_node(e,this._locate_year_month_table)},e._get_year_month_root=function(e){return this._get_year_el_node(this._get_year_month_table(e),this._locate_year_month_root);
},e._get_year_el_node=function(e,t){for(;e&&!t(e);)e=e.parentNode;return e}}()});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






;
