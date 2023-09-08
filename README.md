# Style Factory

## Overview

The **Style Factory** is a JavaScript class designed to help you apply inline styles to specific patterns within a text string. It provides a clean and efficient way to format text with different styles based on user-defined patterns.
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Creating a Style Factory Instance](#creating-a-style-factory-instance)
  - [Defining Style Rules](#defining-style-rules)
  - [Defining Clean Rules](#defining-clean-rules)
  - [Creating Styled Text](#creating-styled-text)
- [API Reference](#api-reference)
  - [useStyle(pattern, style)](#usestylepattern-style)
  - [useCleaner(pattern)](#usecleanerpattern)
  - [create(text)](#createtext)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install @duongtdn/style-factory
```

## Usage

### Creating a Style Factory Instance

To start using the Style Factory, you need to create an instance of the `StyleFactory` class:

```javascript
import StyleFactory from '@duongtdn/style-factory';

const styleFactory = new StyleFactory();
```

### Defining Style Rules

The Style Factory allows you to define patterns and associate them with inline styles. You can use the `useStyle(pattern, style)` method to add style rules. The `pattern` parameter can be a string or a regular expression, and `style` is an object that defines the inline style for matching words or patterns.

```javascript
styleFactory.useStyle('error', { color: 'red' })
            .useStyle(/\serror\s/, { backgroundColor: 'yellow' });
```

### Defining Clean Rules

In some cases, you may want to remove specific patterns from the text. The `useCleaner(pattern)` method allows you to add clean rules. Just like with style rules, `pattern` can be a string or a regular expression.

```javascript
styleFactory.useCleaner(/\d+/); // Remove all digits from the text
```

### Creating Styled Text

Once you've defined your style and clean rules, you can use the `create(text)` method to apply those rules to a text string. This method returns an array of objects, where each object represents a piece of text with its associated style.

```javascript
const styledText = styleFactory.create('This is an error message: error 404.');
console.log(styledText);
```

## API Reference

### `useStyle(pattern, style)`

- `pattern`: Can be a string or a regular expression. It defines the pattern to match in the text.
- `style`: An object that defines the inline style for the matched pattern.
- Returns: `this` (allows method chaining)

### `useCleaner(pattern)`

- `pattern`: Can be a string or a regular expression. It defines the pattern to remove from the text.
- Returns: `this` (allows method chaining)

### `create(text)`

- `text`: The input text string to be formatted.
- Returns: An array of objects containing text and their associated styles.

## Examples

Here's a simple example of using the Style Factory:

```javascript
import StyleFactory from '@duongtdn/style-factory';

const styleFactory = new StyleFactory();

styleFactory.useStyle('error', { color: 'red' })
            .useStyle(/\serror\s/, { backgroundColor: 'yellow' })
            .useCleaner(/\d+/);

const text = 'This is an error message: error 404.';
const styledText = styleFactory.create(text);
console.log(styledText);
```

The above example will format the text and produce an array with styled text segments.

## Contributing

Contributions to the Style Factory are welcome! If you have ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).