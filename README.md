# Featherless TypeScript SDK

Featherless is a serverless inference provider offering advanced model loading and GPU orchestration capabilities. This TypeScript SDK allows you to easily interact with the Featherless API to integrate AI features into your applications.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Features](#features)
- [Documentation](#documentation)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the Featherless SDK, use :

```bash
npm install featherless
pnpm install featherless
bun i featherless
yarn add featherless
```

## Basic Usage

### Initializing the Client

```typescript
import { Featherless } from "featherless";

const client = new Featherless({
  api_key: process.env.FEATHERLESS_API_KEY, // Use environment variables for API key
  debug: true, // Enable debug mode for logs
});
```

### Listing Models

```typescript
// List available models
const models = await client.models.list();
console.log(models);
```

### Chat Completion

```typescript
// Non-streaming chat completion example
const chat_completion = await client.chat.completions({
  model: "oxyapi/oxy-1-small",
  messages: [
    { role: "user", content: "Hello, how are you?" },
  ],
});
console.log(chat_completion.choices[0].message.content);

// Streaming chat completion example
const stream = await client.chat.completions({
  model: "oxyapi/oxy-1-small",
  messages: [
    { role: "user", content: "Tell me a story." },
  ],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0].delta.content);
}
```

### Tokenization

```typescript
// Count the number of tokens in a text
const token_count = await client.text.tokenize({
  model: "oxyapi/oxy-1-small",
  text: "This text will be tokenized.",
});
console.log(token_count);
```

## Features

### Key Features

- **Chat Completion**: Generate text in both streaming and non-streaming modes.
- **Tokenization**: Count the number of tokens in a given text.
- **Model Management**: List available models and their metrics.
- **Logging**: Integrated logging system for debugging.
- **Concurrency Management**: *(TODO: Not yet implemented)* Configure the maximum number of concurrent requests.

## Documentation

For detailed information on advanced SDK usage, refer to the [complete documentation](docs/guide.md).

## Examples

Usage examples are available in the [examples](examples/) directory.

## Contributing

Contributions are welcome! To contribute:

1. Fork the project.
2. Create a branch for your feature (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push the branch (`git push origin feature/my-feature`).
5. Open a Pull Request.

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.

