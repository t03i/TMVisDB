export const emojis: { [key: number]: string }= {
	// 1xx Informational
	100: '💬', // Continue
	101: '🔄', // Switching Protocols
	102: '⏳', // Processing

	// 2xx Success
	200: '✅', // OK
	201: '🆕', // Created
	202: '👌', // Accepted
	204: '🗑️', // No Content
	206: '✂️', // Partial Content

	// 3xx Redirection
	300: '🔀', // Multiple Choices
	301: '🏡', // Moved Permanently
	302: '↪️', // Found (Previously "Moved temporarily")
	304: '📜', // Not Modified
	307: '⏭️', // Temporary Redirect
	308: '🔄', // Permanent Redirect

	// 4xx Client Errors
	400: '❓', // Bad Request
	401: '🔒', // Unauthorized
	403: '🚫', // Forbidden
	404: '🕵️', // Not Found
	405: '🚷', // Method Not Allowed
	408: '⏱️', // Request Timeout
	418: '🫖', // I'm a teapot
	420: '🫠', // Enhance Your Calm (Twitter) / Method Failure (Spring Framework)
	429: '🚦', // Too Many Requests

	// 5xx Server Errors
	500: '💥', // Internal Server Error
	501: '🚧', // Not Implemented
	502: '🚪', // Bad Gateway
	503: '🔧', // Service Unavailable
	504: '⏳', // Gateway Timeout
	507: '💾', // Insufficient Storage
	508: '➿', // Loop Detected
  };
