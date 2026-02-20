# Featherless SDK Usage Guide

This guide provides detailed information on using the Featherless SDK to interact with the Featherless API.

## Table of Contents

- [Introduction](#introduction)
- [Configuration](#configuration)
- [Advanced Usage](#advanced-usage)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Introduction

The Featherless SDK is designed to simplify the integration of AI models into your TypeScript applications. It provides a simple and intuitive interface for interacting with the Featherless API.

## Configuration

### Initializing the Client

To initialize the Featherless client, you need to provide an API key. You can also configure other options such as the base URL, debug mode, and concurrency level.

```typescript
import { Featherless } from "featherless";

const client = new Featherless({
  api_key: process.env.FEATHERLESS_API_KEY, // Use environment variables for API key
  base_url: "https://api.featherless.ai/v1", // Optional
  debug: true, // Enable debug mode
  concurrency: 4, // Maximum number of concurrent requests
});
```

### Setting Up the API Key

It is recommended to set the API key using environment variables. Create a `.env` file in your project root and add the following:

```env
FEATHERLESS_API_KEY=your_api_key_here
```

Then, load the environment variables using a library like `dotenv`:

```typescript
import dotenv from "dotenv";
dotenv.config();
```

### Listing Models

You can list the available models and their metrics to choose the one that best fits your use case.

```typescript
const models = await client.models.list();
console.log(models);
```

## Advanced Usage

### Chat Completion

#### Non-Streaming Mode

Non-streaming mode returns the complete response at once.

```typescript
const chat_completion = await client.chat.completions({
  model: "oxyapi/oxy-1-small",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello, how are you?" },
  ],
  temperature: 0.7,
  max_tokens: 100,
});

console.log(chat_completion.choices[0].message.content);
```

#### Streaming Mode

Streaming mode returns the response in chunks, which is useful for long responses or real-time display.

```typescript
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

Tokenization allows you to count the number of tokens in a given text. This is useful for estimating the cost of requests or ensuring the text does not exceed the model's token limit.

```typescript
const token_count = await client.text.tokenize({
  model: "oxyapi/oxy-1-small",
  text: "This text will be tokenized.",
});
console.log(token_count);
```

## Error Handling

The Featherless SDK raises errors if there are issues with API requests. It is recommended to handle these errors to provide a better user experience.

```typescript
try {
  const chat_completion = await client.chat.completions({
    model: "oxyapi/oxy-1-small",
    messages: [
      { role: "user", content: "Hello, how are you?" },
    ],
  });
  console.log(chat_completion.choices[0].message.content);
} catch (error) {
  console.error("An error occurred:", error.message);
}
```

## Best Practices

### Model Usage

- **Model Selection**: Choose a model suited to your use case. Larger models generally offer better performance but are more expensive.
- **Token Management**: Use tokenization to estimate request costs and avoid exceeding the model's token limit.
- **Streaming Mode**: Use streaming mode for long responses or real-time display.

### Performance Optimization

- **Concurrency**: *(TODO: Not yet implemented)* Configure the concurrency level based on your needs. A higher level allows processing more requests simultaneously but may increase server load.
- **Debugging**: Enable debug mode to obtain detailed information about requests and responses, which can help identify issues.

### Security

- **API Key**: Do not share your API key or include it in your source code. Use environment variables to store it.
- **Secure Requests**: Ensure requests are made via HTTPS to protect sensitive data.
