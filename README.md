# FlowPay

**A lightweight payment orchestration platform for cross-border business payments.**

FlowPay is a full-stack fintech simulation built to explore how modern payment platforms can handle accounts, balances, transactions, authentication and payment workflows through a clean, intuitive interface.

The project is being developed with a focus on **real application architecture, relational data modelling, authentication, API design and engineering quality** rather than simply creating a static UI.

> **Important:** FlowPay is a portfolio and learning project. It does not process real money, cryptocurrency or live financial transactions.

---

## Overview

Managing payments should feel simple even when the systems behind them are complex.

FlowPay explores that idea by providing a lightweight payment experience where users can:

* Create an account
* Securely log in
* View their account balance
* Send and receive money within the simulation
* View transaction history
* Manage payment activity through a simple dashboard

The interface intentionally combines a soft, approachable visual identity with the structure and clarity expected from a financial product.

---

## Current Features

### Authentication

* User registration
* Password hashing with `bcryptjs`
* Credentials-based authentication with Auth.js
* Protected application routes
* Session-based user identification
* Login and logout flows

### Accounts

* One account associated with each user
* Account balance stored in the database
* Currency support
* Authenticated dashboard
* Real-time balance retrieval from the database

### Transactions

* Relational transaction model
* Send and receive transaction types
* Transaction amounts
* Transaction descriptions
* Transaction status
* Transaction timestamps
* Account-to-transaction relationship

### Dashboard

* Personalized welcome message
* Authenticated user information
* Database-backed account balance
* Recent transaction activity
* Quick actions for sending and receiving money

### User Experience

* Responsive interface
* Reusable FlowPay branding components
* Consistent design system
* Clear navigation
* Accessible form labels and feedback
* Subtle interaction states and animations

---

## Tech Stack

| Technology       | Purpose                                 |
| ---------------- | --------------------------------------- |
| **Next.js**      | Full-stack React framework              |
| **React**        | User interface                          |
| **TypeScript**   | Type-safe application development       |
| **Tailwind CSS** | Styling and responsive design           |
| **Auth.js**      | Authentication and sessions             |
| **Prisma**       | Database ORM and relational data access |
| **SQLite**       | Local development database              |
| **bcryptjs**     | Password hashing                        |
| **tsx**          | Running TypeScript development scripts  |
| **Vercel**       | Deployment                              |

---

## Architecture

FlowPay currently follows a full-stack Next.js architecture.

```text
┌─────────────────────────────┐
│          Browser            │
│                             │
│  Dashboard / Send / Login   │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│         Next.js             │
│                             │
│  Server Components          │
│  API Routes                 │
│  Authentication             │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│           Prisma            │
│                             │
│  User                       │
│  Account                    │
│  Transaction                │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│          SQLite             │
│                             │
│      Development DB         │
└─────────────────────────────┘
```

---

## Data Model

FlowPay currently models three core entities:

```text
User
 │
 │ 1 : 1
 ▼
Account
 │
 │ 1 : many
 ▼
Transaction
```

### User

Stores identity and authentication information.

```text
id
name
email
passwordHash
createdAt
updatedAt
```

### Account

Represents the user's FlowPay account.

```text
id
userId
balance
currency
createdAt
updatedAt
```

### Transaction

Represents activity against an account.

```text
id
accountId
type
amount
description
status
createdAt
```

This relational structure allows the application to retrieve a user's account and its associated financial activity rather than relying on hard-coded interface data.

---

## Project Structure

```text
flowpay/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   └── signup/
│   │
│   ├── dashboard/
│   ├── login/
│   ├── receive/
│   ├── send/
│   ├── signup/
│   ├── transactions/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── flowpay-logo.tsx
│   └── page-header.tsx
│
├── lib/
│   └── prisma.ts
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── scripts/
│   └── seed-transactions.ts
│
├── auth.ts
├── proxy.ts
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have:

* Node.js 22+
* npm
* Git

### Clone the repository

```bash
git clone <repository-url>
cd flowpay
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file:

```env
AUTH_SECRET="your-auth-secret"
```

For local database development, Prisma uses SQLite.

The local database is intentionally excluded from version control.

### Set up the database

Run the Prisma migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma client:

```bash
npx prisma generate
```

### Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Development Workflow

FlowPay is being developed incrementally.

Major changes follow a simple workflow:

```text
Build
  ↓
Run TypeScript checks
  ↓
Run ESLint
  ↓
Test in browser
  ↓
Commit
  ↓
Push
```

Type checking:

```bash
npx tsc --noEmit
```

Linting:

```bash
npm run lint
```

Development server:

```bash
npm run dev
```

Database migrations:

```bash
npx prisma migrate dev
```

Prisma Client generation:

```bash
npx prisma generate
```

---

## Database Development

FlowPay uses Prisma migrations to keep the database schema versioned.

When making a schema change:

```bash
npx prisma migrate dev --name describe_the_change
```

Then regenerate the client:

```bash
npx prisma generate
```

Database files are kept local and are **not committed to Git**.

This prevents development data and local database files from becoming part of the application source code.

---

## Security Considerations

Although FlowPay is a simulation, the project intentionally follows practices relevant to real applications.

### Passwords

Passwords are never stored in plain text.

They are hashed using `bcryptjs` before being persisted.

### Authentication

Protected application routes require an authenticated session.

### Environment Variables

Secrets and local environment configuration are excluded from version control.

### Database Access

Database operations are performed through Prisma rather than directly manipulating database files from the application UI.

### Financial Integrity

The current application is a simulation and does not connect to real financial institutions or payment networks.

A production implementation would require substantially more controls around:

* Authorization
* Idempotency
* Transaction atomicity
* Double-entry accounting
* Concurrency
* Fraud prevention
* Audit logging
* Encryption
* Payment-provider integration
* Regulatory compliance

---

## Design Philosophy

FlowPay intentionally avoids the visual patterns commonly associated with generic AI-generated fintech interfaces.

The design focuses on:

* Calm visual hierarchy
* Strong typography
* Generous whitespace
* Restrained colour usage
* Clear financial information
* Soft feminine details without compromising professionalism
* Subtle motion rather than excessive animation
* Interfaces that prioritize usability over decoration

The goal is for the product to feel **considered**, rather than simply assembled from UI components.

---

## Roadmap

### Completed

* [x] Initial FlowPay landing page
* [x] Responsive application layout
* [x] User signup
* [x] Password hashing
* [x] Auth.js credentials authentication
* [x] Protected routes
* [x] Prisma + SQLite setup
* [x] User database model
* [x] Account database model
* [x] Database-backed account balance
* [x] Transaction database model

### In Progress

* [ ] Seed transaction data
* [ ] Display real transaction history
* [ ] Replace dashboard mock activity
* [ ] Connect Send Money to the database
* [ ] Update account balance after transfers
* [ ] Connect Receive Money to the database
* [ ] Transaction validation
* [ ] Transaction error handling

### Future Improvements

* [ ] Atomic balance updates
* [ ] Idempotent transactions
* [ ] Transaction reference IDs
* [ ] Pagination
* [ ] Filtering and search
* [ ] Automated tests
* [ ] API validation
* [ ] Improved authorization
* [ ] Audit logging
* [ ] Production-grade database
* [ ] Payment provider integration
* [ ] Cross-border payment simulation
* [ ] Currency conversion simulation

---

## Engineering Goals

FlowPay is being built as more than a visual portfolio piece.

The project is intended to demonstrate practical experience with:

* Full-stack TypeScript
* Next.js application architecture
* React Server Components
* Authentication
* REST-style API routes
* Relational database design
* Prisma ORM
* Database migrations
* Secure password handling
* Server-side data fetching
* Form handling
* State management
* Error handling
* Git-based development workflows
* Deployment

The emphasis is on understanding **why** each layer exists and how the pieces communicate.

---

## Why FlowPay?

Payment infrastructure sits at the intersection of software engineering, financial systems and user experience.

Building FlowPay provides an opportunity to explore that intersection through a manageable simulation while developing skills that translate to larger fintech systems.

The project is intentionally being developed from the ground up rather than relying on a pre-built backend or mock API.

---

## Disclaimer

FlowPay is an educational and portfolio project.

It is **not a bank, payment service provider, financial institution or cryptocurrency platform** and should not be used to process real financial transactions.

All balances, accounts and transactions are simulated.

---

## Author

Built by **Grace Zawadi** as a full-stack TypeScript learning and portfolio project.

---

## License

This project is currently intended for educational and portfolio purposes.
