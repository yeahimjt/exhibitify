function isValidURL(url: string): boolean {
  // Use a URL validation library or regex
  // Example using a simple regex:
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(url);
}

function containsMaliciousContent(url: string): boolean {
  const maliciousPatterns = /(porn|sex|maliciousword1|maliciousword2)/i;
  return maliciousPatterns.test(url);
}

export function isSafeURL(url: string): boolean {
  return isValidURL(url) && !containsMaliciousContent(url);
}
