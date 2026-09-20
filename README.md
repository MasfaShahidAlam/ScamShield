# ScamShield AI

> Don't just detect scams — understand them.

ScamShield AI is an AI-powered scam detection web application that helps users understand suspicious messages before they click, reply, or share personal information.

## What It Does

Users can paste a suspicious SMS, email, WhatsApp message, job offer, or online offer into ScamShield AI.

The application analyzes the message and provides:

- Risk score from 0–100
- Risk level: Safe, Suspicious, or High Risk
- Scam category
- Highlighted red-flag phrases
- Simple explanation of why the message may be suspicious
- Recommended actions for the user

## How It Works

1. The user pastes a suspicious message.
2. ScamShield AI sends the message to the analysis API.
3. Google Gemini analyzes the message.
4. The response is validated using Zod.
5. The application displays the risk score, scam category, red flags, explanation, and recommended actions.

## Scam Categories

- Phishing
- Prize/Lottery Scam
- Romance Scam
- Job Scam
- Investment/Crypto Scam
- Impersonation Scam
- Package/Delivery Scam
- Not a Scam

## Tech Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- Google Gemini API
- Zod
- Lucide React

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd scamshield-ai