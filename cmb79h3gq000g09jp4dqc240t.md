---
title: "Prism – Seamlessly Integrate LLMs into Your Laravel Applications"
seoTitle: "Prism – Seamlessly Integrate LLMs into Your Laravel Applications"
seoDescription: "Large Language Models (LLMs) have transformed the landscape of artificial intelligence—enabling everything from smart chatbots and content generation to adv"
datePublished: 2025-05-28T01:23:13.226Z
cuid: cmb79h3gq000g09jp4dqc240t
slug: prism-seamlessly-integrate-llms-into-your-laravel-applications
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748395263494/51998caf-0b9f-49aa-b734-0383e9cf4541.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1748395335464/22b3d020-18e7-47ca-9827-cd6c5657697a.png
tags: prisma, openai, xai, anthropic, llms, ollama, mistralai, deepseek, prism-seamlessly-integrate-llms-into-your-laravel-applications

---

## 🚀 Introduction

Large Language Models (LLMs) have transformed the landscape of artificial intelligence—enabling everything from smart chatbots and content generation to advanced, AI-driven applications. But integrating different AI providers into your Laravel project can quickly become complex and messy.

**Prism** is here to simplify that process.

It offers a **unified interface** to interact with multiple LLM providers like OpenAI, Anthropic, Mistral, and more—allowing you to focus on **building AI features**, not managing API quirks.

---

## 🧠 Quick Example

```php
phpCopyEdituse Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;

$response = Prism::text()
    ->using(Provider::Anthropic, 'claude-3-7-sonnet-latest')
    ->withSystemPrompt(view('prompts.system'))
    ->withPrompt('Explain quantum computing to a 5-year-old.')
    ->asText();

echo $response->text;
```

Or use the fluent `prism()` helper for brevity:

```php
phpCopyEditprism()
    ->text()
    ->using(Provider::OpenAI, 'gpt-4')
    ->withPrompt('Explain quantum computing to a 5-year-old.')
    ->asText();
```

---

## 🌟 Key Features

* **Unified API Across Providers:** Switch between AI providers like OpenAI, Anthropic, and Ollama without rewriting your application logic.
    
* **Custom Tooling System:** Define tools that can interact directly with your application’s business logic.
    
* **Image Support:** Work with multi-modal models that can handle both text and images.
    
* **Fluent, Laravel-style Syntax:** Intuitive and expressive API that feels native to Laravel developers.
    

---

## 🧩 Supported Providers

Prism currently supports a growing list of major AI providers:

* ✅ OpenAI
    
* ✅ Anthropic
    
* ✅ Mistral
    
* ✅ Ollama
    
* ✅ Groq
    
* ✅ DeepSeek
    
* ✅ xAI
    
* (and more to come)
    

> ⚠️ Note: Some features (like streaming, embeddings, image input, tool calling) may vary depending on the specific model. Check the provider’s documentation for details.

---

## 🛠️ Installation

### Requirements

* PHP &gt;= **8.2**
    
* Laravel &gt;= **11.0**
    

### Step 1: Install via Composer

```apache
bashCopyEditcomposer require prism-php/prism
```

> 📌 **Tip:** To avoid potential breaking changes, it's recommended to pin to a specific version. Example:  
> `"prism-php/prism": "^0.3.0"`

### Step 2: Publish the Configuration

```apache
bashCopyEditphp artisan vendor:publish --tag=prism-config
```

This will generate a `config/prism.php` file where you can customize providers, default models, API keys, and more.

---

## 🧪 Inspired by Vercel AI SDK

Prism takes inspiration from the Vercel AI SDK—known for its modern, developer-friendly design—and adapts it beautifully into the Laravel ecosystem. If you’re a Laravel developer, Prism will feel like a natural extension of your toolkit.

---

## 💡 Final Thoughts

If you’re building AI-powered features in Laravel, **Prism** is the perfect companion to help you:

* Move faster
    
* Write cleaner code
    
* Seamlessly switch between AI providers
    

> 👉 Try it out today and unlock the full potential of LLMs in your Laravel applications!

For more information and detailed documentation, visit the [official Prism website](https://prismphp.com/).