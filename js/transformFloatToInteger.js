/**
 * retourne un object contenant le numerateur et le denominateur de ce nombre
 * @param {Number} number
 * @returns Object
 */

export default function transformFloatToInteger(number) {
  let num = null;
  let den = null;
  let exp = 0;
  let neg = null;

  if (number == 0) return { deno: 1, nume: 0 };
  while (number % 10 != 0) {
    console.log(number);
    number = number * 10;
    exp++;
    if (exp > 3) {
      number = Math.round(number);
      break;
    }
  }

  if (number < 0) {
    number = number * -1;
    neg = true;
  }

  console.log(number, exp);
  const PGCD = pgcd(number, Math.pow(10, exp));
  console.log(PGCD, number, exp);
  num = number / PGCD;
  if (neg) num = num * -1;
  den = Math.pow(10, exp) / PGCD;

  return {
    deno: den,
    nume: num,
  };
}
// Pgcd de deux entier
function pgcd(a, b) {
  if (a == b) return a;
  else {
    if (a > b) return pgcd(b, a - b);
    else return pgcd(a, b - a);
  }
}
