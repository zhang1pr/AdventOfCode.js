import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      quotes: [
        'error',
        'single'
      ],
      'quote-props': [
        'error',
        'as-needed'
      ],
      semi: [
        'error'
      ],
      indent: [
        'error',
        2
      ],
      'no-multi-spaces': [
        'error'
      ],
      'eol-last': [
        'error',
        'never'
      ],
      'no-constant-condition': [
        'error',
        {
          checkLoops: false
        }
      ]
    }
  }
];