/** @type {import('next').NextConfig} */

const getGoogleClientId = () => {
  if (navigator.userAgent.match(/iPhone/i)) {
    return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_IOS;
  } else {
    return process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  }
};

const nextConfig = {
  reactStrictMode: false,
  env: {
    ENOKI_PUB_KEY: process.env.ENOKI_PUB_KEY,
    GOOGLE_CLIENT_ID: getGoogleClientId(),
  },
};

export default nextConfig;
