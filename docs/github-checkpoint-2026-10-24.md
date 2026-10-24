# GitHub publication checkpoint, 24 October 2026

The client requested the current local site be saved to `last-exit/CHEETA` on `main`. This checkpoint includes the collection journeys, founder film stills, Philosophy redesign and catchphrase, enlarged CEO credit, removal of small editorial subtext, and the earlier presentation, retail and mobile cleanup.

## Checks before publication

- [x] Fetched origin and confirmed no newer remote commits.
- [x] Reviewed tracked changes, additions and deletions; respected `.gitignore`.
- [x] Checked changed files for common credential patterns and GitHub file-size limits; no findings.
- [x] Type checking passed.
- [x] Production build passed.
- [x] All 18 existing tests passed.
- [x] No database migrations, feature-flag changes or cart-storage migrations.

The previous visual browser checks are documented in the collection and Philosophy review notes. These are local verification results, not a claim that remote CI or a Vercel deployment has completed.

## Deployment and rollback

Pushing `main` may trigger the existing Vercel integration. No separate manual deployment is requested. The previous GitHub checkpoint is `01ae77a8660f7d9b0c39a4896c8047b3dbeba499`. A rollback can restore that version through a normal revert commit without rewriting branch history. Consider rollback if the new deployment fails to load primary pages or campaign media, or breaks navigation or bag identity.

The existing readiness dependencies in `presentation-readiness.md` remain, including approved product imagery, genuine GT America files, real checkout integration and policy review. This publication checkpoint supersedes the earlier notes that the cleanup was local-only.
