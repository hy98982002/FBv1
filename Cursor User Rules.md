\# Cursor User Rules (Security Enhanced - English Version)

**# Please communicate with me in Chinese throughout the project**

 

\# =============================

\# 🧑‍💻 Developer Preferences

\# =============================

 

\- Start explanations with analogies or simple metaphors, then gradually introduce technical terms.

\- When answering code-related questions, always check for possible errors or outdated practices first.

\- For UI-related tasks (e.g., Bootstrap, Vue), always include both structure and code examples.

\- Responses should be structured clearly and step-by-step, avoiding vague or general descriptions.

 

\# =============================

\# 🔐 Security & Confidentiality Guidelines

\# =============================

 

\- Never hardcode sensitive information such as passwords, API keys, JWT secrets, or database credentials into source files.

\- Always use environment variables or a `.env` file, and ensure the `.env` file is listed in `.gitignore`.

\- If sensitive data is detected in committed files, proactively remind me and suggest a fix.

\- **When I request to upload the project to GitHub (especially public repositories), always remind me to check for the following:**

 \- `.env` file is properly listed in `.gitignore`

 \- No hardcoded credentials or tokens in `settings.py`, `.ts`, or `.js` files

 \- No database hostnames, secrets, or private keys included

\- If any of the above risks are found, please suggest improvements before proceeding with the upload.

 

 

\# =============================

\# 🔐 Enhanced Git Upload Protection (Merged & Translated Version)

\# =============================

 

\- **Strictly prohibit** hardcoding sensitive information (such as database passwords, API keys, JWT secrets) into any code files (including `.py`, `.js`, `.ts`, `.vue`, `.json`, `.html`, etc.).

\- All sensitive data **must** be injected via `.env` files, and ensure `.env` is excluded by `.gitignore` and has **never been committed**.

\- Before every Git upload, enforce the following checks (recommend using Git Hooks):

1. ✅ `.env` is untracked and `.gitignore` is properly configured;
2. ✅ Entire project (including `.md`, `.txt`, test scripts) contains **no plain-text credentials**;
3. ✅ Exclude all irrelevant files and folders such as `.idea/`, `.vscode/`, `.cursor/`, `.specstory/`, `venv/`, `__pycache__/`, `dist/`, `node_modules/`, `.DS_Store`, `Thumbs.db`;
4. ✅ Treat all `.md` files as **public documents** unless the repository is private. Do **not** include the following:

   \- Internal deployment diagrams / hostnames / IP addresses

   \- Database connection settings / SMTP config / secret invocation details

   \- Test logs, error traces, real usernames or any sensitive identifiers

\- If any credentials are found in the code, immediately abort the commit, regenerate the credentials, update the `.env`, and **rewrite Git history** (e.g., using `git filter-repo`).

 

 

\# =============================

\# 🌐 SEO-Aware Development Guidelines

\# =============================

 

\- Assume the site will undergo full SEO optimization later — **all code should be written with SEO in mind from the beginning**.

\- Prefer semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, etc.) to improve crawlability.

\- Ensure headings (`<h1>`–`<h6>`) follow a proper hierarchy — only one `<h1>` per page, followed by `<h2>`, `<h3>` as needed.

\- Use descriptive, unique `title` and `meta description` tags on all major pages.

\- Prefer client-side routing with SSR/SSG fallback if SEO is important (e.g., use Nuxt or Django SSR if applicable).

\- All image tags must include meaningful `alt` attributes.

\- All links must use `<a>` tags with descriptive anchor text (`href="/courses/vue"` is better than `href="#"`).

\- Avoid hiding important content behind JS unless pre-rendering or fallback content is available.

\- Page load speed is critical — use lazy loading for large assets, and optimize image sizes.

\- Use clean, readable URLs (e.g., `/courses/python` instead of `/course?id=123`).

\- If using Vue Router, enable history mode and ensure correct server fallback to support clean URLs.

\--------------------------------------------------------------------------------

主动阅读项目中的README.md

安装python的库优先使用镜像源：清华     https://pypi.tuna.tsinghua.edu.cn/simple

阿里云     https://mirrors.aliyun.com/pypi/simple/

中科大     https://pypi.mirrors.ustc.edu.cn/simple/

 

————————————————————————————————————————

 

🔐 Security Best Practices for Django 5.2 Projects (UAI Platform)

These practices help ensure secure authentication and API handling for your UAI education platform backend.

 

1. Password and Account Management

Use Django's built-in authentication system: Leverage django.contrib.auth's user model and password handling. Django defaults to PBKDF2 + SHA256, providing strong protection against brute-force attacks.

 

No plaintext password storage: Never log or store passwords in plain text, whether in DB, logs, or sessions.

 

Strong password policy: Enforce minimum length, complexity, and encourage the use of strong passwords via validation logic.

 

Secure password reset flow: Use Django’s built-in PasswordResetView, PasswordResetConfirmView, etc. Avoid building your own reset logic.

 

2. Authentication and Authorization

Session security: Enable Django sessions and set SESSION_COOKIE_SECURE, CSRF_COOKIE_SECURE to enforce HTTPS cookie transport.

 

CSRF protection: Apply CSRF tokens for all state-changing requests (POST, PUT, DELETE). Django’s CsrfViewMiddleware handles this by default.

 

Permission control: Use decorators like @login_required, @permission_required, or custom permissions (e.g., in DRF) to prevent privilege escalation.

 

3. Input & Output Security

Validate all user input: Use Django Forms and DRF Serializers for strict server-side validation and filtering.

 

Prevent SQL injection: Stick to Django ORM—never manually interpolate SQL with user input.

 

Prevent XSS: Templates auto-escape by default. If raw HTML is necessary, sanitize it through a whitelist or filtering method.

 

4. Configuration Security

Secrets via environment variables: Never hardcode SECRET_KEY, database credentials, or tokens in code or version control. Use .env or secret managers.

 

Security middleware: Enable SecurityMiddleware and configure:

 

SECURE_BROWSER_XSS_FILTER

 

SECURE_CONTENT_TYPE_NOSNIFF

 

HTTPS and HSTS: In production, enforce HTTPS with valid SSL certificates (SECURE_SSL_REDIRECT) and enable HSTS to guard against MITM attacks.

 

5. API & Token Security

Token-based auth: If using Django REST Framework (DRF), prefer JWT (e.g. via SimpleJWT) or TokenAuthentication, and limit token lifetime with refresh support.

 

Restrict API access: Protect sensitive API endpoints with appropriate permissions.

 

CORS settings: Use django-cors-headers and whitelist only trusted frontend domains for cross-origin access.

 

6. Other Security Practices

Keep dependencies updated: Regularly upgrade Django and third-party packages to patch known vulnerabilities.

 

Audit logging: Log only necessary information. Avoid logging sensitive data like credentials. Protect logs and follow GDPR/privacy rules.

 

Error handling: Disable DEBUG=True in production. Use custom error pages to avoid stack trace leakage.

 

Brute-force protection: Consider using third-party packages or middleware to rate-limit login attempts and block abusive IPs.