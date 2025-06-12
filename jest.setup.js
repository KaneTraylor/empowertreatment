// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
}))

// Mock Next.js server components
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: (data, init) => ({
      ...new Response(JSON.stringify(data), init),
      json: async () => data,
      status: init?.status || 200,
    }),
  },
}))

// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_API_URL: 'http://localhost:3000',
}

// Polyfill for Request/Response in Node environment
if (typeof globalThis.Request === 'undefined') {
  global.Request = class Request {
    constructor(input, init) {
      this.url = input
      this.init = init
    }
  }
}

if (typeof globalThis.Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init) {
      this.body = body
      this.init = init
      this.status = init?.status || 200
    }
    
    async json() {
      return JSON.parse(this.body)
    }
  }
}