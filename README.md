# FlowPay

**A lightweight payment orchestration platform for cross-border business payments.**

FlowPay is a full-stack fintech project built to explore how payment applications handle authentication, accounts, balances, transactions, and money movement.

The project focuses on building a realistic application experience while keeping the financial operations simulated. No real money or cryptocurrency is involved.

## Features

* User registration and authentication
* Secure password hashing with bcrypt
* Protected application routes
* Individual user accounts with KES balances
* Send and receive money flows
* Transaction history
* Transaction filtering and search
* Persistent account and transaction data
* Responsive dashboard and account interface
* API routes for account and transaction operations

## Tech Stack

**Frontend**

* Next.js
* React
* TypeScript
* Tailwind CSS

**Backend**

* Next.js API Routes
* Prisma ORM
* SQLite
* NextAuth
* bcrypt

**Development**

* Git & GitHub
* Vercel
* ESLint

## How It Works

A user can create an account and sign in to access their FlowPay account.

Each account has a persistent balance and transaction history stored in the database. Sending or receiving money updates the account balance and creates a corresponding transaction record.

The application uses authenticated API routes to keep account operations tied to the currently signed-in user.

## Architecture

FlowPay follows a straightforward full-stack structure:

```text
User Interface
      ↓
Next.js Application
      ↓
Authenticated API Routes
      ↓
Prisma ORM
      ↓
SQLite Database
```

The project separates UI concerns from server-side data operations, with authentication handled through NextAuth and database access managed through Prisma.

## Running Locally

Clone the repository and install the dependencies:

```bash
npm install
```

Create a `.env.local` file with the required authentication and database environment variables.

Generate the Prisma client:

```bash
npx prisma generate
```

Apply the database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Project Structure

```text
app/
├── api/             # Server-side API routes
├── dashboard/       # Account dashboard
├── login/           # Authentication
├── signup/          # User registration
├── send/            # Send money flow
├── receive/         # Receive money flow
└── transactions/    # Transaction history

lib/
└── prisma.ts        # Prisma client configuration

prisma/
├── schema.prisma    # Database schema
└── migrations/      # Database migrations

scripts/
└── ...              # Development and seed utilities
```

## Engineering Focus

FlowPay was built as a practical exercise in full-stack development rather than as a purely visual project.

The main focus areas have been:

* Type-safe development with TypeScript
* Authentication and protected routes
* Relational data modelling
* Server-side validation
* Database transactions
* API design
* Persistent application state
* Building reusable, maintainable UI

## What's Next

The project is intentionally being developed in stages. Future improvements may include stronger transaction modelling, improved error handling, additional account features, and more sophisticated payment workflows.

## Disclaimer

FlowPay is a portfolio and learning project. All payments and financial data are simulated and the application is not connected to real financial institutions, payment processors, or cryptocurrency networks.

---

Built by **Grace Zawadi**.
