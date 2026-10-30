# SETU — the Missing-Handover Detector

A front-end prototype for the SEVA First Innovation Challenge. **Fictional data only. No real messages, government integrations, production authentication, AI, or field-tested results.**

## Run

Use Node.js 22.12+ (validated with Node 24) and npm:

```sh
npm ci
npm run dev
```

`npm run build` checks TypeScript and produces `dist/`. `npm test` runs the deterministic engine and repository tests. `npm run preview` serves the production build.

## Demonstrate

1. Start as Block Officer. The initial virtual day is 7: the Asha/Rohan digest reads **1 amber, 1 red**.
2. Drag the clock to day 0. Both services are pending. At day 2 Asha's school acknowledges; at day 4 Rohan's unanswered anganwadi request becomes overdue. At day 7 unresolved tasks reach the block officer.
3. Move to day 9: Rohan's service is confirmed. Day 10: Asha's school admission is confirmed. The example resolves in a median 9.5 days. These are explicitly scheduled synthetic responses, not external messages.
4. Switch to Field Worker, record a fictional departure with guardian consent, and select services. This first build scopes new departures to Baramati.
5. Switch to Receiver, select that child and reply received / confirmed / problem. Switch back to Block Officer to see the result.
6. Review the audit trail, inspect a handover, print the digest, switch Marathi/English, or reset the demo.

The clock may be rewound to replay scheduled and manually recorded responses. Audit history is retained when rewinding, so replaying a transition records another demo clock action. Local storage preserves state when available; otherwise the current session uses memory. Reset removes only this application's fictional records.

## Folder map

```text
src/
  App.tsx                 Dashboard, departure, receiver, audit, safeguards
  components/button.tsx   shadcn-style Radix/CVA button primitive
  data/
    types.ts              Domain contracts
    seed.ts               60 fictional children, 30 institutions
    engine.ts             Pure evaluate(tasks, rules, currentDay)
    repository.ts         Data access, simulated scope, persistence, mutations
    *.test.ts             Rule and role regression checks
  i18n.ts                 English/Marathi interface resources
  store.ts                Zustand UI state
  styles.css              Responsive civic design system
  main.tsx                Bootstrap and error boundary
```

## Replace mock storage

UI code only calls `repository`; it never imports `seed.ts`. Replace the adapter with API calls and make loading/error handling asynchronous when connecting a backend. Implement real server-side authentication, row-level authorization, consent controls, append-only auditing and validated messaging delivery before handling real data. Client-side role switching is a demonstration, not a security boundary. The first version deliberately has no backend or secret requirements.

## Scope and limitations

This is the Part A first build: dashboard, shared data, virtual clock, silence rules, departure form, receiver simulator, basic details and audit. Default escalation is day 2 reminder / day 4 supervisor / day 7 block officer. Acknowledged tasks remain amber; unacknowledged overdue tasks are red. Delivery channels are simulated from institution channel availability, not real delivery attempts. Institution and role identities are fictional; non-admin demo roles use Baramati scope. This first build does not yet implement per-institution receiver identity.

Part B features (React Flow case graphs, season moves, rules/directory editing, Orphan Radar, capacity/arrivals, RTE letters, 200-case simulator, research comparison and guided demo) remain future work. Departure forms require online page availability and are not an offline PWA. Marathi core labels are included; service labels and supporting copy are partly English and need native-speaker review. Research/legal claims must be independently verified before a real pilot. Do not enter real personal information.
