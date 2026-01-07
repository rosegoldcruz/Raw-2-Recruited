---
applyTo: '**'
---
# 🚨 YOU ARE WINDSURF AND THIS IS THE AEON SECURITY & EXECUTION RULEBOOK

## 🔐 SECTION 1 — SUPREME SECURITY LAWS (UNBREAKABLE)

Windsurf MUST enforce these aggressively:

### 1. NEVER commit secrets — EVER

Windsurf is forbidden from writing API keys, tokens, URLs, service role keys, or passwords into:

* source files
* commits
* logs
* comments
* examples
* metadata
* "temporary" folders

Anytime Windsurf sees a secret, it must immediately:

* move it into `.env`
* add the variable to `.env.example` (never the real one)
* ensure `.env` is in `.gitignore`
* rewrite code to use `process.env.*`

### 2. AUTO-CREATE .env AND AUTO-GITIGNORE IT

Whenever creating:

* `/frontend/.env.local`
* `/backend/.env`
* `/supabase/.env`
* `/config/.env`

Windsurf must ALWAYS:

* add it to `.gitignore`
* never commit it
* never preview its contents
* never print the real values

### 3. STRIP ALL SENSITIVE DATA BEFORE COMMIT

Windsurf must automatically check:

* no secrets in history
* no credentials embedded in migrations, config files, or API calls
* no public URLs with keys appended

### 4. NEVER EXPOSE SUPABASE SERVICE ROLE KEYS

* Only server code may use service keys.
* Never allow them into frontend.
* Windsurf must rewrite any violation immediately.

### 5. ENFORCE "ENV OR NOTHING" RULE

If a value is dynamic, environment-based, secret, or configurable:

**❌ NO:**

* NO hardcoded values
* NO fallback "defaults" that include keys
* NO embedding into any build artifact

**✔ MUST:**

* MUST be environment variables
* MUST be typed imports
* MUST validate existence on startup

---

**❌❌❌❌  END OF SECTION 1  ❌❌❌❌**

---

## 🛡 SECTION 2 — AEON EXECUTION RULES (THE WORKFLOW)

### 6. Execute tasks as MODULE batches, not scattered edits

After every module implementation Windsurf must:

* Refactor
* Lint
* Type-check
* Boot & Verify runtime
* Scan for potential security leaks
* Commit only the safe, validated changes

### 7. AUTO-HEAL + AUTO-OPTIMIZE

When Windsurf detects:

* broken imports
* unused code
* duplicated logic
* outdated API calls
* type mismatches
* folder restructuring needs

It MUST:

* repair automatically
* refactor safely
* do NOT alter business logic
* maintain AEON conventions

### 8. NEVER MODIFY UNRELATED CODE

Every operation must be scoped ONLY to:

* the specified module
* the specified files
* the specified function boundaries

It MUST NOT:

* restructure the project
* rename folders
* alter UI
* delete files
* rewrite unrelated logic

Unless explicitly told.

## ⚔️ SECTION 3 — AEON-OPTIMIZED DEVELOPMENT RULES

### 9. All code must follow AEON coding style

* clean
* modular
* typed
* scalable
* AI-friendly
* future-proof

**No shortcuts.**

### 10. All migrations must be reversible, atomic, and zero-risk

When editing anything data-layer:

* Windsurf must create a reversible migration
* Must ensure production safety
* Must NOT drop data without explicit user permission

### 11. After each batch task, Windsurf MUST confirm the following before stopping:

**AEON COMPLETION CHECKLIST:**

* [ ] All files compile
* [ ] App boots without error
* [ ] No missing imports
* [ ] No unused imports
* [ ] No untyped any
* [ ] No TypeScript errors
* [ ] No console errors
* [ ] No security warnings
* [ ] No .env leakage into git
* [ ] No broken endpoints
* [ ] No partial implementations

If ANY fail:

* ❌ Windsurf MUST continue working
* ✔ until the task is 100% complete

## ⚙️ SECTION 4 — AEON FORT KNOX GIT RULES

### 12. All secrets must be auto-scrubbed from commits

Before each commit Windsurf must:

* scan diff for patterns that look like keys
* block commit if found
* rewrite code to use env

### 13. .gitignore MUST include:

```gitignore
.env
.env*
/config/*.env
supabase/.temp
supabase/.cache
node_modules/
.next/
dist/
```

## 💀 SECTION 5 — ABSOLUTE "DO NOT EVER DO THIS" RULES

Windsurf is FORBIDDEN from:

* ❌ Hardcoding API keys
* ❌ Hardcoding Supabase URLs
* ❌ Hardcoding JWT secrets
* ❌ Printing secrets in terminal logs
* ❌ Uploading .env files
* ❌ Committing .env.example with real values
* ❌ Generating code that embeds sensitive config
* ❌ Overwriting project structure unless told
* ❌ Making assumptions about schema names or types

## 🔥 SECTION 6 — AEON AUTHORITY & CHAIN OF COMMAND

Windsurf must treat all prompts as:

* **TASK**
* **DIRECTIVE**
* **NON-NEGOTIABLE**
* **SELF-CHECKING**
* **FAIL-SAFE**
* **ZERO-STOP UNLESS COMPLETE**

Exactly how AEON evolves its agents.

---

# 🧬 AEON RULE #2 — THE CONTINUOUS BOOTSTRAP SESSION STRUCTURE

*(The Self-Mapping, Self-Auditing, Never-Lose-the-Plot Enforcement Rule)*

## 🚨 CORE COMMAND

For every new module, every file change, every migration, every backend update, every Next.js page, every schema edit, every refactor… Windsurf MUST automatically regenerate and update the AEON Bootstrap Session Structure.

**This is mandatory and must be run on every task.**

## 🔥 WHAT THE BOOTSTRAP SESSION STRUCTURE IS

It is an always-up-to-date JSON/YAML (or TypeScript object) that contains the entire system shape:

### 1. FILE MAP

All directories + important files:

* `/frontend/app`
* `/frontend/components`
* `/backend/routers`
* `/backend/services`
* `/backend/db`
* `/backend/models`
* `/schemas`
* `/lib`
* `/utils`
* `/config`
* etc.

### 2. ACTIVE MODULES

Structured like:

```json
{
  "modules": {
    "intake": { "status": "complete", "routes": [...], "db": [...] },
    "homeowners": { "status": "complete", "routes": [...], "db": [...] },
    "leads": { "status": "complete", "routes": [...], "db": [...] },
    "jobs": { "status": "in_progress", "routes": [...], "db": [...] },
    "contractors": { "status": "pending" },
    "suppliers": { "status": "complete" },
    "quotes": { "status": "complete" }
  }
}
```

### 3. DATA SCHEMA SNAPSHOT

Every table, every model, every type.

### 4. ROUTER MAP

Every backend endpoint, method, path, and function.

### 5. DEPENDENCY GRAPH

Which modules depend on which.

### 6. QUEUED TASKS

What AEON hasn't built yet.

### 7. EXECUTION ORDER

The strict order the system must evolve in.

### 8. SESSION LOG

A record of changes, updates, migrations, commits.

## ⚙️ WHAT WINDSURF MUST DO WITH THIS STRUCTURE

### A. Regenerate it after EVERY task

* If a file changed → rebuild the map
