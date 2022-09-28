export function generateKey() {
  var length = 20,
    allc = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    keygen = '';
  for (var i = 0; i < length; i++) {
    keygen += allc[Math.floor(Math.random() * allc.length)];
  }
  return keygen;
}
