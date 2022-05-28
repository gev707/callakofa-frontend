// Types for is_js library
// ignore it

declare let is: Is

interface TypeMethods {
  arguments(value: any): boolean
  array(value: any): boolean
  boolean(value: any): boolean
  date(value: any): boolean
  error(value: any): boolean
  function(value: any): boolean
  nan(value: any): boolean
  null(value: any): boolean
  number(value: any): boolean
  object(value: any): boolean
  json(value: any): boolean
  regexp(value: any): boolean
  string(value: any): boolean
  char(value: any): boolean
  undefined(value: any): boolean
  sameType(value1: any, value2: any): boolean
}

interface TypeArrayMethods {
  arguments(...values: any[]): boolean
  arguments(values: any[]): boolean
  array(...values: any[]): boolean
  array(values: any[]): boolean
  boolean(...values: any[]): boolean
  boolean(values: any[]): boolean
  date(...values: any[]): boolean
  date(values: any[]): boolean
  error(...values: any[]): boolean
  error(values: any[]): boolean
  function(...values: any[]): boolean
  function(values: any[]): boolean
  nan(...values: any[]): boolean
  nan(values: any[]): boolean
  null(...values: any[]): boolean
  null(values: any[]): boolean
  number(...values: any[]): boolean
  number(values: any[]): boolean
  object(...values: any[]): boolean
  object(values: any[]): boolean
  json(...values: any[]): boolean
  json(values: any[]): boolean
  regexp(...values: any[]): boolean
  regexp(values: any[]): boolean
  string(...values: any[]): boolean
  string(values: any[]): boolean
  char(...values: any[]): boolean
  char(values: any[]): boolean
  undefined(...values: any[]): boolean
  undefined(values: any[]): boolean
}

interface PresenceMethods {
  empty(value: any): boolean
  existy(value: any): boolean
  truthy(value: any): boolean
  falsy(value: any): boolean
  space(value: string): boolean
}

interface PresenceArrayMethods {
  empty(values: any[]): boolean
  empty(...values: any[]): boolean
  existy(values: any[]): boolean
  existy(...values: any[]): boolean
  truthy(values: any[]): boolean
  truthy(...values: any[]): boolean
  falsy(values: any[]): boolean
  falsy(...values: any[]): boolean
  space(values: any[]): boolean
  space(...values: any[]): boolean
}

interface RegExpMethods {
  url(value: string): boolean
  email(value: string): boolean
  creditCard(value: string): boolean
  alphaNumeric(value: string): boolean
  timeString(value: string): boolean
  dateString(value: string): boolean
  usZipCode(value: string): boolean
  caPostalCode(value: string): boolean
  ukPostCode(value: string): boolean
  nanpPhone(value: string): boolean
  eppPhone(value: string): boolean
  socialSecurityNumber(value: string): boolean
  affirmative(value: string): boolean
  hexadecimal(value: string): boolean
  hexColor(value: string): boolean
  ip(value: string): boolean
  ipv4(value: string): boolean
  ipv6(value: string): boolean
}

interface RegExpArrayMethods {
  url(values: string[]): boolean
  url(...values: string[]): boolean
  email(values: string[]): boolean
  email(...values: string[]): boolean
  creditCard(values: string[]): boolean
  creditCard(...values: string[]): boolean
  alphaNumeric(values: string[]): boolean
  alphaNumeric(...values: string[]): boolean
  timeString(values: string[]): boolean
  timeString(...values: string[]): boolean
  dateString(values: string[]): boolean
  dateString(...values: string[]): boolean
  usZipCode(values: string[]): boolean
  usZipCode(...values: string[]): boolean
  caPostalCode(values: string[]): boolean
  caPostalCode(...values: string[]): boolean
  ukPostCode(values: string[]): boolean
  ukPostCode(...values: string[]): boolean
  nanpPhone(values: string[]): boolean
  nanpPhone(...values: string[]): boolean
  eppPhone(values: string[]): boolean
  eppPhone(...values: string[]): boolean
  socialSecurityNumber(values: string[]): boolean
  socialSecurityNumber(...values: string[]): boolean
  affirmative(values: string[]): boolean
  affirmative(...values: string[]): boolean
  hexadecimal(values: string[]): boolean
  hexadecimal(...values: string[]): boolean
  hexColor(values: string[]): boolean
  hexColor(...values: string[]): boolean
  ip(values: string[]): boolean
  ip(...values: string[]): boolean
  ipv4(values: string[]): boolean
  ipv4(...values: string[]): boolean
  ipv6(values: string[]): boolean
  ipv6(...values: string[]): boolean
}

interface StringMethods {
  include(value1: string, value2: string): boolean
  upperCase(value: string): boolean
  lowerCase(value: string): boolean
  startWith(value1: string, value2: string): boolean
  endWith(value1: string, value2: string): boolean
  capitalized(value1: string, substring?: string): boolean
  palindrome(value: string): boolean
}

interface StringArrayMethods {
  upperCase(values: string[]): boolean
  upperCase(...values: string[]): boolean
  lowerCase(values: string[]): boolean
  lowerCase(...values: string[]): boolean
  capitalized(values: string[]): boolean
  capitalized(...values: string[]): boolean
  palindrome(values: string[]): boolean
  palindrome(...values: string[]): boolean
}

interface ArithmeticMethods {
  equal(value1: any, value2: any): boolean
  even(value: number): boolean
  odd(value: number): boolean
  positive(value: number): boolean
  negative(value: number): boolean
  above(value: number, min: number): boolean
  under(value: number, min: number): boolean
  within(value: number, min: number, max: number): boolean
  decimal(value: number): boolean
  integer(value: number): boolean
  finite(value: number): boolean
  infinite(value: number): boolean
}

interface ArithmeticArrayMethods {
  even(values: number[]): boolean
  even(...values: number[]): boolean
  odd(values: number[]): boolean
  odd(...values: number[]): boolean
  positive(values: number[]): boolean
  positive(...values: number[]): boolean
  negative(values: number[]): boolean
  negative(...values: number[]): boolean
  decimal(values: number[]): boolean
  decimal(...values: number[]): boolean
  integer(values: number[]): boolean
  integer(...values: number[]): boolean
  finite(values: number[]): boolean
  finite(...values: number[]): boolean
  infinite(values: number[]): boolean
  infinite(...values: number[]): boolean
}

interface ObjectMethods {
  propertyCount(value: any, count): boolean
  propertyDefined(value: any, property): boolean
  windowObject(value: any): boolean
  domNode(value: any): boolean
}

interface ObjectArrayMethods {
  windowObject(values: any[]): boolean
  windowObject(...values: any[]): boolean
  domNode(values: any[]): boolean
  domNode(...values: any[]): boolean
}

interface ArrayMethods {
  inArray(value: any, array: any[]): boolean
  sorted(value: any[]): boolean
}

interface ArrayArrayMethods {
  sorted(value: any[][]): boolean
  sorted(...value: any[][]): boolean
}

interface TimeMethods {
  today(value: Date): boolean
  yesterday(value: Date): boolean
  tomorrow(value: Date): boolean
  past(value: Date): boolean
  future(value: Date): boolean
  day(value: Date, dayString: string): boolean
  month(value: Date, monthString: string): boolean
  year(value: Date, yearNumber: string): boolean
  leapYear(value: number): boolean
  weekend(value: Date): boolean
  weekday(value: Date): boolean
  inDateRange(value: Date, startObject: Date, endObject: Date): boolean
  inLastWeek(value: Date): boolean
  inLastMonth(value: Date): boolean
  inLastYear(value: Date): boolean
  inNextWeek(value: Date): boolean
  inNextMonth(value: Date): boolean
  inNextYear(value: Date): boolean
  quarterOfYear(value: Date, quarterNumber?: string): boolean
  dayLightSavingTime(value: Date, quarterNumber?: string): boolean
}

interface TimeArrayMethods {
  today(values: Date[]): boolean
  today(...values: Date[]): boolean
  yesterday(values: Date[]): boolean
  yesterday(...values: Date[]): boolean
  tomorrow(values: Date[]): boolean
  tomorrow(...values: Date[]): boolean
  past(values: Date[]): boolean
  past(...values: Date[]): boolean
  future(values: Date[]): boolean
  future(...values: Date[]): boolean
  leapYear(values: number[]): boolean
  leapYear(...values: number[]): boolean
  weekend(values: Date[]): boolean
  weekend(...values: Date[]): boolean
  weekday(values: Date[]): boolean
  weekday(...values: Date[]): boolean
}

interface EnvironmentMethods {
  ie(value: number): boolean
  chrome(): boolean
  firefox(): boolean
  opera(): boolean
  safari(): boolean
  ios(): boolean
  iphone(): boolean
  ipad(): boolean
  ipod(): boolean
  android(): boolean
  androidPhone(): boolean
  androidTablet(): boolean
  blackberry(): boolean
  windowsPhone(): boolean
  windowsTablet(): boolean
  windows(): boolean
  mac(): boolean
  linux(): boolean
  desktop(): boolean
  mobile(): boolean
  tablet(): boolean
  online(): boolean
  offline(): boolean
  touchDevice(): boolean
}

interface IsMethods
  extends TypeMethods,
    PresenceMethods,
    RegExpMethods,
    ArithmeticMethods,
    ObjectMethods,
    ArrayMethods,
    TimeMethods,
    EnvironmentMethods {}

interface IsArrayMethods
  extends TypeArrayMethods,
    PresenceArrayMethods,
    RegExpArrayMethods,
    ArithmeticArrayMethods,
    ObjectArrayMethods,
    ArrayArrayMethods,
    TimeArrayMethods {}

interface Is extends IsMethods {
  not: IsMethods
  all: IsArrayMethods
  any: IsArrayMethods
  setNamespace(): Is
  setRegexp(value: RegExp, regexpString: string): void
}

declare module 'is_js' {
  export = is
}
// @types/is_js from Stack overflow
