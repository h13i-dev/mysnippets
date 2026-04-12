import { next as edgeNext } from '@vercel/edge';

const next = edgeNext as () => Response;

export const config = {
  matcher: '/(.*)',
};

export default function middleware(request: Request) {
  const isProduction = process.env.VERCEL_ENV === 'production';
  const authorizationHeader = request.headers.get('authorization');

  const isAuthenticated = (() => {
    if (isProduction) return true;
    if (!authorizationHeader) return false;
    const basicAuth = authorizationHeader.split(' ')[1];
    const [user, password] = atob(basicAuth).toString().split(':');
    return user === process.env.BASIC_AUTH_USER && password === process.env.BASIC_AUTH_PASSWORD;
  })();

  if (isAuthenticated) {
    return next();
  }

  return new Response('Basic Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
