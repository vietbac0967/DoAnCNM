// import { validateEmail, validatePhoneNumber, validatePassword, validateField } from '../utils/validate';

const { validateEmail, validatePhoneNumber, validatePassword, validateField } = require('../utils/validate');


//npm install --save-dev jest


describe('validateEmail', () => {
  it('return true for valid email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  it('return false for invalid email', () => {
    expect(validateEmail('invalid_email')).toBe(false);
  });

  it('return false for empty email', () => {
    expect(validateEmail('')).toBe(false);
  });

  it('return false for null email', () => {
    expect(validateEmail(null)).toBe(false);
  });
});

describe('validatePhoneNumber', () => {
  it('return true for valid phone number', () => {
    expect(validatePhoneNumber('0123456789')).toBe(true);
  });

  it('return false for invalid phone number', () => {
    expect(validatePhoneNumber('12345')).toBe(false);
  });

  it('return false for empty phone number', () => {
    expect(validatePhoneNumber('')).toBe(false);
  });

  it('return false for null phone number', () => {
    expect(validatePhoneNumber(null)).toBe(false);
  });
});

describe('validatePassword', () => {
  it('return true for valid password', () => {
    expect(validatePassword('Password1!')).toBe(true);
  });

  it('return false for invalid password', () => {
    expect(validatePassword('weakpassword')).toBe(false);
  });

  it('return false for empty password', () => {
    expect(validatePassword('')).toBe(false);
  });

  it('return false for null password', () => {
    expect(validatePassword(null)).toBe(false);
  });
});

describe('validateField', () => {
  it('return true for non-empty field', () => {
    expect(validateField('test')).toBe(true);
  });

  it('return false for empty field', () => {
    expect(validateField('')).toBe(false);
  });

  it('return false for null field', () => {
    expect(validateField(null)).toBe(false);
  });
});
