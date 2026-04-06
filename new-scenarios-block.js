{
  id: "rp5",
  icon: "\ud83d\udcf1",
  title: "Design a Mobile-Ready Fiori App",
  difficulty: "Intermediate",
  estimatedTime: "18\u201322 min",
  tags: [
    "Responsive",
    "Mobile",
    "SAPUI5",
    "Fiori Elements"
  ],
  brief: "You are designing a Fiori app for field service technicians. The app must run equally well on tablets and phones, support fast offline metrics, and keep the UX simple for on-site workers.",
  competencies: [
    "Responsive Design",
    "Flexible Column Layout",
    "Mobile Performance",
    "Touch-Friendly UI",
    "Fiori Guidelines"
  ],
  steps: [
    {
      stepId: 1,
      ariaMessage: "**Question 1/3:** Which Fiori floor plan is best for a mobile service app with a compact list and detail view?",
      hint: "Think small screens + quick access",
      expectedKeywords: [
        "flexible column layout",
        "fcl"
      ],
      scoringKeywords: {
        excellent: [
          "flexible column layout",
          "fcl",
          "master/detail",
          "mobile friendly"
        ],
        good: [
          "master detail",
          "responsive",
          "phone",
          "tablet"
        ],
        partial: [
          "mobile",
          "detail"
        ]
      },
      correctAnswer: "Flexible Column Layout (FCL) with one or two columns on mobile. FCL adapts to phone and tablet by collapsing columns and providing a responsive master-detail experience.",
      explanation: "FCL is the standard pattern for responsive apps and works better than plain Object Page or List Report on phones.",
      responses: {
        excellent: "Excellent! \u2705 FCL is the right choice for a mobile field service app.\n\n**Question 2/3:** What SAPUI5 settings or annotations help the UI remain touch-friendly and fast?",
        good: "Good choice! FCL is the right mobile-friendly floor plan.\n\n**Question 2/3:** What settings or annotations make the app touch-friendly?",
        partial: "Close \u2014 mobile apps need a responsive master/detail structure.\n\n**Question 2/3:** What makes the UI touch-friendly on SAPUI5?",
        miss: "The best answer is Flexible Column Layout with a responsive phone/tablet presentation.\n\n**Question 2/3:** What makes the app touch-friendly and performant?"
      }
    },
    {
      stepId: 2,
      ariaMessage: "**Question 2/3:** Name two techniques to optimize SAPUI5 performance on slower mobile connections.",
      hint: "Large lists, image assets, startup",
      expectedKeywords: [
        "lazy loading",
        "component preload",
        "bundle"
      ],
      scoringKeywords: {
        excellent: [
          "lazy loading",
          "component preload",
          "manifest preload",
          "sap.ui.core.ComponentSupport",
          "virtual list"
        ],
        good: [
          "less data",
          "preload",
          "compress",
          "png"
        ],
        partial: [
          "performance",
          "load"
        ]
      },
      correctAnswer: "Use component preload / manifest preload, reduce initial payload, and enable list virtualization or lazy loading of images/data. Avoid loading large libraries and use compressed assets.",
      explanation: "Mobile performance hinges on smaller initial downloads and deferring non-essential resources until after startup.",
      responses: {
        excellent: "Excellent! \u2705 preload + virtualization are the right mobile performance techniques.\n\n**Question 3/3 (Final):** How do you test the app for real-device usability?",
        good: "Good answer! Preload and lazy loading are key to mobile SAPUI5 performance.\n\n**Question 3/3 (Final):** How do you validate the real-device experience?",
        partial: "Partial \u2014 mobile optimization needs reduced payload and deferred loading.\n\n**Question 3/3 (Final):** How should you test the mobile app?",
        miss: "The complete answer is preload + virtualization + minimal startup payload.\n\n**Question 3/3 (Final):** How do you ensure real-device usability?"
      }
    },
    {
      stepId: 3,
      ariaMessage: "**Question 3/3 (Final):** What tests validate mobile usability and responsive layout?",
      hint: "Device emulation, touch interaction, offline",
      expectedKeywords: [
        "device emulation",
        "accessibility",
        "performance",
        "offline"
      ],
      scoringKeywords: {
        excellent: [
          "device emulation",
          "chrome devtools",
          "touch gestures",
          "accessibility",
          "offline mode"
        ],
        good: [
          "responsive",
          "mobile browser",
          "test on phone",
          "slow network"
        ],
        partial: [
          "test",
          "device"
        ]
      },
      correctAnswer: "Test using device emulation and actual phones/tablets, verify touch gestures, breakpoint behavior, and offline load time. Check the app on slow 3G/4G networks and verify FCL columns collapse correctly.",
      explanation: "Real-device testing catches layout and performance issues that desktop emulators may miss.",
      responses: {
        excellent: "Excellent! \u2705 Test on both emulators and actual devices, including slow network scenarios.\n\nYou are ready to deliver a mobile-ready Fiori app.",
        good: "Great! Device emulation and real phones are the right way to validate mobile usability.\n\nNice work.",
        partial: "You are on the right track \u2014 real-device tests and responsive breakpoints are important.\n\nConsider slow networks too.",
        miss: "The right approach is to test on emulators plus real phones/tablets under slow network conditions.\n\nThat validates mobile usability fully."
      },
      isFinal: true
    }
  ],
  scoringAreas: [
    {
      area: "Responsive Design",
      maxPoints: 10
    },
    {
      area: "Mobile Performance",
      maxPoints: 10
    },
    {
      area: "Floor Plan Selection",
      maxPoints: 10
    },
    {
      area: "SAPUI5 Practices",
      maxPoints: 10
    },
    {
      area: "Testing Strategy",
      maxPoints: 10
    }
  ]
},

  {
  id: "rp6",
  icon: "\ud83d\udd10",
  title: "Secure BTP App with SAML Authentication",
  difficulty: "Advanced",
  estimatedTime: "20\u201325 min",
  tags: [
    "Security",
    "BTP",
    "SAML",
    "XSUAA"
  ],
  brief: "Your client requires an SAP BTP application that authenticates corporate users through Azure AD using SAML. The solution must use SAP best practices and preserve single sign-on.",
  competencies: [
    "XSUAA",
    "SAML",
    "Identity Provider",
    "Trust Configuration",
    "BTP Security"
  ],
  steps: [
    {
      stepId: 1,
      ariaMessage: "**Question 1/3:** Which SAP BTP component handles SAML-based user authentication?",
      hint: "Look at identity and trust",
      expectedKeywords: [
        "xsuaa",
        "ias",
        "saml",
        "identity provider"
      ],
      scoringKeywords: {
        excellent: [
          "xsuaa",
          "identity provider",
          "saml",
          "trust configuration",
          "ias"
        ],
        good: [
          "xsuaa",
          "idp",
          "authentication"
        ],
        partial: [
          "security",
          "sso"
        ]
      },
      correctAnswer: "SAP XSUAA is the BTP authentication service, typically configured to trust a SAML IdP such as Azure AD or SAP IAS. XSUAA enforces app authentication and authorization.",
      explanation: "XSUAA is the core BTP service for app security; it delegates SAML authentication to an external IdP.",
      responses: {
        excellent: "Excellent! \u2705 XSUAA is the service that integrates with the SAML IdP.\n\n**Question 2/3:** How do you configure the trust relationship for Azure AD?",
        good: "Correct \u2014 XSUAA is the BTP authentication service.\n\n**Question 2/3:** How is trust configured with Azure AD?",
        partial: "Good \u2014 the app uses BTP security services with SAML.\n\n**Question 2/3:** What trust setup is needed for Azure AD?",
        miss: "The right answer is XSUAA with a SAML identity provider trust.\n\n**Question 2/3:** How do you configure Azure AD trust?"
      }
    },
    {
      stepId: 2,
      ariaMessage: "**Question 2/3:** What are the key steps to set up a SAML trust between XSUAA and Azure AD?",
      hint: "Metadata exchange, certificate, issuer",
      expectedKeywords: [
        "metadata",
        "certificate",
        "issuer",
        "application"
      ],
      scoringKeywords: {
        excellent: [
          "metadata xml",
          "certificate",
          "issuer",
          "redirect uri",
          "audience"
        ],
        good: [
          "saml metadata",
          "xsuuaa config",
          "identity provider"
        ],
        partial: [
          "metadata",
          "certificate"
        ]
      },
      correctAnswer: "Exchange SAML metadata between Azure AD and XSUAA, configure the Azure AD application with the XSUAA issuer and reply URL, import the IdP certificate into XSUAA, and set the audience to the XSUAA service instance.",
      explanation: "SAML trust requires metadata exchange and certificate validation in both directions, plus correct reply and issuer URLs.",
      responses: {
        excellent: "Excellent! \u2705 Metadata exchange and certificate trust are the correct setup steps.\n\n**Question 3/3 (Final):** How do you verify the SAML flow during testing?",
        good: "Good! The trust requires metadata, issuer, reply URL, and certificate import.\n\n**Question 3/3 (Final):** How do you validate the SAML login?",
        partial: "Partially correct \u2014 metadata and certificate trust are the right ideas.\n\n**Question 3/3 (Final):** How would you test the SAML flow?",
        miss: "The full answer is metadata exchange, certificate import, issuer and reply URL configuration.\n\n**Question 3/3 (Final):** How do you test the authentication flow?"
      }
    },
    {
      stepId: 3,
      ariaMessage: "**Question 3/3 (Final):** What tests confirm that SSO works and only corporate users can access the app?",
      hint: "Log in, log out, unauthorized, group membership",
      expectedKeywords: [
        "sso",
        "unauthorized",
        "group",
        "audit",
        "test account"
      ],
      scoringKeywords: {
        excellent: [
          "sso",
          "unauthorized",
          "azure ad",
          "group assignment",
          "audit"
        ],
        good: [
          "login test",
          "logout",
          "restricted access"
        ],
        partial: [
          "test",
          "access"
        ]
      },
      correctAnswer: "Test login with Azure AD accounts, verify single sign-on across BTP applications, confirm unauthorized users are blocked, and validate user group/role mapping through XSUAA. Also check logout and expired session behavior.",
      explanation: "A complete security test covers valid login, SSO continuity, and denial of unauthorized access.",
      responses: {
        excellent: "Excellent! \u2705 You covered SSO, role mapping, and unauthorized access checks.\n\nThis is the right security validation routine.",
        good: "Great! Testing login, SSO, and unauthorized denial is the right approach.\n\nWell done.",
        partial: "You are on the right path \u2014 verify login and access controls.\n\nAlso test logout and unauthorized behavior.",
        miss: "The correct validation is to test Azure AD login, SSO behavior, and unauthorized user rejection.\n\nThat confirms the SAML security setup."
      },
      isFinal: true
    }
  ],
  scoringAreas: [
    {
      area: "BTP Security",
      maxPoints: 10
    },
    {
      area: "SAML Trust",
      maxPoints: 10
    },
    {
      area: "Authentication Design",
      maxPoints: 10
    },
    {
      area: "Access Control",
      maxPoints: 10
    },
    {
      area: "Validation & Testing",
      maxPoints: 10
    }
  ]
},

  {
  id: "rp7",
  icon: "\u26a1",
  title: "Optimize OData Performance for Large Lists",
  difficulty: "Intermediate",
  estimatedTime: "18\u201322 min",
  tags: [
    "Performance",
    "OData",
    "List Report",
    "CDS"
  ],
  brief: "A Fiori list report is too slow when users open a 50,000-row product list. Diagnose the OData flow and propose the fastest fix while keeping the UI behavior intact.",
  competencies: [
    "OData Optimization",
    "CDS Views",
    "Batch Requests",
    "Network Analysis",
    "SAP Performance"
  ],
  steps: [
    {
      stepId: 1,
      ariaMessage: "**Question 1/3:** What is the most likely OData cause of the slow list report?",
      hint: "Large data, many fields, few filters",
      expectedKeywords: [
        "$select",
        "$expand",
        "$batch",
        "n+1"
      ],
      scoringKeywords: {
        excellent: [
          "n+1",
          "$select",
          "$expand",
          "$batch",
          "payload"
        ],
        good: [
          "too many fields",
          "round trips",
          "query"
        ],
        partial: [
          "odata",
          "slow"
        ]
      },
      correctAnswer: "A common cause is missing $select/$expand and a resulting N+1 request pattern. The app is fetching too many fields or separate related entities instead of a single optimized query.",
      explanation: "Large lists must minimize payload and avoid repeated round trips. $select and $expand are the standard fixes.",
      responses: {
        excellent: "Excellent! \u2705 Missing $select/$expand and an N+1 pattern is the likely cause.\n\n**Question 2/3:** Which OData features reduce payload size?",
        good: "Good! The list likely fetches too much data or makes too many requests.\n\n**Question 2/3:** Which features trim the payload?",
        partial: "The issue is likely OData payload size and round trips.\n\n**Question 2/3:** What reduces the payload size?",
        miss: "The best answer is an OData query with $select and $expand instead of wide or repeated requests.\n\n**Question 2/3:** How do you reduce payload size?"
      }
    },
    {
      stepId: 2,
      ariaMessage: "**Question 2/3:** What query changes should you make in the CDS view or annotations to improve list performance?",
      hint: "Select only needed fields",
      expectedKeywords: [
        "@Consumption",
        "@DefaultAggregation",
        "$select",
        "navigation property"
      ],
      scoringKeywords: {
        excellent: [
          "@UI.lineItem",
          "@UI.selectionField",
          "@Aggregation.default",
          "#SUM",
          "$select"
        ],
        good: [
          "reduce fields",
          "navigation properties",
          "expand"
        ],
        partial: [
          "fields",
          "query"
        ]
      },
      correctAnswer: "Limit the line item fields to only those shown in the table, annotate related fields carefully, and enable $select by using @UI.lineItem and CDS projections. For related entities, use $expand only for necessary navigation properties.",
      explanation: "The UI should request only visible fields. CDS annotations can drive efficient $select behavior from the app.",
      responses: {
        excellent: "Excellent! \u2705 Narrow line item fields and use annotations to enforce $select.\n\n**Question 3/3 (Final):** How do you validate that the fix worked?",
        good: "Good! Only request the fields you display and expand related entities selectively.\n\n**Question 3/3 (Final):** How do you confirm the performance improvement?",
        partial: "Close \u2014 reduce fields and control expands.\n\n**Question 3/3 (Final):** How do you verify the speed increase?",
        miss: "The correct fix is to limit line item fields and use selective expand only where needed.\n\n**Question 3/3 (Final):** How do you prove the fix works?"
      }
    },
    {
      stepId: 3,
      ariaMessage: "**Question 3/3 (Final):** Which tools or metrics prove the list report is faster?",
      hint: "Network timing, sap-statistics, backend traces",
      expectedKeywords: [
        "Chrome DevTools",
        "sap-statistics",
        "response time",
        "payload"
      ],
      scoringKeywords: {
        excellent: [
          "Chrome DevTools",
          "sap-statistics=true",
          "payload size",
          "round trip",
          "batch"
        ],
        good: [
          "network tab",
          "response time",
          "backend timing"
        ],
        partial: [
          "test",
          "measure"
        ]
      },
      correctAnswer: "Use Chrome DevTools Network tab and ?sap-statistics=true to compare payload size, request count, and backend processing time before and after. Verify the list renders faster and the OData call returns fewer bytes.",
      explanation: "Real measurements prove optimization; SAP-specific statistics show backend improvements.",
      responses: {
        excellent: "Excellent! \u2705 Use both Chrome DevTools and sap-statistics to confirm the improvement.\n\nYou have a strong performance validation plan.",
        good: "Great! A network-based comparison with sap-statistics is the right validation.\n\nGood work.",
        partial: "You are close \u2014 measure the network and backend timings to validate the fix.\n\nThat confirms performance gains.",
        miss: "The right validation is network timing plus sap-statistics to compare before/after behavior.\n\nThat proves the optimization."
      },
      isFinal: true
    }
  ],
  scoringAreas: [
    {
      area: "OData Performance",
      maxPoints: 10
    },
    {
      area: "CDS & Annotations",
      maxPoints: 10
    },
    {
      area: "Network Diagnostics",
      maxPoints: 10
    },
    {
      area: "Query Optimization",
      maxPoints: 10
    },
    {
      area: "Validation",
      maxPoints: 10
    }
  ]
},

  {
  id: "rp8",
  icon: "\ud83d\udce6",
  title: "Add Offline Support to a Fiori App",
  difficulty: "Advanced",
  estimatedTime: "22\u201326 min",
  tags: [
    "Offline",
    "SAPUI5",
    "Service Worker",
    "Cache"
  ],
  brief: "A sales app must work offline in remote warehouses. It should cache product data, allow updates locally, and sync changes when the connection returns.",
  competencies: [
    "Offline Support",
    "Service Worker",
    "LocalStorage",
    "Synchronization",
    "Fiori App Lifecycle"
  ],
  steps: [
    {
      stepId: 1,
      ariaMessage: "**Question 1/3:** Which SAPUI5 mechanism supports offline data caching for a browser-based Fiori app?",
      hint: "Think network independent, assets and data",
      expectedKeywords: [
        "service worker",
        "offline plugin",
        "cache"
      ],
      scoringKeywords: {
        excellent: [
          "service worker",
          "offline plugin",
          "application cache",
          "manifest"
        ],
        good: [
          "cache",
          "offline mode",
          "local storage"
        ],
        partial: [
          "offline",
          "cache"
        ]
      },
      correctAnswer: "A Service Worker with an offline plugin and cache strategy is the browser-native way to support offline SAPUI5 apps. It can cache assets and enable request interception.",
      explanation: "SAPUI5 can use standard Service Workers for progressive web app offline support.",
      responses: {
        excellent: "Excellent! \u2705 Service Worker is the correct offline mechanism.\n\n**Question 2/3:** What must the app do when it comes back online?",
        good: "Good! Service Worker is the right choice for offline browser apps.\n\n**Question 2/3:** What should synchronization handle?",
        partial: "Near: offline support requires caching and sync.\n\n**Question 2/3:** What happens on reconnect?",
        miss: "The right answer is to use a Service Worker and offline caching strategy.\n\n**Question 2/3:** What must happen after reconnection?"
      }
    },
    {
      stepId: 2,
      ariaMessage: "**Question 2/3:** What data patterns are best for local changes and later sync?",
      hint: "Undo, conflict, queue",
      expectedKeywords: [
        "queue",
        "timestamps",
        "conflict resolution",
        "local changes"
      ],
      scoringKeywords: {
        excellent: [
          "operation queue",
          "timestamp",
          "reconciliation",
          "conflict resolution",
          "delta sync"
        ],
        good: [
          "local storage",
          "indexeddb",
          "queue",
          "sync"
        ],
        partial: [
          "sync",
          "offline"
        ]
      },
      correctAnswer: "Use a local change queue with timestamps and delta sync. Track pending create/update/delete actions locally, then replay them on reconnect and handle conflicts by timestamp or user confirmation.",
      explanation: "Offline sync requires an explicit queue of changes and a defined conflict strategy before pushing to the backend.",
      responses: {
        excellent: "Excellent! \u2705 Queue changes locally and replay them with conflict handling.\n\n**Question 3/3 (Final):** How do you test offline sync reliably?",
        good: "Good! Local queue and conflict handling are the right offline sync design.\n\n**Question 3/3 (Final):** How do you validate sync behavior?",
        partial: "Close \u2014 local change queue with timestamps is a strong pattern.\n\n**Question 3/3 (Final):** How do you check it works?",
        miss: "The proper offline pattern is local pending changes plus delta sync and conflict resolution.\n\n**Question 3/3 (Final):** How do you test the sync?"
      }
    },
    {
      stepId: 3,
      ariaMessage: "**Question 3/3 (Final):** What tests ensure offline mode and sync work without data loss?",
      hint: "Offline/online switch, device reboot, conflict",
      expectedKeywords: [
        "offline test",
        "sync test",
        "conflict",
        "data loss",
        "network toggle"
      ],
      scoringKeywords: {
        excellent: [
          "offline test",
          "network toggle",
          "conflict scenario",
          "data integrity",
          "reconnect"
        ],
        good: [
          "simulate offline",
          "validate sync",
          "retry"
        ],
        partial: [
          "test",
          "offline"
        ]
      },
      correctAnswer: "Test by switching the device offline, making changes, reconnecting, and verifying all updates sync correctly. Include conflict scenarios where two users edit the same record and verify data integrity after reconciliation.",
      explanation: "Offline testing must cover the full lifecycle: offline edit, reconnect, sync, and conflict resolution.",
      responses: {
        excellent: "Excellent! \u2705 You covered offline editing, reconnect, and conflict validation.\n\nThis is the right approach for offline reliability.",
        good: "Great! Offline mode plus reconnect and sync validation is correct.\n\nNice validation plan.",
        partial: "You are close \u2014 test offline edits and reconnect sync carefully.\n\nThat ensures data integrity.",
        miss: "The correct tests are offline modification, reconnect, sync, and conflict handling.\n\nThat proves the offline solution works."
      },
      isFinal: true
    }
  ],
  scoringAreas: [
    {
      area: "Offline Architecture",
      maxPoints: 10
    },
    {
      area: "Sync Design",
      maxPoints: 10
    },
    {
      area: "Service Worker Usage",
      maxPoints: 10
    },
    {
      area: "Data Integrity",
      maxPoints: 10
    },
    {
      area: "Validation",
      maxPoints: 10
    }
  ]
},

  {
  id: "rp9",
  icon: "\ud83c\udf17",
  title: "Implement Dark Mode in SAPUI5",
  difficulty: "Intermediate",
  estimatedTime: "16\u201320 min",
  tags: [
    "Theming",
    "Accessibility",
    "UX",
    "SAPUI5"
  ],
  brief: "The product team wants a dark mode toggle in a Fiori app. The theme must switch instantly without page reload and preserve accessibility contrast.",
  competencies: [
    "Theming",
    "Theme Designer",
    "CSS Variables",
    "Accessibility",
    "UX"
  ],
  steps: [
    {
      stepId: 1,
      ariaMessage: "**Question 1/3:** Which theming approach is recommended for dark mode in SAPUI5?",
      hint: "Fiori theme or runtime switch",
      expectedKeywords: [
        "sap_fiori_3_dark",
        "theme switch",
        "CSS variables",
        "sap.ui.core.ThemeManager"
      ],
      scoringKeywords: {
        excellent: [
          "theme switch",
          "sap.ui.core.ThemeManager",
          "dark theme",
          "sap_fiori_3_dark",
          "runtime"
        ],
        good: [
          "theme change",
          "dark mode",
          "theme manager"
        ],
        partial: [
          "dark",
          "theme"
        ]
      },
      correctAnswer: "Use SAPUI5 theme switching via sap.ui.core.ThemeManager and switch to the built-in dark theme (e.g. sap_fiori_3_dark) at runtime. Avoid custom CSS hacks for full Fiori compliance.",
      explanation: "The supported path is runtime theme switching between standard SAP themes using the ThemeManager.",
      responses: {
        excellent: "Excellent! \u2705 Use ThemeManager and the built-in SAP dark theme.\n\n**Question 2/3:** How do you preserve accessibility contrast when switching themes?",
        good: "Good! Runtime theme switching to sap_fiori_3_dark is the right approach.\n\n**Question 2/3:** How do you ensure a11y contrast?",
        partial: "Close \u2014 the right idea is to use the built-in dark theme and avoid hacks.\n\n**Question 2/3:** What about contrast?",
        miss: "The best answer is runtime theme switching with SAP's built-in dark theme.\n\n**Question 2/3:** How do you keep the app accessible?"
      }
    },
    {
      stepId: 2,
      ariaMessage: "**Question 2/3:** What implementation detail ensures the theme toggle keeps state across page reloads?",
      hint: "Local storage, cookies, user settings",
      expectedKeywords: [
        "local storage",
        "user preferences",
        "persist",
        "session"
      ],
      scoringKeywords: {
        excellent: [
          "local storage",
          "user preference",
          "persist theme",
          "theme cookie",
          "startup"
        ],
        good: [
          "save setting",
          "remember theme",
          "storage"
        ],
        partial: [
          "store",
          "remember"
        ]
      },
      correctAnswer: "Store the selected theme in localStorage or a user settings service, then apply it on startup before rendering. This persists the dark/light preference across reloads.",
      explanation: "Persisting the choice ensures the theme remains consistent across sessions and refreshes.",
      responses: {
        excellent: "Excellent! \u2705 Persist the theme preference locally and apply it at startup.\n\n**Question 3/3 (Final):** How should you test the dark mode switch?",
        good: "Good! Save the theme preference and restore it on load.\n\n**Question 3/3 (Final):** How to validate the feature?",
        partial: "Right idea \u2014 persist the theme and read it back on startup.\n\n**Question 3/3 (Final):** How do you test the toggle?",
        miss: "The correct implementation is to persist the selected theme and restore it on app startup.\n\n**Question 3/3 (Final):** How do you verify dark mode works?"
      }
    },
    {
      stepId: 3,
      ariaMessage: "**Question 3/3 (Final):** Which tests prove the dark theme and accessibility are correct?",
      hint: "Visual checks, contrast ratio, toggling",
      expectedKeywords: [
        "contrast ratio",
        "screen reader",
        "toggle",
        "refresh",
        "theme apply"
      ],
      scoringKeywords: {
        excellent: [
          "contrast ratio",
          "manual check",
          "accessibility",
          "toggle",
          "refresh"
        ],
        good: [
          "visual test",
          "keyboard",
          "screen reader"
        ],
        partial: [
          "test",
          "contrast"
        ]
      },
      correctAnswer: "Perform visual checks for both themes, validate contrast ratios on key UI elements, test the toggle keyboard accessibility, and ensure the persisted theme applies after refresh.",
      explanation: "Dark mode validation requires both visual and accessibility checks, not just a color swap.",
      responses: {
        excellent: "Excellent! \u2705 You included contrast, accessibility, and persistence checks.\n\nThis is a solid dark-mode test strategy.",
        good: "Great! Visual and accessibility validation is the right answer.\n\nNice work.",
        partial: "You are close \u2014 test contrast and theme persistence across reloads.\n\nThat ensures a usable dark mode.",
        miss: "The full answer is to verify contrast, keyboard accessibility, and persisted theme application.\n\nThat confirms the dark mode implementation."
      },
      isFinal: true
    }
  ],
  scoringAreas: [
    {
      area: "Theming Strategy",
      maxPoints: 10
    },
    {
      area: "Accessibility",
      maxPoints: 10
    },
    {
      area: "State Persistence",
      maxPoints: 10
    },
    {
      area: "SAPUI5 Practices",
      maxPoints: 10
    },
    {
      area: "Testing",
      maxPoints: 10
    }
  ]
},

  {
  id: "rp10",
  icon: "\ud83d\udcc8",
  title: "Create a KPI Preview Card for Launchpad",
  difficulty: "Intermediate",
  estimatedTime: "18\u201322 min",
  tags: [
    "Launchpad",
    "Tiles",
    "KPI",
    "OData"
  ],
  brief: "The business wants a KPI preview tile on Fiori Launchpad showing open service requests count. It must refresh on each load and link to the service request list.",
  competencies: [
    "Launchpad Tile",
    "Dynamic Tile",
    "Navigation",
    "OData Function Import",
    "Configuration"
  ],
  steps: [
    {
      stepId: 1,
      ariaMessage: "**Question 1/3:** Which Launchpad tile type is correct for live count data?",
      hint: "Static, Dynamic, or Custom",
      expectedKeywords: [
        "dynamic tile",
        "odata"
      ],
      scoringKeywords: {
        excellent: [
          "dynamic tile",
          "odata",
          "function import",
          "live data"
        ],
        good: [
          "dynamic",
          "live count",
          "odata service"
        ],
        partial: [
          "dynamic",
          "live"
        ]
      },
      correctAnswer: "Dynamic tile. It retrieves live data from an OData service on each Launchpad load. Static tiles do not update, and custom tiles are overkill.",
      explanation: "Live backend numbers require a dynamic tile, not a static text tile.",
      responses: {
        excellent: "Excellent! \u2705 Dynamic tile is correct for live KPI counts.\n\n**Question 2/3:** What OData endpoint should the tile call?",
        good: "Good! Dynamic tile is the correct tile type.\n\n**Question 2/3:** Which endpoint should it use?",
        partial: "Close \u2014 live data means dynamic tile.\n\n**Question 2/3:** What OData call powers it?",
        miss: "The correct answer is a Dynamic tile with an OData count service.\n\n**Question 2/3:** What should the tile call?"
      }
    },
    {
      stepId: 2,
      ariaMessage: "**Question 2/3:** How do you make the tile link to the service request list in the Launchpad?",
      hint: "Semantic object, semantic action, target mapping",
      expectedKeywords: [
        "semantic object",
        "semantic action",
        "intent-based navigation"
      ],
      scoringKeywords: {
        excellent: [
          "semantic object",
          "semantic action",
          "target mapping",
          "intent"
        ],
        good: [
          "navigation",
          "launchpad intent",
          "target mapping"
        ],
        partial: [
          "link",
          "navigate"
        ]
      },
      correctAnswer: "Use intent-based navigation with a semantic object and semantic action, then map that intent to the service request app target in the Launchpad catalog.",
      explanation: "Launchpad navigation from tiles uses semantic objects/actions mapped to app targets.",
      responses: {
        excellent: "Excellent! \u2705 Intent-based navigation via semantic object/action is the right approach.\n\n**Question 3/3 (Final):** How do you test the tile and navigation?",
        good: "Good! Semantic object/action mapping is the correct Launchpad navigation method.\n\n**Question 3/3 (Final):** How do you validate the tile?",
        partial: "Close \u2014 tiles use intent-based navigation, not direct URLs.\n\n**Question 3/3 (Final):** How should you test it?",
        miss: "The full answer is to use semantic object/action and map the intent to the target app.\n\n**Question 3/3 (Final):** How do you test the tile?"
      }
    },
    {
      stepId: 3,
      ariaMessage: "**Question 3/3 (Final):** What checks confirm the KPI tile works correctly?",
      hint: "Refresh, count display, navigation, permissions",
      expectedKeywords: [
        "refresh",
        "count",
        "navigation",
        "target mapping",
        "access"
      ],
      scoringKeywords: {
        excellent: [
          "refresh",
          "count",
          "intent",
          "navigation",
          "catalog"
        ],
        good: [
          "tile load",
          "link",
          "launchpad"
        ],
        partial: [
          "test",
          "tile"
        ]
      },
      correctAnswer: "Check that the tile fetches the count on each Launchpad load, displays the correct number, navigates to the service requests list via intent, and respects user catalog authorization.",
      explanation: "Tile validation includes data refresh, display accuracy, navigation, and security.",
      responses: {
        excellent: "Excellent! \u2705 You covered refresh, display, navigation, and authorization checks.\n\nThis is a complete Launchpad KPI tile validation.",
        good: "Great! Those checks prove the tile works end to end.\n\nNice answer.",
        partial: "You are close \u2014 verify refresh, count display, and navigation.\n\nThat confirms the tile behavior.",
        miss: "The correct checks are data refresh, display accuracy, navigation intent, and user authorization.\n\nThat confirms the tile works properly."
      },
      isFinal: true
    }
  ],
  scoringAreas: [
    {
      area: "Launchpad Design",
      maxPoints: 10
    },
    {
      area: "OData Configuration",
      maxPoints: 10
    },
    {
      area: "Navigation",
      maxPoints: 10
    },
    {
      area: "Tile Validation",
      maxPoints: 10
    },
    {
      area: "Security",
      maxPoints: 10
    }
  ]
},
