# KreyolConnect Agent Operational Rules
These rules strictly apply to any AI assistant executing inside this repository.

1. **Phase Lock:** Do not advance to a new Phase without explicit user approval.
2. **Translation Parity:** Any text added to `packages/i18n/en.json` MUST immediately be translated and added to `packages/i18n/ht.json`.
3. **No Placeholders:** Use realistic, complete, meaningful copy related to Haitian immigration affairs. "Lorem Ipsum" is banned.
4. **Mobile First:** UI components in `apps/web` must be responsive, defaulting to 375px mobile layouts.
5. **Database State:** Never alter the database directly. Always define in `schema.prisma` and use `prisma migrate dev`.
6. **Logging:** Mask all PII (Email, Phone) in backend log output.
