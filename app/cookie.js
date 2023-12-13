// cookie.js
import Cookies from 'js-cookie';

const COOKIE_NAME = 'impressionCookie';

export const setImpressionCookie = (postId) => {
  Cookies.set(`${COOKIE_NAME}_${postId}`, 'true', { expires: 1 }); // expires in 1 day
};

export const hasImpressionCookie = (postId) => {
  const impression = Cookies.get(`${COOKIE_NAME}_${postId}`) === 'true';

  return impression;
};
